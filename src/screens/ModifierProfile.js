import { StyleSheet, Text, View,ScrollView, TouchableOpacity,Image,TextInput,Modal,Pressable } from 'react-native'
import React,{ useState, useEffect,useRef } from 'react'; 
import { useTheme } from "@react-navigation/native";
import { Icon } from 'react-native-elements';

import * as ImagePicker from 'expo-image-picker';
import * as Animatable from 'react-native-animatable';
import { getOnetData, storeOneData } from './autheScreens/StrogeUserOne';

import { Url ,UrlImage} from '../api';
import * as FilesSystem from 'expo-file-system';
import img from '../../assets/images/success3.gif'
const ModifierProfile = ({navigation}) => {


const wobbleAnimRef=useRef();

  const [UserOne,setUserOne]=useState('');
  const [UpdateOne,setUpdateOne]=useState('');
  const [fetchImage,setfetchImage]=useState();

  const [file,setFile]=useState(null);
const [Nom,setNom]=useState('');
const[Email,SetEmail]=useState('')
const [Password,setPassword]=useState('');
const [Adress,setAdresse]=useState('');
const [NumeroTel,setNumeroTel]=useState('');
const [Domaine,setDomaine]=useState('');
const [Type,setType]=useState('');

const [modalVisible, setModalVisible] = useState(false);
const[ViewModale,setViewModale]=useState(false);

const [image, setImage] = useState(null);



  useEffect(async () => {
    const data =await getOnetData();
    setUserOne(data);
    console.log("DataUser",data._id);
    setNom(data.nom);
    SetEmail(data.email);
    setAdresse(data.Adresse);
    setPassword(data.password);
    setNumeroTel(data.numeroTel);
    setDomaine(data.domaine);
    setType(data.type_Entreprise);

    //console.log("UserProfil",UserOne)
  }, []);

  async function getImageProfile(){
    //console.log("UserFind",UserOne);
    if (UserOne.statut==false){
      console.log("erreur");
    }else{

    

      try{
        const result=await getOnetData()
        setfetchImage(result.profileImg.substr(29));
   
   
        console.log("imageprofil",result.profileImg.substr(29));
 
      }catch(e){
        console.log(e)
      }
    }
    }




useEffect(() => {

getImageProfile();
console.log("Image",fetchImage);

}, []);
//http://localhost:4000/public/1a66d449-1727-4d59-a06e-2cc19b2f7de7-maps-i11111t.png





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
        }).then((res)=> setFile(res.body))
        console.log("uri-img",image)
        console.log("file",file);
  
      }
    };
  






    const {colors} =useTheme();


  const UpdateProfile=async()=>{
    console.log("UserUpdate",UserOne);
   /* console.log({
      Nom,
      Email,
      Password,
      Domaine,
      NumeroTel,
      Type
    })*/

    

const idUser=String(UserOne._id);

/*console.log("IDUser",idUser);
//console.log("UserOne",UserOne);
/*console.log("Update nom",Nom);*/
const data = new FormData();
      data.append("profileImg", image);


fetch(Url+'api/updateOne/'+ idUser, {
  method: "PUT",
  headers : {
    "Content-Type" : 'application/json',


  },
  
  body: JSON.stringify({
   nom: Nom,
    email:Email,
    password:Password,
    domain:Domaine,
    numeroTel:NumeroTel,
    Adresse:Adress,
    type_Entreprise:Type,
    profileImg:String(file)

  }
  )
  
}).then(res=>res.json())
.then(async(data) => {
  
  console.log(data);
  try{
  const newOne=(data.data.one);
  const User=await getOnetData();
console.log('NewName',newOne.nom)
User.nom=newOne.nom;
User.Adresse=newOne.Adresse;
User.domain=newOne.domain;
User.email=newOne.email;
User.numeroTel=newOne.numeroTel;
User.password=newOne.password;
User.type_Entreprise=newOne.type_Entreprise;
User.profileImg=newOne.profileImg;
storeOneData(User)
//await updateOneData(newOne);

console.log("new User",User);
setViewModale(true)
setModalVisible(!modalVisible)



//console.log("NEWWWWWWWWwUSER",User);
  }catch(e){
    console.log(e);
  }
 } );

 


  }

  async function upload() {
    try {
      const data = new FormData();
      data.append("image", image);
  
      await fetch("http://192.168.1.20:4000/img/users", {
        method: "POST",
        body: data,
      });
    } catch (error) {
      console.log(error);
    }
  }



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


                  
                 <ScrollView showsVerticalScrollIndicator={true} >
               <View >
               
                  {!image &&
                   <Image
                   style={styles.styleimg}
                source={{uri:UrlImage+fetchImage}}
             
                   />
                  }
                   {image && 
                       <Image source={{ uri: image }} style={styles.styleimg} />
                  }
             
               </View>
                
               <View style={styles.view2}>
                   <View style={styles.view3}>
                   <View style={{ justifyContent:'flex-end',flexDirection:'row',alignItems:'center' ,marginRight:20}}>
                                 <Icon
                                             type="material-community"
                                             name="camera"
                                             size={25}
                                             color={colors.text}
                                            onPress={openImagePickerAsync}
                                                  
                       

                                  />
                                 
                             </View>  
                         
                </View>
                </View>
                <View style={styles.FormUpdate}>
                <TextInput
                        style={styles.input}
                        editable={true}
                        defaultValue={UserOne.nom}  
                        placeholder="Nouvelle nom de station"
                        onChangeText={text => setNom(text)}
                      
                      />

                <TextInput
                        style={styles.input}
                        editable={true}
                        defaultValue={UserOne.email}  
                        placeholder="Nouvelle Email"
                        onChangeText={text => SetEmail(text)}
                      
                      />
                        <TextInput
                        style={styles.input}
                        editable={true}
                        defaultValue={UserOne.Adresse}  
                        placeholder="Nouvelle Adresse"
                        onChangeText={text => setAdresse(text)}
                      
                      />
                       <TextInput
                        style={styles.input}
                        editable={true}
                        defaultValue={UserOne.numeroTel}  
                        placeholder="Nouvelle numero"
                        keyboardType="numeric"
                        onChangeText={text => setNumeroTel(text)}
                      
                      />
                     <TextInput
                        style={styles.input}
                        editable={true}
                        defaultValue={UserOne.password}  
                        placeholder="Nouvelle Password"
                        onChangeText={text => setPassword(text)}
                      
                      />

                      <TextInput
                        style={styles.input}
                        editable={true}
                        defaultValue={UserOne.domaine}  
                        placeholder="Nouvelle nom de station"
                        onChangeText={text => setDomaine(text)}
                      
                      />
                           <TextInput
                        style={styles.input}
                        editable={true}
                        defaultValue={UserOne.type_Entreprise}  
                        placeholder="Nouvelle nom de station"
                        onChangeText={text => setType(text)}
                      
                      />
                      
                </View>
                    <View style={{alignContent:'center',paddingLeft:90,paddingRight:90}}>
                    <Animatable.View ref={ wobbleAnimRef }>
                  <TouchableOpacity style={[styles.animBouton,{backgroundColor:'#4b4b4b'}]} 
                    onPress={()=>{
                      if (true){
                        wobbleAnimRef.current.wobble(800);
                       // navigation.goBack();
                       UpdateProfile();

                      }
                    }}
                  >
                    <Text style={styles.animBoutonText}>Modifier</Text>


                    
                  </TouchableOpacity>

                </Animatable.View>
                    </View>
            
                  
            </ScrollView>
            <View style={styles.centeredModal}>
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
        width={10}
        height={10}
    />
<Text style={styles.modalText}>votre profile à été Modifier</Text>
<Pressable
  style={[styles.button, styles.buttonClose]}
  onPress={() =>{ setModalVisible(!modalVisible);
    navigation.navigate("Profile");
  }}
>
  <Text style={styles.textStyle}>Ok</Text>
</Pressable>
</View>
</View>
</Modal>

</View>



          )} 
          </View>
    </View>
  )

}

export default ModifierProfile

const styles = StyleSheet.create({

    
   container:{
    flex:1,
    paddingTop:20,
   
  },
  styleimg:{    
     height:200,
    width:350,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop:10,
    marginLeft:6,
    marginRight:6,
  },
    FormUpdate: {
    
      margin:10,
      justifyContent:'center',
        
    },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
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

    view2:{
        flexDirection:"row",
      
        marginBottom:5,
        marginHorizontal:5,
        justifyContent:"space-between"
        },
        view3:{
            flex:1
            },
            input: {
              marginBottom: 12,
              borderWidth: 2,
              borderColor: '#bbb',
              borderRadius: 10,
              paddingHorizontal: 14,
              justifyContent:'center',
              alignContent:'center',
              alignItems:'center'
            },

    animBouton:{
      backgroundColor:'#0652DD',
     // paddingHorizontal:60,
     //alignContent:'center',
     alignItems:'center',
      paddingVertical:10,
      elevation:5,
      shadowColor:'#000',
      shadowOffset:{
        width:2,
        height:2
      },
      shadowOpacity:0.25,
      shadowRadius:3.5,
      borderRadius:20
    },
    animBoutonText:{
      color:'#fff',
      fontWeight:'500',
      fontSize:18
    },
    centeredView: {
     
      justifyContent: "center",
      alignItems: "center",
      alignContent:'center',
      alignContent:'center',
      marginTop: 120,
      marginLeft:30,
      marginRight:30,
      margin: 10,
      
      
    },


    centeredModal: {
      flex:1,
    justifyContent: "center",
    alignItems: "center",

    marginTop: 1,
    marginLeft:120,
    marginRight:120,
    margin: 10,
    
    
  },
    modalView: {
      margin: 10,
      
      backgroundColor: "white",
      borderRadius: 30,
      padding: 1,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1
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
      marginBottom: 2,
      textAlign: "center"
    }


})