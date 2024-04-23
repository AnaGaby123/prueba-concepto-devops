import {ProvidersState} from '@appModels/store/forms/providers/providers.models';
import {ProductFormState} from '@appModels/store/forms/product-form/product-form-.module';
import {IBrandFormState} from '@appModels/store/forms/brand-form/brand-form.models';
import {ICustomsAgents} from '@appModels/store/forms/custom-agents-forms/custom-agents-forms.models';
import * as fromRoot from '@appCore/core.state';
import {FORMS_FEATURE_KEY, FormsNodeKeys} from '@appUtil/common.protocols';
import {IClientsFormState} from '@appModels/store/forms/clients-form/clients-form.models';
import {Action} from '@ngrx/store';
import {brandFormReducer} from '@appReducers/forms/brands-form/brands-form.reducer';
import {clientsFormReducers} from '@appReducers/forms/clients-form/clients-form.reducers';
import {providersReducer} from '@appReducers/forms/providers/providers.reducer';
import {productFormReducer} from '@appReducers/forms/product-form/product-form.reducer';
import {customAgentFormReducer} from '@appReducers/forms/custom-agent-form/custom-agent-form.reducer';

export interface AppState extends fromRoot.AppState {
  [FORMS_FEATURE_KEY]: FormsState;
}

export interface FormsState {
  clientsForm?: IClientsFormState;
  providersForm?: ProvidersState;
  productsForm?: ProductFormState;
  brandsForm?: IBrandFormState;
  customsAgentsForm?: ICustomsAgents;
}

// DOCS: Agregar los nodos con lazy loading, actualmente todos los roles tiene acceso a loa catalogos
export const getFormsReducers = (
  formsState: FormsState,
  action: Action,
  node: string,
): FormsState => {
  //DOCS: Catalogo de Clientes
  if (formsState.clientsForm || FormsNodeKeys.clientsForm === node) {
    formsState = {
      ...formsState,
      [FormsNodeKeys.clientsForm]: clientsFormReducers(formsState.clientsForm, action),
    };
  }

  //DOCS: Cátalogo de Proveedores
  if (formsState.providersForm || FormsNodeKeys.providersForm === node) {
    formsState = {
      ...formsState,
      [FormsNodeKeys.providersForm]: providersReducer(formsState.providersForm, action),
    };
  }

  //DOCS: Cátalogo de Productos
  if (formsState.productsForm || FormsNodeKeys.productsForm === node) {
    formsState = {
      ...formsState,
      [FormsNodeKeys.productsForm]: productFormReducer(formsState.productsForm, action),
    };
  }

  //DOCS: Cátalogo de Marcas
  if (formsState.brandsForm || FormsNodeKeys.brandsForm === node) {
    formsState = {
      ...formsState,
      [FormsNodeKeys.brandsForm]: brandFormReducer(formsState.brandsForm, action),
    };
  }

  //DOCS: Cátalogo de Agentes Aduanales
  if (formsState.customsAgentsForm || FormsNodeKeys.customsAgentsForm === node) {
    formsState = {
      ...formsState,
      [FormsNodeKeys.customsAgentsForm]: customAgentFormReducer(
        formsState.customsAgentsForm,
        action,
      ),
    };
  }

  return formsState;
};
