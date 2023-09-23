import React, { useEffect } from 'react';
import { View, Text, FlatList,Alert } from 'react-native';
import { useDataStore } from '../../component/DataHandler';
import { getOrders } from '../../services/OrderService';


const ListOrders: React.FC = () => {
    // Access the data store using the useDataStore hook
    const { orders, orderFound, setOrderFound } = useDataStore();
  
    useEffect(() => {
      // Simulate fetching orders (you should replace this with your API call)
      const fetchOrders = async () => {
        // Fetch orders from your API or wherever you store them
        const response = await getOrders();
        try{
        if (response.status === 'success') {
  
          Alert.alert('Success', 'Orders fetched successfully');
          setOrderFound(true); // Set the orderFound flag to true once orders are fetched

  
        } else {
          // Brand creation failed
          console.error('Error fetching orders:', response.message);
  
          // Show an error message to the user (you can use a custom alert component)
          Alert.alert('Error', response.message);
        }
  
      } catch (error:any) {
        console.error('Error fetching order:', error);
        Alert.alert(error);
        // Handle unexpected errors and display appropriate messages to the user
      }
      };
  
      fetchOrders();
      console.log(orders)
    }, []); // Make sure to include any dependencies if needed
  
    return (
      <View>
        <Text >Order List</Text>
        {orderFound ? (
           
          <FlatList
            data={orders}
            keyExtractor={(item) => item.OrderCode}
            renderItem={({ item }) => (
              <View>
                {/* Customize how you want to display each order */}
                <Text>Order Code: {item.OrderCode}</Text>
                <Text>Order Type: {item.OrderType}</Text>
                <Text>Assigned To: {item.AssignedTo}</Text>
                {/* Add more order details as needed */}
              </View>
            )}
          />
        ) : (
          <Text>Loading orders...</Text>
        )}
      </View>
    );
  };
  
  export default ListOrders;
  