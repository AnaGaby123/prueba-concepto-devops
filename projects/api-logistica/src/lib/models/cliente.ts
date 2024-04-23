/* tslint:disable */
export interface Cliente {
  Activo?: boolean;
  Alias?: string;
  Contrato?: string;
  EsTerceroAutorizado?: boolean;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  IdArchivo?: string;
  IdCatCorporativo?: string;
  IdCatImportanciaCliente?: string;
  IdCatIndustria?: string;
  IdCatNivelIngreso?: string;
  IdCatRolCliente?: string;
  IdCatSector?: string;
  IdCliente?: string;
  IdConfiguracionPagos?: string;
  IdUsuarioCobrador?: string;
  IdUsuarioCoordinadorDeServicioAlCliente?: string;
  IdUsuarioCoordinadorDeVentaInterna?: string;
  IdUsuarioESAC?: string;
  IdUsuarioVendedor?: string;
  Moroso?: boolean;
  NoAplicaGastoDeEnvio?: boolean;
  Nombre?: string;
  NombreImagen?: string;
  ObjetivoCrecimientoDeseado?: number;
  ObjetivoCrecimientoFundamental?: number;
  Pagina?: string;
  PortalFactura?: string;
  RecogeEnProquifa?: boolean;
  RestringirVentaSustanciasControladas?: boolean;
  TramitarConOrdenDeCompraInterna?: boolean;
  TramitarSinOrdenDeCompra?: boolean;
}
