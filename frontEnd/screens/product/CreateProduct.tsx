import React, { useState } from 'react';
import { View, Text, TextInput, Button,Alert } from 'react-native';
import ProductDTO from '../../dataModels/ProductDTO';
import { Styles } from '../../component/Styles';
import communicator from '../../component/communicator';
import { useDataStore } from '../../component/DataHandler';

const CreateProduct: React.FC = () => {

  const {product,setProduct} = useDataStore();
 
  const handleCreateProduct = async () => {
    // Simulate creating the product
    console.log('Creating Product:', product);

    try {
      const response = await communicator.post('/Product/createProduct', product);
  
      // If the API responds with a status code of 400 (Bad Request)
      if (response.status === 400 && response.data && response.data.ModelState) {
        // Display the ModelState error
        const modelStateError = Object.values(response.data.ModelState)
          .map(errorArray => (Array.isArray(errorArray) ? errorArray.join(', ') : errorArray))
          .join('\n');
          setTimeout(() => {
            Alert.alert('Error', modelStateError);
          }, 100);
          
        return;
      }
  
      console.log('Product created successfully:', response.data);
  
      // Optionally, you can clear the form or reset the product state
      setProduct({
        Barcode: '',
        ProductName: '',
        Sex: '',
        Brand: '',
        ProductCategory: '',
      });
    } catch (error:any) {
      // Here, we assume that the `error` object has a `response` property
      if (error.response && error.response.status === 400 && error.response.data && error.response.data.ModelState) {
        const modelStateError = Object.values(error.response.data.ModelState)
          .map(errorArray => (Array.isArray(errorArray) ? errorArray.join(', ') : errorArray))
          .join('\n');
        Alert.alert('Error', modelStateError);
      } else {
        console.error('Error creating product:', error);
      }
    }
  };

  
  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>Product Creation</Text>
      <TextInput
          style={Styles.input}
          placeholder={'Barcode'}
          keyboardType="numeric"
          onChangeText={(text) => setProduct({ ...product, Barcode: text})}
          value={product.Barcode}
        />

      <TextInput
        style={Styles.input}
        placeholder="Product Name"
        onChangeText={(text) => setProduct({ ...product, ProductName: text })}
        value={product.ProductName}
      />
      <TextInput
        style={Styles.input}
        placeholder="Sex"
        onChangeText={(text) => setProduct({ ...product, Sex: text })}
        value={product.Sex}
      />
      <TextInput
        style={Styles.input}
        placeholder="Brand Name"
        onChangeText={(text) => setProduct({ ...product, Brand: text })}
        value={product.Brand}
      />
     
      <TextInput
        style={Styles.input}
        placeholder="Product Category Name"
        onChangeText={(text) => setProduct({ ...product, ProductCategory: text })}
        value={product.ProductCategory}
      />
     
      <View style={Styles.button}>
        <Button title="Create Product" onPress={handleCreateProduct} />
      </View>
    </View>
  );
};

export default CreateProduct;
