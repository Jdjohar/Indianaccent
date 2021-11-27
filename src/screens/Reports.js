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
import {Card,TextInput, Button} from 'react-native-paper';
import { StarPRNT } from 'react-native-print-star';
import {discover, print} from "react-native-epson-printer";
import { ck, cs } from "../screens/utils/keys";
import moment from 'moment';


const Reports = props => {

  const [totals,settotals] = useState([]);
  const [alldata,setalldata] = useState([]);
  const [startdate,setstartdate] = useState('')
  const [enddate,setenddate] = useState('');

  // const [date, setDate] = useState(new Date())


  useEffect(() => {
    var currenttime = moment().utc().local().format('Z');
    var jsd = moment.utc("2016-08-11 12:19:14").local().format("YYYY-MM-DD HH:mm:ss Z")
    console.log(currenttime,jsd, "currenttime")
   
    const date = new Date();
const dateAsString = date.toString();
const timezone = dateAsString.match(/\(([^\)]+)\)$/)[1];

console.log(timezone, "sdcsdsdsd");

    reports()

  }, []);

  async function epsontestprint(port) {


    var commands = "";
 if(alldata.length > 0){
commands = commands+"Report\n" + 
"Total Sale:" + alldata[0].total_sales +
"\n"
"Total Order:" +  alldata[0].total_orders +
"\n"
"Total Item:" +  alldata[0].total_items +
"\n\n\n\n"
 ;


   totals.map((element) => {
    commands = commands+"Date: " + Object.keys(element) + "\n";
    commands = commands+"Sales: " + element[Object.keys(element)].sales + "\n";
    commands = commands+"Orders: " + element[Object.keys(element)].orders + "\n";
    commands = commands+"Items: " + element[Object.keys(element)].items + "\n";
    commands = commands+"Tax: " + element[Object.keys(element)].tax + "\n\n";
});



    try {
      const response =  print({
        printer: port,
         data:  commands,
        receipt_copy_count: 1,
        font_size: "Regular", // Small, Regular, Medium, Large
      })
          // console.log(response, "printer"); // Printer Connected!
    
            Alert.alert("Print Success");
    } catch (e) {
      console.error(JSON.stringify(e));
      Alert.alert("Message",JSON.stringify(e.message));
    }
  }else{
    Alert.alert("Data Not Found");
  }
  }
  

  const reports = async () => {
console.log("Reports Section Start")
let items = await fetch(
  // `https://indianaccentyyc.ca/shop/wp-json/wc/v3/reports?consumer_key=${ck}&consumer_secret=${cs}`,
  `https://indianaccentyyc.ca/shop/wp-json/wc/v3/reports/sales?date_min=${startdate}&date_max=${enddate}&consumer_key=ck_9a73b9ea7a0ae72efc87f16acddd848b0387d005&consumer_secret=cs_2b0a306878cc735ce468953b25250a82f29d590b`,
);
var json = await items.json();
console.log(json, "Json Data")
if (json.length > 0) {
  const totalss = json[0].totals;
  setalldata(json);
  const result = Object.keys(totalss).map(key => ({[key]: totalss[key]}));
  settotals(result);
}
  }

  const list = () => {
    if(alldata.length > 0){
    return totals.map((element) => {
      console.log(Object.keys(element));
      return (
        <View key={Object.keys(element)} style={{margin: 10}}>
          <Text>Date: {Object.keys(element)}</Text>
          <Text>Total Sale: ${element[Object.keys(element)].sales}</Text>
          <Text>Total Order: {element[Object.keys(element)].orders}</Text>
          <Text>Total Items: {element[Object.keys(element)].items}</Text>
      
         
      </View>
    );
  });
}else{
  return <Text></Text>;
}
};


    return (
        <View style={styles.container}>

        <TextInput
            label='Start Date - YYYY/MM/DD'
            mode="outlined"
            keyboardType="numeric"
            value={startdate}
            onChangeText={(text) =>setstartdate(text) }
        />
        <TextInput
            label='End Date - YYYY/MM/DD'
            mode="outlined"
            keyboardType="numeric"
            value={enddate}
            onChangeText={(text) =>setenddate(text) }
        />
        <Button
        style={{marginTop:20}}
         mode="contained" 
         onPress={() => reports()}
        >
          See Report
        </Button>

    


        

            <Text style={{fontSize:25, paddingBottom:5, paddingTop:20}} >Reports</Text>
            <Text style={{fontSize:15, paddingBottom:20, paddingTop:5}}> {startdate} to {enddate}</Text>
            <Text>Total Sales: ${alldata.length > 0 ? alldata[0].total_sales : 0}</Text>
            <Text>Total Orders: {alldata.length > 0 ? alldata[0].total_orders : 0}</Text>
            <Text>Total Item: {alldata.length > 0 ? alldata[0].total_items : 0}</Text>
            {list()}
        </View>
        )
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    padding: 5,
    width: '100%',
    height: '100%',
    backgroundColor: '#eee',
  },
});
export default Reports;