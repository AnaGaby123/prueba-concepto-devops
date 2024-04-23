import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  initialProviderState,
  ProvidersState,
} from '@appModels/store/forms/providers/providers.models';
import {listProvidersFormReducer} from '@appReducers/forms/providers/providers-list/providers-list.reducer';
import {initialListProvidersForm} from '@appModels/store/forms/providers/providers-list/providers-list.models';
import {
  SET_ACTUAL_STEP,
  SET_ADD_EDIT_COMPONENT,
  SET_ENABLE_EDIT,
  SET_MODE_EDIT,
  SET_TITLE,
} from '@appActions/forms/providers/providers.actions';
import {providersDetailsReducer} from '@appReducers/forms/providers/providers-details/providers-details.reducer';
import {InitialProvidersAddEditFormModel} from '@appModels/store/forms/providers/providers-details/providers-details.models';

export const providersReducer: ActionReducer<ProvidersState> = combineReducers(
  {
    listProviders: listProvidersFormReducer,
    providersAddEdit: providersDetailsReducer,
    modeEdit: createReducer(
      initialProviderState().modeEdit,
      on(SET_MODE_EDIT, (state, action) => action.modeEdit),
    ),
    addEditComponent: createReducer(
      initialProviderState().addEditComponent,
      on(SET_ADD_EDIT_COMPONENT, (state, action) => action.addEditComponent),
    ),
    title: createReducer(
      'CATÁLOGO DE PROVEEDORES',
      on(SET_TITLE, (state, action) => action.title),
    ),
    enableEdit: createReducer(
      initialProviderState().enableEdit,
      on(SET_ENABLE_EDIT, (state, action) => action.enableEdit),
    ),
    actualIndexStep: createReducer(
      0,
      on(SET_ACTUAL_STEP, (state, action) => action.step),
    ),
  },
  {
    listProviders: initialListProvidersForm(),
    providersAddEdit: InitialProvidersAddEditFormModel(),
    modeEdit: false,
    addEditComponent: false,
    title: 'CATÁLOGO DE PROVEEDORES',
    enableEdit: false,
    actualIndexStep: 0,
  },
);
