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

const Home = props => {
  const [wdata, setwData] = useState('');
  const [lineitems, setlineitems] = useState('');
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
  const [currentDateTime, setcurrentDateTime] = useState(new Date());
  const [sd, setsd] = useState('ABC Test');

  useEffect(() => {
    let isMounted = true;
    //  fetchorder function fetch new orders and play a sound when new order arrived
    const fetchorder = async () => {
      console.log('fetch process start');
      try {
        let items = await fetch(
          // 'https://jdwebservices.com/aman/wp-json/wc/v3/orders?consumer_key=ck_169efa4f8234008f585604685ced1d8ae88e9635&consumer_secret=cs_0e67c5a70afbf45970ffe0a4c39d6567f9bf3073',
          'https://indianaccentyyc.ca/wp-json/wc/v3/orders?consumer_key=ck_93d6fc3f513b9e972768c4d2906fde5874d00089&consumer_secret=cs_733a061b770250bb164852869d383e20eb442da5'
        );
        var json = await items.json();
        //   console.log(json, "hello");
        const wooorderID = 1 + json[0].id;
        const wooorderIDreal = json[0].id;
        const woosecondlastorderID = json[1].id;
        const woostatus = json[0].status;
        const woototal = json[0].total;
        const woolineitem = json[0].line_items;
        // console.log(woolineitem, 'woolineitem asxcascds');

        setlineitems([woolineitem]);

        var id_valueyt = await AsyncStorage.getItem('idvalue');
        // console.log(id_valueyt, 'In Fetch Order');
        if (id_valueyt == null || id_valueyt == '') {
          console.log(wooorderID, 'wooorderID Plain');
          AsyncStorage.setItem('idvalue', wooorderID.toString()); // +1
          setidvalue(wooorderID);
        }
        // console.log(wooorderIDreal, 'wooorderIDreal Plain');
        AsyncStorage.setItem('orderid', wooorderIDreal.toString()); // normal
        setwData(json);
        setOrderID(wooorderID);
        setOrderIDreal(wooorderIDreal);
      } catch (error) {
        console.error(error);
      }
    };

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      playsoundabc();
      Alert.alert(
        'A new FCM message arrived!',
        JSON.stringify(remoteMessage.notification.body),
      );
    });
    SplashScreen.hide();
    // set interval refresh the app every 10 seconds
    setInterval(() => {
      // fetchorder();
      // logictoplaysound();
    }, 5000);
    return unsubscribe;
  }, []);

  // play sound
  const playsoundabc = async () => {
    try {
      SoundPlayer.playSoundFile('abc', 'ogg');
    } catch (e) {
      alert('Cannot play the file');
      console.log('cannot play the song file', e);
    }
  };

  //Stop the Sound
  const Stopsoundabc = async () => {
    try {
      SoundPlayer.stop('abc', 'ogg');
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

  const printHTML = async () => {
    await RNPrint.print({
      html: `

      <style>
      #invoice-POS{
        box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
        padding:2mm;
        margin: 0 auto;
        width: 44mm;
        background: #FFF;
        
        
      ::selection {background: #f31544; color: #FFF;}
      ::moz-selection {background: #f31544; color: #FFF;}
      h1{
        font-size: 1.5em;
        color: #222;
      }
      h2{font-size: .9em;}
      h3{
        font-size: 1.2em;
        font-weight: 300;
        line-height: 2em;
      }
      p{
        font-size: .7em;
        color: #666;
        line-height: 1.2em;
      }
       
      #top, #mid,#bot{ /* Targets all id with 'col-' */
        border-bottom: 1px solid #EEE;
      }
      
      #top{min-height: 100px;}
      #mid{min-height: 80px;} 
      #bot{ min-height: 50px;}
      
      #top .logo{
        //float: left;
        height: 60px;
        width: 60px;
        background: url(http://michaeltruong.ca/images/logo1.png) no-repeat;
        background-size: 60px 60px;
      }
      .clientlogo{
        float: left;
        height: 60px;
        width: 60px;
        background: url(http://michaeltruong.ca/images/client.jpg) no-repeat;
        background-size: 60px 60px;
        border-radius: 50px;
      }
      .info{
        display: block;
        //float:left;
        margin-left: 0;
      }
      .title{
        float: right;
      }
      .title p{text-align: right;} 
      table{
        width: 100%;
        border-collapse: collapse;
      }
      td{
        //padding: 5px 0 5px 15px;
        //border: 1px solid #EEE
      }
      .tabletitle{
        //padding: 5px;
        font-size: .5em;
        background: #EEE;
      }
      .service{border-bottom: 1px solid #EEE;}
      .item{width: 24mm;}
      .itemtext{font-size: .5em;}
      
      #legalcopy{
        margin-top: 5mm;
      }
      }</style>
      
      <div id="invoice-POS">
        
        <center id="top">
          <div class="logo"></div>
          <div class="info"> 
            <h2></h2>
          </div><!--End Info-->
        </center><!--End InvoiceTop-->
        
       
        
        <div id="bot">
    
              <div id="table">
                <table>
                  
    
                  ${lineitems[0].map(function (k) {
                    return `
                    <tr class="service">
                    <td class="tableitem"><p class="itemtext">${k.quantity} ${k.name}</p></td>
                    <td class="tableitem"><p class="itemtext"></p></td>
                  </tr>`;
                  })}
                  
    
                </table>
                <p>------------------------------------</p>
                <p>Server Admin</p>
                <p> ${currentDateTime}</p>
              </div><!--End Table-->
    
              <div id="legalcopy">
                
              </div>
    
            </div><!--End InvoiceBot-->
      </div><!--End Invoice-->  
    `,
    });
  };

  const printHTMLtest = async () => {
    await RNPrint.print({
      html: `

      <style>
      #invoice-POS{
        box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
        padding:2mm;
        margin: 0 auto;
        width: 44mm;
        background: #FFF;
        
        
      ::selection {background: #f31544; color: #FFF;}
      ::moz-selection {background: #f31544; color: #FFF;}
      h1{
        font-size: 1.5em;
        color: #222;
      }
      h2{font-size: .9em;}
      h3{
        font-size: 1.2em;
        font-weight: 300;
        line-height: 2em;
      }
      p{
        font-size: .7em;
        color: #666;
        line-height: 1.2em;
      }
       
      #top, #mid,#bot{ /* Targets all id with 'col-' */
        border-bottom: 1px solid #EEE;
      }
      
      #top{min-height: 100px;}
      #mid{min-height: 80px;} 
      #bot{ min-height: 50px;}
      
      #top .logo{
        //float: left;
        height: 60px;
        width: 60px;
        background: url(http://michaeltruong.ca/images/logo1.png) no-repeat;
        background-size: 60px 60px;
      }
      .clientlogo{
        float: left;
        height: 60px;
        width: 60px;
        background: url(http://michaeltruong.ca/images/client.jpg) no-repeat;
        background-size: 60px 60px;
        border-radius: 50px;
      }
      .info{
        display: block;
        //float:left;
        margin-left: 0;
      }
      .title{
        float: right;
      }
      .title p{text-align: right;} 
      table{
        width: 100%;
        border-collapse: collapse;
      }
      td{
        //padding: 5px 0 5px 15px;
        //border: 1px solid #EEE
      }
      .tabletitle{
        //padding: 5px;
        font-size: .5em;
        background: #EEE;
      }
      .service{border-bottom: 1px solid #EEE;}
      .item{width: 24mm;}
      .itemtext{font-size: .5em;}
      
      #legalcopy{
        margin-top: 5mm;
      }
      }</style>
      
      <div id="invoice-POS">
        
        <center id="top">
          <div class="logo"></div>
          <div class="info"> 
            <h2></h2>
          </div><!--End Info-->
        </center><!--End InvoiceTop-->
        
       
        
        <div id="bot">
    
              <div id="table">
                <table>
    
                    <tr class="service">
                    <td class="tableitem"><p class="itemtext">2 X Product name</p></td>
                    <td class="tableitem"><p class="itemtext"></p></td>
                  </tr>
                 
                  
    
                </table>
                <p>------------------------------------</p>
                <p>Server Admin</p>
            
              </div><!--End Table-->
    
              <div id="legalcopy">
                
              </div>
    
            </div><!--End InvoiceBot-->
      </div><!--End Invoice-->  
    `,
    });
  };

  // logictoplaysound in this function we add condition to play sound when new order arrived in our app
  const logictoplaysound = async () => {
    console.log('Logic process start');
    // console.log(lineitems[0], 'lineitems');

    try {
      var id_value = await AsyncStorage.getItem('idvalue'); // id value + 1
      setidvalue(id_value);
      var getorderid = await AsyncStorage.getItem('orderid'); // normal, 89
      console.log(
        id_value,
        'Id value',
        getorderid,
        'OrderID',
        'In logic Process Start',
      );
      if (id_value < getorderid) {
        setModal(true);
        console.log('Loading Sound');
        //   SoundPlayer.playUrl('')
        //   const { sound } = await Audio.Sound.createAsync(require("../../assets/ring.mp3"));
        //   setSound(sound);
        console.log(getorderid, 'Playing Sound');
        const setidevalue = AsyncStorage.setItem(
          'idvalue',
          getorderid.toString(),
        );
        console.log(setidevalue, 'setidevalue in play sound');
        setidvalue(getorderid);
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
      `https://indianaccentyyc.ca/wp-json/wc/v3/orders/${orderIDreal}/notes?consumer_key=ck_93d6fc3f513b9e972768c4d2906fde5874d00089&consumer_secret=cs_733a061b770250bb164852869d383e20eb442da5`,
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

  const onclick = async id => {
    if(id == "10")
    {
    setchangecolor10("black");
    setchangecolor15("#006aff");
    setchangecolor20("#006aff");
    setchangecolor25("#006aff");
    setchangecolor30("#006aff");
    setchangecolor35("#006aff");
    setchangecolor40("#006aff");
    }else if(id == "15"){
      setchangecolor10("#006aff");
      setchangecolor15("black");
      setchangecolor20("#006aff");
      setchangecolor25("#006aff");
      setchangecolor30("#006aff");
      setchangecolor35("#006aff");
      setchangecolor40("#006aff");
    }else if(id == "20"){
      setchangecolor10("#006aff");
      setchangecolor15("#006aff");
      setchangecolor20("black");
      setchangecolor25("#006aff");
      setchangecolor30("#006aff");
      setchangecolor35("#006aff");
      setchangecolor40("#006aff");
    }else if(id == "25"){
      setchangecolor10("#006aff");
      setchangecolor15("#006aff");
      setchangecolor20("#006aff");
      setchangecolor25("black");
      setchangecolor30("#006aff");
      setchangecolor35("#006aff");
      setchangecolor40("#006aff");
    }else if(id == "30"){
      setchangecolor10("#006aff");
      setchangecolor15("#006aff");
      setchangecolor20("#006aff");
      setchangecolor25("#006aff");
      setchangecolor30("black");
      setchangecolor35("#006aff");
      setchangecolor40("#006aff");
    }else if(id == "35"){
      setchangecolor10("#006aff");
      setchangecolor15("#006aff");
      setchangecolor20("#006aff");
      setchangecolor25("#006aff");
      setchangecolor30("#006aff");
      setchangecolor35("black");
      setchangecolor40("#006aff");
    }else if(id == "40"){
      setchangecolor10("#006aff");
      setchangecolor15("#006aff");
      setchangecolor20("#006aff");
      setchangecolor25("#006aff");
      setchangecolor30("#006aff");
      setchangecolor35("#006aff");
      setchangecolor40("black");
    }
    else{
      setchangecolor10("#006aff");
      setchangecolor15("#006aff");
      setchangecolor20("#006aff");
      setchangecolor25("#006aff");
      setchangecolor30("#006aff");
      setchangecolor35("#006aff");
      setchangecolor40("#006aff");
    }
    setordertime(id);
  };


  async function connect(port) {
    console.log(port, "Port")
    try {
      var connect = await StarPRNT.connect(port, "StarGraphic", false);
      console.log(connect, "printer"); // Printer Connected!
       seterrorname(JSON.stringify(connect));
       Alert.alert(JSON.stringify(connect));
      //  if (JSON.stringify(connect) == "Success!") {
         printabcs(port);
      //  } else {
      //   await AsyncStorage.removeItem('printerportnumber');
      //  }

    } catch (e) {
      console.error(e.message, "abcddk");
      Alert.alert(JSON.stringify(e.message));
      seterrorname(e.message);
    }
  }





  let commands = [];
commands.push({append:
        "Star Clothing Boutique\n" +
        "123 Star " + {sd} + " Road\n" +
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


  const portDiscovery = async () => {
    console.log('Test Print portDiscovery')
    try {
      const printerads =   await StarPRNT.portDiscovery('All');
      setprintersarr(printerads);
      console.log(printersarr,  "Print Succdsfgess");
      // connect();
      print();
    } catch (e) {
      console.error(e);
    }
  }
  const portDiscoveryStar = async () => {
    console.log('Test Print portDiscoveryStar')
    try {
      const printers = await StarPRNT.portDiscovery('All');
      console.log(printers,  "Print Succdsfgess");
      connect();
      printStarL();
    } catch (e) {
      console.error(e);
    }
  }
  const portDiscoveryprintabcs = async () => {
    console.log('Test Print portDiscoveryprintabcs')
    try {
      // let printers = await StarPRNT.portDiscovery('All');
      // console.log(printers,  "Print Succdsfgess");
      // connect();
      printabcs();
    } catch (e) {
      console.error(e);
    }
  }

















  // Update the order status
  const OrderUpdate = async () => {
    setModal(false);
    const orderstatus = {
      status: 'completed',
    };
    Stopsoundabc();

    var getprinterport = await AsyncStorage.getItem('printerportnumber');
    connect(getprinterport);
    fetch(
      `https://indianaccentyyc.ca/wp-json/wc/v3/orders/${orderIDreal}?consumer_key=ck_93d6fc3f513b9e972768c4d2906fde5874d00089&consumer_secret=cs_733a061b770250bb164852869d383e20eb442da5  `,
      {
        method: 'PUT', // or 'POST'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderstatus),
      },
    )
      .then(response => response.json())
      .then(data => {
        addnote();
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
        setModal(false);
      });
  };

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

  const renderList = item => {
    return (
      <Card style={styles.mycard}>
        <View style={styles.cradView}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Order Detail', {orderID: item.item.id})
            }>
            <View style={{marginLeft: 10}}>
              <Text style={styles.text}>{item.item.date_created_gmt}</Text>
              <Text style={styles.text}>
                #{item.item.id} {item.item.billing.first_name}
              </Text>
              <Text style={styles.text}>status: {item.item.status}</Text>
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
    
     

      <FlatList
        data={wdata}
        renderItem={item => {
          // console.log(item);
          return renderList(item);
        }}
        keyExtractor={item => `${item.id}`}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}>
        <View style={styles.modelView}>
          <View style={styles.modalButton}>
            <TouchableOpacity
              onPress={() => onclick(10)}>
              <Text style={{backgroundColor: changecolor10, padding: 5, color:'#fff'}}>10</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onclick(15)}>
              <Text style={{backgroundColor: changecolor15,  padding: 5, color:'#fff'}}>15</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onclick(20)}>
              <Text style={{backgroundColor: changecolor20,  padding: 5, color:'#fff'}}>20</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onclick(25)}>
              <Text style={{backgroundColor: changecolor25,  padding: 5, color:'#fff'}}>25</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onclick(30)}>
              <Text style={{backgroundColor: changecolor30,  padding: 5, color:'#fff'}}>30</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onclick(35)}>
              <Text style={{backgroundColor: changecolor35,  padding: 5, color:'#fff'}}>35</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onclick(40)}>
              <Text style={{backgroundColor: changecolor40,  padding: 5, color:'#fff'}}>40</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalButton}>
            <Button
              theme={theme}
              mode="contained"
              onPress={() => OrderUpdate()}>
              Accept
            </Button>
            <Button
              mode="contained                                    "
              onPress={() => closepop()}>
              Reject
            </Button>
          </View>
          <Button onPress={() => closepop()}>Cancel</Button>
        </View>
      </Modal>
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
