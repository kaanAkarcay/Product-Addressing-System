import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import ProductCategoryDTO from '../../dataModels/ProductCategoryDTO';
import { Styles } from '../../component/Styles';
import communicator from '../../component/communicator'; // Import your communicator
import { useDataStore } from '../../component/DataHandler';

const DeleteProductCategory: React.FC = () => {

  const [searchKey, setSearchKey] = useState('');
    const {productCategory, setProductCategory} = useDataStore();
    const [productCategoryFound, setProductCategoryFound] = useState<boolean>(false);

    const reset : ProductCategoryDTO = {
        ProductsCategoryName : ''
    }

    const handleSearchProductCategory = async () => {
        try {
            // Make an API call to search for a product category by name
            const response = await communicator.get(`/ProductCategory/getProductCategory?name=${searchKey}`);
            
            // Check if the API call was successful and found a product category
            if (response.status === 200 && response.data) {
                setProductCategory(response.data);
                setProductCategoryFound(true);

            } else {
                setProductCategory(reset);
            }
        } catch (error) {
            console.error('Error:', error);
            setProductCategory(reset);
        }
    };


  const handleDeleteProductCategory = async () => {
    try {
      // Send a request to your API to delete the product category by its ID
      const response = await communicator.delete(`/ProductCategory/deleteProductCategory?name=${productCategory.ProductsCategoryName}`); // Replace with your actual delete endpoint
      console.log('Product Category deleted:', response.data);
      setProductCategoryFound(false);
      // Handle success and update your UI accordingly
      setProductCategory(reset);// Clear the found product category
    } catch (error) {
      console.error('Error deleting Product Category:', error);
      // Handle errors and display appropriate messages to the user
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>Product Category Search</Text>
      <TextInput
        style={Styles.input}
        placeholder="Enter Product Category Name"
        onChangeText={setSearchKey}
        value={searchKey}
      />
      <Button title="Search Product Category" onPress={handleSearchProductCategory} />
      {productCategoryFound && (
        <View style={Styles.productDetails}>
          <Text>Yes, that Product Category exists.</Text>
          <Text>Name: {productCategory.ProductsCategoryName}</Text>
          {/* Render other product category details here */}
          <Button title="Ok"  onPress={() => setProductCategoryFound(false)} />

        </View>
      )}
      {productCategoryFound && (
        <View style={Styles.button}>
          <Button title="Delete Product Category" onPress={handleDeleteProductCategory} />
        </View>
      )}
    </View>
  );
};

export default DeleteProductCategory;
