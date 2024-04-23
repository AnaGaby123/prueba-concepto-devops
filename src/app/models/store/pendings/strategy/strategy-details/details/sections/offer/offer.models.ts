import {
  ListaEntregaPartidaPedidoObj,
  QueryResultGraficaEntregaPartidaPedidoObj,
  QueryResultListaEntregaPartidaPedidoObj,
  TotalPedidoEntregaObj,
} from 'api-logistica';
import {FacturasPendientesClienteObj} from 'api-finanzas';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';

export interface IOfferState {
  searchTerm: string;
  listTypesOfSearch: Array<DropListOption>;
  typeOfSearch: DropListOption;
  selectedBrand: DropListOption;
  defaulter: IDefaultertState;
  delivery: IDeliveryState;
}

export interface IDefaultertState {
  dataPendingInvoices: FacturasPendientesClienteObj;
  needsToReloadPendingInvoices: boolean;
  dataPendingInvoiceStatus: number;
  dataByType: DropListOption[];
  filterByType: DropListOption;
}

export interface IDeliveryState {
  listDeliveries: QueryResultListaEntregaPartidaPedidoObj;
  dataChartDelivery: QueryResultGraficaEntregaPartidaPedidoObj;
  totalDeliveries: TotalPedidoEntregaObj;
  needsToReloadDataDeliveries: boolean;
  dataDeliveriesStatus: number;
}

export interface IDeliveries extends ListaEntregaPartidaPedidoObj {
  Index: number;
  labelDays: string;
}

export interface IPercentagesDeliveries {
  oneDay: IDataDeliveries;
  twoDays: IDataDeliveries;
  threeDays: IDataDeliveries;
  moreThanThreeDays: IDataDeliveries;
  changeNotice: IDataDeliveries;
}

export interface IDataDeliveries {
  total: number;
  percentage: number;
}

export interface IDetailsPopConversionRate {
  Partidas: number;
  Porcentaje: number;
  Descripcion: string;
}

export interface IItem {
  TipoPartidaCotizacion: string;
  NombreMarca: string;
  PorcentajeTasasConversion: number;
  total: number;
  details: Array<IDetailsPopConversionRate>;
  doughnutChartDataConversion: IDoughnutChart;
  doughnutChartOptionConversionDetails: Array<IDoughnutChartDetails>;
  doughnutChartDataConversionHover: Array<Array<IDoughnutChartDetails>>;
}
