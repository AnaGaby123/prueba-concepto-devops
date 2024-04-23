import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ICustomerResults} from '@appModels/store/pendings/purchase-promise/purchase-promise-list/purchase-promise-list.model';
import {API_REQUEST_STATUS_DEFAULT, PAGING_LIMIT} from '@appUtil/common.protocols';
import {IQueryInfoOptions} from '@appModels/store/utils/utils.model';
import * as apiCatalogs from 'api-catalogos';
import {ContactoDetalleObj} from 'api-catalogos';
import * as apiLogistic from 'api-logistica';
import {
  CorreoRecibidoClienteRequerimientoObj,
  CotCotizacion,
  GMCotFletes,
  GMPartidaPromesaDeCompra,
  GMPretramitarPromesaDeCompra,
  PartidaCotizacionControlarPromesaDeCompraObj,
  PcPartidaPromesaDeCompra,
  RestriccionMensualDatosFacturacion,
  RestriccionTemporalDatosFacturacion,
  TpPartidaPedido,
} from 'api-logistica';
import {QuoteItemExtension} from '@appModels/purchase-promise/QuoteItemExtension';
import {IFreightItem} from '@appModels/table/internal-sales-item';

export interface IPurchasePromiseDetailsState {
  productsQueryInfo: apiCatalogs.QueryInfo;
  selectedClient: IPurchasePromiseClient;
  ocBurgerOptions: Array<DropListOption>;
  dateBurgerOptions: Array<DropListOption>;
  purchaseSearchOptions: Array<DropListOption>;
  selectedOcBurgerOption: DropListOption;
  selectedDateBurgerOption: DropListOption;
  selectedPurchaseSearchOption: DropListOption;
  ocSearchTerm: string;
  runSearchTerm: string;
  purchaseSearchTerm: string;
  quotations: IPurchasePromiseQuotations;
  selectedQuotation?: IPurchasePromiseQuotation;
  purchaseOrders: IPurchasePromiseOrders;
  selectedPurchaseOrder: IPurchasePromiseOrder;
  apiStatusRequest: number;
  queryInfo: IQueryInfoOptions;
  statusApiRequest: number;
  openViewFile: boolean;
  viewFileIsLoading: boolean;
  fileBase64: string;
  productToSearch: DropListOption;
  itemList: Array<IQuoteItem>;
  statusApiItemList: number;
  optionsOfProducts: Array<apiCatalogs.SugerenciaBusqueda>;
  optionOfProductSelected: DropListOption;
  optionsOfProductsStatus: number;
  summaryListBackUp: Array<IQuoteItem>;
  summaryList: IQuotesSummary;
  selectedIquoteItemDetails?: GMPartidaPromesaDeCompra & QuoteItemExtension;
  selectedIquoteItemDetailsBackUp?: GMPartidaPromesaDeCompra & QuoteItemExtension;
  statusApiSummaryList: number;
  totals: apiLogistic.QueryResultVPromesaDeCompra;
  contact: ContactoDetalleObj;
  clientTotals: IClientTotals;
  purhasePromiseResume: PurchasePromiseResume[];
  purchaseOrderList: GMPretramitarPromesaDeCompra & QuoteItemExtension[];
  datesUnavailable: Array<string>;
  selectedFeeDate?: Date;

  valueTotalInPromise?: number;
}

export interface PurchasePromiseResume {
  IdPcPromesaDeCompra: string;
  PartidasPromesaDeCompra: IQuoteSummaryItem[];
}

export interface IPurchasePromiseClient extends ICustomerResults {
  Index: number;
}

export interface IClientTotals extends apiLogistic.VClienteCotizaciones {
  TasaEfectividad: number;
}

export interface IPurchasePromiseQuotations {
  TotalResults: number;
  Results: Array<IPurchasePromiseQuotation>;
}

export interface IPurchasePromiseOrders {
  TotalResults: number;
  Results: Array<IPurchasePromiseOrder>;
}

export interface IPurchasePromiseOrder extends apiLogistic.VPromesaDeCompra {
  selectedOrder: boolean;
  Index: number;
  seeResumeActive: boolean;
  mailData: CorreoRecibidoClienteRequerimientoObj;
}

export interface PromisePurchase extends GMPartidaPromesaDeCompra, QuoteItemExtension {}

export interface IPurchasePromiseQuotation
  extends apiLogistic.VClienteCotizacionesPromesaDeCompraCarrusel,
    GMCotFletes {
  Index: number;
  isSelected: boolean;
  items: Array<IQuoteItem>;
  needsToReloadItems: boolean;
  contact: ContactoDetalleObj;
  FleteDesglosado?: boolean;
  isSelectedFlete?: boolean;
}

export const initialPurchasePromiseDetailsState = (): IPurchasePromiseDetailsState => ({
  productsQueryInfo: {
    Filters: [],
    SortDirection: 'asc',
    SortField: 'Descripcion',
    desiredPage: 1,
    pageSize: PAGING_LIMIT,
  },
  selectedClient: {} as IPurchasePromiseClient,
  datesUnavailable: [],
  ocBurgerOptions: [
    {
      value: '1',
      label: 'Todas',
    },
    {
      value: '2',
      label: 'Con Orden',
    },
    {
      value: '3',
      label: 'Sin Orden',
    },
  ],
  dateBurgerOptions: [
    {
      value: '1',
      label: 'Mas Nuevas',
    },
    {
      value: '2',
      label: 'Mas Antiguas',
    },
  ],
  /*  purchaseSearchOptions: [
    {
      value: '1',
      label: 'Cas',
    },
    {
      value: '2',
      label: 'Cat',
    },
    {
      value: '3',
      label: 'Concepto',
    },
  ],*/
  purchaseSearchOptions: [
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
      label: 'Cas',
    },
  ],
  selectedOcBurgerOption: {
    value: '1',
    label: 'Todas',
  },
  selectedDateBurgerOption: {
    value: '1',
    label: 'Mas Nuevas',
  },
  selectedPurchaseSearchOption: {
    value: '1',
    label: 'Catálogo',
  },
  runSearchTerm: '',
  ocSearchTerm: '',
  purchaseSearchTerm: '',
  quotations: {TotalResults: 0, Results: []},
  purchaseOrders: {TotalResults: 0, Results: []},
  selectedPurchaseOrder: initialSelectedPurchaseOrder(),
  apiStatusRequest: API_REQUEST_STATUS_DEFAULT,
  queryInfo: {
    searchTerm: '',
    desiredPage: 0,
    pageSize: PAGING_LIMIT,
    requestStatus: API_REQUEST_STATUS_DEFAULT,
    dateRange: null,
  },
  statusApiRequest: API_REQUEST_STATUS_DEFAULT,
  openViewFile: false,
  viewFileIsLoading: false,
  fileBase64: null,
  productToSearch: null,
  itemList: [],
  optionsOfProducts: [],
  optionOfProductSelected: {} as DropListOption,
  optionsOfProductsStatus: API_REQUEST_STATUS_DEFAULT,
  summaryListBackUp: [],
  summaryList: {TotalResults: 0, Results: []},
  selectedIquoteItemDetails: null,
  statusApiItemList: API_REQUEST_STATUS_DEFAULT,
  statusApiSummaryList: API_REQUEST_STATUS_DEFAULT,
  totals: {TotalResults: 0, Results: []},
  contact: {} as ContactoDetalleObj,
  clientTotals: {} as IClientTotals,
  purhasePromiseResume: [],
  purchaseOrderList: [],
});
export const initialSelectedPurchaseOrder = (): IPurchasePromiseOrder => ({
  selectedOrder: false,
  Index: null,
  seeResumeActive: false,
  mailData: {} as CorreoRecibidoClienteRequerimientoObj,
});

export interface IBodyPurchaseOrders {
  Results: Array<IPurchaseOrder>;
  TotalResults: number;
}

export const initialIBodyPurchaseOrders = (): IBodyPurchaseOrders => ({
  Results: [],
  TotalResults: 0,
});

export interface IPurchaseOrder {
  Index: number;
}

export interface IQuoteItem
  extends apiLogistic.PartidaCotizacionControlarPromesaDeCompraObj,
    TpPartidaPedido,
    PcPartidaPromesaDeCompra {
  Index?: number;
  isSelected: boolean;
  label?: string;
  IdContratoCliente?: string;
  IdEmpresa?: string;
  isInViewQuotesLinked?: boolean;
  quotesLinked?: Array<CotCotizacion>;
  needsToReloadLinkeds?: boolean;
  contactDetail?: ContactoDetalleObj;
  freightItem?: IFreightItem;
  EsFleteDesglosado?: boolean;
  imageHover?: string;
  valuePriceOriginal?: number; // DOCS: Valor del precio original para validaciones únicamente

  orderSelected?: IPurchasePromiseOrder;
}

export interface IQuotesSummary {
  Results: Array<IQuoteSummaryItem>;
  TotalResults: number;
}

export interface IQuoteSummaryItem extends apiLogistic.VPartidaPromesaDeCompra {
  tempUnitPrice?: number;
  tempQuantity?: number;
  quantityInputIsOpen?: boolean;
  priceInputIsOpen?: boolean;
  incidence?: apiLogistic.PcIncidenciaPartidaPromesaDeCompra;
  isInViewQuotesLinked: boolean;
  quotesLinked: Array<CotCotizacion>;
  needsToReloadLinkeds: boolean;
}

export interface IPcPromesaDeCompraEffect {
  order: IPurchasePromiseOrder;
  items: Array<IQuoteSummaryItem>;
  client: IPurchasePromiseClient;
}

export interface IClientRestrictions {
  monthlyRestriction: RestriccionMensualDatosFacturacion;
  temporaryRestriction: Array<RestriccionTemporalDatosFacturacion>;
  isActiveTemporaryRestriction: boolean;
}
