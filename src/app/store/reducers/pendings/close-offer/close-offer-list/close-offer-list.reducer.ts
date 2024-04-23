import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  CloseOfferListState,
  initialCloseOfferListState,
} from '@appModels/store/pendings/close-offer/close-offer-list/close-offer-list.models';
import * as closeOfferListActions from '@appActions/pendings/close-offer/close-offer-list/close-offer-list.actions';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {AttributeDashboard} from 'api-logistica';
import {find, map} from 'lodash-es';
import {mapCloseOfferStatusFromApi} from '@appHelpers/pending/closeOffer/closeOffer.helpers';
import {ApiRequestStatus} from '@appHelpers/shared/shared.helpers';

export const closeOfferListReducer: ActionReducer<CloseOfferListState> = createReducer(
  initialCloseOfferListState(),
  on(
    closeOfferListActions.SET_TAB_OPTION_SELECTED,
    (state: CloseOfferListState, {selectedTabOption}) => ({
      ...state,
      selectedTabOption,
    }),
  ),
  on(
    closeOfferListActions.SET_BURGER_OPTION_SELECTED,
    (state: CloseOfferListState, {selectedBurgerOption}) => ({
      ...state,
      selectedBurgerOption,
    }),
  ),
  on(closeOfferListActions.SET_DATE_RANGE_SELECTED, (state: CloseOfferListState, {dateRange}) => ({
    ...state,
    selectedDateFilterOption: dateRange,
  })),
  on(closeOfferListActions.SET_SEARCH_TERM, (state: CloseOfferListState, {searchTerm}) => ({
    ...state,
    searchTerm,
  })),
  on(
    closeOfferListActions.FETCH_DASHBOARD_CLIENTS_LIST_SUCCESS,
    (state: CloseOfferListState, {clientsList}) => ({
      ...state,
      clients: clientsList,
      clientsListRequestStatus: ApiRequestStatus.Success,
    }),
  ),
  on(closeOfferListActions.FETCH_TAB_OPTIONS_SUCCESS, (state, {tabs}) => ({
    ...state,
    tabOptions: map(state.tabOptions, (o: ITabOption) => ({
      ...o,
      totalSubtitle: find(
        tabs,
        (i: AttributeDashboard) => i.DescriptionField === mapCloseOfferStatusFromApi[o.label],
      )?.ValueField as string,
    })),
  })),
  on(closeOfferListActions.SET_SELECTED_SEARCH_TYPE, (state, {searchType}) => ({
    ...state,
    selectedSearchTypeOption: searchType,
  })),
  on(closeOfferListActions.CHANGE_LOADING_STATUS, (state) => ({
    ...state,
    clientsListRequestStatus: ApiRequestStatus.Loading,
  })),
  on(closeOfferListActions.CLEAN_ALL_CLOSE_OFFER_LIST, (state) => ({
    ...initialCloseOfferListState(),
  })),
);
