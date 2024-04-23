import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  initialIProcessPurchase,
  IProcessPurchase,
  TITLE_PROCESS_PURCHASE,
} from '@appModels/store/pendings/purchasing-manager/process-purchase/process-purchase.models';
import {processPurchaseListReducer} from '@appReducers/pendings/purchasing-manager/process-purchase/process-purchase-list/process-purchase-list.reducer';
import {processPurchaseDetailsReducer} from '@appReducers/pendings/purchasing-manager/process-purchase/process-purchase-details/process-purchase-details.reducer';
/*Actionst Imports*/
import {processPurchaseActions} from '@appActions/pendings/purchasing-manager/process-purchase';

export const processPurchaseReducer: ActionReducer<IProcessPurchase> = combineReducers(
  {
    title: createReducer(TITLE_PROCESS_PURCHASE),
    detailsMode: createReducer(
      initialIProcessPurchase().detailsMode,
      on(processPurchaseActions.SET_IS_DETAILS, (state, {isDetails}) => isDetails),
    ),
    processPurchaseList: processPurchaseListReducer,
    processPurchaseDetails: processPurchaseDetailsReducer,
  },
  {...initialIProcessPurchase()},
);
