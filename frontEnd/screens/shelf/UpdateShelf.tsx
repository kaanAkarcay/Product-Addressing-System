import React, { useState } from 'react';
import { View, Text, TextInput, Button,Alert } from 'react-native';
import ShelfDTO from '../../dataModels/ShelfDTO';
import { Styles } from '../../component/Styles';
import { updateShelf } from '../../services/ShelfService';
import { useDataStore } from '../../component/DataHandler';
const UpdateShelf: React.FC = () => {
    const {shelf,setShelf} = useDataStore();

    const UpdateShelf = async () => {
      console.log("updating Shelf");
      try {
        // Send the product category data to your API for creation
        console.log(shelf)
        const response = await updateShelf(shelf); // Replace with your actual create endpoint
        if (response.status == 'success') {
            Alert.alert(response.message)
    
          }
          else{
            Alert.alert(response.message)
          }
          // Handle success and update your UI accordingly
        } catch (error:any) {
          console.error('Error updating shelf:', error);
          // Handle errors and display appropriate messages to the user
          Alert.alert(error)
        }
    }

        return (
            <View style={Styles.container}>
              <Text style={Styles.heading}>Shelf Creation</Text>
              <TextInput
            style={Styles.input}
            placeholder="ID"
            keyboardType="numeric"
            onChangeText={(text) => setShelf({ ...shelf, Id: text })}
            value={shelf.Id}
          />
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
      <Button  title="update Shelf" onPress={UpdateShelf} />
      </View>
    
    </View>
        );

                }
export default UpdateShelf;