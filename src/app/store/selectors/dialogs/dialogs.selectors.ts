import {createFeatureSelector, createSelector} from '@ngrx/store';
import {DialogsState} from '@appModels/store/dialogs/dialogs.model';
import {DIALOGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {TeeDialog} from '@appModels/store/dialogs/tee-dialog/tee-dialog.model';

export const selectDialogsState = createFeatureSelector<DialogsState>(DIALOGS_FEATURE_KEY);

export const selectAuthCodeState = createSelector(
  selectDialogsState,
  (dialogs: DialogsState) => dialogs.authCode,
);
export const selectAvailabilityLetterState = createSelector(
  selectDialogsState,
  (dialogs: DialogsState) => dialogs.availabilityLetter,
);
export const selectTeeDialogData = createSelector(
  selectDialogsState,
  (dialogs: DialogsState): TeeDialog => dialogs.teeDialog,
);
