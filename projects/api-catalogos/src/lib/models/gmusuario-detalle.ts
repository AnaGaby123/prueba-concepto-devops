/* tslint:disable */
import { CorreoElectronico } from './correo-electronico';
import { DatosPersona } from './datos-persona';
import { Usuario } from './usuario';
export interface GMUsuarioDetalle {
  CorreoElectronico?: CorreoElectronico;
  DatosPersona?: DatosPersona;
  Password?: string;
  Rol?: Array<string>;
  Usuario?: Usuario;
}
