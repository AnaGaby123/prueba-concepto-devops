/* tslint:disable */
import { PpPartidasIncidencia } from './pp-partidas-incidencia';
import { PpPedidoConfiguracion } from './pp-pedido-configuracion';
export interface GMGeneraCorreoIntramitables {
  CorreoDestinatario?: string;
  IdPPPedido?: string;
  IdUsuarioEnvia?: string;
  InstruccionesEntrega?: string;
  ListaPartidasIncidencias?: Array<PpPartidasIncidencia>;
  ppPedidoConfiguracion?: PpPedidoConfiguracion;
}
