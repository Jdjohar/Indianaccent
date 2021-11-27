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
import {discover, print} from "react-native-epson-printer";

  const Printermaabc = props => {
    const [printers, setPrinters] = useState([INetPrinter]);
  const [currentPrinter, setCurrentPrinter] = useState();
  const [iphost, setiphost] = useState('192.168.0.168');
  const [ipport, setipport] = useState('1900');
  const [errorname, seterrorname] = useState('');
  const [printersarr, setprintersarr] = useState([]);
  const [epsonprintersarr, setepsonprintersarr] = useState([]);

  useEffect(() => {
    portDiscovery();
    portDiscoveryepson();
  }, []);




  
   //Fetch All EPSON Printers
   const portDiscoveryepson = async () => {
    console.log('Test Print portDiscovery')
    try {
         const printerads =   await discover({interface_type: "LAN"});
      setepsonprintersarr(printerads);
      console.log(epsonprintersarr,  "Print Succdsfgess");
      // connect();
      // print();
    } catch (e) {
      console.error(e);
    }
  }


  // Conect to Printer
  async function connect(port) {
    console.log(port, "Port")
    // port = "TCP:192.168.1.108";
    try {
      var connect = await StarPRNT.connect(port, "StarGraphic", false);
      console.log(typeof connect, "printer"); // Printer Connected!
    
      // const gh = JSON.stringify(connect);
      // var ghparse = JSON.parse(gh);
      seterrorname(connect);
       if (connect == "Printer Connected")
       {
        Alert.alert(connect);

           AsyncStorage.setItem('printertype', 'star'); // trying to save port number in async storage
           AsyncStorage.setItem('printerportncumber', port); // trying to save port number in async storage
       }
      //  var getprinterport = AsyncStorage.getItem('printerportncumber');
      //  seterrorname(getprinterport);
       
      

    } catch (e) {
      var gh = JSON.stringify(e.message);
      console.error(gh, "abcddk");
      Alert.alert(gh);
      // seterrorname(JSON.stringify(e.message));
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
        <View key={element.portName} style={{margin: 10}}>
          <Text>{element.modelName}</Text>
          <Text>{element.macAddress}</Text>
          <Text>{element.portName}</Text>
          <Text>{element.USBSerialNumber}</Text>
      <TouchableOpacity  onPress={() => connect(`${element.portName}`)}>
        <Text style={{padding:10, backgroundColor:'#222', color:'#fff', width:"40%", textAlign:'center'}}>click to connect</Text>
      </TouchableOpacity>
         
        </View>
      );
    });
  };
  const epsonconnect = (port) => {
    try {
      AsyncStorage.setItem('printertype', 'epson');
      AsyncStorage.setItem('epsonprinter', JSON.stringify(port));
      Alert.alert("Printer Selected ");
    } catch (error) {
      console.log(error);
    }

  }

  
  const epsonlist = () => {
    return epsonprintersarr.map((element) => {
      return (
        <View key={element.mac_address} style={{margin: 10}}>
          <Text>{element.name}</Text>
          <Text>{element.mac_address}</Text>
          <Text>{element.target}</Text>
          <Text>{element.interface_type}</Text>
      <TouchableOpacity  onPress={() => epsonconnect(element)}>
        <Text style={{padding:10, backgroundColor:'#222', color:'#fff', width:"40%", textAlign:'center'}}>click to connect</Text>
      </TouchableOpacity>
         
        </View>
      );
    });
  };





    return (
        <View style={styles.container}>

<View style={{paddingLeft: 10, paddingBottom: 10, paddingTop: 10}}>
       
        <Text style={{fontSize: 20}}>{errorname}</Text>
      </View>

      <View style={{marginBottom:30}}> 

        {/* {k.macAddress} {k.portName} {k.USBSerialNumber} */}
      {list()}
      </View>
      <View style={{marginBottom:30}}> 

        {/* {k.macAddress} {k.portName} {k.USBSerialNumber} */}
      {epsonlist()}
      </View>
      
      <TouchableOpacity 
      onPress={()=>portDiscovery()}>
        <Text style={{backgroundColor:"#03a9f4", color:"#fff",  padding:10}}>Fetch Star Printers</Text>

      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=>portDiscoveryepson()}>
        <Text style={{backgroundColor:"#03a9f4", color:"#fff",  padding:10}}>Fetch Epson Printers</Text>

      </TouchableOpacity>
     
      <TouchableOpacity 
      onPress={()=>props.navigation.navigate("Home")}>
        <Text style={{backgroundColor:"#222", padding:10, color:"#fff"}}>Go To Home</Text>

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

export default Printermaabc;