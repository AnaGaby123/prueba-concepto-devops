/* tslint:disable */
import { CorreoRecibidoCliente } from './correo-recibido-cliente';
import { GMListaArchivosComentariosOReferencia } from './gmlista-archivos-comentarios-oreferencia';
export interface ParametroGeneradorProcesoMailBot {
  AnalistaDeCuentasPorCobrar?: boolean;
  CoordinadorDeServicioAlCliente?: boolean;
  CorreoRecibidoCliente?: CorreoRecibidoCliente;
  ESAC?: boolean;
  EVE?: boolean;
  EVI?: boolean;
  IdCliente?: string;
  IdCorreoRecibido?: string;
  ListaArchivosComentariosOReferencias?: Array<GMListaArchivosComentariosOReferencia>;
  ListaCorreoRecibidoCliente?: Array<CorreoRecibidoCliente>;
}
