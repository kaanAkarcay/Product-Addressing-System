import { StyleSheet } from 'react-native';


export const Styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#FF8C00', // Dark Orange
    },
    heading: {
      fontSize: 18,
      marginBottom: 20,
      backgroundColor: 'white', 
      color: '#333333',
      padding: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      elevation: 3, // Add elevation for Android shadow
      shadowColor: 'black', // Add shadow for iOS
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 2,
    },
    input: {
      width: '100%',
      padding: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      backgroundColor: 'white',
    },
    button: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        elevation: 3, // Add elevation for Android shadow
        shadowColor: 'black', // Add shadow for iOS
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
      },
      productDetails: {
        marginTop: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
      },
  });
  