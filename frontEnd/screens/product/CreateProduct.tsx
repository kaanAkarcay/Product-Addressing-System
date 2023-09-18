import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button,Alert } from 'react-native';
import { Styles } from '../../component/Styles';
import { useDataStore } from '../../component/DataHandler';
import { createProduct } from '../../services/ProductService';
import { getBrands } from '../../services/BrandService';
import { getProductCategories } from '../../services/ProductCategoryService';
import SelectDropdown from 'react-native-select-dropdown'

const CreateProduct: React.FC = () => {

  const {product,setProduct} = useDataStore();
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
      .catch((error) => {
        console.error('Error fetching productCategories:', error);
      });
  }, []);
  

  const handleCreateProduct = async () => {
    // Simulate creating the product
    console.log('Creating Product:', product);

    try {
      const response = await createProduct(product);
  
      // If the API responds with a status code of 400 (Bad Request)
      if (response.status == 'success') {
      Alert.alert(response.message)
      
      }
      else{
        Alert.alert(response.message)
      }
    
    }catch(error:any){
        Alert.alert(error)
    }
  
  
  }

      
  
  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>Product Creation</Text>
      <TextInput
          style={Styles.input}
          placeholder={'Barcode'}
          keyboardType="numeric"
          onChangeText={(text) => setProduct({ ...product, Barcode: text})}
          value={product.Barcode}
        />

      <TextInput
        style={Styles.input}
        placeholder="Product Name"
        onChangeText={(text) => setProduct({ ...product, ProductName: text })}
        value={product.ProductName}
      />

        <View style={Styles.selectorContainer}>
        <SelectDropdown 
          data={Sexes}
          defaultButtonText="Sex"
          onSelect={(selectedItem, index) => {
            console.log(selectedItem)
            setProduct({ ...product, Sex: selectedItem })
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
          data={Bdata}
          defaultButtonText="Brand"
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
            setProduct({ ...product, Brand: selectedItem })
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
            setProduct({ ...product, ProductCategory: selectedItem })
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



    
      <View style={Styles.button}>
        <Button title="Create Product" onPress={handleCreateProduct} />
      </View>
    </View>
  );
};

export default CreateProduct;
