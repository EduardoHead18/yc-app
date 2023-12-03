import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { allColors } from "../utils/colors";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { ButtonPrimaryComponent } from "../components/global/ButtonPrimaryComponent";
import { useNavigation } from "@react-navigation/native";
import { useStackNavigation } from "../hooks/useStackNavigation";
import { useEffect, useState } from "react";
import { checkoutApi } from "../services/stripe/checkoutStripeApi";
import { WebView } from "react-native-webview";
import { getUserInfo } from "../utils/getUserInfo";
import { createSubscriptionApi } from "../services/subscription/createSubscription";
import { dateFormater } from "../utils/dateFormater";

export const Subscriptions = () => {
  const [productData, setProductData] = useState<any[]>();
  const [webViewVisible, setWebViewVisible] = useState<boolean>(false);
  const [urlRedirect, setUrlRedirect] = useState<string>("");
  const [storageData, setStorageData] = useState<any>();
  const [nickname, setNickname] = useState<string>("");
  const [dateCreated, setDateCreated] = useState<any>()

  //navigation
  const navigation = useNavigation();
  const { navigateToCheckScreen, navigateToBeforePostScreen } =
    useStackNavigation();

  const getUserInfoStorage = async () => {
    const response = await getUserInfo();
    setStorageData(response);
  };



  const getStripeData = async () => {
    try {
      const response = await fetch(
        "https://your-confort-backend.onrender.com/api/v1/payment/subscriptions"
      );
      const responseJson = await response.json();
      setProductData(responseJson);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(storageData);
  //redirect to the application
  const handleWebViewNavigationStateChange = async (newNavState: any) => {
    const { url } = newNavState;

    if (url && url.startsWith("https://yc.com/payment-successful")) {
      if (storageData && storageData._id) {
        console.log("eset es el nick", nickname);
        const fecha = dateFormater(dateCreated)
        console.log('fecha', fecha);
        const sendObject = {
          id_user: storageData._id,
          active: true,
          creation_date_subscription:fecha,
          type_subscription:nickname,
        };

        const responseSubscript = await createSubscriptionApi(sendObject);
        console.log("subscription created", responseSubscript);
        navigation.goBack();
        setWebViewVisible(false);
        Alert.alert(
          `Gracias por tu suscripción ${storageData.name},`,
          ` Disfruta de tus beneficios 😃`,
          [{ text: "ok" }]
        );
      }
    }
    if (url && url.startsWith("https://yc.com/payment-canceled")) {
      navigation.goBack();
    }
  };

  useEffect(() => {
    getUserInfoStorage();
    getStripeData();
  }, []);

  const checkoutStripe = async (data: any) => {
    console.log("data..", data.created);
    setDateCreated(data.created);
    console.log("eset es el nick name 😄", data.nickname);
    setNickname(data.nickname);

    try {
      const response = await checkoutApi(data.id);
      console.log("aaa", response);
      if (response && response.message.url) {
        const paymentUrl = response.message.url;
        setUrlRedirect(paymentUrl);
        setWebViewVisible(true);
      } else {
        console.log("La respuesta o la propiedad url es undefined.");
      }
    } catch (error) {
      console.log("Error al llamar a checkoutApi:", error);
    }
  };

  if (webViewVisible) {
    return (
      <WebView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: windowHeight * 0.05,
        }}
        source={{ uri: urlRedirect }}
        onNavigationStateChange={handleWebViewNavigationStateChange}
      />
    );
  }

  if (!productData)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Cargando...</Text>
      </View>
    );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: windowWidth * 0.03,
      }}
    >
      <Image
        style={{ width: "40%", height: "20%" }}
        source={require("../../assets/logoGreen.png")}
      />
      <Text
        style={{
          fontSize: 30,
          marginVertical: windowHeight * 0.02,
          color: "#8C8585",
        }}
      >
        Suscripción
      </Text>
      <TouchableOpacity style={styles.containerCards}>
        <Text style={styles.title}>Gratis</Text>
        <Text style={styles.supTitle}>
          • Sin ningún costo, encuentra tu cuarto de manera fácil.
        </Text>
        <Text style={styles.supTitle}>• No se pueden anunciar cuartos.</Text>
      </TouchableOpacity>
      {productData?.map((data: any) => {
        return (
          <TouchableOpacity
            onPress={() => {
              checkoutStripe(data);
            }}
            key={data.id}
            style={styles.containerCards}
          >
            <Text style={styles.title}>{data.product.name}</Text>
            <Text style={styles.supTitle}>• ${data.unit_amount / 100} mxn</Text>
            <Text style={styles.supTitle}>• {data.product.description}</Text>
          </TouchableOpacity>
        );
      })}

      <ButtonPrimaryComponent
        text={"Regresar"}
        onPress={() => navigation.goBack()}
      ></ButtonPrimaryComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCards: {
    backgroundColor: allColors.backgroundGray,
    width: windowHeight * 0.4,
    padding: 10,
    borderRadius: 10,
    marginBottom: windowHeight * 0.02,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "300",
    paddingVertical: windowHeight * 0.01,
  },
  supTitle: {
    color: "#8C8585",
  },
});
