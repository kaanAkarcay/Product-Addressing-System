import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Styles } from '../../component/Styles';
import ProductDTO from '../../dataModels/ProductDTO';
import communicator from '../../component/communicator';
import { useDataStore } from '../../component/DataHandler';

const DeleteProduct: React.FC = () => {  
  const [searchKey, setSearchKey] = useState('');
  const {product, setProduct} = useDataStore();;
  const [productFound, setProductFound] = useState<boolean>(false);

  const handleSearchProduct = async () => {
    try {
        // Simulate fetching data from API based on the product name
        const response = await communicator.get(`/Product/getProduct?barcode=${searchKey}`);
        setProduct(response.data);
        setProductFound(true);

    } catch (error) {
        console.error('Error:', error);
    }
};

  const handleDeleteProduct = async () => {
    // Simulate deleting the product
    console.log('Deleting product:', product);

    // You can now send a request to your API to delete the product with productId
    // For example:
    try {
      const response = await communicator.delete(`/Product/deleteProduct?barcode=${searchKey}`);
      if (response.status === 200) {
        console.log('Product deleted successfully');
        // Optionally, you can clear the product data or reset the form
    
        setProductFound(false);
       
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <View style={Styles.container}>

            <Text style={Styles.heading}>Product Search</Text>
            <TextInput
                style={Styles.input}
                placeholder="Enter Product barcode"
                keyboardType="numeric"
                onChangeText={setSearchKey}
                value={searchKey}
            />
            <Button title="Search Product" onPress={handleSearchProduct} />
            {productFound && (
                <View style={Styles.productDetails}>
                    <Text>Barcode: {product.Barcode}</Text>
                    <Text>Name: {product.ProductName}</Text>
                    <Text>Sex: {product.Sex}</Text>
                    {product && <Text>Brand: {product.Brand}</Text>}
                    {product && <Text>Category: {product.ProductCategory}</Text>}
                    <Button title="Ok"  onPress={() => setProductFound(false)} />
                </View>
            )}

      {productFound && (
        <View style={Styles.button}>
          <Button title="Delete Product" onPress={handleDeleteProduct} />
        </View>
      )}
    </View>
  );
};

export default DeleteProduct;