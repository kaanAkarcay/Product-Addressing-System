import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import ProductDTO from '../../dataModels/ProductDTO';
import { Styles } from '../../component/Styles';

const CreateProduct: React.FC = () => {
  const [product, setProduct] = useState<ProductDTO>({
    Barcode: '',
    Product_Name: '',
    Sex: '',
    Brand_ID: '',
    Product_Category_ID: '',
  });

  const handleCreateProduct = async () => {
   //to be handled
   console.log("handlind data..");
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>Product Creation</Text>
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
      <View style={Styles.button}>
      <Button  title="Create Product" onPress={handleCreateProduct} />
      </View>
    
    </View>
  );
};



export default CreateProduct;
