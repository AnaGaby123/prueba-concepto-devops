import {createSelector} from '@ngrx/store';
import {selectPlanDispatchList} from '@appSelectors/pendings/imports/plan-dispatch/plan-dispatch.selectors';
import {
  IPlanDispatchList,
  IProvider,
} from '@appModels/store/pendings/imports/plan-dispatch/plan-dispatch-list/plan-dispatch-list.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {QueryInfo} from 'api-catalogos';
import {
  IBarChart,
  IDoughnutChart,
  IDoughnutChartDetails,
  InitialIBarChart,
} from '@appModels/chart/chart';
import {flow, forEach, isEmpty} from 'lodash-es';
import {DatosGraficaSemaforoEntregaObj} from 'api-logistica';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';

export const selectSearchTerm = createSelector(
  selectPlanDispatchList,
  (state: IPlanDispatchList): string => state.searchTerm,
);
export const selectBurgerOptions = createSelector(
  selectPlanDispatchList,
  (state: IPlanDispatchList): Array<DropListOption> => state.burgerOptions,
);
export const selectedBurgerOption = createSelector(
  selectPlanDispatchList,
  (state: IPlanDispatchList): DropListOption => state.selectedBurgerOption,
);
export const selectProvidersList = createSelector(
  selectPlanDispatchList,
  (state: IPlanDispatchList): Array<IProvider> => state.providersList,
);
export const selectBarsChartData = createSelector(
  selectPlanDispatchList,
  (state: IPlanDispatchList): DatosGraficaSemaforoEntregaObj => state.barsChartData,
);
export const selectProvidersStatus = createSelector(
  selectPlanDispatchList,
  (state: IPlanDispatchList): number => state.providersStatus,
);
export const selectBarsChartStatus = createSelector(
  selectPlanDispatchList,
  (state: IPlanDispatchList): number => state.barsChartStatus,
);
export const selectDonutChartStatus = createSelector(
  selectPlanDispatchList,
  (state: IPlanDispatchList): number => state.donutChartStatus,
);
export const selectNeedsToReloadProviders = createSelector(
  selectPlanDispatchList,
  (state: IPlanDispatchList): boolean => state.needsToReloadProviders,
);
export const selectBarsChart = createSelector(
  selectBarsChartData,
  (barsChartData: DatosGraficaSemaforoEntregaObj) => {
    const dataBar: IBarChart = InitialIBarChart();
    if (!isEmpty(barsChartData)) {
      dataBar.labels = ['FUERA DE TIEMPO', 'URGENTE', 'EN TIEMPO'];
      dataBar.values = [
        barsChartData.TotalVencidoRojo,
        barsChartData.TotalEnTiempoAmarillo,
        barsChartData.TotalEnTiempoVerde,
      ];
      dataBar.backgroundColor = ['#cc435e', '#f5a623', '#4ba92b'];
      dataBar.backgroundColorHover = ['#cc435e', '#f5a623', '#4ba92b'];
    }
    return dataBar;
  },
);
export const selectDataDonutChart = createSelector(
  selectProvidersList,
  (providersList: Array<IProvider>) => {
    let data: IDoughnutChart;
    const labels: Array<string> = [];
    const values: Array<number> = [];
    providersList?.forEach((item: IProvider) => {
      labels.push(item.NombreProveedor);
      values.push(item.MontoTotal);
    });
    data = {labels, values};
    return data;
  },
);
export const selectDataDonutOptionsDetails = createSelector(
  selectProvidersList,
  (providersList: Array<IProvider>) => {
    return flow([
      (): Array<IDoughnutChartDetails> => {
        let totalProviders = 0;
        let totalPurchases = 0;
        let totalPieces = 0;
        let totalAmount = 0;

        forEach(providersList, (o: IProvider) => {
          totalProviders++;
          totalPurchases += o.TotalCompras;
          totalPieces += o.TotalPiezas;
          totalAmount += o.MontoTotal;
        });
        const val = new CurrencyFormat().transform(totalAmount, 'USD');

        return [
          {
            label: 'Proveedores',
            value: totalProviders,
          },
          {label: 'Compras', value: totalPurchases},
          {label: 'Piezas', value: totalPieces},
          {label: 'Total', value: val},
        ];
      },
    ])();
  },
);
export const selectProvidersListFilters = createSelector(
  selectPlanDispatchList,
  (state: IPlanDispatchList): QueryInfo => {
    const queryInfo: QueryInfo = {
      Filters: [],
      SortDirection: (state.selectedBurgerOption.value === '1' ? 'desc' : 'asc').toString(),
      SortField: 'TotalUSD',
    };
    if (state?.searchTerm) {
      queryInfo.Filters.push({
        NombreFiltro: 'NombreProveedor',
        ValorFiltro: state?.searchTerm,
      });
    }
    return queryInfo;
  },
);
