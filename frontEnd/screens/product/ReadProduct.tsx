import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Styles } from '../../component/Styles';
import ProductDTO from '../../dataModels/ProductDTO';

const ReadProduct: React.FC = () => {
    const [searchKey, setSearchKey] = useState('');
    const [foundProduct, setFoundProduct] = useState<ProductDTO | null>(null);
    const [foundBrand, setFoundBrand] = useState<string | null>(null);
    const [foundCategory, setFoundCategory] = useState<string | null>(null);

    const handleSearchProduct = async () => {
        // Simulate fetching data from API
        console.log("fetching bro");
        const fetchedProduct: ProductDTO = {
            Barcode: '1234567890123',
            Product_Name: 'Sample Product',
            Sex: 'Unisex',
            Brand_ID: '1',
            Product_Category_ID: '2',
        };

        // Simulate fetching brand and category based on IDs
        const fetchedBrand = 'Sample Brand';
        const fetchedCategory = 'Sample Category';

        // Simulate searching for a product by name
        if (fetchedProduct.Product_Name.toLowerCase() === searchKey.toLowerCase()) {
            setFoundProduct(fetchedProduct);
            setFoundBrand(fetchedBrand);
            setFoundCategory(fetchedCategory);
        } else {
            setFoundProduct(null);
            setFoundBrand(null);
            setFoundCategory(null);
        }
    };

    return (
        <View style={Styles.container}>
            <Text style={Styles.heading}>Product Search</Text>
            <TextInput
                style={Styles.input}
                placeholder="Enter Product Name"
                onChangeText={setSearchKey}
                value={searchKey}
            />
            <Button title="Search Product" onPress={handleSearchProduct} />
            {foundProduct && (
                <View style={Styles.productDetails}>
                    <Text>Barcode: {foundProduct.Barcode}</Text>
                    <Text>Name: {foundProduct.Product_Name}</Text>
                    <Text>Sex: {foundProduct.Sex}</Text>
                    {foundBrand && <Text>Brand: {foundBrand}</Text>}
                    {foundCategory && <Text>Category: {foundCategory}</Text>}
                </View>
            )}
        </View>
    );
};

export default ReadProduct;