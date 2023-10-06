import create from 'zustand';
import ProductDTO from '../dataModels/ProductDTO';
import BrandDTO from '../dataModels/BrandDTO';
import ProductCategoryDTO from '../dataModels/ProductCategoryDTO';
import ShelfDTO from '../dataModels/ShelfDTO';
import OrderWrapperDTO from '../dataModels/OrderWrapperDTO';
import ProductShelfDedicationDTO from '../dataModels/ProductShelfDedicationDTO';

// Define the shape of your data store
type DataStore = {
  products: ProductDTO[]; // Example data: an array of products
  product:ProductDTO;
  productFound:Boolean;

  productShelfDedication:ProductShelfDedicationDTO;
  productShelfDedications:ProductShelfDedicationDTO[];
  productShelfDedicationFound:Boolean;

  productCategory: ProductCategoryDTO;
  productCategories: ProductCategoryDTO[];
  productCategoryFound:Boolean;
  
  brand:BrandDTO;
  brands:BrandDTO[];
  brandFound:Boolean;

  shelf:ShelfDTO;
  shelves:ShelfDTO[];
  shelfFound:Boolean;

  order:OrderWrapperDTO;
  orders:OrderWrapperDTO[];
  orderFound:Boolean;

  request:string;
  setRequest:(request:string) => void;

  setOrder:(order:OrderWrapperDTO) => void;
  setOrders:(orders:OrderWrapperDTO[]) => void;
  setOrderFound:(orderFound:boolean) => void;

  setProductShelfDedication:(productShelfDedication:ProductShelfDedicationDTO) => void;
  setProductShelfDedications:(productShelfDedications:ProductShelfDedicationDTO[]) => void;
  setProductShelfDedicationFound:(productShelfDedicationFound:boolean) =>void;

  setShelf:(shelf: ShelfDTO) => void;
  setShelfFound:(shelfFound:boolean) => void;
  setShelves:(shelves: ShelfDTO[]) => void;

  setProductCategory:(ProductCategory: ProductCategoryDTO) => void;
  setProductCategoryFound: (productCategoryFound:boolean) => void;
  setProductCategories:(productCategories:ProductCategoryDTO[]) => void;

  setBrand:(brand: BrandDTO) => void;
  setBrandFound:(brandFound:boolean) => void;
  setBrands:(brands:BrandDTO[]) => void;

  setProduct:(product: ProductDTO) => void;
  setProductFound: (productFound:boolean) => void;
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
  productShelfDedication:{
    Sex: '',
    Row: 0,
    Column: 0,
    Face: 0,
    ShelfName: '',
    BrandName: '',
    ProductCategoryName: ''
  },

productShelfDedications:[],
  order:{
    OrderType: '',
    AssignedTo: '',
    OrderCode:'',
    ProductBarcodes: []
  },
  orders: [],
  brand: {
    BrandName : '',
  },
  brands:[],
  productCategory:{
    ProductsCategoryName: ''
  },
  productCategories:[],
  shelf:{
    ShelfName: '',
    Row: '',
    Column: '',
    Face: ''
  },
  shelves:[],
  request:'',
  productFound: false,
  productCategoryFound: false,
  shelfFound: false,
  brandFound: false,
  orderFound:false,
  productShelfDedicationFound:false,
  setRequest:(request:string) => set(({request})),

  setProductShelfDedication:(productShelfDedication) => set({productShelfDedication}),
  setProductShelfDedications:(productShelfDedications) => set({productShelfDedications}),
  setProductShelfDedicationFound:(productShelfDedicationFound) => set({productShelfDedicationFound}),

  setOrder:(order) => set({order}),
  setOrders:(orders) => set({orders}),
  setOrderFound:(orderFound) => set({orderFound}),

  setProductCategory:(productCategory) => set({productCategory}),
  setProductCategoryFound: (productCategoryFound) => set({productCategoryFound}),
  setProductCategories:(productCategories) => set({productCategories}),

  setBrand: (brand) => set({brand}),
  setBrandFound: (brandFound) => set({brandFound}),
  setBrands: (brands) => set({brands}),

  setShelf:(shelf) => set ({shelf}),
  setShelfFound: (shelfFound) => set({shelfFound}),
  setShelves: (shelves) => set({shelves}),
  
  setProduct: (product) => set({product}),
  setProductFound: (productFound:boolean) => set({productFound}),
  setProducts: (products) => set({ products }), // Function to set products in the store

}));
