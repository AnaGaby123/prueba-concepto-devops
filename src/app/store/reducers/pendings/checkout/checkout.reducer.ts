/* Core Import */
import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';

/* Actions Imports */
import {checkoutActions} from '@appActions/pendings/checkout';

import {checkoutListReducer} from '@appReducers/pendings/checkout/checkout-list/checkout-list.reducer';
import {checkoutDetailsReducer} from '@appReducers/pendings/checkout/checkout-details/checkout-details.reducer';
import {
  CheckoutState,
  initialCheckoutState,
  TITLE_CHECKOUT,
} from '@appModels/store/pendings/checkout/checkout.model';

export const checkoutReducer: ActionReducer<CheckoutState> = combineReducers({
  checkoutList: checkoutListReducer,
  checkoutDetails: checkoutDetailsReducer,
  detailsMode: createReducer(
    initialCheckoutState().detailsMode,
    on(checkoutActions.SET_DETAILS_MODE, (state: boolean, {detailsMode}) => detailsMode),
    on(checkoutActions.CLEAN_ALL_CHECKOUT, () => false),
  ),
  enableEdit: createReducer(
    initialCheckoutState().enableEdit,
    on(checkoutActions.SET_ENABLE_EDIT, (state: boolean, {enableEdit}) => enableEdit),
    on(checkoutActions.CLEAN_ALL_CHECKOUT, () => false),
  ),
  checkoutDetailsComponent: createReducer(
    initialCheckoutState().checkoutDetailsComponent,
    on(
      checkoutActions.SET_DETAILS_COMPONENT,
      (state: boolean, {detailsComponent}) => detailsComponent,
    ),
    on(checkoutActions.CLEAN_ALL_CHECKOUT, () => false),
  ),
  title: createReducer(
    TITLE_CHECKOUT,
    on(checkoutActions.SET_TITLE, (state: string, {title}) => title),
    on(checkoutActions.CLEAN_ALL_CHECKOUT, () => TITLE_CHECKOUT),
  ),
});
