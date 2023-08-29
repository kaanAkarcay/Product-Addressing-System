import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import ShelfDTO from '../../dataModels/ShelfDTO';
import { Styles } from '../../component/Styles';

const CreateShelf: React.FC = () => {
  const [shelf, setShelf] = useState<ShelfDTO>({
    Shelf_ID:''
  });

  const handleCreateShelf = async () => {
   //to be handled
   console.log("handlind data..");
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>Shelf Creation</Text>
      <TextInput
        style={Styles.input}
        placeholder="ID"
        onChangeText={(text) => setShelf({ ...shelf, Shelf_ID: text })}
        value={shelf.Shelf_ID}
      />
     
      <View style={Styles.button}>
      <Button  title="Create Shelf" onPress={handleCreateShelf} />
      </View>
    
    </View>
  );
};



export default CreateShelf;