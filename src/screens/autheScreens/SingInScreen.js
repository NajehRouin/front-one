import { StatusBar } from 'expo-status-bar';
import React ,{useState,useEffect}from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { FontAwesome5,MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DataOne} from '../../../Data';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { Url } from '../../api';

import { storeOneData } from './StrogeUserOne';
function  SingInScreen (){
  
  const [UserName,setUserName]=useState('');
  const [validMali,setValideMail ] = useState('');

const [validMdp,setValidMdp]=useState('');

  const [data,setData]=useState({
    email:"",
    password:"",
    checkTextInputChange:false,
    checkEmailInputChange:false,
    secureTextEntry:true,
    isValidUser:true,
    isValidPassword:true
});

useEffect(() => {

  setData({...data,
    email:"",
    password:"",
    checkTextInputChange:false,
    checkEmailInputChange:false,
    secureTextEntry:true,
    isValidUser:true,
    isValidPassword:true
});
 
  
  const DestroyUser = async () => {
    
    try {
      await AsyncStorage.setItem('User', '')
      setUserName('');
     
      console.log("UserName : ",UserName);
     
    } catch (e) {
      console.error('Failed to save name.')
    }

   
  };


  DestroyUser();
}, []);



const emailChange=(val)=>{
    if(val.length>=4) {
        setData({
            ...data,
            email: val,
            checkTextInputChange:true,
            isValidUser: true
        });
        setValideMail('');
    }
    else{
        setData({
            ...data,
            email:val,
            checkTextInputChange:false,
            isValidUser:false
        })
    }
};

const EmailChange = (val) => {
  // console.log(val);
   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w\w+)/;
   if (reg.test(val) === false) {
    setValideMail("e-mail n'est pas correct");
     setData({
       ...data,
       email:val,
       checkEmailInputChange:false,
       isValidUser:false
   })
 
     return false;
   }
   else {
     setData({
       ...data,
       email: val,
       checkEmailInputChange:true,
       isValidUser: true
   });
   setValideMail('');
   }
 }
const passwordChange=(val)=>{
    if(val.length>=6){
        setData({
            ...data,
            password:val,
            isValidPassword: true
        });
        setValidMdp('');
    }
    else{
        setData({
            ...data,
            password:val,
            isValidPassword:false
        })
    }
};
const updateSecureTextEntry = () => {
    setData({
        ...data,
        secureTextEntry: !data.secureTextEntry
    });
};

const handleValidUser=(val)=>{
    if(val.length>=4){
        setData({
            ...data,
            isValidUser:true
        })
    }else {
        setData({
            ...data,
            isValidUser: false
        });
    }
};





async function Login(){
  const{ email, password }=data;
    
      
  fetch(Url+"api/one/authenticate" , {
      method: 'POST',
    
      headers:{
          "Content-Type" : 'application/json',
          "Accept":'application/json'
         
      },
      body:JSON.stringify({
       
        email:email,
        password:password,
       
      }),

    
      
  }).then(res=>res.json())
  .then(async data=>{
    try{

    if (email==''){
      setValideMail('email obligatoire');

      return false;

    }
    if (password==''){
      setValidMdp('mot de pass obligatoire');
      return false;
    }




    if(!data.data.status){   
 alert("Échec de la connexion \n Login ou le  mot de passe entré est incorrect !!!");

 console.log("log",data.data.status);
 return false;
  }
  else if (data.data.status==true){

   /* try {
      await AsyncStorage.setItem('User', data.data.one.nom)
      console.log("fff",data.data.one.nom);
      setUserName(data.data.one.nom);
      if (UserName!=null){
        navigation.navigate('Welcom');
      }
      //console.log("User",UserName)

    } catch (e) {
      console.error('Failed to save name.');
    }*/

    storeOneData(data.data.one);

  
    
  
  


    
   
  //AsyncStorage.setItem('User', data.data.one.nom);
 // const jsonValue=JSON.parse(await AsyncStorage.getItem('User'))
  
 

  
  //return jsonValue != null ? JSON.parse(jsonValue) : null;
    navigation.navigate('Welcom');

   
  
  }
}catch (e) {
  console.log('Error')
  }
  })
  .catch(err=>{
    console.log(err)
  });

}







const login=()=>{
  const{ email, password }=data;
const foundUser = DataOne.filter( item => 
   
    {
      
    return  ((email == item.login) && (password == item.mdp));
  }
  
   );
   console.log('email  :'  +email + ' pwd : ' + password);
   console.log(foundUser.length);
   if ( foundUser.length == 1 ) { 
    navigation.navigate("Welcom")
}
else{
  Alert.alert('user invalide');
}

};




    const navigation = useNavigation();
  return (

    <View style={styles.container}>
      <View style={styles.Middle}>
        
        <Box 
        onPress={() => navigation.navigate("#")}  // for navigation 
        style={{height:90, width:90,borderRadius:30,marginTop:20}} 
        shadow={1}
        _light={{
          backgroundColor: "gray.50",
        }}
        _dark={{
          backgroundColor: "gray.700",
        }}
      >
        <AspectRatio ratio={1 / 1} style={{ alignItems:'center',
    justifyContent:'center'}}>
          <Image
            roundedTop="lg"
         
           /* borderRadius={30}
            alignItems='center'
            justifyContent='center'*/
            source={
         {uri:"https://jamaity.org/wp-content/uploads/2021/12/O.N.E.png"}
            }
            borderRadius={30}
            borderTopRadius={30}

            alt="image"
          />
        </AspectRatio>
      </Box>
      </View>
   

      {/* Username or Email Input Field */}
      <View style={styles.buttonStyle}>
        
        <View style={styles.emailInput}>
          <Input style={{backgroundColor:'#EBEDF0'}}
            InputLeftElement={
              <Icon
                as={<MaterialCommunityIcons name="email" />}
                size="sm"
                m={2}
                _light={{
                  color: "black",
                }}
                _dark={{
                  color: "gray.300",
                }}
              />
            }
            variant="outline"
            placeholder="Adresse e-mail "
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
            autoCapitalize="none"
            onChangeText={(val)=>EmailChange(val)}
            onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
            keyboardType="email-address"
            InputRightElement={
              data.checkEmailInputChange ?
                  <Animatable.View
                      animation="bounceIn"
                  >
                      <Feather
                          name="check-circle"
                          color="green"
                          size={20}
                      />
                  </Animatable.View>
                  :null
          }
          />
       

        </View>
       
       <Text  style={{color:'red',marginLeft:10,fontWeight:'bold',fontStyle:'italic' ,marginTop:2}}>{validMali}</Text>
      </View>

      {/* Password Input Field */}
      <View style={styles.buttonStyleX}>
        
        <View style={styles.emailInput}>
          <Input style={{backgroundColor:'#EBEDF0'}}
            InputLeftElement={
              <Icon
                as={<FontAwesome5 name="key" />}
                size="sm"
                m={2}
                _light={{
                  color: "black",
                }}
                _dark={{
                  color: "gray.300",
                }}
              />
            }
            variant="outline"
           // secureTextEntry={true}
            secureTextEntry={data.secureTextEntry ? true : false}
            placeholder="Mot de passe  "
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
            autoCapitalize="none"
            onChangeText={(val)=>passwordChange(val)}


            InputRightElement={
              <TouchableOpacity
                                          onPress={updateSecureTextEntry}
                                      >
                                          {data.secureTextEntry ?
                                              <Feather
                                                  name="eye-off"
                                                  color="grey"
                                                  size={25}
                                              />
                                              :
                                              <Feather
                                                  name="eye"
                                                  color="grey"
                                                  size={25}
                                              />
                                          }
                                      </TouchableOpacity>
              }

          />

        </View>
         
       <Text  style={{color:'red',marginLeft:10,fontWeight:'bold',fontStyle:'italic' ,marginTop:2}}>{validMdp}</Text>
      </View>

      {/* Button */}
      <View style={styles.buttonStyle}>
        <Button style={styles.buttonDesign} 
           onPress={() => Login()}
        //onPress={() => navigation.navigate("Drawer") }
        >
        se connecter
        </Button>
      </View>
      <TouchableOpacity style={styles.text2} onPress={()=>navigation.navigate("ModePasseOblie")}>
        <Text style={{color:'#3A4BE3'}}>Mot de passe oublié ? </Text>
       
      </TouchableOpacity>
  
      <View style={styles.buttonStyle2}>
        <Button style={styles.buttonDesign2} onPress={() => navigation.navigate("inscrit")}>
        Créer nouveau compte
        </Button>
      </View>
            
      {/* Line */}
      {/*
      <View style={styles.lineStyle}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <View>
          <Text style={{width: 50, textAlign: 'center'}}>Ou</Text>
        </View>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>
          */}
      {/* Box */}
      {/* 
      <View style={styles.boxStyle}>
      <Box 
        onPress={() => navigation.navigate("#")}  // for navigation 
        style={{height:50, width:50,borderRadius:30}} 
        shadow={1}
        _light={{
          backgroundColor: "gray.50",
        }}
        _dark={{
          backgroundColor: "gray.700",
        }}
      >
        <AspectRatio ratio={1 / 1}>
          <Image
            roundedTop="lg"
            source={{
              uri: "https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png",
            }}
            alt="image"
          />
        </AspectRatio>
      </Box>
      <Box 
        onPress={() => navigation.navigate("#")}  // for navigation
        style={styles.imageStyle}
        shadow={1}
        _light={{
          backgroundColor: "gray.50",
        }}
        _dark={{
          backgroundColor: "gray.700",
        }}
      >
        <AspectRatio ratio={1 / 1}>
          <Image
            
            roundedTop="lg"
            source={{
              uri: "https://www.transparentpng.com/thumb/facebook-logo-png/photo-facebook-logo-png-hd-25.png",
            }}
            alt="image"
          />
        </AspectRatio>
      </Box>

   
      </View>
          */}
      <StatusBar style="auto" />
    </View>
  );
}

      
export default () => {
    return (
      <NativeBaseProvider>
       
          <SingInScreen />
        
      </NativeBaseProvider>
    )
  }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  LoginText: {
    marginTop:100,
    fontSize:30,
    fontWeight:'bold',
  },
  Middle:{
    alignItems:'center',
    justifyContent:'center',
    marginTop:120
  },
  text2:{
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:5,
    marginTop:15,
    color:'#3A4BE3'
  },
  signupText:{
    fontWeight:'bold'
  },
  emailField:{
    marginTop:30,
    marginLeft:15
  },
  emailInput:{
    marginTop:10,
    marginRight:5,
   
  },
  buttonStyle:{
    marginTop:30,
    marginLeft:15,
    marginRight:15,
    color:'#CBCFD4'
  },


  buttonStyle2:{
    marginTop:30,
    marginLeft:15,
    marginRight:15
  },


  buttonStyleX:{
    marginTop:12,
    marginLeft:15,
    marginRight:15,
    justifyContent:"space-evenly"
  },
  buttonDesign:{
    backgroundColor:'#026efd'
  },

  buttonDesign2:{
    backgroundColor:'#12A93C'
  },

  lineStyle:{
    flexDirection:'row',
    marginTop:30,
    marginLeft:15,
    marginRight:15,
    alignItems:'center'
  },
  imageStyle:{
    width:50,
    height:50,
    marginLeft:20,
    borderRadius:30
  },
  boxStyle:{
    flexDirection:'row',
    marginTop:30,
    marginLeft:15,
    marginRight:15,
    justifyContent:'center'
  },
});
