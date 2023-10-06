import React, { useState } from 'react';
import { View, Text, TextInput, Button,Alert } from 'react-native';
import ShelfDTO from '../../dataModels/ShelfDTO';
import { Styles } from '../../component/Styles';
import { createShelf } from '../../services/ShelfService';
import { useDataStore } from '../../component/DataHandler';

const CreateShelf: React.FC = () => {

  const {shelf,setShelf} = useDataStore();
  const reset :ShelfDTO ={
    ShelfName:'',
    Row: '',
    Column: '',
    Face: ''
  };

  const handleCreateShelf = async () => {
    try {
      // Send the product category data to your API for creation
      const response = await createShelf(shelf);
      console.log('Shelf created:', response.shelf);
      if (response.status == 'success') {
        Alert.alert(response.message)
        
        }
        else{
          Alert.alert(response.message)
        }
      
      }catch(error:any){
          Alert.alert(error)
      }
    
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>Shelf Creation</Text>
      <TextInput
        style={Styles.input}
        placeholder="Shelf Name"
        onChangeText={(text) => setShelf({ ...shelf, ShelfName: text })}
        value={shelf.ShelfName}
      />
          <TextInput
          style={Styles.input}
          placeholder='Face'
          keyboardType="numeric"
          onChangeText={(text) => setShelf({ ...shelf, Face: text })}
          value={shelf.Face}
        />
        <TextInput
          style={Styles.input}
          placeholder='Row'
          keyboardType="numeric"
          onChangeText={(text) => setShelf({ ...shelf, Row:text })}
          value={shelf.Row}
        />
        <TextInput
          style={Styles.input}
          placeholder='Column'
          keyboardType="numeric"
          onChangeText={(text) => setShelf({ ...shelf, Column:text })}
          value={shelf.Column}
        />
     
      <View style={Styles.button}>
      <Button  title="Create Shelf" onPress={handleCreateShelf} />
      </View>
    
    </View>
  );
};



export default CreateShelf;