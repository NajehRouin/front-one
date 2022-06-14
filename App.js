import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,StatusBar} from 'react-native';



import SingInScreen from './src/screens/autheScreens/SingInScreen'

import { NavigationContainer,DefaultTheme,DarkTheme,useTheme } from "@react-navigation/native";
import LoadingAnimationScreen from "./src/components/CircleAnimation";


import { createStackNavigator } from '@react-navigation/stack';
import RootClientTabs from "./src/navigation/ClientTab";

import DrawerNavigator from "./src/navigation/DrawerNavigator";
import Signup from "./src/screens/autheScreens/Signup";
import { EventRegister } from "react-native-event-listeners";

import DetailOne from "./src/screens/DetailOne";
import AnimationWelcom from "./src/components/AnimationWelcom";
import UpdateProfil from "./src/screens/UpdateProfil";
import ModifierProfile from "./src/screens/ModifierProfile";

import { LogBox } from 'react-native';
import MyAccountScreen from './src/screens/MyAccountScreen';
import TransactionComponent from './src/components/TransactionComponent';
import MesTransactions from './src/screens/MesTransactions';
import ModePasseOblie from './src/screens/ModePasseOblie';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  "exported from 'deprecated-react-native-prop-types'.",
]);

const Stack=createStackNavigator();
export default function App(){
  const [darkMode,setDarkMode] =useState(false);
  const appTheme=darkMode ? DarkTheme : DefaultTheme;
  useEffect(()=>{
    let eventListener =EventRegister.addEventListener(
      'changeThemeEvent',
      data=>{
        setDarkMode(data);
      },
    );

    return ()=>{
      EventRegister.removeEventListener(eventListener);
    };
  },[]);
  return (

    <View style={styles.container}>
      <StatusBar
        barStyle="Light-content"
        backgroundColor='#6c757d'
      />
<NavigationContainer theme={appTheme}>
  <Stack.Navigator initialRouteName="load">
  <Stack.Screen name="load" component={LoadingAnimationScreen}  options={{headerShown: false}}/>

  <Stack.Screen name="Welcom" component={AnimationWelcom}  options={{headerShown: false}}/>
    <Stack.Screen name="Login" component={SingInScreen}  options={{headerShown: false}}/>
    <Stack.Screen name="inscrit" component={Signup} options={{headerShown: false}}/>
    <Stack.Screen name="Accueil" component={RootClientTabs} options={{headerShown: false}}/>
 
    <Stack.Screen name="Drawer" component={DrawerNavigator} options={{headerShown: false}}/>
    <Stack.Screen name="Profile"   component={MyAccountScreen} options={{headerShown:false}}/>
    <Stack.Screen name="DetailOne" component={ DetailOne } options={{headerShown: false}}/>
    <Stack.Screen name="Modifierprofil" component={ ModifierProfile } options={{headerShown: false}}/>
    <Stack.Screen name="UpdateProfil" component={ UpdateProfil } options={{headerShown: false}}/>
    <Stack.Screen name="LoadTransaction" component={ TransactionComponent } options={{headerShown: false}}/>
    <Stack.Screen name="MeTransactions" component={ MesTransactions } options={{headerShown: false}}/>
    <Stack.Screen name="ModePasseOblie" component={ ModePasseOblie } options={{headerShown: false}}/>
  </Stack.Navigator>
</NavigationContainer>
    </View>
  )
}
const styles=StyleSheet.create({
  container:{flex:1}
})
