import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { findOnePost } from "../services/findOnePost";
import { allColors } from "../utils/colors";
import { ButtonPrimaryComponent } from "../components/global/ButtonPrimaryComponent";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import { GOOGLE_MAPS_KEY } from "@env";
import * as Linking from "expo-linking";
import { getUserInfo } from "../utils/getUserInfo";

interface ILocationData {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number | null;
}

export const ShowCards = ({ route }: any) => {
  const [storageData, setStorageData] = useState<any>();
  //llamadas

  // const getUserInfoStorage = async () => {
  //   const data = await getUserInfo();
  //   setStorageData(data);
  // };

  // const handlePhoneCall = async() => {
  // try {
  //   await Linking.openURL("tel:+9191266429")
  // } catch (error) {
  //   console.log(error)
  // }
  // };

  //aqui abajo solo cosas de mapas

  const { postId } = route.params || {};
  const [data, setData] = useState<any>();
  //google maps
  const [coordinates, setCoordinates] = useState({
    latitude: 16.9087258,
    longitude: -92.0943351,
  });
  const address = data ? `${data.location} ocosingo chiapas` : undefined;
  const searchLocation = async () => {
    Geocoder.init(GOOGLE_MAPS_KEY);

    try {
      if (address) {
        const response = await Geocoder.from(address);
        const { lat, lng } = response.results[0].geometry.location;
        setCoordinates({ latitude: lat, longitude: lng });
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  //navigation
  const navigation = useNavigation();

  const findPost = async () => {
    try {
      const response = await findOnePost(postId);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findPost();
    searchLocation();
    
  }, [address]);

  if (!data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: allColors.whiteColor,
          paddingHorizontal: 9,
        }}
      >
        <View style={{ marginTop: windowHeight * 0.09 }}>
          <ButtonPrimaryComponent
            text="< Atras"
            onPress={() => navigation.goBack()}
          ></ButtonPrimaryComponent>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            backgroundColor: allColors.backgroundGreenCards,
            paddingHorizontal: 9,
            borderRadius: 20,
            marginTop: windowHeight * 0.02,
          }}
        >
          <View style={{ alignItems: "flex-start" }}></View>
          <View style={{ marginTop: windowHeight * 0.03 }}>
            <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
              {data &&
                data.url &&
                data.url.map((imageUrl: string, index: number) => (
                  <View
                    style={{ backgroundColor: "#D4D5D6", borderRadius: 20 }}
                    key={index}
                  >
                    <Image
                      style={{
                        width: windowWidth,
                        height: windowHeight * 0.5,
                        marginRight: 20,
                        borderRadius: 20,
                      }}
                      source={{ uri: imageUrl }}
                      resizeMode="cover"
                    />
                  </View>
                ))}
            </ScrollView>
            <Text style={styles.title}>Descripcion:</Text>
            <Text>{data.description}</Text>
            <Text style={styles.title}>Ubicación: </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                gap: 6,
                marginBottom: windowHeight * 0.05,
              }}
            >
              <View
                style={{
                  width: windowWidth * 0.5,
                  height: windowHeight * 0.2,
                }}
              >
                <MapView
                  style={{ flex: 1, borderRadius: 20 }}
                  region={{
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: coordinates.latitude,
                      longitude: coordinates.longitude,
                    }}
                    title="Ubicación seleccionada"
                    description={address}
                  />
                </MapView>
              </View>
              <View
                style={{
                  width: windowWidth * 0.5,
                  height: windowHeight * 0.2,
                }}
              >
                <Text>{data.location}</Text>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "500",
                    flexWrap: "nowrap",
                    paddingHorizontal: 10,
                    marginTop: windowHeight * 0.01,
                  }}
                >
                  ${data.price} mxn al mes
                </Text>
              </View>
            </View>
            <Text style={styles.title}>Contacto:</Text>
           
            <Text>Teléfono: {data.phone}</Text>
            <Text style={{ marginBottom: windowHeight * 0.05 }}>
              Email: {data.email}
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: windowHeight * 0.02,
    marginTop: windowHeight * 0.02,
  },
});
