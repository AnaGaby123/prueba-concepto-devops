import {ActionReducer, createReducer, on} from '@ngrx/store';

// Models
import {
  initialValidateAdjustmentDashboardState,
  ValidateAdjustmentDashboardState,
} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-dashboard/validate-adjustment-dashboard.models';

// Actions
import {validateAdjustmentListActions} from '@appActions/pendings/validate-adjustment';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';

export const validateAdjustmentDashboardReducer: ActionReducer<ValidateAdjustmentDashboardState> = createReducer(
  initialValidateAdjustmentDashboardState(),
  on(
    validateAdjustmentListActions.FETCH_CLIENTS_ADJUSTMENT_DASHBOARD,
    (state: ValidateAdjustmentDashboardState) => ({
      ...state,
      listClientsApiStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(
    validateAdjustmentListActions.SET_SEARCH_TYPE,
    (state, {searchType}): ValidateAdjustmentDashboardState => ({
      ...state,
      selectedSearchType: searchType,
    }),
  ),
  on(
    validateAdjustmentListActions.SET_FILTER_OPTION_SELECTED,
    (
      state: ValidateAdjustmentDashboardState,
      {selectedFilterOption},
    ): ValidateAdjustmentDashboardState => ({
      ...state,
      selectedFilterOption,
      listClients: [],
      listClientsApiStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(
    validateAdjustmentListActions.SET_DATE_RANGE_SELECTED,
    (state: ValidateAdjustmentDashboardState, {dateRange}): ValidateAdjustmentDashboardState => ({
      ...state,
      filtersDate: dateRange,
      listClients: [],
      listClientsApiStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(
    validateAdjustmentListActions.SET_SEARCH_TERM,
    (state: ValidateAdjustmentDashboardState, {searchTerm}): ValidateAdjustmentDashboardState => ({
      ...state,
      searchTerm,
      listClients: [],
      listClientsApiStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(
    validateAdjustmentListActions.FETCH_CLIENTS_ADJUSTMENT_SUCCESS,
    (state, {listClients}): ValidateAdjustmentDashboardState => ({
      ...state,
      listClients: listClients,
      listClientsApiStatus: API_REQUEST_STATUS_SUCCEEDED,
    }),
  ),
  on(
    validateAdjustmentListActions.FETCH_CLIENTS_ADJUSTMENT_FAILED,
    (state): ValidateAdjustmentDashboardState => ({
      ...state,
      listClientsApiStatus: API_REQUEST_STATUS_FAILED,
    }),
  ),
  on(validateAdjustmentListActions.CLEAN_DASHBOARD_STATE, (state) => ({
    ...initialValidateAdjustmentDashboardState(),
  })),
);
