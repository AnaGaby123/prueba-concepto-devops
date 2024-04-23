import {ActionReducer, createReducer} from '@ngrx/store';
import {
  IEventConsoleList,
  initialIEventConsoleList,
} from '@appModels/store/pendings/event-console/event-console-list/event-console-list.models';

export const eventConsoleListReducer: ActionReducer<IEventConsoleList> = createReducer({
  ...initialIEventConsoleList(),
});
