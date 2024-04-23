/* Core Imports */
import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  IAjustePrecioPartidaObj,
  IClientAdjustmentOffer,
  IClients,
  IConfigExpressFreight,
  IContentOfferAdjustment,
  IDetailsState,
  initialContentOfferAdjustment,
  initialDetailsState,
  initialIClients,
  IOfferAdjustmentClientQuotations,
  offerAdjustCarrousel,
} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-details/details/details.model';

/* Reducer Imports */
import {contentOfferAdjustmentReducer} from '@appReducers/pendings/offer-adjustment/offer-adjustment-details/details/sections/list-offer-adjustment/list-offer-adjustment.reducer';

/* Actions Imports */
import {offerAdjustmentDetailsActions} from '@appActions/pendings/offer-adjustment';

/* Tools Imports */
import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  ENUM_SECURE_POP,
} from '@appUtil/common.protocols';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {isEmpty, map} from 'lodash-es';
import {AjusteMenosDosDiasPartidaObj} from 'api-logistica';

const initialStateOfferAdjustment: IDetailsState = {
  ...initialDetailsState(),
};

const initialStateClients: IClients = {
  ...initialIClients(),
};

const initialStateContentOfferAdjustment: IContentOfferAdjustment = {
  ...initialContentOfferAdjustment(),
};

export const detailsReducer: ActionReducer<IDetailsState> = combineReducers(
  {
    clients: createReducer(
      initialStateClients,
      on(offerAdjustmentDetailsActions.CLEAN_ALL_OFFER_ADJUSTMENT_DETAILS, (state: IClients) => ({
        ...initialStateClients,
      })),
      on(offerAdjustmentDetailsActions.FETCH_CLIENTS, (state: IClients, {isFirstPage}) => ({
        ...state,
        queryInfo: {
          ...state.queryInfo,
          desiredPage: isFirstPage ? 1 : state.queryInfo.desiredPage + 1,
        },
        dataListClientsStatus: API_REQUEST_STATUS_LOADING,
        needsToReloadListClients: true,
      })),
      on(offerAdjustmentDetailsActions.SET_TAB, (state: IClients, {tabSelected}) => ({
        ...state,
        tabSelected,
        listClients: [],
        queryInfo: {
          ...state.queryInfo,
          desiredPage: 1,
        },
        dataListClientsStatus: API_REQUEST_STATUS_LOADING,
        needsToReloadListClients: true,
      })),
      on(offerAdjustmentDetailsActions.SET_TYPE_SELECTED, (state: IClients, {typeSelected}) => ({
        ...state,
        typeSelected,
      })),
      on(offerAdjustmentDetailsActions.SET_SEARCH_TERM, (state: IClients, {searchTerm}) => ({
        ...state,
        searchTerm,
        listClients: [],
        queryInfo: {
          ...state.queryInfo,
          desiredPage: 1,
        },
        dataListClientsStatus: API_REQUEST_STATUS_LOADING,
        needsToReloadListClients: true,
      })),
      on(
        offerAdjustmentDetailsActions.SET_VALUE_FILTER_SELECTED,
        (state: IClients, {valueFilterSelected}) => ({
          ...state,
          valueFilterSelected,
          listClients: [],
          queryInfo: {
            ...state.queryInfo,
            desiredPage: 1,
          },
          dataListClientsStatus: API_REQUEST_STATUS_LOADING,
          needsToReloadListClients: true,
        }),
      ),
      on(
        offerAdjustmentDetailsActions.FETCH_CLIENT_SUCCESS,
        (state: IClients, {listClients, totalClients}) => ({
          ...state,
          listClients,
          totalClients,
          dataListClientsStatus: API_REQUEST_STATUS_SUCCEEDED,
          needsToReloadListClients: false,
        }),
      ),
      on(offerAdjustmentDetailsActions.FETCH_CLIENT_FAILED, (state: IClients) => ({
        ...state,
        dataListClientsStatus: API_REQUEST_STATUS_FAILED,
      })),
      on(
        offerAdjustmentDetailsActions.SET_IS_LOADING_MORE_CLIENTS,
        (state: IClients, {isLoadingMoreClients}) => ({
          ...state,
          isLoadingMoreClients,
        }),
      ),
      on(offerAdjustmentDetailsActions.SAVE_TOTAL_TABS, (state, {totals}) => ({
        ...state,
        filterTabs: map(state.filterTabs, (o: ITabOption) => {
          // DOCS: Crea una copia modificable de la tab
          const modifiedTabOption = Object.assign({}, o);
          switch (o.label) {
            case 'Todos':
              modifiedTabOption.totalSubtitle = String(totals.Todos);
              modifiedTabOption.labelSubtitle = String(totals.Todos === 1 ? 'Cliente' : 'Clientes');
              break;
            case 'T.Entrega':
              modifiedTabOption.totalSubtitle = String(totals.TotalClientesAjusteTiempoEntrega);
              modifiedTabOption.labelSubtitle = String(
                totals.TotalClientesAjusteTiempoEntrega === 1 ? 'Cliente' : 'Clientes',
              );
              break;
            case 'C.Pago':
              modifiedTabOption.totalSubtitle = String(totals.TotalClientesAjusteCondicionesDePago);
              modifiedTabOption.labelSubtitle = String(
                totals.TotalClientesAjusteCondicionesDePago === 1 ? 'Cliente' : 'Clientes',
              );
              break;
            case 'Precio':
              modifiedTabOption.totalSubtitle = String(totals.TotalClientesAjustePrecio);
              modifiedTabOption.labelSubtitle = String(
                totals.TotalClientesAjustePrecio === 1 ? 'Cliente' : 'Clientes',
              );
              break;
          }
          return modifiedTabOption;
        }),
      })),
      on(offerAdjustmentDetailsActions.CLEAR_QUOTATIONS_AND_CLIENT_SELECTED, (state) => ({
        ...state,
        listClients: [],
        needsToReloadListClients: false,
        isLoadingMoreClients: false,
        dataListClientsStatus: API_REQUEST_STATUS_SUCCEEDED,
        totalClients: 0,
      })),
    ),
    clientSelected: createReducer(
      {} as IClientAdjustmentOffer,
      on(offerAdjustmentDetailsActions.CLEAR_QUOTATIONS_AND_CLIENT_SELECTED, (state) => null),
      on(
        offerAdjustmentDetailsActions.SET_CLIENT_SELECTED,
        (state, {clientSelected}) => clientSelected,
      ),
      on(offerAdjustmentDetailsActions.CLEAN_CLIENT_SELECTED, (state) => ({
        ...({} as IClientAdjustmentOffer),
      })),
    ),
    contentOfferAdjustment: contentOfferAdjustmentReducer,
    clientQuotations: createReducer(
      initialDetailsState().clientQuotations,
      on(offerAdjustmentDetailsActions.CLEAR_QUOTATIONS_AND_CLIENT_SELECTED, (state) => ({
        ...state,
        quotations: null,
        needsToReload: false,
        apiStatus: API_REQUEST_STATUS_SUCCEEDED,
      })),
      on(offerAdjustmentDetailsActions.SET_CLIENT_SELECTED, (state) => ({
        ...state,
        apiStatus: API_REQUEST_STATUS_DEFAULT,
        quotations: null,
      })),
      on(offerAdjustmentDetailsActions.SET_CLIENT_QUOTES, (state, {clientQuotations}) => ({
        ...state,
        needsToReload: false,
        apiStatus: API_REQUEST_STATUS_SUCCEEDED,
        quotations: clientQuotations,
      })),
      on(offerAdjustmentDetailsActions.SET_SELECTED_QUOTATION, (state, {quotation}) => ({
        ...state,
        quotations: map(
          state.quotations,
          (o: offerAdjustCarrousel): offerAdjustCarrousel => {
            return {
              ...o,
              configApiStatus: !o.offerConfig ? API_REQUEST_STATUS_LOADING : o.configApiStatus,
              selected: quotation.value === o.IdCotCotizacion,
            };
          },
        ),
      })),
      on(
        offerAdjustmentDetailsActions.SET_QUOTATION_CONFIG_SUCCESS,
        (state, {quotationConfig}) => ({
          ...state,
          quotations: map(
            state.quotations,
            (o: offerAdjustCarrousel): offerAdjustCarrousel => {
              if (o.IdCotCotizacion === quotationConfig.IdCotCotizacion) {
                return {
                  ...o,
                  configApiStatus: API_REQUEST_STATUS_SUCCEEDED,
                  offerConfig: quotationConfig,
                };
              }
              return {
                ...o,
              };
            },
          ),
        }),
      ),
      on(offerAdjustmentDetailsActions.SET_TWO_DAYS_OPTION, (state, {value}) => ({
        ...state,
        quotations: map(
          state.quotations,
          (o: offerAdjustCarrousel): offerAdjustCarrousel => {
            if (o.selected) {
              return {
                ...o,
                deliveryTimeControls: {
                  twoDays: value,
                  expressFreight: false,
                },
              };
            }
            return {
              ...o,
            };
          },
        ),
      })),
      on(offerAdjustmentDetailsActions.SET_EXPRESS_FREIGHT_OPTION, (state, {value}) => ({
        ...state,
        quotations: map(
          state.quotations,
          (o: offerAdjustCarrousel): offerAdjustCarrousel => {
            if (o.selected) {
              return {
                ...o,
                deliveryTimeControls: {
                  twoDays: false,
                  expressFreight: value,
                },
              };
            }
            return {
              ...o,
            };
          },
        ),
      })),
      on(
        offerAdjustmentDetailsActions.SET_SHOW_COMMENTS,
        (state: IOfferAdjustmentClientQuotations, {index}) => ({
          ...state,
          quotations: map(
            state.quotations,
            (o: offerAdjustCarrousel): offerAdjustCarrousel => {
              if (o.selected) {
                return {
                  ...o,
                  offerConfig: {
                    ...o.offerConfig,
                    expressFreight: map(
                      o.offerConfig.expressFreight,
                      (it: IConfigExpressFreight, i) => {
                        if (i === index) {
                          return {
                            ...it,
                            showComments: !it.showComments,
                          };
                        }
                        return {
                          ...it,
                          showComments: false,
                        };
                      },
                    ),
                  },
                };
              }
              return {
                ...o,
              };
            },
          ),
        }),
      ),
      on(
        offerAdjustmentDetailsActions.SET_SHOW_ITEMS,
        (state: IOfferAdjustmentClientQuotations, {index}) => ({
          ...state,
          quotations: map(
            state.quotations,
            (o: offerAdjustCarrousel): offerAdjustCarrousel => {
              if (o.selected) {
                return {
                  ...o,
                  offerConfig: {
                    ...o.offerConfig,
                    expressFreight: map(
                      o.offerConfig.expressFreight,
                      (it: IConfigExpressFreight, i) => {
                        if (i === index) {
                          return {
                            ...it,
                            showItems: !it.showItems,
                          };
                        }
                        return {
                          ...it,
                          showItems: false,
                        };
                      },
                    ),
                  },
                };
              }
              return {
                ...o,
              };
            },
          ),
        }),
      ),
      on(offerAdjustmentDetailsActions.SET_EXPRESS_FREIGHT_POP_CONFIG, (state, {config}) => ({
        ...state,
        quotations: map(
          state.quotations,
          (o: offerAdjustCarrousel): offerAdjustCarrousel => {
            if (o.selected) {
              return {
                ...o,
                offerConfig: {
                  ...o.offerConfig,
                  expressFreight: map(
                    o.offerConfig.expressFreight,
                    (it: IConfigExpressFreight, i) => {
                      if (i === config.index) {
                        return {
                          ...it,
                          ajOfFleteExpressCotizacion: {
                            ...it.ajOfFleteExpressCotizacion,
                            Aceptado:
                              config.active &&
                              Number(config.percentageSelected.value) === it.originalPercentage,
                            Rechazado: !config.active,
                            ParcialmenteAceptado:
                              config.active &&
                              Number(config.percentageSelected.value) !== it.originalPercentage,
                            PorcentajeProquifa: Number(config.percentageSelected.value),
                            Comentarios: config.comments,
                          },
                        };
                      }
                      return {
                        ...it,
                      };
                    },
                  ),
                },
              };
            }
            return {
              ...o,
            };
          },
        ),
      })),
      on(
        offerAdjustmentDetailsActions.SET_PAYMENT_CONDITIONS_FORM_VALUE,
        (state, {field, value}) => ({
          ...state,
          quotations: map(
            state.quotations,
            (o: offerAdjustCarrousel): offerAdjustCarrousel => {
              if (o.selected) {
                return {
                  ...o,
                  offerConfig: {
                    ...o.offerConfig,
                    paymentConditions: {
                      ...o.offerConfig.paymentConditions,
                      [field]: value,
                      Aceptado:
                        o.offerConfig.paymentConditions.IdCatCondicionesDePagoOriginal ===
                          o.offerConfig.paymentConditions.IdCatCondicionesDePago &&
                        o.offerConfig.paymentConditions.DiasAdicionalesOriginal ===
                          o.offerConfig.paymentConditions.DiasAdicionales,
                      Rechazado:
                        o.offerConfig.paymentConditions.IdCatCondicionesDePagoOriginal !==
                          o.offerConfig.paymentConditions.IdCatCondicionesDePago ||
                        o.offerConfig.paymentConditions.DiasAdicionalesOriginal !==
                          o.offerConfig.paymentConditions.DiasAdicionales,
                      RequiereAutorizacion:
                        field === 'DiasAdicionales'
                          ? value > 10
                          : o.offerConfig.paymentConditions.RequiereAutorizacion,
                    },
                  },
                };
              }
              return {
                ...o,
              };
            },
          ),
        }),
      ),
      on(offerAdjustmentDetailsActions.SET_CHECK_ITEM_VALUE, (state, {index, value}) => ({
        ...state,
        quotations: map(
          state.quotations,
          (o: offerAdjustCarrousel): offerAdjustCarrousel => {
            if (o.selected) {
              return {
                ...o,
                offerConfig: {
                  ...o.offerConfig,
                  twoDaysConfig: map(
                    o.offerConfig.twoDaysConfig,
                    (it: AjusteMenosDosDiasPartidaObj, i): AjusteMenosDosDiasPartidaObj => {
                      if (i === index) {
                        return {
                          ...it,
                          ajOfValorConfiguracionTiempoEntregaCotizacion: {
                            ...it.ajOfValorConfiguracionTiempoEntregaCotizacion,
                            Aceptado: !!value,
                            Rechazado: !value,
                          },
                        };
                      }
                      return {
                        ...it,
                      };
                    },
                  ),
                },
              };
            }
            return {
              ...o,
            };
          },
        ),
      })),
      on(
        offerAdjustmentDetailsActions.UPDATE_PAYMENT_CONFIG,
        (state, {ammount, comments, IdCotPartidaCotizacion, percentage}) => ({
          ...state,
          quotations: map(
            state.quotations,
            (o: offerAdjustCarrousel): offerAdjustCarrousel => {
              if (o.selected) {
                return {
                  ...o,
                  offerConfig: {
                    ...o.offerConfig,
                    priceConfig: map(
                      o.offerConfig.priceConfig,
                      (it: IAjustePrecioPartidaObj): IAjustePrecioPartidaObj => {
                        if (
                          it.ajOfPrecioCotizacion.IdCotPartidaCotizacion === IdCotPartidaCotizacion
                        ) {
                          return {
                            ...it,
                            ajOfPrecioCotizacion: {
                              ...it.ajOfPrecioCotizacion,
                              Comentarios: comments,
                              PrecioUnitarioPactado: Number(ammount),
                              Aceptado: Number(ammount) <= it.PrecioUnitarioPactadoOriginal,
                              Rechazado:
                                Number(ammount) ===
                                it.cotPartidaCotizacionDetalle.gMCotPartidasDetalle
                                  .VPartidaCotizacion.PrecioCotizadoUnitarioConvertido,
                              ParcialmenteAceptado:
                                Number(ammount) <
                                  it.cotPartidaCotizacionDetalle.gMCotPartidasDetalle
                                    .VPartidaCotizacion.PrecioCotizadoUnitarioConvertido &&
                                Number(ammount) > it.PrecioUnitarioPactadoOriginal,
                              RequiereAutorizacion: percentage > 2,
                            },
                          };
                        }
                        return {
                          ...it,
                        };
                      },
                    ),
                  },
                };
              }
              return {
                ...o,
              };
            },
          ),
        }),
      ),
      on(
        offerAdjustmentDetailsActions.VERIFICATION_CORE_REVIEW_SUCCESS,
        (state, {valid, status}) => ({
          ...state,
          quotations: map(
            state.quotations,
            (o: offerAdjustCarrousel): offerAdjustCarrousel => {
              if (o.selected) {
                return {
                  ...o,
                  authorizationObj: {
                    ...o.authorizationObj,
                    valid,
                    status,
                  },
                  offerConfig: valid
                    ? {
                        ...o.offerConfig,
                        paymentConditions: !isEmpty(o.offerConfig.paymentConditions)
                          ? {
                              ...o.offerConfig.paymentConditions,
                              RequiereAutorizacion: false,
                            }
                          : o.offerConfig.paymentConditions,
                        priceConfig: !isEmpty(o.offerConfig.priceConfig)
                          ? map(
                              o.offerConfig.priceConfig,
                              (it: IAjustePrecioPartidaObj): IAjustePrecioPartidaObj => {
                                return {
                                  ...it,
                                  ajOfPrecioCotizacion: {
                                    ...it.ajOfPrecioCotizacion,
                                    RequiereAutorizacion: false,
                                  },
                                };
                              },
                            )
                          : o.offerConfig.priceConfig,
                      }
                    : {...o.offerConfig},
                };
              }
              return {
                ...o,
              };
            },
          ),
        }),
      ),
      on(offerAdjustmentDetailsActions.SET_CODE_VALUE, (state, {code}) => ({
        ...state,
        quotations: map(
          state.quotations,
          (o: offerAdjustCarrousel): offerAdjustCarrousel => {
            if (o.selected) {
              return {
                ...o,
                authorizationObj: {
                  ...o.authorizationObj,
                  code,
                  status: ENUM_SECURE_POP.default,
                  valid: null,
                },
              };
            }
            return {
              ...o,
            };
          },
        ),
      })),
      on(offerAdjustmentDetailsActions.VERIFICATION_CODE_REVIEW_LOAD, (state, {code}) => ({
        ...state,
        quotations: map(
          state.quotations,
          (o: offerAdjustCarrousel): offerAdjustCarrousel => {
            if (o.selected) {
              return {
                ...o,
                authorizationObj: {
                  ...o.authorizationObj,
                  CodigoAutorizacion: code,
                },
              };
            }
            return {
              ...o,
            };
          },
        ),
      })),
      on(
        offerAdjustmentDetailsActions.REQUEST_VERIFICATION_CODE_SUCCESS,
        (state, {AutorizacionDetalle}) => ({
          ...state,
          quotations: map(
            state.quotations,
            (o: offerAdjustCarrousel): offerAdjustCarrousel => {
              if (o.selected) {
                return {
                  ...o,
                  authorizationObj: {
                    code: [null, null, null, null],
                    authorization:
                      AutorizacionDetalle.ListaAutorizacionCodigoUsuario[0].AutorizacionCodigo,
                    CodigoAutorizacion: '',
                    valid: null,
                    status: ENUM_SECURE_POP.default,
                  },
                };
              }
              return {
                ...o,
              };
            },
          ),
        }),
      ),
      on(offerAdjustmentDetailsActions.SEND_CODE_VERIFICATION_LOAD, (state, {code}) => ({
        ...state,
        quotations: map(
          state.quotations,
          (o: offerAdjustCarrousel): offerAdjustCarrousel => {
            if (o.selected) {
              return {
                ...o,
                authorizationObj: {
                  ...o.authorizationObj,
                  CodigoAutorizacion: code,
                },
              };
            }
            return {
              ...o,
            };
          },
        ),
      })),
      on(offerAdjustmentDetailsActions.SET_INITIAL_AUTHORIZATION_OBJ, (state) => ({
        ...state,
        quotations: map(
          state.quotations,
          (o: offerAdjustCarrousel): offerAdjustCarrousel => {
            if (o.selected) {
              return {
                ...o,
                authorizationObj:
                  o.authorizationObj === null
                    ? {
                        code: [null, null, null, null],
                        authorization: null,
                        CodigoAutorizacion: '',
                        valid: null,
                        status: ENUM_SECURE_POP.default,
                      }
                    : o.authorizationObj,
              };
            }
            return {
              ...o,
            };
          },
        ),
      })),
      on(offerAdjustmentDetailsActions.CANCEL_AUTHORIZATION_CODE_SUCCESS, (state) => ({
        ...state,
        quotations: map(
          state.quotations,
          (o: offerAdjustCarrousel): offerAdjustCarrousel => {
            if (o.selected) {
              return {
                ...o,
                authorizationObj: null,
              };
            }
            return {
              ...o,
            };
          },
        ),
      })),
      on(offerAdjustmentDetailsActions.SEND_CODE_VERIFICATION_SUCCESS, (state, {response}) => ({
        ...state,
        quotations: map(
          state.quotations,
          (o: offerAdjustCarrousel): offerAdjustCarrousel => {
            if (o.selected) {
              return {
                ...o,
                authorizationObj: {
                  code: [null, null, null, null],
                  authorization: response,
                  CodigoAutorizacion: '',
                  valid: null,
                  status: ENUM_SECURE_POP.default,
                },
              };
            }
            return {
              ...o,
            };
          },
        ),
      })),
      on(offerAdjustmentDetailsActions.SEND_CODE_VERIFICATION_LOAD, (state, {code}) => ({
        ...state,
        quotations: map(
          state.quotations,
          (o: offerAdjustCarrousel): offerAdjustCarrousel => {
            if (o.selected) {
              return {
                ...o,
                authorizationObj: {
                  ...o.authorizationObj,
                  CodigoAutorizacion: code,
                },
              };
            }
            return {
              ...o,
            };
          },
        ),
      })),
    ),
  },
  initialStateOfferAdjustment,
);
