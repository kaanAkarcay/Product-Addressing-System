import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import ProductCategoryDTO from '../../dataModels/ProductCategoryDTO';
import { Styles } from '../../component/Styles';
import communicator from '../../component/communicator'; // Import your communicator
import { useDataStore } from '../../component/DataHandler';
const CreateProductCategory: React.FC = () => {
  const {productCategory, setProductCategory} = useDataStore();
 

  const handleCreateProductCategory = async () => {
    try {
      // Send the product category data to your API for creation
      const response = await communicator.post('/ProductCategory/createProductCategory', productCategory); // Replace with your actual create endpoint
      console.log('Product Category created:', response.data);
      // Handle success and update your UI accordingly
    } catch (error) {
      console.error('Error creating product category:', error);
      // Handle errors and display appropriate messages to the user
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>Product Category Creation</Text>
      <TextInput
        style={Styles.input}
        placeholder="Name"
        onChangeText={(text) => setProductCategory({ ...productCategory, ProductsCategoryName: text })}
        value={productCategory.ProductsCategoryName}
      />
      <View style={Styles.button}>
        <Button title="Create Product Category" onPress={handleCreateProductCategory} />
      </View>
    </View>
  );
};

export default CreateProductCategory;
