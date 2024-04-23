import {createReducer} from '@ngrx/store';
import {initialContactFormState} from '@appModels/store/dialogs/contact-form/contact-form.model';

export const contactFormReducer = createReducer(initialContactFormState());
