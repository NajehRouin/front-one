import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity,
    TextInput, Dimensions,Keyboard,Alert,Modal,Pressable,RefreshControl} from 'react-native';
import React ,{useState,useEffect,useCallback}from 'react'
import HomeHearder from "../components/HomeHearder";

import { useTheme } from "@react-navigation/native";
import { Url } from '../api';

const SCREEN_WIDTH = Dimensions.get('window').width;
import OneLisItem from "../components/OneLisItem";
import { getOnetData } from './autheScreens/StrogeUserOne';
import ListItemTransaction from '../components/ListItemTransaction';


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const MesTransactions = ({navigation})  => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

    const [arrayList,setArrayList]=useState()
 
   const[lengthlist,setLengthList]=useState();
   

    const {colors} =useTheme();



      const fetchTransaction = async () => {
       
        try {
          const response = await fetch(Url+"transaction/listeTransaction");

          const json =  await response.json();
          //console.log("jsonfetch",json.data)
        
         // console.log('fetech',datafetch)
      
          var  i;
          const array=[];
     
          const CurrentU=await getOnetData();
     
      
          //console.log("CurrentUser",CurrentU)
    
          for(i=0;i<=json.data.length-1;i++){
            //console.log("setFetchData",json.data[i].User)
              if (CurrentU._id==json.data[i].currentUser.id){
               // console.log("listeTransactions",json.data[i].User);
        
                array.push(json.data[i].User);
                
                setArrayList(array);   
    
                setLengthList(array.length);
              }
            


          
          
     
         
        
     
        }
      
          
        } catch (error) {
          console.log("error", error);
        }
       //console.log("listTransactions",listTransaction);
      // console.log("arrayyyyyyy",arrayList)
      
      };
      //getAllTransaction
        useEffect(async() => {     
  onRefresh();
           fetchTransaction();
         
        
      }, []);

      const Call_RefreshControl = () => {
 
        setArrayList('');
     
        fetchTransaction();
     
      }

  return (
    <View style={styles.container}>
    <HomeHearder navigation={navigation} />

<View style={{marginTop:60,alignContent:'center',justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:20,alignItems:'center',fontWeight:'bold',color:'#032D56'}}>Mes Transactions</Text>
</View>
<View style={{marginTop:10,alignContent:'center',justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:20,alignItems:'center',fontWeight:'bold',color:'#032D56'}}>{lengthlist}</Text>
</View>


< ScrollView horizontal={true}
                      
                           
                           > 
                                <View style={{ width:SCREEN_WIDTH }}>
                                     
                                <FlatList
                   // style={{marginTop:10,marginBottom:10 }}
                    //horizontal={true}
                   

                      data={arrayList}
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
                              
                              <ListItemTransaction
                                        //screenwidth={SCREEN_WIDTH*0.8}
                                        profileImg={item.profileImg}
                                     nom={item.nom}
                                      email={item.email}
                                     remise={item.remise}
                                        
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
                
 </View>
  )
}

export default MesTransactions

const styles = StyleSheet.create({

        container:{
        flex:1,
        paddingTop:1
               
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
      }
})