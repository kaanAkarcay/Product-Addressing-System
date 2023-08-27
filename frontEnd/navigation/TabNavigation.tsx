import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InsertProduct from '../screens/InsertProduct';
import StackScreen from './StackScreen';

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
    return (
        <Tab.Navigator screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen name="Add Product" component={InsertProduct}/>
      </Tab.Navigator>
    );
  }