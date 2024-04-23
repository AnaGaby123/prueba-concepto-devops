import {createReducer, on} from '@ngrx/store';
import {findIndex, map as _map} from 'lodash-es';

// Models
import {
  initialICustomerNotProcess,
  initialIPurchaseOrder,
  initialNotProcessedDetailsState,
  IOrderNotProcessed,
  NotProcessedDetailsState,
} from '@appModels/store/pendings/not-processed/not-processed-details/not-processed-details.models';

// Actions
import {notProcessedDetailActions} from '@appActions/pendings/not-processed';
import {API_REQUEST_STATUS_LOADING, API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';

const initialNotProcessedDetails: NotProcessedDetailsState = {
  ...initialNotProcessedDetailsState(),
};
export const notProcessedDetailsReducer = createReducer(
  initialNotProcessedDetails,
  on(
    notProcessedDetailActions.SET_CLIENT_SELECTED_SUCCESS,
    (state, {customer}): NotProcessedDetailsState => ({
      ...state,
      clientNotProcessedSelected: {
        ...state.clientNotProcessedSelected,
        ...customer,
      },
      purchaseOrder: {
        ...state.purchaseOrder,
        apiStatus: API_REQUEST_STATUS_LOADING,
        apiStatusMail: API_REQUEST_STATUS_LOADING,
        apiStatusItems: API_REQUEST_STATUS_LOADING,
      },
    }),
  ),
  on(
    notProcessedDetailActions.CLEAN_ALL_NOT_PROCESSED_DETAIL,
    (state): NotProcessedDetailsState => ({
      ...state,
      clientNotProcessedSelected: initialICustomerNotProcess(),
      purchaseOrder: initialIPurchaseOrder(),
    }),
  ),
  on(
    notProcessedDetailActions.GET_CLIENT_CONTACTS_SUCCESS,
    (state, {contacts}): NotProcessedDetailsState => ({
      ...state,
      clientNotProcessedSelected: {
        ...state.clientNotProcessedSelected,
        contacts,
      },
    }),
  ),
  on(
    notProcessedDetailActions.FETCH_PURCHASE_ORDERS_SUCCESS,
    (state, {data}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        orders: data,
        orderSelected: {
          ...data.Results[0],
          gmPPPedidoRecalcular: {
            IdPPPedido: data?.Results[0]?.IdPPPedido,
          },
          gmPPedidoGeneraCotizacion: {
            IdPPPedido: data?.Results[0]?.IdPPPedido,
          },
        },
        apiStatus: API_REQUEST_STATUS_SUCCEEDED,
        apiStatusMail:
          data.TotalResults === 0 ? API_REQUEST_STATUS_SUCCEEDED : API_REQUEST_STATUS_LOADING,
        apiStatusItems:
          data.TotalResults === 0 ? API_REQUEST_STATUS_SUCCEEDED : API_REQUEST_STATUS_LOADING,
      },
    }),
  ),
  on(
    notProcessedDetailActions.SET_PURCHASE_ORDER_SELECTED,
    (state, {item}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        orderSelected: {
          ...item,
          gmPPPedidoRecalcular: {
            IdPPPedido: item.IdPPPedido,
          },
          gmPPedidoGeneraCotizacion: {
            IdPPPedido: item.IdPPPedido,
          },
        },
      },
    }),
  ),
  on(
    notProcessedDetailActions.SET_STATUS,
    (state, {node, status}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        [node]: status,
      },
    }),
  ),
  on(
    notProcessedDetailActions.SET_KEYPAD_OPTION_SELECTED,
    notProcessedDetailActions.SET_TERM_SEARCH,
    notProcessedDetailActions.SET_FILTER_FEA_SELECTED,
    (state): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        apiStatus: API_REQUEST_STATUS_LOADING,
        apiStatusMail: API_REQUEST_STATUS_LOADING,
        apiStatusItems: API_REQUEST_STATUS_LOADING,
        orders: {
          TotalResults: 0,
          Results: [],
        },
        orderSelected: {} as IOrderNotProcessed,
      },
    }),
  ),
  on(
    notProcessedDetailActions.SET_KEYPAD_OPTION_SELECTED,
    (state, {option}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        keyPadSelected: option,
      },
    }),
  ),
  on(
    notProcessedDetailActions.SET_TERM_SEARCH,
    (state, {termSearch}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        termSearch,
      },
    }),
  ),
  on(
    notProcessedDetailActions.SET_FILTER_FEA_SELECTED,
    (state, {option}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        filterSelected: option,
      },
    }),
  ),
  on(
    notProcessedDetailActions.FETCH_MAIL_PURCHASE_ORDER_SUCCESS,
    (state, {mail}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        orders: {
          ...state.purchaseOrder.orders,
          Results: _map(state.purchaseOrder.orders.Results, (o: IOrderNotProcessed) => {
            if (o.IdCorreoRecibidoCliente === mail.CorreoRecibidoCliente.IdCorreoRecibidoCliente) {
              return {
                ...o,
                mailData: mail,
              };
            }
            return o;
          }),
        },
        orderSelected: {
          ...state.purchaseOrder?.orderSelected,
          mailData: mail,
        },
      },
    }),
  ),
  on(
    notProcessedDetailActions.GET_USER_SUCCESS,
    (state, {user, idOc}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        orders: {
          ...state.purchaseOrder?.orders,
          Results: _map(state.purchaseOrder?.orders.Results, (order) => {
            if (order.IdPPPedido === idOc) {
              return {...order, user};
            }
            return order;
          }),
        },
        orderSelected: {...state.purchaseOrder?.orderSelected, user},
      },
    }),
  ),
  on(
    notProcessedDetailActions.FETCH_ITEMS_ORDER_SUCCESS,
    (state, {items, idPPPedido}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        apiStatus: API_REQUEST_STATUS_SUCCEEDED,
        apiStatusMail: API_REQUEST_STATUS_SUCCEEDED,
        apiStatusItems: API_REQUEST_STATUS_SUCCEEDED,
        orders: {
          ...state.purchaseOrder?.orders,
          Results: _map(state.purchaseOrder?.orders.Results, (order) => {
            if (order.IdPPPedido === idPPPedido) {
              return {...order, items};
            }
            return order;
          }),
        },
        orderSelected: {...state.purchaseOrder?.orderSelected, items},
      },
    }),
  ),
  on(
    notProcessedDetailActions.SET_INCIDENCE_VALUE,
    (state, {IdPPOrderItem, field, value}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        orders: {
          ...state.purchaseOrder.orders,
          Results: _map(state.purchaseOrder.orders.Results, (oc) => {
            if (oc.IdPPPedido === state.purchaseOrder.orderSelected.IdPPPedido) {
              return {
                ...oc,
                items: {
                  ...oc.items,
                  Results: _map(state.purchaseOrder.orderSelected.items.Results, (item) => {
                    if (item.IdPPPartidaPedido === IdPPOrderItem) {
                      return {
                        ...item,
                        ppIncidenciaPartida: {
                          ...item.ppIncidenciaPartida,
                          [field]: value,
                        },
                      };
                    }
                    return item;
                  }),
                },
              };
            } else {
              return oc;
            }
          }),
        },
        orderSelected: {
          ...state.purchaseOrder.orderSelected,
          items: {
            ...state.purchaseOrder.orderSelected.items,
            Results: _map(state.purchaseOrder.orderSelected.items.Results, (item) => {
              if (item.IdPPPartidaPedido === IdPPOrderItem) {
                return {
                  ...item,
                  ppIncidenciaPartida: {
                    ...item.ppIncidenciaPartida,
                    [field]: value,
                  },
                };
              }
              return item;
            }),
          },
        },
      },
    }),
  ),
  on(
    notProcessedDetailActions.SET_SELECTED_PPPEDIDO_CONTACT_FOR_DROP,
    (state, {email}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        orders: {
          ...state.purchaseOrder.orders,
          Results: _map(state.purchaseOrder.orders.Results, (order: IOrderNotProcessed) => {
            if (order.IdPPPedido === state.purchaseOrder.orderSelected.IdPPPedido) {
              return {
                ...order,
                contact: email,
              };
            }
            return order;
          }),
        },
        orderSelected: {
          ...state.purchaseOrder.orderSelected,
          contact: email,
        },
      },
    }),
  ),
  on(
    notProcessedDetailActions.SET_SELECTED_DELIVERY_CONTACT_FOR_DROP,
    (state, {email}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        orders: {
          ...state.purchaseOrder.orders,
          Results: _map(state.purchaseOrder.orders.Results, (order: IOrderNotProcessed) => {
            if (order.IdPPPedido === state.purchaseOrder.orderSelected.IdPPPedido) {
              return {
                ...order,
                contact: email,
              };
            }
            return order;
          }),
        },
        orderSelected: {
          ...state.purchaseOrder.orderSelected,
          contact: email,
        },
      },
    }),
  ),
  on(
    notProcessedDetailActions.SET_PPPEDIDO_OBSERVATIONS,
    (state, {observations}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        orders: {
          ...state.purchaseOrder.orders,
          Results: _map(state.purchaseOrder.orders.Results, (order: IOrderNotProcessed) => {
            if (order.IdPPPedido === state.purchaseOrder.orderSelected.IdPPPedido) {
              return {
                ...order,
                ObservacionesFEA: observations,
              };
            }
            return order;
          }),
        },
        orderSelected: {
          ...state.purchaseOrder.orderSelected,
          ObservacionesFEA: observations,
        },
      },
    }),
  ),
  on(
    notProcessedDetailActions.GET_DELIVERY_ADDRESSES_SUCCESS,
    (state, {deliveryAddress}): NotProcessedDetailsState => ({
      ...state,
      deliveryAddress,
    }),
  ),
  on(
    notProcessedDetailActions.SET_SELECTED__DELIVERY_ADDRESS,
    (state, {address}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        orderSelected: {
          ...state.purchaseOrder.orderSelected,
          DireccionEntrega: address,
          ppPedidoConfiguracion: {
            ...state.purchaseOrder.orderSelected.ppPedidoConfiguracion,
            IdDireccionClienteEntrega: address.IdDireccionCliente,
          },
        },
      },
    }),
  ),
  on(
    notProcessedDetailActions.SET_DELIVERY_INSTRUCTIONS,
    (state, {instructions}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        orders: {
          ...state.purchaseOrder.orders,
          Results: _map(state.purchaseOrder.orders.Results, (order: IOrderNotProcessed) => {
            if (order.IdPPPedido === state.purchaseOrder.orderSelected.IdPPPedido) {
              return {
                ...order,
                ppPedidoInstruccionesEntrega: instructions,
              };
            }
            return order;
          }),
        },
        orderSelected: {
          ...state.purchaseOrder.orderSelected,
          ppPedidoInstruccionesEntrega: instructions,
        },
      },
    }),
  ),
  on(
    notProcessedDetailActions.SET_PPPEDIDO_FEA,
    (state, {date, stringDate}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        orders: {
          ...state.purchaseOrder.orders,
          Results: _map(state.purchaseOrder.orders.Results, (order: IOrderNotProcessed) => {
            if (order.IdPPPedido === state.purchaseOrder.orderSelected.IdPPPedido) {
              return {
                ...order,
                FechaEstimadaAjusteAux: stringDate,
                FechaEstimadaAjusteDate: date,
              };
            }
            return order;
          }),
        },
        orderSelected: {
          ...state.purchaseOrder.orderSelected,
          FechaEstimadaAjusteAux: stringDate,
          FechaEstimadaAjusteDate: date,
        },
      },
    }),
  ),
  on(
    notProcessedDetailActions.SET_OPEN_VIEW_FILE,
    (state, {active}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        openViewFile: active,
      },
    }),
  ),
  on(
    notProcessedDetailActions.VIEW_FILE_SUCCESS,
    (state, {fileBase64}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        fileBase64,
      },
    }),
  ),
  on(
    notProcessedDetailActions.VIEW_FILE_IS_LOADING,
    (state, {value}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        viewFileIsLoading: value,
      },
    }),
  ),
  on(
    notProcessedDetailActions.VIEW_FILE_ERROR,
    (state): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        openViewFile: false,
      },
    }),
  ),
  // DOCS: Se comenta porque actualmente no se está usando el servicio de traer las cotizaciones vinculadas, descomentar en caso de ser necesario
  /*on(
    notProcessedDetailActions.UPDATE_ITEM_LIST,
    (state, {IdPPPartidaPedido, linkedQuotes}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        orderSelected: {
          ...state.purchaseOrder.orderSelected,
          items: {
            ...state.purchaseOrder.orderSelected.items,
            Results: _map(
              state.purchaseOrder.orderSelected.items.Results,
              (o: IPpPartidaPedidoObjNotProcess): IPpPartidaPedidoObjNotProcess => {
                if (o.IdPPPartidaPedido === IdPPPartidaPedido) {
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
                    };
                  }
                } else {
                  return {...o, isInViewQuotesLinked: false};
                }
              },
            ),
          },
        },
      },
    }),
  ),*/
  on(
    notProcessedDetailActions.SET_INVOICE_ITEM_SELECTED,
    (state, {item}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        invoice: item,
      },
    }),
  ),
  on(
    notProcessedDetailActions.FETCH_TYPE_AUTHORIZATION_DETAILS_SUCCESS,
    (state, {authorization}): NotProcessedDetailsState => ({
      ...state,
      gmTipoAutorizacionUsuarioDetalle: authorization,
    }),
  ),
  on(
    notProcessedDetailActions.UPDATE_STATUS_ITEM_ORDER,
    (state: NotProcessedDetailsState, {item}) => {
      const results = [...state.purchaseOrder.orderSelected.items.Results];
      const index = findIndex(results, (r) => r.IdPPPartidaPedido === item.IdPPPartidaPedido);
      if (index !== -1) {
        results[index] = {
          ...results[index],
          Activo: !results[index].Activo,
        };
      }
      return {
        ...state,
        purchaseOrder: {
          ...state.purchaseOrder,
          orderSelected: {
            ...state.purchaseOrder.orderSelected,
            items: {
              ...state.purchaseOrder.orderSelected.items,
              Results: results,
            },
          },
        },
      };
    },
  ),
  on(
    notProcessedDetailActions.SHOW_RECONFIGURE_FREIGHT_POP_UP,
    (state: NotProcessedDetailsState, {isOpen}): NotProcessedDetailsState => {
      return {
        ...state,
        isReconfigureFreightPopUpOpen: isOpen,
        gMCotCotizacionDetalle: !isOpen ? null : state?.gMCotCotizacionDetalle,
        purchaseOrder: {
          ...state.purchaseOrder,
          orderSelected: {
            ...state.purchaseOrder.orderSelected,
            itemsBackup: state?.purchaseOrder?.orderSelected?.items,
            gmPPPedidoRecalcular: {
              ...state.purchaseOrder.orderSelected.gmPPPedidoRecalcular,
              EntregaUnica: isOpen
                ? false
                : !!state.purchaseOrder?.orderSelectedBackup?.gmPPPedidoRecalcular?.EntregaUnica,
              FleteDesglosado: true,
              // TODO Revisar despues para futura implementacion de fletes prorrateados
              /*              FleteDesglosado: isOpen
                ? false
                : !!state.purchaseOrder?.orderSelectedBackup?.gmPPPedidoRecalcular?.FleteDesglosado,*/
              AplicaFleteExpress: isOpen
                ? false
                : !!state.purchaseOrder?.orderSelectedBackup?.gmPPPedidoRecalcular
                    ?.AplicaFleteExpress,
            },
            gmPPedidoGeneraCotizacion: {
              EntregaUnica: isOpen
                ? false
                : !!state.purchaseOrder?.orderSelectedBackup?.gmPPPedidoRecalcular?.EntregaUnica,
              FleteDesglosado: true,
              // TODO Revisar despues para futura implementacion de fletes prorrateados
              /*        FleteDesglosado: isOpen
                        ? false
                        : !!state.purchaseOrder?.orderSelectedBackup?.gmPPPedidoRecalcular?.FleteDesglosado,*/
              AplicaFleteExpress: isOpen
                ? false
                : !!state.purchaseOrder?.orderSelectedBackup?.gmPPPedidoRecalcular
                    ?.AplicaFleteExpress,
            },
          },
          orderSelectedBackup: {
            ...state.purchaseOrder.orderSelected,
            itemsBackup: state?.purchaseOrder?.orderSelected?.items,
            gmPPPedidoRecalcular: {
              ...state.purchaseOrder.orderSelected.gmPPPedidoRecalcular,
              EntregaUnica: isOpen
                ? false
                : !!state.purchaseOrder?.orderSelected?.gmPPPedidoRecalcular?.EntregaUnica,
              FleteDesglosado: isOpen
                ? false
                : !!state.purchaseOrder?.orderSelected?.gmPPPedidoRecalcular?.FleteDesglosado,
              AplicaFleteExpress: isOpen
                ? false
                : !!state.purchaseOrder?.orderSelected?.gmPPPedidoRecalcular?.AplicaFleteExpress,
            },
            gmPPedidoGeneraCotizacion: {
              EntregaUnica: isOpen
                ? false
                : !!state.purchaseOrder?.orderSelected?.gmPPPedidoRecalcular?.EntregaUnica,
              FleteDesglosado: isOpen
                ? false
                : !!state.purchaseOrder?.orderSelected?.gmPPPedidoRecalcular?.FleteDesglosado,
              AplicaFleteExpress: isOpen
                ? false
                : !!state.purchaseOrder?.orderSelected?.gmPPPedidoRecalcular?.AplicaFleteExpress,
            },
          },
        },
      };
    },
  ),
  on(notProcessedDetailActions.RESET_ALL, (state: NotProcessedDetailsState) =>
    initialNotProcessedDetailsState(),
  ),
  on(
    notProcessedDetailActions.SELECT_DELIVERY_TYPE,
    (state, {deliveryType}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        orderSelected: {
          ...state.purchaseOrder.orderSelected,
          deliveryTypeSelected: deliveryType,
        },
      },
    }),
  ),
  on(notProcessedDetailActions.SET_GM_RECONFIGURE_FREIGHT_DATA, (state, {key, data}) => ({
    ...state,
    purchaseOrder: {
      ...state.purchaseOrder,
      orderSelected: {
        ...state.purchaseOrder.orderSelected,
        gmPPPedidoRecalcular: {
          ...state.purchaseOrder.orderSelected.gmPPPedidoRecalcular,
          [key]: data,
        },
        gmPPedidoGeneraCotizacion: {
          ...state.purchaseOrder.orderSelected.gmPPedidoGeneraCotizacion,
          [key]: data,
        },
      },
    },
  })),
  on(
    notProcessedDetailActions.GM_RECONFIGURE_FREIGHT_SUCCESS,
    (state, {gMCotCotizacionDetalle}): NotProcessedDetailsState => {
      return {
        ...state,
        gMCotCotizacionDetalle,
        purchaseOrder: {
          ...state?.purchaseOrder,
          orderSelectedBackup: {
            ...state?.purchaseOrder?.orderSelected,
            ppPedidoFletesExpressObj: gMCotCotizacionDetalle?.cotCotizacionFleteExpress,
            ppPedidoFletesUltimaMilla: gMCotCotizacionDetalle?.cotCotizacionFletesUltimaMilla,
            Subtotal: gMCotCotizacionDetalle?.Subtotal,
            Iva: gMCotCotizacionDetalle?.IVA,
            ValorTotal: gMCotCotizacionDetalle?.Total,
            itemsReconfigureFreight: gMCotCotizacionDetalle?.CotPartidasCotizacion,
          },
        },
      };
    },
  ),
  on(
    notProcessedDetailActions.SET_DATA_IMAIL_TO_GM_PEDIDO_GENERAR_COTIZACION,
    (state, {iDataMail}): NotProcessedDetailsState => {
      return {
        ...state,
        purchaseOrder: {
          ...state?.purchaseOrder,
          orderSelected: {
            ...state?.purchaseOrder?.orderSelected,
            gmPPedidoGeneraCotizacion: {
              ...state?.purchaseOrder?.orderSelected?.gmPPedidoGeneraCotizacion,
              Asunto: iDataMail?.subject,
              ComentariosAdicionales: iDataMail?.additionalComments,
              ConCopiaEmail: iDataMail?.carbonCopy?.join(','),
              EmailReceptor: iDataMail?.to?.join(','),
            },
          },
        },
      };
    },
  ),
  on(
    notProcessedDetailActions.SET_UPDATE_REFERENCE_SUCCESS,
    (state: NotProcessedDetailsState, {reference}): NotProcessedDetailsState => ({
      ...state,
      purchaseOrder: {
        ...state.purchaseOrder,
        orders: {
          ...state.purchaseOrder.orders,
          Results: _map(
            state.purchaseOrder.orders.Results,
            (o: IOrderNotProcessed): IOrderNotProcessed => {
              if (o.IdPPPedido === state.purchaseOrder.orderSelected.IdPPPedido) {
                return {
                  ...o,
                  OrdenDeCompra: reference,
                };
              }
              return {
                ...o,
              };
            },
          ),
        },
        orderSelected: {
          ...state.purchaseOrder.orderSelected,
          OrdenDeCompra: reference,
        },
      },
    }),
  ),
);
