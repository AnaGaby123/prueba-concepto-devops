import {
  initialNotProcessedDashboardState,
  NotProcessedDashboardState,
} from '@appModels/store/pendings/not-processed/not-processed-list/not-processed-list.models';
import {
  initialNotProcessedDetailsState,
  NotProcessedDetailsState,
} from '@appModels/store/pendings/not-processed/not-processed-details/not-processed-details.models';

export interface NotProcessedState {
  notProcessedDashboard: NotProcessedDashboardState;
  notProcessedDetails: NotProcessedDetailsState;
  title: string;
  allowedToDetails: boolean;
  isInDetailsView: boolean;
}

export const initialNotProcessedState = (): NotProcessedState => ({
  notProcessedDashboard: initialNotProcessedDashboardState(),
  notProcessedDetails: initialNotProcessedDetailsState(),
  title: 'GESTIONAR PEDIDO INTRAMITABLE',
  allowedToDetails: false,
  isInDetailsView: false,
});
