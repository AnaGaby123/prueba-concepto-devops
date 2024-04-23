import {CustomerList} from '@appModels/store/pre-processing/preprocess-order-dashboard/preprocess-order-dashboard.models';
import {
  CorreoRecibidoClienteRequerimientoObj,
  CotPartidaCotizacionCapacitacionFecha,
  PpPedidoFleteExpressObj,
  RestriccionMensualDatosFacturacion,
  RestriccionTemporalDatosFacturacion,
  VCotCotizacion,
  VPpPedidoObj,
} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';
import {Usuario, VDireccion, VProducto} from 'api-catalogos';
import {
  ICorrectData,
  IPpPartidaPedidoDetallePretamitar,
} from '@appModels/store/pre-processing/preprocess-order-details/sections/quoted-items/quoted-items.models';
import {
  IAddPurchaseOrderItems,
  initialIAddPurchaseOrderItems,
  IQuoted,
} from '@appModels/store/pre-processing/preprocess-order-details/sections/add-purchase-order-items/add-purchase-order-items.models';

export interface IPreprocessOrderDetails {
  clientSelected: CustomerList;
  purchaseOrderList: IPurchaseOrders;
  filterData: Array<DropListOption>;
  filterSelected: DropListOption;
  purchaseOrderSelected: IOrder;
  keyPadOptions: Array<DropListOption>;
  keyPadSelected: DropListOption;
  termSearch: string;
  statusApiListOrders: number;
  entriesApiStatus: number;
  openViewFile: boolean;
  fileBase64: string;
  indexOrder: number;
  isInAddItem: boolean;
  addItemsSection: IAddPurchaseOrderItems;
  viewFileIsLoading: boolean;
  isPDF: boolean;
  invoice: string;
  isOpenPopUpTeeItemOrder: boolean;
  isOpenPopUpProductControlled: boolean;
  catUnidadDeMedidaSanofi: Array<DropListOption>;
  deliveryAddresses: VDireccion[];
  deliveryAddressSelected: VDireccion;
  searchItemsByCatalog?: string;
}

export interface IDetailsTEE {
  freight: PpPedidoFleteExpressObj;
  currency: string;
  pieces: number;
  //DOCS: CAPACITACIONES
  datesTraining: CotPartidaCotizacionCapacitacionFecha[];
  //DOCS: PUBLICACIONES
  supplement: VProducto[];
  //DOCS: RESTRICCIONES
  monthlyRestriction: RestriccionMensualDatosFacturacion;
  temporaryRestriction: Array<RestriccionTemporalDatosFacturacion>;
  isActiveTemporaryRestriction: boolean;
}

export const initialPreprocessOrderDetails = (): IPreprocessOrderDetails => ({
  purchaseOrderList: {} as IPurchaseOrders,
  purchaseOrderSelected: {} as IOrder,
  clientSelected: {} as CustomerList,
  keyPadSelected: {label: 'Todas', value: '1'},
  filterSelected: {label: 'Más Nuevas', value: '1'},
  termSearch: null,
  statusApiListOrders: API_REQUEST_STATUS_DEFAULT,
  entriesApiStatus: API_REQUEST_STATUS_DEFAULT,
  filterData: [
    {label: 'Más Nuevas', value: '1'},
    {label: 'Más Antiguas', value: '2'},
  ],
  keyPadOptions: [
    {label: 'Todas', value: '1'},
    {label: 'Con Orden', value: '2'},
    {label: 'Sin Orden', value: '3'},
  ],
  openViewFile: false,
  fileBase64: null,
  indexOrder: 1,
  isInAddItem: false,
  // details: initialIDetails(),
  viewFileIsLoading: true,
  isPDF: false,
  invoice: '',
  isOpenPopUpProductControlled: false,
  isOpenPopUpTeeItemOrder: false,
  // quotedItemsSection: initialIQuotedItems(),
  addItemsSection: initialIAddPurchaseOrderItems(),
  catUnidadDeMedidaSanofi: [
    {
      value: 'UN',
      label: 'Unidad',
    },
    {
      value: 'PZ',
      label: 'Pieza',
    },
  ],
  deliveryAddresses: [],
  deliveryAddressSelected: null,
});

export interface IPurchaseOrders {
  Results?: Array<IOrder>;
  TotalResults?: number;
}

export interface IOrder extends VPpPedidoObj {
  IdCatMonedaTemp?: string;
  // codeRequest?: SolicitudAutorizacionCambio; //DOCS: CODIGOD DE VERFICACIÓN
  code: number[]; //DOCS: CODIGOD DE VERFICACIÓN
  // shaked?: boolean; //DOCS: CODIGOD DE VERFICACIÓN
  mailData: CorreoRecibidoClienteRequerimientoObj;
  user: Usuario;
  itemsOrder?: Array<IPpPartidaPedidoDetallePretamitar>;
  itemOrderSelected?: IPpPartidaPedidoDetallePretamitar;
  needsToReload?: boolean;
  dataValidation: ICorrectData;
  selectedUnitMedida?: DropListOption;
  DireccionEntrega?: VDireccion;
}
export interface QuoteChangeCurrency {
  quotedToChange: IQuoted[];
  selectedOrder: IOrder;
  quotedResults: VCotCotizacion[];
}
