import { View, Text, Image, StyleSheet, Switch } from "react-native";
import { ButtonPrimaryComponent } from "../components/global/ButtonPrimaryComponent";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { Feather, MaterialCommunityIcons,Ionicons,SimpleLineIcons,AntDesign } from "@expo/vector-icons";
import { allColors } from "../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import { useStackNavigation } from "../hooks/useStackNavigation";

export const SettingScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  // navigation
  const {navigateToSubscription}  = useStackNavigation()
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

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
        >
          <MaterialCommunityIcons name="contacts" size={27} color={allColors.backgorunGreen} />
          <View>
            <Text style={styles.title}>Información de contacto:</Text>
            <Text
              style={{
                marginBottom: windowHeight * 0.02,
                color: "gray",
                fontSize: 17,
              }}
            >
              Whatsapp,
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginTop: windowHeight * 0.02,
            borderBottomWidth: 1,
            borderColor: allColors.backgorunGreen,
          }}
        >
          <Ionicons name="notifications-outline" size={27} color={allColors.backgorunGreen} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: 'space-between',
              gap: 10,
              marginTop: windowHeight * 0.02,
              borderBottomWidth: 1,
              borderColor: allColors.backgorunGreen,
        
            }}
          >
            <Text
              style={[styles.title, { paddingBottom: windowHeight * 0.02 }]}
            >
              Notificaciones:
            </Text>
            <Switch
            style={{marginLeft:windowWidth*0.3}}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>

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

        <TouchableOpacity
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
