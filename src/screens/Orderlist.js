import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  VirtualizedList,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Card, Button, FAB} from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StarPRNT } from 'react-native-print-star';
import { ck, cs } from "../screens/utils/keys";

// const [selectedPrinter,setselectedPrinter] =useState('');
// import { Audio } from 'expo-av';
// import * as Print from 'expo-print';

// const printHTML = async () => {
//     await RNPrint.print({
//       html: '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>'
//     })
//   }

const OrderList = ({route,navigation}) => {

  const [wdata, setwData] = useState('');
  const [wdataall, setwDataall] = useState('');
  const [totalamount, settotalamount] = useState('');
  const [total_tax, settotal_tax] = useState('');
  const [abcd, setabcd] = useState(false);
  const [date_created_gmt, setdate_created_gmt] = useState('loading..');
  var [productstatus, setproductstatus] = useState('');
  const [ordertime, setordertime] = useState('');
  const [modal, setModal] = useState(false);
  const [changecolor10, setchangecolor10] = useState('#006aff');
  const [changecolor15, setchangecolor15] = useState('#006aff');
  const [changecolor20, setchangecolor20] = useState('#006aff');
  const [changecolor25, setchangecolor25] = useState('#006aff');
  const [changecolor30, setchangecolor30] = useState('#006aff');
  const [changecolor35, setchangecolor35] = useState('#006aff');
  const [changecolor40, setchangecolor40] = useState('#006aff');
  const [isSubmit, setIsSubmit] = useState(true);
  const [errorname, seterrorname] = useState('');
  const [printersarr, setprintersarr] = useState([]);
  const [lineitems, setlineitems] = useState([]);
  const [feeitem, setfeeitem] = useState('');
  const [billing, setbilling] = useState('');
  const OrderIDfromHome = route.params.orderID;
  console.log(OrderIDfromHome);

  useEffect(() => {
    fetchorder();
    return () => {
      // This is its cleanup.
    };
  }, []);



  const closepop = async () => {
    //Stopsoundabc();
    setModal(false);
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
        + ', ' +('0' + t.getDate()).slice(-2) 
        + '/' + ('0' + (t.getMonth() + 1) ).slice(-2)
        + '/' + (t.getFullYear())
        + ' - ' + ('0' + t.getHours()).slice(-2)
        + ':' + ('0' + t.getMinutes()).slice(-2)
        + ' ' + newformat;

        return formatted;

  }

  const addnote = async () => {
    setIsSubmit(true);
    console.log('addnote start');
    const data = {
      note: `Your Order will Prepair within ${ordertime} minutes`,
    };
    console.log(data, "data +++++++++++++")

    fetch(
      `https://indianaccentyyc.ca/shop/wp-json/wc/v3/orders/${OrderIDfromHome}/notes?consumer_key=ck_93d6fc3f513b9e972768c4d2906fde5874d00089&consumer_secret=cs_733a061b770250bb164852869d383e20eb442da5`,
      // `https://jdwebservices.com/aman/wp-json/wc/v3/orders/${OrderIDfromHome}/notes?consumer_key=ck_169efa4f8234008f585604685ced1d8ae88e9635&consumer_secret=cs_0e67c5a70afbf45970ffe0a4c39d6567f9bf3073`,
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
        setIsSubmit(false);
      })
      .catch(error => {
        console.error('Error:', error);
       
      });
  };


  // printer conection

  async function connect(port) {
    console.log(port, "Port")
    try {
      var connect = await StarPRNT.connect(port, "StarGraphic", false);
      console.log(connect, "printer"); // Printer Connected!
       seterrorname(connect);
      //  Alert.alert(connect);
       if (connect == "Printer Connected"){
         console.log("if part runing")
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

    // console.log("commands startt.....");
  
      const orderdt = wdataall;
      const customername = orderdt.billing.first_name + " " + orderdt.billing.last_name;
      const orderdatetime =datupdate(orderdt.date_created) ;
      const customer_note = orderdt.customer_note;
    let commands = [];
  commands.push({append:
          "ONLINE ORDER\n" +
          customername +
          "\n", fontSize: 40} );
  commands.push({append:
          orderdatetime + 
          "\n", fontSize: 25} );
  commands.push({append:
    customer_note + "\n" +
          "\n", fontSize: 25} );
  
  
        {lineitems.map(function (k) {
      commands.push({append:"" + k.quantity  + " x " + k.name + "" + "\n", fontSize: 40})
    })}  
    commands.push({appendCutPaper:StarPRNT.CutPaperAction.PartialCutWithFeed});
          console.log(commands, "Printing Command Press +++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    
    try {
      var printResult = await StarPRNT.print("StarGraphic", commands, port);
      console.log(printResult, "p326r2+62+62+3030+6+62+96+6"); // Success!
      Alert.alert( "Print",JSON.stringify(printResult));
    } catch (e) {
      console.error(JSON.stringify(e));
      Alert.alert("Message",JSON.stringify(e.message));
    }
    }
  


  // Update the order status
  const OrderUpdate = async (orderstatusupdate) => {
    setModal(false);
    setIsSubmit(false);
var orderstatus = {
  status: orderstatusupdate,
};
    if (orderstatusupdate == "completed") {
      const note = wdataall.customer_note;
      orderstatus = {
        status: orderstatusupdate,
        customer_note: note + ` Your Order will Prepair within ${ordertime} minutes`, 
      };
    }else {
    orderstatus = {
      status: orderstatusupdate,
    };
    }
    if (orderstatusupdate == "completed") {
      var getprinterport = await AsyncStorage.getItem('printerportncumber');
      connect(getprinterport);
      console.log(getprinterport,"print port async", OrderIDfromHome)
    }
   
    fetch(
      `https://indianaccentyyc.ca/shop/wp-json/wc/v3/orders/${OrderIDfromHome}?consumer_key=${ck}&consumer_secret=${cs}`,
      // `https://jdwebservices.com/aman/wp-json/wc/v3/orders/${OrderIDfromHome}?consumer_key=ck_169efa4f8234008f585604685ced1d8ae88e9635&consumer_secret=cs_0e67c5a70afbf45970ffe0a4c39d6567f9bf3073`,
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
        setIsSubmit(false);
        Alert.alert("Order Status:" , orderstatusupdate)
        navigation.navigate("Home")
      })
      .catch(error => {
        console.error('Error:', error);
        setModal(false);
      });
  };

  

  const fetchorder = async () => {
    try {
      console.log(abcd, "abcd ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
     
      let items = await fetch(
        `https://indianaccentyyc.ca/shop/wp-json/wc/v3/orders/${OrderIDfromHome}?consumer_key=${ck}&consumer_secret=${cs}`,
        // `https://jdwebservices.com/aman/wp-json/wc/v3/orders/${OrderIDfromHome}?consumer_key=ck_169efa4f8234008f585604685ced1d8ae88e9635&consumer_secret=cs_0e67c5a70afbf45970ffe0a4c39d6567f9bf3073`,
      );
      // let items = await fetch(`https://indianaccentyyc.ca/shop/wp-json/wc/v3/orders/${OrderIDfromHome}?consumer_key=ck_93d6fc3f513b9e972768c4d2906fde5874d00089&consumer_secret=cs_733a061b770250bb164852869d383e20eb442da5`);
      var json = await items.json();
        // console.log(json, "hello");
      //   console.log(json.total, "total amount");
      const totalamountorder = json.total;
      const customername = json.customer_note;
      console.log(customername, " customername ++++++++++++++++++++++")
      const woototal_tax = json.total_tax;
      const wooproductstatus = json.status;
      const woolineitem = json.line_items;
      const woofeeitem = json.fee_lines.length > 0 ? json.fee_lines[0].total : 0 ;
      // const woofeeitem = json.fee_lines[0].total;

      
      const woobilling = json.billing;

      console.log(woofeeitem, " woofeeitemlength")

      setproductstatus(wooproductstatus);
      setlineitems(woolineitem);
      setfeeitem(woofeeitem);
      setbilling(woobilling);
      settotal_tax(woototal_tax);
      settotalamount(totalamountorder);
      setwData([json.line_items]);
      setwDataall(json);
      setIsSubmit(false);
      if(wooproductstatus == "completed") {
        setdate_created_gmt('Accepted');
      }else {
        setdate_created_gmt('Accept');

      }



      //   console.log(wdata, "wdata");
    } catch (error) {
      console.error(error);
    }
  };





  const renderList = ((item)=>{
    // console.log(item.item, "item")
    return(
        <View style={styles.container_home}>
            
        <View style={styles.box}>
            <View style={styles.inner}>
                <Text style={{textAlign:'center'}}>{item.name} X {item.quantity}</Text>
            </View>
       </View> 
          
                    <View style={styles.box}>
                      <View style={styles.inner}>
                        <Text style={{textAlign:'center'}}>${item.subtotal}</Text>
                        </View>
    
</View> 
<View style={{paddingLeft: 50}}><Text style={{textAlign:'center'}}>--------------------------------------------------</Text></View>
</View>  
      
    )
});

  return (
    isSubmit ?
    <View style={styles.container}>
    <ActivityIndicator size="large" color="#602bc2" />
 </View>
 :
 <SafeAreaView>
       
<ScrollView>
    <View style={styles.container}>
      {/* <Button onPress={() => printHTML()} title="Print HTML" /> */}

      <View style={styles.box4}>
          <View style={styles.inner} />
          <Text style={{fontSize:15, paddingBottom:10}}>Customer Information</Text>
          <Text>Full Name: {billing.first_name } {billing.last_name}</Text>
          <Text>Email: {billing.email }</Text>
          <Text>Phone: {billing.phone }</Text>
          <Text>Note: {wdataall.customer_note }</Text>
        </View>

      <View style={styles.container_home2}>
        <View style={styles.box2 }>
          <View style={styles.inner}>
            <Text style={{fontWeight: 'bold',textAlign:'center' }}>Products </Text>
          </View>
        </View>
        <View style={styles.box2}>
          <View style={styles.inner}>
            <Text style={{fontWeight: 'bold', textAlign:'center' }}>Amount</Text>
          </View>
        </View>
      
      </View>
      <View>



{lineitems.map(item => {
  return(
    <View key={item.id} style={styles.container_home}>
        
    <View key={item.id} style={styles.box}>
        <View style={styles.inner}>
            <Text style={{textAlign:'center'}}>{item.name} X {item.quantity}</Text>
        </View>
   </View> 
      
                <View style={styles.box}>
                  <View style={styles.inner}>
                    <Text style={{textAlign:'center'}}>${item.subtotal}</Text>
                    </View>

</View> 
<View style={{paddingLeft: 50}}><Text style={{textAlign:'center'}}>--------------------------------------------------</Text></View>
</View>  
  
)
})}



{/* <FlatList
        data={wdata[0]}
        nestedScrollEnabled
        renderItem={item => {
          // console.log(item.item,"ITEMS");
          return renderList(item.item);
        }}
        keyExtractor={item => `${item.id}`}
      /> */}

<View style={{backgroundColor:'#222', height:2, marginTop:15}}>
              </View>

              <View style={styles.container_home2}>
        <View style={styles.box2}>
          <View style={styles.inner}>
            <Text style={{textAlign:'center'}}>Tax</Text>
          </View>
        </View>
        <View style={styles.box2}>
          <View style={styles.inner}>
            <Text style={{textAlign:'center'}}>${total_tax}</Text>
          </View>
        </View>
      </View>

     </View>

     
      <View style={styles.container_home2}>
        <View style={styles.box2}>
          <View style={styles.inner}>
            <Text style={{textAlign:'center'}}>Tip</Text>
          </View>
        </View>
        <View style={styles.box2}>
          <View style={styles.inner}>
            <Text style={{textAlign:'center'}}>      
            ${feeitem}
            </Text>
          </View>
        </View>
      </View>
      

      <View style={styles.container_home2}>
        <View style={styles.box2}>
          <View style={styles.inner}>
            <Text style={{textAlign:'center'}}>Amount Total</Text>
          </View>
        </View>
        <View style={styles.box2}>
          <View style={styles.inner}>
            <Text style={{textAlign:'center'}}>${totalamount}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.inner} />
        </View>
      </View>


      <View style={styles.container_home2}>
        <View style={styles.box3}>
          <View style={styles.inner}>
            {/* <Text>{productstatus}</Text> */}
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {
            productstatus == "completed" || productstatus == "cancelled"
            ? 
            <Text>Order Status: {productstatus}</Text> 
            :
            <Button mode="contained"  onPress={() => setModal(true)} >Edit Order</Button>
          }
           
            </View>
                    </View>
        </View>

        <View style={styles.box3}>
          <View style={styles.inner}>
            {/* <Text>{productstatus}</Text> */}
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={{padding:10, backgroundColor:'#03a9f4'}} onPress={() => testprint()}>
            <Text style={{color:'#fff'}}>Re-Print</Text>
      </TouchableOpacity>
             
              </View>
          </View>
        </View>
       
       
      </View>
      
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
       
              mode="contained"
              onPress={() => 
              
                ordertime == '' ? Alert.alert("Please Select Order Preparing Time") :

              OrderUpdate('completed')}>
              Accept
            </Button>
            <Button
              mode="contained"
              onPress={() => OrderUpdate('cancelled')}>
              Reject
            </Button>
          </View>
          <Button onPress={() => closepop()}>Cancel</Button>
        </View>
      </Modal>

    
      </View>
      </ScrollView>
 </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    width: '100%',
    height: 'auto',
    backgroundColor: '#eee',

  },
  container_home: {
    padding: 5,
    width: '100%',
    backgroundColor: '#eee',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container_home2: {
    padding: 5,
    width: '100%',
    height:'auto',
    backgroundColor: '#eee',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  box: {
    padding: 5,
    width: '50%',
    height: 'auto',
  },
  box2: {
    padding: 5,
    width: '50%',
    height: 50,
  },
   box3: {
    padding: 5,
    width: '100%',
    height: 50,
  },

   box4: {
    padding: 10,
   margin: 10,
    backgroundColor:'#ffffff'
  },
  box1: {
    padding: 5,
    width: '100%',
    height: 'auto',
  },
  inner: {
    flex: 1,
    width: '100%',
    padding: 2,
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
export default OrderList;
