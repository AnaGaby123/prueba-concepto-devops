/* Core Imports */
import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';

/* Common Imports */
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';

/* Tools Imports */
import {map as _map} from 'lodash-es';

/* Models Imports */
import {
  IClientQuotes,
  IContentDetailsGeneral,
  IContentOfferAdjustment,
  IItemQuotation,
  IItemQuotationByBrand,
  initialIContentDetailsGeneral,
  IQuotation,
} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-details/details/details.model';

/* Actions Imports */
import {
  offerAdjustmentDetailsActions,
  offerAdjustmentDetailsListOfferActions,
  offerAdjustmentDetailsListOfferActionsDeliveryTime,
  offerAdjustmentDetailsListOfferActionsPayment,
  offerAdjustmentDetailsListOfferActionsPaymentConditions,
} from '@appActions/pendings/offer-adjustment';

/* Reducers Imports */
import {paymentReducer} from '@appReducers/pendings/offer-adjustment/offer-adjustment-details/details/sections/list-offer-adjustment/payment/payment.reducer';

/* Utils Imports */
import {calculateAmount} from '@appUtil/util';

const initialStateContentDetailsGeneral: IContentDetailsGeneral = {
  ...initialIContentDetailsGeneral(),
};

export const contentOfferAdjustmentReducer: ActionReducer<IContentOfferAdjustment> = combineReducers(
  {
    contentDetailsGeneral: createReducer(
      initialStateContentDetailsGeneral,
      on(
        offerAdjustmentDetailsListOfferActions.FETCH_QUOTATIONS_SUCCESS,
        (state: IContentDetailsGeneral) => ({
          ...state,
          quotationsDataStatus: API_REQUEST_STATUS_SUCCEEDED,
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.FETCH_QUOTATIONS_FAILED,
        (state: IContentDetailsGeneral) => ({
          ...state,
          quotationsDataStatus: API_REQUEST_STATUS_FAILED,
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.SET_QUOTES_ON_CLIENT,
        (state: IContentDetailsGeneral, {quotes, update}) => ({
          ...state,
          quotationsData: update
            ? _map(state.quotationsData, (clientQuoData, index) => {
                if (
                  quotes.idClient === clientQuoData.idClient &&
                  quotes.idAjOfQuotationStrategy === clientQuoData.idAjOfQuotationStrategy
                ) {
                  return {...quotes};
                } else {
                  return {...clientQuoData};
                }
              })
            : [...state.quotationsData, quotes],
          quotationsDataStatus: API_REQUEST_STATUS_LOADING,
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.SET_QUOTATION_SELECTED,
        (state: IContentDetailsGeneral, {idQuotation, idClient}) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client) => ({
            ...client,
            quotations:
              client.idClient === idClient
                ? _map(client.quotations, (quotation) => ({
                    ...quotation,
                    isSelected: quotation.IdCotCotizacion === idQuotation,
                  }))
                : client.quotations,
          })),
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.SET_QUOTATION,
        (state: IContentDetailsGeneral, {idQuotation, idClient}) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client) => ({
            ...client,
            quotations:
              client.idClient === idClient
                ? _map(client.quotations, (quotation) => ({
                    ...quotation,
                    isSelected: quotation.IdCotCotizacion === idQuotation,
                  }))
                : client.quotations,
          })),
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.SET_ITEMS_QUOTATIONS,
        (
          state: IContentDetailsGeneral,
          {idQuotation, idClient, idAjOfQuotationStrategy, itemsQuotation, itemsQuotationBySingle},
        ) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client: IClientQuotes) => ({
            ...client,
            quotations:
              client.idClient === idClient &&
              client.idAjOfQuotationStrategy === idAjOfQuotationStrategy
                ? _map(client.quotations, (quotation: IQuotation) => ({
                    ...quotation,
                    needsToReloadItemQuotation:
                      quotation.IdCotCotizacion === idQuotation
                        ? true
                        : quotation.needsToReloadItemQuotation,
                    itemsQuotation:
                      quotation.IdCotCotizacion === idQuotation
                        ? itemsQuotation
                        : quotation.itemsQuotation,
                    itemsQuotationBySingle:
                      quotation.IdCotCotizacion === idQuotation
                        ? itemsQuotationBySingle
                        : quotation.itemsQuotationBySingle,
                    itemsQuotationStatus:
                      quotation.IdCotCotizacion === idQuotation
                        ? API_REQUEST_STATUS_SUCCEEDED
                        : quotation.itemsQuotationStatus,
                  }))
                : client.quotations,
          })),
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.SET_BRAND_SELECTED,
        (state: IContentDetailsGeneral, {brand}) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client: IClientQuotes) => ({
            ...client,
            quotations:
              client.idClient === state.currentClient.IdCliente
                ? _map(client.quotations, (quotation: IQuotation) => ({
                    ...quotation,
                    itemsQuotation: _map(quotation.itemsQuotation, (item: IItemQuotationByBrand) =>
                      item.IdMarca === brand.IdMarca
                        ? {...item, isSelected: !item.isSelected}
                        : item,
                    ),
                  }))
                : client.quotations,
          })),
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.SET_ADJUSTMENT_DELIVERY_ACCEPT,
        (state: IContentDetailsGeneral, {idBrand}) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client: IClientQuotes) => ({
            ...client,
            quotations:
              client.idClient === state.currentClient.IdCliente
                ? _map(client.quotations, (quotation: IQuotation) => ({
                    ...quotation,
                    itemsQuotation: _map(quotation.itemsQuotation, (item: IItemQuotationByBrand) =>
                      item.IdMarca === idBrand
                        ? {
                            ...item,
                            openIncidence: false,
                            currentComments: '',
                            ajOfValorConfiguracionTiempoEntregaCotizacionLocal: {
                              ...item.ajOfValorConfiguracionTiempoEntregaCotizacionLocal,
                              Aceptado: true,
                              isConfigured: true,
                              Comentarios: '',
                            },
                          }
                        : item,
                    ),
                  }))
                : client.quotations,
          })),
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.SET_ADJUSTMENT_DELIVERY_DECLINE,
        (state: IContentDetailsGeneral, {idBrand}) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client: IClientQuotes) => ({
            ...client,
            quotations:
              client.idClient === state.currentClient.IdCliente
                ? _map(client.quotations, (quotation: IQuotation) => ({
                    ...quotation,
                    itemsQuotation: _map(quotation.itemsQuotation, (item: IItemQuotationByBrand) =>
                      item.IdMarca === idBrand
                        ? {
                            ...item,
                            ajOfValorConfiguracionTiempoEntregaCotizacionLocal: {
                              ...item.ajOfValorConfiguracionTiempoEntregaCotizacionLocal,
                              Aceptado: null,
                              isConfigured: false,
                              Comentarios: '',
                            },
                            currentComments: '',
                            openIncidence: true,
                          }
                        : item,
                    ),
                  }))
                : client.quotations,
          })),
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.SET_ADJUSTMENT_DELIVERY_INCIDENCE,
        (state: IContentDetailsGeneral, {idBrand, value}) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client: IClientQuotes) => ({
            ...client,
            quotations:
              client.idClient === state.currentClient.IdCliente
                ? _map(client.quotations, (quotation: IQuotation) => ({
                    ...quotation,
                    itemsQuotation: _map(quotation.itemsQuotation, (item: IItemQuotationByBrand) =>
                      item.IdMarca === idBrand
                        ? {
                            ...item,
                            currentComments: value,
                          }
                        : item,
                    ),
                  }))
                : client.quotations,
          })),
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.SAVE_ADJUSTMENT_DELIVERY_INCIDENCE,
        (state: IContentDetailsGeneral, {idBrand}) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client: IClientQuotes) => ({
            ...client,
            quotations:
              client.idClient === state.currentClient.IdCliente
                ? _map(client.quotations, (quotation: IQuotation) => ({
                    ...quotation,
                    itemsQuotation: _map(quotation.itemsQuotation, (item: IItemQuotationByBrand) =>
                      item.IdMarca === idBrand
                        ? {
                            ...item,
                            openIncidence: true,
                            ajOfValorConfiguracionTiempoEntregaCotizacionLocal: {
                              ...item.ajOfValorConfiguracionTiempoEntregaCotizacionLocal,
                              Aceptado: false,
                              isConfigured: true,
                              Comentarios: item.currentComments,
                            },
                          }
                        : item,
                    ),
                  }))
                : client.quotations,
          })),
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.SET_FORM_EXPRESS_FREIGHT,
        (
          state: IContentDetailsGeneral,
          {idBrand, node, activeExpressFreight, commentsExpressFreight, option},
        ) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client: IClientQuotes) => ({
            ...client,
            quotations:
              client.idClient === state.currentClient.IdCliente
                ? _map(client.quotations, (quotation: IQuotation) => ({
                    ...quotation,
                    itemsQuotation: _map(quotation.itemsQuotation, (item: IItemQuotationByBrand) =>
                      item.IdMarca === idBrand
                        ? {
                            ...item,
                            nameProvider: item.nameProvider,
                            currency: item.currency,
                            activeExpressFreight:
                              node === 'activeExpressFreight'
                                ? activeExpressFreight
                                : item.activeExpressFreight,
                            commentsExpressFreight:
                              node === 'commentsExpressFreight'
                                ? commentsExpressFreight
                                : item.commentsExpressFreight,
                            providersFreightItemSelected:
                              node === 'providersFreightItemSelected'
                                ? option
                                : item.providersFreightItemSelected,
                            percentagesItemSelected:
                              node === 'percentagesItemSelected'
                                ? option
                                : item.percentagesItemSelected,
                          }
                        : item,
                    ),
                  }))
                : client.quotations,
          })),
        }),
      ),
      //TODO: Actualmente no se está utlizando, revisar su funcionamiento
      /*      on(
        offerAdjustmentDetailsListOfferActions.SAVE_FORM_EXPRESS_FREIGHT,
        (state: IContentDetailsGeneral, {idBrand}): IContentDetailsGeneral => ({
          ...state,
          quotationsData: _map(
            state.quotationsData,
            (client: IClientQuotes): IClientQuotes => ({
              ...client,
              quotations:
                client.idClient === state.currentClient.IdCliente
                  ? _map(
                      client.quotations,
                      (quotation: IQuotation): IQuotation => ({
                        ...quotation,
                        itemsQuotation: _map(
                          quotation.itemsQuotation,
                          (item: IItemQuotationByBrand): IItemQuotationByBrand =>
                            item.IdMarca === idBrand
                              ? {
                                  ...item,
                                  activePopUpByFreight: false,
                                  nameProvider: item.providersFreightItemSelected.label,
                                  cotFleteExpressCotizacionLocal: {
                                    ...item.cotFleteExpressCotizacionLocal,
                                    IdProveedor: item.providersFreightItemSelected.value,
                                    // FIXME: Se casteo a number, revisar si no impacta
                                    PorcentajeProquifa: Number(item.percentagesItemSelected.value),
                                    // FIXME: La propiedad ya no existe, ver si se puso la correcta
                                    // PrecioFleteExpress: item.providersFreightItemSelected.amount,
                                    PrecioTotal: item.providersFreightItemSelected.amount,
                                  },
                                  ajOfFleteExpressCotizacionLocal: {
                                    ...item.ajOfFleteExpressCotizacionLocal,
                                    Comentarios: item.commentsExpressFreight,
                                    Aceptado: item.activeExpressFreight,
                                    PorcentajeProquifa: Number(item.percentagesItemSelected.value),
                                    PrecioFleteExpress: item.providersFreightItemSelected.amount,
                                    isConfigured: true,
                                  },
                                }
                              : item,
                        ),
                      }),
                    )
                  : client.quotations,
            }),
          ),
        }),
      ),*/
      on(
        offerAdjustmentDetailsListOfferActions.SET_FORM_PRICE,
        (
          state: IContentDetailsGeneral,
          {id, node, typeAmount, typePercentage, price, applyToAllItems, comments},
        ) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client: IClientQuotes) => ({
            ...client,
            quotations:
              client.idClient === state.currentClient.IdCliente
                ? _map(client.quotations, (quotation: IQuotation) => ({
                    ...quotation,
                    formPriceGeneral: {
                      ...quotation.formPriceGeneral,
                      price: node === 'price' ? price : quotation.formPriceGeneral.price,
                      applyToAllItems:
                        node === 'applyToAllItems'
                          ? applyToAllItems
                          : quotation.formPriceGeneral.applyToAllItems,
                      comments:
                        node === 'comments' ? comments : quotation.formPriceGeneral.comments,
                    },
                  }))
                : client.quotations,
          })),
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.SAVE_FORM_PRICE,
        (state: IContentDetailsGeneral, {idItem, idBrand, formPrice}) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client: IClientQuotes) => ({
            ...client,
            quotations:
              client.idClient === state.currentClient.IdCliente
                ? _map(client.quotations, (quotation: IQuotation) => ({
                    ...quotation,
                    itemsQuotationBySingle: _map(
                      quotation.itemsQuotationBySingle,
                      (item: IItemQuotation) => {
                        if (
                          formPrice.applyToAllItems &&
                          (idBrand === item.IdMarca || idBrand === DEFAULT_UUID)
                        ) {
                          return item.IdCotPartidaCotizacion === idItem
                            ? {
                                ...item,
                                formPrice,
                                popUpByAmount: {
                                  ...item.popUpByAmount,
                                  isOpen: false,
                                },
                              }
                            : {
                                ...item,
                                formPrice: {
                                  ...item.formPrice,
                                  valuePercentage: formPrice.valuePercentage,
                                  valueAmount: calculateAmount(
                                    item.formPrice.price,
                                    Number(formPrice.valuePercentage),
                                  ),
                                  applyToAllItems: false,
                                  comments: formPrice.comments,
                                },
                              };
                        } else {
                          return item.IdCotPartidaCotizacion === idItem
                            ? {
                                ...item,
                                formPrice,
                                popUpByAmount: {
                                  ...item.popUpByAmount,
                                  isOpen: false,
                                },
                              }
                            : item;
                        }
                      },
                    ),
                  }))
                : client.quotations,
          })),
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActionsDeliveryTime.SET_FREIGTH_EXPRESS_MODE,
        (state: IContentDetailsGeneral) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client: IClientQuotes) => ({
            ...client,
            quotations:
              client.idClient === state.currentClient.IdCliente
                ? _map(client.quotations, (quotation: IQuotation) => ({
                    ...quotation,
                    itemsQuotation: _map(
                      quotation.itemsQuotation,
                      (item: IItemQuotationByBrand) => ({
                        ...item,
                        openIncidence: false,
                        currentComments: '',
                        ajOfValorConfiguracionTiempoEntregaCotizacionLocal: {
                          ...item.ajOfValorConfiguracionTiempoEntregaCotizacionLocal,
                          Aceptado: null,
                          isConfigured: false,
                          Comentarios: '',
                        },
                      }),
                    ),
                  }))
                : client.quotations,
          })),
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.GET_CAT_PROVIDERS_FREIGHT_LOAD,
        (state: IContentDetailsGeneral) => ({
          ...state,
          catProvidersFreightStatus: API_REQUEST_STATUS_LOADING,
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.GET_CAT_PROVIDERS_FREIGHT_SUCCESS,
        (state: IContentDetailsGeneral, {catProvidersFreight}) => ({
          ...state,
          catProvidersFreight: [...state.catProvidersFreight, catProvidersFreight],
          catProvidersFreightStatus: API_REQUEST_STATUS_SUCCEEDED,
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.GET_CAT_PROVIDERS_FREIGHT_FAILED,
        (state: IContentDetailsGeneral) => ({
          ...state,
          catProvidersFreightStatus: API_REQUEST_STATUS_FAILED,
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.SET_POP_UP_PROVIDERS_FREIGHT,
        (state: IContentDetailsGeneral, {brand, node}) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client: IClientQuotes) => ({
            ...client,
            quotations:
              client.idClient === state.currentClient.IdCliente
                ? _map(client.quotations, (quotation: IQuotation) => ({
                    ...quotation,
                    itemsQuotation: _map(quotation.itemsQuotation, (item: IItemQuotationByBrand) =>
                      item.IdMarca === brand.IdMarca
                        ? {
                            ...item,
                            [node]: !item[node],
                          }
                        : item,
                    ),
                  }))
                : client.quotations,
          })),
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActionsPayment.SET_ENTRY_POP_UP_IS_OPEN,
        (state: IContentDetailsGeneral, {itemId, brandId, isOpen}) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client: IClientQuotes) => ({
            ...client,
            quotations:
              client.idClient === state.currentClient.IdCliente
                ? _map(client.quotations, (quotation: IQuotation) => ({
                    ...quotation,
                    itemsQuotationBySingle: _map(
                      quotation.itemsQuotationBySingle,
                      (item: IItemQuotation) => {
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
                      },
                    ),
                  }))
                : client.quotations,
          })),
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActionsPayment.SET_ENTRY_POP_UP_IS_IN_RANGE,
        (state: IContentDetailsGeneral, {startIndex, endIndex, counter}) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client: IClientQuotes) => ({
            ...client,
            quotations:
              client.idClient === state.currentClient.IdCliente
                ? _map(client.quotations, (quotation: IQuotation) => ({
                    ...quotation,
                    itemsQuotationBySingle: _map(
                      quotation.itemsQuotationBySingle,
                      (item: IItemQuotation) => {
                        counter++;
                        if (counter >= startIndex && counter <= endIndex) {
                          return {
                            ...item,
                            popUpByAmount: {
                              ...item.popUpByAmount,
                              isInRange: true,
                            },
                          };
                        }
                        return {
                          ...item,
                          popUpByAmount: {
                            ...item.popUpByAmount,
                            isInRange: false,
                          },
                        };
                      },
                    ),
                  }))
                : client.quotations,
          })),
        }),
      ),
      on(offerAdjustmentDetailsActions.SET_CLIENT_SELECTED, (state, {clientSelected}) => ({
        ...state,
        currentClient: {
          ...state.currentClient,
          IdCliente: clientSelected.IdCliente,
          IdAjOfEstrategiaCotizacion: clientSelected.IdAjOfEstrategiaCotizacion,
          NombreCliente: clientSelected.Nombre,
          TotalCotizacionesEnAjuste: clientSelected.TotalCotizacionesEnAjuste,
          TotalMarcas: clientSelected.TotalMarcas,
          TotalPartidasEnAjuste: clientSelected.TotalPartidasEnAjuste,
          TotalUSDPartidasEnAjuste: clientSelected.TotalUSDPartidasEnAjuste,
          Index: clientSelected.Index,
        },
      })),
      on(
        offerAdjustmentDetailsListOfferActions.FETCH_AMOUNT_BILLED,
        (state: IContentDetailsGeneral) => ({
          ...state,
          progressBarAmountBilled: {
            ...state.progressBarAmountBilled,
            isLoading: true,
            amountBilledStatus: API_REQUEST_STATUS_LOADING,
          },
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.FETCH_AMOUNT_BILLED_SUCCESS,
        (state: IContentDetailsGeneral, {TotalFacturadoUSD, ObjetivoFundamentalUSD}) => ({
          ...state,
          progressBarAmountBilled: {
            ...state.progressBarAmountBilled,
            isLoading: false,
            amountBilledStatus: API_REQUEST_STATUS_SUCCEEDED,
            TotalFacturadoUSD,
            ObjetivoFundamentalUSD,
          },
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.FETCH_AMOUNT_BILLED_FAILED,
        (state: IContentDetailsGeneral) => ({
          ...state,
          progressBarAmountBilled: {
            ...state.progressBarAmountBilled,
            isLoading: false,
            amountBilledStatus: API_REQUEST_STATUS_FAILED,
          },
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.FETCH_PROGRESS_BAR_TOTAL_IN_CLOSING,
        (state: IContentDetailsGeneral) => ({
          ...state,
          percentageBarTotalInClosing: {
            ...state.percentageBarTotalInClosing,
            isLoading: true,
            amountBilledStatus: API_REQUEST_STATUS_LOADING,
          },
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.FETCH_PROGRESS_BAR_TOTAL_IN_CLOSING_SUCCESS,
        (state: IContentDetailsGeneral, {dataProgressBar}) => ({
          ...state,
          percentageBarTotalInClosing: {
            ...state.percentageBarTotalInClosing,
            isLoading: false,
            amountBilledStatus: API_REQUEST_STATUS_SUCCEEDED,
            TotalPartidasAhorro: dataProgressBar.TotalPartidasAhorro,
            TotalPartidasAlternativas: dataProgressBar.TotalPartidasAlternativas,
            TotalPartidasComplementarias: dataProgressBar.TotalPartidasComplementarias,
            TotalPartidasOriginales: dataProgressBar.TotalPartidasOriginales,
            TotalPartidasPromocion: dataProgressBar.TotalPartidasPromocion,
            ValorTotalUSDenCierre: dataProgressBar.ValorTotalUSDenCierre,
          },
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.FETCH_PROGRESS_BAR_TOTAL_IN_CLOSING_FAILED,
        (state: IContentDetailsGeneral) => ({
          ...state,
          percentageBarTotalInClosing: {
            ...state.percentageBarTotalInClosing,
            isLoading: true,
            amountBilledStatus: API_REQUEST_STATUS_LOADING,
          },
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.FETCH_AMOUNT_BILLED_FAILED,
        (state: IContentDetailsGeneral) => ({
          ...state,
          progressBarAmountBilled: {
            ...state.progressBarAmountBilled,
            isLoading: false,
            amountBilledStatus: API_REQUEST_STATUS_FAILED,
          },
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.SET_REASON_OF_REJECTION_SELECTED,
        (state: IContentDetailsGeneral, {reasonOfRejectionSelected}) => ({
          ...state,
          reasonOfRejectionSelected,
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.SET_OPTION_BAR_ACTIVITY,
        (state: IContentDetailsGeneral, {barActivitySelected}) => ({
          ...state,
          barActivitySelected,
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.SET_QUOTES_ON_CLIENT,
        offerAdjustmentDetailsListOfferActions.SET_QUOTATION_SELECTED,
        offerAdjustmentDetailsActions.SET_CLIENT_SELECTED,
        (state: IContentDetailsGeneral) => ({
          ...state,
          barActivitySelected: 0,
          brandSelected: {
            value: DEFAULT_UUID,
            label: 'Todas',
            total: 0,
            active: true,
            disable: false,
            color: '#008894',
            colorDefault: '#d8d8d8',
          },
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.FETCH_TACTIC_OF_QUOTATIONS_SUCCESS,
        (state: IContentDetailsGeneral, {tactics}) => ({
          ...state,
          tacticsAndSubtactics: {
            ...state.tacticsAndSubtactics,
            tacticsStatus: API_REQUEST_STATUS_SUCCEEDED,
            needsToReloadTactics: false,
            tactics,
          },
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.FETCH_TACTIC_OF_QUOTATIONS_FAILED,
        (state: IContentDetailsGeneral) => ({
          ...state,
          tacticsAndSubtactics: {
            ...state.tacticsAndSubtactics,
            tacticsStatus: API_REQUEST_STATUS_FAILED,
          },
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.FETCH_SUBTACTIC_OF_QUOTATIONS_SUCCESS,
        (state: IContentDetailsGeneral, {subtactics}) => ({
          ...state,
          tacticsAndSubtactics: {
            ...state.tacticsAndSubtactics,
            subtacticsStatus: API_REQUEST_STATUS_SUCCEEDED,
            needsToReloadSubtactics: false,
            subtactics,
          },
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.FETCH_SUBTACTIC_OF_QUOTATIONS_FAILED,
        (state: IContentDetailsGeneral) => ({
          ...state,
          tacticsAndSubtactics: {
            ...state.tacticsAndSubtactics,
            subtacticsStatus: API_REQUEST_STATUS_FAILED,
          },
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.FETCH_QUOTATION_STRATEGY_SUCCESS,
        (state, {listQuotationStrategyTacticOptions, idClient, idQuotation}) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client: IClientQuotes) => ({
            ...client,
            quotations:
              client.idClient === idClient
                ? _map(client.quotations, (quotation: IQuotation) => ({
                    ...quotation,
                    listQuotationStrategyTacticOptions:
                      quotation.IdCotCotizacion === idQuotation
                        ? listQuotationStrategyTacticOptions
                        : quotation.listQuotationStrategyTacticOptions,
                    listQuotationStrategyTacticOptionsStatus:
                      quotation.IdCotCotizacion === idQuotation
                        ? API_REQUEST_STATUS_SUCCEEDED
                        : quotation.listQuotationStrategyTacticOptionsStatus,
                    needsToReloadListQuotationStrategyTacticOptions:
                      quotation.IdCotCotizacion === idQuotation
                        ? false
                        : quotation.needsToReloadListQuotationStrategyTacticOptions,
                  }))
                : client.quotations,
          })),
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActionsPaymentConditions.FETCH_PAYMENT_CONDITIONS_CONF_SUCCESS,
        (state: IContentDetailsGeneral, {confPaymentConditions, idClient, idQuotation}) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client: IClientQuotes) => ({
            ...client,
            quotations:
              client.idClient === idClient
                ? _map(client.quotations, (quotation: IQuotation) => ({
                    ...quotation,
                    paymentConditions:
                      quotation.IdCotCotizacion === idQuotation
                        ? {
                            ...quotation.paymentConditions,
                            confPaymentConditions: {
                              ...quotation.paymentConditions.confPaymentConditions,
                              confPaymentConditions: {
                                ...confPaymentConditions,
                                RequiereAutorizacion: confPaymentConditions.DiasAdicionales > 0,
                              },
                              confPaymentConditionsStatus: API_REQUEST_STATUS_SUCCEEDED,
                              needsToReloadConfPaymentConditions: false,
                              finances: confPaymentConditions.DiasAdicionales > 0,
                            },
                          }
                        : {
                            ...quotation.paymentConditions,
                          },
                  }))
                : [...client.quotations],
          })),
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActionsPaymentConditions.SET_COMMENTS,
        (state: IContentDetailsGeneral, {comments, idQuotation, idClient}) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client: IClientQuotes) => ({
            ...client,
            quotations:
              client.idClient === idClient
                ? _map(client.quotations, (quotation: IQuotation) => ({
                    ...quotation,
                    paymentConditions:
                      quotation.IdCotCotizacion === idQuotation
                        ? {
                            ...quotation.paymentConditions,
                            confPaymentConditions: {
                              ...quotation.paymentConditions.confPaymentConditions,
                              confPaymentConditions: {
                                ...quotation.paymentConditions.confPaymentConditions
                                  .confPaymentConditions,
                                Comentarios: comments,
                              },
                            },
                          }
                        : {
                            ...quotation.paymentConditions,
                          },
                  }))
                : [...client.quotations],
          })),
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActionsPaymentConditions.SET_DAYS,
        (
          state: IContentDetailsGeneral,
          {days, idQuotation, idClient, paymentConditionsSelected},
        ) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client: IClientQuotes) => ({
            ...client,
            quotations:
              client.idClient === idClient
                ? _map(client.quotations, (quotation: IQuotation) => ({
                    ...quotation,
                    paymentConditions:
                      quotation.IdCotCotizacion === idQuotation
                        ? {
                            ...quotation.paymentConditions,
                            confPaymentConditions: {
                              ...quotation.paymentConditions.confPaymentConditions,
                              confPaymentConditions: {
                                ...quotation.paymentConditions.confPaymentConditions
                                  .confPaymentConditions,
                                DiasAdicionales: days,
                                RequiereAutorizacion:
                                  days > 0 || paymentConditionsSelected.value !== DEFAULT_UUID,
                              },
                              finances:
                                days > 0 || paymentConditionsSelected.value !== DEFAULT_UUID,
                            },
                          }
                        : {
                            ...quotation.paymentConditions,
                          },
                  }))
                : [...client.quotations],
          })),
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActionsPaymentConditions.SET_PAYMENT_CONDITIONS_SELECTED,
        (
          state: IContentDetailsGeneral,
          {paymentConditionsSelected, idClient, idQuotation, additionalDays},
        ) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client: IClientQuotes) => ({
            ...client,
            quotations:
              client.idClient === idClient
                ? _map(client.quotations, (quotation: IQuotation) => ({
                    ...quotation,
                    paymentConditions:
                      quotation.IdCotCotizacion === idQuotation
                        ? {
                            ...quotation.paymentConditions,
                            paymentConditionsSelected,
                            confPaymentConditions: {
                              ...quotation.paymentConditions.confPaymentConditions,
                              confPaymentConditions: {
                                ...quotation.paymentConditions.confPaymentConditions
                                  .confPaymentConditions,
                                RequiereAutorizacion:
                                  paymentConditionsSelected.value !== DEFAULT_UUID ||
                                  additionalDays > 0,
                              },
                              finances:
                                paymentConditionsSelected.value !== DEFAULT_UUID ||
                                additionalDays > 0,
                            },
                          }
                        : {
                            ...quotation.paymentConditions,
                          },
                  }))
                : [...client.quotations],
          })),
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.SET_OPTION_BRAND_SELECTED,
        (state: IContentDetailsGeneral, {option}) => ({
          ...state,
          brandSelected: option,
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.SET_AUTHORIZATION_REQUEST_SUCCESS,
        (
          state: IContentDetailsGeneral,
          {idQuotation, idClient, idAjOfQuotationStrategy, authorizationRequest},
        ) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client: IClientQuotes) => ({
            ...client,
            quotations:
              client.idClient === idClient &&
              client.idAjOfQuotationStrategy === idAjOfQuotationStrategy
                ? _map(client.quotations, (quotation: IQuotation) => ({
                    ...quotation,
                    authorizationRequest:
                      quotation.IdCotCotizacion === idQuotation
                        ? authorizationRequest
                        : quotation.authorizationRequest,
                  }))
                : client.quotations,
          })),
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.SET_CODE_VALUE_BY_POSITION,
        (state: IContentDetailsGeneral, {position, value}): IContentDetailsGeneral => ({
          ...state,
          code: _map(state.code, (o: string, index: number): string => {
            if (position === index) {
              return value.toString();
            } else {
              return o;
            }
          }),
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.RESTORE_CODE_VALUE,
        (state: IContentDetailsGeneral) => ({
          ...state,
          code: [null, null, null, null],
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.SET_SHAKED,
        (state: IContentDetailsGeneral, {value}) => ({
          ...state,
          shaked: value,
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.HANDLE_POP_UP_CODE,
        (state: IContentDetailsGeneral, {popUpCode}) => ({
          ...state,
          popUpCode,
          code: !popUpCode ? [null, null, null, null] : state.code,
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.HANDLE_POP_UP_REJECT,
        (state: IContentDetailsGeneral, {popUpReject}) => ({
          ...state,
          popUpReject,
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.SET_EMAIL_SENT_TO,
        (
          state: IContentDetailsGeneral,
          {idQuotation, idClient, idAjOfQuotationStrategy, emailSentTo},
        ) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client: IClientQuotes) => ({
            ...client,
            quotations:
              client.idClient === idClient &&
              client.idAjOfQuotationStrategy === idAjOfQuotationStrategy
                ? _map(client.quotations, (quotation: IQuotation) => ({
                    ...quotation,
                    emailSentTo:
                      quotation.IdCotCotizacion === idQuotation
                        ? emailSentTo
                        : quotation.emailSentTo,
                  }))
                : client.quotations,
          })),
        }),
      ),
      on(
        offerAdjustmentDetailsListOfferActions.SET_ID_REQUEST_AUTHORIZATION_CHANGE,
        (
          state: IContentDetailsGeneral,
          {idQuotation, idClient, idAjOfQuotationStrategy, IdSolicitudAutorizacionCambio},
        ) => ({
          ...state,
          quotationsData: _map(state.quotationsData, (client: IClientQuotes) => ({
            ...client,
            quotations:
              client.idClient === idClient &&
              client.idAjOfQuotationStrategy === idAjOfQuotationStrategy
                ? _map(client.quotations, (quotation: IQuotation) => ({
                    ...quotation,
                    IdSolicitudAutorizacionCambio:
                      quotation.IdCotCotizacion === idQuotation
                        ? IdSolicitudAutorizacionCambio
                        : quotation.IdSolicitudAutorizacionCambio,
                  }))
                : client.quotations,
          })),
        }),
      ),
      on(offerAdjustmentDetailsListOfferActions.CLEAN_QUOTATIONS, (state) => ({
        ...state,
        quotationsData: [],
      })),
      on(offerAdjustmentDetailsListOfferActions.CLEAN_CONTENT_DETAILS_GENERAL, (state) => ({
        ...initialStateContentDetailsGeneral,
      })),
      on(offerAdjustmentDetailsActions.CLEAR_QUOTATIONS_AND_CLIENT_SELECTED, (state) => ({
        ...state,
        percentageBarTotalInClosing: initialIContentDetailsGeneral().percentageBarTotalInClosing,
      })),
    ),
    paymentConditions: createReducer({} as any),
    payment: paymentReducer,
    adjustmentsSummary: createReducer({} as any),
  },
);
