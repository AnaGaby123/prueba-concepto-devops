/* tslint:disable */
import { ImpListaArribo } from './imp-lista-arribo';
import { VOcPartidaDetalle } from './voc-partida-detalle';
export interface VPDImpListaArriboPartidaDetalle {
  DTA?: number;
  FEAMasAntigua?: string;
  FEAMasReciente?: string;
  FTE?: number;
  Folio?: string;
  IGI?: number;
  IMP?: number;
  IVA?: number;
  IdImpListaArribo?: string;
  IdImpOrdenDespacho?: string;
  IdProveedor?: string;
  ImpListaArribo?: ImpListaArribo;
  NombreProveedor?: string;
  NumeroDePiezas?: number;
  Partidas?: Array<VOcPartidaDetalle>;
  TotalOrdenCompra?: number;
  TotalUSD?: number;
  VAC?: number;
  VAD?: number;
  VEI?: number;
}
