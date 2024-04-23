import {API_REQUEST_STATUS_DEFAULT, DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
// Models
import {
  CorreoRecibidoClienteRequerimientoObj,
  PpIncidenciaPartida,
  PpPartidaPedidoObj,
  PretramitarPedidoPartidaObj,
  VCliente,
  VClienteppPedidoObj,
  VPpPedidoObj,
} from 'api-logistica';
import {ContactoDetalleObj, Usuario, VDireccion} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IValidateAdjustment} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-dashboard/validate-adjustment-dashboard.models';
import {IImageItem} from '@appModels/shared/shared.models';
import {IFreightItem} from '@appModels/table/internal-sales-item';

export interface ValidateAdjustmentDetailsState {
  customerSelected: ICustomer;
  orders: IPurchase;
  orderSelected: IOrder;
  // keyPadOptions: Array<DropListOption>;
  // keyPadSelected: DropListOption;
  filters: Array<DropListOption>;
  filterSelected: DropListOption;
  apiStatusOrderList: number;
  apisStatusIssueAndItemsOrder: number;
  searchTerm: string;
  openViewFile: boolean;
  fileBase64: string;
  deliveryAddresses: VDireccion[];
  deliveryAddressSelected: VDireccion;
  // indexOrder: number;
}

export const initialValidateAdjustmentDetailsState = (): ValidateAdjustmentDetailsState => ({
  customerSelected: initialICustomer(),
  orders: {} as IPurchase,
  orderSelected: {} as IOrder,
  // keyPadOptions: [
  //   {label: 'Todas', value: '1'},
  //   {label: 'Con Orden', value: '2'},
  //   {label: 'Sin Orden', value: '3'},
  // ],
  // keyPadSelected: {label: 'Todas', value: '1'},
  filters: [
    {
      value: '1',
      label: 'Más Nuevas',
    },
    {
      value: '2',
      label: 'Más Antiguas',
    },
  ],
  filterSelected: {
    value: '1',
    label: 'Más Nuevas',
  },
  apiStatusOrderList: API_REQUEST_STATUS_DEFAULT,
  apisStatusIssueAndItemsOrder: API_REQUEST_STATUS_DEFAULT,
  searchTerm: '',
  openViewFile: false,
  fileBase64: null,
  deliveryAddresses: [],
  deliveryAddressSelected: null,
  // indexOrder: 1,
});
export const initialICustomer = (): ICustomer => ({
  level: null,
  contacts: [],
  NombreImagen: null,
  Categoria: null,
  imageHover: null,
  dataDashboard: null,
});

export const initialPPIncidenceItemValidateAdjustment = (): PpIncidenciaPartida => ({
  IdPPIncidenciaPartida: DEFAULT_UUID,
  Catalogo: false,
  Descripcion: false,
  Presentacion: false,
  Marca: false,
  TiempoEstimadoEntrega: false,
  IVA: false,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  Activo: true,
  Comentarios: null,
  PrecioUnitario: false,
});

export interface IPurchase {
  Results?: Array<IOrder>;
  TotalResults?: number;
}

export interface IPpPartidaPedidoObjValidateAdjustment extends PpPartidaPedidoObj {
  validity?: string;
  quantityInputIsOpen?: boolean;
  priceInputIsOpen?: boolean;
  isNegative?: boolean;
  percentage?: number;
}

export interface IPpPartidaPedidoDetalleValidateAdjustment
  extends PretramitarPedidoPartidaObj,
    IImageItem {
  ListaPPPartidaPedidoOriginales?: IPpPartidaPedidoObjValidateAdjustment[];
  validity?: string;
  quantityInputIsOpen?: boolean;
  priceInputIsOpen?: boolean;
  isNegative?: boolean;
  percentage?: number;
  hasInheritIncidences?: boolean;
  ImageHover?: string;
  freightItem?: IFreightItem;
  agreedUnitPrice?: number;
}

export interface IOrder extends VPpPedidoObj {
  DireccionEntrega?: VDireccion;
  IdCatMonedaTemp?: string;
  dataValidation?: ICorrectData;
  index?: number;
  itemsOrderSelected?: Array<IPpPartidaPedidoDetalleValidateAdjustment>;
  mailData: CorreoRecibidoClienteRequerimientoObj;
  needsToReload?: boolean;
  user: Usuario;
  usuario: Usuario;
}

export interface ICorrectData {
  whoBills: boolean;
  businessName: boolean;
  paymentConditions: boolean;
}

export interface TotalItemsOrder {
  total: number;
  subtotal: number;
  iva: number;
}

export interface ICustomer extends VClienteppPedidoObj, VCliente, IImageItem {
  level: string;
  dataDashboard: IValidateAdjustment;
  contacts?: ContactoDetalleObj[];
  NombreImagen: string;
  Categoria: string;
  imageHover: string;
}

export interface ITotalDividedEntries {
  validate: number;
  invalidate: number;
}

export interface TramitableObject {
  tramitable: boolean;
  selectedOrder: IOrder;
  entries: IPpPartidaPedidoDetalleValidateAdjustment[];
}

export interface ITotalsEntries {
  controlled: number;
}
