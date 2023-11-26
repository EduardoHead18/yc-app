const url: string = 'http://localhost:8080/api/v1/post/user/'

export const findpostByID = async (id:string) => {
    try {
        const response = await fetch(`${url}${id}`);
        
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        const responseJson = await response.json();
        return responseJson;
      } catch (error) {
        console.error('Error fetching API:', error);
        return null; // Puedes devolver null o cualquier otro valor que indique un error
      }
  };
  