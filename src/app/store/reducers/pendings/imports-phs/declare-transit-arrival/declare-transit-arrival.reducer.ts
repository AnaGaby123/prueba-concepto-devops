import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  IDeclareTransitArrival,
  initialIDeclareTransitArrival,
  TITLE_DECLARE_TRANSIT_ARRIVAL,
} from '@appModels/store/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival.models';
import {declareTransitArrivalDetailsReducer} from '@appReducers/pendings/imports-phs/declare-transit-arrival/declare-transit-arirval-details/declare-transit-arrival-details.reducer';
import {declareTransitArrivalListReducer} from '@appReducers/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival-list/declare-transit-arrival-list.reducer';
import {declareTransitArrivalActions} from '@appActions/pendings/imports-phs/declare-transit-arrival';

export const declareTransitArrivalReducer: ActionReducer<IDeclareTransitArrival> = combineReducers(
  {
    title: createReducer(TITLE_DECLARE_TRANSIT_ARRIVAL),
    declareTransitArrivalList: declareTransitArrivalListReducer,
    declareTransitArrivalDetails: declareTransitArrivalDetailsReducer,
    allowedToDetails: createReducer(
      initialIDeclareTransitArrival().allowedToDetails,
      on(
        declareTransitArrivalActions.SET_ALLOWED_TO_DETAILS_VALUE,
        (state, {allowedToDetails}) => allowedToDetails,
      ),
    ),
    isInDetailsView: createReducer(
      initialIDeclareTransitArrival().isInDetailsView,
      on(
        declareTransitArrivalActions.SET_IS_IN_DETAILS_VIEW,
        (state, {isInDetailsView}) => isInDetailsView,
      ),
    ),
  },
  {...initialIDeclareTransitArrival()},
);
