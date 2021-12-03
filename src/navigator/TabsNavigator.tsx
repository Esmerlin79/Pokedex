import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import StackNavigator from './StackNavigator';
import TabSearchNavigator from './TabSearchNavigator';

const Tab = createBottomTabNavigator();


const TabsNavigator = () =>  {
  return (
    <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#5856D6',
            tabBarLabelStyle: {
                marginBottom: Platform.OS === 'android' ? 10 : 0,
            },
            tabBarStyle: {
                position: 'absolute',
                backgroundColor: 'rgba(255,255,255,0.92)',
                borderWidth: 0,
                elevation: 0,
                height: Platform.OS === 'android' ? 60 : 80,
            }
        }}
        sceneContainerStyle={{
            backgroundColor: 'white'
        }}
    >
      <Tab.Screen 
        name="StackNavigator" 
        component={StackNavigator} 
        options={{
            tabBarLabel: "Listado",
            tabBarIcon: ({ color }) => <Icon name="list-outline" size={25} color={color} />
        }}
    />
      <Tab.Screen 
        name="SearchScreen" 
        component={TabSearchNavigator} 
        options={{
            tabBarLabel: "Busqueda",
            tabBarIcon: ({ color }) => <Icon name="search-outline" size={25} color={color} />
        }}
    />
    </Tab.Navigator>
  );
}
export default TabsNavigator;