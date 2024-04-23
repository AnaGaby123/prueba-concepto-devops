import {
  initialProcessListState,
  ProcessListState,
} from '@appModels/store/pendings/process/process-list/process-list.models';
import {
  initialProcessDetailsState,
  ProcessDetailsState,
} from '@appModels/store/pendings/process/process-details/process-details.models';

export interface ProcessState {
  processList: ProcessListState;
  processDetails: ProcessDetailsState;
  title: string;
  allowedToDetails: boolean;
  isInDetailsView: boolean;
}

export const initialProcessState = (): ProcessState => ({
  processList: initialProcessListState(),
  processDetails: initialProcessDetailsState(),
  title: 'TRAMITAR',
  allowedToDetails: false,
  isInDetailsView: false,
});
