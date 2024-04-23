//DOCS: METODO QUE DA TRATAMIENTO A LA CADENA, EJEMPLO : Cotización Cotizador  -> CotizacionCotizador
export const buildImageNameSave = (nameImage: string): string => {
  return nameImage
    ?.trim() // DOCS: ELIMINAR ESPACIOS EN BLANCO AL INICIO Y FIN DE LA CADENA
    .normalize('NFD') // DOCS: APLICAR NORMALIZACIÓN CANONICA
    .split(' ') // DOCS: BUSCAR DENTRO DE LA CADENA ESPACIOS EN BLANCO
    .join('_') // DOCS: REEMPLAZAR LOS ESPACIOs EN BLANCO DENTRO DE LA CADENA POR GUIÓN BAJO
    .split('.') // DOCS: BUSCAR DENTRO DE LA CADENA PUNTOS
    .join('_') // DOCS: REEMPLAZAR LOS PUNTOS DENTRO DE LA CADENA POR GUIÓN BAJO (PARA EVITAR QUE SE CREE UNA EXTENSIÓN)
    .replace(/[\u0300-\u036f]/g, '') // DOCS: REEMPLAZAR LAS VOCALES CON ASENTO, A SIN ASENTO;
    .toLowerCase(); // DOCS: Guarda solo minúsculas
};

//DOCS: CONTRUCCIÓN INICIAL PARA LAS ACTIONS EN EL PROJECTO
export const buildingStringActionType = (type: string, description: string): string => {
  return `[${type}] ${description}`;
};
export const capitalize = (data: string): string => {
  return data.toLowerCase().replace(/\w/, (firstLetter) => firstLetter.toUpperCase());
};

export const generateUuid = (): string => {
  return 'xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (digit) {
    const random = (Math.random() * 16) | 0;
    const newValue = digit === 'x' ? random : (random & 0x3) | 0x8;
    return newValue.toString(16);
  });
};

export const validator = {
  decimalNumber: /^[0-9]+\.?[0-9]*$/,
  number: /^$|^[0-9]+$|null/,
  alpha: /^[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ]*$/,
  alphaAndSpaces: /^[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ \.]+( [a-zA-ZñÑáÁéÉíÍóÓúÚçÇ ]+)*$|^$/,
  alphaAndSpacesTwo: /^[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ \(\)\.\,\'\"\`\´\-\_]+( [a-zA-ZñÑáÁéÉíÍóÓúÚçÇ \(\)\.\,\'\"\`\´\-\_]+)*$/,
  alphaNumeric: /^[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ0-9\n\.\,\'\"\`\´\-]+( *[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ0-9\n\.\,\'\"\`\´\-])*$|^$/,
  password: /^[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ0-9]*$/,
  singleString: /^[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ0-9\.\,\-]*$/,
  email: /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$|^$/i,
  phone: /^\d{10}$/,
};

/*DOCS: FUNCIÓN PARA CONSTRUIR LA CADENA DE FAMILIA (TIPO PRODUCTO + SUBTIPO DE PRODUCTO + CONTROL)
        SE AGREGA UN PARAMETRO PARA AGREGAR EL SEPARADOR ENTRE CADA PALABRA
 */
export const buildStringFamily = (
  productType: string,
  productSubtype: string,
  control: string,
  separator: string,
): string => {
  let family: string = productType;

  if (productSubtype !== 'N/A') {
    family += separator + productSubtype;
  }

  if (control !== 'N/A') {
    family += separator + control;
  }

  return family;
};
