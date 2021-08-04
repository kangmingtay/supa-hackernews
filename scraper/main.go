package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"reflect"
	"strconv"
	"sync"
	"sync/atomic"
	"time"

	"github.com/joho/godotenv"
	"github.com/supabase/postgrest-go"
)

const (
	numThreads  = 40
	insertBatch = 250
)

type Count struct {
	id int64
	mu sync.Mutex
}

type Story struct {
	By          string    `json:"by"`
	Descendants int       `json:"descendants"`
	Kids        []int     `json:"kids"`
	ID          int       `json:"id"`
	Score       int       `json:"score"`
	Time        time.Time `json:"time"`
	Title       string    `json:"title"`
	Type        string    `json:"type"`
	Text        string    `json:"text"`
	URL         string    `json:"url"`
}

type StoryCollection struct {
	Stories []Story
	mu      sync.Mutex
}

func main() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatalf("Error loading .env file: %v\n", err)
	}
	endAt := time.Date(2021, 1, 1, 0, 0, 0, 0, time.UTC) // 2021-01-01

	resp, err := http.Get("https://hacker-news.firebaseio.com/v0/maxitem.json")
	if err != nil {
		log.Fatalf("Error fetching max id: %v\n", err)
	}
	defer resp.Body.Close()
	var count Count
	json.NewDecoder(resp.Body).Decode(&count.id)

	if os.Getenv("START_ID") != "" {
		startId, err := strconv.Atoi(os.Getenv("START_ID"))
		if err != nil {
			log.Fatalln(err)
		}
		count.id = int64(startId)
	}
	maxCount := count.id
	log.Printf("Polling from id: %v\n", count.id)

	var sendWg sync.WaitGroup
	var receiveWg sync.WaitGroup
	data := make(chan Story)

	var sent int64 = 0
	var received int64 = 0

	for i := 0; i < numThreads/10; i++ {
		receiveWg.Add(1)
		go processData(i, data, &receiveWg, &received)
	}

	for i := 0; i < numThreads; i++ {
		sendWg.Add(1)
		go fetchData(i, data, &sendWg, &count, maxCount, endAt, &sent)
	}

	sendWg.Wait()
	close(data)
	receiveWg.Wait()
	log.Printf("Final count: %v Sent: %v  Received: %v\n", count.id, atomic.LoadInt64(&sent), atomic.LoadInt64(&received))
}

func fetchData(wid int, data chan Story, wg *sync.WaitGroup, count *Count, maxCount int64, endAt time.Time, sent *int64) {
	defer wg.Done()
	for {
		count.mu.Lock()
		if count.id < 1 {
			count.mu.Unlock()
			break
		}
		count.id -= 1
		queryString := fmt.Sprintf("https://hacker-news.firebaseio.com/v0/item/%v.json", count.id)
		count.mu.Unlock()

		resp, err := http.Get(queryString)
		if err != nil {
			log.Fatalf("[Send Worker %v] Error fetching item: %v\n", wid, err)
		}

		var itemData Story
		body, _ := ioutil.ReadAll(resp.Body)
		if err := json.Unmarshal(body, &itemData); err != nil {
			log.Fatalf("[Send Worker %v] Error unmarshalling json\n", wid)
		}

		if itemData.Time.Before(endAt) && itemData.ID != 0 {
			log.Printf("[Send Worker %v]: %+v\n", wid, itemData)
			break
		}

		if itemData.Type == "story" {
			data <- itemData
			atomic.AddInt64(sent, 1)
		}
	}
}

func processData(wid int, ch chan Story, wg *sync.WaitGroup, received *int64) {
	defer wg.Done()
	client := postgrest.NewClient(os.Getenv("SUPABASE_API")+"/rest/v1", "public", map[string]string{
		"apikey": os.Getenv("SUPABASE_KEY"),
	})
	if client.ClientError != nil {
		log.Fatalln(client.ClientError)
	}
	var stories []Story
	for story := range ch {
		atomic.AddInt64(received, 1)
		stories = append(stories, story)
		if len(stories) == insertBatch {
			_, err := client.From("stories").Insert(stories, true, "id", "", "").Execute()
			if err != nil {
				log.Fatalln(err)
			}
			stories = nil
			log.Printf("[Worker %v] Batch story id: %v\n", wid, story.ID)
		}
	}
	if len(stories) > 0 {
		_, err := client.From("stories").Insert(stories, true, "id", "", "").Execute()
		if err != nil {
			log.Fatalln(err)
		}
	}
	log.Printf("[Receive Worker %v] Finished processing stories\n", wid)
}

func (s *Story) UnmarshalJSON(data []byte) error {
	var f interface{}
	if err := json.Unmarshal(data, &f); err != nil {
		return err
	}

	if f != nil {
		m := f.(map[string]interface{})
		for k, v := range m {
			switch k {
			case "time":
				s.Time = time.Unix(int64(v.(float64)), 0)
			case "by":
				s.By = v.(string)
			case "descendants":
				s.Descendants = int(v.(float64))
			case "kids":
				r := reflect.ValueOf(v)
				var kids []int
				if r.Kind() == reflect.Slice {
					for i := 0; i < r.Len(); i++ {
						kids = append(kids, int(r.Index(i).Interface().(float64)))
					}
				}
				s.Kids = kids
			case "id":
				s.ID = int(v.(float64))
			case "score":
				s.Score = int(v.(float64))
			case "text":
				s.Text = v.(string)
			case "title":
				s.Title = v.(string)
			case "type":
				s.Type = v.(string)
			case "url":
				s.URL = v.(string)
			}
		}
	}

	return nil
}
