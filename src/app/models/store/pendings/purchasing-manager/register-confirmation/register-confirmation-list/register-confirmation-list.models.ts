/* Models Imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  DatosGraficaOrdenDeCompraFleteObj,
  DatosGraficaOrdenDeCompraProveedorObj,
  DatosGraficaOrdenDeCompraTiempoDeReferenciaObj,
  DatosGraficaOrdenDeCompraTipoEntregaObj,
  VOcProveedor,
} from 'api-logistica';

/* Common Imports*/
import {API_REQUEST_STATUS_DEFAULT, HIGHER_VALUE, LOWER_VALUE} from '@appUtil/common.protocols';

export interface IRegisterConfirmationList {
  searchTerm: string;
  dataByType: Array<DropListOption>;
  filterByType: DropListOption;
  listTypesOfSearch: Array<DropListOption>;
  typeOfSearch: DropListOption;
  providers: Array<IProvider>;
  totalProviders: number;
  needsToReloadProviders: boolean;
  providersStatus: number;
  donutProviders: IChartInfo;
  donutFreight: IChartInfo;
  donutDelivery: IChartInfo;
  donutChartsStatus: number;
  barDelivery: IChartInfo;
  barTime: IChartInfo;
  barChartsStatus: number;
}

export const initialIRegisterConfirmationList = (): IRegisterConfirmationList => ({
  searchTerm: '',
  dataByType: [
    {value: '1', label: HIGHER_VALUE},
    {value: '2', label: LOWER_VALUE},
  ],
  filterByType: {value: '1', label: HIGHER_VALUE},
  listTypesOfSearch: initialOptions(),
  typeOfSearch: initialOptions()[0],
  providers: [],
  providersStatus: API_REQUEST_STATUS_DEFAULT,
  totalProviders: 0,
  needsToReloadProviders: true,
  donutProviders: {
    data: {} as DatosGraficaOrdenDeCompraProveedorObj,
    status: API_REQUEST_STATUS_DEFAULT,
  },
  donutFreight: {
    data: {} as DatosGraficaOrdenDeCompraFleteObj,
    status: API_REQUEST_STATUS_DEFAULT,
  },
  donutDelivery: {
    data: {} as DatosGraficaOrdenDeCompraTipoEntregaObj,
    status: API_REQUEST_STATUS_DEFAULT,
  },
  donutChartsStatus: API_REQUEST_STATUS_DEFAULT,
  barDelivery: {
    data: {} as any,
    status: API_REQUEST_STATUS_DEFAULT,
  },
  barTime: {
    data: {} as DatosGraficaOrdenDeCompraTiempoDeReferenciaObj,
    status: API_REQUEST_STATUS_DEFAULT,
  },
  barChartsStatus: API_REQUEST_STATUS_DEFAULT,
});

export interface IProvider extends VOcProveedor {
  Index: number;
}

export interface IChartInfo {
  data: any;
  status: number;
}

export const initialOptions = (): Array<DropListOption> => [
  {value: '1', label: 'Proveedor'},
  {value: '2', label: 'OC'},
];
