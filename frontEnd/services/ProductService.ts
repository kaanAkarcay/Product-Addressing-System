
// ProductService.ts
import communicator from '../component/communicator';
import { useDataStore } from '../component/DataHandler';
import ProductDTO from '../dataModels/ProductDTO';

type ProductResponse = {
  status: 'success' | 'error';
  message: string;
  product?: ProductDTO;
};

// Create a new product
export const createProduct = async (product: ProductDTO): Promise<ProductResponse> => {
  try {
    const response = await communicator.post('/Product/createProduct', product);
    if (response.status == 201 && response.data) {
      return { status: 'success', message: 'Product created successfully', product: response.data };
    } else {
      return { status: 'error', message: 'Product could not be created' };
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'An error occurred while creating the Product';
    return { status: 'error', message: errorMessage };
  }
};

// Retrieve a product by ID
export const getProduct = async (barcode: string): Promise<ProductResponse> => {
  try {
    const response = await communicator.get(`/Product/getProduct/?barcode=${barcode}`);
    if (response.status == 200 && response.data) {
      return { status: 'success', message: 'Product found', product: response.data };
    } else {
      return { status: 'error', message: 'Product not found' };
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'An error occurred while fetching the Product';
    return { status: 'error', message: errorMessage };
  }
};

// Retrieve a product by ID
export const getProducts = async (): Promise<ProductResponse> => {
  try {
    const response = await communicator.get(`/Product/getProducts`);
    if (response.status == 200 && response.data) {
      const setDataStoreProducts = useDataStore.getState().setProducts;
      setDataStoreProducts(response.data);
      return { status: 'success', message: 'Products found' };
    } else {
      return { status: 'error', message: 'Products not found' };
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'An error occurred while fetching the Products';
    return { status: 'error', message: errorMessage };
  }
};


// Update an existing product
export const updateProduct = async (
 
  product: ProductDTO
): Promise<ProductResponse> => {
  try {
    const response = await communicator.put(`/Product/updateProduct`, product);
    if (response.status == 200 && response.data) {
      return { status: 'success', message: 'Product updated', product: response.data };
    } else {
      return { status: 'error', message: 'Product could not be updated' };
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'An error occurred while updating the Product';
    return { status: 'error', message: errorMessage };
  }
};

// Delete a product by ID
export const deleteProduct = async (id: string): Promise<ProductResponse> => {
  try {
    const response = await communicator.delete(`/Product/deleteProduct/${id}`);
    if (response.status ==200 && response.data) {
      return { status: 'success', message: 'Product deleted', product: response.data };
    } else {
      return { status: 'error', message: 'Product could not be deleted' };
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'An error occurred while deleting the Product';
    return { status: 'error', message: errorMessage };
  }
};
