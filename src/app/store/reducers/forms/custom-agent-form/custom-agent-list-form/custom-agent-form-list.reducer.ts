import {createReducer, on} from '@ngrx/store';
import {
  ICustomsAgentsList,
  initialStateCustomsAgentsList,
} from '@appModels/store/forms/custom-agents-forms/custom-agents-list-forms/custom-agents-list-forms.models';
import {customAgentListActions} from '@appActions/forms/custom-agent-form';

const initialListCustomsAgentsForm: ICustomsAgentsList = {
  ...initialStateCustomsAgentsList(),
};
export const listCustomsAgentsFormReducer = createReducer(
  initialListCustomsAgentsForm,
  on(customAgentListActions.FETCH_CUSTOMS_AGENTS_SUCCESS, (state, {customsAgents}) => ({
    ...state,
    customsAgents,
  })),
  on(customAgentListActions.SET_FILTER_OPTION_SELECTED, (state, {filterOption}) => ({
    ...state,
    filterOptionSelected: filterOption,
  })),
  on(customAgentListActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
  })),
  on(customAgentListActions.RESTORE_LIST_STATE, (state) => ({
    ...initialStateCustomsAgentsList(),
  })),
);
