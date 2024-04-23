import {createSelector} from '@ngrx/store';
import {selectValidateAdjustment} from '@appSelectors/pendings/pendings.selectors';
import {ValidateAdjustmentState} from '@appModels/store/pendings/validate-adjustment/validate-adjustment.models';
import {
  IValidateAdjustment,
  ValidateAdjustmentDashboardState,
} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-dashboard/validate-adjustment-dashboard.models';
import {AttributeDashboard, ResumeGroupQueryInfo} from 'api-logistica';
import {HIGHER_VALUE} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IFilterDate} from '@appModels/filters/Filters';
import {flow, forEach, map as _map, sumBy} from 'lodash-es';

import {IDoughnutChart, IDoughnutChartDetails, InitialIBarChart} from '@appModels/chart/chart';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';

export const selectValidateAdjustmentDashboard = createSelector(
  selectValidateAdjustment,
  (state: ValidateAdjustmentState): ValidateAdjustmentDashboardState =>
    state.validateAdjustmentDashboard,
);

export const selectFiltersOptions = createSelector(
  selectValidateAdjustmentDashboard,
  (state: ValidateAdjustmentDashboardState): DropListOption[] => state.typeFiltersOptions,
);
export const selectedFiltersOption = createSelector(
  selectValidateAdjustmentDashboard,
  (state: ValidateAdjustmentDashboardState): DropListOption => state.selectedFilterOption,
);

export const selectSearchTypesOptions = createSelector(
  selectValidateAdjustmentDashboard,
  (state: ValidateAdjustmentDashboardState): DropListOption[] => state.searchTypes,
);
export const selectSearchTypeOptionSelected = createSelector(
  selectValidateAdjustmentDashboard,
  (state: ValidateAdjustmentDashboardState): DropListOption => state.selectedSearchType,
);
export const selectSearchTerm = createSelector(
  selectValidateAdjustmentDashboard,
  (state: ValidateAdjustmentDashboardState): string => state.searchTerm,
);
export const selectFiltersDate = createSelector(
  selectValidateAdjustmentDashboard,
  (state: ValidateAdjustmentDashboardState): IFilterDate => state.filtersDate,
);
export const selectListClients = createSelector(
  selectValidateAdjustmentDashboard,
  (state: ValidateAdjustmentDashboardState): IValidateAdjustment[] => state.listClients,
);

export const selectStatusApi = createSelector(
  selectValidateAdjustmentDashboard,
  (state: ValidateAdjustmentDashboardState): number => state.listClientsApiStatus,
);
export const selectTotalsOrders = createSelector(
  selectListClients,
  (state: IValidateAdjustment[]): number => {
    let totalOrders = sumBy(state, (o: IValidateAdjustment) => o.NumeroConOrdenDeCompra);
    return totalOrders;
  },
);

export const selectTotalItemsInOrders = createSelector(
  selectListClients,
  (state: IValidateAdjustment[]): number =>
    sumBy(state, (o: IValidateAdjustment) => o.NumeroPartidas),
);

export const selectTotalOrdersAmount = createSelector(
  selectListClients,
  (state: IValidateAdjustment[]): number => sumBy(state, (o: IValidateAdjustment) => o.TotalUSD),
);

export const selectDashboardListQueryInfo = createSelector(
  selectValidateAdjustmentDashboard,
  selectSearchTypeOptionSelected,
  selectSearchTerm,
  selectedFiltersOption,
  selectFiltersDate,
  (
    state: ValidateAdjustmentDashboardState,
    searchTypeOption: DropListOption,
    searchTerm: string,
    typeFilterOption: DropListOption,
    dateFilterOption: IFilterDate,
  ): ResumeGroupQueryInfo => {
    let filters: ResumeGroupQueryInfo = {
      Filters: [
        {
          NombreFiltro: 'Activo',
          ValorFiltro: true,
        },
        {
          NombreFiltro: 'ValidarAjuste',
          ValorFiltro: '',
        },
      ],
      Fields: [
        {
          Campo: 'IdCliente',
        },
        {
          Campo: 'Nombre',
        },
        {
          Campo: 'NumeroConOrdenDeCompra',
        },
        {
          Campo: 'NumeroSinOrdenDeCompra',
        },
        {
          Campo: 'TotalMXN',
        },
        {
          Campo: 'TotalUSD',
        },
        {
          Campo: 'FechaRegistro',
        },
        {
          Campo: 'NumeroPartidas',
        },
        {
          Campo: 'POriginales',
        },
        {
          Campo: 'PAlternativas',
        },
        {
          Campo: 'PComplementarias',
        },
        {
          Campo: 'PPromocion',
        },
        {
          Campo: 'PAhorro',
        },
      ],
      GroupColumn: 'IdCliente',
      SortField: 'TotalUSD',
      SortDirection: 'desc',
    };

    if (searchTerm) {
      filters = {
        ...filters,
        Filters: [
          ...filters.Filters,
          {
            NombreFiltro: searchTypeOption.value === '1' ? 'Nombre' : 'OrdenDeCompra',
            ValorFiltro: searchTerm,
          },
        ],
      };
    }

    if (typeFilterOption.label !== HIGHER_VALUE) {
      filters = {
        ...filters,
        SortDirection: 'asc',
      };
    }

    if (dateFilterOption) {
      filters = {
        ...filters,
        Filters: [
          ...filters.Filters,
          {
            NombreFiltro: 'FechaInicio',
            ValorFiltro: dateFilterOption.startDate.toISOString().split('T')[0],
          },
          {
            NombreFiltro: 'FechaFin',
            ValorFiltro: dateFilterOption.endDate.toISOString().split('T')[0],
          },
        ],
      };
    }

    return filters;
  },
);

export const selectMappedClientForOrderList = createSelector(
  selectListClients,
  (state: IValidateAdjustment[]) => {
    return _map(state, (o: IValidateAdjustment) => {
      const newObject = {...o};
      forEach(o.Atributos, (i: AttributeDashboard) => {
        newObject[i.DescriptionField] = i.ValueField;
      });
      return newObject;
    });
  },
);
export const selectDataDonutChartData = createSelector(
  selectMappedClientForOrderList,
  (clientList) =>
    flow([
      (): IDoughnutChart => {
        const labels: Array<string> = [];
        const values: Array<number> = [];
        forEach(clientList, (o: IValidateAdjustment) => {
          labels.push(o.Nombre);
          values.push(o.TotalUSD);
        });
        return {labels, values};
      },
    ])(),
);

export const selectDoughnutChartOptionDetails = createSelector(
  selectMappedClientForOrderList,
  (clientList) =>
    flow([
      (): Array<IDoughnutChartDetails> => {
        let totalOC = 0;
        let totalP = 0;
        let total = 0;
        let totC = 0;

        forEach(clientList, (o: IValidateAdjustment) => {
          if (o.NumeroPartidas > 0) {
            totalOC += o.NumeroConOrdenDeCompra;

            totalP += o.NumeroSinOrdenDeCompra;

            total += o.TotalUSD;
            totC++;
          }
        });
        const val = new CurrencyFormat().transform(total, 'USD');

        return [
          {
            label: 'Clientes',
            value: totC.toString(),
          },
          {label: 'Con OC', value: totalOC.toString()},
          {label: 'Sin OC', value: totalP.toString()},
          {label: 'Valor Total', value: `${val + ' USD'}`},
        ];
      },
    ])(),
);
export const selectDoughnutChartOptionDetailsHover = createSelector(
  selectMappedClientForOrderList,
  (clientList) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        let data: Array<Array<IDoughnutChartDetails>> = [];
        forEach(clientList, (o) => {
          let details: Array<IDoughnutChartDetails> = [];
          const val = new CurrencyFormat().transform(o.TotalUSD, 'USD');
          details = [
            ...details,
            {label: 'Con OC', value: o.NumeroConOrdenDeCompra.toString()},
            {
              label: 'Sin OC',
              value: o.NumeroSinOrdenDeCompra.toString(),
            },
            {
              label: 'Valor Total',
              value: `${val + ' USD'}`,
            },
          ];
          data = [...data, details];
        });
        return data;
      },
    ])(),
);

export const selectDataBarChart = createSelector(selectMappedClientForOrderList, (list) => {
  const dataBarChart = InitialIBarChart();
  dataBarChart.labels = ['ORIGINALES', 'ALTERNATIVAS', 'COMPLEMENTARIAS', 'PROMOCIÓN', 'AHORRO'];
  let totalOriginal = 0;
  let totalAlternative = 0;
  let totalComplementary = 0;
  let totalPromotion = 0;
  let totalSave = 0;

  forEach(list, (o: IValidateAdjustment) => {
    totalOriginal += o.POriginales;
    totalAlternative += o.PAlternativas;
    totalComplementary += o.PComplementarias;
    totalPromotion += o.PPromocion;
    totalSave += o.PAhorro;
  });

  dataBarChart.values = [
    totalOriginal,
    totalAlternative,
    totalComplementary,
    totalPromotion,
    totalSave,
  ];

  dataBarChart.backgroundColor = ['#6a6aae', '#cbb7a3', '#008894', '#e29d2a', '#4ba92b'];
  dataBarChart.images = [
    'assets/Images/pre-processing/originales.svg',
    'assets/Images/pre-processing/alternativas.svg',
    'assets/Images/pre-processing/complementarias.svg',
    'assets/Images/pre-processing/promocion.svg',
    'assets/Images/pre-processing/ahorro.svg',
  ];
  return dataBarChart;
});
