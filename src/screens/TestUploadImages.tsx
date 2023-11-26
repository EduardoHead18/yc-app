import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Button,
  Image,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from "cloudinary-react-native";
import { ScrollView } from "react-native-gesture-handler";
import { createPostApi } from "../services/createPostApi";
import { MyContext } from "../context/MyContext";
import { MyContextType } from "../types/typesContext";
import { AntDesign } from "@expo/vector-icons";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { ButtonPrimaryComponent } from "../components/global/ButtonPrimaryComponent";
import { allColors } from "../utils/colors";

import { userLogin } from "../services/loginApi";
import { SaveTokenInStorage } from "../utils/saveTokenInStorage";
import { Formik } from "formik";
import { getUserInfo } from "../utils/getUserInfo";
import { useNavigation } from "@react-navigation/native";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dwmmdvzgq", // Reemplaza con tu cloud name
  },
  url: {
    secure: true,
  },
});

const options = {
  upload_preset: "your-confort-images", // Reemplaza con tu upload preset
  unsigned: true,
};

interface IPost {
  id_user: string;
  title: string;
  url: string;
  description: string;
  location: string;
  price: number;
}

export const TestUploadImages = () => {
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [urls, setUrls] = useState<string[]>();


  //navigation
  const navigation = useNavigation();

  var urlsTemporal: string[] = [];


  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permiso necesario",
        "Se necesita permiso para acceder a la galería de imágenes."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Habilita la selección múltiple
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      // Obtiene las URIs de las imágenes seleccionadas
      const selectedUris = result.assets.map((asset) => asset.uri);
      setImageUris(selectedUris);
    }
  };

  const handleImageUpload = async () => {
    try {
      let successfulUploadCount = 0; // Contador de imágenes subidas exitosamente

      // Itera sobre las URIs de las imágenes y sube cada una
      const uploadPromises = imageUris.map((uri) => {
        return new Promise<string>((resolve, reject) => {
          upload(cld, {
            file: uri,
            options: options,
            callback: (error: any, response: any) => {
              if (error) {
                console.error(error);
                Alert.alert("Error", "Hubo un error al subir la imagen.");
                reject(error);
              } else {
                urlsTemporal.push(response.url);
                console.log("from my url", response.url);
                successfulUploadCount++; // Incrementa el contador
                resolve(response.url);
              }
            },
          });
        });
      });
      const uploadedUrls: string[] = await Promise.all(uploadPromises);
      if (successfulUploadCount === imageUris.length) {
        Alert.alert("Éxito", "La publicación se subio");
      }
      setUrls(uploadedUrls);
      console.log("todas las urls", uploadedUrls);
      return uploadedUrls
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un error al subir las imágenes.");
    }
  };
  //llamada a la api
  

  //formik
  const initialValues = {
    title: "",
    url: "",
    description: "",
    location: "",
    price: 0,
  };

  const getStorage = async () => {
    const idUserFromStorage = await getUserInfo();
    console.log(idUserFromStorage._id);
  };
  useEffect(() => {
    getStorage();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 9,
        backgroundColor: allColors.whiteColor,
      }}
    >
      <View style={{ marginTop: windowHeight * 0.09 }}>
        <ButtonPrimaryComponent
          text="< Atras"
          onPress={() => navigation.goBack()}
        ></ButtonPrimaryComponent>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: allColors.backgroundGreenCards,
          marginTop: windowHeight * 0.02,
          borderRadius: 20,
        }}
      >
        {imageUris && imageUris.length > 0 ? (
          <FlatList
            horizontal
            data={imageUris}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={{
                  marginRight: 10,
                  opacity: 10,
                  width: windowWidth * 0.8,
                  justifyContent: "center",
                  alignItems: "center",
                  height: windowHeight * 0.4,
                  borderRadius: 10,
                  marginTop: windowHeight * 0.09,
                }}
              />
            )}
          />
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: allColors.backgorunGreen,
              opacity: 10,
              width: windowWidth * 0.8,
              justifyContent: "center",
              alignItems: "center",
              height: windowHeight * 0.4,
              borderRadius: 10,
              marginTop: windowHeight * 0.02,
            }}
            onPress={handleImagePicker}
          >
            <AntDesign
              style={styles.iconPlus}
              name="plus"
              size={60}
              color="black"
            />
          </TouchableOpacity>
        )}
        <Formik
          initialValues={initialValues}
          validate={async (values) => {
            const errors: Partial<IPost> = {};
            // Validation input

            return errors;
          }}
          //send email to api
          onSubmit={async (values) => {
            try {
              const { title, description, location, price } = values;
              // Subir imágenes y obtener URLs
              const uploadedUrls = await handleImageUpload();
              //obtener el id del usuario
              const idUserFromStorage = await getUserInfo();
  
              // objeto a enviar a la API
              const dataSend = {
                id_user: idUserFromStorage._id,
                title: title,
                url: uploadedUrls, //vacia
                description: description,
                location: location,
                price: price,
              };
              console.log("este es el data send", dataSend);
  
              const response = await createPostApi(dataSend);
              console.log('respuesta para ver si se creo el post a la API', response);
              
            } catch (error) {
              console.log('error', error);
            }
            
          }}
        >
          {({ handleChange, handleBlur, handleSubmit }) => (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={{ fontSize: 17, marginTop: windowHeight * 0.05 }}>
                Titulo
              </Text>
              <TextInput
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                style={styles.texInput}
                autoFocus={false}
                keyboardType={"email-address"}
                maxLength={100}
                autoCapitalize="none"
              />
              <Text style={{ fontSize: 17 }}>Descripcion</Text>
              <TextInput
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                style={styles.texInput}
                autoFocus={false}
                keyboardType={"default"}
                secureTextEntry={false}
                maxLength={1000}
                autoCapitalize="none"
              />
              <Text style={{ fontSize: 17 }}>Ubicación</Text>
              <TextInput
                onChangeText={handleChange("location")}
                onBlur={handleBlur("location")}
                style={styles.texInput}
                autoFocus={false}
                keyboardType={"default"}
                secureTextEntry={false}
                maxLength={70}
                autoCapitalize="none"
              />
              <Text style={{ fontSize: 17 }}>Precio (mensual)</Text>
              <TextInput
                onChangeText={handleChange("price")}
                onBlur={handleBlur("price")}
                style={[styles.texInput]}
                autoFocus={false}
                secureTextEntry={false}
                maxLength={70}
                autoCapitalize="none"
              />

              <View style={{ marginBottom: windowHeight * 0.05 }}>
                <ButtonPrimaryComponent
                  text="subir post"
                  onPress={handleSubmit}
                ></ButtonPrimaryComponent>
              </View>
            </ScrollView>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: allColors.whiteColor,
    opacity: 0.7,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B34766",
    opacity: 0.8,
    width: windowWidth * 0.9,
    height: windowHeight * 0.4,
    padding: 10,
  },
  iconPlus: {},
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

  errorText: {
    width: windowWidth * 0.8,
    color: "red",
    marginBottom: windowHeight * 0.02,
  },
  text2: {
    color: "#B34766",
    fontSize: 17,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});
