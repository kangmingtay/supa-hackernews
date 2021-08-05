import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Menu from './components/Menu';
import { NativeBaseProvider } from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaView flex={1}>
        <Menu/>
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
