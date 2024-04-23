import {
  initialListProvidersForm,
  ProvidersListState,
} from '@appModels/store/forms/providers/providers-list/providers-list.models';
import {
  InitialProvidersAddEditFormModel,
  ProvidersDetailsState,
} from '@appModels/store/forms/providers/providers-details/providers-details.models';

export interface ProvidersState {
  listProviders: ProvidersListState;
  providersAddEdit: ProvidersDetailsState;
  modeEdit: boolean;
  enableEdit: boolean;
  addEditComponent: boolean;
  title: string;
  actualIndexStep: number;
}

export const initialProviderState = (): ProvidersState => ({
  listProviders: initialListProvidersForm(),
  providersAddEdit: InitialProvidersAddEditFormModel(),
  modeEdit: false,
  enableEdit: false,
  addEditComponent: false,
  title: 'CATÁLOGO DE PROVEEDORES',
  actualIndexStep: 0,
});
