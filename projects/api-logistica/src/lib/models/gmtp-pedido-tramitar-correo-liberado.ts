/* tslint:disable */
import { CorreoEnviado } from './correo-enviado';
import { GMtpPartidasPedido } from './gmtp-partidas-pedido';
import { TpPedidoContactoNotificadoEntrega } from './tp-pedido-contacto-notificado-entrega';
import { TpPedido } from './tp-pedido';
import { TpPedidoArchivo } from './tp-pedido-archivo';
import { TpPedidoCorreoEnviado } from './tp-pedido-correo-enviado';
export interface GMtpPedidoTramitarCorreoLiberado {
  CorreoEnviado?: CorreoEnviado;
  listatpPartidasPedido?: Array<GMtpPartidasPedido>;
  listattpPedidoContactoNotificadoEntrega?: Array<TpPedidoContactoNotificadoEntrega>;
  tpPedido?: TpPedido;
  tpPedidoArchivo?: TpPedidoArchivo;
  tpPedidoCorreoEnviado?: TpPedidoCorreoEnviado;
}
