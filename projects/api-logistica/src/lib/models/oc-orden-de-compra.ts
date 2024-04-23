/* tslint:disable */
export interface OcOrdenDeCompra {
  Activo?: boolean;
  Confirmada?: boolean;
  Consecutivo?: number;
  Entregada?: boolean;
  FEE1Dia?: string;
  FEE2Dias?: string;
  FEE3Dias?: string;
  FechaCompra?: string;
  FechaEstimadaEntrega?: string;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  IVA?: number;
  IdCatCondicionesDePago?: string;
  IdCatMedioDePago?: string;
  IdCatMoneda?: string;
  IdEmpresaCompra?: string;
  IdEmpresaEmbarque?: string;
  IdOcOrdenDeCompra?: string;
  IdProveedor?: string;
  IdUsuario?: string;
  IdUsuarioConfirma?: string;
  NoConfirmada?: boolean;
  NombreConfirmacion?: string;
  NumeroOrdenDeCompra?: string;
  NumeroReferencia?: string;
  PrecioFlete?: number;
  Subtotal?: number;
  Total?: number;
  TotalUSD?: number;
}
