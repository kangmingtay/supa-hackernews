import { Text } from 'native-base';
import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import AllStoriesPage from '../pages/AllStoriesPage';
import TopStoriesPage from '../pages/TopStoriesPage';

const renderScene = ({ route }) => {
    switch (route.key) {
        case 'all':
            return <AllStoriesPage/>
        case 'best':
            return <TopStoriesPage/>
    }
}

const renderTabBar = props => {
    return <TabBar
        {...props}
        indicatorStyle={{backgroundColor: 'black'}}
        style={{ backgroundColor: 'white' }}
        labelStyle={{ color: 'black' }}
    />
}

const Menu = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'all', title: 'All' },
    { key: 'best', title: 'Best' },
  ]);

  return (
    <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
    />
  );
}

export default Menu;