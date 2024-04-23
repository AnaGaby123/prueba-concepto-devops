/* Core Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

/* Actions Imports */
import {checkOcNotArrivedDetailsActions} from '@appActions/pendings/purchasing-manager/check-oc-not-arrived';

/* Models Imports */
import {
  ICheckOcNotArrivedDetails,
  IFamily,
  IItems,
  initialChildItem,
  initialICheckOcNotArrivedDetails,
  IPurchaseOrder,
} from '@appModels/store/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-details/check-oc-not-arrived-details.model';
import {
  initialOcPartidaCancelacion,
  initialOcPartidaEdicionBackOrder,
  initialOcPartidaEdicionConImpactoFEE,
  initialOcPartidaEdicionSinImpactoFEE,
  STATUS,
  TYPES_OF_CONFIG,
} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';

/* Common Imports */
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';

/* Utils Imports */
import {filter, isEmpty, map as _map, sumBy} from 'lodash-es';

const initialCheckOcNotArrivedDetails: ICheckOcNotArrivedDetails = {
  ...initialICheckOcNotArrivedDetails(),
};

export const checkOcNotArrivedDetailsReducer: ActionReducer<ICheckOcNotArrivedDetails> = createReducer(
  initialCheckOcNotArrivedDetails,
  on(checkOcNotArrivedDetailsActions.CLEAN_ALL_CHECK_OC, (state) => ({
    ...initialCheckOcNotArrivedDetails,
  })),
  on(checkOcNotArrivedDetailsActions.SET_PROVIDER, (state, {providerSelected}) => ({
    ...state,
    providerSelected,
  })),
  on(checkOcNotArrivedDetailsActions.FETCH_FAMILIES_LOAD, (state) => ({
    ...state,
    familiesStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(checkOcNotArrivedDetailsActions.FETCH_FAMILIES_SUCCESS, (state, {families}) => ({
    ...state,
    families,
    familySelected: families.length > 0 ? families[0] : ({} as IFamily),
    familiesStatus: API_REQUEST_STATUS_SUCCEEDED,
  })),
  on(checkOcNotArrivedDetailsActions.FETCH_FAMILIES_FAILED, (state) => ({
    ...state,
    familiesStatus: API_REQUEST_STATUS_FAILED,
  })),
  on(checkOcNotArrivedDetailsActions.SET_TAB_OPTION_SELECTED, (state, {tabSelected}) => ({
    ...state,
    familySelected: {
      ...state.familySelected,
      tabSelected,
      purchaseOrders: [],
      purchaseOrdersStatus: API_REQUEST_STATUS_LOADING,
      desiredPage: 1,
      needsToReloadPurchaseOrders: true,
    },
  })),
  on(
    checkOcNotArrivedDetailsActions.SET_DROPDOWN_OPTION_SELECTED,
    (state, {dropDownOptionSelected}) => ({
      ...state,
      familySelected: {
        ...state.familySelected,
        dropDownOptionSelected,
        purchaseOrders: [],
        purchaseOrdersStatus: API_REQUEST_STATUS_LOADING,
        desiredPage: 1,
        needsToReloadPurchaseOrders: true,
      },
    }),
  ),
  on(checkOcNotArrivedDetailsActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    familySelected: {
      ...state.familySelected,
      searchTerm,
      purchaseOrders: [],
      purchaseOrdersStatus: API_REQUEST_STATUS_LOADING,
      desiredPage: 1,
      needsToReloadPurchaseOrders: true,
    },
  })),
  on(checkOcNotArrivedDetailsActions.SET_FAMILY_SELECTED, (state, {idFamily}) => ({
    ...state,
    families: _map(state.families, (family: IFamily) => {
      // FIXME: Corregir por cambio en modelos
      return family;
      /*if (family.IdFamilia === state.familySelected.IdFamilia) {
          return {...state.familySelected, isSelected: false};
        }
        return {
          ...family,
          isSelected: family.IdFamilia === idFamily,
          desiredPage: family.desiredPage === 1 ? 1 : family.desiredPage,
        };*/
    }),
    // FIXME: Corregir por cambio en modelos
    /*familySelected: _.filter(
        state.families,
        (o: IFamily) => o.IdFamilia === idFamily,
      )[0],*/
  })),
  on(checkOcNotArrivedDetailsActions.FETCH_TOTALS_OF_FAMILY, (state, {totals}) => ({
    ...state,
    familySelected: {
      ...state.familySelected,
      totals,
      needsToReloadTotals: false,
    },
  })),
  on(checkOcNotArrivedDetailsActions.FETCH_PURCHASE_ORDERS_LOAD, (state, {isFirstPage}) => ({
    ...state,
    familySelected: {
      ...state.familySelected,
      desiredPage: isFirstPage ? 1 : state.familySelected.desiredPage + 1,
      purchaseOrdersStatus: API_REQUEST_STATUS_LOADING,
    },
  })),
  on(
    checkOcNotArrivedDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS,
    (state, {purchaseOrders, totalPurchaseOrders}) => ({
      ...state,
      familySelected: {
        ...state.familySelected,
        purchaseOrders:
          state.familySelected.desiredPage === 1
            ? [...purchaseOrders]
            : [...state.familySelected.purchaseOrders, ...purchaseOrders],
        selectedPurchaseOrder:
          purchaseOrders.length > 0 ? purchaseOrders[0] : ({} as IPurchaseOrder),
        totalPurchaseOrders,
        purchaseOrdersStatus: API_REQUEST_STATUS_SUCCEEDED,
        needsToReloadPurchaseOrders: false,
      },
    }),
  ),
  on(checkOcNotArrivedDetailsActions.FETCH_PURCHASE_ORDERS_FAILED, (state) => ({
    ...state,
    familySelected: {
      ...state.familySelected,
      purchaseOrdersStatus: API_REQUEST_STATUS_FAILED,
    },
  })),
  on(
    checkOcNotArrivedDetailsActions.SET_IS_LOADING_MORE_PURCHASE_ORDERS,
    (state, {isLoadingMorePurchases}) => ({
      ...state,
      familySelected: {
        ...state.familySelected,
        isLoadingMorePurchases,
      },
    }),
  ),
  on(checkOcNotArrivedDetailsActions.FETCH_ITEMS_SUCCESS, (state, {items, totalItems}) => ({
    ...state,
    familySelected: {
      ...state.familySelected,
      selectedPurchaseOrder: {
        ...state.familySelected.selectedPurchaseOrder,
        items:
          state.familySelected.selectedPurchaseOrder.desiredPage === 1
            ? [...items]
            : [...state.familySelected.selectedPurchaseOrder.items, ...items],
        totalItems,
        itemsStatus: API_REQUEST_STATUS_SUCCEEDED,
        needsToReloadItems: false,
      },
    },
  })),
  on(checkOcNotArrivedDetailsActions.SET_IS_LOADING_MORE_ITEMS, (state, {isLoadingMoreItems}) => ({
    ...state,
    familySelected: {
      ...state.familySelected,
      selectedPurchaseOrder: {
        ...state.familySelected.selectedPurchaseOrder,
        isLoadingMoreItems,
      },
    },
  })),
  on(checkOcNotArrivedDetailsActions.FETCH_ITEMS_LOAD, (state, {isFirstPage}) => ({
    ...state,
    familySelected: {
      ...state.familySelected,
      selectedPurchaseOrder: {
        ...state.familySelected.selectedPurchaseOrder,
        desiredPage: isFirstPage ? 1 : state.familySelected.selectedPurchaseOrder.desiredPage + 1,
        itemsStatus: API_REQUEST_STATUS_LOADING,
      },
    },
  })),
  on(checkOcNotArrivedDetailsActions.SET_PURCHASE_ORDER_SELECTED, (state, {IdOcOrdenDeCompra}) => ({
    ...state,
    familySelected: {
      ...state.familySelected,
      purchaseOrders: _map(state.familySelected.purchaseOrders, (oc: IPurchaseOrder) => {
        if (oc.IdOcOrdenDeCompra === state.familySelected.selectedPurchaseOrder.IdOcOrdenDeCompra) {
          return {
            ...state.familySelected.selectedPurchaseOrder,
            isSelected: false,
          };
        }
        return {
          ...oc,
          isSelected: oc.IdOcOrdenDeCompra === IdOcOrdenDeCompra,
          desiredPage: oc.desiredPage === 1 ? 1 : oc.desiredPage,
        };
      }),
      selectedPurchaseOrder: filter(
        state.familySelected.purchaseOrders,
        (oc: IPurchaseOrder) => oc.IdOcOrdenDeCompra === IdOcOrdenDeCompra,
      )[0],
    },
  })),
  on(
    checkOcNotArrivedDetailsActions.SET_ITEM_CHECK_ACTIVE,
    (state, {i, item, typeOfCheck, newStatus}) => ({
      ...state,
      familySelected: {
        ...state.familySelected,
        selectedPurchaseOrder: {
          ...state.familySelected.selectedPurchaseOrder,
          items: _map(
            state.familySelected.selectedPurchaseOrder.items,
            (o: Array<IItems>, index: number) => {
              if (index === i) {
                return _map(o, (k: IItems) => {
                  if (k.Number === item.Number) {
                    return {
                      ...k,
                      configIsOpen: true,
                      cancelStatus:
                        typeOfCheck === TYPES_OF_CONFIG.cancel
                          ? newStatus
                          : newStatus === STATUS.active && k.cancelStatus === STATUS.active
                          ? STATUS.default
                          : k.cancelStatus,
                      backOrderStatus:
                        typeOfCheck === TYPES_OF_CONFIG.backOrder
                          ? newStatus
                          : newStatus === STATUS.active && k.backOrderStatus === STATUS.active
                          ? STATUS.default
                          : k.backOrderStatus,
                      impactStatus:
                        typeOfCheck === TYPES_OF_CONFIG.impact
                          ? newStatus
                          : newStatus === STATUS.active && k.impactStatus === STATUS.active
                          ? STATUS.default
                          : k.impactStatus,
                      ocPartidaCancelacion:
                        typeOfCheck === TYPES_OF_CONFIG.cancel
                          ? {
                              ...k.ocPartidaCancelacion,
                              NumeroDePiezas: k.tempNumeroDePiezas,
                            }
                          : {...k.ocPartidaCancelacion},
                      ocPartidaEdicionBackOrder:
                        typeOfCheck === TYPES_OF_CONFIG.backOrder
                          ? {
                              ...k.ocPartidaEdicionBackOrder,
                              NumeroDePiezas: k.tempNumeroDePiezas,
                            }
                          : {...k.ocPartidaEdicionBackOrder},
                      ocPartidaEdicionConImpactoFEE:
                        typeOfCheck === TYPES_OF_CONFIG.impact
                          ? {
                              ...k.ocPartidaEdicionConImpactoFEE,
                              NumeroDePiezas: k.tempNumeroDePiezas,
                            }
                          : {...k.ocPartidaEdicionConImpactoFEE},
                    };
                  }
                  return {
                    ...k,
                    configIsOpen: false,
                    cancelStatus:
                      k.cancelStatus === STATUS.active ? STATUS.default : k.cancelStatus,
                    backOrderStatus:
                      k.backOrderStatus === STATUS.active ? STATUS.default : k.backOrderStatus,
                    impactStatus:
                      k.impactStatus === STATUS.active ? STATUS.default : k.impactStatus,
                  };
                });
              }
              return _map(o, (k: IItems) => ({
                ...k,
                configIsOpen: false,
                cancelStatus: k.cancelConfig
                  ? STATUS.confirmed
                  : k.cancelStatus !== STATUS.default && k.cancelStatus !== STATUS.active
                  ? k.cancelStatus
                  : STATUS.default,
                backOrderStatus: k.backOrderConfig
                  ? STATUS.confirmed
                  : k.backOrderStatus !== STATUS.default && k.backOrderStatus !== STATUS.active
                  ? k.backOrderStatus
                  : STATUS.default,
                impactStatus: k.impactConfig
                  ? STATUS.confirmed
                  : k.impactStatus !== STATUS.default && k.impactStatus !== STATUS.active
                  ? k.impactStatus
                  : STATUS.default,
                ocPartidaCancelacion: k.cancelConfig
                  ? {...k.ocPartidaCancelacion}
                  : {...initialOcPartidaCancelacion()},
                ocPartidaEdicionBackOrder: k.backOrderConfig
                  ? {...k.ocPartidaEdicionBackOrder}
                  : {...initialOcPartidaEdicionBackOrder()},
                ocPartidaEdicionConImpactoFEE: k.impactConfig
                  ? {...k.ocPartidaEdicionConImpactoFEE}
                  : {...initialOcPartidaEdicionConImpactoFEE()},
              }));
            },
          ),
        },
      },
    }),
  ),
  on(checkOcNotArrivedDetailsActions.RESTORE_SOME_ITEMS, (state, {i, k}) => ({
    ...state,
    familySelected: {
      ...state.familySelected,
      selectedPurchaseOrder: {
        ...state.familySelected.selectedPurchaseOrder,
        items: _map(
          state.familySelected.selectedPurchaseOrder.items,
          (o: Array<IItems>, index: number) => {
            if (index === i) {
              // Ya entré al arreglo de arreglos
              const tempNumeroDePiezas = sumBy(
                filter(o, (j: IItems, ind: number) => ind >= k),
                (l: IItems) => Number(l.tempNumeroDePiezas),
              );
              const newArray = filter(o, (j: IItems, ind: number) => ind <= k);
              return _map(newArray, (m: IItems, ind: number) => {
                if (ind === newArray.length - 1) {
                  return {
                    ...m,
                    // Confirmada: false,
                    tempNumeroDePiezas,
                    tempPrecioLista: m.PrecioLista,
                    tempTotalPartida: m.TotalPartida,
                    tempFechaEstimadaDeArribo: m.FechaEstimadaDeArribo,
                    cancelConfig: false,
                    backOrderConfig: false,
                    impactConfig: false,
                    cancelStatus:
                      m.cancelStatus === STATUS.confirmed ||
                      m.cancelStatus === STATUS['disabled-default']
                        ? STATUS.default
                        : m.cancelStatus,
                    backOrderStatus:
                      m.backOrderStatus === STATUS.confirmed ||
                      m.backOrderStatus === STATUS['disabled-default']
                        ? STATUS.default
                        : m.backOrderStatus,
                    impactStatus:
                      m.impactStatus === STATUS.confirmed ||
                      m.impactStatus === STATUS['disabled-default']
                        ? STATUS.default
                        : m.impactStatus,
                    ocPartidaCancelacion: {
                      ...initialOcPartidaCancelacion(),
                      IdOcPartida: m.IdOcPartida,
                      NumeroDePiezas: tempNumeroDePiezas,
                    },
                    ocPartidaEdicionBackOrder: {
                      ...initialOcPartidaEdicionBackOrder(),
                      IdOcPartida: m.IdOcPartida,
                      NumeroDePiezas: tempNumeroDePiezas,
                    },
                    ocPartidaEdicionConImpactoFEE: {
                      ...initialOcPartidaEdicionConImpactoFEE(),
                      IdOcPartida: m.IdOcPartida,
                      NumeroDePiezas: tempNumeroDePiezas,
                    },
                  };
                }
                return {...m};
              });
            }
            return [...o];
          },
        ),
      },
    },
  })),
  on(checkOcNotArrivedDetailsActions.SET_ITEM_CHECK_CANCEL, (state, {i, item, typeOfCheck}) => ({
    ...state,
    familySelected: {
      ...state.familySelected,
      selectedPurchaseOrder: {
        ...state.familySelected.selectedPurchaseOrder,
        items: _map(
          state.familySelected.selectedPurchaseOrder.items,
          (o: Array<IItems>, index: number) => {
            if (index === i) {
              return _map(o, (k: IItems) => {
                if (k.Number === item.Number) {
                  // Ya entré al arreglo de una partida
                  return {
                    ...k,
                    configIsOpen: false,
                    cancelStatus:
                      typeOfCheck === TYPES_OF_CONFIG.cancel
                        ? k.cancelConfig
                          ? STATUS.confirmed
                          : STATUS.default
                        : k.cancelStatus,
                    backOrderStatus:
                      typeOfCheck === TYPES_OF_CONFIG.backOrder
                        ? k.backOrderConfig
                          ? STATUS.confirmed
                          : STATUS.default
                        : k.backOrderStatus,
                    impactStatus:
                      typeOfCheck === TYPES_OF_CONFIG.impact
                        ? k.impactConfig
                          ? STATUS.confirmed
                          : STATUS.default
                        : k.impactStatus,
                    ocPartidaCancelacion:
                      typeOfCheck === TYPES_OF_CONFIG.cancel && k.cancelConfig
                        ? {...k.ocPartidaCancelacion}
                        : {...initialOcPartidaCancelacion()},
                    ocPartidaEdicionBackOrder:
                      typeOfCheck === TYPES_OF_CONFIG.backOrder && k.backOrderConfig
                        ? {...k.ocPartidaEdicionBackOrder}
                        : {...initialOcPartidaEdicionBackOrder()},
                    ocPartidaEdicionConImpactoFEE:
                      typeOfCheck === TYPES_OF_CONFIG.impact && k.impactConfig
                        ? {...k.ocPartidaEdicionConImpactoFEE}
                        : {...initialOcPartidaEdicionConImpactoFEE()},
                  };
                }
                return {...k};
              });
            }
            return [...o];
          },
        ),
      },
    },
  })),
  on(
    checkOcNotArrivedDetailsActions.DELETE_ITEM_LOCAL_CONFIGURATION_CANCEL,
    (state, {i, item}) => ({
      ...state,
      familySelected: {
        ...state.familySelected,
        selectedPurchaseOrder: {
          ...state.familySelected.selectedPurchaseOrder,
          items: _map(
            state.familySelected.selectedPurchaseOrder.items,
            (o: Array<IItems>, index: number) => {
              if (index === i) {
                // Ya entré al arreglo de arreglos
                return _map(o, (k: IItems) => {
                  if (k.Number === item.Number) {
                    // Ya entré al arreglo de una partida
                    return {
                      ...k,
                      // Confirmada: false,
                      configIsOpen: false,
                      cancelConfig: false,
                      cancelStatus: STATUS.default,
                      backOrderStatus:
                        k.backOrderStatus === STATUS['disabled-default']
                          ? STATUS.default
                          : k.backOrderStatus,
                      impactStatus:
                        k.impactStatus === STATUS['disabled-default']
                          ? STATUS.default
                          : k.impactStatus,
                      ocPartida: {
                        ...k.ocPartida,
                        // Confirmada: false,
                      },
                      ocPartidaCancelacion: {
                        IdOcPartida: k.IdOcPartida,
                        ...initialOcPartidaCancelacion(),
                      },
                    };
                  }
                  return {...k};
                });
              }
              return [...o];
            },
          ),
        },
      },
    }),
  ),
  on(
    checkOcNotArrivedDetailsActions.DELETE_ITEM_LOCAL_CONFIGURATION_BACK_ORDER,
    (state, {i, item}) => {
      return {
        ...state,
        familySelected: {
          ...state.familySelected,
          selectedPurchaseOrder: {
            ...state.familySelected.selectedPurchaseOrder,
            items: _map(
              state.familySelected.selectedPurchaseOrder.items,
              (o: Array<IItems>, index: number) => {
                if (index === i) {
                  // Ya entré al arreglo de arreglos
                  return _map(o, (k: IItems) => {
                    if (k.Number === item.Number) {
                      // Ya entré al arreglo de una partida
                      return {
                        ...k,
                        tempFechaEstimadaDeArribo: k.FechaEstimadaDeArribo,
                        // Confirmada: false,
                        configIsOpen: false,
                        backOrderConfig: false,
                        backOrderStatus: STATUS.default,
                        cancelStatus:
                          k.cancelStatus === STATUS['disabled-default']
                            ? STATUS.default
                            : k.cancelStatus,
                        impactStatus:
                          k.impactStatus === STATUS['disabled-default']
                            ? STATUS.default
                            : k.impactStatus,
                        ocPartida: {
                          ...k.ocPartida,
                          // Confirmada: false,
                        },
                        ocPartidaEdicionBackOrder: {
                          IdOcPartida: k.IdOcPartida,
                          ...initialOcPartidaEdicionBackOrder(),
                        },
                      };
                    }
                    return {...k};
                  });
                }
                return [...o];
              },
            ),
          },
        },
      };
    },
  ),
  on(
    checkOcNotArrivedDetailsActions.DELETE_ITEM_LOCAL_CONFIGURATION_IMPACT,
    (state, {i, item}) => ({
      ...state,
      familySelected: {
        ...state.familySelected,
        selectedPurchaseOrder: {
          ...state.familySelected.selectedPurchaseOrder,
          items: _map(
            state.familySelected.selectedPurchaseOrder.items,
            (o: Array<IItems>, index: number) => {
              if (index === i) {
                // Ya entré al arreglo de arreglos
                return _map(o, (k: IItems) => {
                  if (k.Number === item.Number) {
                    // Ya entré al arreglo de una partida
                    return {
                      ...k,
                      tempFechaEstimadaDeArribo: k.FechaEstimadaDeArribo,
                      // Confirmada: false,
                      configIsOpen: false,
                      impactConfig: false,
                      impactStatus: STATUS.default,
                      cancelStatus:
                        k.cancelStatus === STATUS['disabled-default']
                          ? STATUS.default
                          : k.cancelStatus,
                      backOrderStatus:
                        k.backOrderStatus === STATUS['disabled-default']
                          ? STATUS.default
                          : k.backOrderStatus,
                      ocPartida: {
                        ...k.ocPartida,
                        // Confirmada: false,
                      },
                      ocPartidaEdicionConImpactoFEE: {
                        IdOcPartida: k.IdOcPartida,
                        ...initialOcPartidaEdicionConImpactoFEE(),
                      },
                    };
                  }
                  return {...k};
                });
              }
              return [...o];
            },
          ),
        },
      },
    }),
  ),
  on(checkOcNotArrivedDetailsActions.SAVE_ITEM_LOCAL_CONFIGURATION_CANCEL, (state, {i, item}) => ({
    ...state,
    familySelected: {
      ...state.familySelected,
      selectedPurchaseOrder: {
        ...state.familySelected.selectedPurchaseOrder,
        items: _map(
          state.familySelected.selectedPurchaseOrder.items,
          (o: Array<IItems>, index: number) => {
            if (index === i) {
              // Ya entré al arreglo de arreglos
              if (
                Number(item.tempNumeroDePiezas) === Number(item.ocPartidaCancelacion.NumeroDePiezas)
              ) {
                // No se generará una nueva partida
                return _map(o, (k: IItems) => {
                  if (k.Number === item.Number) {
                    // Ya entré al arreglo de una partida
                    return {
                      ...k,
                      // Confirmada: true,
                      configIsOpen: false,
                      cancelConfig: true,
                      cancelStatus: STATUS.confirmed,
                      backOrderStatus:
                        k.backOrderStatus === STATUS.default
                          ? STATUS['disabled-default']
                          : k.backOrderStatus,
                      impactStatus:
                        k.impactStatus === STATUS.default
                          ? STATUS['disabled-default']
                          : k.impactStatus,
                      withoutImpactStatus:
                        k.withoutImpactStatus === STATUS.default
                          ? STATUS['disabled-default']
                          : k.withoutImpactStatus,
                      ocPartida: {
                        ...k.ocPartida,
                        // Confirmada: true,
                      },
                    };
                  }
                  return {...k, configIsOpen: false};
                });
              }
              // Se generará una nueva partida
              return [
                ..._map(o, (k: IItems) => {
                  if (k.Number === item.Number) {
                    // Ya entré al arreglo de una partida
                    return {
                      ...k,
                      // Confirmada: true,
                      tempNumeroDePiezas: k.ocPartidaCancelacion.NumeroDePiezas,
                      configIsOpen: false,
                      cancelConfig: true,
                      cancelStatus: STATUS.confirmed,
                      backOrderStatus:
                        k.backOrderStatus === STATUS.default
                          ? STATUS['disabled-default']
                          : k.backOrderStatus,
                      impactStatus:
                        k.impactStatus === STATUS.default
                          ? STATUS['disabled-default']
                          : k.impactStatus,
                      withoutImpactStatus:
                        k.withoutImpactStatus === STATUS.default
                          ? STATUS['disabled-default']
                          : k.withoutImpactStatus,
                      ocPartida: {
                        ...k.ocPartida,
                        NumeroDePiezas: k.ocPartidaCancelacion.NumeroDePiezas,
                        // Confirmada: true,
                      },
                    };
                  }
                  return {...k, configIsOpen: false};
                }),
                {
                  ...item,
                  Number: Number(
                    `${i + 1}.${state.familySelected.selectedPurchaseOrder.items[i].length}`,
                  ),
                  NumberToSave: Number(`${item.ocPartida.Indice}.${item.ocPartida.SubIndice + 1}`),
                  // Confirmada: false,
                  IdOcPartida: DEFAULT_UUID,
                  tempId: DEFAULT_UUID,
                  tempNumeroDePiezas:
                    item.tempNumeroDePiezas - item.ocPartidaCancelacion.NumeroDePiezas,
                  cancelStatus: STATUS.opacity,
                  backOrderStatus:
                    item.backOrderStatus === STATUS.opacity ||
                    item.backOrderStatus === STATUS.disabled
                      ? STATUS.disabled
                      : STATUS.default,
                  impactStatus:
                    item.impactStatus === STATUS.opacity || item.impactStatus === STATUS.disabled
                      ? STATUS.disabled
                      : STATUS.default,
                  withoutImpactStatus:
                    item.withoutImpactStatus === STATUS.opacity ||
                    item.withoutImpactStatus === STATUS.disabled
                      ? STATUS.disabled
                      : STATUS.default,
                  ...initialChildItem(),
                  ocPartida: {
                    ...item.ocPartida,
                    IdOcPartida: DEFAULT_UUID,
                    // Confirmada: false,
                    NumeroDePiezas:
                      item.tempNumeroDePiezas - item.ocPartidaCancelacion.NumeroDePiezas,
                    Indice: item.ocPartida.Indice,
                    SubIndice: item.ocPartida.SubIndice + 1,
                  },
                  ocPartidaCancelacion: {
                    ...initialOcPartidaCancelacion(),
                    IdOcPartida: DEFAULT_UUID,
                  },
                  ocPartidaEdicionBackOrder: {
                    ...initialOcPartidaEdicionBackOrder(),
                    IdOcPartida: DEFAULT_UUID,
                  },
                  ocPartidaEdicionConImpactoFEE: {
                    ...initialOcPartidaEdicionConImpactoFEE(),
                    IdOcPartida: DEFAULT_UUID,
                  },
                  ocPartidaEdicionSinImpactoFEE: {
                    ...initialOcPartidaEdicionSinImpactoFEE(),
                    IdOcPartida: DEFAULT_UUID,
                  },
                },
              ];
            }
            return [...o];
          },
        ),
      },
    },
  })),
  on(
    checkOcNotArrivedDetailsActions.SAVE_ITEM_LOCAL_CONFIGURATION_BACK_ORDER,
    (state, {i, item}) => ({
      ...state,
      familySelected: {
        ...state.familySelected,
        selectedPurchaseOrder: {
          ...state.familySelected.selectedPurchaseOrder,
          items: _map(
            state.familySelected.selectedPurchaseOrder.items,
            (o: Array<IItems>, index: number) => {
              if (index === i) {
                // Ya entré al arreglo de arreglos
                if (
                  Number(item.tempNumeroDePiezas) ===
                  Number(item.ocPartidaEdicionBackOrder.NumeroDePiezas)
                ) {
                  // No se generará una nueva partida
                  return _map(o, (k: IItems) => {
                    if (k.Number === item.Number) {
                      // Ya entré al arreglo de una partida
                      return {
                        ...k,
                        // Confirmada: true,
                        configIsOpen: false,
                        backOrderConfig: true,
                        backOrderStatus: STATUS.confirmed,
                        cancelStatus:
                          k.cancelStatus === STATUS.default
                            ? STATUS['disabled-default']
                            : k.cancelStatus,
                        impactStatus:
                          k.impactStatus === STATUS.default
                            ? STATUS['disabled-default']
                            : k.impactStatus,
                        withoutImpactStatus:
                          k.withoutImpactStatus === STATUS.default
                            ? STATUS['disabled-default']
                            : k.withoutImpactStatus,
                        tempFechaEstimadaDeArribo: k.ocPartidaEdicionBackOrder.FechaEstimadaArribo,
                        ocPartida: {
                          ...k.ocPartida,
                          // Confirmada: true,
                        },
                      };
                    }
                    return {...k, configIsOpen: false};
                  });
                }
                // Se generará una nueva partida
                return [
                  ..._map(o, (k: IItems) => {
                    if (k.Number === item.Number) {
                      // Ya entré al arreglo de una partida
                      return {
                        ...k,
                        // Confirmada: true,
                        tempNumeroDePiezas: k.ocPartidaEdicionBackOrder.NumeroDePiezas,
                        configIsOpen: false,
                        backOrderConfig: true,
                        backOrderStatus: STATUS.confirmed,
                        cancelStatus:
                          k.cancelStatus === STATUS.default
                            ? STATUS['disabled-default']
                            : k.cancelStatus,
                        impactStatus:
                          k.impactStatus === STATUS.default
                            ? STATUS['disabled-default']
                            : k.impactStatus,
                        withoutImpactStatus:
                          k.withoutImpactStatus === STATUS.default
                            ? STATUS['disabled-default']
                            : k.withoutImpactStatus,
                        tempFechaEstimadaDeArribo: k.ocPartidaEdicionBackOrder.FechaEstimadaArribo,
                        ocPartida: {
                          ...k.ocPartida,
                          NumeroDePiezas: k.ocPartidaEdicionBackOrder.NumeroDePiezas,
                          // Confirmada: true,
                        },
                      };
                    }
                    return {...k, configIsOpen: false};
                  }),
                  {
                    ...item,
                    Number: Number(
                      `${i + 1}.${state.familySelected.selectedPurchaseOrder.items[i].length}`,
                    ),
                    NumberToSave: Number(
                      `${item.ocPartida.Indice}.${item.ocPartida.SubIndice + 1}`,
                    ),
                    // Confirmada: false,
                    IdOcPartida: DEFAULT_UUID,
                    tempId: DEFAULT_UUID,
                    tempNumeroDePiezas:
                      item.tempNumeroDePiezas - item.ocPartidaEdicionBackOrder.NumeroDePiezas,
                    backOrderStatus: STATUS.opacity,
                    cancelStatus:
                      item.cancelStatus === STATUS.opacity || item.cancelStatus === STATUS.disabled
                        ? STATUS.disabled
                        : STATUS.default,
                    impactStatus:
                      item.impactStatus === STATUS.opacity || item.impactStatus === STATUS.disabled
                        ? STATUS.disabled
                        : STATUS.default,
                    withoutImpactStatus:
                      item.withoutImpactStatus === STATUS.opacity ||
                      item.withoutImpactStatus === STATUS.disabled
                        ? STATUS.disabled
                        : STATUS.default,
                    ...initialChildItem(),
                    ocPartida: {
                      ...item.ocPartida,
                      IdOcPartida: DEFAULT_UUID,
                      // Confirmada: false,
                      NumeroDePiezas:
                        item.tempNumeroDePiezas - item.ocPartidaEdicionBackOrder.NumeroDePiezas,
                      Indice: item.ocPartida.Indice,
                      SubIndice: item.ocPartida.SubIndice + 1,
                    },
                    ocPartidaCancelacion: {
                      ...initialOcPartidaCancelacion(),
                      IdOcPartida: DEFAULT_UUID,
                    },
                    ocPartidaEdicionBackOrder: {
                      ...initialOcPartidaEdicionBackOrder(),
                      IdOcPartida: DEFAULT_UUID,
                    },
                    ocPartidaEdicionConImpactoFEE: {
                      ...initialOcPartidaEdicionConImpactoFEE(),
                      IdOcPartida: DEFAULT_UUID,
                    },
                    ocPartidaEdicionSinImpactoFEE: {
                      ...initialOcPartidaEdicionSinImpactoFEE(),
                      IdOcPartida: DEFAULT_UUID,
                    },
                  },
                ];
              }
              return [...o];
            },
          ),
        },
      },
    }),
  ),
  on(checkOcNotArrivedDetailsActions.SAVE_ITEM_LOCAL_CONFIGURATION_IMPACT, (state, {i, item}) => ({
    ...state,
    familySelected: {
      ...state.familySelected,
      selectedPurchaseOrder: {
        ...state.familySelected.selectedPurchaseOrder,
        items: _map(
          state.familySelected.selectedPurchaseOrder.items,
          (o: Array<IItems>, index: number): IItems[] => {
            if (index === i) {
              // Ya entré al arreglo de arreglos
              if (
                Number(item.tempNumeroDePiezas) ===
                Number(item.ocPartidaEdicionConImpactoFEE.NumeroDePiezas)
              ) {
                // No se generará una nueva partida
                return _map(
                  o,
                  (k: IItems): IItems => {
                    if (k.Number === item.Number) {
                      // Ya entré al arreglo de una partida
                      return {
                        ...k,
                        // Confirmada: true,
                        configIsOpen: false,
                        impactConfig: true,
                        impactStatus: STATUS.confirmed,
                        cancelStatus:
                          k.cancelStatus === STATUS.default
                            ? STATUS['disabled-default']
                            : k.cancelStatus,
                        backOrderStatus:
                          k.backOrderStatus === STATUS.default
                            ? STATUS['disabled-default']
                            : k.backOrderStatus,
                        withoutImpactStatus:
                          k.withoutImpactStatus === STATUS.default
                            ? STATUS['disabled-default']
                            : k.withoutImpactStatus,
                        tempFechaEstimadaDeArribo:
                          k.ocPartidaEdicionConImpactoFEE.FechaEstimadaArribo,
                        ocPartida: {
                          ...k.ocPartida,
                          // Confirmada: true,
                        },
                      };
                    }
                    return {...k, configIsOpen: false};
                  },
                );
              }
              // Se generará una nueva partida
              return [
                ..._map(o, (k: IItems) => {
                  if (k.Number === item.Number) {
                    // Ya entré al arreglo de una partida
                    return {
                      ...k,
                      // Confirmada: true,
                      tempNumeroDePiezas: k.ocPartidaEdicionConImpactoFEE.NumeroDePiezas,
                      configIsOpen: false,
                      impactConfig: true,
                      impactStatus: STATUS.confirmed,
                      cancelStatus:
                        k.cancelStatus === STATUS.default
                          ? STATUS['disabled-default']
                          : k.cancelStatus,
                      backOrderStatus:
                        k.backOrderStatus === STATUS.default
                          ? STATUS['disabled-default']
                          : k.backOrderStatus,
                      withoutImpactStatus:
                        k.withoutImpactStatus === STATUS.default
                          ? STATUS['disabled-default']
                          : k.withoutImpactStatus,
                      tempFechaEstimadaDeArribo:
                        k.ocPartidaEdicionConImpactoFEE.FechaEstimadaArribo,
                      ocPartida: {
                        ...k.ocPartida,
                        NumeroDePiezas: k.ocPartidaEdicionConImpactoFEE.NumeroDePiezas,
                        // Confirmada: true,
                      },
                    };
                  }
                  return {...k, configIsOpen: false};
                }),
                {
                  ...item,
                  Number: Number(
                    `${i + 1}.${state.familySelected.selectedPurchaseOrder.items[i].length}`,
                  ),
                  NumberToSave: Number(`${item.ocPartida.Indice}.${item.ocPartida.SubIndice + 1}`),
                  // Confirmada: false,
                  IdOcPartida: DEFAULT_UUID,
                  tempId: DEFAULT_UUID,
                  tempNumeroDePiezas:
                    item.tempNumeroDePiezas - item.ocPartidaEdicionConImpactoFEE.NumeroDePiezas,
                  impactStatus: STATUS.opacity,
                  cancelStatus:
                    item.cancelStatus === STATUS.opacity || item.cancelStatus === STATUS.disabled
                      ? STATUS.disabled
                      : STATUS.default,
                  backOrderStatus:
                    item.backOrderStatus === STATUS.opacity ||
                    item.backOrderStatus === STATUS.disabled
                      ? STATUS.disabled
                      : STATUS.default,
                  withoutImpactStatus:
                    item.withoutImpactStatus === STATUS.opacity ||
                    item.withoutImpactStatus === STATUS.disabled
                      ? STATUS.disabled
                      : STATUS.default,
                  ...initialChildItem(),
                  ocPartida: {
                    ...item.ocPartida,
                    IdOcPartida: DEFAULT_UUID,
                    // Confirmada: false,
                    NumeroDePiezas:
                      item.tempNumeroDePiezas - item.ocPartidaEdicionConImpactoFEE.NumeroDePiezas,
                    Indice: item.ocPartida.Indice,
                    SubIndice: item.ocPartida.SubIndice + 1,
                  },
                  ocPartidaCancelacion: {
                    ...initialOcPartidaCancelacion(),
                    IdOcPartida: DEFAULT_UUID,
                  },
                  ocPartidaEdicionBackOrder: {
                    ...initialOcPartidaEdicionBackOrder(),
                    IdOcPartida: DEFAULT_UUID,
                  },
                  ocPartidaEdicionConImpactoFEE: {
                    ...initialOcPartidaEdicionConImpactoFEE(),
                    IdOcPartida: DEFAULT_UUID,
                  },
                  ocPartidaEdicionSinImpactoFEE: {
                    ...initialOcPartidaEdicionSinImpactoFEE(),
                    IdOcPartida: DEFAULT_UUID,
                  },
                },
              ];
            }
            return [...o];
          },
        ),
      },
    },
  })),
  on(
    checkOcNotArrivedDetailsActions.SET_ITEM_FIELD_VALUE_RADIO_BUTTON_CANCEL,
    (state, {i, itemNumber, field, value}) => ({
      ...state,
      familySelected: {
        ...state.familySelected,
        selectedPurchaseOrder: {
          ...state.familySelected.selectedPurchaseOrder,
          items: _map(
            state.familySelected.selectedPurchaseOrder.items,
            (o: Array<IItems>, index: number) => {
              if (index === i) {
                // Ya entré al arreglo de arreglos
                return _map(o, (k: IItems) => {
                  if (k.NumberToSave === itemNumber) {
                    // Ya entré al arreglo de una partida
                    return {
                      ...k,
                      ocPartidaCancelacion: {
                        ...k.ocPartidaCancelacion,
                        Descontinuado: field === 'Descontinuado' ? value : false,
                        RestriccionesVenta: field === 'RestriccionesVenta' ? value : false,
                        RestriccionesImportacion:
                          field === 'RestriccionesImportacion' ? value : false,
                      },
                    };
                  }
                  return {...k};
                });
              }
              return [...o];
            },
          ),
        },
      },
    }),
  ),
  on(
    checkOcNotArrivedDetailsActions.SET_ITEM_FIELD_VALUE_STRING_CANCEL,
    (state, {i, itemNumber, field, value}) => ({
      ...state,
      familySelected: {
        ...state.familySelected,
        selectedPurchaseOrder: {
          ...state.familySelected.selectedPurchaseOrder,
          items: _map(
            state.familySelected.selectedPurchaseOrder.items,
            (o: Array<IItems>, index: number) => {
              if (index === i) {
                // Ya entré al arreglo de arreglos
                return _map(o, (k: IItems) => {
                  if (k.NumberToSave === itemNumber) {
                    // Ya entré al arreglo de una partida
                    return {
                      ...k,
                      ocPartidaCancelacion: {
                        ...k.ocPartidaCancelacion,
                        [field]: value,
                      },
                    };
                  }
                  return {...k};
                });
              }
              return [...o];
            },
          ),
        },
      },
    }),
  ),
  on(
    checkOcNotArrivedDetailsActions.SET_ITEM_FIELD_VALUE_BACK_ORDER,
    (state, {i, itemNumber, field, value}) => ({
      ...state,
      familySelected: {
        ...state.familySelected,
        selectedPurchaseOrder: {
          ...state.familySelected.selectedPurchaseOrder,
          items: _map(
            state.familySelected.selectedPurchaseOrder.items,
            (o: Array<IItems>, index: number) => {
              if (index === i) {
                // Ya entré al arreglo de arreglos
                return _map(o, (k: IItems) => {
                  if (k.NumberToSave === itemNumber) {
                    // Ya entré al arreglo de una partida
                    return {
                      ...k,
                      ocPartidaEdicionBackOrder: {
                        ...k.ocPartidaEdicionBackOrder,
                        [field]: value,
                      },
                    };
                  }
                  return {...k};
                });
              }
              return [...o];
            },
          ),
        },
      },
    }),
  ),
  on(
    checkOcNotArrivedDetailsActions.SET_ITEM_FIELD_VALUE_RADIO_BUTTON_IMPACT,
    (state, {i, itemNumber, field, value}) => ({
      ...state,
      familySelected: {
        ...state.familySelected,
        selectedPurchaseOrder: {
          ...state.familySelected.selectedPurchaseOrder,
          items: _map(
            state.familySelected.selectedPurchaseOrder.items,
            (o: Array<IItems>, index: number) => {
              if (index === i) {
                // Ya entré al arreglo de arreglos
                return _map(o, (k: IItems) => {
                  if (k.NumberToSave === itemNumber) {
                    // Ya entré al arreglo de una partida
                    return {
                      ...k,
                      ocPartidaEdicionConImpactoFEE: {
                        ...k.ocPartidaEdicionConImpactoFEE,
                        MotivosDesconocidos: field === 'MotivosDesconocidos' ? value : false,
                        Produccion: field === 'Produccion' ? value : false,
                        Disponibilidad: field === 'Disponibilidad' ? value : false,
                      },
                    };
                  }
                  return {...k};
                });
              }
              return [...o];
            },
          ),
        },
      },
    }),
  ),
  on(
    checkOcNotArrivedDetailsActions.SET_ITEM_FIELD_VALUE_IMPACT,
    (state, {i, itemNumber, field, value}) => ({
      ...state,
      familySelected: {
        ...state.familySelected,
        selectedPurchaseOrder: {
          ...state.familySelected.selectedPurchaseOrder,
          items: _map(
            state.familySelected.selectedPurchaseOrder.items,
            (o: Array<IItems>, index: number) => {
              if (index === i) {
                // Ya entré al arreglo de arreglos
                return _map(o, (k: IItems) => {
                  if (k.NumberToSave === itemNumber) {
                    // Ya entré al arreglo de una partida
                    return {
                      ...k,
                      ocPartidaEdicionConImpactoFEE: {
                        ...k.ocPartidaEdicionConImpactoFEE,
                        [field]: value,
                      },
                    };
                  }
                  return {...k};
                });
              }
              return [...o];
            },
          ),
        },
      },
    }),
  ),
  on(checkOcNotArrivedDetailsActions.MODIFIED_PRICE_ITEM, (state, {i, item}) => ({
    ...state,
    familySelected: {
      ...state.familySelected,
      selectedPurchaseOrder: {
        ...state.familySelected.selectedPurchaseOrder,
        items: _map(
          state.familySelected.selectedPurchaseOrder.items,
          (o: Array<IItems>, index: number) => {
            if (index === i) {
              // Ya entré al arreglo de arreglos
              return _map(o, (k: IItems) => {
                if (k.NumberToSave === item.NumberToSave) {
                  // Ya entré al arreglo de una partida
                  return {
                    ...k,
                    tempPrecioLista: item.tempPrecioLista,
                    tempTotalPartida: item.tempTotalPartida,
                    ocPartida: {
                      ...k.ocPartida,
                      PrecioLista: item.tempPrecioLista,
                    },
                  };
                }
                return {...k};
              });
            }
            return [...o];
          },
        ),
      },
    },
  })),
  on(checkOcNotArrivedDetailsActions.CONFIRM_ITEMS_SUCCESS, (state) => ({
    ...state,
    familySelected: {
      ...state.familySelected,
      selectedPurchaseOrder: {
        ...state.familySelected.selectedPurchaseOrder,
        needsToReloadItems: true,
      },
    },
  })),
  on(checkOcNotArrivedDetailsActions.REFRESH_SELECTED_PURCHASE_ORDER_SUCCESS, (state, {order}) => ({
    ...state,
    familySelected: {
      ...state.familySelected,
      selectedPurchaseOrder: {
        ...state.familySelected.selectedPurchaseOrder,
        ...order,
      },
    },
  })),
  on(checkOcNotArrivedDetailsActions.REFRESH_PURCHASE_ORDERS, (state) => ({
    ...state,
    familySelected: {
      ...state.familySelected,
      needsToReloadPurchaseOrders: true,
    },
  })),
  on(
    checkOcNotArrivedDetailsActions.SET_PROVIDER_CONTACT,
    (state: ICheckOcNotArrivedDetails, {contacts}): ICheckOcNotArrivedDetails => ({
      ...state,
      providerContacts: contacts,
      selectedProviderContact: !isEmpty(contacts)
        ? {
            label:
              contacts[0].Nombres +
              ' ' +
              contacts[0].ApellidoPaterno +
              ' ' +
              contacts[0].ApellidoMaterno,
            value: contacts[0].IdContactoProveedor,
          }
        : null,
    }),
  ),
  on(
    checkOcNotArrivedDetailsActions.SET_SELECTED_CONTACT_PROVIDER,
    (state: ICheckOcNotArrivedDetails, {contactSelected}): ICheckOcNotArrivedDetails => ({
      ...state,
      selectedProviderContact: contactSelected,
    }),
  ),
);
