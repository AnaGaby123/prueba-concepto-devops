import {createReducer, on} from '@ngrx/store';
import {
  GeneralData,
  IContactoDetalleProvObj,
  initialGeneralData,
  initialPhoneNumber,
  initialProviderContact,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-1-general-data.model';
import {
  buySaleProviderActions,
  generalDataProviderActions,
  providersListActions,
} from '@appActions/forms/providers';
import {DEFAULT_UUID} from '@appUtil/common.protocols';
import {filter, find, isEmpty, map, omit} from 'lodash-es';
import {ContactoDetalleProvObj, CorreoElectronico, NumeroTelefonico} from 'api-catalogos';
import {SET_INITIAL_DATA_ADD_EDIT_PROVIDER} from '@appActions/forms/providers/providers-details/providers-details.actions';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

const initialStateGeneralData: GeneralData = {
  ...initialGeneralData(),
};

export const generalDataReducer = createReducer(
  initialStateGeneralData,
  on(
    SET_INITIAL_DATA_ADD_EDIT_PROVIDER,
    generalDataProviderActions.CLEAN_GENERAL_DATA_STATE,
    (state, action) => initialGeneralData(),
  ),
  on(generalDataProviderActions.ADD_CONTACT, (state, action) => ({
    ...state,
    contacts: [...state.contacts, action.contact],
  })),
  on(
    generalDataProviderActions.SET_FORM_DATA_BY_FIELD_NAME,
    (state, {dataModelType, fieldName, fieldValue}) => ({
      ...state,
      [dataModelType]:
        dataModelType === 'address'
          ? {
              ...state[dataModelType],
              IdCatZona:
                fieldName === 'IdCatRutaEntrega' || !state.provider?.Mexicano
                  ? null
                  : state[dataModelType].IdCatZona,
              IdCatRutaEntrega: !state.provider?.Mexicano
                ? null
                : state[dataModelType].IdCatRutaEntrega,
              [fieldName]: fieldValue,
            }
          : {...state[dataModelType], [fieldName]: fieldValue},
    }),
  ),
  on(
    generalDataProviderActions.SET_RESET_FORM,
    (state: GeneralData): GeneralData => ({
      ...state,
      address: {
        ...state.address,
        IdCatPais: null,
        Calle: null,
        NumeroExterior: null,
        NumeroInterior: null,
        CodigoPostal: null,
        Estado: null,
        Ciudad: null,
        Municipio: null,
        Colonia: null,
      },
      allowedFormAddress: false,
    }),
  ),
  on(generalDataProviderActions.SET_ALLOWED_EDIT_FORM, (state, {value}) => ({
    ...state,
    allowedFormAddress: value,
  })),
  on(
    generalDataProviderActions.SET_CONTACT_DATA_BY_FIELD_NAME,
    (state: GeneralData, {fieldName, fieldValue, objectId, phoneTypeId}): GeneralData => ({
      ...state,
      contactToEdit:
        fieldName === 'email'
          ? {
              ...state.contactToEdit,
              CorreoElectronico: map(
                state.contactToEdit.CorreoElectronico,
                (o: CorreoElectronico): CorreoElectronico => ({
                  ...o,
                  Correo:
                    o.IdCorreoElectronico === objectId || o.IdCorreoElectronico === DEFAULT_UUID
                      ? (fieldValue as string)
                      : o.Correo,
                }),
              ),
            }
          : fieldName === 'phone1' ||
            fieldName === 'ext1' ||
            fieldName === 'phone2' ||
            fieldName === 'ext2' ||
            fieldName === 'mobile'
          ? {
              ...state.contactToEdit,
              NumeroTelefonico: !isEmpty(
                find(
                  state.contactToEdit?.NumeroTelefonico,
                  (o: NumeroTelefonico) => o.IdCatTipoNumeroTelefonico === phoneTypeId,
                ),
              )
                ? map(state.contactToEdit?.NumeroTelefonico, (o: NumeroTelefonico) => ({
                    ...o,
                    Numero:
                      (fieldName === 'phone1' ||
                        fieldName === 'phone2' ||
                        fieldName === 'mobile') &&
                      o.IdCatTipoNumeroTelefonico === phoneTypeId
                        ? (fieldValue as string)
                        : o.Numero,
                    Extension:
                      (fieldName === 'ext1' || fieldName === 'ext2') &&
                      o.IdCatTipoNumeroTelefonico === phoneTypeId
                        ? (fieldValue as string)
                        : o.Extension,
                  }))
                : [
                    ...state.contactToEdit?.NumeroTelefonico,
                    {
                      ...initialPhoneNumber(),
                      Numero:
                        fieldName === 'phone1' || fieldName === 'phone2' || fieldName === 'mobile'
                          ? (fieldValue as string)
                          : '',
                      Extension:
                        fieldName === 'ext1' || fieldName === 'ext2' ? (fieldValue as string) : '',
                      IdCatTipoNumeroTelefonico: phoneTypeId,
                    },
                  ],
            }
          : {
              ...state.contactToEdit,
              [fieldName]: fieldValue as DropListOption,
              IdCatDificultad:
                fieldName === 'selectedDifficultyOption'
                  ? (fieldValue as DropListOption).value.toString()
                  : state.contactToEdit?.IdCatDificultad,
              /*Dificultad:
                fieldName === 'selectedDifficultyOption'
                  ? (fieldValue as DropListOption).label
                  : state.contactToEdit.Dificultad,*/
              IdCatMantenimiento:
                fieldName === 'selectedMaintenanceOption'
                  ? (fieldValue as DropListOption).value.toString()
                  : state.contactToEdit?.IdCatMantenimiento,
              /*Mantenimiento:
                fieldName === 'selectedMaintenanceOption'
                  ? (fieldValue as DropListOption).label
                  : state.contactToEdit.Mantenimiento,*/
              IdCatNivelDecision:
                fieldName === 'selectedDecisionLevelOption'
                  ? (fieldValue as DropListOption).value.toString()
                  : state.contactToEdit?.IdCatNivelDecision,
              IdCatNivelPuesto:
                fieldName === 'selectedJobLevelOption'
                  ? (fieldValue as DropListOption).value.toString()
                  : state.contactToEdit?.IdCatNivelPuesto,
            },
    }),
  ),
  on(buySaleProviderActions.SET_KIND_OF_BUY, (state, action) => ({
    ...state,
    [action.dataModelType]: {
      ...state[action.dataModelType],
      [action.fieldName]: action.fieldValue,
      [action.otherFieldName]: action.otherfieldValue,
    },
  })),
  on(generalDataProviderActions.GET_GENERAL_DATA_PROVIDER_SUCCESS, (state, action) => ({
    ...state,
    provider: {...state.provider, ...action.generalDataProvider},
    allowedFormAddress: action.generalDataProvider.IdProveedor !== DEFAULT_UUID,
  })),
  on(generalDataProviderActions.GET_ADDRESS_DATA_PROVIDER_SUCCESS, (state, action) => ({
    ...state,
    address: action.addressDataProvider,
  })),
  on(generalDataProviderActions.GET_CONTACTS_DATA_PROVIDER_SUCCESS, (state, {contacts}) => ({
    ...state,
    contacts,
  })),
  on(
    generalDataProviderActions.SET_DISABLE_CONTACT,
    (state: GeneralData, {contactId, mail}): GeneralData => {
      return {
        ...state,
        contacts:
          contactId === DEFAULT_UUID
            ? filter(
                state.contacts,
                (o: ContactoDetalleProvObj) => o.CorreoElectronico[0]?.Correo !== mail,
              )
            : filter(
                state.contacts,
                (o: ContactoDetalleProvObj) =>
                  o.IdContacto !== contactId && o.CorreoElectronico[0]?.Correo !== mail,
              ),
        disableContacts:
          contactId !== DEFAULT_UUID
            ? [
                ...state.disableContacts,
                find(state.contacts, (o: ContactoDetalleProvObj) => o.IdContacto === contactId),
              ]
            : state.disableContacts,
      };
    },
  ),
  on(
    generalDataProviderActions.SET_CONTACT_TO_EDIT,
    (state: GeneralData, {contactId, index}): GeneralData => ({
      ...state,
      contactToEdit: contactId
        ? {
            ...state.contacts[index],
            /*            Titulo: state.contacts[index]?.Titulo || 'N/D',
            Departamento: state.contacts[index]?.Departamento || 'N/D',
            Puesto: state.contacts[index]?.Puesto || 'N/D',*/
          }
        : {...initialProviderContact()},
      backUp: {
        ...state.backUp,
        contactToEdit: contactId ? state.contacts[index] : {},
      },
      duplicateMail: false,
    }),
  ),
  on(
    generalDataProviderActions.ADD_EDIT_CONTACT_TO_ARRAY,
    (state: GeneralData): GeneralData => ({
      ...state,
      contacts: find(
        state.contacts,
        (o: IContactoDetalleProvObj) =>
          o.IdContactoProveedor === state.contactToEdit.IdContactoProveedor &&
          ((state.contactToEdit.IdContactoProveedor === DEFAULT_UUID &&
            o.Mail === state.contactToEdit?.Mail) ||
            state.contactToEdit.IdContactoProveedor !== DEFAULT_UUID),
      )
        ? map(state.contacts, (o: IContactoDetalleProvObj) => {
            if (
              o.IdContactoProveedor === state.contactToEdit.IdContactoProveedor &&
              ((state.contactToEdit.IdContactoProveedor === DEFAULT_UUID &&
                o.Mail === state.contactToEdit?.Mail) ||
                state.contactToEdit.IdContactoProveedor !== DEFAULT_UUID)
            ) {
              return {
                ...state.contactToEdit,
              };
            }
            return {...o};
          })
        : [
            ...state.contacts,
            {
              ...state.contactToEdit,
              Puesto: state.contactToEdit.Puesto || 'N/D',
              Titulo: state.contactToEdit.Titulo || 'N/D',
              Departamento: state.contactToEdit.Departamento || 'N/D',
              Mail: state.contactToEdit.CorreoElectronico[0].Correo,
            },
          ],
      contactToEdit: null,
    }),
  ),
  on(generalDataProviderActions.UPDATE_CONTACT, (state, action) => ({
    ...state,
    contacts: map(state.contacts, (o, i) => {
      if (i === action.index) {
        return action.contact;
      }
      return o;
    }),
  })),
  on(generalDataProviderActions.SET_PROVIDER_BACKUP, (state, action) => ({
    ...state,
    backUp: {
      ...omit(state, ['backUp']),
    },
  })),
  on(generalDataProviderActions.RESTORE_PROVIDER_BACKUP, (state, action) => ({
    ...state,
    provider: state.backUp?.provider,
    address: state.backUp?.address,
    contacts: state.backUp?.contacts,
    disableContacts: state.backUp?.disableContacts,
  })),
  on(generalDataProviderActions.SET_HABILITY, (state, {value}) => ({
    ...state,
    provider: {
      ...state.provider,
      TieneFleteExpress: value,
      ConceptoFleteExpress: !value ? null : state.provider.ConceptoFleteExpress,
      LeyendaFleteExpress: !value ? null : state.provider.LeyendaFleteExpress,
      PrecioFleteExpress: !value ? null : state.provider.PrecioFleteExpress,
    },
  })),
  on(generalDataProviderActions.SET_CONCEPT, (state, {value}) => ({
    ...state,
    provider: {...state.provider, ConceptoFleteExpress: value},
  })),
  on(generalDataProviderActions.SET_LEGEND_FREIGHT, (state, {value}) => ({
    ...state,
    provider: {...state.provider, LeyendaFleteExpress: value},
  })),
  on(generalDataProviderActions.SET_AMOUNT_FREIGHT, (state, {value}) => ({
    ...state,
    provider: {...state.provider, PrecioFleteExpress: value},
  })),
  on(generalDataProviderActions.VALIDATE_ZIP_CODE_SUCCESS, (state, {value}) => ({
    ...state,
    zipCodeIsValid: value,
  })),
  on(
    generalDataProviderActions.SET_RFC_VALIDATION,
    (state: GeneralData, {value}): GeneralData => ({
      ...state,
      rfcIsValid: value,
    }),
  ),
  on(
    generalDataProviderActions.SET_EXISTING_EMAIL,
    (state: GeneralData, {duplicateMail}): GeneralData => ({
      ...state,
      duplicateMail:
        state.contactToEdit?.Mail === state.contactToEdit?.CorreoElectronico[0].Correo
          ? false
          : duplicateMail,
    }),
  ),
  on(
    providersListActions.SET_SELECTED_PROVIDER,
    (state: GeneralData, {provider}): GeneralData => ({
      ...state,
      provider: {...state.provider, ...provider},
    }),
  ),
);
