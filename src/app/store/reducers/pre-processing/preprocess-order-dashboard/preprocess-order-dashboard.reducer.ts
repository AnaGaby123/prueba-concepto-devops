import {
  initialPreprocessOrderDashboard,
  IPreprocessOrderDashboardState,
} from '@appModels/store/pre-processing/preprocess-order-dashboard/preprocess-order-dashboard.models';
import {createReducer, on} from '@ngrx/store';
// Actions
import * as actions from '@appActions/pre-processing';
import {preProcessOrderDashboardActions} from '@appActions/pre-processing';
import {initialPreProcessingState} from '@appModels/store/pre-processing/pre-processing.models';
import {find, map} from 'lodash-es';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {AttributeDashboard} from 'api-logistica';
import {mapPreProcessingStatusFromApi} from '@appHelpers/pending/pre-processing/pre-processing.helpers';

const initialStatePreprocessOrderDashboard: IPreprocessOrderDashboardState = {
  ...initialPreprocessOrderDashboard(),
};
export const preprocessOrderDashboard = createReducer(
  initialStatePreprocessOrderDashboard,
  on(
    preProcessOrderDashboardActions.SET_TAB_FILTER,
    (state: IPreprocessOrderDashboardState, {tab}): IPreprocessOrderDashboardState => ({
      ...state,
      tapSelected: tab,
    }),
  ),
  on(
    actions.preProcessingActions.SET_INITIAL_STATE,
    () => initialPreProcessingState().preprocessOrderDashboard,
  ),
  on(
    preProcessOrderDashboardActions.FETCH_CLIENTS_SUCCESS,
    (state: IPreprocessOrderDashboardState, {data}): IPreprocessOrderDashboardState => ({
      ...state,
      customerList: data,
    }),
  ),
  on(
    preProcessOrderDashboardActions.FETCH_CLIENTS_LOAD,
    (state: IPreprocessOrderDashboardState): IPreprocessOrderDashboardState => ({
      ...state,
    }),
  ),
  on(
    preProcessOrderDashboardActions.FETCH_TOTAL_TABS_SUCCESS,
    (state: IPreprocessOrderDashboardState, {tabs}): IPreprocessOrderDashboardState => ({
      ...state,
      tabOptions: map(state.tabOptions, (o: ITabOption) => ({
        ...o,
        totalSubtitle: find(
          tabs,
          (i: AttributeDashboard) => i.DescriptionField === mapPreProcessingStatusFromApi[o.label],
        )?.ValueField as string,
      })),
    }),
  ),
  on(
    preProcessOrderDashboardActions.SET_SEARCH_TYPE,
    (state: IPreprocessOrderDashboardState, {searchType}): IPreprocessOrderDashboardState => ({
      ...state,
      typeSelected: searchType,
    }),
  ),
  on(
    preProcessOrderDashboardActions.SET_TERM_SEARCH,
    (state: IPreprocessOrderDashboardState, {term}): IPreprocessOrderDashboardState => ({
      ...state,
      termSearch: term,
    }),
  ),
  on(
    preProcessOrderDashboardActions.SET_FILTER_DATES,
    (state: IPreprocessOrderDashboardState, {dates}): IPreprocessOrderDashboardState => ({
      ...state,
      filterByDates: dates,
    }),
  ),
  on(
    preProcessOrderDashboardActions.SET_ORDER_TYPE,
    (state: IPreprocessOrderDashboardState, {order}): IPreprocessOrderDashboardState => ({
      ...state,
      filterSelected: order,
    }),
  ),
  on(
    preProcessOrderDashboardActions.SET_API_STATUS,
    (state: IPreprocessOrderDashboardState, {status}): IPreprocessOrderDashboardState => ({
      ...state,
      preProcessingCustomerStatus: status,
    }),
  ),
  on(
    preProcessOrderDashboardActions.CLEAN_DATA_DASHBOARD,
    (state: IPreprocessOrderDashboardState): IPreprocessOrderDashboardState =>
      initialPreprocessOrderDashboard(),
  ),
);
