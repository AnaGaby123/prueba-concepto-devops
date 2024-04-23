/* tslint:disable */
import { VTpProformaPedidoObj } from './vtp-proforma-pedido-obj';
export interface ClienteAtenderRevisionObj {
  FechaEntregaMasProxima?: string;
  FechaRevisionMasProxima?: string;
  IdCatTipoValidacion?: string;
  IdCliente?: string;
  MontoTotal?: number;
  NombreCliente?: string;
  TipoValidacion?: string;
  TotalFacturas?: number;
  TotalProformaPedido?: number;
  vTpProformaPedidoObj?: Array<VTpProformaPedidoObj>;
}
