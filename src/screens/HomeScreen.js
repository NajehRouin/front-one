import React,{useState,useEffect,useCallback} from "react";

import {View,Text,StyleSheet,TouchableOpacity,Image,
    ScrollView, TextInput,FlatList, 
   Dimensions,Keyboard,Alert,Modal,Pressable,RefreshControl} from 'react-native';

    import {parameters} from '../global/styles'

import HomeHearder from "../components/HomeHearder";
import { colors } from "../global/styles";
import { SearchBar } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
import { useTheme } from "@react-navigation/native";

//import { Feather as Icon } from '@expo/vector-icons';
import {Icon,  withBadge } from 'react-native-elements'

import OneLisItem from "../components/OneLisItem";


import MapOne from "../components/MapOne";

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Network from 'expo-network';
import OneGridItem from "../components/OneGridItem";
import { Url } from "../api";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const HomeScreen = ({navigation}) =>{

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const [listItem,setListItem]=useState(true);
  const [listGridItem,setListGridItem]=useState(false);
  const [OnmeMap,setOneMap]=useState(false);
  const {colors} =useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [Onefetch,setFetchData]=useState();
const [NumberOne,setNumberOne]=useState();
const [search, setSearch] = useState('');
const [masterDataSource, setMasterDataSource] = useState();
const [GridItemfetch,setGridItemFetch]=useState();
const [getnetwork,setNetwork]=useState(Network.getIpAddressAsync());


const [UserName,setUserName]=useState();

//getNetworIp

useEffect(() => {


  onRefresh();
  
  const fetNetwork = async () => {
    AsyncStorage.getItem("User").then((value) => {
      //console.log("Get Value >> ", value);
setUserName(value);
//console.log("UserName",UserName);
   }).done();
  };


  fetNetwork();
}, []);

const fetchData = async () => {
    
  try {
    const response = await fetch(Url+"api/one");
    const json = await response.json();
  //  console.log("kdkdkdkdkdk",json.membersOne);
    setFetchData(json.membersOne)
    setMasterDataSource(json.membersOne)
  } catch (error) {
    console.log("error", error);
  }
 //console.log("listMemberOne",Onefetch);
};
//getAllMember
  useEffect(() => {




    fetchData();

}, []);

//listGridItem

const fetchDataGrid = async () => {
  const response = await fetch(Url+"api/one");
  const json = await response.json();
  try {

  

   setGridItemFetch(json.membersOne);


    
  } catch (error) {
    console.log("error", error);
  }
  //console.log("listGRIDMemberOne",GridItemfetch);
};

const searchFilterFunction = (text) => {

  // Check if searched text is not blank
  if (text) {
    // Inserted text is not blank
    // Filter the masterDataSource
    // Update FilteredDataSource
    const newData = masterDataSource.filter(function (item) {
      const itemData = item.nom
        ? item.nom.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFetchData(newData);
    setSearch(text);
  } else {
    // Inserted text is blank
    // Update FilteredDataSource with masterDataSource
    setFetchData(masterDataSource);
    setSearch(text);
  }
};

  const Call_RefreshControl = () => {
 
    setFetchData('');
 
    fetchData();
 
  }



useEffect(() => {




  fetchDataGrid();
}, []);


//Number one inscrit 
useEffect(() => {

  const fetchNumberOne = async () => {
    try {
      const response = await fetch(Url+"api/numberOne");
      const json = await response.json();
     // console.log("kdkdkdkdkdk",json.membersOne);
     setNumberOne(json.membersOne)
      
    } catch (error) {
      console.log("error", error);
    }
    //console.log("Number One",NumberOne);
  };

  fetchNumberOne();
}, []);



    return (

            <View style={styles.container}>


         

     <HomeHearder navigation={navigation} style={{backgroundColor:colors.card}}/>
        
           
                        <View style={{...styles.haderTextView,backgroundColor:colors.card}}>
                            <Text style={{...styles.headerText}}>Membres One</Text>
                            <Text style={{color:colors.text,paddingLeft:15}}> {NumberOne} One Utiliser App </Text>
                        </View>
                        


                    <View style={styles.Bouttoncontainer}>
        <View style={styles.Bouttonheader}>
  
                <View style ={{alignItems:"center",    flexDirection:'row', justifyContent:'space-between',marginLeft:40}}>
                    <Icon
                 
                    type ="material-community"
                    name ="format-list-bulleted"
                        color='#747D88'
                    size={32}
                    onPress={()=>{
                      setListItem(true);
                      setListGridItem(false);
                      setOneMap(false);
                     
                  }


                  }
                 
            
                 
                    
                    />
                    <View style={{alignItems:'center' ,justifyContent:'center',marginLeft:90}}>
                    <Icon
                 
                 type ="material-community"
                 name ="apps"
                     color='#747D88'
                 size={32}
                 onPress={()=>{
                  setListGridItem(true);
                  setListItem(false);
                  setOneMap(false);
                 }}
              
                
              
                 
                 />
                </View>
                </View>
                
                <View style={{alignItems:'center',justifyContent:'center',marginRight:40}}>
                <Icon
                 
                 type ="material-community"
                 name ="map-marker"
                     color='#747D88'
                 size={32}
                 onPress={()=>{
                  setOneMap(true);
                  setListGridItem(false);
                  setListItem(false);
                 }}
              
                
              
                 
                 />
                </View>
  
        </View>
      
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
  <View style={{flex: 1, height: 1, backgroundColor: 'black',marginLeft:20}} />
  <View>
    
  </View>
  <View style={{flex: 1, height: 1, backgroundColor: 'black',marginRight:20}} />
</View>
 
 

  
</View>
                         















                        <View style={styles.saerchbar}>
                        <Modal 
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      > 
         <View >
      <View style={styles.modalView}>

          <View style={{ flexDirection:'row', justifyContent:'space-between',marginBottom:20 }}>
           <Text style={[styles.modalText, styles.modalecolor]}  >#Nom</Text>
           <Text style={[styles.modalText, styles.modalecolor]}>#région</Text>
           <Text style={[styles.modalText, styles.modalecolor]}>#score</Text>
           </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
               <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
            </View>
            </View>
            </Modal>
    
                          <TextInput

                        
                            style={{ paddingHorizontal:20, color:'#191A1C',fontSize:16,borderWidth:1,borderRadius:10,width:200 }}
                            placeholder="Rechercher .."
                            placeholderTextColor='#191A1C'
                            onPress={() => setModalVisible(true)}
                            onChangeText={(text) => searchFilterFunction(text)}
                             onClear={(text) => searchFilterFunction('')}
                             value={search}
                             maxLength={10}
                             
                            
                          />
  
                                   <Pressable
      
        onPress={() => setModalVisible(true)}
      >
                          <Icon name="filter-variant"  type ="material-community" size={25} color='#191A1C'
                           style={{ marginRight:10 }}
                            />
</Pressable>
                        </View>

            
          
                       
                        { listItem &&
                           < ScrollView horizontal={true}
                      
                           
                           > 
                                <View style={{ width:SCREEN_WIDTH }}>
                                     
                                <FlatList
                   // style={{marginTop:10,marginBottom:10 }}
                    //horizontal={true}
                   
                      data={Onefetch}
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
               
                                    <OneLisItem
                                        //screenwidth={SCREEN_WIDTH*0.8}
                                        profileImg={item.profileImg}
                                        nom={item.nom}
                                        email={item.email}
                                        domaine={item.domaine}
                                       score={item.score}
                                     
                                        OnpressList={()=>{
                                         // console.log("iteeeeeeeeeeeeeeem",item);
                                         navigation.navigate("DetailOne",{id:index,_id:item._id })
                                        }}
                                  
                                        
                                    />
                                    
                                    </TouchableOpacity>
                       
                   
                     
                      )
                 
                    }
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={Call_RefreshControl}
                      />
                    }
                />
                      
             
                                </View>
                                </ScrollView>
                            
                      }
                       
                    
                


                       < ScrollView horizontal={true}> 

{ listGridItem &&
                           
                          <View style={{ marginTop:1}} >
                     
                 
                      
                              <FlatList
                                   style={{padding:5}}
                                   data ={GridItemfetch}
                                   keyExtractor={(item,index)=>index.toString()}
                                   
                                   renderItem={
                                     
                                    
                                    ({item,index})=>(
                                     
                                  
                                    <TouchableOpacity
                                    onPress={()=>{
                                      Keyboard.dismiss
                                     // Alert.alert("One ",item.nom+" :"+item.email + " " + item.password);
                                    
            
                                  }} 
                                    >
                                      <OneGridItem
                                       profileImg={item.profileImg}
                                       nom={item.nom}
                                       OnpressList={()=>{
                                        // console.log("iteeeeeeeeeeeeeeem",item);
                                        navigation.navigate("DetailOne",{id:index,_id:item._id })
                                       }}
                                      
                                      />
                                       
                                          
                                     
                                           </TouchableOpacity>
           
                                   )}
                                   horizontal={false}
                                   showsHorizontalScrollIndicator={false}
                                   numColumns={2}
                                
                                
           
                              />
                             
                              
                                   
                          </View>
                         
                 
               
                     

                }
                       </ScrollView>





               
                       { OnmeMap &&
                          //MAps 
                                <View>
                             
                     
                          <View style={{padding:10,marginTop:2,marginBottom:30,marginLeft:20,marginRight:20}} >
                            
                                    <MapOne
                                    />
                                  
                          </View>
                   

                     
              
                      
             
                                </View>
                              
                            
                      }



            </View>

    )

}

const styles =StyleSheet.create({

    container:{
        flex:1,
        paddingTop:1,
        
        
    },
    card:{
      margin: 1,
     // backgroundColor: '#fff',
      marginRight: 10,
      paddingHorizontal: 5,
      paddingVertical: 4,
      borderRadius: 12,
      flexDirection: 'row',
      marginLeft:10,
      justifyContent:'center',
      alignItems: 'center',
      height: 115,
      marginTop:8
    },



    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 1
    },
    input: {
      height: 40,
      margin: 5,
      borderWidth: 1,
     marginLeft:30,
     marginRight:30,
     borderRadius:10,
     padding:10

    },

    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },



headerText :{
    color:"#032D56",
    fontSize:20,
    fontWeight:'bold',
    paddingLeft:10,
    

    

},
Bouttonheader:{
  flexDirection:'row',

  height:parameters.headerHeight,
  justifyContent:'space-between',

  
},
Bouttoncontainer:{

  marginBottom:5

  
},

haderTextView:{
   // backgroundColor:"#FFFFFF",
    paddingVertical:1
},
scrollView:{
  marginTop:5
},
saerchbar:{
 
  height:45,
  backgroundColor:'#B5B9BD',
  marginRight:20,
  marginLeft:20,
  paddingLeft:10,
  borderRadius:10,
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between'
},




imageView:{
  borderRadius:10,

  width:SCREEN_WIDTH*0.4430,
  height:SCREEN_WIDTH*0.6000,
  marginLeft:SCREEN_WIDTH*0.035,
  marginBottom:SCREEN_WIDTH*0.0000000001

},
image:{
  height:SCREEN_WIDTH*0.4400,
  width:SCREEN_WIDTH*0.4475,
  borderRadius:3,
},
ListHeader:{fontSize:16,
  color:colors.grey2,
  paddingBottom:10,
  marginLeft:12

},
textView:{
  height:SCREEN_WIDTH*0.1000,
  width:SCREEN_WIDTH*0.4475,
  borderRadius:3,
  alignItems:"flex-start" ,
  justifyContent:"center",
  backgroundColor:"#FFFFFF"
},

modalView: {
  margin: 10,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 30,
  marginTop:100,
  alignItems:'center' ,
  shadowColor: "#000",

  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
button: {
  borderRadius: 20,
  padding: 10,
  elevation: 2
},

buttonClose: {
  backgroundColor: "#2196F3",
},

modalText: {
  borderRadius: 20,
  padding: 10,
  margin:3,
  elevation: 2
},

modalecolor: {
  backgroundColor: "#2196F3",
},

})
export default HomeScreen;