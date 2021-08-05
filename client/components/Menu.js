import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import AllStoriesPage from '../pages/AllStoriesPage';
import TopStoriesPage from '../pages/TopStoriesPage';

const renderScene = ({ route }) => {
    switch (route.key) {
        case 'all':
            return <AllStoriesPage searchTerm={route.searchTerm}/>
        case 'best':
            return <TopStoriesPage searchTerm={route.searchTerm}/>
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

const Menu = (props) => {
  const [searchTerm, setSearchTerm] = useState(props.searchTerm)
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setRoutes([
        { key: 'all', title: 'All', searchTerm: props.searchTerm },
        { key: 'best', title: 'Best', searchTerm: props.searchTerm },
    ])
  }, [props.searchTerm])
  
  const [routes, setRoutes] = useState([
    { key: 'all', title: 'All', searchTerm: '' },
    { key: 'best', title: 'Best', searchTerm: '' },
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