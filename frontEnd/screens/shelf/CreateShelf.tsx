import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import ShelfDTO from '../../dataModels/ShelfDTO';
import { Styles } from '../../component/Styles';
import communicator from '../../component/communicator';
import { useDataStore } from '../../component/DataHandler';

const CreateShelf: React.FC = () => {

  const {shelf,setShelf} = useDataStore();
  const reset :ShelfDTO ={
    ShelfName:'',
    Row: 0,
    Column: 0,
    Face: 0
  };

  const handleCreateShelf = async () => {
    try {
      // Send the product category data to your API for creation
      const response = await communicator.post('/Shelf/createShelf', shelf); // Replace with your actual create endpoint
      console.log('Shelf created:', response.data);
      // Handle success and update your UI accordingly
    } catch (error) {
      console.error('Error creating Shelf:', error);
      // Handle errors and display appropriate messages to the user
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
          placeholder={shelf.Face === 0 ? 'Face' : ' '}
          keyboardType="numeric"
          onChangeText={(text) => setShelf({ ...shelf, Face: parseInt(text, 10) || 0 })}
          value={shelf.Face === 0 ? '' : shelf.Face.toString()}
        />
        <TextInput
          style={Styles.input}
          placeholder={shelf.Row === 0 ? 'Row' : ' '}
          keyboardType="numeric"
          onChangeText={(text) => setShelf({ ...shelf, Row: parseInt(text, 10) || 0 })}
          value={shelf.Row === 0 ? '' : shelf.Row.toString()}
        />
        <TextInput
          style={Styles.input}
          placeholder={shelf.Column === 0 ? 'Column' : ' '}
          keyboardType="numeric"
          onChangeText={(text) => setShelf({ ...shelf, Column: parseInt(text, 10) || 0 })}
          value={shelf.Column === 0 ? '' : shelf.Column.toString()}
        />
     
      <View style={Styles.button}>
      <Button  title="Create Shelf" onPress={handleCreateShelf} />
      </View>
    
    </View>
  );
};



export default CreateShelf;