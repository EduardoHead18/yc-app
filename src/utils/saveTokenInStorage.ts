import AsyncStorage from "@react-native-async-storage/async-storage";

//function to save the token
export const SaveTokenInStorage = async (token: string) => {
    let thereIsToken = true;
    try {
      await AsyncStorage.setItem(
        "my-token",
        JSON.stringify({ token, tokenExisting: thereIsToken })
      );
    } catch (error) {
      console.log(error);
    }
  };