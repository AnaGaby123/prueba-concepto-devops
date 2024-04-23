import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  initialOfferAdjustmentState,
  OfferAdjustmentState,
} from '@appModels/store/pendings/offer-adjustment/offer-adjustment.model';
import {offerAdjustmentListReducer} from '@appReducers/pendings/offer-adjustment/offer-adjustment-list/offer-adjustment-list.reducer';
import {offerAdjustmentDetailsReducer} from '@appReducers/pendings/offer-adjustment/offer-adjustment-details/offer-adjustment-details.reducer';
import {offerAdjustmentActions} from '@appActions/pendings/offer-adjustment';

export const offerAdjustmentReducer: ActionReducer<OfferAdjustmentState> = combineReducers({
  offerAdjustmentList: offerAdjustmentListReducer,
  offerAdjustmentDetails: offerAdjustmentDetailsReducer,
  title: createReducer(initialOfferAdjustmentState().title),
  detailsMode: createReducer(
    initialOfferAdjustmentState().detailsMode,
    on(offerAdjustmentActions.SET_DETAILS_MODE, (state: boolean, {detailsMode}) => detailsMode),
  ),
  offerAdjustmentDetailsComponent: createReducer(
    initialOfferAdjustmentState().offerAdjustmentDetailsComponent,
    on(
      offerAdjustmentActions.SET_DETAILS_COMPONENT,
      (state: boolean, {detailsComponent}) => detailsComponent,
    ),
  ),
});
