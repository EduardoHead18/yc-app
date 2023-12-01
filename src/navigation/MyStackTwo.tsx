import { createStackNavigator } from "@react-navigation/stack";
import { CreateAccount } from "../screens/CreateAccountScreen";
import { RecoverPassword } from "../screens/RecoverPasswordScreen";
import { ValidateCode } from "../screens/ValidateCodeScreen";
import { ChangePassword } from "../screens/ChangePasswordScreen";
import { LoginGoogle } from "../screens/LoginGoogle";
import { MyTabs } from "./MyTabs";
import { ShowCards } from "../screens/ShowCardsScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { TestUploadImages } from "../screens/TestUploadImages";
import { Subscriptions } from "../screens/Subscriptions";
import CheckoutScreen from "../screens/stripe/CheckScreen";
import { UserScreen } from "../screens/UserScreen";
import { BeforePostScreen } from "../screens/BeforePostScreen";
import { UpdateAccount } from "../screens/UpdateAccount";
import { AccountScreen } from "../screens/AccountScreen";
import { UpdatePost } from "../screens/UpdatePost";

const Stack = createStackNavigator();

export function MyStackTwo() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="myTabs"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="createAccount" component={CreateAccount} />
        <Stack.Screen
          name="recoverPassword"
          component={RecoverPassword}
          options={{ animationEnabled: true }}
        />
        <Stack.Screen
          name="validateCode"
          component={ValidateCode}
          options={{ gestureEnabled: true, animationEnabled: true }}
        />
        <Stack.Screen
          name="changePassword"
          component={ChangePassword}
          options={{ gestureEnabled: true, animationEnabled: true }}
        />
        <Stack.Screen
          name="loginGoogle"
          component={LoginGoogle}
          options={{ gestureEnabled: true, animationEnabled: true }}
        />
        <Stack.Screen
          name="myTabs"
          component={MyTabs}
          options={{ gestureEnabled: false, animationEnabled: true }}
        />
        <Stack.Screen
          name="showCards"
          component={ShowCards}
          options={{ gestureEnabled: true, animationEnabled: true }}
        />

        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{ gestureEnabled: true, animationEnabled: true }}
        />
        <Stack.Screen
          name="createPost"
          component={TestUploadImages}
          options={{ gestureEnabled: true, animationEnabled: true }}
        />
        <Stack.Screen
          name="subscription"
          component={Subscriptions}
          options={{ gestureEnabled: true, animationEnabled: true }}
        />
        <Stack.Screen
          name="checkScreen"
          component={CheckoutScreen}
          options={{ gestureEnabled: true, animationEnabled: true }}
        />
        <Stack.Screen
          name="userScreen"
          component={UserScreen}
          options={{ gestureEnabled: true, animationEnabled: true }}
        />
        <Stack.Screen
          name="updateAccount"
          component={UpdateAccount}
          options={{ gestureEnabled: true, animationEnabled: true }}
        />
        <Stack.Screen
          name="accountScreen"
          component={AccountScreen}
          options={{ gestureEnabled: true, animationEnabled: true }}
        />
        <Stack.Screen
          name="updatePost"
          component={UpdatePost}
          options={{ gestureEnabled: true, animationEnabled: true }}
        />
      </Stack.Navigator>
    </>
  );
}
