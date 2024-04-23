/* tslint:disable */
import { VEmbPartidaAColectar } from './vemb-partida-acolectar';
import { Usuario } from './usuario';
import { VCliente } from './vcliente';
import { VContacto } from './vcontacto';
export interface AplicacionColectarDetalle {
  Pendientes?: Array<VEmbPartidaAColectar>;
  Usuario?: Usuario;
  vCliente?: VCliente;
  vContacto?: VContacto;
}
