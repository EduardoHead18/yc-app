import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { ButtonPrimaryComponent } from "../components/global/ButtonPrimaryComponent";
import { Formik, ErrorMessage } from "formik";
import { SpinnerComponet } from "../components/global/SpinnerComponent";
import { recoverPassword } from "../services/recoverPassword";
import { useStackNavigation } from "../hooks/useStackNavigation";
import { validateCode } from "../services/validateCode";
import { MyContext } from "../context/MyContext";
import { MyContextType } from "../types/typesContext";

interface ICode {
  code: string;
}
export interface IValidateCodeProps {
  route: {
    params: {
      email: string;
    };
  };

}

export const ValidateCode = () => {
  const [code, setCode] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clicksCount, setClicksCount] = useState<number>(0);

  //context
  const {saveEmail} = useContext(MyContext) as MyContextType
  //navigation routes
  const { navigateToChangePassword } = useStackNavigation();

  const initialValues: ICode = {
    code: "",
  };

  const changeScreen = () => {
    console.log("ok");
    setIsLoading(false);
    navigateToChangePassword();
  };

  const resendCode = () => {
    if (clicksCount < 5) {
      recoverPassword(saveEmail);
      console.log("forwarded code 😀");
      setClicksCount((prevCount) => prevCount + 1);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } else {
      console.log("the request limit has been reached");
    }
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
          Validar Código
        </Text>
        <Text style={{ color: "#fff", padding: 10 }}>
          Ingresa el correo de tu cuenta
        </Text>
        <Formik
          initialValues={initialValues}
          //send email to api
          onSubmit={async (values, { setFieldError }) => {
            const code = values.code;
            setIsLoading(true)
            const response = await validateCode(parseInt(code, 10));
            if (response) changeScreen();
            else  {
              setIsLoading(false);
              setFieldError("code", "Código incorrecto. Inténtalo de nuevo.");
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit }) => (
            <View style={{ flex: 1, alignItems: "center" }}>
              <TextInput
                onChangeText={handleChange("code")}
                onBlur={handleBlur("code")}
                style={styles.texInput}
                placeholder="Ingrese su codigo"
                autoFocus={false}
                keyboardType={"number-pad"}
                maxLength={4}
              />

              <Text style={{ color: "red" }}>
                <ErrorMessage name={"code"} component={Text} />
              </Text>

              <TouchableOpacity onPress={resendCode}>
                <Text
                  style={{
                    color: "#fff",
                    fontStyle: "italic",
                    textDecorationLine: "underline",
                    marginBottom: windowHeight * 0.04,
                  }}
                >
                  Reenviar código
                </Text>
              </TouchableOpacity>
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
    width: windowWidth * 0.5,
    height: windowHeight * 0.05,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: windowHeight * 0.02,
    marginBottom: windowHeight * 0.04,
    textAlign: "center",
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
});
