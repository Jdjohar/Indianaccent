import React, {useEffect, useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Reports from './src/screens/Reports'
// import OrderList from './src/screens/Orderlist'
import Printermaabc from './src/screens/Netprinter'
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from  "react-native-splash-screen";
import Icon from 'react-native-vector-icons/Ionicons';  
import {FirstScreenNavigator} from "./src/screens/CustomNavigation"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  //Hide Splash screen on app load.
  React.useEffect(() => {
    SplashScreen.hide();
  });
  return (
<NavigationContainer>
<Tab.Navigator>
      <Tab.Screen 
      name="Home" 
      component={FirstScreenNavigator}
      
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}


      />
      <Tab.Screen name="Reports" component={Reports}
      
      options={{
        tabBarLabel: 'Reports',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="chart-bar-stacked" color={color} size={size} />
        ),
      }}

      />
      <Tab.Screen name="Printer" 
      component={Printermaabc} 
      options={{
        tabBarLabel: 'Printer',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="printer-check" color={color} size={size} />
        ),
      }}

      />
    </Tab.Navigator>
     
    </NavigationContainer>
    
  );
};
export default App;
