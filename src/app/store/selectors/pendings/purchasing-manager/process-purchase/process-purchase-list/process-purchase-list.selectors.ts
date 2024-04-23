import {createSelector} from '@ngrx/store';
import {selectProcessPurchaseList} from '@appSelectors/pendings/purchasing-manager/process-purchase/process-purchase.selectors';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {ElementoTramitarCompraDonas, ElementoTramitarCompraDonasUnitario} from 'api-logistica';
import {IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {find, flow, forEach, isEmpty} from 'lodash-es';

import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {API_REQUEST_STATUS_DEFAULT, API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';

export const selectProcessPL = createSelector(selectProcessPurchaseList, (state) => state);

export const selectTab = createSelector(selectProcessPL, (state) => state.tabSelected);
export const selectSortList = createSelector(selectProcessPL, (state) => state.dataByType);
export const selectSort = createSelector(selectProcessPL, (state) => state.filterByType);
export const selectQueryInfoOptions = createSelector(selectProcessPL, (state) => state.queryInfo);
export const selectSearchTerm = createSelector(selectQueryInfoOptions, (state) => state.searchTerm);
export const selectParams = createSelector(
  selectQueryInfoOptions,
  selectSort,
  selectTab,
  selectSearchTerm,
  (queryInfo, sort, tab, searchTerm) => {
    const params = new FiltersOnlyActive();
    params.pageSize = queryInfo.pageSize;
    params.desiredPage = queryInfo.desiredPage;
    params.SortField = 'TotalUSD';
    params.SortDirection = sort.value === '1' ? 'Desc' : 'Asc';
    if (tab.id !== '1') {
      const types = {
        2: 'Regulares',
        3: 'Programadas',
        4: 'FleteExpress',
      };
      params.Filters.push({
        NombreFiltro: types[tab.id],
        ValorFiltro: true,
      });
    }
    if (searchTerm && searchTerm !== '') {
      params.Filters.push({
        NombreFiltro: 'Nombre',
        ValorFiltro: searchTerm,
      });
    }
    return params;
  },
);
export const selectStatusApi = createSelector(
  selectQueryInfoOptions,
  (state) => state.requestStatus,
);
export const selectIsLoadingList = createSelector(
  selectQueryInfoOptions,
  (state) =>
    state.requestStatus !== API_REQUEST_STATUS_DEFAULT &&
    state.requestStatus !== API_REQUEST_STATUS_SUCCEEDED,
);
export const selectProviders = createSelector(selectProcessPL, (state) => state.providers.Results);
export const selectTotalProviders = createSelector(
  selectProcessPL,
  (state) => state.providers.TotalResults,
);
export const selectCurrentPage = createSelector(
  selectQueryInfoOptions,
  (state) => state.desiredPage,
);
export const selectStatusApiDonut = createSelector(
  selectProcessPL,
  (state) => state.statusApiDonut === API_REQUEST_STATUS_SUCCEEDED,
);
export const selectDataDonut = createSelector(selectProcessPL, (state) => state.dataDonuts);
export const selectDataTransit = createSelector(selectDataDonut, (state) =>
  state.TipoDeTransito ? state.TipoDeTransito : {},
);
export const selectTotals = createSelector(selectDataTransit, (state) => ({
  totProducts: !isEmpty(state) ? state.Productos : 0,
  totPieces: !isEmpty(state) ? state.NumeroDePiezas : 0,
  totAmount: !isEmpty(state)
    ? `${new CurrencyFormat().transform(state.ValorTotalUSD, 'USD')} USD`
    : 0,
}));
export const selectTabs = createSelector(
  selectDataTransit,
  (state: ElementoTramitarCompraDonas) => {
    let tabs: Array<ITabOption> = [];
    if (!isEmpty(state)) {
      const regular = find(state.Elementos, (item) => item.Etiqueta === 'Regulares');
      const scheduled = find(state.Elementos, (item) => item.Etiqueta === 'Programadas');
      const expressFreight = find(state.Elementos, (item) => item.Etiqueta === 'FleteExpress');
      tabs = [
        {
          id: '1',
          label: 'Todas',
          activeSubtitle: true,
          labelSubtitle: 'PZAS',
          totalSubtitle: state.NumeroDePiezas ? state.NumeroDePiezas : 0,
        },
        {
          id: '2',
          label: 'Regulares',
          activeSubtitle: true,
          labelSubtitle: 'PZAS',
          totalSubtitle: !isEmpty(regular) ? regular.NumeroDePiezas : 0,
        },
        {
          id: '3',
          label: 'Programadas',
          activeSubtitle: true,
          labelSubtitle: 'PZAS',
          totalSubtitle: !isEmpty(scheduled) ? scheduled.NumeroDePiezas : 0,
        },
        {
          id: '4',
          label: 'Flete Express',
          activeSubtitle: true,
          labelSubtitle: 'PZAS',
          totalSubtitle: !isEmpty(expressFreight) ? expressFreight.NumeroDePiezas : 0,
        },
      ];
    }

    return tabs;
  },
);
export const selectTransitList = createSelector(selectDataDonut, (state) =>
  state.TipoDeTransito.Elementos ? state.TipoDeTransito.Elementos : [],
);
export const selectDoughnutDataTransit = createSelector(
  selectTransitList,
  (list: Array<ElementoTramitarCompraDonasUnitario>) => {
    let data: IDoughnutChart;
    const labels: Array<string> = [];
    const values: Array<number> = [];
    list.forEach((item: ElementoTramitarCompraDonasUnitario) => {
      labels.push(item.Etiqueta);
      values.push(item.NumeroDePiezas);
    });
    data = {labels, values};
    return data;
  },
);
export const selectDoughnutChartTransitOptionDetails = createSelector(
  selectTransitList,
  (list: Array<ElementoTramitarCompraDonasUnitario>) => {
    return flow([
      (): Array<IDoughnutChartDetails> => {
        let totalPieces = 0;
        let totType = 0;
        let amount = 0;
        let totProducts = 0;
        forEach(list, (o: ElementoTramitarCompraDonasUnitario) => {
          totalPieces += o.NumeroDePiezas;
          totProducts += o.Productos;
          amount += o.ValorTotalUSD;
          totType++;
        });

        return [
          {label: 'Piezas', value: totalPieces.toString()},
          {label: 'Productos', value: totProducts.toString()},
          {
            label: 'Tipo de Tránsito',
            value: totType.toString(),
          },
          {
            label: 'Valor Total',
            value: `${new CurrencyFormat().transform(amount, 'USD')} USD`,
          },
        ];
      },
    ])();
  },
);
export const selectDoughnutChartTransitDetailsHover = createSelector(
  selectTransitList,
  (list: Array<ElementoTramitarCompraDonasUnitario>) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];
        forEach(list, (o: ElementoTramitarCompraDonasUnitario) => {
          const details: Array<IDoughnutChartDetails> = [];

          details.push(
            {
              label: 'Piezas',
              value: o.NumeroDePiezas.toString(),
            },
            {
              label: 'Productos',
              value: o.Productos.toString(),
            },
            {
              label: 'Valor Total',
              value: new CurrencyFormat().transform(o.ValorTotalUSD, 'USD'),
            },
          );
          data.push(details);
        });
        return data;
      },
    ])(),
);
export const selectProductionLineList = createSelector(selectDataDonut, (state) =>
  state.LineaDeProducto.Elementos ? state.LineaDeProducto.Elementos : [],
);
export const selectDoughnutDataProductLine = createSelector(
  selectProductionLineList,
  (list: Array<ElementoTramitarCompraDonasUnitario>) => {
    let data: IDoughnutChart;
    const labels: Array<string> = [];
    const values: Array<number> = [];
    list.forEach((item: ElementoTramitarCompraDonasUnitario) => {
      labels.push(item.Etiqueta);
      values.push(item.NumeroDePiezas);
    });
    data = {labels, values};
    return data;
  },
);
export const selectDoughnutChartProductLineOptionDetails = createSelector(
  selectProductionLineList,
  (list: Array<ElementoTramitarCompraDonasUnitario>) => {
    return flow([
      (): Array<IDoughnutChartDetails> => {
        let totalPieces = 0;
        let totType = 0;
        let amount = 0;
        let totProducts = 0;
        forEach(list, (o: ElementoTramitarCompraDonasUnitario) => {
          totalPieces += o.NumeroDePiezas;
          totProducts += o.Productos;
          amount += o.ValorTotalUSD;
          totType++;
        });

        return [
          {label: 'Piezas', value: totalPieces.toString()},
          {label: 'Productos', value: totProducts.toString()},
          {
            label: 'Líneas de Productos',
            value: totType.toString(),
          },
          {
            label: 'Valor Total',
            value: `${new CurrencyFormat().transform(amount, 'USD')} USD`,
          },
        ];
      },
    ])();
  },
);
export const selectDoughnutChartProductLineDetailsHover = createSelector(
  selectProductionLineList,
  (list: Array<ElementoTramitarCompraDonasUnitario>) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];
        forEach(list, (o: ElementoTramitarCompraDonasUnitario) => {
          const details: Array<IDoughnutChartDetails> = [];

          details.push(
            {
              label: 'Piezas',
              value: o.NumeroDePiezas.toString(),
            },
            {
              label: 'Productos',
              value: o.Productos.toString(),
            },
            {
              label: 'Valor Total',
              value: new CurrencyFormat().transform(o.ValorTotalUSD, 'USD'),
            },
          );
          data.push(details);
        });
        return data;
      },
    ])(),
);
export const selectProviderList = createSelector(
  selectDataDonut,
  (state) => state.Proveedores?.Elementos,
);
export const selectDoughnutDataProvider = createSelector(
  selectProviderList,
  (list: Array<ElementoTramitarCompraDonasUnitario>) => {
    let data: IDoughnutChart;
    const labels: Array<string> = [];
    const values: Array<number> = [];
    if (!isEmpty(list)) {
      list.forEach((item: ElementoTramitarCompraDonasUnitario) => {
        labels.push(item.Etiqueta);
        values.push(item.NumeroDePiezas);
      });
    }
    data = {labels, values};
    return data;
  },
);
export const selectDoughnutChartProviderOptionDetails = createSelector(
  selectProviderList,
  (list: Array<ElementoTramitarCompraDonasUnitario>) => {
    return flow([
      (): Array<IDoughnutChartDetails> => {
        let totalPieces = 0;
        let totType = 0;
        let amount = 0;
        let totProducts = 0;
        forEach(list, (o: ElementoTramitarCompraDonasUnitario) => {
          totalPieces += o.NumeroDePiezas;
          totProducts += o.Productos;
          amount += o.ValorTotalUSD;
          totType++;
        });

        return [
          {
            label: 'Proveedores',
            value: totType.toString(),
          },
          {label: 'Piezas', value: totalPieces.toString()},
          {label: 'Productos', value: totProducts.toString()},

          {
            label: 'Valor Total',
            value: `${new CurrencyFormat().transform(amount, 'USD')} USD`,
          },
        ];
      },
    ])();
  },
);
export const selectDoughnutChartProviderDetailsHover = createSelector(
  selectProviderList,
  (list: Array<ElementoTramitarCompraDonasUnitario>) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];
        forEach(list, (o: ElementoTramitarCompraDonasUnitario) => {
          const details: Array<IDoughnutChartDetails> = [];

          details.push(
            {
              label: 'Piezas',
              value: o.NumeroDePiezas.toString(),
            },
            {
              label: 'Productos',
              value: o.Productos.toString(),
            },
            {
              label: 'Valor Total',
              value: new CurrencyFormat().transform(o.ValorTotalUSD, 'USD'),
            },
          );
          data.push(details);
        });
        return data;
      },
    ])(),
);
