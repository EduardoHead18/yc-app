// const url: string = "http://localhost:8080/api/v1/validate_code";
const url:string = 'https://your-confort-backend.onrender.com/api/v1/validate_code'

export const validateCode = async (code: number) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ code }),
    });
    if(response.ok) return true
    return false
  } catch (error) {
    console.log(error);
    return false;
  }
};
