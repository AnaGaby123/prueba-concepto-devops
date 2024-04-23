import {createSelector} from '@ngrx/store';
import {API_REQUEST_STATUS_LOADING, DEFAULT_UUID} from '@appUtil/common.protocols';
/*Models Imports*/
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IQueryInfoOptions} from '@appModels/store/utils/utils.model';
/*Selectors Import*/
import {
  selectCustomer,
  selectMessenger,
  selectReviewResults,
} from '@appSelectors/pendings/charges/review-results/review-results.selectors';
import {IChip} from '@appModels/chip/chip';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {find} from 'lodash-es';

export const selectReviewResultL = createSelector(
  selectReviewResults,
  (state) => state.reviewResultsList,
);
export const selectQueryInfo = createSelector(selectReviewResultL, (state) => state.queryInfo);
export const selectOptionTab = createSelector(selectReviewResultL, (state) => state.selectedTab);
export const selectListTotals = createSelector(selectReviewResultL, (state) => state.optionsChip);
export const selectOptionChip = createSelector(selectListTotals, (list) =>
  find(list, (item) => item.active),
);
export const selectParamsList = createSelector(
  selectQueryInfo,
  selectMessenger,
  selectCustomer,
  selectOptionTab,
  selectOptionChip,
  (
    queryInfo: IQueryInfoOptions,
    messenger: DropListOption,
    customer: DropListOption,
    tab: ITabOption,
    chip: IChip,
  ) => {
    const params = new FiltersOnlyActive();
    params.pageSize = queryInfo.pageSize;
    params.desiredPage = queryInfo.desiredPage;
    if (messenger && messenger.value !== DEFAULT_UUID) {
      params.Filters.push({
        NombreFiltro: 'IdUsuarioDestino',
        ValorFiltro: messenger.value,
      });
    }
    if (customer && customer.value !== DEFAULT_UUID) {
      params.Filters.push({
        NombreFiltro: 'IdCliente',
        ValorFiltro: customer.value,
      });
    }
    if (tab && tab.id !== '1') {
      const options = {2: 'Realizada', 3: 'FueraDeTiempo', 4: 'Reprogramada'};
      params.Filters.push({
        NombreFiltro: options[tab.id],
        ValorFiltro: true,
      });
    }
    if (chip && chip.value !== '1') {
      params.Filters.push({
        NombreFiltro: 'RevisionNoRealizada',
        ValorFiltro: chip.value === '3',
      });
    }
    return params;
  },
);
export const selectReviews = createSelector(selectReviewResultL, (state) =>
  state.reviews.Results ? state.reviews.Results : [],
);
export const selectTotalReviews = createSelector(
  selectReviewResultL,
  (state) => state.reviews.TotalResults,
);
export const selectIsLoadingApi = createSelector(
  selectQueryInfo,
  (state) => state.requestStatus === API_REQUEST_STATUS_LOADING,
);
export const selectCurrentPage = createSelector(
  selectQueryInfo,
  (state: IQueryInfoOptions) => state.desiredPage,
);
export const selectTotals = createSelector(selectReviewResultL, (state) => state.totals);

export const selectListChip = createSelector(
  selectListTotals,
  selectTotals,
  (list, totals): Array<IChip> => {
    const listChip: Array<IChip> = [];
    listChip.push(
      {
        ...list[0],
        totalLabel: new CurrencyFormat().transform(totals.Total, 'USD'),
      },
      {
        ...list[1],
        totalLabel: new CurrencyFormat().transform(totals.TotalACobrar, 'USD'),
      },
      {
        ...list[2],
        totalLabel: new CurrencyFormat().transform(totals.TotalConIncidencias, 'USD'),
      },
    );

    return listChip;
  },
);
export const selectIsShowPop = createSelector(selectReviewResultL, (state) => state.activePop);
export const selectReviewCustomer = createSelector(
  selectReviewResultL,
  (state) => state.selectedReviewC,
);
