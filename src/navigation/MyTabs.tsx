import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { SettingScreen } from "../screens/SettingScreen";
import { Feather, Entypo, Ionicons,MaterialIcons } from "@expo/vector-icons";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { KeyboardAvoidingView, View } from "react-native";
import { allColors } from "../utils/colors";
import { BeforePostScreen } from "../screens/BeforePostScreen";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={0}>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: allColors.textGreen,

            headerShown: false,
            tabBarStyle: {
              // flexDirection: "row",
              // justifyContent: "center",
              // alignItems: "center",
              // width: windowWidth * 0.9,
              // height: windowHeight * 0.04,
              // marginTop:windowHeight*0.02,
              // backgroundColor: "transparent",
              // alignSelf: "center",
              // marginBottom: windowWidth * 0.05,
              // borderRadius: 20,
              // elevation: 0,
              backgroundColor: "#4AAECA",

              marginTop: 20,
            },
            tabBarItemStyle: {
              height: windowHeight * 0.07,
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: "",
              tabBarIcon: ({ color, size, focused }) => (
                <Image
                style={{ width: focused ? 30 : 20, // Ajusta el tamaño cuando la pestaña está activa
                height: focused ? 40 : 30,}}
                source={require("../../assets/icons/logoLupa.png")}
              />
              ),
            }}
          />
          <Tab.Screen
            name="CreatePost"
            component={BeforePostScreen}
            options={{
              tabBarLabel: "",
              tabBarIcon: ({ color, size, focused }) => (
                <MaterialIcons name="home-work" size={focused ? 40 : 27} color="white" />
              ),
            }}
          />
          <Tab.Screen
            name="Setting"
            component={SettingScreen}
            options={{
              tabBarLabel:'',
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons name="settings-outline" color={'white'} size={focused ? 40 : 27} />
              ),
            }}
          />
        </Tab.Navigator>
      </KeyboardAvoidingView>
    </View>
  );
}
