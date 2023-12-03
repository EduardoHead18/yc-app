const url:string = 'https://your-confort-backend.onrender.com/api/v1/user/'
export const deleteUserAccount = async(id:String) =>{
    console.log(id)
    try {
        const response = await fetch(`${url}${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        
        if(response.ok){
            const responseJson = await response.json()
            console.log('la respuesta: ', responseJson)
            return responseJson
        }
        console.log(response)
        
        
    } catch (error) {
        console.log(error)

    }
}