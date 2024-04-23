/* Store Imports */
import {ActionReducer, combineReducers, createReducer} from '@ngrx/store';

/* Models Imports */
import {
  IRegisterArrival,
  TITLE_REGISTER_ARRIVAL,
} from '@appModels/store/pendings/purchasing-manager/register-arrival/register-arrival.models';

/* Reducers Imports */
import {registerArrivalListReducer} from '@appReducers/pendings/purchasing-manager/register-arrival/register-arrival-list/register-arrival-list.reducer';
import {registerArrivalDetailsReducer} from '@appReducers/pendings/purchasing-manager/register-arrival/register-arrival-details/register-arrival-details.reducer';

export const registerArrivalReducer: ActionReducer<IRegisterArrival> = combineReducers({
  title: createReducer(TITLE_REGISTER_ARRIVAL),
  detailsMode: createReducer(false),
  registerArrivalList: registerArrivalListReducer,
  registerArrivalDetails: registerArrivalDetailsReducer,
});
