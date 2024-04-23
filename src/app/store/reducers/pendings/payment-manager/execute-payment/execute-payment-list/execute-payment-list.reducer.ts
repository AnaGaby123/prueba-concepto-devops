import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  IExecutePaymentList,
  initialIExecutePaymentList,
} from '@appModels/store/pendings/payment-manager/execute-payment/execute-payments-list/execute-payment-list.models';
import {executePaymentListActions} from '@appActions/pendings/payment-manager';

import {map} from 'lodash-es';
import {IChip} from '@appModels/chip/chip';

export const executePaymentListReducer: ActionReducer<IExecutePaymentList> = createReducer(
  initialIExecutePaymentList(),
  on(
    executePaymentListActions.SET_SELECTED_TAB_OPTION,
    (state: IExecutePaymentList, {selectedTabOption}): IExecutePaymentList => ({
      ...state,
      selectedTabOption,
    }),
  ),
  on(
    executePaymentListActions.SET_CHIP_ACTIVE,
    (state: IExecutePaymentList, {selectedChipOption}): IExecutePaymentList => ({
      ...state,
      weekTab: {
        ...state.weekTab,
        chipOptions: map(state.weekTab.chipOptions, (chip: IChip) => ({
          ...chip,
          active: chip.value === selectedChipOption.value,
        })),
      },
    }),
  ),

  on(
    executePaymentListActions.SET_SEARCH_TERM,
    (state: IExecutePaymentList, {searchTerm}): IExecutePaymentList => ({
      ...state,
      weekTab: {
        ...state.weekTab,
        searchTerm,
      },
    }),
  ),
  on(
    executePaymentListActions.SET_SELECTED_PAYMENT_OPTION,
    (state: IExecutePaymentList, {selectedPaymentOption}): IExecutePaymentList => ({
      ...state,
      weekTab: {
        ...state.weekTab,
        selectedPaymentOption,
      },
    }),
  ),
  on(
    executePaymentListActions.SET_SELECTED_PROVIDER_OPTION,
    (state: IExecutePaymentList, {selectedProviderOption}): IExecutePaymentList => ({
      ...state,
      monthTab: {
        ...state.monthTab,
        selectedProviderOption,
      },
    }),
  ),
  on(
    executePaymentListActions.SET_STATUS_PAYMENT_OPTION,
    (state: IExecutePaymentList, {selectedPaymentStatusOption}): IExecutePaymentList => ({
      ...state,
      monthTab: {
        ...state.monthTab,
        selectedPaymentStatusOption,
      },
    }),
  ),
  on(
    executePaymentListActions.SET_TYPE_PAYMENT_OPTION,
    (state: IExecutePaymentList, {selectedTypePaymentOption}): IExecutePaymentList => ({
      ...state,
      monthTab: {
        ...state.monthTab,
        selectedTypePaymentOption,
      },
    }),
  ),
  on(
    executePaymentListActions.SET_FROM_DATE,
    (state: IExecutePaymentList, {node, value}): IExecutePaymentList => ({
      ...state,
      monthTab: {
        ...state.monthTab,
        [node]: value,
      },
    }),
  ),
  on(executePaymentListActions.SET_INITIAL_STATE, (state) => initialIExecutePaymentList()),
);
