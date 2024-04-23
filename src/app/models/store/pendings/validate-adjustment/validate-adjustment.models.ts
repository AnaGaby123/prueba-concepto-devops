import {
  initialValidateAdjustmentDashboardState,
  ValidateAdjustmentDashboardState,
} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-dashboard/validate-adjustment-dashboard.models';
import {
  initialValidateAdjustmentDetailsState,
  ValidateAdjustmentDetailsState,
} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-details/validate-adjustment-details.models';

export interface ValidateAdjustmentState {
  validateAdjustmentDashboard: ValidateAdjustmentDashboardState;
  validateAdjustmentDetails: ValidateAdjustmentDetailsState;
  title: string;
  allowedToDetails: boolean;
  isInDetailsView: boolean;
  detailsMode: boolean;
}

export const initialValidateAdjustmentState = (): ValidateAdjustmentState => ({
  validateAdjustmentDashboard: initialValidateAdjustmentDashboardState(),
  validateAdjustmentDetails: initialValidateAdjustmentDetailsState(),
  title: 'VALIDAR AJUSTE A LA ORDEN DE COMPRA',
  allowedToDetails: false,
  isInDetailsView: false,
  detailsMode: false,
});
