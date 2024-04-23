import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  IAttendInvestigationList,
  initialIAttendInvestigationList,
} from '@appModels/store/pendings/attend-investigation/attend-investigation-list/attend-investigation-list.model';
import {attendInvestigationListActions} from '@appActions/pendings/attend-investigation';

/*Tools imports */
import {ApiRequestStatus} from '@appHelpers/shared/shared.helpers';
import {buildAttendInvestigationTabs} from '@appHelpers/pending/new-product-existing-supplier/attend-investigation/attend-investigation.helper';

export const attendInvestigationListReducer: ActionReducer<IAttendInvestigationList> = createReducer(
  {...initialIAttendInvestigationList()},

  on(
    attendInvestigationListActions.INIT_ATTEND_INVESTIGATION_DASHBOARD_COMPONENT_EFFECT,
    (state: IAttendInvestigationList): IAttendInvestigationList => ({
      ...state,
      listProviderStatus: ApiRequestStatus.Loading,
    }),
  ),
  on(
    attendInvestigationListActions.FETCH_ATTEND_INVESTIGATION_DASHBOARD_TABS_TOTALS_FAILED,
    (state: IAttendInvestigationList): IAttendInvestigationList => ({
      ...state,
      listProviderStatus: ApiRequestStatus.Error,
    }),
  ),
  on(
    attendInvestigationListActions.FETCH_ATTEND_INVESTIGATION_DASHBOARD_TABS_TOTALS_SUCCESS,
    (state: IAttendInvestigationList, {tabs}): IAttendInvestigationList => ({
      ...state,
      tabOptions: buildAttendInvestigationTabs(state.tabOptions, tabs),
      tabOptionsApi: tabs,
    }),
  ),
  on(
    attendInvestigationListActions.FETCH_LIST_PROVIDERS_ATTEND_INVESTIGATION_DASHBOARD_SUCCESS,
    (state: IAttendInvestigationList, {listProviders}): IAttendInvestigationList => ({
      ...state,
      listProviders,
      listProviderStatus: ApiRequestStatus.Success,
    }),
  ),
  on(
    attendInvestigationListActions.FETCH_LIST_PROVIDERS_ATTEND_INVESTIGATION_DASHBOARD_FAILED,
    (state: IAttendInvestigationList): IAttendInvestigationList => ({
      ...state,
      listProviderStatus: ApiRequestStatus.Error,
    }),
  ),
  on(
    attendInvestigationListActions.CHANGE_LOADING_STATUS,
    (state: IAttendInvestigationList): IAttendInvestigationList => ({
      ...state,
      listProviders: [],
      listProviderStatus: ApiRequestStatus.Loading,
    }),
  ),
  on(
    attendInvestigationListActions.SET_TAB_OPTION_SELECTED,
    (state: IAttendInvestigationList, {tabOptionSelected}): IAttendInvestigationList => ({
      ...state,
      tabOptionSelected,
    }),
  ),
  on(
    attendInvestigationListActions.SET_ACTIVE_CHART,
    (state: IAttendInvestigationList): IAttendInvestigationList => ({
      ...state,
      activeChart: true,
    }),
  ),
);
