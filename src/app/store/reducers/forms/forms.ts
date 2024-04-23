import {ActionReducer, combineReducers} from '@ngrx/store';
import {FormsState} from '@appModels/store/forms/forms.models';
import {initialProviderState} from '@appModels/store/forms/providers/providers.models';
import {providersReducer} from '@appReducers/forms/providers/providers.reducer';
import {productFormReducer} from '@appReducers/forms/product-form/product-form.reducer';
import {initialProductFormState} from '@appModels/store/forms/product-form/product-form-.module';
import {initialBrandFormState} from '@appModels/store/forms/brand-form/brand-form.models';
import {brandFormReducer} from '@appReducers/forms/brands-form/brands-form.reducer';
import {initialStateCustomAgents} from '@appModels/store/forms/custom-agents-forms/custom-agents-forms.models';
import {customAgentFormReducer} from '@appReducers/forms/custom-agent-form/custom-agent-form.reducer';
import {clientsFormReducers} from '@appReducers/forms/clients-form/clients-form.reducers';
import {initialClientsState} from '@appModels/store/forms/clients-form/clients-form.models';

const reducer = {
  clientsForm: clientsFormReducers,
  providersForm: providersReducer,
  productsForm: productFormReducer,
  brandsForm: brandFormReducer,
  customsAgentsForm: customAgentFormReducer,
};

const initialState = {
  clientsForm: initialClientsState(),
  providersForm: initialProviderState(),
  productsForm: initialProductFormState(),
  brandsForm: initialBrandFormState(),
  customsAgentsForm: initialStateCustomAgents(),
};

export const formsReducer: ActionReducer<FormsState> = combineReducers(
  {
    clientsForm: clientsFormReducers,
    providersForm: providersReducer,
    productsForm: productFormReducer,
    brandsForm: brandFormReducer,
    customsAgentsForm: customAgentFormReducer,
  },
  initialState,
);
