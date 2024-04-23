/* tslint:disable */
export interface FccPagoCliente {
  Activo?: boolean;
  Broker?: boolean;
  CuentaOrdenante?: string;
  FechaPago?: string;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  Folio?: string;
  IdArchivo?: string;
  IdCFDI?: string;
  IdCatBanco?: string;
  IdCatBrokerCliente?: string;
  IdCatMedioDePago?: string;
  IdCliente?: string;
  IdContactoCliente?: string;
  IdDatosBancarios?: string;
  IdEmpresa?: string;
  IdFCCFolioPagoCliente?: string;
  IdFCCPagoCliente?: string;
  InformacionComplementoPago?: boolean;
  MXN?: boolean;
  Monto?: number;
  ReferenciaBancaria?: string;
  Serie?: string;
  TipoDeCambio?: number;
  USD?: boolean;
}
