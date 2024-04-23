import {createAction, props} from '@ngrx/store';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IChip} from '@appModels/chip/chip';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeReducer = 'Execute Payment';

export const SET_SELECTED_TAB_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Tab Option'),
  props<{selectedTabOption: ITabOption}>(),
);

export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set Search Term'),
  props<{searchTerm: string}>(),
);
export const SET_SELECTED_PAYMENT_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Selected Payment Option'),
  props<{selectedPaymentOption: DropListOption}>(),
);
export const SET_CHIP_ACTIVE = createAction(
  buildingStringActionType(typeReducer, 'Set Chip Active'),
  props<{selectedChipOption: IChip}>(),
);

export const SET_SELECTED_PROVIDER_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Provider Option'),
  props<{selectedProviderOption: DropListOption}>(),
);

export const SET_STATUS_PAYMENT_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Status Payment'),
  props<{selectedPaymentStatusOption: DropListOption}>(),
);

export const SET_TYPE_PAYMENT_OPTION = createAction(
  buildingStringActionType(typeReducer, 'Set Type Payment'),
  props<{
    selectedTypePaymentOption: DropListOption;
  }>(),
);

export const SET_FROM_DATE = createAction(
  buildingStringActionType(typeReducer, 'Set Date'),
  props<{node: string; value: Date | string}>(),
);
export const SET_INITIAL_STATE = createAction(
  buildingStringActionType(typeReducer, 'Set Initial State'),
);
