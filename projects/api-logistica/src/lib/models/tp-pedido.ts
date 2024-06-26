/* tslint:disable */
export interface TpPedido {
  Activo?: boolean;
  AddendaCorreoElectronico?: string;
  AddendaObservaciones?: string;
  AplicaAddendaCorreo?: boolean;
  AplicaAddendaLineaDeOrden?: boolean;
  Balance?: number;
  ComentariosEntrega?: string;
  ComentariosFacturacion?: string;
  ComentariosFlete?: string;
  Consecutivo?: number;
  EntregaConRemision?: boolean;
  EsPrincipal?: boolean;
  FacturaPorAdelantado?: boolean;
  FechaLimiteEnvioOrdenDeCompra?: string;
  FechaRegistro?: string;
  FechaTramitacion?: string;
  FechaUltimaActualizacion?: string;
  Finalizado?: boolean;
  FleteDesglosado?: boolean;
  FleteKPI?: number;
  FleteYaFacturado?: boolean;
  FolioPedidoInterno?: string;
  IdArchivo?: string;
  IdArchivoPDF?: string;
  IdCatCondicionesDePago?: string;
  IdCatDestino?: string;
  IdCatMetodoDePagoCFDI?: string;
  IdCatMoneda?: string;
  IdCatProceso?: string;
  IdCatUsoCFDI?: string;
  IdCliente?: string;
  IdContactoCliente?: string;
  IdContactoEntrega?: string;
  IdDireccionCliente?: string;
  IdEmpleadoRepresentanteLegal?: string;
  IdEmpresa?: string;
  IdFlete?: string;
  IdPPPedido?: string;
  IdSolicitudAutorizacionCambio?: string;
  IdTPPedido?: string;
  Liberado?: boolean;
  Monto?: number;
  NotasModificacion?: string;
  NumeroOrdenDeCompra?: string;
  PrecioFlete?: number;
  ReferenciaCliente?: string;
  TotalFletesMXN?: number;
  TotalFletesUSD?: number;
  Tramitado?: boolean;
}
