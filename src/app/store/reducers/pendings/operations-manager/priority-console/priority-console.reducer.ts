/* Store Imports */
import {ActionReducer, combineReducers, createReducer} from '@ngrx/store';
import {
  initialIlPriorityConsole,
  IPriorityConsole,
  TITLE_PRIORITY_CONSOLE,
} from '@appModels/store/pendings/operations-manager/priority-console/priority-console.models';
import {priorityConsoleListReducer} from '@appReducers/pendings/operations-manager/priority-console/priority-console-list/priority-console-list.reducer';

export const priorityConsoleReducer: ActionReducer<IPriorityConsole> = combineReducers(
  {
    title: createReducer(TITLE_PRIORITY_CONSOLE),
    isInDetailsView: createReducer(false),
    allowedToDetails: createReducer(false),
    priorityConsoleList: priorityConsoleListReducer,
  },
  {...initialIlPriorityConsole()},
);
