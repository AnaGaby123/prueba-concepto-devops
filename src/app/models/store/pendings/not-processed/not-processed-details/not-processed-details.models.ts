import {
  CorreoRecibidoClienteRequerimientoObj,
  GMCotCotizacionDetalle,
  GMCotPartidasDetalle,
  GMPPedidoGeneraCotizacion,
  GMPPPedidoRecalcular,
  GMTipoAutorizacionUsuarioDetalle,
  PpPedidoCorreoEnviado,
  PretramitarPedidoPartidaObj,
  QueryResultPpPartidaPedidoDetalle,
  TpPedidoCorreoOcNoAmparada,
  VClienteppPedidoObj,
  VDireccion,
  VPpPedidoObj,
} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';
import {ContactoDetalleObj, CorreoEnviado, Usuario} from 'api-catalogos';
import {IFreightItem} from '@appModels/table/internal-sales-item';
import {ShoppingCartTotalsModel} from '@appModels/quotation/ShoppingCartTotals.model';
import {IConceptItemQuote} from '@appModels/shared-components/concept-item-quote';

export interface NotProcessedDetailsState {
  gmTipoAutorizacionUsuarioDetalle: GMTipoAutorizacionUsuarioDetalle;
  clientNotProcessedSelected: ICustomer;
  deliveryAddress: VDireccion[];
  purchaseOrder: IPurchaseOrder;
  gMCotCotizacionDetalle: GMCotCotizacionDetalle;
  isReconfigureFreightPopUpOpen: boolean;
  isGenerateQuotationPopUpOpen: boolean;
}

export interface IPpPartidaPedidoObjNotProcess extends PretramitarPedidoPartidaObj {
  ListaPPPartidaPedidoOriginales?: IPpPartidaPedidoObjNotProcess[];
  validity?: string;
  quantityInputIsOpen?: boolean;
  priceInputIsOpen?: boolean;
  isNegative?: boolean;
  percentage?: number;
  freightItem?: IFreightItem;
  imageHover?: string;
  tempUnitPrice?: number;
  tempQuantity?: number;
  conceptQuote?: IConceptItemQuote;
  hasInheritIncidences?: boolean;
  isInViewQuotesLinked?: boolean;
  needsToReloadLinkeds?: boolean;
  quotesLinked?: any[];
}

export const initialNotProcessedDetailsState = (): NotProcessedDetailsState => ({
  gmTipoAutorizacionUsuarioDetalle: initialGMTipoAutorizacionUsuarioDetalle(),
  deliveryAddress: [],
  clientNotProcessedSelected: initialICustomerNotProcess(),
  purchaseOrder: initialIPurchaseOrder(),
  gMCotCotizacionDetalle: {},
  isReconfigureFreightPopUpOpen: false,
  isGenerateQuotationPopUpOpen: false,
});

export interface IPurchaseOrder {
  apiStatus: number;
  apiStatusMail: number;
  apiStatusItems: number;
  fileBase64: string;
  filterSelected: DropListOption;
  filters: Array<DropListOption>;
  invoice: string;
  keyPadOptions: Array<DropListOption>;
  keyPadSelected: DropListOption;
  openViewFile: boolean;
  orderSelected: IOrderNotProcessed;
  orderSelectedBackup: IOrderNotProcessed;
  orders: IPurchase;
  termSearch: string;
  viewFileIsLoading: boolean;
  deliveryType: DropListOption[];
}

export interface INotProcessedEffect {
  orderSelected: IOrderNotProcessed;
  correoEnviado?: CorreoEnviado;
  tpPedidoCorreoOcNoAmparada?: TpPedidoCorreoOcNoAmparada;
  ppPedidoCorreoEnviado?: PpPedidoCorreoEnviado;
}

export const initialIPurchaseOrder = (): IPurchaseOrder => ({
  orders: {
    TotalResults: 0,
    Results: [],
  },
  orderSelected: {} as IOrderNotProcessed,
  orderSelectedBackup: {} as IOrderNotProcessed,
  keyPadOptions: [
    {label: 'Todas', value: '1'},
    {label: 'Con Orden', value: '2'},
    {label: 'Sin Orden', value: '3'},
  ],
  keyPadSelected: {label: 'Todas', value: '1'},
  filters: [
    {
      value: '1',
      label: 'Todas las FEAS',
    },
    {
      value: '2',
      label: 'FEA a Tiempo',
    },
    {
      value: '3',
      label: 'FEA Fuera de Tiempo',
    },
    {
      value: '4',
      label: 'FEA por Vencer',
    },
    {
      value: '5',
      label: 'Sin FEA',
    },
  ],
  filterSelected: {
    value: '1',
    label: 'Todas las FEAS',
  },
  apiStatus: API_REQUEST_STATUS_DEFAULT,
  apiStatusMail: API_REQUEST_STATUS_DEFAULT,
  apiStatusItems: API_REQUEST_STATUS_DEFAULT,
  termSearch: null,
  openViewFile: false,
  fileBase64: null,
  viewFileIsLoading: true,
  invoice: null,
  deliveryType: [
    {label: 'Conforme a disponibilidad', value: 'ConformeADisponibilidad'},
    {label: 'Única', value: 'Unica'},
  ],
});
export const initialGMTipoAutorizacionUsuarioDetalle = (): GMTipoAutorizacionUsuarioDetalle => ({
  TipoAutorizacionUsuario: [],
  catTipoAutorizacion: null,
});

export interface IPurchase {
  Results?: Array<IOrderNotProcessed>;
  TotalResults?: number;
}

export interface IOrderNotProcessed extends VPpPedidoObj {
  Index?: number;
  // selectedPpPedidoContactForDrop?: IDropListMulti;
  // selectedDeliveryContactForDrop?: IDropListMulti;
  FechaEstimadaAjusteAux?: string;
  FechaEstimadaAjusteDate?: Date;
  mailData: CorreoRecibidoClienteRequerimientoObj;
  user: Usuario;
  items: IDataItem;
  itemsBackup?: IDataItem;
  itemsReconfigureFreight?: Array<GMCotPartidasDetalle>;
  totalAmount: ShoppingCartTotalsModel;
  // ppPedidoInstruccionesEntrega: PpPedidoInstruccionesEntrega;
  ppPedidoInstruccionesEntrega: string; //TODO: SE COMENTA DEBIDO A CAMBIOS FUERTES EN LA API, VERIFICAR SI SE VA A CAMBIAR O ELIMINAR
  needsToReload?: boolean;
  IdTPPedidoToSelect?: string;
  gmPPPedidoRecalcular?: GMPPPedidoRecalcular;
  gmPPedidoGeneraCotizacion?: GMPPedidoGeneraCotizacion;
  deliveryTypeSelected?: DropListOption;
  contact?: string;
}

export interface ICustomer extends VClienteppPedidoObj {
  selectedClient?: VClienteppPedidoObj;
  level: string;
  contacts?: ContactoDetalleObj[];
  NombreImagen: string;
  Categoria: string;
  imageHover: string;
  TramitarConOrdenDeCompraInterna?: boolean;
  TramitarSinOrdenDeCompra?: boolean;
}

export const initialICustomerNotProcess = (): ICustomer => ({
  Categoria: null,
  NombreImagen: null,
  TramitarConOrdenDeCompraInterna: false,
  TramitarSinOrdenDeCompra: false,
  contacts: [],
  imageHover: null,
  level: null,
});

export interface IDataItem extends QueryResultPpPartidaPedidoDetalle {
  Results: Array<IPpPartidaPedidoObjNotProcess>;
}

export const initialTotalAmountNotProcess = (): ShoppingCartTotalsModel => ({
  totalPriceQuotation: 0,
  subTotal: 0,
  totalTax: 0,
});
