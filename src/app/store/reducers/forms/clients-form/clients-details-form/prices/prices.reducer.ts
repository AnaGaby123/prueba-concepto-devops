import {createReducer, on} from '@ngrx/store';
import {pricesActions} from '@appActions/forms/client-form';
import {CLEAN_ALL_CLIENTS_STATE} from '@appActions/catalogs/cliente.actions';
import {
  ClientPricesState,
  IConfClient,
  initialPricesState,
  IVClientProductClassification,
  IVClientProductConfiguration,
  IVProductListPriceConfigurationClient,
  IVProviderResume,
  IVTrademarkFamily,
} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';
import {
  initialFamily,
  initialTabsSubConfigurationsOptions,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {filter, find, flow, isEmpty, map} from 'lodash-es';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {getObjectPercentagePriceList} from '@appUtil/math';
import {VPrecioListaClienteProducto} from 'api-catalogos';

export const pricesReducer = createReducer(
  initialPricesState(),
  on(CLEAN_ALL_CLIENTS_STATE, () => ({
    ...initialPricesState(),
  })),
  on(
    pricesActions.GET_ADDRESSES_CLIENT_SUCCESS,
    (state: ClientPricesState, {clientAddresses}): ClientPricesState => ({
      ...state,
      clientAddresses,
    }),
  ),
  on(
    pricesActions.SHOW_PROVIDERS_LIST,
    (state: ClientPricesState): ClientPricesState => ({
      ...state,
      showProviderList: !state.showProviderList,
    }),
  ),
  on(
    pricesActions.SET_PRE_SELECTED_PROVIDER,
    (state: ClientPricesState, {value}): ClientPricesState => ({
      ...state,
      preSelectedProvider: value,
    }),
  ),
  on(
    pricesActions.SET_SHOW_PRICE_LIST,
    (state: ClientPricesState): ClientPricesState => ({
      ...state,
      showPricesList: !state.showPricesList,
    }),
  ),
  on(
    pricesActions.SET_PRE_SELECTED_FAMILY,
    (state: ClientPricesState, {value}): ClientPricesState => ({
      ...state,
      preSelectedFamily: value,
    }),
  ),
  on(
    pricesActions.SET_PRE_SELECTED_LEVEL_CONFIGURATION,
    (state: ClientPricesState, {value}): ClientPricesState => ({
      ...state,
      preSelectedLevelConfiguration: value,
    }),
  ),
  on(pricesActions.CLEAN_PRICES_CLIENT_STATE, () => ({
    ...initialPricesState(),
  })),
  on(
    pricesActions.GET_PROVIDERS_LIST_LOAD,
    (state: ClientPricesState, {isFirstPage}): ClientPricesState => ({
      ...state,
      providers: {
        ...state.providers,
        desiredPage: isFirstPage ? 1 : state.providers.desiredPage + 1,
        apiStatus: API_REQUEST_STATUS_LOADING,
      },
    }),
  ),
  on(
    pricesActions.SET_PROVIDER_SELECTED_LOAD,
    (state: ClientPricesState, {provider}): ClientPricesState => ({
      ...state,
      selectedProvider: provider,
    }),
  ),
  on(pricesActions.SET_PROVIDERS_IS_LOADING, (state, {apiStatus}) => ({
    ...state,
    providers: {
      ...state.providers,
      apiStatus,
    },
  })),
  on(pricesActions.SET_SEARCH_TERM_BY_PROVIDER, (state, {searchTerm}) => ({
    ...state,
    providers: {
      ...state.providers,
      searchTerm,
      desiredPage: 1,
      needToReload: true,
      providersList: {
        ...state.providers.providersList,
        Results: [],
        TotalResults: 0,
      },
    },
  })),
  on(
    pricesActions.GET_PROVIDERS_LIST_SUCCESS,
    (state: ClientPricesState, {providers}): ClientPricesState => ({
      ...state,
      providers: {
        ...state.providers,
        providersList: {
          ...state.providers.providersList,
          Results:
            state.providers.desiredPage === 1
              ? [...providers.Results]
              : [...state.providers.providersList.Results, ...providers.Results],
          TotalResults: providers.TotalResults,
        },
        apiStatus: API_REQUEST_STATUS_SUCCEEDED,
      },
    }),
  ),
  on(
    pricesActions.SET_PROVIDER_LIST_SUCCESS,
    (state: ClientPricesState): ClientPricesState => ({
      ...state,
      providers: {
        ...state.providers,
        apiStatus: API_REQUEST_STATUS_SUCCEEDED,
      },
    }),
  ),
  on(
    pricesActions.SET_SELECTED_PROVIDER,
    (state: ClientPricesState, {providerId}): ClientPricesState => ({
      ...state,
      // DOCS: Recorrer las proveedores
      providers: {
        ...state.providers,
        providersList: {
          ...state.providers.providersList,
          Results: map(state.providers.providersList.Results, (o: IVProviderResume) => {
            // DOCS: Encontrar la familia actualmente seleccionada y que sea diferente a la que se esta seleccionando
            if (
              o.IdProveedor === state.selectedProvider?.IdProveedor &&
              o.IdProveedor !== providerId
            ) {
              // DOCS: Respaldar la info de la familia actualmente seleccionada dentro de la lista de familias y se desmarca
              return {...state.selectedProvider, isSelected: false};
              // DOCS: Encontrar la nueva familia que se esta seleccionando
            } else if (o.IdProveedor === providerId) {
              // DOCS: Marcar la familia como seleccionada
              return {...o, isSelected: true};
            }
            // DOCS: Devolver la familia sin ningun cambio si no coincide con ninguna de las validaciones
            return {...o, isSelected: false};
          }),
        },
      },
      selectedProvider: map(
        [
          find(
            state.providers.providersList.Results,
            (o: IVProviderResume) => o.IdProveedor === providerId,
          ),
        ],
        (i) => ({...i, isSelected: true}),
      )[0],
    }),
  ),
  on(
    pricesActions.GET_FAMILIES_SUCCESS,
    (state: ClientPricesState, {families}): ClientPricesState => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        needsToReload: false,
        familiesList: map(families, (o) => ({
          ...initialFamily(false),
          ...o,
        })),
      },
    }),
  ),
  on(
    pricesActions.SET_SELECTED_FAMILY,
    (state: ClientPricesState, {familyId}): ClientPricesState => ({
      ...state,
      // DOCS: Recorrer las familias
      selectedProvider: {
        ...state.selectedProvider,
        familiesList: map(state.selectedProvider.familiesList, (o: IVTrademarkFamily) => {
          // DOCS: Encontrar la familia actualmente seleccionada
          if (o.IdMarcaFamilia === state.selectedProvider.selectedFamily?.IdMarcaFamilia) {
            // DOCS: Respaldar la info de la familia actualmente seleccionada dentro de la lista de familias y se desmarca
            return {
              ...state.selectedProvider.selectedFamily,
              isSelected: false,
            };
            // DOCS: Encontrar la nueva familia que se esta seleccionando
          } else if (o.IdMarcaFamilia === familyId) {
            // DOCS: Marcar la familia como seleccionada
            return {...o, isSelected: true};
          }
          // DOCS: Devolver la familia sin ningun cambio si no coincide con ninguna de las validaciones
          return {...o, isSelected: false};
        }),
        selectedFamily: map(
          [
            find(
              state.selectedProvider.familiesList,
              (o: IVTrademarkFamily) => o.IdMarcaFamilia === familyId,
            ),
          ],
          (i) => ({...i, isSelected: true}),
        )[0],
      },
    }),
  ),
  on(
    pricesActions.QUIT_ACTUAL_CONFIGURATION,
    (state: ClientPricesState): ClientPricesState => ({
      ...state,
      selectedProvider: {
        ...state?.selectedProvider,
        selectedFamily: {
          ...state?.selectedProvider?.selectedFamily,
          actualConfiguration: {} as IConfClient,
          backupConfiguration: {} as IConfClient,
        },
      },
    }),
  ),
  on(
    pricesActions.RESTORE_GENERAL_ACTUAL_CONFIGURATION,
    (state: ClientPricesState): ClientPricesState => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        selectedFamily: {
          ...state.selectedProvider.selectedFamily,
          actualConfiguration: state.selectedProvider.selectedFamily.generalConfiguration,
          backupConfiguration: state.selectedProvider.selectedFamily.generalConfiguration,
        },
      },
    }),
  ),
  on(
    pricesActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING,
    (state: ClientPricesState, {tabConfigurationName, isLoading}) => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        selectedFamily: {
          ...state.selectedProvider.selectedFamily,
          [tabConfigurationName]: {
            ...state.selectedProvider.selectedFamily[tabConfigurationName],
            isLoading,
          },
        },
      },
    }),
  ),
  on(
    pricesActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD,
    (state: ClientPricesState, {tabConfigurationName, needsToReload}) => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        selectedFamily: {
          ...state.selectedProvider.selectedFamily,
          [tabConfigurationName]: {
            ...state.selectedProvider.selectedFamily[tabConfigurationName],
            needsToReload,
          },
        },
      },
    }),
  ),
  on(
    pricesActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE,
    (state: ClientPricesState, {value}): ClientPricesState => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        selectedFamily: {
          ...state.selectedProvider.selectedFamily,
          asidePrices: {
            ...state.selectedProvider.selectedFamily.asidePrices,
            desiredPage: !state.selectedProvider.selectedFamily.asidePrices.desiredPage
              ? value
              : state.selectedProvider.selectedFamily.asidePrices?.desiredPage + value,
          },
        },
      },
    }),
  ),
  on(
    pricesActions.SET_PRICE_LIST_FOR_PANEL_SEARCH_TERM,
    (state: ClientPricesState, {searchTerm}): ClientPricesState => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        selectedFamily: {
          ...state.selectedProvider.selectedFamily,
          asidePrices: {
            ...state.selectedProvider.selectedFamily.asidePrices,
            searchTerm,
            desiredPage: 1,
          },
        },
      },
    }),
  ),
  on(
    pricesActions.RESET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE,
    (state: ClientPricesState): ClientPricesState => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        selectedFamily: {
          ...state.selectedProvider.selectedFamily,
          asidePrices: {
            ...state.selectedProvider.selectedFamily.asidePrices,
            desiredPage: 0,
          },
        },
      },
    }),
  ),
  on(
    pricesActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING,
    (state: ClientPricesState, {isLoading}): ClientPricesState => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        selectedFamily: {
          ...state.selectedProvider.selectedFamily,
          asidePrices: {
            ...state.selectedProvider?.selectedFamily.asidePrices,
            isLoading,
          },
        },
      },
    }),
  ),
  on(
    pricesActions.GET_PRICE_LIST_FOR_PANEL_SUCCESS,
    (state: ClientPricesState, {prices}): ClientPricesState => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        selectedFamily: {
          ...state.selectedProvider.selectedFamily,
          asidePrices: {
            ...state.selectedProvider.selectedFamily.asidePrices,
            pricesList: {
              ...state.selectedProvider.selectedFamily.asidePrices.pricesList,
              TotalResults: prices.TotalResults,
              Results: prices.Results,
            },
            selectedPrice: {
              ...prices.Results[0],
              isNegative: getObjectPercentagePriceList(
                prices.Results[0]?.PrecioProquifaNetProveedor,
                prices.Results[0]?.PrecioLista,
              ).isNegative,
              percentage: getObjectPercentagePriceList(
                prices.Results[0]?.PrecioProquifaNetProveedor,
                prices.Results[0]?.PrecioLista,
              ).percentage,
            },
          },
        },
      },
    }),
  ),
  on(
    pricesActions.SET_PRICE_LIST_FOR_PANEL_NEEDS_TO_RELOAD,
    (state: ClientPricesState, {needsToReload}): ClientPricesState => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        selectedFamily: {
          ...state.selectedProvider.selectedFamily,
          asidePrices: {
            ...state.selectedProvider.selectedFamily.asidePrices,
            needsToReload,
          },
        },
      },
    }),
  ),
  on(
    pricesActions.GET_FAMILY_CLASSIFICATION_CONFIGURATION_SUCCESS,
    (state: ClientPricesState, {configuration}): ClientPricesState => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        selectedFamily: {
          ...state.selectedProvider.selectedFamily,
          actualConfiguration: configuration,
          backupConfiguration: configuration,
          classifications: {
            ...state.selectedProvider.selectedFamily.classifications,
            classificationsList: {
              ...state.selectedProvider.selectedFamily.classifications.classificationsList,
              Results: map(
                state.selectedProvider.selectedFamily.classifications.classificationsList.Results,
                (i) => {
                  if (i.isSelected) {
                    return {...i, configuration, needsToReload: false};
                  } else {
                    return {...i};
                  }
                },
              ),
            },
          },
        },
      },
    }),
  ),
  on(pricesActions.GET_PRICE_LOAD, (state: ClientPricesState) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        prices: {
          ...state.selectedProvider.selectedFamily.prices,
          desiredPage: state.selectedProvider.selectedFamily.prices.desiredPage + 1,
        },
      },
    },
  })),
  on(pricesActions.GET_PRICE_SUCCESS, (state: ClientPricesState, action) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        prices: {
          ...state.selectedProvider.selectedFamily.prices,
          pricesList: {
            TotalResults: action.prices.TotalResults,
            Results:
              state.selectedProvider.selectedFamily.prices.desiredPage === 1
                ? [...action.prices.Results]
                : [
                    ...state.selectedProvider.selectedFamily.prices.pricesList.Results,
                    ...action.prices.Results,
                  ],
          },
        },
      },
    },
  })),
  on(
    pricesActions.GET_FAMILY_PRICE_CONFIGURATION_LOAD,
    (state: ClientPricesState, {priceItem}) => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        selectedFamily: {
          ...state.selectedProvider.selectedFamily,
          prices: {
            ...state.selectedProvider.selectedFamily.prices,
            pricesList: {
              ...state.selectedProvider.selectedFamily.prices.pricesList,
              Results: map(
                state.selectedProvider.selectedFamily.prices.pricesList.Results,
                (i: IVProductListPriceConfigurationClient) => {
                  if (i.PrecioListaMonedaProveedor === priceItem.PrecioListaMonedaProveedor) {
                    return {...i, isSelected: true};
                  } else {
                    return {...i, isSelected: false};
                  }
                },
              ),
            },
          },
        },
      },
    }),
  ),
  on(pricesActions.RESET_PRICE_LIST_DESIRED_PAGE, (state: ClientPricesState) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        prices: {
          ...state.selectedProvider.selectedFamily.prices,
          desiredPage: 0,
          searchTerm: '',
          pricesList: {
            TotalResults: 0,
            Results: [],
          },
        },
      },
    },
  })),
  on(pricesActions.RESET_CLASSIFICATION_LIST_DESIRED_PAGE, (state: ClientPricesState) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        classifications: {
          ...state.selectedProvider.selectedFamily.classifications,
          desiredPage: 0,
          searchTerm: '',
          classificationsList: {
            TotalResults: 0,
            Results: [],
          },
        },
      },
    },
  })),
  on(pricesActions.RESET_PRODUCT_LIST_DESIRED_PAGE, (state: ClientPricesState) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        products: {
          ...state.selectedProvider.selectedFamily.products,
          desiredPage: 0,
          searchTerm: '',
          productsList: {
            TotalResults: 0,
            Results: [],
          },
        },
      },
    },
  })),
  on(pricesActions.SET_RESTORE_DATA_BACKUP, (state: ClientPricesState) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        actualConfiguration: state.selectedProvider.selectedFamily.backupConfiguration,
      },
    },
  })),
  on(pricesActions.GET_CLASSIFICATIONS_LOAD, (state: ClientPricesState) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        classifications: {
          ...state.selectedProvider.selectedFamily.classifications,
          desiredPage: state.selectedProvider.selectedFamily.classifications.desiredPage + 1,
        },
      },
    },
  })),
  on(pricesActions.GET_CLASSIFICATIONS_SUCCESS, (state: ClientPricesState, {classifications}) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        classifications: {
          ...state.selectedProvider.selectedFamily.classifications,
          classificationsList: {
            TotalResults: classifications.TotalResults,
            Results:
              state.selectedProvider.selectedFamily.classifications.desiredPage === 1
                ? [...classifications.Results]
                : [
                    ...state.selectedProvider.selectedFamily.classifications.classificationsList
                      .Results,
                    ...classifications.Results,
                  ],
          },
        },
      },
    },
  })),
  on(pricesActions.UPDATE_SELECTED_PRICE_ITEM_SUCCESS, (state, {prices}) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        prices: {
          ...state.selectedProvider.selectedFamily.prices,
          pricesList: {
            ...state.selectedProvider.selectedFamily.prices.pricesList,
            Results: map(
              state.selectedProvider.selectedFamily.prices.pricesList.Results,
              (o: VPrecioListaClienteProducto) => {
                const priceUpdated = find(
                  prices,
                  (i: VPrecioListaClienteProducto) =>
                    o.PrecioListaMonedaProveedor === i.PrecioListaMonedaProveedor,
                );
                return priceUpdated ? {...o, ...priceUpdated, needsToReload: true} : o;
              },
            ),
          },
        },
      },
    },
  })),
  on(pricesActions.UPDATE_SELECTED_PRODUCT_PRICE_SUCCESS, (state, {productItem}) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        products: {
          ...state.selectedProvider.selectedFamily.products,
          productsList: {
            ...state.selectedProvider.selectedFamily.products.productsList,
            Results: map(
              state.selectedProvider.selectedFamily.products.productsList.Results,
              (o: IVClientProductConfiguration) => {
                if (o.IdProducto === productItem.IdProducto) {
                  return {
                    ...o,
                    ...productItem,
                  };
                }
                return o;
              },
            ),
          },
        },
      },
    },
  })),
  on(
    pricesActions.UPDATE_SELECTED_CHARACTERISTIC_GROUPER_SUCCESS,
    (state, {productItem}): ClientPricesState => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        selectedFamily: {
          ...state.selectedProvider.selectedFamily,
          classifications: {
            ...state.selectedProvider.selectedFamily.classifications,
            classificationsList: {
              ...state.selectedProvider.selectedFamily.classifications.classificationsList,
              Results: map(
                state.selectedProvider.selectedFamily.classifications.classificationsList.Results,
                (o: IVClientProductClassification) => {
                  if (o.IdAgrupadorCaracteristica === productItem.IdAgrupadorCaracteristica) {
                    return {
                      ...o,
                      ...productItem,
                    };
                  }
                  return o;
                },
              ),
            },
          },
        },
      },
    }),
  ),
  on(pricesActions.SAVE_CONFIGURATION_SUCCESS, (state: ClientPricesState, {configuration}) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...configuration,
        backupConfiguration: configuration.actualConfiguration,
      },
    },
  })),
  on(pricesActions.UPDATE_SELECTED_PRICE_ITEM_LOAD, (state, {priceItem}) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        prices: {
          ...state.selectedProvider.selectedFamily.prices,
          needsToReload: true,
        },
      },
    },
  })),
  on(pricesActions.UPDATE_SELECTED_PRODUCT_PRICE_LOAD, (state, {productItem}) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        products: {
          ...state.selectedProvider.selectedFamily.products,
          needsToReload: true,
        },
      },
    },
  })),
  on(
    pricesActions.UPDATE_SELECTED_CHARACTERISTIC_GROUPER_LOAD,
    (state: ClientPricesState, {productItem}): ClientPricesState => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        selectedFamily: {
          ...state.selectedProvider.selectedFamily,
          classifications: {
            ...state.selectedProvider.selectedFamily.classifications,
            needsToReload: true,
          },
        },
      },
    }),
  ),
  on(pricesActions.GET_FAMILY_PRICE_CONFIGURATION_SUCCESS, (state, {configuration}) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        actualConfiguration: configuration,
        backupConfiguration: configuration,
        prices: {
          ...state.selectedProvider.selectedFamily.prices,
          pricesList: {
            ...state.selectedProvider.selectedFamily.prices.pricesList,
            Results: map(state.selectedProvider.selectedFamily.prices.pricesList.Results, (i) => {
              if (i.isSelected) {
                return {...i, configuration, needsToReload: false};
              } else {
                return {...i};
              }
            }),
          },
        },
      },
    },
  })),
  on(pricesActions.SET_PRICE_LIST_SEARCH_TERM, (state: ClientPricesState, {searchTerm}) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        prices: {
          ...state.selectedProvider.selectedFamily.prices,
          desiredPage: 1,
          searchTerm,
          pricesList: {
            TotalResults: 0,
            Results: [],
          },
        },
      },
    },
  })),
  on(
    pricesActions.SET_PRICE_LIST_SEARCH_TERM_CHARACTERISITC_GROUPER,
    (state: ClientPricesState, {searchTerm}) => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        selectedFamily: {
          ...state.selectedProvider.selectedFamily,
          classifications: {
            ...state.selectedProvider.selectedFamily.classifications,
            desiredPage: 1,
            searchTerm,
            classificationsList: {
              TotalResults: 0,
              Results: [],
            },
          },
        },
      },
    }),
  ),
  on(pricesActions.GET_PRICE_LIST_FILTERED_BY_THIS_LEVEL_CONFIG, (state: ClientPricesState) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        prices: {
          ...state.selectedProvider.selectedFamily.prices,
          desiredPage: 1,
          pricesList: {
            TotalResults: 0,
            Results: [],
          },
        },
      },
    },
  })),
  on(
    pricesActions.SET_LIST_OF_TAB_CONFIGURATION_HAS_FILTER,
    (state: ClientPricesState, {tabConfigurationName}) => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        selectedFamily: {
          ...state.selectedProvider.selectedFamily,
          [tabConfigurationName]: {
            ...state.selectedProvider.selectedFamily[tabConfigurationName],
            hasConfigurationFilter: !state.selectedProvider.selectedFamily[tabConfigurationName]
              .hasConfigurationFilter,
          },
        },
      },
    }),
  ),
  on(
    pricesActions.RESTORE_PRICE_ACTUAL_CONFIGURATION,
    (state: ClientPricesState): ClientPricesState =>
      flow(
        () =>
          filter(
            state.selectedProvider.selectedFamily.prices.pricesList.Results,
            (o: IVProductListPriceConfigurationClient) => o.isSelected,
          ),
        (selectedPrice: IVProductListPriceConfigurationClient) => ({
          ...state,
          selectedProvider: {
            ...state.selectedProvider,
            selectedFamily: {
              ...state.selectedProvider.selectedFamily,
              actualConfiguration: !isEmpty(selectedPrice) ? selectedPrice[0].configuration : {},
              backupConfiguration: !isEmpty(selectedPrice) ? selectedPrice[0].configuration : {},
            },
          },
        }),
      )(),
  ),
  on(
    pricesActions.RESTORE_CLASSIFICATION_ACTUAL_CONFIGURATION,
    (state: ClientPricesState): ClientPricesState => {
      const selectedClassification = filter(
        state.selectedProvider.selectedFamily.classifications.classificationsList.Results,
        (o) => o.isSelected,
      );
      return {
        ...state,
        selectedProvider: {
          ...state.selectedProvider,
          selectedFamily: {
            ...state.selectedProvider.selectedFamily,
            actualConfiguration: !isEmpty(selectedClassification)
              ? selectedClassification[0].configuration
              : ({} as IConfClient),
            backupConfiguration: !isEmpty(selectedClassification)
              ? selectedClassification[0].configuration
              : ({} as IConfClient),
          },
        },
      };
    },
  ),
  on(
    pricesActions.RESTORE_PRODUCT_ACTUAL_CONFIGURATION,
    (state: ClientPricesState): ClientPricesState => {
      const selectedProduct = filter(
        state.selectedProvider.selectedFamily.products.productsList.Results,
        (o) => o.isSelected,
      );
      return {
        ...state,
        selectedProvider: {
          ...state.selectedProvider,
          selectedFamily: {
            ...state.selectedProvider.selectedFamily,
            actualConfiguration: !isEmpty(selectedProduct)
              ? selectedProduct[0].configuration
              : ({} as IConfClient),
            backupConfiguration: !isEmpty(selectedProduct)
              ? selectedProduct[0].configuration
              : ({} as IConfClient),
          },
        },
      };
    },
  ),
  on(
    pricesActions.SET_FAMILY_BACKUP,
    (state: ClientPricesState): ClientPricesState => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        familiesList: map(state.selectedProvider.familiesList, (o) => {
          if (o.IdMarcaFamilia === state.selectedProvider.selectedFamily.IdMarcaFamilia) {
            return {...state.selectedProvider.selectedFamily};
          } else {
            return {...o};
          }
        }),
      },
    }),
  ),
  on(
    pricesActions.SET_BACKUP_CONFIGURATION,
    (state: ClientPricesState): ClientPricesState => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        selectedFamily: {
          ...state.selectedProvider.selectedFamily,
          backupConfiguration: state.selectedProvider.selectedFamily.actualConfiguration,
        },
      },
    }),
  ),
  on(
    pricesActions.SET_LEVEL_CONFIGURATION_SELECTED_LOAD,
    (state: ClientPricesState, {selectedLevelConfigurationTab}): ClientPricesState => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        selectedFamily: {
          ...state.selectedProvider.selectedFamily,
          selectedLevelConfigurationTab,
          levelSubConfigurationTabs: initialTabsSubConfigurationsOptions(false),
        },
      },
    }),
  ),
  on(
    pricesActions.SET_LEVEL_SUB_CONFIGURATION_TAB_SELECTED,
    (state: ClientPricesState, {selectedLevelSubConfigurationTab}): ClientPricesState => {
      return {
        ...state,
        selectedProvider: {
          ...state.selectedProvider,
          selectedFamily: {
            ...state.selectedProvider.selectedFamily,
            levelSubConfigurationTabs: map(
              state.selectedProvider.selectedFamily.levelSubConfigurationTabs,
              (i: OptionBar) => {
                if (i.id === selectedLevelSubConfigurationTab.id) {
                  return {
                    ...i,
                    isSelected: true,
                  };
                } else {
                  return {
                    ...i,
                    isSelected: false,
                  };
                }
              },
            ),
          },
        },
      };
    },
  ),
  on(
    pricesActions.SET_TRADEMARK_CONSOLIDATION_PROVIDER_SUCCESS,
    (state: ClientPricesState, {trademarkFamilyProviderConsolidation}): ClientPricesState => {
      return {
        ...state,
        selectedProvider: {
          ...state.selectedProvider,
          selectedFamily: {
            ...state.selectedProvider.selectedFamily,
            trademarkFamilyProviderConsolidation,
          },
        },
      };
    },
  ),
  on(
    pricesActions.GET_FAMILY_GENERAL_CONFIGURATION_SUCCESS,
    (state: ClientPricesState, {configuration}) => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        selectedFamily: {
          ...state.selectedProvider?.selectedFamily,
          generalConfiguration: {
            ...state.selectedProvider?.selectedFamily?.generalConfiguration,
            ...configuration,
          },
          actualConfiguration: {
            ...state.selectedProvider?.selectedFamily?.actualConfiguration,
            ...configuration,
          },
          backupConfiguration: {
            ...state.selectedProvider?.selectedFamily?.backupConfiguration,
            ...configuration,
          },
        },
      },
    }),
  ),
  on(
    pricesActions.GET_PROVIDERS_LIST_FAILED,
    (state: ClientPricesState): ClientPricesState => ({
      ...state,
      providers: {
        ...state.providers,
        apiStatus: API_REQUEST_STATUS_FAILED,
      },
    }),
  ),
  on(
    pricesActions.SET_CLIENT_PRICE_CONFIGURATION_FIELD_DATA,
    (state: ClientPricesState, {field, value}) => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        selectedFamily: {
          ...state.selectedProvider.selectedFamily,
          actualConfiguration: {
            ...state.selectedProvider.selectedFamily.actualConfiguration,
            ConfiguracionPrecioCliente: {
              ...state.selectedProvider.selectedFamily.actualConfiguration
                .ConfiguracionPrecioCliente,
              [field]: value,
            },
          },
        },
      },
    }),
  ),
  on(
    pricesActions.SET_VIGENCIA,
    (state, {Vigencia, selectedTabConfiguration, typeConfiguration}) => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        selectedFamily: {
          ...state.selectedProvider.selectedFamily,
          actualConfiguration: {
            ...state.selectedProvider.selectedFamily.actualConfiguration,
            [`ConfiguracionClienteFamilia${selectedTabConfiguration}`]: {
              ...state.selectedProvider.selectedFamily.actualConfiguration[
                `ConfiguracionClienteFamilia${selectedTabConfiguration}`
              ],
              Vigencia,
            },
            ConfiguracionPrecioCliente: {
              ...state.selectedProvider.selectedFamily.actualConfiguration
                .ConfiguracionPrecioCliente,
              IdConfiguracionPrecioCliente:
                typeof state.selectedProvider.selectedFamily.actualConfiguration[
                  `ConfiguracionClienteFamilia${selectedTabConfiguration}`
                ].Vigencia === typeof Vigencia
                  ? state.selectedProvider.selectedFamily.actualConfiguration
                      .ConfiguracionPrecioCliente.IdConfiguracionPrecioCliente
                  : DEFAULT_UUID,
            },
          },
        },
      },
    }),
  ),
  on(pricesActions.SET_CONFIGURATION_TYPE, (state, {value}) => ({
    ...state,
    configurationTypeSelected: value,
  })),
  on(pricesActions.GET_THIS_LEVEL_CLASSIFICATIONS_LIST_LOAD, (state: ClientPricesState) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        classifications: {
          ...state.selectedProvider.selectedFamily.classifications,
          desiredPage: 1,
          classificationsList: {
            TotalResults: 0,
            Results: [],
          },
        },
      },
    },
  })),
  on(
    pricesActions.GET_FAMILY_CLASSIFICATION_CONFIGURATION_LOAD,
    (state: ClientPricesState, {classificationItem}) => ({
      ...state,
      selectedProvider: {
        ...state.selectedProvider,
        selectedFamily: {
          ...state.selectedProvider.selectedFamily,
          classifications: {
            ...state.selectedProvider.selectedFamily.classifications,
            classificationsList: {
              ...state.selectedProvider.selectedFamily.classifications.classificationsList,
              Results: map(
                state.selectedProvider.selectedFamily.classifications.classificationsList.Results,
                (i: IVClientProductClassification) => {
                  if (
                    i.IdAgrupadorCaracteristica === classificationItem.IdAgrupadorCaracteristica
                  ) {
                    return {...i, isSelected: true};
                  }
                  return {...i, isSelected: false};
                },
              ),
            },
          },
        },
      },
    }),
  ),
  on(pricesActions.SET_PRODUCT_LIST_SEARCH_FILTER, (state: ClientPricesState, {searchFilter}) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        products: {
          ...state.selectedProvider.selectedFamily.products,
          searchFilter,
        },
      },
    },
  })),
  on(pricesActions.SET_SEARCH_TERM_BY_PRODUCTS_LIST, (state: ClientPricesState, {searchTerm}) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        products: {
          ...state.selectedProvider.selectedFamily.products,
          desiredPage: 1,
          searchTerm,
          priceList: {
            TotalResults: 0,
            Results: [],
          },
        },
      },
    },
  })),
  on(pricesActions.GET_PRODUCTS_LIST_LOAD, (state: ClientPricesState) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        products: {
          ...state.selectedProvider.selectedFamily.products,
          desiredPage: state.selectedProvider.selectedFamily.products.desiredPage + 1,
        },
      },
    },
  })),
  on(pricesActions.GET_PRODUCTS_LIST_SUCCESS, (state, action) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        products: {
          ...state.selectedProvider.selectedFamily.products,
          productsList: {
            TotalResults: action.products.TotalResults,
            Results:
              state.selectedProvider.selectedFamily.products.desiredPage === 1
                ? [...action.products.Results]
                : [
                    ...state.selectedProvider.selectedFamily.products.productsList.Results,
                    ...action.products.Results,
                  ],
          },
        },
      },
    },
  })),
  on(pricesActions.GET_THIS_LEVEL_PRODUCTS_LIST_LOAD, (state: ClientPricesState) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        products: {
          ...state.selectedProvider.selectedFamily.products,
          desiredPage: 1,
          productsList: {
            TotalResults: 0,
            Results: [],
          },
        },
      },
    },
  })),
  on(pricesActions.GET_FAMILY_PRODUCT_CONFIGURATION_LOAD, (state, {productItem}) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        products: {
          ...state.selectedProvider.selectedFamily.products,
          productsList: {
            ...state.selectedProvider.selectedFamily.products.productsList,
            Results: map(
              state.selectedProvider.selectedFamily.products.productsList.Results,
              (i: IVClientProductConfiguration) => {
                if (i.IdProducto === productItem.IdProducto) {
                  return {...i, isSelected: true};
                } else {
                  return {...i, isSelected: false};
                }
              },
            ),
          },
        },
      },
    },
  })),
  on(pricesActions.GET_FAMILY_PRODUCT_CONFIGURATION_SUCCESS, (state, {configuration}) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider.selectedFamily,
        actualConfiguration: configuration,
        backupConfiguration: configuration,
        products: {
          ...state.selectedProvider.selectedFamily.products,
          productsList: {
            ...state.selectedProvider.selectedFamily.products.productsList,
            Results: map(
              state.selectedProvider.selectedFamily.products.productsList.Results,
              (i) => {
                if (i.isSelected) {
                  return {...i, configuration, needsToReload: false};
                } else {
                  return {...i};
                }
              },
            ),
          },
        },
      },
    },
  })),
  on(pricesActions.SET_IS_OPEN_POP_BREAKDOWN, (state: ClientPricesState, {value}) => ({
    ...state,
    popBreakdownIsOpen: value,
  })),
  on(pricesActions.SET_OPEN_POP_AFTER_SAVE, (state: ClientPricesState, {value}) => ({
    ...state,
    openPopAfterSave: value,
  })),
  on(pricesActions.SET_OPEN_ALERT_POP_UPDATE_BREAKDOWN, (state: ClientPricesState, {value}) => ({
    ...state,
    alertPopUpdateBreakdown: value,
  })),
  on(pricesActions.RESET_ASIDE_PRICES, (state: ClientPricesState) => ({
    ...state,
    selectedProvider: {
      ...state.selectedProvider,
      selectedFamily: {
        ...state.selectedProvider?.selectedFamily,
        asidePrices: {
          ...state.selectedProvider?.selectedFamily?.asidePrices,
          needsToReload: false,
          desiredPage: 0,
          searchTerm: '',
          isLoading: false,
          pricesList: {
            TotalResults: 0,
            Results: [],
          },
          selectedPrice: {},
        },
      },
    },
  })),
);
