import {ActionReducer, createReducer} from '@ngrx/store';
import {
  initialProcessListState,
  ProcessListState,
} from '@appModels/store/pendings/process/process-list/process-list.models';

export const processListReducer: ActionReducer<ProcessListState> = createReducer(
  initialProcessListState(),
);
