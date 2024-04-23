/* tslint:disable */
import { CorreoEnviado } from './correo-enviado';
import { GMPedidoPartidas } from './gmpedido-partidas';
import { GMPedidoTramitado } from './gmpedido-tramitado';
import { PpPedido } from './pp-pedido';
import { PpPedidoConfiguracion } from './pp-pedido-configuracion';
import { PpPedidoIncidenciaCorreoEnviado } from './pp-pedido-incidencia-correo-enviado';
export interface GMPedidoTramitarErrores {
  CorreoEnviado?: CorreoEnviado;
  GMPedidoPartidas?: Array<GMPedidoPartidas>;
  GMPedidoTramitado?: GMPedidoTramitado;
  ppPedido?: PpPedido;
  ppPedidoConfiguracion?: PpPedidoConfiguracion;
  ppPedidoIncidenciaCorreoEnviado?: PpPedidoIncidenciaCorreoEnviado;
}
