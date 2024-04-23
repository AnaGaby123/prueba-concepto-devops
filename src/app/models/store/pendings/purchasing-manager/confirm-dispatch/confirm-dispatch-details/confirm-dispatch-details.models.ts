/* Models Imports */
import {
  ImpListaArribo,
  OcPackingList,
  OcPartidaCancelacion,
  VImpCDOrdenesDeCompra,
  VOcPartidaDetalle,
} from 'api-logistica';
import {
  IItemsConfigTotals,
  initialOcPartidaCancelacion,
  initialOcPartidaEdicionBackOrder,
  IOcPartidaEdicionBackOrder,
  STATUS,
} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';
import {IProvidersConfirmDispatch} from '@appModels/store/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch-list/confirm-dispatch-list.models';
import {ITabOption} from '@appModels/botonera/botonera-option';

/* Common Imports */
import {API_REQUEST_STATUS_DEFAULT, DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ContactoDetalleProvObj} from 'api-catalogos';

export interface IConfirmDispatchDetails {
  searchTerm: string;
  providerSelected: IProvidersConfirmDispatch;
  purchaseOrders: Array<IPurchaseOrder>;
  purchaseOrdersStatus: number;
  purchaseOrdersNeedsToReload: boolean;
  tabsTotals: Array<ITabOption>;
  tabSelected: ITabOption;
  viewMode: 'normal' | 'summary';
  purchaseOrderSelected: IPurchaseOrder;
  itemsInSummary: Array<IItem>;
  itemsInSummaryStatus: number;
  itemsInSummaryNeedsToReload: boolean;
  arrivalList: ImpListaArribo;
  ocPackingList: OcPackingList;
  packingListFile: File;
  guideFile: File;
  selectedFreightOption: DropListOption;
  providerContacts: Array<ContactoDetalleProvObj>;
  selectedProviderContact: DropListOption;
}

export const initialIConfirmDispatchDetails = (): IConfirmDispatchDetails => ({
  searchTerm: '',
  providerSelected: {} as IProvidersConfirmDispatch,
  purchaseOrders: [],
  purchaseOrdersStatus: API_REQUEST_STATUS_DEFAULT,
  purchaseOrdersNeedsToReload: true,
  tabsTotals: initialTabs(),
  tabSelected: initialTabs()[0],
  viewMode: 'normal',
  purchaseOrderSelected: {} as IPurchaseOrder,
  itemsInSummary: [],
  itemsInSummaryStatus: API_REQUEST_STATUS_DEFAULT,
  itemsInSummaryNeedsToReload: true,
  arrivalList: initialArrivalList(),
  ocPackingList: initialOcPackingList(),
  packingListFile: null,
  guideFile: null,
  selectedFreightOption: {} as DropListOption,
  providerContacts: [],
  selectedProviderContact: null,
});

export interface IPurchaseOrder extends VImpCDOrdenesDeCompra {
  Index: number;
  isSelected: boolean;
  items: Array<Array<IItem>>;
  itemsStatus: number;
  itemsNeedsToReload: boolean;
}

export interface IItem extends VOcPartidaDetalle {
  Index?: number;
  Number?: number;
  NumberToSave?: number;
  tempId?: string;
  tempNumeroDePiezas?: number;
  tempPrecioLista?: number;
  tempTotalPartida?: number;
  tempFechaEstimadaDeArribo?: string;
  cancelStatus?: string;
  backOrderStatus?: string;
  confirmedStatus?: string;
  cancelConfig?: boolean;
  backOrderConfig?: boolean;
  confirmedConfig?: boolean;
  configIsOpen?: boolean;
  ocPartidaCancelacion?: OcPartidaCancelacion;
  ocPartidaEdicionBackOrder?: IOcPartidaEdicionBackOrder;
}

export const initialIItem = (): IItem => ({
  cancelStatus: STATUS.default,
  backOrderStatus: STATUS.default,
  confirmedStatus: STATUS.default,
  cancelConfig: false,
  backOrderConfig: false,
  confirmedConfig: false,
  configIsOpen: false,
  ocPartidaCancelacion: {...initialOcPartidaCancelacion()},
  ocPartidaEdicionBackOrder: {...initialOcPartidaEdicionBackOrder()},
});

export const initialTabs = (
  all: number = 0,
  oneDay: number = 0,
  twoDays: number = 0,
  threeDays: number = 0,
  moreThanThreeDays: number = 0,
): Array<ITabOption> => [
  {
    id: '1',
    label: 'Todos',
    activeSubtitle: true,
    totalSubtitle: all,
    labelSubtitle: 'pzas',
  },
  {
    id: '2',
    label: '3 + Días',
    activeSubtitle: true,
    totalSubtitle: oneDay,
    labelSubtitle: 'pzas',
  },
  {
    id: '3',
    label: '3 Días',
    activeSubtitle: true,
    totalSubtitle: twoDays,
    labelSubtitle: 'pzas',
  },
  {
    id: '4',
    label: '2 Días',
    activeSubtitle: true,
    totalSubtitle: threeDays,
    labelSubtitle: 'pzas',
  },
  {
    id: '5',
    label: '1 Días',
    activeSubtitle: true,
    totalSubtitle: moreThanThreeDays,
    labelSubtitle: 'pzas',
  },
];

export const initialArrivalList = (): ImpListaArribo => ({
  Activo: true,
  Concecutivo: null,
  Confirmado: false,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  Folio: null,
  IdArchivoGuia: null,
  IdCatFletera: null,
  IdImpListaArribo: DEFAULT_UUID,
  IdImpOrdenDespacho: null,
  NumeroGuia: '',
});

export const initialOcPackingList = (): OcPackingList => ({
  Activo: true,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  IdArchivo: DEFAULT_UUID,
  IdImpListaArribo: null,
  IdOcPackingList: DEFAULT_UUID,
  IdUsuario: null,
  NumeroDePiezasArribadas: null,
});

export interface ITotalsItems extends IItemsConfigTotals {
  totalResults: number;
  totalPieces: number;
  totalAmount: number;
  totalClients: number;
}

export interface IITemInSummary extends VOcPartidaDetalle {
  Index: number;
}
