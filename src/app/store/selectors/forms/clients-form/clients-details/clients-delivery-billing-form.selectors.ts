// Core imports
import {createSelector} from '@ngrx/store';
// Selectors
import {
  selectCatalogs,
  selectCatPaisForDropDownList,
} from '@appSelectors/catalogs/catalogs.selectors';
// Models
import {IClientsDetailsForm} from '@appModels/store/forms/clients-form/clients-details-form/clients-details-form.models';
import {
  IBilling,
  IDeliveryBilling,
  IDireccionClienteDetalle,
  ITemporalRestriction,
  ITopicComments,
} from '@appModels/store/forms/clients-form/clients-details-form/delivery-billing/delivery-billing-client-form.models';
import {CatalogsState} from '@appModels/store/catalogs/catalogs.models';
// Utils
import {getArrayForDropDownList, validateFieldsRequiredString} from '@appUtil/util';
import {filter, isEmpty, isEqual} from 'lodash-es';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {selectClientDetailsForm} from '@appSelectors/forms/clients-form/clients-details/clients-details-form.selectors';
import {ClienteTCDOFVigencia} from 'api-logistica';
import {RegexValidators} from '@appHelpers/shared/shared.helpers';

export const selectDeliveryBilling = createSelector(
  selectClientDetailsForm,
  (state: IClientsDetailsForm) => state.deliveryBilling,
);
export const selectBilling = createSelector(
  selectDeliveryBilling,
  (state: IDeliveryBilling): IBilling => state.billing,
);
export const selectRfcValidation = createSelector(
  selectDeliveryBilling,
  (state: IDeliveryBilling) => state.rfcIsValid,
);
export const selectZioCodeValidation = createSelector(
  selectDeliveryBilling,
  (state: IDeliveryBilling) => state.zipCodeIsValid,
);
export const selectClientSelected = createSelector(
  selectDeliveryBilling,
  (state: IDeliveryBilling) => state.clientSelected,
);
export const selectClientAddress = createSelector(
  selectDeliveryBilling,
  (state: IDeliveryBilling) => state.clientAddress,
);
export const selectClientAddressPop = createSelector(
  selectDeliveryBilling,
  (state: IDeliveryBilling) => state.clientAddressCopy,
);
export const selectAllowedForm = createSelector(
  selectDeliveryBilling,
  (state: IDeliveryBilling) => state.allowedForm,
);
export const selectClientAddressPopData = createSelector(
  selectClientAddressPop,
  (state: IDireccionClienteDetalle) => state.Direccion,
);
export const selectClientAddressCountrySelected = createSelector(
  selectClientAddressPop,
  (state: IDireccionClienteDetalle) => state.catCountrySelected,
);
export const selectClientAddressData = createSelector(
  selectClientAddress,
  (state: IDireccionClienteDetalle) => state.Direccion,
);
export const selectClientDirectionData = createSelector(
  selectClientAddress,
  (state: IDireccionClienteDetalle) => state.DireccionCliente,
);

export const selectComment = createSelector(
  selectDeliveryBilling,
  (state: IDeliveryBilling) => state.comment,
);
export const selectEmail = createSelector(
  selectDeliveryBilling,
  (state: IDeliveryBilling) => state.email,
);
export const selectOpenAddressModal = createSelector(
  selectDeliveryBilling,
  (state: IDeliveryBilling) => state.openAddressModal,
);
export const selectAddressModalTitle = createSelector(
  selectDeliveryBilling,
  (state: IDeliveryBilling) => state?.addressModalTitle,
);
export const selectTemporalRestriction = createSelector(
  selectDeliveryBilling,
  (state: IDeliveryBilling) => state?.temporalRestriction,
);
export const selectBilligMonthlyRestriction = createSelector(
  selectBilling,
  (state: IBilling) => state?.Restriccion,
);
export const selectBilligRestrictionT = createSelector(
  selectBilling,
  (state: IBilling) => state?.RestriccionesT,
);
export const selectBillingDeleteRestriction = createSelector(
  selectBilling,
  (state: IBilling) => state?.RestriccionesDelete,
);
export const selectBilligComent = createSelector(
  selectBilling,
  (state: IBilling) => state?.Comentarios,
);
export const selectBilligDisableComent = createSelector(
  selectBilling,
  (state: IBilling) => state?.ComentariosDeshabilitados,
);
export const selectCorreosCFDI = createSelector(
  selectBilling,
  (state: IBilling) => state?.CorreosCFDI,
);
export const selectEmailDisable = createSelector(
  selectBilling,
  (state: IBilling) => state?.DisableEmails,
);
export const selectBillingCurrency = createSelector(
  selectBilling,
  (state: IBilling) => state?.BillingCurrencySelected,
);
export const selectWhoBills = createSelector(
  selectBilling,
  (state: IBilling) => state?.CompanySelected,
);
export const selectMercantileSociety = createSelector(
  selectBilling,
  (state: IBilling) => state?.MercantileSocietySelected,
);
export const selectTaxRegime = createSelector(
  selectBilling,
  (state: IBilling) => state?.TaxRegimeSelected,
);
export const selectOfferCurrency = createSelector(
  selectBilling,
  (state: IBilling) => state?.OfferCurrencySelected,
);
export const selectTypesChanges = createSelector(
  selectBilling,
  (state: IBilling) => state?.TypesChanges,
);
export const selectTypeChangesSelected = createSelector(
  selectBilling,
  (state: IBilling) => state?.TypeChangeSelected,
);
export const selectCompany = createSelector(
  [selectCatalogs, selectBilling],
  (state: CatalogsState, billing: IBilling) =>
    billing?.isMexican
      ? getArrayForDropDownList(
          filter(state.empresas.listEmpresas, (o) => o.Alias !== 'Pharma'),
          'IdEmpresa',
          'Alias',
        )
      : getArrayForDropDownList(state.empresas.listEmpresas, 'IdEmpresa', 'Alias'),
);

export const restrictionValidation = createSelector(
  [selectTemporalRestriction, selectBilling],
  (restriction: ITemporalRestriction, billing: IBilling) =>
    billing?.RestriccionesTemporales &&
    restriction.Titulo.trim() !== '' &&
    restriction.FechaFinDate &&
    restriction.FechaInicioDate &&
    restriction.FechaInicioDate <= restriction.FechaFinDate,
);
export const restrictionValidationDisable = createSelector(
  [selectTemporalRestriction, selectBilling],
  (restriction: ITemporalRestriction, billing: IBilling) =>
    !billing?.RestriccionesTemporales ||
    !restriction.Titulo ||
    restriction.Titulo.trim() === '' ||
    !restriction.FechaFinDate ||
    !restriction.FechaInicioDate ||
    restriction.FechaInicioDate > restriction.FechaFinDate,
);

export const emailValidation = createSelector(selectEmail, (email) => email.Correo !== null);
export const emailValidationDisable = createSelector(
  selectEmail,
  (email) => email.Correo === null || !email.Correo,
);
export const commentValidations = createSelector(selectComment, (comment: ITopicComments) => {
  return comment.Comentario.trim() !== '' && !isEmpty(comment.IdCatTemaComentario);
});
export const commentValidationDisable = createSelector(
  selectComment,
  (comment: ITopicComments) => comment.Comentario.trim() === '' || !comment.IdCatTemaComentario,
);
export const selectedFormCountryIsMexican = createSelector(
  [selectClientAddressCountrySelected],
  (selectedCountry: DropListOption): boolean => selectedCountry?.labelKey === 'MX',
);
export const enableAddEditAddress = createSelector(
  [selectDeliveryBilling, selectCatPaisForDropDownList, selectedFormCountryIsMexican],
  (state: IDeliveryBilling, catPais: Array<DropListOption>, mexicanAddress): boolean => {
    const addressForm = state?.clientAddressCopy?.Direccion;

    return !!(
      addressForm?.IdCatTipoDireccion &&
      addressForm?.IdCatPais &&
      addressForm?.Ciudad &&
      addressForm?.CodigoPostal &&
      addressForm?.Calle &&
      addressForm?.Colonia &&
      addressForm?.Municipio &&
      addressForm?.Estado &&
      !isEqual(
        JSON.stringify(state.clientAddressCopy?.Direccion),
        JSON.stringify(state.addressBackUp.Direccion),
      ) &&
      (mexicanAddress ? addressForm?.CodigoPostal?.length === 5 : true)
    );
  },
);

export const hasValidAddress = createSelector(
  [selectDeliveryBilling],
  (state: IDeliveryBilling): string => {
    const addressForm = state?.clientAddress?.Direccion;
    return (
      addressForm?.IdCatTipoDireccion &&
      addressForm?.IdCatPais &&
      addressForm?.Ciudad &&
      addressForm?.CodigoPostal &&
      addressForm?.Calle &&
      addressForm?.Colonia &&
      addressForm?.Municipio &&
      addressForm?.Estado
    );
  },
);
export const hasChangesDeliveryBilling = createSelector(
  selectDeliveryBilling,
  (deliveryBilling: IDeliveryBilling): boolean =>
    !isEqual(
      JSON.stringify(deliveryBilling.billing),
      JSON.stringify(deliveryBilling.dataBackup.billing),
    ),
);
export const hasChangesAddressDeliveryBilling = createSelector(
  selectDeliveryBilling,
  (deliveryBilling: IDeliveryBilling): boolean =>
    !isEqual(
      JSON.stringify(deliveryBilling.clientAddress),
      JSON.stringify(deliveryBilling.dataBackup.clientAddress),
    ),
);
export const validationDeliveryBillingClient = createSelector(
  [selectDeliveryBilling, hasChangesDeliveryBilling, hasChangesAddressDeliveryBilling],
  (deliveryBilling: IDeliveryBilling, hasChanges: boolean, addressHasChanges: boolean): boolean => {
    const typeChange = deliveryBilling.billing.TipoDeCambioDiarioOficial
      ? deliveryBilling.billing.ClienteTCDOFVigencia.FinVigencia !== null
      : true;

    const addressSendValidation =
      deliveryBilling.billing.EnviarPorCorreo || deliveryBilling.billing.Correo
        ? validateFieldsRequiredString(deliveryBilling.billing.Correo) &&
          RegexValidators.email.test(deliveryBilling.billing.Correo)
        : true;

    return (
      !isEmpty(deliveryBilling.billing.RazonSocial) &&
      !isEmpty(deliveryBilling.billing.IdCatTipoSociedadMercantil) &&
      !isEmpty(deliveryBilling.billing.IdCatRegimenFiscal) &&
      !isEmpty(deliveryBilling.billing.RFC) &&
      !isEmpty(deliveryBilling.billing.IdEmpresa) &&
      !isEmpty(deliveryBilling.billing.IdCatMonedaTramitacion) &&
      addressSendValidation &&
      deliveryBilling.rfcIsValid &&
      (deliveryBilling.billing.IdCatMonedaTramitacion === deliveryBilling.billing.IdCatMoneda
        ? true
        : deliveryBilling.billing.TipoDeCambioBanamex ||
          deliveryBilling.billing.TipoDeCambioDiarioOficial) &&
      (deliveryBilling.billing.TipoValidacionCorreo ||
        deliveryBilling.billing.TipoValidacionSAT ||
        deliveryBilling.billing.TipoValidacionPortal) &&
      (deliveryBilling.billing.CorreosCFDI.length >= 1 ||
        deliveryBilling.billing.TipoValidacionSAT ||
        (!isEmpty(deliveryBilling.billing.URL) &&
          !isEmpty(deliveryBilling.billing.Usuario) &&
          !isEmpty(deliveryBilling.billing.Contrasena))) &&
      (hasChanges || addressHasChanges) &&
      typeChange
    );
  },
);
export const selectClienteTCDOFVigencia = createSelector(
  selectDeliveryBilling,
  (state: IDeliveryBilling) => state.billing.ClienteTCDOFVigencia,
);
export const selectClientTCDOFDAte = createSelector(
  selectClienteTCDOFVigencia,
  (state: ClienteTCDOFVigencia) => new Date(state?.FinVigencia),
);
