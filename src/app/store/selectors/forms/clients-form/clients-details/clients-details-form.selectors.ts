import {createSelector} from '@ngrx/store';
import {IClientsDetailsForm} from '@appModels/store/forms/clients-form/clients-details-form/clients-details-form.models';
import {isEqual, map as _map, omit} from 'lodash-es';
import {initialVcliente} from '@appModels/store/forms/clients-form/clients-details-form/general-data/general-data-clients-form.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {selectClientForms} from '@appSelectors/forms/forms.selectors';
import {IClientsFormState} from '@appModels/store/forms/clients-form/clients-form.models';
import {VCliente} from 'api-catalogos';
import {selectUser} from '@appSelectors/auth/auth.selectors';
import {UserInfo} from '@appModels/auth/user-info.model';
import {allowedPath} from '@appUtil/util';
import {selectMainMenuOptionsByUserPermissions} from '@appSelectors/utils/utils.selectors';
import {IMenuOption} from '@appModels/store/utils/utils.model';

export const selectClientDetailsForm = createSelector(
  selectClientForms,
  (state: IClientsFormState): IClientsDetailsForm => state.clientsDetails,
);
export const selectTabOptions = createSelector(
  [selectClientDetailsForm, selectClientForms, selectUser, selectMainMenuOptionsByUserPermissions],
  (
    state: IClientsDetailsForm,
    clientFormState: IClientsFormState,
    userInfo: UserInfo,
    menuOption: IMenuOption[],
  ): Array<ITabOption> =>
    _map(state.tabOptions, (o: ITabOption) => {
      return {
        ...o,
        disable: !clientFormState.editMode || !allowedPath(userInfo, menuOption, o.route),
      };
    }),
);
export const selectedTabOption = createSelector(
  selectClientDetailsForm,
  (state: IClientsDetailsForm): ITabOption => state.tabSelected,
);
export const selectPreSelectedTab = createSelector(
  selectClientDetailsForm,
  (state: IClientsDetailsForm): ITabOption => state.preSelectedTab,
);
export const openAddAlert = createSelector(
  selectClientDetailsForm,
  (state: IClientsDetailsForm): boolean => {
    const generalData = state.generalData;
    const initialClient = initialVcliente();
    return (
      !isEqual(
        JSON.stringify(
          omit(generalData.selectedClient, ['FechaUltimaActualizacion', 'FechaRegistro']),
        ),
        JSON.stringify(omit(initialClient, ['FechaUltimaActualizacion', 'FechaRegistro'])),
      ) || generalData.contacts.length > 0
    );
  },
);

export const selectedClient = createSelector(
  selectClientDetailsForm,
  (state: IClientsDetailsForm): VCliente => state.selectedClient,
);
