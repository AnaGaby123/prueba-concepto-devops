/* Funciones utilitarias */

import {
  find,
  findIndex,
  forEach,
  intersection,
  isEmpty,
  isString,
  map as _map,
  sumBy,
} from 'lodash-es';
import {DropListOption, DropListOptionCustom} from '@appModels/drop-list/drop-list-option';
import {
  CatTipoNumeroTelefonico,
  ContactoDetalleObj,
  CorreoElectronico,
  FilterTuple,
  QueryInfo,
  QueryResultContactoDetalleObj,
  VNumeroTelefonico,
} from 'api-catalogos';
import {IContact, IContactWithId} from '@appModels/catalogos/contacto/contacto';
import {
  CURRENCY_MXN,
  CURRENCY_USD,
  DEFAULT_UUID,
  FREIGHT_PROPERTY,
  MOBILE,
  PHONE_1,
  PHONE_2,
} from '@appUtil/common.protocols';
import {IMenuOption} from '@appModels/store/utils/utils.model';
import {DropListOptionPqf} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';
import {UserInfo} from '@appModels/auth/user-info.model';
import {
  GMCotFleteExpress,
  GMCotFleteUltimaMilla,
  PpPedidoFleteExpressObj,
  PpPedidoFleteUltimaMilla,
  VDireccion,
} from 'api-logistica';
import {
  IPurchasePromiseClient,
  IPurchasePromiseOrder,
} from '@appModels/store/pendings/purchase-promise/purchase-promise-details/purchase-promise-details.models';
import {IClientContact} from '@appModels/shared/shared.models';

export const extractID = (value) => {
  if (isString(value)) {
    return value.replace(/['"]+/g, '');
  } else {
    return value;
  }
};
export const extractIDs = (values: Array<any>) =>
  _map(values, (value) => {
    if (isString(value)) {
      return value.replace(/['"]+/g, '');
    } else {
      return value;
    }
  });

export const getRandomNumber = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getArrayForDropList = (
  arrayData: Array<any>,
  namePropertyId: string,
  namePropertyName: string,
): Array<DropListOptionCustom> => {
  return arrayData.map((item) => {
    return {
      id: item[namePropertyId],
      nombre: item[namePropertyName],
    } as DropListOptionCustom;
  });
};
export const getArrayForDropDownList = (
  arrayData: Array<any>,
  namePropertyId: string | number,
  namePropertyName: string,
  secondNamePropertyId?: string | number,
  secondNamePropertyName?: string,
  subtitle?: string,
  labelKey?: string,
): Array<DropListOption> => {
  return arrayData.map((item) => {
    return {
      value: secondNamePropertyId
        ? `${item[namePropertyId]}|${item[secondNamePropertyId]}`
        : item[namePropertyId],
      label: secondNamePropertyName
        ? `${item[namePropertyName]} · ${item[secondNamePropertyName]}`
        : item[namePropertyName],
      subtitle: item[subtitle],
      isSelected: item.isSelected,
      labelKey: item[labelKey],
    } as DropListOption;
  });
};

export const getArrayForDropListOptionsPqf = (
  arrayData: Array<any>,
  namePropertyId: string,
  namePropertyName: string,
  secondNamePropertyId?: string | number,
  secondNamePropertyName?: string,
  labelKey?: string,
): Array<DropListOptionPqf> => {
  return arrayData.map((item) => {
    return {
      id: secondNamePropertyId
        ? `${item[namePropertyId]}|${item[secondNamePropertyId]}`
        : item[namePropertyId],
      label: secondNamePropertyName
        ? `${item[namePropertyName]} · ${item[secondNamePropertyName]}`
        : item[namePropertyName],
      labelKey: item[labelKey],
    } as DropListOptionPqf;
  });
};

export const buildingStringActionType = (type: string, description: string): string => {
  return `[${type}] ${description}`;
};

export const patchBody = (
  desiredPage = null,
  pageSize = null,
  filter = null,
  term = null,
  sortField = null,
  filters: FilterTuple[] = [],
  SortDirection = 'asc',
): QueryInfo => {
  const body = {} as QueryInfo;
  body.desiredPage = desiredPage;
  body.pageSize = pageSize;
  body.SortField = sortField;
  body.SortDirection = SortDirection;
  const filterArray: FilterTuple[] = [];
  if (filter) {
    filterArray.push({
      NombreFiltro: 'Activo',
      ValorFiltro: filter,
    });
  }
  if (term && term !== '') {
    filterArray.push({
      NombreFiltro: 'Nombre',
      ValorFiltro: term,
    });
  }
  filters.forEach((item: FilterTuple) => {
    filterArray.push({
      NombreFiltro: item.NombreFiltro,
      ValorFiltro: item.ValorFiltro,
    });
  });
  body.Filters = filterArray;
  return body;
};

export const patchDropListOption = (list, fieldId, fieldName, key?) => {
  const listOption: DropListOptionCustom[] = [];
  list.forEach((option, indice) => {
    listOption.push({
      id: option[`${fieldId}`],
      nombre: option[`${fieldName}`],
      key: key ? option[`${key}`] : indice + 1,
    });
  });
  return listOption;
};
export const patchDropListDownOption = (list, fieldId, fieldName, key?) => {
  const listOption: DropListOption[] = [];
  list.forEach((option, indice) => {
    listOption.push({
      value: option[`${fieldId}`],
      label: option[`${fieldName}`],
    });
  });
  return listOption;
};

export const addRowIndex = (desiredPage: number, pageSize: number, list: any[]) => {
  const lista: any[] = [];
  const initial = (desiredPage - 1) * pageSize;
  if (list) {
    forEach(list, (item, Index) => {
      Index = Index + 1 + initial;
      lista.push({...item, Index});
    });
  }
  return lista;
};

export const isValueInfinityOrNaN = (value: any): boolean => {
  return !Number.isFinite(parseFloat(value));
};

export const toRound = (value: number, precision: number): number => {
  const multiplier = Math.pow(10, precision + 1);
  const wholeNumber = Math.floor(value * multiplier);
  return (Math.round(wholeNumber / 10) * 10) / multiplier;
};

// DOCS: REDONDEAR HACIA ABAJO
export const toRoundDown = (value: number, decimals: number) => {
  const factor = 10 ** decimals;
  return Math.floor(value * factor) / factor;
};

export const calculateAmount = (value: number, percentage: number): number => {
  return toRound(value - (percentage / 100) * value, 0);
};
export const calculateAmountWithoutRound = (value: number, percentage: number): number => {
  return value - (percentage / 100) * value;
};
export const calculatePercentage = (total: number, value: number): number => {
  return toRound(100 - (100 * value) / total, 2);
};
export const calculatePercentageWithoutRound = (total: number, value: number): number => {
  return 100 - (100 * value) / total;
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

// TODO: Valida si el número proporcionado cumple con las restricciones de mínimo y máximo de decimales propuestos.
// TODO: Return true | false
export const validateMinAndMaxDecimalsNumber = ({value, min = 0, max = 0}) => {
  const lengthValidator =
    (min > 0 && max > 0) || max > 0 ? `{${min},${max}}` : min > 0 ? `{${min},}` : '*';
  const regex = new RegExp(`^[0-9]+\\.{1,1}[0-9]${lengthValidator}$`);
  return regex.test(value);
};
export const patchContacts = (
  contacts: QueryResultContactoDetalleObj,
  typePhones: Array<CatTipoNumeroTelefonico>,
  idContactClient: string,
): Array<IContact> => {
  let data: Array<IContact> = [];
  let results: Array<IContactWithId> = [];
  if (contacts.Results.length > 0) {
    results = _map(contacts.Results, (o) => ({
      ...o,
      IdContactoCliente: idContactClient,
    }));

    const getEmail = (emails: Array<CorreoElectronico>): CorreoElectronico => {
      if (emails.length > 0) {
        return emails[0];
      }
      return {} as CorreoElectronico;
    };
    const getPhone = (phones: Array<VNumeroTelefonico>, idTypePhone: string): VNumeroTelefonico => {
      const index = findIndex(
        phones,
        (o: VNumeroTelefonico) => o.IdCatTipoNumeroTelefonico === idTypePhone,
      );
      if (index !== -1) {
        return phones[index];
      }
      return {} as VNumeroTelefonico;
    };
    data = _map(
      results,
      (contact: IContactWithId): IContact => {
        return {
          Activo: contact.Activo,
          AgregadoExpo: contact.AgregadoExpo,
          ApellidoMaterno: contact.ApellidoMaterno,
          ApellidoPaterno: contact.ApellidoPaterno,
          Departamento: contact.Departamento,
          Dificultad: contact.Dificultad,
          FechaRegistro: contact.FechaRegistro,
          FechaUltimaActualizacion: contact.FechaUltimaActualizacion,
          IdCatDificultad: contact.IdCatDificultad,
          IdCatMantenimiento: contact.IdCatMantenimiento,
          IdCatNivelDecision: contact.IdCatNivelDecision,
          IdCatNivelPuesto: contact.IdCatNivelPuesto,
          IdContacto: contact.IdContacto,
          IdDatosPersona: contact.IdDatosPersona,
          Mantenimiento: contact.Mantenimiento,
          NivelDecision: contact.NivelDecision,
          NivelPuesto: contact.NivelPuesto,
          Nombres: contact.Nombres,
          OrigenRegistro: contact.OrigenRegistro,
          Prioridad: contact.Prioridad,
          PrioridadContacto: contact.PrioridadContacto,
          Puesto: contact.Puesto,
          Titulo: contact.Titulo,
          IdContactoCliente: contact.IdContactoCliente,
          Email: getEmail(contact.CorreoElectronico),
          Phone1: getPhone(
            contact?.NumeroTelefonico,
            find(typePhones, (o: CatTipoNumeroTelefonico) => o?.TipoNumeroTelefonico === PHONE_1)
              ?.IdCatTipoNumeroTelefonico,
          ),
          Phone2: getPhone(
            contact?.NumeroTelefonico,
            find(typePhones, (o: CatTipoNumeroTelefonico) => o?.TipoNumeroTelefonico === PHONE_2)
              ?.IdCatTipoNumeroTelefonico,
          ),
          Mobile: getPhone(
            contact?.NumeroTelefonico,
            find(typePhones, (o: CatTipoNumeroTelefonico) => o?.TipoNumeroTelefonico === MOBILE)
              ?.IdCatTipoNumeroTelefonico,
          ),
        };
      },
    );
  }
  return data;
};
export const generateUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (digit) => {
    const random = Math.random() * 16 || 0;
    const newValue = digit === 'x' ? random : (random && 0x3) || 0x8;
    return newValue.toString(16);
  });
};

export const capitalize = (data: string) => {
  return data.toLowerCase().replace(/\w/, (firstLetter) => firstLetter.toUpperCase());
};

// DOCS: Función recursiva para obtener el objeto del menu que le corresponde a la url dada
export const menuObject = (options: Array<IMenuOption>, url: string): IMenuOption => {
  let foundMenuObject = null;
  forEach(options, (option: IMenuOption) => {
    if (option.url === url) {
      foundMenuObject = option;
      return option;
    } else if (option.containOptions && !foundMenuObject) {
      foundMenuObject = menuObject(option.options, url);
    }
  });
  return foundMenuObject;
};

// DOCS: Función que recibe un porcentaje (20.1)% y lo convierte a su equivalente en numero decimal (0.201)
export const percentageToNumber = (value: number): number => {
  if (typeof value !== 'number') {
    return null;
  }

  // Convertir a string y agregarle dos ceros a la izquierda
  let stringValue = value.toString();
  let numberOfPoints = 0;

  for (const s of stringValue) {
    if (s === '.') {
      numberOfPoints++;
    }
  }

  if (numberOfPoints > 1) {
    return null;
  }

  stringValue = `00${stringValue}`;

  // Si tiene punto se recorre dos posiciones a la izquierda si no se le agrega el punto decimal antes de los dos últimos dígitos
  if (numberOfPoints === 1) {
    const splits = stringValue.split('.');
    const original = splits[0].slice(0, -2);
    const extracted = splits[0].slice(-2);
    stringValue = `${original}.${extracted}${splits[1]}`;
  } else {
    const original = stringValue.slice(0, -2);
    const extracted = stringValue.slice(-2);
    stringValue = `${original}.${extracted}`;
  }
  return Number(stringValue);
};

// DOCS: Función que recibe un número (0.23) y lo convierte a su representación en porcentaje (23)% sin el simbolo
export const numberToPercentage = (value: number): number => {
  if (typeof value !== 'number') {
    return null;
  }
  // Convertir a string y agregarle dos ceros a la derecha
  let stringValue = value.toString();
  let numberOfPoints = 0;

  for (const s of stringValue) {
    if (s === '.') {
      numberOfPoints++;
    }
  }
  if (numberOfPoints > 1) {
    return null;
  }
  if (numberOfPoints === 1) {
    stringValue = `${stringValue}00`;
  } else {
    stringValue = `${stringValue}.000`;
  }
  const splits = stringValue.split('.');
  const original = splits[1].slice(0, 2); // Obtenemos los dos primeros digitos despues del puntodecimal
  const extracted = splits[1].slice(2); // Obtenemos los demás digitos despues de los dos primeros digitos despues de punto decimal
  stringValue = `${splits[0]}${original}.${extracted ? extracted : 0}`;
  return Number(stringValue);
};

// DOCS: Valida si las funciones y roles del usuario son permitidas para la ruta actual o tab.
export const allowedPath = (
  {Roles, Funciones}: UserInfo,
  options: IMenuOption[],
  route: string,
): boolean => {
  // DOCS: Obtenemos el objeto del menu que le corresponde al segmento de la ruta
  const selectedSegmentMenuObject = menuObject(options, route);

  const roles = intersection(selectedSegmentMenuObject?.allowedRoles, Roles);
  const functions = intersection(selectedSegmentMenuObject?.allowedFunctions, Funciones);
  return !isEmpty(roles) && !isEmpty(functions);
};

// DOCS Recibe un arreglo de string y devuleve un string sin las separaciones de los elementos
export const convertArrayToString = (collection: Array<string>): string =>
  collection.toString().replace(/,/g, '');

// DOCS: Redondea los decimales de un número
export const roundNumber = (number: number): number => {
  return Math.round(number * 100) / 100;
};

// DOCS: OBTENER EL PROCENTAJE SOBRE PRECIO DE LISTA
export const getPercentageAboutPriceList = (
  keyCurrency: string, // DOCS: catMoneda.ClaveMoneda
  unitPrice: number, // DOCS: ppPartidaPedido.PrecioUnitario
  TypeChangeUSD: number, // DOCS: ppPedido.TipoCambioUSO
  priceListUSD: number, // DOCS: cotProductoOfera.PrecioListaUSD
): number => {
  let percentageList: number;
  if (keyCurrency === CURRENCY_MXN) {
    percentageList = ((unitPrice / (TypeChangeUSD ?? 1) - priceListUSD) * 100) / priceListUSD;
  }

  if (keyCurrency === CURRENCY_USD) {
    percentageList = ((unitPrice - priceListUSD) * 100) / priceListUSD;
  }

  return percentageList;
};

/* DOCS: Indica si el string no esta compuesto solo por espacios en blanco
 *   Ayuda a validar que campos no obligatorios no se guarden solo con espacios en blanco*/
export const validateFieldIsNotContainOnlySpacesAndLength = (value: string, length = 3) =>
  (value && value.length > 0 && value.trim().length >= length) || !value;

/*
 * DOCS: Indica si el string no está vacío y tiene una longitud mayor o igual a 3
 */
export const validateFieldsRequiredString = (value: string, length = 3) =>
  value !== null &&
  value !== undefined &&
  value !== 'null' &&
  value !== 'undefined' &&
  value !== 'NULL' &&
  value !== 'UNDEFINED' &&
  value !== 'Null' &&
  value !== 'Undefined' &&
  value?.toString()?.trim()?.length >= length &&
  true;
export const isValidId = (value: string) => value !== DEFAULT_UUID;

export const validateFieldsRequiredNumber = (value: number, minValue = 0) =>
  value !== null && value !== undefined && value > minValue && !isNaN(value);

/**
 * Indica si el número recibido es válido y es mayor o igual al valor mínimo
 * @param value Número a validar
 * @param minValue Valor mínimo que debe tener el número (puede ser 0)
 * @returns true si el número es válido y es mayor o igual al valor mínimo, false en caso contrario
 */
export const isValidNumberWithMinValue = (value: number, minValue = 0) =>
  value !== null && value !== undefined && value >= minValue && !isNaN(value);

/**
 * Obtener el total de los fletes express y ultima milla del ser servicio GMCotFletes
 * en los módulos de "Atender Cierre" hasta "Atender Promesa de Compra"
 * @param lastMileFreight arreglo de fletes ultima milla
 * @param expressFreight objeto de flete express
 * @param options opciones para obtener el subtotal o el iva
 * */
export const getTotalFreights = (
  lastMileFreight: GMCotFleteUltimaMilla[],
  expressFreight: GMCotFleteExpress,
  options?: {
    subtotal?: boolean;
    iva?: boolean;
  },
): number => {
  const subtotalLastMilleFreight = sumBy(lastMileFreight, FREIGHT_PROPERTY.subtotalLastMille); //DOCS: Obtener el Subtotal de los fletes última milla
  const ivaLastMilleFreight = sumBy(lastMileFreight, FREIGHT_PROPERTY.ivaLastMille); //DOCS: Obtener el IVA de los fletes última milla

  const totalLastMileFreight = sumBy(lastMileFreight, FREIGHT_PROPERTY.totalLastMile); //DOCS: Obtener el Total de los fletes última milla
  let sumSubtotalFreight;

  //DOCS: Si el flete tiene un ajuste, se sumará el PrecioAjustado
  if (
    expressFreight?.PorcentajeProquifa !== null &&
    expressFreight?.PrecioAjustado !== null &&
    expressFreight?.PorcentajeProquifa > 0 &&
    expressFreight?.PrecioAjustado > 0
  ) {
    sumSubtotalFreight = subtotalLastMilleFreight + (expressFreight?.PrecioAjustado || 0); // DOCS: Propiedad del flete express cuando tiene un ajuste de flete
  } else {
    sumSubtotalFreight = subtotalLastMilleFreight + (expressFreight?.Precio || 0); // DOCS: Propiedad que es el subtotal del flete express sin ajuste de flete
  }

  const sumIvaFreights = ivaLastMilleFreight + (expressFreight?.PrecioIVA || 0); // DOCS: Sumar el total del iva de los fletes ultima milla y el iva del flete express
  const sumTotalFreights = totalLastMileFreight + (expressFreight?.PrecioTotal || 0); //DOCS: Sumar el total con iva de los fletes última milla y el total del flete express
  if (options?.iva) {
    return sumIvaFreights;
  }
  return options?.subtotal ? sumSubtotalFreight : sumTotalFreights;
};

/**
 * Obtener el total de los fletes express y última milla de los servicios VPpPedidoObj
 * en los módulos de "Pretramitar", "Gestionar Pedido Intramitable" y "Validar Ajuste a la OC"
 * @param lastMileFreight arreglo de fletes última milla
 * @param expressFreight arreglo  de fletes express
 * @param options opciones para obtener el subtotal o el iva
 * */
export const getTotalFreightsInOc = (
  lastMileFreight: PpPedidoFleteUltimaMilla[],
  expressFreight: PpPedidoFleteExpressObj[],
  options?: {
    subtotal?: boolean;
    iva?: boolean;
  },
): number => {
  const subtotalLastMileFreight = sumBy(lastMileFreight, FREIGHT_PROPERTY.subtotalLastMille); //DOCS: Obtener el Subtotal de los fletes última milla
  const ivaLastMilleFreight = sumBy(lastMileFreight, FREIGHT_PROPERTY.ivaLastMille); //DOCS: Obtener el IVA de los fletes última milla
  const totalLastMilleFreight = sumBy(lastMileFreight, FREIGHT_PROPERTY.totalLastMile); //DOCS: Obtener el Total de los fletes última milla

  const subtotalFreightExpress = sumBy(expressFreight, FREIGHT_PROPERTY.subtotalExpress); //DOCS: Obtener el Subtotal de los fletes express
  const ivaFreightExpress = sumBy(expressFreight, FREIGHT_PROPERTY.ivaExpress); //DOCS: Obtener el IVA de los fletes express
  const totalFreightExpress = sumBy(expressFreight, FREIGHT_PROPERTY.totalExpress); //DOCS: Obtener el Total de los fletes express

  const sumSubtotalFreight = subtotalLastMileFreight + subtotalFreightExpress; //DOCS: Suma de los subtotales de los fletes express y última milla
  const sumIvaFreights = ivaLastMilleFreight + ivaFreightExpress; //DOCS: Suma de los IVA de los fletes express y última milla
  const sumTotalFreights = totalLastMilleFreight + totalFreightExpress; //DOCS: Suma de los Totales de los fletes express y última milla

  if (options?.iva) {
    return sumIvaFreights;
  }
  return options?.subtotal ? sumSubtotalFreight : sumTotalFreights;
};
export const isImage = (ext: string): boolean => {
  const listExtension = ['jpg', 'jpeg', 'png', 'svg'];
  return listExtension.includes(ext);
};

export const isPdf = (ext: string): boolean => {
  const listExtension = ['pdf', 'tml'];
  return listExtension.includes(ext);
};

export const getNameFile = (fileKey: string): string => {
  const arrayNameFile = fileKey.split('/');
  return arrayNameFile[arrayNameFile.length - 1];
};
export const replaceND = (value: string) => {
  return value === 'N/D' ? '' : value;
};

// DOCS: Crear un formato de dirección (calle, numero exterior, número interior, cp, colonia, ciudad, municipio, estado
export const buildAddressFormat = (address: VDireccion): string => {
  if (!address) {
    return 'N/D';
  }
  return `${address?.Calle} ${
    address?.NumeroExterior !== null ? `#${address?.NumeroExterior}, ` : ''
  } ${address.NumeroInterior !== null ? `${address?.NumeroInterior}, ` : ''} C.P. ${
    address?.CodigoPostal
  }, ${address?.Colonia !== null ? `${address.Colonia}, ` : ''} ${
    address?.Ciudad !== null ? `${address.Ciudad}, ` : ''
  } ${address?.Municipio !== address?.Ciudad ? `${address?.Municipio}, ` : ''} ${address?.Estado}.`;
};

// DOCS: Transforma un objeto tipo IPurchasePromiseClient a IClientContact
export const buildClientContact = (
  client: IPurchasePromiseClient,
  contact: ContactoDetalleObj,
  order: IPurchasePromiseOrder,
): IClientContact => {
  return {
    hasCredit: order?.ConCredito,
    clientName: client?.Nombre,
    decisionLevel: contact?.NivelDecision,
    category: client?.category,
    image: client?.imageHover,
    contactName: `${contact?.Nombres} ${contact?.ApellidoPaterno} ${contact?.ApellidoMaterno}`,
    assignedEsacName: contact?.vCliente?.ESAC,
    department: contact?.Departamento,
    mail: contact?.CorreoElectronico?.[0]?.Correo,
    position: contact?.Puesto,
    telephoneNumber: contact?.NumeroTelefonico?.[0].Numero,
    telephoneNumberExtension: contact?.NumeroTelefonico?.[0]?.Extension,
  };
};

// DOCS: CONVIERTE UN COLOR DE RGB A HEXADECIMAL
export const convertRgbToHex = (color: string): string => {
  return color.replace(
    /rgb\((\d+), (\d+), (\d+)\)/,
    (_, r, g, b) =>
      '#' +
      Number(r).toString(16).padStart(2, '0') +
      Number(g).toString(16).padStart(2, '0') +
      Number(b).toString(16).padStart(2, '0'),
  );
};

/**
 * Create image name in webp format
 * @param {string} name Image name
 * @param {string} isHover Set the image to hover
 * @param {string} directory Image directory
 * @returns The image name with a webp extension and its directory
 */
export const buildWebpImg = (name: string, isHover: boolean, directory?: string): string => {
  return `assets/Images${directory ? `/${directory}` : ''}/${name}${isHover ? '_hover' : ''}.webp`;
};
