/* Core Imports */
import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  ICheckOcNotArrived,
  initialICheckOcNotArrived,
  TITLE_OC_NOT_ARRIVED,
} from '@appModels/store/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived.models';

/* Reducers Imports */
import {checkOcNotArrivedListReducer} from '@appReducers/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-list/check-oc-not-arrived-list.reducer';
import {checkOcNotArrivedDetailsReducer} from '@appReducers/pendings/purchasing-manager/check-oc-not-arrived/check-out-oc-not-arrived-details/check-out-oc-not-arrived-details.reducer';

/* Actions Imports */
import {checkOcNotArrivedActions} from '@appActions/pendings/purchasing-manager/check-oc-not-arrived';

export const checkOcNotArrivedReducer: ActionReducer<ICheckOcNotArrived> = combineReducers(
  {
    title: createReducer(TITLE_OC_NOT_ARRIVED),
    checkOcNotArrivedList: checkOcNotArrivedListReducer,
    checkOcNotArrivedDetails: checkOcNotArrivedDetailsReducer,
    allowedToDetails: createReducer(
      initialICheckOcNotArrived().allowedToDetails,
      on(
        checkOcNotArrivedActions.SET_ALLOWED_TO_DETAILS_VALUE,
        (state, {allowedToDetails}) => allowedToDetails,
      ),
    ),
    isInDetailsView: createReducer(
      initialICheckOcNotArrived().isInDetailsView,
      on(
        checkOcNotArrivedActions.SET_IS_IN_DETAILS_VIEW,
        (state, {isInDetailsView}) => isInDetailsView,
      ),
    ),
  },
  {...initialICheckOcNotArrived()},
);
