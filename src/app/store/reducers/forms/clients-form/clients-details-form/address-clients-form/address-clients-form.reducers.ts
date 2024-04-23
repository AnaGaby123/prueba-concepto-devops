import {createReducer, on} from '@ngrx/store';
import {filter, map} from 'lodash-es';
import {DEFAULT_UUID} from '@appUtil/common.protocols';
// ACTIONS
import * as clientsActions from '@appActions/forms/client-form/clients-form.actions';
import * as clientsAddresActions from '@appActions/forms/client-form/clients-details-form/address-clients-form/address-clients-form.actions';
// MODELS
import {
  IClientAddress,
  IDireccion,
  initialDatosDireccionclienteComentario,
  initialIClientAddress,
  initialIDatosDireccioncliente,
  initialIDireccion,
} from '@appModels/store/forms/clients-form/clients-details-form/address/address-clients-forms.models';
import {addressesActions} from '@appActions/forms/client-form';

const initialAddressClientsFormState: IClientAddress = {
  ...initialIClientAddress(),
};
export const addressClientsFormReducers = createReducer(
  initialAddressClientsFormState,
  on(clientsAddresActions.CLEAN_ADDRESS_CLIENT_STATE, (state) => ({
    ...initialAddressClientsFormState,
  })),
  on(clientsAddresActions.SET_ID_CLIENT, (state, {IdCliente}) => ({
    ...state,
    IdClient: IdCliente,
  })),
  on(clientsAddresActions.GET_DATA_ADDRESS_SUCCESS, (state, {payload}) => ({
    ...state,
    address: payload,
  })),
  on(clientsAddresActions.SELECT_ADDRESS, (state, {address}) => ({
    ...state,
    address: map(state.address, (o: IDireccion) => {
      if (o === address) {
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
  })),
  on(clientsAddresActions.EDIT_ADDRESS_SELECTED, (state, {address, index, isEdit}) => ({
    ...state,
    addressForm: address
      ? {
          ...address,
          allowEditForm: isEdit,
          index,
        }
      : {...state.addressForm, allowEditForm: isEdit, index},
    addressFormBackUp: address
      ? {
          ...address,
          allowEditForm: isEdit,
          index,
        }
      : {...state.addressForm, allowEditForm: isEdit, index},
  })),
  on(clientsAddresActions.SET_ALLOWED_EDIT_FORM, (state, {value}) => ({
    ...state,
    addressForm: {
      ...state.addressForm,
      allowEditForm: value,
    },
  })),
  on(clientsAddresActions.SET_COMMENT_SCHEDULE_TYPE, (state, {value, node}) => ({
    ...state,
    [node]: {
      ...state[node],
      Comentario: value,
    },
  })),
  on(clientsAddresActions.SET_INITIAL_COMMENT_SCHEDULE_TYPE, (state, {node}) => ({
    ...state,
    [node]: initialDatosDireccionclienteComentario(),
  })),

  on(clientsAddresActions.SET_BACKUP_EDIT_ADDRESS, (state) => ({
    ...state,
    backUp: {
      address: state.address,
    },
  })),
  on(clientsActions.SET_ENABLE_EDIT, (state, {value}) => ({
    ...state,
    backUp: value ? state.backUp : initialAddressClientsFormState.backUp,
  })),
  on(clientsAddresActions.SET_COMMENT, (state, {comment}) => ({
    ...state,
    address: map(state.address, (o: IDireccion) => {
      if (o.isSelected) {
        return {
          ...o,
          DeliveryDataComments: [...o.DeliveryDataComments, comment],
        };
      }
      return o;
    }),
  })),
  on(
    clientsAddresActions.SET_DELIVERY_DATA,
    (state: IClientAddress, {value, input}): IClientAddress => ({
      ...state,
      address: map(state.address, (o: IDireccion) => {
        if (o.isSelected) {
          return {
            ...o,
            DeliveryData: {
              ...o.DeliveryData,
              NumCopiasFacturas:
                input === 'CopiasPorFactura' && !value ? 0 : o.DeliveryData.NumCopiasFacturas,
              NumCopiasPedido:
                input === 'CopiaPedido' && !value ? 0 : o.DeliveryData.NumCopiasPedido,
              [input]: value,
            },
          };
        }
        return o;
      }),
    }),
  ),
  on(clientsAddresActions.DELETE_ADDRESS, (state, {address}) => ({
    ...state,
    deleteAddress:
      address.IdDireccion !== DEFAULT_UUID
        ? [...state.deleteAddress, address]
        : state.deleteAddress,
    address: filter(state.address, (o: IDireccion) => o !== address),
  })),
  on(clientsAddresActions.DELETE_COMMENT, (state, {comment}) => ({
    ...state,
    address: map(state.address, (o: IDireccion) => {
      if (o.isSelected) {
        return {
          ...o,
          DeliveryDataComments: filter(o.DeliveryDataComments, (c) => c !== comment),
        };
      }
      return o;
    }),
    deleteComments:
      comment.IdDatosDireccionClienteComentario !== DEFAULT_UUID
        ? [...state.deleteComments, comment]
        : [...state.deleteComments],
  })),
  on(clientsAddresActions.VALIDATE_ZIP_CODE_SUCCESS, (state, {value}) => ({
    ...state,
    zipCodeIsValid: value,
  })),
  on(clientsAddresActions.SAVE_ADDRESS_CLIENT_SUCCESS, (state, {address}) => ({
    ...state,
    address,
  })),
  // DOCS: ACCIONES PARA POP AGREGAR O EDITAR DIRECCION
  on(clientsAddresActions.ADDRESS_POP_OPEN, (state, {value}) => ({
    ...state,
    openAddressModal: value,
    showMapCount: 0,
  })),
  on(clientsAddresActions.ADDRESS_MODAL_TITLE, (state, {value}) => ({
    ...state,
    addressModalTitle: value,
  })),
  on(clientsAddresActions.SCHEDULE_MODAL_TITLE, (state, {value}) => ({
    ...state,
    scheduleModalTitle: value,
  })),
  on(clientsAddresActions.SET_DROP_FORM_DATA, (state, {value, input}) => {
    if (input === 'IdCatTipoDireccion') {
      return {
        ...state,
        addressForm: {
          ...state.addressForm,
          IdCatTipoDireccion: value.value.toString(),
          AddressTypeName: value.label,
        },
      };
    }
    if (input === 'IdCatRutaEntrega') {
      return {
        ...state,
        addressForm: {
          ...state.addressForm,
          IdCatRutaEntrega: value.value.toString(),
          IdCatZona: null,
          TipoRegion: value.label,
        },
      };
    } else {
      return {
        ...state,
        addressForm: {
          ...state.addressForm,
          [input]: value.value.toString(),
        },
      };
    }
  }),
  on(
    clientsAddresActions.SET_RESET_FORM,
    (state: IClientAddress): IClientAddress => ({
      ...state,
      addressForm: {
        ...state.addressForm,
        IdCatPais: null,
        Calle: null,
        NumeroExterior: null,
        NumeroInterior: null,
        CodigoPostal: null,
        Estado: null,
        Ciudad: null,
        Municipio: null,
        Colonia: null,
        clienteDireccion: {
          ...state.addressForm.clienteDireccion,
          DistanciaCartaPorte: null,
        },
        allowEditForm: false,
      },
    }),
  ),
  on(
    clientsAddresActions.RESET_CP_FORM,
    (state: IClientAddress, {value}): IClientAddress => ({
      ...state,
      addressForm: {
        ...state.addressForm,
        CodigoPostal: state.addressForm.IdCatPais !== value ? null : state.addressForm.IdCatPais,
      },
    }),
  ),
  on(
    clientsAddresActions.CLEAN_DISTANCE_MAPS,
    (state: IClientAddress): IClientAddress => ({
      ...state,
      addressForm: {
        ...state.addressForm,
        Longitud: null,
        Latitud: null,
        clienteDireccion: {
          ...state.addressForm.clienteDireccion,
          DistanciaCartaPorte: null,
        },
      },
    }),
  ),
  on(
    clientsAddresActions.FETCH_MAP_LOCATION_SUCCESS_NEW_CLIENT,
    (state: IClientAddress, {lat, lng}): IClientAddress => ({
      ...state,
      addressForm: {
        ...state?.addressForm,
        Longitud: lng,
        Latitud: lat,
      },
    }),
  ),
  on(clientsAddresActions.SET_INPUT_FORM_DATA, (state, {input, value}) => ({
    ...state,
    addressForm: {
      ...state.addressForm,
      [input]: value,
    },
    showMapCount: input !== 'NumeroInterior' ? 0 : state.showMapCount,
  })),
  on(clientsAddresActions.RESET_ADDRESS_FORM, (state) => ({
    ...state,
    addressForm: initialIDireccion(),
    addressFormBackUp: {} as IDireccion,
    zipCodeResult: {
      Estado: true,
      Municipio: true,
      Colonia: true,
      Valido: false,
    },
    addressValidation: {
      Valido: false,
      Mensaje: '',
    },
  })),
  on(clientsAddresActions.SAVE_OR_UPDATE_FORM, (state) => {
    if (state.addressForm.IdDireccion === DEFAULT_UUID && state.addressForm.index === null) {
      const newAddress: IDireccion = {
        ...state.addressForm,
        clienteDireccion: {
          ...state.addressForm.clienteDireccion,
          IdCliente: state.IdClient,
        },
        isSelected: true,
        index: state.addressForm.index ? state.addressForm.index : state.address.length + 1,
      };
      const oldArray = map(state.address, (o: IDireccion) => {
        return {
          ...o,
          isSelected: false,
        };
      });
      return {
        ...state,
        address: [...oldArray, newAddress],
      };
    } else {
      return {
        ...state,
        address: map(state.address, (o: IDireccion) => {
          if (o.isSelected) {
            return {
              ...state.addressForm,
            };
          }
          return o;
        }),
      };
    }
  }),
  on(clientsAddresActions.DELETE_ADDRESS_SUCCESS, (state) => ({
    ...state,
    deleteAddress: [],
  })),
  // DOCS: ACCIONES PARA POP DE HORARIOS
  on(clientsAddresActions.SCHEDULE_POP_OPEN, (state, {value}) => ({
    ...state,
    schedulePopOpen: value,
  })),
  on(clientsAddresActions.SAVE_SCHEDULE, (state, {schedule, scheduleType}) => ({
    ...state,
    address: map(state.address, (o: IDireccion) => {
      if (o.isSelected) {
        return {
          ...o,
          [`horarios${scheduleType}`]: schedule,
          DeliveryData: o.DeliveryData === null ? initialIDatosDireccioncliente() : o.DeliveryData,
          clienteDireccion: {
            ...o.clienteDireccion,
            IdCliente: state.IdClient,
          },
        };
      }
      return o;
    }),
  })),
  on(clientsAddresActions.SET_ADDRESS_ID, (state, {IdDireccion, index}) => ({
    ...state,
    address: map(state.address, (o: IDireccion, i) => {
      if (index === i) {
        return {
          ...o,
          IdDireccion,
          clienteDireccion: {
            ...o.clienteDireccion,
            IdDireccion,
          },
        };
      }
      return o;
    }),
  })),
  on(
    clientsAddresActions.SET_SCHEDULE_ID,
    (state, {scheduleType, value, index, indexSchedule}) => ({
      ...state,
      address: state.address.map((item, i) => {
        if (i === index) {
          item = {
            ...item,
            [scheduleType]: state.address[index][scheduleType].map((it, iSchedule) => {
              if (indexSchedule === iSchedule) {
                it = {...it, IdHorarioAtencion: value};
              }
              return it;
            }),
          };
        }
        return item;
      }),
    }),
  ),
  on(clientsAddresActions.SET_COMMENTS_ID, (state, {comments, index}) => ({
    ...state,
    address: map(state.address, (o: IDireccion, i) => {
      if (i === index) {
        return {
          ...o,
          DeliveryDataComments: comments,
        };
      }
      return o;
    }),
  })),
  on(clientsAddresActions.SET_DELIVERY_DATA_ID, (state, {IdDatosDireccionCliente, index}) => ({
    ...state,
    address: map(state.address, (o: IDireccion, i) => {
      if (index === i) {
        return {
          ...o,
          DeliveryData: {
            ...o.DeliveryData,
            IdDatosDireccionCliente,
          },
          clienteDireccion: {
            ...o.clienteDireccion,
            IdDatosDireccionCliente,
          },
        };
      }
      return o;
    }),
  })),
  on(clientsAddresActions.SET_CLIENTE_DIRECCION_ID, (state, {IdClienteDireccion, index}) => ({
    ...state,
    address: map(state.address, (o: IDireccion, i) => {
      if (index === i) {
        return {
          ...o,
          clienteDireccion: {
            ...o.clienteDireccion,
            IdDireccionCliente: IdClienteDireccion,
          },
        };
      }
      return o;
    }),
  })),
  on(clientsAddresActions.CLEAN_ADDRESS_FORM, (state) => ({
    ...state,
    address: state.backUp.address,
    backUp: {
      address: [],
    },
  })),
  on(clientsAddresActions.DELETED_COMMENT_SUCCESS, (state) => ({
    ...state,
    deleteComments: [],
  })),
  on(clientsAddresActions.SHOW_MAP, (state, {value}) => ({
    ...state,
    showMap: value,
    addressFormBackUp:
      !value && state.addressForm.IdDireccion === DEFAULT_UUID
        ? state.addressForm
        : state.addressFormBackUp,
    showMapCount: value ? state.showMapCount + 1 : state.showMapCount,
  })),
  on(clientsAddresActions.CHECK_ZIP_CODE_INFO_SUCCESS, (state, {zipCodeInfo}) => ({
    ...state,
    zipCodeResult: zipCodeInfo,
  })),
  on(clientsAddresActions.FETCH_MAP_LOCATION_SUCCESS, (state, {lat, lng}) => ({
    ...state,
    addressForm: {
      ...state.addressForm,
      Longitud: lng,
      Latitud: lat,
    },
  })),
  on(clientsAddresActions.UPDATE_LAT_LNG, (state, {lat, lng}) => ({
    ...state,
    addressForm: {
      ...state.addressForm,
      Latitud: lat,
      Longitud: lng,
    },
  })),
  on(
    clientsAddresActions.FETCH_DISTANCE_SUCCESS,
    (state: IClientAddress, {DistanciaCartaPorte}): IClientAddress => ({
      ...state,
      addressForm: {
        ...state.addressForm,
        clienteDireccion: {
          ...state.addressForm.clienteDireccion,
          DistanciaCartaPorte,
        },
      },
      addressFormBackUp:
        state.addressForm.IdDireccion === DEFAULT_UUID
          ? {
              ...state.addressFormBackUp,
              clienteDireccion: {
                ...state.addressFormBackUp.clienteDireccion,
                DistanciaCartaPorte,
              },
            }
          : {...state.addressFormBackUp},
    }),
  ),
  on(addressesActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    searchTermByAddress: searchTerm,
  })),
  on(clientsAddresActions.FETCH_ADDRESS_CONFIG_VALIDATION_SUCCESS, (state, {validation}) => ({
    ...state,
    addressValidation: validation,
  })),
);
