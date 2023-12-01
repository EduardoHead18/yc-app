import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type StackParamList = {
  createAccount: undefined;
  login: undefined;
  recoverPassword: undefined;
  validateCode: undefined;
  changePassword: undefined;
  loginGoogle: undefined;
  showCards: { postId: any };
  myTabs: undefined;
  home: undefined;
  createPost: undefined;
  subscription: undefined;
  checkScreen: undefined;
  userScreen: undefined;
  beforePostScreen: undefined;
  updateAccount: undefined;
  accountScreen: undefined;
  updatePost: {postId: any};
};

type NavigationProps = StackNavigationProp<StackParamList>;
export const useStackNavigation = () => {
  const navigation = useNavigation<NavigationProps>();

  const navigateToCreateAccount = () => {
    navigation.navigate("createAccount");
  };

  const navigateToLogin = () => {
    navigation.navigate("login");
  };
  const navigateToRecoverPassword = () => {
    navigation.navigate("recoverPassword");
  };
  const navigateToValidateCode = () => {
    navigation.navigate("validateCode");
  };
  const navigateToChangePassword = () => {
    navigation.navigate("changePassword");
  };
  const navigateToLoginGoogle = () => navigation.navigate("loginGoogle");
  const navigateToTabs = () => navigation.navigate("myTabs");

  const navigateToTheShowCards = (postId: any) => {
    navigation.navigate("showCards", { postId });
  };

  const navigateToHome = () => navigation.navigate("home");
  const navigateToCreatePost = () => navigation.navigate("createPost");
  const navigateToSubscription = () => navigation.navigate("subscription");
  const navigateToCheckScreen= () => navigation.navigate("checkScreen");
  const navigateToUserScreen= () => navigation.navigate("userScreen");
  const navigateToBeforePostScreen= () => navigation.navigate("beforePostScreen");
  const navigateToUpdateAccount= () => navigation.navigate("updateAccount");
  const navigateToAccountScreen= () => navigation.navigate("accountScreen");
  const navigateToUpdatePost= (postId:any) => navigation.navigate("updatePost",{postId});


  return {
    navigateToCreateAccount,
    navigateToLogin,
    navigateToRecoverPassword,
    navigateToValidateCode,
    navigateToChangePassword,
    navigateToLoginGoogle,
    navigateToTheShowCards,
    navigateToTabs,
    navigateToHome,
    navigateToCreatePost,
    navigateToSubscription,
    navigateToCheckScreen,
    navigateToUserScreen,
    navigateToBeforePostScreen,
    navigateToUpdateAccount,
    navigateToAccountScreen,
    navigateToUpdatePost
  };
};
