/* Store Imports */
import {ActionReducer, createReducer} from '@ngrx/store';
import {
  IAssignMessengerDetails,
  initialIAssignMessengerDetails,
} from '@appModels/store/pendings/delivery-manager/assign-messenger/assign-messenger-details/assign-messenger-details.model';

export const assignMessengerDetailsReducer: ActionReducer<IAssignMessengerDetails> = createReducer(
  initialIAssignMessengerDetails(),
);
