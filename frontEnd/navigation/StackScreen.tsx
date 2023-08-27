import React from 'react';
import TabNavigation from './TabNavigation'; // Replace with your actual paths
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import InsertProduct from '../screens/InsertProduct';


const Stack = createNativeStackNavigator();
export default function StackScreen() {
    return (
        <Stack.Navigator>
        <Stack.Screen name="TAb" component={TabNavigation}  />
        <Stack.Screen name="home" component={HomeScreen}  />

       
      </Stack.Navigator>
    );
  }
