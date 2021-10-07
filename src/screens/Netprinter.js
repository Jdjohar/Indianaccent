import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Button, TextInput} from 'react-native-paper';
import {
    NetPrinter,
    INetPrinter,
  } from "react-native-thermal-receipt-printer";
  import { StarPRNT } from 'react-native-print-star';
import { NavigationContainer } from '@react-navigation/native';
  const Printerabc = props => {
    const [printers, setPrinters] = useState([INetPrinter]);
  const [currentPrinter, setCurrentPrinter] = useState();
  const [iphost, setiphost] = useState('192.168.0.168');
  const [ipport, setipport] = useState('1900');
  const [errorname, seterrorname] = useState('12');
  const [printersarr, setprintersarr] = useState([]);

  useEffect(() => {
    portDiscovery();

  }, []);

  // Coonect to Printer
  async function connect(port) {
    console.log(port, "Port")
    port = "TCP:192.168.1.108";
    try {
      var connect = await StarPRNT.connect(port, "StarGraphic", false);
      console.log(connect, "printer"); // Printer Connected!
    
      var gh = JSON.stringify(connect);
      // var ghparse = JSON.parse(gh);
      seterrorname(JSON.stringify(connect));
      //  if (ghparse == "Success!")
      //  {
        Alert.alert(JSON.stringify(connect));
           AsyncStorage.setItem('printerportnumber', port); // trying to save port number in async storage
      //  }
       var getprinterport = AsyncStorage.getItem('printerportnumber');
       seterrorname(getprinterport);
       
      

    } catch (e) {
      console.error(e.message, "abcddk");
      // var gh = JSON.stringify(e.message);
      Alert.alert(e.message);
      seterrorname(e.message);
    }
  }
  

  // [
  //   {
  //     key: "1",
  //       modelName: "Test 1",
  //       portName: "port name 1",
  //       macAddress: "port name 1",
  //   },
  //   {
  //     key: "2",
  //     modelName: "Test 2",
  //     portName: "port name 2",
  //     macAddress: "port name 2",
  // },
  //   ]

  //Fetch All Printers
  const portDiscovery = async () => {
    console.log('Test Print portDiscovery')
    try {
      const printerads = await StarPRNT.portDiscovery('All');
      setprintersarr(printerads);
      console.log(printersarr,  "Print Succdsfgess");
      // connect();
      // print();
    } catch (e) {
      console.error(e);
    }
  }

  const list = () => {
    return printersarr.map((element) => {
      return (
        <View key={element.key} style={{margin: 10}}>
          <Text>{element.modelName}</Text>
          <Text>{element.macAddress}</Text>
          <Text>{element.portName}</Text>
          <Text>{element.USBSerialNumber}</Text>
      <TouchableOpacity onPress={() => connect(`${element.portName}`)}>
        <Text>click to connect</Text>
      </TouchableOpacity>
         
        </View>
      );
    });
  };


    return (
        <View style={styles.container}>

<View style={{paddingLeft: 10, paddingBottom: 10, paddingTop: 10}}>
        <Text style={{fontSize: 20}}>Last 10 Orders</Text>
        <Text style={{fontSize: 20}}>sdf {errorname}</Text>
      </View>

      <View> 
      {console.log(printersarr, "cosdcsvn dsjbvdsb")}
        {/* {k.macAddress} {k.portName} {k.USBSerialNumber} */}
      {list()}
      </View>
      
      <TouchableOpacity 
      onPress={()=>portDiscovery()}>
        <Text style={{backgroundColor:"green", padding:30}}>Printer 1 Print</Text>

      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=>connect("ABC")}>
        <Text style={{backgroundColor:"green", padding:30}}>Connect Print</Text>

      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=>props.navigation.navigate("Home")}>
        <Text style={{backgroundColor:"red", padding:30, color:"#fff"}}>Go To Home</Text>

      </TouchableOpacity>
            
       
        
       
      </View>
    )
};


const styles = StyleSheet.create({
    container: {
      padding: 5,
      width: '100%',
      height: '100%',
      backgroundColor: '#eee',
    }
    });  

export default Printerabc;