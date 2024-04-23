import {createSelector} from '@ngrx/store';
import {selectClientForms} from '@appSelectors/forms/forms.selectors';
import {IClientsFormState} from '@appModels/store/forms/clients-form/clients-form.models';
import {
  selectGeneralData,
  selectGeneralDataHasChanges,
  validationGeneralData,
} from '@appSelectors/forms/clients-form/clients-details/clients-form-general-data.selectors';
import {
  hasChangesClientForm,
  validationChargesClient,
} from '@appSelectors/forms/clients-form/clients-details/clients-charges-form.selectors';
import {
  hasChangesDeliveryBilling,
  validationDeliveryBillingClient,
} from '@appSelectors/forms/clients-form/clients-details/clients-delivery-billing-form.selectors';
import {
  pricesHasChanges,
  pricesSaveValidator,
} from '@appSelectors/forms/clients-form/clients-details/prices.selectors';
import {selectActivateSaveContractButton} from '@appSelectors/forms/clients-form/clients-details/clients-contracts-form.selectors';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {
  ClientTabOptions as tabs,
  IClientsDetailsForm,
} from '@appModels/store/forms/clients-form/clients-details-form/clients-details-form.models';
import {
  selectClientDetailsForm,
  selectedTabOption,
} from '@appSelectors/forms/clients-form/clients-details/clients-details-form.selectors';
import {IGeneralDataClientsForm} from '@appModels/store/forms/clients-form/clients-details-form/general-data/general-data-clients-form.models';
import {isEqual} from 'lodash-es';
import {
  selectClientAddressesHasChanges,
  validationAddresses,
} from '@appSelectors/forms/clients-form/clients-details/clients-address-form.selectors';

export const selectTitle = createSelector(
  selectClientForms,
  (state: IClientsFormState) => state.title,
);
export const selectEnableEdit = createSelector(
  selectClientForms,
  (state: IClientsFormState) => state.enableEdit,
);
export const selectEditMode = createSelector(
  selectClientForms,
  (state: IClientsFormState) => state.editMode,
);
export const selectIsInDetails = createSelector(
  selectClientForms,
  (state: IClientsFormState) => state.isInDetails,
);
export const selectClientsSaveValidatorsBySteps = createSelector(
  [
    selectedTabOption,
    validationGeneralData,
    validationAddresses,
    validationChargesClient,
    validationDeliveryBillingClient,
    pricesSaveValidator,
    selectActivateSaveContractButton,
  ],
  (
    step: ITabOption,
    generalData: boolean,
    addresses: boolean,
    validationCharges: boolean,
    deliveryBillingValidation: boolean,
    pricesValidator: boolean,
    contractValidator: boolean,
  ): boolean => {
    const validator = {
      [tabs.GeneralData]: () => generalData,
      [tabs.DeliveryAddress]: () => addresses,
      [tabs.DeliveryAndBilling]: () => deliveryBillingValidation,
      [tabs.Charges]: () => validationCharges,
      [tabs.Prices]: () => pricesValidator,
      [tabs.Contracts]: () => contractValidator,
    };
    return validator[step.label]();
  },
);
export const selectClientsHasChangesBySteps = createSelector(
  [
    selectedTabOption,
    selectGeneralDataHasChanges,
    selectClientAddressesHasChanges,
    hasChangesClientForm,
    hasChangesDeliveryBilling,
    pricesHasChanges,
  ],
  (
    step: ITabOption,
    generalData: boolean,
    addresses: boolean,
    validationCharges: boolean,
    deliveryBillingValidation: boolean,
    pricesValidator: boolean,
  ): boolean => {
    const validator = {
      [tabs.GeneralData]: () => generalData,
      [tabs.DeliveryAddress]: () => addresses,
      [tabs.DeliveryAndBilling]: () => deliveryBillingValidation,
      [tabs.Charges]: () => validationCharges,
      [tabs.Prices]: () => pricesValidator,
      [tabs.Contracts]: () => false,
    };
    return validator[step.label]();
  },
);
export const selectClientsSectionHasChanges = createSelector(
  [
    selectClientDetailsForm,
    selectGeneralDataHasChanges,
    selectClientAddressesHasChanges,
    selectGeneralData,
  ],
  (
    state: IClientsDetailsForm,
    generalDataHasChanges: boolean,
    clientAddressesHasChanges: boolean,
    generalData: IGeneralDataClientsForm,
  ): boolean => {
    /*const generalData = state.generalData;*/
    const addressData = state.address;
    const charges = state.charges;
    const deliveryBilling = state.deliveryBilling;
    const prices = state.prices;
    const contracts = state.contracts;
    switch (state.tabSelected.id) {
      case '1':
        return generalDataHasChanges;
      /*return (
          !isEqual(
            generalData.selectedClient,
            generalData.backup.selectedClient,
          ) ||
          !isEqual(generalData.contacts, generalData.backup.contacts) ||
          !isEqual(
            generalData.tercerosAutorizados.tercerosAutorizadosSelected,
            generalData.backup.tercerosAutorizados,
          )
        );*/
      case '2':
        /*const addressList = _map(addressData.address, (o: IDireccion) => {
          return omit(o, ['isSelected']);
        });
        const json = JSON.stringify(addressList);
        const addressBackUp = _map(
          addressData.backUp.address,
          (o: IDireccion) => {
            return omit(o, ['isSelected']);
          },
        );
        const json2 = JSON.stringify(addressBackUp);
        const isEqual = isEqual(json, json2);
        return !isEqual;*/
        return clientAddressesHasChanges;
      case '3':
        return (
          !isEqual(
            JSON.stringify(deliveryBilling.billing),
            JSON.stringify(deliveryBilling.dataBackup.billing),
          ) || !isEqual(deliveryBilling.clientSelected, deliveryBilling.dataBackup.clientSelected)
        );
      case '4':
        return (
          !isEqual(charges.credit, charges.dataBackup.credit) ||
          !isEqual(charges.billing, charges.dataBackup.billing) ||
          !isEqual(charges.clientDataSTP, charges.dataBackup.clientDataSTP) ||
          !isEqual(charges.clientSelected, charges.dataBackup.clientSelected)
        );
      case '5':
        return !isEqual(
          JSON.stringify(prices?.selectedProvider?.selectedFamily?.actualConfiguration),
          JSON.stringify(prices?.selectedProvider?.selectedFamily?.backupConfiguration),
        );
      case '6':
        return !isEqual(contracts.newContract, contracts.backUp.newContract);
    }
  },
);
