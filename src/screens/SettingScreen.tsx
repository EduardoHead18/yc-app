import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { Feather, SimpleLineIcons,AntDesign } from "@expo/vector-icons";
import { allColors } from "../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import {  useState } from "react";
import { useStackNavigation } from "../hooks/useStackNavigation";

import { Entypo } from '@expo/vector-icons'; 
import { deleteStorage } from "../utils/saveTokenInStorage";

export const SettingScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);



  // navigation
  const {navigateToSubscription, navigateToAccountScreen, navigateToLoginGoogle, navigateToTermsAndConditios}  = useStackNavigation()



  return (
    <>
      <View style={styles.curveBackground}>
        <Image
          style={{ width: '70%', height: '100%' }}
          source={require("../../assets/logoBlue.png")}
        />
        <Text style={{fontSize:30, color:allColors.whiteColor, fontWeight:'700', marginTop:windowHeight*0.03}}>Ajustes</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.containersButton}
          onPress={()=>navigateToAccountScreen()}
        >
          <Feather name="user" size={27} color={allColors.backgorunGreen} />
          <View>
            <Text style={styles.title}>Cuenta:</Text>
            <Text
              style={{
                marginBottom: windowHeight * 0.02,
                color: "gray",
                fontSize: 17,
              }}
            >
              Nombre, correo, contraseña...
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.containersButton}
          onPress={() => navigateToSubscription()}
        >
          <SimpleLineIcons name="diamond" size={27} color={allColors.backgorunGreen} />
          <View>
            <Text
              style={[styles.title, { paddingBottom: windowHeight * 0.02 }]}
            >
              Suscripción:
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigateToTermsAndConditios()}
          style={styles.containersButton}
        >
          <AntDesign name="exclamation" size={27} color={allColors.backgorunGreen} />
          <View>
            <Text
              style={[styles.title, { paddingBottom: windowHeight * 0.02 }]}
            >
             Condiciones y Politica de privacidad
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containersButton}

          onPress={() => {
            Alert.alert(
              "Cerrar sesión",
              "¿Estás seguro de querer cerrar tu sesión?",
              [
                {
                  text: "Cancelar",
                  style: "cancel",
                },
                {
                  text: "Cerrar sesión",
                  onPress: async() => {
                    await deleteStorage()
                    navigateToLoginGoogle()
                  }
                },
              ],
              { cancelable: false }
            );
          }}
        >
          <Entypo name="log-out" size={24} color={allColors.backgorunGreen} />
          <View>
            <Text
              style={[styles.title, { paddingBottom: windowHeight * 0.02 }]}
            >
             Cerrar sesión
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
  },
  texInput: {
    backgroundColor: "#fff",
    width: windowWidth * 0.8,
    height: windowHeight * 0.05,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: windowHeight * 0.02,
    marginBottom: windowHeight * 0.05,
  },
  curveBackground: {
    padding: 90,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: allColors.backgroundPrimary,
    width: windowWidth,
    height: windowHeight * 0.4,
    borderBottomEndRadius: windowWidth * 0.05,
    borderBottomStartRadius: windowWidth * 0.05,
  },

  title: {
    fontSize: 20,
  },
  containersButton:{
    flexDirection: "row",
    gap: 10,
    marginTop: windowHeight * 0.02,
    borderBottomWidth: 1,
    borderColor: allColors.backgorunGreen,
    paddingVertical:5
  }
});
