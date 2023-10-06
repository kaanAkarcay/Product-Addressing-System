import communicator from '../component/communicator';
import { useDataStore } from '../component/DataHandler';
import ProductInsertionWrapperDTO from '../dataModels/ProductInsertionWrapperDTO';
import ProductRemovalWrapperDTO from '../dataModels/ProductRemovalWrapperDTO';

type AdressingResponse = {
    status: 'success' | 'error';
    message: string;
  };
  
  export const insertProduct = async (product: ProductInsertionWrapperDTO): Promise<AdressingResponse> => {
  
    try {
        const response = await communicator.post(`/ProductAdressing/insertProduct`,product);

  
  
      if (response.status === 200 && response.data) {

        
  
        return { status: 'success', message: 'insertsion done' };
      } else {
      
        return { status: 'error', message: 'insertsion can not be done' };
        

      }
    
    } catch (error:any) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while inserting the Product';
      return { status: 'error', message: errorMessage };
    }
  };

  export const removeProduct = async (product: ProductRemovalWrapperDTO): Promise<AdressingResponse> => {
  
    try {
        const response = await communicator.patch(`/ProductAdressing/removeProduct`,product);

  
  
      if (response.status === 200 && response.data) {

        
  
        return { status: 'success', message: 'removal done' };
      } else {
      
        return { status: 'error', message: 'removal can not be done' };
        

      }
    
    } catch (error:any) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while inserting the Product';
      return { status: 'error', message: errorMessage };
    }
  };