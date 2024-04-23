/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectOperationsManager} from '@appSelectors/pendings/pendings.selectors';

/* Models Imports */
import {IOperationsManager} from '@appModels/store/pendings/operations-manager/operations-manager.models';

export const selectShippingConsole = createSelector(
  selectOperationsManager,
  (state: IOperationsManager) => state.shippingConsole,
);
export const selectPriorityConsole = createSelector(
  selectOperationsManager,
  (state: IOperationsManager) => state.priorityConsole,
);
