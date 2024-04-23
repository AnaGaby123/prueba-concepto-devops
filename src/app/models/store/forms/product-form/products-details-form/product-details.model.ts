import {ITabOption} from '@appModels/botonera/botonera-option';
import {
  Producto,
  ProductoCapacitacion,
  ProductoDispositivoMedico,
  ProductoEstandar,
  ProductoLabware,
  ProductoPublicacion,
  ProductoReactivo,
  ProductoTarifaAgenteAduanal,
  QueryInfo,
  SugerenciaBusqueda,
  VMarcaFamilia,
  VProducto,
  VProductoAlternativo,
  VProductoComplementario,
  VProductoDetalle,
  VProductoSuplementario,
} from 'api-catalogos';
import {API_REQUEST_STATUS_DEFAULT, DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {initialProductsInfo} from '@appModels/store/forms/product-form/list-products-form/products-query-info';
import {IImageItem} from '@appModels/shared/shared.models';

export interface ProductsDetails {
  tabSteps: Array<ITabOption>;
  tabSelected: ITabOption;
  linkedProducts: ILinkedProducts;
  productDetails: IVProductoDetalle;
  selectedTradeMark: DropListOption;
  productsTypeFamily: Array<VMarcaFamilia>;
  productTypeFamilySelected: DropListOption;
  characteristicGrouper: Array<DropListOption>;
  characteristicGrouperSelected: DropListOption;
  unitSelected: DropListOption;
  availabilitySelected: DropListOption;
  billingRestrictionSelected: DropListOption;
  selectedPhysicalState: DropListOption;
  regulationFiles: IRegulationFiles;
  logisticFiles: IProductLogisticFile;
  technicalCommercialInvestigationFiles: IProductTechnicalCommercialInvestigation;
  publicationsFormatSelected: DropListOption;
  filesToDelete: Array<string>;
  validateCas: boolean;
  useSelected: DropListOption;
  classificationProductSelected: DropListOption;
  internationalDepositarySelected: DropListOption;
  typePresentationSelected: DropListOption;
  typeApplicationSelected: DropListOption;
  transportationWaySelected: DropListOption;
  transportationManagementSelected: DropListOption;
  storageSelected: DropListOption;
  supplement: ISupplements;
  restrictionFreightSelected: DropListOption;
  customAgent: ProductoTarifaAgenteAduanal;
  backUp: IVProductoDetalle;
  backUpData;
  productSupplementaryData: Producto;
  productPublicationSupplementaryData: ProductoPublicacion;
  supplementaryProducts: Array<VProductoSuplementario>;
  supplementaryProductsToDelete: Array<VProductoSuplementario>;
  dateValidityCuratorship: Date;
  dateExpirationHealthRegister: Date;
  productBackUp: IProductInfo;
  alertPop: boolean;
  tabOption: ITabOption;
  isAddProduct: boolean;
  fechaDisponibilidadBackOrderSelected: Date;
}
export interface IVProductoDetalle extends VProductoDetalle {
  vProductoAlternativo?: Array<IVProductoAlternativo>;
  vProductoComplementario?: Array<IVProductoComplementario>;
}
export interface IVProductoAlternativo extends VProductoAlternativo, IImageItem {
  ImagePresentation?: string;
  ImagePresentationHover?: string;
}
export interface IVProductoComplementario extends VProductoComplementario, IImageItem {
  ImagePresentation?: string;
  ImagePresentationHover?: string;
}
export interface IProductBackUp extends IVProductoDetalle {
  Catalogo: string;
  Descripcion: string;
  PrecioLista?: number;
  PrecioListaMonedaProveedor: number;
  Presentacion: string;
  Controlado: boolean;
  Tipo: string;
  Subtipo: string;
  Control: string;
  Disponibilidad: string;
  Unidad: string;
  FechaCaducidadVigenciaCuraduria: string;
  Nota: string;
  NombreProveedor: string;
  NombreMarca: string;
  Aplicacion: string;
  Clasificacion: string;
  Uso: string;
  EstadoFisico: string;
  label: string;
  labelKey: string;
  NumeroDePersonasPorGrupo?: null;
  PrecioPorGrupo?: false;
  PrecioPorPersona?: false;
  Autor: string;
  FormatoPublicacion: string;
}

export interface ISupplements extends VProductoSuplementario {
  ISBN: string;
  Descripcion: string;
  Editorial: string;
  Edicion: string;
  IdProductoSuplementario: string;
}

export const initialISupplements = (): ISupplements => ({
  Descripcion: null,
  Edicion: null,
  Editorial: null,
  ISBN: null,
  IdProductoSuplementario: DEFAULT_UUID,
});

export const initialProductsDetails = (): ProductsDetails => ({
  tabSteps: [
    {
      id: '1',
      label: 'INVESTIGACIÓN TÉCNICO COMERCIAL',
      activeSubtitle: false,
    },
    {
      id: '2',
      label: 'REGULACIÓN Y RESTRICCIONES NO ARANCELARIAS',
      activeSubtitle: false,
    },
    {
      id: '3',
      label: 'LOGÍSTICA',
      activeSubtitle: false,
    },
    {
      id: '4',
      label: 'VINCULAR ALTERNOS · COMPLEMENTARIOS ',
      activeSubtitle: false,
    },
  ],
  tabSelected: {
    id: '1',
    label: 'INVESTIGACIÓN TÉCNICO COMERCIAL',
    activeSubtitle: false,
  },
  linkedProducts: initialILinkedProducts(),
  productDetails: initialProductDetails(),
  validateCas: true,
  productsTypeFamily: [],
  characteristicGrouper: [],
  selectedTradeMark: null,
  productTypeFamilySelected: null,
  characteristicGrouperSelected: null,
  unitSelected: null,
  availabilitySelected: null,
  billingRestrictionSelected: null,
  selectedPhysicalState: null,
  useSelected: null,
  internationalDepositarySelected: null,
  typePresentationSelected: null,
  typeApplicationSelected: null,
  transportationWaySelected: null,
  classificationProductSelected: null,
  transportationManagementSelected: null,
  storageSelected: null,
  restrictionFreightSelected: null,
  publicationsFormatSelected: null,
  customAgent: null,
  regulationFiles: {
    ArchivoCartaDeDisponibilidad: null,
    ArchivoCartaDeUso: null,
    ArchivoPermisoDeAdquisicionEnPlaza: null,
    ArchivoPermisoDeImprotacion: null,
    ArchivoAvisoDeQuimicosEsenciales: null,
    ArchivoZoosanitarios: null,
    ArchivoCicoplafest: null,
    ArchivoOtroPermiso: null,
  },
  logisticFiles: {
    ArchivoHojaSeguridad: null,
    ArchivoCertificadoLote: null,
    ArchivoFichaTecnica: null,
    ArchivoTratado: null,
    OtrosTratados: [],
  },
  supplement: initialISupplements(),
  filesToDelete: [],
  backUp: null,
  backUpData: null,
  technicalCommercialInvestigationFiles: {
    ArchivoEstructuraMolecular: null,
  },
  supplementaryProducts: [],
  supplementaryProductsToDelete: [],
  productSupplementaryData: null,
  productPublicationSupplementaryData: null,
  dateValidityCuratorship: null,
  dateExpirationHealthRegister: null,
  productBackUp: null,
  alertPop: false,
  tabOption: null,
  isAddProduct: false,
  fechaDisponibilidadBackOrderSelected: null,
});

export const initialProduct = (): Producto => ({
  IdProducto: DEFAULT_UUID,
  Catalogo: null,
  Descripcion: null,
  Nota: null,
  IdCatClasificacionInformativaProducto: null,
  IdCatDisponibilidad: null,
  IdCatLinea: null,
  PrecioLista: 0,
  Presentacion: null,
  IdCatUnidad: null,
  GravaIVA: true,
  PorcentajeIVA: null,
  InvestigacionCompleta: false,
  FechaRegistro: DEFAULT_DATE,
  FechaCaducidadRegistro: null,
  FechaUltimaActualizacion: DEFAULT_DATE,
  Activo: true,
  Controlado: false,
  IdArchivoCertificado: null,
  IdCatDepositarioInternacional: null,
  NumeroDepositarioInternacional: null,
  IdProveedor: null,
  IdAgrupadorCaracteristica: null,
  PrecioListaMonedaProveedor: null,
  TipoDeCambioAplicadoCaptura: null,
  IdCatTipoControl: null,
  IdCatMonedaPermiso: null,
  IdCatIncoterm: null,
  Declaracion: null,
  FraccionImportacion: null,
  FraccionArancelaria: null,
  PrecioPermiso: null,
  RequierePermisoTramitadoPorProquifa: null,
  RequierePermisoTramitadoPorCliente: null,
  RequiereDocumentosAdicionales: null,
  RestriccionLogisticaInternadoPaisTransito: null,
  NumeroDePiezas: null,
  IdMarcaFamilia: null,
  FechaCaducidadPrecio: null,
  FechaCaducidadVigenciaCuraduria: null,
  FechaCaducidadRegistroSanitario: null,
  Peligrosidad: null,
  // DOCS: SE ELIMINÓ EL CHECKBOX DE CAS Y SE ESTABLECE SIEMPRE EN TRUE
  TieneCAS: true,
});

export const initialProductDetails = (): VProductoDetalle => ({
  OtrosTratados: [],
  Producto: initialProduct(),
  Lote: null,
  Lotes: null,
  vProductoSuplementarios: [],
  Clasificacion: '',
  ProductoLabware: null,
  vProductoAlternativo: [],
  vProductoComplementario: [],
  ProveedoresAlternativos: [],
  ProductoEstandar: null,
  ProductoPublicacion: null,
  ProductoReactivo: null,
  ProductoDispositivoMedico: null,
  ProductoCapacitacion: null,
  ArchivoCertificadoLote: null,
  ArchivoHojaSeguridad: null,
  ArchivoFichaTecnica: null,
  ArchivoCartaDeDisponibilidad: null,
  ArchivoCartaDeUso: null,
  ArchivoPermisoDeAdquisicionEnPlaza: null,
  ArchivoPermisoDeImprotacion: null,
  ArchivoAvisoDeQuimicosEsenciales: null,
  ArchivoZoosanitarios: null,
  ArchivoCicoplafest: null,
  ArchivoTratado: null,
  catTipoControl: null,
  catIncoterm: null,
  catMonedaPermiso: null,
  AgrupadorCaracteristica: null,
  IdFamilia: DEFAULT_UUID,
  IdProducto: DEFAULT_UUID,
  Catalogo: null,
  Descripcion: null,
  Nota: null,
  IdCatClasificacionInformativaProducto: null,
  IdCatDisponibilidad: null,
  IdCatLinea: null,
  PrecioLista: 0,
  Presentacion: null,
  IdCatUnidad: null,
  GravaIVA: true,
  PorcentajeIVA: null,
  InvestigacionCompleta: false,
  FechaRegistro: DEFAULT_DATE,
  FechaCaducidadRegistro: null,
  FechaUltimaActualizacion: DEFAULT_DATE,
  Activo: false,
  Controlado: false,
  IdArchivoCertificado: null,
  IdCatDepositarioInternacional: null,
  NumeroDepositarioInternacional: null,
  IdProveedor: DEFAULT_UUID,
  IdAgrupadorCaracteristica: null,
  PrecioListaMonedaProveedor: null,
  TipoDeCambioAplicadoCaptura: null,
  IdCatTipoControl: null,
  IdCatMonedaPermiso: null,
  IdCatIncoterm: null,
  Declaracion: null,
  FraccionImportacion: null,
  FraccionArancelaria: null,
  PrecioPermiso: null,
  RequierePermisoTramitadoPorProquifa: null,
  RequierePermisoTramitadoPorCliente: null,
  RequiereDocumentosAdicionales: null,
  RestriccionLogisticaInternadoPaisTransito: null,
  NumeroDePiezas: null,
  IdMarcaFamilia: DEFAULT_UUID,
  FechaCaducidadPrecio: null,
  FechaCaducidadVigenciaCuraduria: null,
  FechaCaducidadRegistroSanitario: null,
  Peligrosidad: null,
  NombreProveedor: null,
  MonedaVentaProveedor: null,
  IdMarca: DEFAULT_UUID,
  NombreMarca: null,
  IdArchivo: null,
  IdCatTipoProducto: null,
  Tipo: null,
  IdCatSubtipoProducto: null,
  Subtipo: null,
  IdCatControl: null,
  Disponibilidad: null,
  Linea: null,
  Unidad: null,
  IdCatTipoPresentacion: null,
  TipoPresentacion: null,
  IdCatAplicacion: null,
  Aplicacion: null,
  IdCatMedioTransporte: null,
  MedioTransporte: null,
  IdCatManejoTransporte: null,
  ManejoTransporte: null,
  IdCatManejoAlmacenaje: null,
  ManejoAlmacenaje: null,
  IdCatUso: null,
  Uso: null,
  CAS: null,
  ATC: null,
  FormulaQuimica: null,
  Pureza: null,
  CarateristicasFisicas: null,
  Composicion: null,
  DatosToxicologicos: null,
  IdCatEstadoFisico: null,
  EstadoFisico: null,
  IdArchivoHojaSeguridad: null,
  IdArchivoFichaTecnica: null,
  IdArchivoCartaDeDisponibilidad: null,
  IdArchivoCartaDeUso: null,
  IdArchivoPermisoDeAdquisicionEnPlaza: null,
  IdArchivoPermisoDeImprotacion: null,
  IdArchivoAvisoDeQuimicosEsenciales: null,
  IdArchivoZoosanitarios: null,
  IdArchivoCicoplafest: null,
  IdArchivoTratado: null,
  IdCatFormatoPublicacion: null,
  FormatoPublicacion: null,
  Autor: null,
  ISBN: null,
  Editorial: null,
  Edicion: null,
  TotalAlternativo: null,
  TotalComplementario: null,
  TotalSuplementario: null,
  Control: null,
  Sinonimos: null,
  IdArchivoEstructuraMolecular: null,
  ArchivoEstructuraMolecular: null,
  RestriccionFlete: null,
  // DOCS: SE ELIMINÓ EL CHECKBOX DE CAS Y SE ESTABLECE SIEMPRE EN TRUE
  TieneCAS: true,
  IdCatRutaEntrega: null,
  RutaEntrega: null,
});
export const initialPublications = (): ProductoPublicacion => ({
  Autor: null,
  Edicion: null,
  Editorial: null,
  ISBN: null,
  IdArchivoFichaTecnica: null,
  IdArchivoHojaSeguridad: null,
  IdArchivoTratado: null,
  IdCatFormatoPublicacion: null,
  IdCatRestriccionFlete: null,
  IdProducto: null,
  IdProductoPublicacion: DEFAULT_UUID,
  TMEC: false,
  TLCUE: false,
  USMCA: false,
  AELC: false,
  Activo: true,
});
export const initialStandarProduct = (): ProductoEstandar => ({
  IdProductoEstandar: DEFAULT_UUID,
  IdProducto: null,
  IdCatTipoPresentacion: null,
  IdCatAplicacion: null,
  IdCatMedioTransporte: null,
  IdCatManejoTransporte: null,
  IdCatManejoAlmacenaje: null,
  CAS: null,
  FormulaQuimica: null,
  Pureza: null,
  CarateristicasFisicas: null,
  Composicion: null,
  DatosToxicologicos: null,
  IdCatEstadoFisico: null,
  IdArchivoHojaSeguridad: null,
  IdCatUso: null,
  IdArchivoFichaTecnica: null,
  IdCatRestriccionDeCompra: null,
  IdCatClasificacionRegulatoria: null,
  IdCatRestriccionFlete: null,
  IdArchivoCartaDeDisponibilidad: null,
  IdArchivoCartaDeUso: null,
  IdArchivoPermisoDeAdquisicionEnPlaza: null,
  IdArchivoPermisoDeImprotacion: null,
  IdArchivoAvisoDeQuimicosEsenciales: null,
  IdArchivoZoosanitarios: null,
  IdArchivoCicoplafest: null,
  IdArchivoOtroPermiso: null,
  TMEC: false,
  USMCA: false,
  TLCUE: false,
  AELC: false,
  NotasRegulatoriasALaImportacion: null,
  IdArchivoTratado: null,
  IdArchivoEstructuraMolecular: null,
  Sinonimos: null,
  Activo: true,
});
export const initialReactiverProduct = (): ProductoReactivo => ({
  IdProductoReactivo: DEFAULT_UUID,
  Taxonomia: null,
  IdProducto: null,
  IdCatTipoPresentacion: null,
  IdCatAplicacion: null,
  IdCatMedioTransporte: null,
  IdCatManejoTransporte: null,
  IdCatManejoAlmacenaje: null,
  FormulaQuimica: null,
  Pureza: null,
  CarateristicasFisicas: null,
  Composicion: null,
  DatosToxicologicos: null,
  IdCatEstadoFisico: null,
  IdArchivoHojaSeguridad: null,
  IdCatUso: null,
  IdArchivoFichaTecnica: null,
  IdCatRestriccionDeCompra: null,
  IdCatClasificacionRegulatoria: null,
  IdCatRestriccionFlete: null,
  IdArchivoCartaDeDisponibilidad: null,
  IdArchivoCartaDeUso: null,
  IdArchivoPermisoDeAdquisicionEnPlaza: null,
  IdArchivoPermisoDeImprotacion: null,
  IdArchivoAvisoDeQuimicosEsenciales: null,
  IdArchivoZoosanitarios: null,
  IdArchivoCicoplafest: null,
  IdArchivoOtroPermiso: null,
  TMEC: false,
  USMCA: false,
  TLCUE: false,
  AELC: false,
  NotasRegulatoriasALaImportacion: null,
  IdArchivoTratado: null,
  IdArchivoEstructuraMolecular: null,
  Sinonimos: null,
  Activo: true,
});

export interface IProductInfo extends IImageItem {
  Catalogo: string;
  Presentacion: string;
  Control: string;
  Uso: string;
  Unidad: string;
  Disponibilidad: string;
  DisponibilidadClave: string;
  Tipo: string;
  Subtipo: string;
  Controlado: boolean;
  NombreProveedor: string;
  NombreMarca: string;
  Clasificacion: string;
  Aplicacion: string;
  EstadoFisico: string;
  Nota: string;
  PrecioLista: number;
  Descripcion: string;
  FechaCaducidadVigenciaCuraduria: string;
  PrecioPorGrupo: boolean;
  NumeroDePersonasPorGrupo: number;
  PrecioPorPersona: boolean;
  FormatoPublicacion: string;
  Autor: string;
  TipoProductoClave: string;
  imagePresentation?: string;
}

export interface IProductLogisticFile {
  ArchivoHojaSeguridad: File;
  ArchivoCertificadoLote: File;
  ArchivoFichaTecnica: File;
  ArchivoTratado: File;
  OtrosTratados: Array<File>;
}

export interface IProductTechnicalCommercialInvestigation {
  ArchivoEstructuraMolecular: File;
}

export const initialLabwareProduct = (): ProductoLabware => ({
  IdProductoLabware: DEFAULT_UUID,
  IdProducto: null,
  IdCatTipoPresentacion: null,
  IdCatAplicacion: null,
  IdCatMedioTransporte: null,
  IdCatManejoTransporte: null,
  IdCatManejoAlmacenaje: null,
  FormulaQuimica: null,
  Pureza: null,
  CarateristicasFisicas: null,
  Composicion: null,
  DatosToxicologicos: null,
  IdCatEstadoFisico: null,
  IdArchivoHojaSeguridad: null,
  IdCatUso: null,
  IdArchivoFichaTecnica: null,
  IdCatRestriccionDeCompra: null,
  IdCatClasificacionRegulatoria: null,
  IdCatRestriccionFlete: null,
  IdArchivoCartaDeDisponibilidad: null,
  IdArchivoCartaDeUso: null,
  IdArchivoPermisoDeAdquisicionEnPlaza: null,
  IdArchivoPermisoDeImprotacion: null,
  IdArchivoAvisoDeQuimicosEsenciales: null,
  IdArchivoZoosanitarios: null,
  IdArchivoCicoplafest: null,
  TMEC: false,
  USMCA: false,
  TLCUE: false,
  AELC: false,
  NotasRegulatoriasALaImportacion: null,
  IdArchivoTratado: null,
  CAS: null,
  NumeroDeRegistroSanitario: null,
  Activo: true,
});

export const initialMedicalDevice = (): ProductoDispositivoMedico => ({
  Activo: true,
  IdArchivoFichaTecnica: null,
  IdArchivoHojaSeguridad: null,
  IdArchivoTratado: null,
  IdCatManejoAlmacenaje: null,
  IdCatRestriccionDeCompra: null,
  IdCatRestriccionFlete: null,
  IdProducto: null,
  IdProductoDispositivoMedico: DEFAULT_UUID,
  TLCUE: false,
  TMEC: false,
  USMCA: false,
  AELC: false,
  NumeroDeRegistroSanitario: '',
});

export const initialTrainingDevice = (): ProductoCapacitacion => ({
  Activo: true,
  DescripcionDetallada: null,
  DuracionEvento: null,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  IdCatMedioDifusion: null,
  IdProducto: null,
  IdProductoCapacitacion: DEFAULT_UUID,
  NumeroDePersonasPorGrupo: null,
  PrecioPorGrupo: false,
  PrecioPorPersona: false,
});

export interface ILinkedProducts {
  tabOptions: Array<ITabOption>;
  tabSelected: ITabOption;
  searchTerm: string;
  optionTypesSearch: Array<DropListOption>;
  selectedTypeOfSearch: DropListOption;
  optionsOfProducts: Array<SugerenciaBusqueda>;
  optionOfProductSelected: DropListOption;
  optionsOfProductsStatus: number;
  queryInfo: QueryInfo;
  productsList: Array<IVProducto>;
  totalProductResults: number;
  productsListStatus: number;
  needsToReloadLinkeds: boolean;
}
export interface IVProducto extends VProducto, IImageItem {
  ImagePresentation?: string;
  ImagePresentationHover?: string;
}
export const initialILinkedProducts = (): ILinkedProducts => ({
  tabOptions: [
    {
      id: '1',
      label: 'PRODUCTOS ALTERNATIVOS',
    },
    {
      id: '2',
      label: 'PRODUCTOS COMPLEMENTARIOS',
    },
  ],
  tabSelected: {
    id: '1',
    label: 'PRODUCTOS ALTERNATIVOS',
  },
  searchTerm: '',
  optionTypesSearch: [
    {value: '1', label: 'Catálogo'},
    {value: '2', label: 'Concepto'},
    {value: '3', label: 'CAS'},
  ],
  selectedTypeOfSearch: {value: '1', label: 'Catálogo'},
  optionsOfProducts: [],
  optionOfProductSelected: null,
  optionsOfProductsStatus: API_REQUEST_STATUS_DEFAULT,
  queryInfo: initialProductsInfo(),
  productsList: [],
  totalProductResults: 0,
  productsListStatus: API_REQUEST_STATUS_DEFAULT,
  needsToReloadLinkeds: true,
});
export const backOrderString = 'backorder';

export interface IRegulationFiles {
  ArchivoCartaDeDisponibilidad: File;
  ArchivoCartaDeUso: File;
  ArchivoPermisoDeAdquisicionEnPlaza: File;
  ArchivoPermisoDeImprotacion: File;
  ArchivoAvisoDeQuimicosEsenciales: File;
  ArchivoZoosanitarios: File;
  ArchivoCicoplafest: File;
  ArchivoOtroPermiso: File;
}
