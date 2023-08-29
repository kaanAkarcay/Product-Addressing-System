import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import BrandDTO from '../../dataModels/BrandDTO';
import { Styles } from '../../component/Styles';

const ReadBrand: React.FC = () => {
    const [searchKey, setSearchKey] = useState('');
    const [foundBrand, setFoundBrand] = useState<BrandDTO | null>(null);
   
    const handleSearchBrand = async () => {
        // Simulate fetching data from API
        console.log("fetching bro");
        const fetchedBrand: BrandDTO = {
            BrandName:'nike'
        };
         // Simulate searching for a product by name
         if (fetchedBrand.BrandName.toLowerCase() === searchKey.toLowerCase()) {
            setFoundBrand(fetchedBrand);
            
        } else {
            setFoundBrand(null);
        }
    };
        return (
            <View style={Styles.container}>
                <Text style={Styles.heading}>Brand Search</Text>
                <TextInput
                    style={Styles.input}
                    placeholder="Enter Brand Name"
                    onChangeText={setSearchKey}
                    value={searchKey}
                />
                <Button title="Search Brand" onPress={handleSearchBrand} />
                {foundBrand && (
                    <View style={Styles.productDetails}>
                         <Text>Yes that brand exists.</Text>
                        <Text>Name: {foundBrand.BrandName}</Text>  
                    </View>
                )}
            </View>
        );

                }
export default ReadBrand;