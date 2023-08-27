import React, { useState } from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import HomeScreen from '../screens/Home';
import HomeScreen2 from '../screens/Home2';

// Define the menu data structure
const drawerMenu = [
    {
      title: 'Products',
      menuList: [
        { title: 'Create Product', screenName: 'HomeScreen' },
        { title: 'Read Product', screenName: 'HomeScreen2' },
        { title: 'Update Product', screenName: 'HomeScreen' },
        { title: 'Delete Product', screenName: 'HomeScreen2' },
       
      ],
      
    },
    {
        title: 'Brand',
        menuList: [
          { title: 'Create Brand', screenName: 'HomeScreen' },
          { title: 'Read Brand', screenName: 'HomeScreen2' },
          { title: 'Update Brand', screenName: 'HomeScreen' },
          { title: 'Delete Brand', screenName: 'HomeScreen2' },
         
        ],
        
      },
   
    // Add more menu items as needed
  ];

const CustomDrawerContent = ({ navigation }: { navigation: any }) => {
  const [menuIndex, setMenuIndex] = useState<number | null>(null);

  const toggleSubMenu = (index: number) => {
    setMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };
//   const navigateToScreen = (screenComponent: any) => {
//     navigation.navigate(screenComponent);
//   };
  return (
    <DrawerContentScrollView>
      

      {drawerMenu.map((item, index) => (
  <View key={index}>
    <TouchableOpacity style={styles.menuItem} onPress={() => toggleSubMenu(index)}>
      <Text style={styles.menuTitle}>{item.title}</Text>
    </TouchableOpacity>

    {menuIndex === index && (
      <View style={styles.subMenuContainer}>
        {item.menuList.map((subMenu, subIndex) => (
          <TouchableOpacity
            key={subIndex}
            style={styles.subMenuItem}
            onPress={() =>{if (subMenu.screenName) {
                navigation.navigate(subMenu.screenName);
              }}
            }>
            <Text style={styles.subMenuTitle}>{subMenu.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )}
  </View>
))}

    </DrawerContentScrollView>
  );
};
const styles = StyleSheet.create({
    header: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: '#F5F5F5',
    },
    headerText: {
      fontSize: 16,
    },
    menuItem: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    menuTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    subMenuContainer: {
      paddingLeft: 24,
      marginTop: 4,
    },
    subMenuItem: {
      paddingVertical: 8,
    },
    subMenuTitle: {
      fontSize: 14,
      color: '#666',
    },
  });
export default CustomDrawerContent;
