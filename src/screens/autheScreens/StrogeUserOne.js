import AsyncStorage from "@react-native-async-storage/async-storage";

export const getOnetData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("User");
   //console.log("getdata user",jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};
export const updateOneData = async (data) => {
  return AsyncStorage.setItem('User', JSON.stringify(data));
}

export const storeOneData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
   
  
      await AsyncStorage.setItem("User", jsonValue);
      console.log("Current User est :",jsonValue);
    } catch (e) {
      console.log(e);
    }
  };