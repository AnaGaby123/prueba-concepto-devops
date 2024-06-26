/* tslint:disable */
import { AgrupadorCaracteristica } from './agrupador-caracteristica';
import { Archivo } from './archivo';
import { Lote } from './lote';
import { ArchivoTratadosOtrosDetalle } from './archivo-tratados-otros-detalle';
import { Producto } from './producto';
import { ProductoCapacitacion } from './producto-capacitacion';
import { ProductoDispositivoMedico } from './producto-dispositivo-medico';
import { ProductoEstandar } from './producto-estandar';
import { ProductoLabware } from './producto-labware';
import { ProductoPublicacion } from './producto-publicacion';
import { ProductoReactivo } from './producto-reactivo';
import { VProveedor } from './vproveedor';
import { CatIncoterm } from './cat-incoterm';
import { CatMoneda } from './cat-moneda';
import { CatRestriccionDeCompra } from './cat-restriccion-de-compra';
import { CatTipoControl } from './cat-tipo-control';
import { VProductoAlternativo } from './vproducto-alternativo';
import { VProductoComplementario } from './vproducto-complementario';
import { VProducto } from './vproducto';
export interface VProductoDetalle {
  ATC?: string;
  Activo?: boolean;
  AgrupadorCaracteristica?: AgrupadorCaracteristica;
  Aplicacion?: string;
  ArchivoAvisoDeQuimicosEsenciales?: Archivo;
  ArchivoCartaDeDisponibilidad?: Archivo;
  ArchivoCartaDeUso?: Archivo;
  ArchivoCertificadoLote?: Archivo;
  ArchivoCicoplafest?: Archivo;
  ArchivoEstructuraMolecular?: Archivo;
  ArchivoFichaTecnica?: Archivo;
  ArchivoHojaSeguridad?: Archivo;
  ArchivoOtroPermiso?: Archivo;
  ArchivoPermisoDeAdquisicionEnPlaza?: Archivo;
  ArchivoPermisoDeImprotacion?: Archivo;
  ArchivoTratado?: Archivo;
  ArchivoZoosanitarios?: Archivo;
  Autor?: string;
  BasePrecioLista?: number;
  CAS?: string;
  CantidadExistenteStock?: number;
  CarateristicasFisicas?: string;
  Catalogo?: string;
  Clasificacion?: string;
  ClasificacionRegulatoriaLabware?: string;
  ClaveMonedaPagos?: string;
  Composicion?: string;
  Control?: string;
  ControlClave?: string;
  Controlado?: boolean;
  DatosToxicologicos?: string;
  Declaracion?: string;
  Descripcion?: string;
  Disponibilidad?: string;
  DisponibilidadClave?: string;
  DuracionEvento?: number;
  Edicion?: string;
  Editorial?: string;
  EsMexicano?: boolean;
  EstadoFisico?: string;
  FechaCaducidadPrecio?: string;
  FechaCaducidadRegistro?: string;
  FechaCaducidadRegistroSanitario?: string;
  FechaCaducidadStock?: string;
  FechaCaducidadVigenciaCuraduria?: string;
  FechaDisponibilidadBackOrder?: string;
  FechaRegistro?: string;
  FechaUltimaActualizacion?: string;
  FormatoPublicacion?: string;
  FormulaMolecular?: string;
  FormulaQuimica?: string;
  FraccionArancelaria?: string;
  FraccionImportacion?: string;
  GravaIVA?: boolean;
  ISBN?: string;
  IdAgrupadorCaracteristica?: string;
  IdArchivo?: string;
  IdArchivoAvisoDeQuimicosEsenciales?: string;
  IdArchivoCartaDeDisponibilidad?: string;
  IdArchivoCartaDeUso?: string;
  IdArchivoCertificado?: string;
  IdArchivoCicoplafest?: string;
  IdArchivoEstructuraMolecular?: string;
  IdArchivoFichaTecnica?: string;
  IdArchivoHojaSeguridad?: string;
  IdArchivoOtroPermiso?: string;
  IdArchivoPermisoDeAdquisicionEnPlaza?: string;
  IdArchivoPermisoDeImprotacion?: string;
  IdArchivoTratado?: string;
  IdArchivoZoosanitarios?: string;
  IdCatAplicacion?: string;
  IdCatClasificacionInformativaProducto?: string;
  IdCatControl?: string;
  IdCatDepositarioInternacional?: string;
  IdCatDisponibilidad?: string;
  IdCatEstadoFisico?: string;
  IdCatFormatoPublicacion?: string;
  IdCatIncoterm?: string;
  IdCatLinea?: string;
  IdCatManejoAlmacenaje?: string;
  IdCatManejoTransporte?: string;
  IdCatMedioTransporte?: string;
  IdCatMonedaPagos?: string;
  IdCatMonedaPermiso?: string;
  IdCatMonedaVentas?: string;
  IdCatRestriccionDeCompra?: string;
  IdCatRutaEntrega?: string;
  IdCatSubtipoProducto?: string;
  IdCatTipoControl?: string;
  IdCatTipoDescargaProducto?: string;
  IdCatTipoPresentacion?: string;
  IdCatTipoProducto?: string;
  IdCatUnidad?: string;
  IdCatUso?: string;
  IdFamilia?: string;
  IdMarca?: string;
  IdMarcaFamilia?: string;
  IdProducto?: string;
  IdProveedor?: string;
  IdProveedorPrincipal?: string;
  InvestigacionCompleta?: boolean;
  Linea?: string;
  Lote?: Lote;
  Lotes?: Array<Lote>;
  ManejoAlmacenaje?: string;
  ManejoTransporte?: string;
  MedioDifusion?: string;
  MedioTransporte?: string;
  MonedaVentaProveedor?: string;
  NombreImagenMarca?: string;
  NombreMarca?: string;
  NombreProveedor?: string;
  Nota?: string;
  NumeroDePersonasPorGrupo?: number;
  NumeroDePiezas?: number;
  NumeroDepositarioInternacional?: string;
  OtrosTratados?: Array<ArchivoTratadosOtrosDetalle>;
  Peligrosidad?: string;
  PorcentajeIVA?: number;
  PrecioLista?: number;
  PrecioListaMonedaProveedor?: number;
  PrecioPermiso?: number;
  PrecioPorGrupo?: boolean;
  PrecioPorPersona?: boolean;
  Presentacion?: string;
  Producto?: Producto;
  ProductoCapacitacion?: ProductoCapacitacion;
  ProductoCapacitacionDescripcion?: string;
  ProductoDispositivoMedico?: ProductoDispositivoMedico;
  ProductoEstandar?: ProductoEstandar;
  ProductoLabware?: ProductoLabware;
  ProductoPublicacion?: ProductoPublicacion;
  ProductoReactivo?: ProductoReactivo;
  ProveedoresAlternativos?: Array<VProveedor>;
  ProximoACaducar?: boolean;
  Pureza?: number;
  RequiereDocumentosAdicionales?: boolean;
  RequierePermisoTramitadoPorCliente?: boolean;
  RequierePermisoTramitadoPorProquifa?: boolean;
  RestriccionDeCompra?: string;
  RestriccionFlete?: string;
  RestriccionLogisticaInternadoPaisTransito?: boolean;
  RutaEntrega?: string;
  Sinonimos?: string;
  Subtipo?: string;
  SubtipoProductoClave?: string;
  TieneCAS?: boolean;
  TieneStock?: boolean;
  Tipo?: string;
  TipoDeCambioAplicadoCaptura?: number;
  TipoPresentacion?: string;
  TipoPresentacionClave?: string;
  TipoProductoClave?: string;
  TotalAlternativo?: number;
  TotalComplementario?: number;
  TotalSuplementario?: number;
  Unidad?: string;
  Uso?: string;
  catIncoterm?: CatIncoterm;
  catMonedaPermiso?: CatMoneda;
  catRestriccionDeCompra?: CatRestriccionDeCompra;
  catTipoControl?: CatTipoControl;
  vProductoAlternativo?: Array<VProductoAlternativo>;
  vProductoComplementario?: Array<VProductoComplementario>;
  vProductoSuplementarios?: Array<VProducto>;
}
