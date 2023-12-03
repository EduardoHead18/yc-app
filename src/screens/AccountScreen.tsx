import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getUserInfo } from "../utils/getUserInfo";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { allColors } from "../utils/colors";
import { ButtonPrimaryComponent } from "../components/global/ButtonPrimaryComponent";
import { useNavigation } from "@react-navigation/native";
import { findOneSubscription } from "../services/subscription/findOneSuscription";
import { FontAwesome5 } from "@expo/vector-icons";
import { useStackNavigation } from "../hooks/useStackNavigation";
import { ModalComponent } from "../components/global/Modal";
import { Platform } from "react-native";

export const AccountScreen = () => {
  const [userStorage, setUserStorages] = useState<any>();
  const [dataSubscription, setDataSubscription] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  //navegacion
  const navigation = useNavigation();
  const { navigateToUpdateAccount } = useStackNavigation();

  const modalRedirect = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const dataUser = async () => {
      const dataUser = await getUserInfo();
      console.log("from storage", dataUser);
      setUserStorages(dataUser);

      if (dataUser && dataUser._id) {
        const response = await findOneSubscription(dataUser._id);
        console.log("Subscription data", response.subscriptions[0]);
        setDataSubscription(response.subscriptions[0]);
      }
    };
    dataUser();
  }, []);
  return (
    <View style={{ marginTop: Platform.OS === 'ios'? windowHeight * 0.07: windowHeight * 0.02, paddingHorizontal: 10 }}>
      <ButtonPrimaryComponent
        text={"< Atras"}
        onPress={() => navigation.goBack()}
        marginBottom={0.9}
      ></ButtonPrimaryComponent>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View
          style={{
            width: windowWidth * 0.8,
            backgroundColor: allColors.backgroundGray,
            height: windowHeight * 0.3,
            padding: 15,
            borderRadius: 10,
            marginTop: windowHeight * 0.02,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 20,
                marginBottom: windowHeight * 0.02,
                fontWeight: "700",
                color: "black",
                textAlign: "center",
              }}
            >
              Datos de la cuenta
            </Text>
            <TouchableOpacity onPress={() => navigateToUpdateAccount()}>
              <View
                style={{
                  backgroundColor: allColors.backgorunGreen,
                  padding: 10,
                  borderRadius: 100,
                }}
              >
                <FontAwesome5 name="edit" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <Text>Nombre: {userStorage?.name}</Text>
          <Text>Apellidos: {userStorage?.lastName}</Text>
          <Text>City: {userStorage?.city}</Text>
          <Text>Estado: {userStorage?.state}</Text>
          <Text>Código Postal: {userStorage?.postalCode}</Text>
          <Text>Edad: {userStorage?.age}</Text>
          <Text>email: {userStorage?.email}</Text>
          <Text>Telefono: {userStorage?.phone}</Text>
        </View>

        <View
          style={{
            width: windowWidth * 0.8,
            backgroundColor: allColors.backgroundGray,
            height: windowHeight * 0.25,
            padding: 15,
            borderRadius: 10,
            marginTop: windowHeight * 0.02,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              marginBottom: windowHeight * 0.02,
              fontWeight: "700",
              color: "black",
              textAlign: "center",
            }}
          >
            Datos de la suscripción
          </Text>
          <Text>
            Tipo de suscripción: {dataSubscription?.type_subscription}
          </Text>
          <Text>
            Suscripción activa: {dataSubscription?.active ? "Si" : "No"}
          </Text>
          <Text>
            Fecha de suscripción: {dataSubscription?.creation_date_subscription}
          </Text>
          {/* is modal */}
          {isModalOpen ? (
            <ModalComponent
              title={"¿Estás seguro de querer cancelar tu suscripción?"}
              titleButton={"Aceptar"}
              onPress={() => modalRedirect()}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          ) : (
            ""
          )}

          {dataSubscription?.active ? (
            <TouchableOpacity
              onPress={() => {
                setIsModalOpen(true);
              }}
              style={{
                backgroundColor: "#F05454",
                padding: 10,
                marginTop: windowHeight * 0.02,
                borderRadius: 100,
              }}
            >
              <Text style={{ textAlign: "center" }}>Cancelar suscripción</Text>
            </TouchableOpacity>
          ) : (
            ""
          )}
        </View>
      </View>
    </View>
  );
};
