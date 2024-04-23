/* tslint:disable */
import { CorreoEnviado } from './correo-enviado';
import { GMPartidasEIncidencias } from './gmpartidas-eincidencias';
import { GMPedidoTramitado } from './gmpedido-tramitado';
import { PpPedido } from './pp-pedido';
import { PpPedidoConfiguracion } from './pp-pedido-configuracion';
import { PpPedidoOcNoAmparadaCorreoEnviado } from './pp-pedido-oc-no-amparada-correo-enviado';
export interface GMPedidoAceptarOCInterna {
  CorreoEnviado?: CorreoEnviado;
  GMPedidoPartidas?: Array<GMPartidasEIncidencias>;
  GMPedidoTramitado?: GMPedidoTramitado;
  ppPedido?: PpPedido;
  ppPedidoConfiguracion?: PpPedidoConfiguracion;
  ppPedidoOcNoAmparadaCorreoEnviado?: PpPedidoOcNoAmparadaCorreoEnviado;
}
