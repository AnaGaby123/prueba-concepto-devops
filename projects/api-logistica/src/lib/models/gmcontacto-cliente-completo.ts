/* tslint:disable */
import { Contacto } from './contacto';
import { ContactoCliente } from './contacto-cliente';
import { CorreoElectronico } from './correo-electronico';
import { DatosPersona } from './datos-persona';
import { NumeroTelefonico } from './numero-telefonico';
export interface GMContactoClienteCompleto {
  Contacto?: Contacto;
  ContactoCliente?: ContactoCliente;
  CorreoElectronico?: CorreoElectronico;
  DatosPersona?: DatosPersona;
  EsPrincipal?: boolean;
  NumerosTelefonicos?: Array<NumeroTelefonico>;
}
