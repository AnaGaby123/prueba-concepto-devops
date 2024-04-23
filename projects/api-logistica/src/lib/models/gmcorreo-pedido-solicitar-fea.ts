/* tslint:disable */
import { PpPartidasIncidencia } from './pp-partidas-incidencia';
import { PpPedidoConfiguracion } from './pp-pedido-configuracion';
export interface GMCorreoPedidoSolicitarFEA {
  Contacto?: string;
  FEA?: string;
  IdPPPedido?: string;
  ListaPartidasIncidencias?: Array<PpPartidasIncidencia>;
  Observaciones?: string;
  ppPedidoConfiguracion?: PpPedidoConfiguracion;
}
