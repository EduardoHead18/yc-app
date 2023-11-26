import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Button,
  } from "react-native";
  import { allColors } from "../utils/colors";
  import { windowHeight, windowWidth } from "../utils/dimensions";
  import { ButtonPrimaryComponent } from "../components/global/ButtonPrimaryComponent";
  import { useNavigation } from "@react-navigation/native";
  
  export const Subscriptions = () => {
  
    const navigation = useNavigation()
  
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
  
        <TouchableOpacity style={styles.containerCards}>
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
        <ButtonPrimaryComponent text={"Regresar"} onPress={()=>navigation.goBack()}></ButtonPrimaryComponent>
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
      paddingVertical:windowHeight*0.01
    },
    supTitle: {
      color: "#8C8585",
    },
  });
  