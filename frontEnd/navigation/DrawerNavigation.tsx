import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigation from './TabNavigation';
import CustomDrawerContent from './CustomDrawer';

const Drawer = createDrawerNavigator();


export default function DrawerNavigation() {
  return (
    <Drawer.Navigator screenOptions={{
        headerShown: true,
        headerTitle:'',
        headerStyle:{
            backgroundColor:'transparent',
            elevation:0,
            shadowOpacity:0,
        }
      }} drawerContent={(props) => <CustomDrawerContent {...props}  />}>
    
    <Drawer.Screen  name="Tabs" component={TabNavigation}/>
    {/* <Drawer.Screen name='HomeScreen' component={HomeScreen}/>
    <Drawer.Screen name='HomeScreen2' component={HomeScreen2}/> */}
    
    {/* <Drawer.Screen name="HomeScreen">
          {() => <HomeScreen />}
        </Drawer.Screen> */}
      </Drawer.Navigator>
  );
}
    