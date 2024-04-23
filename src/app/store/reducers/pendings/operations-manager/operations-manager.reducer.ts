/* Store Imports */
import {ActionReducer, combineReducers} from '@ngrx/store';

/* Models Imports */
import {
  initialIOperationsManager,
  IOperationsManager,
} from '@appModels/store/pendings/operations-manager/operations-manager.models';

/* Reducers Imports */
import {shippingConsoleReducer} from '@appReducers/pendings/operations-manager/shipping-console/shipping-console.reducer';
import {priorityConsoleReducer} from '@appReducers/pendings/operations-manager/priority-console/priority-console.reducer';

export const operationsManagerReducers: ActionReducer<IOperationsManager> = combineReducers(
  {
    priorityConsole: priorityConsoleReducer,
    shippingConsole: shippingConsoleReducer,
  },
  {...initialIOperationsManager()},
);
