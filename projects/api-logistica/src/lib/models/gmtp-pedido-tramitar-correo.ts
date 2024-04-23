/* tslint:disable */
import { TpPartidasPedidoTramitarCorreo } from './tp-partidas-pedido-tramitar-correo';
import { TpPedido } from './tp-pedido';
export interface GMtpPedidoTramitarCorreo {
  ComentariosAdicionales?: string;
  ConCopiaCSV?: string;
  Contacto?: string;
  ListaContactoNotificacionEntrega?: Array<string>;
  ListatpPartidasPedido?: Array<TpPartidasPedidoTramitarCorreo>;
  tpPedido?: TpPedido;
}
