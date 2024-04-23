/* tslint:disable */
export interface TpProformaPedido {
  Activo?: boolean;
  Cancelada?: boolean;
  Comentarios?: string;
  Contrarecibo?: boolean;
  Controlados?: boolean;
  Factura?: boolean;
  FacturaFlete?: boolean;
  FechaCompromisoPago?: string;
  FechaPagoCompleto?: string;
  FechaPromesaPagoMonitoreoCobros?: string;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  Folio?: string;
  IdCFDI?: string;
  IdCFDIGenerada?: string;
  IdCliente?: string;
  IdContactoCliente?: string;
  IdDireccionCliente?: string;
  IdEmpresa?: string;
  IdTPProformaPedido?: string;
  IdTPProformaPedidoReemplazo?: string;
  MXN?: boolean;
  MontoPagado?: number;
  MontoPendiente?: number;
  MontoTotal?: number;
  NumeroFactura?: string;
  NumeroOrdenDeCompra?: string;
  PrecioFleteKPI?: number;
  Publicaciones?: boolean;
  ReferenciaPago?: string;
  Revisada?: boolean;
  Serie?: string;
  USD?: boolean;
  Uuid?: string;
}
