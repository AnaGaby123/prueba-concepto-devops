// Models
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  DatosGraficaSemaforoEntregaObj,
  ProveedorListaArriboObj,
  VPDImpListaArriboPartidaDetalle,
} from 'api-logistica';

// Utils
import {API_REQUEST_STATUS_DEFAULT, HIGHER_VALUE, LOWER_VALUE} from '@appUtil/common.protocols';

export interface IPlanDispatchList {
  searchTerm: string;
  burgerOptions: Array<DropListOption>;
  selectedBurgerOption: DropListOption;
  providersList: Array<IProvider>;
  donutChartData: any;
  barsChartData: DatosGraficaSemaforoEntregaObj;
  totalProviders: number;
  needsToReloadProviders: boolean;
  providersStatus: number;
  barsChartStatus: number;
  donutChartStatus: number;
}

export const initialIPlanDispatchList = (): IPlanDispatchList => ({
  searchTerm: '',
  burgerOptions: [
    {value: '1', label: HIGHER_VALUE},
    {value: '2', label: LOWER_VALUE},
  ],
  selectedBurgerOption: {value: '1', label: HIGHER_VALUE},
  providersList: [],
  donutChartData: null,
  barsChartData: null,
  totalProviders: 0,
  needsToReloadProviders: true,
  providersStatus: API_REQUEST_STATUS_DEFAULT,
  barsChartStatus: API_REQUEST_STATUS_DEFAULT,
  donutChartStatus: API_REQUEST_STATUS_DEFAULT,
});

export interface IProvider extends ProveedorListaArriboObj {
  Index?: number;
  IsSelected?: boolean;
  arrivalList?: Array<IPlanDispatchArrivalList>;
  needsToReloadArrivalList?: boolean;
  arrivalListStatus?: number;
}

export interface IPlanDispatchArrivalList extends VPDImpListaArriboPartidaDetalle {
  Index?: number;
  IsOpen?: boolean;
}
