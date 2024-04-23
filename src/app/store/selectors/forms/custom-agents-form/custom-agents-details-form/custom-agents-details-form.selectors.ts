import {createSelector} from '@ngrx/store';
import {selectCustomAgentForms} from '@appSelectors/forms/forms.selectors';
import {filter, find, isEmpty, isEqual, map as _map} from 'lodash-es';

import {
  ICancelPop,
  ICustomAgentContact,
  ICustomsAgentsDetails,
  IDispatchPoint,
  IEmailVerify,
  IGeneralDataCustomsAgents,
} from '@appModels/store/forms/custom-agents-forms/custom-agents-details-forms/custom-agents-details-forms.models';
import {DEFAULT_UUID} from '@appUtil/common.protocols';
import {
  Aduana,
  AduanaDetalle,
  CatTipoNumeroTelefonico,
  ConceptoAgenteAduanal,
  ContactoDetalleAgenteAduanalObj,
  Direccion,
  VAgenteAduanal,
} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {selectDisableContacts} from '@appSelectors/forms/providers/providers-details/provider-form-step-1-general-data.selectors';
import {
  selectEditMode,
  selectEnableEdit,
} from '@appSelectors/forms/custom-agents-form/custom-agents-form.selectors';
import {
  selectCatCountriesForDropList,
  selectCatPaisForDropDownList,
  selectDispatchPlaceForDropDown,
} from '@appSelectors/catalogs/catalogs.selectors';
import {
  validateFieldIsNotContainOnlySpacesAndLength,
  validateFieldsRequiredString,
} from '@appUtil/util';
import {InputValidators, RegexValidators} from '@appHelpers/shared/shared.helpers';
import {IContactoDetalleProvObj} from '@appModels/store/forms/providers/providers-details/provider-form-step-1-general-data.model';
import {ICustomsAgents} from '@appModels/store/forms/custom-agents-forms/custom-agents-forms.models';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';

export const selectCustomsAgentsDetailsForm = createSelector(
  selectCustomAgentForms,
  (state: ICustomsAgents): ICustomsAgentsDetails => state.customsAgentsDetails,
);
export const selectTabOptions = createSelector(
  selectCustomsAgentsDetailsForm,
  (state: ICustomsAgentsDetails): ITabOption[] => state.tabOptions,
);
export const selectedTabOption = createSelector(
  selectCustomsAgentsDetailsForm,
  (state: ICustomsAgentsDetails): ITabOption => state.tabOptionSelected,
);
export const selectActivitiesOptions = createSelector(
  selectCustomsAgentsDetailsForm,
  (state: ICustomsAgentsDetails): BarActivityOption[] => state.activitiesOptions,
);
export const selectedActivity = createSelector(
  selectCustomsAgentsDetailsForm,
  (state: ICustomsAgentsDetails): BarActivityOption => state.activitySelected,
);
export const selectCancelMessage = createSelector(
  selectCustomsAgentsDetailsForm,
  (state: ICustomsAgentsDetails): ICancelPop => state.cancelPop,
);
export const selectPreSelectedDispatchPoint = createSelector(
  selectCustomsAgentsDetailsForm,
  (state: ICustomsAgentsDetails): OptionBar => state.preSelectedDispatchPoint,
);
export const selectInitialDispatchPoint = createSelector(
  selectCustomsAgentsDetailsForm,
  (state: ICustomsAgentsDetails): AduanaDetalle => state.initialDispatchPoint,
);
// DOCS: SELECTORES PARA DATOS GENERALES
export const selectGeneralDataTab = createSelector(
  selectCustomsAgentsDetailsForm,
  (state: ICustomsAgentsDetails) => state.generalData,
);
export const selectCustomAgentSelectedList = createSelector(
  selectCustomsAgentsDetailsForm,
  (state: ICustomsAgentsDetails) => state.customAgentSelected,
);
export const selectCustomAgentSelected = createSelector(
  selectGeneralDataTab,
  (state: IGeneralDataCustomsAgents) => state.customAgentSelected,
);
export const selectedCountriForDropList = createSelector(
  selectCustomAgentSelected,
  selectCatCountriesForDropList,
  (customAgent: VAgenteAduanal, countriesList: DropListOption[]) =>
    find(countriesList, (o: DropListOption) => o.value === customAgent.IdCatPais),
);
export const selectContacts = createSelector(
  selectGeneralDataTab,
  (state: IGeneralDataCustomsAgents) => state.contacts,
);
export const selectContactForm = createSelector(
  selectGeneralDataTab,
  (state: IGeneralDataCustomsAgents) => state.contactForm,
);
export const nexStepValidation = createSelector(
  selectGeneralDataTab,
  (generalData: IGeneralDataCustomsAgents): boolean => {
    const customAgent = generalData.customAgentSelected;
    const contacts = generalData.contacts;
    return (
      !isEmpty(customAgent.NombreComercial) &&
      !isEmpty(customAgent.NombreLegal) &&
      !isEmpty(customAgent.NumeroPatente) &&
      customAgent.IdCatPais !== DEFAULT_UUID &&
      !isEmpty(customAgent.Ciudad) &&
      !isEmpty(customAgent.Estado) &&
      generalData.zipCodeIsValid &&
      contacts.length > 0
    );
  },
);
export const selectDisabledContacts = createSelector(
  selectGeneralDataTab,
  (state: IGeneralDataCustomsAgents): ContactoDetalleAgenteAduanalObj[] => state.disableContacts,
);
export const selectNextContactToSave = createSelector(
  selectContacts,
  (state: ICustomAgentContact[]): ICustomAgentContact =>
    find(state, (o: ICustomAgentContact) => o.haveChanges),
);
export const selectNeedsToReloadCatTelefonos = createSelector(
  selectGeneralDataTab,
  (state: IGeneralDataCustomsAgents): boolean => state.needsToReloadCatTipoTelefono,
);
export const selectExistingEmail = createSelector(
  selectGeneralDataTab,
  (state: IGeneralDataCustomsAgents): IEmailVerify => state.existingEmail,
);
export const enableZipCodeInput = createSelector(
  selectCustomAgentSelected,
  (state: VAgenteAduanal): boolean => state.IdCatPais === DEFAULT_UUID,
);
export const haveChangesGD = createSelector(
  selectGeneralDataTab,
  selectCustomsAgentsDetailsForm,
  selectCustomAgentForms,
  (
    generalData: IGeneralDataCustomsAgents,
    detailsState: ICustomsAgentsDetails,
    catState: ICustomsAgents,
  ) => {
    return (
      !(
        isEqual(generalData.customAgentSelected, detailsState.backUp.customAgentSelected) &&
        isEqual(generalData.contacts, detailsState.backUp.contacts)
      ) &&
      !(
        isEqual(
          detailsState.dispatchPoint.dispatchPointList,
          detailsState.backUp.dispatchPointList,
        ) &&
        isEqual(
          detailsState.dispatchPoint.selectedDispatchPoint,
          detailsState.backUp.selectedDispatchPoint,
        )
      )
    );
  },
);
export const selectContactFormHasChanges = createSelector(
  selectCustomsAgentsDetailsForm,
  (details: ICustomsAgentsDetails): boolean => {
    return (
      details.backUp?.contactForm &&
      !isEqual(
        JSON.stringify(details.generalData?.contactForm),
        JSON.stringify(details.backUp?.contactForm),
      )
    );
  },
);
export const saveContactValidation = createSelector(
  [selectContactForm, selectExistingEmail, selectContactFormHasChanges],
  (state: ICustomAgentContact, existingMail: IEmailVerify, hasChanges: boolean) =>
    !isEmpty(state.Nombres) &&
    !isEmpty(state.ApellidoPaterno) &&
    !isEmpty(state.Titulo) &&
    !isEmpty(state.Puesto) &&
    !isEmpty(state.Departamento) &&
    !isEmpty(state.NumeroTelefono1) &&
    !isEmpty(state.CorreoElectronico[0].Correo) &&
    hasChanges,
);
// DOCS: SELECTORES PARA DESADUANAJE
export const selectDispatchPointTab = createSelector(
  selectCustomsAgentsDetailsForm,
  (state: ICustomsAgentsDetails): IDispatchPoint => state.dispatchPoint,
);
export const selectApiStatus = createSelector(
  selectDispatchPointTab,
  (state: IDispatchPoint): number => state.apiStatus,
);
export const selectDispatchPointOptions = createSelector(
  selectDispatchPointTab,
  (state: IDispatchPoint): OptionBar[] => state.dispatchPoints,
);
export const selectAllowEditForm = createSelector(
  selectDispatchPointTab,
  (state: IDispatchPoint): boolean => state.allowEditForm,
);
export const selectedDispatchPoint = createSelector(
  selectDispatchPointTab,
  (state: IDispatchPoint): AduanaDetalle => state.selectedDispatchPoint,
);
export const selectedCountriDP = createSelector(
  selectedDispatchPoint,
  selectCatPaisForDropDownList,
  (dispatchPointCountry: AduanaDetalle, countriesList: DropListOption[]): DropListOption => {
    return find(
      countriesList,
      (o: DropListOption) => o.value === dispatchPointCountry?.Direccion?.IdCatPais,
    );
  },
);
export const selectedFormCountryIsMexican = createSelector(
  selectedCountriDP,
  (selectedCountry: DropListOption): boolean => {
    return selectedCountry?.labelKey === 'MX';
  },
);
export const selectAddress = createSelector(
  selectedDispatchPoint,
  (state: AduanaDetalle): Direccion => state?.Direccion,
);
export const selectFees = createSelector(
  selectedDispatchPoint,
  (state: AduanaDetalle): ConceptoAgenteAduanal[] => state?.ConceptosAgenteAduanal,
);
export const selectAddRate = createSelector(selectDispatchPointTab, (state) => state.addRate);

export const selectDispatchPointList = createSelector(
  selectDispatchPointTab,
  (state: IDispatchPoint): Aduana[] => state.dispatchPointList,
);

export const validateNewDispathPoint = createSelector(
  selectInitialDispatchPoint,
  selectDispatchPointList,
  (newDispatchPoint: AduanaDetalle, dispatchPointList: Aduana[]): boolean => {
    const isDifferentName = find(
      dispatchPointList,
      (o: Aduana) => o.NombreLugar.toLowerCase() === newDispatchPoint.NombreLugar.toLowerCase(),
    );
    return newDispatchPoint.NombreLugar.trim() !== '' && isEmpty(isDifferentName);
  },
);
export const addRateButton = createSelector(
  selectAddRate,
  selectedDispatchPoint,
  (state: ConceptoAgenteAduanal, dispatchPoint: AduanaDetalle): boolean =>
    state.Concepto.trim().length > 2 &&
    (state.IgualarAPedimento || state.PorcentajeAPedimento) &&
    (state.IgualarAPedimento
      ? state.MontoImportacion !== null &&
        state.MontoExportacion !== null &&
        (state.MontoImportacion > 0 || state.MontoExportacion > 0)
      : state.PorcentajeAPedimento
      ? state.Porcentaje && state.Porcentaje > 0
      : true) &&
    (!state.SinLimite ? state.LimiteMaximo > 0 : true) &&
    filter(
      dispatchPoint.ConceptosAgenteAduanal,
      (o: ConceptoAgenteAduanal) => o.Concepto.trim() === state.Concepto.trim(),
    ).length === 0,
);
export const selectNeedsToReload = createSelector(
  selectDispatchPointTab,
  (state: IDispatchPoint): boolean => state.needsToReload,
);
export const selectZipCodeValidation = createSelector(
  selectGeneralDataTab,
  (state: IGeneralDataCustomsAgents): boolean => state.zipCodeIsValid,
);
// DOCS: VALIDACIONES EXTRAS
export const haveChangesToSave = createSelector(
  selectCustomsAgentsDetailsForm,
  selectEditMode,
  selectEnableEdit,
  (detailsForm: ICustomsAgentsDetails, editMode: boolean, enableEdit: boolean): boolean => {
    const tabSelected = detailsForm.tabOptionSelected;
    const activitySelected = detailsForm.activitySelected;
    const generalDataNode = detailsForm.generalData;
    const dispatchPointNode = detailsForm.dispatchPoint;
    if (tabSelected.id === '1' || activitySelected.id === 1) {
      return !(
        isEqual(generalDataNode.customAgentSelected, detailsForm.backUp.customAgentSelected) &&
        isEqual(generalDataNode.contacts, detailsForm.backUp.contacts)
      );
    }
    if (tabSelected.id === '2' || activitySelected.id === 2) {
      return !isEqual(
        dispatchPointNode.selectedDispatchPoint,
        detailsForm.backUp.selectedDispatchPoint,
      );
    }
  },
);
export const saveButtonValidation = createSelector(
  selectCustomsAgentsDetailsForm,
  haveChangesToSave,
  selectDispatchPointTab,
  selectedFormCountryIsMexican,
  (
    detailsForm: ICustomsAgentsDetails,
    hasChanges: boolean,
    dispatchPointTab: IDispatchPoint,
    isMexican: boolean,
  ): boolean => {
    const tabSelected = detailsForm.tabOptionSelected;
    const activitySelected = detailsForm.activitySelected;
    const generalDataNode = detailsForm.generalData;
    const dispatchPointNode = detailsForm.dispatchPoint;
    const backUp = detailsForm.backUp;
    if (tabSelected.id === '1' || activitySelected.id === 1) {
      return (
        generalDataNode.customAgentSelected.Ciudad.trim().length > 2 &&
        generalDataNode.customAgentSelected.CodigoPostal &&
        generalDataNode.customAgentSelected.Estado.trim().length > 2 &&
        generalDataNode.customAgentSelected.IdCatPais !== DEFAULT_UUID &&
        generalDataNode.customAgentSelected.NumeroPatente &&
        generalDataNode.customAgentSelected.NumeroPatente.trim().length === 4 &&
        generalDataNode.customAgentSelected.NombreComercial.trim().length > 2 &&
        generalDataNode.customAgentSelected.NombreLegal.trim().length > 2 &&
        validateFieldIsNotContainOnlySpacesAndLength(
          generalDataNode.customAgentSelected.DescripcionAmpliada,
        ) &&
        validateFieldIsNotContainOnlySpacesAndLength(
          generalDataNode.customAgentSelected.DireccionTextoUno,
        ) &&
        generalDataNode.contacts.length > 0 &&
        generalDataNode.zipCodeIsValid &&
        generalDataNode.customAgentSelected.CodigoPostal.trim().length === 5 &&
        hasChanges
      );
    } else {
      if (dispatchPointNode.dispatchPointList.length > 0) {
        const address = dispatchPointNode.selectedDispatchPoint?.Direccion;
        const compareValidation = !isEqual(
          dispatchPointNode.selectedDispatchPoint,
          backUp.selectedDispatchPoint,
        );
        const addressValidation: boolean =
          address?.IdCatPais !== DEFAULT_UUID &&
          (isMexican ? address?.CodigoPostal?.trim()?.length === 5 : true) &&
          validateFieldsRequiredString(address?.Calle) &&
          validateFieldIsNotContainOnlySpacesAndLength(address?.NumeroExterior, 1) &&
          validateFieldIsNotContainOnlySpacesAndLength(address?.NumeroInterior, 1) &&
          validateFieldsRequiredString(address?.Estado) &&
          validateFieldsRequiredString(address?.Ciudad) &&
          validateFieldsRequiredString(address?.Municipio) &&
          validateFieldsRequiredString(address?.Colonia) &&
          dispatchPointNode.selectedDispatchPoint !== DEFAULT_UUID &&
          dispatchPointNode.selectedDispatchPoint?.ConceptosAgenteAduanal.length > 0 &&
          (!dispatchPointNode.selectedDispatchPoint.CorreoDeDocumentacion ||
            RegexValidators[InputValidators.Email].test(
              dispatchPointNode.selectedDispatchPoint.CorreoDeDocumentacion,
            ));
        if (address) {
          return compareValidation && addressValidation;
        } else {
          return false;
        }
      }
      return false;
    }
  },
);
export const selectClientContactsMail = createSelector(
  selectContacts,
  selectDisableContacts,
  (contacts: ICustomAgentContact[], disableContacts: IContactoDetalleProvObj[]) => {
    const mailsContacToSave = filter(
      contacts,
      (o: ICustomAgentContact) => o.IdContacto === DEFAULT_UUID,
    );
    const mailsContactToSaveString: string[] = _map(
      mailsContacToSave,
      (o: ICustomAgentContact) => o.Mail,
    );
    const mailsContactToDelete: string[] = _map(
      disableContacts,
      (o: IContactoDetalleProvObj) => o.Mail,
    );
    const mails = {
      mailsContactToDelete,
      mailsContactToSaveString,
    };
    return mails;
  },
);
export const selectedDispatchPlace = createSelector(
  selectDispatchPlaceForDropDown,
  selectedDispatchPoint,
  (dispatchPlaces: DropListOption[], dispatchPoint: AduanaDetalle): DropListOption =>
    find(dispatchPlaces, (o: DropListOption) => o.value === dispatchPoint?.IdCatLugarDespacho),
);
export const enableDispatchPointZipCodeInput = createSelector(
  selectedDispatchPoint,
  (state: AduanaDetalle) =>
    !isEmpty(state.Direccion.IdCatPais) &&
    !isEmpty(state.Direccion.Estado) &&
    !isEmpty(state.Direccion.Ciudad),
);
export const selectCatPhones = createSelector(
  selectGeneralDataTab,
  (generalData: IGeneralDataCustomsAgents): CatTipoNumeroTelefonico[] =>
    generalData.lisCatTIipoTelefono,
);
