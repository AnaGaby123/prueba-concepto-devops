/* tslint:disable */
import { Contacto } from './contacto';
import { ContactoCliente } from './contacto-cliente';
import { CorreoElectronico } from './correo-electronico';
import { DatosPersona } from './datos-persona';
export interface GMContactoCliente {
  Contacto?: Contacto;
  ContactoCliente?: ContactoCliente;
  CorreoElectronico?: CorreoElectronico;
  DatosPersona?: DatosPersona;
}
