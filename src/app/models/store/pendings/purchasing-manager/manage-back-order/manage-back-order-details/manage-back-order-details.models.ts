/*Models Imports*/
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/manage-back-order/manage-back-order-list/manage-back-order-list.models';
import {
  OcPartidaEdicionBackOrderHistorial,
  VOcOrdenDeCompraGBackOrder,
  VOcPartidaGBackOrder,
  VOcProductoTotalesGBackOrder,
} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IAvailable} from '@purchasing-manager/manage-back-order/manage-back-order-details/pop-up-back-order/pop-up-back-order.component';
import {ContactoDetalleProvObj} from 'api-catalogos';

export interface IManageBackOrderDetails {
  provider: IProvider;
  filterSelected: ITabOption;
  families: Array<IFamiliesBackOrder>;
  selectedFamily: IFamiliesBackOrder;
  statusList: Array<DropListOption>;
  selectedStatus: DropListOption;
  activePopProduct: boolean;
  providerContacts: Array<ContactoDetalleProvObj>;
  selectedProviderContact: DropListOption;
}

export const initialIManageBackOrderDetails = (): IManageBackOrderDetails => ({
  provider: {} as IProvider,
  filterSelected: {id: '1', label: 'POR CANCELAR'},
  families: [],
  selectedFamily: {} as IFamiliesBackOrder,
  statusList: [
    {label: 'Ninguna', value: '0'},
    {label: 'Continuar Back Order', value: '1'},
    {label: 'Producto Descontinuado', value: '2'},
    {label: 'Producto Disponible', value: '3'},
  ],
  selectedStatus: {label: 'Ninguna', value: '0'},
  activePopProduct: false,
  providerContacts: [],
  selectedProviderContact: null,
});

export interface IFamiliesBackOrder {
  /*export interface IFamiliesBackOrder extends VOcProveedorFamiliaBackOrder {*/
  selectedOrder: IOrdersBackOrder;
  orders: Array<IOrdersBackOrder>;
  needsToReloadOrders: boolean;

  statusApiOrders: number;
  selectedProduct: IProduct;
  products: Array<IProduct>;
  statusApiProducts: number;
  needsToReloadProducts: boolean;
  index: number;
  searchTerm: string;
}

export interface IOrdersBackOrder extends VOcOrdenDeCompraGBackOrder {
  index: number;
  items: Array<IItems>;
  needsToReloadItems: boolean;
  statusApiItems?: number;
  sendStock?: boolean;
  cancel?: boolean;
}

export interface IProduct extends VOcProductoTotalesGBackOrder {
  index: number;
  items: Array<IItems>;
  needsToReloadItems: boolean;
  statusApiItems: number;
  history: Array<OcPartidaEdicionBackOrderHistorial>;
}

export interface IItems extends VOcPartidaGBackOrder {
  index: number;
  sendStock?: boolean;
  cancel?: boolean;
}

export interface IBackOrder {
  nextMonitoring: Date;
  fdp: Date;
  newFEE: Date;
  reason: string;
}

export interface IOptionsIBackOrder {
  backOrderContinue: IBackOrder;
  dataAvailable: IAvailable;
  justification: string;
}

export const initialIBackOrder = (): IBackOrder => ({
  nextMonitoring: null,
  fdp: null,
  newFEE: null,
  reason: null,
});

export interface ITotalsList {
  pieces: number;
  products: number;
  amount: number;
}

export const initialITotalsList = () => ({
  pieces: 0,
  products: 0,
  amount: 0,
});
