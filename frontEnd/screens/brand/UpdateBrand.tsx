import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import BrandDTO from '../../dataModels/BrandDTO';
import { Styles } from '../../component/Styles';

const UpdateBrand: React.FC = () => {
    const [searchKey, setSearchKey] = useState('');
    const [foundBrand, setFoundBrand] = useState<BrandDTO | null>(null);
    const [Updatedbrand, setBrand] = useState<BrandDTO>({
        BrandName:''
      });



    const UpdateBrand = async () => {
      console.log("updating brand");
    }
    const handleSearchProduct = async () => {
        // Simulate fetching data from API
        console.log("fetching bro");
        const fetchedBrand: BrandDTO = {
            BrandName:'nike'
        };
         // Simulate searching for a product by name
         if (fetchedBrand.BrandName.toLowerCase() === searchKey.toLowerCase()) {
            setFoundBrand(fetchedBrand);
            setBrand(fetchedBrand);
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
                <Button title="Search Brand" onPress={handleSearchProduct} />
                {foundBrand && (
                    <View style={Styles.productDetails}>
                         <Text>Yes that brand exists, Update the field below.</Text>
                         <TextInput
        style={Styles.input}
        placeholder="Name"
        onChangeText={(text) => setBrand({ ...Updatedbrand, BrandName: text })}
        value={Updatedbrand.BrandName}
      />
       <Button title="Update Brand" onPress={UpdateBrand} />
                    </View>
                )}
            </View>
        );

                }
export default UpdateBrand;