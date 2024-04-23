/* tslint:disable */
export interface PpPedido {
  Activo?: boolean;
  CambioAceptado?: boolean;
  ConCorreo?: boolean;
  Consecutivo?: number;
  DOF?: boolean;
  EsFleteDesglosado?: boolean;
  FechaEstimadaAjuste?: string;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  IdArchivo?: string;
  IdArchivoOc?: string;
  IdCatEstadoPretramitacionPedido?: string;
  IdCatMoneda?: string;
  IdContactoCliente?: string;
  IdCorreoRecibidoCliente?: string;
  IdFlete?: string;
  IdPPPedido?: string;
  IdPPPedidoCorregido?: string;
  IdSolicitudAutorizacionCambio?: string;
  IdUsuarioESAC?: string;
  Intramitable?: boolean;
  MontoTotalMXN?: number;
  MontoTotalUSD?: number;
  Observaciones?: string;
  ObservacionesFEA?: string;
  OcInterna?: boolean;
  OrdenDeCompra?: string;
  PrecioFlete?: number;
  TieneObservaciones?: boolean;
  TipoCambioUSD?: number;
  Tramitado?: boolean;
}
