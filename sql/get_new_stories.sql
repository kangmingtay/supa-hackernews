create function get_new_stories ()
returns void as
$$
declare
    sid bigint;
	story json;
begin
    for sid in select json_array_elements(content::json) from http_get('https://hacker-news.firebaseio.com/v0/newstories.json')
    loop 
		select content::json into story from http_get('https://hacker-news.firebaseio.com/v0/item/' || sid || '.json');
		insert into new_stories(by, id, url, kids, descendants, time, title, text, type, score, last_updated_at)
		values (
			story->>'by', 
			cast(story->>'id' as bigint),
			story->>'url', 
			json_array_castint(story->'kids'), 
			cast(story->>'descendants' as int),
			to_timestamp(cast(story->>'time' as bigint)),
			story->>'title',
			story->>'text',
			story->>'type',
			cast(story->>'score' as int),
            current_timestamp
		)
		on conflict(id) do nothing;
    end loop;
end;
$$ language plpgsql
