import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';

import Home from './Home'
import Reports from './Reports'
import OrderList from './Orderlist'
import Printermaabc from './Netprinter'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const FirstScreenNavigator = () => {
  return (
  <Stack.Navigator> 
       
        <Stack.Screen 
            name="Home1" 
            component={Home} 
            options={{ header: () => null }}
        /> 
         <Stack.Screen 
            name="Order Detail" 
            component={OrderList} 
            options={{ header: () => null }}
        /> 
      </Stack.Navigator> 
  )
}
export {FirstScreenNavigator}
