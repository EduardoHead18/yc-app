import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  FlatList,
  Alert,
  Platform,
} from "react-native";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { allColors } from "../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useStackNavigation } from "../hooks/useStackNavigation";
import { useEffect, useState } from "react";
import { getUserInfo } from "../utils/getUserInfo";
import { findpostByID } from "../services/findPostByUserId";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { findAllPostUser } from "../services/findAllPost";
import { deletePostApi } from "../services/deleteAccount";

interface IPost {
  _id: string;
  title: string;
  description: string;
  price: number;
  url: string;
  // ...
}

export const BeforePostScreen = () => {
  const [infoPost, setInfoPost] = useState<IPost[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const { navigateToTheShowCards, navigateToUpdatePost } = useStackNavigation();
  //get Token inf

  const navigation = useNavigation();

  const getPostIfTheyExist = async () => {
    try {
      const idUserFromStorage = await getUserInfo();

      const response = await findpostByID(idUserFromStorage._id);
      if (response == null) {
        setInfoPost([]);
        return;
      }
      if (response && response.posts) {
        setInfoPost(response.posts);
      } else {
        setInfoPost([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
     await getPostIfTheyExist();
      
      setRefreshing(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  //eliminar publicacion
  const deletePostFunc = async (item:string) => {
    await deletePostApi(item);
    //console.log("del yeison", response);
  };

  useEffect(() => {
    getPostIfTheyExist();
  }, [isFocused]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Llama a getPostIfTheyExist cada vez que el componente está enfocado
      getPostIfTheyExist();
    });

    // Devuelve una función de limpieza
    return unsubscribe;
  }, []);

  const renderData = ({ item }: any) => {
    return (
      <>
        <TouchableOpacity onPress={() => navigateToTheShowCards(item._id)}>
          <View style={styles.cardContainer} key={item._id}>
            <StatusBar
              barStyle={"dark-content"}
              animated={true}
              backgroundColor={"transparent"}
            />
            <Image
              style={styles.imageCard}
              source={{ uri: `${item.url[0]}` }}
              width={0}
              height={0}
            ></Image>

            <View style={styles.textCard}>
              <Text style={{ fontWeight: "500", fontSize: 20, flex: 1 }}>
                {item.title}
              </Text>

              <Text numberOfLines={4} style={styles.textDescriptionsCard}>
                {item.description}
              </Text>
              <Text
                style={[styles.textDescriptionsCard, { fontWeight: "bold" }]}
              >
                {" "}
                $ {item.price}
              </Text>

              <View style={styles.iconCard}>
                <AntDesign name="hearto" size={20} color="white" />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 30,
            marginTop: windowHeight * 0.01,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: allColors.backgorunGreen,
              padding: 5,
              borderRadius: 20,
              paddingHorizontal: 20,
            }}
            onPress={() => navigateToUpdatePost(item._id)}
          >
            <Text>Modificar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Eliminar",
                "¿Estás seguro de que quieres eliminarlo?",
                [
                  {
                    text: "Cancelar",
                    style: "cancel",
                  },
                  {
                    text: "Eliminar",
                    onPress: () => deletePostFunc(item._id),
                  },
                ],
                { cancelable: false }
              );
            }}
            style={{
              backgroundColor: "#F05454",
              padding: 5,
              borderRadius: 20,
              paddingHorizontal: 20,
            }}
          >
            <Text>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  if (!infoPost) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Cargando...</Text>
      </View>
    );
  }
  return (
    <>
      {infoPost.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View>
            <Image
              style={{
                width: windowWidth * 0.8,
                height: windowWidth * 0.7,
              }}
              source={require("../../assets/postImage.png")}
            />
          </View>
          <Text style={{ color: allColors.textBlue }}>
            Agrega un cuarto para comenzar
          </Text>
          <Image
            style={{
              width: windowWidth * 0.7,
              height: windowWidth * 0.7,
            }}
            source={require("../../assets/arrow.png")}
          />
          <ButtonRounded infoPost={infoPost} />
        </View>
      ) : (
        // Renderizar la información cuando hay elementos en infoPost
        
        <View
          style={{
            marginTop: Platform.OS === 'ios'? windowHeight * 0.07: windowHeight * 0.02,
            paddingHorizontal: 10,
            flex: 1,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
            }}
          >
            Mis Posts
          </Text>
          <FlatList
            data={infoPost}
            keyExtractor={(item) => item._id}
            renderItem={renderData}
            showsVerticalScrollIndicator={false}
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
          <ButtonRounded infoPost={infoPost} />
        </View>
      )}
    </>
  );
};

const ButtonRounded = ({
  infoPost,
}: {
  infoPost: IPost[];
  onPress?: () => void;
}) => {
  //satates
  const [dataStorage, setDataStorage] = useState<any>();
  const [hasSubscription, setHasSubscription] = useState<boolean | null>(null);

  //routes
  const { navigateToCreatePost, navigateToSubscription } = useStackNavigation();

  const getUserInfoFunc = async () => {
    const response = await getUserInfo();
    setDataStorage(response);
  };

  const getUserData = async () => {
    const responseApi = await fetch(
      `https://your-confort-backend.onrender.com/api/v1/user_subscription/${dataStorage._id}`
    );
    if (responseApi.ok) {
      const respuestaDeLaSubscription = await responseApi.json();

      //las validaciones de el tipo de suscripciones
      

      //validar si es suscripcion avanzada
      if (
        respuestaDeLaSubscription.subscriptions[0].type_subscription ===
        "avanzado"
      ) {
        const contadorDePost = await findAllPostUser(dataStorage._id);
        if (contadorDePost && contadorDePost.posts) {
          if (contadorDePost && contadorDePost.posts && contadorDePost.posts.length >= 5) {
            navigateToSubscription();
            return "";
          }
          if (!contadorDePost || !contadorDePost.posts || contadorDePost.posts.length <= 5) {
            navigateToCreatePost();
            return "";
          }
        }
        //validar si es premium
        else if (
          respuestaDeLaSubscription.subscriptions[0].type_subscription ===
          "premium"
        ) {
          const contadorDePost = await findAllPostUser(dataStorage._id);
          if (contadorDePost && contadorDePost.posts && contadorDePost.posts.length >= 10) {
            navigateToSubscription();
            return "";
          }
          if (!contadorDePost || !contadorDePost.posts || contadorDePost.posts.length <= 10) {
            navigateToCreatePost();
            return "";
          }
        }
        //validar si es elite
        else if (
          respuestaDeLaSubscription.subscriptions[0].type_subscription ===
          "elite plus"
        ) {
          const contadorDePost = await findAllPostUser(dataStorage._id);
          if (contadorDePost && contadorDePost.posts && contadorDePost.posts.length >= 20) {
            navigateToSubscription();
            return "";
          }
          if (!contadorDePost || !contadorDePost.posts || contadorDePost.posts.length <= 20) {
            navigateToCreatePost();
            return "";
          }
        }
      }

      console.log("si tiene subscripcion");
      setHasSubscription(true);
      navigateToCreatePost();
    }
    if (responseApi.status === 404) {
      console.log("no tiene subscripcion");
      setHasSubscription(false);
      navigateToSubscription();
    }
  };
  useEffect(() => {
    const checkUserStatus = async () => {
      // Obtén la información del usuario
      await getUserInfoFunc();
    };

    checkUserStatus();
  }, [hasSubscription]);

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: windowWidth * 0.7,
        margin: 16,
        backgroundColor: allColors.backgorunGreen,
        width: 60,
        height: 60,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => {}}
        onPressIn={async () => {
          try {
            await getUserData();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <AntDesign name="plus" size={24} color={allColors.whiteColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    padding: 10,
    alignSelf: "center",
    alignItems: "center",
    height: windowHeight * 0.3,
    backgroundColor: "white",
    marginTop: windowHeight * 0.01,
    borderRadius: 20,
  },
  imageCard: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.6,
    borderRadius: 20,
  },
  textCard: {
    flex: 1,
    justifyContent: "center",
    marginLeft: windowWidth * 0.02,
    padding: 20,
  },
  textDescriptionsCard: {
    fontSize: 15,
    flexWrap: "wrap",
    marginBottom: windowHeight * 0.01,
  },
  iconCard: {
    marginTop: windowHeight * 0.02,
  },
});
