/* tslint:disable */
export interface Proveedor {
  Activo?: boolean;
  AplicaLicencia?: boolean;
  ColocarPhs?: boolean;
  CompraEnLinea?: boolean;
  CompraTradicional?: boolean;
  ConceptoFleteExpress?: string;
  DescripcionAmplia?: string;
  ExisteRelacionComercial?: boolean;
  FactorConversion?: number;
  FechaIngreso?: string;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  GravaIVAFleteExpress?: boolean;
  IdCatMonedaPagos?: string;
  IdCatMonedaVentas?: string;
  IdCatRolProveedor?: string;
  IdConfiguracionPagos?: string;
  IdDireccion?: string;
  IdProveedor?: string;
  IdUsuarioComprador?: string;
  IdUsuarioInspector?: string;
  IdUsuarioPagador?: string;
  LeyendaFleteExpress?: string;
  MesInicioFiscal?: number;
  Nombre?: string;
  NombreImagen?: string;
  ObjetivoCrecimientoDeseado?: number;
  ObjetivoCrecimientoFundamental?: number;
  Observaciones?: string;
  PrecioFleteExpress?: number;
  RazonSocial?: string;
  RegistroCompletado?: boolean;
  TaxId?: string;
  TieneFleteExpress?: boolean;
  Web?: string;
}
