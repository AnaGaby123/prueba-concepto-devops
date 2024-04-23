// Core imports
import {createReducer, on} from '@ngrx/store';
// Models
import {
  IBilling,
  IDeliveryBilling,
  IDireccionClienteDetalle,
  initialClienteTCDOFVigencia,
  initialComment,
  initialDeliveryBillingClientsForm,
  initialEmail,
  initialTemporalRestriction,
} from '@appModels/store/forms/clients-form/clients-details-form/delivery-billing/delivery-billing-client-form.models';
import {Cliente} from 'api-finanzas';
import {CorreoValidacionFacturacionCliente} from 'api-catalogos';
import * as actionsUtils from '@appActions/utils/utils.action';
// Actions
import {deliveryBillingActions} from '@appActions/forms/client-form';
// Utils
import {filter} from 'lodash-es';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';

const initialDeliverybillingClientsFormState: IDeliveryBilling = {
  ...initialDeliveryBillingClientsForm(),
};
export const deliveryBillingClientsFormReducers = createReducer(
  initialDeliverybillingClientsFormState,

  on(
    deliveryBillingActions.SET_SUCCESS_DELIVERY_BILLING_CLIENT,
    (state, {payload, typeAddress}) => ({
      ...state,
      clientSelected: payload.DatosFacturacionCliente?.Cliente as Cliente,
      billing: {
        ...(payload.DatosFacturacionCliente as IBilling),
        TypesChanges: state.billing?.TypesChanges,
        TypeChangeSelected: payload.DatosFacturacionCliente.TipoDeCambioBanamex
          ? state.billing?.TypesChanges[0]
          : payload.DatosFacturacionCliente.TipoDeCambioDiarioOficial
          ? state.billing?.TypesChanges[1]
          : null,
        ClienteTCDOFVigencia: payload.DatosFacturacionCliente.ClienteTCDOFVigencia,
      },
      clientAddress: payload.DireccionClienteDetalleFacturacion.Direccion
        ? payload.DireccionClienteDetalleFacturacion
        : {
            ...state.clientAddress,
            Direccion: {
              ...state.clientAddress.Direccion,
              IdCatTipoDireccion: typeAddress.value,
            },
            catTipoDireccionSelected: typeAddress,
          },
    }),
  ),
  on(deliveryBillingActions.SET_DATA_BILLING, (state, {payload, node}) => ({
    ...state,
    billing: {
      ...state.billing,
      [node]: payload,
    },
  })),
  on(deliveryBillingActions.SET_TYPE_CHANGE, (state, {payload}) => {
    let tcdof;
    if (payload.value === '2') {
      tcdof =
        state.billing.ClienteTCDOFVigencia === null
          ? {
              ...initialClienteTCDOFVigencia(),
              IdCliente: state.clientSelected.IdCliente,
            }
          : {
              ...state.billing.ClienteTCDOFVigencia,
              Activo: true,
            };
    } else {
      if (state.billing.ClienteTCDOFVigencia !== null) {
        tcdof =
          state.billing.ClienteTCDOFVigencia.IdClienteTCDOFVigencia === DEFAULT_UUID
            ? null
            : {
                ...state.billing.ClienteTCDOFVigencia,
                Activo: false,
              };
      } else {
        tcdof = null;
      }
    }
    return {
      ...state,
      billing: {
        ...state.billing,
        TipoDeCambioBanamex: payload.value === '1',
        TipoDeCambioDiarioOficial: payload.value === '2',
        TypeChangeSelected: payload,
        ClienteTCDOFVigencia: tcdof,
      },
    };
  }),
  on(deliveryBillingActions.SET_DATA_BILLING_DROPLIST, (state, {payload, node, selectedNode}) => {
    return {
      ...state,
      billing: {
        ...state.billing,
        [node]: payload.value,
        [selectedNode]: payload,
        TipoDeCambioBanamex:
          (node === 'IdCatMonedaTramitacion' && payload.value === state.billing.IdCatMoneda) ||
          (node === 'IdCatMoneda' && payload.value === state.billing?.IdCatMonedaTramitacion)
            ? null
            : state.billing?.TipoDeCambioBanamex,
        TipoDeCambioDiarioOficial:
          (node === 'IdCatMonedaTramitacion' && payload.value === state.billing.IdCatMoneda) ||
          (node === 'IdCatMoneda' && payload.value === state.billing?.IdCatMonedaTramitacion)
            ? null
            : state.billing?.TipoDeCambioDiarioOficial,
        TypeChangeSelected:
          (node === 'IdCatMonedaTramitacion' && payload.value === state.billing.IdCatMoneda) ||
          (node === 'IdCatMoneda' && payload.value === state.billing?.IdCatMonedaTramitacion)
            ? null
            : state.billing?.TypeChangeSelected,
      },
    };
  }),
  on(deliveryBillingActions.UPDATE_CHANGE_TYPE_VALIDATION, (state) => ({
    ...state,
    billing: {
      ...state.billing,
      ClienteTCDOFVigencia:
        state.billing.TypeChangeSelected === null
          ? state.billing.ClienteTCDOFVigencia !== null
            ? state.billing.ClienteTCDOFVigencia.IdClienteTCDOFVigencia !== DEFAULT_UUID
              ? {
                  ...state.billing.ClienteTCDOFVigencia,
                  Activo: false,
                }
              : state.billing.ClienteTCDOFVigencia
            : state.billing.ClienteTCDOFVigencia
          : state.billing.ClienteTCDOFVigencia,
    },
  })),
  on(deliveryBillingActions.SET_DIRECTION_DATA_DROP, (state, {payload, node, nodeSelected}) => {
    if (node === 'IdCatRutaEntrega') {
      return {
        ...state,

        clientAddressCopy: {
          ...state.clientAddressCopy,
          Direccion: {
            ...state.clientAddressCopy.Direccion,
            [node]: payload.value,
            TipoRegion: payload.label,
          },
          catRegionSelected: initialDeliveryBillingClientsForm().clientAddress.catRegionSelected,
          [nodeSelected]: payload,
        },
      };
    } else {
      return {
        ...state,
        clientAddressCopy: {
          ...state.clientAddressCopy,
          Direccion: {
            ...state.clientAddressCopy.Direccion,
            [node]: payload.value,
          },
          [nodeSelected]: payload,
        },
      };
    }
  }),
  on(deliveryBillingActions.SET_DIRECTION_DATA, (state, {payload, node}) => ({
    ...state,
    clientAddressCopy: {
      ...state.clientAddressCopy,
      Direccion: {
        ...state.clientAddressCopy.Direccion,
        [node]: payload,
      },
    },
  })),
  on(
    deliveryBillingActions.SET_RESET_FORM,
    (state: IDeliveryBilling): IDeliveryBilling => ({
      ...state,
      clientAddressCopy: {
        ...state.clientAddressCopy,
        Direccion: {
          ...state.clientAddressCopy.Direccion,
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
        catCountrySelected: null,
      },
      allowedForm: false,
    }),
  ),
  on(deliveryBillingActions.SET_CFDI_VALIDATION, (state, {value, node}) => {
    return {
      ...state,
      billing: {
        ...state.billing,
        TipoValidacionSAT: node === 'TipoValidacionSAT',
        TipoValidacionPortal: node === 'TipoValidacionPortal' ? value.value : false,
        TipoValidacionCorreo: node === 'TipoValidacionCorreo' ? value.value : false,
        URL: node !== 'TipoValidacionPortal' ? null : state.billing?.URL,
        Usuario: node !== 'TipoValidacionPortal' ? null : state.billing?.Usuario,
        Contrasena: node !== 'TipoValidacionPortal' ? null : state.billing?.Contrasena,
        CorreosCFDI: node !== 'TipoValidacionCorreo' ? [] : state.billing?.CorreosCFDI,
        DisableEmails: [
          ...state.billing.DisableEmails,
          ...filter(
            state.billing.CorreosCFDI,
            (o: CorreoValidacionFacturacionCliente) =>
              o.IdCorreoValidacionFacturacionCliente !== DEFAULT_UUID,
          ),
        ],
      },
      email: {
        ...state.email,
        Correo: node !== 'TipoValidacionCorreo' ? null : state.email.Correo,
      },
    };
  }),
  on(deliveryBillingActions.SET_DATA_RESTRICTION, (state, {payload, node}) => ({
    ...state,
    billing: {
      ...state.billing,
      Restriccion: {
        ...state.billing.Restriccion,
        [node]: payload,
      },
    },
  })),
  on(deliveryBillingActions.SET_RESTRICTION_TYPE, (state, {value, node}) => ({
    ...state,
    billing: {
      ...state.billing,
      Restriccion: {
        ...state.billing?.Restriccion,
        RestriccionFinDeMes: node === 'RestriccionFinDeMes' ? value : false,
        RestriccionMensual: node === 'RestriccionMensual' ? value : false,
        DiasAntesFinDeMes:
          node === 'RestriccionFinDeMes' && value !== false
            ? state.billing?.Restriccion.DiasAntesFinDeMes
            : 0,
        APartirDelDia:
          node === 'RestriccionMensual' && value !== false
            ? state.billing?.Restriccion.APartirDelDia
            : 0,
      },
    },
  })),
  on(deliveryBillingActions.SET_THEME_COMMENT, (state, {value}) => ({
    ...state,

    comment: {
      ...state.comment,
      IdCatTemaComentario: value.value,
      TemaComentario: value.label,
      IdCliente: state.clientSelected.IdCliente,
      ThemeSelected: value,
    },
  })),
  on(deliveryBillingActions.SET_TEXT_COMMENT, (state, {value}) => ({
    ...state,
    comment: {
      ...state.comment,
      Comentario: value,
    },
  })),
  on(deliveryBillingActions.SET_EMAIL_ADDRESS, (state, {value}) => ({
    ...state,
    email: {
      ...state.email,
      Correo: value,
      IdDatosFacturacionCliente: state.billing?.IdDatosFacturacionCliente,
    },
  })),

  on(deliveryBillingActions.SET_ADD_EMAIL, (state) => ({
    ...state,
    billing: {
      ...state.billing,
      CorreosCFDI: [...state.billing?.CorreosCFDI, state.email],
    },
    email: initialEmail(),
  })),
  on(deliveryBillingActions.SET_ADD_COMMENT, (state) => ({
    ...state,
    billing: {
      ...state.billing,
      Comentarios: [...state.billing?.Comentarios, state.comment],
    },
    comment: initialComment(),
  })),
  on(deliveryBillingActions.SET_ADD_EVENT, (state) => ({
    ...state,
    billing: {
      ...state.billing,
      RestriccionesT: [...state.billing?.RestriccionesT, state.temporalRestriction],
    },
    temporalRestriction: initialTemporalRestriction(),
  })),
  on(deliveryBillingActions.SET_DISABLE_EMAIL, (state, {payload}) => ({
    ...state,
    billing: {
      ...state.billing,
      CorreosCFDI: filter(state.billing?.CorreosCFDI, (o) => o !== payload),
      DisableEmails: [
        ...state.billing.DisableEmails,
        ...filter(state.billing?.CorreosCFDI, (o) => {
          return o === payload && o.IdCorreoValidacionFacturacionCliente !== DEFAULT_UUID;
        }),
      ],
    },
  })),
  on(deliveryBillingActions.SET_DISABLE_EVENT, (state, {payload}) => ({
    ...state,
    billing: {
      ...state.billing,
      RestriccionesT: filter(state.billing.RestriccionesT, (o) => o !== payload),
      RestriccionesDelete: [
        ...state.billing.RestriccionesDelete,
        ...filter(state.billing?.RestriccionesT, (o) => {
          return o === payload && o.IdRestriccionTemporalDatosFacturacion !== DEFAULT_UUID;
        }),
      ],
    },
  })),
  on(deliveryBillingActions.GET_EMAIL_FACTURATION_SUCCESS, (state, {payload}) => ({
    ...state,
    billing: {
      ...state.billing,
      CorreosCFDI: payload,
    },
  })),
  on(deliveryBillingActions.SET_DISABLE_COMMENT, (state, {payload}) => ({
    ...state,
    billing: {
      ...state.billing,
      Comentarios: filter(state.billing.Comentarios, (o) => o !== payload),
      ComentariosDeshabilitados: [
        ...state.billing.ComentariosDeshabilitados,
        ...filter(state.billing?.Comentarios, (o) => {
          return o === payload && o.IdClienteComentario !== DEFAULT_UUID;
        }),
      ],
    },
  })),
  on(deliveryBillingActions.SET_RESTRICTION_DATE_START, (state, {value}) => ({
    ...state,
    temporalRestriction: {
      ...state.temporalRestriction,
      FechaInicioDate: value.date,
      FechaInicio: value.stringDate,
      IdCliente: state.clientSelected.IdCliente,
    },
  })),
  on(deliveryBillingActions.SET_RESTRICTION_DATE_END, (state, {value}) => ({
    ...state,
    temporalRestriction: {
      ...state.temporalRestriction,
      FechaFinDate: value.date,
      FechaFin: value.stringDate,
    },
  })),
  on(deliveryBillingActions.SET_TITLE_RESTRICTION, (state, {value}) => ({
    ...state,
    temporalRestriction: {
      ...state.temporalRestriction,
      Titulo: value,
    },
  })),
  on(deliveryBillingActions.VALIDATE_ZIP_CODE_SUCCESS, (state, {value}) => ({
    ...state,
    zipCodeIsValid: value,
  })),
  on(deliveryBillingActions.CHECK_ZIP_CODE_INFO_SUCCESS, (state, {zipCodeInfo}) => ({
    ...state,
    validZipCodeInfo: zipCodeInfo.Valido,
  })),
  on(deliveryBillingActions.SET_OPEN_ADDRESS_MODAL, (state, {value}) => ({
    ...state,
    openAddressModal: value,
  })),
  on(deliveryBillingActions.SET_ADDRESS_MODAL_TITLE, (state, {value}) => ({
    ...state,
    addressModalTitle: value,
  })),
  on(deliveryBillingActions.SET_RFC_VALIDATION, (state, {value}) => ({
    ...state,
    rfcIsValid: value,
  })),
  on(deliveryBillingActions.SET_BACKUP_DELIVERY_BILLING, (state) => ({
    ...state,
    dataBackup: {
      billing: state.billing,
      clientSelected: state.clientSelected,
      rfcIsValid: state.rfcIsValid,
      clientAddress: state.clientAddress,
    } as IDeliveryBilling,
  })),
  on(deliveryBillingActions.SET_BACKUP_ADDRESS, (state) => ({
    ...state,
    addressBackUp: state.clientAddress,
    clientAddressCopy: state.clientAddress,
    allowedForm: state.clientAddress.Direccion.IdDireccion !== DEFAULT_UUID,
  })),
  on(deliveryBillingActions.SET_RESTORE_BACKUP_ADDRESS, (state) => ({
    ...state,
    clientAddress: state.addressBackUp,
    addressBackUp: {} as IDireccionClienteDetalle,
    clientAddressCopy: {} as IDireccionClienteDetalle,
    allowedForm: false,
  })),
  on(deliveryBillingActions.SET_ALLOWED_EDIT_FORM, (state, {value}) => ({
    ...state,
    allowedForm: value,
  })),
  on(deliveryBillingActions.SET_ADDRESS_DATA_POP, (state) => ({
    ...state,
    clientAddress: state.clientAddressCopy,
    clientAddressCopy: {} as IDireccionClienteDetalle,
    addressBackUp: {} as IDireccionClienteDetalle,
  })),
  on(deliveryBillingActions.CLEAN_DELIVERY_BILLING_CLIENT_STATE, (state) => ({
    ...initialDeliveryBillingClientsForm(),
  })),

  on(deliveryBillingActions.SET_CLEAN_BACKUP_ADDRESS, (state) => ({
    ...state,
    clientAddress: state.addressBackUp,
    addressBackUp: {} as IDireccionClienteDetalle,
  })),
  on(deliveryBillingActions.SET_CLEAN_BACKUP, (state) => ({
    ...state,
    billing: state.dataBackup.billing,
    clientSelected: state.dataBackup.clientSelected,
    dataBackup: {} as IDeliveryBilling,
    comment: initialComment(),
    email: initialEmail(),
    temporalRestriction: initialTemporalRestriction(),
  })),
  on(deliveryBillingActions.SET_INITIAL_DATA, (state) => ({
    ...state,
    comment: initialComment(),
    email: initialEmail(),
    temporalRestriction: initialTemporalRestriction(),
  })),
  on(deliveryBillingActions.SAVE_OR_UPDATE_DIRECTION_SUCCESS, (state, {payload}) => ({
    ...state,
    clientAddress: {
      ...state.clientAddress,
      Direccion: {
        ...state.clientAddress.Direccion,
        IdDireccion:
          state.clientAddress.Direccion.IdDireccion !== DEFAULT_UUID
            ? state.clientAddress.Direccion.IdDireccion
            : payload,
      },
    },
  })),
  on(deliveryBillingActions.HANDLE_VALIDATION_DATE, (state, {date}) => ({
    ...state,
    billing: {
      ...state.billing,
      ClienteTCDOFVigencia: {
        ...state.billing.ClienteTCDOFVigencia,
        FinVigencia: date,
        FechaUltimaActualizacion: DEFAULT_DATE,
      },
    },
  })),
  on(
    deliveryBillingActions.SAVE_EXCHANGE_RATE_EXPIRATION_SUCCESS,
    (state, {IdClienteTCDOFVigencia}) => ({
      ...state,
      billing: {
        ...state.billing,
        ClienteTCDOFVigencia: state.billing.ClienteTCDOFVigencia.Activo
          ? {
              ...state.billing.ClienteTCDOFVigencia,
              IdClienteTCDOFVigencia,
            }
          : null,
      },
    }),
  ),
  on(actionsUtils.RESET_CODE_POP_INPUTS, (state) => ({
    ...state,
    code: [null, null, null, null],
  })),
  on(deliveryBillingActions.SET_AUTHORIZATION_DATA, (state) => ({
    ...state,
    code: [null, null, null, null],
  })),
);
