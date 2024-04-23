import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
/*Actions Imports*/
import {planCollectionActions} from '@appActions/pendings/purchasing-manager/manage-back-order';
import {
  initialPlanCollection,
  IPlanCollection,
  TITLE_PLAN_COLLECTION,
} from '@appModels/store/pendings/purchasing-manager/plan-collection/plan-collection.models';

export const plancCollectionReducer: ActionReducer<IPlanCollection> = combineReducers(
  {
    title: createReducer(TITLE_PLAN_COLLECTION),
    detailsMode: createReducer(
      initialPlanCollection().detailsMode,
      on(planCollectionActions.SET_IS_DETAILS, (state, {isDetails}) => isDetails),
    ),
    tabOptions: createReducer(initialPlanCollection().tabOptions),
    filterByValue: createReducer(initialPlanCollection().filterByValue),
    filterBySearch: createReducer(initialPlanCollection().filterBySearch),
    selectedByValue: createReducer(initialPlanCollection().selectedByValue),
    selectedBySearch: createReducer(initialPlanCollection().selectedBySearch),
  },
  {...initialPlanCollection()},
);
