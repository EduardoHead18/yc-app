import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { allColors } from "../utils/colors";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { useStackNavigation } from "../hooks/useStackNavigation";
import { useContext, useEffect, useState } from "react";
import { getPost } from "../services/getPostApi";
import { MyContext } from "../context/MyContext";
import { getUserInfo } from "../utils/getUserInfo";

export const HomeScreen = () => {
  const [dataApi, setDataApi] = useState<any>();
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isTokenExisting, setIsTokenExisting] = useState<boolean>();

  const myContext = useContext(MyContext);

 
  const getPostApiHome = async () => {
    try {
      const response = await getPost();
      setDataApi(response);
      //save on cache

      const infoUser = await getUserInfo()
      myContext?.setDataUser(infoUser)
  
    } catch (error) {
      return console.log("error al cargar l api");
    }
  };
  useEffect(() => {
    //agregar la data de cache al estado:
    getPostApiHome();
  }, [page]);

  const handleEndReached = () => {
    // Incrementar la página para cargar más datos al final de la lista
    setPage((prevPage) => prevPage + 1);
  };

  //routes
  const { navigateToTheShowCards } = useStackNavigation();
  //contexto

  if(!dataApi){
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>Cargando...</Text>
      </View>
    )
  }

  const renderData = ({ item }: any) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    if (
      !searchTerm ||
      item.location.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      (item.price && item.price.toString().includes(lowerCaseSearchTerm))
    ) {
      return (
        <TouchableOpacity onPress={() => navigateToTheShowCards(item._id)}>
          <View style={styles.cardContainer}>
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
      );
    }
    return null;
  };

  return (
    <SafeAreaView
      style={{
        width: windowWidth * 0.95,
        alignSelf: "center",
        marginTop: windowHeight * 0.07,
      }}
    >
      <StatusBar backgroundColor={"#FF0000"} barStyle={"default"} />
      <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <FlatList
        inverted={true}
        data={dataApi}
        renderItem={renderData}
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </SafeAreaView>
  );
};

const SearchComponent = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
  };
  return (
    <View style={styles.inputContainer}>
      <FontAwesome5
        name="search"
        size={20}
        color="black"
        style={{ marginRight: 10 }}
      />
      <TextInput
        style={{
          height: windowHeight * 0.05,
          width: windowWidth * 0.7,
        }}
        placeholder="Buscar..."
        placeholderTextColor="black"
        onChangeText={handleSearchChange}
        value={searchTerm}
        onSubmitEditing={() => {
          console.log("Realizar búsqueda:", searchTerm);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: allColors.backgroundGreenCards,
    borderRadius: 100,
    padding: 0,
    paddingHorizontal: 20,
    marginBottom: windowHeight * 0.02,
  },
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
  },
  iconCard: {
    marginTop: windowHeight * 0.03,
  },
});
