import * as apiLogistic from 'api-logistica';
import {
  AjOfCondicionesdePagoCotizacion,
  AjOfEstrategiaCotizacionTactica,
  AjOfPrecioCotizacion,
  AjusteFleteExpressPartidaObj,
  AjusteMenosDosDiasPartidaObj,
  AutorizacionCodigo,
  CotPartidaCotizacionDetalle,
  QueryInfo,
  TotalClientesPorTipoAjusteDeOfertaObj,
  VClienteEVIajusteOfertaLista,
  VCotizacionesCarruselAjusteOferta,
} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {
  API_REQUEST_STATUS_DEFAULT,
  DEFAULT_UUID,
  HIGHER_VALUE,
  LOWER_VALUE,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
import {
  CatEstrategiaCotizacionSubtactica,
  CatEstrategiaCotizacionTactica,
  Proveedor,
  SolicitudAutorizacionCambio,
} from 'api-catalogos';
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';
import {IChip} from '@appModels/chip/chip';

export interface IDetailsState {
  clients: IClients;
  clientSelected: IClientAdjustmentOffer;
  contentOfferAdjustment: IContentOfferAdjustment;
  clientQuotations: IOfferAdjustmentClientQuotations;
}

export const initialDetailsState = (): IDetailsState => ({
  clients: {} as IClients,
  clientSelected: {} as IClientAdjustmentOffer,
  contentOfferAdjustment: {} as IContentOfferAdjustment,
  clientQuotations: initialIOfferAdjustmentClientQuotations(),
});
export const initialIOfferAdjustmentClientQuotations = (): IOfferAdjustmentClientQuotations => ({
  apiStatus: API_REQUEST_STATUS_DEFAULT,
  needsToReload: true,
  quotations: [],
});

export interface IOfferAdjustmentClientQuotations {
  needsToReload: boolean;
  apiStatus: number;
  quotations: Array<offerAdjustCarrousel>;
}
export interface offerAdjustCarrousel extends VCotizacionesCarruselAjusteOferta {
  index: number;
  selected: boolean;
  configApiStatus: number;
  deliveryTimeControls: any;
  offerConfig?: quotationOfferAdjustmentConfig;
  authorizationObj: IAuthorization;
}
export interface quotationOfferAdjustmentConfig {
  IdCotCotizacion: string;
  expressFreight?: Array<IConfigExpressFreight>;
  paymentConditions?: IAJofPaymentConditions;
  twoDaysConfig?: Array<AjusteMenosDosDiasPartidaObj>;
  priceConfig?: Array<IAjustePrecioPartidaObj>;
}
export interface IAjustePrecioPartidaObj {
  ajOfPrecioCotizacion?: AjOfPrecioCotizacion;
  cotPartidaCotizacionDetalle?: CotPartidaCotizacionDetalle;
  PrecioUnitarioPactadoOriginal: number;
}
export interface IAJofPaymentConditions extends AjOfCondicionesdePagoCotizacion {
  IdCatCondicionesDePagoOriginal: string;
  DiasAdicionalesOriginal: number;
}
export interface IConfigExpressFreight extends AjusteFleteExpressPartidaObj {
  showItems: boolean;
  showComments: boolean;
  originalPercentage: number;
}
export interface IClients {
  listClients: Array<IClientAdjustmentOffer>;
  totalClients: number;
  needsToReloadListClients: boolean;
  dataListClientsStatus: number;
  queryInfo: QueryInfo;
  isLoadingMoreClients: boolean;
  searchTerm: string;
  searchTypes: Array<DropListOption>;
  typeSelected: DropListOption;
  valuesFilter: Array<DropListOption>;
  valueFilterSelected: DropListOption;
  filterTabs: Array<ITabOption>;
  tabSelected: ITabOption;
}

export interface IContentOfferAdjustment {
  contentDetailsGeneral: IContentDetailsGeneral;
  paymentConditions: IPaymentConditions;
  payment: IPayment;
  adjustmentsSummary: any;
}

export interface IPaymentConditions {
  paymentConditionsSelected: DropListOption;
  confPaymentConditions: IConfPaymentConditions;
}

export interface IPayment {
  tacticsAndSubtactics: ITacticsAndSubtacticsPayment;
}

export interface IContentDetailsGeneral {
  currentClient: IClientData;
  brandSelected: IChip;
  quotationsData: Array<IClientQuotes>;
  quotationsDataStatus: number;
  catProvidersFreight: Array<ICatProvidersFreight>;
  catProvidersFreightStatus: number;
  progressBarAmountBilled: IProgressBarAmountBilled;
  reasonOfRejectionSelected: DropListOption;
  percentageBarTotalInClosing: IPercentageBarAmountTotalInClosing;
  barActivitiesOptions: Array<BarActivityOption>;
  barActivitySelected: number;
  tacticsAndSubtactics: ITacticsAndSubtactics;
  code: Array<string>;
  shaked?: boolean;
  popUpCode: boolean;
  popUpReject: boolean;
}

export interface IClientData {
  IdCliente: string;
  IdAjOfEstrategiaCotizacion: string;
  NombreCliente: string;
  TotalCotizacionesEnAjuste: number;
  TotalMarcas: number;
  TotalPartidasEnAjuste: number;
  TotalUSDPartidasEnAjuste: number;
  Index: number;
}

export interface IAuthorization {
  code: Array<string>;
  authorization: AutorizacionCodigo;
  CodigoAutorizacion: string;
  valid: boolean; // DOCS Valida si el codigo es correcto o incorrecto
  status: string; // DOCS estado para controlar los estados del codigo de seguridad dependiendo de la validacion del codigo de seguridad
}

export interface IClientQuotes {
  idClient: string;
  idAjOfQuotationStrategy: string;
  totalQuotations: number;
  quotations: Array<IQuotation>;
  quotationsStatus: number;
  needsToReloadQuotation: boolean;
}

export interface ICatProvidersFreight {
  idBrand: string;
  list: Array<IProvider>;
}

export interface IProvider extends Proveedor {
  ClaveMoneda?: string;
}

export interface IProgressBarAmountBilled {
  isLoading: boolean;
  amountBilledStatus: number;
  TotalFacturadoUSD: number;
  ObjetivoFundamentalUSD: number;
}

export interface IPercentageBarAmountTotalInClosing {
  isLoading: boolean;
  amountTotalInClosingStatus: number;
  TotalPartidasOriginales: number;
  TotalPartidasAlternativas: number;
  TotalPartidasComplementarias: number;
  TotalPartidasPromocion: number;
  TotalPartidasAhorro: number;
  ValorTotalUSDenCierre: number;
}

export interface ITacticsAndSubtactics {
  tactics: Array<CatEstrategiaCotizacionTactica>;
  tacticsStatus: number;
  needsToReloadTactics: boolean;
  subtactics: Array<CatEstrategiaCotizacionSubtactica>;
  subtacticsStatus: number;
  needsToReloadSubtactics: boolean;
}

export interface ITacticsAndSubtacticsPayment {
  price: IJustificationAndObservations;
}

export interface ITacticsAndSubtacticsDeliveryTime {
  lessThanTwoDays: IJustificationAndObservations;
  freigthExpress: IJustificationAndObservations;
}

export interface ITactics {
  tactica: IJustificationAndObservations;
  tacticaTwo?: IJustificationAndObservations;
}

export interface IJustificationAndObservations {
  subtactica: string;
  justification: string;
  observations: string;
}

export interface IClientAdjustmentOffer extends VClienteEVIajusteOfertaLista {
  Index: number;
}

export interface IConfPaymentConditions {
  confPaymentConditions: AjOfCondicionesdePagoCotizacion;
  confPaymentConditionsStatus: number;
  needsToReloadConfPaymentConditions: boolean;
  finances: boolean;
}

export interface ITotalClientesPorTipoAjusteDeOfertaObj
  extends TotalClientesPorTipoAjusteDeOfertaObj {
  Todos: number;
}

export const initialIClients = (): IClients => ({
  listClients: [],
  totalClients: 0,
  needsToReloadListClients: true,
  dataListClientsStatus: API_REQUEST_STATUS_DEFAULT,
  queryInfo: initialQueryInfo(),
  isLoadingMoreClients: false,
  searchTerm: '',
  searchTypes: [
    {label: 'Cliente', value: '1'},
    {label: 'Estrategia', value: '2'},
    {label: 'Ajuste', value: '3'},
  ],
  typeSelected: {label: 'Cliente', value: '1'},
  valuesFilter: [
    {value: '1', label: HIGHER_VALUE},
    {value: '2', label: LOWER_VALUE},
  ],
  valueFilterSelected: {value: '1', label: HIGHER_VALUE},
  filterTabs: [
    {
      id: '1',
      label: 'Todos',
      activeSubtitle: true,
      labelSubtitle: 'Clientes',
      totalSubtitle: '0',
    },
    {
      id: '2',
      label: 'T.Entrega',
      activeSubtitle: true,
      labelSubtitle: 'Clientes',
      totalSubtitle: '0',
    },
    {
      id: '3',
      label: 'C.Pago',
      activeSubtitle: true,
      labelSubtitle: 'Clientes',
      totalSubtitle: '0',
    },
    {
      id: '4',
      label: 'Precio',
      activeSubtitle: true,
      labelSubtitle: 'Clientes',
      totalSubtitle: '0',
    },
  ],
  tabSelected: {
    id: '1',
    label: 'Todos',
    activeSubtitle: true,
    labelSubtitle: 'Clientes',
    totalSubtitle: '0',
  },
});

export const initialQueryInfo = (): QueryInfo => ({
  Filters: [
    {
      NombreFiltro: 'TieneCotizaciones',
      ValorFiltro: true,
    },
  ],
  SortField: 'TotalPartidasConfirmadas',
  SortDirection: 'asc',
  desiredPage: 0,
  pageSize: PAGING_LIMIT,
});

export const initialContentOfferAdjustment = (): IContentOfferAdjustment => ({
  contentDetailsGeneral: initialIContentDetailsGeneral(),
  paymentConditions: initialIPaymentConditions(),
  payment: initialPayment(),
  adjustmentsSummary: {} as any,
});

export const initialIContentDetailsGeneral = (): IContentDetailsGeneral => ({
  currentClient: {} as IClientData,
  brandSelected: {
    value: DEFAULT_UUID,
    label: 'Todas',
    total: 0,
    active: true,
    disable: false,
    color: '#008894',
    colorDefault: '#d8d8d8',
  },
  quotationsData: [],
  quotationsDataStatus: API_REQUEST_STATUS_DEFAULT,
  catProvidersFreight: [],
  catProvidersFreightStatus: API_REQUEST_STATUS_DEFAULT,
  progressBarAmountBilled: initialIProgressBarAmountBilled(),
  reasonOfRejectionSelected: {} as DropListOption,
  percentageBarTotalInClosing: initialIPercentageBarAmountTotalInClosing(),
  barActivitiesOptions: [
    {id: 1, label: 'Tiempo de Entrega', activeSubtitle: false},
    {id: 2, label: 'Condiciones de Pago', activeSubtitle: false},
    {id: 3, label: 'Precio', activeSubtitle: false},
    {id: 4, label: 'Resumen de Ajustes', activeSubtitle: false},
  ],
  barActivitySelected: 0,
  tacticsAndSubtactics: initialITacticsAndSubtactics(),
  code: [null, null, null, null],
  shaked: false,
  popUpCode: false,
  popUpReject: false,
});

export const initialIProgressBarAmountBilled = (): IProgressBarAmountBilled => ({
  TotalFacturadoUSD: 0,
  ObjetivoFundamentalUSD: 0,
  isLoading: false,
  amountBilledStatus: API_REQUEST_STATUS_DEFAULT,
});

export const initialITacticsAndSubtactics = (): ITacticsAndSubtactics => ({
  tactics: [],
  tacticsStatus: API_REQUEST_STATUS_DEFAULT,
  needsToReloadTactics: true,
  subtactics: [],
  subtacticsStatus: API_REQUEST_STATUS_DEFAULT,
  needsToReloadSubtactics: true,
});

export const initialIPaymentConditions = (): IPaymentConditions => ({
  paymentConditionsSelected: {} as DropListOption,
  confPaymentConditions: initialIConfPaymentConditions(),
});
export const initialPayment = (): IPayment => ({
  tacticsAndSubtactics: initialITacticsAndSubtacticsPayment(),
});

export const initialITacticsAndSubtacticsPayment = (): ITacticsAndSubtacticsPayment => ({
  price: initialIJustificationAndObservations(),
});

export const initialIJustificationAndObservations = (): IJustificationAndObservations => ({
  subtactica: '',
  justification: '',
  observations: '',
});

export const initialIConfPaymentConditions = (): IConfPaymentConditions => ({
  confPaymentConditions: {} as AjOfCondicionesdePagoCotizacion,
  confPaymentConditionsStatus: API_REQUEST_STATUS_DEFAULT,
  needsToReloadConfPaymentConditions: true,
  finances: false,
});

export interface IQuotation extends apiLogistic.VCotizacionesCarruselAjusteOferta {
  isSelected: boolean;
  index: number;
  needsToReloadItemQuotation: boolean;
  itemsQuotation: Array<IItemQuotationByBrand>;
  itemsQuotationBySingle?: Array<IItemQuotation>;
  itemsQuotationStatus: number;
  currency: string;
  IdCatMoneda: string;
  listQuotationStrategyTacticOptions: Array<AjOfEstrategiaCotizacionTactica>;
  listQuotationStrategyTacticOptionsStatus: number;
  needsToReloadListQuotationStrategyTacticOptions: boolean;
  paymentConditions: IPaymentConditions;
  authorizationRequest: SolicitudAutorizacionCambio;
  formPriceGeneral?: IFormPrice;
  emailSentTo: string;
}

export interface IFormPrice {
  valueAmount: number | string;
  valuePercentage: number | string;
  price: number;
  applyToAllItems: boolean;
  comments: string;
}

export interface IItemQuotationByBrand {
  IdMarca: string;
  NombreMarca: string;
  index: number;
  activePopUpByFreight: boolean;
  activePopUpByJustification: boolean;
  isSelected: boolean;
  currentComments: string;
  JustificacionAjuste: string;
  openIncidence: boolean;
  totalOriginal: number;
  totalPromotion: number;
  totalSaving: number;
  totalAlternatives: number;
  totalComplementary: number;
  cotFleteExpressCotizacionLocal: ICotCotizacionFleteExpress;
  ajOfFleteExpressCotizacionLocal: IAjOfFleteExpressCotizacion;
  ajOfValorConfiguracionTiempoEntregaCotizacionLocal: IAjOfValorConfiguracionTiempoEntregaCotizacion;
  deliveryDayCurrent: number;
  deliveryDayAj: number;
  nameProvider: string;
  currency: string;
  activeExpressFreight: boolean;
  commentsExpressFreight: string;
  providersFreightOptions: Array<DropListOption>;
  providersFreightItemSelected: DropListOption;
  percentagesOptions: Array<DropListOption>;
  percentagesItemSelected: DropListOption;
  items: Array<IItemQuotation>;
}

export interface IItemQuotation extends apiLogistic.PartidaCotizacionCerrarOfertaObj {
  index: number;
  isSelected?: boolean;
  isChild?: boolean;
  popUpByAmount: IPopUpData;
  ajOfPrecioCotizacionLocal: IAjOfPrecioCotizacion;
  formPrice: IFormPrice;
}

export interface IPopUpData {
  isOpen: boolean;
  isInRange: boolean;
  elementId: string;
  target: HTMLElement;
  position: string;
  zIndex: number;
}

export const initialIPercentageBarAmountTotalInClosing = (): IPercentageBarAmountTotalInClosing => ({
  isLoading: false,
  amountTotalInClosingStatus: API_REQUEST_STATUS_DEFAULT,
  TotalPartidasOriginales: 0,
  TotalPartidasAlternativas: 0,
  TotalPartidasComplementarias: 0,
  TotalPartidasPromocion: 0,
  TotalPartidasAhorro: 0,
  ValorTotalUSDenCierre: 0,
});

export interface ICotCotizacionFleteExpress extends apiLogistic.CotCotizacionFleteExpress {
  isConfigured: boolean;
}
export interface IAjOfFleteExpressCotizacion extends apiLogistic.AjOfFleteExpressCotizacion {
  isConfigured: boolean;
}

export interface IAjOfPrecioCotizacion extends apiLogistic.AjOfPrecioCotizacion {
  isConfigured?: boolean;
}

export interface IAjOfValorConfiguracionTiempoEntregaCotizacion
  extends apiLogistic.AjOfValorConfiguracionTiempoEntregaCotizacion {
  isConfigured: boolean;
}

export type TypeFormExpressFreight =
  | 'activeExpressFreight'
  | 'commentsExpressFreight'
  | 'providersFreightItemSelected'
  | 'percentagesItemSelected';

export type TypeFormPrice =
  | 'typeAmount'
  | 'typePercentage'
  | 'price'
  | 'applyToAllItems'
  | 'comments';
