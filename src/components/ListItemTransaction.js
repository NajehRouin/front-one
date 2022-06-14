import {View,Text,StyleSheet,Image,
    ScrollView, TouchableOpacity} from 'react-native';
import React from 'react'
import { useTheme } from "@react-navigation/native";
//import maps from '../../assets/images/maps-i11111t.png';


import { Url } from '../api';

const ListItemTransaction = (props,OnpressList) => {
  
 




   
    var imagePath=props.profileImg
        //console.log("imagePath",imagePath)
       var  newWord = imagePath.substr(22)
    //  console.log("newWord",newWord);





    const {colors} =useTheme();
  return (
 
           
           <TouchableOpacity  onPress={props.OnpressList }>           
 <View   style={{...styles.card,backgroundColor:colors.card}}>   
      
      <View>
        <Image
          style={{ width: 160, height: 90, borderRadius: 15 }}
          source={{uri:Url+newWord}}
        />
           
      </View>

      <View style={{ flex: 1, paddingHorizontal: 1,paddingLeft:10 ,marginTop:10 }}>
        <Text
          style={{ fontSize: 20,color:colors.text }}
        >{props.nom}</Text>
           <View style={{  paddingHorizontal: 1 }}>
        <Text
          style={{ fontSize: 15,color:colors.text }}
        >{props.email}</Text>
      </View>
      <View style={{  paddingHorizontal: 1 }}>
        <Text
          style={{ fontSize: 15,marginLeft:20,color:colors.text }}
        >-{props.remise}%</Text>
      </View>

     
      </View>
     
 </View>          
               
     
 </TouchableOpacity>    


  )}

export default ListItemTransaction


const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:1
        
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



headerText :{
    color:"#032D56",
    fontSize:20,
    fontWeight:'bold',
    paddingLeft:10,
    

    

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
 card:{
  //margin: 10,
 // backgroundColor: '#fff',
  marginRight: 5,
  paddingHorizontal: 5,
  paddingVertical: 4,
  borderRadius: 10,
  flexDirection: 'row',
  marginLeft:5,
  justifyContent:'center',
  alignItems: 'center',
  height: 130,
  marginTop:8,
  padding:10
},

})