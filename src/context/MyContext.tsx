import { createContext, useState } from "react";

import { MyContextType } from "../types/typesContext";
import { IProps, ILoginData } from "../interfaces/interfacesLogin";

export const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider = ({ children }: IProps) => {
  const [stateData, setStateData] = useState<ILoginData>({
    email: "prueba@gmail.com",
    password: "123",
  });
  const [emailLogin, setEmailLogin] = useState("");
  const [saveEmail, setSaveEmail] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [dataUser, setDataUser] = useState<any>()

  const updateLoggedInStatus = () => {
    setIsLoggedIn(true);
    console.log("valor desde mi provider", isLoggedIn);
  };

  const updateLoginData = (newData: any) => {
    setStateData({ ...stateData, ...newData });
  };
  const updateStateEmail = (newEmail: string) => {
    setSaveEmail(newEmail);
  };
  const updateEmailLogin = (newEmailLogin: string) => {
    setEmailLogin(newEmailLogin);
  };

  return (
    <MyContext.Provider
      value={{
        stateData,
        updateLoginData,
        isLoggedIn,
        updateLoggedInStatus,
        updateStateEmail,
        saveEmail,
        updateEmailLogin,
        emailLogin,
        dataUser,
        setDataUser
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
