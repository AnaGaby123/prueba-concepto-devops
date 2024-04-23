/*core imports */
import {createReducer, on} from '@ngrx/store';
import {filter, find, map} from 'lodash-es';

/*model imports */
import {
  INewClientForm,
  initialNewClientFormState,
} from '@appModels/store/quotation/quotation-details/details/sections/new-customer-quotes.models';
import {initialIDireccion} from '@appModels/store/forms/clients-form/clients-details-form/address/address-clients-forms.models';
import {
  initialContactForm,
  initialTelephoneNumber,
} from '@appModels/store/forms/clients-form/clients-details-form/general-data/general-data-clients-form.models';

/*action imports */
import {newClientFormActions} from '@appActions/quotation';

/*tools imports */
import {ContactoDetalleObj, NumeroTelefonico} from 'api-catalogos';
import {DEFAULT_UUID} from '@appUtil/common.protocols';
import {initialGMClient} from '@appModels/store/quotation/quotation-details/details/sections/gm-client-quotation.models';

const initialNewClientForm: INewClientForm = {
  ...initialNewClientFormState(),
};
export const newDataClientFormsReducers = createReducer(
  initialNewClientForm,
  on(newClientFormActions.SET_INPUT_FORM_ADDRESS_NEW_CLIENT, (state, {input, value}) => ({
    ...state,
    addressForm: {
      ...state.addressForm,
      [input]: value,
    },
  })),
  on(
    newClientFormActions.SET_PHONE_NUMBER,
    (state: INewClientForm, {field, value, phoneType, phoneTypeId}): INewClientForm => ({
      ...state,
      contactForm: {
        ...state?.contactForm,
        NumeroTelefonico: find(
          state?.contactForm.NumeroTelefonico,
          (o: NumeroTelefonico) => o?.IdCatTipoNumeroTelefonico === phoneTypeId,
        )
          ? !value
            ? filter(
                state?.contactForm?.NumeroTelefonico,
                (o: NumeroTelefonico) => o?.IdCatTipoNumeroTelefonico !== phoneTypeId,
              )
            : map(state?.contactForm?.NumeroTelefonico, (o: NumeroTelefonico, index) => ({
                ...o,
                [field]: o?.IdCatTipoNumeroTelefonico === phoneTypeId ? value : o[field],
              }))
          : !value
          ? [...state?.contactForm?.NumeroTelefonico]
          : [
              ...state?.contactForm?.NumeroTelefonico,
              {
                ...initialTelephoneNumber(),
                [field]: value,
                IdCatTipoNumeroTelefonico: phoneTypeId,
              },
            ],
        NumeroTelefono1:
          field === 'Numero' && phoneType === 'Telefono 1'
            ? value
            : state?.contactForm?.NumeroTelefono1,
        NumeroTelefono2:
          field === 'Numero' && phoneType === 'Telefono 2'
            ? value
            : state?.contactForm?.NumeroTelefono2,
        NumeroMovil:
          field === 'Numero' && phoneType === 'Móvil' ? value : state?.contactForm?.NumeroMovil,
      },
    }),
  ),
  on(newClientFormActions.VALIDATE_ZIP_CODE_SUCCESS_ADDRESS, (state, {value}) => ({
    ...state,
    zipCodeIsValid: value,
  })),
  /* on(newClientFormActions.SET_DROP_FORM_NEW_ADDRESS_DATA, (state, {input, value}) => ({
    ...state,
    addressForm: {
      ...state?.addressForm,
      [input]: value?.value,
    },
  })),*/
  on(newClientFormActions.VERIFY_EMAIL, (state, {value}) => ({
    ...state,
    existingEmail: value,
  })),
  on(newClientFormActions.SET_ALERT_EXIT, (state, {value}) => ({
    ...state,
    alertChanges: value,
  })),
  on(newClientFormActions.FETCH_MAP_LOCATION_SUCCESS_NEW_CLIENT, (state, {lat, lng}) => ({
    ...state,
    addressForm: {
      ...state?.addressForm,
      Longitud: lng,
      Latitud: lat,
    },
  })),
  on(newClientFormActions.CLEAN_DISTANCE_MAPS, (state) => ({
    ...state,
    addressForm: {
      ...state?.addressForm,
      Longitud: null,
      Latitud: null,
      clienteDireccion: {
        ...state?.addressForm?.clienteDireccion,
        DistanciaCartaPorte: null,
      },
    },
  })),
  on(newClientFormActions.SET_CONTACT_FORM, (state) => {
    const contact: ContactoDetalleObj = state?.contactForm;
    if (contact.IdContacto === DEFAULT_UUID) {
      return {
        ...state,
        contacts: [...state?.contacts, contact],
        contactForm: initialContactForm(),
      };
    } else {
      return {
        ...state,
        contacts: map(state?.contacts, (o: ContactoDetalleObj) => {
          if (o?.IdContacto === contact?.IdContacto) {
            return contact;
          }
          return {...o};
        }),
        contactForm: initialContactForm(),
      };
    }
  }),
  on(newClientFormActions.UPDATE_LAT_LNG, (state, {lat, lng}) => ({
    ...state,
    addressForm: {
      ...state?.addressForm,
      Latitud: lat,
      Longitud: lng,
    },
  })),

  on(newClientFormActions.SHOW_MAP_NEW_CLIENT, (state, {value}) => ({
    ...state,
    showMap: value,
  })),
  /*  on(newClientFormActions.SET_SELECTED_NEW_CONTACT, (state, {contact}) => ({
    ...state,
    contactForm: contact,
  })),*/
  on(newClientFormActions.FETCH_DISTANCE_SUCCESS, (state, {distanceCartaPorte}) => ({
    ...state,
    addressForm: {
      ...state?.addressForm,
      clienteDireccion: {
        ...state?.addressForm?.clienteDireccion,
        DistanciaCartaPorte: distanceCartaPorte,
      },
    },
  })),
  on(newClientFormActions.SET_SELECTED_NEW_CONTACT_EDIT, (state) => {
    return {
      ...state,
      contacts: find(
        state.contacts,
        (o: ContactoDetalleObj) =>
          o?.IdContactoCliente === state?.contactForm?.IdContactoCliente &&
          state?.contactForm?.IdContactoCliente === DEFAULT_UUID &&
          o?.Mail === state?.contactForm?.Mail,
      )
        ? map(state?.contacts, (o: ContactoDetalleObj) => {
            if (
              o?.IdContactoCliente === state?.contactForm?.IdContactoCliente &&
              ((state?.contactForm?.IdContactoCliente === DEFAULT_UUID &&
                o?.Mail === state?.contactForm.Mail) ||
                state?.contactForm?.IdContactoCliente !== DEFAULT_UUID)
            ) {
              return {...state?.contactForm};
            }
            return {...o};
          })
        : [
            ...state?.contacts,
            {
              ...state?.contactForm,
              Mail: state?.contactForm.CorreoElectronico[0]?.Correo,
            },
          ],
      contactForm: initialContactForm(),
    };
  }),
  on(newClientFormActions.SET_ID_CONTACT, (state, {idPerson, index}) => ({
    ...state,
    contacts: map(state?.contacts, (o, i) => {
      if (i === index) {
        return {...o, IdDatosPersona: idPerson};
      }
      return o;
    }),
  })),

  on(newClientFormActions.SET_ID_MAIL, (state, {index, idEmail}) => ({
    ...state,
    contacts: map(state?.contacts, (o, i) => {
      if (i === index) {
        return {
          ...o,
          CorreoElectronico: {
            ...o.CorreoElectronico,
            IdCorreoElectronico: idEmail,
          },
        };
      }
      return o;
    }),
  })),
  on(newClientFormActions.SET_ID_CONTACT_CLIENT, (state, {idContactClient, index}) => ({
    ...state,
    contacts: map(state?.contacts, (o, i) => {
      if (i === index) {
        return {...o, IdContactoCliente: idContactClient};
      }
      return o;
    }),
  })),
  on(newClientFormActions.UPDATE_CLIENT, (state, {idClient}) => ({
    ...state,
    selectedClient: {
      ...state?.selectedClient,
      IdCliente: idClient,
    },
  })),
  on(newClientFormActions.GENERATE_BACKUP_MEW_CLIENT, (state) => ({
    ...state,
    backup: {
      selectedClient: state?.selectedClient,
      contacts: state?.contacts,
    },
  })),
  on(newClientFormActions.SAVE_FORM_CONTACT, (state) => {
    const contact: ContactoDetalleObj = state.contactForm;
    if (contact.IdContacto === DEFAULT_UUID) {
      return {
        ...state,
        contacts: [...state?.contacts, contact],
        contactForm: initialContactForm(),
      };
    } else {
      return {
        ...state,
        contacts: map(state?.contacts, (o: ContactoDetalleObj) => {
          if (o?.IdContacto === contact?.IdContacto) {
            return contact;
          }
          return {...o};
        }),
        contactForm: initialContactForm(),
      };
    }
  }),
  // TODO: Revisar si no esta usando, el código esta incorrecto
  /*on(newClientFormActions.SET_DELIVERY_DATA_ID, (state, {IdDataDirectionClient}) => ({
    ...state,
    addressForm: map(state?.addressForm, (o: IDireccion, i) => {
      return {
        ...o,
        DeliveryData: {
          ...o?.DeliveryData,
          IdDataDirectionClient,
        },
        clienteDireccion: {
          ...o?.clienteDireccion,
          IdDataDirectionClient,
        },
      };
    }),
  })),*/
  on(newClientFormActions.CLEAN_DATA_FORM_ADDRESS, (state) => ({
    ...state,
    addressForm: initialIDireccion(),
  })),
  on(newClientFormActions.CLEAN_GM_CLIENT_QUOTATION_DATA, (state) => ({
    ...state,
    selectedClient: initialGMClient(),
  })),
  on(newClientFormActions.CLEAN_FORM_DATA_CONTACT, (state) => ({
    ...state,
    contactForm: initialContactForm(),
  })),
  on(newClientFormActions.CLEAN_GENERAL_DATA_STATE, (state) => ({
    ...state,
    selectedClient: initialGMClient(),
    contacts: [],
    backup: {
      selectedClient: {},
      contacts: [],
    },
    addressForm: initialIDireccion(),
    contactForm: initialContactForm(),
  })),
  on(newClientFormActions.SET_DATA_INPUT_FORM_NEW_CLIENT, (state, {input, value}) => ({
    ...state,
    selectedClient: {
      ...state?.selectedClient,
      [input]: value,
    },
  })),
  on(newClientFormActions.SET_DATA_CONTACT_NEW_CONTACT, (state, {input, value}) => ({
    ...state,
    contactForm: {
      ...state?.contactForm,
      [input]: value,
    },
  })),
  /*  on(newClientFormActions.SET_DATA_DROP_CONTACT_MEW_CLIENT, (state, {input, option}) => ({
    ...state,
    contactForm: {
      ...state?.contactForm,
      [input]: option.value,
    },
  })),*/
  /*  on(newClientFormActions.CHECK_PICK_UP, (state, {value}) => ({
    ...state,
    selectedClient: {
      ...state?.selectedClient,
      RecogeEnProquifa: value,
    },
  })),*/
  /*  on(newClientFormActions.SET_DROP_NEW_FORM_DATA_ROL, (state, {idInput, stringInput, value}) => ({
    ...state,
    selectedClient: {
      ...state?.selectedClient,
      [stringInput]: value?.value,
      [idInput]: value?.label,
    },
  })),*/
  on(newClientFormActions.SET_DATA_CONTACT_FORM_EMAIL, (state, {input, value}) => {
    if (input === 'Mail') {
      return {
        ...state,
        contactForm: {
          ...state?.contactForm,
          Mail: value,
          CorreoElectronico: map(state?.contactForm?.CorreoElectronico, (o) => {
            return {
              ...o,
              Correo: value,
            };
          }),
        },
      };
    } else {
      return {
        ...state,
        contactForm: {
          ...state?.contactForm,
          [input]: value,
        },
      };
    }
  }),
);
