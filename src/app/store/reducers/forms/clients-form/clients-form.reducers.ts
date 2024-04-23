import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';

import {clientsListFormReducers} from '@appReducers/forms/clients-form/clients-list-form/clients-list-form.reducers';
import {initialStateClientsList} from '@appModels/store/forms/clients-form/clients-list-form/clients-list-form.models';
import * as clientsActions from '@appActions/forms/client-form/clients-form.actions';
import {
  IClientsFormState,
  initialClientsState,
} from '@appModels/store/forms/clients-form/clients-form.models';
import {initialIClientsDetailsForm} from '@appModels/store/forms/clients-form/clients-details-form/clients-details-form.models';
import {clientsDetailsFormReducers} from '@appReducers/forms/clients-form/clients-details-form/clients-details-form.reducers';

export const clientsFormReducers: ActionReducer<IClientsFormState> = combineReducers(
  {
    clientsList: clientsListFormReducers,
    clientsDetails: clientsDetailsFormReducers,
    title: createReducer(
      'CATÁLOGO DE CLIENTES',
      on(clientsActions.SET_TITLE, (state, action) => action.title),
    ),
    editMode: createReducer(
      initialClientsState().editMode,
      on(clientsActions.SET_EDIT_MODE, (state, action) => action.value),
    ),
    enableEdit: createReducer(
      initialClientsState().enableEdit,
      on(clientsActions.SET_ENABLE_EDIT, (state, action) => action.value),
    ),
    isInDetails: createReducer(
      initialClientsState().isInDetails,
      on(clientsActions.SET_IS_IN_DETAILS, (state, action) => action.value),
    ),
  },
  {
    clientsList: initialStateClientsList(),
    clientsDetails: initialIClientsDetailsForm(),
    title: 'CATÁLOGO DE CLIENTES',
    editMode: false,
    enableEdit: false,
    isInDetails: false,
  },
);
