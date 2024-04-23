import {ActionReducer, createReducer, on} from '@ngrx/store';

// Models
import {
  CheckoutDetailsState,
  initialCheckoutDetailsState,
  IOrdersC,
  IPurchaseOrderItem,
} from '@appModels/store/pendings/checkout/checkout-details/checkout-details.model';
import {
  CatMetodoDePagoCFDI,
  CatUsoCFDI,
  ContactoDetalleObj,
  DireccionClienteDetalle,
} from 'api-catalogos';
import {TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

// Actions
import {checkoutActions, checkoutDetailsActions} from '@appActions/pendings/checkout';

// Utils
import {
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  CLIENT_SANOFI,
  DEFAULT_DATE,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';
import {filter, findIndex, flow, isEmpty, map as _map} from 'lodash-es';

import * as actionsUtils from '@appActions/utils/utils.action';
import {buildPpPartidaPedidoAddendaSanofi} from '@appHelpers/pendings/purchase-proomise/purchase-promise-detail/purchase-promise-detail.helper';
import {calculateEstimatedDeliveryDate, dateWithoutHoursUTCDate} from '@appUtil/dates';

export const checkoutDetailsReducer: ActionReducer<CheckoutDetailsState> = createReducer(
  initialCheckoutDetailsState(),
  on(checkoutDetailsActions.SET_RESUME_MODE, (state: CheckoutDetailsState, {resumeMode}) => ({
    ...state,
    resumeMode,
  })),
  on(
    checkoutDetailsActions.SET_RESUME_COMPONENT,
    (state: CheckoutDetailsState, {resumeComponent}) => ({
      ...state,
      resumeComponent,
    }),
  ),
  on(
    checkoutDetailsActions.SET_SEND_EMAIL_POP_IS_OPEN,
    (state: CheckoutDetailsState, {sendEmailPopUpIsOpen}) => ({
      ...state,
      sendEmailPopUpIsOpen,
    }),
  ),
  on(checkoutActions.SET_CLIENT_CHECKOUT_SELECTED, (state, {customer}) => {
    return {
      ...state,
      clientSelected: customer,
    };
  }),
  on(
    checkoutDetailsActions.FETCH_CLIENT_ADDRESSES_SUCCESS,
    (state: CheckoutDetailsState, {addresses}) => ({
      ...state,
      clientAddresses: addresses,
    }),
  ),
  on(
    checkoutDetailsActions.FETCH_CLIENT_CONTACTS_SUCCESS,
    (state: CheckoutDetailsState, {contacts}) => ({
      ...state,
      clientContacts: contacts,
    }),
  ),
  on(checkoutDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS, (state, {orders}) => ({
    ...state,
    purchaseOrders: {
      ...state.purchaseOrders,
      list: orders,
      listStatus: API_REQUEST_STATUS_SUCCEEDED,
    },
  })),
  on(checkoutDetailsActions.REFRESH_ENTRIES_LOAD, (state) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      needsToReload: true,
    },
  })),
  on(checkoutDetailsActions.FETCH_PURCHASE_ORDERS_LOAD, (state) => ({
    ...state,
    purchaseOrders: {
      ...state.purchaseOrders,
      listStatus: API_REQUEST_STATUS_LOADING,
    },
  })),
  on(
    checkoutDetailsActions.SET_SELECTED_PURCHASE_ORDER,
    (state: CheckoutDetailsState, {IdTPPedido}): CheckoutDetailsState => ({
      ...state,
      purchaseOrders: {
        ...state.purchaseOrders,
        list: _map(state.purchaseOrders.list, (o: IOrdersC) => {
          if (o.IdTPPedido === state.selectedPurchaseOrder.IdTPPedido) {
            return {
              ...state.selectedPurchaseOrder,
              isSelected: false,
            };
          }
          if (o.IdTPPedido === IdTPPedido) {
            return {
              ...o,
              purchaseOrderDetails: {
                ...o.purchaseOrderDetails,
                apiStatus: API_REQUEST_STATUS_SUCCEEDED,
              },
              purchaseOrderEntries: {
                ...o.purchaseOrderEntries,
                listStatus: API_REQUEST_STATUS_SUCCEEDED,
              },
              needsToReload: false,
              isSelected: true,
            };
          }
          return {...o, isSelected: false};
        }),
      },
      selectedPurchaseOrder: _map(
        filter(state.purchaseOrders.list, (o: IOrdersC) => o.IdTPPedido === IdTPPedido),
        (i: IOrdersC) => ({
          ...i,
          isSelected: true,
          purchaseOrderEntries: {
            ...i.purchaseOrderEntries,
            listStatus: i.needsToReload
              ? API_REQUEST_STATUS_LOADING
              : i.purchaseOrderEntries.listStatus,
          },
          purchaseOrderDetails: {
            ...i.purchaseOrderDetails,
            apiStatus: i.needsToReload
              ? API_REQUEST_STATUS_LOADING
              : i.purchaseOrderDetails.apiStatus,
          },
        }),
      )[0],
    }),
  ),
  on(
    checkoutDetailsActions.SET_BACKUP_PURCHASE_ORDER,
    (state: CheckoutDetailsState): CheckoutDetailsState => ({
      ...state,
      purchaseOrders: {
        ...state.purchaseOrders,
        list: _map(state.purchaseOrders.list, (o: IOrdersC) => {
          if (o.IdTPPedido === state.selectedPurchaseOrder.IdTPPedido) {
            return {...state.selectedPurchaseOrder};
          }
          return {...o};
        }),
      },
    }),
  ),
  on(
    checkoutDetailsActions.RESTORE_BACKUP_PURCHASE_ORDER,
    (state: CheckoutDetailsState, {purchaseId}): CheckoutDetailsState => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderEntries: {
          ...state.selectedPurchaseOrder.purchaseOrderEntries,
          listStatus: API_REQUEST_STATUS_SUCCEEDED,
        },
        purchaseOrderDetails: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails,
          apiStatus: API_REQUEST_STATUS_SUCCEEDED,
        },
      },
    }),
  ),
  on(
    checkoutDetailsActions.FETCH_PURCHASE_ORDER_ENTRIES_SUCCESS,
    (state: CheckoutDetailsState, {purchaseOrderEntries}) => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        needsToReload: false,
        purchaseOrderEntries: {
          listStatus: API_REQUEST_STATUS_SUCCEEDED,
          list: purchaseOrderEntries,
        },
        codeRequestEditData: {},
        codeRequestInvoiceInAdvance: {},
        codeRequestdelinquentCustomer: {},
        purchaseOrderDetails: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails,
          needsToReload: false,
        },
      },
    }),
  ),
  on(
    checkoutDetailsActions.FETCH_PURCHASE_ORDER_ASIDES_SUCCESS,
    (state: CheckoutDetailsState, {purchaseOrderDetails}) => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        procedureType: purchaseOrderDetails.tpClienteCSCreditoMorosoCorreo
          ? purchaseOrderDetails.tpClienteCSCreditoMorosoCorreo.TipoTramite
          : state.selectedPurchaseOrder.procedureType,
        purchaseOrderEntries: {
          ...state.selectedPurchaseOrder.purchaseOrderEntries,
          listStatus: API_REQUEST_STATUS_LOADING,
        },
        purchaseOrderDetails: {
          ...purchaseOrderDetails,
          apiStatus: API_REQUEST_STATUS_SUCCEEDED,
        },
      },
    }),
  ),
  on(
    checkoutDetailsActions.FETCH_PURCHASE_ORDER_ASIDES_SUCCESS_ONLY_CODE,
    (state: CheckoutDetailsState, {tpClienteCSCreditoMorosoCorreo}) => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        needsToReload: false,
        purchaseOrderDetails: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails,
          tpClienteCSCreditoMorosoCorreo,
          apiStatus: API_REQUEST_STATUS_SUCCEEDED,
          needsToReload: false,
        },
      },
    }),
  ),
  on(checkoutDetailsActions.FETCH_PURCHASE_ORDER_ENTRIES_FAILED, (state: CheckoutDetailsState) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      needsToReload: true,
    },
  })),
  on(checkoutDetailsActions.FETCH_PURCHASE_ORDER_ASIDES_FAILED, (state: CheckoutDetailsState) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      purchaseOrderDetails: {
        ...state.selectedPurchaseOrder.purchaseOrderDetails,
        needsToReload: true,
      },
    },
  })),
  on(checkoutDetailsActions.SET_CAT_DESTINO, (state: CheckoutDetailsState, {catDestino}) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      purchaseOrderDetails: {
        ...state.selectedPurchaseOrder.purchaseOrderDetails,
        catDestino: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails.catDestino,
          IdCatDestino: catDestino.value.toString(),
          Destino: catDestino.label,
          Clave: catDestino.labelKey,
          Activo: true,
        },
        tpPedido: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido,
          IdCatDestino: catDestino.value.toString(),
        },
      },
    },
  })),
  on(
    checkoutDetailsActions.SET_CONTACT_DELIVERY,
    (state: CheckoutDetailsState, {contactDelivery}): CheckoutDetailsState => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderDetails: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails,
          tpPedido: {
            ...state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido,
            IdContactoEntrega: contactDelivery.value,
          },
        },
        selectedContactDelivery: contactDelivery,
      },
    }),
  ),
  on(
    checkoutDetailsActions.SET_CLIENT_ADDRESS,
    (state: CheckoutDetailsState, {clientAddress}): CheckoutDetailsState => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderDetails: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails,
          selectedClientAddresses: clientAddress,
          tpPedido: {
            ...state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido,
            IdDireccionCliente: clientAddress.value.toString(),
          },
          DireccionClienteDetalle: filter(
            state.clientAddresses,
            (o: DireccionClienteDetalle) =>
              o.DireccionCliente.IdDireccionCliente === clientAddress.value.toString(),
          )[0],
        },
      },
    }),
  ),
  on(
    checkoutDetailsActions.SET_TPPEDIDO_VALUE,
    (state: CheckoutDetailsState, {value, field}): CheckoutDetailsState => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderDetails: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails,
          tpPedido: {
            ...state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido,
            [field]: value,
            FacturaPorAdelantado:
              field === 'EntregaConRemision' ||
              (field === 'FacturaPorAdelantado' &&
                value ===
                  state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido.FacturaPorAdelantado)
                ? false
                : field === 'FacturaPorAdelantado'
                ? value
                : state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido.FacturaPorAdelantado,
            EntregaConRemision:
              field === 'FacturaPorAdelantado' ||
              (field === 'EntregaConRemision' &&
                value ===
                  state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido.EntregaConRemision)
                ? false
                : field === 'EntregaConRemision'
                ? value
                : state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido.EntregaConRemision,
          },
        },
      },
    }),
  ),
  on(
    checkoutDetailsActions.GET_ENTRY_POP_INFO_SUCCESS,
    (state: CheckoutDetailsState, {vTramitarPedidoPartidaDetalle}): CheckoutDetailsState => {
      return {
        ...state,
        selectedPurchaseOrder: {
          ...state.selectedPurchaseOrder,
          vTramitarPedidoPartidaDetalle,
          selectedFeeDate: new Date(
            vTramitarPedidoPartidaDetalle?.tpPartidaPedido?.FechaEstimadaEntrega,
          ),
          deliveryTime: vTramitarPedidoPartidaDetalle?.DiasEntrega,
          selectedUnidadMedida: flow(
            // DOCS: Se cambió de UnidadDeMedida a IdCatUnidad
            () => vTramitarPedidoPartidaDetalle.tpPartidaPedidoAddendaSanofi.IdCatUnidad,
            (unit) =>
              unit
                ? filter(
                    state.catUnidadDeMedida,
                    (o: DropListOption) =>
                      // DOCS: Se cambió de UnidadDeMedida a IdCatUnidad
                      o.value ===
                      vTramitarPedidoPartidaDetalle.tpPartidaPedidoAddendaSanofi.IdCatUnidad,
                  )
                : [],
            (array) => (!isEmpty(array) ? array[0] : ({} as DropListOption)),
          )(),
        },
      };
    },
  ),
  on(
    checkoutDetailsActions.GET_ENTRY_POP_INFO_LOAD,
    (state: CheckoutDetailsState, {IdTPPartidaPedido}): CheckoutDetailsState => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderEntries: {
          ...state.selectedPurchaseOrder.purchaseOrderEntries,
          list: _map(
            state.selectedPurchaseOrder.purchaseOrderEntries.list,
            (o: IPurchaseOrderItem) => {
              if (o.tpPartidaPedido.IdTPPartidaPedido === IdTPPartidaPedido) {
                return {
                  ...o,
                  isOpen: true,
                  tpPartidaPedidoAddendaSanofi: o?.tpPartidaPedidoAddendaSanofi
                    ? {...o?.tpPartidaPedidoAddendaSanofi}
                    : state.selectedPurchaseOrder?.purchaseOrderDetails?.tpPedido
                        ?.AplicaAddendaLineaDeOrden
                    ? {
                        Activo: true,
                        CuentaPuente: null,
                        FechaRegistro: DEFAULT_DATE,
                        FechaUltimaActualizacion: DEFAULT_DATE,
                        IdTPPartidaPedido: IdTPPartidaPedido,
                        IdTPPartidaPedidoAddendaSanofi: DEFAULT_UUID,
                        LineaDeOrden: null,
                        IdCatUnidad: DEFAULT_UUID,
                      }
                    : null,
                };
              }
              return {...o, isOpen: false};
            },
          ),
          backupPurchaseOrder: state.selectedPurchaseOrder.purchaseOrderEntries.list.find(
            (it: IPurchaseOrderItem) => it.tpPartidaPedido.IdTPPartidaPedido === IdTPPartidaPedido,
          ),
        },
      },
    }),
  ),
  on(
    checkoutDetailsActions.SET_POP_ITEM_STRING_VALUE,
    (state: CheckoutDetailsState, {comments, node}): CheckoutDetailsState => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderEntries: {
          ...state.selectedPurchaseOrder.purchaseOrderEntries,
          list: _map(
            state.selectedPurchaseOrder.purchaseOrderEntries.list,
            (o: IPurchaseOrderItem) => {
              if (o.isOpen) {
                return {
                  ...o,
                  tpPartidaPedido: {
                    ...o.tpPartidaPedido,
                    [node]: comments,
                  },
                };
              }
              return {...o};
            },
          ),
        },
        //TODO: Revisar si se debe actualizar vTramitarPedidoPartidaDetalle
        // vTramitarPedidoPartidaDetalle: {
        //   ...state.selectedPurchaseOrder.vTramitarPedidoPartidaDetalle,
        //   tpPartidaPedido: {
        //     ...state.selectedPurchaseOrder.vTramitarPedidoPartidaDetalle.tpPartidaPedido,
        //     [node]: comments,
        //   },
        // },
      },
    }),
  ),
  on(
    checkoutDetailsActions.SET_POP_ITEM_SCHEDULED,
    (state: CheckoutDetailsState, {scheduled}): CheckoutDetailsState => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderEntries: {
          ...state.selectedPurchaseOrder.purchaseOrderEntries,
          list: _map(
            state.selectedPurchaseOrder.purchaseOrderEntries.list,
            (o: IPurchaseOrderItem) => {
              if (
                state.selectedPurchaseOrder.purchaseOrderEntries.entrySelected.tpPartidaPedido
                  .IdTPPartidaPedido === o.tpPartidaPedido.IdTPPartidaPedido
              ) {
                return {
                  ...o,
                  tpPartidaPedido: {
                    ...o.tpPartidaPedido,
                    Programada: scheduled,
                    FechaEstimadaEntrega: scheduled
                      ? o.tpPartidaPedido.FechaEstimadaEntrega || null
                      : null,
                  },
                };
              } else {
                return {...o};
              }
            },
          ),
        },
        //TODO: Revisar si se debe actualizar vTramitarPedidoPartidaDetalle
        // vTramitarPedidoPartidaDetalle: {
        //   ...state.selectedPurchaseOrder.vTramitarPedidoPartidaDetalle,
        //   tpPartidaPedido: {
        //     ...state.selectedPurchaseOrder.vTramitarPedidoPartidaDetalle.tpPartidaPedido,
        //     Programada: scheduled,
        //   },
        // },
      },
    }),
  ),
  on(
    checkoutDetailsActions.SET_POP_ITEM_ESTIMATED_FEE,
    (state: CheckoutDetailsState, {dateString, date}): CheckoutDetailsState => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderEntries: {
          ...state.selectedPurchaseOrder.purchaseOrderEntries,
          list: _map(
            state.selectedPurchaseOrder.purchaseOrderEntries.list,
            (o: IPurchaseOrderItem) => {
              if (o.isOpen) {
                return {
                  ...o,
                  tpPartidaPedido: {
                    ...o.tpPartidaPedido,
                    FechaEstimadaEntrega: dateString,
                  },
                };
              }
              return {...o};
            },
          ),
        },
        //TODO: Revisar si se debe actualizar vTramitarPedidoPartidaDetalle
        // vTramitarPedidoPartidaDetalle: {
        //   ...state.selectedPurchaseOrder.vTramitarPedidoPartidaDetalle,
        //   tpPartidaPedido: {
        //     ...state.selectedPurchaseOrder.vTramitarPedidoPartidaDetalle.tpPartidaPedido,
        //     FechaEstimadaEntrega: dateString,
        //   },
        // },
        selectedFeeDate: date,
      },
    }),
  ),
  on(
    checkoutDetailsActions.SET_CODE_POP_PROCEDURE_TYPE,
    (state: CheckoutDetailsState, {procedureType}): CheckoutDetailsState => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        procedureType,
      },
    }),
  ),
  on(checkoutDetailsActions.UPDATE_CODE_REQUEST, (state: CheckoutDetailsState) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      codeRequest: {
        ...(state.selectedPurchaseOrder.procedureType === 'EditarDatosFacturacion'
          ? state.selectedPurchaseOrder.codeRequestEditData
          : state.selectedPurchaseOrder.procedureType === 'FacturarPorAdelantado'
          ? state.selectedPurchaseOrder.codeRequestInvoiceInAdvance
          : state.selectedPurchaseOrder.procedureType === 'TramitarPClienteMoroso'
          ? state.selectedPurchaseOrder.codeRequestdelinquentCustomer
          : {}),
      },
    },
  })),
  on(
    checkoutDetailsActions.SET_UNIDAD_MEDIDA_VALUE,
    (state: CheckoutDetailsState, {selectedUnidadMedida}): CheckoutDetailsState => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        vTramitarPedidoPartidaDetalle: {
          ...state.selectedPurchaseOrder.vTramitarPedidoPartidaDetalle,
          tpPartidaPedidoAddendaSanofi: {
            ...state.selectedPurchaseOrder.vTramitarPedidoPartidaDetalle
              .tpPartidaPedidoAddendaSanofi,
            // DOCS: Se cambió de UnidadDeMedida a IdCatUnidad
            IdCatUnidad: selectedUnidadMedida,
          },
        },
      },
    }),
  ),
  on(
    checkoutDetailsActions.ADD_CLIENT_CONTACT,
    (state: CheckoutDetailsState, {itemId}): CheckoutDetailsState => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderDetails: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails,
          ListaContactoNotificadoEntrega:
            findIndex(
              state.selectedPurchaseOrder.purchaseOrderDetails.deletedClientContacts,
              (o: TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj) =>
                o.m_Item2.CorreoElectronico[0].IdCorreoElectronico === itemId,
            ) !== -1
              ? [
                  ...state.selectedPurchaseOrder.purchaseOrderDetails
                    .ListaContactoNotificadoEntrega,
                  ...filter(
                    state.selectedPurchaseOrder.purchaseOrderDetails.deletedClientContacts,
                    (o: TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj) =>
                      o.m_Item2.CorreoElectronico[0].IdCorreoElectronico === itemId,
                  ),
                ]
              : [
                  ...state.selectedPurchaseOrder.purchaseOrderDetails
                    .ListaContactoNotificadoEntrega,
                  _map(
                    filter(
                      state.clientContacts,
                      (o: ContactoDetalleObj) =>
                        o.CorreoElectronico[0].IdCorreoElectronico === itemId,
                    ),
                    (i: ContactoDetalleObj) => ({
                      m_Item1: {
                        Activo: true,
                        FechaRegistro: DEFAULT_DATE,
                        FechaUltimaActualizacion: DEFAULT_DATE,
                        IdContactoCliente: i.IdContactoCliente,
                        IdTPPedido: state.selectedPurchaseOrder.IdTPPedido,
                        IdTPedidoContactoNotificadoEntrega: DEFAULT_UUID,
                      },
                      m_Item2: i,
                    }),
                  )[0],
                ],
          deletedClientContacts: filter(
            state.selectedPurchaseOrder.purchaseOrderDetails.deletedClientContacts,
            (o: TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj) =>
              o.m_Item2.CorreoElectronico[0].IdCorreoElectronico !== itemId,
          ),
        },
      },
    }),
  ),
  on(
    checkoutDetailsActions.DELETE_CLIENT_CONTACT,
    (state: CheckoutDetailsState, {emailId}): CheckoutDetailsState => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderDetails: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails,
          deletedClientContacts:
            findIndex(
              state.selectedPurchaseOrder.purchaseOrderDetails.ListaContactoNotificadoEntrega,
              (o: TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj) =>
                o.m_Item2.CorreoElectronico[0].IdCorreoElectronico === emailId &&
                o.m_Item1.IdTPedidoContactoNotificadoEntrega !== DEFAULT_UUID,
            ) !== -1
              ? [
                  ...state.selectedPurchaseOrder.purchaseOrderDetails.deletedClientContacts,
                  filter(
                    state.selectedPurchaseOrder.purchaseOrderDetails.ListaContactoNotificadoEntrega,
                    (o: TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj) =>
                      o.m_Item2.CorreoElectronico[0].IdCorreoElectronico === emailId &&
                      o.m_Item1.IdTPedidoContactoNotificadoEntrega !== DEFAULT_UUID,
                  )[0],
                ]
              : [...state.selectedPurchaseOrder.purchaseOrderDetails.deletedClientContacts],
          ListaContactoNotificadoEntrega: filter(
            state.selectedPurchaseOrder.purchaseOrderDetails.ListaContactoNotificadoEntrega,
            (o: TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj) =>
              o.m_Item2.CorreoElectronico[0].IdCorreoElectronico !== emailId,
          ),
        },
      },
    }),
  ),
  on(
    checkoutDetailsActions.GENERATE_VERIFICATION_CODE_SUCCESS,
    (state: CheckoutDetailsState, {codeRequest}) => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        codeRequestEditData: {
          ...(state.selectedPurchaseOrder.procedureType === 'EditarDatosFacturacion'
            ? codeRequest
            : {...state.selectedPurchaseOrder.codeRequestEditData}),
        },
        codeRequestInvoiceInAdvance: {
          ...(state.selectedPurchaseOrder.procedureType === 'FacturarPorAdelantado'
            ? codeRequest
            : {...state.selectedPurchaseOrder.codeRequestInvoiceInAdvance}),
        },
        codeRequestdelinquentCustomer: {
          ...(state.selectedPurchaseOrder.procedureType === 'TramitarPClienteMoroso'
            ? codeRequest
            : {...state.selectedPurchaseOrder.codeRequestdelinquentCustomer}),
        },
        codeRequest,
        needsToReload: true,
      },
    }),
  ),
  on(
    checkoutDetailsActions.SET_AUTHORIZED_VERIFICATION_CODE_LOAD,
    (state: CheckoutDetailsState, {codeRequest}) => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        needsToReload: true,
        purchaseOrderDetails: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails,
          tpClienteCSCreditoMorosoCorreo: codeRequest,
        },
      },
    }),
  ),
  on(
    checkoutDetailsActions.SET_CODE_VALUE_BY_POSITION,
    (state: CheckoutDetailsState, {position, value}) => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        code: _map(state.selectedPurchaseOrder.code, (o: number, index: number) => {
          if (position === index) {
            return value;
          }
          return o;
        }),
      },
    }),
  ),
  on(checkoutDetailsActions.RESTORE_CODE_VALUE, (state: CheckoutDetailsState) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      code: [null, null, null, null],
      codeRequest: {},
    },
  })),
  on(checkoutDetailsActions.SET_SHAKED, (state: CheckoutDetailsState, {value}) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      shaked: value,
    },
  })),
  on(checkoutDetailsActions.INVALIDATE_AUTHORIZED_CODE_SUCCESS, (state: CheckoutDetailsState) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      codeRequest: {},
      purchaseOrderDetails: {
        ...state.selectedPurchaseOrder.purchaseOrderDetails,
        tpPedido: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido,
          IdSolicitudAutorizacionCambio: null,
        },
      },
    },
  })),
  on(
    checkoutDetailsActions.SET_USAGE_OR_PAYMENT_METHOD,
    (state: CheckoutDetailsState, {item, node}): CheckoutDetailsState => {
      const tpPedido = state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido;
      return {
        ...state,
        selectedPurchaseOrder: {
          ...state.selectedPurchaseOrder,
          purchaseOrderDetails: {
            ...state.selectedPurchaseOrder.purchaseOrderDetails,
            tpPedido: {
              ...tpPedido,
              IdCatUsoCFDI:
                node === 'catUsoCFDI' ? (item as CatUsoCFDI)?.IdCatUsoCFDI : tpPedido.IdCatUsoCFDI,
              IdCatMetodoDePagoCFDI:
                node === 'catMetodoDePagoCFDI'
                  ? (item as CatMetodoDePagoCFDI)?.IdCatMetodoDePagoCFDI
                  : tpPedido.IdCatMetodoDePagoCFDI,
            },
            [node]: item,
          },
        },
      };
    },
  ),
  on(checkoutDetailsActions.FETCH_PENDING_INVOICES_SUCCESS, (state, {pendingInvoices}) => ({
    ...state,
    dataSlow: {...state.dataSlow, dataPendingInvoices: pendingInvoices},
  })),
  on(checkoutDetailsActions.VIEW_FILE_IS_LOADING, (state, {value}) => ({
    ...state,
    viewFileIsLoading: value,
  })),
  on(checkoutDetailsActions.VIEW_FILE_SUCCESS, (state, {fileBase64}) => ({
    ...state,
    fileBase64,
  })),
  on(checkoutDetailsActions.SET_IS_PDF, (state, {value}) => ({
    ...state,
    isPDF: value,
  })),
  // DOCS: Se comenta porque actualmente no se está usando el servicio de traer las cotizaciones vinculadas, descomentar en caso de ser necesario
  /*on(checkoutDetailsActions.UPDATE_ITEM_LIST, (state, {IdTPPartidaPedido, linkedQuotes}) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      purchaseOrderEntries: {
        ...state.selectedPurchaseOrder.purchaseOrderEntries,
        list: _map(state.selectedPurchaseOrder.purchaseOrderEntries.list, (o:IPurchaseOrderItem):IPurchaseOrderItem => {
          if (o.IdTPPartidaPedido === IdTPPartidaPedido) {
            if (o.needsToReloadLinkeds) {
              return {
                ...o,
                isInViewQuotesLinked: true,
                quotesLinked: linkedQuotes,
                needsToReloadLinkeds: false,
              };
            } else {
              return {
                ...o,
                isInViewQuotesLinked: true,
            }
          } else {
            return {...o, isInViewQuotesLinked: false};
          }
        }),
      },
    },
  })),*/
  on(checkoutDetailsActions.SET_INVOICE_ITEM_SELECTED, (state, {item}) => ({
    ...state,
    invoice: item,
  })),
  on(checkoutDetailsActions.CLEAN_ALL_CHECKOUT_DETAIL, () => initialCheckoutDetailsState()),
  on(
    checkoutDetailsActions.CHECKOUT_FETCH_TYPE_AUTHORIZATION_DETAILS_SUCCESS,
    (state, {authorization}): CheckoutDetailsState => ({
      ...state,
      gmTipoAutorizacionUsuarioDetalle: authorization,
    }),
  ),
  on(actionsUtils.SEND_AUTHORIZATION_CODE_SUCCESS, (state, {valid}) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      purchaseOrderDetails: {
        ...state.selectedPurchaseOrder.purchaseOrderDetails,
        isCodePopPup: !valid,
        isCodeValid: valid,
      },
    },
  })),
  on(
    checkoutDetailsActions.RESTORE_BACKUP_PURCHASE_ORDER_SELECTED,
    (state: CheckoutDetailsState, {backupPurchaseOrder}): CheckoutDetailsState => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderEntries: {
          ...state.selectedPurchaseOrder.purchaseOrderEntries,
          list: _map(
            state.selectedPurchaseOrder.purchaseOrderEntries.list,
            (o: IPurchaseOrderItem) => {
              if (
                o.tpPartidaPedido.IdTPPartidaPedido ===
                backupPurchaseOrder.tpPartidaPedido.IdTPPartidaPedido
              ) {
                return {...backupPurchaseOrder};
              }
              return {...o, isOpen: false};
            },
          ),
        },
      },
    }),
  ),
  on(
    checkoutDetailsActions.CHANGE_VALUE_SANOFI,
    (state: CheckoutDetailsState, {IdTPPartidaPedido, node, value}): CheckoutDetailsState => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderEntries: {
          ...state.selectedPurchaseOrder.purchaseOrderEntries,
          list: _map(
            state.selectedPurchaseOrder.purchaseOrderEntries.list,
            (o: IPurchaseOrderItem) => {
              // TODO: Retomar con el caso sanofi
              // if (o.tpPartidaPedidoAddendaSanofi.IdTPPartidaPedido === IdTPPartidaPedido) {
              //   return {...o, [node]: value};
              // }
              return {...o};
            },
          ),
          backupPurchaseOrder: {
            ...state.selectedPurchaseOrder.purchaseOrderEntries.list.find(
              (it: IPurchaseOrderItem) =>
                it.tpPartidaPedido.IdTPPartidaPedido === IdTPPartidaPedido,
            ),
            tpPartidaPedidoAddendaSanofi: state.selectedPurchaseOrder?.purchaseOrderEntries?.backupPurchaseOrder?.NombreMarca?.toLowerCase().includes(
              CLIENT_SANOFI?.toLowerCase(),
            )
              ? {
                  Activo:
                    state.selectedPurchaseOrder?.purchaseOrderEntries?.backupPurchaseOrder
                      ?.tpPartidaPedido?.Activo,
                  CorreoContactoClienteAddenda: null,
                  CorreoEmpresaAddenda: null,
                  CuentaPuente: null,
                  IdTPPartidaPedidoAddendaSanofi: null,
                  LineaDeOrden: null,
                  // DOCS: Se cambió UnidadDeMedida a IdCatUnidad
                  IdCatUnidad: null,
                  FechaRegistro:
                    state.selectedPurchaseOrder?.purchaseOrderEntries?.backupPurchaseOrder
                      ?.tpPartidaPedido?.FechaRegistro,
                  FechaUltimaActualizacion:
                    state.selectedPurchaseOrder?.purchaseOrderEntries?.backupPurchaseOrder
                      ?.tpPartidaPedido?.FechaUltimaActualizacion,
                  IdTPPartidaPedido:
                    state.selectedPurchaseOrder?.purchaseOrderEntries?.backupPurchaseOrder
                      ?.tpPartidaPedido?.IdTPPartidaPedido,
                }
              : {
                  Activo:
                    state.selectedPurchaseOrder?.purchaseOrderEntries?.backupPurchaseOrder
                      ?.tpPartidaPedido?.Activo,
                  CorreoContactoClienteAddenda: null,
                  CorreoEmpresaAddenda: null,
                  CuentaPuente: null,
                  IdTPPartidaPedidoAddendaSanofi: null,
                  LineaDeOrden: null,
                  // DOCS: SE CAMBIÓ UnidadDeMedida a IdCatUnidad
                  IdCatUnidad: null,
                  FechaRegistro:
                    state.selectedPurchaseOrder?.purchaseOrderEntries?.backupPurchaseOrder
                      ?.tpPartidaPedido?.FechaRegistro,
                  FechaUltimaActualizacion:
                    state.selectedPurchaseOrder?.purchaseOrderEntries?.backupPurchaseOrder
                      ?.tpPartidaPedido?.FechaUltimaActualizacion,
                  IdTPPartidaPedido:
                    state.selectedPurchaseOrder?.purchaseOrderEntries?.backupPurchaseOrder
                      ?.tpPartidaPedido?.IdTPPartidaPedido,
                },
          },
        },
      },
    }),
  ),
  on(checkoutDetailsActions.OPEN_ADDENDA_POP_UP, (state: CheckoutDetailsState, {isOpen}) => {
    return {
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderDetails: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails,
          isAddendaPopUpOpen: isOpen,
        },
      },
    };
  }),
  on(checkoutDetailsActions.SET_BACKUP_ADDENDA_INFO, (state: CheckoutDetailsState) => {
    return {
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        backupTpedido: {
          ...state?.selectedPurchaseOrder?.purchaseOrderDetails?.tpPedido,
        },
      },
    };
  }),
  on(checkoutDetailsActions.RESTORE_BACKUP_TP_ADDENDA_INFO, (state: CheckoutDetailsState) => {
    return {
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderDetails: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails,
          tpPedido: {
            ...state.selectedPurchaseOrder.purchaseOrderDetails.tpPedido,
            AddendaCorreoElectronico:
              state?.selectedPurchaseOrder?.backupTpedido?.AddendaCorreoElectronico,
            AddendaObservaciones: state?.selectedPurchaseOrder?.backupTpedido?.AddendaObservaciones,
          },
        },
      },
    };
  }),
  on(checkoutDetailsActions.UPDATE_TP_PEDIDO, (state: CheckoutDetailsState, {node, value}) => {
    return {
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        purchaseOrderDetails: {
          ...state.selectedPurchaseOrder.purchaseOrderDetails,
          tpPedido: {
            ...state?.selectedPurchaseOrder?.purchaseOrderDetails?.tpPedido,
            [node]: value,
          },
        },
      },
    };
  }),
  on(checkoutDetailsActions.GET_NOT_WORKING_SUCCESS, (state, {notWorkingDays}) => ({
    ...state,
    datesUnavailable: notWorkingDays,
  })),
  on(checkoutDetailsActions.SET_ENTRY_SELECTED, (state, {entry}) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      purchaseOrderEntries: {
        ...state.selectedPurchaseOrder.purchaseOrderEntries,
        entrySelected: entry,
        tpPartidaPedidoAddendaSanofi: entry.tpPartidaPedidoAddendaSanofi,
      },
    },
  })),
  on(checkoutDetailsActions.SET_SANOFI_VALUE, (state, {field, value}) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      purchaseOrderEntries: {
        ...state.selectedPurchaseOrder.purchaseOrderEntries,
        tpPartidaPedidoAddendaSanofi: {
          ...buildPpPartidaPedidoAddendaSanofi(
            state.selectedPurchaseOrder?.purchaseOrderEntries.tpPartidaPedidoAddendaSanofi,
            field,
            value,
          ),
        },
      },
    },
  })),
  on(checkoutDetailsActions.SAVE_SANOFI_VALUE, (state) => ({
    ...state,
    selectedPurchaseOrder: {
      ...state.selectedPurchaseOrder,
      purchaseOrderEntries: {
        ...state.selectedPurchaseOrder.purchaseOrderEntries,
        list: _map(
          state.selectedPurchaseOrder.purchaseOrderEntries.list,
          (o: IPurchaseOrderItem) => {
            if (o.isOpen) {
              return {
                ...o,
                tpPartidaPedidoAddendaSanofi:
                  o.tpPartidaPedidoAddendaSanofi ||
                  state.selectedPurchaseOrder?.purchaseOrderEntries.tpPartidaPedidoAddendaSanofi
                    ? {
                        ...o.tpPartidaPedidoAddendaSanofi,
                        ...state.selectedPurchaseOrder?.purchaseOrderEntries
                          .tpPartidaPedidoAddendaSanofi,
                      }
                    : null,
              };
            }
            return {...o};
          },
        ),
        tpPartidaPedidoAddendaSanofi: null,
        entrySelected: null,
      },
    },
  })),
  on(
    checkoutDetailsActions.SET_UPDATE_REFERENCE_SUCCESS,
    (state: CheckoutDetailsState, {reference}): CheckoutDetailsState => ({
      ...state,
      purchaseOrders: {
        ...state.purchaseOrders,
        list: _map(
          state.purchaseOrders.list,
          (o: IOrdersC): IOrdersC => {
            if (o.IdTPPedido === state.selectedPurchaseOrder.IdTPPedido) {
              return {
                ...o,
                NumeroOrdenDeCompra: reference,
              };
            }
            return {
              ...o,
            };
          },
        ),
      },
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        NumeroOrdenDeCompra: reference,
      },
    }),
  ),
);
