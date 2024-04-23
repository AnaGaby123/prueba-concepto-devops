import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  initialNotProcessedDashboardState,
  NotProcessedDashboardState,
} from '@appModels/store/pendings/not-processed/not-processed-list/not-processed-list.models';
import {notProcessedDashboardActions} from '@appActions/pendings/not-processed';
import {find, map} from 'lodash-es';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {AttributeDashboard} from 'api-logistica';
import {MapNotProcessedStatusFromApi} from '@appHelpers/pending/not-processed/not-processed.helpers';

export const notProcessedDashboardReducer: ActionReducer<NotProcessedDashboardState> = createReducer(
  initialNotProcessedDashboardState(),
  on(
    notProcessedDashboardActions.SET_TAB_OPTIONS,
    (state: NotProcessedDashboardState, {tabOptions}): NotProcessedDashboardState => ({
      ...state,
      tabOptions,
    }),
  ),
  on(
    notProcessedDashboardActions.SET_TAB_OPTION_SELECTED,
    (state: NotProcessedDashboardState, {selectedTabOption}): NotProcessedDashboardState => ({
      ...state,
      selectedTabOption,
    }),
  ),
  on(
    notProcessedDashboardActions.SET_BURGER_OPTION_SELECTED,
    (state: NotProcessedDashboardState, {selectedBurgerOption}): NotProcessedDashboardState => ({
      ...state,
      selectedBurgerOption,
    }),
  ),
  on(notProcessedDashboardActions.SET_SEARCH_TYPE, (state, {searchType}) => ({
    ...state,
    searchTypeSelected: searchType,
  })),
  on(
    notProcessedDashboardActions.SET_DATE_RANGE_SELECTED,
    (state: NotProcessedDashboardState, {dateRange}): NotProcessedDashboardState => ({
      ...state,
      dateRange,
    }),
  ),
  on(
    notProcessedDashboardActions.SET_SEARCH_TERM,
    (state: NotProcessedDashboardState, {searchTerm}): NotProcessedDashboardState => ({
      ...state,
      searchTerm,
    }),
  ),
  on(
    notProcessedDashboardActions.FETCH_TABS_SUCCESS,
    (state, {tabs}): NotProcessedDashboardState => ({
      ...state,
      tabOptions: map(state.tabOptions, (o: ITabOption) => ({
        ...o,
        totalSubtitle: find(
          tabs,
          (i: AttributeDashboard) => i.DescriptionField === MapNotProcessedStatusFromApi[o.label],
        )?.ValueField as string,
      })),
    }),
  ),
  on(
    notProcessedDashboardActions.FETCH_CLIENT_LIST_SUCCESS,
    (state, {clients}): NotProcessedDashboardState => ({
      ...state,
      clients,
    }),
  ),
  on(
    notProcessedDashboardActions.SET_API_STATUS,
    (state, {status}): NotProcessedDashboardState => ({
      ...state,
      apiStatus: status,
    }),
  ),
  on(notProcessedDashboardActions.CLEAN_DASHBOARD_STATE, (state) => ({
    ...initialNotProcessedDashboardState(),
  })),
);
