import {ITabOption} from '@appModels/botonera/botonera-option';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-list/declare-arrival-list.models';
import {IItemsDeclareArrival} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-details/declare-arrival-details.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  API_REQUEST_STATUS_DEFAULT,
  DEFAULT_DATE,
  DEFAULT_UUID,
  HIGHER_VALUE,
  LOWER_VALUE,
} from '@appUtil/common.protocols';
import {OcPackingList, VOcOrdenDeCompraDeclararArribo, VOcPartidaDetalle} from 'api-logistica';
import {Lote} from 'api-catalogos';

export interface IDeclareTransitArrivalDetails {
  selectedProvider: IProvider;
  purchaseOrders: Array<IPurchaseOrderTransitArrival>;
  selectedPurchaseOrder: IPurchaseOrderTransitArrival;
  selectedItems: Array<IItemsDeclareTransitArrival>;
  packingList: File;
  ocPackingList: OcPackingList;
  searchTerm: string;
  filterByLetter?: ITabOption;
  dataByType: Array<DropListOption>;
  filterByType: DropListOption;
  tabOptions: Array<ITabOption>;
  selectedTabOption?: ITabOption;
  itemsStatus?: number;
  purchaseOrdersStatus?: number;
  needsToReloadOrders: boolean;
}

export interface IPurchaseOrderTransitArrival extends VOcOrdenDeCompraDeclararArribo {
  Index: number;
  isSelected: boolean;
  items: Array<IItemsDeclareTransitArrival>;
  itemsBackup?: Array<IItemsDeclareTransitArrival>;
  filterByLetter?: ITabOption;
  needsToReloadItems: boolean;
}

export interface IItemsDeclareTransitArrival extends VOcPartidaDetalle {
  Index?: number;
  isPublish: boolean;
  Number?: number;
  Initial?: string;
  certificate?: File;
  withoutCertificate?: boolean;
  countriesForDropDown?: Array<DropListOption>;
  lotsForDropDown?: Array<DropListOption>;
  selectedCountry?: DropListOption;
  selectedLot: DropListOption;
  selectedCompleteLot: Lote;
  newLot: Lote;
}

export interface IDeclareTransitArrivalTotals {
  length: number;
  price: number;
  quantity: number;
  amount: number;
}

export interface IDeclareTransitArrivalEffect {
  items?: Array<IItemsDeclareArrival>;
  ocPackingList?: OcPackingList;
  packingList?: File;
}

export const initialIDeclareTransitArrivalDetails = (): IDeclareTransitArrivalDetails => ({
  selectedProvider: {} as IProvider,
  purchaseOrders: [],
  selectedPurchaseOrder: {} as IPurchaseOrderTransitArrival,
  selectedItems: [],
  packingList: null,
  ocPackingList: initialOcPackingList(),
  searchTerm: '',
  dataByType: [
    {value: '1', label: HIGHER_VALUE},
    {value: '2', label: LOWER_VALUE},
  ],
  filterByType: {value: '1', label: HIGHER_VALUE},
  tabOptions: [
    {
      id: '1',
      label: 'TODOS',
      activeSubtitle: true,
      labelSubtitle: 'ENTREGAS',
      totalSubtitle: 0,
    },
    {
      id: '2',
      label: 'FUERA DE TIEMPO',
      activeSubtitle: true,
      labelSubtitle: 'ENTREGAS',
      totalSubtitle: 0,
    },
    {
      id: '3',
      label: 'URGENTE',
      activeSubtitle: true,
      labelSubtitle: 'ENTREGAS',
      totalSubtitle: 0,
    },
    {
      id: '4',
      label: 'EN TIEMPO',
      activeSubtitle: true,
      labelSubtitle: 'ENTREGAS',
      totalSubtitle: 0,
    },
  ],
  selectedTabOption: {
    id: '1',
    label: 'TODOS',
    activeSubtitle: true,
    labelSubtitle: 'ENTREGAS',
  },
  itemsStatus: API_REQUEST_STATUS_DEFAULT,
  purchaseOrdersStatus: API_REQUEST_STATUS_DEFAULT,
  needsToReloadOrders: true,
});

export const initialLot = (): Lote => ({
  Activo: true,
  FechaCaducidadLote: null,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  IdArchivoCertificado: null,
  IdCatPaisOrigen: null,
  IdCatUnidad: null,
  IdLote: DEFAULT_UUID,
  IdProducto: null,
  Nombre: '',
  PrecioLista: null,
  Presentacion: null,
});
export const initialOcPackingList = (): OcPackingList => ({
  Activo: true,
  Declarado: true,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  IdArchivo: null,
  IdImpListaArribo: null,
  IdOcPackingList: DEFAULT_UUID,
  IdUsuario: null,
});
export const TIMES = {
  2: 'FueraDeTiempo',
  3: 'Urgente',
  4: 'EnTiempo',
};
