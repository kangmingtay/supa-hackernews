import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Story from './components/Story';
import { supabase } from './lib/initSupabase';
import { NativeBaseProvider, ScrollView } from 'native-base';
import 'react-native-url-polyfill/auto';

export default function App() {
  const [stories, setStories] = useState([])
  useEffect(() => {  
    getStories()
  }, [])

  const getStories = async () => {
    const { data, err } = await supabase.from('stories').select('*').order('time', { ascending: false }).limit(20)
    if (err) {
      console.log(err)
    }
    else {
      setStories(data)
    }
  }

  const listStories = stories.map(story => <Story key={story.id} data={story}/>)

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {stories.length === 0 ? null : listStories}
          <StatusBar style="auto" />
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
