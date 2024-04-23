/* Selectors Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectRegisterArrivalList} from '@appSelectors/pendings/purchasing-manager/register-arrival/register-arrival.selectors';

/* Models Imports */
import {
  IPorter,
  IRegisterArrivalList,
  ITotalPorters,
} from '@appModels/store/pendings/purchasing-manager/register-arrival/register-arrival-list/register-arrival-list.models';
import {IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {QueryInfo} from 'api-finanzas';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ExportadorOrdenDespachoObj} from 'api-logistica';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';

/* Tools Imports */
import {flow, forEach, orderBy, sumBy} from 'lodash-es';

/* Common Imports */
import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';

export const selectSortList = createSelector(
  selectRegisterArrivalList,
  (state: IRegisterArrivalList) => state.sortList,
);
export const selectSorOption = createSelector(
  selectRegisterArrivalList,
  (state: IRegisterArrivalList) => state.sortByType,
);
export const selectSearchTerm = createSelector(
  selectRegisterArrivalList,
  (state: IRegisterArrivalList) => state.searchTerm,
);
export const selectPorters = createSelector(
  [selectRegisterArrivalList, selectSorOption],
  (state: IRegisterArrivalList, filterSelected: DropListOption) => {
    let porters = state.porters;
    if (filterSelected.value === '1') {
      porters = orderBy(porters, 'MontoTotal', 'desc');
    } else {
      porters = orderBy(porters, 'MontoTotal', 'asc');
    }

    return porters;
  },
);
export const selectIsLoadingPorters = createSelector(
  selectRegisterArrivalList,
  (state: IRegisterArrivalList) =>
    state.portersStatus !== API_REQUEST_STATUS_DEFAULT &&
    state.portersStatus !== API_REQUEST_STATUS_SUCCEEDED,
);
export const selectNeedsToReloadPorters = createSelector(
  selectRegisterArrivalList,
  (state: IRegisterArrivalList) => state.needsToReloadPorter,
);
export const selectNeedsToReloadDonutData = createSelector(
  selectRegisterArrivalList,
  (state: IRegisterArrivalList) => state.needsToReloadDonutData,
);
export const selectQueryInfo = createSelector(
  [selectRegisterArrivalList, selectSearchTerm],
  (state: IRegisterArrivalList, searchTerm: string) => {
    const queryInfo: QueryInfo = {} as QueryInfo;
    queryInfo.Filters = [];
    if (searchTerm !== '') {
      queryInfo.Filters = [
        ...queryInfo.Filters,
        {
          NombreFiltro: 'NombreExportador',
          ValorFiltro: searchTerm,
        },
      ];
    }

    return queryInfo;
  },
);
export const selectTotals = createSelector(selectPorters, (porters: Array<IPorter>) => {
  const totals: ITotalPorters = {
    results: porters.length,
    packages: sumBy(porters, (o: IPorter) => o.TotalBultos),
    petitions: sumBy(porters, (o: IPorter) => o.TotalPedimentos),
    amountTotal: sumBy(porters, (o: IPorter) => o.MontoTotal),
    guides: sumBy(porters, (o: IPorter) => o.TotalGuias),
  };

  return totals;
});
export const selectDataDonut = createSelector(
  selectRegisterArrivalList,
  (state: IRegisterArrivalList) => state.donutData,
);
export const selectTotalsDonut = createSelector(
  selectDataDonut,
  (donutData: Array<ExportadorOrdenDespachoObj>) => {
    const totals: ITotalPorters = {
      results: donutData.length,
      packages: sumBy(donutData, (o: IPorter) => o.TotalBultos),
      petitions: sumBy(donutData, (o: IPorter) => o.TotalPedimentos),
      amountTotal: sumBy(donutData, (o: IPorter) => o.MontoTotal),
      guides: sumBy(donutData, (o: IPorter) => o.TotalGuias),
    };

    return totals;
  },
);
export const selectIsLoadingDonutChart = createSelector(
  selectRegisterArrivalList,
  (state: IRegisterArrivalList) =>
    state.donutDataStatus === API_REQUEST_STATUS_DEFAULT ||
    state.donutDataStatus === API_REQUEST_STATUS_LOADING,
);
export const selectDoughnutChartData = createSelector(
  selectDataDonut,
  (porters: Array<ExportadorOrdenDespachoObj>) => {
    return flow([
      (): IDoughnutChart => {
        let labels: Array<string> = [];
        let values: Array<number> = [];
        forEach(porters, (o: ExportadorOrdenDespachoObj) => {
          labels = [...labels, o.NombreExportador];
          values = [...values, o.TotalGuias];
        });
        return {labels, values};
      },
    ])();
  },
);
export const selectDoughnutChartOptionDetails = createSelector(
  [selectDataDonut, selectTotalsDonut],
  (porters: Array<ExportadorOrdenDespachoObj>, totals: ITotalPorters) =>
    flow([
      (): Array<IDoughnutChartDetails> => {
        return [
          {label: 'AA / Fleteras', value: totals.results.toString()},
          {
            label: 'Guías',
            value: totals.guides.toString(),
          },
          {label: 'Bultos', value: totals.packages.toString()},
          {label: 'Pedimentos', value: totals.petitions.toString()},
          {
            label: 'Total',
            value: `${new CurrencyFormat().transform(totals.amountTotal, 'USD')} USD`,
          },
        ];
      },
    ])(),
);
export const selectDoughnutChartOptionDetailsHover = createSelector(
  selectDataDonut,
  (porters: Array<ExportadorOrdenDespachoObj>) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        let data: Array<Array<IDoughnutChartDetails>> = [];
        forEach(porters, (o: ExportadorOrdenDespachoObj) => {
          let details: Array<IDoughnutChartDetails> = [];
          details = [
            ...details,
            {label: 'Guías', value: o.TotalGuias.toString()},
            {label: 'Bultos', value: o.TotalBultos.toString()},
            {label: 'Pedimentos', value: o.TotalPedimentos.toString()},
            {
              label: 'Valor Total en Cierre',
              value: `${new CurrencyFormat().transform(o.MontoTotal, 'USD')} USD`,
            },
          ];
          data = [...data, details];
        });
        return data;
      },
    ])(),
);
