import React, { useState, useEffect } from 'react';
import { Text,TextInput, View, StyleSheet, Button ,TouchableOpacity,ToastAndroid,Keyboard,FlatList,Dimensions,ScrollView, Alert} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Icon } from 'react-native-elements';
import { getDataScanne, storegeDataScanne } from './autheScreens/StrogeScanne';
import { getOnetData ,updateOneData,storeOneData} from './autheScreens/StrogeUserOne';
import { Url } from '../api';


import DetailOneTransaction from "../components/DetailOneTransaction";
export default function ScanneQrCode({navigation}) {

  const SCREEN_WIDTH = Dimensions.get('window').width;

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [dataScanee,setDataScanne]=useState(' ');
  const [ButtonVisible,setButtonVisible]=useState(false);
const [remise,setRemise]=useState('');
  const [Onefetch,setFetchData]=useState();
const [One,SetOne]=useState([]);
const[memberOneFetch,setMemberOne]=useState()


//GetUser





  useEffect(() => {
    (async  () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned =  async({ type, data }) => {
  

  

 
      try {

        const ArrayData=[];
        const response = await fetch(Url+"api/findByEmail/"+String(data));
        const json = await response.json();
        console.log("kdkdkdkdkdk",json.membersOne);
        setMemberOne(json.membersOne)
        //console.log("setMemberOne",memberOneFetch)
        setFetchData(json.membersOne.email);
     
        if (json.membersOne.email===String(data)){
        setScanned(true);
        ArrayData.push(json.membersOne);
        SetOne(ArrayData);
                                             
        setDataScanne(JSON.stringify(data))
        
        console.log("Arraydata",One)

    
  
        storegeDataScanne(json.membersOne);
   
    
     
        }
        if (json.membersOne.email!=String(data)){
          ToastAndroid.show('Aucun code QR valide détecté', ToastAndroid.SHORT);
          setDataScanne(' ');
          setScanned(true);
       
        }
        else{
          setButtonVisible(true);
        }

    } catch (error) {
      console.log("error", error);
    }
  
 
   
  
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const createTransaction=async()=>{

    if (remise!=0){
    try{
      const currentU=await getOnetData();
      const UserOnefetch= await getDataScanne();





      console.log("CurrentU",currentU);
     // console.log("UserOneF",UserOnefetch);


    
      fetch(Url+"transaction/listeTransaction", {
          method: 'POST',
        
          headers:{
              "Content-Type" : 'application/json',
             
          },
          body:JSON.stringify({
            currentUser:{
              id:currentU._id,
              nom:currentU.nom,
              email:currentU.email
            },
            User:{
              id:UserOnefetch._id,
              nom:UserOnefetch.nom,
              email:UserOnefetch.email,
              profileImg:UserOnefetch.profileImg,
              remise:parseInt(remise)
            },
            remise:parseInt(remise)
                   })

        
      }).then(res=>res.json())
      .then(async data=>{
        if(data){
          
              console.log("transaction",data);
      }
        
      })
      .catch(err=>{
        console.log(err)
      });
     
 






    }catch(e){
      console.log("error",e)

    }

    try{
      console.log("remise",remise);

        const getcurrentUser=await getOnetData();
        const idone=String(getcurrentUser._id);
        console.log("idCurrentUser",idone);
      
          fetch(Url+"api/updateScroe/"+idone, {
            method: 'PUT',
          
            headers:{
                "Content-Type" : 'application/json',
               
            },
            body:JSON.stringify({
            
                score:getcurrentUser.score+parseInt(remise),
                nbTransaction:getcurrentUser.nbTransaction+parseInt(1)
          
                     })
      
          
        }).then(result=>result.json())
        .then(async response=>{
          if(response){
            
                console.log("Score",response.data.one.score);
                setRemise('')
                getcurrentUser.score=response.data.one.score
                getcurrentUser.nbTransaction=response.data.one.nbTransaction
              console.log("newScore",    getcurrentUser.score)
              storeOneData(getcurrentUser)
                console.log("new User",getcurrentUser);
               navigation.navigate("LoadTransaction")
        }
          
        })
        .catch(err=>{
          console.log(err)
        });
      
    
  
    }catch(e){console.log(e)
    
    }
  }else{
    Alert.alert("remplir remise svp")
  }
  }

  

  return (
  
 
               
    <View  style={styles.conatiner}>
      <ScrollView >
      <TouchableOpacity style={{...styles.view2retour}}>
                     <Icon
                         name="arrow-left"
                         type="material-community"
                         size={26}
                         onPress={()=>navigation.goBack()}
                     
                     />
 
                 </TouchableOpacity>
      <View style={styles.scanne}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        //style={StyleSheet.absoluteFill}
        style={{width:300,height:300}}
      />
      <Text> Scanner un code OR One </Text>
       
      {scanned && 
     
      
    
      <Button  title={'Réessayer'}  color="#026efd" onPress={() => {setScanned(false);
        setDataScanne(' ');
        setButtonVisible(false);
      }} />
   
      }
   
    </View>
    <View style={{alignItems:'center', alignContent:'center',justifyContent: 'center',marginTop:20}}>
    

   

    { ButtonVisible && 
    <View>
      
     <View style={styles.buttonStyleX}>
        
        <View style={styles.emailInput}>
        <TextInput
        style={{height: 40}}
        placeholder="Remise"
        onChangeText={newText => setRemise(newText)}
        defaultValue={remise}
        keyboardType='numeric'
      />
        </View>
        <View  style={styles.buttonStyle2}>    

< Button  style={{borderRadius:10}}  title={'Créer une transaction'} color='#12A88C' onPress={()=>createTransaction()} />
</View>
        < ScrollView horizontal={true}
                      
                           
                      > 
                           <View style={{ width:SCREEN_WIDTH }}>
                                
                           <FlatList
              // style={{marginTop:10,marginBottom:10 }}
               //horizontal={true}
              
                 data={One}
                 keyExtractor={(item,index)=>index.toString()}
                 renderItem=
               {
                   ({item,index})=>(
             
                   
                
                   <TouchableOpacity
                   onPress={()=>{
                     Keyboard.dismiss
                    // Alert.alert("One ",item.name+" :"+item.login);
                   

                 }} 
               
                   >
          
                               <DetailOneTransaction
                                   //screenwidth={SCREEN_WIDTH*0.8}
                                   profileImg={item.profileImg}
                                   nom={item.nom}
                                   email={item.email}
                                   domaine={item.domaine}
                             
                                
                                   OnpressList={()=>{
                                    // console.log("iteeeeeeeeeeeeeeem",item);
                                    navigation.navigate("DetailOne",{id:index,_id:item._id })
                                   }}
                             
                                   
                               />
                               
                               </TouchableOpacity>
                  
              
                
                 )
            
               }
             
           />
                 
        
                           </View>
   
                           </ScrollView>   
                           
        
                  
      </View>

   
  
   </View>
   
       
   }
   
 
    </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  conatiner:{
    flex:1,
  },
  scanne: {

  
    alignItems:'center',
    
    alignContent:'center',
 
    justifyContent: 'center',
  },
  buttonStyleX:{

    marginLeft:15,
    marginRight:15
  },
  emailInput:{
    marginTop:10,
    height: 30,
    margin: 20,
    borderRadius:10,
    borderWidth: 1,
  justifyContent:'center',
  alignContent:'center',
  alignItems:'center'
    
  },
 
  view2retour:{
    marginTop:30,
    margin:15,
    width:40,
    height:40,
    // backgroundColor:colors.cardbackground,
    alignItems:"center",
    justifyContent: 'center',
    borderRadius:20,
    },

    buttonStyle2:{
      marginTop:1,
      marginLeft:15,
      marginRight:15
    },
    buttonDesign2:{
      backgroundColor:'#12A88C'
    },
});