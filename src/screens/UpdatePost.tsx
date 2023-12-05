import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { findOnePost } from "../services/findOnePost";
import { allColors } from "../utils/colors";
import { ButtonPrimaryComponent } from "../components/global/ButtonPrimaryComponent";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { useNavigation } from "@react-navigation/native";
import { upload } from "cloudinary-react-native";
import { Formik } from "formik";
import { SpinnerComponet } from "../components/global/SpinnerComponent";
import { createPostApi } from "../services/createPostApi";
import { getUserInfo } from "../utils/getUserInfo";
import { Cloudinary } from "@cloudinary/url-gen";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { updatePostApi } from "../services/updatePost";
import { CLOUD_NAME } from "@env";
import { Platform, KeyboardAvoidingView } from "react-native";

const cld = new Cloudinary({
  cloud: {
    cloudName: CLOUD_NAME,
  },
  url: {
    secure: true,
  },
});

const options = {
  upload_preset: "your-confort-images",
  unsigned: true,
};

interface IPost {
  id_user: string;
  title: string;
  email: string;
  phone: string;
  url: string;
  description: string;
  location: string;
  price: number;
}

export const UpdatePost = ({ route }: any) => {
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [urls, setUrls] = useState<string[]>();
  const [showError, setShowError] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { postId } = route.params || {};
  const [data, setData] = useState<any>(null);

  console.log("esta es la data", data);
  const findPost = async () => {
    try {
      const response = await findOnePost(postId);
      console.log("response estos son los datos", response);
      setData(response);
      setDataLoaded(true);
    } catch (error) {
      console.log(error);
      setDataLoaded(true);
    }
  };

  useEffect(() => {
    findPost();
  }, []);

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
      // if (successfulUploadCount === imageUris.length) {
      //   Alert.alert("La publicación se subió");
      // }
      setUrls(uploadedUrls);
      console.log("todas las urls", uploadedUrls);
      return uploadedUrls;
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un error al subir las imágenes.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 9,
          backgroundColor: allColors.whiteColor,
        }}
      >
        <View style={{  marginTop: Platform.OS === 'ios'? windowHeight * 0.07: windowHeight * 0.02, }}>
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
              data={imageUris}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
    
                onPress={handleImagePicker}
              >
                <Image
                  source={{ uri: item }}
                  style={{
                    marginRight: 10,
                    opacity: 10,
                    width: windowWidth * 0.8,
                    justifyContent: "center",
                    alignItems: "center",
                    height: windowHeight * 0.5,
                    borderRadius: 10,
                    marginTop: windowHeight * 0.09,
                  }}
                />
                </TouchableOpacity>
              )}
              horizontal={true}
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
              
              {data ? (
                <TouchableOpacity onPress={handleImagePicker}>
                <FlatList
                  data={data.url}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => {
                    console.log("Rendering image with URL:", item);
                    return (
                      <View
                        style={{
                          width: windowWidth * 0.8,
                          height: windowHeight * 0.4,
                        }}
                      >
                        <Image
                          source={{ uri: item }}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 10,
                          }}
                        />
                      </View>
                    );
                  }}
                />
                      </TouchableOpacity>

             
              ) : (
                <AntDesign
                  style={styles.iconPlus}
                  name="plus"
                  size={60}
                  color="black"
                />
              )}
            </TouchableOpacity>
          )}
          {dataLoaded && data ? (
            <Formik
              initialValues={{
                title: data ? data.title : "",
                url: data ? data.url : "",
                description: data ? data.description : "",
                location: data ? data.location : "",
                price: data ? data.price : 0,
              }}
              enableReinitialize
              validate={async (values) => {
                const errors: Partial<IPost> = {};
                // Verificar si hay imágenes seleccionadas

                if (!values.title || !values.description || !values.location) {
                  setShowErrorAlert(true);
                } else setShowErrorAlert(false);

                return errors;
              }}
              //send email to api
              onSubmit={async (values) => {
                setIsLoading(true);
                try {
                  if (showErrorAlert) {
                    Alert.alert("Debes llenar los campos");
                    setIsLoading(false);
                    return;
                  }
                  if (!imageUris || imageUris.length === 0) {
                    Alert.alert("Debes seleccionar al menos una imagen.");
                    setIsLoading(false);
                    return; // Sale de la función si no hay imágenes
                  }
                  const { title, description, location, price } = values;
                  // Subir imágenes y obtener URLs
                  const uploadedUrls = await handleImageUpload();
                  //obtener el id del usuario
                  const idUserFromStorage = await getUserInfo();

                  // objeto a enviar a la API
                  const dataSend = {
                    id_user: idUserFromStorage._id,
                    title: title,
                    email: idUserFromStorage.email,
                    phone: idUserFromStorage.phone,
                    url: uploadedUrls, //vacia
                    description: description,
                    location: location,
                    price: price,
                  };
                  console.log("este es el data send", dataSend);
                  const response = await updatePostApi(dataSend, postId);
                  navigation.goBack();

                  if (response && response.status === "success") {
                    setShowError(false); // No hay error, se creó el post
                  } else {
                    setShowError(true); // Hay un error al crear el post
                  }
                  Alert.alert("La publicación se actualizo");
                } catch (error) {
                  console.log("error", error);
                  Alert.alert("Sin guardar", "Debes llenar los datos");
                  setIsLoading(false);
                }
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => {
                return (
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <Text
                      style={{ fontSize: 17, marginTop: windowHeight * 0.05 }}
                    >
                      Titulo
                    </Text>
                    <TextInput
                      onChangeText={handleChange("title")}
                      onBlur={handleBlur("title")}
                      value={values.title}
                      style={styles.texInput}
                      autoFocus={false}
                      keyboardType={"email-address"}
                      maxLength={100}
                      autoCapitalize="none"
                    />
                    <Text style={{ fontSize: 17 }}>Descripción</Text>
                    <TextInput
                      onChangeText={handleChange("description")}
                      onBlur={handleBlur("description")}
                      value={values.description}
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
                      value={values.location}
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
                      value={values.price.toString()}
                      style={[styles.texInput]}
                      autoFocus={false}
                      secureTextEntry={false}
                      maxLength={70}
                      keyboardType={"numeric"}
                      autoCapitalize="none"
                    />

                    <View style={{ marginBottom: windowHeight * 0.05 }}>
                      {isLoading ? <SpinnerComponet /> : ""}
                      <ButtonPrimaryComponent
                        text="Guardar post"
                        onPress={handleSubmit}
                      ></ButtonPrimaryComponent>
                    </View>
                  </ScrollView>
                );
              }}
            </Formik>
           
          ) : (
            ""
          )}
        
        </View>
      </View>
      
      </KeyboardAvoidingView>
     
    </TouchableWithoutFeedback>
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
