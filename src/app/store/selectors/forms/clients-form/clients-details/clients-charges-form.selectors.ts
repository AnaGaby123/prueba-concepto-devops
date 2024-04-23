import {createSelector} from '@ngrx/store';
import {IClientsDetailsForm} from '@appModels/store/forms/clients-form/clients-details-form/clients-details-form.models';
import {
  Credit,
  IChargesClientForm,
} from '@appModels/store/forms/clients-form/clients-details-form/charges/charges-clients-form.models';
import {isEmpty, isEqual} from 'lodash-es';
import {selectClientDetailsForm} from '@appSelectors/forms/clients-form/clients-details/clients-details-form.selectors';
import {validateFieldsRequiredString} from '@appUtil/util';

export const selectCharges = createSelector(
  selectClientDetailsForm,
  (state: IClientsDetailsForm) => state.charges,
);
export const selectBilling = createSelector(
  selectCharges,
  (state: IChargesClientForm) => state.billing,
);
export const selectCredit = createSelector(
  selectCharges,
  (state: IChargesClientForm) => state?.credit,
);
export const selectPaymentConditionsSelected = createSelector(
  selectCredit,
  (state: Credit) => state?.paymentConditionsSelected,
);
export const selectClientSTP = createSelector(
  selectCharges,
  (state: IChargesClientForm) => state.clientDataSTP,
);

export const selectClientSelected = createSelector(
  selectCharges,
  (state: IChargesClientForm) => state.clientSelected,
);

export const hasChangesClientForm = createSelector(
  selectCharges,
  (charges: IChargesClientForm) =>
    !!(
      !isEqual(JSON.stringify(charges.credit), JSON.stringify(charges.dataBackup.credit)) ||
      !isEqual(JSON.stringify(charges.billing), JSON.stringify(charges.dataBackup.billing)) ||
      !isEqual(
        JSON.stringify(charges.clientDataSTP),
        JSON.stringify(charges.dataBackup.clientDataSTP),
      ) ||
      !isEqual(
        JSON.stringify(charges.clientSelected),
        JSON.stringify(charges.dataBackup.clientSelected),
      )
    ),
);
export const validationChargesClient = createSelector(
  [selectCharges, hasChangesClientForm],
  (charges: IChargesClientForm, hasChangesClientForm): boolean => {
    const validationHowBilling =
      validateFieldsRequiredString(charges?.clientDataSTP?.NumeroDeCuenta, 1) ||
      validateFieldsRequiredString(charges?.clientDataSTP?.Alias, 1)
        ? validateFieldsRequiredString(charges?.clientDataSTP?.NumeroDeCuenta, 18) &&
          validateFieldsRequiredString(charges?.clientDataSTP?.Alias, 1)
        : true;
    const validationHowBillingPublications =
      validateFieldsRequiredString(charges?.clientDataSTP?.NumeroDeCuentaPublicaciones, 1) ||
      validateFieldsRequiredString(charges?.clientDataSTP?.AliasPublicaciones, 1)
        ? validateFieldsRequiredString(charges?.clientDataSTP?.NumeroDeCuentaPublicaciones, 18) &&
          validateFieldsRequiredString(charges?.clientDataSTP?.AliasPublicaciones, 1)
        : true;
    return (
      !!charges.clientDataSTP?.enterpriseSelected &&
      !!charges.clientDataSTP?.publicationEnterpriseSelected &&
      !isEmpty(charges.credit?.paymentFormSelected) &&
      !isEmpty(charges.credit?.paymentConditionsSelected) &&
      !isEmpty(charges.credit?.NumeroDeCuenta) &&
      charges?.credit?.NumeroDeCuenta.length === 18 &&
      !isEmpty(charges.billing?.CatRevisionSelected) &&
      !isEmpty(charges.billing?.CatPaymentMethodCFDISelected) &&
      !isEmpty(charges.billing?.CatUseCFDISelected) &&
      validationHowBillingPublications &&
      validationHowBilling &&
      !!hasChangesClientForm
    );
  },
);
