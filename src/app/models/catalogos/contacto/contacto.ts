import {ContactoDetalleObj, CorreoElectronico, VNumeroTelefonico} from 'api-catalogos';

export class Contacto {
  IdDatosPersona: string;
  Rol = '';
  IdContacto: string;
  Prioridad = 0;
  FechaRegistro: string;
  FechaUltimaActualizacion: string;
  Activo = true;
  FechaCaducidadRegistro: string;
}

export interface IContact extends ContactoDetalleObj {
  IdContactoCliente: string;
  Email: CorreoElectronico;
  Phone1: VNumeroTelefonico;
  Phone2: VNumeroTelefonico;
  Mobile: VNumeroTelefonico;
}

export interface IContactWithId extends ContactoDetalleObj {
  IdContactoCliente: string;
}
