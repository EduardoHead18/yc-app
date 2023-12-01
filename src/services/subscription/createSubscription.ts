const url: string = "http://localhost:8080/api/v1/subscription";
// const url:string = 'https://your-confort-backend.onrender.com/api/v1/post'

export const createSubscriptionApi = async (data:any) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    const responseJson = await response.json();
    console.log('from api', responseJson)
    if(response.ok) return responseJson
  } catch (error) {
    console.log(error);
    return null
  }
};
