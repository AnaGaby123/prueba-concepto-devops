/* tslint:disable */
import { GMPedidoTramitado } from './gmpedido-tramitado';
import { GMPartidaPedido } from './gmpartida-pedido';
import { PpPedido } from './pp-pedido';
import { PpPedidoConfiguracion } from './pp-pedido-configuracion';
export interface GMPretramitarPedido {
  GMPedidoTramitado?: GMPedidoTramitado;
  PartidasPedido?: Array<GMPartidaPedido>;
  Pedido?: PpPedido;
  PedidoConfiguracion?: PpPedidoConfiguracion;
}
