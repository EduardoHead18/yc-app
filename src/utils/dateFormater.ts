export const dateFormater = (timestamp:any) => {
  
  const fecha = new Date(timestamp * 1000);

  // Opciones de formato
  const opciones: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  // Formatear la fecha
  const fechaFormateada = fecha.toLocaleDateString("es-MX", opciones);
  return fechaFormateada;
};
