import {ActionReducer, combineReducers, createReducer} from '@ngrx/store';
import {
  IEventConsole,
  TITLE_EVENT_CONSOLE,
} from '@appModels/store/pendings/event-console/event-console.models';
import {eventConsoleListReducer} from '@appReducers/pendings/event-console/event-console-list/event-console-list.reducer';

export const eventConsoleReducer: ActionReducer<IEventConsole> = combineReducers({
  title: createReducer(TITLE_EVENT_CONSOLE),
  eventConsoleList: eventConsoleListReducer,
});
