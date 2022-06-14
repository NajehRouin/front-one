import { StyleSheet, Text, View ,Image,PixelRatio,TouchableOpacity,AppRegistry, Button,TouchableHighlight} from 'react-native'
import React ,{useState}from 'react'
//import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
//var ImagePicker = require('react-native-image-picker');
import * as ImagePicker from 'expo-image-picker';
export default function UpdateProfil() {
    let [selectedImage, setSelectedImage] = useState("");

  const openImagePickerAsync = async () => {
   
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
  
  
    if (!result.cancelled) {
      setSelectedImage(result);
      console.log("IMMMMMMMMM",result.uri)
  };
}
  /*let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({
      uri: result.uri,
      name: 'SomeImageName.jpg',
      type: 'image/jpg',
    });
  };*/
  async function upload() {
    try {
      const data = new FormData();
      data.append("image", selectedImage);
  
      await fetch("http://192.168.1.30:4000/img/users", {
        method: "POST",
        body: data,
      });
    } catch (error) {
      console.log(error);
    }
  }






  

  return (

 <View>
 <TouchableHighlight
  style={[
    styles.profileImgContainer,
    { borderColor: "#4632a1", borderWidth: 1 },
  ]}
  onPress={openImagePickerAsync}
>
  <Image source={{
   uri:selectedImage.uri}} style={{ 
     height:200,
    width:350,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop:10,
    marginLeft:6,
    marginRight:6,
  }} />
</TouchableHighlight>
<Button
  onPress={upload}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
  
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
