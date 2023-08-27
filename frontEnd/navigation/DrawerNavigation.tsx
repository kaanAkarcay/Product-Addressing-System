import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/Home';
import HomeScreen2 from '../screens/Home2';
import TabNavigation from './TabNavigation';
import StackScreen from './StackScreen';
import CustomDrawerContent from './CustomDrawer';
import InsertProduct from '../screens/InsertProduct';

const Drawer = createDrawerNavigator();


export default function DrawerNavigation() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
    
    <Drawer.Screen name="Tabs" component={TabNavigation} />
    <Drawer.Screen name='HomeScreen' component={HomeScreen}/>
    <Drawer.Screen name='HomeScreen2' component={HomeScreen2}/>
    
    {/* <Drawer.Screen name="HomeScreen">
          {() => <HomeScreen />}
        </Drawer.Screen> */}
      </Drawer.Navigator>
  );
}
    