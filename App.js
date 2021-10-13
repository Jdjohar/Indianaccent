import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import Home from './src/screens/Home'
import OrderList from './src/screens/Orderlist'
import Printermaabc from './src/screens/Netprinter'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from  "react-native-splash-screen";
const Stack = createNativeStackNavigator();

const App = () => {
  //Hide Splash screen on app load.
  React.useEffect(() => {
    SplashScreen.hide();
  });
  return (
<NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Order Detail" component={OrderList} />
      <Stack.Screen name="Printerabc" component={Printermaabc} />
     
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
