import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
/*Models Import*/
import {
  initialIOrderModificationState,
  IOrderModificationState,
} from '@appModels/store/pendings/order-modification/order-modification.model';
/*Actions Imports*/
import {orderModificationActions} from '@appActions/pendings/order-modification';
/*Reducer imports*/
import {orderModificationListReducer} from '@appReducers/pendings/order-modification/order-modification-list/order-modification-list.reducer';
import {orderModificationDetailsReducer} from '@appReducers/pendings/order-modification/order-modification-details/order-modification-details.reducer';

export const orderModificationReducer: ActionReducer<IOrderModificationState> = combineReducers(
  {
    title: createReducer(initialIOrderModificationState().title),
    isInDetailsView: createReducer(
      initialIOrderModificationState().isInDetailsView,
      on(orderModificationActions.SET_IS_DETAILS, (state, {detailsMode}) => detailsMode),
    ),
    allowedToDetails: createReducer(
      initialIOrderModificationState().allowedToDetails,
      on(
        orderModificationActions.SET_ALLOWED_TO_DETAILS,
        (state, {allowedToDetails}) => allowedToDetails,
      ),
    ),
    orderModificationList: orderModificationListReducer,
    orderModificationDetails: orderModificationDetailsReducer,
  },
  initialIOrderModificationState(),
);
