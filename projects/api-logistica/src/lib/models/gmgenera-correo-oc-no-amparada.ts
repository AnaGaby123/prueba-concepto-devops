/* tslint:disable */
import { PpPartidasIncidencia } from './pp-partidas-incidencia';
import { PpPedidoConfiguracion } from './pp-pedido-configuracion';
export interface GMGeneraCorreoOcNoAmparada {
  Comentarios?: string;
  CorreoDestinatario?: string;
  IdPPPedido?: string;
  IdUsuarioEnvia?: string;
  ListaPartidasIncidencias?: Array<PpPartidasIncidencia>;
  ppPedidoConfiguracion?: PpPedidoConfiguracion;
}
