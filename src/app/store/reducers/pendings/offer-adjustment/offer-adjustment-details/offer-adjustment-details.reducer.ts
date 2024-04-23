/* Core Imports */
import {combineReducers, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  initialOfferAdjustmentDetailsState,
  OfferAdjustmentDetailsState,
} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-details/offer-adjustment-details.model';

/* Reducers Imports*/
import {detailsReducer} from '@appReducers/pendings/offer-adjustment/offer-adjustment-details/details/details.reducer';
import {offerAdjustmentListActions} from '@appActions/pendings/offer-adjustment';
import {IEvisResults} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-list/offer-adjustment-list.model';

const initialStateOfferAdjustment: OfferAdjustmentDetailsState = {
  ...initialOfferAdjustmentDetailsState(),
};

export const offerAdjustmentDetailsReducer = combineReducers(
  {
    userSelected: createReducer(
      {} as IEvisResults,
      on(offerAdjustmentListActions.SET_USER_SELECTED, (state, {userSelected}) => ({
        ...userSelected,
      })),
      on(offerAdjustmentListActions.CLEAN_USER_SELECTED, (state) => ({
        ...({} as IEvisResults),
      })),
    ),
    details: detailsReducer,
  },
  initialStateOfferAdjustment,
);
