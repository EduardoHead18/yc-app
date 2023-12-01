export const formsProps = [
    {   
        id:1,
        name:'name',
        visibleText: 'Nombre',
        keyboardType:'default',
        secureTextEntry:false,
        limit:20
    },
    {
        id:2,
        name:'lastName',
        visibleText: 'Apellidos',
        keyboardType:'default',
        secureTextEntry:false,
        limit:20
    },
    
    {
        id:7,
        name:'phone',
        visibleText: 'Telefono',
        keyboardType:'number-pad',
        secureTextEntry:false,
        limit:10
    },
    {
        id:8,
        name:'email',
        visibleText: 'Correo electrónico',
        keyboardType:'email-address',
        secureTextEntry:false,
        limit:80
    },
    {
        id:9,
        name:'password',
        visibleText: 'Contraseña',
        keyboardType:'default',
        secureTextEntry:true,
        limit:80
    }
]