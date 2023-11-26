//const url: string = 'http://localhost:8080/api/v1/recover_password'
const url:string = 'https://your-confort-backend.onrender.com/api/v1/recover_password'

export const recoverPassword = async(email:string) : Promise<Boolean | undefined> =>{

    console.log('email from service:', email)
    try {
        const response = await fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email})
        })
        const responseJson = await response.json()
        console.log('response api json:', responseJson)
        if(responseJson.message === 'user found') return true
        
    } catch (error) {
        console.log(error)
        return false
    }
}