import * as apiCatalogs from 'api-catalogos';
import {
  ArchivoDetalle,
  Flete,
  Proveedor,
  SolicitudAutorizacionCambio,
  UrlSubirArchivo,
} from 'api-catalogos';
import {ICustomerResults} from '@appModels/store/pendings/order-modification/order-modification-list/order-modification-list.model';
import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';
import * as apiLogistic from 'api-logistica';
import {CotCotizacion, TpPedido, TpPedidoFleteExpress, VTramitarPedido} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export interface IOrderModificationDetails {
  clientAddresses: Array<apiCatalogs.DireccionClienteDetalle>;
  clientContacts: Array<apiCatalogs.ContactoDetalleObj>;
  purchaseOrders: IPurchaseOrders;
  selectedPurchaseOrder: IOrdersC;
  filterByType: Array<DropListOption>;
  filterSelected: DropListOption;
  customerSelected: ICustomerResults;
  freight: Array<Flete>;
  freightProviders: Array<Proveedor>;
  freightExpressBackUp: Array<TpPedidoFleteExpress>;
  freightOrderBackUp: Flete;
  tpPedidoBackUp: TpPedido;
  openFreight: boolean;
  searchTerm: string;
  viewFileIsLoading: boolean;
  openViewFile: boolean;
  fileBase64: string;
  invoice: string;
}

export const initialOrderModificationDetailsState = (): IOrderModificationDetails => ({
  clientAddresses: [],
  clientContacts: [],
  purchaseOrders: initialIPurchaseOrders(),
  selectedPurchaseOrder: {} as IOrdersC,
  filterByType: [
    {value: '1', label: 'Todos los Pedidos'},
    {value: '2', label: 'Pedidos sin incidencias'},
    {value: '3', label: 'Pedidos con incidencias'},
  ],
  filterSelected: {value: '1', label: 'Todos los Pedidos'},
  customerSelected: {} as ICustomerResults,
  freight: [],
  freightProviders: [],
  freightExpressBackUp: [],
  freightOrderBackUp: {} as Flete,
  tpPedidoBackUp: {} as TpPedido,
  openFreight: false,
  searchTerm: '',
  viewFileIsLoading: true,
  openViewFile: false,
  fileBase64: null,
  invoice: null,
});

export interface IPurchaseOrders {
  list: Array<IOrdersC>;
  listStatus: number;
}

export const initialIPurchaseOrders = (): IPurchaseOrders => ({
  list: [],
  listStatus: API_REQUEST_STATUS_DEFAULT,
});

export interface IOrdersC extends VTramitarPedido {
  index?: number;
  isSelected: boolean;
  needsToReload?: boolean;
  allowAddFiles?: boolean;
  ocFile?: IFileUpload;
  additionalFiles?: Array<IFileUpload>;
  notes?: string;
  processSelected: DropListOption;
  purchaseOrderEntries: IPurchaseOrderItems;
  purchaseOrderDetails: IPurchaseOrderDetails;
  fileDetail?: ArchivoDetalle;
  popUpNotesIsOpen: boolean;
  codeRequest?: SolicitudAutorizacionCambio;
  code?: number[];
  shaked?: boolean;
  procedureType?: string;
  firstCodePassed?: boolean;
  isInViewQuotesLinked?: boolean;
  quotesLinked?: Array<CotCotizacion>;
  needsToReloadLinkeds?: boolean;
  listStatus?: number;
}

export interface IPurchaseOrderItems {
  list: Array<IPurchaseOrderItem>;
  listStatus: number;
}

export interface IPurchaseOrderItem extends apiLogistic.VTramitarPedidoPartidaDetalle {
  isOpen?: boolean;
  isSelected?: boolean;
}

export interface IPurchaseOrderDetails extends apiLogistic.VTramitarPedidoDetalle {
  selectedClientAddresses?: DropListOption;
  deletedClientContacts?: Array<
    apiLogistic.TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj
  >;
  needsToReload?: boolean;
  apiStatus?: number;
  IdTPPedidoToSelect?: string;
}

export interface IFreightProvider extends Proveedor {
  isSelected: boolean;
}

export const initialIOrdersC = (): IOrdersC => ({
  isSelected: false,
  needsToReload: true,
  allowAddFiles: false,
  ocFile: null,
  additionalFiles: [],
  notes: '',
  purchaseOrderEntries: {} as IPurchaseOrderItems,
  processSelected: null,
  purchaseOrderDetails: {} as IPurchaseOrderDetails,
  listStatus: API_REQUEST_STATUS_DEFAULT,
  popUpNotesIsOpen: false,
  codeRequest: {},
  code: [null, null, null, null],
  shaked: false,
});

export interface IFileUpload {
  order?: IOrdersC;
  file: File;
  fileDetail?: ArchivoDetalle;
  url?: UrlSubirArchivo;
  tempUploads?: any;
}
