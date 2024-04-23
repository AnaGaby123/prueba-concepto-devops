import {ActionReducer, createReducer, on} from '@ngrx/store';
import {IChip} from '@appModels/chip/chip';
import {
  ICollectionMonitoringList,
  initialICollectionMonitoringList,
} from '@appModels/store/pendings/charges/collection-monitoring/collection-monitoring-list/collection-monitoring-list.models';
import {collectionMonitoringListActions} from '@appActions/pendings/charges/collection-monitoring';
import {map as _map} from 'lodash-es';

export const collectionMonitoringListReducer: ActionReducer<ICollectionMonitoringList> = createReducer(
  {...initialICollectionMonitoringList()},
  on(
    collectionMonitoringListActions.SET_SEARCH_TERM,
    (state: ICollectionMonitoringList, {searchTerm}): ICollectionMonitoringList => ({
      ...state,
      weekTab: {
        ...state.weekTab,
        queryInfo: {
          ...state.weekTab.queryInfo,
          searchTerm,
        },
      },
    }),
  ),
  on(
    collectionMonitoringListActions.SET_SELECTED_TAB_OPTION,
    (state: ICollectionMonitoringList, {selectedTabOption}): ICollectionMonitoringList => ({
      ...state,
      selectedTabOption,
    }),
  ),
  on(
    collectionMonitoringListActions.SET_ACTIVE_CHIP,
    (state: ICollectionMonitoringList, {activeChip}): ICollectionMonitoringList => ({
      ...state,

      weekTab: {
        ...state.weekTab,
        chipOptions: _map(state.weekTab.chipOptions, (chip: IChip) => ({
          ...chip,
          active: chip.value === activeChip.value,
        })),
      },
    }),
  ),
  on(
    collectionMonitoringListActions.SET_CURRENT_DATE,
    (state: ICollectionMonitoringList, {currentDate}): ICollectionMonitoringList => ({
      ...state,
      weekTab: {
        ...state.weekTab,
        currentDate,
      },
    }),
  ),
  on(
    collectionMonitoringListActions.SET_ACTUAL_WEEK,
    (state: ICollectionMonitoringList, {actualWeek}): ICollectionMonitoringList => ({
      ...state,
      weekTab: {
        ...state.weekTab,
        actualWeek,
      },
    }),
  ),
  on(
    collectionMonitoringListActions.SET_CALENDAR_API_STATUS,
    (state: ICollectionMonitoringList, {calendarApiStatus}): ICollectionMonitoringList => ({
      ...state,
      weekTab: {
        ...state.weekTab,
        calendarApiStatus,
      },
    }),
  ),
  on(
    collectionMonitoringListActions.FETCH_CALENDAR_DATA_SUCCESS,
    (state: ICollectionMonitoringList, {calendarWeek}): ICollectionMonitoringList => ({
      ...state,
      weekTab: {
        ...state.weekTab,
        calendarWeek,
      },
    }),
  ),
  on(
    collectionMonitoringListActions.SET_FROM_DATE,
    (state: ICollectionMonitoringList, {node, value}): ICollectionMonitoringList => ({
      ...state,
      monthTab: {
        ...state.monthTab,
        [node]: value,
      },
    }),
  ),
  on(
    collectionMonitoringListActions.SET_SELECTED_CLIENT_OPTION,
    (state: ICollectionMonitoringList, {selectedClientOption}): ICollectionMonitoringList => ({
      ...state,
      monthTab: {
        ...state.monthTab,
        selectedClientOption,
      },
    }),
  ),
  on(
    collectionMonitoringListActions.SET_SELECTED_COLLECTION_STATUS_OPTION,
    (
      state: ICollectionMonitoringList,
      {selectedCollectionStatusOption},
    ): ICollectionMonitoringList => ({
      ...state,
      monthTab: {
        ...state.monthTab,
        selectedCollectionStatusOption,
      },
    }),
  ),
  on(
    collectionMonitoringListActions.SET_SELECTED_TYPE_COLLECTION_OPTION,
    (
      state: ICollectionMonitoringList,
      {selectedTypeCollectionOption},
    ): ICollectionMonitoringList => ({
      ...state,
      monthTab: {
        ...state.monthTab,
        selectedTypeCollectionOption,
      },
    }),
  ),
  on(
    collectionMonitoringListActions.SET_SELECTED_TYPE_CLIENT_OPTION,
    (state: ICollectionMonitoringList, {selectedTypeClientOption}): ICollectionMonitoringList => ({
      ...state,
      monthTab: {
        ...state.monthTab,
        selectedTypeClientOption,
      },
    }),
  ),
  on(collectionMonitoringListActions.SET_INITIAL_STATE, (state) =>
    initialICollectionMonitoringList(),
  ),
);
