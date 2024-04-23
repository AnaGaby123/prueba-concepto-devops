/* tslint:disable */
import { AutorizacionUsuarios } from './autorizacion-usuarios';
import { CatTipoAutorizacion } from './cat-tipo-autorizacion';
export interface GMTipoAutorizacionUsuarioDetalle {
  TipoAutorizacionUsuario?: Array<AutorizacionUsuarios>;
  catTipoAutorizacion?: CatTipoAutorizacion;
}
