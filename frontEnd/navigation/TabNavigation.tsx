import React from 'react';
import { StyleSheet } from 'react-native'; // Import StyleSheet
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import InsertProduct from '../screens/InsertProduct';
import RemoveProduct from '../screens/RemoveProduct';
import CreateProduct from '../screens/product/CreateProduct';
import UpdateProduct from '../screens/product/UpdateProduct';
import ReadProduct from '../screens/product/ReadProduct';
import DeleteProduct from '../screens/product/DeleteProduct';
import CreateBrand from '../screens/brand/CreateBrand';
import ReadBrand from '../screens/brand/ReadBrand';
import UpdateBrand from '../screens/brand/UpdateBrand';
import DeleteBrand from '../screens/brand/Deletebrand';
import CreateProductCategory from '../screens/product_category/CreateProductCategory';
import ReadProductCategory from '../screens/product_category/ReadproductCategory';
import UpdateProductCategory from '../screens/product_category/UpdateProductCategory';
import DeleteProductCategory from '../screens/product_category/DeleteProductCategory';
import CreateShelf from '../screens/shelf/CreateShelf';
import ReadShelf from '../screens/shelf/ReadShelf';
import UpdateShelf from '../screens/shelf/UpdateShelf';
import DeleteShelf from '../screens/shelf/DeleteShelf';

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: styles.tabBar,
      headerStyle: styles.header,
    }}>
      <Tab.Screen name="Add Product" component={InsertProduct} options={{ headerShown: false }} />
      <Tab.Screen name="Remove Product" component={RemoveProduct} options={{ headerShown: false }} />


      <Tab.Screen name="Create Product" component={CreateProduct} options={{ headerShown: false, tabBarButton: () => null }} />
      <Tab.Screen name="Read Product" component={ReadProduct} options={{ headerShown: false, tabBarButton: () => null }} />
      <Tab.Screen name="Update Product" component={UpdateProduct} options={{ headerShown: false, tabBarButton: () => null }} />
      <Tab.Screen name="Delete Product" component={DeleteProduct} options={{ headerShown: false, tabBarButton: () => null }} />

      <Tab.Screen name="Create Brand" component={CreateBrand} options={{ headerShown: false, tabBarButton: () => null }} />
      <Tab.Screen name="Read Brand" component={ReadBrand} options={{ headerShown: false, tabBarButton: () => null }} />
      <Tab.Screen name="Update Brand" component={UpdateBrand} options={{ headerShown: false, tabBarButton: () => null }} />
      <Tab.Screen name="Delete Brand" component={DeleteBrand} options={{ headerShown: false, tabBarButton: () => null }} />

      <Tab.Screen name="Create Product Category" component={CreateProductCategory} options={{ headerShown: false, tabBarButton: () => null }} />
      <Tab.Screen name="Read Product Category" component={ReadProductCategory} options={{ headerShown: false, tabBarButton: () => null }} />
      <Tab.Screen name="Update Product Category" component={UpdateProductCategory} options={{ headerShown: false, tabBarButton: () => null }} />
      <Tab.Screen name="Delete Product Category" component={DeleteProductCategory} options={{ headerShown: false, tabBarButton: () => null }} />
     
      <Tab.Screen name="Create Shelf" component={CreateShelf} options={{ headerShown: false, tabBarButton: () => null }} />
      <Tab.Screen name="Read Shelf" component={ReadShelf} options={{ headerShown: false, tabBarButton: () => null }} />
      <Tab.Screen name="Update Shelf" component={UpdateShelf} options={{ headerShown: false, tabBarButton: () => null }} />
      <Tab.Screen name="Delete Shelf" component={DeleteShelf} options={{ headerShown: false, tabBarButton: () => null }} />
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