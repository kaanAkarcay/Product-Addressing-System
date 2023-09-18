import communicator from '../component/communicator';
import { useDataStore } from '../component/DataHandler';
import OrderWrapperDTO from '../dataModels/OrderWrapperDTO';

type OrderResponse = {
    status: 'success' | 'error';
    message: string;
    order?: OrderWrapperDTO;
  };
  


export const createOrder = async (order: OrderWrapperDTO): Promise<OrderResponse> => {
    try {
      // Send the shelf data to your API for creation
      const response = await communicator.post('/Order/createOrder', order);
      if (response.status === 200 && response.data) {
        console.log('Order created:', response.data);  
     
     // const setDataStoreShelf = useDataStore.getState().setShelf;
      //setDataStoreShelf(response.data);
  
      // Handle success and update your UI accordingly
      return { status: 'success', message: 'Order created successfully', order: response.data  };
      }
      else{
          return { status: 'error', message: 'Order could not be created' };
      }
    } catch (error:any) {
      console.error('Error creating Order:', error);
      // Handle errors and display appropriate messages to the user
      const errorMessage =
        error.response?.data?.message || 'An error occurred while creating the Order';
      return { status: 'error', message: errorMessage };
    }
  };

  export const searchOrder = async (searchKey: string): Promise<OrderResponse> => {
    const setDataStoreOrderFound = useDataStore.getState().setOrderFound;
    try {
      // Send the search key to your API for fetching the shelf
      const response = await communicator.get(`/Order/getOrder?OrderCode=${searchKey}`);

  
      // Check if the API call was successful and found a shelf
      if (response.status === 200 && response.data) {
        // Assuming you are using Zustand for state management, update the shelf in the data store
        const setDataStoreOrder = useDataStore.getState().setOrder;
        setDataStoreOrder(response.data);
        setDataStoreOrderFound(true);
        
  
        return { status: 'success', message: 'Order found', order: response.data };
      } else {
        setDataStoreOrderFound(false);
        return { status: 'error', message: 'Order not found' };
        

      }
    } catch (error:any) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while searching for the Order';
      return { status: 'error', message: errorMessage };
    }
  };



  export const getOrders = async (): Promise<OrderResponse> => {
    const setDataStoreOrderFound = useDataStore.getState().setOrderFound;
    try {
      // Send the search key to your API for fetching the shelf
      const response = await communicator.get(`/Order/getOrders`);

  
      // Check if the API call was successful and found a shelf
      if (response.status === 200 && response.data) {
        // Assuming you are using Zustand for state management, update the shelf in the data store
        const setDataStoreOrders = useDataStore.getState().setOrders;
        setDataStoreOrders(response.data);
        setDataStoreOrderFound(true);
        
  
        return { status: 'success', message: 'Orders found' };
      } else {
        setDataStoreOrderFound(false);
        return { status: 'error', message: 'Orders not found' };
        

      }
    } catch (error:any) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while searching for the Orders';
      return { status: 'error', message: errorMessage };
    }
  };



  export const finishOrder = async (searchKey: string): Promise<OrderResponse> => {
    try {
      // Send the search key to your API for fetching the shelf
      const response =await communicator.put(`/Order/finishOrder?OrderCode=${searchKey}`);
      // Check if the API call was successful and found a shelf
      if (response.status === 200 && response.data) {
        // Assuming you are using Zustand for state management, update the shelf in the data store
        const setDataStoreOrder = useDataStore.getState().setOrder;
        setDataStoreOrder(response.data);
  
        return { status: 'success', message: 'Order finished', order: response.data };
      } else {
        return { status: 'error', message: 'Order cannot be finsihed' };
      }
    } catch (error:any) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while finishing the Order';
      return { status: 'error', message: errorMessage };
    }
  };
  export const startOrder = async (searchKey: string): Promise<OrderResponse> => {
    try {
      // Send the search key to your API for fetching the shelf
      const response =await communicator.put(`/Order/startOrder?OrderCode=${searchKey}`);
      // Check if the API call was successful and found a shelf
      if (response.status === 200 && response.data) {
        // Assuming you are using Zustand for state management, update the shelf in the data store
        const setDataStoreOrder = useDataStore.getState().setOrder;
        setDataStoreOrder(response.data);
  
        return { status: 'success', message: 'Order started', order: response.data };
      } else {
        return { status: 'error', message: 'Order cannot be started' };
      }
    } catch (error:any) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while starting the Order';
      return { status: 'error', message: errorMessage };
    }
  };