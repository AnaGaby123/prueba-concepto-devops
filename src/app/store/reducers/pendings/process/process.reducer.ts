import {ActionReducer, combineReducers, createReducer} from '@ngrx/store';
import {initialProcessState, ProcessState} from '@appModels/store/pendings/process/process.models';
import {processListReducer} from '@appReducers/pendings/process/process-list/process-list.reducer';
import {processDetailsReducer} from '@appReducers/pendings/process/process-details/process-details.reducer';

export const processReducer: ActionReducer<ProcessState> = combineReducers(
  {
    processList: processListReducer,
    processDetails: processDetailsReducer,
    title: createReducer(initialProcessState().title),
    allowedToDetails: createReducer(false),
    isInDetailsView: createReducer(false),
  },
  {...initialProcessState()},
);
