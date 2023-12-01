import AsyncStorage from "@react-native-async-storage/async-storage";

//function to save the token
// function to save the token
export const SaveTokenInStorage = async (userData:object) => {
  
  try {
    await AsyncStorage.setItem("my-storage", JSON.stringify( userData ));
    console.log('Saved data', userData)
  } catch (error) {
    console.error("Error saving data in storage:", error);
  }
};

export const deleteStorage = async () => {
  try {
    await AsyncStorage.removeItem("my-storage");
  } catch (error) {
    console.log(error)
  }

}
