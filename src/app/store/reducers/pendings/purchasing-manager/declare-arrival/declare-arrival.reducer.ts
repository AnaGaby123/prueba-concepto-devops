import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  IDeclareArrival,
  initialIDeclareArrival,
  TITLE_DECLARE_ARRIVAL,
} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival.models';
import {declareArrivalListReducer} from '@appReducers/pendings/purchasing-manager/declare-arrival/declare-arrival-list/declare-arrival-list.reducer';
import {declareArrivalDetailsReducer} from '@appReducers/pendings/purchasing-manager/declare-arrival/declare-arrival-details/declare-arrival-details.reducer';
import {declareArrivalActions} from '@appActions/pendings/purchasing-manager/declare-arrival';

export const declareArrivalReducer: ActionReducer<IDeclareArrival> = combineReducers(
  {
    title: createReducer(TITLE_DECLARE_ARRIVAL),
    detailsMode: createReducer(
      initialIDeclareArrival().detailsMode,
      on(declareArrivalActions.SET_IS_DETAILS, (state, {detailsMode}) => detailsMode),
    ),
    allowToDetails: createReducer(
      initialIDeclareArrival().allowToDetails,
      on(declareArrivalActions.SET_ALLOW_TO_DETAILS, (state, {allowToDetails}) => allowToDetails),
    ),
    declareArrivalList: declareArrivalListReducer,
    declareArrivalDetails: declareArrivalDetailsReducer,
  },
  {...initialIDeclareArrival()},
);
