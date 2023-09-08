import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import BrandDTO from '../../dataModels/BrandDTO';
import { Styles } from '../../component/Styles';
import communicator from '../../component/communicator';
import { useDataStore } from '../../component/DataHandler';

const DeleteBrand: React.FC = () => {
    const [searchKey, setSearchKey] = useState('');
    const { brand, setBrand } = useDataStore(); // Use the brand state from useDataStore
    const [brandFound, setBrandFound] = useState<boolean>(false);


    const handleSearchBrand = async (searchKey: string) => {
        try {
            const response = await communicator.get(`/Brand/getBrand?name=${searchKey}`);
            // Replace '/endpoint' with your API endpoint
            console.log(response.data);
            setBrand(response.data); // Assign the response data to the brand state
            setBrandFound(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteBrand = async () => {
        try {
            // You can implement the delete functionality here
            // For example:
            // await communicator.delete(`/Brand/deleteBrand?name=${brand.BrandName}`);
            // Replace '/deleteEndpoint' with your actual delete endpoint
            // You should handle success and error cases accordingly
            await communicator.delete(`/Brand/deleteBrand?name=${searchKey}`);
            console.log('Deleting Brand:', brand?.BrandName);
            setBrandFound(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View style={Styles.container}>
            <Text style={Styles.heading}>Brand Search</Text>
            <TextInput
                style={Styles.input}
                placeholder="Enter Brand Name"
                onChangeText={setSearchKey}
                value={searchKey.toLowerCase()}
            />
            <Button title="Search Brand" onPress={() => handleSearchBrand(searchKey)} />
            {brandFound && (
                <View style={Styles.productDetails}>
                    <Text>Yes, that brand exists.</Text>
                    <Text>Name: {brand.BrandName}</Text>
                    {/* Render other brand details here */}
                    <Button title="Ok"  onPress={() => setBrandFound(false)} />

                </View>
            )}
            {brandFound && (
                <View style={Styles.button}>
                    <Button title="Delete Brand" onPress={handleDeleteBrand} />
                </View>
            )}
        </View>
    );
};

export default DeleteBrand;
