import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { allColors } from "../utils/colors";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { ButtonPrimaryComponent } from "../components/global/ButtonPrimaryComponent";
import { useNavigation } from "@react-navigation/native";
import { useStackNavigation } from "../hooks/useStackNavigation";
import { useEffect, useState } from "react";
import { useStripe } from "@stripe/stripe-react-native";

export const Subscriptions = () => {
  //navigation
  const navigation = useNavigation();
  const { navigateToCheckScreen } = useStackNavigation();

  //payment Stripe
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`http://localhost:8080/api/v1/payment-sheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    return new Promise<void>(async (resolve) => {
      try {
        const { paymentIntent, ephemeralKey, customer } =
          await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
          merchantDisplayName: "Example, Inc.",
          customerId: customer,
          customerEphemeralKeySecret: ephemeralKey,
          paymentIntentClientSecret: paymentIntent,
          allowsDelayedPaymentMethods: true,
          defaultBillingDetails: {
            name: "Jane Doe",
          },
        });

        if (!error) {
          setLoading(true);
          setIsInitialized(true);
          resolve(); // Resuelve la promesa cuando la inicialización está completa
        }
      } catch (error) {
        console.log("Error initializing payment sheet:", error);
        resolve(); // Resuelve la promesa incluso si hay un error
      }
    });
  };

  // ...

  useEffect(() => {
    const initialize = async () => {
      await initializePaymentSheet();
    };

    initialize();
  }, []);

  const openPaymentSheet = async () => {
    if (!isInitialized) {
      // Evita abrir la hoja de pago si no está inicializada
      console.log("Payment sheet is not initialized yet");
      return;
    }

    const { error } = await presentPaymentSheet();

    if (error) {
      console.log("Cancelled", error);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

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
        <Text style={styles.supTitle}>• Anuncia hasta 5 cuartos.</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.containerCards}
        onPress={openPaymentSheet}
      >
        <Text style={styles.title}>Avanzado</Text>
        <Text style={styles.supTitle}>• $100 pesos mensuales.</Text>
        <Text style={styles.supTitle}>• Anuncia hasta 10 cuartos.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.containerCards}>
        <Text style={styles.title}>Premium</Text>
        <Text style={styles.supTitle}>• $150 pesos mensuales.</Text>
        <Text style={styles.supTitle}>• No se pueden anunciar cuartos.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.containerCards}>
        <Text style={styles.title}>Élite Plus</Text>
        <Text style={styles.supTitle}>• $200 pesos mensuales.</Text>
        <Text style={styles.supTitle}>• No se pueden anunciar cuartos.</Text>
      </TouchableOpacity>
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
