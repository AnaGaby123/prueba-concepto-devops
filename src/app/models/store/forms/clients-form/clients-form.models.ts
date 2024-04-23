import {
  IClientsListForm,
  initialStateClientsList,
} from '@appModels/store/forms/clients-form/clients-list-form/clients-list-form.models';
import {
  IClientsDetailsForm,
  initialIClientsDetailsForm,
} from '@appModels/store/forms/clients-form/clients-details-form/clients-details-form.models';

export interface IClientsFormState {
  clientsList: IClientsListForm;
  clientsDetails: IClientsDetailsForm;
  title: string;
  editMode: boolean;
  enableEdit: boolean;
  isInDetails: boolean;
}

export const initialClientsState = (): IClientsFormState => ({
  clientsList: initialStateClientsList(),
  clientsDetails: initialIClientsDetailsForm(),
  title: 'CATÁLOGO DE CLIENTES',
  editMode: false,
  enableEdit: false,
  isInDetails: false,
});
