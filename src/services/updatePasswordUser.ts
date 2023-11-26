// const url = "http://localhost:8080/api/v1/update_password";
const url:string = 'https://your-confort-backend.onrender.com/api/v1/update_password'

export const updatePasswordUser = async (data: object) => {
  console.log('mi data',data)
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if(response.ok) return true
  } catch (error) {
    console.log(error);
    return false;
  }
  return false
};
