import {createAction, props} from '@ngrx/store';
import {QueryResultAgenteAduanal} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {buildingStringActionType} from '@appUtil/strings';

const typeApi = '[Api - CustomAgentList]';
const typeReducer = '[Reducer - CustomAgentList]';

export const SET_SEARCH_TERM = createAction(
  buildingStringActionType(typeReducer, 'Set search term'),
  props<{searchTerm: string}>(),
);
export const SET_FILTER_OPTION_SELECTED = createAction(
  buildingStringActionType(typeReducer, 'Set filter option selected'),
  props<{filterOption: DropListOption}>(),
);
export const FETCH_CUSTOMS_AGENTS_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch customs agents load'),
);
export const FETCH_CUSTOMS_AGENTS_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch customs agents success'),
  props<{customsAgents: QueryResultAgenteAduanal}>(),
);
export const FETCH_CUSTOMS_AGENTS_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch customs agents failed'),
);
export const RESTORE_LIST_STATE = createAction(
  buildingStringActionType(typeReducer, 'Restore list state'),
);
export const LIST_INIT_ACTIONS_HELPER_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'list init actions helper_effect'),
);
export const SET_CUSTOM_AGENT_HELPER_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Set custom gent helper_effect'),
  props<{customAgent: any}>(),
);
