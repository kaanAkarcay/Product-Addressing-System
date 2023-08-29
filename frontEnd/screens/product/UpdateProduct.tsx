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
     if (fetchedProduct.Barcode.toLowerCase() === productId.toLowerCase()) {
      setProduct(fetchedProduct);
      setBrand(fetchedBrand);
      setProductCategory(fetchedProductCategory);
     }else{
      setProduct(null);
      
     }
   
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
        keyboardType="numeric"
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
          <TextInput
        style={Styles.input}
        placeholder="Barcode"
        keyboardType="numeric"
        onChangeText={(text) => setProduct({ ...product, Barcode: text })}
        value={product.Barcode}
      />
      <TextInput
        style={Styles.input}
        placeholder="Product Name"
        onChangeText={(text) => setProduct({ ...product, Product_Name: text })}
        value={product.Product_Name}
      />
      <TextInput
        style={Styles.input}
        placeholder="Sex"
        onChangeText={(text) => setProduct({ ...product, Sex: text })}
        value={product.Sex}
      />
      <TextInput
        style={Styles.input}
        placeholder="Brand ID"
        keyboardType="numeric"
        onChangeText={(text) => setProduct({ ...product, Brand_ID: text })}
        value={product.Brand_ID}
      />
      <TextInput
        style={Styles.input}
        placeholder="Product Category ID"
        keyboardType="numeric"
        onChangeText={(text) => setProduct({ ...product, Product_Category_ID: text })}
        value={product.Product_Category_ID}
      />
          <Button title="Update Product" onPress={handleUpdateProduct} />
        </View>
      )}
    </View>
  );
};

export default UpdateProduct;
