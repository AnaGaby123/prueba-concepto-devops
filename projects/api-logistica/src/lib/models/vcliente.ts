/* tslint:disable */
export interface VCliente {
  Activo?: boolean;
  AddendaDeCorreo?: boolean;
  AddendaDeLineaDeOrden?: boolean;
  Alias?: string;
  AreaCorporativo?: string;
  Categoria?: string;
  ClaveMonedaFacturacion?: string;
  ClaveMonedaTramitacion?: string;
  ClaveSector?: string;
  Cobrador?: string;
  Codigo?: string;
  CodigoPostal?: string;
  CondicionesDePago?: string;
  Contrato?: string;
  ESAC?: string;
  EVE?: string;
  EVI?: string;
  EmpresaFactura?: string;
  EsMexicano?: boolean;
  EsTerceroAutorizado?: boolean;
  FacturaPHS?: boolean;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  IdArchivo?: string;
  IdCatCondicionesDePago?: string;
  IdCatCorporativo?: string;
  IdCatImportanciaCliente?: string;
  IdCatIndustria?: string;
  IdCatMoneda?: string;
  IdCatMonedaTramitacion?: string;
  IdCatNivelIngreso?: string;
  IdCatPais?: string;
  IdCatRegimenFiscal?: string;
  IdCatRolCliente?: string;
  IdCatRutaEntrega?: string;
  IdCatSector?: string;
  IdCliente?: string;
  IdConfiguracionPagos?: string;
  IdDireccion?: string;
  IdDireccionCliente?: string;
  IdUsuarioCobrador?: string;
  IdUsuarioCoordinadorDeServicioAlCliente?: string;
  IdUsuarioCoordinadorDeVentaInterna?: string;
  IdUsuarioESAC?: string;
  IdUsuarioEVE?: string;
  IdUsuarioEVI?: string;
  IdUsuarioVendedor?: string;
  Importancia?: string;
  Industria?: string;
  Moroso?: boolean;
  NivelIngreso?: string;
  NoAplicaGastoDeEnvio?: boolean;
  Nombre?: string;
  NombreCatRolCliente?: string;
  NombreCorporativo?: string;
  NombreImagen?: string;
  NombrePais?: string;
  ObjetivoCrecimientoDeseado?: number;
  ObjetivoCrecimientoFundamental?: number;
  Pagina?: string;
  PortalFactura?: string;
  RFC?: string;
  RFCEmpresa?: string;
  RazonSocial?: string;
  RecogeEnProquifa?: boolean;
  RegimenFiscal?: string;
  RestringirVentaSustanciasControladas?: boolean;
  RutaEntrega?: string;
  Sector?: string;
  SinCredito?: boolean;
  TieneContrato?: boolean;
  TipoDeCambioBanamex?: boolean;
  TipoDeCambioDiarioOficial?: boolean;
  TramitarConOrdenDeCompraInterna?: boolean;
  TramitarSinOrdenDeCompra?: boolean;
  UsuarioVendedor?: string;
}