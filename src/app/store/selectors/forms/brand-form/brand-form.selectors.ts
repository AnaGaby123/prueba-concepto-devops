// Selectors
import {selectBrandForms} from '@appSelectors/forms/forms.selectors';
// Models
import {IBrandFormState, popAlert} from '@appModels/store/forms/brand-form/brand-form.models';
// Dev tools
import {createSelector} from '@ngrx/store';

export const selectTitle = createSelector(
  selectBrandForms,
  (state: IBrandFormState) => state.title,
);
export const selectAllowToDetails = createSelector(
  selectBrandForms,
  (state: IBrandFormState) => state.allowToDetails,
);
export const selectIsInDetails = createSelector(
  selectBrandForms,
  (state: IBrandFormState) => state.isInDetails,
);
export const selectPopAlertBrand = createSelector(
  selectBrandForms,
  (state: IBrandFormState): popAlert => state.popAlert,
);
