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
import { useStackNavigation } from "../hooks/useStackNavigation";
import { MyContext } from "../context/MyContext";
import { MyContextType } from "../types/typesContext";
import { updatePasswordUser } from "../services/updatePasswordUser";
import { ModalComponent } from "../components/global/Modal";

export const ChangePassword = () => {
  const [code, setCode] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //state of my context
  const { saveEmail } = useContext(MyContext) as MyContextType;
  //navigation routes

  const { navigateToLoginGoogle } = useStackNavigation();

  const modalRedirect = () => {
    navigateToLoginGoogle();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.curveBackground}>
          <Image
            style={{ width: 271, height: 253 }}
            source={require("../../assets/images/recoverPassword.png")}
          />
          <Text style={{ color: "#fff", fontSize: 30, fontWeight: "700" }}>
            Ingresa tu nueva contraseña
          </Text>
        </View>

        {/* is modal */}
        {isModalOpen ? (
          <ModalComponent
            titleButton={"Ir al Login"}
            title={"La contraseña se actualizo"}
            onPress={() => modalRedirect()}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        ) : (
          ""
        )}

        {/* is Loading */}
        {isLoading ? <SpinnerComponet /> : ""}

        <View style={styles.content}>
          <Formik
            initialValues={{
              password: "",
              repeatedPassword: "",
            }}
            //   //send email to api
            onSubmit={async (values, { setFieldError }) => {
              const password = values.password;
              const repeatedPassword = values.repeatedPassword;

              const dataSend = {
                email: saveEmail,
                password: password,
              };

              if (password === repeatedPassword) {
                const response = await updatePasswordUser(dataSend);
                if (response) setIsModalOpen(true);
              } else {
                setIsLoading(false);
                setFieldError(
                  "password",
                  "Las contraseñas no coinciden. Inténtalo de nuevo."
                );
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit }) => (
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 17, marginTop: windowHeight * 0.05 }}>
                  Crea una contraseña nueva
                </Text>
                <TextInput
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  style={styles.texInput}
                  autoFocus={false}
                  secureTextEntry={true}
                  maxLength={100}
                />

                <Text style={{ fontSize: 17, marginTop: windowHeight * 0.02 }}>
                  Repite la contraseña
                </Text>
                <TextInput
                  onChangeText={handleChange("repeatedPassword")}
                  onBlur={handleBlur("repeatedPassword")}
                  style={styles.texInput}
                  autoFocus={false}
                  secureTextEntry={true}
                  maxLength={100}
                />
                <Text style={{ color: "red" }}>
                  <ErrorMessage name={"password"} component={Text} />
                </Text>
                <ButtonPrimaryComponent
                  text={"Guardar"}
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
    flex: 2,
    position: "relative",
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  texInput: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    width: windowWidth * 0.8,
    height: windowHeight * 0.05,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: windowHeight * 0.01,
  },
  curveBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#5AB0C7",
    width: windowWidth,
    height: windowHeight * 0.2,
    borderBottomEndRadius: windowWidth * 0.05,
    borderBottomStartRadius: windowWidth * 0.05,
  },
});
