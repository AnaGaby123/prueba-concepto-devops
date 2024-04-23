import {createFeatureSelector, createSelector} from '@ngrx/store';

import {FormsState} from '@appModels/store/forms/forms.models';

import {FORMS_FEATURE_KEY} from '@appUtil/common.protocols';

export const selectFormsState = createFeatureSelector<FormsState>(FORMS_FEATURE_KEY);

export const selectForms = createSelector(selectFormsState, (state: FormsState) => state);

export const selectProviderForms = createSelector(
  selectForms,
  (state: FormsState) => state.providersForm,
);
export const selectProductForms = createSelector(
  selectForms,
  (state: FormsState) => state?.productsForm,
);
export const selectBrandForms = createSelector(
  selectForms,
  (state: FormsState) => state.brandsForm,
);
export const selectCustomAgentForms = createSelector(
  selectForms,
  (state: FormsState) => state.customsAgentsForm,
);
export const selectClientForms = createSelector(
  selectForms,
  (state: FormsState) => state.clientsForm,
);
