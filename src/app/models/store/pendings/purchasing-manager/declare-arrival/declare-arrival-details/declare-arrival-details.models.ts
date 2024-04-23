import {ITabOption} from '@appModels/botonera/botonera-option';
import {
  OcPackingList,
  VLote,
  VOcOrdenDeCompraDeclararArribo,
  VOcPartidaDetalle,
} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  API_REQUEST_STATUS_DEFAULT,
  DEFAULT_DATE,
  DEFAULT_UUID,
  HIGHER_VALUE,
  LOWER_VALUE,
} from '@appUtil/common.protocols';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-list/declare-arrival-list.models';
import {ContactoDetalleProvObj, Lote, VCatPais} from 'api-catalogos';
import {filter, flow, isEmpty, map as _map} from 'lodash-es';

export interface IDeclareArrivalDetails {
  selectedProvider: IProvider;
  purchaseOrders: Array<IPurchaseOrderArrival>;
  selectedPurchaseOrder: IPurchaseOrderArrival;
  selectedItems: Array<IItemsDeclareArrival>;
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
  providerContacts: Array<ContactoDetalleProvObj>;
  selectedProviderContact: DropListOption;
}

export interface IPurchaseOrderArrival extends VOcOrdenDeCompraDeclararArribo {
  Index: number;
  isSelected: boolean;
  items: Array<IItemsDeclareArrival>;
  itemsBackup?: Array<IItemsDeclareArrival>;
  filterByLetter?: ITabOption;
  needsToReloadItems: boolean;
}

export interface IItemsDeclareArrival extends VOcPartidaDetalle {
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

export interface IDeclareArrivalTotals {
  length: number;
  price: number;
  quantity: number;
  amount: number;
}

export interface IDeclareArrivalEffect {
  items?: Array<IItemsDeclareArrival>;
  ocPackingList?: OcPackingList;
  packingList?: File;
}

export const initialIDeclareArrivalDetails = (): IDeclareArrivalDetails => ({
  selectedProvider: {} as IProvider,
  purchaseOrders: [],
  selectedPurchaseOrder: {} as IPurchaseOrderArrival,
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
  providerContacts: [],
  selectedProviderContact: null,
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

export const getSelectedCountry = (
  countries: Array<VCatPais>,
  lots: Array<VLote>,
  lotId: string,
): DropListOption => {
  // FIXME: No coinciden los tipados
  return {} as DropListOption;
  /*return flow(
    () => (lotId ? filter(lots, (o: VLote) => o.IdLote === lotId) : []),
    (lot:VLote[]) =>
      !isEmpty(lot) ? filter(countries, (o: VCatPais) => o.IdCatPais === lot.IdcatPaisOrigen) : [],
    (country) =>
      !isEmpty(country)
        ? _map(country[0], (o: VCatPais) => ({
            value: o.IdCatPais,
            label: o.NombreEspanol,
          }))
        : ({} as DropListOption),
  )();*/
};

export const getSelectedLot = (lots: Array<Lote>, lotId: string): DropListOption => {
  return flow(
    () => (lotId ? filter(lots, (o: Lote) => o.IdLote === lotId) : []),
    (lot) =>
      !isEmpty(lot)
        ? _map(lot, (o: Lote) => ({
            value: o.IdLote,
            label: o.Nombre,
          }))[0]
        : ({} as DropListOption),
  )();
};

export const getSelectedCompleteLot = (lots: Array<Lote>, lotId: string): Lote => {
  return flow(
    () => (lotId ? filter(lots, (o: Lote) => o.IdLote === lotId) : []),
    (lot) => (!isEmpty(lot) ? lot[0] : ({} as Lote)),
  )();
};
