import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { Styles } from '../../component/Styles';
import SelectDropdown from 'react-native-select-dropdown'
import { useDataStore } from '../../component/DataHandler';
import { createOrder } from '../../services/OrderService';
import OrderWrapperDTO from '../../dataModels/OrderWrapperDTO';


const CreateOrder: React.FC = () => {
  const { order, setOrder } = useDataStore();
  const orderTypes=  ["Insertion Order", "Picking Order"]
  const [products, setProducts] = useState<string[]>([]);
  const [productBarcode, setProductBarcode] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change:any) => {
    // Ensure quantity is at least 1
    const newQuantity = Math.max(quantity + change, 1);
    setQuantity(newQuantity);
  };
    
    const handleTypeSelect = (type:string) =>{
            if (type =='Insertion Order')
            setOrder({...order, OrderType:'0'})
        else
        setOrder({...order, OrderType:'1'})



    }
    const handleAddProduct= ()=>{
        console.log('handling products')
        const newProducts = Array(quantity).fill(productBarcode);
        setProducts([...products, ...newProducts]);
        console.log(products)

    }
  const handleCreateOrder = async () => {
    try {
      setOrder({...order, AssignedTo:'admin'})
      setOrder({ ...order, ProductBarcodes: [...order.ProductBarcodes, ...products] });

      // const a = {
      //   AssignedTo:'admin',
      //   ProductBarcodes:products,
      //   OrderCode:'',
      //   OrderType:"1"
      // }
    

      
        //setOrder(a)
        console.log(order)
        console.log(products)
      // Call the createBrand service to create a new brand
      const response = await createOrder(order);

      if (response.status === 'success') {
        // Brand creation was successful
        

        // Clear the input field and update your UI accordingly
       

        // Show a success message to the user (you can use a custom alert component)
        Alert.alert('Success', 'Order created successfully');

      } else {
        // Brand creation failed
        console.error('Error creating order:', response.message);

        // Show an error message to the user (you can use a custom alert component)
        Alert.alert('Error', response.message);
      }

    } catch (error:any) {
      console.error('Error creating order:', error);
      Alert.alert(error);
      // Handle unexpected errors and display appropriate messages to the user
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>Order Creation</Text>
      <View style={Styles.selectorContainer}>
        <SelectDropdown 
          data={orderTypes}
          defaultButtonText="Select Order Type"
          onSelect={(selectedItem, index) => {
            console.log(selectedItem)
            handleTypeSelect(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />

       </View>
       
       <View>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Enter Product Barcode"
        onChangeText={(text) => setProductBarcode(text)}
        value={productBarcode}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, padding: 10, marginRight: 10 }}
          placeholder="Enter Quantity"
          keyboardType="numeric"
          onChangeText={(text) => {
            // Validate input to ensure it's a positive number
            const newQuantity = parseInt(text, 10);
            if (!isNaN(newQuantity) && newQuantity >= 1) {
              setQuantity(newQuantity);
            }
          }}
          value={quantity.toString()}
        />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => handleQuantityChange(1)}>
            <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleQuantityChange(-1)}>
            <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>-</Text>
          </TouchableOpacity>
        </View>
        <Button title="Add product To Order" onPress={handleAddProduct} />
      </View>
    </View>

      <View style={Styles.button}>
        <Button title="Create order" onPress={handleCreateOrder} />
      </View>
    </View>
  );
};

export default CreateOrder;
