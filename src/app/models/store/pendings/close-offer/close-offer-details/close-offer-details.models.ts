import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption, IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {
  IAjOfQuotationStrategy,
  IBrands,
  IGeneralDataStrategy,
  initialBrands,
  initialListAjOfQuotationStrategy,
  initialQuotationStrategy,
  IQuotationStrategy,
  IQuotationStrategyData,
  IQuotationStrategyTactic,
} from '@appModels/store/pendings/strategy/strategy-details/strategy-details.model';
import * as apiCatalogs from 'api-catalogos';
import {
  CatMotivoCancelacionPartidaCotizacion,
  CatMotivoSeguimientoCotizacion,
  ProveedorMarcaObj,
  VCliente,
  VProveedor,
} from 'api-catalogos';
import {
  ClientsListItemForCloseOffer,
  ICloseOfferCustomer,
} from '@appModels/store/pendings/close-offer/close-offer-list/close-offer-list.models';
import * as apiLogistic from 'api-logistica';
import {
  AjOfCondicionesdePagoCotizacion,
  AjOfFleteExpressCotizacion,
  AjOfPrecioCotizacion,
  AjOfValorConfiguracionTiempoEntregaCotizacion,
  CotCotizacionFleteExpress,
  GMCotFletes,
  PartidaCotizacionCerrarOfertaObj,
  TipoAjustePrecioObj,
  TipoAjusteTEntregaFleteExpressObj,
  TipoAjusteTEntregaMenosDosDiasObj,
  TotalesPartidasConfiguradasMarcadas,
  VMarca,
} from 'api-logistica';
import {API_REQUEST_STATUS_DEFAULT, DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {IContact} from '@appModels/catalogos/contacto/contacto';
import {appRoutes} from '@appHelpers/core/app-routes';
import {IImageItem} from '@appModels/shared/shared.models';
import {IFreightItem} from '@appModels/table/internal-sales-item';

export interface CloseOfferDetailsState {
  clientSelected: ClientsListItemForCloseOffer;
  allowedToResume: boolean;
  isInResumeView: boolean;
  resumeSection: ResumeSection;
  searchOptions: Array<DropListOption>;
  resumeTabOptions: Array<ITabOption>;
  adjustmentTabOptions: Array<ITabOption>;
  adjustmentBurgerOptions: Array<DropListOption>;
  quotes: IQuotes;
  selectedQuote?: IQuotation;
  clientData: CustomerDetails;
  clientTotals: IClientTotals;
  brands: IBrands;
  quotationStrategy: IQuotationStrategyData;
  entriesApiStatus: number;
  clientPanelIsOpen?: boolean;
  catMotivosSeguimiento?: Array<CatMotivoSeguimientoCotizacion>;
  catMotivosCancelacion?: Array<CatMotivoCancelacionPartidaCotizacion>;
  catProveedorMarcas?: ProveedorMarcaObj;
  catPorcentajes?: Array<DropListOption>;
  contacts: Array<IContact>;
  needsToReloadContacts: boolean;
  contactsEmail: Array<IDropListMulti>;
  selectedBrand: DropListOption;
  isOpenMailPop: boolean;
  quoteBrands: Array<VMarca>;
}

export interface CustomerDetails extends VCliente, IImageItem {
  imageHover?: string;
}

// DOCS Nodo utilizado para la seccion de resumir y se resuman las partidas en cada tab
export interface ResumeSection {
  dateForPurchasePromise?: Date; // DOCS Fecha(Date) seleccionada en promesa de compra
  dateForPurchasePromiseString?: string; // DOCS Fecha(string) seleccionada en promesa de compra
  purchasePromiseJustification?: string; // DOCS Justificacion en promesa de compra
  dateForFollowing?: Date; // DOCS Fecha(Date) seleccionada en seguimiento
  dateForFollowingString?: string; // DOCS Fecha(string) seleccionada en seguimiento
  selectedFollowingReason?: DropListOption; // DOCS Razon seleccionada en seguimiento
  cancelJustification?: string; // DOCS Justicacion de cancelacion en cancelacion
  selectedCancelReason?: DropListOption; // DOCS Razon seleccionada en cancelacion
  freightIsSelected?: boolean; // DOCS Opción Flete express seleccionado en ajuste de oferta
  minusTwoDaysIsSelected?: boolean; // DOCS Opción menos 2 dias seleccionado en ajuste de oferta
  priceIsSelected?: boolean; // DOCS Opción Precio seleccionado en ajuste de oferta
  adjustmentJustification?: string; // DOCS justificacion en ajuste de oferta
  selectedAdjustmentFreight?: DropListOption; // DOCS Flete express seleccionado en ajuste de oferta
  selectedAdjustmentPercentage?: DropListOption; // DOCS porcentaje seleccionado en ajuste de oferta
  selectedAdjustmentPaymentConditions?: DropListOption; // DOCS condicion de pago seleccionada en ver resumen
  additionalDays?: number; // DOCS dias adicionales en ver resumen
  paymentConditionsJustification?: string; // DOCS justificacion de condiciones de pago en ver resumen
  paymentConditionsIsSelected?: boolean; // DOCS justificacion de condiciones de pago en ver resumen
  providerList?: Array<VProveedor>; // DOCS Catalogo de proveedores que se obtienen en la seccion resumir
  selectedProviderStep?: number; // DOCS Seleccionado para el bar-activities
  selectedProviderId?: string; // DOCS Proveedor seleccionada cuando existe mas de una
}

export interface IClientTotals extends apiLogistic.VClienteCotizaciones {
  TasaEfectividad: number;
}

export const initialQuotes = (): IQuotes => ({
  listQuotes: [],
  listQuotesStatus: API_REQUEST_STATUS_DEFAULT,
  needsToReloadQuotation: true,
});

export interface IQuotes {
  listQuotes: Array<IQuotation>;
  listQuotesStatus: number;
  needsToReloadQuotation: boolean;
}

export interface IQuotation
  extends apiLogistic.VCOCotizacionesTotalesPartidas,
    apiLogistic.VCotCotizacion,
    ICustomQuotation {}

export interface ICustomQuotation {
  isSelected?: boolean;
  index?: number;
  seeResumeActive?: boolean;
  needsToReloadGeneralData: boolean;
  generalData: IGeneralDataStrategy;
  needsToReloadContact: boolean;
  contact: IContact;
  needsToReloadItemQuotation: boolean;
  itemsQuotation?: Array<IItemQuotation>;
  entriesPercentages?: IEntriesPercentages;
  entriesTotals?: TotalesPartidasConfiguradasMarcadas;
  selectedInProgressTabOption?: ITabOption;
  selectedResumeTabOption: ITabOption;
  selectedAdjustmentTabOption: ITabOption;
  selectedDefaultSearchOption: DropListOption;
  selectedResumeSearchOption: DropListOption;
  selectedBurgerOption: DropListOption;
  defaultSearchTerm: string;
  resumeSearchTerm: string;
  claveMoneda?: string;
  expressFreight?: boolean;
  twoDays?: boolean;
  expressFreightItems: TipoAjusteTEntregaFleteExpressObj[];
  twoDaysItems: TipoAjusteTEntregaMenosDosDiasObj[];
  priceItems: ITipoAjustePrecioObj[];
  isLoadingPriceItemsAdjusted: boolean;
  freights: GMCotFletes;
  needsToReloadFreights: boolean;
}
export interface ITipoAjustePrecioObj extends TipoAjustePrecioObj, IImageItem {
  Index: string;
}
export interface IItemQuotation extends PartidaCotizacionCerrarOfertaObj {
  Index?: number;
  isSelectedInResume?: boolean;
  commentsPop?: IPopUpData;
  tracingPop?: IPopUpData;
  freightPop?: IPopUpData;
  ratePop?: IPopUpData;
  pricePop?: IPopUpData;
  popUpByAmount: IPopUpData;
  children?: Array<IItemQuotation>;
  isChild?: boolean;
  lastTracing?: apiLogistic.CotPartidaCotizacionSeguimiento;
  formPrice: IFormPrice;
  imageHover?: string;
  freightItem?: IFreightItem;
}
export interface IFormPrice {
  valueAmount: number | string;
  valuePercentage: number | string;
  price: number;
  comments: string;
}

export interface IPopUpData {
  isOpen: boolean;
  isInRange: boolean;
  elementId: string;
  target: HTMLElement;
  position: string;
  zIndex: number;
}

export interface IEntriesPercentages {
  Original?: any;
  Ahorro?: any;
  Complementaria?: any;
  Promocion?: any;
  Alternativa?: any;
}

export const initialCloseOfferDetailsState = (): CloseOfferDetailsState => ({
  isOpenMailPop: false,
  selectedBrand: {value: DEFAULT_UUID, label: 'Todas'},
  clientSelected: initialICustomer(),
  allowedToResume: false,
  isInResumeView: false,
  contacts: [],
  needsToReloadContacts: true,
  contactsEmail: [],
  resumeSection: {
    providerList: [],
    selectedProviderId: '',
    selectedProviderStep: 0,
    freightIsSelected: false,
    selectedAdjustmentPaymentConditions: null,
    paymentConditionsIsSelected: false,
    adjustmentJustification: '',
    minusTwoDaysIsSelected: false,
    priceIsSelected: false,
    additionalDays: null,
  },
  searchOptions: [
    {
      value: '1',
      label: 'Catálogo',
    },
    {
      value: '2',
      label: 'Concepto',
    },
    {
      value: '3',
      label: 'Marca',
    },
  ],
  resumeTabOptions: [
    {
      id: '1',
      label: 'SEGUIMIENTO',
    },
    {
      id: '2',
      label: 'AJUSTE DE OFERTA',
    },
    {
      id: '3',
      label: 'PROMESA DE COMPRA',
    },
    {
      id: '4',
      label: 'CANCELACIÓN',
    },
  ],
  adjustmentTabOptions: [
    {
      id: '1',
      label: 'TIEMPO DE ENTREGA',
    },
    {
      id: '2',
      label: 'CONDICIONES DE PAGO',
    },
    {
      id: '3',
      label: 'PRECIO',
    },
  ],
  adjustmentBurgerOptions: [
    {
      value: '1',
      label: 'Todos los ajustes',
    },
    {
      value: '2',
      label: 'Ajuste Aceptado',
    },
    {
      value: '3',
      label: 'Parcialmente Aceptado',
    },
    {
      value: '4',
      label: 'Ajuste Rechazado',
    },
  ],
  quotes: initialQuotes(),
  clientData: {} as CustomerDetails,
  clientTotals: {} as IClientTotals,
  brands: initialBrands(),
  quotationStrategy: initialQuotationStrategy(),
  entriesApiStatus: API_REQUEST_STATUS_DEFAULT,
  clientPanelIsOpen: false,
  catPorcentajes: [
    {
      value: '0',
      label: '0%',
    },
    {
      value: '25',
      label: '25%',
    },
    {
      value: '50',
      label: '50%',
    },
    {
      value: '75',
      label: '75%',
    },
    {
      value: '100',
      label: '100%',
    },
  ],
  quoteBrands: [],
});
export const initialICustomer = (): any => ({});
export const initialIQuotation = (): ICustomQuotation => ({
  seeResumeActive: false,
  needsToReloadGeneralData: true,
  generalData: {} as IGeneralDataStrategy,
  needsToReloadContact: true,
  contact: {} as IContact,
  needsToReloadItemQuotation: true,
  itemsQuotation: [],
  selectedInProgressTabOption: initialSelectedTabOption(),
  selectedResumeTabOption: initialSelectedTabOption(),
  selectedAdjustmentTabOption: {
    id: '1',
    label: 'TIEMPO DE ENTREGA',
  },
  selectedDefaultSearchOption: initialSelectedSearchOption(),
  selectedResumeSearchOption: initialSelectedSearchOption(),
  selectedBurgerOption: {
    value: '1',
    label: 'Todos los ajustes',
  },
  defaultSearchTerm: '',
  resumeSearchTerm: '',
  expressFreight: false,
  twoDays: false,
  expressFreightItems: [],
  twoDaysItems: [],
  priceItems: [],
  isLoadingPriceItemsAdjusted: false,
  freights: null,
  needsToReloadFreights: true,
});
export const initialSelectedSearchOption = (): DropListOption => ({
  value: '1',
  label: 'Catálogo',
});
export const initialSelectedTabOption = (): ITabOption => ({
  id: '1',
  label: 'SEGUIMIENTO',
});
export const ESTADOS_COTIZACION = {
  enviada: 'Enviada',
  enProgreso: 'EnProgreso',
  ajusteDeOferta: 'AjusteDeOferta',
  finalizada: 'Finalizada',
};
export const CONFIGIRACION_ESTADOS = {
  ConfiguracionPromesaDeCompra: 'ConfiguracionPromesaDeCompra',
  ConfiguracionFleteExpress: 'ConfiguracionFleteExpress',
  ConfiguracionCancelacionPartida: 'ConfiguracionCancelacionPartida',
  ConfiguracionSeguimiento: 'ConfiguracionSeguimiento',
};

export const SEGUIMIENTO = 'Seguimiento';
export const AJUSTE_DE_OFERTA = 'AjusteDeOferta';
export const PROMESA_DE_COMPRA = 'PromesaDeCompra';
export const CANCELACION = 'Cancelacion';

export const QUOTES_ROUTES = {
  [ESTADOS_COTIZACION.enviada]: appRoutes.closeOffer.generalDataNew,
  [ESTADOS_COTIZACION.enProgreso]: appRoutes.closeOffer.generalDataInProgress,
  [ESTADOS_COTIZACION.ajusteDeOferta]: appRoutes.closeOffer.generalDataAdjustment,
};
export const TABS = {
  1: SEGUIMIENTO,
  2: AJUSTE_DE_OFERTA,
  3: PROMESA_DE_COMPRA,
  4: CANCELACION,
};
export const SEARCH_OPTIONS = {
  Concepto: 'FiltradoPorDescripcion',
  Marca: 'FiltradoPorNombreMarca',
  Catálogo: 'Catalogo',
};

export interface AdjustmentEffect {
  resumeSection?: ResumeSection;
  quote?: IQuotation;
  itemQuotation?: IItemQuotation;
  freight?: CotCotizacionFleteExpress;
  adjustment?: AjOfFleteExpressCotizacion;
}
export const initialFormPrice: IFormPrice = {
  valueAmount: '',
  valuePercentage: '',
  price: 0,
  comments: '',
};

export const initialAjOfPrecioCotizacion: AjOfPrecioCotizacion = {
  IdAjOfPrecioCotizacion: DEFAULT_UUID,
  IdCotPartidaCotizacion: null,
  Aceptado: false,
  Activo: true,
  Comentarios: '',
  FechaRegistro: DEFAULT_DATE,
  IdAjOfRechazo: null,
  IdSolicitudAutorizacionCambio: null,
  ParcialmenteAceptado: false,
  PrecioUnitarioPactado: 0,
  Rechazado: false,
  RequiereAutorizacion: false,
};
export const initialAjOfCondicionesdePagoCotizacion: AjOfCondicionesdePagoCotizacion = {
  Aceptado: false,
  Activo: true,
  Comentarios: '',
  FechaRegistro: DEFAULT_DATE,
  IdAjOfRechazo: null,
  IdSolicitudAutorizacionCambio: null,
  Rechazado: false,
  RequiereAutorizacion: false,
  IdAjOfCondicionesDePagoCotizacion: DEFAULT_UUID,
  DiasAdicionales: 0,
  IdCotCotizacion: null,
  FechaUltimaActualizacion: DEFAULT_DATE,
  IdCatCondicionesDePago: null,
  JustificacionAjuste: '',
};
export const initialAjOfFleteExpressCotizacion: AjOfFleteExpressCotizacion = {
  Aceptado: false,
  Activo: true,
  Comentarios: '',
  FechaRegistro: DEFAULT_DATE,
  IdAjOfFleteExpressCotizacion: DEFAULT_UUID,
  IdAjOfRechazo: null,
  IdCotCotizacionFleteExpress: DEFAULT_UUID,
  IdSolicitudAutorizacionCambio: null,
  ParcialmenteAceptado: false,
  PrecioFleteExpress: 0,
  Rechazado: false,
  RequiereAutorizacion: false,
  PorcentajeProquifa: 0,
};
export const initialAjOfValorConfiguracionTiempoEntregaCotizacion: AjOfValorConfiguracionTiempoEntregaCotizacion = {
  Aceptado: false,
  Activo: true,
  Comentarios: '',
  FechaRegistro: DEFAULT_DATE,
  IdAjOfRechazo: null,
  Rechazado: false,
  IdCotCotizacion: null,
  IdAjOfValorConfiguracionTiempoEntregaCotizacion: DEFAULT_UUID,
  IdCotPartidaCotizacion: null,
  IdValorConfiguracionTiempoEntrega: null,
  TiempoEstimadoEntrega: 0,
  IdMarca: null,
};

export interface IGeneralDataClient {
  client: ICloseOfferCustomer;
  clientData: apiCatalogs.VCliente;
  typePhones: Array<apiCatalogs.CatTipoNumeroTelefonico>;
  quotation: IQuotation;
  data: IGeneralDataStrategy;
  idClient: string;
  idUser: string;
  idQuotation: string;
}

export const initialGeneralDataClient = (): IGeneralDataClient => ({
  client: {} as ICloseOfferCustomer,
  clientData: {} as apiCatalogs.VCliente,
  typePhones: [],
  quotation: {} as IQuotation,
  data: {} as IGeneralDataStrategy,
  idClient: '',
  idUser: '',
  idQuotation: '',
});

export interface IQuotationStrategyResponse extends IQuotationStrategy {
  idClient: string;
  idUser: string;
  idAjOfQuotationStrategy: string;
  listQuotationStrategyTacticOptions: Array<IQuotationStrategyTactic>;
  ajOfQuotationStrategy: IAjOfQuotationStrategy;
  Ajo2: apiLogistic.AjOfEstrategiaCotizacionTactica;
  itemSelected: DropListOption;
}

export const initialQuotationStrategyData = (): IQuotationStrategyResponse => ({
  listQuotationStrategy: [],
  listQuotationStrategyTactic: [],
  listQuotationStrategySubTactic: [],
  listQuotationStrategyTacticOptions: [],
  idClient: '',
  idUser: '',
  idAjOfQuotationStrategy: '',
  ajOfQuotationStrategy: initialListAjOfQuotationStrategy(),
  Ajo2: {} as apiLogistic.AjOfEstrategiaCotizacionTactica,
  itemSelected: {} as DropListOption,
});
