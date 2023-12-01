import { Formik, ErrorMessage } from "formik";
import { ScrollView, View, TextInput, StyleSheet, Text } from "react-native";
import { ICreateAccount } from "../../interfaces/interfaceCreateAccount";
import { windowHeight, windowWidth } from "../../utils/dimensions";
import {
  validateAge,
  validateEmail,
  validateLastName,
  validateName,
  validatePassword,
  validatePhone,
  validatePostalCode,
} from "./validation";
import { formsProps } from "./formsProps";
import { PickerCity, PickerState } from "./PickerComponent";
import { useState } from "react";
import { ButtonPrimaryComponent } from "../global/ButtonPrimaryComponent";
import { createUser } from "../../services/createUserApi";
import { SpinnerComponet } from "../global/SpinnerComponent";
import { useStackNavigation } from "../../hooks/useStackNavigation";
import { ModalComponent } from "../global/Modal";
export const Forms = () => {

  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { navigateToCreateAccount, navigateToLoginGoogle } =
    useStackNavigation();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const initialValues  = {
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  };
  const createUserFunc = async (data: object) => {
    const response = await createUser(data);
    console.log('hola',response)

    //redirigir al login o home ?
    if (response !== null) {
      setIsModalOpen(true);
      console.log('isModalOpen:', isModalOpen);
      setIsLoading(false);
    }
  };

  const modalRedirect = () => {
    navigateToLoginGoogle();
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: windowHeight * 0.09,
        }}
      >
        Crea una cuenta  👋
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors: Partial<ICreateAccount> = {};
            //validation input
            if (validateName(values.name.toString()))
              errors.name = validateName(values.name.toString());
            if (validateLastName(values.lastName.toString()))
              errors.lastName = validateLastName(values.lastName.toString());
            if (validatePhone(values.phone.toString()))
              errors.phone = validatePhone(values.phone.toString());
            if (validateEmail(values.email.toString()))
              errors.email = validateEmail(values.email.toString());
            if (validatePassword(values.password.toString()))
              errors.password = validatePassword(values.password.toString());
            setFormErrors(errors);
            return errors;
          }}
          //uploaded data from formik and picker

          onSubmit={(values) => {
            //validate if there are no errors in the forms
            if (Object.keys(formErrors).length !== 0) {
            }
            const data = {
              ...values,
            };
            setIsLoading(true);
            //send user data
            createUserFunc(data);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={{ alignItems: "center" }}>
              {formsProps.map((data) => {
                //validate keyboard input
                const keyboardType =
                  data.keyboardType === "default"
                    ? "default"
                    : data.keyboardType === "number-pad"
                    ? "number-pad"
                    : "email-address";

                return (
                  <View key={data.id}>
                    <Text style={styles.text}>{data.visibleText}</Text>
                    <TextInput
                      onChangeText={handleChange(data.name)}
                      onBlur={handleBlur(data.name)}
                      value={(values as any)[data.name].toString()}
                      style={styles.input}
                      secureTextEntry={data.secureTextEntry}
                      keyboardType={keyboardType}
                      maxLength={data.limit}
                      autoCapitalize="none"
                    />
                    <Text style={styles.errorText}>
                      <ErrorMessage name={data.name} component={Text} />
                    </Text>
                  </View>
                );
              })}
              <View
                style={{ width: windowHeight * 0.4, justifyContent: "center" }}
              >
                {/* is modal */}
                {isModalOpen ? (
                  <ModalComponent
                    title={"Bienvenido, la cuenta se creó con éxito"}
                    titleButton={"Ir al login"}
                    onPress={() => modalRedirect()}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                  />
                ) : (
                  ""
                )}
       

              </View>
              {isLoading ? <SpinnerComponet></SpinnerComponet> : <></>}
              <ButtonPrimaryComponent
                text={"Crear cuenta"}
                onPress={handleSubmit}
                marginBottom={0.9}
              ></ButtonPrimaryComponent>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    width: windowWidth * 0.9,
    height: windowHeight * 0.05,
    marginBottom: windowHeight * 0.02,
    borderRadius: 5,
  },
  input2: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    width: windowWidth * 0.4,
  },
  text: {
    fontSize: 17,
  },
  errorText: {
    width: windowWidth * 0.8,
    color: "red",
    marginBottom: windowHeight * 0.03,
  },
  scrollContent: {
    paddingBottom: windowHeight * 0.3,
  },
});
