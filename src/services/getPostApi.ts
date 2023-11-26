const url: string = 'http://localhost:8080/api/v1/post'
// const url: string =
//   "https://your-confort-backend.onrender.com/api/v1/recover_password";

export const getPost = async () => {
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log('error al obtener la api', error);
    return false;
  }
};
