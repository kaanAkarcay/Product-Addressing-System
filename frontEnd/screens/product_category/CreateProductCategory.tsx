import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import Product_CategoryDTO from '../../dataModels/ProductCategoryDTO';
import { Styles } from '../../component/Styles';

const CreateProductCategory: React.FC = () => {
  const [productCategory, setBrand] = useState<Product_CategoryDTO>({
    Product_Category_Name:''
  });

  const handleCreateProductCategory = async () => {
   //to be handled
   console.log("handlind data..");
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>Product Category Creation</Text>
      <TextInput
        style={Styles.input}
        placeholder="Name"
        onChangeText={(text) => setBrand({ ...productCategory, Product_Category_Name: text })}
        value={productCategory.Product_Category_Name}
      />
     
      <View style={Styles.button}>
      <Button  title="Create Product Category" onPress={handleCreateProductCategory} />
      </View>
    
    </View>
  );
};



export default CreateProductCategory;
