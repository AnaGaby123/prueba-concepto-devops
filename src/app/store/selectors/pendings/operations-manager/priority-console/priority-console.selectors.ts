/* Store Imports */
import {createSelector} from '@ngrx/store';
import {selectPriorityConsole} from '@appSelectors/pendings/operations-manager/operations-manager.selectors';
import {IPriorityConsole} from '@appModels/store/pendings/operations-manager/priority-console/priority-console.models';

/* Selectors Imports */

export const selectPriorityConsoleList = createSelector(
  selectPriorityConsole,
  (state: IPriorityConsole) => state.priorityConsoleList,
);
export const selectTitle = createSelector(
  selectPriorityConsole,
  (state: IPriorityConsole): string => state.title,
);
