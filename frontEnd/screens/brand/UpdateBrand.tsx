import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import BrandDTO from '../../dataModels/BrandDTO';
import { Styles } from '../../component/Styles';
import communicator from '../../component/communicator'; // Import your communicator

const UpdateBrand: React.FC = () => {
  const [searchKey, setSearchKey] = useState('');
  const [foundBrand, setFoundBrand] = useState<BrandDTO | null>(null);
  const [updatedBrand, setUpdatedBrand] = useState<BrandDTO>({
    BrandName: ''
  });

  const handleSearchBrand = async () => {
    try {
      // Simulate fetching data from your API based on searchKey
      const response = await communicator.get(`/Brand/getBrand?name=${searchKey}`); // Replace '/getBrand' with your actual endpoint
      console.log('Found Brand:', response.data);
      const fetchedBrand = response.data;
      setFoundBrand(fetchedBrand);
      setUpdatedBrand(fetchedBrand); // Set the brand for updating
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateBrand = async () => {
    try {
      // Send the updated brand data to your API for updating
      const response = await communicator.put(`/Brand/updateBrand`, updatedBrand); // Replace with your actual update endpoint
      console.log('Brand updated:', response.data);
      // Handle success and update your UI accordingly
    } catch (error) {
      console.error('Error updating brand:', error);
      // Handle errors and display appropriate messages to the user
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>Brand Search</Text>
      <TextInput
        style={Styles.input}
        placeholder="Enter Brand Name"
        onChangeText={setSearchKey}
        value={searchKey}
      />
      <Button title="Search Brand" onPress={handleSearchBrand} />
      {foundBrand && (
        <View style={Styles.productDetails}>
          <Text>Yes, that brand exists. Update the field below.</Text>
          <TextInput
            style={Styles.input}
            placeholder="Name"
            onChangeText={(text) => setUpdatedBrand({ ...updatedBrand, BrandName: text })}
            value={updatedBrand.BrandName}
          />
          <Button title="Update Brand" onPress={handleUpdateBrand} />
        </View>
      )}
    </View>
  );
};

export default UpdateBrand;
