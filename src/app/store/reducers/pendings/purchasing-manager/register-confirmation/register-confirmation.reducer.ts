/* Core Imports */
import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  initialIRegisterConfirmation,
  IRegisterConfirmation,
  TITLE_REGISTER_CONFIRMATION,
} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation.models';

/* Reducer Imports */
import {registerConfirmationListReducer} from '@appReducers/pendings/purchasing-manager/register-confirmation/register-confirmation-list/register-confirmation-list.reducer';
import {registerConfirmationDetailsReducer} from '@appReducers/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.reducer';
import {registerConfirmationActions} from '@appActions/pendings/purchasing-manager/register-confirmation';

export const registerConfirmationReducer: ActionReducer<IRegisterConfirmation> = combineReducers({
  title: createReducer(TITLE_REGISTER_CONFIRMATION),
  detailsMode: createReducer(
    initialIRegisterConfirmation().detailsMode,
    on(registerConfirmationActions.SET_IS_DETAILS, (state, {detailsMode}) => detailsMode),
  ),
  allowToDetails: createReducer(
    initialIRegisterConfirmation().allowToDetails,
    on(
      registerConfirmationActions.SET_ALLOW_TO_DETAILS,
      (state, {allowToDetails}) => allowToDetails,
    ),
  ),
  registerConfirmationList: registerConfirmationListReducer,
  registerConfirmationDetails: registerConfirmationDetailsReducer,
});
