import React from 'react';
import create from 'zustand';
import ProductDTO from '../dataModels/ProductDTO';
import { communicator } from './communicator';

type DataHandlerState = {
    products: ProductDTO[];
    foundProduct: ProductDTO | null;
  };
  
  type DataHandlerActions = {
    setProducts: (products: ProductDTO[]) => void;
    setFoundProduct: (product: ProductDTO | null) => void;
    getProduct: (productId: number) => Promise<void>; // Added this
    createProduct: (product: ProductDTO) => Promise<void>; // And this
  };
  type DataHandlerProps = {
    children: (dataHandler: DataHandler) => React.ReactNode;
  };
  

  type DataHandler = DataHandlerState & DataHandlerActions;
const useDataHandler = create<DataHandler>((set) => ({
  products: [],
  foundProduct: null,
  setProducts: (products: any) => set({ products }),
  setFoundProduct: (product: any) => set({ foundProduct: product }),
   
  // Placeholder implementations for the methods
  getProduct: async (productId: number) => {
    // Logic for getting a product
  },
  createProduct: async (product: ProductDTO) => {
    // Logic for creating a product
  },
  // ... Add placeholder implementations for other methods like `updateProduct`, `deleteProduct`, etc.
}));

const DataHandler: React.FC<DataHandlerProps> = ({ children }) => {
  const { setProducts, setFoundProduct } = useDataHandler();

  const getProduct = async (productId: number) => {
    const response = await communicator.get<ProductDTO>(`/products/${productId}`);
    setFoundProduct(response.data);
  };

  const createProduct = async (product: ProductDTO) => {
    const response = await communicator.post<ProductDTO>('/products', product);
    // Handle post response, if needed
  };

  // Implement other CRUD operations...

  const dataHandler: DataHandler = {
    products: useDataHandler.getState().products,
    foundProduct: useDataHandler.getState().foundProduct,
    setProducts,
    setFoundProduct,
    getProduct,
    createProduct,
    // ... other methods
  };

  return <>{children(dataHandler)}</>;
};

export default DataHandler;


{/* <DataHandlerComponent>
  {(dataHandler) => (
     use dataHandler here 
  )}
</DataHandlerComponent> */}