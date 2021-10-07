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
  Alert,
} from 'react-native';
import {Card, Button, FAB} from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// const [selectedPrinter,setselectedPrinter] =useState('');
// import { Audio } from 'expo-av';
// import * as Print from 'expo-print';

// const printHTML = async () => {
//     await RNPrint.print({
//       html: '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>'
//     })
//   }

const OrderList = ({route}) => {
  const [wdata, setwData] = useState('');
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
  const OrderIDfromHome = route.params.orderID;

  useEffect(() => {
    fetchorder();
  }, []);

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

  const Stopsoundabc = async () => {
    try {
      SoundPlayer.stop('abc', 'ogg');
    } catch (e) {
      alert('Cannot play the file');
      console.log('cannot play the song file', e);
    }
  };
  const closepop = async () => {
    Stopsoundabc();
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

  const addnote = async () => {
    setIsSubmit(true);
    console.log('addnote start');
    const data = {
      note: `Your Order will Prepair within ${ordertime} minutes`,
    };
    console.log(data, "data +++++++++++++")

    fetch(
      `https://indianaccentyyc.ca/wp-json/wc/v3/orders/${OrderIDfromHome}/notes?consumer_key=ck_93d6fc3f513b9e972768c4d2906fde5874d00089&consumer_secret=cs_733a061b770250bb164852869d383e20eb442da5`,
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

  // Update the order status
  const OrderUpdate = async () => {
    setIsSubmit(true);
    const orderstatus = {
      status: 'completed',
    };
    printHTML();
    Stopsoundabc();
    fetch(
      `https://indianaccentyyc.ca/wp-json/wc/v3/orders/${OrderIDfromHome}?consumer_key=ck_93d6fc3f513b9e972768c4d2906fde5874d00089&consumer_secret=cs_733a061b770250bb164852869d383e20eb442da5`,
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
        addnote();
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
 
      });
  };



  const fetchorder = async () => {
    try {
      console.log(abcd, "abcd ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
     
      let items = await fetch(
        `https://indianaccentyyc.ca/wp-json/wc/v3/orders/${OrderIDfromHome}?consumer_key=ck_93d6fc3f513b9e972768c4d2906fde5874d00089&consumer_secret=cs_733a061b770250bb164852869d383e20eb442da5`,
        // `https://jdwebservices.com/aman/wp-json/wc/v3/orders/${OrderIDfromHome}?consumer_key=ck_169efa4f8234008f585604685ced1d8ae88e9635&consumer_secret=cs_0e67c5a70afbf45970ffe0a4c39d6567f9bf3073`,
      );
      // let items = await fetch(`https://indianaccentyyc.ca/wp-json/wc/v3/orders/${OrderIDfromHome}?consumer_key=ck_93d6fc3f513b9e972768c4d2906fde5874d00089&consumer_secret=cs_733a061b770250bb164852869d383e20eb442da5`);
      var json = await items.json();
      //   console.log(json, "hello");
      //   console.log(json.total, "total amount");
      const totalamountorder = json.total;
      const woototal_tax = json.total_tax;
      const wooproductstatus = json.status;

      setproductstatus(wooproductstatus);
      settotal_tax(woototal_tax);
      settotalamount(totalamountorder);
      setwData([json.line_items]);
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
                <Text>{item.name} X {item.quantity}</Text>
            </View>
       </View> 
          
                    <View style={styles.box}>
                      <View style={styles.inner}>
                        <Text>${item.subtotal}</Text>
                        </View>
    
</View> 
<View style={{paddingLeft: 9}}><Text>--------------------------------------------------</Text></View>
</View>  
      
    )
});

  return (
    isSubmit ?
    <View style={styles.container}>
    <ActivityIndicator size="large" color="#602bc2" />
 </View>
 :
    <View style={styles.container}>
      {/* <Button onPress={() => printHTML()} title="Print HTML" /> */}
      <View style={styles.box1}>
        <Text>Your Orders</Text>
      </View>

      <View style={styles.container_home2}>
        <View style={styles.box2}>
          <View style={styles.inner}>
            <Text style={{fontWeight: 'bold' }}>Products {abcd}</Text>
          </View>
        </View>
        <View style={styles.box2}>
          <View style={styles.inner}>
            <Text style={{fontWeight: 'bold' }}>Amount</Text>
          </View>
        </View>
      
      </View>

      <FlatList
        data={wdata[0]}
        renderItem={item => {
          // console.log(item.item,"ITEMS");
          return renderList(item.item);
        }}
        keyExtractor={item => `${item.id}`}
      />

      <View style={styles.container_home2}>
        <View style={styles.box2}>
          <View style={styles.inner}>
            <Text>Tax</Text>
          </View>
        </View>
        <View style={styles.box2}>
          <View style={styles.inner}>
            <Text>${total_tax}</Text>
          </View>
        </View>
      </View>

      <View style={styles.container_home2}>
        <View style={styles.box2}>
          <View style={styles.inner}>
            <Text>Amount Total</Text>
          </View>
        </View>
        <View style={styles.box2}>
          <View style={styles.inner}>
            <Text>${totalamount}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.inner} />
        </View>
      </View>


      <View style={styles.container_home2}>
        <View style={styles.box2}>
          <View style={styles.inner}>
            {/* <Text>{productstatus}</Text> */}
            <Button mode="contained" onPress={() => setModal(true)} >Edit Order</Button>
          </View>
        </View>
       
        <View style={styles.box}>
          <View style={styles.inner} />
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

const styles = StyleSheet.create({
  container: {
    padding: 5,
    width: '100%',
    height: '100%',
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
