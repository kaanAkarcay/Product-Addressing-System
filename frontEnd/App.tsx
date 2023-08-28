import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './navigation/DrawerNavigation';




export default function App() {
  return (
    
  
      <NavigationContainer>
        <DrawerNavigation/>
       
      </NavigationContainer>
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// import DataHandler from './DataHandler';

// const App: React.FC = () => {
//   return (
//     <DataHandler>
//       {(dataStore) => (
//         <div>
//           {/* Your components here */}
//         </div>
//       )}
//     </DataHandler>
//   );
// };

// export default App;