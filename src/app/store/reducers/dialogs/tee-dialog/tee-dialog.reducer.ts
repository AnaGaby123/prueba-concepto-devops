import {createReducer, on} from '@ngrx/store';
import {initialTeeDialogState} from '@appModels/store/dialogs/tee-dialog/tee-dialog.model';
import {checkoutDetailsActions} from '@appActions/pendings/checkout';

export const teeDialogReducer = createReducer(
  initialTeeDialogState(),
  on(checkoutDetailsActions.SHOW_TEE_DIALOG, (state, {item, emit}) => ({
    ...state,
    item,
    emit,
  })),
);
