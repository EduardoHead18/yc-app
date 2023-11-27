import { StyleSheet, Text, View } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import CheckoutScreen from "./src/screens/stripe/CheckScreen";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MyStack } from "./src/navigation/MyStack";
import { MyProvider } from "./src/context/MyContext";
import { PUBLISHABLE_KEY } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyStackTwo } from "./src/navigation/MyStackTwo";
import { getUserInfo } from "./src/utils/getUserInfo";

export default function App() {
  const [storageExists, setStorageExists] = useState<boolean>(false);
  const getStorage = async () => {
    const storedData = await getUserInfo()
    if (storedData) setStorageExists(true);
  };

  useEffect(() => {
    getStorage();
  }, []);

  return (
    <NavigationContainer>
      <MyProvider>
        <StripeProvider
          publishableKey={PUBLISHABLE_KEY}
          urlScheme="com.eduardo18xvlll.yc" // required for 3D Secure and bank redirects
        >
          {/* <CheckoutScreen></CheckoutScreen> */}

          {storageExists ? <MyStackTwo/> : <MyStack/>}
        </StripeProvider>
      </MyProvider>
    </NavigationContainer>
  );
}
