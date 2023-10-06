import React, { useState } from 'react';
import { View, Text, TextInput, Button ,Alert} from 'react-native';
import ShelfDTO from '../../dataModels/ShelfDTO';
import { Styles } from '../../component/Styles';
import communicator from '../../component/communicator';
import { useDataStore } from '../../component/DataHandler';
import { searchShelf } from '../../services/ShelfService';

const ReadShelf: React.FC = () => {
    const [searchKey, setSearchKey] = useState('');
    const {shelf, setShelf} = useDataStore();
    const {shelfFound, setShelfFound} = useDataStore();

   
   
    const handleSearchShelf = async () => {
        // Simulate fetching data from API
        console.log("fetching bro");
        try{
        const response = await searchShelf(searchKey)
        // Check if the API call was successful and found a product category
        if (response.status == 'success' && response.shelf) {
            setShelf(response.shelf);
            setShelfFound(true);
            Alert.alert(response.message)

        } else {
            Alert.alert(response.message)

        }
    } catch (error:any) {
        console.error('Error:', error);
        
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
            </View>
        );

                }
export default ReadShelf;