//urls
// const url : string = "http://localhost:8080/api/v1/login";
const url: string = "https://your-confort-backend.onrender.com/api/v1/login";


export const userLogin = async (email: string, password: string) => {
  console.log(email, password);
  try {
    interface IDataSend {
      userEmail: string;
      userPassword: string;
    }
    const dataSend: IDataSend = {
      userEmail: email,
      userPassword: password,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSend),
    });
    const responseJson = await response.json();
    console.log('Response:', responseJson);
    if(response.ok) {
      return responseJson;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};
