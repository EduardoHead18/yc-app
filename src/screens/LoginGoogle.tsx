import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Platform,
  Image,
} from "react-native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { WEB_CLIENT_ID, IOS_CLIENT_ID } from "@env";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { Formik } from "formik";
import { ButtonPrimaryComponent } from "../components/global/ButtonPrimaryComponent";
import { useContext, useEffect, useState } from "react";
import { useStackNavigation } from "../hooks/useStackNavigation";
import { SpinnerComponet } from "../components/global/SpinnerComponent";
import { allColors } from "../utils/colors";
import {
  validateEmail,
  validatePassword,
} from "../components/createAccount/validation";
import { userLogin } from "../services/loginApi";
import { MyContext } from "../context/MyContext";
import { SaveTokenInStorage } from "../utils/saveTokenInStorage";
import { MyContextType } from "../types/typesContext";

interface ILogin {
  email: string;
  password: string;
}

export const LoginGoogle = () => {
  //navigation routes
  const { navigateToRecoverPassword, navigateToCreateAccount, navigateToTabs } =
    useStackNavigation();

  //contexto

  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
    webClientId: WEB_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
  });

  const getUser = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(JSON.stringify(userInfo, null, 2));
      navigateToTabs();

      console.log(userInfo);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error.message);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error.message);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error.message);
        // play services not available or outdated
      } else {
        console.log("error", error);
      }
    }
  };

  const [code, setCode] = useState<Number | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<string>();
  const updateSateLogged = useContext(MyContext);

  const initialValues: ILogin = {
    email: "",
    password: "",
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.curveBackground}>
          <Image
            style={{ width: 347, height: 277 }}
            source={require("../../assets/images/login/phone.png")}
          />

          <Text
            style={
              formErrors
                ? [
                    {
                      textAlign: "center",
                      width: windowWidth * 0.8,
                      height: windowHeight * 0.04,
                      color:'red'
                    },
                  ]
                : {
                    backgroundColor: allColors.backgroundPrimary,
                    width: windowWidth * 0.8,
                    height: windowHeight * 0.04,
                    color: "blue",
                  }
            }
          >
            {formErrors}
          </Text>
        </View>

        {/* is Loading */}
        {isLoading ? <SpinnerComponet /> : ""}

        <View style={styles.content}>
          <Formik
            initialValues={initialValues}
            validate={async (values) => {
              const errors: Partial<ILogin> = {};
              // Validation input

              if (!values.email || !values.password) {
                const requieredField = (errors.email = "Campos requerido");
                setFormErrors(requieredField);
                setTimeout(() => setFormErrors(""), 5000);
              }

              if (validateEmail(values.email.toString())) {
                const errorEmail = (errors.email = validateEmail(
                  values.email.toString()
                ));
                setFormErrors(errorEmail);
                setTimeout(() => setFormErrors(""), 5000);
              }

              if (validatePassword(values.password.toString())) {
                const errorPassword = (errors.password = validatePassword(
                  values.password.toString()
                ));
                setFormErrors(errorPassword);
                setTimeout(() => setFormErrors(""), 5000);
              }
              return errors;
            }}
            //send email to api
            onSubmit={async (values) => {
              setIsLoading(true);
              const response = await userLogin(values.email, values.password);
              console.log("ok", response);
              if (response && response.message === "successful authentication") {
                console.log('este es el token del home: ' + response)
                SaveTokenInStorage(response);
                //save email in context
                navigateToTabs();
              } else {
                setIsLoading(false);
                setFormErrors("Error en el email o contraseña");
                setTimeout(() => setFormErrors(""), 2000);

                setIsLoading(false);
                return null;
              }
              setIsLoading(false);
              console.log("no entro nada aqui");
            }}
          >
            {({ handleChange, handleBlur, handleSubmit }) => (
              <View>
                <Text style={{ fontSize: 17 }}>Correo electrónico</Text>
                <TextInput
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  style={styles.texInput}
                  autoFocus={false}
                  keyboardType={"email-address"}
                  maxLength={100}
                  autoCapitalize="none"
                />
                <Text style={{ fontSize: 17 }}>Contraseña</Text>
                <TextInput
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  style={styles.texInput}
                  autoFocus={false}
                  keyboardType={"default"}
                  secureTextEntry={true}
                  maxLength={70}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => navigateToRecoverPassword()}>
                  <Text
                    style={{
                      color: "#B34766",
                      textAlign: "center",
                      marginBottom: windowHeight * 0.02,
                    }}
                  >
                    ¿Olvido su contraseña?
                  </Text>
                </TouchableOpacity>

                <ButtonPrimaryComponent
                  text={"Iniciar sesión"}
                  onPress={() => handleSubmit()}
                />

                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => getUser()}
                >
                  <Image
                    style={{
                      width: windowWidth * 0.05,
                      height: windowWidth * 0.05,
                    }}
                    source={require("../../assets/images/login/googleIcon.png")}
                  ></Image>
                  <Text style={styles.text2}>Iniciar con Google</Text>
                </TouchableOpacity>

                <Text
                  style={{
                    color: "#FF6680",
                    lineHeight: 20,
                    textAlign: "center",
                    marginTop: windowHeight * 0.02,
                  }}
                >
                  ¿No tienes un cuenta?{" "}
                  <TouchableOpacity onPress={navigateToCreateAccount}>
                    <Text
                      style={{
                        color: allColors.textBlue,
                      }}
                    >
                      Crea una
                    </Text>
                  </TouchableOpacity>
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  content: {
    flex: 1.2,
    alignItems: "center",
    marginTop: windowHeight * 0.04,
  },
  texInput: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,

    width: windowWidth * 0.8,
    height: windowHeight * 0.05,
    paddingHorizontal: 10,

    marginBottom: windowHeight * 0.02,
  },
  curveBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: allColors.backgroundPrimary,
    width: windowWidth,
    height: windowHeight * 0.5,
    borderBottomEndRadius: windowWidth * 0.05,
    borderBottomStartRadius: windowWidth * 0.05,
  },
  errorText: {
    width: windowWidth * 0.8,
    color: "red",
    marginBottom: windowHeight * 0.02,
  },
  button2: {
    flexDirection: "row",
    gap: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 50,
    borderRadius: 20,
    paddingVertical: 10,
    marginTop: windowHeight * 0.01,
    elevation: 5,
    alignItems: "center",
  },
  text2: {
    color: "#B34766",
    fontSize: 17,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});
