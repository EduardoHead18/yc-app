// const url: string = 'http://localhost:8080/api/v1/post/user/'
const url: string = "https://your-confort-backend.onrender.com/api/v1/post/user/";


export const findAllPostUser = async (id:string) => {
    try {
        const response = await fetch(`${url}${id}`);
        
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
    
        const responseJson = await response.json();
        console.log('ok', responseJson)
        return responseJson;
      } catch (error) {
        console.log('Error fetching API:', error);
        return null; // Puedes devolver null o cualquier otro valor que indique un error
      }
  };
  