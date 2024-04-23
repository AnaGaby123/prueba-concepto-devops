import * as fromRoot from '@appCore/core.state';
import {DIALOGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {
  ContactForm,
  initialContactFormState,
} from '@appModels/store/dialogs/contact-form/contact-form.model';
import {
  AuthCode,
  initialAuthCodeState,
} from '@appModels/store/dialogs/auth-dialog/auth-dialog.model';
import {
  AvailabilityLetterModel,
  initialAvailabilityLetterState,
} from '@appModels/store/dialogs/availability-letter/availability-letter.model';
import {
  initialTeeDialogState,
  TeeDialog,
} from '@appModels/store/dialogs/tee-dialog/tee-dialog.model';

export interface AppState extends fromRoot.AppState {
  [DIALOGS_FEATURE_KEY]: DialogsState;
}
export interface DialogsState {
  authCode: AuthCode;
  availabilityLetter: AvailabilityLetterModel;
  contactForm: ContactForm;
  teeDialog: TeeDialog;
}

export const initialDialogsState = (): DialogsState => ({
  authCode: initialAuthCodeState(),
  availabilityLetter: initialAvailabilityLetterState(),
  contactForm: initialContactFormState(),
  teeDialog: initialTeeDialogState(),
});
