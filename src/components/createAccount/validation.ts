const validatedMessage = {
    messageName:
      "Nombre inválido. Debe contener solo letras y tener una longitud máxima de 20 caracteres.",
    messageLastName:
      "Apellido inválido. Debe contener solo letras y tener una longitud máxima de 20 caracteres.",
    messageCity:
      "Ciudad inválido. Debe contener solo letras y tener una longitud máxima de 20 caracteres.",
    messagePostalCode:
      "Codigo postal inválido. Debe contener solo numeros y tener una longitud máxima de 5.",
    messagePhone: "Numero inválido. Debe contener 10 digitos",
    messageEmail: "Email inválido.",
  };
  
  export const validateName = (name: string): string | undefined => {
    if (!name.match(/^[A-Za-z ]{3,20}$/)) return validatedMessage.messageName;
    return undefined;
  };
  
  export const validateLastName = (lastName: string): string | undefined => {
    if (!lastName.match(/^[A-Za-zÀ-ÿ ]{3,20}$/))
      return validatedMessage.messageLastName;
  
    return undefined;
  };
  
  export const validatePostalCode = (postalCode: string): string | undefined => {
    if (!postalCode.match(/^\d{1,5}$/)) return validatedMessage.messagePostalCode;
    return undefined;
  };
  
  export const validateAge = (age: string): string | undefined => {
    const ageNew = parseInt(age, 10);
    if (isNaN(ageNew)) return "La edad debe ser un numero valido";
    if (ageNew < 13) return "Debes ser mayor a 13 años";
    if (ageNew > 80) return "Debes ser menor da 80 años";
    return undefined;
  };
  export const validatePhone = (email: string): string | undefined => {
    if (!email.match(/^\d{10}$/)) return validatedMessage.messagePhone;
    return undefined;
  };
  
  export const validateEmail = (email: string): string | undefined => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailPattern)) return validatedMessage.messageEmail;
  };
  export const validatePassword = (password: string): string | undefined => {
    if (password.length == 0) return "Tienes que escribir una contraseña";
    if (password.length < 5) return "Escribe una contraseña de mas de 5 digitos";
  };
  