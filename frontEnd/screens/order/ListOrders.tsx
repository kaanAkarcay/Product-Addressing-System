import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useDataStore } from '../../component/DataHandler';
import { getOrders } from '../../services/OrderService';
import OrderWrapperDTO from '../../dataModels/OrderWrapperDTO';
import { Styles } from '../../component/Styles';

const ListOrders: React.FC = () => {
    const { orders, setOrders } = useDataStore();
    const [loading, setLoading] = useState(true);
    type OrderData = {
        Id?: number;
        OrderType: number;
        AssignedTo: string;
        OrderCode: string;
        ProductBarcodes: number[];
    };
    
    const [data, setData] = useState<OrderData[]>([]);
    
    useEffect(() => {
      if(!loading){
        return
      }
        const fetchOrders = async () => {
            try {
                const response = await getOrders();
                if (response.orders) {
               
                    setLoading(false);
                }
                
            } catch (error) {
                console.error("Error fetching orders:", error);
                Alert.alert("Error", "Failed to fetch orders.");
                setLoading(false);
            }
        };
        fetchOrders();
    }, [loading,orders]);  // Only run once when component mounts

    if (loading) {
        return <Text>Loading orders...</Text>;
    }
   
    
    return (
        <View style={Styles.container} >
            <Text style={Styles.heading}>Order List</Text>
            {data.map((item, index) => (
                <View key={item.Id?.toString() ?? `defaultKey_${index}`}>
                   {/* <Text>Order Code: {item.OrderCode !== undefined ? item.OrderCode : "N/A"}</Text>
                   <Text>Order Type: {item.OrderType !== undefined ? item.OrderType : "N/A"}</Text>
                   <Text>Assigned To: {item.AssignedTo || "N/A"}</Text> */}
                   <Text>{item}</Text>

                </View>
            ))}
        </View>
    );
};

export default ListOrders;
