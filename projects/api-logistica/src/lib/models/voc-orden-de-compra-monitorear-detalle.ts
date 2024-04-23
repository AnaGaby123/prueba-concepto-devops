/* tslint:disable */
export interface VOcOrdenDeCompraMonitorearDetalle {
  A1Dia?: number;
  A2Dias?: number;
  A3Dias?: number;
  AMasDe3Dias?: number;
  CondicionesDePago?: string;
  Confirmada?: boolean;
  EnTiempoAmarillo?: boolean;
  EnTiempoVerde?: boolean;
  Entregada?: boolean;
  FEAMasAntigua?: string;
  FEAMasReciente?: string;
  FechaEstimadaEntrega?: string;
  IdCatCondicionesDePago?: string;
  IdCatMedioDePago?: string;
  IdOcOrdenDeCompra?: string;
  IdProveedor?: string;
  MedioDePago?: string;
  NombreConfirmacion?: string;
  NumeroOrdenDeCompra?: string;
  NumeroReferencia?: string;
  TotaUnica?: number;
  Total?: number;
  TotalClientes?: number;
  TotalFleteExpress?: number;
  TotalFleteNormal?: number;
  TotalNoArribado?: number;
  TotalPartidas?: number;
  TotalPiezas?: number;
  TotalProductos?: number;
  TotalProgramadas?: number;
  VencidoRojo?: boolean;
}
