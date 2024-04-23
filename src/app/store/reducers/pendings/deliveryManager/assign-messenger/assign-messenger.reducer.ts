import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  IAssignMessenger,
  initialIAssignMessenger,
  TITLE_ASSIGN_MESSENGER,
} from '@appModels/store/pendings/delivery-manager/assign-messenger/assign-messenger.model';
import {assignMessengerChartsReducer} from '@appReducers/pendings/deliveryManager/assign-messenger/assign-messenger-charts/assgin-messenger-charts.reducer';
import {assignMessengerDetailsReducer} from '@appReducers/pendings/deliveryManager/assign-messenger/assign-messenger-details/assign-messenger-details';
import {assignMessengerActions} from '@appActions/pendings/delivery-manager/assign-messenger';

export const assignMessengerReducer: ActionReducer<IAssignMessenger> = combineReducers({
  title: createReducer(TITLE_ASSIGN_MESSENGER),
  detailsMode: createReducer(
    initialIAssignMessenger().detailsMode,
    on(assignMessengerActions.SET_IS_IN_DETAILS_VIEW, (state, {detailsMode}) => detailsMode),
  ),
  allowToDetails: createReducer(
    initialIAssignMessenger().allowToDetails,
    on(assignMessengerActions.SET_ALLOWED_TO_DETAILS, (state, {allowToDetails}) => allowToDetails),
  ),
  assignMessengerCharts: assignMessengerChartsReducer,
  assignMessengerDetails: assignMessengerDetailsReducer,
});
