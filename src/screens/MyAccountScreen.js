import { StyleSheet, Text, View,ScrollView, TouchableOpacity,Linking ,ImageBackground,Image} from 'react-native'
import React ,{useState,useEffect}from 'react'
import  { DataOne } from '../../Data'


import { Icon } from 'react-native-elements';
import { Rating } from 'react-native-ratings';

import QRCode from 'react-native-qrcode-svg';
import { useTheme } from "@react-navigation/native";



import { getOnetData } from './autheScreens/StrogeUserOne';

import { Url } from '../api';
 export default function MyAccountScreen({navigation}){
  const [UserOne,setUserOne]=useState('');
  const [fetchImage,setfetchImage]=useState();


      const {colors} =useTheme();


      //getCurrent User


      useEffect(async () => {
        setUserOne(await getOnetData());
      }, []);

    
      async function getImageProfile(){
        //console.log("UserFind",UserOne);
        if (UserOne.statut==false){
          console.log("erreur");
        }else{

        
          try{
            const result=await getOnetData()
            setfetchImage(result.profileImg.substr(22));
       
       
            console.log("imageprofil",result.profileImg.substr(22));
     
          }catch(e){
            console.log(e)
          }
        }
        }




useEffect(() => {
 
  getImageProfile();
 //console.log("Image",fetchImage)
}, []);

 
   return (
     <View style={{...styles.container,backgroundColor:colors.card}}>
    
    
   
                 <TouchableOpacity style={{...styles.view2retour}}>
                     <Icon
                         name="arrow-left"
                         type="material-community"
                         size={26}
                         color={colors.text}
                         onPress={()=>navigation.goBack()}
                     
                     />
 
                 </TouchableOpacity>
             
             
                
               <View >
                   <Image
                   style={{
                       height:180,
                    width:350,
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                    marginTop:10,
                    marginLeft:6,
                    marginRight:6,
                    marginBottom:15,
                 }}
                 source={{uri:Url+fetchImage}}
                   />
               </View>
              
               <ScrollView showsVerticalScrollIndicator={true} >
               <View style={styles.view2}>
                   <View style={styles.view3}>
                   <View style={{ justifyContent:'space-between',flexDirection:'row',alignContent:'center',alignItems:'center' }}>
                                 <Rating
                                            imageSize={15}
                     
                                             onFinishRating={(rating) => {
                                              alert('Star Rating: ' + JSON.stringify(rating));
                                            }}
                 
                       
                                  />
                                  <Text style={styles.txt_transaction}>({UserOne.nbTransaction} transactions)</Text>
                             </View>  
                             <Text style={styles.txtScore}>Score({UserOne.score})</Text>
                             <View style={{ justifyContent:'space-between',flexDirection:'row',alignContent:'center',alignItems:'center',marginTop:20}}>
                             <Icon
                                 name="bank"
                                 type="material-community"
                                            color={colors.text}
                                 size={26}
                                 style={{marginLeft:10}}
                             
                             />
                             <Text style={{color:colors.text,...styles.txtName}}>{UserOne.nom} </Text>

                             <Icon

                                 name="pencil"
                                 type="material-community"
                                color={colors.text}
                                 size={26}
                                 onPress={()=>(
                                   navigation.navigate("Modifierprofil")
                                 )}
                                 
                             
                             />

                             </View>
 
                          
                           
                               <View style={styles.view4}>
                               <Icon
                                 name="map-marker"
                                 type="material-community"
                                 color='red'
                                 size={26}
                                 style={{flex: 2}}
                             
                             />
                                 <Text style={{color:colors.text,...styles.txtAdress}}>{UserOne.Adresse}</Text>
                                 
                               
 
                           
                               </View>
                               <View style={styles.view4}>
                               <Icon
                                 name="email-outline"
                                 type="material-community"
                                 color='red'
                                 size={26}
                              
                             
                             
                             />
                                 <Text style={{color:colors.text,...styles.txtlogin}}> {UserOne.email}</Text>
                                 
                               
 
                           

                               </View>
 
                               <View style={ {  justifyContent:'space-between',marginTop:5, alignContent:'center',alignItems:'center',flexDirection:'row' }}>
 
                                            <TouchableOpacity >
                                                <Icon
                                                name="phone"
                                                color="green"
                                                size={35}
                                                

                                                /> 
                                            </TouchableOpacity>
                                            <Text style={{color:colors.text,...styles.txt_numTel}}> {UserOne.numeroTel}</Text>


                                </View>
                               <View style={styles.view4}>
                               <Text style={styles.txt_titre_service}>Type de L’entreprise:</Text>
                                 <Text style={{color:colors.text,...styles.txtservice}}>{UserOne.type_Entreprise}</Text>
                                 
                               
 
                           
                               </View>
 
                               <View style={styles.view4}>
                               <Text style={styles.txt_titre_service}>Domaine d’activite:</Text>
                                 <Text style={{color:colors.text,...styles.txtservice}}>{UserOne.domaine}</Text>
                                 
                               
 
                           
                               </View>
                   </View>
                  
 
               </View>
 
                    


                    <View style={{marginTop:50,marginBottom:90, alignItems:"center"}}>
                        <QRCode
                            value={UserOne.email ? UserOne.email : "health app"}
                            size={200}
                            bgColor='#000000'
                            fgColor='#FFFFFF'
                        />
                    </View>
 
 
                    </ScrollView>
                          
      
 
  
 
 
   
   </View>
 );
 };
 
 
 
 const styles = StyleSheet.create({
 
   container:{
     flex:1,
     paddingTop:20,
    
 
    
   },
   view1:{
     width:"100%",
     padding:3,
     alignItems:"center",
     justifyContent:"center"
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
 flex:1
 },
 text2:{
 fontSize:20,
 fontWeight:"bold",
 color:'#1A68B6',
 marginTop:10,
 alignContent:'center',
 alignItems:'center',

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
 justifyContent:'space-between'
 },
 txtName:{
 //fontFamily:fonts.android.bold,
 fontSize:15,
 //color:'#032D56',

 },
 
 txt_transaction:{
   //fontFamily:fonts.android.bold,
   fontSize:15,
   color:'#7C7E82',
   marginLeft:5,
   alignItems:'center',

   },
 
 txtScore:{
   //fontFamily:fonts.android.bold,
   fontSize:15,
   color:'#7C7E82',
   marginLeft:2
   },
 
 txtAdress:{
   //fontFamily:fonts.android.bold,
   flex: 2,
   fontSize:15,
  // color:'#032D56',
   textAlign:'center',
   justifyContent:'center',
  
   },
 
 
   txtlogin:{
     //fontFamily:fonts.android.bold,
     flex: 2,
     fontSize:15,
     //color:'#032D56',
     textAlign:'center',
     justifyContent:'center',
     alignContent:'center'
   
     },
     txt_numTel:{
        //fontFamily:fonts.android.bold,
        flex: 2,
        fontSize:15,
       // color:'#032D56',
        textAlign:'center',
        justifyContent:'center',
        alignContent:'center'
      
       
        },
 
     txt_titre_service:{
       //fontFamily:fonts.android.bold,
       fontSize:7,
       color:'#7C7E82',
       
    
       },
 
     txtservice:{
       //fontFamily:fonts.android.bold,
       fontSize:15,
       //color:'#032D56',
       flex: 2,
       textAlign:'center',
       justifyContent:'center',
       alignContent:'center'
       },
 
 
 

 });
 