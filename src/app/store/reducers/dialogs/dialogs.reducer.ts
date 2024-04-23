import {ActionReducer, combineReducers} from '@ngrx/store';
import {DialogsState, initialDialogsState} from '@appModels/store/dialogs/dialogs.model';
import {contactFormReducer} from '@appReducers/dialogs/contact-form/contact-form.reducer';
import {authCodeDialogReducer} from '@appReducers/dialogs/auth-code/auth-code-dialog.reducer';
import {availabilityLetterReducer} from '@appReducers/dialogs/availaibility-letter/availability-letter.reducer';
import {teeDialogReducer} from '@appReducers/dialogs/tee-dialog/tee-dialog.reducer';

export const dialgosReducer: ActionReducer<DialogsState> = combineReducers(
  {
    authCode: authCodeDialogReducer,
    availabilityLetter: availabilityLetterReducer,
    contactForm: contactFormReducer,
    teeDialog: teeDialogReducer,
  },
  {...initialDialogsState()},
);
