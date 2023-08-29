import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import BrandDTO from '../../dataModels/BrandDTO';
import { Styles } from '../../component/Styles';

const DeleteBrand: React.FC = () => {
    const [searchKey, setSearchKey] = useState('');
    const [foundBrand, setFoundBrand] = useState<BrandDTO | null>(null);
   
    const handleSearchProduct = async () => {
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
    const handleDeleteBrand = async () => {
        // Simulate deleting the product
        console.log('Deleting Brand:', foundBrand?.BrandName);
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
                <Button title="Search Brand" onPress={handleSearchProduct} />
                {foundBrand && (
                    <View style={Styles.productDetails}>
                         <Text>Yes that brand exists.</Text>
                        <Text>Name: {foundBrand.BrandName}</Text>  
                    </View>
                )}
                {foundBrand && (
        <View style={Styles.button}>
          <Button title="Delete Brand" onPress={handleDeleteBrand} />
        </View>
      )}
            </View>
        );

                }
export default DeleteBrand;