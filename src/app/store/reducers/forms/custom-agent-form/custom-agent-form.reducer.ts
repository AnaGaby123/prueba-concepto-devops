import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  ICustomsAgents,
  initialStateCustomAgents,
} from '@appModels/store/forms/custom-agents-forms/custom-agents-forms.models';
import {listCustomsAgentsFormReducer} from '@appReducers/forms/custom-agent-form/custom-agent-list-form/custom-agent-form-list.reducer';
import {detailsCustomsAgentsFormReducer} from '@appReducers/forms/custom-agent-form/custom-agent.details-form/custom-agent-form-details.reducer';
import {
  SET_ALLOW_TO_DETAILS,
  SET_EDIT_MODE,
  SET_ENABLE_EDIT,
  SET_IS_IN_DETAILS,
  SET_TITLE,
} from '@appActions/forms/custom-agent-form/custom-agent-form.actions';

export const customAgentFormReducer: ActionReducer<ICustomsAgents> = combineReducers(
  {
    customsAgentsList: listCustomsAgentsFormReducer,
    customsAgentsDetails: detailsCustomsAgentsFormReducer,

    allowToDetails: createReducer(
      initialStateCustomAgents().allowToDetails,
      on(SET_ALLOW_TO_DETAILS, (state, {allowToDetails}) => allowToDetails),
    ),
    isInDetails: createReducer(
      initialStateCustomAgents().isInDetails,
      on(SET_IS_IN_DETAILS, (state, {isInDetails}) => isInDetails),
    ),
    editMode: createReducer(
      initialStateCustomAgents().editMode,
      on(SET_EDIT_MODE, (state, {editMode}) => editMode),
    ),
    title: createReducer(
      'CATÁLOGO DE AGENTES ADUANALES',
      on(SET_TITLE, (state, {title}) => title),
    ),
    enableEdit: createReducer(
      initialStateCustomAgents().enableEdit,
      on(SET_ENABLE_EDIT, (state, {enableEdit}) => enableEdit),
    ),
  },
  initialStateCustomAgents(),
);
