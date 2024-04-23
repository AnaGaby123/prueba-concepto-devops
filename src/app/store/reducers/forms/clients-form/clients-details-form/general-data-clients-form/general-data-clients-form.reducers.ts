import {createReducer, on} from '@ngrx/store';
import {
  ClientTerceroAutorizadoRelacion,
  IContactoDetalleObj,
  IGeneralDataClientsForm,
  initialContactForm,
  initialIGeneralDataClientsForm,
  initialTelephoneNumber,
  initialVcliente,
} from '@appModels/store/forms/clients-form/clients-details-form/general-data/general-data-clients-form.models';
import * as clientsGeneralDataActions from '@appActions/forms/client-form/clients-details-form/general-data-clients-form/general-data-clients-form.actions';
import {filter, find, findIndex, map} from 'lodash-es';
import {ContactoDetalleObj, NumeroTelefonico} from 'api-catalogos';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import * as clientsActions from '@appActions/forms/client-form/clients-form.actions';

const initialGeneralDataClientsFormState: IGeneralDataClientsForm = {
  ...initialIGeneralDataClientsForm(),
};
export const generalDataClientsFormsReducers = createReducer(
  initialGeneralDataClientsFormState,
  on(clientsGeneralDataActions.GET_CLIENT_SELECTED, (state, {client}) => ({
    ...state,
    selectedClient: client,
  })),
  on(clientsGeneralDataActions.FETCH_ACTIVE_CONTACTS_SUCCESS, (state, {contacts}) => ({
    ...state,
    contacts,
  })),
  on(clientsGeneralDataActions.SET_SELECTED_CONTACT, (state, {contact}) => ({
    ...state,
    contactForm: {
      ...contact,
      Titulo: contact?.Titulo || 'N/D',
      Departamento: contact?.Departamento || 'N/D',
      Puesto: contact?.Puesto || 'N/D',
    },
  })),
  on(
    clientsGeneralDataActions.SET_DATA_CLIENT,
    (state: IGeneralDataClientsForm, {input, value}): IGeneralDataClientsForm => ({
      ...state,
      selectedClient: {
        ...state.selectedClient,
        [input]: value,
      },
      tercerosAutorizados: {
        ...state.tercerosAutorizados,
        tercerosAutorizadosToDelete:
          input === 'EsTerceroAutorizado' && !value
            ? [
                ...state.tercerosAutorizados.tercerosAutorizadosToDelete,
                ...filter(
                  state.tercerosAutorizados.tercerosAutorizadosSelected,
                  (o) => o.IdClienteTerceroAutorizadoRelacion !== DEFAULT_UUID,
                ),
              ]
            : state.tercerosAutorizados.tercerosAutorizadosToDelete,
        tercerosAutorizadosSelected:
          input === 'EsTerceroAutorizado' && !value
            ? []
            : state.tercerosAutorizados.tercerosAutorizadosSelected,
      },
    }),
  ),
  on(
    clientsGeneralDataActions.GENERATE_BACKUP,
    (state: IGeneralDataClientsForm): IGeneralDataClientsForm => ({
      ...state,
      backup: {
        selectedClient: state.selectedClient,
        contacts: state.contacts,
        contactsToDelete: state.contactsToDelete,
        tercerosAutorizados: state.tercerosAutorizados.tercerosAutorizadosSelected,
      },
    }),
  ),
  on(clientsActions.SET_ENABLE_EDIT, (state, {value}) => ({
    ...state,
    backup: value ? state.backup : initialGeneralDataClientsFormState.backup,
  })),
  on(clientsGeneralDataActions.CLEAN_FORM, (state) => ({
    ...state,
    selectedClient: state.backup.selectedClient,
    contacts: state.backup.contacts,
    contactsToDelete: [],
    tercerosAutorizados: {
      ...state.tercerosAutorizados,
      tercerosAutorizadosSelected: state.backup.tercerosAutorizados,
      tercerosAutorizadosToDelete: [],
    },
    backup: {
      ...state.backup,
      selectedClient: {},
      contacts: [],
      tercerosAutorizados: [],
    },
  })),
  on(
    clientsGeneralDataActions.GET_CAT_TERCEROS_ATUORIZADOS_SUCCESS,
    (state, {listTercerosAutorizados}) => ({
      ...state,
      tercerosAutorizados: {
        ...state.tercerosAutorizados,
        listTercerosAutorizados,
      },
    }),
  ),
  on(
    clientsGeneralDataActions.REMOVE_CONTACT,
    (state: IGeneralDataClientsForm, {contact}): IGeneralDataClientsForm => {
      return {
        ...state,
        contactsToDelete:
          contact.IdContactoCliente !== DEFAULT_UUID
            ? [...state.contactsToDelete, contact]
            : state.contactsToDelete,
        contacts: filter(state.contacts, (o: IContactoDetalleObj) => o !== contact),
      };
    },
  ),
  on(clientsGeneralDataActions.SAVE_OR_UPDATE_CONTACT_SUCCESS, (state, {contacts}) => {
    return {
      ...state,
      contacts,
    };
  }),
  on(
    clientsGeneralDataActions.GET_TERCEROS_AUTORIZADOS_CLIENT_SUCCESS,
    (state, {tercerosAutorizadosSelected}) => ({
      ...state,
      tercerosAutorizados: {
        ...state.tercerosAutorizados,
        tercerosAutorizadosSelected,
      },
    }),
  ),
  on(clientsGeneralDataActions.SET_DROP_DATA, (state, {idInput, stringInput, value}) => ({
    ...state,
    selectedClient: {
      ...state.selectedClient,
      [idInput]: value?.value,
      [stringInput]: value?.label,
      NoAplicaGastoDeEnvio:
        stringInput === 'Sector' ? false : state.selectedClient.NoAplicaGastoDeEnvio,
    },
  })),
  on(clientsGeneralDataActions.SET_CLIENT_FORM_DROP_DATA, (state, {idInput, value}) => ({
    ...state,
    contactForm: {
      ...state.contactForm,
      [idInput]: value.value,
    },
  })),
  on(clientsGeneralDataActions.CLEAN_GENERAL_DATA_STATE, (state) => ({
    ...state,
    selectedClient: initialVcliente(),
    contacts: [],
    backup: {
      selectedClient: {},
      contacts: [],
      tercerosAutorizados: [],
      contactsToDelete: [],
    },
    tercerosAutorizados: {
      listTercerosAutorizados: [],
      tercerosAutorizadosSelected: [],
      tercerosAutorizadosToDelete: [],
    },
  })),
  on(clientsGeneralDataActions.SET_CONTACT_FORM_DATA, (state, {input, value}) => {
    if (input === 'Mail') {
      return {
        ...state,
        contactForm: {
          ...state.contactForm,
          CorreoElectronico: map(state.contactForm.CorreoElectronico, (o) => {
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
          ...state.contactForm,
          [input]: value,
        },
      };
    }
  }),
  on(clientsGeneralDataActions.CLEAN_CONTACT_FORM, (state) => ({
    ...state,
    contactForm: initialContactForm(),
    existingEmail: false,
  })),
  on(
    clientsGeneralDataActions.VERIFY_EMAIL,
    (state, {value}): IGeneralDataClientsForm => ({
      ...state,
      existingEmail:
        state.contactForm.Mail === state.contactForm.CorreoElectronico[0].Correo ? false : value,
    }),
  ),
  on(
    clientsGeneralDataActions.SET_PHONE_NUMBER,
    (
      state: IGeneralDataClientsForm,
      {field, value, phoneType, phoneTypeId},
    ): IGeneralDataClientsForm => ({
      ...state,
      contactForm: {
        ...state.contactForm,
        NumeroTelefonico: find(
          state.contactForm.NumeroTelefonico,
          (o: NumeroTelefonico) => o.IdCatTipoNumeroTelefonico === phoneTypeId,
        )
          ? !value
            ? filter(
                state.contactForm.NumeroTelefonico,
                (o: NumeroTelefonico) => o.IdCatTipoNumeroTelefonico !== phoneTypeId,
              )
            : map(state.contactForm.NumeroTelefonico, (o: NumeroTelefonico, index) => ({
                ...o,
                [field]: o.IdCatTipoNumeroTelefonico === phoneTypeId ? value : o[field],
              }))
          : !value
          ? [...state.contactForm.NumeroTelefonico]
          : [
              ...state.contactForm.NumeroTelefonico,
              {
                ...initialTelephoneNumber(),
                [field]: value,
                IdCatTipoNumeroTelefonico: phoneTypeId,
              },
            ],
        NumerosTelefonicosEliminados:
          !value &&
          find(
            state.contactForm.NumeroTelefonico,
            (o: NumeroTelefonico) =>
              o.IdCatTipoNumeroTelefonico === phoneTypeId && o.IdNumeroTelefonico !== DEFAULT_UUID,
          )
            ? [
                ...state.contactForm.NumerosTelefonicosEliminados,
                {
                  ...find(
                    state.contactForm.NumeroTelefonico,
                    (o: NumeroTelefonico) =>
                      o.IdCatTipoNumeroTelefonico === phoneTypeId &&
                      o.IdNumeroTelefonico !== DEFAULT_UUID,
                  ),
                  Activo: false,
                },
              ]
            : state.contactForm.NumerosTelefonicosEliminados,
        NumeroTelefono1:
          field === 'Numero' && phoneType === 'Telefono 1'
            ? value
            : state.contactForm.NumeroTelefono1,
        NumeroTelefono2:
          field === 'Numero' && phoneType === 'Telefono 2'
            ? value
            : state.contactForm.NumeroTelefono2,
        NumeroMovil:
          field === 'Numero' && phoneType === 'Móvil' ? value : state.contactForm.NumeroMovil,
      },
    }),
  ),
  on(clientsGeneralDataActions.SET_AUTHORIZED_THIRD_SELECTED, (state, {value}) => ({
    ...state,
    authorizedThirdSelected: value,
  })),
  on(clientsGeneralDataActions.SET_MODAL_IS_OPEN, (state, {value}) => ({
    ...state,
    modalIsOpen: value,
  })),
  on(clientsGeneralDataActions.REMOVE_TERCERO_AUTORIZADO, (state, {terceroAutorizado}) => ({
    ...state,
    tercerosAutorizados: {
      ...state.tercerosAutorizados,
      tercerosAutorizadosSelected: filter(
        state.tercerosAutorizados.tercerosAutorizadosSelected,
        (o: ClientTerceroAutorizadoRelacion) =>
          o.IdClienteTerceroAutorizado !== terceroAutorizado.IdClienteTerceroAutorizado,
      ),
      tercerosAutorizadosToDelete: [
        ...state.tercerosAutorizados.tercerosAutorizadosToDelete,
        terceroAutorizado,
      ],
    },
  })),
  on(clientsGeneralDataActions.SET_PHONE_EXTENSION, (state, {value, id}) => ({
    ...state,
    contactForm: {
      ...state.contactForm,
      NumeroTelefonico: map(state.contactForm.NumeroTelefonico, (o: NumeroTelefonico, index) => {
        if (id === index) {
          return {
            ...o,
            Extension: value,
          };
        }
        return {...o};
      }),
    },
  })),
  on(
    clientsGeneralDataActions.UPDATE_CLIENT,
    (state: IGeneralDataClientsForm, {idClient}): IGeneralDataClientsForm => ({
      ...state,
      selectedClient: {
        ...state.selectedClient,
        IdCliente: idClient,
      },
    }),
  ),
  on(
    clientsGeneralDataActions.SAVE_GENERAL_DATA_CLIENT_SUCCESS,
    (state: IGeneralDataClientsForm, {generalDataToSave}): IGeneralDataClientsForm => ({
      ...state,
      tercerosAutorizados: {
        ...state.tercerosAutorizados,
        tercerosAutorizadosToDelete: generalDataToSave.selectedClientsAuthorizedToDelete,
        tercerosAutorizadosSelected: map(
          state.tercerosAutorizados.tercerosAutorizadosSelected,
          (o: ClientTerceroAutorizadoRelacion) => {
            if (
              find(
                generalDataToSave.selectedClientsAuthorized,
                (i: ClientTerceroAutorizadoRelacion) =>
                  i.IdClienteTerceroAutorizado === o.IdClienteTerceroAutorizado,
              )
            ) {
              return {
                ...o,
                ...find(
                  generalDataToSave.selectedClientsAuthorized,
                  (i: ClientTerceroAutorizadoRelacion) =>
                    i.IdClienteTerceroAutorizado === o.IdClienteTerceroAutorizado,
                ),
              };
            }
            return {...o};
          },
        ),
      },
    }),
  ),
  on(clientsGeneralDataActions.SAVE_OR_UPDATE_CONTACT, (state) => ({
    ...state,
    contacts: map(state.contacts, (o: IContactoDetalleObj) => ({
      ...o,
      IdCliente: state.selectedClient.IdCliente,
    })),
  })),
  on(clientsGeneralDataActions.SET_CONTACT_FORM, (state) => {
    return {
      ...state,
      contacts: find(
        state.contacts,
        (o: ContactoDetalleObj) =>
          o.IdContactoCliente === state.contactForm.IdContactoCliente &&
          ((state.contactForm.IdContactoCliente === DEFAULT_UUID &&
            o.Mail === state.contactForm.Mail) ||
            state.contactForm.IdContactoCliente !== DEFAULT_UUID),
      )
        ? map(state.contacts, (o: ContactoDetalleObj) => {
            if (
              o.IdContactoCliente === state.contactForm.IdContactoCliente &&
              ((state.contactForm.IdContactoCliente === DEFAULT_UUID &&
                o.Mail === state.contactForm.Mail) ||
                state.contactForm.IdContactoCliente !== DEFAULT_UUID)
            ) {
              return {
                ...state.contactForm,
                Mail: state.contactForm.CorreoElectronico[0].Correo,
              };
            }
            return {...o};
          })
        : [
            ...state.contacts,
            {
              ...state.contactForm,
              Mail: state.contactForm.CorreoElectronico[0].Correo,
              IdCliente: state.selectedClient.IdCliente,
            },
          ],
      contactForm: initialContactForm(),
    };
  }),
  // DOCS: No se esta usando
  /*on(clientsGeneralDataActions.SET_ID_CONTACT, (state, {idPerson, index}) => ({
    ...state,
    contacts: map(state.contacts, (o, i) => {
      if (i === index) {
        return {...o, IdDatosPersona: idPerson};
      }
      return o;
    }),
  })),*/
  // DOCS: No se esta usando
  /*on(clientsGeneralDataActions.SET_ID_MAIL, (state, {index, idEmail}) => ({
    ...state,
    contacts: map(state.contacts, (o, i) => {
      if (i === index) {
        return {
          ...o,
          Correo: {
            ...o.Correo,
            IdCorreoElectronico: idEmail,
          },
        };
      }
      return o;
    }),
  })),*/
  // DOCS: No se esta usando
  /*on(clientsGeneralDataActions.SET_ID_MOBILE, (state, {idMobile, index}) => ({
    ...state,
    contacts: map(state.contacts, (o, i) => {
      if (i === index) {
        return {...o, Mobile: {...o.Mobile, IdNumeroTelefonico: idMobile}};
      }
      return o;
    }),
  })),*/
  // DOCS: No se esta usando
  /*on(clientsGeneralDataActions.SET_ID_PHONE1, (state, {idPhone1, index}) => ({
    ...state,
    contacts: map(state.contacts, (o, i) => {
      if (i === index) {
        return {...o, Phone1: {...o.Mobile, IdNumeroTelefonico: idPhone1}};
      }
      return o;
    }),
  })),*/
  // DOCS: No se esta usando
  /*on(clientsGeneralDataActions.SET_ID_PHONE2, (state, {idPhone2, index}) => ({
    ...state,
    contacts: map(
      state.contacts,
      (o: IContactoDetalleObj, i): IContactoDetalleObj => {
        if (i === index) {
          return {...o, Phone2: {...o.Mobile, IdNumeroTelefonico: idPhone2}};
        }
        return o;
      },
    ),
  })),*/
  on(clientsGeneralDataActions.SET_ID_CONTACT_PERSON, (state, {idContact, index}) => ({
    ...state,
    contacts: map(state.contacts, (o, i) => {
      if (i === index) {
        return {...o, IdContact: idContact};
      }
      return o;
    }),
  })),
  on(clientsGeneralDataActions.SET_ID_CONTACT_CLIENT, (state, {idContactClient, index}) => ({
    ...state,
    contacts: map(state.contacts, (o, i) => {
      if (i === index) {
        return {...o, IdContactoCliente: idContactClient};
      }
      return o;
    }),
  })),
  on(clientsGeneralDataActions.SET_TERCERO_AUTORIZADO, (state, {terceroAutorizado}) => ({
    ...state,
    tercerosAutorizados: {
      ...state.tercerosAutorizados,
      tercerosAutorizadosSelected:
        findIndex(
          state.tercerosAutorizados.tercerosAutorizadosSelected,
          (o: ClientTerceroAutorizadoRelacion) =>
            o.IdClienteTerceroAutorizado === terceroAutorizado.IdCliente,
        ) !== -1
          ? [...state.tercerosAutorizados.tercerosAutorizadosSelected]
          : [
              ...state.tercerosAutorizados.tercerosAutorizadosSelected,
              {
                Activo: true,
                FechaCaducidad: null,
                FechaRegistro: DEFAULT_DATE,
                FechaUltimaActualizacion: DEFAULT_DATE,
                IdCliente: state.selectedClient.IdCliente,
                IdClienteTerceroAutorizado: terceroAutorizado.IdCliente,
                IdClienteTerceroAutorizadoRelacion: DEFAULT_UUID,
                Alias: terceroAutorizado.Alias,
                NombreTerceroAutorizado: terceroAutorizado.NombreTerceroAutorizado,
              },
            ],
    },
  })),
);
