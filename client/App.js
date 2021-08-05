import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Menu from './components/Menu';
import { Center, Heading, NativeBaseProvider } from 'native-base';
import SearchBar from './components/SearchBar';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchInput = (event) => {
    setSearchTerm(event.nativeEvent.text.split(' ').join(' | '))
  }

  return (
    <NativeBaseProvider>
      <SafeAreaView flex={1}>
        <Center>
          <Heading>supahackernews</Heading>
          <SearchBar setInput={handleSearchInput}/>
        </Center>
        <Menu searchTerm={searchTerm}/>
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
