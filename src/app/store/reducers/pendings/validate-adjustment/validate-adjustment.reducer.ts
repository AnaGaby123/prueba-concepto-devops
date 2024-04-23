import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';

// Models
import {
  initialValidateAdjustmentState,
  ValidateAdjustmentState,
} from '@appModels/store/pendings/validate-adjustment/validate-adjustment.models';

// Actions
import {validateAdjustmentActions} from '@appActions/pendings/validate-adjustment';

// Reducers
import {validateAdjustmentDashboardReducer} from '@appReducers/pendings/validate-adjustment/validate-adjustment-dashboard/validate-adjustment-dashboard.reducer';
import {validateAdjustmentDetailsReducer} from '@appReducers/pendings/validate-adjustment/validate-adjustment-details/validate-adjustment-details.reducer';

export const validateAdjustmentReducer: ActionReducer<ValidateAdjustmentState> = combineReducers(
  {
    validateAdjustmentDashboard: validateAdjustmentDashboardReducer,
    validateAdjustmentDetails: validateAdjustmentDetailsReducer,
    title: createReducer(initialValidateAdjustmentState().title),
    allowedToDetails: createReducer(
      initialValidateAdjustmentState().allowedToDetails,
      on(
        validateAdjustmentActions.SET_ALLOWED_TO_DETAILS_VALUE,
        (state, {allowedToDetails}) => allowedToDetails,
      ),
    ),
    isInDetailsView: createReducer(
      initialValidateAdjustmentState().isInDetailsView,
      on(
        validateAdjustmentActions.SET_IS_IN_DETAILS_VIEW,
        (state, {isInDetailsView}) => isInDetailsView,
      ),
    ),
    detailsMode: createReducer(
      initialValidateAdjustmentState().detailsMode,
      on(
        validateAdjustmentActions.SET_DETAILS_MODE,
        (state: boolean, {detailsMode}) => detailsMode,
      ),
    ),
  },
  {...initialValidateAdjustmentState()},
);
