const url = "http://localhost:8080/api/v1/user/";

// const url:string = 'https://your-confort-backend.onrender.com/api/v1/user'
export const updateAccountApi = async (data: object, id:string) => {
console.log(id)
  try {
    const response = await fetch(`${url}${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    if (response.status === 200) return responseJson;

  } catch (error: any) {
    console.error("by server", error);
  }
};
