/* tslint:disable */
import { PpIncidenciaPartida } from './pp-incidencia-partida';
import { PpPartidaPedido } from './pp-partida-pedido';
import { PpPartidaPedidoAddendaSanofi } from './pp-partida-pedido-addenda-sanofi';
import { PpPartidaPedidoIncidenciaCorreo } from './pp-partida-pedido-incidencia-correo';
export interface GMPedidoPartidas {
  ppIncidenciaPartida?: PpIncidenciaPartida;
  ppPartidaPedido?: PpPartidaPedido;
  ppPartidaPedidoAddendaSanofi?: PpPartidaPedidoAddendaSanofi;
  ppPartidaPedidoIncidenciaCorreo?: PpPartidaPedidoIncidenciaCorreo;
}
