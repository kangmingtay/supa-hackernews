import React, { useState, useEffect } from "react";
import { ScrollView } from "native-base";
import { supabase } from "../lib/initSupabase";
import "react-native-url-polyfill/auto";
import Story from "../components/Story";
import SearchingLottie from "../components/SearchingLottie";

const NewStoriesPage = (props) => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getStories();
  }, []);

  useEffect(() => {
    if (props.searchTerm.length === 0) {
      getStories();
    } else {
      handleSearch(props.searchTerm);
    }
  }, [props.searchTerm]);

  const listStories = stories.map((story) => (
    <Story key={story.id} data={story} />
  ));

  const getStories = async () => {
    setIsLoading(true);
    const { data, err } = await supabase
      .from("new_stories")
      .select("*")
      .order("time", { ascending: false })
      .limit(100);

    setIsLoading(false);
    if (err) console.log(err);
    else setStories(data);
  };

  const handleSearch = async (term) => {
    setIsLoading(true);
    const { data, err } = await supabase
      .from("new_stories")
      .select()
      .textSearch("title", term)
      .order("time", { ascending: false })
      .order("score", { ascending: false })
      .limit(50);
      
    setIsLoading(false);
    if (err) console.log(err);
    else setStories(data);
  };
  return (
    <>
      {isLoading ? (
        <SearchingLottie />
      ) : (
        <ScrollView>{stories.length === 0 ? null : listStories}</ScrollView>
      )}
    </>
  );
};

export default NewStoriesPage;
