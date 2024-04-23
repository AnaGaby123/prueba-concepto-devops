import {createSelector} from '@ngrx/store';
import {IExecutePayment} from '@appModels/store/pendings/payment-manager/execute-payment/execute-payment.models';
import {selectExecutePayment} from '@appSelectors/pendings/payment-manager/execute-payment/execute-payment.selectors';
// eslint-disable-next-line max-len
import {
  IExecutePaymentList,
  IMonth,
  IWeek,
} from '@appModels/store/pendings/payment-manager/execute-payment/execute-payments-list/execute-payment-list.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IChip} from '@appModels/chip/chip';

export const selectExecutePaymentList = createSelector(
  selectExecutePayment,
  (state: IExecutePayment): IExecutePaymentList => state.executePaymentList,
);
export const selectExecutePaymentListWeek = createSelector(
  selectExecutePaymentList,
  (state: IExecutePaymentList): IWeek => state.weekTab,
);
export const selectExecutePaymentListMonth = createSelector(
  selectExecutePaymentList,
  (state: IExecutePaymentList): IMonth => state.monthTab,
);
export const selectTabOptions = createSelector(
  selectExecutePaymentList,
  (state: IExecutePaymentList): Array<ITabOption> => state.tabOptions,
);
export const selectedTabOption = createSelector(
  selectExecutePaymentList,
  (state: IExecutePaymentList): ITabOption => state.selectedTabOption,
);
export const selectSearchTerm = createSelector(
  selectExecutePaymentListWeek,
  (state: IWeek): string => state.searchTerm,
);
export const selectPaymentOptions = createSelector(
  selectExecutePaymentListWeek,
  (state: IWeek): Array<DropListOption> => state.paymentOptions,
);
export const selectedPaymentOption = createSelector(
  selectExecutePaymentListWeek,
  (state: IWeek): DropListOption => state.selectedPaymentOption,
);
export const selectChipOptions = createSelector(
  selectExecutePaymentListWeek,
  (state: IWeek): Array<IChip> => state.chipOptions,
);

export const selectProviderOptions = createSelector(
  selectExecutePaymentListMonth,
  (state: IMonth): Array<DropListOption> => state.providerOptions,
);

export const selectedProviderOptions = createSelector(
  selectExecutePaymentListMonth,
  (state: IMonth): DropListOption => state.selectedProviderOption,
);

export const selectPaymentStatusOptions = createSelector(
  selectExecutePaymentListMonth,
  (state: IMonth): Array<DropListOption> => state.paymentStatusOptions,
);

export const selectedPaymentStatusOption = createSelector(
  selectExecutePaymentListMonth,
  (state: IMonth): DropListOption => state.selectedPaymentStatusOption,
);

export const selectTypePaymentOptions = createSelector(
  selectExecutePaymentListMonth,
  (state: IMonth): Array<DropListOption> => state.typePaymentOptions,
);

export const selectedTypePaymentOptions = createSelector(
  selectExecutePaymentListMonth,
  (state: IMonth): DropListOption => state.selectedTypePaymentOption,
);

export const selectFromCalendar = createSelector(
  selectExecutePaymentListMonth,
  (state: IMonth): Date => state.fromCalendar,
);

export const selectToCalendar = createSelector(
  selectExecutePaymentListMonth,
  (state: IMonth): Date => state.toCalendar,
);

export const selectFromCalendarString = createSelector(
  selectExecutePaymentListMonth,
  (state: IMonth): string => state.fromCalendarString,
);

export const selectToCalendarString = createSelector(
  selectExecutePaymentListMonth,
  (state: IMonth): string => state.toCalendarString,
);
