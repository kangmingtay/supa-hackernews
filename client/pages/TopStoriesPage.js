import React, { useState, useEffect} from 'react'
import { ScrollView } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '../lib/initSupabase';
import 'react-native-url-polyfill/auto';
import Story from '../components/Story';
import axios from 'axios';

const TopStoriesPage = () => {
    const [topIds, setTopIds] = useState([])
    const [stories, setStories] = useState([])

    useEffect(() => {
        getTopIds()
    }, [])

    useEffect(() => {  
        if (topIds.length !== 0) {
            getStories(topIds)
        }
    }, [topIds])

    const getTopIds = async () => {
        try {
          const resp = await axios.get('https://hacker-news.firebaseio.com/v0/beststories.json')
          setTopIds([...resp.data])
        } catch (err) {
            console.log(err)
        }
    }

    const getStories = async (ids) => {
        try {
            const { data, err } = await supabase
                .from('stories')
                .select('*')
                .in('id', ids)
                .order('score', { ascending: false })

            if (err) {
                console.log(err)
            } else if (!data) {
                console.log("Data is null")
            }
            else {
                setStories([...data])
            }
        } catch (err) {
            console.log(err)
        }        
    }

    const listStories = stories.map(story => <Story key={story.id} data={story}/>)

    return (
        <ScrollView>
          {stories.length === 0 ? null : listStories}
          <StatusBar style="auto" />
        </ScrollView>
    )
}

export default TopStoriesPage