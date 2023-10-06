import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View ,TextInput,Button, TouchableOpacity} from 'react-native';
import TabNavigation from '../navigation/TabNavigation';
import MyBarCodeScanner from '../component/BarcodeScanner';
import { Styles } from '../component/Styles';
import communicator from '../component/communicator';
import ProductInsertionWrapperDTO from '../dataModels/ProductInsertionWrapperDTO';
import { useDataStore } from '../component/DataHandler';
import { getBrands } from '../services/BrandService';
import { getProducts } from '../services/ProductService';
import { getProductCategories } from '../services/ProductCategoryService';
export default function InsertProduct() {
  const {request, setRequest} = useDataStore();
  const [searchKey, setSearchKey] = useState('');
  const [Insertion, setInsertion] = useState<ProductInsertionWrapperDTO>({
    ProductBarcode:'',
    Address:'',
    AddressedBy:'admin',
    Quantity:'1'
  });
  const [selectedBrand, setSelectedBrand] = useState('');
const [selectedProductCategory, setSelectedProductCategory] = useState('');
const { brands, productCategories } = useDataStore();

useEffect(() => {

  getBrands(); // Fetch brands and update the brands state in your data store
  getProductCategories(); // Fetch product categories and update the productCategories state
}, []);


const handleQuantityChange = (value:any) => {
  const currentQuantity = parseInt(Insertion.Quantity, 10); // Parse to an integer
  if (!isNaN(currentQuantity)) {
    // Check if it's a valid number
    const newQuantity = currentQuantity + value;
    setInsertion({ ...Insertion, Quantity: newQuantity.toString() }); // Convert back to a string
  }
};



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
      <Text style={Styles.heading}>Insert product</Text>
      <TextInput
        style={[Styles.input, Styles.input]}
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
            style={[Styles.input, Styles.input]}
            placeholder="Product Barcode"
            keyboardType="numeric"
            onChangeText={(text) => setInsertion({ ...Insertion, ProductBarcode: text })}
            value={Insertion.ProductBarcode}
          />
          <TextInput
            style={[Styles.input, Styles.inputQ]}
            placeholder="Address"
            onChangeText={(text) => setInsertion({ ...Insertion, Address: text })}
            value={Insertion.Address}
          />
          <View style={Styles.quantityContainer}>
          <TextInput
          style={Styles.QuantityTextField}
          placeholder={"Quantity"}
          keyboardType="numeric"
          onChangeText={(text) => setInsertion({ ...Insertion, Quantity: text})}
          value={Insertion.Quantity}
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
          <Button title="Insert" onPress={handleInsertion} />
        </View>
      )}
    </View>

    );
  }
  
  