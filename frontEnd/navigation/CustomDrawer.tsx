import React, { useState } from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

// Define the menu data structure
const drawerMenu = [
    {
      title: 'Products',
      menuList: [
        { title: 'Create Product', screenName: 'Create Product' },
        { title: 'Read Product', screenName: 'Read Product' },
        { title: 'Update Product', screenName: 'Update Product' },
        { title: 'Delete Product', screenName: 'Delete Product' },
       
      ],
      
    },
    {
        title: 'Brands',
        menuList: [
          { title: 'Create Brand', screenName: 'Create Brand' },
          { title: 'Read Brand', screenName: 'Read Brand' },
          { title: 'Update Brand', screenName: 'Update Brand' },
          { title: 'Delete Brand', screenName: 'Delete Brand' },
         
        ],
        
      },
      {
        title: 'Product Categories',
        menuList: [
          { title: 'Create Product Category', screenName: 'Create Product Category' },
          { title: 'Read Product Category', screenName: 'Read Product Category' },
          { title: 'Update Product Category', screenName: 'Update Product Category' },
          { title: 'Delete Product Category', screenName: 'Delete Product Category' },
         
        ],
        
      },
      {
        title: 'Shelfs',
        menuList: [
          { title: 'Create Shelf', screenName: 'Create Shelf' },
          { title: 'Read Shelf', screenName: 'Read Shelf' },
          { title: 'Update Shelf', screenName: 'Update Shelf' },
          { title: 'Delete Shelf', screenName: 'Delete Shelf' },
         
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
