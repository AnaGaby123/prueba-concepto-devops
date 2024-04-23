/* Store Imports */
import {createSelector} from '@ngrx/store';

import {IPriorityConsoleList} from '@appModels/store/pendings/operations-manager/priority-console/priority-console-list/priority-console-list.models';
import {selectPriorityConsoleList} from '@appSelectors/pendings/operations-manager/priority-console/priority-console.selectors';

export const selectSearchTerm = createSelector(
  selectPriorityConsoleList,
  (state: IPriorityConsoleList) => state.searchTerm,
);
export const filterByPriority = createSelector(
  selectPriorityConsoleList,
  (state: IPriorityConsoleList) => state.filterByPriority,
);
export const filterByPrioritySelected = createSelector(
  selectPriorityConsoleList,
  (state: IPriorityConsoleList) => state.filterByPrioritySelected,
);
export const filterByType = createSelector(
  selectPriorityConsoleList,
  (state: IPriorityConsoleList) => state.filterByType,
);
export const filterByTypeSelected = createSelector(
  selectPriorityConsoleList,
  (state: IPriorityConsoleList) => state.filterByTypeSelected,
);
export const tabOptions = createSelector(
  selectPriorityConsoleList,
  (state: IPriorityConsoleList) => state.tabOptions,
);
export const tabOptionSelected = createSelector(
  selectPriorityConsoleList,
  (state: IPriorityConsoleList) => state.tabOptionSelected,
);
