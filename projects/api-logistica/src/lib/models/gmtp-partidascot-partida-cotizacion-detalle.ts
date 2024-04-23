/* tslint:disable */
import { CotPartidaCotizacionDetalle } from './cot-partida-cotizacion-detalle';
import { TpPartidaPedido } from './tp-partida-pedido';
import { TpPartidaPedidoAddendaSanofi } from './tp-partida-pedido-addenda-sanofi';
export interface GMtpPartidascotPartidaCotizacionDetalle {
  DeCatalogo?: boolean;
  IVA?: number;
  PorcentajeSobrePrecioLista?: number;
  PrecioFleteNoDesglosado?: number;
  PrecioUnitario?: number;
  SubtTotal?: number;
  TEE?: string;
  TieneContrato?: boolean;
  TipoPartidaTramitacion?: string;
  ValorTotal?: number;
  Vigente?: boolean;
  cotPartidaCotizacionDetalle?: CotPartidaCotizacionDetalle;
  tpPartidaPedido?: TpPartidaPedido;
  tpPartidaPedidoAddendaSanofi?: TpPartidaPedidoAddendaSanofi;
}
