import React, { useState } from 'react';
import { View, Text, TextInput, Button ,Alert} from 'react-native';
import BrandDTO from '../../dataModels/BrandDTO';
import { Styles } from '../../component/Styles';
import communicator from '../../component/communicator'; // Import your communicator
import { updateBrand , searchBrand } from '../../services/BrandService';
import { useDataStore } from '../../component/DataHandler';

const UpdateBrand: React.FC = () => {
 
  const { brand, setBrand } = useDataStore(); // Use the brand state from useDataStore





  const handleUpdateBrand = async () => {
    try {
      // Send the updated brand data to your API for updating
      const response = await updateBrand(brand);
      if (response.status == 'success') {
        Alert.alert(response.message)

      }
      else{
        Alert.alert(response.message)
      }
      // Handle success and update your UI accordingly
    } catch (error:any) {
      console.error('Error updating brand:', error);
      // Handle errors and display appropriate messages to the user
      Alert.alert(error)
    }
  };

  return (
    <View style={Styles.container}>
      
        <View style={Styles.productDetails}>
          <Text>Update the field below.</Text>
         
          <TextInput
            style={Styles.input}
            placeholder="ID"
            keyboardType="numeric"
            onChangeText={(text) => setBrand({ ...brand, Id: text })}
            value={brand.Id}
          />
          <TextInput
            style={Styles.input}
            placeholder="Name"
            onChangeText={(text) => setBrand({ ...brand, BrandName: text })}
            value={brand.BrandName}
          />
          <Button title="Update Brand" onPress={handleUpdateBrand} />
        </View>
    </View>
  );
};

export default UpdateBrand;
