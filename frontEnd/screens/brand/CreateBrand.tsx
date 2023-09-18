import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import BrandDTO from '../../dataModels/BrandDTO';
import { Styles } from '../../component/Styles';

import { useDataStore } from '../../component/DataHandler';
import { createBrand } from '../../services/BrandService';
const CreateBrand: React.FC = () => {
  const { brand, setBrand } = useDataStore();
  const handleCreateBrand = async () => {
    try {
      // Call the createBrand service to create a new brand
      const response = await createBrand(brand);

      if (response.status === 'success') {
        // Brand creation was successful
        

        // Clear the input field and update your UI accordingly
       

        // Show a success message to the user (you can use a custom alert component)
        Alert.alert('Success', 'Brand created successfully');

      } else {
        // Brand creation failed
        console.error('Error creating brand:', response.message);

        // Show an error message to the user (you can use a custom alert component)
        Alert.alert('Error', response.message);
      }

    } catch (error:any) {
      console.error('Error creating brand:', error);
      Alert.alert(error);
      // Handle unexpected errors and display appropriate messages to the user
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>Brand Creation</Text>
      <TextInput
        style={Styles.input}
        placeholder="Name"
        onChangeText={(text) => setBrand({ ...brand, BrandName: text })}
        value={brand?.BrandName ?? ''}
      />

      <View style={Styles.button}>
        <Button title="Create Brand" onPress={handleCreateBrand} />
      </View>
    </View>
  );
};

export default CreateBrand;
