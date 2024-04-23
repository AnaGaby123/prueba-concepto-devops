import {
  API_REQUEST_STATUS_DEFAULT,
  HIGHER_VALUE,
  LOWER_VALUE,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
/* Models Imports */
import {IQueryInfoOptions} from '@appModels/store/utils/utils.model';
import {RegistrarDespachoGraficaTotales, VRDImportador} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export interface IRegisterDispatchList {
  searchTerm: string;
  queryInfo: IQueryInfoOptions;
  customsBrokers: ICustomsBroken;
  totals: RegistrarDespachoGraficaTotales;
  options: Array<DropListOption>;
  selectedOption: DropListOption;
}

export const initialIRegisterDispatchList = (): IRegisterDispatchList => ({
  searchTerm: '',
  queryInfo: {
    searchTerm: '',
    desiredPage: 0,
    pageSize: PAGING_LIMIT,
    requestStatus: API_REQUEST_STATUS_DEFAULT,
    dateRange: null,
  },
  customsBrokers: {
    Results: [],
    TotalResults: 0,
  },
  totals: {
    Importadores: 0,
    OrdenesDespacho: 0,
    Piezas: 0,
    PiezasATiempo: 0,
    PiezasFueraDeTiempo: 0,
    PiezasUrgentes: 0,
    Proveedores: 0,
    ValorTotalAduana: 0,
    ListaVProveedorRegistrarDespachoDetalle: [],
  },
  options: [
    {
      value: '1',
      label: HIGHER_VALUE,
    },
    {
      value: '2',
      label: LOWER_VALUE,
    },
  ],
  selectedOption: {
    value: '1',
    label: HIGHER_VALUE,
  },
});

export interface ICustomsBroken {
  Results: Array<ICustomBroken>;
  TotalResults: number;
}

export interface ICustomBroken extends VRDImportador {
  Index: number;
}
