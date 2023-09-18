import React, { useState } from 'react';
import { View, Text, TextInput, Button ,Alert} from 'react-native';
import BrandDTO from '../../dataModels/BrandDTO';
import { Styles } from '../../component/Styles';
import communicator from '../../component/communicator'; // Import your communicator
import { updateBrand , searchBrand } from '../../services/BrandService';
import { useDataStore } from '../../component/DataHandler';

const UpdateBrand: React.FC = () => {
  const [searchKey, setSearchKey] = useState('');
  const { brand, setBrand } = useDataStore(); // Use the brand state from useDataStore
  const {brandFound, setBrandFound} = useDataStore();


  const handleSearchBrand = async () => {
    try {
      const response = await searchBrand(searchKey);
      // Replace '/endpoint' with your API endpoint
      if (response.status == 'success'){
          //Alert.alert(response.message);
          response.brand && setBrand(response.brand);              
           setBrandFound(true);
      }
      else  {
          Alert.alert(response.message)
      }
     
  } catch (error:any) {
      console.error('Error:', error);
      Alert.alert(error)
  }
  };

  const handleUpdateBrand = async () => {
    try {
      // Send the updated brand data to your API for updating
      const response = await updateBrand(brand);
      if (response.status == 'success') {
        Alert.alert(response.message)
        setBrandFound(false);
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
      <Text style={Styles.heading}>Brand Search</Text>
      <TextInput
        style={Styles.input}
        placeholder="Enter Brand Name"
        onChangeText={setSearchKey}
        value={searchKey}
      />
      <Button title="Search Brand" onPress={handleSearchBrand} />
      {brandFound && (
        <View style={Styles.productDetails}>
          <Text>Yes, that brand exists. Update the field below.</Text>
          <TextInput
            style={Styles.input}
            placeholder="Name"
            onChangeText={(text) => setBrand({ ...brand, BrandName: text })}
            value={brand.BrandName}
          />
          <Button title="Update Brand" onPress={handleUpdateBrand} />
        </View>
      )}
    </View>
  );
};

export default UpdateBrand;
