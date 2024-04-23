import {createSelector} from '@ngrx/store';
import {ICustomsAgents} from '@appModels/store/forms/custom-agents-forms/custom-agents-forms.models';
import {selectCustomAgentForms} from '@appSelectors/forms/forms.selectors';

export const selectEditMode = createSelector(
  selectCustomAgentForms,
  (state: ICustomsAgents) => state.editMode,
);

export const selectTitle = createSelector(
  selectCustomAgentForms,
  (state: ICustomsAgents) => state.title,
);
export const selectEnableEdit = createSelector(
  selectCustomAgentForms,
  (state: ICustomsAgents) => state.enableEdit,
);

export const selectAllowToDetails = createSelector(
  selectCustomAgentForms,
  (state: ICustomsAgents) => state.allowToDetails,
);

export const selectIsInDetails = createSelector(
  selectCustomAgentForms,
  (state: ICustomsAgents) => state.isInDetails,
);
