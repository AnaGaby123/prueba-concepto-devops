import {createSelector} from '@ngrx/store';
import {CloseOfferState} from '@appModels/store/pendings/close-offer/close-offer.models';
import {
  ClientsListItemForCloseOffer,
  CloseOfferListState,
  ISearchOptions,
} from '@appModels/store/pendings/close-offer/close-offer-list/close-offer-list.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {selectCloseOfferNode} from '@appSelectors/pendings/close-offer/close-offer.selectors';
import {IFilterDate} from '@appModels/filters/Filters';
import {flow, forEach, isEmpty, map as _map, sumBy} from 'lodash-es';

import {
  IBarChart,
  IDoughnutChart,
  IDoughnutChartDetails,
  InitialIBarChart,
} from '@appModels/chart/chart';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {AttributeDashboard, ResumeGroupQueryInfo} from 'api-logistica';
import {
  CloseOfferStatus,
  CloseOfferStatusApiRequest,
  CloseOfferTypes,
} from '@appHelpers/pending/closeOffer/closeOffer.helpers';

export const selectCloseOfferList = createSelector(
  selectCloseOfferNode,
  (state: CloseOfferState): CloseOfferListState => state.closeOfferList,
);
export const selectClients = createSelector(
  selectCloseOfferList,
  (state: CloseOfferListState) => state.clients,
);
export const selectTabOptions = createSelector(
  selectCloseOfferList,
  (state: CloseOfferListState): Array<ITabOption> =>
    _map(
      state.tabOptions,
      (o: ITabOption): ITabOption => {
        if (o.totalSubtitle === 1) {
          return {
            ...o,
            labelSubtitle: 'Cotización',
          };
        }
        return o;
      },
    ),
);
export const selectedTabOption = createSelector(
  selectCloseOfferList,
  (state: CloseOfferListState): ITabOption => state.selectedTabOption,
);
export const selectBurgerOptions = createSelector(
  selectCloseOfferList,
  (state: CloseOfferListState): Array<DropListOption> => state.burgerOptions,
);
export const selectedBurgerOption = createSelector(
  selectCloseOfferList,
  (state: CloseOfferListState): DropListOption => state.selectedBurgerOption,
);
export const selectClientsSearchOptions = createSelector(
  selectCloseOfferList,
  (state: CloseOfferListState): ISearchOptions => state.clientsSearchOptions,
);
export const selectSearchTypeOptions = createSelector(
  selectCloseOfferList,
  (state: CloseOfferListState): Array<DropListOption> => state.searchTypeOptions,
);
export const selectedDateFilterOption = createSelector(
  selectCloseOfferList,
  (state: CloseOfferListState) => state.selectedDateFilterOption,
);
export const selectedSearchTypeOption = createSelector(
  selectCloseOfferList,
  (state) => state.selectedSearchTypeOption,
);
export const selectSearchTerm = createSelector(
  selectCloseOfferList,
  (state: CloseOfferListState): string => state.searchTerm,
);
export const clientListRequestStatus = createSelector(
  selectCloseOfferList,
  (state: CloseOfferListState) => state.clientsListRequestStatus,
);
export const selectDashboardTabsGroupQueryInfo = createSelector(
  selectCloseOfferList,
  (state: CloseOfferListState): ResumeGroupQueryInfo => ({
    Filters: [
      {
        NombreFiltro: 'TieneEstrategia',
        ValorFiltro: true,
      },
      {
        NombreFiltro: 'Publicada',
        ValorFiltro: true,
      },
      {
        NombreFiltro: 'EstadoCotizacionValido',
        ValorFiltro: true,
      },
    ],
    CountElements: [
      {NombreFiltro: 'Total', ValorFiltro: ''},
      {NombreFiltro: 'EstadoCotizacion', ValorFiltro: 'Enviada'},
      {NombreFiltro: 'EstadoCotizacion', ValorFiltro: 'EnProgreso'},
      {NombreFiltro: 'EstadoCotizacion', ValorFiltro: 'AjusteDeOferta'},
    ],
  }),
);
export const selectDashboardListGroupQueryInfo = createSelector(
  [
    selectedSearchTypeOption,
    selectSearchTerm,
    selectedTabOption,
    selectedBurgerOption,
    selectedDateFilterOption,
  ],
  (
    searchTypeOption: DropListOption,
    searchTerm: string,
    tabOption: ITabOption,
    typeFilterOption: DropListOption,
    dateFilterOption: IFilterDate,
  ): ResumeGroupQueryInfo => {
    let filters = {
      Filters: [],
      CountElements: [
        {NombreFiltro: 'Total', ValorFiltro: ''},
        {NombreFiltro: 'EstadoCotizacion', ValorFiltro: 'Enviada'},
        {NombreFiltro: 'EstadoCotizacion', ValorFiltro: 'EnProgreso'},
        {NombreFiltro: 'EstadoCotizacion', ValorFiltro: 'AjusteDeOferta'},
      ],
      SumFields: [
        {NombreFiltro: 'TotalCotizadoUSD', ValorFiltro: ''},
        {NombreFiltro: 'NumeroPartidas', ValorFiltro: ''},
      ],
      Fields: [
        {Campo: 'Nombre'},
        {Campo: 'Estrategia'},
        {
          campo: 'IdAjOfEstrategiaCotizacion',
        },
      ],
      GroupColumn: 'IdCliente',
      SortField: 'Nombre',
      SortDirection: typeFilterOption.label === CloseOfferTypes.MasNuevas ? 'asc' : 'desc',
    };
    filters.Filters.push(
      {
        NombreFiltro: 'TieneEstrategia',
        ValorFiltro: true,
      },
      {
        NombreFiltro: 'Publicada',
        ValorFiltro: true,
      },
      {
        NombreFiltro: 'EstadoCotizacionValido',
        ValorFiltro: true,
      },
    );
    if (searchTerm) {
      filters = {
        ...filters,
        Filters: [
          ...filters.Filters,
          {NombreFiltro: searchTypeOption.value, ValorFiltro: searchTerm},
        ],
      };
    }
    if (tabOption.label !== CloseOfferStatus.Todas) {
      filters = {
        ...filters,
        Filters: [
          ...filters.Filters,
          {
            NombreFiltro: 'EstadoCotizacion',
            ValorFiltro: CloseOfferStatusApiRequest[tabOption.label.replace(/\s+/g, '')],
          },
        ],
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

export const selectMappedClientList = createSelector(
  selectClients,
  (state: Array<ClientsListItemForCloseOffer>): Array<ClientsListItemForCloseOffer> => {
    return _map(state, (o: ClientsListItemForCloseOffer) => {
      const newObject = {...o};
      forEach(o.Atributos, (i: AttributeDashboard) => {
        newObject[i.DescriptionField] = i.ValueField;
      });
      return newObject;
    });
  },
);
export const selectTotalsOfClients = createSelector(selectMappedClientList, (state) =>
  sumBy(state, (o) => o.TotalCotizadoUSD),
);
export const selectTotalQuotations = createSelector(selectMappedClientList, (state) =>
  sumBy(state, (o) => o.Total),
);
export const selectDataBarChart = createSelector(selectTabOptions, (tabs: Array<ITabOption>) => {
  const chartBarData: IBarChart = InitialIBarChart();
  if (!isEmpty(tabs)) {
    chartBarData.labels = ['nuevas', 'en progreso', 'en ajuste'];
    chartBarData.values = [
      sumBy(tabs, (o: ITabOption) => (o.id === '2' ? Number(o.totalSubtitle) : 0)),
      sumBy(tabs, (o: ITabOption) => (o.id === '3' ? Number(o.totalSubtitle) : 0)),
      sumBy(tabs, (o: ITabOption) => (o.id === '4' ? Number(o.totalSubtitle) : 0)),
    ];
    chartBarData.backgroundColor = ['#5d80e4', '#008894', '#f09600'];
    chartBarData.backgroundColorHover = ['#5d80e4', '#008894', '#f09600'];
  }
  return chartBarData;
});

export const selectDataDonutChart = createSelector(
  selectMappedClientList,
  (list: Array<ClientsListItemForCloseOffer>) => {
    const labels: Array<string> = [];
    const values: Array<number> = [];
    list.forEach((item: ClientsListItemForCloseOffer) => {
      labels.push(item.Nombre);
      values.push(item.TotalCotizadoUSD);
    });
    return {labels, values} as IDoughnutChart;
  },
);
export const selectDoughnutChartOptionDetails = createSelector(
  selectMappedClientList,
  (list: Array<ClientsListItemForCloseOffer>) =>
    flow([
      (): Array<IDoughnutChartDetails> => {
        let totalCot = 0;
        let totalP = 0;
        let totValor = 0;
        let totC = 0;

        forEach(list, (o: ClientsListItemForCloseOffer) => {
          totalCot += o.Total;
          totalP += o.NumeroPartidas;
          totValor += o.TotalCotizadoUSD;
          totC++;
        });
        const val = new CurrencyFormat().transform(totValor, 'USD');
        return [
          {
            label: 'Clientes',
            value: totC.toString(),
          },
          {label: 'Cotizaciones', value: totalCot.toString()},
          {label: 'Partidas', value: totalP.toString()},
          {label: 'Valor Total en Cierre', value: val + ' USD'},
        ];
      },
    ])(),
);
export const selectDataDonutOptionDetailHover = createSelector(selectMappedClientList, (list) =>
  flow([
    (): Array<Array<IDoughnutChartDetails>> => {
      const data: Array<Array<IDoughnutChartDetails>> = [];
      forEach(list, (o: ClientsListItemForCloseOffer) => {
        const details: Array<IDoughnutChartDetails> = [];
        details.push(
          {
            label: 'Cotizaciones',
            value: o.Total.toString(),
          },
          {
            label: 'Partidas',
            value: o.NumeroPartidas.toString(),
          },
          {
            label: 'Valor Total en Cierre',
            value: new CurrencyFormat().transform(o.TotalCotizadoUSD, 'USD') + ' USD',
          },
        );
        data.push(details);
      });
      return data;
    },
  ])(),
);
