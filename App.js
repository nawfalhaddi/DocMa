import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducers from './src/store/reducers/rootreducer';
import MainStack from './src/navigation/StackNavigation'
import { navigationRef } from './src/navigation/RootNavigator'


const fetchFonts = async () => {
  return await Font.loadAsync({
    'PoppinsRegular': require('./src/assets/fonts/Poppins-Regular.ttf'),
    'PoppinsLight': require('./src/assets/fonts/Poppins-Light.ttf'),
    'PoppinsSemiBold': require('./src/assets/fonts/Poppins-SemiBold.ttf'),
  })
}

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  if (isLoading) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setIsLoading(false)}></AppLoading>
  } else {
    return (
      <Provider store={store}>

        <MainStack />

      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
