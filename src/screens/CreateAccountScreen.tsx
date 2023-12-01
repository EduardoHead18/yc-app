import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    KeyboardAvoidingView,
  } from "react-native";
  
  import { windowHeight, windowWidth } from "../utils/dimensions";
  import { Forms } from "../components/createAccount/Forms";
  
  export const CreateAccount = () => {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={0}>
          <ImageBackground
            style={styles.backgroundImage}
            resizeMode="cover"
            source={require("../../assets/backgroundBlue.png")}
          >
  
        <View style={{marginTop:windowHeight*0.12}}>
        <Forms ></Forms>
        </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    backgroundImage: {
      width: windowWidth * 2, //100%
      flex: 1,
      alignItems: "center",
    },
    imagePhone: {
      marginTop: windowHeight * 0.19, //40%
    },
  
  });
  