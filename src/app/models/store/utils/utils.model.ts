/* State Imports */
import {AppState} from '@appCore/core.state';
/* Models Imports */
import {IFilterDate} from '@appModels/filters/Filters';
import {ColumnNotes} from '@appModels/table/internal-sales-item';

export const initialUtilsState = (): UtilsState => ({
  loading: false,
  menuIsOpen: false,
  submenuIsOpen: false,
  mainMenuOptions: [],
  modalError: {modalIsOpen: false, message: ''},
  modalSuccess: {modalIsOpen: false, message: ''},
  modalFile: {base64File: '', titleHeader: '', isLoading: false, modalIsOpen: false},
  nonWorkingDays: [],
  viewType: AppViewTypes.small,
  screenSize: null,
  appVersion: null,
  notesPop: null,
});

export interface State extends AppState {
  utils: UtilsState;
}

export interface IModel {
  modalIsOpen: boolean;
  message?: string;
  extraMessage?: string;
  successText?: string;
}

export interface IPopFile {
  modalIsOpen: boolean;
  base64File: string;
  titleHeader: string;
  isLoading: boolean;
}
export interface IPopNotes {
  modalIsOpen: boolean;
  notes: ColumnNotes;
}

export interface IQueryInfoOptions {
  searchTerm: string;
  desiredPage: number;
  pageSize: number;
  requestStatus: number;
  dateRange: IFilterDate;
  reloadStates?: boolean;
}

// DOCS: Nuevas interfaces para el menu

export interface UtilsState {
  loading: boolean;
  menuIsOpen: boolean;
  submenuIsOpen: boolean;
  mainMenuOptions: Array<IMenuOption>;
  modalError: IModel;
  modalSuccess: IModel;
  modalFile: IPopFile;
  notesPop: IPopNotes;
  nonWorkingDays: Array<string>;
  viewType: string;
  screenSize: number;
  appVersion: string;
}

export interface IMenuOption {
  active: boolean;
  allowedFunctions: Array<string>;
  allowedRoles: Array<string>;
  childRoutes?: Array<string>;
  containOptions: boolean;
  showSubmenu?: boolean;
  imagePath?: string;
  options?: Array<IMenuOption>;
  order?: number;
  title: string;
  total?: number | string;
  url: string;
  key?: string;
}

export interface IFetchMoreItemsInfo {
  itemList: Array<any>;
  itemsTotalLength: number;
  listRequestStatus: number;
  desiredPage: number;
  pageSize: number;
  totalPages: number;
}

export enum AppViewTypes {
  small = 'small',
  standard = 'standard',
}

export enum SortOptionsDashboard {
  MasAntiguas = 'Más Antiguas',
  MasNuevas = 'Más Nuevas',
}

export enum SortOptionsFiltersPqf {
  newer = 'Más Nuevos',
  older = 'Más Antiguos',
  enable = 'Habilitadas',
  disable = 'Deshabilitadas',
}

// DOCS: Enums para lógica relacionada a SignalR
export enum moduleMethodCounter {
  mailbox = 'getMailboxCounter',
  quoter = 'getQuoterCounter',
  strategy = 'getAttendCloserCounter',
  dailyMeeting = 'getDailyMeetingCounter',
  closeOffer = 'getCloseOfferCounter',
  offerAdjustment = 'getOfferAdjustmentCounter',
  followPurchasePromise = 'getFollowPurchasePromiseCounter',
  purchasePromise = 'getPurchasePromiseCounter',
  preProcess = 'getPreProcessCounter',
  notProcessed = 'getNotProcessedCounter',
  generalSummary = 'getGeneralSummaryCounter',
  validateAdjustment = 'getValidateAdjustmentCounter',
  checkout = 'getCheckoutCounter',
  attendInvestigation = 'getAttendInvestigationCounter',
  regulatoryResearch = 'getRegulatoryResearchCounter',
  purchasingConfiguration = 'getPurchasingConfigurationCounter',
  logisticConfiguration = 'getLogisticConfigurationCounter',
  salesConfiguration = 'getSalesConfigurationCounter',
}
export enum actionsMenuCounter {
  mailbox = 'UPDATE_MAILBOX_COUNTER',
  quoter = 'UPDATE_QUOTER_COUNTER',
  strategy = 'UPDATE_ATTEND_CLOSING_COUNTER',
  dailyMeeting = 'UPDATE_DAILY_MEETING_COUNTER',
  closeOffer = 'UPDATE_CLOSE_OFFER_COUNTER',
  followPurchasePromise = 'UPDATE_FOLLOW_PURCHASE_PROMISE_COUNTER',
  purchasePromise = 'UPDATE_PURCHASE_PROMISE_COUNTER',
  preProcess = 'UPDATE_PRE_PROCESS_COUNTER',
  notProcessed = 'UPDATE_NOT_PROCESSED_COUNTER',
  validateAdjustment = 'UPDATE_VALIDATE_ADJUSTMENT_COUNTER',
  checkout = 'UPDATE_CHECKOUT_COUNTER',
  offerAdjustment = 'UPDATE_OFFER_ADJUSTMENT_COUNTER',
  attendInvestigation = 'UPDATE_ATTEND_INVESTIGATION_COUNTER',
  regulatoryResearch = 'UPDATE_REGULATORY_RESEARCH_COUNTER',
  purchasingConfiguration = 'UPDATE_PURCHASING_CONFIGURATION_COUNTER',
  salesConfiguration = 'UPDATE_SALES_CONFIGURATION_COUNTER',
  logisticConfiguration = 'UPDATE_LOGISTIC_CONFIGURATION_COUNTER',
  generalSummary = 'UPDATE_GENERAL_SUMMARY_COUNTER',
}
export enum synchronizersSignalR {
  mailbox = 'sincronizarContadorBuzon',
  quoter = 'sincronizarContadorCotizacion',
  strategy = 'sincronizarContadorAtenderCierre',
  closeOffer = 'sincronizarContadorCerrarOferta',
  dailyMeeting = 'sincronizarContadorJuntaDiaria',
  followPurchasePromise = 'sincronizarSeguimientoPromesaDeCompra',
  preProcess = 'sincronizarContadorPretramitarPedido',
  notProcessed = 'sincronizarContadorGestionarPedidoIntramitable',
  checkout = 'sincronizarContadorTramitarPedido',
  purchasePromise = 'sincronizarContadorAtenderPromesaDeCompra',
  offerAdjustment = 'sincronizarContadorAjustarOferta',
  validateAdjustment = 'sincronizarValidarAjusteOC',
  attendInvestigation = 'sincronizarInvestigacionTecnicoComercial',
  regulatoryResearch = 'sincronizarDeterminarFamilia',
  purchasingConfiguration = 'sincronizarConfiguracionCompras',
  salesConfiguration = 'sincronizarConfiguracionVentas',
  logisticConfiguration = 'sincronizarConfiguracionLogistica',
  generalSummary = 'sincronizarContadorResumenGeneral',
}
export enum pengingsCounter {
  mailbox = 'contadorBuzon',
  quoter = 'contadorCotizacion',
  strategy = 'contadorAtenderCierre',
  closeOffer = 'contadorCerrarOferta',
  dailyMeeting = 'contadorJuntaDiaria',
  followPurchasePromise = 'contadorSeguimientoPromesaDeCompra',
  preProcess = 'contadorPretramitarPedido',
  notProcessed = 'contadorGestionarPedidoIntramitable',
  checkout = 'contadorTramitarPedido',
  purchasePromise = 'contadorAtenderPromesaDeCompra',
  offerAdjustment = 'contadorAjustarOferta',
  validateAdjustment = 'contadorValidarAjusteOC',
  attendInvestigation = 'contadorInvestigacionTecnicoComercial',
  regulatoryResearch = 'contadorDeterminarFamilia',
  purchasingConfiguration = 'contadorConfiguracionCompras',
  salesConfiguration = 'contadorConfiguracionVentas',
  logisticConfiguration = 'contadorConfiguracionLogistica',
  generalSummary = 'contadortotalResumenGeneral',
}
export enum updatePendingsCounter {
  mailbox = 'ActualizarContadorBuzon',
  quoter = 'ActualizarContadorCotizacion',
  strategy = 'ActualizarContadorAtenderCierre',
  closeOffer = 'ActualizarContadorCerrarOferta',
  dailyMeeting = 'ActualizarContadorJuntaDiaria',
  followPurchasePromise = 'ActualizarContadorSeguimientoPromesaDeCompra',
  preProcess = 'ActualizarContadorPretramitarPedido',
  notProcessed = 'ActualizarContadorGestionarPedidoIntramitable',
  checkout = 'ActualizarContadorTramitarPedido',
  purchasePromise = 'ActualizarContadorAtenderPromesaDeCompra',
  offerAdjustment = 'ActualizarContadorAjustarOferta',
  validateAdjustment = 'ActualizarContadorValidarAjusteOC',
  attendInvestigation = 'ActualizarContadorInvestigacionTecnicoComercial',
  regulatoryResearch = 'ActualizarContadorDeterminarFamilia',
  purchasingConfiguration = 'ActualizarContadorConfiguracionCompras',
  salesConfiguration = 'ActualizarContadorConfiguracionVentas',
  logisticConfiguration = 'ActualizarContadorConfiguracionLogistica',
  generalSummary = 'ActualizarContadorResumenGeneral',
}
export enum pendingsKeys {
  mailbox = 'mailbox',
  quoter = 'quoter',
  strategy = 'strategy',
  closeOffer = 'closeOffer',
  dailyMeeting = 'dailyMeeting',
  followPurchasePromise = 'followPurchasePromise',
  preProcess = 'preProcess',
  notProcessed = 'notProcessed',
  checkout = 'checkout',
  purchasePromise = 'purchasePromise',
  offerAdjustment = 'offerAdjustment',
  validateAdjustment = 'validateAdjustment',
  attendInvestigation = 'attendInvestigation',
  regulatoryResearch = 'regulatoryResearch',
  purchasingConfiguration = 'purchasingConfiguration',
  salesConfiguration = 'salesConfiguration',
  logisticConfiguration = 'logisticConfiguration',
  generalSummary = 'generalSummary',
}
