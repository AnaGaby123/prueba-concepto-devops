import {ICustomAgent} from '@appModels/store/pendings/imports-phs/control-material-delivery/control-material-delivery-list/control-material-delivery-list.models';
import {IQueryInfoOptions} from '@appModels/store/utils/utils.model';
import {
  API_REQUEST_STATUS_DEFAULT,
  HIGHER_VALUE,
  LOWER_VALUE,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
import {VGARImpOrdenDespacho} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ArchivoDetalle} from 'api-catalogos';

export interface IControlMaterialDeliveryDetails {
  selectedAgent: ICustomAgent;
  queryInfo: IQueryInfoOptions;
  dispatchOrders: IDispatchOrders;
  selectedOrder: IDispatchOrder;
  dataByType: DropListOption[];
  filterByType: DropListOption;
  base64: string;
  loadingFile: number;
}

export const initialIControlMaterialDeliveryDetails = (): IControlMaterialDeliveryDetails => ({
  selectedAgent: {} as ICustomAgent,
  queryInfo: {
    searchTerm: null,
    desiredPage: 0,
    pageSize: PAGING_LIMIT,
    requestStatus: API_REQUEST_STATUS_DEFAULT,
    dateRange: null,
  },
  dispatchOrders: {TotalResults: 0, Results: []},
  selectedOrder: {} as IDispatchOrder,
  dataByType: [
    {value: '1', label: HIGHER_VALUE},
    {value: '2', label: LOWER_VALUE},
  ],
  filterByType: {value: '1', label: HIGHER_VALUE},
  base64: null,
  loadingFile: API_REQUEST_STATUS_DEFAULT,
});

export interface IDispatchOrders {
  TotalResults: number;
  Results: Array<IDispatchOrder>;
}

export interface IDispatchOrder extends VGARImpOrdenDespacho {
  index: number;
  file: ArchivoDetalle;
  numberOfPackages: number;
}
