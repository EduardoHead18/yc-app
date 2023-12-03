import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";



const TermsAndConditions = () => {

  const navigation = useNavigation();
  return (
    <View style={styles.terminosYCondiciones1}>
      <Image
        style={styles.mesaDeTrabajo14xf11}
        resizeMode="cover"
        source={require("../../assets/fondo.png")}
      />
      <Pressable style={styles.component2} onPress={() => {}}>
        <View style={[styles.component2Child, styles.childShadowBox]} />
        <TouchableOpacity style={[styles.crearCuenta,{flex:1, justifyContent:'center', alignItems:'center'} ]}><Text>Aceptar</Text></TouchableOpacity>
      </Pressable>
      <Pressable style={styles.component3} onPress={() => {}}>
        <View style={[styles.component3Child, styles.childShadowBox]} />
        <TouchableOpacity onPress={()=>navigation.goBack()} style={[styles.crearCuenta1,{flex:1, justifyContent:'center', alignItems:'center'} ]}><Text >Cancelar</Text></TouchableOpacity>
      </Pressable>
      <Text style={[styles.enNuestraAplicacin1, styles.bienvenidoALa1Typo]}>
        En nuestra aplicación, nos comprometemos a proteger sus datos
        personales. Entendemos que la privacidad es de suma importancia para
        nuestros usuarios. Al utilizar nuestros servicios, usted acepta que
        podemos recopilar, utilizar y compartir sus datos personales según lo
        descrito en nuestro Aviso de Privacidad.
      </Text>
      <Image
        style={[styles.recurso104x11, styles.recurso104x11Position]}
        resizeMode="cover"
        source={require("../../assets/logo.png")}
      />
      <Text style={[styles.avisoDePrivacidad1, styles.avisoDePrivacidad1Typo]}>
        Aviso de privacidad
      </Text>
      <Text style={[styles.terminosYCondiones1, styles.avisoDePrivacidad1Typo]}>
        Terminos y Condiones
      </Text>
      <Text style={[styles.bienvenidoALa1, styles.recurso104x11Position]}>
        Bienvenido a la aplicación de renta de cuartos locales en Ocosingo,
        Chiapas. Antes de continuar, es importante que lea y comprenda nuestro
        Aviso de Privacidad y acepte nuestros Términos y Condiciones. Estos
        documentos son esenciales para garantizar su seguridad y privacidad
        mientras utiliza nuestra plataforma.
      </Text>
      <Text style={[styles.leerMas, styles.leerMasPosition]}>Leer mas.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  childShadowBox: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 30,
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  crearTypo: {
    textAlign: "left",
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  bienvenidoALa1Typo: {
    color: "#000",
    fontFamily: "Inter-Regular",
    fontSize: 15,
    textAlign: "left",
  },
  recurso104x11Position: {
    width: 307,
    left: 26,
    position: "absolute",
  },
  avisoDePrivacidad1Typo: {
    width: 242,
    fontFamily: "Montserrat-Bold",
    fontWeight: "700",
    color: "#000",
    left: 26,
    textAlign: "left",
    fontSize: 20,
    position: "absolute",
  },
  leerMasPosition: {
    left: 26,
    position: "absolute",
  },
  mesaDeTrabajo14xf11: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  component2Child: {
    backgroundColor: "#95e78f",
  },
  crearCuenta: {
    color: "#fff",
    textAlign: "left",
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    fontSize: 20,
    left: "18.09%",
    top: "26%",
    position: "absolute",
  },
  component2: {
    top: 725,
    left: 210,
    width: 123,
    height: 50,
    position: "absolute",
  },
  component3Child: {
    backgroundColor: "#fff",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 30,
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
  },
  crearCuenta1: {
    fontSize: 16,
    color: "#a09c9c",
    textAlign: "left",
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    left: "18.09%",
    top: "26%",
    position: "absolute",
  },
  component3: {
    top: 732,
    left: 71,
    width: 100,
    height: 37,
    position: "absolute",
  },
  enNuestraAplicacin1: {
    top: 526,
    width: 308,
    left: 26,
    position: "absolute",
  },
  recurso104x11: {
    top: 28,
    height: 254,
  },
  avisoDePrivacidad1: {
    top: 495,
  },
  terminosYCondiones1: {
    top: 308,
  },
  bienvenidoALa1: {
    top: 338,
    color: "#000",
    fontFamily: "Inter-Regular",
    fontSize: 15,
    textAlign: "left",
  },
  leerMas: {
    top: 695,
    fontSize: 13,
    width: 68,
    height: 20,
    textAlign: "left",
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: "#fff",
  },
  terminosYCondiciones1: {
    flex: 1,
    overflow: "hidden",
    height: 800,
    width: "100%",
    backgroundColor: "#fff",
  },
});

export default TermsAndConditions;
