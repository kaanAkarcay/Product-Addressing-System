import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Styles } from '../../component/Styles';
import ProductDTO from '../../dataModels/ProductDTO';

const UpdateProduct: React.FC = () => {
  const [productId, setProductId] = useState<string>('');
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [brand, setBrand] = useState<string>('');
  const [productCategory, setProductCategory] = useState<string>('');

  const handleSearchProduct = async () => {
    // Simulate fetching product data based on productId
    const fetchedProduct: ProductDTO = {
      Barcode: '1234567890123',
      Product_Name: 'Sample Product',
      Sex: 'Male',
      Brand_ID: '1',
      Product_Category_ID: '2',
    };

    // Simulate fetching brand and product category
    const fetchedBrand = 'Sample Brand';
    const fetchedProductCategory = 'Sample Category';

    setProduct(fetchedProduct);
    setBrand(fetchedBrand);
    setProductCategory(fetchedProductCategory);
  };

  const handleUpdateProduct = async () => {
    // Simulate updating the product
    console.log('Updating product:', product);
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>Update Product</Text>
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
          <Text>Brand: {brand}</Text>
          <Text>Product Category: {productCategory}</Text>
        </View>
      )}

      {product && (
        <View style={Styles.button}>
          <Button title="Update Product" onPress={handleUpdateProduct} />
        </View>
      )}
    </View>
  );
};

export default UpdateProduct;
