import { Formik, ErrorMessage } from "formik";
import {
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";

import { useContext, useEffect, useState } from "react";
import { ICreateAccount } from "../interfaces/interfaceCreateAccount";
import {
  validateAge,
  validateEmail,
  validateLastName,
  validateName,
  validatePassword,
  validatePhone,
  validatePostalCode,
} from "../components/createAccount/validation";
import { ButtonPrimaryComponent } from "../components/global/ButtonPrimaryComponent";
import { ModalComponent } from "../components/global/Modal";
import { SpinnerComponet } from "../components/global/SpinnerComponent";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { useNavigation } from "@react-navigation/native";
import { updateAccountApi } from "../services/updateAccount";
import { MyContext } from "../context/MyContext";
import { SaveTokenInStorage, deleteStorage } from "../utils/saveTokenInStorage";
import { findOneUser } from "../services/findOneUser";
import { getUserInfo } from "../utils/getUserInfo";

interface IUserData {
  name: string;
  lastName: string;
  city: string;
  state: string;
  postalCode: string;
  age: string;
  phone: string;
  password: string;
}

export const UpdateAccount = () => {
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [infoStorage, setInfoStorage] = useState<IUserData | any>();

  //context

  const setContext = useContext(MyContext);

  const navigation = useNavigation();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const updateUserFunc = async (data: object) => {
    console.log("here");
    const response = await updateAccountApi(data, dataUser._id);
    console.log("update user success", response);
    //search usuer
    const idUser = setContext?.dataUser;
    const newUser = await findOneUser(idUser._id);
    console.log("new user found", newUser);
    //redirigir al login o home ?
    if (response) {
      setIsModalOpen(true);
      console.log("isModalOpen:", isModalOpen);
      setIsLoading(false);
      //me quede en que aun no guarda bien
      const newStorage = await SaveTokenInStorage(newUser);
      setInfoStorage(newStorage);
      // console.log(setContext?.dataUser);
    }
  };

  const modalRedirect = () => {
    navigation.goBack();
    setContext?.setDataUser(infoStorage);
  };

  //contexto
  const myContext = useContext(MyContext);
  const dataUser = myContext?.dataUser;

  const initialValues: IUserData = {
    name: dataUser?.name || "", // Accede a la propiedad 'name' si está definida
    lastName: dataUser?.lastName || "", // Accede a la propiedad 'last
    city: dataUser?.city || "", // Accede a la prop
    state: dataUser?.state || "", // Accede
    postalCode: dataUser?.postalCode || "", // Accede
    age: dataUser?.age || "", //
    phone: dataUser?.phone || "",
    password: "",
  };



  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={0}>
        <ImageBackground
          style={styles.backgroundImage}
          resizeMode="cover"
          source={require("../../assets/backgroundBlue.png")}
        >
          <View style={{ marginTop: windowHeight * 0.12 }}>
            {/* forms */}

            <View>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  marginBottom: windowHeight * 0.09,
                }}
              >
                Actualizar Cuenta
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
                    if (
                      typeof values.name === "string" &&
                      values.name.trim() !== ""
                    ) {
                      if (validateName(values.name.toString()))
                        errors.name = validateName(values.name.toString());
                    }
                    if (values.lastName.trim() !== "") {
                      if (validateLastName(values.lastName.toString()))
                        errors.lastName = validateLastName(
                          values.lastName.toString()
                        );
                    }
                    if (values.postalCode.trim() !== "") {
                      if (validatePostalCode(values.postalCode.toString()))
                        errors.postalCode = validatePostalCode(
                          values.postalCode.toString()
                        );
                    }
                    if (
                      typeof values.age === "string" &&
                      values.age.trim() !== ""
                    ) {
                      if (validateAge(values.age.toString()))
                        errors.age = validateAge(values.age.toString());
                    }
                    if (values.phone.trim() !== "") {
                      if (validatePhone(values.phone.toString()))
                        errors.phone = validatePhone(values.phone.toString());
                    }
               
                    if (values.password.trim() !== "") {
                      if (validatePassword(values.password.toString()))
                        errors.password = validatePassword(
                          values.password.toString()
                        );
                    }
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
                    updateUserFunc(data);
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
                        style={{
                          width: windowHeight * 0.4,
                          justifyContent: "center",
                        }}
                      >
                        {/* is modal */}
                        {isModalOpen ? (
                          <ModalComponent
                            title={"Datos actualizados"}
                            titleButton={"Aceptar"}
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
                        text={"Actualizar"}
                        onPress={handleSubmit}
                        marginBottom={0.9}
                      ></ButtonPrimaryComponent>
                    </View>
                  )}
                </Formik>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
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

const formsProps = [
  {
    id: 1,
    name: "name",
    visibleText: "Nombre",
    keyboardType: "default",
    secureTextEntry: false,
    limit: 20,
  },
  {
    id: 2,
    name: "lastName",
    visibleText: "Apellidos",
    keyboardType: "default",
    secureTextEntry: false,
    limit: 20,
  },
  {
    id: 5,
    name: "postalCode",
    visibleText: "Código Postal",
    keyboardType: "number-pad",
    secureTextEntry: false,
    limit: 5,
  },
  {
    id: 6,
    name: "age",
    visibleText: "Edad",
    keyboardType: "number-pad",
    secureTextEntry: false,
    limit: 2,
  },

  {
    id: 7,
    name: "phone",
    visibleText: "Telefono",
    keyboardType: "number-pad",
    secureTextEntry: false,
    limit: 10,
  },
  {
    id: 9,
    name: "password",
    visibleText: "Contraseña (actualizar)",
    keyboardType: "default",
    secureTextEntry: true,
    limit: 80,
  },
];
