import { StatusBar } from 'expo-status-bar';
import React,{ useState, useEffect,useRef } from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity ,ScrollView,Image,Modal,Pressable, Alert,} from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box,  AspectRatio } from 'native-base';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from "@react-navigation/native";
import { Url } from '../../api';
import * as FilesSystem from 'expo-file-system';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import {Picker} from "@react-native-picker/picker";
import img from '../../../assets/images/success3.gif'




function Signup() {
  const [ArrayDomaine,SetArrayDomaine]=useState([]);
  const [modalVisible, setModalVisible] = useState(false);
const[ViewModale,setViewModale]=useState(false);
const Array=[];
  const ArrayAdresse=[
    {"id": 0,"name": "Tunis"},
     {"id": 1,"name": "sousse"},
     {"id": 2,"name": "monastir"},
     {"id": 3,"name": "sfax"},
      {"id": 4,"name": "mahdia"},
      {"id": 5,"name": "bizerte"},
    ];
  const ArrayTypeDentreprise =[
    {
    "id": 0,
    "type": "Service",
   "Domaine":[ "informatiques", "Les communications","Transport","Services d'études","Travaux publics","Formation professionnelle" ]
  },
  {
    "id": 1,
    "type": "Industriel",
    "Domaine":["agricoles","alimentaires","matériaux de construction","la céramique et du verre","mécaniques", "électriques"]
  },
  {
    "id": 2,
    "type": "Commerce gros",
    "Domaine":["Alimentaires","Cosmétique", "Électroménager", "Meuble"]
  },
  {
    "id": 3,
    "type": "Commerce  détails ",
    "Domaine":["Alimentaires","Cosmétique", "Électroménager", "Meuble"]
  },
  {
    "id": 4,
    "type": "Artisan",
    "Domaine":["Bijoux","Habillement","Produits du Terroir","Cosmétiques et soins","Décoration d'intérieur",
      "Artisans D'Art","Nattes","Céramique","Luminaires","Tapisserie"]
  },

];


  const [Adresse, setAdresse] = useState('');
  const [Domaine,setDomaine]=useState('')
const [type,setType]=useState('');


  const [image, setImage] = useState(null);
  const [file,setFile]=useState(null);
 

  const navigation = useNavigation();
  const {colors} =useTheme();


  const [ValiderNom,setValiderNom]=useState('');
const [validerRemise,setVlaiderRemise]=useState('');

const[EmailValider,setValiderEmail]=useState('');

const [ValiderPassword,setValiderPassword]=useState('');
const[Validerr_Password,setValiderR_Password]=useState('');
const [ValiderNumeroTel,setValiderNumeroTel]=useState('');
//const [ValiderDomaine,setValiderDomaine]=useState('');
//const [ValiderType,setValiderType]=useState('');
//const[ValiderAdresse,setValiderAdresse]=useState('');



const [data,setData]=useState({
  nom:"",
  email:"",
  password:"",
  retaperPassword:"",
  numeroTel:"",
  adresse:"",
  remise:"",
  domaine:"",
  checkTextInputChange:false,
  checkEmailInputChange:false,
  checkNumeroTelChange:false,
  secureTextEntry:true,
  securePasswordEntry:true,
  isValidUser:true,
  isValidPassword:true,
  isValidPassword_R:true,
  checkRemiseInputChange:false,
});

useEffect(() => {

  setData({...data,
    nom:"",
    email:"",
    password:"",
    retaperPassword:"",
    numeroTel:"",
    adresse:"",
    remise:"",
    domaine:"",
    checkTextInputChange:false,
    checkEmailInputChange:false,
    checkNumeroTelChange:false,
    secureTextEntry:true,
    securePasswordEntry:true,
    isValidUser:true,
    isValidPassword:true,
    isValidPassword_R:true,
    checkRemiseInputChange:false,
});
}, []);


const NomChange=(val)=>{
  if(val.length>=4) {
      setData({
          ...data,
          nom: val,
          checkTextInputChange:true,
          isValidUser: true
      });
      setValiderNom('');
  }
  else{
      setData({
          ...data,
          nom:val,
          checkTextInputChange:false,
          isValidUser:false
      })
  }
};

const EmailChange = (val) => {
  console.log(val);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(val) === false) {
    setValiderEmail("Email est  incorrect");
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


const NumeroChange=(val)=>{
  if(val.length==8) {
      setData({
          ...data,
          numeroTel: val,
          checkNumeroTelChange:true,
          isValidUser: true
      });
      setValiderNumeroTel('');
  }
  else{
      setData({
          ...data,
          numeroTel:val,
          checkNumeroTelChange:false,
          isValidUser:false
      })
      setValiderNumeroTel('invalide numero tel ');
  }
};

const handleValidNUmero=(val)=>{
  if(val.length==8){
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
const RemiseChange=(val)=>{
  if((val.length>=1)&&(val.length<=2)) {
      setData({
          ...data,
          remise: val,
          checkRemiseInputChange:true,
          isValidUser: true
      });
      setVlaiderRemise('')
  }
  else{
    if (val.length==''){
      setData({
        ...data,
          remise: val,
          checkRemiseInputChange:false,
          isValidUser: false
      })
      setVlaiderRemise("saisir remise ")

    }else{
      setData({
        ...data,
          remise: val,
          checkRemiseInputChange:false,
          isValidUser: false
      })
      setVlaiderRemise("resmise n'est depasse pas 2 nombre ")
    }

  }
};

  const  openImagePickerAsync = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      //base64 : true
    });

    console.log(result);
  
  
    if (!result.cancelled) {
      setImage(
         result.uri
      );
      FilesSystem.uploadAsync(Url+"img/upload-image", result.uri, {
        fieldName : "profileImg",
        uploadType : FilesSystem.FileSystemUploadType.MULTIPART
      }).then((res)=> setFile(res.body) )
      console.log("uri-img",image)
      console.log("file",file);

    }
  };

  

  const insertUser=async()=>{

    const{ nom ,email,password,retaperPassword,numeroTel,remise}=data;
   // insertimage();
    //console.log("IMMMMMMMMM",file)
    console.log("type",type);
console.log("mdp",password)
if (nom==''){
  Alert.alert("remplir nom svp");
  return false ;
}
if (data.checkEmailInputChange==false){
  Alert.alert('saissie email correct ');
  return false ;
}
if ((data.isValidPassword==true)&&(password===retaperPassword)){
  
  fetch(Url+'api/register', {
    method: "POST",
    headers : {
  
      'Content-Type': 'application/json',
  
    },
    
    body: JSON.stringify({
    
     nom:nom,
     email:email,
     numeroTel:numeroTel,
     domaine:Domaine,
     type_Entreprise:type,
     Adresse:Adresse,
     remise:remise,
     password:password,
     retapper_mdp:retaperPassword,
     profileImg:String(file)
  
    }
    )
    
  }).then(()=>{console.log("res");
  setViewModale(true)
  setModalVisible(!modalVisible)

})
  
  
 
}else{
  Alert.alert("verifier le mot de passe et rettaper mot de passe ");
  return false
}
 /*

  */

  }
  return (
    <View style={styles.container}>
      <View style={styles.Middle}>
        <Text style={styles.LoginText}>S’inscrire</Text>
      </View>
      <View style={styles.text2}>
        <Text>Vous avez déjà un compte ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}><Text style={styles.signupText}> connexion </Text></TouchableOpacity>
      </View>


      
      <TouchableOpacity style={{justifyContent:'center',
                    alignContent:'center',
                      alignItems:'center'}}
                      onPress={openImagePickerAsync}
                      >
               
               {!image &&
               <View>

            
                <Image
                style={styles.styleimg1}
             source={{uri:"https://jamaity.org/wp-content/uploads/2021/12/O.N.E.png"}}
            
                />
                <Text>changer photo </Text>
                   </View>
               }
                {image && 
                    <Image source={{ uri: image  }} style={styles.styleimg} onPress={openImagePickerAsync}/>
               }
          
            </TouchableOpacity>
            
     
            {/* Username */}



      <ScrollView style={styles.scrollView}>





      <View style={styles.buttonStyle}>
        
        <View style={styles.emailInput}>
          <Input style={{backgroundColor:'#EBEDF0'}}
            InputLeftElement={
              <Icon
                as={<FontAwesome5 name="university" />}
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
            placeholder="Nom "
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
            autoCapitalize="none"
            onChangeText={(val)=>NomChange(val)}
            onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
            InputRightElement={
              data.checkTextInputChange ?
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
        <Text  style={{color:'red',marginLeft:10,fontWeight:'bold',fontStyle:'italic' ,marginTop:2}}>{ValiderNom}</Text>
      </View>

      {/*  Email Input Field */}
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
    

{/* nnmero de tel Input Field */}
<View style={styles.buttonStyleX}>
        
        <View style={styles.emailInput}>
        <Input style={{backgroundColor:'#EBEDF0'}}
            InputLeftElement={
              <Icon
                as={<MaterialCommunityIcons name="phone" />}
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
            placeholder="numero de tel"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            keyboardType='phone-pad'
            maxLength={13}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
            onChangeText={(val)=>NumeroChange(val)}
            onEndEditing={(e)=>handleValidNUmero(e.nativeEvent.text)}

           InputRightElement={
            data.checkNumeroTelChange ?
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
        <Text  style={{color:'red',marginLeft:10,fontWeight:'bold',fontStyle:'italic' ,marginTop:2}}>{ValiderNumeroTel}</Text>
      </View>



      
      {/*  Adresse Input Field */}
      <View style={styles.buttonStyleX}>
        
        <View style={styles.emailInput}>
        <Picker
        selectedValue={Adresse}
        onValueChange={(value, index) => {setAdresse(value) ;console.log('Add',value)}}
        mode="dropdown" // Android only
        style={styles.picker}
      >
         <Picker.Item label="Sélectionnez votre adresse" value="" />
         { ArrayAdresse.map((item, key)=>(
                <Picker.Item label={item.name} value={item.name} key={key} />)
                )}

        
      </Picker>
      
        </View>
      </View>

      
    {/*  Remise Input Field */}
    <View style={styles.buttonStyleX}>
        
        <View style={styles.emailInput}>
          <Input style={{backgroundColor:'#EBEDF0'}}
          
            variant="outline"
            placeholder="Remise"
            autoCapitalize="none"
            onChangeText={(val)=>RemiseChange(val)}
            onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
            keyboardType='phone-pad'
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
        <Text  style={{color:'red',marginLeft:10,fontWeight:'bold',fontStyle:'italic' ,marginTop:2}}>{validerRemise}</Text>
      </View>

      {/*  type de service  Input Field */}
      <View style={styles.buttonStyleX}>
        
        <View style={styles.emailInput}>
     

<Picker
        selectedValue={type}
        onValueChange={(value, index) => {setType(value.type);
          console.log("value",value.type)
         SetArrayDomaine(value.Domaine)
         console.log("Array",ArrayDomaine)
         Array.push(ArrayDomaine);
         console.log("Array2",Array)
         
            }
        
        }
        mode="dropdown" // Android only
        style={styles.picker}
      >
        <Picker.Item label="Type d'entreprise" value="" />
        { ArrayTypeDentreprise.map((item, key)=>(
          
                <Picker.Item label={item.type} value={item} key={key} />
      
          )
          
        
          
        
                )
              
                }
                
      </Picker>
        </View>
      </View>


      {/*  domaine d'activite Input Field */}
      <View style={styles.buttonStyleX}>
        
        <View style={styles.emailInput}>
        
<Picker
        selectedValue={type}
        onValueChange={(value, index) =>{setDomaine(value);console.log("Domaine",value)}}
        mode="dropdown" // Android only
        style={styles.picker}
      >
        <Picker.Item label="Domaine " value="" />
        {ArrayDomaine.map((item, key)=>(
                <Picker.Item label={item} value={item} key={key} />)
                )}
      </Picker>
        </View>
      </View>

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

<Text style={styles.modalText}>Vous savez inscrit avec succés</Text>
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
      <TouchableOpacity style={styles.buttonStyle} >
        <Button style={styles.buttonDesign} onPressIn={()=>{
          insertUser();
        }}>
        S’inscrire
        </Button>
    
      </TouchableOpacity>



      {/* Box */}
     
      <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
     
        <Signup />
      
    </NativeBaseProvider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex:1,
 
  },
  styleimg1:{    
    height:100,
   width:100,
   borderBottomLeftRadius: 30,
   borderBottomRightRadius: 30,
   borderTopRightRadius: 30,
   borderTopLeftRadius: 30,
   marginTop:10,

  },
 styleimg:{    
  height:200,
 width:300,
 borderBottomLeftRadius: 30,
 borderBottomRightRadius: 30,
 borderTopRightRadius: 30,
 borderTopLeftRadius: 30,
 marginTop:10,
 marginLeft:6,
 marginRight:6,
},
 
    view2:{
        flexDirection:"row",
      
        marginBottom:5,
        marginHorizontal:5,
        justifyContent:"space-between"
        },
        view3:{
            flex:1
            },
  LoginText: {
    marginTop:30,
    fontSize:30,
    fontWeight:'bold',
  },
  Middle:{
    alignItems:'flex-start',
    marginLeft:20,
    justifyContent:'center',
  },
  text2:{
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:5
  },
  signupText:{
    fontWeight:'bold'
  },
  emailField:{
    marginTop:10,
    marginLeft:15
  },
  emailInput:{
    marginTop:1,
    borderRadius:30
  },
  buttonStyle:{
    marginTop:15,
    marginLeft:15,
    marginRight:15,
    marginBottom:3,
  },
  buttonStyleX:{
    marginTop:1,
    marginLeft:15,
    marginRight:15
  },
  buttonDesign:{
    backgroundColor:'#026efd',
    borderRadius:30
  },
  lineStyle:{
    flexDirection:'row',
    marginTop:30,
    marginLeft:15,
    marginRight:15,
    alignItems:'center'
  },
  imageStyle:{
    width:80,
    height:80,
    marginLeft:20,
  },
  boxStyle:{
    flexDirection:'row',
    marginTop:30,
    marginLeft:15,
    marginRight:15,
    justifyContent:'space-around'
  },
  scrollView: {
    
    marginHorizontal: 20,
  },
  image:{
    alignItems:'center',
alignContent:'center',
    justifyContent:'center',

  },
  modalView: {
    marginTop: 300,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 5
  },


  modalText: {
    margin: 20,
    textAlign: "center"
  },
  centeredView: {

    justifyContent: "center",
    alignItems: "center",
    marginTop: 120
  },
  picker: {
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#666",
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
    textAlign: "center",
    
  },

});
