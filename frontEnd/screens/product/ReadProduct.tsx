import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Styles } from '../../component/Styles';
import ProductDTO from '../../dataModels/ProductDTO';
import communicator from '../../component/communicator';
import { useDataStore } from '../../component/DataHandler';

const ReadProduct: React.FC = () => {
    const [searchKey, setSearchKey] = useState('');
    const {product, setProduct} = useDataStore();
    const [productFound, setProductFound] = useState<boolean>(false);

    const handleSearchProduct = async () => {
        try {
            // Simulate fetching data from API based on the product name
            const response = await communicator.get(`/Product/getProduct?barcode=${searchKey}`);
            setProduct(response.data);
            setProductFound(true);

        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <View style={Styles.container}>
            <Text style={Styles.heading}>Product Search</Text>
            <TextInput
                style={Styles.input}
                placeholder="Enter Product barcode"
                keyboardType="numeric"
                onChangeText={setSearchKey}
                value={searchKey}
            />
            <Button title="Search Product" onPress={handleSearchProduct} />
            {productFound && (
                <View style={Styles.productDetails}>
                    <Text>Barcode: {product.Barcode}</Text>
                    <Text>Name: {product.ProductName}</Text>
                    <Text>Sex: {product.Sex}</Text>
                    {product && <Text>Brand: {product.Brand}</Text>}
                    {product && <Text>Category: {product.ProductCategory}</Text>}
                    <Button title="Ok"  onPress={() => setProductFound(false)} />
                </View>
            )}
        </View>
    );
};

export default ReadProduct;
