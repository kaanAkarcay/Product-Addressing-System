import React, { useState } from 'react';
import { View, Text, TextInput, Button ,Alert} from 'react-native';
import BrandDTO from '../../dataModels/BrandDTO';
import { Styles } from '../../component/Styles';
import communicator from '../../component/communicator';
import { useDataStore } from '../../component/DataHandler';
import { deleteBrand, searchBrand } from '../../services/BrandService';

const DeleteBrand: React.FC = () => {
    const [searchKey, setSearchKey] = useState('');
    const { brand, setBrand } = useDataStore(); // Use the brand state from useDataStore
    const {brandFound, setBrandFound} = useDataStore();


    const handleSearchBrand = async (searchKey: string) => {
        try {
            const response = await searchBrand(searchKey);
            // Replace '/endpoint' with your API endpoint
            if (response.status == 'success'){
                //Alert.alert(response.message);
                response.brand && setBrand(response.brand);              
                 setBrandFound(true);
            }
            else  {
                Alert.alert(response.message)
            }
           
        } catch (error:any) {
            console.error('Error:', error);
            Alert.alert(error)
        }
    };

    const handleDeleteBrand = async () => {
        try {
            const response = await deleteBrand(searchKey)
            if (response.status == 'success') {
                Alert.alert(response.message)
                setBrandFound(false);   
            }
            else  {
                Alert.alert(response.message)

                }
            }
            
         catch (error:any) {
            console.error('Error:', error);
            Alert.alert(error)
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
