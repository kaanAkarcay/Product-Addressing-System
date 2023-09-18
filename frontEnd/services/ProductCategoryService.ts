// ProductCategoryService.ts
import communicator from '../component/communicator';
import { useDataStore } from '../component/DataHandler';
import ProductCategoryDTO from '../dataModels/ProductCategoryDTO';

type ProductCategoryResponse = {
    status: 'success' | 'error';
    message: string;
    productCategory?: ProductCategoryDTO;
};

// Create a new product category
export const createProductCategory = async ( productCategory: ProductCategoryDTO ): Promise<ProductCategoryResponse> => {
    try {
        const response = await communicator.post('/ProductCategory/createProductCategory', productCategory); // Replace with your actual create endpoint
        if (response.status === 200 && response.data) {
            return { status: 'success', message: 'Product Category created successfully', productCategory: response.data };
        } else {
            return { status: 'error', message: 'Product Category could not be created' };
        }
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message || 'An error occurred while creating the Product Category';
        return { status: 'error', message: errorMessage };
    }
};


export const getProductCategory = async (searchKey: string): Promise<ProductCategoryResponse> => {
    const setDataStoreProductCategoryFound = useDataStore.getState().setProductCategoryFound;

    try {
        const response = await communicator.get(`/ProductCategory/getProductCategory?name=${searchKey}`);
        if (response.status === 200 && response.data) {
            const setDataStoreProductCategory = useDataStore.getState().setProductCategory;
        setDataStoreProductCategory(response.data);
        setDataStoreProductCategoryFound(true);
            return { status: 'success', message: 'Product Category found', productCategory: response.data };
        } else {
            setDataStoreProductCategoryFound(false);

            return { status: 'error', message: 'Product Category not found' };
        }
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message || 'An error occurred while fetching the Product Category';
        return { status: 'error', message: errorMessage };
    }
};

export const getProductCategories = async (): Promise<ProductCategoryResponse> => {
   

    try {
        const response = await communicator.get(`/ProductCategory/getProductCategories`);
        if (response.status === 200 && response.data) {
            const setDataStoreProductCategories = useDataStore.getState().setProductCategories;
            setDataStoreProductCategories(response.data);
            return { status: 'success', message: 'Product Categories found', productCategory: response.data };
        } else {

            return { status: 'error', message: 'Product Categories not found' };
        }
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message || 'An error occurred while fetching the Product Categories';
        return { status: 'error', message: errorMessage };
    }
};
// Update an existing product category
export const updateProductCategory = async (
    id: number,
    productCategory: ProductCategoryDTO
): Promise<ProductCategoryResponse> => {
    try {
        const response = await communicator.put(`/ProductCategory/updateProductCategory/${id}`, productCategory);
        if (response.status === 200 && response.data) {
            return { status: 'success', message: 'Product Category updated', productCategory: response.data };
        } else {
            return { status: 'error', message: 'Product Category could not be updated' };
        }
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message || 'An error occurred while updating the Product Category';
        return { status: 'error', message: errorMessage };
    }
};

// Delete a product category by ID
export const deleteProductCategory = async (id: number): Promise<ProductCategoryResponse> => {
    try {
        const response = await communicator.delete(`/ProductCategory/deleteProductCategory/${id}`);
        if (response.status === 200 && response.data) {
            return { status: 'success', message: 'Product Category deleted', productCategory: response.data };
        } else {
            return { status: 'error', message: 'Product Category could not be deleted' };
        }
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message || 'An error occurred while deleting the Product Category';
        return { status: 'error', message: errorMessage };
    }
};