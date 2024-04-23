/* tslint:disable */
import { CorreoEnviadoSolicitarFEA } from './correo-enviado-solicitar-fea';
import { PpPartidasIncidencia } from './pp-partidas-incidencia';
import { PpPedido } from './pp-pedido';
export interface GMCorreoPedidoFechaEstimadaDeAjuste {
  CorreoEnviadoSolicitarFEA?: CorreoEnviadoSolicitarFEA;
  ppPartidasIncidencia?: Array<PpPartidasIncidencia>;
  ppPedido?: PpPedido;
}
