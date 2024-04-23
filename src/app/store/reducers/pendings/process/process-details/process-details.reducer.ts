import {ActionReducer, createReducer} from '@ngrx/store';
import {
  initialProcessDetailsState,
  ProcessDetailsState,
} from '@appModels/store/pendings/process/process-details/process-details.models';

export const processDetailsReducer: ActionReducer<ProcessDetailsState> = createReducer(
  initialProcessDetailsState(),
);
