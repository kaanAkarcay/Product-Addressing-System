import create from 'zustand';
import ProductDTO from '../dataModels/ProductDTO';
import BrandDTO from '../dataModels/BrandDTO';
import ProductCategoryDTO from '../dataModels/ProductCategoryDTO';
import ShelfDTO from '../dataModels/ShelfDTO';

// Define the shape of your data store
type DataStore = {
  products: ProductDTO[]; // Example data: an array of products
  product:ProductDTO;
  productFound:Boolean;
  productCategory: ProductCategoryDTO;
  productCategoryFound:Boolean;
  brand:BrandDTO;
  brandFound:Boolean;
  shelf:ShelfDTO;
  shelfFound:Boolean;
  request:string;
  setRequest:(request:string) => void;
  setShelf:(shelf: ShelfDTO) => void;
  setProductCategory:(ProductCategory: ProductCategoryDTO) => void;
  setBrand:(brand: BrandDTO) => void;
  setProduct:(product: ProductDTO) => void;
  setProducts: (products: ProductDTO[]) => void;
};

// Create your Zustand store
export const useDataStore = create<DataStore>((set) => ({
  products: [], // Initialize with an empty array
  product: {
    Barcode:'',
    ProductName: '',
    Sex: '',
    Brand: '',
    ProductCategory: ''
  },
  brand: {
    BrandName : '',
  },
  productCategory:{
    ProductsCategoryName: ''
  },
  shelf:{
    ShelfName: '',
    Row: 0,
    Column: 0,
    Face: 0
  },
  request:'',
  productFound: false,
  productCategoryFound: false,
  shelfFound: false,
  brandFound: false,
  setRequest:(request:string) => set(({request})),
  setProductFound: (productFound:boolean) => set({productFound}),
  setProductCategoryFound: (productCategoryFound:boolean) => set({productCategoryFound}),
  setShelfFound: (shelfFound:boolean) => set({shelfFound}),
  setBrandFound: (brandFound:boolean) => set({brandFound}),
  setShelf:(shelf) => set ({shelf}),
  setProductCategory:(productCategory) => set({productCategory}),
  setBrand: (brand) => set({brand}),
  setProduct: (product) => set({product}),
  setProducts: (products) => set({ products }), // Function to set products in the store

}));
