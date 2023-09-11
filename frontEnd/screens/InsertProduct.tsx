import React, { useState } from 'react';
import { StyleSheet, Text, View ,TextInput,Button} from 'react-native';
import TabNavigation from '../navigation/TabNavigation';
import MyBarCodeScanner from '../component/BarcodeScanner';
import { Styles } from '../component/Styles';
import communicator from '../component/communicator';
import ProductInsertionWrapperDTO from '../dataModels/ProductInsertionWrapperDTO';
import { useDataStore } from '../component/DataHandler';

export default function InsertProduct() {
  const {request, setRequest} = useDataStore();
  const [searchKey, setSearchKey] = useState('');
  const [Insertion, setInsertion] = useState<ProductInsertionWrapperDTO>({
    ProductBarcode:'',
    Address:'',
    AddressedBy:'',
    Quantity:''
  });

 


    const handleRequest = async () => { 
      try{
        const response = await communicator.get(`/ProductAdressing/getRequest?barcode=${searchKey}`);
        // Check if the API call was successful and found a product category
        if (response.status === 200 && response.data) {
            setRequest(response.data);
            
        } else {
  
        }
    } catch (error) {
        console.error('Error:', error);
     
    }
    }

    const handleInsertion = async () => {
      try{
        const response = await communicator.post(`/ProductAdressing/insertProduct`,Insertion);
        // Check if the API call was successful and found a product category
        if (response.status === 200 && response.data) {
            setRequest("");
            
        } else {
  
        }
    } catch (error) {
        console.error('Error:', error);
     
    }
     }

    return (
      <View style={Styles.container}>
      <Text style={Styles.heading}>Shelf Search</Text>
      <TextInput
          style={Styles.input}
          placeholder="Enter Barcode for request"
          onChangeText={setSearchKey}
          value={searchKey}
      />
      <Button title="Get Request" onPress={handleRequest} />
      {request && (
          <View style={Styles.productDetails}>
              <Text>Request: {request}</Text>  
              <Text style={Styles.heading}>Insertion</Text>
      <TextInput
        style={Styles.input}
        placeholder="Product Barcode"
        keyboardType="numeric"
        onChangeText={(text) => setInsertion({ ...Insertion, ProductBarcode: text })}
        value={Insertion.ProductBarcode}
      />
          <TextInput
          style={Styles.input}
          placeholder={"Address"}
          
          onChangeText={(text) => setInsertion({ ...Insertion, Address: text})}
          value={Insertion.Address}
        />
        <TextInput
          style={Styles.input}
          placeholder={"Addressed By:"}
 
          onChangeText={(text) => setInsertion({ ...Insertion, AddressedBy: text})}
          value={Insertion.AddressedBy}
        />
        <TextInput
          style={Styles.input}
          placeholder={"Quantity"}
          keyboardType="numeric"
          onChangeText={(text) => setInsertion({ ...Insertion, Quantity: text})}
          value={Insertion.Quantity}
        />
              <Button title="Insert"  onPress={handleInsertion} />

          </View>
      )}
                </View>

    );
  }
  
  