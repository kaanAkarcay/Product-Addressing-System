import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Styles } from '../../component/Styles';
import ProductDTO from '../../dataModels/ProductDTO';

const DeleteProduct: React.FC = () => {
  const [productId, setProductId] = useState<string>('');
  const [product, setProduct] = useState<ProductDTO | null>(null);

  const handleSearchProduct = async () => {
    // Simulate fetching product data based on productId
    const fetchedProduct: ProductDTO = {
      Barcode: '1234567890123',
      Product_Name: 'Sample Product',
      Sex: 'Male',
      Brand_ID: '1',
      Product_Category_ID: '2',
    };

    setProduct(fetchedProduct);
  };

  const handleDeleteProduct = async () => {
    // Simulate deleting the product
    console.log('Deleting product:', product);
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>Delete Product</Text>
      <TextInput
        style={Styles.input}
        placeholder="Enter Product ID"
        onChangeText={setProductId}
        value={productId}
      />
      <View style={Styles.button}>
        <Button title="Search Product" onPress={handleSearchProduct} />
      </View>

      {product && (
        <View style={Styles.productDetails}>
          <Text>Barcode: {product.Barcode}</Text>
          <Text>Product Name: {product.Product_Name}</Text>
          <Text>Sex: {product.Sex}</Text>
          <Text>Brand ID: {product.Brand_ID}</Text>
          <Text>Product Category ID: {product.Product_Category_ID}</Text>
        </View>
      )}

      {product && (
        <View style={Styles.button}>
          <Button title="Delete Product" onPress={handleDeleteProduct} />
        </View>
      )}
    </View>
  );
};

export default DeleteProduct;
