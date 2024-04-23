/* tslint:disable */
import { OcPendienteCompraProducto } from './oc-pendiente-compra-producto';
import { TpPartidaPedido } from './tp-partida-pedido';
import { TpPartidaPedidoAddendaSanofi } from './tp-partida-pedido-addenda-sanofi';
export interface GMtpPartidasPedido {
  ocPendienteCompraProducto?: OcPendienteCompraProducto;
  tpPartidaPedido?: TpPartidaPedido;
  tpPartidaPedidoAddendaSanofi?: TpPartidaPedidoAddendaSanofi;
}
