import React, { useEffect ,useState} from 'react';
import { View, Text, FlatList, Alert, TextInput,Button } from 'react-native';
import { useDataStore } from '../../component/DataHandler';
import { searchOrder, startOrder } from '../../services/OrderService';
import { Styles } from '../../component/Styles';

const StartOrder: React.FC = () => {
    const [searchKey, setSearchKey] = useState('');
    const {order, setOrder} = useDataStore();;
    const {orderFound, setOrderFound} = useDataStore();


    const handleSearchOrder = async () => {
        try {
          // Simulate fetching data from API based on the product name
          const response = await searchOrder(searchKey);
          if (response.status == 'success') {
            let tempOrder = {...order};
  
            // Make required modifications to this local copy
            
            tempOrder = {...tempOrder, ...response.order};
              Alert.alert(response.message)
              
              response.order && setOrder(tempOrder);
              setOrderFound(true);
                console.log('screen'+order)
          }
          else{
              Alert.alert(response.message)
          }
      
      } catch (error:any) {
          Alert.alert(error)
      }
    };
    
      const handlestartProduct = async () => {
        // Simulate deleting the product
        console.log('starting order:', order);
    
        // You can now send a request to your API to delete the product with productId
        // For example:
        try {
          const response = await startOrder(searchKey)
          if (response.status == 'success') {
            console.log('order started successfully');
            Alert.alert(response.message)
            // Optionally, you can clear the product data or reset the form
        
            setOrderFound(false);
           
          } else {
            Alert.alert(response.message)
          }
        } catch (error:any) {
          Alert.alert(error)
        }
      };
    
    return (
        <View style={Styles.container}>
    
                <Text style={Styles.heading}>Order Search</Text>
                <TextInput
                    style={Styles.input}
                    placeholder="Enter Order code"
                    
                    onChangeText={setSearchKey}
                    value={searchKey}
                />
                <Button title="Search Product" onPress={handleSearchOrder} />
                {orderFound && (
                    <View style={Styles.productDetails}>
                        <Text>order code: {order.OrderCode}</Text>
                        <Text>type: {order.OrderType}</Text>
                        
                        <Button title="Ok"  onPress={() => setOrderFound(false)} />
                    </View>
                )}
    
          {orderFound && (
            <View style={Styles.button}>
              <Button title="Start Order" onPress={handlestartProduct} />
            </View>
          )}
        </View>
      );
};

export default StartOrder;