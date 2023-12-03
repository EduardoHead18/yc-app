// const url: string = 'http://localhost:8080/api/v1/user/'
const url: string = "https://your-confort-backend.onrender.com/api/v1/user/";


export const findOneUser = async (id:string) => {
    console.log('el id: ' + id)
    try {
        const response = await fetch(`${url}${id}`);
        const responseJson = await response.json();
        if (response.ok) return responseJson;
      } catch (error) {
        console.error('Error fetching API:', error);
        return null; // Puedes devolver null o cualquier otro valor que indique un error
      }
  };
  