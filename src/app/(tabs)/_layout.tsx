import { BOTTOM_NAV_BAR_HEIGHT } from '@/constants/styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";

export default function TabLayout() {
  return <Tabs screenOptions={{
    tabBarStyle: {
      height: BOTTOM_NAV_BAR_HEIGHT,
      flexDirection: 'column'
    }
  }}>
    <Tabs.Screen 
      name = "add"
      options={{ 
        headerShown: false, 
        title: 'Add',
        tabBarIcon: ({color}) => (<Ionicons name="home-sharp" size={24} color={color} />)
      }}
    />
    <Tabs.Screen 
      name = "search" 
      options={{ 
        headerShown: false, 
        title: 'Search',
        tabBarIcon: ({color}) => (<Ionicons name="search-sharp" size={24} color={color} />)
      }}/>
  </Tabs>;
}
