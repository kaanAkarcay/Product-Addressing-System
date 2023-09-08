import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import ShelfDTO from '../../dataModels/ShelfDTO';
import { Styles } from '../../component/Styles';
import { useDataStore } from '../../component/DataHandler';
import communicator from '../../component/communicator';

const DeleteShelf: React.FC = () => {
    const [searchKey, setSearchKey] = useState('');
    const {shelf, setShelf} = useDataStore();
    const [shelfFound, setShelfFound] = useState<boolean>(false);

    const reset : ShelfDTO = {
        ShelfName:'',
        Face:0,
        Row:0,
        Column:0
    }
   
    const handleSearchShelf = async () => {
        // Simulate fetching data from API
        console.log("fetching bro");
        try{
        const response = await communicator.get(`/Shelf/getShelf?name=${searchKey}`);
        // Check if the API call was successful and found a product category
        if (response.status === 200 && response.data) {
            setShelf(response.data);
            setShelfFound(true);
        } else {
            setShelf(reset);
        }
    } catch (error) {
        console.error('Error:', error);
        (reset);
    }
    };
    const handleDeleteShelf = async () => {
        // Simulate deleting the shelf
        console.log('Deleting Shelf:', shelf.ShelfName);
        try{
            const response = await communicator.delete(`/Shelf/deleteShelf?name=${searchKey}`);
            // Check if the API call was successful and found a product category
            if (response.status === 200 && response.data) {
                setShelf(response.data);
                setShelfFound(false);
            } else {
                setShelf(reset);
            }
        } catch (error) {
            console.error('Error:', error);
            (reset);
        }
      };
        return (
            <View style={Styles.container}>
                <Text style={Styles.heading}>Shelf Search</Text>
                <TextInput
                    style={Styles.input}
                    placeholder="Enter Shelf Name"
                    onChangeText={setSearchKey}
                    value={searchKey}
                />
                <Button title="Search Shelf" onPress={handleSearchShelf} />
                {shelfFound && (
                    <View style={Styles.productDetails}>
                         <Text>Yes that Shelf exists.</Text>
                        <Text>Name: {shelf.ShelfName}</Text>  
                        <Button title="Ok"  onPress={() => setShelfFound(false)} />

                    </View>
                )}
                 {shelfFound && (
        <View style={Styles.button}>
          <Button title="Delete Shelf" onPress={handleDeleteShelf} />
        </View>
      )}
            </View>
        );

                }
export default DeleteShelf;