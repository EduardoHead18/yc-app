export interface IGoogleUser {
    idToken: string;
    scopes: string[];
    serverAuthCode: string;
    user: IUser;
  }
  
  export interface IUser {
    email: string;
    familyName: string;
    givenName: string;
    id: string;
    name: string;
    photo: string;
  }
  