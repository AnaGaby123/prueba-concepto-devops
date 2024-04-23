/* Models Imports */
import {
  OcPartidaCancelacion,
  VOcOrdenDeCompraMonitorearDetalle,
  VOcPartidaDetalle,
} from 'api-logistica';
import {
  initialOcPartidaCancelacion,
  initialOcPartidaEdicionBackOrder,
  initialOcPartidaEdicionConImpactoFEE,
  initialOcPartidaEdicionSinImpactoFEE,
  IOcPartidaEdicionBackOrder,
  IOcPartidaEdicionConImpactoFEE,
  IOcPartidaEdicionSinImpactoFEE,
  STATUS,
} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-list/check-oc-not-arrived-list.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IDropdownButtonCustomValues} from '@appModels/dropdown-button-custom/dropdown-button-custom.model';

/* Common Imports */
import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';
import {ContactoDetalleProvObj} from 'api-catalogos';

export interface ICheckOcNotArrivedDetails {
  providerSelected: IProvider;
  families: Array<IFamily>;
  familySelected: IFamily;
  familiesStatus: number;
  providerContacts: Array<ContactoDetalleProvObj>;
  selectedProviderContact: DropListOption;
}

export const initialICheckOcNotArrivedDetails = (): ICheckOcNotArrivedDetails => ({
  providerSelected: {} as IProvider,
  families: [],
  familySelected: {} as IFamily,
  familiesStatus: API_REQUEST_STATUS_DEFAULT,
  providerContacts: [],
  selectedProviderContact: null,
});

// FIXME: Corregir por cambio en modelos
export interface IFamily {
  /*export interface IFamily extends VOcProveedorFamiliaMonitorear {*/
  isSelected: boolean;
  purchaseOrders: Array<IPurchaseOrder>;
  totalPurchaseOrders: number;
  purchaseOrdersStatus: number;
  needsToReloadPurchaseOrders: boolean;
  desiredPage: number;
  isLoadingMorePurchases: boolean;
  selectedPurchaseOrder: IPurchaseOrder;
  totals: ITotals;
  needsToReloadTotals: boolean;
  searchTerm: string;
  tabOptions: Array<DropListOption>;
  tabSelected: DropListOption;
  dropDownValues: IDropdownButtonCustomValues;
  dropDownOptionSelected: string;
}

export interface IPurchaseOrder extends VOcOrdenDeCompraMonitorearDetalle {
  Index?: number;
  items: Array<Array<IItems>>;
  totalItems: number;
  itemsStatus: number;
  needsToReloadItems: boolean;
  desiredPage: number;
  isLoadingMoreItems: boolean;
  isSelected: boolean;
}

export interface IItems extends VOcPartidaDetalle {
  Index?: number;
  Number?: number;
  NumberToSave?: number;
  tempId?: string;
  tempNumeroDePiezas?: number;
  tempPrecioLista?: number;
  tempTotalPartida?: number;
  tempFechaEstimadaDeArribo?: string;
  cancelStatus: string;
  backOrderStatus: string;
  impactStatus: string;
  withoutImpactStatus: string;
  cancelConfig: boolean;
  backOrderConfig: boolean;
  impactConfig: boolean;
  withoutImpactConfig: boolean;
  configIsOpen: boolean;
  ocPartidaCancelacion: OcPartidaCancelacion;
  ocPartidaEdicionBackOrder: IOcPartidaEdicionBackOrder;
  ocPartidaEdicionConImpactoFEE: IOcPartidaEdicionConImpactoFEE;
  ocPartidaEdicionSinImpactoFEE: IOcPartidaEdicionSinImpactoFEE;
}

export interface ITotals {
  pieces: number;
  products: number;
  amount: number;
}

export const initialItem = (): IItems => ({
  cancelStatus: STATUS.default,
  backOrderStatus: STATUS.default,
  impactStatus: STATUS.default,
  withoutImpactStatus: STATUS.default,
  cancelConfig: false,
  backOrderConfig: false,
  impactConfig: false,
  withoutImpactConfig: false,
  configIsOpen: false,
  ocPartidaCancelacion: {...initialOcPartidaCancelacion()},
  ocPartidaEdicionBackOrder: {...initialOcPartidaEdicionBackOrder()},
  ocPartidaEdicionConImpactoFEE: {...initialOcPartidaEdicionConImpactoFEE()},
  ocPartidaEdicionSinImpactoFEE: {...initialOcPartidaEdicionSinImpactoFEE()},
});

export const initialChildItem = () => ({
  cancelConfig: false,
  backOrderConfig: false,
  impactConfig: false,
  configIsOpen: false,
});
