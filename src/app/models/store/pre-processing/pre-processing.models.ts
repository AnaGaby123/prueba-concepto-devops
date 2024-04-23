import {
  initialPreprocessOrderDashboard,
  IPreprocessOrderDashboardState,
} from '@appModels/store/pre-processing/preprocess-order-dashboard/preprocess-order-dashboard.models';
import {
  initialPreprocessOrderDetails,
  IPreprocessOrderDetails,
} from '@appModels/store/pre-processing/preprocess-order-details/preprocess-order-details.models';

export interface IPreProcessingState {
  preprocessOrderDashboard: IPreprocessOrderDashboardState;
  title: string;
  detailsMode: boolean;
  preProcessOrderDetails: IPreprocessOrderDetails;
  preProcessDetailsComponent: boolean;
}

export const initialPreProcessingState = (): IPreProcessingState => ({
  title: TITLE_PRE_PROCESSING,
  detailsMode: false,
  preprocessOrderDashboard: initialPreprocessOrderDashboard(),
  preProcessOrderDetails: initialPreprocessOrderDetails(),
  preProcessDetailsComponent: false,
});
export const TITLE_PRE_PROCESSING = 'PRETRAMITAR PEDIDO';
