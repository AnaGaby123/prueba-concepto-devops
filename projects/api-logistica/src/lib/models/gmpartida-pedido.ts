/* tslint:disable */
import { PpIncidenciaPartida } from './pp-incidencia-partida';
import { PpPartidaPedido } from './pp-partida-pedido';
import { PpPartidaPedidoAddendaSanofi } from './pp-partida-pedido-addenda-sanofi';
import { PpPartidaPedidoConfiguracion } from './pp-partida-pedido-configuracion';
export interface GMPartidaPedido {
  IncidenciaPartida?: PpIncidenciaPartida;
  PartidaPedido?: PpPartidaPedido;
  ppPartidaPedidoAddendaSanofi?: PpPartidaPedidoAddendaSanofi;
  ppPartidaPedidoConfiguracion?: PpPartidaPedidoConfiguracion;
}
