import { getColorScheme } from "@/constants/color-scheme";
import { BOTTOM_NAV_BAR_HEIGHT } from '@/constants/styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";

export default function TabLayout() {
  return <Tabs screenOptions={{
    tabBarStyle: {
      height: BOTTOM_NAV_BAR_HEIGHT,
      flexDirection: 'column',
      backgroundColor: getColorScheme().secondaryContainer
    }
  }}>
    <Tabs.Screen 
      name = "add"
      options={{ 
        headerShown: false,
        title: 'Add',
        tabBarLabelStyle:{
          fontFamily:"Body",
          fontSize: 15
        },
        tabBarActiveTintColor: getColorScheme().primary,
        tabBarIcon: ({color}) => (<Ionicons name="home-sharp" size={30} color={color} />)
      }}
    />
    <Tabs.Screen 
      name = "search" 
      options={{ 
        headerShown: false, 
        title: 'Search',
        tabBarLabelStyle:{
          fontFamily:"Body",
          fontSize: 15
        },
        tabBarActiveTintColor: getColorScheme().primary,
        tabBarIcon: ({color}) => (<Ionicons name="search-sharp" size={30} color={color} />)
      }}/>
  </Tabs>;
}
