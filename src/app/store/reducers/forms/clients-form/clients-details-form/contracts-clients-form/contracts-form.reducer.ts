import {
  ContractListData,
  IContract,
  IContractsForm,
  initialBrandQueryInfo,
  initialContract,
  initialContractBarActivities,
  initialFamilyContract,
  initialIContractsForm,
  initialSelectedTabFilter,
  initialTabFilters,
  ITrademark,
  IVClasificacionProductoMarcaCliente,
  IVContractFamily,
  IVPrecioListaClienteProductoContrato,
  IVPrecioProductoCliente,
  OfferContractBrands,
} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';
import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {filter, find, findIndex, flow, isEmpty, map, omit} from 'lodash-es';
import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';
import {CLEAN_ALL_CLIENTS_STATE} from '@appActions/catalogs/cliente.actions';
import {DropListOptionCustom} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {ResultObtenerContratosContemporaneosMismasMarcas} from 'api-catalogos';
import {clientContractActions} from '@appActions/forms/client-form/clients-details-form';
import {clientFormActions} from '@appActions/forms/client-form';
import {GET_DATAS_CONTRACT_LOAD} from '@appActions/forms/client-form/clients-details-form/client-contracts-form/client-contract.actions';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {ClienteEstrategiaCotizacionMarcasObj} from 'api-logistica';
import {initialToggleSwitchOptionsClients} from '@appModels/store/forms/clients-form/clients-details-form/clients-details-form.models';

export const contractsClientFormReducers: ActionReducer<IContractsForm> = combineReducers(
  {
    contractsList: createReducer(
      initialIContractsForm().contractsList,
      on(CLEAN_ALL_CLIENTS_STATE, () => initialIContractsForm().contractsList),
      on(clientFormActions.RESET_FORM_CLIENT, () => initialIContractsForm().contractsList),
      on(
        clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE,
        () => initialIContractsForm().contractsList,
      ),
      on(
        clientContractActions.GET_LIST_CONTRACTS_CLIENT_LOAD,
        (state) => initialIContractsForm().contractsList,
      ),
      on(clientContractActions.SET_API_STATUS_ACTIVE, (state, {status}) => ({
        ...state,
        apiStatusActive: status,
      })),
      on(clientContractActions.SET_API_STATUS_SAVED, (state, {status}) => ({
        ...state,
        apiStatusSaved: status,
      })),
      on(clientContractActions.SET_API_STATUS_EXPIRED, (state, {status}) => ({
        ...state,
        apiStatusExpired: status,
      })),
      on(clientContractActions.SET_API_STATUS_CANCELED, (state, {status}) => ({
        ...state,
        apiStatusCanceled: status,
      })),
      on(clientContractActions.GET_LIST_CONTRACTS_CLIENT_SUCCESS, (state, {lista, tab}) => ({
        ...state,
        contactsActive: tab === 'activo' ? lista : state.contactsActive,
        contractsSaved: tab === 'guardado' ? lista : state.contractsSaved,
        contractsExpired: tab === 'expirado' ? lista : state.contractsExpired,
        contractsCanceled: tab === 'cancelado' ? lista : state.contractsCanceled,
        needsToReloadActives: tab === 'activo' ? false : state.needsToReloadActives,
        needsToReloadSaved: tab === 'guardado' ? false : state.needsToReloadSaved,
        needsToReloadExpired: tab === 'expirado' ? false : state.needsToReloadExpired,
        needsToReloadCanceled: tab === 'cancelado' ? false : state.needsToReloadCanceled,
      })),
      on(clientContractActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
        ...state,
        needsToReloadActives: true,
        needsToReloadSaved: true,
        needsToReloadExpired: true,
        needsToReloadCanceled: true,
      })),
      on(clientContractActions.SET_SELECTED_TAB_FILTER, (state, {item}) => ({
        ...state,
        needsToReloadActives:
          item.filter.toLowerCase() === 'activo' && state.contactsActive?.length === 0,
        needsToReloadSaved:
          item.filter.toLowerCase() === 'guardado' && state.contractsSaved?.length === 0,
        needsToReloadExpired:
          item.filter.toLowerCase() === 'expirado' && state.contractsExpired?.length === 0,
        needsToReloadCanceled:
          item.filter.toLowerCase() === 'cancelado' && state.contractsCanceled?.length === 0,
      })),
      on(GET_DATAS_CONTRACT_LOAD, (state, {contract, tabSelected}) => ({
        ...state,
        contactsActive:
          tabSelected === 'activo'
            ? map(state.contactsActive, (it: IContract) => {
                if (it?.IdContratoCliente === contract?.IdContratoCliente) {
                  return {
                    ...it,
                    ...contract,
                    isSelected: true,
                  };
                }
                return {
                  ...it,
                  isSelected: false,
                };
              })
            : state.contactsActive,
        contractsSaved:
          tabSelected === 'guardado'
            ? map(state.contractsSaved, (it: IContract) => {
                if (it?.IdContratoCliente === contract?.IdContratoCliente) {
                  return {
                    ...it,
                    ...contract,
                    isSelected: true,
                  };
                }
                return {
                  ...it,
                  isSelected: false,
                };
              })
            : state.contractsSaved,
        contractsExpired:
          tabSelected === 'expirado'
            ? map(state.contractsExpired, (it: IContract) => {
                if (it?.IdContratoCliente === contract?.IdContratoCliente) {
                  return {
                    ...it,
                    ...contract,
                    isSelected: true,
                  };
                }
                return {
                  ...it,
                  isSelected: false,
                };
              })
            : state.contractsExpired,
        contractsCanceled:
          tabSelected === 'cancelado'
            ? map(state.contractsCanceled, (it: IContract) => {
                if (it?.IdContratoCliente === contract?.IdContratoCliente) {
                  return {
                    ...it,
                    ...contract,
                    isSelected: true,
                  };
                }
                return {
                  ...it,
                  isSelected: false,
                };
              })
            : state.contractsCanceled,
      })),

      on(
        clientContractActions.GET_DATAS_CONTRACT_SUCCESS,
        (state, {item, tab}): ContractListData => ({
          ...state,
          contactsActive:
            tab === 'activo'
              ? map(state.contactsActive, (it: IContract) => {
                  if (it.IdContratoCliente === item.IdContratoCliente) {
                    return {
                      ...it,
                      ...item,
                    };
                  }
                  return it;
                })
              : state.contactsActive,
          contractsSaved:
            tab === 'guardado'
              ? map(state.contractsSaved, (it: IContract) => {
                  if (it.IdContratoCliente === item.IdContratoCliente) {
                    return {
                      ...it,
                      ...item,
                    };
                  }
                  return it;
                })
              : state.contractsSaved,
          contractsExpired:
            tab === 'expirado'
              ? map(state.contractsExpired, (it: IContract) => {
                  if (it.IdContratoCliente === item.IdContratoCliente) {
                    return {
                      ...it,
                      ...item,
                    };
                  }
                  return it;
                })
              : state.contractsExpired,
          contractsCanceled:
            tab === 'cancelado'
              ? map(state.contractsCanceled, (it: IContract) => {
                  if (it.IdContratoCliente === item.IdContratoCliente) {
                    return {
                      ...it,
                      ...item,
                    };
                  }
                  return it;
                })
              : state.contractsCanceled,
        }),
      ),
      on(
        clientContractActions.SET_CONTRACT_NEEDS_TO_RELOAD,
        (state, {contract}): ContractListData => ({
          ...state,
          contactsActive: map(state.contactsActive, (it: IContract) => {
            if (it.IdContratoCliente === contract.IdContratoCliente) {
              return {
                ...it,
                needsToReload: true,
              };
            }
            return it;
          }),
          contractsSaved: map(state.contractsSaved, (it: IContract) => {
            if (it.IdContratoCliente === contract.IdContratoCliente) {
              return {
                ...it,
                needsToReload: true,
              };
            }
            return it;
          }),
          contractsExpired: map(state.contractsExpired, (it: IContract) => {
            if (it.IdContratoCliente === contract.IdContratoCliente) {
              return {
                ...it,
                needsToReload: true,
              };
            }
            return it;
          }),
          contractsCanceled: map(state.contractsCanceled, (it: IContract) => {
            if (it.IdContratoCliente === contract.IdContratoCliente) {
              return {
                ...it,
                needsToReload: true,
              };
            }
            return it;
          }),
        }),
      ),
      on(
        clientContractActions.SET_SAVE_CONTRACT_STATUS,
        () => initialIContractsForm().contractsList,
      ),
    ),
    searchTerm: createReducer(
      '',
      on(clientContractActions.SET_SEARCH_TERM, (state, {searchTerm}) => searchTerm),
      on(
        clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE,
        () => initialIContractsForm().searchTerm,
      ),
      on(clientContractActions.SET_SELECTED_TAB_FILTER, () => initialIContractsForm().searchTerm),
    ),
    selectedContract: createReducer(
      initialContract(),
      on(
        clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE,
        () => initialIContractsForm().selectedContract,
      ),
      on(clientFormActions.RESET_FORM_CLIENT, () => initialContract()),
      on(clientContractActions.SET_PDF_CONTRACT_LOADING, (state: IContract) => ({
        ...state,
        status: API_REQUEST_STATUS_LOADING,
      })),
      on(clientContractActions.SET_PDF_CONTRACT_SUCCESS, (state: IContract) => ({
        ...state,
        status: API_REQUEST_STATUS_SUCCEEDED,
      })),
      on(clientContractActions.SET_PDF_CONTRACT_FAILED, (state: IContract) => ({
        ...state,
        status: API_REQUEST_STATUS_FAILED,
      })),
      on(clientContractActions.SET_ITEM_SELECTED_CONTRAT, (state: IContract, {item}) => ({
        ...state,
        ...item,
        status: API_REQUEST_STATUS_SUCCEEDED,
      })),
      on(clientContractActions.GET_DATAS_CONTRACT_LOAD, (state: IContract) => ({
        ...state,
        status: API_REQUEST_STATUS_LOADING,
      })),
      on(clientContractActions.GET_DATAS_CONTRACT_ERROR, (state: IContract) => ({
        ...state,
        status: API_REQUEST_STATUS_FAILED,
      })),
      on(clientContractActions.GET_DATAS_CONTRACT_SUCCESS, (state: IContract, {item}) => ({
        ...state,
        ...item,
        status: API_REQUEST_STATUS_SUCCEEDED,
      })),
      on(clientContractActions.SET_CONTRACT_NEEDS_TO_RELOAD, (state: IContract) => ({
        ...state,
        needsToReload: true,
      })),
      on(clientContractActions.SET_SEARCH_TERM, (state) => initialContract()),
      on(clientContractActions.GET_LIST_CONTRACTS_CLIENT_SUCCESS, (state, {lista, tab}) => ({
        ...lista[0],
        isSelected: true,
        needsToReload: true,
      })),
    ),
    addingContract: createReducer(
      initialIContractsForm().addingContract,
      on(clientFormActions.RESET_FORM_CLIENT, () => false),
      on(
        clientContractActions.SET_IS_ADDING_CONTRACT,
        (state: boolean, {addingContract}) => addingContract,
      ),
      on(
        clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE,
        () => initialIContractsForm().addingContract,
      ),
    ),
    addContractActualStep: createReducer(
      0,
      on(clientFormActions.RESET_FORM_CLIENT, () => 0),
      on(
        clientContractActions.SET_ADD_CONTRACT_ACTUAL_STEP,
        (state: number, {addContractActualStep}) => addContractActualStep,
      ),
      on(
        clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE,
        () => initialIContractsForm().addContractActualStep,
      ),
    ),
    addStep: createReducer(
      initialIContractsForm().addStep,
      on(clientFormActions.RESET_FORM_CLIENT, () => false),
      on(clientContractActions.SET_ADD_STEP_VALUE, (state: boolean, {addStep}) => addStep),
      on(clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE, () => initialIContractsForm().addStep),
    ),
    newContract: createReducer(
      initialContract(),
      on(
        clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE,
        () => initialIContractsForm().newContract,
      ),
      on(clientFormActions.RESET_FORM_CLIENT, () => initialContract()),
      /*  on(clientContractActions.SET_ADD_CONTRACT_ACTUAL_STEP, (state, {addContractActualStep}) => ({
        ...state,
        families: addContractActualStep === 0 ? [] : {...state.families},
        selectedFamily: addContractActualStep === 0 ? {} : {...state.selectedFamily},
      })),*/
      on(clientContractActions.SET_SELECTED_BAR_OPTION, (state, {option}) => ({
        ...state,
        tabsSubConfiguration: map(
          state.tabsSubConfiguration,
          (o: OptionBar): OptionBar => {
            if (o.id === option.id) {
              return {
                ...o,
                isSelected: true,
              };
            }
            return {
              ...o,
              isSelected: false,
            };
          },
        ),
      })),
      on(clientContractActions.GET_BRANDS_LOAD, (state: IContract) => ({
        ...state,
        brands: {
          ...state.brands,
          brandsStatus: API_REQUEST_STATUS_LOADING,
        },
      })),
      on(clientContractActions.GET_BRANDS_SUCCESS, (state: IContract, {brands}) => ({
        ...state,
        brands: {
          ...state.brands,
          brandList: brands,
          brandsStatus: API_REQUEST_STATUS_SUCCEEDED,
        },
      })),
      on(clientContractActions.GET_BRANDS_ERROR, (state: IContract) => ({
        ...state,
        brands: {
          ...state.brands,
          brandsStatus: API_REQUEST_STATUS_FAILED,
        },
      })),
      on(
        clientContractActions.SET_SEARCH_TERM_BY_BRAND,
        (state: IContract, {searchTerm, queryInfo}) => ({
          ...state,
          brands: {
            ...state.brands,
            searchTerm,
            brandList: [],
            brandsStatus: API_REQUEST_STATUS_LOADING,
          },
        }),
      ),
      on(clientContractActions.SET_BRAND, (state: IContract, {brand}) => ({
        ...state,
        preSelectedBrands:
          findIndex(state.preSelectedBrands, (o: ITrademark) => o.IdMarca === brand.IdMarca) === -1
            ? [...state.preSelectedBrands, brand]
            : [...state.preSelectedBrands],
        disableBrands: filter(state.disableBrands, (o: ITrademark) => o.IdMarca !== brand.IdMarca),
      })),
      on(
        clientContractActions.DELETE_BRAND,
        (state: IContract, {brand}): IContract => ({
          ...state,
          preSelectedBrands: filter(
            state.preSelectedBrands,
            (o: ClienteEstrategiaCotizacionMarcasObj) => o.IdMarca !== brand.IdMarca,
          ),
          disableBrands:
            brand.IdContratoCliente && brand.IdContratoClienteMarca
              ? [...state.disableBrands, brand]
              : [...state.disableBrands],
          contractBrands: filter(
            state.contractBrands,
            (o: OfferContractBrands) => o.IdMarca !== brand.IdMarca,
          ),
        }),
      ),
      on(clientContractActions.DOWNLOAD_CSV_FILE_SUCCESS, (state: IContract, {csvFile}) => ({
        ...state,
        selectedFamily: {...state.selectedBrand, csvFile},
      })),
      on(clientContractActions.DELETE_CSV_FILE, (state: IContract) => ({
        ...state,
        selectedFamily: omit(state.selectedBrand, ['csvFile']),
      })),

      on(clientContractActions.SET_DATE_INITIAL, (state: IContract, {payload}) => ({
        ...state,
        FechaInicio: payload.dateF,
        FechaInicioTipoDate: payload.fecha,
      })),
      on(clientContractActions.SET_DATE_FINAL, (state: IContract, {payload}) => ({
        ...state,
        FechaFin: payload.dateF,
        FechaFinTipoDate: payload.fecha,
      })),
      on(
        clientContractActions.SET_ID_CONDICIONES_PAGO,
        (state: IContract, {IdCatCondicionesDePago}) => ({
          ...state,
          IdCatCondicionesDePago,
        }),
      ),

      // SECCION DE OBTENCION DE LAS MARCAS VINCULADAS LA CONTRATO Y LAS FAMILIAS DE ESA MARCA PARA LAS CONFIGURACION POR FAMILIA
      on(
        clientContractActions.SET_V_FAMILY_CONTRATO_SUCCESS,
        (state: IContract, {families}): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            needsToReload: false,
            familiesList: map(families, (o) => ({
              ...initialFamilyContract(),
              ...o,
            })),
          },
        }),
      ),
      on(
        clientContractActions.SET_FAMILY_SELECTED,
        (state: IContract, {familyId}): IContract => ({
          ...state,
          // DOCS: Recorrer las familias
          selectedBrand: {
            ...state.selectedBrand,
            familiesList: map(state.selectedBrand.familiesList, (o: IVContractFamily) => {
              // DOCS: Encontrar la familia actualmente seleccionada
              if (o.IdMarcaFamilia === state.selectedBrand.selectedFamily?.IdMarcaFamilia) {
                // DOCS: Respaldar la info de la familia actualmente seleccionada dentro de la lista de familias y se desmarca
                return {
                  ...state.selectedBrand.selectedFamily,
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
                  state.selectedBrand.familiesList,
                  (o: IVContractFamily) => o.IdMarcaFamilia === familyId,
                ),
              ],
              (i: IVContractFamily): IVContractFamily => ({...i, isSelected: true}),
            )[0],
          },
        }),
      ),
      on(
        clientContractActions.SET_TRADEMARK_CONSOLIDATION_PROVIDER_SUCCESS,
        (state: IContract, {trademarkFamilyProviderConsolidation}): IContract => ({
          ...state,
          trademarkFamilyProviderConsolidation,
        }),
      ),
      on(
        clientContractActions.SET_SEARCH_TERM_BY_BRAND_SELECTED,
        (state: IContract, {searchTerm}): IContract => ({
          ...state,
          searchTermBrand: searchTerm,
          contractBrands: [],
          selectedBrand: null,
          contractBrandsLoad: true,
        }),
      ),
      // DOCS Reducers para configuracion a nivel familia
      on(
        clientContractActions.RESTORE_GENERAL_ACTUAL_CONFIGURATION,
        (state: IContract): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              actualConfiguration: state.selectedBrand.selectedFamily.generalConfiguration,
              backupConfiguration: state.selectedBrand.selectedFamily.generalConfiguration,
            },
          },
        }),
      ),
      on(
        clientContractActions.GET_GENERAL_CONFIGURATION_SUCCESS,
        (state: IContract, {configuration}): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              generalConfiguration: {
                ...configuration,
              },
              actualConfiguration: {
                ...configuration,
              },
              backupConfiguration: {
                ...configuration,
              },
            },
          },
        }),
      ),
      on(
        clientContractActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD,
        (state: IContract, {tabConfigurationName, needsToReload}): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              [tabConfigurationName]: {
                ...state.selectedBrand.selectedFamily[tabConfigurationName],
                needsToReload,
              },
            },
          },
        }),
      ),
      on(
        clientContractActions.SET_LIST_OF_CONFIGURED_TAB_CONFIGURATION_NEEDS_TO_RELOAD,
        (state: IContract, {tabConfigurationName}): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              [tabConfigurationName]: {
                ...state.selectedBrand.selectedFamily[tabConfigurationName],
                desiredPage: 0,
                searchTerm: '',
              },
            },
          },
        }),
      ),
      on(
        clientContractActions.RESTORE_PRICE_ACTUAL_CONFIGURATION,
        (state: IContract): IContract =>
          flow(
            () =>
              filter(
                state.selectedBrand.selectedFamily.prices.pricesList.Results,
                (o) => o.isSelected,
              ),
            (selectedPrice) => ({
              ...state,
              selectedBrand: {
                ...state.selectedBrand,
                selectedFamily: {
                  ...state.selectedBrand.selectedFamily,
                  actualConfiguration: !isEmpty(selectedPrice)
                    ? selectedPrice[0].configuration
                    : {},
                  backupConfiguration: !isEmpty(selectedPrice)
                    ? selectedPrice[0].configuration
                    : {},
                },
              },
            }),
          )(),
      ),
      on(
        clientContractActions.RESTORE_CLASSIFICATION_ACTUAL_CONFIGURATION,
        (state: IContract): IContract =>
          flow(
            () =>
              filter(
                state.selectedBrand.selectedFamily.characteristicGroupers.characteristicGroupersList
                  .Results,
                (o) => o.isSelected,
              ),
            (selectedClassification): IContract => ({
              ...state,
              selectedBrand: {
                ...state.selectedBrand,
                selectedFamily: {
                  ...state.selectedBrand.selectedFamily,
                  actualConfiguration: !isEmpty(selectedClassification)
                    ? selectedClassification[0].configuration
                    : {},
                  backupConfiguration: !isEmpty(selectedClassification)
                    ? selectedClassification[0].configuration
                    : {},
                },
              },
            }),
          )(),
      ),
      on(
        clientContractActions.RESTORE_PRODUCT_ACTUAL_CONFIGURATION,
        (state: IContract): IContract =>
          flow(
            () =>
              filter(
                state.selectedBrand.selectedFamily.products.productsList.Results,
                (o) => o.isSelected,
              ),
            (selectedProduct): IContract => ({
              ...state,
              selectedBrand: {
                ...state.selectedBrand,
                selectedFamily: {
                  ...state.selectedBrand.selectedFamily,
                  actualConfiguration: !isEmpty(selectedProduct)
                    ? selectedProduct[0].configuration
                    : {},
                  backupConfiguration: !isEmpty(selectedProduct)
                    ? selectedProduct[0].configuration
                    : {},
                },
              },
            }),
          )(),
      ),

      on(
        clientContractActions.SET_SELECTED_TAB_CONFIGURATION,
        (state: IContract, {selectedLevelConfigurationTab}): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              selectedLevelConfigurationTab,
            },
          },
        }),
      ),
      on(
        clientContractActions.SET_LIST_OF_TAB_CONFIGURATION_IS_LOADING,
        (state: IContract, {tabConfigurationName, isLoading}): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              [tabConfigurationName]: {
                ...state.selectedBrand.selectedFamily[tabConfigurationName],
                isLoading,
              },
            },
          },
        }),
      ),

      on(
        clientContractActions.SET_BRAND_SELECTED,
        (state: IContract, {brand}): IContract => ({
          ...state,
          contractBrands: map(state.contractBrands, (o: OfferContractBrands) => {
            // DOCS: Encontrar la familia actualmente seleccionada y que sea diferente a la que se esta seleccionando
            if (o.IdMarca === state.selectedBrand?.IdMarca && o.IdMarca !== brand.IdMarca) {
              // DOCS: Respaldar la info de la familia actualmente seleccionada dentro de la lista de familias y se desmarca
              return {...state.selectedBrand, isSelected: false};
              // DOCS: Encontrar la nueva familia que se esta seleccionando
            } else if (o.IdMarca === brand.IdMarca) {
              // DOCS: Marcar la familia como seleccionada
              return {...o, isSelected: true};
            }
            // DOCS: Devolver la familia sin ningun cambio si no coincide con ninguna de las validaciones
            return {...o, isSelected: false};
          }),
          selectedBrand: map(
            [find(state.contractBrands, (o: OfferContractBrands) => o.IdMarca === brand.IdMarca)],
            (i) => ({...i, isSelected: true}),
          )[0],
        }),
      ),
      on(
        clientContractActions.SET_PRE_SELECTED_BRAND,
        (state: IContract, {value}): IContract => ({
          ...state,
          preSelectedBrand: value,
        }),
      ),
      on(
        clientContractActions.SET_PRE_SELECTED_FAMILY,
        (state: IContract, {value}): IContract => ({
          ...state,
          preSelectedFamily: value,
        }),
      ),
      on(
        clientContractActions.SET_PRE_SELECTED_LEVEL_CONFIGURATION,
        (state: IContract, {value}): IContract => ({
          ...state,
          preSelectedLevelConfiguration: value,
        }),
      ),
      on(
        clientContractActions.ACTIVE_CANCEL_POP,
        (state: IContract, {value}): IContract => ({
          ...state,
          activePopCancel: value,
        }),
      ),
      on(
        clientContractActions.SAVE_INPUT_VALUE_COMPONENT_EFFECT,
        (state: IContract, {field, value}): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              actualConfiguration: {
                ...state.selectedBrand.selectedFamily.actualConfiguration,
                ContratoClienteMarcaConfiguracion: {
                  ...state.selectedBrand.selectedFamily.actualConfiguration
                    .ContratoClienteMarcaConfiguracion,
                  [field]: value,
                },
              },
            },
          },
        }),
      ),
      on(
        clientContractActions.SET_FAMILY_BACKUP,
        (state: IContract): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            familiesList: map(state.selectedBrand.familiesList, (o) => {
              if (o.IdMarcaFamilia === state.selectedBrand.selectedFamily.IdMarcaFamilia) {
                return {...state.selectedBrand.selectedFamily};
              } else {
                return {...o};
              }
            }),
          },
        }),
      ),
      on(
        clientContractActions.CLEAN_ACTUAL_CONFIGURATION,
        (state: IContract): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              actualConfiguration: {},
              backupConfiguration: {},
            },
          },
        }),
      ),
      on(
        clientContractActions.GET_PRICE_LIST_LOAD,
        (state: IContract): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              prices: {
                ...state.selectedBrand.selectedFamily.prices,
                desiredPage: state.selectedBrand.selectedFamily.prices.desiredPage + 1,
              },
            },
          },
        }),
      ),
      on(
        clientContractActions.GET_PRICE_LIST_SUCCESS,
        (state: IContract, {prices}): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              prices: {
                ...state.selectedBrand.selectedFamily.prices,
                pricesList: {
                  TotalResults: prices.TotalResults,
                  Results:
                    state.selectedBrand.selectedFamily.prices.desiredPage === 1
                      ? [...prices.Results]
                      : [
                          ...state.selectedBrand.selectedFamily.prices.pricesList.Results,
                          ...prices.Results,
                        ],
                },
                needsToReload: false,
              },
            },
          },
        }),
      ),
      on(
        clientContractActions.SET_PRICE_LIST_SEARCH_TERM,
        (state: IContract, {searchTerm}): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              prices: {
                ...state.selectedBrand.selectedFamily.prices,
                desiredPage: 1,
                searchTerm,
                pricesList: {
                  TotalResults: 0,
                  Results: [],
                },
                needsToReload: true,
              },
            },
          },
        }),
      ),

      on(
        clientContractActions.SET_CONTRACT_PRICE,
        (state: IContract, {price}): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              prices: {
                ...state.selectedBrand.selectedFamily.prices,
                pricesList: {
                  ...state.selectedBrand.selectedFamily.prices.pricesList,
                  Results: map(
                    state.selectedBrand.selectedFamily.prices.pricesList.Results,
                    (i) => {
                      if (i.PrecioLista === price?.PrecioLista) {
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
      on(
        clientContractActions.GET_PRICE_CONFIGURATION_SUCCESS,
        (state: IContract, {configuration}): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              actualConfiguration: configuration,
              backupConfiguration: configuration,
              prices: {
                ...state.selectedBrand.selectedFamily.prices,
                pricesList: {
                  ...state.selectedBrand.selectedFamily.prices.pricesList,
                  Results: map(
                    state.selectedBrand.selectedFamily.prices.pricesList.Results,
                    (o: IVPrecioListaClienteProductoContrato) => {
                      if (o.isSelected) {
                        return {
                          ...o,
                          configuration,
                          needsToReload: false,
                        };
                      } else {
                        return {...o};
                      }
                    },
                  ),
                },
              },
            },
          },
        }),
      ),
      on(
        clientContractActions.RESTORE_BACKUP_CONFIGURATION,
        (state: IContract): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              actualConfiguration: state.selectedBrand.selectedFamily.backupConfiguration,
            },
          },
        }),
      ),
      on(
        clientContractActions.GET_CHARACTERISTIC_GROUPER_LIST_LOAD,
        (state: IContract): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              characteristicGroupers: {
                ...state.selectedBrand.selectedFamily.characteristicGroupers,
                desiredPage:
                  state.selectedBrand.selectedFamily.characteristicGroupers.desiredPage + 1,
              },
            },
          },
        }),
      ),
      on(
        clientContractActions.GET_CHARACTERISTIC_GROUPER_LIST_SUCCESS,
        (state: IContract, {characteristicGroupers}): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              characteristicGroupers: {
                ...state.selectedBrand.selectedFamily.characteristicGroupers,
                characteristicGroupersList: {
                  TotalResults: characteristicGroupers.TotalResults,
                  Results:
                    state.selectedBrand.selectedFamily.characteristicGroupers.desiredPage === 1
                      ? [...characteristicGroupers.Results]
                      : [
                          ...state.selectedBrand.selectedFamily.characteristicGroupers
                            .characteristicGroupersList.Results,
                          ...characteristicGroupers.Results,
                        ],
                },
                needsToReload: false,
              },
            },
          },
        }),
      ),
      //
      on(
        clientContractActions.SET_CHARACTERISTIC_GROUPER_LIST_SEARCH_TERM,
        (state: IContract, {searchTerm}): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              characteristicGroupers: {
                ...state.selectedBrand.selectedFamily.characteristicGroupers,
                desiredPage: 1,
                searchTerm,
                characteristicGroupersList: {
                  TotalResults: 0,
                  Results: [],
                },
                needsToReload: true,
              },
            },
          },
        }),
      ),
      on(
        clientContractActions.SET_CONTRACT_CLASSIFICATION,
        (state: IContract, {classification}): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              characteristicGroupers: {
                ...state.selectedBrand.selectedFamily.characteristicGroupers,
                characteristicGroupersList: {
                  ...state.selectedBrand.selectedFamily.characteristicGroupers
                    .characteristicGroupersList,
                  Results: map(
                    state.selectedBrand.selectedFamily.characteristicGroupers
                      .characteristicGroupersList.Results,
                    (i) => {
                      if (
                        i.IdAgrupadorCaracteristica === classification?.IdAgrupadorCaracteristica
                      ) {
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
      on(
        clientContractActions.GET_CHARACTERISTIC_GROUPER_CONFIGURATION_SUCCESS,
        (state: IContract, {configuration}): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              actualConfiguration: configuration,
              backupConfiguration: configuration,
              characteristicGroupers: {
                ...state.selectedBrand.selectedFamily.characteristicGroupers,
                characteristicGroupersList: {
                  ...state.selectedBrand.selectedFamily.characteristicGroupers
                    .characteristicGroupersList,
                  Results: map(
                    state.selectedBrand.selectedFamily.characteristicGroupers
                      .characteristicGroupersList.Results,
                    (o: IVClasificacionProductoMarcaCliente) => {
                      if (o.isSelected) {
                        return {
                          ...o,
                          configuration,
                          needsToReload: false,
                        };
                      } else {
                        return {...o};
                      }
                    },
                  ),
                },
              },
            },
          },
        }),
      ),
      on(clientContractActions.SET_PRODUCT_LIST_SEARCH_TERM, (state: IContract, {searchTerm}) => ({
        ...state,
        selectedBrand: {
          ...state.selectedBrand,
          selectedFamily: {
            ...state.selectedBrand.selectedFamily,

            products: {
              ...state.selectedBrand.selectedFamily.products,
              desiredPage: 1,
              searchTerm,
              productsList: {
                TotalResults: 0,
                Results: [],
              },
              needsToReload: true,
            },
          },
        },
      })),
      on(
        clientContractActions.SET_CONTRACT_PRODUCT,
        (state: IContract, {product}): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              products: {
                ...state.selectedBrand.selectedFamily.products,
                productsList: {
                  ...state.selectedBrand.selectedFamily.products.productsList,
                  Results: map(
                    state.selectedBrand.selectedFamily.products.productsList.Results,
                    (i: IVPrecioProductoCliente) => {
                      if (i.IdProducto === product?.IdProducto) {
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
      on(
        clientContractActions.GET_PRODUCT_LIST_SUCCESS,
        (state: IContract, {products}): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              products: {
                ...state.selectedBrand.selectedFamily.products,
                productsList: {
                  TotalResults: products.TotalResults,
                  Results:
                    state.selectedBrand.selectedFamily.products.desiredPage === 1
                      ? [...products.Results]
                      : [
                          ...state.selectedBrand.selectedFamily.products.productsList.Results,
                          ...products.Results,
                        ],
                },
                needsToReload: false,
              },
            },
          },
        }),
      ),
      on(
        clientContractActions.GET_PRODUCT_LIST_LOAD,
        (state: IContract): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              products: {
                ...state.selectedBrand.selectedFamily.products,
                desiredPage: state.selectedBrand.selectedFamily.products.desiredPage + 1,
              },
            },
          },
        }),
      ),
      on(
        clientContractActions.GET_PRODUCT_CONFIGURATION_SUCCESS,
        (state: IContract, {configuration}): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: {
              ...state.selectedBrand.selectedFamily,
              actualConfiguration: configuration,
              backupConfiguration: configuration,
              products: {
                ...state.selectedBrand.selectedFamily.products,
                productsList: {
                  ...state.selectedBrand.selectedFamily.products.productsList,
                  Results: map(
                    state.selectedBrand.selectedFamily.products.productsList.Results,
                    (o: IVPrecioProductoCliente) => {
                      if (o.isSelected) {
                        return {
                          ...o,
                          configuration,
                          needsToReload: false,
                        };
                      } else {
                        return {...o};
                      }
                    },
                  ),
                },
              },
            },
          },
        }),
      ),
      on(
        clientContractActions.SAVE_CONFIGURATION_SUCCESS,
        (state: IContract, {newFamily}): IContract => ({
          ...state,
          selectedBrand: {
            ...state.selectedBrand,
            selectedFamily: newFamily,
          },
        }),
      ),
      on(clientContractActions.SET_CONTRACT_DATA, (state: IContract, {payload, node}) => ({
        ...state,
        [node]: payload,
      })),
      on(clientContractActions.SET_CONTRACT_DATA_BUSSINESSNAME, (state: IContract, {payload}) => ({
        ...state,
        IdEmpresa: payload.value.toString(),
      })),
      on(clientContractActions.SET_VALUE_TYPE_CONTRACT, (state: IContract, {payload}) =>
        payload
          ? {
              ...state,
              Contrato: payload,
              Acuerdo: !payload,
              ClienteEnvia: false,
            }
          : {
              ...state,
              Contrato: payload,
              Acuerdo: !payload,
              NombreRepresentanteLegalFirma: null,
              ApellidoPaternoRepresentanteLegalFirma: null,
              ApellidoMaternoRepresentanteLegalFirma: null,
              IdEmpresa: null,
              ClienteEnvia: false,
            },
      ),
      on(clientContractActions.SET_VALUE_TYPE_AGREEEMENT, (state: IContract, {payload}) => ({
        ...state,
        Contrato: !payload,
        Acuerdo: payload,
        ApellidoPaternoRepresentanteLegalFirma: null,
        NombreRepresentanteLegalFirma: null,
        ApellidoMaternoRepresentanteLegalFirma: null,
        IdEmpresa: null,
        ClienteEnvia: false,
      })),
      on(clientContractActions.SET_INITIAL_CONFIGURATION_CONTRACT, (state: IContract) => ({
        ...state,
        Acuerdo: false,
        ApellidoMaternoFirma: null,
        ApellidoMaternoRepresentanteLegalEmpresa: null,
        ApellidoMaternoRepresentanteLegalFirma: null,
        ApellidoPaternoFirma: null,
        ApellidoPaternoRepresentanteLegalEmpresa: null,
        ApellidoPaternoRepresentanteLegalFirma: null,
        ClienteEnvia: false,
        Contrato: true,
        IdEmpresa: null,
        NombreFirma: null,
        NombreRepresentanteLegalEmpresa: null,
        NombreRepresentanteLegalFirma: null,
        Observacion: null,
      })),
      on(clientContractActions.SET_ID_EMPRESA, (state: IContract, {payload}) => ({
        ...state,
        IdEmpresa: payload,
      })),
      on(clientContractActions.SET_ID_CONTRACT_CLIENT, (state: IContract, {payload}) => ({
        ...state,
        IdContratoCliente: payload,
      })),
      on(clientContractActions.SET_URL_CONTRACT, (state: IContract, {url}) => ({
        ...state,
        UrlContrato: url,
      })),
      on(clientContractActions.GET_DATA_NEW_CONTRACT_LOAD, (state: IContract) => ({
        ...state,
        contractBrandsLoad: true,
      })),
      on(
        clientContractActions.GET_DATA_NEW_CONTRACT_SUCCESS,
        (state: IContract, {brands}): IContract => ({
          ...state,
          contractBrands: brands,
          contractBrandsLoad: false,
        }),
      ),
      on(clientContractActions.GET_CONTRACT_PRE_SELECTED_BRANDS_LOAD, (state: IContract) => ({
        ...state,
        status: API_REQUEST_STATUS_LOADING,
      })),
      on(
        clientContractActions.GET_CONTRACT_PRE_SELECTED_BRANDS_SUCCESS,
        (state: IContract, {brands}) => ({
          ...state,
          preSelectedBrands: brands,
          status: API_REQUEST_STATUS_SUCCEEDED,
        }),
      ),
      on(clientContractActions.SET_SIGNED_CONTRACT, (state: IContract, {signedContract}) => ({
        ...state,
        signedContract: signedContract,
      })),
      on(clientContractActions.SET_CONTRACT_TO_EDIT, (state: IContract, {contract}) => ({
        ...state,
        ...contract,
      })),
      on(clientContractActions.RESET_FORM_CONTRACT, () => initialContract()),
      on(clientContractActions.SET_ID_CONTRACT_FILE, (state: IContract, {IdArchivoContrato}) => ({
        ...state,
        IdArchivoContrato,
      })),
      on(
        clientContractActions.SET_ID_SIGNED_CONTRACT_FILE,
        (state: IContract, {IdArchivoContratoFirmado}) => ({
          ...state,
          IdArchivoContratoFirmado,
        }),
      ),

      on(
        clientContractActions.SET_PRICE_LIST_FOR_PANEL_SEARCH_TERM,
        (state: IContract, {searchTerm, node}) => ({
          ...state,
          selectedFamily: {
            ...state.selectedBrand,
            [node]: {
              ...state.selectedBrand[node],
              searchTerm,
              desiredPage: 1,
              pricesList: {
                TotalResults: 0,
                Results: [],
              },
            },
          },
        }),
      ),
      on(
        clientContractActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE,
        (state: IContract, {value, node}) => ({
          ...state,
          selectedFamily: {
            ...state.selectedBrand,
            [node]: {
              ...state.selectedBrand[node],
              desiredPage: !state.selectedBrand[node].desiredPage
                ? value
                : state.selectedBrand[node].desiredPage + value,
            },
          },
        }),
      ),
      on(
        clientContractActions.RESET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE,
        (state: IContract, {node}) => ({
          ...state,
          selectedFamily: {
            ...state.selectedBrand,
            [node]: {
              ...state.selectedBrand[node],
              desiredPage: 0,
            },
          },
        }),
      ),
      on(
        clientContractActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING,
        (state: IContract, {isLoading, node}) => ({
          ...state,
          selectedFamily: {
            ...state.selectedBrand,
            [node]: {
              ...state.selectedBrand[node],
              isLoading,
            },
          },
        }),
      ),
      on(
        clientContractActions.SET_PRICE_LIST_FOR_PANEL_NEEDS_TO_RELOAD,
        (state: IContract, {needsToReload, node}) => ({
          ...state,
          selectedFamily: {
            ...state.selectedBrand,
            [node]: {
              ...state.selectedBrand[node],
              needsToReload,
            },
          },
        }),
      ),
      on(clientContractActions.GET_PRICE_LIST_FOR_PANEL_FAMILY_LEVEL_LOAD, (state: IContract) => ({
        ...state,
        selectedFamily: {
          ...state.selectedBrand,
          generalAsidePrices: {
            ...state.selectedBrand.selectedFamily.generalAsidePrices,
            desiredPage: state.selectedBrand.selectedFamily.generalAsidePrices.desiredPage + 1,
          },
        },
      })),
      on(
        clientContractActions.GET_PRICE_LIST_FOR_PANEL_FAMILY_LEVEL_SUCCESS,
        (state: IContract, {prices, node}) => ({
          ...state,
          selectedFamily: {
            ...state.selectedBrand,
            [node]: {
              ...state.selectedBrand[node],
              pricesList: {
                TotalResults: prices.TotalResults,
                Results:
                  state.selectedBrand[node].desiredPage === 1
                    ? [...prices.Results]
                    : [...state.selectedBrand[node].pricesList.Results, ...prices.Results],
              },
            },
          },
        }),
      ),
      on(clientContractActions.SET_SHOW_INPUT_FILE, (state: IContract, {value}) => ({
        ...state,
        showInputFile: value,
      })),
    ),
    editMode: createReducer(
      initialIContractsForm().editMode,
      on(clientFormActions.RESET_FORM_CLIENT, () => false),
      on(clientContractActions.SET_EDIT_MODE, (state: boolean, {editMode}) => editMode),
      on(
        clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE,
        () => initialIContractsForm().editMode,
      ),
    ),
    enableEdit: createReducer(
      initialIContractsForm().enableEdit,
      on(clientFormActions.RESET_FORM_CLIENT, () => false),
      on(clientContractActions.SET_ENABLE_EDIT, (state: boolean, {enableEdit}) => enableEdit),
      on(
        clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE,
        () => initialIContractsForm().enableEdit,
      ),
    ),
    contractEditMode: createReducer(
      initialIContractsForm().contractEditMode,
      on(clientFormActions.RESET_FORM_CLIENT, () => false),
      on(
        clientContractActions.SET_CONTRACT_IS_EDIT_MODE,
        (state: boolean, {contractEditMode}) => contractEditMode,
      ),
      on(
        clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE,
        () => initialIContractsForm().contractEditMode,
      ),
    ),
    brandsStatus: createReducer(
      API_REQUEST_STATUS_DEFAULT,
      on(clientFormActions.RESET_FORM_CLIENT, () => API_REQUEST_STATUS_DEFAULT),
      on(
        clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE,
        () => initialIContractsForm().brandsStatus,
      ),
    ),
    brandQueryInfo: createReducer(
      initialIContractsForm().brandQueryInfo,
      on(clientFormActions.RESET_FORM_CLIENT, () => initialBrandQueryInfo()),
      on(
        clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE,
        () => initialIContractsForm().brandQueryInfo,
      ),
    ),
    listCompanys: createReducer(
      [],
      on(clientFormActions.RESET_FORM_CLIENT, () => []),
      on(
        clientContractActions.GET_COMPANYS_SUCCESS,
        (state: DropListOptionCustom[], {payload}) => payload,
      ),
      on(
        clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE,
        () => initialIContractsForm().listCompanys,
      ),
    ),
    tabFilters: createReducer(
      initialTabFilters(),
      on(clientFormActions.RESET_FORM_CLIENT, () => initialTabFilters()),
      on(
        clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE,
        () => initialIContractsForm().tabFilters,
      ),
    ),
    selectedTabFilter: createReducer(
      initialSelectedTabFilter(),
      on(clientFormActions.RESET_FORM_CLIENT, () => initialSelectedTabFilter()),
      on(clientContractActions.SET_SELECTED_TAB_FILTER, (state: ITabOption, {item}) => item),
      on(
        clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE,
        () => initialIContractsForm().selectedTabFilter,
      ),
    ),
    activeContractToEdit: createReducer(
      initialIContractsForm().activeContractToEdit,
      on(clientFormActions.RESET_FORM_CLIENT, () => false),
      on(clientContractActions.SET_ACTIVE_CONTRACT_TO_EDIT, (state: boolean, {value}) => value),
      on(clientContractActions.RESET_FORM_CONTRACT, () => false),
      on(
        clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE,
        () => initialIContractsForm().activeContractToEdit,
      ),
    ),
    validateContract: createReducer(
      initialIContractsForm().validateContract,
      on(clientFormActions.RESET_FORM_CLIENT, () => false),
      on(clientContractActions.SET_VALIDATE_CLIENTE_SUCCESS, (state: boolean, {value}) => value),
      on(
        clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE,
        () => initialIContractsForm().validateContract,
      ),
      on(clientContractActions.RESET_VALIDATE_CONTRACT, (state: boolean) => false),
    ),
    brandInvalidate: createReducer(
      [],
      on(clientFormActions.RESET_FORM_CLIENT, () => []),
      on(
        clientContractActions.SET_BRAND_INVALIDATE,
        (state: ResultObtenerContratosContemporaneosMismasMarcas[], {brands}) => brands,
      ),
      on(clientContractActions.RESET_VALIDATE_CONTRACT, () => []),
      on(
        clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE,
        () => initialIContractsForm().brandInvalidate,
      ),
    ),
    saveContractStatus: createReducer(
      API_REQUEST_STATUS_DEFAULT,
      on(clientFormActions.RESET_FORM_CLIENT, () => API_REQUEST_STATUS_DEFAULT),
      on(clientContractActions.RESET_FORM_CONTRACT, () => API_REQUEST_STATUS_DEFAULT),
      on(clientContractActions.SET_SAVE_CONTRACT_STATUS, (state: number, {value}) => value),
      on(clientContractActions.VALIDATE_CONTRATO_CLIENTE_LOAD, () => API_REQUEST_STATUS_LOADING),
      on(
        clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE,
        () => initialIContractsForm().saveContractStatus,
      ),
    ),
    contractDetails: createReducer(
      initialIContractsForm().contractDetails,
      on(clientContractActions.SET_DETAILS, (state, {value}) => value),
      on(
        clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE,
        () => initialIContractsForm().contractDetails,
      ),
    ),
    backUp: createReducer(
      {selectedContract: null, newContract: null},
      on(clientContractActions.GENERATE_BACKUP, (state, {selectedContract, newContract}) => ({
        ...state,
        selectedContract,
        newContract,
      })),
      on(clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE, () => initialIContractsForm().backUp),
    ),
    clientAddresses: createReducer(
      [],
      on(
        clientContractActions.GET_ADDRESSES_CLIENT_SUCCESS,
        (state, {clientAddresses}) => clientAddresses,
      ),
      on(
        clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE,
        () => initialIContractsForm().clientAddresses,
      ),
    ),
    generatedContractUploaded: createReducer(
      API_REQUEST_STATUS_DEFAULT,
      on(clientContractActions.SET_PDF_CONTRACT_LOADING, () => API_REQUEST_STATUS_LOADING),
      on(clientContractActions.SET_PDF_CONTRACT_SUCCESS, () => API_REQUEST_STATUS_SUCCEEDED),
      on(clientContractActions.SET_PDF_CONTRACT_FAILED, () => API_REQUEST_STATUS_FAILED),
      on(
        clientContractActions.CLEAN_CONTRACTS_CLIENT_STATE,
        () => initialIContractsForm().generatedContractUploaded,
      ),
    ),
    contractBarActivities: createReducer(initialContractBarActivities()),
    cancelPop: createReducer(
      initialIContractsForm().cancelPop,
      on(clientContractActions.IS_CANCEL_POP_OPEN, (state, {value}) => value),
    ),
    toggleSwitchOptions: createReducer(initialToggleSwitchOptionsClients()),
  },
  {
    ...initialIContractsForm(),
  },
);
