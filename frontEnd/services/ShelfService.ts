// ShelfService.ts

import communicator from '../component/communicator';
import { useDataStore } from '../component/DataHandler';
import ShelfDTO from '../dataModels/ShelfDTO';

type ShelfResponse = {
    status: 'success' | 'error';
    message: string;
    shelf?: ShelfDTO;
  };
  


export const createShelf = async (shelf: ShelfDTO): Promise<ShelfResponse> => {
  try {
    // Send the shelf data to your API for creation
    const response = await communicator.post('/Shelf/createShelf', shelf); // Replace with your actual create endpoint
    if (response.status === 200 && response.data) {
    console.log('Shelf created:', response.data);

   
   // const setDataStoreShelf = useDataStore.getState().setShelf;
    //setDataStoreShelf(response.data);

    // Handle success and update your UI accordingly
    return { status: 'success', message: 'Shelf created successfully', shelf: response.data  };
    }
    else{
        return { status: 'error', message: 'Shelf could not be created' };
    }
  } catch (error:any) {
    console.error('Error creating Shelf:', error);
    // Handle errors and display appropriate messages to the user
    const errorMessage =
      error.response?.data?.message || 'An error occurred while creating the shelf';
    return { status: 'error', message: errorMessage };
  }
};

export const searchShelf = async (searchKey: string): Promise<ShelfResponse> => {
    const setDataStoreShelfFound = useDataStore.getState().setShelfFound;
    try {
      // Send the search key to your API for fetching the shelf
      const response = await communicator.get(`/Shelf/getShelf?shelfName=${searchKey}`);

  
      // Check if the API call was successful and found a shelf
      if (response.status === 200 && response.data) {
        // Assuming you are using Zustand for state management, update the shelf in the data store
        const setDataStoreShelf = useDataStore.getState().setShelf;
        setDataStoreShelf(response.data);
        setDataStoreShelfFound(true);
        
  
        return { status: 'success', message: 'Shelf found', shelf: response.data };
      } else {
        setDataStoreShelfFound(false);
        return { status: 'error', message: 'Shelf not found' };
        

      }
    } catch (error:any) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while searching for the shelf';
      return { status: 'error', message: errorMessage };
    }
  };

  export const deleteShelf = async (searchKey: string): Promise<ShelfResponse> => {
    try {
      // Send the search key to your API for fetching the shelf
      const response = await communicator.delete(`/Shelf/deleteShelf?shelfName=${searchKey}`);  
      // Check if the API call was successful and found a shelf
      if (response.status === 200 && response.data) {
        // Assuming you are using Zustand for state management, update the shelf in the data store
        const setDataStoreShelf = useDataStore.getState().setShelf;
        setDataStoreShelf(response.data);
  
        return { status: 'success', message: 'Shelf deleted', shelf: response.data };
      } else {
        return { status: 'error', message: 'Shelf cannot deleted' };
      }
    } catch (error:any) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while deleting the shelf';
      return { status: 'error', message: errorMessage };
    }
  };
  export const updateShelf = async (newShelf: ShelfDTO): Promise<ShelfResponse> => {
    try {
      // Send the search key to your API for fetching the shelf
      const response = await communicator.put(`/Shelf/updateShelf`,newShelf);  
      // Check if the API call was successful and found a shelf
      if (response.status === 200 && response.data) {
        // Assuming you are using Zustand for state management, update the shelf in the data store
        const setDataStoreShelf = useDataStore.getState().setShelf;
        setDataStoreShelf(response.data);
  
        return { status: 'success', message: 'Shelf updated', shelf: response.data };
      } else {
        return { status: 'error', message: 'Shelf cannot updated' };
      }
    } catch (error:any) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while updating the shelf';
      return { status: 'error', message: errorMessage };
    }
  };