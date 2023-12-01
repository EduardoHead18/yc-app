const url: string = "http://localhost:8080/api/v1/user_subscription/";
export const findOneSubscription = async (idUser: string) => {
    console.log('userid: ' + idUser);
  try {
    const response = await fetch(url + idUser);
    const responseJson = await response.json();
    if (response.ok) return responseJson;
  } catch (error) {
    console.log(error);
  }
};
