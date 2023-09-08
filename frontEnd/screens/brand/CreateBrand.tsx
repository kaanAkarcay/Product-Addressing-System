import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import BrandDTO from '../../dataModels/BrandDTO';
import { Styles } from '../../component/Styles';
import communicator from '../../component/communicator'; // Import your communicator
import { useDataStore } from '../../component/DataHandler';

const CreateBrand: React.FC = () => {
  const { brand, setBrand } = useDataStore(); // Use the brand state from useDataStore
  // const [brand, setBrand] = useState<BrandDTO>({
  //   BrandName: ''
  // });

  const handleCreateBrand = async () => {
    try {
      // Send the brand data to your API for creation
      const response = await communicator.post('/Brand/createBrand', brand); // Replace '/createBrand' with your actual create endpoint
      console.log('Brand created:', response.data);
      // Handle success and update your UI accordingly
    } catch (error) {
      console.error('Error creating brand:', error);
      // Handle errors and display appropriate messages to the user
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
