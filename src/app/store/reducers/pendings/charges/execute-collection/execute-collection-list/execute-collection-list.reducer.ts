import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  IExecuteCollectionCalendar,
  initialIExecuteCollectionCalendar,
  todayDate,
} from '@appModels/store/pendings/charges/execute-collection/execute-collection-list/execute-collection-list.models';
import {executeCollectionCalendarActions} from '@appActions/pendings/charges/execute-collection';
import {map as _map} from 'lodash-es';

import {IChip} from '@appModels/chip/chip';

export const executeCollectionListReducer: ActionReducer<IExecuteCollectionCalendar> = createReducer(
  {...initialIExecuteCollectionCalendar()},

  on(
    executeCollectionCalendarActions.SET_SEARCH_TERM,
    (state: IExecuteCollectionCalendar, {searchTerm}): IExecuteCollectionCalendar => ({
      ...state,
      weekTab: {
        ...state.weekTab,
        searchTerm,
      },
    }),
  ),
  on(
    executeCollectionCalendarActions.SET_TAB_OPTION_SELECTED,
    (state: IExecuteCollectionCalendar, {tabSelected}): IExecuteCollectionCalendar => ({
      ...state,
      tabSelected,
    }),
  ),
  on(
    executeCollectionCalendarActions.SET_CHIP_ACTIVE,
    (state: IExecuteCollectionCalendar, {chipActive}): IExecuteCollectionCalendar => ({
      ...state,
      weekTab: {
        ...state.weekTab,
        chips: _map(state.weekTab.chips, (chip: IChip) => ({
          ...chip,
          active: chip.value === chipActive.value,
        })),
      },
    }),
  ),
  on(
    executeCollectionCalendarActions.SET_CHARGE_OPTION_SELECTED,
    (state: IExecuteCollectionCalendar, {chargeOptionSelected}): IExecuteCollectionCalendar => ({
      ...state,
      weekTab: {
        ...state.weekTab,
        chargeOptionSelected,
      },
    }),
  ),
  on(
    executeCollectionCalendarActions.FETCH_COLLECTION_CALENDAR_SUCCESS,
    (state: IExecuteCollectionCalendar, {calendarWeek}): IExecuteCollectionCalendar => ({
      ...state,
      weekTab: {
        ...state.weekTab,
        calendarWeek,
      },
    }),
  ),
  on(
    executeCollectionCalendarActions.SET_ACTUAL_WEEK,
    (state: IExecuteCollectionCalendar, {actualWeek}): IExecuteCollectionCalendar => ({
      ...state,
      weekTab: {
        ...state.weekTab,
        actualWeek,
      },
    }),
  ),
  on(
    executeCollectionCalendarActions.SET_CALENDAR_WEEK,
    (state: IExecuteCollectionCalendar, {calendarWeek}): IExecuteCollectionCalendar => ({
      ...state,
      weekTab: {
        ...state.weekTab,
        calendarWeek,
      },
    }),
  ),
  on(
    executeCollectionCalendarActions.SET_SELECTED_WEEK,
    (state: IExecuteCollectionCalendar, {value}): IExecuteCollectionCalendar => ({
      ...state,
      weekTab: {
        ...state.weekTab,
        selectedWeek:
          value === 'next'
            ? new Date(state.weekTab.selectedWeek.setDate(state.weekTab.selectedWeek.getDate() + 7))
            : value === 'previous'
            ? new Date(state.weekTab.selectedWeek.setDate(state.weekTab.selectedWeek.getDate() - 7))
            : todayDate(),
      },
    }),
  ),
  on(
    executeCollectionCalendarActions.SET_DAY_STATUS,
    (state: IExecuteCollectionCalendar, {dayStatus}) => ({
      ...state,
      weekTab: {
        ...state.weekTab,
        dayStatus,
      },
    }),
  ),
  on(
    executeCollectionCalendarActions.SET_SELECTED_CLIENT_OPTIONS,
    (state: IExecuteCollectionCalendar, {selectedClientOption}): IExecuteCollectionCalendar => ({
      ...state,
      monthTab: {
        ...state.monthTab,
        selectedClientOption,
      },
    }),
  ),
  on(
    executeCollectionCalendarActions.SET_SELECTED_PAYMENT_STATUS_OPTION,
    (
      state: IExecuteCollectionCalendar,
      {selectedPaymentStatusOption},
    ): IExecuteCollectionCalendar => ({
      ...state,
      monthTab: {
        ...state.monthTab,
        selectedPaymentStatusOption,
      },
    }),
  ),
  on(
    executeCollectionCalendarActions.SET_SELECTED_TYPE_PAYMENT_OPTIONS,
    (
      state: IExecuteCollectionCalendar,
      {selectedTypePaymentOption},
    ): IExecuteCollectionCalendar => ({
      ...state,
      monthTab: {
        ...state.monthTab,
        selectedTypePaymentOption,
      },
    }),
  ),
  on(
    executeCollectionCalendarActions.SET_SELECTED_TYPE_CLIENT_OPTIONS,
    (
      state: IExecuteCollectionCalendar,
      {selectedTypeClientOption},
    ): IExecuteCollectionCalendar => ({
      ...state,
      monthTab: {
        ...state.monthTab,
        selectedTypeClientOption,
      },
    }),
  ),
  on(
    executeCollectionCalendarActions.SET_FROM_DATE,
    (state: IExecuteCollectionCalendar, {node, value}): IExecuteCollectionCalendar => ({
      ...state,
      monthTab: {
        ...state.monthTab,
        [node]: value,
      },
    }),
  ),
  on(executeCollectionCalendarActions.SET_INITIAL_STATE, (state) =>
    initialIExecuteCollectionCalendar(),
  ),
);
