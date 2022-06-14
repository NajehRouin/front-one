import { StyleSheet, Text, View,ScrollView, TouchableOpacity,Linking ,ImageBackground} from 'react-native'
import React ,{useState,useEffect}from 'react'
import { DataOne } from '../../Data'

import { Icon } from 'react-native-elements';
import { Rating } from 'react-native-ratings';


import * as SMS from 'expo-sms';
import { Url } from '../api';
import { getOnetData } from './autheScreens/StrogeUserOne';

export default function DetailOne({navigation,route}) {

 


  const [btnMsg,setBtnMsg]=useState(true);  
 const [stateView,setStateView]=useState(false)

const [fetchOnID,setFetchOne]=useState([]);
const [fetchImage,setfetchImage]=useState();



  
  const {id,_id}=route.params
  //console.log("id",id);
 // console.log("_id",_id);
const idOne=String(_id)


//root GEtByID
const url = Url+'api/one/';

async function getByIdOne(){

  const response = await fetch(url+idOne);
  const json = await response.json();

  try {
const getCurrentUser=await getOnetData();
//console.log("getCurrentUser",getCurrentUser._id)

   if (json.membersOne.statut){
    console.log("ONEEEE",json.membersOne);
   }
   else{
    setFetchOne(json.membersOne);
  //console.log("getid",json.membersOne._id)
  if (json.membersOne._id===getCurrentUser._id){
    setStateView(false);
   
  }
  else{
    setStateView(true);
  }
    setfetchImage(json.membersOne.profileImg.substr(22));
//console.log("One",fetchOnID);
    console.log("Image",json.membersOne.profileImg.substr(22));
    console.log("Setimage",fetchImage)
    return true;
   }

 
  } catch (error) {
    console.log("error", error);
  }
 /* try{
    setfetchImage(fetchOnID.profileImg.substr(22));

  }   catch (error) {
    console.log("error", error);
  }
*/

}



  useEffect(() => {
 
     getByIdOne();
    //console.log("Image",fetchImage)
}, []);



const pressCall=()=>{
  const url='tel://'+fetchOnID.numeroTel;
  console.log("NumeroTel",url)
  Linking.openURL(url)
}
const press_Sms = async () => {
  
  await SMS.sendSMSAsync(  [fetchOnID.numeroTel.toString()],'','');
 
}

  return (
    <View style={styles.container}>
    <ScrollView>
      <View>
      <View style={styles.viewretour}>
                <View style={styles.view2retour}>
                    <Icon
                        name="arrow-left"
                        type="material-community"
                        size={26}
                        onPress={()=>navigation.goBack()}
                    
                    />

                </View>
                <Text style={styles.text2}> Detail {fetchOnID.nom } </Text>
                </View>
    
    <View>
                <ImageBackground
             style={styles.containerImage}
             source={{uri:Url+fetchImage}}
               
            >    
            
        
            </ImageBackground>

        </View>
             
             
              <View style={{flexDirection: 'row', alignItems: 'center',marginTop:10}}>
  <View style={{flex: 1, height: 1, backgroundColor: '#B3B7BC',marginLeft:10}} />
  <View>
    
  </View>
  <View style={{flex: 1, height: 1, backgroundColor: '#B3B7BC',marginRight:10}} />
</View>

              <View style={styles.view2}>
                  <View style={styles.view3}>
                                
                          <Text style={styles.txtName}>{fetchOnID.nom}</Text>
                          <View style={{ justifyContent:'space-between',flexDirection:'row',alignContent:'center',alignItems:'center' }}>
                               {stateView &&(
                                        <Rating
                                        imageSize={15}
                 
                                         onFinishRating={(rating) => {
                                          alert('Star Rating: ' + JSON.stringify(rating));
                                        }}
             
                   
                              />
                               )}
                            
                                 <Text style={styles.txt_transaction}>({fetchOnID.nbTransaction} transactions)</Text>
                            </View>
                          <Text style={styles.txtScore}>Score({fetchOnID.score})</Text>
                              <View style={styles.view4}>
                              <Icon
                                name="map-marker"
                                type="material-community"
                                color='red'
                                size={26}
                            
                            
                            />
                                <Text style={styles.txtAdress}>{fetchOnID.Adresse}</Text>
                                
                              

                          
                              </View>
                              <View style={styles.view4}>
                              <Icon
                                name="email-outline"
                                type="material-community"
                                color='red'
                                size={26}
                            
                            
                            />
                                <Text style={styles.txtlogin}>{fetchOnID.email}</Text>
                                
                              

                          
                              </View>


                              <View style={styles.view4}>
                              <Text style={styles.txt_titre_service}>Type de L’entreprise:</Text>
                                <Text style={styles.txtservice}>{fetchOnID.type_Entreprise}</Text>
                                
                              

                          
                              </View>

                              <View style={styles.view4}>
                              <Text style={styles.txt_titre_service}>Domaine d’activite:</Text>
                                <Text style={styles.txtDomaine}>{fetchOnID.domaine}</Text>
                                
                              

                          
                              </View>
                  </View>
                 

              </View>


              <View style={{flexDirection: 'row', alignItems: 'center',marginTop:10}}>
                          <View style={{flex: 1, height: 1, backgroundColor: '#B3B7BC',marginLeft:10}} />
                          <View>
                            
                          </View>
                          <View style={{flex: 1, height: 1, backgroundColor: '#B3B7BC',marginRight:10}} />
              </View>


                                  {stateView &&
                                  <View style={ {  justifyContent:'space-between',marginTop:20,marginRight:60,marginLeft:60, alignContent:'center',alignItems:'center',flexDirection:'row' }}>

                                            <TouchableOpacity onPress={pressCall}>
                                                <Icon
                                                  name="phone"
                                                  color="green"
                                                  size={35}

                                                />
                                            </TouchableOpacity>


                                            <TouchableOpacity onPress={press_Sms}>
                                                <Icon
                                                  name="message"
                                                  type="Feather"
                                                  color="yellow"
                                                  size={35}
                                                  
                                                />
                                            </TouchableOpacity>
                                         {/*   <TouchableOpacity>
                                                <Icon
                                                  name="facebook-messenger"
                                                  type="material-community"
                                                  color="blue"
                                                  size={35}
                                                  
                                                />
                                            </TouchableOpacity>
                                  */}
                                  </View>
}
      </View>
 

  </ScrollView>


  
  </View>
);
};



const styles = StyleSheet.create({

  container:{
    flex:1,
    paddingTop:20,
    backgroundColor:'#FFFFFF'

   
  },
  view1:{
    width:"100%",
    padding:3,
    alignItems:"center",
    justifyContent:"center"
  },
  containerImage:{
    height:200,
    width:350,
    marginTop:30,
    marginLeft:6,
    marginRight:3
    
},

  viewretour:{
    flexDirection:"row",
    alignItems:"baseline",
    justifyContent: "space-between",

},
view2retour:{
margin:10,
width:40,
height:40,
// backgroundColor:colors.cardbackground,
alignItems:"center",
justifyContent: 'center',
borderRadius:20,
},

text1:{
color:"green",
fontSize:14,
fontWeight:"bold"
},
view2:{
flexDirection:"row",
flex:1,
marginBottom:5,
marginHorizontal:5,
justifyContent:"space-between"
},
view3:{
flex:8
},
text2:{
fontSize:20,
fontWeight:"bold",
color:'#1A68B6',
marginTop:10,
alignContent:'center',
alignItems:'center',
marginRight:115
},
text3:{
fontSize:15,
//color:colors.grey3
},
view4:{
  padding: 5,
 flexDirection:'row',
 alignItems:"center",
 marginTop:5,
 justifyContent:'space-between',
alignContent:'center',
marginRight:50


},
txtName:{
//fontFamily:fonts.android.bold,
fontSize:25,
color:'#032D56',
marginLeft:2
},

txt_transaction:{
  //fontFamily:fonts.android.bold,
  fontSize:15,
  color:'#7C7E82',
  marginLeft:5,
  alignItems:'center',
  marginRight:160
  },

txtScore:{
  //fontFamily:fonts.android.bold,
  fontSize:15,
  color:'#7C7E82',
  marginLeft:2
  },

txtAdress:{
  //fontFamily:fonts.android.bold,
  fontSize:15,
  color:'#032D56',
justifyContent:'flex-start',
alignContent:'center',
marginRight:70
  },


  txtlogin:{
    //fontFamily:fonts.android.bold,
    fontSize:15,
    color:'#032D56',
    marginRight:11
    },


    txt_titre_service:{
      //fontFamily:fonts.android.bold,
      fontSize:10,
      color:'#7C7E82',
   
      },

    txtservice:{
      //fontFamily:fonts.android.bold,
      fontSize:15,
      color:'#032D56',
      marginRight:20
      },
      txtDomaine:{
        //fontFamily:fonts.android.bold,
        fontSize:15,
        color:'#032D56',
        marginRight:60
        },

text5:{
//fontFamily:fonts.android.bold,
fontSize:13,
//color:colors.grey3,
marginLeft:2,
marginRight:5
},
text6:{
//fontFamily:fonts.android.bold,
fontSize:13,
//color:colors.grey3,
marginLeft:0,

},









});
