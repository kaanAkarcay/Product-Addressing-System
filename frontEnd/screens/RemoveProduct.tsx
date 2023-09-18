import React, { useState } from 'react';
import { StyleSheet, Text, View ,TextInput,Button, TouchableOpacity} from 'react-native';
import TabNavigation from '../navigation/TabNavigation';
import MyBarCodeScanner from '../component/BarcodeScanner';
import { Styles } from '../component/Styles';
import communicator from '../component/communicator';
import ProductRemovalWrapperDTO from '../dataModels/ProductRemovalWrapperDTO';
import { useDataStore } from '../component/DataHandler';

export default function RemoveProduct() {
  const [removal, setRemoval] = useState<ProductRemovalWrapperDTO>({
    ProductBarcode:'',
    Address:'',
    PickedBy:'admin',
    Quantity:'1'
  });

 
  const handleQuantityChange = (value:any) => {
    const currentQuantity = parseInt(removal.Quantity, 10); // Parse to an integer
    if (!isNaN(currentQuantity)) {
      // Check if it's a valid number
      const newQuantity = currentQuantity + value;
      setRemoval({ ...removal, Quantity: newQuantity.toString() }); // Convert back to a string
    }
  };

    const handleRemoval = async () => {
      try{
        const response = await communicator.patch(`/ProductAdressing/removeProduct`,removal);
        // Check if the API call was successful and found a product category
        if (response.status === 200 && response.data) {
            setRemoval({
                ProductBarcode:'',
                Address:'',
                PickedBy:'',
                Quantity:''
              });
            
        } else {
  
        }
    } catch (error) {
        console.error('Error:', error);
     
    }
     }

    return (
  
          <View style={Styles.container}>
              <Text style={Styles.heading}>Removal</Text>
      <TextInput
        style={Styles.input}
        placeholder="Product Barcode"
        keyboardType="numeric"
        onChangeText={(text) => setRemoval({ ...removal, ProductBarcode: text })}
        value={removal.ProductBarcode}
      />
          <TextInput
          style={Styles.input}
          placeholder={"Address"}
          
          onChangeText={(text) => setRemoval({ ...removal, Address: text})}
          value={removal.Address}
        />
       
               <View style={Styles.quantityContainer}>
               <Text style={Styles.quantityButtons}>Quantity : </Text>
          <TextInput
          style={Styles.QuantityTextField}
          placeholder={"Quantity"}
          keyboardType="numeric"
          onChangeText={(text) => setRemoval({ ...removal, Quantity: text})}
          value={removal.Quantity}
        />
            <View style={Styles.quantityButtons}>
            
              <TouchableOpacity onPress={() => handleQuantityChange(1)}>
                <Text style={Styles.quantityButton}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleQuantityChange(-1)}>
                <Text style={Styles.quantityButton}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
              <Button title="Remove"  onPress={handleRemoval} />

          </View>
   

    );
  }
  
  