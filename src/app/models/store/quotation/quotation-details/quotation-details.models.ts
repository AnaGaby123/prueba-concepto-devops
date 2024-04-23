import {
  Archivo,
  CatCondicionesDePago,
  ConfiguracionContratoCliente,
  QueryInfo,
  SugerenciaBusqueda,
  Usuario,
  VCliente,
  VContacto,
  VDatosFacturacionCliente,
  VDireccion,
  VProducto,
  VProductoDetalle,
} from 'api-catalogos';
import {
  ClientsListItemForQuotation,
  IClientQuotesDetails,
  ISingleQuotationDetails,
} from '@appModels/store/quotation/quotation-dashboard/quotation-dashboard.models';
import {
  IAdddProductQTY,
  IItemQuotationWithProduct,
  IProduct,
  IRelate,
  ProductSearchResult,
} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
import {
  IDetails,
  initialDetails,
} from '@appModels/store/quotation/quotation-details/details/details.models';
import {IContact} from '@appModels/catalogos/contacto/contacto';
import {API_REQUEST_STATUS_DEFAULT, DEFAULT_UUID} from '@appUtil/common.protocols';
import {DropListOption, IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {
  CorreoRecibidoClienteRequerimientoObj,
  CotCotizacionFleteExpress,
  CotPartidaInvetigacionAtencionComentariosObj,
  CotPartidasInvetigacionCotizacion,
  CotProductoOferta,
  GMCotCotizacionDetalle,
  GMCotPartidasDetalle,
  ProductoInvestigacionObj,
  ReatenderPartidaInvestigacion,
  VCotCotizacion,
  VPartidaCotizacion,
} from 'api-logistica';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {
  ICheckOutQuotation,
  IFlete,
  IFreight,
  IFreightExpress,
  initialCheckOutQuotation,
} from '@appModels/store/quotation/quotation-details/details/sections/check-out-quotation.models';
import {
  initialProduct,
  Product,
} from '@appModels/store/quotation/quotation-details/details/sections/offline-product.models';
import {
  INewClientForm,
  initialNewClientFormState,
} from '@appModels/store/quotation/quotation-details/details/sections/new-customer-quotes.models';
import {IVClient} from '@appModels/store/forms/clients-form/clients-list-form/clients-list-form.models';
import {IImageItem} from '@appModels/shared/shared.models';
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';
import {IFreightItem} from '@appModels/table/internal-sales-item';

export interface QuotationDetailsState {
  selectedClient: ClientsListItemForQuotation;
  quotationsList: Array<IQuotation>;
  selectedQuotation: IQuotation;
  quotationItemsSearchFilters: QuotationSearchFilters /* DOCS: Filtros de búsqueda para las partidas */;
  productsSearchResults: Array<ProductSearchResult>; // DOCS: Productos resultados de la búsqueda
  productsSearchResultsStatus: number;
  singleQuotationDetails: ISingleQuotationDetails;
  generalData: QuotationClientInfo;
  generalDataStatus: number;
  itemsQuotation: Array<IItemQuotationWithProduct>;
  itemsQuotationStatus: number;
  contacts: Array<IContact>;
  needsToReloadContacts: boolean;
  itemsQuotationForRemove: Array<IItemQuotationWithProduct>;
  saveQuotationStatus: number;
  contactsEmail: Array<IDropListMulti>;
  details: IDetails;
  resumeSection: ICheckOutQuotation;
  offlineProductSection: Product;
  newCustomerSection: INewClientForm;
  quotationPdfSection: QuotationPdfSection;
  isLinkNewClientPopUpOpen?: boolean;
  isLinkAddNewClientPopUpOpen?: boolean;
  isLinkAddNewClientPopUpSuccess?: boolean;
  searchTermClient: string;
  clientsList: IQueryResultVCliente;
  clientListStatus: number;
  selectedProduct: ProductSearchResult;
  investigationProductPopUp: ICotPartidasInvetigacionCotizacion;
  investigationProductPopUpIsOpen: boolean; // DOCS Abre el pop del detalle de producto de investigacion
  isOpenDetailsProductInvestigation: boolean; // DOCS Abre el pop de una investigacion atendida
  attendedInvestigationData: ICotPartidaInvetigacionAtencionComentariosObj;
  reattendedInvestigation: ReatenderPartidaInvestigacion;
  activeErrorAddress: boolean;
}

export interface QuotationPdfSection {
  base64FileStatus: number;
  base64FileInvestigationStatus: number;
  base64File: string;
  base64FileInvestigation: string;
  quotationSelectedPdf: VCotCotizacion;
  isLinkedQuote: boolean;
}

export interface IQuotation extends VCotCotizacion {
  index?: number;
  isSelected?: boolean;
  selectedQuotationDetails?: IGMCotCotizacionDetalle;
  clientInfo?: QuotationClientInfo;
  needsToReloadInfo?: boolean;
  needsToReloadItemsQuotation?: boolean;
  needsToReloadItemsInvestigationQuotation?: boolean;
  itemsQuotation?: Array<IItemQuotationWithProduct>;
  needsToReloadMailData?: boolean;
  needsToReloadOffLineProducts?: boolean;
  mailData?: CorreoRecibidoClienteRequerimientoObj;
  freights?: IFreight;
  freightSelected?: IFlete;
  freightExpressSelected?: IFreightExpress;
  freightSteps?: BarActivityOption[];
  productDataInvestigation?: IInvestigationProductData;
}
export interface IQueryResultVCliente {
  Results?: Array<IVClient>;
  TotalResults?: number;
}
export interface IGMCotCotizacionDetalle extends GMCotCotizacionDetalle {
  CotPartidasCotizacion?: Array<IGMCotPartidasDetalle>;
  CotPartidasInvetigacionCotizacion?: Array<ICotPartidasInvetigacionCotizacion>;
  selectedProduct?: IGMCotPartidasDetalle;
}

// DOCS Interfaces extendidas para armar el nombre de la familia y la imagen de la marca de CotPartidasCotizacion
export interface IGMCotPartidasDetalle extends GMCotPartidasDetalle {
  product?: ProductSearchResult; // DOCS Esta propiedad existe cuando es un producto recien agregado del listado o partida de ahorro
  VPartidaCotizacion?: IVPartidaCotizacion;
  vProductoDetalle?: VProductoDetalle;
  CotProductoOferta?: ICotProductoOferta;
  Index?: number;
  selected?: boolean;
  proratedFreightTotal?: number;
  freightItem?: IFreightItem;
}
export interface IVPartidaCotizacion extends VPartidaCotizacion, IImageItem {
  fullFamilyName?: string;
}
export interface ICotProductoOferta extends CotProductoOferta {
  totalPrice?: number;
  subtotalPrice?: number;
  freightTotal?: number;
  ivaTotal?: number;
}

// DOCS Interfaces extendidas para armar el nombre de la familia y la imagen de la marca de CotPartidasInvetigacionCotizacion
export interface ICotPartidasInvetigacionCotizacion extends CotPartidasInvetigacionCotizacion {
  ProductoInvestigacionObj?: IProductoInvestigacionObj;
  evidenceFile?: Archivo;
  producto?: VProducto;
}
export interface IInvestigationProductData {
  ConfiguracionContratoCliente?: ConfiguracionContratoCliente;
  product?: ProductSearchResult;
}
export interface ICotPartidaInvetigacionAtencionComentariosObj
  extends CotPartidaInvetigacionAtencionComentariosObj {
  Producto?: IVProducto;
}
export interface IVProducto extends VProducto, IImageItem, ConfiguracionContratoCliente {
  fullFamilyName?: string;
}
export interface IProductoInvestigacionObj extends ProductoInvestigacionObj, IImageItem {
  fullFamilyName?: string;
  Index?: number;
}
export interface QuotationItemCombined extends IGMCotPartidasDetalle, CotCotizacionFleteExpress {
  needsToReloadProduct?: boolean;
  Index?: number;
  activeInputControlled?: boolean;
}
export interface QuotationClientInfo {
  client?: VCliente;
  contact?: VContacto;
  billingData?: VDatosFacturacionCliente;
  paymentConditions?: CatCondicionesDePago;
  user?: Usuario;
  address?: Array<VDireccion>;
  addressSelected?: VDireccion;
}

export interface QuotationSearchFilters {
  searchTypesOptions: Array<DropListOption>; // DOCS: Opciones (campos) de búsqueda en el SearchComponent
  typeDelivery: Array<DropListOption>; // DOCS: Opciones (campos) de búsqueda en el SearchComponent
  searchTypeSelectedOption: DropListOption; // DOCS: Opción seleccionada del SearchComponent
  selectedBrandFilter: DropListOption; // DOCS: Marca seleccionada del Drop
  selectedLineFilter: DropListOption; // DOCS: Linea seleccionada del Drop
  selectedProductTypeFilter: DropListOption; // DOCS: Tipo de producto seleccionado del Drop
  productsQueryInfo: QueryInfo;
  listProducts: Array<IProduct>;
  listProductsStatus: number;
  total: number;
  options: Array<ITabOption>;
  optionSelected: ITabOption;
  runSearchTerm: string;
  searchTerm: string;
  productSuggestionResults: Array<SugerenciaBusqueda>;
  productSuggestionResultsStatus: number;
  optionOfProductSelected: DropListOption;
  linkedQuotes: IRelate;
  base64File: string;
  modalIsOpenResendQuotation: boolean;
  viewFileIsLoading: boolean;
}

export interface IGeneralDataQuotation {
  clientName: string;
  totalQuotations?: string;
  incomeLevel: string;
  category: string;
  route: string;
  whoBills: string;
  paymentConditions: string;
  assignedUser: string;
  folio: string;
  sendGuide: string;
  acceptPartial: string;
  sector?: string;
  industry?: string;
}

export interface IContactQuotation {
  contactName: string;
  email: string;
  phone1: string;
  phone2: string;
  mobile: string;
  department: string;
  position: string;
  decisionLevel: string;
  descriptionPosition: string;
}

export interface ISaveItemQuotation {
  cotProductoOferta: CotProductoOferta;
  product: IAdddProductQTY;
  quotation: IClientQuotesDetails;
  idQuotation: string;
  idQuotationState: string;
  idItemQuotationType: string;
  idDeliveryRoutes: string;
  isNewProduct: boolean;
  itemNumber: number;
  items: Array<number>;
  currencyCurrent: {value: string; label: string};
}
export interface IItemToRemove {
  name: string;
  index: number;
}

export const initialSaveItemQuotation = (): ISaveItemQuotation => ({
  cotProductoOferta: {} as CotProductoOferta,
  product: {} as IAdddProductQTY,
  quotation: {} as IClientQuotesDetails,
  idQuotation: '',
  idQuotationState: '',
  idItemQuotationType: '',
  idDeliveryRoutes: '',
  isNewProduct: false,
  itemNumber: 0,
  items: [],
  currencyCurrent: {value: '', label: ''},
});

export const initialQuotationDetails = (): QuotationDetailsState => ({
  selectedClient: null, //  testing // TestinG,
  quotationsList: [],
  selectedQuotation: null,
  quotationItemsSearchFilters: initialQuotationSearchFilters(),
  productsSearchResults: [],
  productsSearchResultsStatus: API_REQUEST_STATUS_DEFAULT,
  singleQuotationDetails: {} as ISingleQuotationDetails,
  generalData: {} as QuotationClientInfo,
  generalDataStatus: API_REQUEST_STATUS_DEFAULT,
  itemsQuotation: [],
  itemsQuotationStatus: API_REQUEST_STATUS_DEFAULT,
  contacts: [],
  needsToReloadContacts: true,
  itemsQuotationForRemove: [],
  saveQuotationStatus: API_REQUEST_STATUS_DEFAULT,
  contactsEmail: [],
  details: initialDetails(),
  resumeSection: initialCheckOutQuotation(),
  offlineProductSection: initialProduct(),
  quotationPdfSection: initialQuotationPdfSection(),
  newCustomerSection: initialNewClientFormState(),
  isLinkAddNewClientPopUpOpen: false,
  isLinkAddNewClientPopUpSuccess: false,
  isLinkNewClientPopUpOpen: false,
  searchTermClient: '',
  clientsList: {
    Results: [],
    TotalResults: 0,
  },
  clientListStatus: API_REQUEST_STATUS_DEFAULT,
  selectedProduct: null,
  investigationProductPopUp: null,
  investigationProductPopUpIsOpen: false,
  isOpenDetailsProductInvestigation: false,
  attendedInvestigationData: null,
  reattendedInvestigation: {
    Comentario: '',
    IdCotPartidaCotizacionInvestigacion: null,
  },
  activeErrorAddress: false,
});

export const initialQuotationPdfSection = (): QuotationPdfSection => ({
  isLinkedQuote: false,
  quotationSelectedPdf: null,
  base64File: null,
  base64FileInvestigation: null,
  base64FileStatus: API_REQUEST_STATUS_DEFAULT,
  base64FileInvestigationStatus: API_REQUEST_STATUS_DEFAULT,
});

export const initialQuotationSearchFilters = (): QuotationSearchFilters => ({
  productsQueryInfo: {
    Filters: [],
    SortDirection: 'asc',
    desiredPage: 1,
    pageSize: 12,
  },
  listProducts: [],
  listProductsStatus: API_REQUEST_STATUS_DEFAULT,
  total: 0,
  selectedBrandFilter: {value: DEFAULT_UUID, label: 'Todas las Marcas'},
  selectedLineFilter: {value: DEFAULT_UUID, label: 'Todas las Lineas'},
  selectedProductTypeFilter: {value: DEFAULT_UUID, label: 'Todos los Tipos'},
  options: [
    {id: '1', label: 'FICHA TÉCNICA'},
    {id: '2', label: 'ALTERNATIVOS'},
    {id: '3', label: 'COMPLEMENTARIOS'},
  ],
  optionSelected: {id: '1', label: 'FICHA TÉCNICA'},
  runSearchTerm: '',
  searchTerm: '',
  productSuggestionResults: [],
  productSuggestionResultsStatus: API_REQUEST_STATUS_DEFAULT,
  optionOfProductSelected: {} as DropListOption,
  linkedQuotes: {
    folio: '',
    idArchivo: '',
    idCotCotizacion: '',
    needsToReload: true,
    title: '',
  },
  base64File: null,
  modalIsOpenResendQuotation: false,
  searchTypesOptions: [
    {value: '1', label: 'Catálogo'},
    {value: '2', label: 'Concepto'},
    {value: '3', label: 'Marca'},
    {value: '4', label: 'CAS'},
  ],
  searchTypeSelectedOption: {value: '1', label: 'Catálogo'},
  viewFileIsLoading: true,
  typeDelivery: [
    {label: 'Entrega conforme disponibilidad', value: 'EntregaConformeDisponibilidad'},
    {label: 'Única', value: 'Unica'},
  ],
});

export enum ENUM_STATUS_INVESTIGATION_ITEM {
  ATTENDED = 'atendida',
  FINALIZED = 'finalizada',
}
export enum ENUM_CLIENT_SECTOR {
  PUBLIC = 'publico',
  PRIVATE = 'privado',
}
export enum ENUM_BILLING_RESTRICTIONS {
  LIMITPIECES = 'limitedepiezas',
  NONE = 'ninguna',
  PERDISTRIBUTION = 'pordistribucion',
}
export enum ENUM_TYPE_QUOTATION {
  TOTAL = 'total',
  PARTIAL = 'parcial',
}
