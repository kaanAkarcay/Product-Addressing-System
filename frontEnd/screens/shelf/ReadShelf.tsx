import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import ShelfDTO from '../../dataModels/ShelfDTO';
import { Styles } from '../../component/Styles';

const ReadShelf: React.FC = () => {
    const [searchKey, setSearchKey] = useState('');
    const [foundShelf, setFoundShelf] = useState<ShelfDTO | null>(null);
   
    const handleSearchShelf = async () => {
        // Simulate fetching data from API
        console.log("fetching bro");
        const fetchedShelf: ShelfDTO = {
            Shelf_ID:'AA'
        };
         // Simulate searching for a product by name
         if (fetchedShelf.Shelf_ID.toLowerCase() === searchKey.toLowerCase()) {
            setFoundShelf(fetchedShelf);
            
        } else {
            setFoundShelf(null);
        }
    };
        return (
            <View style={Styles.container}>
                <Text style={Styles.heading}>Shelf Search</Text>
                <TextInput
                    style={Styles.input}
                    placeholder="Enter Shelf ID"
                    onChangeText={setSearchKey}
                    value={searchKey}
                />
                <Button title="Search Shelf" onPress={handleSearchShelf} />
                {foundShelf && (
                    <View style={Styles.productDetails}>
                         <Text>Yes that Shelf exists.</Text>
                        <Text>Name: {foundShelf.Shelf_ID}</Text>  
                    </View>
                )}
            </View>
        );

                }
export default ReadShelf;