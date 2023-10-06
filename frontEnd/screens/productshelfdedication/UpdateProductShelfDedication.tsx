import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { Styles } from '../../component/Styles';
import communicator from '../../component/communicator'; 
import { updateProductShelfDedication, searchProductShelfDedication } from '../../services/ProductShelfDedicationService';
import { useDataStore } from '../../component/DataHandler';
import { getProductCategories } from '../../services/ProductCategoryService';
import SelectDropdown from 'react-native-select-dropdown'

const UpdateProductShelfDedication: React.FC = () => {
  const [searchKey, setSearchKey] = useState('');
  const { productShelfDedication, setProductShelfDedication } = useDataStore();
  const { productShelfDedicationFound, setProductShelfDedicationFound } = useDataStore();
  const { brands, productCategories } = useDataStore();
  const Sexes=  ["Erkek", "Kadın"]
  const [Pddata, setPdData] = useState<string[]>([]);
  const [Bdata, setBData] = useState<string[]>([]);


  useEffect(() => {
 
    getProductCategories()
      .then(() => {
        if (Array.isArray(productCategories)) {
          // Extract the ProductsCategoryName values and push them into the data array
          const categoryNames = productCategories.map((category) => {
            try {
              const parsedCategory = JSON.parse(category);
              return parsedCategory.ProductsCategoryName;
            } catch (error) {
              console.error('Error parsing JSON:', error);
              return ''; // Return an empty string in case of parsing errors
            }
          });
  
          // Filter out empty strings (parsing errors) and update the data state
          console.log(categoryNames)
          setPdData(categoryNames.filter((name) => name !== ''));
        }
      })
      .catch((error:any) => {
        console.error('Error fetching productCategories:', error);
      });
      
  }, []);
  
  const handleSearchDedication = async () => {
    try {
      const response = await searchProductShelfDedication(searchKey);
      if (response.status == 'success'){
          response.ProductShelfDedication && setProductShelfDedication(response.ProductShelfDedication);              
          setProductShelfDedicationFound(true);
        
      } else {
          Alert.alert(response.message)
      }
    } catch (error:any) {
      console.error('Error:', error);
      Alert.alert(error)
    }
  };

  const handleUpdateDedication = async () => {
    try {
        console.log(productShelfDedication)
      const response = await updateProductShelfDedication(productShelfDedication);
      if (response.status == 'success') {
        Alert.alert(response.message)
        setProductShelfDedicationFound(false);
      } else {
        Alert.alert(response.message)
      }
    } catch (error:any) {   
      console.error('Error updating dedication:', error);
      Alert.alert(error)
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>Product Shelf Dedication Search</Text>
      <TextInput
        style={Styles.input}
        placeholder="Enter Search Key"
        onChangeText={setSearchKey}
        value={searchKey}
      />
      <Button title="Search Dedication" onPress={handleSearchDedication} />
      {productShelfDedicationFound && (
        <View style={Styles.productDetails}>
          <Text>Yes, that dedication exists. Update the fields below.</Text>
          <View style={Styles.selectorContainer}>
        <SelectDropdown 
          data={Sexes}
          defaultButtonText="Sex"
          onSelect={(selectedItem, index) => {
            console.log(selectedItem)
            setProductShelfDedication({ ...productShelfDedication, Sex: selectedItem })
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />

       </View>
       <TextInput
          style={Styles.input}
          placeholder={productShelfDedication.Face === 0 ? 'Face' : ' '}
          keyboardType="numeric"
          onChangeText={(text) => setProductShelfDedication({ ...productShelfDedication, Face: parseInt(text, 10) || 0 })}
          value={productShelfDedication.Face === 0 ? '0' : productShelfDedication.Face.toString()}
        />
        <TextInput
          style={Styles.input}
          placeholder={productShelfDedication.Row === 0 ? 'Row' : ' '}
          keyboardType="numeric"
          onChangeText={(text) => setProductShelfDedication({ ...productShelfDedication, Row: parseInt(text, 10) || 0 })}
          value={productShelfDedication.Row === 0 ? '0' : productShelfDedication.Row.toString()}
        />
        <TextInput
          style={Styles.input}
          placeholder={productShelfDedication.Column === 0 ? 'Column' : ' '}
          keyboardType="numeric"
          onChangeText={(text) => setProductShelfDedication({ ...productShelfDedication, Column: parseInt(text, 10) || 0 })}
          value={productShelfDedication.Column === 0 ? '0' : productShelfDedication.Column.toString()}
        />
               <View style={Styles.selectorContainer}>
        <SelectDropdown
          data={Pddata}
          defaultButtonText="Product Category"
          onSelect={(selectedItem, index) => {
            setProductShelfDedication({ ...productShelfDedication, ProductCategoryName: selectedItem })
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />
        </View>
          {/* Add other input fields for other properties of productShelfDedication */}
          <Button title="Update Dedication" onPress={handleUpdateDedication} />
        </View>
      )}
    </View>
  );
};

export default UpdateProductShelfDedication;
