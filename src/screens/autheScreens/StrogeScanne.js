import AsyncStorage from "@react-native-async-storage/async-storage";

export const getDataScanne = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("dataScanne");
   // console.log("DataScanne est:",jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};
export const updateDataScanne = async (data) => {
  return AsyncStorage.setItem('dataScanne', JSON.stringify(data));
}

export const storegeDataScanne = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
   
  
      await AsyncStorage.setItem("dataScanne", jsonValue);
     // console.log("Current User est :",jsonValue);
    } catch (e) {
      console.log(e);
    }
  };