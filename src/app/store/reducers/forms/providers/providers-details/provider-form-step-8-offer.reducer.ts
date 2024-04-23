import {createReducer, on} from '@ngrx/store';

// Models
import {
  CatNivelIngreso,
  ConceptoAgenteAduanal,
  ConfiguracionPrecioUtilidadCategoriaProveedorObj,
  MarcaFamiliaProveedorConsolidacion,
} from 'api-catalogos';
import {
  IConfProvider,
  initialFamily,
  initialOffer,
  initialTabsSubConfigurationsOptions,
  IOfferDeliveryRoutes,
  ITrademarkFamilyProviderConsolidation,
  IVMarcaFamiliaIndustriaObj,
  IVProductListPriceConfiguration,
  IVProductProviderListPrice,
  IVProviderProductClassification,
  IVProviderProductConfiguration,
  IVTrademarkFamily,
  Levels,
  OfferFields,
  OfferState,
  OfferToggleOptions,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';

// Actions
import * as offerActions from '@appActions/forms/providers/providers-details/provider-form-step-8-offer.actions';

// Utils
import {deburr, filter, find, flow, isEmpty, map, omit, toLower} from 'lodash-es';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {providersDetailsActions} from '@appActions/forms/providers';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {OptionBar} from '@appModels/options-bar/options-bar';

export const offerReducer = createReducer(
  initialOffer(),
  on(
    providersDetailsActions.SET_INITIAL_DATA_ADD_EDIT_PROVIDER,
    offerActions.SET_INITIAL_STATE_OFFER,
    () => initialOffer(),
  ),
  on(offerActions.GET_FAMILIES_PROVIDER_SUCCESS, (state: OfferState, {familiesList}) => ({
    ...state,
    familiesList: map(familiesList, (o) => ({
      ...initialFamily(),
      ...o,
      actualConfiguration: {
        ...o.actualConfiguration,
        deliveryRoutes: state.catDeliveryRoutes,
      },
      generalConfiguration: {
        ...o.actualConfiguration,
        deliveryRoutes: state.catDeliveryRoutes,
      },
    })),
  })),
  on(offerActions.GET_PROVIDER_NIVEL_INGRESO_SUCCESS, (state: OfferState, {incomeLevelList}) => ({
    ...state,
    catIncomeLevels: incomeLevelList,
  })),
  on(offerActions.GET_PROVIDER_RUTA_ENTREGA_SUCCESS, (state: OfferState, {deliveryRoutesList}) => ({
    ...state,
    catDeliveryRoutes: deliveryRoutesList,
  })),
  on(
    offerActions.GET_PROVIDER_CUSTOMS_AGENT_CONCEPT_SUCCESS,
    (state: OfferState, {customsAgentsConceptList}): OfferState => ({
      ...state,
      customsAgentsConceptList,
    }),
  ),
  on(
    offerActions.GET_GENERAL_CONFIGURATION_SUCCESS,
    (state: OfferState, {newGeneralConfiguration}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        actualConfiguration: {
          ...state.selectedFamily.actualConfiguration,
          ...newGeneralConfiguration,
          /*DOCS: Se eliminó código porque este llenado ya se esta haciendo en el effect*/
        },
        generalConfiguration: {
          ...state.selectedFamily.generalConfiguration,
          ...newGeneralConfiguration,
          /*DOCS: Se eliminó código porque este llenado ya se esta haciendo en el effect*/
        },
        backupConfiguration: {
          ...state.selectedFamily.backupConfiguration,
          ...newGeneralConfiguration,
          /*DOCS: Se eliminó código porque este llenado ya se esta haciendo en el effect*/
        },
      },
    }),
  ),
  on(
    offerActions.SET_SELECTED_CAT_INDUSTRY_RAND_FAMILY,
    (state: OfferState, {catIndustryFamilyBrand}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        selectedCatIndustryBrandFamily: catIndustryFamilyBrand,
      },
    }),
  ),
  on(offerActions.SET_OPEN_ALERT_POP_UPDATE_BREAKDOWN, (state: OfferState, {value}) => ({
    ...state,
    alertPopUpdateBreakdown: value,
  })),
  on(offerActions.SET_IS_OPEN_POP_BREAKDOWN, (state: OfferState, {value}) => ({
    ...state,
    popBreakdownIsOpen: value,
  })),
  on(offerActions.SET_OPEN_POP_AFTER_SAVE, (state: OfferState, {value}) => ({
    ...state,
    openPopAfterSave: value,
  })),
  on(offerActions.GET_PRICE_LIST_FOR_PANEL_SUCCESS, (state: OfferState, {prices}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      asidePrices: {
        ...state.selectedFamily.asidePrices,
        pricesList: {
          ...state.selectedFamily.asidePrices.pricesList,
          TotalResults: prices.TotalResults,
          Results: prices.Results,
        },
        selectedPrice: prices.Results[0],
      },
    },
  })),
  on(offerActions.GET_PRICE_LIST_LOAD, (state: OfferState) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      prices: {
        ...state.selectedFamily.prices,
        desiredPage: state.selectedFamily.prices.desiredPage + 1,
      },
    },
  })),
  on(offerActions.GET_PRICE_LIST_SUCCESS, (state: OfferState, {prices}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      prices: {
        ...state.selectedFamily.prices,
        pricesList: {
          TotalResults: prices.TotalResults,
          Results:
            state.selectedFamily.prices.desiredPage === 1
              ? [...prices.Results]
              : [...state.selectedFamily.prices.pricesList.Results, ...prices.Results],
        },
      },
    },
  })),
  on(offerActions.GET_PRICE_CONFIGURATION_LOAD, (state: OfferState, {priceItem}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      prices: {
        ...state.selectedFamily.prices,
        pricesList: {
          ...state.selectedFamily.prices.pricesList,
          Results: map(
            state.selectedFamily.prices.pricesList.Results,
            (i: IVProductListPriceConfiguration) => {
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
  })),
  on(offerActions.GET_PRICE_CONFIGURATION_SUCCESS, (state: OfferState, {configuration}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      actualConfiguration: {
        ...state.selectedFamily.actualConfiguration,
        ...configuration,
        /*DOCS: Se eliminó código porque este llenado ya se esta haciendo en el effect*/
      },
      backupConfiguration: {
        ...state.selectedFamily.actualConfiguration,
        ...configuration,
        /*DOCS: Se eliminó código porque este llenado ya se esta haciendo en el effect*/
      },
      prices: {
        ...state.selectedFamily.prices,
        pricesList: {
          ...state.selectedFamily.prices.pricesList,
          Results: map(
            state.selectedFamily.prices.pricesList.Results,
            (o: IVProductListPriceConfiguration) => {
              if (o.isSelected) {
                return {
                  ...o,
                  configuration: {
                    ...configuration,
                  },
                };
              }
              return {...o};
            },
          ),
        },
      },
    },
  })),
  on(offerActions.REFRESH_FAMILY_DATA, (state: OfferState) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      generalConfiguration: state.selectedFamily.actualConfiguration,
    },
  })),
  on(offerActions.REFRESH_SELECTED_LIST_PRICE_DATA_SUCCESS, (state: OfferState, {prices}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      prices: {
        ...state.selectedFamily.prices,
        pricesList: {
          ...state.selectedFamily.prices.pricesList,
          Results: map(
            state.selectedFamily.prices.pricesList.Results,
            (o: IVProductListPriceConfiguration) => {
              const priceUpdated = find(
                prices,
                (i: IVProductListPriceConfiguration) =>
                  o.PrecioListaMonedaProveedor === i.PrecioListaMonedaProveedor,
              );
              return priceUpdated ? {...o, ...priceUpdated, needsToReload: true} : o;
            },
          ),
        },
      },
    },
  })),
  on(offerActions.REFRESH_SELECTED_LIST_PRICE_DATA, (state: OfferState) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      prices: {
        ...state.selectedFamily.prices,
        pricesList: {
          ...state.selectedFamily.prices.pricesList,
          Results: map(
            state.selectedFamily.prices.pricesList.Results,
            (o: IVProductListPriceConfiguration) => {
              if (o.isSelected) {
                return {...o, configuration: state.selectedFamily.actualConfiguration};
              }
              return {...o};
            },
          ),
        },
      },
    },
  })),
  on(offerActions.GET_CHARACTERISTIC_GROUPER_LIST_LOAD, (state: OfferState) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      classifications: {
        ...state.selectedFamily.classifications,
        desiredPage: state.selectedFamily.classifications.desiredPage + 1,
      },
    },
  })),
  on(
    offerActions.GET_CHARACTERISTIC_GROUPER_LIST_SUCCESS,
    (state: OfferState, {classifications}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        classifications: {
          ...state.selectedFamily.classifications,
          classificationsList: {
            TotalResults: classifications.TotalResults,
            Results:
              state.selectedFamily.classifications.desiredPage === 1
                ? [...classifications.Results]
                : [
                    ...state.selectedFamily.classifications.classificationsList.Results,
                    ...classifications.Results,
                  ],
          },
        },
      },
    }),
  ),
  on(
    offerActions.GET_CHARACTERISTIC_GROUPER_CONFIGURATION_LOAD,
    (state: OfferState, {classificationItem}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        classifications: {
          ...state.selectedFamily.classifications,
          classificationsList: {
            ...state.selectedFamily.classifications.classificationsList,
            Results: map(
              state.selectedFamily.classifications.classificationsList.Results,
              (i: IVProviderProductClassification) => {
                if (i.IdAgrupadorCaracteristica === classificationItem.IdAgrupadorCaracteristica) {
                  return {...i, isSelected: true};
                }
                return {...i, isSelected: false};
              },
            ),
          },
        },
      },
    }),
  ),
  on(
    offerActions.GET_CHARACTERISTIC_GROUPER_CONFIGURATION_SUCCESS,
    (state: OfferState, {configuration}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        actualConfiguration: {
          ...state.selectedFamily.actualConfiguration,
          ...configuration,
          /*DOCS: Se eliminó código porque este llenado ya se esta haciendo en el effect*/
        },
        backupConfiguration: {
          ...state.selectedFamily.actualConfiguration,
          ...configuration,
          /*DOCS: Se eliminó código porque este llenado ya se esta haciendo en el effect*/
        },
        classifications: {
          ...state.selectedFamily.classifications,
          classificationsList: {
            ...state.selectedFamily.classifications.classificationsList,
            Results: map(
              state.selectedFamily.classifications.classificationsList.Results,
              (o: IVProviderProductClassification) => {
                if (o.isSelected) {
                  return {
                    ...o,
                    configuration: {
                      ...configuration,
                      /*DOCS: Se eliminó código porque este llenado ya se esta haciendo en el effect*/
                    },
                  };
                } else {
                  return {...o};
                }
              },
            ),
          },
        },
      },
    }),
  ),
  on(
    offerActions.REFRESH_SELECTED_CHARACTERISTIC_GROUPER_DATA_SUCCESS,
    (state: OfferState, {characteristicGrouper}): OfferState => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        classifications: {
          ...state.selectedFamily.classifications,
          classificationsList: {
            ...state.selectedFamily.classifications.classificationsList,
            Results: map(
              state.selectedFamily.classifications.classificationsList.Results,
              (o: IVProviderProductClassification): IVProviderProductClassification => {
                if (
                  o.IdAgrupadorCaracteristica === characteristicGrouper.IdAgrupadorCaracteristica
                ) {
                  return {...o, ...characteristicGrouper};
                }
                return {...o};
              },
            ),
          },
        },
      },
    }),
  ),
  on(
    offerActions.REFRESH_SELECTED_CHARACTERISTIC_GROUPER_DATA,
    (state: OfferState): OfferState => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        classifications: {
          ...state.selectedFamily.classifications,
          classificationsList: {
            ...state.selectedFamily.classifications.classificationsList,
            Results: map(
              state.selectedFamily.classifications.classificationsList.Results,
              (o: IVProviderProductClassification): IVProviderProductClassification => {
                if (o.isSelected) {
                  return {...o, configuration: state.selectedFamily.actualConfiguration};
                }
                return {...o};
              },
            ),
          },
        },
      },
    }),
  ),
  on(offerActions.GET_PRODUCT_LIST_LOAD, (state: OfferState) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      products: {
        ...state.selectedFamily.products,
        desiredPage: state.selectedFamily.products.desiredPage + 1,
      },
    },
  })),
  on(offerActions.GET_PRODUCT_LIST_SUCCESS, (state: OfferState, {products}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      products: {
        ...state.selectedFamily.products,
        productsList: {
          TotalResults: products.TotalResults,
          Results:
            state.selectedFamily.products.desiredPage === 1
              ? [...products.Results]
              : [...state.selectedFamily.products.productsList.Results, ...products.Results],
        },
      },
    },
  })),
  on(offerActions.GET_PRODUCT_CONFIGURATION_LOAD, (state: OfferState, {productItem}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      products: {
        ...state.selectedFamily.products,
        productsList: {
          ...state.selectedFamily.products.productsList,
          Results: map(
            state.selectedFamily.products.productsList.Results,
            (i: IVProviderProductConfiguration) => {
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
  })),
  on(offerActions.GET_PRODUCT_CONFIGURATION_SUCCESS, (state: OfferState, {configuration}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      actualConfiguration: {
        ...state.selectedFamily.actualConfiguration,
        ...configuration,
        /*DOCS: Se eliminó código porque este llenado ya se esta haciendo en el effect*/
      },
      backupConfiguration: {
        ...state.selectedFamily.actualConfiguration,
        ...configuration,
        /*DOCS: Se eliminó código porque este llenado ya se esta haciendo en el effect*/
      },
      products: {
        ...state.selectedFamily.products,
        productsList: {
          ...state.selectedFamily.products.productsList,
          Results: map(
            state.selectedFamily.products.productsList.Results,
            (o: IVProviderProductConfiguration) => {
              if (o.isSelected) {
                return {
                  ...o,
                  configuration: {
                    ...configuration,
                    /*DOCS: Se eliminó código porque este llenado ya se esta haciendo en el effect*/
                  },
                };
              } else {
                return {...o};
              }
            },
          ),
        },
      },
    },
  })),
  on(
    offerActions.REFRESH_SELECTED_PRODUCT_DATA,
    (state: OfferState): OfferState => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        products: {
          ...state.selectedFamily.products,
          productsList: {
            ...state.selectedFamily.products.productsList,
            Results: map(
              state.selectedFamily.products.productsList.Results,
              (o: IVProviderProductConfiguration) => {
                if (o.isSelected) {
                  return {...o, configuration: state.selectedFamily.actualConfiguration};
                }
                return {...o};
              },
            ),
          },
        },
      },
    }),
  ),
  on(
    offerActions.REFRESH_SELECTED_PRODUCT_SUCCESS,
    (state: OfferState, {product}): OfferState => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        products: {
          ...state.selectedFamily.products,
          productsList: {
            ...state.selectedFamily.products.productsList,
            Results: map(
              state.selectedFamily.products.productsList.Results,
              (o: IVProviderProductConfiguration) => {
                if (o.IdProducto === product.IdProducto) {
                  return {...o, ...product};
                }
                return {...o};
              },
            ),
          },
        },
      },
    }),
  ),
  // DOCS: Handle data
  on(offerActions.SET_SELECTED_DELIVERY_ROUTE, (state: OfferState, {deliveryRouteId}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      actualConfiguration: {
        ...state.selectedFamily.actualConfiguration,
        deliveryRoutes: map(
          state.selectedFamily.actualConfiguration.deliveryRoutes,
          (o: IOfferDeliveryRoutes) => {
            if (
              o.configuracionTiempoEntregaProveedorFamiliaRutaEntrega.IdCatRutaEntrega ===
              deliveryRouteId
            ) {
              return {...o, isSelected: true};
            } else {
              return {...o, isSelected: false};
            }
          },
        ),
      },
    },
  })),
  on(offerActions.SET_PROVIDER_PRICE_CONFIGURATION_VALUE, (state: OfferState, {field, value}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      actualConfiguration: {
        ...state.selectedFamily.actualConfiguration,
        ConfiguracionPrecioProveedor: {
          ...state.selectedFamily.actualConfiguration.ConfiguracionPrecioProveedor,
          [field]: value,
        },
      },
    },
  })),
  on(
    offerActions.SET_SUCCESS_SAVE_PROVIDER_CONFIGURATION_PERFORMANCE,
    (state: OfferState, {familyBrandIndustry}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        actualConfiguration: {
          ...state.selectedFamily.actualConfiguration,
          configuracionProveedorRendimiento: {
            ...state.selectedFamily.actualConfiguration.configuracionProveedorRendimiento,
            vMarcaFamiliaIndustria: map(
              state.selectedFamily.actualConfiguration.configuracionProveedorRendimiento
                .vMarcaFamiliaIndustria,
              (performance: IVMarcaFamiliaIndustriaObj): IVMarcaFamiliaIndustriaObj => {
                if (
                  performance.IdMarcaFamiliaCatIndustria ===
                  familyBrandIndustry.IdMarcaFamiliaCatIndustria
                ) {
                  return {
                    ...performance,
                    ...familyBrandIndustry,
                  };
                } else {
                  return {...performance};
                }
              },
            ),
          },
        },
      },
    }),
  ),
  on(offerActions.SET_PROVIDER_PERFORMANCE_VALUE, (state: OfferState, {field, value, itemId}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      actualConfiguration: {
        ...state.selectedFamily.actualConfiguration,
        configuracionProveedorRendimiento: {
          ...state.selectedFamily.actualConfiguration.configuracionProveedorRendimiento,
          vMarcaFamiliaIndustria: map(
            state.selectedFamily.actualConfiguration.configuracionProveedorRendimiento
              .vMarcaFamiliaIndustria,
            (performance: IVMarcaFamiliaIndustriaObj): IVMarcaFamiliaIndustriaObj => {
              if (performance.IdMarcaFamiliaCatIndustria === itemId) {
                return {
                  ...performance,
                  ConfiguracionComisionProveedor: {
                    ...performance.ConfiguracionComisionProveedor,
                    [field]: value,
                  },
                  needsToSave: true,
                };
              } else {
                return {...performance};
              }
            },
          ),
        },
      },
    },
  })),
  on(
    offerActions.SET_FAMILY_PROVIDER_PRICE_CONFIGURATION_VALUE,
    (state: OfferState, {field, value}): OfferState => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        actualConfiguration: {
          ...state.selectedFamily.actualConfiguration,
          ConfiguracionPrecioProveedorFamilia:
            field === OfferFields.selectedToggleSwitchOption
              ? {
                  ...state.selectedFamily.actualConfiguration.ConfiguracionPrecioProveedorFamilia,
                  AplicaPorPieza: (value as DropListOption).label === OfferToggleOptions.Unidad,
                  MontoMinimoOC:
                    (value as DropListOption).label === OfferToggleOptions.Unidad
                      ? 0
                      : state.selectedFamily?.actualConfiguration
                          ?.ConfiguracionPrecioProveedorFamilia?.MontoMinimoOC,
                  NumPiezas:
                    (value as DropListOption).label === OfferToggleOptions.Monto
                      ? 0
                      : state.selectedFamily?.actualConfiguration
                          ?.ConfiguracionPrecioProveedorFamilia?.NumPiezas,
                }
              : {
                  ...state.selectedFamily.actualConfiguration.ConfiguracionPrecioProveedorFamilia,
                  [field]: value,
                },
          selectedToggleSwitchOption:
            field === OfferFields.selectedToggleSwitchOption
              ? (value as DropListOption)
              : state.selectedFamily.actualConfiguration.selectedToggleSwitchOption,
        },
      },
    }),
  ),

  on(
    offerActions.SET_TRADEMARK_FAMILY_PROVIDER_CONFIGURATION_VALUE,
    (state: OfferState, {field, value}): OfferState => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        actualConfiguration: {
          ...state.selectedFamily.actualConfiguration,
          MarcaFamiliaProveedor: {
            ...state.selectedFamily.actualConfiguration.MarcaFamiliaProveedor,
            [field]: value,
          },
          trademarkFamilyProviderConsolidation:
            field === OfferFields.AplicaConsolidacion
              ? value /*DOCS: Esta marcando el check recuperar todos los elementos que se iban a eliminar*/
                ? [
                    ...state.selectedFamily.actualConfiguration
                      .trademarkFamilyProviderConsolidation,
                    ...state.selectedFamily.actualConfiguration
                      .trademarkFamilyProviderConsolidationToDelete,
                  ]
                : /*DOCS: Esta desmarcando el check vaciar todos los elementos*/
                  []
              : state.selectedFamily.actualConfiguration.trademarkFamilyProviderConsolidation,
          trademarkFamilyProviderConsolidationToDelete:
            field === OfferFields.AplicaConsolidacion
              ? value /*DOCS: Se esta marcando el check, se vacía el arreglo ya que aquí solo llegaron elementos originales y se van a recuperar*/
                ? []
                : [
                    /*DOCS: Se esta desmarcando, se mantienen los que ya están y se agregan todos los elementos originales*/
                    ...state.selectedFamily.actualConfiguration
                      .trademarkFamilyProviderConsolidationToDelete,
                    ...filter(
                      state.selectedFamily.actualConfiguration.trademarkFamilyProviderConsolidation,
                      (o) => o.isOriginal,
                    ),
                  ]
              : state.selectedFamily.actualConfiguration
                  .trademarkFamilyProviderConsolidationToDelete,
        },
      },
    }),
  ),
  on(
    offerActions.SET_TRADEMARK_FAMILY_ITEM_IS_SELECTED,
    (state: OfferState, {item}): OfferState => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        actualConfiguration: {
          ...state.selectedFamily.actualConfiguration,
          /*DOCS: Marcamos o desmarcamos el check en la lista que se le manda al drop*/
          trademarkFamiliesList: map(
            state.selectedFamily.actualConfiguration.trademarkFamiliesList,
            (o: IVTrademarkFamily) => ({
              ...o,
              isSelected: o.IdMarcaFamilia === item.value ? !item.isSelected : o.isSelected,
            }),
          ),
          /*DOCS: Agregamos el elemento a lista que se va a guardar
              Si se esta seleccionando validamos si ya existe en los eliminados para restaurarlo*/
          trademarkFamilyProviderConsolidation: !item.isSelected
            ? find(
                state.selectedFamily.actualConfiguration
                  .trademarkFamilyProviderConsolidationToDelete,
                (o: MarcaFamiliaProveedorConsolidacion) => o.IdMarcaFamilia === item.value,
              )
              ? [
                  ...state.selectedFamily.actualConfiguration.trademarkFamilyProviderConsolidation,
                  {
                    ...find(
                      state.selectedFamily.actualConfiguration
                        .trademarkFamilyProviderConsolidationToDelete,
                      (o: MarcaFamiliaProveedorConsolidacion) => o.IdMarcaFamilia === item.value,
                    ),
                    Activo: true,
                  },
                ]
              : [
                  // DOCS entra cuando es una nueva consolidación
                  ...state.selectedFamily.actualConfiguration.trademarkFamilyProviderConsolidation,
                  {
                    Activo: true,
                    FechaRegistro: DEFAULT_DATE,
                    FechaUltimaActualizacion: DEFAULT_DATE,
                    IdMarcaFamilia: item.value,
                    IdMarcaFamiliaProveedor: state.selectedFamily.IdMarcaFamiliaProveedor,
                    IdMarcaFamiliaProveedorConsolidacion: DEFAULT_UUID,
                    isChecked: !item.isSelected,
                    isOriginal: false,
                  },
                ]
            : /*DOCS: Si se esta desmarcando se elimina del arreglo*/
              filter(
                state.selectedFamily.actualConfiguration.trademarkFamilyProviderConsolidation,
                (o: ITrademarkFamilyProviderConsolidation) => o.IdMarcaFamilia !== item.value,
              ),
          /*DOCS: Si se esta desmarcando
             (validar si se tiene que agregar al arreglo de eliminados.*/
          trademarkFamilyProviderConsolidationToDelete: item.isSelected
            ? find(
                state.selectedFamily.actualConfiguration.trademarkFamilyProviderConsolidation,
                (o: ITrademarkFamilyProviderConsolidation) =>
                  o.IdMarcaFamilia === item.value && o.isOriginal,
              )
              ? [
                  ...state.selectedFamily.actualConfiguration
                    .trademarkFamilyProviderConsolidationToDelete,
                  {
                    /*DOCS: Agregamos el elemento al arreglo para eliminar, manteniendo todas sus propiedades
                  únicamente desactivándolo*/
                    ...find(
                      state.selectedFamily.actualConfiguration.trademarkFamilyProviderConsolidation,
                      (o: ITrademarkFamilyProviderConsolidation) =>
                        o.IdMarcaFamilia === item.value && o.isOriginal,
                    ),
                    Activo: false,
                  },
                ]
              : state.selectedFamily.actualConfiguration
                  .trademarkFamilyProviderConsolidationToDelete
            : filter(
                state.selectedFamily.actualConfiguration
                  .trademarkFamilyProviderConsolidationToDelete,
                (o: ITrademarkFamilyProviderConsolidation) => o.IdMarcaFamilia !== item.value,
              ),
        },
      },
    }),
  ),
  /*DOCS: Guardar valores de la sección COSTOS DE AGENTE ADUANAL*/
  on(
    offerActions.SET_CUSTOMS_AGENT_CONFIGURATION_VALUE,
    (state: OfferState, {field, value}): OfferState => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        actualConfiguration: {
          /* DOCS: Se esta guardando un DropListOption que va en actualConfiguration y ConceptoAgenteAduanal */
          ...state.selectedFamily.actualConfiguration,
          [field]: value as DropListOption,
          /* DOCS: Si cambia el valor de un drop del cual depende, se limpia el valor*/
          selectedCustoms:
            field === OfferFields.selectedCustomsAgent
              ? null
              : field === OfferFields.selectedCustoms
              ? (value as DropListOption)
              : state.selectedFamily.actualConfiguration.selectedCustoms,
          /* DOCS: Si cambia el valor de un drop del cual depende, se limpia el valor*/
          selectedCustomsAgentConcept:
            field === OfferFields.selectedCustomsAgent || field === OfferFields.selectedCustoms
              ? null
              : field === OfferFields.selectedCustomsAgentConcept
              ? (value as DropListOption)
              : state.selectedFamily.actualConfiguration.selectedCustomsAgentConcept,
          /* DOCS: Se cambian los Ids de los drops en ConceptoAgenteAduanal y ConfiguracionPrecioProveedor*/
          ConceptoAgenteAduanal:
            field === OfferFields.selectedCustomsAgent || field === OfferFields.selectedCustoms
              ? {}
              : find(
                  state.customsAgentsConceptList,
                  (o: ConceptoAgenteAduanal) =>
                    o.IdConceptoAgenteAduanal === (value as DropListOption).value.toString(),
                ),
          ConfiguracionPrecioProveedor: {
            ...state.selectedFamily.actualConfiguration.ConfiguracionPrecioProveedor,
            IdConceptoAgenteAduanal:
              field === OfferFields.selectedCustomsAgent || field === OfferFields.selectedCustoms
                ? null
                : field === OfferFields.selectedCustomsAgentConcept
                ? (value as DropListOption).value.toString()
                : state.selectedFamily.actualConfiguration.ConfiguracionPrecioProveedor
                    .IdConceptoAgenteAduanal,
          },
        },
      },
    }),
  ),
  on(
    offerActions.SET_PROVIDER_DELIVERY_ROUTE_DELIVERY_TIME_CONFIGURATION_VALUE,
    (state: OfferState, {field, value}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        actualConfiguration: {
          ...state.selectedFamily.actualConfiguration,
          deliveryRoutes: map(
            state.selectedFamily.actualConfiguration.deliveryRoutes,
            (o: IOfferDeliveryRoutes) => {
              if (o.isSelected) {
                return {
                  ...o,
                  configuracionTiempoEntregaProveedorFamiliaRutaEntrega: {
                    ...o.configuracionTiempoEntregaProveedorFamiliaRutaEntrega,

                    [field]: value,
                  },
                };
              }
              return {...o};
            },
          ),
        },
      },
    }),
  ),
  /**/
  on(
    offerActions.SET_PROVIDER_UTILITIES_CONFIGURATION_VALUE,
    (state: OfferState, {field, value, idCatIndustryBrandFamily}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        actualConfiguration: {
          ...state.selectedFamily.actualConfiguration,
          configuracionProveedorRendimiento: {
            ...state.selectedFamily.actualConfiguration.configuracionProveedorRendimiento,
            vMarcaFamiliaIndustria: map(
              state.selectedFamily.actualConfiguration.configuracionProveedorRendimiento
                .vMarcaFamiliaIndustria,
              (performance: IVMarcaFamiliaIndustriaObj): IVMarcaFamiliaIndustriaObj => {
                if (performance.IdMarcaFamiliaCatIndustria === idCatIndustryBrandFamily) {
                  return {
                    ...performance,
                    ConfiguracionPrecioUtilidadCategoriaProveedor: find(
                      performance.ConfiguracionPrecioUtilidadCategoriaProveedor,
                      (o: ConfiguracionPrecioUtilidadCategoriaProveedorObj) =>
                        field === o.catNivelIngreso.NivelIngreso,
                    )
                      ? map(
                          performance.ConfiguracionPrecioUtilidadCategoriaProveedor,
                          (o: ConfiguracionPrecioUtilidadCategoriaProveedorObj) => ({
                            ...o,
                            UtilidadNivelIngreso:
                              field === o.catNivelIngreso.NivelIngreso
                                ? value
                                : o.UtilidadNivelIngreso,
                          }),
                        )
                      : [
                          ...performance.ConfiguracionPrecioUtilidadCategoriaProveedor,
                          {
                            ...filter(
                              state.catIncomeLevels,
                              (i: CatNivelIngreso) => i.NivelIngreso === field,
                            )[0],
                            IdConfiguracionPrecioProveedorFamilia:
                              state.selectedFamily.actualConfiguration
                                .ConfiguracionPrecioProveedorFamilia
                                .IdConfiguracionPrecioProveedorFamilia,
                            IdConfiguracionPrecioUtilidadCategoriaProveedor: DEFAULT_UUID,
                            UtilidadNivelIngreso: value,
                          },
                        ],
                    needsToSave: true,
                  };
                } else {
                  return {...performance};
                }
              },
            ),
          },
        },
      },
    }),
  ),
  on(offerActions.RESET_PRICE_LIST_DESIRED_PAGE, (state: OfferState) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      prices: {
        ...state.selectedFamily.prices,
        desiredPage: 0,
      },
    },
  })),
  on(offerActions.SET_PRICE_LIST_FOR_PANEL_SEARCH_TERM, (state: OfferState, {searchTerm}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      asidePrices: {
        ...state.selectedFamily.asidePrices,
        searchTerm,
        desiredPage: 1,
      },
    },
  })),
  on(offerActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE, (state: OfferState, {value}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      asidePrices: {
        ...state.selectedFamily.asidePrices,
        desiredPage: !state.selectedFamily.asidePrices.desiredPage
          ? value
          : state.selectedFamily.asidePrices.desiredPage + value,
      },
    },
  })),
  on(offerActions.RESET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE, (state: OfferState) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      asidePrices: {
        ...state.selectedFamily.asidePrices,
        desiredPage: 0,
      },
    },
  })),
  on(offerActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING, (state: OfferState, {isLoading}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      asidePrices: {
        ...state.selectedFamily.asidePrices,
        isLoading,
      },
    },
  })),
  on(
    offerActions.SET_PRICE_LIST_FOR_PANEL_NEEDS_TO_RELOAD,
    (state: OfferState, {needsToReload}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        asidePrices: {
          ...state.selectedFamily.asidePrices,
          needsToReload,
        },
      },
    }),
  ),
  on(offerActions.RESET_ASIDE_PRICES, (state: OfferState) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      asidePrices: {
        ...state.selectedFamily.asidePrices,
        needsToReload: false,
        desiredPage: 0,
        searchTerm: '',
        isLoading: false,
        pricesList: {},
        selectedPrice: {},
      },
    },
  })),
  on(
    offerActions.SET_SELECTED_PRICE_INCOME_LEVEL_FOR_PANEL,
    (state: OfferState, {incomeLevel}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        asidePrices: {
          ...state.selectedFamily.asidePrices,
          selectedPrice: {
            ...state.selectedFamily.asidePrices.selectedPrice,
            incomeLevelsValues: map(
              state.selectedFamily.asidePrices.selectedPrice.incomeLevelsValues,
              (o: IVProductProviderListPrice) => {
                if (toLower(deburr(o.NivelIngreso)) === toLower(deburr(incomeLevel))) {
                  return {...o, isSelected: true};
                } else {
                  return {...o, isSelected: false};
                }
              },
            ),
          },
        },
      },
    }),
  ),
  on(
    offerActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING,
    (state: OfferState, {tabConfigurationName, isLoading}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        [tabConfigurationName]: {
          ...state.selectedFamily[tabConfigurationName],
          isLoading,
        },
      },
    }),
  ),
  on(
    offerActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD,
    (state: OfferState, {tabConfigurationName, needsToReload}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        [tabConfigurationName]: {
          ...state.selectedFamily[tabConfigurationName],
          needsToReload,
        },
      },
    }),
  ),
  on(
    offerActions.SET_LIST_OF_TAB_CONFIGURATION_HAS_FILTER,
    (state: OfferState, {tabConfigurationName}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        [tabConfigurationName]: {
          ...state.selectedFamily[tabConfigurationName],
          hasConfigurationFilter: !state.selectedFamily[tabConfigurationName]
            .hasConfigurationFilter,
        },
      },
    }),
  ),
  on(offerActions.SET_PRICE_LIST_SEARCH_TERM, (state: OfferState, {searchTerm}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      prices: {
        ...state.selectedFamily.prices,
        desiredPage: 1,
        searchTerm,
        pricesList: {
          TotalResults: 0,
          Results: [],
        },
      },
    },
  })),
  on(offerActions.GET_PRICE_LIST_FILTERED_BY_THIS_LEVEL_CONFIG, (state: OfferState) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      prices: {
        ...state.selectedFamily.prices,
        desiredPage: 1,
      },
    },
  })),
  on(
    offerActions.SET_PRICE_CONFIGURATION_NEEDS_TO_RELOAD,
    (state: OfferState, {priceItem, needsToReload}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        prices: {
          ...state.selectedFamily.prices,
          pricesList: {
            ...state.selectedFamily.prices.pricesList,
            Results: map(
              state.selectedFamily.prices.pricesList.Results,
              (o: IVProductListPriceConfiguration) => {
                if (o.PrecioListaMonedaProveedor === priceItem.PrecioListaMonedaProveedor) {
                  return {
                    ...o,
                    needsToReload,
                  };
                } else {
                  return {...o};
                }
              },
            ),
          },
        },
      },
    }),
  ),
  on(offerActions.RESET_CHARACTERISTIC_GROUPER_DESIRED_PAGE, (state: OfferState) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      classifications: {
        ...state.selectedFamily.classifications,
        desiredPage: 0,
      },
    },
  })),
  on(
    offerActions.SET_CHARACTERISTIC_GROUPER_LIST_SEARCH_TERM,
    (state: OfferState, {searchTerm}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        classifications: {
          ...state.selectedFamily.classifications,
          desiredPage: 1,
          searchTerm,
        },
      },
    }),
  ),
  on(
    offerActions.GET_CHARACTERISTIC_GROUPER_LIST_FILTERED_BY_THIS_LEVEL_CONFIG,
    (state: OfferState) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        classifications: {
          ...state.selectedFamily.classifications,
          desiredPage: 1,
        },
      },
    }),
  ),
  on(
    offerActions.SET_CHARACTERISTIC_GROUPER_CONFIGURATION_NEEDS_TO_RELOAD,
    (state: OfferState, {classificationItem, needsToReload}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        classifications: {
          ...state.selectedFamily.classifications,
          classificationsList: {
            ...state.selectedFamily.classifications.classificationsList,
            Results: map(
              state.selectedFamily.classifications.classificationsList.Results,
              (o: IVProviderProductClassification) => {
                if (o.IdAgrupadorCaracteristica === classificationItem.IdAgrupadorCaracteristica) {
                  return {
                    ...o,
                    needsToReload,
                  };
                }
                return {...o};
              },
            ),
          },
        },
      },
    }),
  ),
  on(offerActions.SET_PRODUCT_LIST_SEARCH_TERM, (state: OfferState, {searchTerm}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      products: {
        ...state.selectedFamily.products,
        desiredPage: 1,
        searchTerm,
        priceList: {
          TotalResults: 0,
          Results: [],
        },
      },
    },
  })),
  on(offerActions.RESET_PRODUCT_DESIRED_PAGE, (state: OfferState) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      products: {
        ...state.selectedFamily.products,
        desiredPage: 0,
      },
    },
  })),
  on(offerActions.SET_PRODUCT_LIST_SEARCH_FILTER, (state: OfferState, {searchFilter}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      products: {
        ...state.selectedFamily.products,
        searchFilter,
      },
    },
  })),
  on(offerActions.GET_PRODUCT_LIST_FILTERED_BY_THIS_LEVEL_CONFIG, (state: OfferState) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      products: {
        ...state.selectedFamily.products,
        desiredPage: 1,
      },
    },
  })),
  on(
    offerActions.SET_PRODUCT_CONFIGURATION_NEEDS_TO_RELOAD,
    (state: OfferState, {productItem, needsToReload}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        products: {
          ...state.selectedFamily.products,
          productsList: {
            ...state.selectedFamily.products.productsList,
            Results: map(
              state.selectedFamily.products.productsList.Results,
              (o: IVProviderProductConfiguration) => {
                if (o.IdProducto === productItem.IdProducto) {
                  return {
                    ...o,
                    needsToReload,
                  };
                } else {
                  return {...o};
                }
              },
            ),
          },
        },
      },
    }),
  ),
  // DOCS: Saves
  on(offerActions.SAVE_CONFIGURATION_SUCCESS, (state: OfferState, {selectedFamily}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      ...omit(selectedFamily, ['prices', 'products', 'classifications']),
    },
  })),
  on(
    offerActions.SET_SELECTED_FAMILY,
    (state: OfferState, {familyId}): OfferState => ({
      ...state,
      // DOCS: Recorrer las familias
      familiesList: map(state.familiesList, (o: IVTrademarkFamily) => {
        // DOCS: Encontrar la familia actualmente seleccionada
        if (o.IdMarcaFamilia === state.selectedFamily?.IdMarcaFamilia) {
          // DOCS: Respaldar la info de la familia actualmente seleccionada dentro de la lista de familias y se desmarca
          return {...state.selectedFamily, isSelected: false};
          // DOCS: Encontrar la nueva familia que se esta seleccionando
        } else if (o.IdMarcaFamilia === familyId) {
          // DOCS: Marcar la familia como seleccionada
          return {...o, isSelected: true};
        }
        // DOCS: Devolver la familia sin ningun cambio si no coincide con ninguna de las validaciones
        return {...o, isSelected: false};
      }),
      selectedFamily: map(
        [find(state.familiesList, (o: IVTrademarkFamily) => o.IdMarcaFamilia === familyId)],
        (i) => ({...i, isSelected: true}),
      )[0],
    }),
  ),
  on(
    offerActions.GET_TRADEMARK_FAMILIES_LIST_SUCCESS,
    (state: OfferState, {trademarkFamiliesList, trademarkFamilyProvider}): OfferState => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        MarcaFamiliaProveedor: trademarkFamilyProvider,
        actualConfiguration: {
          ...state.selectedFamily.actualConfiguration,
          trademarkFamiliesList,
        },
        generalConfiguration: {
          ...state.selectedFamily.generalConfiguration,
          trademarkFamiliesList,
        },
      },
    }),
  ),
  on(offerActions.CLEAN_ACTUAL_CONFIGURATION, (state: OfferState) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      actualConfiguration: {} as IConfProvider,
    },
    familiesList: map(state.familiesList, (o) => {
      if (o.isSelected) {
        return {
          ...o,
          actualConfiguration: {} as IConfProvider,
        };
      } else {
        return {...o};
      }
    }),
  })),
  on(offerActions.RESTORE_GENERAL_ACTUAL_CONFIGURATION, (state: OfferState) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      actualConfiguration: state.selectedFamily.generalConfiguration,
      backupConfiguration: state.selectedFamily.generalConfiguration,
    },
  })),
  on(offerActions.RESTORE_PRICE_ACTUAL_CONFIGURATION, (state: OfferState) =>
    flow(
      () => filter(state.selectedFamily.prices.pricesList.Results, (o) => o.isSelected),
      (selectedPrice) => ({
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          actualConfiguration: !isEmpty(selectedPrice)
            ? selectedPrice[0].configuration
            : ({} as IConfProvider),
          backupConfiguration: !isEmpty(selectedPrice)
            ? selectedPrice[0].configuration
            : ({} as IConfProvider),
        },
      }),
    )(),
  ),
  on(
    offerActions.RESTORE_CLASSIFICATION_ACTUAL_CONFIGURATION,
    (state: OfferState): OfferState => {
      const selectedClassification = filter(
        state.selectedFamily.classifications.classificationsList.Results,
        (o) => o.isSelected,
      );
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          actualConfiguration: !isEmpty(selectedClassification)
            ? selectedClassification[0].configuration
            : ({} as IConfProvider),
          backupConfiguration: !isEmpty(selectedClassification)
            ? selectedClassification[0].configuration
            : ({} as IConfProvider),
        },
      };
    },
  ),
  on(
    offerActions.RESTORE_PRODUCT_ACTUAL_CONFIGURATION,
    (state: OfferState): OfferState => {
      const selectedProduct = filter(
        state.selectedFamily.products.productsList.Results,
        (o) => o.isSelected,
      );
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          actualConfiguration: !isEmpty(selectedProduct)
            ? selectedProduct[0].configuration
            : ({} as IConfProvider),
          backupConfiguration: !isEmpty(selectedProduct)
            ? selectedProduct[0].configuration
            : ({} as IConfProvider),
        },
      };
    },
  ),
  on(offerActions.SET_SELECTED_FAMILY_NEEDS_TO_RELOAD, (state: OfferState, {needsToReload}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      needsToReload,
    },
  })),
  on(offerActions.SET_ALL_PRICES_WITH_FAMILY_CONFIG_NEEDS_TO_RELOAD, (state: OfferState) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      prices: {
        ...state.selectedFamily.prices,
        pricesList: {
          ...state.selectedFamily.prices.pricesList,
          Results: map(
            state.selectedFamily.prices.pricesList.Results,
            (o: IVProductListPriceConfiguration) => {
              if (o.NivelConfiguracionProductoProveedor === Levels.Family) {
                return {
                  ...o,
                  needsToReload: true,
                };
              } else {
                return {...o};
              }
            },
          ),
        },
      },
    },
  })),
  on(
    offerActions.SET_LEVEL_CONFIGURATION_TAB_SELECTED,
    (state: OfferState, {selectedLevelConfigurationTab}) => ({
      ...state,
      familiesList: map(state.familiesList, (o: IVTrademarkFamily) => {
        if (o.isSelected) {
          return {
            ...o,
            selectedLevelConfigurationTab,
            levelSubConfigurationTabs: initialTabsSubConfigurationsOptions(),
            /*  selectedLevelSubConfigurationTab: {
              id: '1',
              label: 'PRECIO',
            },*/
          };
        } else {
          return {...o};
        }
      }),
      selectedFamily: {
        ...state.selectedFamily,
        selectedLevelConfigurationTab,
        levelSubConfigurationTabs: initialTabsSubConfigurationsOptions(),
      },
    }),
  ),
  on(
    offerActions.SET_LEVEL_SUB_CONFIGURATION_TAB_SELECTED,
    (state: OfferState, {selectedLevelSubConfigurationTab}) => ({
      ...state,
      familiesList: map(state.familiesList, (o: IVTrademarkFamily) => {
        if (o.isSelected) {
          return {
            ...o,
            levelSubConfigurationTabs: map(o.levelSubConfigurationTabs, (i: OptionBar) => {
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
            }),
          };
        } else {
          return {...o};
        }
      }),
      selectedFamily: {
        ...state.selectedFamily,
        levelSubConfigurationTabs: map(
          state.selectedFamily.levelSubConfigurationTabs,
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
    }),
  ),
  on(offerActions.SET_BACKUP_CONFIGURATION, (state: OfferState) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      backupConfiguration: state.selectedFamily.actualConfiguration,
    },
  })),
  on(offerActions.RESTORE_BACKUP_CONFIGURATION, (state: OfferState) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      actualConfiguration: state.selectedFamily.backupConfiguration,
    },
  })),
  on(offerActions.SET_FAMILY_BACKUP, (state: OfferState) => ({
    ...state,
    familiesList: map(state.familiesList, (o: IVTrademarkFamily) => {
      if (o.IdMarcaFamilia === state.selectedFamily.IdMarcaFamilia) {
        return {...state.selectedFamily};
      } else {
        return {...o};
      }
    }),
  })),
  on(
    offerActions.SET_PRESELECTED_LEVEL_CONFIG,
    (state: OfferState, {preSelectedLevelConfiguration}) => ({
      ...state,
      preSelectedLevelConfiguration,
    }),
  ),
  on(offerActions.SET_PRESELECTED_FAMILY_CHANGED, (state: OfferState, {selectedFamily}) => ({
    ...state,
    preSelectedFamily: selectedFamily,
  })),
  on(offerActions.ALERT_POP, (state: OfferState, {active}) => ({
    ...state,
    alertPop: active,
  })),
);
