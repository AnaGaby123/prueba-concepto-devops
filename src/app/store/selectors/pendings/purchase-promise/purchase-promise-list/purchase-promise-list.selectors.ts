import {createSelector} from '@ngrx/store';
import {IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {
  ICustomerResults,
  IPurchasePromiseList,
  ISearchOptions,
} from '@appModels/store/pendings/purchase-promise/purchase-promise-list/purchase-promise-list.model';
// utils
import {flow, forEach, map as _map} from 'lodash-es';

import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ResumeGroupQueryInfo} from 'api-logistica';
import {IPurchasePromiseState} from '@appModels/store/pendings/purchase-promise/purchase-promise.model';
import {PurchasePromiseStatus} from '@appHelpers/pending/purchase-promise/purchase-promise.helpers';
import {IFetchMoreItemsInfo} from '@appModels/store/utils/utils.model';
import {selectPurchasePromise} from '@appSelectors/pendings/pendings.selectors';

export const selectPurchasePromiseList = createSelector(
  selectPurchasePromise,
  (state: IPurchasePromiseState) => state.purchasePromiseList,
);
export const selectDataFiltersType = createSelector(
  selectPurchasePromiseList,
  (state: IPurchasePromiseList) => state.dataByType,
);
export const selectDataFilterTypeSelected = createSelector(
  selectPurchasePromiseList,
  (state: IPurchasePromiseList) => state.filterByType,
);
export const selectTabs = createSelector(
  selectPurchasePromiseList,
  (state: IPurchasePromiseList): Array<ITabOption> =>
    _map(state.options, (o: ITabOption) => ({...o})),
);
export const selectTab = createSelector(selectPurchasePromiseList, (state) => state.tapSelected);
export const selectDataFilters = createSelector(
  selectPurchasePromiseList,
  (state: IPurchasePromiseList): ISearchOptions => state.clientsOptions,
);
export const selectIsLoadingList = createSelector(
  selectPurchasePromiseList,
  (state: IPurchasePromiseList) => state.listRequestStatus,
);
export const selectPurchasePromiseDashboardQueryInfo = createSelector(
  selectPurchasePromiseList,
  selectTab,
  selectDataFilterTypeSelected,
  selectDataFilters,
  (
    state: IPurchasePromiseList,
    tab: ITabOption,
    byOrder: DropListOption,
    {searchTerm, dateRange}: ISearchOptions,
  ): ResumeGroupQueryInfo => {
    let filters = {
      Filters: [],
      CountElements: [],
      SumFields: [],
      Fields: [
        {Campo: 'Nombre'},
        {Campo: 'PromesasConOC'},
        {Campo: 'PromesasSinOC'},
        {Campo: 'FechaPromesaDeCompra'},
      ],
      GroupColumn: 'IdCliente',
      SortField: 'Nombre',
      SortDirection: 'asc',
    };
    if (tab.label !== PurchasePromiseStatus.Todos) {
      filters = {
        ...filters,
        Filters: [
          ...filters.Filters,
          {
            NombreFiltro: tab.label.replace(/ /g, ''), // Remove space
            ValorFiltro: 'true',
          },
        ],
      };
    }
    if (byOrder) {
      filters = {
        ...filters,
        SortDirection: byOrder.value,
      };
    }
    if (searchTerm) {
      filters = {
        ...filters,
        Filters: [
          ...filters.Filters,
          {
            NombreFiltro: 'ClienteOC',
            ValorFiltro: searchTerm,
          },
        ],
      };
    }
    if (dateRange) {
      filters = {
        ...filters,
        Filters: [
          ...filters.Filters,
          {
            NombreFiltro: 'FechaInicio',
            ValorFiltro: dateRange.startDate.toISOString().split('T')[0],
          },
          {
            NombreFiltro: 'FechaFin',
            ValorFiltro: dateRange.endDate.toISOString().split('T')[0],
          },
        ],
      };
    }
    return filters;
  },
);
export const selectListCustomer = createSelector(
  selectPurchasePromiseList,
  (state: IPurchasePromiseList) => state.customerList,
);
export const selectTotalCustomer = createSelector(
  selectPurchasePromiseList,
  (state: IPurchasePromiseList) => state.customerList.length,
);
export const selectDataDonutChart = createSelector(
  selectListCustomer,
  (customers: ICustomerResults[]): IDoughnutChart =>
    flow([
      (): IDoughnutChart => {
        const labels: Array<string> = [];
        const values: Array<number> = [];
        forEach(customers, (c: ICustomerResults) => {
          labels.push(c.Nombre);
          values.push(parseInt(String(c.PromesasConOC)) + parseInt(String(c.PromesasSinOC)));
        });
        return {labels, values};
      },
    ])(),
);
export const selectDataDonutOptionsDetails = createSelector(
  selectListCustomer,
  (customers: ICustomerResults[]) =>
    flow([
      (): Array<IDoughnutChartDetails> => {
        let totalCot = 0;
        let totalSCot = 0;
        let totC = 0;
        forEach(customers, (o: ICustomerResults) => {
          totalCot += parseInt(String(o.PromesasConOC));
          totalSCot += parseInt(String(o.PromesasSinOC));
          totC++;
        });
        return [
          {
            label: 'Clientes',
            value: totC.toString(),
          },
          {label: 'Con Oc', value: totalCot.toString()},
          {label: 'Sin Oc', value: totalSCot.toString()},
        ];
      },
    ])(),
);
export const selectDataDonutOptionDetailHover = createSelector(
  selectListCustomer,
  (customers: ICustomerResults[]) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];
        forEach(customers, (o: ICustomerResults) => {
          const details: Array<IDoughnutChartDetails> = [];
          details.push(
            {
              label: 'Con Oc',
              value: o.PromesasConOC.toString(),
            },
            {
              label: 'Sin Oc',
              value: o.PromesasSinOC.toString(),
            },
          );
          data.push(details);
        });
        return data;
      },
    ])(),
);
export const selectCurrentPage = createSelector(
  selectDataFilters,
  (state: ISearchOptions) => state.desiredPage,
);
export const selectTotalOC = createSelector(
  selectListCustomer,
  (state: ICustomerResults[]): number => {
    let total = 0;
    _map(state, (c) => {
      total += parseInt(c.PromesasConOC.toString()) + parseInt(c.PromesasSinOC.toString());
    });
    return total;
  },
);
export const selectPurchasePromiseTabsQueryInfo = createSelector(
  selectPurchasePromise,
  (state: IPurchasePromiseState): ResumeGroupQueryInfo => ({
    SumFields: [
      {
        NombreFiltro: 'Total',
        ValorFiltro: '',
      },
      {
        NombreFiltro: 'PromesasConOC',
        ValorFiltro: '',
      },
      {
        NombreFiltro: 'PromesasSinOC',
        ValorFiltro: '',
      },
    ],
  }),
);
export const selectFetchMoreCustomersInfo = createSelector(
  selectPurchasePromiseList,
  selectTotalCustomer,
  (state: IPurchasePromiseList, total: number): IFetchMoreItemsInfo => {
    return {
      desiredPage: state.clientsOptions.desiredPage,
      itemList: state.customerList,
      itemsTotalLength: total,
      listRequestStatus: state.listRequestStatus,
      pageSize: state.clientsOptions.pageSize,
      totalPages:
        total >= state.clientsOptions.pageSize
          ? Math.ceil(total / state.clientsOptions.pageSize)
          : 0,
    };
  },
);
