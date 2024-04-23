import {ActionReducer, createReducer, on} from '@ngrx/store';
// Models
import {
  initialPPIncidenceItemValidateAdjustment,
  initialValidateAdjustmentDetailsState,
  IOrder,
  IPpPartidaPedidoDetalleValidateAdjustment,
  IPurchase,
  ValidateAdjustmentDetailsState,
} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-details/validate-adjustment-details.models';
// Actions
import {validateAdjustmentDetailActions} from '@appActions/pendings/validate-adjustment';

// Utils
import {map as _map} from 'lodash-es';

import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  OptionsGetTotals,
} from '@appUtil/common.protocols';
import {getPercentageAboutPriceList} from '@appUtil/util';
import {getTotalsItem} from '@appUtil/math';

export const validateAdjustmentDetailsReducer: ActionReducer<ValidateAdjustmentDetailsState> = createReducer(
  initialValidateAdjustmentDetailsState(),
  on(
    validateAdjustmentDetailActions.FETCH_PURCHASE_ORDER_SUCCESS,
    (state: ValidateAdjustmentDetailsState, {data}): ValidateAdjustmentDetailsState => ({
      ...state,
      orders: data,
    }),
  ),
  on(
    validateAdjustmentDetailActions.SET_PURCHASE_ORDER_BACKUP,
    (state: ValidateAdjustmentDetailsState): ValidateAdjustmentDetailsState => ({
      ...state,
      orders: {
        ...state.orders,
        Results: _map(state.orders.Results, (o: IOrder) => {
          if (o.IdPPPedido === state.orderSelected.IdPPPedido) {
            return {...state.orderSelected};
          }
          return {...o};
        }),
      },
    }),
  ),
  on(
    validateAdjustmentDetailActions.SET_PURCHASE_ORDER_SELECTED,
    (state: ValidateAdjustmentDetailsState, {order}): ValidateAdjustmentDetailsState => ({
      ...state,
      orderSelected:
        order.IdPPPedido === state.orderSelected?.IdPPPedido ? state?.orderSelected : order,
    }),
  ),
  on(
    validateAdjustmentDetailActions.FETCH_MAIL_PURCHASE_SUCCESS,
    (state: ValidateAdjustmentDetailsState, {mail}): ValidateAdjustmentDetailsState => ({
      ...state,
      orderSelected: {
        ...state.orderSelected,
        mailData: mail,
      },
    }),
  ),
  on(
    validateAdjustmentDetailActions.FETCH_COMPLETE_DATA_SUCCESS,
    (state: ValidateAdjustmentDetailsState, {user}): ValidateAdjustmentDetailsState => ({
      ...state,
      orderSelected: {
        ...state.orderSelected,
        user,
      },
    }),
  ),
  on(
    validateAdjustmentDetailActions.FETCH_MAIL_PP_ORDER_DETAILS_SUCCESS,
    (state: ValidateAdjustmentDetailsState, {itemsOrder}): ValidateAdjustmentDetailsState => ({
      ...state,
      orderSelected: {
        ...state.orderSelected,
        itemsOrderSelected: itemsOrder,
      },
      apiStatusOrderList: API_REQUEST_STATUS_SUCCEEDED,
      apisStatusIssueAndItemsOrder: API_REQUEST_STATUS_SUCCEEDED,
    }),
  ),
  on(
    validateAdjustmentDetailActions.UPDATE_ORDER_DETAILS,
    (state: ValidateAdjustmentDetailsState, {order}) => ({
      ...state,
      orders: {
        ...state.orders,
        Results: _map(state.orders.Results, (o: IOrder) => {
          if (o.IdPPPedido === order.IdPPPedido) {
            return {
              ...o,
              needsToReload: false,
            };
          }
          return {
            ...o,
          };
        }),
      },
      orderSelected: {
        ...state.orderSelected,
        IdCatMonedaTemp: state.orderSelected.IdCatMoneda,
        needsToReload: false,
      },
    }),
  ),
  // on(
  //   validateAdjustmentDetailActions.SET_OPTION_KEYPAD,
  //   (state: ValidateAdjustmentDetailsState, {option}): ValidateAdjustmentDetailsState => ({
  //     ...state,
  //     keyPadSelected: option,
  //   }),
  // ),
  on(
    validateAdjustmentDetailActions.SET_ORDER_LIST,
    (state: ValidateAdjustmentDetailsState, {typeOrder}): ValidateAdjustmentDetailsState => ({
      ...state,
      filterSelected: typeOrder,
    }),
  ),
  on(
    validateAdjustmentDetailActions.SET_SEARCH_TERM,
    (state: ValidateAdjustmentDetailsState, {term}): ValidateAdjustmentDetailsState => ({
      ...state,
      searchTerm: term,
    }),
  ),
  on(
    validateAdjustmentDetailActions.SET_OPEN_VIEW_FILE,
    (state: ValidateAdjustmentDetailsState, {active}): ValidateAdjustmentDetailsState => ({
      ...state,
      openViewFile: active,
    }),
  ),
  on(
    validateAdjustmentDetailActions.VIEW_FILE_SUCCESS,
    (state: ValidateAdjustmentDetailsState, {fileBase64}): ValidateAdjustmentDetailsState => ({
      ...state,
      fileBase64,
    }),
  ),
  on(
    validateAdjustmentDetailActions.SET_VALIDATE_ENTRY_ITEM,
    (
      state: ValidateAdjustmentDetailsState,
      {IdPPPartidaPedido, value},
    ): ValidateAdjustmentDetailsState => ({
      ...state,
      orderSelected: {
        ...state.orderSelected,
        itemsOrderSelected: _map(
          state.orderSelected.itemsOrderSelected,
          (o: IPpPartidaPedidoDetalleValidateAdjustment) => {
            if (o.IdPPPartidaPedido === IdPPPartidaPedido) {
              return {
                ...o,
                Tramitada: value,
                Validada: value,
                hasInheritIncidences: !value,
              };
            } else {
              return {...o};
            }
          },
        ),
      },
    }),
  ),
  on(
    validateAdjustmentDetailActions.UPDATE_ITEM_SELECTED,
    (state: ValidateAdjustmentDetailsState, {entry}): ValidateAdjustmentDetailsState => ({
      ...state,
      orderSelected: {
        ...state.orderSelected,
        itemsOrderSelected: _map(
          state.orderSelected.itemsOrderSelected,
          (o: IPpPartidaPedidoDetalleValidateAdjustment) => {
            if (o?.IdPPPartidaPedido === entry?.IdPPPartidaPedido) {
              return {
                ...entry,
                Subtotal: getTotalsItem(
                  OptionsGetTotals.subtotal,
                  entry?.NumeroDePiezas,
                  entry?.PrecioUnitario,
                  entry?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.CotProductoOferta
                    ?.GravaIVA,
                  entry?.cotPartidaCotizacionDetalle?.vProducto?.PorcentajeIVA,
                  entry?.PrecioFleteNoDesglosado,
                ),
                IVA: getTotalsItem(
                  OptionsGetTotals.iva,
                  entry?.NumeroDePiezas,
                  entry?.PrecioUnitario,
                  entry?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.CotProductoOferta
                    ?.GravaIVA,
                  entry?.cotPartidaCotizacionDetalle?.vProducto?.PorcentajeIVA,
                  entry?.PrecioFleteNoDesglosado,
                ),
                Total: getTotalsItem(
                  OptionsGetTotals.total,
                  entry?.NumeroDePiezas,
                  entry?.PrecioUnitario,
                  entry?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.CotProductoOferta
                    ?.GravaIVA,
                  entry?.cotPartidaCotizacionDetalle?.vProducto?.PorcentajeIVA,
                  entry?.PrecioFleteNoDesglosado,
                ),
                isNegative:
                  entry.PrecioUnitario <
                  entry?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.CotProductoOferta
                    ?.PrecioListaUSD,
                percentage: Math.abs(
                  getPercentageAboutPriceList(
                    state?.orderSelected?.catMoneda.ClaveMoneda,
                    entry.PrecioUnitario,
                    state?.orderSelected.TipoCambioUSD,
                    entry?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.CotProductoOferta
                      ?.PrecioListaUSD,
                  ),
                ),
              };
            }
            return {
              ...o,
            };
          },
        ),
      },
    }),
  ),
  on(
    validateAdjustmentDetailActions.SET_INPUT_IS_OPEN,
    (state: ValidateAdjustmentDetailsState, {idQuoted, field}): ValidateAdjustmentDetailsState => ({
      ...state,
      orderSelected: {
        ...state.orderSelected,
        itemsOrderSelected: _map(
          state.orderSelected.itemsOrderSelected,
          (o: IPpPartidaPedidoDetalleValidateAdjustment) => {
            if (
              idQuoted ===
              o?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
                ?.IdCotPartidaCotizacion
            ) {
              return {
                ...o,
                priceInputIsOpen: field === 'priceInputIsOpen',
                quantityInputIsOpen: field === 'quantityInputIsOpen',
              };
            }
            return {
              ...o,
              priceInputIsOpen: false,
              quantityInputIsOpen: false,
            };
          },
        ),
      },
    }),
  ),
  on(
    validateAdjustmentDetailActions.SET_INPUT_IS_CLOSE,
    (state: ValidateAdjustmentDetailsState): ValidateAdjustmentDetailsState => ({
      ...state,
      orderSelected: {
        ...state.orderSelected,
        itemsOrderSelected: _map(
          state.orderSelected.itemsOrderSelected,
          (o: IPpPartidaPedidoDetalleValidateAdjustment) => ({
            ...o,
            priceInputIsOpen: false,
            quantityInputIsOpen: false,
          }),
        ),
      },
    }),
  ),
  on(
    validateAdjustmentDetailActions.SET_INCIDENCE_VALUE,
    (
      state: ValidateAdjustmentDetailsState,
      {entryId, field, value},
    ): ValidateAdjustmentDetailsState => ({
      ...state,
      orderSelected: {
        ...state.orderSelected,
        itemsOrderSelected: _map(
          state.orderSelected.itemsOrderSelected,
          (o: IPpPartidaPedidoDetalleValidateAdjustment) => {
            if (o.IdPPPartidaPedido === entryId) {
              return {
                ...o,
                ppIncidenciaPartida: {
                  ...o.ppIncidenciaPartida,
                  [field]: value,
                },
              };
            }
            return {...o};
          },
        ),
      },
    }),
  ),
  on(
    validateAdjustmentDetailActions.CLEAN_DETAILS,
    (state: ValidateAdjustmentDetailsState): ValidateAdjustmentDetailsState =>
      initialValidateAdjustmentDetailsState(),
  ),
  on(
    validateAdjustmentDetailActions.SET_DATA_VALIDATE,
    (
      state: ValidateAdjustmentDetailsState,
      {value, typeValidate},
    ): ValidateAdjustmentDetailsState => ({
      ...state,
      orderSelected: {
        ...state.orderSelected,
        ppPedidoConfiguracion: {
          ...state.orderSelected.ppPedidoConfiguracion,
          EmpresaValidada:
            typeValidate === 'whoBills'
              ? value
              : state.orderSelected.ppPedidoConfiguracion.EmpresaValidada,
          CondicionesDePagoValidado:
            typeValidate === 'paymentConditions'
              ? value
              : state.orderSelected.ppPedidoConfiguracion.CondicionesDePagoValidado,
          RazonSocialValidado:
            typeValidate === 'businessName'
              ? value
              : state.orderSelected.ppPedidoConfiguracion.RazonSocialValidado,
          DireccionClienteEntregaValidado:
            typeValidate === 'deliveryAddress'
              ? value
              : state.orderSelected.ppPedidoConfiguracion.DireccionClienteEntregaValidado,
          oCSinIrregularidades:
            typeValidate === 'irregularities'
              ? value
              : state.orderSelected.ppPedidoConfiguracion.oCSinIrregularidades,
        },
      },
    }),
  ),
  on(
    validateAdjustmentDetailActions.SET_CUSTOMER_VALIDATE_ADJUSTMENT_SUCCESS,
    (state: ValidateAdjustmentDetailsState, {customer}): ValidateAdjustmentDetailsState => ({
      ...state,
      customerSelected: customer,
    }),
  ),
  on(
    validateAdjustmentDetailActions.SET_CUSTOMER_VALIDATE_ADJUSTMENT_SUCCESS,
    validateAdjustmentDetailActions.SET_ORDER_LIST,
    validateAdjustmentDetailActions.SET_SEARCH_TERM,
    validateAdjustmentDetailActions.FETCH_PURCHASE_ORDER_LOAD,
    (state: ValidateAdjustmentDetailsState): ValidateAdjustmentDetailsState => ({
      ...state,
      orders: {} as IPurchase,
      orderSelected: {} as IOrder,
      openViewFile: false,
      fileBase64: null,
      apisStatusIssueAndItemsOrder: API_REQUEST_STATUS_LOADING,
      apiStatusOrderList: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(
    validateAdjustmentDetailActions.WITHOUT_ORDERS_RESULT,
    (state: ValidateAdjustmentDetailsState): ValidateAdjustmentDetailsState => ({
      ...state,
      apisStatusIssueAndItemsOrder: API_REQUEST_STATUS_SUCCEEDED,
      apiStatusOrderList: API_REQUEST_STATUS_SUCCEEDED,
    }),
  ),
  on(
    validateAdjustmentDetailActions.FETCH_MAIL_PP_ORDER_DETAILS_FAILED,
    (state): ValidateAdjustmentDetailsState => ({
      ...state,
      apisStatusIssueAndItemsOrder: API_REQUEST_STATUS_FAILED,
      apiStatusOrderList: API_REQUEST_STATUS_FAILED,
    }),
  ),
  on(
    validateAdjustmentDetailActions.GET_DELIVERY_ADDRESSES_SUCCESS,
    (state, {deliveryAddresses}) => ({
      ...state,
      deliveryAddresses,
    }),
  ),
  on(validateAdjustmentDetailActions.SELECT_DELIVERY_ADDRESS, (state, {deliveryAddress}) => ({
    ...state,
    orderSelected: {
      ...state.orderSelected,
      DireccionEntrega: deliveryAddress,
      ppPedidoConfiguracion: {
        ...state.orderSelected.ppPedidoConfiguracion,
        IdDireccionClienteEntrega: deliveryAddress.IdDireccionCliente,
      },
    },
    deliveryAddressSelected: deliveryAddress,
  })),
  on(validateAdjustmentDetailActions.PROCESS_ENTRIES_LOAD, (state) => {
    return {
      ...state,
      orderSelected: {
        ...state.orderSelected,
        itemsOrderSelected: _map(
          state.orderSelected.itemsOrderSelected,
          (order: IPpPartidaPedidoDetalleValidateAdjustment) => {
            if (!order?.hasInheritIncidences) {
              return {
                ...order,
                ppIncidenciaPartida: {...initialPPIncidenceItemValidateAdjustment()},
              };
            } else {
              return {...order};
            }
          },
        ),
      },
    };
  }),
  on(
    validateAdjustmentDetailActions.SET_UPDATE_REFERENCE_SUCCESS,
    (state: ValidateAdjustmentDetailsState, {reference}): ValidateAdjustmentDetailsState => ({
      ...state,
      orders: {
        ...state.orders,
        Results: _map(
          state.orders.Results,
          (o: IOrder): IOrder => {
            if (o.IdPPPedido === state.orderSelected.IdPPPedido) {
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
        ...state.orderSelected,
        OrdenDeCompra: reference,
      },
    }),
  ),
);
