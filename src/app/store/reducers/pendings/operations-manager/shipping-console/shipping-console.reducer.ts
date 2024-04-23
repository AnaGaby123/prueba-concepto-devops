/* Store Imports */
import {ActionReducer, combineReducers} from '@ngrx/store';

/* Models Imports */
import {IShippingConsole} from '@appModels/store/pendings/operations-manager/shipping-console/shipping-console.models';

/* Reducers Imports */
import {shippingConsoleListReducer} from '@appReducers/pendings/operations-manager/shipping-console/shipping-console-list/shipping-console-list.reducer';

export const shippingConsoleReducer: ActionReducer<IShippingConsole> = combineReducers({
  shippingConsoleList: shippingConsoleListReducer,
});
