/* tslint:disable */
import { GMtpPartidasPedidoTramitado } from './gmtp-partidas-pedido-tramitado';
import { TpPedido } from './tp-pedido';
import { TpPedidoComentariosAdicionales } from './tp-pedido-comentarios-adicionales';
import { TpPedidoContactoNotificadoEntrega } from './tp-pedido-contacto-notificado-entrega';
export interface GMPedidoTramitado {
  ListatpPartidaPedido?: Array<GMtpPartidasPedidoTramitado>;
  tpPedido?: TpPedido;
  tpPedidoComentariosAdicionales?: TpPedidoComentariosAdicionales;
  tpPedidoContactoNotificadoEntrega?: TpPedidoContactoNotificadoEntrega;
}
