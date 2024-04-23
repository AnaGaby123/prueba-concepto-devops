import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  IFollowPurchasePromiseState,
  initialFollowPurchasePromiseState,
} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise.models';
import {followPPromiseListReducer} from '@appReducers/pendings/follow-purchase-promise/follow-purchase-promise-list/follow-purchase-promise-list.reducer';
import {followPPromiseDetailsReducer} from '@appReducers/pendings/follow-purchase-promise/follow-purchase-promise-details/follow-purchase-promise-details.reducer';
import {followPPromiseActions} from '@appActions/pendings/follow-purchase-promise';

export const followPPromiseReducer: ActionReducer<IFollowPurchasePromiseState> = combineReducers({
  title: createReducer(initialFollowPurchasePromiseState().title),
  allowToDetailsView: createReducer(
    initialFollowPurchasePromiseState().allowToDetailsView,
    on(followPPromiseActions.SET_ALLOWED_TO_DETAILS, (state) => !state),
  ),
  isInDetailsView: createReducer(
    initialFollowPurchasePromiseState().isInDetailsView,
    on(followPPromiseActions.SET_IS_DETAILS, (state) => !state),
  ),
  followPPromiseList: followPPromiseListReducer,
  followPPromiseDetails: followPPromiseDetailsReducer,
});
