import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { ButtonPrimaryComponent } from "../components/global/ButtonPrimaryComponent";
import { Formik, ErrorMessage } from "formik";
import { SpinnerComponet } from "../components/global/SpinnerComponent";
import { recoverPassword } from "../services/recoverPassword";
import { useStackNavigation } from "../hooks/useStackNavigation";
import { MyContext } from "../context/MyContext";
import { MyContextType } from "../types/typesContext";
interface IEmail {
  email: string;
}

export const RecoverPassword = () => {
  const [code, setCode] = useState<Number | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //import state global contex
  const { updateStateEmail } = useContext(MyContext) as MyContextType

  //navigation routes
  const { navigateToValidateCode } = useStackNavigation();

  const initialValues: IEmail = {
    email: "",
  };
  const changeScreen = (email: string) => {
    updateStateEmail(email);
    setIsLoading(false);
    navigateToValidateCode();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.content}>
          <Image
            style={{ width: 271, height: 253 }}
            source={require("../../assets/images/recoverPassword.png")}
          />
        </View>
        {/* is Loading */}
        {isLoading ? <SpinnerComponet /> : ""}

        <View style={styles.curveBackground}>
          <Text style={{ color: "#fff", fontSize: 30, fontWeight: "700" }}>
            Recuperar Contraseña
          </Text>
          <Text style={{ color: "#fff", padding: 10 }}>
            Ingresa el correo de tu cuenta
          </Text>
          <Formik
            initialValues={initialValues}
            validate={(values) => {
              const errors: Partial<IEmail> = {};

              // Validation input
              const emailPattern =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

              if (!values.email) {
                errors.email = "Campo requerido";
              } else if (!values.email.match(emailPattern)) {
                errors.email = "Email no válido, inténtalo de nuevo";
              }
              return errors;
            }}
            //send email to api
            onSubmit={async (values, { setFieldError }) => {
              const email = values.email;
              setIsLoading(true);
              const response = await recoverPassword(email);
              if (response) changeScreen(email);
              else {
                setIsLoading(false);
                setFieldError("email", "El email no existe");
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit }) => (
              <View>
                <TextInput
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  style={styles.texInput}
                  placeholder="Ingrese su email"
                  autoFocus={false}
                  keyboardType={"email-address"}
                  maxLength={100}
                  autoCapitalize="none"
                />
                <Text style={styles.errorText}>
                  <ErrorMessage name={"email"} component={Text} />
                </Text>
                <ButtonPrimaryComponent
                  text={"Enviar código"}
                  onPress={() => {
                    handleSubmit();
                  }}
                />
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    padding: 20,
    alignItems: "center",
    position: "relative",
    backgroundColor: "#5AB0C7",
    width: windowWidth,
    height: windowHeight * 0.5,
    borderTopEndRadius: windowWidth * 0.05,
    borderTopStartRadius: windowWidth * 0.05,
  },
  errorText: {
    width: windowWidth * 0.8,
    color: "red",
    marginBottom: windowHeight * 0.02,
  },
});
