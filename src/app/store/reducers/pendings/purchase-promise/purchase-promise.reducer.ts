/* Store Imports */
import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  initialPurchasePromiseState,
  IPurchasePromiseState,
} from '@appModels/store/pendings/purchase-promise/purchase-promise.model';

/* Reducers Imports */
import {purchasePromiseListReducer} from '@appReducers/pendings/purchase-promise/purchase-promise-list/purchase-promise-list.reducer';
import {purchasePromiseDetailsReducer} from '@appReducers/pendings/purchase-promise/purchase-promise-details/purchase-promise-details.reducer';

/* Actions Imports */
import {purchasePromiseActions} from '@appActions/pendings/purchase-promise';

export const purchasePromiseReducer: ActionReducer<IPurchasePromiseState> = combineReducers(
  {
    title: createReducer(initialPurchasePromiseState().title),
    allowedToDetailsView: createReducer(initialPurchasePromiseState().allowedToDetailsView),
    isInDetailsView: createReducer(
      initialPurchasePromiseState().isInDetailsView,
      on(purchasePromiseActions.SET_IS_DETAILS, (state, {isDetails}) => isDetails),
    ),
    purchasePromiseList: purchasePromiseListReducer,
    purchasePromiseDetails: purchasePromiseDetailsReducer,
  },
  {...initialPurchasePromiseState()},
);
