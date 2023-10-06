import React, { useState } from 'react';
import { View, Text, TextInput, Button,Alert } from 'react-native';
import Product_CategoryDTO from '../../dataModels/ProductCategoryDTO';
import { Styles } from '../../component/Styles';
import { useDataStore } from '../../component/DataHandler';
import { updateProductCategory } from '../../services/ProductCategoryService';

const UpdateProductCategory: React.FC = () => {
    const {productCategory, setProductCategory} = useDataStore();



    const UpdateProductCategory = async () => {
      console.log("updating Product Category");
      try {
        // Send the updated brand data to your API for updating
        const response = await updateProductCategory(productCategory);
        if (response.status == 'success') {
          Alert.alert(response.message)
  
        }
        else{
          Alert.alert(response.message)
        }
        // Handle success and update your UI accordingly
      } catch (error:any) {
        console.error('Error updating product category:', error);
        // Handle errors and display appropriate messages to the user
        Alert.alert(error)
      }
    }

        return (
            <View style={Styles.container}>
      <Text style={Styles.heading}>Product Category Update</Text>
      <TextInput
            style={Styles.input}
            placeholder="ID"
            keyboardType="numeric"
            onChangeText={(text) => setProductCategory({ ...productCategory, Id: text })}
            value={productCategory.Id}
          />
      <TextInput
        style={Styles.input}
        placeholder="Name"
        onChangeText={(text) => setProductCategory({ ...productCategory, ProductsCategoryName: text })}
        value={productCategory.ProductsCategoryName}
      />
      <View style={Styles.button}>
        <Button title="Update Product Category" onPress={UpdateProductCategory} />
      </View>
            </View>
        );

                }
export default UpdateProductCategory;