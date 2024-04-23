import {IQueryInfoOptions} from '@appModels/store/utils/utils.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  API_REQUEST_STATUS_DEFAULT,
  HIGHER_VALUE,
  LOWER_VALUE,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
import {CargarFacturaDonaTotales, VProveedorCCargarFactura} from 'api-logistica';

export interface IUploadInvoiceList {
  queryInfo: IQueryInfoOptions;
  dataByType: DropListOption[];
  filterByType: DropListOption;
  donutChart: CargarFacturaDonaTotales;
  providers: IProvidersUpload;
}

export const initialIUploadInvoiceList = (): IUploadInvoiceList => ({
  queryInfo: {
    searchTerm: '',
    desiredPage: 0,
    pageSize: PAGING_LIMIT,
    requestStatus: API_REQUEST_STATUS_DEFAULT,
    dateRange: null,
    reloadStates: false,
  },
  dataByType: [
    {value: '1', label: HIGHER_VALUE},
    {value: '2', label: LOWER_VALUE},
  ],
  filterByType: {value: '1', label: HIGHER_VALUE},
  providers: {TotalResults: 0, Results: []},
  donutChart: {
    ListaCargarFacturaDonaTotalesObj: [],
    TCompras: 0,
    TIOrdenesCompra: 0,
    TPiezas: 0,
    TProveedores: 0,
    TValorTotal: 0,
  },
});

export interface IProvidersUpload {
  TotalResults: number;
  Results: Array<IProviderUpload>;
}

export interface IProviderUpload extends VProveedorCCargarFactura {
  Index: number;
}
