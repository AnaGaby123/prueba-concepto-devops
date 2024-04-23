import {ICustomerCheckOut} from '@appModels/store/pendings/checkout/checkout-list/checkout-list.model';
import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';
import * as apiCatalogs from 'api-catalogos';
import {SolicitudAutorizacionCambio} from 'api-catalogos';
import * as apiLogistic from 'api-logistica';
import {
  AutorizacionDetalle,
  CotPartidaCotizacionDetalle,
  GMTipoAutorizacionUsuarioDetalle,
  PpPartidaPedidoAddendaSanofi,
  TpPartidaPedido,
  TpPartidaPedidoAddendaSanofi,
  TpPedido,
  VTramitarPedidoPartida,
} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {FacturasPendientesClienteObj} from 'api-finanzas';
import {GMtpPartidascotPartidaCotizacionDetalle} from '../../../../../../../projects/api-logistica/src/lib/models/gmtp-partidascot-partida-cotizacion-detalle';
import {IFreightItem} from '@appModels/table/internal-sales-item';

export interface CheckoutDetailsState {
  clientSelected: ICustomerCheckOut;
  clientAddresses: Array<apiCatalogs.DireccionClienteDetalle>;
  clientContacts: Array<apiCatalogs.ContactoDetalleObj>;
  purchaseOrders: IPurchaseOrders;
  resumeMode: boolean;
  resumeComponent: boolean;
  selectedPurchaseOrder: IOrdersC;
  sendEmailPopUpIsOpen: boolean;
  catUnidadDeMedida: Array<DropListOption>;
  dataSlow: ISlowDetails;
  datesUnavailable: Array<string>;
  viewFileIsLoading: boolean;
  fileBase64: string;
  isPDF: boolean;
  invoice: string;
  gmTipoAutorizacionUsuarioDetalle: GMTipoAutorizacionUsuarioDetalle;
}

export const initialCheckoutDetailsState = (): CheckoutDetailsState => ({
  clientSelected: {} as ICustomerCheckOut,
  clientAddresses: [],
  clientContacts: [],
  purchaseOrders: initialIPurchaseOrders(),
  resumeMode: false,
  resumeComponent: false,
  selectedPurchaseOrder: {} as IOrdersC,
  sendEmailPopUpIsOpen: false,
  datesUnavailable: [],
  catUnidadDeMedida: [
    {
      value: 'UN',
      label: 'Unidad',
    },
    {
      value: 'PZ',
      label: 'Pieza',
    },
  ],
  dataSlow: initialISlowDetails(),
  viewFileIsLoading: true,
  fileBase64: null,
  isPDF: null,
  invoice: null,
  gmTipoAutorizacionUsuarioDetalle: initialGMTipoAutorizacionUsuarioDetalle(),
});

export interface IPurchaseOrders {
  list: Array<IOrdersC>;
  listStatus: number;
}

export const initialIPurchaseOrders = (): IPurchaseOrders => ({
  list: [],
  listStatus: API_REQUEST_STATUS_DEFAULT,
});
export const initialGMTipoAutorizacionUsuarioDetalle = (): GMTipoAutorizacionUsuarioDetalle => ({
  TipoAutorizacionUsuario: [],
  catTipoAutorizacion: null,
});

export interface IAutorizacionDetalle extends AutorizacionDetalle {
  userEmail?: string;
}

export interface IOrdersC extends apiLogistic.VTramitarPedido {
  index: number;
  isSelected: boolean;
  needsToReload?: boolean;
  purchaseOrderEntries: IPurchaseOrderItems;
  purchaseOrderDetails: IPurchaseOrderDetails;
  vTramitarPedidoPartidaDetalle?: apiLogistic.VTramitarPedidoPartidaDetalle;
  selectedFeeDate?: Date;
  selectedContactDelivery?: DropListOption;
  selectedUnidadMedida?: DropListOption;
  codeRequest?: SolicitudAutorizacionCambio;
  codeRequestEditData?: SolicitudAutorizacionCambio;
  codeRequestInvoiceInAdvance?: SolicitudAutorizacionCambio;
  codeRequestdelinquentCustomer?: SolicitudAutorizacionCambio;
  code?: number[];
  shaked?: boolean;
  procedureType?: string;
  backupTpedido?: TpPedido;
  deliveryTime?: number;
}

export interface IPurchaseOrderItems {
  list: Array<IPurchaseOrderItem>;
  listStatus: number;
  tpPartidaPedidoAddendaSanofi?: PpPartidaPedidoAddendaSanofi;
  entrySelected?: IPurchaseOrderItem;
  backupPurchaseOrder?: IPurchaseOrderItem;
}

export interface IPurchaseOrderItem
  extends VTramitarPedidoPartida,
    GMtpPartidascotPartidaCotizacionDetalle {
  isOpen?: boolean;
  tpPartidaPedido?: TpPartidaPedido;
  cotPartidaCotizacionDetalle?: CotPartidaCotizacionDetalle;
  tpPartidaPedidoAddendaSanofi?: TpPartidaPedidoAddendaSanofi;
  freightItem?: IFreightItem;
  imageHover?: string;
}
export interface IPurchaseOrderDetails extends apiLogistic.VTramitarPedidoDetalle {
  selectedClientAddresses?: DropListOption;
  deletedClientContacts?: Array<
    apiLogistic.TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj
  >;
  needsToReload?: boolean;
  apiStatus?: number;
  IdTPPedidoToSelect?: string;
  authorizationCodeRequested?: boolean;
  isCodePopPup?: boolean;
  isCodeValid?: boolean;
  isAddendaPopUpOpen?: boolean;
}

export interface ISlowDetails {
  dataPendingInvoices: FacturasPendientesClienteObj;
  needsToReloadPendingInvoices: boolean;
  dataByType: DropListOption[];
  filterByType: DropListOption;
}

export const initialISlowDetails = (): ISlowDetails => ({
  dataPendingInvoices: {} as FacturasPendientesClienteObj,
  needsToReloadPendingInvoices: true,
  dataByType: [
    {value: '1', label: 'Más Nuevas'},
    {value: '2', label: 'Más Antiguas'},
  ],
  filterByType: {value: '1', label: 'Más Nuevas'},
});
