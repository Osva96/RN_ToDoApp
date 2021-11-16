import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './store/store';
import { NativeBaseProvider } from 'native-base';
// Views
import Home from './views/Home';
import Profile from './views/Profile';
import NoteDetails from './views/NoteDetails';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: 'Home' }}
            />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen
              name="Details"
              component={NoteDetails}
              options={{ title: 'Note Details' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
