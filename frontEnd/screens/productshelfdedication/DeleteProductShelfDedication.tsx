import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { Styles } from '../../component/Styles';
import communicator from '../../component/communicator';
import { useDataStore } from '../../component/DataHandler';
import { deleteProductShelfDedication, searchProductShelfDedication } from '../../services/ProductShelfDedicationService';

const DeleteProductShelfDedication: React.FC = () => {
    const [searchKey, setSearchKey] = useState('');
    const { productShelfDedication, setProductShelfDedication } = useDataStore();
    const { productShelfDedicationFound, setProductShelfDedicationFound } = useDataStore();

    const handleSearchDedication = async (searchKey: string) => {
        try {
            const response = await searchProductShelfDedication(searchKey);

            if (response.status == 'success') {
                response.ProductShelfDedication && setProductShelfDedication(response.ProductShelfDedication);
                setProductShelfDedicationFound(true);
            }
            else {
                Alert.alert(response.message);
            }
        } catch (error:any) {
            console.error('Error:', error);
            Alert.alert(error);
        }
    };

    const handleDeleteDedication = async () => {
        try {
            const response = await deleteProductShelfDedication(searchKey);
            if (response.status == 'success') {
                Alert.alert(response.message);
                setProductShelfDedicationFound(false);
            }
            else {
                Alert.alert(response.message);
            }
        } catch (error:any) {
            console.error('Error:', error);
            Alert.alert(error);
        }
    };

    return (
        <View style={Styles.container}>
            <Text style={Styles.heading}>Product Shelf Dedication Search</Text>
            <TextInput
                style={Styles.input}
                placeholder="Enter Search Key"
                onChangeText={setSearchKey}
                value={searchKey}
            />
            <Button title="Search Dedication" onPress={() => handleSearchDedication(searchKey)} />
            {productShelfDedicationFound && (
                <View style={Styles.productDetails}>
                    <Text>Yes, that dedication exists.</Text>
                    <Text>Brand: {productShelfDedication.BrandName}</Text>
                    <Text>Shelf: {productShelfDedication.ShelfName}</Text>
                    {/* Render other dedication details here */}
                    <Button title="Ok" onPress={() => setProductShelfDedicationFound(false)} />
                </View>
            )}
            {productShelfDedicationFound && (
                <View style={Styles.button}>
                    <Button title="Delete Dedication" onPress={handleDeleteDedication} />
                </View>
            )}
        </View>
    );
};

export default DeleteProductShelfDedication;
