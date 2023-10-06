import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { Styles } from '../../component/Styles';
import SelectDropdown from 'react-native-select-dropdown'
import { useDataStore } from '../../component/DataHandler';
import { createProductShelfDedication } from '../../services/ProductShelfDedicationService';
import { getBrands } from '../../services/BrandService';
import { getProductCategories } from '../../services/ProductCategoryService';

const CreateProductShelfDedication: React.FC = () => {
  const { productShelfDedication, setProductShelfDedication } = useDataStore();
  const { brands, productCategories } = useDataStore();
  const Sexes=  ["Erkek", "Kadın"]
  const [Pddata, setPdData] = useState<string[]>([]);
  const [Bdata, setBData] = useState<string[]>([]);


  useEffect(() => {
    getBrands() .then(() => {
      if (Array.isArray(brands)) {
        // Extract the ProductsCategoryName values and push them into the data array
        const brandNames = brands.map((brand) => {
          try {
            const parsedbrand = JSON.parse(brand);
            return parsedbrand.BrandName;
          } catch (error) {
            console.error('Error parsing JSON:', error);
            return ''; // Return an empty string in case of parsing errors
          }
        });

        // Filter out empty strings (parsing errors) and update the data state
        console.log(brandNames)
        setBData(brandNames.filter((name) => name !== ''));
      }
    })
    .catch((error) => {
      console.error('Error fetching productCategories:', error);
    }); // Fetch brands and update the brands state in your data store

    getProductCategories()
      .then(() => {
        if (Array.isArray(productCategories)) {
          // Extract the ProductsCategoryName values and push them into the data array
          const categoryNames = productCategories.map((category) => {
            try {
              const parsedCategory = JSON.parse(category);
              return parsedCategory.ProductsCategoryName;
            } catch (error) {
              console.error('Error parsing JSON:', error);
              return ''; // Return an empty string in case of parsing errors
            }
          });
  
          // Filter out empty strings (parsing errors) and update the data state
          console.log(categoryNames)
          setPdData(categoryNames.filter((name) => name !== ''));
        }
      })
      .catch((error:any) => {
        console.error('Error fetching productCategories:', error);
      });
  }, []);
  

  const handleCreateProductShelfDedication = async () => {
    try {
      const response = await createProductShelfDedication(productShelfDedication);

      if (response.status === 'success') {
        Alert.alert('Success', 'Product Shelf Dedication created successfully');
      } else {
        console.error('Error creating Product Shelf Dedication:', response.message);
        Alert.alert('Error', response.message);
      }
    } catch (error:any) {
      console.error('Error creating Product Shelf Dedication:', error);
      Alert.alert(error);
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>Product Shelf Dedication Creation</Text>

      {/* Here, you can add all the input fields corresponding to each attribute of productShelfDedication */}
      <View style={Styles.selectorContainer}>
        <SelectDropdown 
          data={Sexes}
          defaultButtonText="Sex"
          onSelect={(selectedItem, index) => {
            console.log(selectedItem)
            setProductShelfDedication({ ...productShelfDedication, Sex: selectedItem })
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />

       </View>
       <TextInput
          style={Styles.input}
          placeholder={productShelfDedication.Face === 0 ? 'Face' : ' '}
          keyboardType="numeric"
          onChangeText={(text) => setProductShelfDedication({ ...productShelfDedication, Face: parseInt(text, 10) || 0 })}
          value={productShelfDedication.Face === 0 ? '' : productShelfDedication.Face.toString()}
        />
        <TextInput
          style={Styles.input}
          placeholder={productShelfDedication.Row === 0 ? 'Row' : ' '}
          keyboardType="numeric"
          onChangeText={(text) => setProductShelfDedication({ ...productShelfDedication, Row: parseInt(text, 10) || 0 })}
          value={productShelfDedication.Row === 0 ? '' : productShelfDedication.Row.toString()}
        />
        <TextInput
          style={Styles.input}
          placeholder={productShelfDedication.Column === 0 ? 'Column' : ' '}
          keyboardType="numeric"
          onChangeText={(text) => setProductShelfDedication({ ...productShelfDedication, Column: parseInt(text, 10) || 0 })}
          value={productShelfDedication.Column === 0 ? '' : productShelfDedication.Column.toString()}
        />
         <TextInput
          style={Styles.input}
          placeholder="Shelf name"
          onChangeText={(text) => setProductShelfDedication({ ...productShelfDedication, ShelfName: text})}
          value={productShelfDedication.ShelfName}
        />

<View style={Styles.selectorContainer}>
        <SelectDropdown 
          data={Bdata}
          defaultButtonText="Brand"
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
            setProductShelfDedication({ ...productShelfDedication, BrandName: selectedItem })
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />
        </View>



        <View style={Styles.selectorContainer}>
        <SelectDropdown
          data={Pddata}
          defaultButtonText="Product Category"
          onSelect={(selectedItem, index) => {
            setProductShelfDedication({ ...productShelfDedication, ProductCategoryName: selectedItem })
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />
        </View>

      {/* ... add other TextInput fields for the other attributes ... */}

      <View style={Styles.button}>
        <Button title="Create Product Shelf Dedication" onPress={handleCreateProductShelfDedication} />
      </View>
    </View>
  );
};

export default CreateProductShelfDedication;
