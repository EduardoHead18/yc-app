import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserInfo = async () => {
  try {
    const storedData = await AsyncStorage.getItem("my-storage");

    if (storedData) {
      const data = JSON.parse(storedData);
      return data;
    }
  } catch (error) {
    console.log('error: ' + error)
  }
};

//clean async storage
// await AsyncStorage.removeItem("my-storage");
