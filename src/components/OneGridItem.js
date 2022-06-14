import { View, Text ,StyleSheet,Image,Dimensions,TouchableOpacity} from 'react-native'
import React from 'react'
import { useTheme } from "@react-navigation/native";
import { Url } from '../api';
const SCREEN_WIDTH = Dimensions.get('window').width;

const OneGridItem=( props, OnpressList)=> {
  var imagePath=props.profileImg
  
  var  newWord = imagePath.substr(22);
  const {colors} =useTheme();
  return (
    <View style={{flex:1,marginTop:20,marginBottom:30}} >
        <TouchableOpacity onPress={props.OnpressList } >    
      <View style={styles.imageView}>
                                             
                                             <Image
                                             
                                                      style={styles.image}
                                                      source ={{uri:Url+newWord}}
                                             />
                                            
                                         
                                             
                                             <View style={styles.textView}>
                                                     <Text style={{color:colors.cardbackground}}>{props.nom}</Text>
                                                 </View>
                                         </View>
                                      </TouchableOpacity>
                                        
    </View>
  )
}
export default OneGridItem;

const styles=StyleSheet.create({
  image:{
    height:SCREEN_WIDTH*0.4400,
    width:SCREEN_WIDTH*0.4475,
    borderRadius:3,
  },
  textView:{
    height:SCREEN_WIDTH*0.1000,
    width:SCREEN_WIDTH*0.4475,
    borderRadius:3,
    alignItems:"flex-start" ,
    justifyContent:"center",
    backgroundColor:"#FFFFFF"
  },
  
imageView:{
  borderRadius:10,

  width:SCREEN_WIDTH*0.4430,
  height:SCREEN_WIDTH*0.6000,
  marginLeft:SCREEN_WIDTH*0.035,
  marginBottom:SCREEN_WIDTH*0.0000000001

},
  

})