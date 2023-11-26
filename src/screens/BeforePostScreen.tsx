import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    FlatList,
  } from "react-native";
  import { windowHeight, windowWidth } from "../utils/dimensions";
  import { allColors } from "../utils/colors";
  import { TouchableOpacity } from "react-native-gesture-handler";
  import { AntDesign } from "@expo/vector-icons";
  import { useStackNavigation } from "../hooks/useStackNavigation";
  import { useEffect, useState } from "react";
  import { getUserInfo } from "../utils/getUserInfo";
  import { findpostByID } from "../services/findPostByUserId";
  
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
  
    const { navigateToTheShowCards, navigateToCreatePost } = useStackNavigation();
    //get Token inf
  
    const getPostIfTheyExist = async () => {
      try {
        const idUserFromStorage = await getUserInfo();
  
        const response = await findpostByID(idUserFromStorage._id);
        setInfoPost(response.posts || []);
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleRefresh = async () => {
      setRefreshing(true);
      await getPostIfTheyExist();
      setRefreshing(false);
    };
  
    useEffect(() => {
      getPostIfTheyExist();
    }, []);
  
    const renderData = ({ item }: any) => {
      return (
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
              <Text style={[styles.textDescriptionsCard, { fontWeight: "bold" }]}>
                {" "}
                $ {item.price}
              </Text>
  
              <View style={styles.iconCard}>
                <AntDesign name="hearto" size={20} color="black" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
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
            <ButtonRounded navigateCreatePost={navigateToCreatePost} />
          </View>
        ) : (
          // Renderizar la información cuando hay elementos en infoPost
          <View
            style={{
              marginTop: windowHeight * 0.07,
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
            <ButtonRounded navigateCreatePost={navigateToCreatePost} />
          </View>
        )}
      </>
    );
  };
  
  const ButtonRounded = ({
    navigateCreatePost,
  }: {
    navigateCreatePost: () => void;
  }) => {
    //navigation
  
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
        <TouchableOpacity onPress={navigateCreatePost}>
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
  