const url: string = 'http://localhost:8080/api/v1/post/'
export const deletePostApi =async(postId:string)=>{
    try {
        const response = await fetch(`${url}${postId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },

        });
    
        if (response.ok) {
          // La eliminación fue exitosa
          return { success: true };
        } else {
          // La eliminación falló
          const errorData = await response.json();
          return { success: false, error: errorData };
        }
      } catch (error) {
        // Error en la conexión o en la ejecución de la solicitud
        console.error('Error deleting post:', error);
        return { success: false, error: 'Internal Server Error' };
      }
}