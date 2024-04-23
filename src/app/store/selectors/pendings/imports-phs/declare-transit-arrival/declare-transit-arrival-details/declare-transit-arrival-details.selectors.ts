import {createSelector} from '@ngrx/store';
import {selectDeclareTransitArrival} from '@appSelectors/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival.selectors';
import {
  IDeclareTransitArrivalDetails,
  IDeclareTransitArrivalTotals,
  IItemsDeclareTransitArrival,
  IPurchaseOrderTransitArrival,
  TIMES,
} from '@appModels/store/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival-details/declare-transit-arrival-details.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IDeclareTransitArrival} from '@appModels/store/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival.models';
import {differenceWith, filter, flow, isEmpty, isEqual, map as _map, sumBy} from 'lodash-es';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-list/declare-arrival-list.models';
import {IListTotals} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';
import {FiltersOnlyActive, IFilters} from '@appModels/filters/Filters';
import {OcPackingList} from 'api-logistica';

export const selectDetails = createSelector(
  selectDeclareTransitArrival,
  (state: IDeclareTransitArrival): IDeclareTransitArrivalDetails =>
    state.declareTransitArrivalDetails,
);
export const selectNeedsToReloadOrders = createSelector(
  selectDetails,
  (state: IDeclareTransitArrivalDetails): boolean => state?.needsToReloadOrders,
);
export const selectTabOptions = createSelector(
  selectDetails,
  (state: IDeclareTransitArrivalDetails): Array<ITabOption> =>
    !isEmpty(state.selectedProvider)
      ? _map(state?.tabOptions, (o: ITabOption) => ({
          ...o,
          totalSubtitle:
            o.id === '1'
              ? state.selectedProvider.TotalOrdenesDeCompra
              : o.id === '2'
              ? state.selectedProvider.TotalFueraDeTiempo
              : o.id === '3'
              ? state.selectedProvider.TotalUrgente
              : state.selectedProvider.TotalEnTiempo,
        }))
      : state?.tabOptions,
);
export const selectPurchaseOrders = createSelector(
  selectDetails,
  (state: IDeclareTransitArrivalDetails): Array<IPurchaseOrderTransitArrival> =>
    state?.purchaseOrders,
);
export const selectedOrder = createSelector(
  selectDetails,
  (state: IDeclareTransitArrivalDetails): IPurchaseOrderTransitArrival =>
    state?.selectedPurchaseOrder,
);
export const selectedTabOption = createSelector(
  selectDetails,
  (state: IDeclareTransitArrivalDetails): ITabOption => state?.selectedTabOption,
);
export const selectSortList = createSelector(
  selectDetails,
  (state: IDeclareTransitArrivalDetails) => state.dataByType,
);
export const selectSort = createSelector(
  selectDetails,
  (state: IDeclareTransitArrivalDetails) => state.filterByType,
);
export const selectGetOrdersFilters = createSelector(
  selectDetails,
  (state: IDeclareTransitArrivalDetails): IFilters => {
    const params = new FiltersOnlyActive();
    params.Filters.push({
      NombreFiltro: 'IdProveedor',
      ValorFiltro: state?.selectedProvider.IdProveedor,
    });
    params.Filters.push({
      NombreFiltro: 'PHS',
      ValorFiltro: true,
    });
    if (state?.selectedTabOption?.id !== '1') {
      params.Filters.push({
        NombreFiltro: TIMES[state?.selectedTabOption?.id],
        ValorFiltro: true,
      });
    }
    if (state?.searchTerm) {
      params.Filters.push({
        NombreFiltro: 'NumeroOrdenDeCompra',
        ValorFiltro: state?.searchTerm,
      });
    }
    params.SortField = 'TotalUSD';
    params.SortDirection = state.filterByType.value === '1' ? 'desc' : 'asc';
    return params;
  },
);
export const selectGetItemsFilters = createSelector(
  selectedOrder,
  (order: IPurchaseOrderTransitArrival): IFilters => {
    const params = new FiltersOnlyActive(true);
    params.Filters.push(
      {
        NombreFiltro: 'IdOcOrdenDeCompra',
        ValorFiltro: order.IdOcOrdenDeCompra,
      },
      {
        NombreFiltro: 'PHS',
        ValorFiltro: true,
      },
      {
        NombreFiltro: 'CDConfirmado',
        ValorFiltro: true,
      },
      {
        NombreFiltro: 'PackingListDeclarado',
        ValorFiltro: false,
      },
    );
    params.SortField = 'Indice';
    params.SortDirection = 'asc';
    return params;
  },
);

export const selectProvider = createSelector(
  selectDetails,
  (state: IDeclareTransitArrivalDetails): IProvider => state.selectedProvider,
);
export const selectPackingList = createSelector(
  selectDetails,
  (state: IDeclareTransitArrivalDetails): File => state.packingList,
);
export const selectOcPackingList = createSelector(
  selectDetails,
  (state: IDeclareTransitArrivalDetails): OcPackingList => state.ocPackingList,
);
export const selectedListTotals = createSelector(
  [selectDetails, selectProvider],
  (state: IDeclareTransitArrivalDetails, provider: IProvider): IListTotals => ({
    number: state?.purchaseOrders?.length,
    pieces: provider?.NumeroDePiezas,
    amount: provider?.TotalUSD,
  }),
);
export const selectedItems = createSelector(
  selectDetails,
  (state: IDeclareTransitArrivalDetails): Array<IItemsDeclareTransitArrival> =>
    state?.selectedItems,
);
export const selectedFilteredItems = createSelector(
  selectDetails,
  (state: IDeclareTransitArrivalDetails): Array<IItemsDeclareTransitArrival> =>
    !isEmpty(state.filterByLetter)
      ? filter(
          state?.selectedItems,
          (o: IItemsDeclareTransitArrival) => o.Initial === state.filterByLetter.label,
        )
      : state?.selectedItems,
);
export const selectItems = createSelector(
  [selectedOrder, selectedItems],
  (
    state: IPurchaseOrderTransitArrival,
    configuredItems: Array<IItemsDeclareTransitArrival>,
  ): Array<IItemsDeclareTransitArrival> =>
    flow(
      () => differenceWith(state?.items, configuredItems, isEqual),
      (items) =>
        !isEmpty(state.filterByLetter)
          ? filter(
              items,
              (o: IItemsDeclareTransitArrival) => o.Initial === state.filterByLetter.label,
            )
          : items,
    )(),
);
export const selectTotalsItems = createSelector(
  selectItems,
  (items: Array<IItemsDeclareTransitArrival>): IDeclareTransitArrivalTotals => ({
    length: items.length,
    price: sumBy(items, (o: IItemsDeclareTransitArrival) => Number(o.PrecioLista)),
    quantity: sumBy(items, (o: IItemsDeclareTransitArrival) => Number(o.NumeroDePiezas)),
    amount: sumBy(items, (o: IItemsDeclareTransitArrival) => Number(o.TotalPartida)),
  }),
);
export const selectTotalsSelectedItems = createSelector(
  selectedItems,
  (items: Array<IItemsDeclareTransitArrival>): IDeclareTransitArrivalTotals => ({
    length: items.length,
    price: sumBy(items, (o: IItemsDeclareTransitArrival) => Number(o.PrecioLista)),
    quantity: sumBy(items, (o: IItemsDeclareTransitArrival) => Number(o.NumeroDePiezas)),
    amount: sumBy(items, (o: IItemsDeclareTransitArrival) => Number(o.TotalPartida)),
  }),
);

export const validatorForGenerateButton = createSelector(
  [selectDetails, selectedItems],
  (
    state: IDeclareTransitArrivalDetails,
    configuredItems: Array<IItemsDeclareTransitArrival>,
  ): boolean => !!(!isEmpty(configuredItems) && state.packingList),
);
