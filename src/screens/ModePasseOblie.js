import { Alert, StyleSheet, Text, TouchableOpacity, View,Modal,Pressable } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { Url } from '../api';
import Feather from 'react-native-vector-icons/Feather';
import { FontAwesome5,MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import img from '../../assets/images/success3.gif'
function ModePasseOblie  () {
    const navigation = useNavigation();
    const[EmailValider,setValiderEmail]=useState('');
    const[btnRecherche,setBtnRecherch]=useState(true)
    const[visible,setVisible]=useState(false);
    const [ValiderPassword,setValiderPassword]=useState('');
const[Validerr_Password,setValiderR_Password]=useState('');
const [modalVisible, setModalVisible] = useState(false);
const[ViewModale,setViewModale]=useState(false);
const [One,setOne]=useState()
    const [data,setData]=useState({
        email:"",
        password:"",
        retaperPassword:"",
        checkTextInputChange:false,
        checkEmailInputChange:false,
        secureTextEntry:true,
        securePasswordEntry:true,
        isValidUser:true,
        isValidPassword:true,
        isValidPassword_R:true
    });
    useEffect(() => {

        setData({...data,
          email:"",
          password:"",
          retaperPassword:"",
          checkTextInputChange:false,
          checkEmailInputChange:false,
          secureTextEntry:true,
          securePasswordEntry:true,
          isValidUser:true,
          isValidPassword:true,
    isValidPassword_R:true
      });
    }, []);
    
    const EmailChange = (val) => {
       // console.log(val);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w\w+)/;
        if (reg.test(val) === false) {
          setValiderEmail("e-mail n'est pas correct");
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
        setValiderEmail('');
        }
      }
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


const passwordChange=(val)=>{
    if(val.length>=6){
        setData({
            ...data,
            password:val,
            isValidPassword: true
        });
        setValiderPassword('');
        return true;
    }
    else{
        setData({
            ...data,
            password:val,
            isValidPassword:false
        })
        setValiderPassword('Le mot de passe doit contenir au moins 6 caractères');
        return false
    }
  };
  const password_RetapeChange=(val)=>{
    if(val===data.password){
        setData({
            ...data,
            retaperPassword:val,
            isValidPassword_R:true
        });
        setValiderR_Password('');
        return true;
    }
    else{
        setData({
            ...data,
            retaperPassword:val,
            isValidPassword_R:true
        })
        setValiderR_Password('mot de passe et retaper mot de passe incompatible');
        return false
    }
  };
  const updateSecureTextEntry = () => {
    setData({
        ...data,
        secureTextEntry: !data.secureTextEntry
    });
  };
  
  const updateSecurePasswordEntry = () => {
    setData({
        ...data,
        securePasswordEntry: !data.securePasswordEntry
    });
  };

const uploadUserByEmail=async()=>{
const {email}=data;
if (email==''){
    Alert.alert("Veuillez remplir Email")
    return false;
}
if (!EmailValider){
    console.log("Email",email)
    try{
        const response = await fetch(Url+"api/findByEmail/"+email);
        const json = await response.json();
        console.log("fetch",json);
        if(json.membersOne!=null){
            setVisible(true);
            setBtnRecherch(false)
            setOne(json.membersOne)
        }else{
            setVisible(false);
            setBtnRecherch(true)
            Alert.alert("Aucun résultat de recherche")
            return false ;
         }
  
    }catch(e){
        console.log(e)
    }
}else{
   Alert.alert("Aucun résultat de recherche")
   return false 
}



}

const modifer=async()=>{
const {email,password,retaperPassword}=data;
    console.log("Email",email,"password",password,"rettaper_pass",retaperPassword);
    try{
        if ((email=='')||(password=='')||(retaperPassword=='')){
            Alert.alert("Veuillez remplir les champs");
            return false;
        }
        if (password.length<6){
          Alert.alert("le mot de passe doit contenir au moins 6 caractéres")
        }
        
        if (password===retaperPassword){
       var  Email=String(email)  ;
            //console.log("one",One)

          //console.log("mooooooot",mdp);
            fetch(Url+'api/updateMdp/'+ Email, {
                method: "PUT",
                headers : {
                  "Content-Type" : 'application/json',
              
              
                },
                
                body: JSON.stringify(
               
                   { 
                    password:password,
                    retapper_mdp:retaperPassword
                   }
              
                
                )
                
              }).then(res=>res.json())
              .then(async(data) => {
                
                console.log(data);
                    setViewModale(true)
                setModalVisible(!modalVisible)
                                                         

                    })
                

    }
    else{
        Alert.alert("mot de passe et retaper mot de passe incompatible")
        return false ;
    }
}catch(e){
        console.log(e)
    }

}
const Annuler=()=>{
    navigation.navigate("Login");
}
  return (
    <View style={styles.container}>
        <TouchableOpacity style={{marginTop:20}} onPress={()=>navigation.navigate("Login")}>
        <Icon
                as={<MaterialCommunityIcons name="arrow-left" />}
                size={7}
                m={2}
                _light={{
                  color: "black",
                }}
                _dark={{
                  color: "gray.300",
                }}
              />
        </TouchableOpacity>
   <View style={styles.buttonStyleX}>
        
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
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(val)=>EmailChange(val)}
            onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
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
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
            //onChangeText={text => SetEmail(text)}
          />
        </View>
        <Text  style={{color:'red',marginLeft:10,fontWeight:'bold',fontStyle:'italic' ,marginTop:2}}>{EmailValider}</Text>
      </View>
                {visible&&(
                    <View style={{marginTop:5,alignContent:"center",justifyContent:'center'}}>
                           {/* Password Input Field */}
      <View style={styles.Viewpassword}>
        
        <View style={styles.PasswordInput}>
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
            secureTextEntry={data.secureTextEntry ? true : false}
            placeholder="Password"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
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
        <Text  style={{color:'red',marginLeft:2,fontWeight:'bold',fontStyle:'italic',fontSize:12 ,marginTop:2}}>{ValiderPassword}</Text>
      </View>
         {/*Rettape Password Input Field */}
   <View style={styles.Viewpassword}>
        
        <View style={styles.PasswordInput}>
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
            secureTextEntry={data.securePasswordEntry ? true : false}
            placeholder="retaper Mot de pass"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
            onChangeText={(val)=>password_RetapeChange(val)}

           InputRightElement={
            <TouchableOpacity
                                        onPress={updateSecurePasswordEntry}
                                    >
                                        {data.securePasswordEntry ?
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
        <Text  style={{color:'red',marginLeft:10,fontWeight:'bold',fontSize:12,fontStyle:'italic' ,marginTop:2}}>{Validerr_Password}</Text>
      </View>

      <TouchableOpacity style={styles.buttonStyle}>
    <Button style={styles.buttonModifer} 
       onPress={() => modifer()}
    //onPress={() => navigation.navigate("Drawer") }
    >
    Modifier
    </Button>
  </TouchableOpacity>

  <TouchableOpacity style={styles.buttonStyle}>
    <Button style={styles.buttonAnnuler} 
       onPress={() => Annuler()}
    //onPress={() => navigation.navigate("Drawer") }
    >
    Annuler
    </Button>
  </TouchableOpacity>

                    </View>
                )}



          {ViewModale &&(

<View style={styles.centeredView}>
<Modal
animationType="slide"
transparent={true}
visible={modalVisible}
onRequestClose={() => {
Alert.alert("Modal has been closed.");
setModalVisible(!modalVisible);
}}
>
<View style={styles.centeredView}>
<View style={styles.modalView}>
    <Image
        source={img}
        alt="img"
        width={100}
        height={100}
    />
<Text style={styles.modalText}>mot de passe à été changé </Text>
<Pressable
  style={[styles.button, styles.buttonClose]}
  onPress={() =>{ setModalVisible(!modalVisible);
    navigation.navigate("Login");
  }}
>
  <Text style={styles.textStyle}>Ok</Text>
</Pressable>
</View>
</View>
</Modal>

</View>



          )}      
     {/* Button */}
     {btnRecherche &&(
    <TouchableOpacity style={styles.buttonStyle}>
    <Button style={styles.buttonDesign} 
       onPress={() => uploadUserByEmail()}
    //onPress={() => navigation.navigate("Drawer") }
    >
    Rechercher
    </Button>
  </TouchableOpacity>
     )}
 

    </View>
  )
}

      
export default () => {
    return (
      <NativeBaseProvider>
       
          <ModePasseOblie />
        
      </NativeBaseProvider>
    )
  }

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      buttonStyle:{
        marginTop:5,
        marginLeft:40,
        marginRight:40,
        paddingLeft:70,
        paddingRight:70,
     
        color:'#CBCFD4'
      },
      emailInput:{
        marginTop:10,
        marginRight:5,
       
      },
      buttonStyleX:{
        marginTop:30,
        marginLeft:15,
        marginRight:15
      },
      buttonDesign:{
        backgroundColor:'#026efd',
        borderRadius:10
      },

      Viewpassword:{
        marginTop:1,
        marginLeft:15,
        marginRight:15
      },
      PasswordInput:{
        marginTop:3,
        marginRight:5,
       
      },
      buttonModifer:{
        backgroundColor:'#32CD32',
        borderRadius:10,
        opacity:1
      },

      buttonAnnuler:{
        backgroundColor:'gray',
        borderRadius:10
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
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
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }


})