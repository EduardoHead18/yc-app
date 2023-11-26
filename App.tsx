import { StyleSheet, Text, View } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import CheckoutScreen from "./src/screens/ScreenCheckout";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MyStack } from "./src/navigation/MyStack";

export default function App() {
  const url: string = "http://localhost:8080/api/v1/post";
  // const url: string =
  //   "https://your-confort-backend.onrender.com/api/v1/recover_password";

  const getPost = async () => {
    try {
      const response = await fetch(url);
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    } catch (error) {
      console.log("error al obtener la api", error);
      return false;
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <NavigationContainer>
      <StripeProvider
        publishableKey="pk_test_51NSYyJFddPsMo2Q26hYohOv9j7V1orPxcDiTaFWXS2h4n1aI8rF09ps1k6Mr1RImPkyrD3gko3rY87V4DWJY34L600QBNV3fTz"
        urlScheme="com.eduardo18xvlll.yc" // required for 3D Secure and bank redirects
      >
        {/* <CheckoutScreen></CheckoutScreen> */}
        <MyStack></MyStack>
      </StripeProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
