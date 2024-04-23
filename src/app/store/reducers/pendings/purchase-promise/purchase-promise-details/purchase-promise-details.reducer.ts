/* Store Imports */
import {createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  initialPurchasePromiseDetailsState,
  IPurchasePromiseDetailsState,
  IPurchasePromiseOrder,
  IPurchasePromiseQuotation,
  IQuoteItem,
  IQuoteSummaryItem,
} from '@appModels/store/pendings/purchase-promise/purchase-promise-details/purchase-promise-details.models';
import {GMPartidaPromesaDeCompra, GMPretramitarPromesaDeCompra} from 'api-logistica';

/* Actions Imports */
import {purchasePromiseDetailsActions} from '@appActions/pendings/purchase-promise';

/* Common Imports */
import {API_REQUEST_STATUS_SUCCEEDED} from '@appUtil/common.protocols';

/* Utils Imports */
import {filter, find, isEmpty, map} from 'lodash-es';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  buildGMPartidaPromesaDeCompra,
  buildPpPartidaPedidoAddendaSanofi,
  insertFleteExpres,
  insertFleteUtilmaMilla,
} from '@appHelpers/pendings/purchase-proomise/purchase-promise-detail/purchase-promise-detail.helper';
import {QuoteItemExtension} from '@appModels/purchase-promise/QuoteItemExtension';
import {calculateEstimatedDeliveryDate, currentDateWithoutHoursUTCFormatDate} from '@appUtil/dates';

export const purchasePromiseDetailsReducer = createReducer(
  initialPurchasePromiseDetailsState(),
  on(
    purchasePromiseDetailsActions.CLEAN_ALL_DETAILS_STATE,
    (state: IPurchasePromiseDetailsState): IPurchasePromiseDetailsState =>
      initialPurchasePromiseDetailsState(),
  ),
  on(
    purchasePromiseDetailsActions.SET_SELECTED_OC_BURGER_OPTION,
    (
      state: IPurchasePromiseDetailsState,
      {selectedOption, field, reloadStates},
    ): IPurchasePromiseDetailsState => ({
      ...state,
      [field]: selectedOption,
      queryInfo: {
        ...state.queryInfo,
        desiredPage: 1,
        reloadStates: reloadStates,
      },
    }),
  ),
  on(
    purchasePromiseDetailsActions.SET_OC_SEARCH_TERM,
    (
      state: IPurchasePromiseDetailsState,
      {ocSearchTerm, reloadStates},
    ): IPurchasePromiseDetailsState => ({
      ...state,
      ocSearchTerm,
      queryInfo: {
        ...state.queryInfo,
        desiredPage: 1,
        reloadStates: reloadStates,
      },
    }),
  ),
  on(
    purchasePromiseDetailsActions.SET_SELECTED_QUOTE_SEARCH_OPTION,
    (
      state: IPurchasePromiseDetailsState,
      {selectedPurchaseSearchOption},
    ): IPurchasePromiseDetailsState => ({
      ...state,
      selectedPurchaseSearchOption,
    }),
  ),
  on(
    purchasePromiseDetailsActions.SET_QUOTE_SEARCH_TERM,
    (state: IPurchasePromiseDetailsState, {purchaseSearchTerm}): IPurchasePromiseDetailsState => ({
      ...state,
      purchaseSearchTerm,
    }),
  ),
  on(
    purchasePromiseDetailsActions.SET_SEE_RESUME_ACTIVE,
    (state: IPurchasePromiseDetailsState, {seeResumeActive}): IPurchasePromiseDetailsState => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        seeResumeActive: seeResumeActive,
      },
    }),
  ),
  on(purchasePromiseDetailsActions.SET_CUSTOMER_SELECTED_SUCCESS, (state, {customer}) => ({
    ...state,
    selectedClient: customer,
    queryInfo: {...state.queryInfo, desiredPage: 1},
  })),
  on(purchasePromiseDetailsActions.CLOSE_SALE_WITH_OC_SUCCESS, (state) => ({
    ...state,
    queryInfo: {...state.queryInfo, desiredPage: 1},
  })),
  on(
    purchasePromiseDetailsActions.FETCH_QUOTATIONS_SUCCESS,
    (state: IPurchasePromiseDetailsState, {quotations}) => ({
      ...state,
      quotations,
    }),
  ),
  on(purchasePromiseDetailsActions.SET_API_STATUS_REQUEST, (state, {status}) => ({
    ...state,
    apiStatusRequest: status,
  })),
  on(purchasePromiseDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS, (state, {data}) => ({
    ...state,
    purchaseOrders: {
      ...state.purchaseOrders,
      TotalResults: data.TotalResults,
      Results:
        state.queryInfo.desiredPage === 1
          ? [...data.Results]
          : [...state.purchaseOrders.Results, ...data.Results],
    },
  })),
  on(
    purchasePromiseDetailsActions.FETCH_PURCHASE_ORDER_UPDATE_SUCCESS,
    (state: IPurchasePromiseDetailsState, {order}): IPurchasePromiseDetailsState => ({
      ...state,
      purchaseOrders: {
        ...state.purchaseOrders,
        Results: map(
          state.purchaseOrders.Results,
          (o: IPurchasePromiseOrder): IPurchasePromiseOrder => {
            if (o.IdPcPromesaDeCompra === order.IdPcPromesaDeCompra) {
              return {
                ...o,
                ...order,
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
        ...order,
      },
    }),
  ),
  on(purchasePromiseDetailsActions.SET_CLIENT_TOTALS, (state, {clientTotals}) => ({
    ...state,
    clientTotals,
  })),
  on(purchasePromiseDetailsActions.FETCH_PURCHASE_ORDERS_LOAD, (state, {isFirstPage}) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: isFirstPage ? 1 : state.queryInfo.desiredPage + 1,
    },
  })),
  on(purchasePromiseDetailsActions.FETCH_MAIL_PURCHASE_SUCCESS, (state, {mail, idPPedido}) => ({
    ...state,
    purchaseOrders: {
      ...state.purchaseOrders,
      Results: map(state.purchaseOrders.Results, (order) => {
        if (order.IdPcPromesaDeCompra === idPPedido) {
          return {...order, mailData: mail};
        }
        return order;
      }),
    },
    selectedPurchaseOrder: {...state.selectedPurchaseOrder, mailData: mail},
  })),
  on(purchasePromiseDetailsActions.SET_PURCHASE_ORDER_SELECTED, (state, {item}) => {
    return {
      ...state,
      selectedPurchaseOrder: item,
    };
  }),
  on(purchasePromiseDetailsActions.SET_OPEN_VIEW_FILE, (state, {active}) => ({
    ...state,
    openViewFile: active,
    viewFileIsLoading: true,
  })),
  on(purchasePromiseDetailsActions.VIEW_FILE_IS_LOADING, (state, {value}) => ({
    ...state,
    viewFileIsLoading: value,
  })),
  on(purchasePromiseDetailsActions.VIEW_FILE_SUCCESS, (state, {fileBase64}) => {
    return {
      ...state,
      fileBase64,
    };
  }),
  on(purchasePromiseDetailsActions.FETCH_OPTIONS_OF_PRODUCTS_LOAD, (state, {searchTerm}) => ({
    ...state,
    purchaseSearchTerm: searchTerm,
  })),

  on(
    purchasePromiseDetailsActions.FETCH_OPTIONS_PRODUCTS_IN_CONTRACT_SUCCESS,
    (state, {product}) => ({
      ...state,
      optionsOfProducts: product,
      optionsOfProductsStatus: API_REQUEST_STATUS_SUCCEEDED,
    }),
  ),
  on(purchasePromiseDetailsActions.SET_STATUS_API_PRODUCTS, (state, {status}) => ({
    ...state,
    optionsOfProductsStatus: status,
  })),
  on(purchasePromiseDetailsActions.FETCH_QUOTES_CLIENT_OF_SEARCH, (state, {product, isSearch}) => ({
    ...state,
    isSearch,
    runSearchTerm: !isEmpty(product) ? product.label : '',
    purchaseSearchTerm: !isEmpty(product) ? product.label : '',
    productToSearch: product,
    productsQueryInfo: {
      ...state.productsQueryInfo,
      desiredPage: 1,
    },
  })),
  on(purchasePromiseDetailsActions.SET_ITEM_LIST_CONTRACT, (state, {items}) => ({
    ...state,
    itemList: items,
  })),
  on(purchasePromiseDetailsActions.SET_RUN_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    runSearchTerm: searchTerm,
    optionOfProductSelected: {} as DropListOption,
    productsQueryInfo: {
      ...state.productsQueryInfo,
      desiredPage: 1,
    },
  })),
  on(purchasePromiseDetailsActions.FETCH_QUOTED_ITEMS_SUCCESS, (state, {list}) => ({
    ...state,
    itemList: list,
    quotations: {
      ...state.quotations,
      Results: map(state.quotations.Results, (item) => {
        if (item.IdCotCotizacion === list[0]?.IdCotCotizacion) {
          return {...item, items: list, needsToReloadItems: false};
        }
        return item;
      }),
    },
  })),
  on(purchasePromiseDetailsActions.FETCH_QUOTED_SELECT_ITEMS_LOAD, (state, {quote}) => ({
    ...state,
    quotations: {
      ...state.quotations,
      Results: map(state.quotations.Results, (item) => {
        if (item.IdCotCotizacion === quote.IdCotCotizacion) {
          return {...item, isSelected: true};
        }
        return {...item, isSelected: false};
      }),
    },
  })),
  on(purchasePromiseDetailsActions.FETCH_QUOTED_SELECT_ITEMS_LOAD, (state, {quote}) => {
    return {
      ...state,
    };
  }),
  on(purchasePromiseDetailsActions.SELECT_ITEM, (state: IPurchasePromiseDetailsState, {item}) => ({
    ...state,
    itemList: map(state.itemList, (entry) => {
      if (entry?.IdCotPartidaCotizacion === item?.IdCotPartidaCotizacion) {
        return {...entry, isSelected: !item.isSelected};
      }
      return entry;
    }),
    summaryListBackUp: !item.isSelected
      ? [...state.summaryListBackUp, item]
      : filter(state.summaryListBackUp, (entry) => {
          return entry?.IdCotPartidaCotizacion !== item?.IdCotPartidaCotizacion;
        }),
  })),
  on(
    purchasePromiseDetailsActions.CHECK_ALL_ORDERS,
    (state: IPurchasePromiseDetailsState, {checked}) => {
      return {
        ...state,
        itemList: map(state.itemList, (item) => {
          return {...item, isSelected: checked};
        }),

        quotations: {
          ...state.quotations,
          Results: map(state.quotations.Results, (item) => {
            if (item.isSelected && item.FleteDesglosado) {
              return {...item, isSelectedFlete: checked};
            } else {
              return item;
            }
          }),
        },
      };
    },
  ),
  on(purchasePromiseDetailsActions.ADD_ITEMS_SUMMARY_SUCCESS, (state) => ({
    ...state,
    summaryListBackUp: [],
    itemList: map(state.itemList, (o) => ({...o, isSelected: false})),
  })),
  on(
    purchasePromiseDetailsActions.SET_VALIDATE_ENTRY_ITEM,
    (state: IPurchasePromiseDetailsState, {IdCotPartidaCotizacion, value}) => {
      const selectedPurchaseOrder = state.selectedPurchaseOrder;
      return {
        ...state,
        purchaseOrderList: state.purchaseOrderList.map(
          (it: GMPretramitarPromesaDeCompra & QuoteItemExtension) => {
            if (it.IdPcPromesaDeCompra === selectedPurchaseOrder.IdPcPromesaDeCompra) {
              return {
                ...it,
                PartidasPromesaDeCompra: it.PartidasPromesaDeCompra.map(
                  (summary: GMPartidaPromesaDeCompra) => {
                    if (
                      summary.PcPartidaPromesaDeCompra.IdCotPartidaCotizacion ===
                      IdCotPartidaCotizacion
                    ) {
                      return {
                        ...summary,
                        PcPartidaPromesaDeCompra: {
                          ...summary.PcPartidaPromesaDeCompra,
                          Verificada: value,
                        },
                      };
                    }
                    return {...summary};
                  },
                ),
              };
            }
            return {...it};
          },
        ),
      };
    },
  ),
  on(
    purchasePromiseDetailsActions.SET_INCIDENCE_VALUE,
    (state: IPurchasePromiseDetailsState, {IdCotPartidaCotizacion, field, value}) => {
      const selectedPurchaseOrder = state.selectedPurchaseOrder;
      return {
        ...state,
        selectedIquoteItemDetails: {
          ...state.selectedIquoteItemDetails,
          PcIncidenciaPartidaPromesaDeCompra: {
            ...state?.selectedIquoteItemDetails?.PcIncidenciaPartidaPromesaDeCompra,
            [field]: value,
          },
        },
        purchaseOrderList: state.purchaseOrderList.map(
          (it: GMPretramitarPromesaDeCompra & QuoteItemExtension) => {
            if (it.IdPcPromesaDeCompra === selectedPurchaseOrder.IdPcPromesaDeCompra) {
              return {
                ...it,
                PartidasPromesaDeCompra: it.PartidasPromesaDeCompra.map((summary) => {
                  if (
                    summary.PcPartidaPromesaDeCompra.IdCotPartidaCotizacion ===
                    IdCotPartidaCotizacion
                  ) {
                    return {
                      ...summary,
                      PcIncidenciaPartidaPromesaDeCompra: {
                        ...summary.PcIncidenciaPartidaPromesaDeCompra,
                        [field]: value,
                      },
                    };
                  }
                  return {...summary};
                }),
              };
            }
            return {...it};
          },
        ),
      };
    },
  ),
  on(
    purchasePromiseDetailsActions.SET_SANOFI_VALUE_2,
    (state: IPurchasePromiseDetailsState, {field, value}) => {
      return {
        ...state,
        selectedIquoteItemDetails: {
          ...state.selectedIquoteItemDetails,
          PpPartidaPedidoAddendaSanofi: {
            ...buildPpPartidaPedidoAddendaSanofi(
              state.selectedIquoteItemDetails?.PpPartidaPedidoAddendaSanofi,
              field,
              value,
            ),
          },
        },
      };
    },
  ),
  on(
    purchasePromiseDetailsActions.SET_INPUT_IS_OPEN,
    (state: IPurchasePromiseDetailsState, {entryId, field}) => ({
      ...state,
      summaryList: {
        ...state.summaryList,
        Results: map(state.summaryList.Results, (o: IQuoteSummaryItem) => {
          if (o.IdPcPartidaPromesaDeCompra === entryId) {
            return {
              ...o,
              priceInputIsOpen: field === 'priceInputIsOpen',
              quantityInputIsOpen: field === 'quantityInputIsOpen',
            };
          }
          return {...o, priceInputIsOpen: false, quantityInputIsOpen: false};
        }),
      },
    }),
  ),
  on(purchasePromiseDetailsActions.SET_INPUT_IS_CLOSE, (state: IPurchasePromiseDetailsState) => ({
    ...state,
    summaryList: {
      ...state.summaryList,
      Results: map(state.summaryList.Results, (o: IQuoteSummaryItem) => ({
        ...o,
        priceInputIsOpen: false,
        quantityInputIsOpen: false,
      })),
    },
  })),
  on(purchasePromiseDetailsActions.FETCH_SUMMARY_LIST_SUCCESS, (state, {data}) => ({
    ...state,
    summaryList: data,
  })),
  on(purchasePromiseDetailsActions.SET_API_STATUS_ITEM_LIST, (state, {status, node}) => {
    return {
      ...state,
      [node]: status,
    };
  }),
  on(purchasePromiseDetailsActions.FETCH_TOTALS_SUCCESS, (state, {result}) => ({
    ...state,
    totals: result,
  })),
  on(purchasePromiseDetailsActions.FETCH_CONTACT_CUSTOMER_SUCCESS, (state, {contact}) => ({
    ...state,
    contact,
  })),
  // on(purchasePromiseDetailsActions.FETCH_CONTACT_SUCCESS, (state, {contact, IdCotCotizacion}) => ({
  //   ...state,
  //   quotations: {
  //     ...state.quotations,
  //     Results: map(state.quotations.Results, (o) => {
  //       if (o.IdCotCotizacion === IdCotCotizacion) {
  //         return {...o, contact};
  //       }
  //       return o;
  //     }),
  //   },
  // })),
  on(
    purchasePromiseDetailsActions.FETCH_CONTACT_SUCCESS,
    (
      state: IPurchasePromiseDetailsState,
      {contact, IdCotCotizacion},
    ): IPurchasePromiseDetailsState => {
      const result = map(state.quotations.Results, (o: IPurchasePromiseQuotation) => {
        if (o.IdCotCotizacion === IdCotCotizacion) {
          // DOCS: Marcar la cotización como seleccionada
          return {...o, isSelected: true, contact: contact};
          // DOCS: Si ya existe una contacto dentro de la cotización no se modifica
        } else if (o.contact) {
          return {...o};
        }
        // DOCS: Devolver la cotización sin ningún cambio si no coincide con ninguna de las validaciones
        return {...o, isSelected: false, contact: {}};
      });
      return {
        ...state,
        // DOCS: Recorrer las cotizaciones
        quotations: {Results: result, TotalResults: result.length},
        selectedQuotation: map(
          [find(result, (o: IPurchasePromiseQuotation) => o.IdCotCotizacion === IdCotCotizacion)],
          (i: IPurchasePromiseQuotation): IPurchasePromiseQuotation => ({
            ...i,
            isSelected: true,
            contact: contact,
          }),
        )[0],
      };
    },
  ),
  on(purchasePromiseDetailsActions.FETCH_PRODUCTS_IN_CONTRACT_LOAD, (state) => ({
    ...state,
    quotations: {
      ...state.quotations,
      Results: map(state.quotations.Results, (o) => ({
        ...o,
        isSelected: false,
      })),
    },
  })),
  on(
    purchasePromiseDetailsActions.UPDATE_ITEM_LIST,
    (state, {linkedQuotes, IdCotPartidaCotizacion}) => ({
      ...state,
      itemList: map(state.itemList, (o) => {
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
    }),
  ),
  on(
    purchasePromiseDetailsActions.UPDATE_SUMMARY_LIST,
    (state, {linkedQuotes, IdPcPartidaPromesaDeCompra}) => ({
      ...state,
      summaryList: {
        ...state.summaryList,
        Results: map(state.summaryList.Results, (o) => {
          if (o.IdPcPartidaPromesaDeCompra === IdPcPartidaPromesaDeCompra) {
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
    purchasePromiseDetailsActions.ADD_SUMMARY_PURCHASE_PROMISE,
    (state: IPurchasePromiseDetailsState) => {
      //DOCS: Valida si ya existe una orden de compra
      const existPurchaseOrder = (IdPcPromesaDeCompra: string): boolean => {
        return !!state.purchaseOrderList.find(
          (it: GMPretramitarPromesaDeCompra & QuoteItemExtension) =>
            it.IdPcPromesaDeCompra === IdPcPromesaDeCompra,
        );
      };

      const purchaseOrderList: GMPretramitarPromesaDeCompra & QuoteItemExtension[] = [
        ...state.purchaseOrderList,
      ];
      const selectedPurchaseOrder: IPurchasePromiseOrder = state.selectedPurchaseOrder;

      //DOCS: Obtener la orden de compra seleccionada
      const list: GMPretramitarPromesaDeCompra & QuoteItemExtension = state.purchaseOrderList?.find(
        (it: GMPretramitarPromesaDeCompra & QuoteItemExtension) => {
          return it?.IdPcPromesaDeCompra === selectedPurchaseOrder?.IdPcPromesaDeCompra;
        },
      );
      // TODO: Ver si se elimina
      // const alreadyAddedQuotes: GMPretramitarPromesaDeCompra &
      //   QuoteItemExtension[] = state.purchaseOrderList?.find(
      //   (it) =>
      //     selectedPurchaseOrder?.IdPcPromesaDeCompra === it?.IdPcPromesaDeCompra,
      // )?.PartidasPromesaDeCompra;

      //DOCS: metodo que Valida si la partida existe dentro de la orden seleccionada (resumen)
      const alreadyExistQuote = (IdCotPartidaCotizacion: string): boolean => {
        return !!list?.PartidasPromesaDeCompra.find(
          (it: GMPartidaPromesaDeCompra) =>
            it.PcPartidaPromesaDeCompra?.IdCotPartidaCotizacion === IdCotPartidaCotizacion,
        );
      };
      // DOCS: Obtener las partidas seleccionadas y verificar si existe la partida dentro del resumen
      const selectedSummary: Array<IQuoteItem> = state.itemList.filter(
        (it) => it.isSelected && !alreadyExistQuote(it?.IdCotPartidaCotizacion),
      );

      const selectedFlete: IPurchasePromiseQuotation = state.quotations.Results.find(
        (it: IPurchasePromiseQuotation) => it.isSelected && it.isSelectedFlete,
      );

      const selectedQuotation: IPurchasePromiseQuotation = state.quotations.Results.find(
        (it: IPurchasePromiseQuotation) => it.isSelected === true,
      );

      state?.purchaseOrderList.map((it) => it.freightItem);
      //DOCS: Registra la primera vez la orden de compra con las partidas

      if (isEmpty(purchaseOrderList)) {
        return {
          ...state,
          purchaseOrderList: [
            {
              IdPcPromesaDeCompra: selectedPurchaseOrder.IdPcPromesaDeCompra,
              IdsCotCotizacionFleteExpress: insertFleteExpres(
                state.purchaseOrderList.IdsCotCotizacionFleteExpress,
                selectedFlete,
              ),
              IdsCotCotizacionFleteUltimaMilla: insertFleteUtilmaMilla(
                state.purchaseOrderList.IdsCotCotizacionFleteUltimaMilla,
                selectedFlete,
              ),
              PartidasPromesaDeCompra: buildGMPartidaPromesaDeCompra(
                [...selectedSummary],
                selectedPurchaseOrder,
                selectedQuotation,
              ),
            },
          ],
          quotations: {
            ...state?.quotations,
            Results: state?.quotations?.Results.map((it) => {
              if (it.isSelected && it.isSelectedFlete) {
                return {
                  ...it,
                  isSelectedFlete: false,
                };
              }
              return it;
            }),
          },
        };
      }

      //DOCS: Si ya esxiste la orden, solo agrega las partidas
      if (existPurchaseOrder(selectedPurchaseOrder.IdPcPromesaDeCompra)) {
        return {
          ...state,
          purchaseOrderList: purchaseOrderList.map(
            (purchaseOrder: GMPretramitarPromesaDeCompra & QuoteItemExtension) => {
              if (selectedPurchaseOrder.IdPcPromesaDeCompra === purchaseOrder.IdPcPromesaDeCompra) {
                return {
                  ...purchaseOrder,
                  // IdPcPromesaDeCompra: selectedPurchaseOrder.IdPcPromesaDeCompra,
                  IdsCotCotizacionFleteExpress: insertFleteExpres(
                    purchaseOrder.IdsCotCotizacionFleteExpress,
                    selectedFlete,
                  ),
                  IdsCotCotizacionFleteUltimaMilla: insertFleteUtilmaMilla(
                    purchaseOrder.IdsCotCotizacionFleteUltimaMilla,
                    selectedFlete,
                  ),
                  PartidasPromesaDeCompra: [
                    ...buildGMPartidaPromesaDeCompra(
                      [...selectedSummary],
                      selectedPurchaseOrder,
                      selectedQuotation,
                    ),
                  ].concat(purchaseOrder.PartidasPromesaDeCompra),
                };
              } else {
                return purchaseOrder;
              }
            },
          ),
        };
      }
      //DOCS: Ultimó caso , se agregan partidas a una nueva orden de compra que aun no existe
      return {
        ...state,
        purchaseOrderList: [
          ...purchaseOrderList,
          {
            IdPcPromesaDeCompra: selectedPurchaseOrder.IdPcPromesaDeCompra,
            IdsCotCotizacionFleteExpress: insertFleteExpres(
              state.purchaseOrderList.IdsCotCotizacionFleteExpress,
              selectedFlete,
            ),
            IdsCotCotizacionFleteUltimaMilla: insertFleteUtilmaMilla(
              state.purchaseOrderList.IdsCotCotizacionFleteUltimaMilla,
              selectedFlete,
            ),
            PartidasPromesaDeCompra: buildGMPartidaPromesaDeCompra(
              [...selectedSummary],
              selectedPurchaseOrder,
              selectedQuotation,
            ),
          },
        ],
      };
    },
  ),
  on(
    purchasePromiseDetailsActions.REMOVE_IQUOTE_ITEM,
    (state, {IdCotPartidaCotizacion}: {IdCotPartidaCotizacion: string}) => {
      const selectedPurchaseOrder = state.selectedPurchaseOrder;
      return {
        ...state,
        purchaseOrderList: state.purchaseOrderList.map(
          (it: GMPretramitarPromesaDeCompra & QuoteItemExtension) => {
            if (it.IdPcPromesaDeCompra === selectedPurchaseOrder.IdPcPromesaDeCompra) {
              return {
                ...it,
                PartidasPromesaDeCompra: [...it.PartidasPromesaDeCompra].filter(
                  (summary: GMPartidaPromesaDeCompra) =>
                    summary.PcPartidaPromesaDeCompra.IdCotPartidaCotizacion !==
                    IdCotPartidaCotizacion,
                ),
              };
            } else {
              return {
                ...it,
              };
            }
          },
        ),
        itemList: state.itemList.map((it) => {
          if (it.IdCotPartidaCotizacion === IdCotPartidaCotizacion) {
            return {
              ...it,
              isSelected: false,
            };
          }
          return it;
        }),
        summaryListBackUp: state.summaryListBackUp.filter(
          (it) => it.IdCotPartidaCotizacion !== IdCotPartidaCotizacion,
        ),
      };
    },
  ),
  on(purchasePromiseDetailsActions.RESET_PURCHASE_PROMISE_LIST, (state) => {
    return {
      ...state,
      purchaseOrderList: [],
    };
  }),
  on(purchasePromiseDetailsActions.SET_ESTATUS_SUMMARY_LIST, (state, {statusRequest}) => {
    return {
      ...state,
      statusApiSummaryList: statusRequest,
    };
  }),
  on(
    purchasePromiseDetailsActions.SELECTED_IQUOTE_ITEM,
    (state: IPurchasePromiseDetailsState, {item}) => {
      return {
        ...state,
        selectedIquoteItemDetails: {
          ...item,
        },
        selectedIquoteItemDetailsBackUp: {...item},
      };
    },
  ),
  on(purchasePromiseDetailsActions.RESTORE_SELECTED_IQUOTE_ITEM, (state) => {
    return {
      ...state,
      selectedIquoteItemDetails: null,
      selectedIquoteItemDetailsBackUp: null,
    };
  }),
  on(purchasePromiseDetailsActions.UPDATE_IQUOTE_ITEM, (state, {node, value}) => {
    return {
      ...state,
      selectedIquoteItemDetails: {
        ...state.selectedIquoteItemDetails,
        PcPartidaPromesaDeCompra: {
          ...state.selectedIquoteItemDetails.PcPartidaPromesaDeCompra,
          [node]: value,
        },
        quote: {
          ...state.selectedIquoteItemDetails.quote,
          [node]: value,
        },
      },
    };
  }),
  on(
    purchasePromiseDetailsActions.SET_IQUOTE_ITEM_DATE_ESTIMATED_FEE,
    (state, {date, dateString}) => {
      return {
        ...state,
        selectedIquoteItemDetails: {
          ...state.selectedIquoteItemDetails,
          PcPartidaPromesaDeCompra: {
            ...state.selectedIquoteItemDetails.PcPartidaPromesaDeCompra,
            FechaEstimadaEntrega: dateString,
          },
          quote: {
            ...state.selectedIquoteItemDetails.quote,
            FechaEstimadaEntrega: dateString,
          },
        },
      };
    },
  ),
  on(
    purchasePromiseDetailsActions.SAVE_CHANGES_IQUOTE_ITEM,
    (state: IPurchasePromiseDetailsState) => {
      return {
        ...state,
        purchaseOrderList: state.purchaseOrderList.map(
          (it: GMPretramitarPromesaDeCompra & QuoteItemExtension) => {
            if (it.IdPcPromesaDeCompra === state.selectedPurchaseOrder?.IdPcPromesaDeCompra) {
              return {
                ...it,
                PartidasPromesaDeCompra: it.PartidasPromesaDeCompra.map(
                  (obj: GMPartidaPromesaDeCompra & QuoteItemExtension) => {
                    if (
                      obj?.PcPartidaPromesaDeCompra?.IdCotPartidaCotizacion ===
                      state.selectedIquoteItemDetails?.PcPartidaPromesaDeCompra
                        ?.IdCotPartidaCotizacion
                    ) {
                      return {
                        ...obj,
                        PcPartidaPromesaDeCompra: {
                          ...state.selectedIquoteItemDetails?.PcPartidaPromesaDeCompra,
                        },
                        quote: {
                          ...obj?.quote,
                          ...state.selectedIquoteItemDetails?.PcPartidaPromesaDeCompra,
                        },
                        PpPartidaPedidoAddendaSanofi:
                          obj.PpPartidaPedidoAddendaSanofi ||
                          state.selectedIquoteItemDetails?.PpPartidaPedidoAddendaSanofi
                            ? {
                                ...obj.PpPartidaPedidoAddendaSanofi,
                                ...state.selectedIquoteItemDetails?.PpPartidaPedidoAddendaSanofi,
                              }
                            : null,
                      };
                    }
                    return obj;
                  },
                ),
              };
            }
            return it;
          },
        ),
        itemList: state.itemList.map((it: IQuoteItem) => {
          if (
            it.IdCotPartidaCotizacion ===
            state.selectedIquoteItemDetails?.PcPartidaPromesaDeCompra?.IdCotPartidaCotizacion
          ) {
            return {...state.selectedIquoteItemDetails?.quote};
          }
          return it;
        }),
      };
    },
  ),
  on(
    purchasePromiseDetailsActions.FETCH_NON_WORKING_DAYS_SUCCESS,
    (state: IPurchasePromiseDetailsState, {nonWorkingDays}) => ({
      ...state,
      datesUnavailable: nonWorkingDays,
      selectedIquoteItemDetails: {
        ...state.selectedIquoteItemDetails,
        isSelectedPurchase: true,
      },
    }),
  ),
  on(
    purchasePromiseDetailsActions.UPDATE_SELECTED_PURCHASE_PROMISE,
    (state: IPurchasePromiseDetailsState, {value, node}) => {
      const selectedPurchaseOrder = state?.selectedPurchaseOrder;
      return {
        ...state,
        selectedPurchaseOrder: {
          ...state?.selectedPurchaseOrder,
          [node]: value,
        },
        purchaseOrderList: map(
          state?.purchaseOrderList,
          (purchaseOrder: GMPretramitarPromesaDeCompra & QuoteItemExtension) => {
            if (purchaseOrder?.IdPcPromesaDeCompra === selectedPurchaseOrder?.IdPcPromesaDeCompra) {
              return {
                ...purchaseOrder,
                [node]: value,
              };
            }
            return purchaseOrder;
          },
        ),
      };
    },
  ),
  on(
    purchasePromiseDetailsActions.FETCH_FREIGHT_SUCCESS,
    (state: IPurchasePromiseDetailsState, {fletes, IdCotCotizacion}) => ({
      ...state,
      quotations: {
        ...state?.quotations,
        Results: state?.quotations?.Results.map((it: IPurchasePromiseQuotation) => {
          if (it.IdCotCotizacion === IdCotCotizacion) {
            return {
              ...it,
              ...fletes,
            };
          }
          return it;
        }),
      },
    }),
  ),
  on(
    purchasePromiseDetailsActions.SELECT_FLETE,
    (state: IPurchasePromiseDetailsState, {IdCotCotizacion, status}) => {
      return {
        ...state,
        quotations: {
          ...state?.quotations,
          Results: state?.quotations?.Results.map((it: IPurchasePromiseQuotation) => {
            if (it.IdCotCotizacion === IdCotCotizacion) {
              return {
                ...it,
                isSelectedFlete: status,
              };
            }
            return it;
          }),
        },
      };
    },
  ),
  on(
    purchasePromiseDetailsActions.DELETE_FLETE,
    (state: IPurchasePromiseDetailsState, {IdCotCotizacionFleteExpress, IdsFletesUltimaMilla}) => {
      //DOCS: Valida si ya existe una orden de compra
      const existPurchaseOrder = (IdPcPromesaDeCompra: string): boolean => {
        return !!state.purchaseOrderList.find(
          (it: GMPretramitarPromesaDeCompra & QuoteItemExtension) =>
            it.IdPcPromesaDeCompra === IdPcPromesaDeCompra,
        );
      };
      const purchaseOrderList: GMPretramitarPromesaDeCompra & QuoteItemExtension[] = [
        ...state.purchaseOrderList,
      ];
      const selectedPurchaseOrder: IPurchasePromiseOrder = state.selectedPurchaseOrder;
      const selectedSummary: Array<IQuoteItem> = state.itemList.filter((it) => it.isSelected);
      const selectedFlete: IPurchasePromiseQuotation = state.quotations.Results.find(
        (it: IPurchasePromiseQuotation) => it.isSelected && it.isSelectedFlete,
      );

      //DOCS: Si ya esxiste la orden, solo agrega las partidas
      if (existPurchaseOrder(selectedPurchaseOrder.IdPcPromesaDeCompra)) {
        return {
          ...state,
          purchaseOrderList: purchaseOrderList.map(
            (purchaseOrder: GMPretramitarPromesaDeCompra & QuoteItemExtension) => {
              if (selectedPurchaseOrder.IdPcPromesaDeCompra === purchaseOrder.IdPcPromesaDeCompra) {
                return {
                  ...purchaseOrder,
                  IdsCotCotizacionFleteExpress: purchaseOrder.IdsCotCotizacionFleteExpress.filter(
                    (id: string) => id !== IdCotCotizacionFleteExpress,
                  ),
                  IdsCotCotizacionFleteUltimaMilla: purchaseOrder.IdsCotCotizacionFleteUltimaMilla?.filter(
                    (id: string) => !IdsFletesUltimaMilla?.includes(id),
                  ),
                };
              } else {
                return purchaseOrder;
              }
            },
          ),
        };
      }
    },
  ),
  on(
    purchasePromiseDetailsActions.SET_QUOTE_VALUE,
    (state: IPurchasePromiseDetailsState, {IdCotPartidaCotizacion, field, value}) => {
      const selectedPurchaseOrder = state.selectedPurchaseOrder;
      return {
        ...state,
        selectedIquoteItemDetails: {
          ...state.selectedIquoteItemDetails,
          PcIncidenciaPartidaPromesaDeCompra: {
            ...state?.selectedIquoteItemDetails?.PcIncidenciaPartidaPromesaDeCompra,
            [field]: value,
          },
          quote: {
            ...state?.selectedIquoteItemDetails?.quote,
            [field]: value,
          },
        },
        purchaseOrderList: state.purchaseOrderList.map(
          (it: GMPretramitarPromesaDeCompra & QuoteItemExtension) => {
            if (it.IdPcPromesaDeCompra === selectedPurchaseOrder.IdPcPromesaDeCompra) {
              return {
                ...it,
                PartidasPromesaDeCompra: it.PartidasPromesaDeCompra.map(
                  (summary: GMPartidaPromesaDeCompra & QuoteItemExtension) => {
                    if (
                      summary.PcPartidaPromesaDeCompra.IdCotPartidaCotizacion ===
                      IdCotPartidaCotizacion
                    ) {
                      return {
                        ...summary,
                        quote: {
                          ...summary?.quote,
                          [field]: value,
                        },
                        PcIncidenciaPartidaPromesaDeCompra: {
                          ...summary.PcIncidenciaPartidaPromesaDeCompra,
                          [field]: value,
                        },
                      };
                    }
                    return {...summary};
                  },
                ),
              };
            }
            return {...it};
          },
        ),
      };
    },
  ),
  on(purchasePromiseDetailsActions.SET_VALUE_TOTAL_IN_PROMISE, (state, {total}) => ({
    ...state,
    valueTotalInPromise: total,
  })),
  on(
    purchasePromiseDetailsActions.SET_UPDATE_REFERENCE_SUCCESS,
    (state: IPurchasePromiseDetailsState, {reference}): IPurchasePromiseDetailsState => ({
      ...state,
      purchaseOrders: {
        ...state.purchaseOrders,
        Results: map(
          state.purchaseOrders.Results,
          (o: IPurchasePromiseOrder): IPurchasePromiseOrder => {
            if (o.IdPcPromesaDeCompra === state.selectedPurchaseOrder.IdPcPromesaDeCompra) {
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
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        OrdenDeCompra: reference,
      },
    }),
  ),
  on(purchasePromiseDetailsActions.RESET_ITEM_LIST, (state) => ({
    ...state,
    itemList: [],
  })),
);
