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
import messaging from '@react-native-firebase/messaging';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Button} from 'react-native-paper';
import {
  shownotification,
  handleScheduleNotification,
  handlecancel,
} from './Notificationorder';
import SplashScreen from 'react-native-splash-screen';
import SoundPlayer from 'react-native-sound-player';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import { StarPRNT } from 'react-native-print-star';
import { ck, cs } from "../screens/utils/keys";
import moment from 'moment';
const Home = props => {
  const [wdata, setwData] = useState('');
  const [lastsingleorderdata, setlastsingleorderdata] = useState([]);
  const [diffsecond, setdiffsecond] = useState('0');
  const [lineitems, setlineitems] = useState([]);
  const [orderID, setOrderID] = useState('');
  const [orderIDreal, setOrderIDreal] = useState('');
  const [modal, setModal] = useState(false);
  const [idvalue, setidvalue] = useState('');
  const [ordertime, setordertime] = useState('');
  const [changecolor10, setchangecolor10] = useState('#006aff');
  const [changecolor15, setchangecolor15] = useState('#006aff');
  const [changecolor20, setchangecolor20] = useState('#006aff');
  const [changecolor25, setchangecolor25] = useState('#006aff');
  const [changecolor30, setchangecolor30] = useState('#006aff');
  const [changecolor35, setchangecolor35] = useState('#006aff');
  const [changecolor40, setchangecolor40] = useState('#006aff');
  const [pressed, setpressed] = useState(false);
  const [errorname, seterrorname] = useState('12');
  const [printersarr, setprintersarr] = useState([]);
  const [printerportasync, setprinterportasync] = useState('');
  const [currentDateTime, setcurrentDateTime] = useState(new Date());
  const [sd, setsd] = useState('ABC Test');
  

  useEffect(() => {
    // var currenttime = moment().utc().local().format('Z');

    let isMounted = true;
    //  fetchorder function fetch new orders and play a sound when new order arrived
    const fetchorder = async () => {
      // await AsyncStorage.getItem("epsonprinter").then(
      //   (value) => {
      //     if(value != null)
      //     {
      //     const hj = JSON.parse(value);
      //       setprinterportasync(hj.name);
      //     }
      //   });
      var getprinterport = await AsyncStorage.getItem('printertype');
      if(getprinterport != null || getprinterport != ''){
        setprinterportasync(getprinterport);
      }else {
      setprinterportasync("Not Connected");
      }
      console.log('fetch process start');
      try {
        let items = await fetch(
          // 'https://jdwebservices.com/aman/wp-json/wc/v3/orders?consumer_key=ck_169efa4f8234008f585604685ced1d8ae88e9635&consumer_secret=cs_0e67c5a70afbf45970ffe0a4c39d6567f9bf3073',
          // 'https://indianaccentyyc.ca/shop/wp-json/wc/v3/orders?per_page=20&consumer_key=ck_93d6fc3f513b9e972768c4d2906fde5874d00089&consumer_secret=cs_733a061b770250bb164852869d383e20eb442da5'
          `https://indianaccentyyc.ca/shop/wp-json/wc/v3/orders?per_page=20&consumer_key=${ck}&consumer_secret=${cs}`
        );
        var json = await items.json();
          // console.log(json, "hello");
        const wooorderID = 1 + json[0].id;
        const wooorderIDreal = json[0].id;
        // const woosecondlastorderID = json[1].id;
        const woostatus = json[0].status;
        const woototal = json[0].total;
        const woolineitem = json[0].line_items;
        const woolastsingleorder = json[0];
        setlastsingleorderdata([woolastsingleorder]);
        setOrderIDreal(wooorderIDreal);
        // logictoplaysound();//
        setlineitems([woolineitem]);
        setwData(json);


        var lastorderdate1 =  woolastsingleorder.date_created;
        // console.log(formatAMPM(lastorderdate1), "sdcmdscndsndsn");
       
        var lastorderdate =  datupdate(woolastsingleorder.date_created);
        var lastorderdatemi =  datupdateminutes(woolastsingleorder.date_created);
        var lastorderdate1 =  woolastsingleorder.date_created;
        var currentimezone = moment().utc().local().format('Z');
        console.log(currentimezone, "currentimezone")
        var sddate =  moment(lastorderdate1).utcOffset(currentimezone).format('YYYY/MM/DD hh:mm:ss');
 console.log(sddate, "fvdfvdfvdfvdfvdfvdfvdfvdfvdfvdf")
//  2021/10/29 07:12:19
        var abc =  new Date()
        var currentimezone = moment().utc().local().format('Z');
       var currenttime = moment().utcOffset(currentimezone).format('YYYY/MM/DD hh:mm:ss');


        const diffInMilliseconds1 = Math.abs(new Date(currenttime) - new Date(sddate));
        var diff = diffInMilliseconds1/1000;
        setdiffsecond(diff);
        console.log( ' ')
console.log( ' ')
console.log( ' ')
console.log(diff, 'asdcxDFDDFdasds'); //86400000
console.log( ' ')
console.log( ' ')
console.log( ' ')

        
        // console.log(diffInMilliSeconds + " diffInMilliSeconds");

console.log(currenttime + " Current Time");
console.log(sddate + "Order Time");



        // console.log(abc, 'ABC ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
    




        const lastorderstatus = woolastsingleorder.status;
        var abc =  datupdate(new Date());//.toLocaleTimeString();
        // console.log(lastorderdate, 'sd', abc, "s")



        // var msDiff = new Date(lastorderdate).getTime() - new Date(abc).getTime();    //Future date - current date
// var daysTill30June2035 =  getDifferenceInSeconds(abc,lastorderdate); //Math.floor(msDiff / (1000 * 60 * 60 * 24));
// console.log(daysTill30June2035);
        // console.log(daysTill30June2035, '54ABC ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
    
      if (lastorderstatus == "processing" && diff <= 6) {

        setModal(true);
        // modelpopup()
        console.log('Loading Sound');
        // Stopsoundabc();
        playsoundabc();
        console.log( 'Playing Sound');
        // const setidevalue = AsyncStorage.setItem(
        //   'idvalue',
        //   // getorderid.toString(),
        // );
        // console.log(setidevalue, 'setidevalue in play sound');
        // setidvalue(getorderid);
        shownotification();
      } else {
        console.log('Eles part running');
        console.log('__________________________________');
        shownotification();
      }
        // var id_valueyt = await AsyncStorage.getItem('idvalue');
        // // console.log(id_valueyt, 'In Fetch Order');
        // if (id_valueyt == null || id_valueyt == '') {
        //   console.log(wooorderID, 'wooorderID Plain');
        //   AsyncStorage.setItem('idvalue', wooorderID.toString()); // +1
        //   setidvalue(wooorderID);
        // }
        // console.log(wooorderIDreal, 'wooorderIDreal Plain');
        // AsyncStorage.setItem('orderid', wooorderIDreal.toString()); // normal
        // setwData(json);
        // setOrderID(wooorderID);
        // setOrderIDreal(wooorderIDreal);
      } catch (error) {
        console.error(error);
      }
    };

    // const fetchorder = async () => {
    //   var getprinterport = await AsyncStorage.getItem('printerportncumber');
    //   if(getprinterport != null || getprinterport != ''){
    //     setprinterportasync(getprinterport);
    //   }else {
    //   setprinterportasync("Not Connected");
    //   }
    //   console.log('fetch process start');
    //   try {
    //     let items = await fetch(
    //       // 'https://jdwebservices.com/aman/wp-json/wc/v3/orders?consumer_key=ck_169efa4f8234008f585604685ced1d8ae88e9635&consumer_secret=cs_0e67c5a70afbf45970ffe0a4c39d6567f9bf3073',
    //       // 'https://indianaccentyyc.ca/shop/wp-json/wc/v3/orders?per_page=20&consumer_key=ck_93d6fc3f513b9e972768c4d2906fde5874d00089&consumer_secret=cs_733a061b770250bb164852869d383e20eb442da5'
    //       `https://indianaccentyyc.ca/shop/wp-json/wc/v3/orders?per_page=20&consumer_key=${ck}&consumer_secret=${cs}`
    //     );
    //     var json = await items.json();
    //       console.log(json, "hello");
    //     const wooorderID = 1 + json[0].id;
    //     const wooorderIDreal = json[0].id;
    //     // const woosecondlastorderID = json[1].id;
    //     const woostatus = json[0].status;
    //     const woototal = json[0].total;
    //     const woolineitem = json[0].line_items;
    //     // console.log(wooorderID, 'woolineitem asxcascds');

    //     setlineitems([woolineitem]);

    //     var id_valueyt = await AsyncStorage.getItem('idvalue');
    //     // console.log(id_valueyt, 'In Fetch Order');
    //     if (id_valueyt == null || id_valueyt == '') {
    //       console.log(wooorderID, 'wooorderID Plain');
    //       AsyncStorage.setItem('idvalue', wooorderID.toString()); // +1
    //       setidvalue(wooorderID);
    //     }
    //     // console.log(wooorderIDreal, 'wooorderIDreal Plain');
    //     AsyncStorage.setItem('orderid', wooorderIDreal.toString()); // normal
    //     setwData(json);
    //     setOrderID(wooorderID);
    //     setOrderIDreal(wooorderIDreal);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    const unsubscribe = messaging().onMessage(async remoteMessage => {
     // playsoundabc();
     
    });
    SplashScreen.hide();
    // set interval refresh the app every 10 seconds
    setInterval(() => {
      fetchorder();
      // logictoplaysound();//
    }, 5000);
    return unsubscribe;
  }, []);


  const datupdate = (dataeupdatev) => {
    var t = new Date(dataeupdatev);
    var hours = t.getHours();
    var minutes = t.getMinutes();
    var newformat = t.getHours() >= 12 ? 'PM' : 'AM';  
    
    // Find current hour in AM-PM Format 
    hours = hours % 12;  
    
    // To display "0" as "12" 
    hours = hours ? hours : 12;  
    minutes = minutes < 10 ? '0' + minutes : minutes; 
    var formatted = 
        (t.toString().split(' ')[0]) 
        + ' ' +('0' + t.getDate()).slice(-2) 
        + '/' + ('0' + (t.getMonth() + 1) ).slice(-2)
        + '/' + (t.getFullYear())
        + ' - ' + ('0' + t.getHours()).slice(-2)
        + ':' + ('0' + t.getMinutes()).slice(-2)
        + ' ' + newformat;

        return formatted;

  }
  const datupdateminutes = (dataeupdatev) => {
    var t = new Date(dataeupdatev);
    var hours = t.getHours();
    var minutes = t.getMinutes();
 
    
    // Find current hour in AM-PM Format 
    hours = hours % 12;  
    
    // To display "0" as "12" 
    hours = hours ? hours : 12;  
    minutes = minutes < 10 ? '0' + minutes : minutes; 
    // var formatted = ('0' + t.getHours()).slice(-2)   + ':' + ('0' + t.getMinutes()).slice(-2) + ' ' + newformat;
    var formatted = (t.getFullYear())  + '/' +  ('0' + (t.getMonth() + 1) ).slice(-2) + '/' + ('0' + t.getDate()).slice(-2) + ' ' + ('0' + t.getHours()).slice(-2)   + ':' + ('0' + t.getMinutes()).slice(-2) + ':' + ('0' + t.getSeconds()).slice(-2) ;
    return formatted;

  }
  // play sound
  const playsoundabc = async () => {
    console.log("sound Start")
    try {
      // console.log("sound Start 2")
      SoundPlayer.stop('order', 'mp3');
      SoundPlayer.loadSoundFile('order', 'mp3');
      // console.log("sound Start3")
      SoundPlayer.playSoundFile('order', 'mp3');
      // console.log("sound Start4")
    } catch (e) {
      alert('Cannot play the file');
      console.log('cannot play the song file', e);
    }
  };

  //Stop the Sound
  const Stopsoundabc = async () => {
    try {
      SoundPlayer.stop('order', 'mp3');
    } catch (e) {
      alert('Cannot play the file');
      console.log('cannot play the song file', e);
    }
  };

  //close the popup
  const closepop = async () => {
    Stopsoundabc();
    setModal(false);
  };
  const closepopmodal = async () => {
    setModal(false);
  };

  
  const logictoplaysound = async () => {
    console.log('Logic process start');
    // console.log(lineitems[0], 'lineitems');
  try {
    // console.log(lastsingleorderdata)
      if (lastsingleorderdata.length > 0) {
        lastorderstatus = lastsingleorderdata.date_created;
        console.log(lastorderstatus, "ssdcdss")
        var timeabc = datupdate(lastsingleorderdata.date_created) 
        console.log(timeabc, "ss")
     
      }else {
         lastorderstatus = 'dfgf';
      }
      // var id_value = await AsyncStorage.getItem('idvalue'); // id value + 1
      // setidvalue(id_value);
      // var getorderid = await AsyncStorage.getItem('orderid'); // normal, 89
      // console.log(
      //   id_value,
      //   'Id value',
      //   getorderid,
      //   'OrderID',
      //   'In logic Process Start',
      // );
      console.log(lastorderstatus, "sdcndsjncdsindscvn");
      if (lastorderstatus == "processing") {
        
        setModal(true);
        // modelpopup()
        console.log('Loading Sound');
        playsoundabc();
        console.log( 'Playing Sound');
        // const setidevalue = AsyncStorage.setItem(
        //   'idvalue',
        //   // getorderid.toString(),
        // );
        // console.log(setidevalue, 'setidevalue in play sound');
        // setidvalue(getorderid);
        shownotification();
      } else {
        console.log('Eles part running');
        console.log('__________________________________');
        shownotification();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Add custom notes in our app like time 10, 20, 25, 30 minutes ....
  const addnote = async () => {
    console.log('addnote start');
    const data = {
      note: `Your Order will Prepair within ${ordertime} minutes`,
    };

    fetch(
      `https://indianaccentyyc.ca/shop/wp-json/wc/v3/orders/${orderIDreal}/notes?consumer_key=${ck}&consumer_secret=${cs}`,
      // `https://jdwebservices.com/aman/wp-json/wc/v3/orders/${orderIDreal}/notes?consumer_key=ck_169efa4f8234008f585604685ced1d8ae88e9635&consumer_secret=cs_0e67c5a70afbf45970ffe0a4c39d6567f9bf3073`,
      {
        method: 'POST', // or 'POST'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data, 'addnote');
        setModal(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setModal(false);
      });
  };

  async function connect(port) {
    console.log(port, "Port")
    try {
      var connect = await StarPRNT.connect(port, "StarGraphic", false);
      console.log(connect, "printer"); // Printer Connected!
       seterrorname(connect);
       Alert.alert(connect);
       if (connect == "Printer Connected"){
        testprint(port);
       } else {
        await AsyncStorage.removeItem('printerportncumber');
       }
 
    } catch (e) {
      // var gh = JSON.stringify(e.message);
      console.error(JSON.stringify(e.message), "abcddk");
      Alert.alert(JSON.stringify(e.message));
      // seterrorname(JSON.stringify(e.message));
    }
  }




  async function testprint(port) {
  //console.log(wdata[0], "commands startt.....");

    const orderdt = wdata[0];
    const customername = orderdt.billing.first_name + " " + orderdt.billing.last_name;
    const orderdatetime = datupdate(orderdt.date_created) ;
    const customer_note = orderdt.customer_note;
  let commands = [];
commands.push({append:
        "ONLINE Order\n" +
        customername + "\n" +
        orderdatetime + "\n" +
        customer_note +"\n" +
        "\n"});


      {lineitems[0].map(function (k) {
    commands.push({append:"" + k.quantity  + " x " + k.name + "" + "\n"})
  })}  
  commands.push({appendCutPaper:StarPRNT.CutPaperAction.PartialCutWithFeed});
        console.log(commands, "Printing Command Press +++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  
  try {
    var printResult = await StarPRNT.print("StarGraphic", commands, port);
    console.log(printResult, "p326r2+62+62+3030+6+62+96+6"); // Success!
    Alert.alert(JSON.stringify(printResult));
  } catch (e) {
    console.error(JSON.stringify(e));
    Alert.alert(JSON.stringify(e.message));
  }
  }




  let commands = [];
commands.push({append:
        "Star Clothing Boutique\n" +
        "123 Star " + sd + " Road\n" +
        "City, State 12345\n" +
        "\n"});
commands.push({appendCutPaper:StarPRNT.CutPaperAction.PartialCutWithFeed});

async function printabcs(port) {
  console.log(port, "sdkjcds51651456sdcdscds=======")
  try {
    var printResult = await StarPRNT.print("StarGraphic", commands, port);
    console.log(printResult); // Success!
    Alert.alert(JSON.stringify(printResult));
  } catch (e) {
    console.error(JSON.stringify(e));
    Alert.alert(JSON.stringify(e.message));
  }
}




async function print() {
    try {
      var printResult = await StarPRNT.print("StarGraphic", commands, "1900");
      console.log(printResult, "Print Success"); // Success!
    } catch (e) {
      console.error(e);
    }
  }
async function printStarL() {
    try {
      var printResult = await StarPRNT.print("StarGraphic", commands, "1900");
      console.log(printResult, "Print Success"); // Success!
    } catch (e) {
      console.error(e);
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

  const list = () => {
    return printersarr.map((element) => {
      return (
        <View key={element.key} style={{margin: 10}}>
          <Text>{element.modelName}</Text>
          <Text>{element.macAddress}</Text>
          <Text>{element.portName}</Text>
          <Text>{element.USBSerialNumber}</Text>
      <TouchableOpacity onPress={() => connect(`${element.portName}`)}>
        <Text>Trying to connect</Text>
      </TouchableOpacity>
         
      </View>
    );
  });
};


  const modelpopup = () => {  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}>
        <View style={styles.modelView}>
          <View style={styles.modalButton}>
            <Button
              theme={theme}
              mode="contained"
              onPress={() =>  { Stopsoundabc(); closepopmodal(); props.navigation.navigate("Order Detail", { orderID: orderIDreal})}}>
              View Order
            </Button>
            <Button
              mode="contained"
              onPress={() => closepop()}>
              Reject
            </Button>
          </View>
          <Button onPress={() => closepop()}>Cancel</Button>
        </View>
      </Modal>
  )
  }

  const renderList = item => {
    return (

      item.item.status == "processing" 
      ?  
      <Card style={styles.mycard2}> 
      <View style={styles.cradView}>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('Order Detail', {orderID: item.item.id})
        }>
        <View style={{marginLeft: 10}}>
          {/* <Text style={styles.text}>{datupdate(item.item.date_created_gmt)}</Text> */}
          <Text style={styles.text}>{moment(item.item.date_created).utc().local().format('LLLL')}</Text>
          <Text style={styles.text}>
            #{item.item.id} {item.item.billing.first_name} {item.item.billing.last_name}
          </Text>
          <Text style={styles.text}>status: {item.item.status}</Text>
          <Text style={styles.text}>Total: {item.item.total}</Text>
        </View>
      </TouchableOpacity>
    </View>
  </Card>
      : 
      <Card style={styles.mycard}>
      <View style={styles.cradView}>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('Order Detail', {orderID: item.item.id})
        }>
        <View style={{marginLeft: 10}}>
          {/* <Text style={styles.text}>{datupdate(item.item.date_created_gmt)}</Text> */}
          <Text style={styles.text}>{moment(item.item.date_created).utc().local().format('LLLL')}</Text>
          <Text style={styles.text}>
            #{item.item.id} {item.item.billing.first_name} {item.item.billing.last_name}
          </Text>
          <Text style={styles.text}>Status: {item.item.status}</Text>
          <Text style={styles.text}>Total: {item.item.total}</Text>
        </View>
      </TouchableOpacity>
    </View>
  </Card>
    
    );
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => playsoundabc()}>
        <Text>ABC Play sound</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Stopsoundabc()}>
        <Text>ABC STOP sound</Text>
      </TouchableOpacity>
      <Text>
        ID Value: {idvalue} Order Id: {orderID} ordertime: {ordertime}
      </Text>
      <TouchableOpacity onPress={() => printHTML()}>
        <Text>Print</Text>
      </TouchableOpacity> */}

      <TouchableOpacity 
      onPress={()=>props.navigation.navigate("Printerabc")}>
        <Text style={{padding:10}}>Printer: {printerportasync}</Text>

      </TouchableOpacity>
     
    <Text>{diffsecond}</Text>
         <View style={{paddingLeft: 10, paddingBottom: 10, paddingTop: 10}}>
        
        <Text style={{fontSize: 20}}>Last {wdata.length} Orders</Text>

      </View>

      <View> 
 
        {/* {k.macAddress} {k.portName} {k.USBSerialNumber} */}
      {list()}
      {modelpopup()}
      </View>

      <FlatList
        data={wdata}
        renderItem={item => {
          // console.log(item);
          return renderList(item);
        }}
        keyExtractor={item => `${item.id}`}
      />

      
    </View>
  );
};

const theme = {
  colors: {
    primary: '#006aff',
  },
};
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

  container_home: {
    padding: 2,
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  home_section: {
    width: '100%',
    height: 40,
    padding: 2,
  },
  home_image: {
    width: '100%',
  },
  inner: {
    flex: 1,
  },
  home_image_cat: {
    width: '100%',

    borderRadius: 18,
  },
  text_p: {
    color: '#222',
    fontSize: 30,
  },
  mycard: {
    margin: 5,
    padding: 5,
    backgroundColor: '#90EE90'
  },
  mycard2: {
    margin: 5,
    padding: 5,
    backgroundColor: '#03a9f4'
  },
  cradView: {
    flexDirection: 'row',
   
  },
  text: {
    fontSize: 18,
  },
  cradView: {
    flexDirection: 'row',
  },
  timecolor: {
    // backgroundColor: '#4169E1',
    padding: 5,
    color: '#222',
  },
  modelView: {
    position: 'absolute',
    bottom: 2,
    paddingTop: 5,
    borderTopWidth: 5,
    borderTopColor: '#4169E1',
    width: '100%',
    backgroundColor: 'white',
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
export default Home;