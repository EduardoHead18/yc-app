import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserInfo = async () => {
  try {
    const storedData = await AsyncStorage.getItem("my-token");

    if (storedData) {
      const data = JSON.parse(storedData);
      const { token } = data;
      const dataUser = JSON.stringify(token.dataUser);
      const userObjectStorage = JSON.parse(dataUser);
      
      return userObjectStorage;
    }
  } catch (error) {}
};
