import { ILoginData } from "../interfaces/interfacesLogin";

export type MyContextType = {
  stateData: ILoginData;
  updateLoginData: (newData: ILoginData) => void;
  updateLoggedInStatus:()=>void;
  isLoggedIn: boolean;
  saveEmail:string 
  updateStateEmail:(newEmail:string)=>void;
  updateEmailLogin:(newEmail:string)=>void;
  emailLogin:string,
  dataUser: any; 
  setDataUser:(data:any) => void;
};
