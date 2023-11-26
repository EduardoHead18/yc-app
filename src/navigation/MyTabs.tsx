import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { SettingScreen } from "../screens/SettingScreen";
import { Feather, Entypo, Ionicons } from "@expo/vector-icons";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { KeyboardAvoidingView, View } from "react-native";
import { allColors } from "../utils/colors";
import { BeforePostScreen } from "../screens/BeforePostScreen";


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
              backgroundColor: '#fff',

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
              
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <Feather name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="CreatePost"
            component={BeforePostScreen}
            options={{
              tabBarLabel: "Post",
              tabBarIcon: ({ color, size }) => (
                <Entypo name="circle-with-plus" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Setting"
            component={SettingScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings-outline" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </KeyboardAvoidingView>
    </View>
  );
}
