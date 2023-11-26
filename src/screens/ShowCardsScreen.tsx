import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { findOnePost } from "../services/findOnePost";
import { allColors } from "../utils/colors";
import { ButtonPrimaryComponent } from "../components/global/ButtonPrimaryComponent";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { useStackNavigation } from "../hooks/useStackNavigation";
import { useNavigation } from "@react-navigation/native";


export const ShowCards = ({ route }: any) => {
  const { postId } = route.params || {};
  const [data, setData] = useState<any>();

  //navigation
  const navigation = useNavigation()

  const findPost = async () => {
    try {
      const response = await findOnePost(postId);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("de mi estado", data);

  useEffect(() => {
    findPost();
    console.log("postId from showCards:", postId);
  }, []);

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
          <ButtonPrimaryComponent text="< Atras" onPress={()=>navigation.goBack()}></ButtonPrimaryComponent>
        </View>
        <ScrollView
        showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            backgroundColor: allColors.backgroundGreenCards,
            paddingHorizontal: 9,
            borderRadius:20,
            marginTop:windowHeight*0.02
          }}
        >
          <View style={{ alignItems: "flex-start"}}></View>
          <View style={{ marginTop: windowHeight * 0.03 }}>
            <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
              {data &&
                data.url &&
                data.url.map((imageUrl: string, index: number) => (
                  <View
                    style={{ backgroundColor: "#D4D5D6", borderRadius: 20}}
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
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                marginBottom: windowHeight * 0.02,
                marginTop:windowHeight*0.02
              }}
            >
              Descripcion:
            </Text>
            <Text>{data.description}</Text>
            <View style={{ flex: 1, flexDirection: "row", gap:6 }}>
              <View
                style={{
                  width: windowWidth * 0.5,
                  height: windowHeight * 0.2,
                  backgroundColor: "red",
                }}
              ></View>
              <View
                style={{
                  width: windowWidth * 0.5,
                  height: windowHeight * 0.2,
                  backgroundColor: "blue",
                }}
              >
                <Text>{data.location}</Text>
                <Text>{data.price} pesos al mes</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
