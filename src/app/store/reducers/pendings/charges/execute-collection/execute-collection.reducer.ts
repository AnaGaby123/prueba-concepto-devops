import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  IExecuteCollection,
  initialIExecuteCollection,
  TITLE_EXECUTE_COLLECTION,
} from '@appModels/store/pendings/charges/execute-collection/execute-collection.models';
import {executeCollectionListReducer} from '@appReducers/pendings/charges/execute-collection/execute-collection-list/execute-collection-list.reducer';
import {executeCollectionDetailsReducer} from '@appReducers/pendings/charges/execute-collection/execute-collection-details/execute-collection-details.reducer';
import {executeCollectionActions} from '@appActions/pendings/charges/execute-collection';

export const executeCollectionReducer: ActionReducer<IExecuteCollection> = combineReducers({
  title: createReducer(TITLE_EXECUTE_COLLECTION),
  detailsMode: createReducer(
    initialIExecuteCollection().detailsMode,
    on(
      executeCollectionActions.SET_IS_IN_DETAILS_VIEW,
      (state, {isInDetailsView}) => isInDetailsView,
    ),
  ),
  allowedToDetails: createReducer(
    initialIExecuteCollection().allowedToDetails,
    on(
      executeCollectionActions.SET_ALLOWED_TO_DETAILS,
      (state, {allowedToDetails}) => allowedToDetails,
    ),
  ),
  isInRebillView: createReducer(
    initialIExecuteCollection().isInRebillView,
    on(executeCollectionActions.SET_IS_IN_REBILL_VIEW, (state, {isInRebillView}) => isInRebillView),
  ),
  executeCollectionCalendar: executeCollectionListReducer,
  executeCollectionDetails: executeCollectionDetailsReducer,
});
