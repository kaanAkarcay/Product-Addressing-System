import { StyleSheet, Text, View } from 'react-native';
import TabNavigation from '../navigation/TabNavigation';
import MyBarCodeScanner from '../component/BarcodeScanner';
import { Styles } from '../component/Styles';

export default function InsertProduct() {
    return (
      <View style={Styles.container}>
        <Text>add product</Text>
        <MyBarCodeScanner/>
      </View>
    );
  }
  
  