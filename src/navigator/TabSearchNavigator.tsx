import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParams } from './StackNavigator';
import SearchScreen from '../screens/SearchScreen';
import PokemonScreen from '../screens/PokemonScreen';

const TabSearch = createStackNavigator<RootStackParams>();

const TabSearchNavigator = () => {
  return (
    <TabSearch.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: 'white'
            }
        }}
    >
      <TabSearch.Screen name="HomeScreen" component={SearchScreen} />
      <TabSearch.Screen name="PokemonScreen" component={PokemonScreen} />
    </TabSearch.Navigator>
  );
}

export default TabSearchNavigator;