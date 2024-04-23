/* tslint:disable */
export interface VTramitarPedido {
  ClaveMoneda?: string;
  ConIncidencias?: number;
  FechaEstimadaEntregaMax?: string;
  FechaLimiteEnvioOrdenDeCompra?: string;
  FechaRecepcion?: string;
  Finalizado?: boolean;
  FletesExpress?: number;
  IdArchivo?: string;
  IdCatMoneda?: string;
  IdCliente?: string;
  IdFlete?: string;
  IdTPPedido?: string;
  Liberado?: boolean;
  NumeroOrdenDeCompra?: string;
  OcInterna?: boolean;
  Productos?: number;
  SinOC?: boolean;
  Subtotal?: number;
  TieneFleteExpress?: boolean;
  Total?: number;
  TotalFletesMXN?: number;
  TotalFletesUSD?: number;
  TotalIVA?: number;
  TotalMXN?: number;
  TotalUSD?: number;
  Tramitado?: boolean;
}
