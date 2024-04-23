export interface DatosFacturacion {
  IdDatosFacturacionCliente: string;
  RazonSocial: string;
  RFC: string;
  IdCatMoneda: string;
  IdEmpresa: string;
  URL: string;
  Usuario: string;
  Contrasena: string;
  IdCatRevision: string;
  IdCatUsoCFDI: string;
  IdCatMetodoDePagoCFDI: string;
  EnviarAlCorreoElectronico: string;
  FechaRegistro: string;
  FechaUltimaActualizacion: string;
  Activo: boolean;
  IdCliente: string;
  TipoValidacionSAT: boolean;
  TipoValidacionPortal: boolean;
  TipoValidacionCorreo: boolean;
  Correo: string;
}

export interface RestriccionEntrega {
  IdRestriccionEntrega: string;
  IdDatosFacturacionCliente: string;
  Mes: number;
  Anio: number;
  FechaInicio: string;
  FechaFin: string;
  DiasFinMes: number;
  ConfiguracionUnica: boolean;
  FechaRegistro: string;
  FechaActualizacion: string;
  Activo: boolean;
  Descripcion: string;
}

export interface DatosConfiguracionPagos {
  IdConfiguracionPagos: string;
  IdCatCondicionesDePago: string;
  LineaCredito: number;
  LimiteLineaCredito: number;
  IdDatosBancariosTransferencia: string;
  IdDatosBancariosDeposito: string;
  IdDatosBancariosTarjeta: string;
  IdCatMedioDePago: string;
}
