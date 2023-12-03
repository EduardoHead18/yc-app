//const url: string = "http://localhost:8080/api/v1/payment/checkout";
const url: string = "https://your-confort-backend.onrender.com/api/v1/payment/checkout";
export const checkoutApi = async (priceId: string) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ priceId }),
    });
    const responseJson = await response.json();
    if (response.ok) return responseJson;
  } catch (error) {
    console.log(error);
  }
};
