import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {TITLE_DECLARE_TRANSIT_ARRIVAL} from '@appModels/store/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival.models';
import {
  initialIShipping,
  IShipping,
} from '@appModels/store/pendings/assorting-manager/shipping/shipping.models';
import {shippingDashboardReducer} from '@appReducers/pendings/assorting-manager/shipping/shipping-dashboard/shipping-dashboard.reducer';
import {shippingDetailsReducer} from '@appReducers/pendings/assorting-manager/shipping/shipping-details/shipping-details.reducer';
import {shippingActions} from '@appActions/pendings/assorting-manager/shipping';

export const shippingReducer: ActionReducer<IShipping> = combineReducers({
  title: createReducer(TITLE_DECLARE_TRANSIT_ARRIVAL),
  detailsMode: createReducer(
    initialIShipping().detailsMode,
    on(shippingActions.SET_IS_IN_DETAILS_VIEW, (state, {detailsMode}) => detailsMode),
  ),
  allowToDetails: createReducer(
    initialIShipping().allowToDetails,
    on(shippingActions.SET_ALLOWED_TO_DETAILS, (state, {allowToDetails}) => allowToDetails),
  ),
  shippingDashboard: shippingDashboardReducer,
  shippingDetails: shippingDetailsReducer,
});
