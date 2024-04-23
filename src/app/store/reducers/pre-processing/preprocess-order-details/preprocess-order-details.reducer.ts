import {
  initialPreprocessOrderDetails,
  IOrder,
  IPreprocessOrderDetails,
  IPurchaseOrders,
} from '@appModels/store/pre-processing/preprocess-order-details/preprocess-order-details.models';
import {createReducer, on} from '@ngrx/store';
// Actions
import {
  addItemsQuoteActions,
  preProcessDetailsActions,
  preProcessingActions,
  quotedItemActions,
} from '@appActions/pre-processing';
import {filter, findIndex, map as _map} from 'lodash-es';

import {
  initialPpIncidenceQuote,
  IPpPartidaPedidoDetallePretamitar,
} from '@appModels/store/pre-processing/preprocess-order-details/sections/quoted-items/quoted-items.models';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  OptionsGetTotals,
} from '@appUtil/common.protocols';
import {
  initialIAddPurchaseOrderItems,
  IQuoted,
  IQuoteItem,
} from '@appModels/store/pre-processing/preprocess-order-details/sections/add-purchase-order-items/add-purchase-order-items.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {getPercentageAboutPriceList} from '@appUtil/util';
import {buildPpPartidaPedidoAddendaSanofi} from '@appHelpers/pendings/purchase-proomise/purchase-promise-detail/purchase-promise-detail.helper';
import {getTotalsItem} from '@appUtil/math';

export const preProcessOrderDetailReducer = createReducer(
  initialPreprocessOrderDetails(),
  on(
    preProcessDetailsActions.INITIAL_PREPROCESS_ORDER,
    (state: IPreprocessOrderDetails): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderList: initialPreprocessOrderDetails().purchaseOrderList,
      clientSelected: null,
      purchaseOrderSelected: {} as IOrder,
    }),
  ),
  on(
    preProcessingActions.SET_INITIAL_STATE,
    (state: IPreprocessOrderDetails): IPreprocessOrderDetails => initialPreprocessOrderDetails(),
  ),
  on(
    preProcessDetailsActions.SET_PURCHASE_ORDER_BACKUP,
    (state: IPreprocessOrderDetails, {selectedOrder}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderList: {
        ...state.purchaseOrderList,
        Results: _map(state.purchaseOrderList.Results, (o: IOrder) => {
          if (o.IdPPPedido === selectedOrder.IdPPPedido) {
            return {
              ...selectedOrder,
              needsToReload: false,
            };
          }
          return {
            ...o,
          };
        }),
      },
    }),
  ),
  //DOCS: SUB-DASHBOARD DE ORDENES DE COMPRA
  on(
    preProcessDetailsActions.SET_ORDER_LIST,
    preProcessDetailsActions.SET_OPTION_KEYPAD,
    preProcessDetailsActions.SET_SEARCH_TERM,
    (state: IPreprocessOrderDetails): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderList: {} as IPurchaseOrders,
      purchaseOrderSelected: {} as IOrder,
      indexOrder: 0,
      statusApiListOrders: API_REQUEST_STATUS_LOADING,
      entriesApiStatus: API_REQUEST_STATUS_LOADING,
      addItemsSection: initialIAddPurchaseOrderItems(),
    }),
  ),
  on(
    preProcessDetailsActions.SET_ORDER_LIST,
    (state: IPreprocessOrderDetails, {typeOrder}): IPreprocessOrderDetails => ({
      ...state,
      filterSelected: typeOrder,
    }),
  ),
  on(
    preProcessDetailsActions.SET_OPTION_KEYPAD,
    (state: IPreprocessOrderDetails, {option}): IPreprocessOrderDetails => ({
      ...state,
      keyPadSelected: option,
    }),
  ),
  on(
    preProcessDetailsActions.SET_SEARCH_TERM,
    (state: IPreprocessOrderDetails, {term}): IPreprocessOrderDetails => ({
      ...state,
      termSearch: term,
    }),
  ),
  on(
    preProcessDetailsActions.SET_STATUS_API,
    (state: IPreprocessOrderDetails, {status}): IPreprocessOrderDetails => ({
      ...state,
      statusApiListOrders: status,
    }),
  ),
  on(
    preProcessDetailsActions.FETCH_PURCHASE_ORDER_ERROR,
    (state: IPreprocessOrderDetails): IPreprocessOrderDetails => ({
      ...state,
      statusApiListOrders: API_REQUEST_STATUS_FAILED,
      entriesApiStatus: API_REQUEST_STATUS_FAILED,
    }),
  ),
  //DOCS: POP UP PRODUCTOS CONTROLADOS
  on(preProcessDetailsActions.ITEMS_CONTROLLED_IN_ORDER_SELECTED, (state) => ({
    ...state,
    isOpenPopUpProductControlled: true,
  })),
  on(preProcessDetailsActions.CLOSE_POP_UP_ITEMS_CONTROLLED, (state) => ({
    ...state,
    isOpenPopUpProductControlled: false,
  })),
  //DOCS: OBTENER LAS PARTIDAS DEL CLIENTE SELECCIONADO
  on(
    preProcessDetailsActions.FETCH_ITEMS_ORDER_SELECTED_SUCCESS,
    (state: IPreprocessOrderDetails, {itemsOrder}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderList: {
        ...state.purchaseOrderList,
        Results: _map(state.purchaseOrderList.Results, (o: IOrder) => {
          if (o.IdPPPedido === itemsOrder.Results[0]?.IdPPPedido) {
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
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        itemsOrder: itemsOrder.Results,
        needsToReload: false,
      },

      entriesApiStatus: API_REQUEST_STATUS_SUCCEEDED,
    }),
  ),
  on(
    preProcessDetailsActions.FETCH_ITEMS_ORDER_SELECTED_FAILED,
    (state: IPreprocessOrderDetails): IPreprocessOrderDetails => ({
      ...state,
      entriesApiStatus: API_REQUEST_STATUS_FAILED,
    }),
  ),
  //DOCS: ORDEN DE COMPRA SELECCIONADA
  on(
    preProcessDetailsActions.SET_PURCHASE_ORDER_SELECTED,
    (state: IPreprocessOrderDetails, {item, index}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: item,
      searchItemsByCatalog: '',
      indexOrder: index,
    }),
  ),
  on(
    preProcessDetailsActions.RESTORE_PURCHASE_ORDER_BACKUP,
    (state: IPreprocessOrderDetails, {selected}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: selected,
    }),
  ),
  on(
    preProcessDetailsActions.UPDATE_QUOTE_ITEMS_LIST,
    (
      state: IPreprocessOrderDetails,
      {IdPPPartidaPedido, linkedQuotes},
    ): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        itemsOrder: _map(state.purchaseOrderSelected.itemsOrder, (o) => {
          if (o.IdPPPartidaPedido === IdPPPartidaPedido) {
            return {
              ...o,
              isInViewQuotesLinked: true,
              quotesLinked: linkedQuotes,
              needsToReloadLinkeds: false,
            };
          } else {
            return {...o, isInViewQuotesLinked: false};
          }
        }),
      },
    }),
  ),
  on(
    preProcessDetailsActions.UPDATE_QUOTE_ITEMS_LIST,
    (
      state: IPreprocessOrderDetails,
      {IdPPPartidaPedido, linkedQuotes},
    ): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        itemsOrder: _map(state.purchaseOrderSelected.itemsOrder, (o) => {
          if (o.IdPPPartidaPedido === IdPPPartidaPedido) {
            return {
              ...o,
              isInViewQuotesLinked: true,
              quotesLinked: linkedQuotes,
              needsToReloadLinkeds: false,
            };
          } else {
            return {...o, isInViewQuotesLinked: false};
          }
        }),
      },
    }),
  ),

  on(
    preProcessDetailsActions.SET_VALIDATE_ENTRY_ITEM,
    (state: IPreprocessOrderDetails, {idQuote, value}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        itemsOrder: _map(
          state.purchaseOrderSelected.itemsOrder,
          (o: IPpPartidaPedidoDetallePretamitar) => {
            if (
              idQuote &&
              o?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
                ?.IdCotPartidaCotizacion === idQuote
            ) {
              return {
                ...o,
                Validada: value,
                Tramitada: value,
                hasInheritIncidences: !value,
              };
            }
            return {...o};
          },
        ),
      },
    }),
  ),
  on(
    preProcessDetailsActions.UPDATE_ITEM_SELECTED,
    (state: IPreprocessOrderDetails, {entry}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        itemsOrder: _map(
          state.purchaseOrderSelected.itemsOrder,
          (o: IPpPartidaPedidoDetallePretamitar) => {
            //FIXME: CORREGIR EL IVA .16 ESTATICO CUANDO SE TENGA EL NUEVO MODELO DE BACK
            if (
              o?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
                ?.IdCotPartidaCotizacion ===
              entry?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
                ?.IdCotPartidaCotizacion
            ) {
              return {
                ...entry,
                Subtotal: getTotalsItem(
                  OptionsGetTotals.subtotal,
                  entry?.NumeroDePiezas,
                  entry?.PrecioUnitario,
                  entry?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.CotProductoOferta
                    ?.GravaIVA ?? entry?.cotPartidaCotizacionDetalle?.vProducto?.GravaIVA,
                  entry?.cotPartidaCotizacionDetalle?.vProducto?.PorcentajeIVA,
                  entry?.PrecioFleteNoDesglosado,
                ),
                IVA: getTotalsItem(
                  OptionsGetTotals.iva,
                  entry?.NumeroDePiezas,
                  entry?.PrecioUnitario,
                  entry?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.CotProductoOferta
                    ?.GravaIVA ?? entry?.cotPartidaCotizacionDetalle?.vProducto?.GravaIVA,
                  entry?.cotPartidaCotizacionDetalle?.vProducto?.PorcentajeIVA,
                  entry?.PrecioFleteNoDesglosado,
                ),
                Total: getTotalsItem(
                  OptionsGetTotals.total,
                  entry?.NumeroDePiezas,
                  entry?.PrecioUnitario,
                  entry?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.CotProductoOferta
                    ?.GravaIVA ?? entry?.cotPartidaCotizacionDetalle?.vProducto?.GravaIVA,
                  entry?.cotPartidaCotizacionDetalle?.vProducto?.PorcentajeIVA,
                  entry?.PrecioFleteNoDesglosado,
                ),
                isNegative:
                  entry.PrecioUnitario <
                  entry?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.CotProductoOferta
                    ?.PrecioListaUSD,
                percentage: Math.abs(
                  getPercentageAboutPriceList(
                    state?.purchaseOrderSelected?.catMoneda.ClaveMoneda,
                    entry.PrecioUnitario,
                    state?.purchaseOrderSelected.TipoCambioUSD,
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
    preProcessDetailsActions.DELETE_ITEM_IN_ORDER,
    preProcessDetailsActions.REVERT_DELETE_ITEM_IN_ORDER,
    (state: IPreprocessOrderDetails, {entry}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        itemsOrder: _map(
          state.purchaseOrderSelected.itemsOrder,
          (o: IPpPartidaPedidoDetallePretamitar) => {
            if (
              o?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
                ?.IdCotPartidaCotizacion ===
              entry?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
                ?.IdCotPartidaCotizacion
            ) {
              return {
                ...o,
                Activo: !o.Activo,
                Validada: null,
                ppIncidenciaPartida: initialPpIncidenceQuote(),
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
    preProcessDetailsActions.SET_INPUT_IS_OPEN,
    (state: IPreprocessOrderDetails, {idQuote, field}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        itemsOrder: _map(
          state.purchaseOrderSelected.itemsOrder,
          (o: IPpPartidaPedidoDetallePretamitar) => {
            if (
              o?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
                ?.IdCotPartidaCotizacion === idQuote
            ) {
              return {
                ...o,
                priceInputIsOpen: field === 'priceInputIsOpen',
                quantityInputIsOpen: field === 'quantityInputIsOpen',
                deliveryRestrictionsInputIsOpen: field === 'deliveryRestrictionsInputIsOpen',
              };
            }
            return {
              ...o,
              priceInputIsOpen: false,
              quantityInputIsOpen: false,
              deliveryRestrictionsInputIsOpen: false,
            };
          },
        ),
      },
    }),
  ),
  on(
    preProcessDetailsActions.SET_INPUT_IS_CLOSE,
    (state: IPreprocessOrderDetails): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        itemsOrder: _map(
          state.purchaseOrderSelected.itemsOrder,
          (o: IPpPartidaPedidoDetallePretamitar) => ({
            ...o,
            priceInputIsOpen: false,
            quantityInputIsOpen: false,
            deliveryRestrictionsInputIsOpen: false,
          }),
        ),
      },
    }),
  ),
  on(
    preProcessDetailsActions.FETCH_ITEMS_ORDER_SELECTED_LOAD,
    (state: IPreprocessOrderDetails): IPreprocessOrderDetails => ({
      ...state,
      entriesApiStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(
    preProcessDetailsActions.SET_ENTRY_NEEDS_TO_RELOAD,
    (state: IPreprocessOrderDetails, {needsToReload}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        needsToReload,
      },
    }),
  ),

  //DOCS: OBTENER DATOS DEL ESAC
  on(
    preProcessDetailsActions.FETCH_COMPLETE_DATA_ESAC_SUCCESS,
    (state: IPreprocessOrderDetails, {idPPPedido, user}) => ({
      ...state,
      purchaseOrderList: {
        ...state.purchaseOrderList,
        Results: _map(state.purchaseOrderList.Results, (order) => {
          if (order.IdPPPedido === idPPPedido) {
            return {...order, user};
          }
          return order;
        }),
      },
    }),
  ),
  //DOCS: POP UP "VER PARTIDA" (TEE)

  on(
    preProcessDetailsActions.SET_DATA_ITEM_ORDER_SELECTED,
    (state: IPreprocessOrderDetails): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        itemsOrder: _map(
          state.purchaseOrderSelected.itemsOrder,
          (o: IPpPartidaPedidoDetallePretamitar) => {
            if (
              o.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
                ?.IdCotPartidaCotizacion ===
              state.purchaseOrderSelected?.itemOrderSelected?.cotPartidaCotizacionDetalle
                ?.gMCotPartidasDetalle?.VPartidaCotizacion?.IdCotPartidaCotizacion
            ) {
              return {
                ...state.purchaseOrderSelected.itemOrderSelected,
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
  on(preProcessDetailsActions.FETCH_NON_WORKING_DAYS_SUCCESS, (state, {nonWorkingDays}) => ({
    ...state,
    isOpenPopUpTeeItemOrder: true,
    purchaseOrderSelected: {
      ...state.purchaseOrderSelected,
      itemOrderSelected: {
        ...state.purchaseOrderSelected.itemOrderSelected,
        nonWorkingDays,
      },
    },
  })),
  on(
    preProcessDetailsActions.SET_OPEN_POP_UP_TEE_ITEM_ORDER,
    (state: IPreprocessOrderDetails, {itemOrder}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        itemOrderSelected: itemOrder,
      },
    }),
  ),
  on(
    preProcessDetailsActions.CLOSE_POP_UP_TEE_ITEM_ORDER,
    (state: IPreprocessOrderDetails, {value}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        itemOrderSelected: null,
      },
      isOpenPopUpTeeItemOrder: value,
    }),
  ),
  on(
    preProcessDetailsActions.SET_TEXT_NOTES,
    (state: IPreprocessOrderDetails, {notes}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        itemOrderSelected: {
          ...state.purchaseOrderSelected.itemOrderSelected,
          Notas: notes,
        },
      },
    }),
  ),
  on(
    preProcessDetailsActions.SET_ADDENDA_DATA,
    (state: IPreprocessOrderDetails, {key, data}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        itemOrderSelected: {
          ...state.purchaseOrderSelected.itemOrderSelected,
          ppPartidaPedidoAddendaSanofi: {
            ...buildPpPartidaPedidoAddendaSanofi(
              state.purchaseOrderSelected.itemOrderSelected.ppPartidaPedidoAddendaSanofi,
              key,
              data,
              state.purchaseOrderSelected.itemOrderSelected.IdPPPartidaPedido,
            ),
          },
        },
      },
    }),
  ),
  on(
    preProcessDetailsActions.SET_NUMBER_ORDER,
    (state: IPreprocessOrderDetails, {order}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        itemOrderSelected: {
          ...state.purchaseOrderSelected.itemOrderSelected,
          cotPartidaCotizacionDetalle: {
            ...state.purchaseOrderSelected.itemOrderSelected.cotPartidaCotizacionDetalle,
            gMCotPartidasDetalle: {
              ...state.purchaseOrderSelected.itemOrderSelected.cotPartidaCotizacionDetalle
                .gMCotPartidasDetalle,
              VPartidaCotizacion: {
                ...state.purchaseOrderSelected.itemOrderSelected.cotPartidaCotizacionDetalle
                  .gMCotPartidasDetalle.VPartidaCotizacion,
                Numero: order,
              },
            },
          },
        },
      },
    }),
  ),
  //TODO:COLOCAR LA FECHA QUE CORRESPONDE, PREGUNTAR A BACK
  on(
    preProcessDetailsActions.SET_POP_ITEM_DATE_ESTIMATED_FEE,
    (state: IPreprocessOrderDetails, {date, dateString}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        itemOrderSelected: {
          ...state.purchaseOrderSelected.itemOrderSelected,
          FechaEstimadaEntrega: dateString,
        },
      },
    }),
  ),
  on(
    preProcessDetailsActions.SET_VALUE_CHECK_BOX_POP_UP_TEE,
    (state: IPreprocessOrderDetails, {value}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        itemOrderSelected: {
          ...state.purchaseOrderSelected.itemOrderSelected,
          Programada: value,
          FechaEstimadaEntrega: value
            ? state.purchaseOrderSelected.itemOrderSelected.FechaEstimadaEntrega || null
            : null,
        },
      },
    }),
  ),
  //DOCS:OBTENER ORDENES DE COMPRA
  on(
    preProcessDetailsActions.FETCH_PURCHASE_ORDER_SUCCESS,
    (state: IPreprocessOrderDetails, {data}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderList: data,
      statusApiListOrders: API_REQUEST_STATUS_SUCCEEDED,
      entriesApiStatus: API_REQUEST_STATUS_SUCCEEDED,
    }),
  ),

  //DOCS: OBTENER LOS DETALLES DEL REQUERIMIENTO
  on(
    preProcessDetailsActions.FETCH_MAIL_PURCHASE_SUCCESS,
    (state: IPreprocessOrderDetails, {mail, idPPedido}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        mailData: mail,
      },
    }),
  ),

  //DOCS: AGREGAR UNA NUEVA PARTIDA
  on(
    preProcessDetailsActions.SET_IS_IN_ADD_ITEM,
    (state: IPreprocessOrderDetails, {isInAddItem}): IPreprocessOrderDetails => ({
      ...state,
      isInAddItem,
    }),
  ),
  //DOCS: SELECCIONAR UN CLIENTE DEL DASHBOARD
  on(
    preProcessDetailsActions.SET_CLIENT_SELECTED_SUCCESS,
    (state: IPreprocessOrderDetails, {customer}): IPreprocessOrderDetails => ({
      ...state,
      clientSelected: customer,
      statusApiListOrders: API_REQUEST_STATUS_LOADING,
    }),
  ),

  //DOCS: ARCHIVOS
  on(
    preProcessDetailsActions.SET_OPEN_VIEW_FILE,
    (state: IPreprocessOrderDetails, {active}): IPreprocessOrderDetails => ({
      ...state,
      openViewFile: active,
    }),
  ),
  on(
    preProcessDetailsActions.VIEW_FILE_SUCCESS,
    (state: IPreprocessOrderDetails, {fileBase64}): IPreprocessOrderDetails => ({
      ...state,
      fileBase64,
    }),
  ),
  on(
    preProcessDetailsActions.VIEW_FILE_IS_LOADING,
    (state: IPreprocessOrderDetails, {value}): IPreprocessOrderDetails => ({
      ...state,
      viewFileIsLoading: value,
    }),
  ),
  on(
    preProcessDetailsActions.SET_IS_PDF,
    (state: IPreprocessOrderDetails, {value}): IPreprocessOrderDetails => ({
      ...state,
      isPDF: value,
    }),
  ),
  on(
    preProcessDetailsActions.SET_ITEM_LINKED_OPEN,
    (state: IPreprocessOrderDetails, {item}): IPreprocessOrderDetails => ({
      ...state,
      invoice: item,
    }),
  ),

  //TODO ACCIONES DE QuoteItemsAction CODIGO DE VERIFICACIÓn
  // on(
  //   quotedItemActions.GENERATE_VERIFICATION_CODE_SUCCESS,
  //   (state: IPreprocessOrderDetails, {codeRequest}): IPreprocessOrderDetails => ({
  //     ...state,
  //     purchaseOrderSelected: {
  //       ...state.purchaseOrderSelected,
  //       codeRequest,
  //     },
  //   }),
  // ),
  on(
    quotedItemActions.SET_DATA_VALIDATE,
    (state: IPreprocessOrderDetails, {value, typeValidate}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        ppPedidoConfiguracion: {
          ...state.purchaseOrderSelected.ppPedidoConfiguracion,
          EmpresaValidada:
            typeValidate === 'whoBills'
              ? value
              : state.purchaseOrderSelected.ppPedidoConfiguracion.EmpresaValidada,
          CondicionesDePagoValidado:
            typeValidate === 'paymentConditions'
              ? value
              : state.purchaseOrderSelected.ppPedidoConfiguracion.CondicionesDePagoValidado,
          DireccionClienteEntregaValidado:
            typeValidate === 'deliveryAddress'
              ? value
              : state.purchaseOrderSelected.ppPedidoConfiguracion.DireccionClienteEntregaValidado,
          RazonSocialValidado:
            typeValidate === 'businessName'
              ? value
              : state.purchaseOrderSelected.ppPedidoConfiguracion.RazonSocialValidado,
          oCSinIrregularidades:
            typeValidate === 'irregularities'
              ? value
              : state.purchaseOrderSelected.ppPedidoConfiguracion.oCSinIrregularidades,
        },
      },
    }),
  ),
  on(
    quotedItemActions.SET_INCIDENCE_VALUE,
    (state: IPreprocessOrderDetails, {entryId, field, value, index}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        itemsOrder: _map(
          state.purchaseOrderSelected.itemsOrder,
          (o: IPpPartidaPedidoDetallePretamitar, indexItem: number) => {
            if (index === indexItem) {
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

  //TODO: ACTIONS ADD-ITEMS

  //DOCS: OBTENER LAS COTIZACIONES DEL CLIENTE SELECCIONADO
  on(
    addItemsQuoteActions.INITIAL_STATE,
    (state: IPreprocessOrderDetails): IPreprocessOrderDetails => ({
      ...state,
      addItemsSection: initialIAddPurchaseOrderItems(),
    }),
  ),
  on(
    addItemsQuoteActions.FETCH_QUOTES_CLIENT_SUCCESS,
    (state: IPreprocessOrderDetails, {quoteList}): IPreprocessOrderDetails => ({
      ...state,
      addItemsSection: {
        ...state.addItemsSection,
        quoteList,
      },
    }),
  ),
  //DOCS: GUARDAR LA COTIZACIÓN SELECCIONADA
  on(
    addItemsQuoteActions.SET_QUOTED_SELECTED,
    (state: IPreprocessOrderDetails, {item}): IPreprocessOrderDetails => ({
      ...state,
      addItemsSection: {
        ...state.addItemsSection,
        quotedSelected: item,
      },
    }),
  ),
  //DOCS: CARGADOR DE LAS COTIZACIONES

  on(
    addItemsQuoteActions.FETCH_QUOTED_ITEMS_LOAD,
    (state: IPreprocessOrderDetails): IPreprocessOrderDetails => ({
      ...state,
      addItemsSection: {
        ...state.addItemsSection,
        apiStatus: API_REQUEST_STATUS_LOADING,
      },
    }),
  ),

  on(
    addItemsQuoteActions.FETCH_QUOTED_ITEMS_SUCCESS,
    (state: IPreprocessOrderDetails, {items}): IPreprocessOrderDetails => ({
      ...state,
      addItemsSection: {
        ...state.addItemsSection,
        quoteList: _map(state.addItemsSection.quoteList, (item) => {
          if (item.IdCotCotizacion === items[0].IdCotCotizacion) {
            return {...item, items, needsToReloadItems: false};
          }
          return item;
        }),
        itemList: items,
        apiStatus: API_REQUEST_STATUS_SUCCEEDED,
        quotedSelected: {...state.addItemsSection.quotedSelected, items},
      },
    }),
  ),

  on(
    addItemsQuoteActions.ADD_ITEM,
    (state: IPreprocessOrderDetails, {item}): IPreprocessOrderDetails => {
      return {
        ...state,
        addItemsSection: {
          ...state.addItemsSection,
          quotedSelected: {
            ...state.addItemsSection.quotedSelected,
            items: _map(state.addItemsSection.quotedSelected.items, (o: IQuoteItem) => {
              if (
                item?.gMCotPartidasDetalle?.VPartidaCotizacion?.IdCotPartidaCotizacion &&
                o.gMCotPartidasDetalle?.VPartidaCotizacion?.IdCotPartidaCotizacion ===
                  item?.gMCotPartidasDetalle?.VPartidaCotizacion?.IdCotPartidaCotizacion
              ) {
                return {
                  ...o,
                  isSelected: true,
                };
              } else {
                return {...o};
              }
            }),
          },
          itemList: _map(state.addItemsSection.itemList, (o: IQuoteItem) => {
            if (
              item?.gMCotPartidasDetalle?.VPartidaCotizacion?.IdCotPartidaCotizacion &&
              o.gMCotPartidasDetalle?.VPartidaCotizacion?.IdCotPartidaCotizacion ===
                item?.gMCotPartidasDetalle?.VPartidaCotizacion?.IdCotPartidaCotizacion
            ) {
              return {
                ...o,
                isSelected: true,
              };
            }
            return {
              ...o,
            };
          }),
          itemListBackUp: [...state.addItemsSection.itemListBackUp, item],
        },
      };
    },
  ),

  on(
    addItemsQuoteActions.DELETE_ITEM,
    (state: IPreprocessOrderDetails, {item}): IPreprocessOrderDetails => ({
      ...state,
      addItemsSection: {
        ...state.addItemsSection,
        itemListBackUp: filter(state.addItemsSection.itemListBackUp, (o) => {
          if (o.IdCotPartidaCotizacion) {
            return o.IdCotPartidaCotizacion !== item.IdCotPartidaCotizacion;
          } else {
            return o.IdProducto !== item.IdProducto;
          }
        }),
      },
    }),
  ),
  on(
    addItemsQuoteActions.ADD_ITEMS_PURCHASE_ORDER_SUCCESS,
    (state: IPreprocessOrderDetails, {items}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        itemsOrder: [...state.purchaseOrderSelected.itemsOrder, ...items],
      },
      addItemsSection: initialIAddPurchaseOrderItems(),
    }),
  ),
  on(
    addItemsQuoteActions.UPDATE_SELECT_ITEM,
    (state: IPreprocessOrderDetails, {item, value}): IPreprocessOrderDetails => ({
      ...state,
      addItemsSection: {
        ...state.addItemsSection,
        itemList: _map(state.addItemsSection.itemList, (order: IQuoteItem) => {
          if (order.gMCotPartidasDetalle?.VPartidaCotizacion?.IdCotPartidaCotizacion) {
            if (
              order.gMCotPartidasDetalle?.VPartidaCotizacion?.IdCotPartidaCotizacion ===
              item.gMCotPartidasDetalle?.VPartidaCotizacion?.IdCotPartidaCotizacion
            ) {
              return {...order, isSelected: value};
            }
          } else {
            if (order.IdProducto === item.IdProducto) {
              return {...order, isSelected: value};
            }
          }
          return order;
        }),
      },
    }),
  ),
  on(
    addItemsQuoteActions.CHECKED_ALL_ITEMS,
    (state: IPreprocessOrderDetails, {value}): IPreprocessOrderDetails => ({
      ...state,
      addItemsSection: {
        ...state.addItemsSection,
        itemList: _map(state.addItemsSection.itemList, (order: IQuoteItem) => {
          return {
            ...order,
            isSelected: value,
          };
        }),
      },
    }),
  ),
  on(
    addItemsQuoteActions.UPDATE_QUOTE_SELECTED,
    (state: IPreprocessOrderDetails, {idQuoted}): IPreprocessOrderDetails => ({
      ...state,
      addItemsSection: {
        ...state.addItemsSection,
        quotedSelected:
          findIndex(state.addItemsSection.quoteList, (o) => o.IdCotCotizacion === idQuoted) > -1
            ? state.addItemsSection.quoteList[
                findIndex(state.addItemsSection.quoteList, (o) => o.IdCotCotizacion === idQuoted)
              ]
            : ({} as IQuoted),
        quoteList: _map(state.addItemsSection.quoteList, (order) => {
          if (order.IdCotCotizacion === idQuoted) {
            return {...order, isSelected: true};
          }
          return {...order, isSelected: false};
        }),
      },
    }),
  ),
  on(
    addItemsQuoteActions.GET_OPTIONS_OF_PRODUCTS,
    (state: IPreprocessOrderDetails, {searchTerm}): IPreprocessOrderDetails => ({
      ...state,
      addItemsSection: {
        ...state.addItemsSection,
        optionsOfProductsStatus: API_REQUEST_STATUS_LOADING,
        searchTerm,
      },
    }),
  ),
  on(
    addItemsQuoteActions.FETCH_OPTIONS_PRODUCTS_IN_CONTRACT_SUCCESS,
    (state: IPreprocessOrderDetails, {products}): IPreprocessOrderDetails => ({
      ...state,
      addItemsSection: {
        ...state.addItemsSection,
        optionsOfProducts: products,
        optionsOfProductsStatus: API_REQUEST_STATUS_SUCCEEDED,
      },
    }),
  ),
  on(
    addItemsQuoteActions.GET_OPTIONS_OF_PRODUCTS_ERROR,
    (state: IPreprocessOrderDetails): IPreprocessOrderDetails => ({
      ...state,
      addItemsSection: {
        ...state.addItemsSection,
        optionsOfProducts: [],
        optionsOfProductsStatus: API_REQUEST_STATUS_FAILED,
      },
    }),
  ),
  on(
    addItemsQuoteActions.SET_TYPE_FILTER_SEARCH,
    (state: IPreprocessOrderDetails, {filterType}): IPreprocessOrderDetails => ({
      ...state,
      addItemsSection: {
        ...state.addItemsSection,
        searchTypeSelected: filterType,
      },
    }),
  ),
  on(
    addItemsQuoteActions.FETCH_QUOTES_CLIENT_OF_SEARCH,
    (state: IPreprocessOrderDetails, {product, isSearch}): IPreprocessOrderDetails => ({
      ...state,
      addItemsSection: {
        ...state.addItemsSection,
        // isSearch,
        runSearchTerm: product.label,
        productToSearch: product,
        searchTerm: product.label,
        productsQueryInfo: {
          ...state.addItemsSection.productsQueryInfo,
          desiredPage: 1,
        },
      },
    }),
  ),
  on(
    addItemsQuoteActions.SET_RUN_SEARCH_TERM,
    (state: IPreprocessOrderDetails, {searchTerm}): IPreprocessOrderDetails => ({
      ...state,
      addItemsSection: {
        ...state.addItemsSection,
        runSearchTerm: searchTerm,
        optionOfProductSelected: {} as DropListOption,
        productsQueryInfo: {
          ...state.addItemsSection.productsQueryInfo,
          desiredPage: 1,
        },
        apiStatus: API_REQUEST_STATUS_LOADING,
        itemList: [],
      },
    }),
  ),
  on(
    addItemsQuoteActions.SET_ITEM_LIST_IN_CONTRACT_SUCCESS,
    (state: IPreprocessOrderDetails, {items}): IPreprocessOrderDetails => ({
      ...state,
      addItemsSection: {
        ...state.addItemsSection,
        itemList: items,
        apiStatus: API_REQUEST_STATUS_SUCCEEDED,
      },
    }),
  ),
  on(
    addItemsQuoteActions.SET_ITEM_LIST_IN_CONTRACT_FAILED,
    (state: IPreprocessOrderDetails): IPreprocessOrderDetails => ({
      ...state,
      addItemsSection: {
        ...state.addItemsSection,
        itemList: [],
        apiStatus: API_REQUEST_STATUS_FAILED,
      },
    }),
  ),
  on(
    addItemsQuoteActions.FETCH_LIST_QUOTED_ITEMS_SUCCESS,
    (state: IPreprocessOrderDetails, {list}): IPreprocessOrderDetails => ({
      ...state,
      addItemsSection: {
        ...state.addItemsSection,
        itemList: list,
        quoteList: _map(state.addItemsSection.quoteList, (item) => {
          const listItems = filter(list, (o) => {
            return o.IdCotCotizacion === item.IdCotCotizacion;
          });
          return {...item, listItems, isSelected: false};
        }),
      },
    }),
  ),
  on(
    addItemsQuoteActions.UPDATE_ADD_ITEM_LIST,
    (
      state: IPreprocessOrderDetails,
      {IdCotPartidaCotizacion, linkedQuotes},
    ): IPreprocessOrderDetails => ({
      ...state,
      addItemsSection: {
        ...state.addItemsSection,
        itemList: _map(state.addItemsSection.itemList, (o) => {
          if (o.IdCotPartidaCotizacion === IdCotPartidaCotizacion) {
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
        }),
      },
    }),
  ),
  on(
    addItemsQuoteActions.CLEAN_BACKUP,
    (state: IPreprocessOrderDetails): IPreprocessOrderDetails => ({
      ...state,
      addItemsSection: {
        ...state.addItemsSection,
        itemListBackUp: [],
      },
    }),
  ),
  //DOCS:  MONEDA SELECCIONADA  //TODO: VERIFICAR SI PERMANECERÁ O ELIMINARÁ
  on(
    preProcessDetailsActions.SET_SELECTED_TYPE_COINS,
    (state: IPreprocessOrderDetails, {currencyId}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        IdCatMoneda: currencyId,
      },
    }),
  ),
  on(addItemsQuoteActions.FETCH_GM_FREIGHTS_SUCCESS, (state, {freights, IdCotCotizacion}) => ({
    ...state,
    addItemsSection: {
      ...state.addItemsSection,
      quoteList: _map(state.addItemsSection.quoteList, (quote: IQuoted) => {
        if (quote.IdCotCotizacion === IdCotCotizacion) {
          return {
            ...quote,
            freightsQuote: freights,
          };
        }
        return quote;
      }),
      quotedSelected: {
        ...state.addItemsSection.quotedSelected,
        freightsQuote: freights,
      },
    },
  })),
  on(
    preProcessDetailsActions.GET_DELIVERY_ADDRESSES_SUCCESS,
    (state, {deliveryAddresses}): IPreprocessOrderDetails => ({
      ...state,
      deliveryAddresses,
    }),
  ),
  on(
    preProcessDetailsActions.SELECT_DELIVERY_ADDRESS,
    (state, {address}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        DireccionEntrega: address,
        ppPedidoConfiguracion: {
          ...state.purchaseOrderSelected.ppPedidoConfiguracion,
          IdDireccionClienteEntrega: address.IdDireccionCliente,
        },
      },
    }),
  ),
  on(
    preProcessDetailsActions.SET_UPDATE_REFERENCE_SUCCESS,
    (state: IPreprocessOrderDetails, {reference}): IPreprocessOrderDetails => ({
      ...state,
      purchaseOrderList: {
        ...state.purchaseOrderList,
        Results: _map(
          state.purchaseOrderList.Results,
          (o: IOrder): IOrder => {
            if (o.IdPPPedido === state.purchaseOrderSelected.IdPPPedido) {
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
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        OrdenDeCompra: reference,
      },
    }),
  ),
  on(
    preProcessDetailsActions.SEARCH_ITEMS_BY_CATALOG,
    (state: IPreprocessOrderDetails, {catalog}): IPreprocessOrderDetails => ({
      ...state,
      searchItemsByCatalog: catalog,
    }),
  ),
);
