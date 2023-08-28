import React from 'react';
import { StyleSheet } from 'react-native'; // Import StyleSheet
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InsertProduct from '../screens/InsertProduct';
import CreateProduct from '../screens/CreateProduct';
import HomeScreen2 from '../screens/Home2';

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: styles.tabBar,
      headerStyle: styles.header,
    }}>
      <Tab.Screen name="Add Product" component={InsertProduct} options={{ headerShown: false }} />

      <Tab.Screen name="Create Product" component={CreateProduct} options={{ headerShown: false, tabBarButton: () => null }} />

      <Tab.Screen name="HomeScreen2" component={HomeScreen2} options={{ headerShown: false, tabBarButton: () => null }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#333333', // Set the background color of the tab bar
  },
  header: {
    backgroundColor: '333333', // Set the background color of the header
  },
});