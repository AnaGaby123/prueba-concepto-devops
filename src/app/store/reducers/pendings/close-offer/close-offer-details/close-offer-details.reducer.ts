import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  AJUSTE_DE_OFERTA,
  CANCELACION,
  CloseOfferDetailsState,
  IItemQuotation,
  initialCloseOfferDetailsState,
  initialFormPrice,
  IQuotation,
  PROMESA_DE_COMPRA,
  SEGUIMIENTO,
} from '@appModels/store/pendings/close-offer/close-offer-details/close-offer-details.models';
import * as closeOfferDetailsActions from '@appActions/pendings/close-offer/close-offer-details/close-offer-details.actions';
import {filter, find, isEmpty, map as _map, omit, findIndex, reduce, forEach} from 'lodash-es';
import {
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';
import {CHANGE_TOTALS_QUOTATION} from '@appActions/pendings/close-offer/close-offer-details/close-offer-details.actions';

export const closeOfferDetailsReducer: ActionReducer<CloseOfferDetailsState> = createReducer(
  initialCloseOfferDetailsState(),
  on(
    closeOfferDetailsActions.SET_SEE_RESUME,
    (state: CloseOfferDetailsState, {seeResumeActive}) => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        seeResumeActive,
        itemsQuotation: [],
      },
      selectedBrand: {
        label: 'Todas',
        value: DEFAULT_UUID,
      },
    }),
  ),
  on(closeOfferDetailsActions.SET_RESET_SEE_RESUME, (state: CloseOfferDetailsState) => ({
    ...state,
    selectedQuote: {
      ...state.selectedQuote,
      seeResumeActive: false,
      itemsQuotation: [],
    },
    selectedBrand: {
      label: 'Todas',
      value: DEFAULT_UUID,
    },
  })),
  on(
    closeOfferDetailsActions.GET_CAT_MOTIVO_SEGUIMIENTO_SUCCESS,
    (state: CloseOfferDetailsState, {catMotivosSeguimiento}) => ({
      ...state,
      catMotivosSeguimiento,
    }),
  ),
  on(
    closeOfferDetailsActions.GET_CAT_MOTIVO_CANCELACION_SUCCESS,
    (state: CloseOfferDetailsState, {catMotivosCancelacion}) => ({
      ...state,
      catMotivosCancelacion,
    }),
  ),
  on(
    closeOfferDetailsActions.GET_CAT_ENTRIES_BRANDS_SUCCESS,
    (state: CloseOfferDetailsState, {catMarcas}) => ({
      ...state,
      resumeSection: {
        ...state.resumeSection,
        brandList: catMarcas,
        selectedBrandStep: 0,
        selectedBrandId: !isEmpty(catMarcas) ? catMarcas[0].IdMarca : '',
      },
    }),
  ),
  on(
    closeOfferDetailsActions.GET_CAT_ENTRIES_PROVIDERS_SUCCESS,
    (state: CloseOfferDetailsState, {catProviders}) => ({
      ...state,
      resumeSection: {
        ...state.resumeSection,
        providerList: catProviders,
        selectedProviderStep: 0,
        selectedProviderId: !isEmpty(catProviders) ? catProviders[0].IdProveedor : '',
      },
    }),
  ),
  on(closeOfferDetailsActions.CLEAN_ALL_CLOSE_OFFER_DETAIL, () => ({
    ...initialCloseOfferDetailsState(),
  })),
  on(
    closeOfferDetailsActions.SET_ALLOWED_TO_RESUME,
    (state: CloseOfferDetailsState, {allowedToResume}) => ({
      ...state,
      allowedToResume,
    }),
  ),
  on(
    closeOfferDetailsActions.SET_IS_IS_RESUME_VIEW,
    (state: CloseOfferDetailsState, {isInResumeView}) => ({
      ...state,
      isInResumeView,
      selectedQuote: {
        ...state.selectedQuote,
        selectedResumeTabOption: !isInResumeView
          ? {
              id: '1',
              label: 'SEGUIMIENTO',
            }
          : state.selectedQuote.selectedResumeTabOption,
        itemsQuotation: [],
      },
      selectedBrand: {
        label: 'Todas',
        value: DEFAULT_UUID,
      },
    }),
  ),
  on(closeOfferDetailsActions.SET_CLIENT_SELECTED_LOAD, (state, {client}) => ({
    ...state,
    clientSelected: client,
  })),
  on(
    closeOfferDetailsActions.SET_QUOTES,
    (state: CloseOfferDetailsState, {quotes}): CloseOfferDetailsState => ({
      ...state,
      quotes,
      selectedQuote: !isEmpty(quotes.listQuotes) ? quotes.listQuotes[0] : ({} as IQuotation),
    }),
  ),
  on(
    closeOfferDetailsActions.SET_QUOTATION_DATA,
    (state: CloseOfferDetailsState, {quotation}): CloseOfferDetailsState => ({
      ...state,
      quotes: {
        ...state.quotes,
        listQuotes: _map(state.quotes.listQuotes, (o) => {
          if (o.IdCotCotizacion === quotation.IdCotCotizacion) {
            return {...o, ...omit(quotation, ['NumeroPartidas', 'isSelected'])};
          } else {
            return {...o};
          }
        }),
      },
      selectedQuote: {
        ...state.selectedQuote,
        ...omit(quotation, ['NumeroPartidas', 'isSelected']),
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_CLIENT_DATA,
    (state, {clientData}): CloseOfferDetailsState => ({
      ...state,
      clientData,
    }),
  ),
  on(
    closeOfferDetailsActions.SET_CLIENT_TOTALS,
    (state, {clientTotals}): CloseOfferDetailsState => ({
      ...state,
      clientTotals,
    }),
  ),
  on(
    closeOfferDetailsActions.SET_CONTACT,
    (state, {contact, idQuotation}): CloseOfferDetailsState => ({
      ...state,
      quotes: {
        ...state.quotes,
        listQuotes: _map(state.quotes.listQuotes, (o) => {
          if (o.IdCotCotizacion === idQuotation) {
            return {...o, needsToReloadContact: false, contact};
          } else {
            return {...o};
          }
        }),
      },
      selectedQuote: {
        ...state.selectedQuote,
        contact,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_GENERAL_DATA,
    (state, {generalData, idQuotation}): CloseOfferDetailsState => ({
      ...state,
      quotes: {
        ...state.quotes,
        listQuotes: _map(state.quotes.listQuotes, (o) => {
          if (o.IdCotCotizacion === idQuotation) {
            return {...o, needsToReloadGeneralData: false, generalData};
          } else {
            return {...o};
          }
        }),
      },
      selectedQuote: {
        ...state.selectedQuote,
        generalData,
        needsToReloadGeneralData: false,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_FREIGHTS_QUOTATION,
    (state, {freights, idQuotation}): CloseOfferDetailsState => ({
      ...state,
      quotes: {
        ...state.quotes,
        listQuotes: _map(
          state.quotes.listQuotes,
          (o): IQuotation => {
            if (o.IdCotCotizacion === idQuotation) {
              return {...o, needsToReloadFreights: false, freights};
            } else {
              return {...o};
            }
          },
        ),
      },
      selectedQuote: {
        ...state.selectedQuote,
        needsToReloadFreights: false,
        freights,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_ITEMS_QUOTATIONS,
    (state: CloseOfferDetailsState, {itemsQuotation}): CloseOfferDetailsState => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        itemsQuotation,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_QUOTE_IS_EXPRESS_FREIGHT,
    (state: CloseOfferDetailsState, {expressFreight, twoDays}): CloseOfferDetailsState => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        expressFreight,
        twoDays,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_ENTRY_POP_UP_IS_OPEN,
    (state: CloseOfferDetailsState, {itemId, isChild, node, isOpen}): CloseOfferDetailsState => {
      const items = Array.from(state.selectedQuote.itemsQuotation, (object: IItemQuotation) =>
        Object.assign({}, object, {
          ...object,
          [node]: {
            ...object[node],
            isOpen: false,
            zIndex: 2,
          },
        }),
      );
      const cotPartida: IItemQuotation = find(
        items,
        (item: IItemQuotation): boolean => item.IdCotPartidaCotizacion === itemId,
      );
      if (cotPartida) {
        const cotPartidaIndex = findIndex(items, cotPartida);

        items[cotPartidaIndex] = {
          ...items[cotPartidaIndex],
          commentsPop: {
            ...cotPartida[node],
            isOpen,
            isInRange: isOpen || cotPartida[node].isInRange,
            zIndex: isOpen ? 3 : 2,
          },
        };
      }

      return {
        ...state,
        selectedQuote: {
          ...state.selectedQuote,
          itemsQuotation: items,
        },
      };

      // TODO: SE HA DESCUBIERTO QUE LA PROPIEDAD children NO SE OCUPA, VALIDAR SI SE PUEDE ELIMINAR POR COMPLETO.
      /*      return {
        ...state,
        selectedQuote: {
          ...state.selectedQuote,
          itemsQuotation: _map(state.selectedQuote.itemsQuotation, (o: IItemQuotation) => {
            if (isChild) {
              return {
                ...o,
                [node]: {
                  ...o[node],
                  zIndex: 2,
                },
                children: _map(o.children, (i: IItemQuotation) => {
                  if (i.IdCotPartidaCotizacion === itemId) {
                    return {
                      ...i,
                      [node]: {
                        ...i[node],
                        isOpen,
                        isInRange: isOpen ? isOpen : i[node].isInRange,
                        zIndex: isOpen ? 3 : 2,
                      },
                    };
                  }
                  return {
                    ...i,
                    [node]: {
                      ...i[node],
                      zIndex: 2,
                    },
                  };
                }),
              };
            } else {
              if (o.IdCotPartidaCotizacion === itemId) {
                return {
                  ...o,
                  [node]: {
                    ...o[node],
                    isOpen,
                    isInRange: isOpen ? isOpen : o[node].isInRange,
                    zIndex: isOpen ? 3 : 2,
                  },
                  children: _map(o.children, (i: IItemQuotation) => {
                    return {
                      ...i,
                      [node]: {
                        ...i[node],
                        zIndex: 2,
                      },
                    };
                  }),
                };
              }
              return {
                ...o,
                [node]: {
                  ...o[node],
                  zIndex: 2,
                  isOpen: false,
                },
                children: _map(o.children, (i: IItemQuotation) => {
                  return {
                    ...i,
                    [node]: {
                      ...i[node],
                      zIndex: 2,
                    },
                  };
                }),
              };
            }
          }),
        },
      };*/
    },
  ),

  on(
    closeOfferDetailsActions.SET_POP_UP_ADJUST_PRICE_IS_OPEN,
    (state: CloseOfferDetailsState, {itemId, isOpen}) => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        itemsQuotation: _map(state.selectedQuote.itemsQuotation, (item: IItemQuotation) => {
          if (item.IdCotPartidaCotizacion === itemId) {
            return {
              ...item,
              popUpByAmount: {
                ...item.popUpByAmount,
                isOpen,
                isInRange: isOpen ? isOpen : item.popUpByAmount.isInRange,
                zIndex: isOpen ? 3 : 2,
              },
            };
          }
          return {
            ...item,
            popUpByAmount: {
              ...item.popUpByAmount,
              zIndex: 2,
            },
          };
        }),
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SAVE_FORM_PRICE,
    (state: CloseOfferDetailsState, {idItem, formPrice}) => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        itemsQuotation: _map(state.selectedQuote.itemsQuotation, (item: IItemQuotation) => {
          if (item.IdCotPartidaCotizacion === idItem) {
            return {
              ...item,
              popUpByAmount: {
                ...item.popUpByAmount,
                isOpen: false,
              },
              formPrice: {
                ...item.formPrice,
                ...formPrice,
              },
            };
          }
          return {
            ...item,
            popUpByAmount: {
              ...item.popUpByAmount,
              isOpen: false,
            },
          };
        }),
      },
    }),
  ),

  on(
    closeOfferDetailsActions.SET_ENTRY_POP_UP_IS_IN_RANGE,
    (
      state: CloseOfferDetailsState,
      {startIndex, endIndex, node, counter},
    ): CloseOfferDetailsState => {
      return {
        ...state,
        selectedQuote: {
          ...state.selectedQuote,
          itemsQuotation: _map(state.selectedQuote.itemsQuotation, (o: IItemQuotation) => {
            counter++;
            if (counter >= startIndex && counter <= endIndex) {
              return {
                ...o,
                tracingPop: {
                  ...o.tracingPop,
                  isInRange: true,
                },
                freightPop: {
                  ...o.freightPop,
                  isInRange: true,
                },
                ratePop: {
                  ...o.ratePop,
                  isInRange: true,
                },
                pricePop: {
                  ...o.pricePop,
                  isInRange: true,
                },
                commentsPop: {
                  ...o.commentsPop,
                  isInRange: true,
                },
                children: _map(o.children, (i: IItemQuotation) => {
                  counter++;
                  if (counter >= startIndex && counter <= endIndex) {
                    return {
                      ...i,
                      tracingPop: {
                        ...i.tracingPop,
                        isInRange: true,
                      },
                      freightPop: {
                        ...i.freightPop,
                        isInRange: true,
                      },
                      ratePop: {
                        ...i.ratePop,
                        isInRange: true,
                      },
                      pricePop: {
                        ...i.pricePop,
                        isInRange: true,
                      },
                      commentsPop: {
                        ...i.commentsPop,
                        isInRange: true,
                      },
                    };
                  }
                  return {
                    ...i,
                    tracingPop: {
                      ...i.tracingPop,
                      isInRange: false,
                    },
                    freightPop: {
                      ...i.freightPop,
                      isInRange: false,
                    },
                    ratePop: {
                      ...i.ratePop,
                      isInRange: false,
                    },
                    pricePop: {
                      ...i.pricePop,
                      isInRange: false,
                    },
                    commentsPop: {
                      ...i.commentsPop,
                      isInRange: false,
                    },
                  };
                }),
              };
            }
            return {
              ...o,
              tracingPop: {
                ...o.tracingPop,
                isInRange: false,
              },
              freightPop: {
                ...o.freightPop,
                isInRange: false,
              },
              ratePop: {
                ...o.ratePop,
                isInRange: false,
              },
              pricePop: {
                ...o.pricePop,
                isInRange: false,
              },

              commentsPop: {
                ...o.commentsPop,
                isInRange: false,
              },
              children: _map(o.children, (i: IItemQuotation) => {
                counter++;
                if (counter >= startIndex && counter <= endIndex) {
                  return {
                    ...i,
                    tracingPop: {
                      ...i.tracingPop,
                      isInRange: true,
                    },
                    freightPop: {
                      ...i.freightPop,
                      isInRange: true,
                    },
                    ratePop: {
                      ...i.ratePop,
                      isInRange: true,
                    },
                    pricePop: {
                      ...i.pricePop,
                      isInRange: true,
                    },
                    commentsPop: {
                      ...i.commentsPop,
                      isInRange: true,
                    },
                  };
                }
                return {
                  ...i,
                  tracingPop: {
                    ...i.tracingPop,
                    isInRange: false,
                  },
                  freightPop: {
                    ...i.freightPop,
                    isInRange: false,
                  },
                  ratePop: {
                    ...i.ratePop,
                    isInRange: false,
                  },
                  pricePop: {
                    ...i.pricePop,
                    isInRange: false,
                  },
                  commentsPop: {
                    ...i.commentsPop,
                    isInRange: false,
                  },
                };
              }),
            };
          }),
        },
      };
    },
  ),
  on(
    closeOfferDetailsActions.SET_ALL_CHECKED,
    (state, {field, value}): CloseOfferDetailsState => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        itemsQuotation: _map(state.selectedQuote.itemsQuotation, (o: IItemQuotation) => {
          return {
            ...o,
            Seguimiento: field === SEGUIMIENTO ? value : false,
            AjusteDeOferta: field === AJUSTE_DE_OFERTA ? value : false,
            PromesaDeCompra: field === PROMESA_DE_COMPRA ? value : false,
            Cancelacion: field === CANCELACION ? value : false,
            children: _map(o.children, (i: IItemQuotation) => {
              return {
                ...i,
                Seguimiento: field === SEGUIMIENTO ? value : false,
                AjusteDeOferta: field === AJUSTE_DE_OFERTA ? value : false,
                PromesaDeCompra: field === PROMESA_DE_COMPRA ? value : false,
                Cancelacion: field === CANCELACION ? value : false,
              };
            }),
          };
        }),
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_CHECK_BOX_VALUE,
    (state: CloseOfferDetailsState, {itemId, isChild, field, value}): CloseOfferDetailsState => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        itemsQuotation: _map(state.selectedQuote.itemsQuotation, (o: IItemQuotation) => {
          if (isChild) {
            return {
              ...o,
              children: _map(o.children, (i: IItemQuotation) => {
                if (i.IdCotPartidaCotizacion === itemId) {
                  return {
                    ...i,
                    Seguimiento: field === SEGUIMIENTO ? value : false,
                    AjusteDeOferta: field === AJUSTE_DE_OFERTA ? value : false,
                    PromesaDeCompra: field === PROMESA_DE_COMPRA ? value : false,
                    Cancelacion: field === CANCELACION ? value : false,
                  };
                }
                return {
                  ...i,
                };
              }),
            };
          } else {
            if (o.IdCotPartidaCotizacion === itemId) {
              return {
                ...o,
                Seguimiento: field === SEGUIMIENTO ? value : false,
                AjusteDeOferta: field === AJUSTE_DE_OFERTA ? value : false,
                PromesaDeCompra: field === PROMESA_DE_COMPRA ? value : false,
                Cancelacion: field === CANCELACION ? value : false,
              };
            }
            return {
              ...o,
            };
          }
        }),
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_CHECK_BOX_RESUME_VALUE,
    (
      state: CloseOfferDetailsState,
      {itemId, isChild, allItems, value},
    ): CloseOfferDetailsState => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        itemsQuotation: allItems
          ? _map(state.selectedQuote.itemsQuotation, (o: IItemQuotation) => ({
              ...o,
              isSelectedInResume: value,
              children: _map(o.children, (i: IItemQuotation) => ({
                ...i,
                isSelectedInResume: value,
                formPrice: {
                  ...o.formPrice,
                  valueAmount: '',
                  valuePercentage: '',
                  comments: '',
                },
              })),
            }))
          : _map(state.selectedQuote.itemsQuotation, (o: IItemQuotation) => {
              if (isChild) {
                return {
                  ...o,
                  children: _map(o.children, (i: IItemQuotation) => {
                    if (i.IdCotPartidaCotizacion === itemId) {
                      return {
                        ...i,
                        isSelectedInResume: !i.isSelectedInResume,
                      };
                    }
                    return {
                      ...i,
                    };
                  }),
                };
              } else {
                if (o.IdCotPartidaCotizacion === itemId) {
                  return {
                    ...o,
                    isSelectedInResume: !o.isSelectedInResume,
                    formPrice: {
                      ...o.formPrice,
                      valueAmount: '',
                      valuePercentage: '',
                      comments: '',
                    },
                  };
                }
                return {
                  ...o,
                };
              }
            }),
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_PURCHASE_PROMISE_FOLLOWING_DATE,
    (state: CloseOfferDetailsState, {date, stringDate, node}): CloseOfferDetailsState => ({
      ...state,
      resumeSection: {
        ...state.resumeSection,
        dateForPurchasePromiseString:
          node === 'promise' ? stringDate : state.resumeSection.dateForPurchasePromiseString,
        dateForPurchasePromise:
          node === 'promise' ? date : state.resumeSection.dateForPurchasePromise,
        dateForFollowingString:
          node === 'following' ? stringDate : state.resumeSection.dateForFollowingString,
        dateForFollowing: node === 'following' ? date : state.resumeSection.dateForFollowing,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_JUSTIFICATION_VALUE,
    (state: CloseOfferDetailsState, {justification, node}): CloseOfferDetailsState => ({
      ...state,
      resumeSection: {
        ...state.resumeSection,
        purchasePromiseJustification:
          node === 'promise' ? justification : state.resumeSection.purchasePromiseJustification,
        cancelJustification:
          node === 'cancel' ? justification : state.resumeSection.cancelJustification,
        adjustmentJustification:
          node === 'adjustment' ? justification : state.resumeSection.adjustmentJustification,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_PAYMENT_CONDITIONS,
    (state: CloseOfferDetailsState, {value}): CloseOfferDetailsState => ({
      ...state,
      resumeSection: {
        ...state.resumeSection,
        selectedAdjustmentPaymentConditions: value,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_ADDITIONAL_DAYS,
    (state: CloseOfferDetailsState, {value}): CloseOfferDetailsState => ({
      ...state,
      resumeSection: {
        ...state.resumeSection,
        additionalDays: value,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_FREIGHT_CHECK_VALUE,
    (state: CloseOfferDetailsState, {value, node}): CloseOfferDetailsState => {
      return {
        ...state,
        resumeSection: {
          ...state.resumeSection,
          [node]: value,
          adjustmentJustification: '',
          selectedAdjustmentPercentage: null,
          selectedAdjustmentFreight: null,
          selectedAdjustmentPaymentConditions: null,
          additionalDays: null,
        },
        selectedQuote: {
          ...state.selectedQuote,
          itemsQuotation:
            node === 'priceIsSelected' && !value
              ? _map(
                  state.selectedQuote.itemsQuotation,
                  (o: IItemQuotation): IItemQuotation => ({
                    ...o,
                    popUpByAmount: {
                      ...o.popUpByAmount,
                      isOpen: false,
                    },
                    formPrice: {...initialFormPrice, price: o.PrecioCotizadoUnitarioConvertido},
                  }),
                )
              : state.selectedQuote.itemsQuotation,
        },
      };
    },
  ),
  on(
    closeOfferDetailsActions.SET_RESTORE_RESUME_VALUES,
    (state: CloseOfferDetailsState): CloseOfferDetailsState => ({
      ...state,
      resumeSection: {
        ...state.resumeSection,
        minusTwoDaysIsSelected: false,
        freightIsSelected: false,
        priceIsSelected: false,
        adjustmentJustification: state.resumeSection.paymentConditionsIsSelected
          ? state.resumeSection.adjustmentJustification
          : '',
        cancelJustification: '',
        purchasePromiseJustification: '',
        selectedAdjustmentFreight: null,
        selectedAdjustmentPercentage: null,
        dateForFollowing: null,
        dateForFollowingString: '',
        selectedCancelReason: null,
        selectedFollowingReason: null,
        dateForPurchasePromise: null,
        dateForPurchasePromiseString: '',
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_REASON_VALUE,
    (state: CloseOfferDetailsState, {reason, node}): CloseOfferDetailsState => ({
      ...state,
      resumeSection: {
        ...state.resumeSection,
        selectedFollowingReason:
          node === 'following' ? reason : state.resumeSection.selectedFollowingReason,
        selectedCancelReason: node === 'cancel' ? reason : state.resumeSection.selectedCancelReason,
        selectedAdjustmentFreight:
          node === 'adjustmentProvider' ? reason : state.resumeSection.selectedAdjustmentFreight,
        selectedAdjustmentPercentage:
          node === 'adjustmentPercentage'
            ? reason
            : state.resumeSection.selectedAdjustmentPercentage,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_SELECTED_BRAND_VALUE,
    (state: CloseOfferDetailsState, {value}): CloseOfferDetailsState => ({
      ...state,
      resumeSection: {
        ...state.resumeSection,
        selectedProviderStep: value,
        selectedProviderId: state.resumeSection.providerList[value].IdProveedor,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_SEARCH_OPTION,
    (state: CloseOfferDetailsState, {searchOption, node}): CloseOfferDetailsState => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        [node]: searchOption,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_SEARCH_TERM,
    (state: CloseOfferDetailsState, {searchTerm, node}): CloseOfferDetailsState => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        [node]: searchTerm,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.CHANGE_COT_COTIZACION_SUCCESS,
    (state: CloseOfferDetailsState, {newQuotationData}): CloseOfferDetailsState => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        ...newQuotationData,
        seeResumeActive: false,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.CHANGE_TOTALS_QUOTATION,
    (state: CloseOfferDetailsState, {totals}): CloseOfferDetailsState => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        ...totals,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.GET_ENTRIES_TOTALS_SUCCESS,
    (state: CloseOfferDetailsState, {entriesTotals}): CloseOfferDetailsState => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        entriesTotals,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.REFRESH_CLOSE_OFFER_DETAILS,
    (state: CloseOfferDetailsState): CloseOfferDetailsState => ({
      ...state,
      selectedQuote: {} as IQuotation,
      quotes: {
        ...state.quotes,
        needsToReloadQuotation: true,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_CLIENT_PANEL_IS_OPEN,
    (state: CloseOfferDetailsState, {sendValue, clientPanelIsOpen}): CloseOfferDetailsState => ({
      ...state,
      clientPanelIsOpen: sendValue ? clientPanelIsOpen : !state.clientPanelIsOpen,
    }),
  ),
  on(
    closeOfferDetailsActions.CLOSE_ALL_ENTRIES_POPS,
    (state: CloseOfferDetailsState): CloseOfferDetailsState => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        itemsQuotation: _map(state.selectedQuote.itemsQuotation, (o: IItemQuotation) => ({
          ...o,
          tracingPop: {
            ...o.tracingPop,
            isOpen: false,
          },
          freightPop: {
            ...o.freightPop,
            isOpen: false,
          },
          ratePop: {
            ...o.ratePop,
            isOpen: false,
          },
          pricePop: {
            ...o.pricePop,
            isOpen: false,
          },
          commentsPop: {
            ...o.commentsPop,
            isOpen: false,
          },
          children: _map(o.children, (i: IItemQuotation) => ({
            ...i,
            tracingPop: {
              ...i.tracingPop,
              isOpen: false,
            },
            freightPop: {
              ...i.freightPop,
              isOpen: false,
            },
            ratePop: {
              ...i.ratePop,
              isOpen: false,
            },
            pricePop: {
              ...i.pricePop,
              isOpen: false,
            },
            commentsPop: {
              ...i.commentsPop,
              isOpen: false,
            },
          })),
        })),
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_ENTRIES_PERCENTAGES,
    (state: CloseOfferDetailsState, {entriesPercentages}): CloseOfferDetailsState => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        entriesPercentages,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.FETCH_BRANDS_SUCCESS,
    (state, {brands}): CloseOfferDetailsState => ({
      ...state,
      brands: {
        ...state.brands,
        listBrands: brands,
        listBrandsStatus: API_REQUEST_STATUS_SUCCEEDED,
        needsToReloadBrands: false,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.FETCH_GENERAL_DATA_CLIENT,
    (state): CloseOfferDetailsState => ({
      ...state,
      brands: {...state.brands, listBrandsStatus: API_REQUEST_STATUS_LOADING},
    }),
  ),

  on(
    closeOfferDetailsActions.SET_BURGER_OPTION_SELECTED,
    (state: CloseOfferDetailsState, {selectedBurgerOption}): CloseOfferDetailsState => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        selectedBurgerOption,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_ADJUSTMENT_TAB_OPTION,
    (state: CloseOfferDetailsState, {selectedTabOption}): CloseOfferDetailsState => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        selectedAdjustmentTabOption: selectedTabOption,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_IN_PROGRESS_TAB_OPTION,
    (state: CloseOfferDetailsState, {selectedTabOption}): CloseOfferDetailsState => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        selectedInProgressTabOption: selectedTabOption,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_RESUME_TAB_OPTION,
    (state: CloseOfferDetailsState, {selectedTabOption}): CloseOfferDetailsState => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        selectedResumeTabOption: selectedTabOption,
      },
      selectedBrand: {
        label: 'Todas',
        value: DEFAULT_UUID,
      },
      resumeSection: {
        ...state.resumeSection,
        providerList: [],
        selectedProviderStep: 0,
        selectedProviderId: DEFAULT_UUID,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.SET_SELECTED_QUOTE,
    (state: CloseOfferDetailsState, {quoteId}): CloseOfferDetailsState => ({
      ...state,
      quotes: {
        ...state.quotes,
        listQuotes: _map(state.quotes.listQuotes, (o: IQuotation) => {
          if (o.IdCotCotizacion === quoteId) {
            return {...o, isSelected: true};
          }
          return {...o, isSelected: false};
        }),
      },
      selectedQuote: filter(
        state.quotes.listQuotes,
        (o: IQuotation) => o.IdCotCotizacion === quoteId,
      )[0],
    }),
  ),
  on(
    closeOfferDetailsActions.SET_ENTRIES_API_STATUS,
    (state: CloseOfferDetailsState, {status}): CloseOfferDetailsState => ({
      ...state,
      entriesApiStatus: status,
    }),
  ),

  on(
    closeOfferDetailsActions.FETCH_QUOTATION_STRATEGY_SUCCESS,
    (
      state,
      {
        listQuotationStrategy,
        listQuotationStrategyTacticOptions,
        ajOfQuotationStrategy,
        itemSelected,
      },
    ): CloseOfferDetailsState => ({
      ...state,
      quotationStrategy: {
        ...state.quotationStrategy,
        listQuotationStrategy,
        listQuotationStrategyTactic: listQuotationStrategyTacticOptions,
        listQuotationStrategyTacticBackup: listQuotationStrategyTacticOptions,
        itemSelected,
        quotationStrategyStatus: API_REQUEST_STATUS_SUCCEEDED,
        needsToReloadQuotationStrategy: false,
        ajOfQuotationStrategy,
        ajOfQuotationStrategyBackup: ajOfQuotationStrategy,
      },
    }),
  ),
  on(closeOfferDetailsActions.SET_FILTER_BY_BRAND, (state, {value}) => ({
    ...state,
    selectedBrand: value,
  })),
  on(closeOfferDetailsActions.SET_CONTACTS, (state, {contacts}) => ({
    ...state,
    contacts,
  })),
  on(closeOfferDetailsActions.SET_CONTACTS_EMAIL, (state, {contacts}) => ({
    ...state,
    contactsEmail: contacts,
    needsToReloadContacts: false,
  })),
  on(closeOfferDetailsActions.SET_MODAL_IS_OPEN_SEND_QUOTATION, (state, {value}) => ({
    ...state,
    isOpenMailPop: value,
    contactsEmail: value
      ? state.contactsEmail
      : _map(state.contactsEmail, (o) => {
          return {...o, isSelected: false};
        }),
  })),
  on(closeOfferDetailsActions.SET_QUOTE_BRANDS_SUCCESS, (state, {quoteBrands}) => ({
    ...state,
    quoteBrands,
  })),
  on(
    closeOfferDetailsActions.FETCH_FREIGHT_POP_UP_DATA_SUCCESS,
    (state, {expressFreightItems}) => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        expressFreightItems,
      },
    }),
  ),
  on(closeOfferDetailsActions.FETCH_TWO_DAYS_POP_UP_DATA_SUCCESS, (state, {twoDaysItems}) => ({
    ...state,
    selectedQuote: {
      ...state.selectedQuote,
      twoDaysItems,
    },
  })),
  on(
    closeOfferDetailsActions.FETCH_PRICE_POP_UP_DATA,
    (state): CloseOfferDetailsState => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        isLoadingPriceItemsAdjusted: true,
        priceItems: [],
      },
    }),
  ),
  on(
    closeOfferDetailsActions.FETCH_PRICE_POP_UP_DATA_SUCCESS,
    (state, {priceItems}): CloseOfferDetailsState => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        priceItems,
        isLoadingPriceItemsAdjusted: false,
      },
    }),
  ),
  on(
    closeOfferDetailsActions.FETCH_PRICE_POP_UP_DATA_ERROR,
    (state): CloseOfferDetailsState => ({
      ...state,
      selectedQuote: {
        ...state.selectedQuote,
        isLoadingPriceItemsAdjusted: false,
      },
    }),
  ),
);
