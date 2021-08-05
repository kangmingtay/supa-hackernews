import React, { useState, useEffect} from 'react'
import { ScrollView } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '../lib/initSupabase';
import 'react-native-url-polyfill/auto';
import Story from '../components/Story';

const AllStoriesPage = () => {
    const [stories, setStories] = useState([])

    useEffect(() => {  
        getStories()
    }, [])

    const listStories = stories.map(story => <Story key={story.id} data={story}/>)

    const getStories = async () => {
        const { data, err } = await supabase.from('stories').select('*').order('time', { ascending: false }).limit(20)
        if (err) {
            console.log(err)
        }
        else {
            setStories(data)
        }
    }
    return (
        <ScrollView>
          {stories.length === 0 ? null : listStories}
          <StatusBar style="auto" />
        </ScrollView>
    )
}

export default AllStoriesPage