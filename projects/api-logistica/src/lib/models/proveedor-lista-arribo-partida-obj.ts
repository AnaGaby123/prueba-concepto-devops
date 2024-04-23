/* tslint:disable */
import { VPDImpListaArriboPartidaDetalle } from './vpdimp-lista-arribo-partida-detalle';
export interface ProveedorListaArriboPartidaObj {
  DTA?: number;
  FTE?: number;
  IGI?: number;
  IMP?: number;
  IVA?: number;
  IdProveedor?: string;
  NombreProveedor?: string;
  Partidas?: Array<VPDImpListaArriboPartidaDetalle>;
  VAC?: number;
  VAD?: number;
  VEI?: number;
}
