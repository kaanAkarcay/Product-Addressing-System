import communicator from '../component/communicator';
import { useDataStore } from '../component/DataHandler';
import ProductShelfDedicationDTO from '../dataModels/ProductShelfDedicationDTO';

type ProductShelfDedicationResponse = {
    status: 'success' | 'error';
    message: string;
    ProductShelfDedication?: ProductShelfDedicationDTO;
  };
  


export const createProductShelfDedication = async (productShelfDedication: ProductShelfDedicationDTO): Promise<ProductShelfDedicationResponse> => {
    try {
      // Send the shelf data to your API for creation
      const response = await communicator.post('/ProductShelfDedication/createProductShelfDedication', productShelfDedication);
      if (response.status === 200 && response.data) {
        console.log('ProductShelfDedication created:', response.data);  
     
     // const setDataStoreShelf = useDataStore.getState().setShelf;
      //setDataStoreShelf(response.data);
  
      // Handle success and update your UI accordingly
      return { status: 'success', message: 'ProductShelfDedication created successfully', ProductShelfDedication: response.data  };
      }
      else{
          return { status: 'error', message: 'ProductShelfDedication could not be created' };
      }
    } catch (error:any) {
      console.error('Error creating Brand:', error);
      // Handle errors and display appropriate messages to the user
      const errorMessage =
        error.response?.data?.message || 'An error occurred while creating the ProductShelfDedication';
      return { status: 'error', message: errorMessage };
    }
  };

  export const searchProductShelfDedication = async (searchKey: string): Promise<ProductShelfDedicationResponse> => {
    const setDataStoreProductShelfDedicationFound = useDataStore.getState().setProductShelfDedicationFound;
    try {
      // Send the search key to your API for fetching the shelf
      const response = await communicator.get(`/ProductShelfDedication/getProductShelfDedication?id=${searchKey}`);

  
      // Check if the API call was successful and found a shelf
      if (response.status === 200 && response.data) {
        // Assuming you are using Zustand for state management, update the shelf in the data store
        const setDataStorebrand = useDataStore.getState().setBrand;
        setDataStorebrand(response.data);
        setDataStoreProductShelfDedicationFound(true);
        
  
        return { status: 'success', message: 'ProductShelfDedication found', ProductShelfDedication: response.data };
      } else {
        setDataStoreProductShelfDedicationFound(false);
        return { status: 'error', message: 'ProductShelfDedication not found' };
        

      }
    
    } catch (error:any) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while searching for the Brand';
      return { status: 'error', message: errorMessage };
    }
  };

  export const getBrands = async (): Promise<BrandResponse> => {
    try {
      // Send the search key to your API for fetching the shelf
      const response = await communicator.get(`/Brand/getBrands`);

  
      // Check if the API call was successful and found a shelf
      if (response.status === 200 && response.data) {
        // Assuming you are using Zustand for state management, update the shelf in the data store
        const setDataStorebrands = useDataStore.getState().setBrands;
        setDataStorebrands(response.data);
        
        
  
        return { status: 'success', message: 'Brands fetched', brand: response.data };
      } else {
        return { status: 'error', message: 'Brands not found' };
        

      }
    
    } catch (error:any) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while searching for the Brand';
      return { status: 'error', message: errorMessage };
    }
  };

  
  export const deleteBrand = async (searchKey: string): Promise<BrandResponse> => {
    try {
      // Send the search key to your API for fetching the shelf
      const response =await communicator.delete(`/Brand/deleteBrand?name=${searchKey}`);
      // Check if the API call was successful and found a shelf
      if (response.status === 200 && response.data) {
        // Assuming you are using Zustand for state management, update the shelf in the data store
        const setDataStorebrand = useDataStore.getState().setBrand;
        setDataStorebrand(response.data);
  
        return { status: 'success', message: 'Brand deleted', brand: response.data };
      } else {
        return { status: 'error', message: 'Brand cannot deleted' };
      }
    } catch (error:any) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while deleting the Brand';
      return { status: 'error', message: errorMessage };
    }
  };
  export const updateBrand = async (newBrand: BrandDTO): Promise<BrandResponse> => {
    try {
      // Send the search key to your API for fetching the shelf
      const response = await communicator.put(`/Brand/updateBrand`, newBrand); // Replace with your actual update endpoint
      // Check if the API call was successful and found a shelf
      if (response.status === 200 && response.data) {
        // Assuming you are using Zustand for state management, update the shelf in the data store
        const setDataStorebrand = useDataStore.getState().setBrand;
        setDataStorebrand(response.data);
  
        return { status: 'success', message: 'Brand updated', brand: response.data };
      } else {
        return { status: 'error', message: 'Brand cannot updated' };
      }
    } catch (error:any) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while updating the Brand';
      return { status: 'error', message: errorMessage };
    }
  };