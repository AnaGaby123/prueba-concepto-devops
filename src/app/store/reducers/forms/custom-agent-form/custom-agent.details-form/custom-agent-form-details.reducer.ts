import {createReducer, on} from '@ngrx/store';
import {
  ICustomAgentContact,
  ICustomsAgentsDetails,
  initialAduanaDetalle,
  initialCustomAgentSelected,
  initialIRateState,
  initialStateAgentsDetails,
  initialStateContactForm,
  initialStateDispatchPoint,
  initialStateGeneralData,
  initialTelephoneNumber,
} from '@appModels/store/forms/custom-agents-forms/custom-agents-details-forms/custom-agents-details-forms.models';
import {customAgentDetailsActions} from '@appActions/forms/custom-agent-form';

// utils
import {filter, find, map} from 'lodash-es';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {AduanaDetalle, ConceptoAgenteAduanal, NumeroTelefonico} from 'api-catalogos';
import {
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {replaceND} from '@appUtil/util';

const initialDetailsCustomsAgentsForm: ICustomsAgentsDetails = {
  ...initialStateAgentsDetails(),
};
export const detailsCustomsAgentsFormReducer = createReducer(
  initialDetailsCustomsAgentsForm,
  on(customAgentDetailsActions.RESET_DETAILS, (state) => ({
    ...state,
    ...initialStateAgentsDetails(),
  })),
  on(
    customAgentDetailsActions.SET_TAB_SELECTED,
    (state: ICustomsAgentsDetails, {option}): ICustomsAgentsDetails => ({
      ...state,
      tabOptionSelected: option,
      activitySelected: find(
        state.activitiesOptions,
        (o: BarActivityOption) => o.id === Number(option.id),
      ),
    }),
  ),
  on(customAgentDetailsActions.NEXT_STEP, (state, {step}) => ({
    ...state,
    tabOptionSelected: find(state.tabOptions, (o: ITabOption) => Number(o.id) === step + 1),
    activitySelected: find(state.activitiesOptions, (o: BarActivityOption) => o.id === step + 1),
  })),
  on(
    customAgentDetailsActions.SET_OPTION_BAR_SELECTED,
    (state: ICustomsAgentsDetails, {option}): ICustomsAgentsDetails => ({
      ...state,
      dispatchPoint: {
        ...state.dispatchPoint,
        dispatchPoints: map(state.dispatchPoint.dispatchPoints, (o: OptionBar) => {
          if (o.id === option.id) {
            return {
              ...o,
              isSelected: true,
            };
          } else {
            return {
              ...o,
              isSelected: false,
            };
          }
        }),
        selectedDispatchPoint: find(
          state.dispatchPoint.dispatchPointList,
          (o) => o.IdAduana === option.id,
        ),
        zipCodeValidate: true,
        allowEditForm: true,
      },
      backUp: {
        ...state.backUp,
        dispatchPointList: state.dispatchPoint.dispatchPointList,
        selectedDispatchPoint: find(
          state.dispatchPoint.dispatchPointList,
          (o) => o.IdAduana === option.id,
        ),
      },
    }),
  ),
  on(
    customAgentDetailsActions.SET_CUSTOM_AGENT_SELECTED,
    (state: ICustomsAgentsDetails, {customAgent}): ICustomsAgentsDetails => ({
      ...state,
      generalData: {
        ...state.generalData,
        customAgentSelected: customAgent,
      },
      customAgentSelected: customAgent,
    }),
  ),
  // DOCS: ACCIONES EN DATOS GENERALES
  on(
    customAgentDetailsActions.SET_OPEN_CONTACT_POP,
    (state: ICustomsAgentsDetails, {value}): ICustomsAgentsDetails => ({
      ...state,
      contactFormOpen: value,
    }),
  ),
  on(
    customAgentDetailsActions.FETCH_CONTACTS_SUCCESS,
    (state: ICustomsAgentsDetails, {contacts}): ICustomsAgentsDetails => ({
      ...state,
      generalData: {
        ...state.generalData,
        contacts,
      },
    }),
  ),
  on(
    customAgentDetailsActions.SET_CONTACT_SELECTED,
    (state: ICustomsAgentsDetails, {contact}): ICustomsAgentsDetails => ({
      ...state,
      generalData: {
        ...state.generalData,
        contactForm: contact
          ? {
              ...contact,
              Titulo: contact?.Titulo || 'N/D',
              Departamento: contact?.Departamento || 'N/D',
              Puesto: contact?.Puesto || 'N/D',
              haveChanges: true,
            }
          : {
              ...initialStateContactForm(),
              Titulo: contact?.Titulo || 'N/D',
              Departamento: contact?.Departamento || 'N/D',
              Puesto: contact?.Puesto || 'N/D',
              haveChanges: true,
            },
        /*          existingEmail: {
          ...state.generalData.existingEmail,
          email: contact?.CorreoElectronico?.[0]?.Correo,
        },*/
      },
      backUp: {
        ...state.backUp,
        contactForm: contact
          ? {
              ...contact,
            }
          : {
              haveChanges: true,
            },
      },
    }),
  ),
  on(
    customAgentDetailsActions.SET_CONTACT_DATA,
    (state: ICustomsAgentsDetails, {input, value}): ICustomsAgentsDetails => {
      if (input === 'Mail') {
        return {
          ...state,
          generalData: {
            ...state.generalData,
            contactForm: {
              ...state.generalData.contactForm,
              /*              Mail: value,*/
              CorreoElectronico: map(state.generalData.contactForm.CorreoElectronico, (o) => {
                return {
                  ...o,
                  Correo: value,
                };
              }),
            },
          },
        };
      } else {
        return {
          ...state,
          generalData: {
            ...state.generalData,
            contactForm: {
              ...state.generalData.contactForm,
              [input]: value,
            },
          },
        };
      }
    },
  ),
  on(
    customAgentDetailsActions.SET_PHONE_NUMBER,
    (state, {field, value, phoneType, phoneTypeId}) => ({
      ...state,
      generalData: {
        ...state.generalData,
        contactForm: {
          ...state.generalData.contactForm,
          NumeroTelefonico: find(
            state.generalData.contactForm.NumeroTelefonico,
            (o: NumeroTelefonico) => o.IdCatTipoNumeroTelefonico === phoneTypeId,
          )
            ? !value
              ? filter(
                  state.generalData.contactForm.NumeroTelefonico,
                  (o: NumeroTelefonico) => o.IdCatTipoNumeroTelefonico !== phoneTypeId,
                )
              : map(
                  state.generalData.contactForm.NumeroTelefonico,
                  (o: NumeroTelefonico, index) => ({
                    ...o,
                    [field]: o.IdCatTipoNumeroTelefonico === phoneTypeId ? value : o[field],
                  }),
                )
            : !value
            ? [...state.generalData.contactForm.NumeroTelefonico]
            : [
                ...state.generalData.contactForm.NumeroTelefonico,
                {
                  ...initialTelephoneNumber(),
                  [field]: value,
                  IdCatTipoNumeroTelefonico: phoneTypeId,
                },
              ],
          NumeroTelefono1:
            field === 'Numero' && phoneType === 'Telefono 1'
              ? value
              : state.generalData.contactForm.NumeroTelefono1,
          NumeroTelefono2:
            field === 'Numero' && phoneType === 'Telefono 2'
              ? value
              : state.generalData.contactForm.NumeroTelefono2,
          NumeroMovil:
            field === 'Numero' && phoneType === 'Móvil'
              ? value
              : state.generalData.contactForm.NumeroMovil,
        },
      },
    }),
  ),
  on(
    customAgentDetailsActions.SET_CONTACT_FORM,
    (state: ICustomsAgentsDetails): ICustomsAgentsDetails => ({
      ...state,
      generalData: {
        ...state.generalData,
        contacts: find(
          state.generalData.contacts,
          (o: ICustomAgentContact) =>
            o.IdContactoAduana === state.generalData.contactForm.IdContactoAduana &&
            ((state.generalData.contactForm.IdContactoAduana === DEFAULT_UUID &&
              o.Mail === state.generalData.contactForm.Mail) ||
              state.generalData.contactForm.IdContactoAduana !== DEFAULT_UUID),
        )
          ? map(state.generalData.contacts, (o: ICustomAgentContact) => {
              if (
                o.IdContactoAduana === state.generalData.contactForm.IdContactoAduana &&
                ((state.generalData.contactForm.IdContactoAduana === DEFAULT_UUID &&
                  o.Mail === state.generalData.contactForm.Mail) ||
                  state.generalData.contactForm.IdContactoAduana !== DEFAULT_UUID)
              ) {
                return {
                  ...state.generalData.contactForm,
                  Puesto: replaceND(state.generalData.contactForm?.Puesto),
                  Titulo: replaceND(state.generalData.contactForm?.Titulo),
                  Departamento: replaceND(state.generalData.contactForm?.Departamento),
                };
              }
              return {...o};
            })
          : [
              ...state.generalData.contacts,
              {
                ...state.generalData.contactForm,
                Puesto: state.generalData.contactForm.Puesto || 'N/D',
                Titulo: state.generalData.contactForm.Titulo || 'N/D',
                Departamento: state.generalData.contactForm.Departamento || 'N/D',
                Mail: state.generalData.contactForm.CorreoElectronico[0].Correo,
                ContactoAduana: {
                  Activo: state.generalData.contactForm.Activo,
                  FechaRegistro: state.generalData.contactForm.FechaRegistro,
                  FechaUltimaActualizacion: state.generalData.contactForm.FechaUltimaActualizacion,
                  IdContacto: state.generalData.contactForm.IdContacto,
                  IdContactoAduana: DEFAULT_UUID,
                  IdAgenteAduanal: state.generalData.customAgentSelected.IdAgenteAduanal,
                  FechaCaducidadRegistro: new Date().toISOString(),
                },
                Contacto: {
                  Activo: state.generalData.contactForm.Activo,
                  FechaRegistro: state.generalData.contactForm.FechaRegistro,
                  FechaUltimaActualizacion: state.generalData.contactForm.FechaUltimaActualizacion,
                  IdContacto: state.generalData.contactForm.IdContacto,
                  IdDatosPersona: state.generalData.contactForm.IdDatosPersona,
                  Prioridad: 0,
                  FechaCaducidadRegistro: new Date().toISOString(),
                },
              },
            ],
        contactForm: initialStateContactForm(),
      },
      backUp: {
        ...state.backUp,
        contactForm: undefined,
      },
      contactFormOpen: false,
    }),
  ),
  on(
    customAgentDetailsActions.SET_NEW_DATA,
    (state: ICustomsAgentsDetails, {input, value}): ICustomsAgentsDetails => ({
      ...state,
      generalData: {
        ...state.generalData,
        customAgentSelected: {
          ...state.generalData.customAgentSelected,
          [input]: value,
        },
      },
    }),
  ),
  on(
    customAgentDetailsActions.SET_CONTACT_ACTION,
    (state: ICustomsAgentsDetails, {action}): ICustomsAgentsDetails => ({
      ...state,
      generalData: {
        ...state.generalData,
        contactAction: action,
      },
    }),
  ),
  on(
    customAgentDetailsActions.GENERATE_BACKUP,
    (state: ICustomsAgentsDetails, {tabOption}): ICustomsAgentsDetails => {
      if (tabOption.id === '1') {
        return {
          ...state,
          backUp: {
            customAgentSelected: state.generalData.customAgentSelected,
            contacts: state.generalData.contacts,
          },
        };
      } else {
        return {
          ...state,
          backUp: {
            dispatchPointList: state.dispatchPoint.dispatchPointList,
            selectedDispatchPoint: state.dispatchPoint.selectedDispatchPoint,
          },
        };
      }
    },
  ),
  on(customAgentDetailsActions.VALIDATE_ZIP_SUCCESS, (state, {value}) => ({
    ...state,
    generalData: {
      ...state.generalData,
      zipCodeIsValid: value,
    },
  })),
  on(
    customAgentDetailsActions.SET_CANCEL_FORM,
    (state: ICustomsAgentsDetails): ICustomsAgentsDetails => {
      if (state.tabOptionSelected.id === '1') {
        return {
          ...state,
          generalData: {
            ...state.generalData,
            customAgentSelected: state.backUp.customAgentSelected,
            contacts: state.backUp.contacts,
            disableContacts: [],
          },
        };
      } else {
        return {
          ...state,
          dispatchPoint: {
            ...state.dispatchPoint,
            dispatchPointList: state.backUp.dispatchPointList,
            selectedDispatchPoint:
              state.backUp.dispatchPointList.length > 0
                ? find(
                    state.backUp.dispatchPointList,
                    (o: AduanaDetalle) =>
                      o.IdAduana === state.backUp.selectedDispatchPoint.IdAduana,
                  )
                : {},
            dispatchPoints: map(state.backUp.dispatchPointList, (o: AduanaDetalle, index) => {
              return {
                id: o.IdAduana,
                label: o.NombreLugar,
                isSelected: index === 0,
                isEnable: o.Activo,
              };
            }),
            addRate: initialIRateState(),
          },
        };
      }
    },
  ),
  on(customAgentDetailsActions.SET_CANCEL_POP, (state, {value, origen}) => ({
    ...state,
    cancelPop: {
      ...state.cancelPop,
      origen,
    },
  })),
  on(customAgentDetailsActions.SET_PRESELECTED_DISPATCH_POINT, (state, {value}) => ({
    ...state,
    preSelectedDispatchPoint: value,
  })),
  on(customAgentDetailsActions.SET_NAME_NEW_DISPATCH_POINT, (state, {name}) => ({
    ...state,
    initialDispatchPoint: {
      ...state.initialDispatchPoint,
      NombreLugar: name.trim(),
    },
    dispatchPoint: {
      ...state.dispatchPoint,
      zipCodeValidate: true,
    },
  })),
  on(
    customAgentDetailsActions.SET_CONTACT_TO_DISABLE,
    (state: ICustomsAgentsDetails, {contact}): ICustomsAgentsDetails => ({
      ...state,
      generalData: {
        ...state.generalData,
        disableContacts: [...state.generalData.disableContacts, contact],
      },
    }),
  ),
  on(
    customAgentDetailsActions.DELETE_CONTACT,
    (state: ICustomsAgentsDetails, {contact}): ICustomsAgentsDetails => ({
      ...state,
      generalData: {
        ...state.generalData,
        contacts: filter(state.generalData.contacts, (o) => o !== contact),
      },
    }),
  ),
  on(
    customAgentDetailsActions.SET_ADDRESS_SUCCESS,
    (state: ICustomsAgentsDetails, {IdDireccion}): ICustomsAgentsDetails => ({
      ...state,
      generalData: {
        ...state.generalData,
        customAgentSelected: {
          ...state.generalData.customAgentSelected,
          IdDireccion,
        },
      },
    }),
  ),
  on(
    customAgentDetailsActions.SET_CUSTOM_AGENT_SUCCESS,
    (state: ICustomsAgentsDetails, {IdAgenteAduanal}): ICustomsAgentsDetails => ({
      ...state,
      generalData: {
        ...state.generalData,
        customAgentSelected: {
          ...state.generalData.customAgentSelected,
          IdAgenteAduanal,
        },
        contacts: map(state.generalData.contacts, (c: ICustomAgentContact) => {
          return {
            ...c,
            IdAgenteAduanal,
          };
        }),
      },
      customAgentSelected: {
        ...state.generalData.customAgentSelected,
        IdAgenteAduanal,
      },
    }),
  ),
  on(
    customAgentDetailsActions.RESET_CUSTOM_AGENT_SELECTED,
    (state: ICustomsAgentsDetails): ICustomsAgentsDetails => ({
      ...state,
      generalData: {
        ...state.generalData,
        customAgentSelected: initialCustomAgentSelected(),
      },
      backUp: {},
    }),
  ),
  on(
    customAgentDetailsActions.DISABLE_CONTACTS_SUCCESS,
    (state: ICustomsAgentsDetails): ICustomsAgentsDetails => ({
      ...state,
      generalData: {
        ...state.generalData,
        disableContacts: [],
      },
    }),
  ),
  on(
    customAgentDetailsActions.RESET_CONTACT_FORM,
    (state: ICustomsAgentsDetails): ICustomsAgentsDetails => ({
      ...state,
      generalData: {
        ...state.generalData,
        contactForm: initialStateContactForm(),
        existingEmail: {
          exist: false,
          email: '',
        },
      },
      backUp: {
        ...state.backUp,
        contactForm: undefined,
      },
    }),
  ),
  on(
    customAgentDetailsActions.RESET_GENERAL_DATA,
    (state: ICustomsAgentsDetails): ICustomsAgentsDetails => ({
      ...state,
      generalData: initialStateGeneralData(),
    }),
  ),
  on(
    customAgentDetailsActions.SAVE_CONTACTS_LOAD,
    (state: ICustomsAgentsDetails, {updateState, contact}): ICustomsAgentsDetails => {
      let found = false;
      return {
        ...state,
        generalData: {
          ...state.generalData,
          contacts: updateState
            ? map(
                state.generalData.contacts,
                (c: ICustomAgentContact): ICustomAgentContact => {
                  if (!found && c.haveChanges) {
                    found = true;
                    return {
                      ...contact,
                    };
                  }
                  return {...c};
                },
              )
            : state.generalData.contacts,
        },
      };
    },
  ),
  on(
    customAgentDetailsActions.GET_CAT_TIPO_TELEFONO_SUCCESS,
    (state: ICustomsAgentsDetails, {lisCatTIipoTelefono}) => ({
      ...state,
      generalData: {
        ...state.generalData,
        lisCatTIipoTelefono,
        needsToReloadCatTipoTelefono: false,
      },
    }),
  ),
  on(customAgentDetailsActions.VERIFY_EMAIL, (state, {value}) => ({
    ...state,
    generalData: {
      ...state.generalData,
      existingEmail: {
        ...state.generalData.existingEmail,
        exist:
          state.generalData.contactForm.CorreoElectronico[0].Correo ===
          state.generalData.existingEmail.email
            ? false
            : value,
      },
    },
  })),
  on(customAgentDetailsActions.CLEAN_BACKUP, (state) => ({
    ...state,
    backUp: {},
  })),
  // DOCS: ACCIONES EN DESADUANAJE
  on(customAgentDetailsActions.RESET_DISPATCH_POINT_STATE, (state: ICustomsAgentsDetails) => ({
    ...state,
    dispatchPoint: initialStateDispatchPoint(),
  })),
  on(customAgentDetailsActions.FETCH_DISPATCH_POINTS_LOAD, (state) => ({
    ...state,
    dispatchPoint: {
      ...state.dispatchPoint,
      apiStatus: state.dispatchPoint.needsToReload
        ? API_REQUEST_STATUS_LOADING
        : API_REQUEST_STATUS_SUCCEEDED,
    },
  })),
  on(
    customAgentDetailsActions.FETCH_DISPATCH_POINTS_SUCCESS,
    (state: ICustomsAgentsDetails, {dispatchPoints}): ICustomsAgentsDetails => ({
      ...state,
      dispatchPoint: {
        ...state.dispatchPoint,
        dispatchPointList: dispatchPoints,
      },
    }),
  ),
  on(
    customAgentDetailsActions.SET_DISPATCH_POINT_OPTIONS,
    (state: ICustomsAgentsDetails, {dispatchPoints}): ICustomsAgentsDetails => ({
      ...state,
      dispatchPoint: {
        ...state.dispatchPoint,
        dispatchPoints,
      },
    }),
  ),
  on(
    customAgentDetailsActions.FETCH_DISPATCH_POINT_DETAILS_SUCCESS,
    (state, {dispatchPointList}): ICustomsAgentsDetails => ({
      ...state,
      dispatchPoint: {
        ...state.dispatchPoint,
        dispatchPointList,
        selectedDispatchPoint: dispatchPointList.length > 0 ? dispatchPointList[0] : {},
        apiStatus: API_REQUEST_STATUS_SUCCEEDED,
        needsToReload: false,
        allowEditForm: dispatchPointList.length > 0,
      },
    }),
  ),
  on(customAgentDetailsActions.SET_RATE_INFO, (state, {input, value}) => {
    if (input === 'IgualarAPedimento') {
      return {
        ...state,
        dispatchPoint: {
          ...state.dispatchPoint,
          addRate: {
            ...state.dispatchPoint.addRate,
            IgualarAPedimento: value.value,
            PorcentajeAPedimento: !value.value,
            Porcentaje: 0,
          },
        },
      };
    } else if (input === 'PorcentajeAPedimento') {
      return {
        ...state,
        dispatchPoint: {
          ...state.dispatchPoint,
          addRate: {
            ...state.dispatchPoint.addRate,
            IgualarAPedimento: !value.value,
            PorcentajeAPedimento: value.value,
            MontoExportacion: 0,
            MontoImportacion: 0,
          },
        },
      };
    } else if (input === 'SinLimite' && value === true) {
      return {
        ...state,
        dispatchPoint: {
          ...state.dispatchPoint,
          addRate: {
            ...state.dispatchPoint.addRate,
            LimiteMaximo: null,
            SinLimite: value,
          },
        },
      };
    } else {
      return {
        ...state,
        dispatchPoint: {
          ...state.dispatchPoint,
          addRate: {
            ...state.dispatchPoint.addRate,
            [input]: value,
            IdAgenteAduanal: state.generalData.customAgentSelected.IdAgenteAduanal,
          },
        },
      };
    }
  }),
  on(customAgentDetailsActions.SET_DATA, (state, {value, input}) => ({
    ...state,
    dispatchPoint: {
      ...state.dispatchPoint,
      selectedDispatchPoint: {
        ...state.dispatchPoint.selectedDispatchPoint,
        [input]: value,
      },
    },
  })),
  on(customAgentDetailsActions.SET_RESET_FORM, (state) => ({
    ...state,
    dispatchPoint: {
      ...state.dispatchPoint,
      selectedDispatchPoint: {
        ...state.dispatchPoint.selectedDispatchPoint,
        Direccion: {
          ...state.dispatchPoint.selectedDispatchPoint.Direccion,
          Calle: null,
          Ciudad: null,
          CodigoPostal: null,
          Colonia: null,
          Estado: null,
          IdCatPais: null,
          Municipio: null,
          NumeroExterior: null,
          NumeroInterior: null,
        },
      },
      allowEditForm: false,
    },
  })),
  on(customAgentDetailsActions.SET_ALLOWED_EDIT_FORM, (state, {value}) => ({
    ...state,
    dispatchPoint: {
      ...state.dispatchPoint,
      allowEditForm: value,
    },
  })),
  on(
    customAgentDetailsActions.SET_ADDRESS_DATA,
    (state, {value, input}): ICustomsAgentsDetails => ({
      ...state,
      dispatchPoint: {
        ...state.dispatchPoint,
        selectedDispatchPoint: {
          ...state.dispatchPoint.selectedDispatchPoint,
          Direccion: {
            ...state.dispatchPoint.selectedDispatchPoint.Direccion,
            [input]: input === 'IdCatPais' ? value.value : value,
          },
        },
      },
    }),
  ),
  on(customAgentDetailsActions.DELETE_RATE, (state, {rate}) => ({
    ...state,
    dispatchPoint: {
      ...state.dispatchPoint,
      deleteRate:
        rate.IdConceptoAgenteAduanal !== DEFAULT_UUID
          ? [...state.dispatchPoint.deleteRate, rate]
          : state.dispatchPoint.deleteRate,
      selectedDispatchPoint: {
        ...state.dispatchPoint.selectedDispatchPoint,
        ConceptosAgenteAduanal: filter(
          state.dispatchPoint.selectedDispatchPoint.ConceptosAgenteAduanal,
          (o: ConceptoAgenteAduanal) => {
            return o.IdConceptoAgenteAduanal !== rate.IdConceptoAgenteAduanal;
          },
        ),
      },
    },
  })),
  on(customAgentDetailsActions.ADD_NEW_RATE, (state) => {
    return {
      ...state,
      dispatchPoint: {
        ...state.dispatchPoint,
        selectedDispatchPoint: {
          ...state.dispatchPoint.selectedDispatchPoint,
          ConceptosAgenteAduanal: [
            ...state.dispatchPoint.selectedDispatchPoint.ConceptosAgenteAduanal,
            state.dispatchPoint.addRate,
          ],
        },
        addRate: initialIRateState(),
      },
    };
  }),
  on(customAgentDetailsActions.SET_DISPATCH_POINT_TO_LIST, (state, {dispatchPoint}) => {
    const newPoint: OptionBar = {
      id: state.dispatchPoint.dispatchPointList.length,
      isSelected: true,
      isEnable: true,
      label: dispatchPoint.NombreLugar,
    };
    const newDispatchPoints: Array<OptionBar> = map(
      state.dispatchPoint.dispatchPoints,
      (o: OptionBar) => {
        return {
          ...o,
          isSelected: false,
        };
      },
    );

    return {
      ...state,
      dispatchPoint: {
        ...state.dispatchPoint,
        dispatchPoints: [...newDispatchPoints, newPoint],
        dispatchPointList: [...state.dispatchPoint.dispatchPointList, dispatchPoint],
        selectedDispatchPoint: dispatchPoint,
        allowEditForm: false,
      },
      initialDispatchPoint: initialAduanaDetalle(),
    };
  }),
  on(customAgentDetailsActions.SAVE_ADDRESS_DISPATCH_POINT_SUCCESS, (state, {IdDireccion}) => ({
    ...state,
    dispatchPoint: {
      ...state.dispatchPoint,
      selectedDispatchPoint: {
        ...state.dispatchPoint.selectedDispatchPoint,
        Direccion: {
          ...state.dispatchPoint.selectedDispatchPoint.Direccion,
          IdDireccion,
        },
        IdDireccion,
        IdAgenteAduanal: state.generalData.customAgentSelected.IdAgenteAduanal,
      },
      dispatchPointList: map(state.dispatchPoint.dispatchPointList, (o: AduanaDetalle) => {
        if (o.IdAduana === state.dispatchPoint.selectedDispatchPoint.IdAduana) {
          return state.dispatchPoint.selectedDispatchPoint;
        } else {
          return o;
        }
      }),
    },
  })),
  on(
    customAgentDetailsActions.SAVE_DISPATCH_POINT_SUCCESS,
    (state: ICustomsAgentsDetails, {IdAduana}) => ({
      ...state,
      dispatchPoint: {
        ...state.dispatchPoint,
        selectedDispatchPoint: {
          ...state.dispatchPoint.selectedDispatchPoint,
          IdAduana,
          ConceptosAgenteAduanal: map(
            state.dispatchPoint.selectedDispatchPoint.ConceptosAgenteAduanal,
            (o: ConceptoAgenteAduanal) => {
              return {
                ...o,
                IdAduana,
              };
            },
          ),
        },
        dispatchPoints: map(state.dispatchPoint.dispatchPoints, (o: OptionBar) => {
          if (o.isSelected) {
            return {
              ...o,
              id: IdAduana,
            };
          }
          return o;
        }),
        dispatchPointList: map(state.dispatchPoint.dispatchPointList, (o: AduanaDetalle) => {
          if (o.IdAduana === state.dispatchPoint.selectedDispatchPoint.IdAduana) {
            return {...state.dispatchPoint.selectedDispatchPoint, IdAduana: IdAduana};
          } else {
            return o;
          }
        }),
      },
    }),
  ),
  on(
    customAgentDetailsActions.DELETE_FEE_SUCCESS,
    (state: ICustomsAgentsDetails): ICustomsAgentsDetails => ({
      ...state,
      dispatchPoint: {
        ...state.dispatchPoint,
        deleteRate: [],
      },
    }),
  ),
  on(customAgentDetailsActions.SAVE_FEE_SUCCESS, (state: ICustomsAgentsDetails, {fees}) => ({
    ...state,
    dispatchPoint: {
      ...state.dispatchPoint,
      selectedDispatchPoint: {
        ...state.dispatchPoint.selectedDispatchPoint,
        ConceptosAgenteAduanal: fees,
      },
      dispatchPointList: map(state.dispatchPoint.dispatchPointList, (o: AduanaDetalle) => {
        if (o.IdAduana === state.dispatchPoint.selectedDispatchPoint.IdAduana) {
          return state.dispatchPoint.selectedDispatchPoint;
        } else {
          return o;
        }
      }),
    },
    backUp: {
      dispatchPointList: state.dispatchPoint.dispatchPointList,
      selectedDispatchPoint: state.dispatchPoint.selectedDispatchPoint,
    },
  })),
  on(customAgentDetailsActions.ZIP_CODE_VALIDATE_SUCCESS, (state, {value}) => ({
    ...state,
    dispatchPoint: {
      ...state.dispatchPoint,
      zipCodeValidate: value,
    },
  })),
);
