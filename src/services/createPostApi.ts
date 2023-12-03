//const url: string = "http://localhost:8080/api/v1/post";
const url: string = "https://your-confort-backend.onrender.com/api/v1/post";


export const createPostApi = async (data:any) => {
  console.log(data)
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    const responseJson = await response.json();
    if(responseJson.ok) return responseJson
    else return null;
  } catch (error) {
    console.log(error);
  }
};
