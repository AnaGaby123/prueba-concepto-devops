import {
  CatTipoNumeroTelefonico,
  ContactoDetalleObj,
  CorreoElectronico,
  VNumeroTelefonico,
} from 'api-catalogos';
import {IContact, IContactWithId} from '@appModels/catalogos/contacto/contacto';
import {MOBILE, PHONE_1, PHONE_2} from '@appUtil/common.protocols';
import {IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {find, findIndex, map} from 'lodash-es';
import {currentDateWithoutHoursUTCFormatDate} from '@appUtil/dates';

export enum InputValidators {
  Alpha = 'alpha',
  AlphaAndSpaces = 'alphaAndSpaces',
  AlphaAndSpacesAndNumbers = 'alphaAndSpacesAndNumbers',
  AlphaAndSpacesTwo = 'alphaAndSpacesTwo',
  Alphanumeric = 'alphanumeric',
  RFC = 'rfc',
  DecimalNumber = 'decimalNumber',
  Email = 'email',
  Int = 'int',
  Number = 'number',
  NumberAndDashes = 'numberAndDashes',
  NumberAndDots = 'numberAndDots',
  Password = 'password',
  Percentage = 'percentage',
  Phone = 'phone',
  Phonev2 = 'phoneV2',
  Phonev2UniqueValue = 'phoneV2UV',
  SingleString = 'singleString',
  AcceptAll = 'acceptAll',
  CASNumber = 'CASNumber',
  AlphaNumberAndDashes = 'alphaNumericNumberAndDashes',
  AlphaNumberAndDashesAndSlashAndComa = 'alphaNumericNumberAndDashesAndSlashAndComa',
  AlphaNumberAndDashesAndSlashAndColon = 'alphaNumberAndDashesAndSlashAndColon',
}

export enum ApiRequestStatus {
  Default = -1,
  Loading = 1,
  Error = 2,
  Success = 3,
}

export enum Browsers {
  Chrome = 'Chrome',
  FireFox = 'Firefox',
  Safari = 'Safari',
  Opera = 'OPR',
  Other = 'Other',
}

export const browserRegexFinder = /firefox|opr|chrome(?!.*opr)|safari(?!.*opr)/i;

export const RegexValidators = {
  [InputValidators.AcceptAll]: /^.*$/,
  // DOCS: Se cambió el validator, monitorear si causa problemas inesperados
  // Anterior [InputValidators.AlphaAndSpacesAndNumbers]: /^[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ0-9 \.\/\(\)]+( [a-zA-ZñÑáÁéÉíÍóÓúÚçÇ0-9 \.\/\(\)]+)*$|^$/,
  [InputValidators.AlphaAndSpacesAndNumbers]: /^[a-zA-ZñÑáÁéÉíÍóÓúÚ0-9\(\)\.\,\'\"\-\_\*\/]+[a-zA-ZñÑáÁéÉíÍóÓúÚ0-9 \(\)\.\,\'\"\-\_\*\/]*/,
  [InputValidators.AlphaAndSpacesTwo]: /^[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ\(\)\.\,\'\"\`\´\-\_]+[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ \(\)\.\,\'\"\`\´\-\_]*/,
  [InputValidators.AlphaAndSpaces]: /^[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ\.\/\(\)]+[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ \/\(\)]*/,
  [InputValidators.Alpha]: /^[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ]*$/,
  [InputValidators.Alphanumeric]: /^[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ0-9\n\.\,\'\"\`\´\-\/]+( *[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ0-9\n\.\,\'\"\`\´\-\/])*$|^$/,
  [InputValidators.DecimalNumber]: /^(?!\.)[0-9]+\.?[0-9]*$/,
  [InputValidators.Email]: /^[\w\.!#$%&'*+\/=?^_`{|}~-]+@([\w!#$%&'*+\/=?^_`{|}~-]+\.)+[\w-]{2,4}$/,
  [InputValidators.Int]: /\b(\d{1,9}|1\d{9}|2(0\d{8}|1([0-3]\d{7}|4([0-6]\d{6}|7([0-3]\d{5}|4([0-7]\d{4}|8([0-2]\d{3}|3([0-5]\d{2}|6([0-3]\d|4[0-7])))))))))\b/,
  [InputValidators.NumberAndDashes]: /^[\d\-]+$/,
  [InputValidators.NumberAndDots]: /^[\d.]+$/,
  [InputValidators.Number]: /^$|^[0-9]+$|null/,
  [InputValidators.Password]: /^[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ0-9]*$/,
  [InputValidators.Percentage]: /^[0-9]+\.?[0-9]*$/,
  [InputValidators.Phone]: /^[0-9]{10}$|null/,
  [InputValidators.Phonev2UniqueValue]: /[0-9]|(\+)|[\ ]/,
  [InputValidators.Phonev2]: /^([0-9]|\+)?[0-9\ ]*([0-9]+)*$|^$/,
  [InputValidators.SingleString]: /^[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ0-9\.\,\-]*$/,
  [InputValidators.CASNumber]: /^(\d+(-\d+)*|n\/d|N\/D)$/,
  [InputValidators.AlphaNumberAndDashes]: /^[a-z-A-Z\-\d]*/,
  [InputValidators.AlphaNumberAndDashesAndSlashAndComa]: /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]+(?:[,\/-](?![,\/-]$)[a-zA-Z0-9]+)*$/,
  [InputValidators.AlphaNumberAndDashesAndSlashAndColon]: /^[a-zA-Z\d\/:\s\.-]*$/,
  [InputValidators.RFC]: /^[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ&0-9\n\.\,\'\"\`\´\-\/]+( *[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ&0-9\n\.\,\'\"\`\´\-\/])*$|^$/,
};

export const RegexValidatorsByDigits = {
  [InputValidators.AcceptAll]: /^.$/,
  // DOCS: Se cambió el validator, monitorear si causa problemas inesperados
  // Anterior [InputValidators.AlphaAndSpacesAndNumbers]: /[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ0-9 \.\/\(\)]/,
  [InputValidators.AlphaAndSpacesAndNumbers]: /[a-zA-ZñÑáÁéÉíÍóÓúÚ0-9 \(\)\.\,\'\"\-\_\*\/]/,
  [InputValidators.AlphaAndSpacesTwo]: /[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ \(\)\.\,\'\"\`\´\-\_]/,
  [InputValidators.AlphaAndSpaces]: /[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ \.\/\(\)]/,
  [InputValidators.Alpha]: /[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ]/,
  [InputValidators.Alphanumeric]: /[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ0-9\n\.\,\'\"\`\´\-\/]/,
  [InputValidators.DecimalNumber]: /[0-9\.]/,
  [InputValidators.Email]: /[\w\.!#$%&'*+\/=@?^_`{|}~-]/,
  [InputValidators.Int]: /[0-9]/,
  [InputValidators.NumberAndDashes]: /[\d\-]/,
  [InputValidators.NumberAndDots]: /[0-9\.]/,
  [InputValidators.Number]: /[0-9]/,
  [InputValidators.Password]: /[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ0-9]/,
  [InputValidators.Percentage]: /[0-9\.]/,
  [InputValidators.Phone]: /[0-9\+]/,
  [InputValidators.Phonev2UniqueValue]: /[0-9\+]/,
  [InputValidators.Phonev2]: /[0-9\+]/,
  [InputValidators.SingleString]: /[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ0-9\.\,\-]/,
  [InputValidators.CASNumber]: /[\d\-NDnd/]/,
  [InputValidators.AlphaNumberAndDashes]: /[a-zA-Z\d\-]/,
  [InputValidators.AlphaNumberAndDashesAndSlashAndComa]: /^[a-zA-Z\d,\/-]*$/,
  [InputValidators.AlphaNumberAndDashesAndSlashAndColon]: /^[a-zA-Z\d\/:\s\.-]*$/,
  [InputValidators.RFC]: /[a-zA-ZñÑáÁéÉíÍóÓúÚçÇ&0-9\n\.\,\'\"\`\´\-\/]/,
};

export const regexValidatorForUrl = /^https?:\/\/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/;

export const maxLengthInput = 200;
export const maxLengthTextArea = 1000;

export const patchContactsClient = (
  contacts: Array<ContactoDetalleObj>,
  typePhones: Array<CatTipoNumeroTelefonico>,
): Array<IContact> => {
  const getEmail = (emails: Array<CorreoElectronico>): CorreoElectronico => {
    if (emails.length > 0) {
      return emails[0];
    }
    return {} as CorreoElectronico;
  };
  const getPhone = (phones: Array<VNumeroTelefonico>, idTypePhone: string): VNumeroTelefonico => {
    const index = findIndex(phones, (o) => o.IdCatTipoNumeroTelefonico === idTypePhone);
    if (index !== -1) {
      return phones[index];
    }
    return {} as VNumeroTelefonico;
  };
  return map(
    contacts,
    (contact: IContactWithId): IContact => {
      return {
        ...contact,
        Email: getEmail(contact.CorreoElectronico),
        Phone1: getPhone(
          contact.NumeroTelefonico,
          find(typePhones, (o: CatTipoNumeroTelefonico) => o.TipoNumeroTelefonico === PHONE_1)
            ?.IdCatTipoNumeroTelefonico,
        ),
        Phone2: getPhone(
          contact.NumeroTelefonico,
          find(typePhones, (o: CatTipoNumeroTelefonico) => o.TipoNumeroTelefonico === PHONE_2)
            ?.IdCatTipoNumeroTelefonico,
        ),
        Mobile: getPhone(
          contact.NumeroTelefonico,
          find(typePhones, (o: CatTipoNumeroTelefonico) => o.TipoNumeroTelefonico === MOBILE)
            ?.IdCatTipoNumeroTelefonico,
        ),
      };
    },
  );
};
export const patchContactsMail = (list: Array<IContact>): Array<IDropListMulti> => {
  const array: IDropListMulti[] = [];
  map(list, (o) => {
    if (o.Email?.Correo) {
      array.push({
        value: o.IdContactoCliente,
        labels: [
          {label: `${o.Nombres} ${o.ApellidoPaterno} ${o.ApellidoMaterno}`},
          {
            label: `${o.Puesto}` + ' · ' + `${o.Departamento} `,
          },
          {label: `${o.Email.Correo}`, color: '#008693'},
        ],
        isSelected: false,
      });
    }
  });
  return array;
};
export const calculateFee = (tee: number): Date => {
  const currentDate = currentDateWithoutHoursUTCFormatDate();
  currentDate.setDate(currentDate.getDate() + tee + 5);
  return currentDate;
};
export enum RutaEntregaHelpers {
  guadalajara = 'guadalajara',
  sudamerica = 'sudamerica',
  local = 'local',
  foraneo = 'foraneo',
  centroamerica = 'centroamerica',
  restodelmundo = 'restodelmundo',
  ninguno = '',
}
export enum TipoDireccion {
  Recoleccion = 'recoleccion',
  Principal = 'principal',
  Visita = 'visita',
  Entrega_especial = 'entregaespecial',
  Cobro = 'cobro',
  Facturacion = 'facturacion',
  Entrega = 'entrega',
  Pago = 'pago',
  Revision = 'revision',
}

export const getIncomeLevelImage = (level: string): string => {
  level = level.toLowerCase();
  return level === 'aa+' ? 'aaplus' : level;
};
