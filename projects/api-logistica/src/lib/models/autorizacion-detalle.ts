/* tslint:disable */
import { Autorizacion } from './autorizacion';
import { AutorizacionOperacion } from './autorizacion-operacion';
import { AutorizacionCodigoUsuario } from './autorizacion-codigo-usuario';
export interface AutorizacionDetalle {
  Autorizacion?: Autorizacion;
  Autorizacionoperacion?: AutorizacionOperacion;
  ListaAutorizacionCodigoUsuario?: Array<AutorizacionCodigoUsuario>;
}
