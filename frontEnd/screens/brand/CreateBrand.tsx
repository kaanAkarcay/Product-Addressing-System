import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import BrandDTO from '../../dataModels/BrandDTO';
import { Styles } from '../../component/Styles';

const CreateBrand: React.FC = () => {
  const [brand, setBrand] = useState<BrandDTO>({
    BrandName:''
  });

  const handleCreateProduct = async () => {
   //to be handled
   console.log("handlind data..");
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>Brand Creation</Text>
      <TextInput
        style={Styles.input}
        placeholder="Name"
        keyboardType="numeric"
        onChangeText={(text) => setBrand({ ...brand, BrandName: text })}
        value={brand.BrandName}
      />
     
      <View style={Styles.button}>
      <Button  title="Create Brand" onPress={handleCreateProduct} />
      </View>
    
    </View>
  );
};



export default CreateBrand;
