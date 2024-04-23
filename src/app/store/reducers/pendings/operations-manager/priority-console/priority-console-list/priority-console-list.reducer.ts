/* Core Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  initialIPriorityConsoleList,
  IPriorityConsoleList,
} from '@appModels/store/pendings/operations-manager/priority-console/priority-console-list/priority-console-list.models';
import {priorityConsoleListActions} from '@appActions/pendings/operations-manager';

const initialPriorityConsoleList: IPriorityConsoleList = {
  ...initialIPriorityConsoleList(),
};

export const priorityConsoleListReducer: ActionReducer<IPriorityConsoleList> = createReducer(
  initialPriorityConsoleList,
  on(priorityConsoleListActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
  })),
  on(priorityConsoleListActions.SET_SELECTED_TAB_OPTION_SELECTED, (state, {tabOptionSelected}) => ({
    ...state,
    tabOptionSelected,
  })),
  on(priorityConsoleListActions.SET_SELECTED_FILTER_BY_PRIORITY, (state, {byPriority}) => ({
    ...state,
    byPriority,
  })),
  on(priorityConsoleListActions.SET_SELECTED_FILTER_BY_TYPE, (state, {byType}) => ({
    ...state,
    byType,
  })),
);
