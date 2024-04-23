/* Core Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  IConfirmDispatchDetails,
  IItem,
  initialArrivalList,
  initialIConfirmDispatchDetails,
  initialTabs,
  IPurchaseOrder,
} from '@appModels/store/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch-details/confirm-dispatch-details.models';
import {
  initialOcPartidaCancelacion,
  initialOcPartidaEdicionBackOrder,
  STATUS,
  TYPES_OF_CONFIG,
} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';
import {initialChildItem} from '@appModels/store/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-details/check-oc-not-arrived-details.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {initialOcPackingList} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-details/declare-arrival-details.models';

/* Actions Imports */
import {
  confirmDispatchDetailsActions,
  confirmDispatchListActions,
} from '@appActions/pendings/purchasing-manager/confirm-dispatch';

/* Common Imports */
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';

/* Utils Imports */
import {filter, isEmpty, map as _map, sumBy} from 'lodash-es';

const initialConfirmDispatchDetails: IConfirmDispatchDetails = {
  ...initialIConfirmDispatchDetails(),
};

export const confirmDispatchDetailsReducer: ActionReducer<IConfirmDispatchDetails> = createReducer(
  initialConfirmDispatchDetails,
  on(confirmDispatchDetailsActions.CLEAN_ALL_CONFIRM_DISPATCH_DETAILS, (state) => ({
    ...initialConfirmDispatchDetails,
  })),
  on(confirmDispatchDetailsActions.SET_TERM_SEARCH, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
    purchaseOrdersStatus: API_REQUEST_STATUS_LOADING,
    purchaseOrdersNeedsToReload: true,
  })),
  on(confirmDispatchDetailsActions.SET_TAB_SELECTED, (state, {tabSelected}) => ({
    ...state,
    tabSelected,
    purchaseOrdersStatus: API_REQUEST_STATUS_LOADING,
    purchaseOrdersNeedsToReload: true,
  })),
  on(confirmDispatchDetailsActions.SET_VIEW_MODE, (state, {viewMode}) => ({
    ...state,
    viewMode,
    itemsInSummaryNeedsToReload: viewMode === 'summary' ? true : state.itemsInSummaryNeedsToReload,
  })),

  on(confirmDispatchListActions.SET_PROVIDER_SELECTED, (state, {providerSelected}) => ({
    ...state,
    providerSelected,
  })),
  on(
    confirmDispatchDetailsActions.SET_TAB_TOTALS,
    (state, {all, oneDay, twoDays, threeDays, moreThanThreeDays}) => ({
      ...state,
      tabsTotals: initialTabs(all, oneDay, twoDays, threeDays, moreThanThreeDays),
    }),
  ),
  on(confirmDispatchDetailsActions.FETCH_ITEMS_CONFIRMED_LOAD, (state) => ({
    ...state,
    itemsInSummaryStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(confirmDispatchDetailsActions.FETCH_ITEMS_CONFIRMED_SUCCESS, (state, {itemsInSummary}) => ({
    ...state,
    itemsInSummary,
    itemsInSummaryStatus: API_REQUEST_STATUS_SUCCEEDED,
    itemsInSummaryNeedsToReload: false,
  })),
  on(confirmDispatchDetailsActions.FETCH_ITEMS_CONFIRMED_FAILED, (state) => ({
    ...state,
    itemsInSummaryStatus: API_REQUEST_STATUS_FAILED,
  })),
  on(confirmDispatchDetailsActions.FETCH_RESTORE_ITEM_SUCCESS, (state) => ({
    ...state,
    itemsInSummaryStatus: API_REQUEST_STATUS_LOADING,
    itemsInSummaryNeedsToReload: true,
    purchaseOrders: _map(state.purchaseOrders, (o) => ({
      ...o,
      itemsNeedsToReload: true,
    })),
  })),
  on(confirmDispatchDetailsActions.FETCH_PURCHASE_ORDERS_LOAD, (state) => ({
    ...state,
    purchaseOrdersStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(confirmDispatchDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS, (state, {purchaseOrders}) => ({
    ...state,
    purchaseOrders,
    purchaseOrdersStatus: API_REQUEST_STATUS_SUCCEEDED,
    purchaseOrdersNeedsToReload: false,
    purchaseOrderSelected: purchaseOrders.length > 0 ? purchaseOrders[0] : ({} as IPurchaseOrder),
  })),
  on(confirmDispatchDetailsActions.FETCH_PURCHASE_ORDERS_FAILED, (state) => ({
    ...state,
    purchaseOrdersStatus: API_REQUEST_STATUS_FAILED,
  })),
  on(
    confirmDispatchDetailsActions.REFRESH_PURCHASE_ORDERS,
    (state: IConfirmDispatchDetails): IConfirmDispatchDetails => ({
      ...state,
      purchaseOrdersNeedsToReload: true,
    }),
  ),
  on(
    confirmDispatchDetailsActions.REFRESH_SELECTED_PURCHASE_ORDER_SUCCESS,
    (state: IConfirmDispatchDetails, {order}): IConfirmDispatchDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        ...order,
      },
    }),
  ),
  on(
    confirmDispatchDetailsActions.REFRESH_SELECTED_PROVIDER_SUCCESS,
    (state: IConfirmDispatchDetails, {provider}): IConfirmDispatchDetails => ({
      ...state,
      providerSelected: {
        ...state.providerSelected,
        ...provider,
      },
    }),
  ),
  on(
    confirmDispatchDetailsActions.SET_ITEMS_STATUS,
    (state: IConfirmDispatchDetails, {itemsStatus}): IConfirmDispatchDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        itemsStatus,
      },
    }),
  ),
  on(confirmDispatchDetailsActions.SET_PURCHASE_ORDER_SELECTED, (state, {IdOcPackingList}) => ({
    ...state,
    purchaseOrders: _map(state.purchaseOrders, (oc: IPurchaseOrder) => {
      if (!IdOcPackingList) {
        return {
          ...({} as IPurchaseOrder),
        };
      } else if (oc.IdOcPackingList === state.purchaseOrderSelected.IdOcPackingList) {
        return {
          ...state.purchaseOrderSelected,
          isSelected: false,
        };
      } else {
        return {
          ...oc,
          isSelected: oc.IdOcPackingList === IdOcPackingList,
        };
      }
    }),
    purchaseOrderSelected: filter(
      state.purchaseOrders,
      (oc: IPurchaseOrder) => oc.IdOcPackingList === IdOcPackingList,
    )[0],
    viewMode: 'normal',
  })),
  on(confirmDispatchDetailsActions.FETCH_ITEMS_LOAD, (state) => ({
    ...state,
    itemsStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(
    confirmDispatchDetailsActions.FETCH_RESTORE_ITEM_SUCCESS,
    (state: IConfirmDispatchDetails): IConfirmDispatchDetails => ({
      ...state,
      purchaseOrdersNeedsToReload: true,
    }),
  ),
  on(confirmDispatchDetailsActions.FETCH_ITEMS_SUCCESS, (state, {items}) => ({
    ...state,
    purchaseOrderSelected: {
      ...state.purchaseOrderSelected,
      items,
      itemsStatus: API_REQUEST_STATUS_SUCCEEDED,
      itemsNeedsToReload: false,
    },
  })),
  on(confirmDispatchDetailsActions.FETCH_ITEMS_FAILED, (state) => ({
    ...state,
    itemsStatus: API_REQUEST_STATUS_FAILED,
  })),
  on(
    confirmDispatchDetailsActions.SET_ITEM_CHECK_ACTIVE,
    (state, {i, item, typeOfCheck, newStatus}) => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        items: _map(state.purchaseOrderSelected.items, (o: Array<IItem>, index: number) => {
          if (index === i) {
            return _map(o, (k: IItem) => {
              if (k.Number === item.Number) {
                return {
                  ...k,
                  configIsOpen: typeOfCheck !== TYPES_OF_CONFIG.confirm,
                  cancelStatus:
                    typeOfCheck === TYPES_OF_CONFIG.confirm && newStatus === 'confirmed'
                      ? 'disabled-default'
                      : typeOfCheck === TYPES_OF_CONFIG.confirm && newStatus === 'default'
                      ? 'default'
                      : typeOfCheck === TYPES_OF_CONFIG.cancel
                      ? newStatus
                      : newStatus === STATUS.active && k.cancelStatus === STATUS.active
                      ? STATUS.default
                      : k.cancelStatus,
                  backOrderStatus:
                    typeOfCheck === TYPES_OF_CONFIG.confirm && newStatus === 'confirmed'
                      ? 'disabled-default'
                      : typeOfCheck === TYPES_OF_CONFIG.confirm && newStatus === 'default'
                      ? 'default'
                      : typeOfCheck === TYPES_OF_CONFIG.backOrder
                      ? newStatus
                      : newStatus === STATUS.active && k.backOrderStatus === STATUS.active
                      ? STATUS.default
                      : k.backOrderStatus,
                  confirmedStatus:
                    typeOfCheck === TYPES_OF_CONFIG.confirm
                      ? newStatus
                      : newStatus === STATUS.active && k.confirmedStatus === STATUS.active
                      ? STATUS.default
                      : k.confirmedStatus,
                  confirmedConfig:
                    typeOfCheck === TYPES_OF_CONFIG.confirm && newStatus === STATUS.confirmed,
                  CDResumen:
                    typeOfCheck === TYPES_OF_CONFIG.confirm && newStatus === STATUS.confirmed,
                  ocPartida: {
                    ...k.ocPartida,
                    CDResumen:
                      typeOfCheck === TYPES_OF_CONFIG.confirm && newStatus === STATUS.confirmed
                        ? true
                        : k.ocPartida.CDResumen,
                  },
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
                };
              }
              return {
                ...k,
                configIsOpen: false,
                cancelStatus: k.cancelStatus === STATUS.active ? STATUS.default : k.cancelStatus,
                backOrderStatus:
                  k.backOrderStatus === STATUS.active ? STATUS.default : k.backOrderStatus,
              };
            });
          }
          return _map(o, (k: IItem) => ({
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
            ocPartidaCancelacion: k.cancelConfig
              ? {...k.ocPartidaCancelacion}
              : {...initialOcPartidaCancelacion()},
            ocPartidaEdicionBackOrder: k.backOrderConfig
              ? {...k.ocPartidaEdicionBackOrder}
              : {...initialOcPartidaEdicionBackOrder()},
          }));
        }),
      },
    }),
  ),
  on(confirmDispatchDetailsActions.RESTORE_SOME_ITEMS, (state, {i, k}) => ({
    ...state,
    purchaseOrderSelected: {
      ...state.purchaseOrderSelected,
      items: _map(state.purchaseOrderSelected.items, (o: Array<IItem>, index: number) => {
        if (index === i) {
          // Ya entré al arreglo de arreglos
          const tempNumeroDePiezas = sumBy(
            filter(o, (j: IItem, ind: number) => ind >= k),
            (l: IItem) => Number(l.tempNumeroDePiezas),
          );
          const newArray = filter(o, (j: IItem, ind: number) => ind <= k);
          return _map(newArray, (m: IItem, ind: number) => {
            if (ind === newArray.length - 1) {
              return {
                ...m,
                // Confirmada: false,
                tempNumeroDePiezas,
                tempPrecioLista: m.PrecioLista,
                tempTotalPartida: m.TotalPartida,
                tempFechaEstimadaDeArribo: m.FechaEstimadaDeArribo,
                CDBackOrder: false,
                CDCancelar: false,
                cancelConfig: false,
                backOrderConfig: false,
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
                confirmedStatus:
                  m.confirmedStatus === STATUS.confirmed ||
                  m.confirmedStatus === STATUS['disabled-default']
                    ? STATUS.default
                    : m.confirmedStatus,
                ocPartida: {
                  ...m.ocPartida,
                  CDBackOrder: false,
                  CDCancelar: false,
                },
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
              };
            }
            return {...m};
          });
        }
        return [...o];
      }),
    },
  })),
  on(confirmDispatchDetailsActions.SET_ITEM_CHECK_CANCEL, (state, {i, item, typeOfCheck}) => ({
    ...state,
    purchaseOrderSelected: {
      ...state.purchaseOrderSelected,
      items: _map(state.purchaseOrderSelected.items, (o: Array<IItem>, index: number) => {
        if (index === i) {
          return _map(o, (k: IItem) => {
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
                ocPartidaCancelacion:
                  typeOfCheck === TYPES_OF_CONFIG.cancel && k.cancelConfig
                    ? {...k.ocPartidaCancelacion}
                    : {...initialOcPartidaCancelacion()},
                ocPartidaEdicionBackOrder:
                  typeOfCheck === TYPES_OF_CONFIG.backOrder && k.backOrderConfig
                    ? {...k.ocPartidaEdicionBackOrder}
                    : {...initialOcPartidaEdicionBackOrder()},
              };
            }
            return {...k};
          });
        }
        return [...o];
      }),
    },
  })),
  on(confirmDispatchDetailsActions.DELETE_ITEM_LOCAL_CONFIGURATION_CANCEL, (state, {i, item}) => ({
    ...state,
    purchaseOrderSelected: {
      ...state.purchaseOrderSelected,
      items: _map(state.purchaseOrderSelected.items, (o: Array<IItem>, index: number) => {
        if (index === i) {
          return _map(o, (k: IItem) => {
            if (k.Number === item.Number) {
              // Ya entré al arreglo de una partida
              return {
                ...k,
                CDCancelar: false,
                configIsOpen: false,
                cancelConfig: false,
                cancelStatus: STATUS.default,
                backOrderStatus:
                  k.backOrderStatus === STATUS['disabled-default']
                    ? STATUS.default
                    : k.backOrderStatus,
                confirmedStatus:
                  k.confirmedStatus === STATUS['disabled-default']
                    ? STATUS.default
                    : k.confirmedStatus,
                ocPartida: {
                  ...k.ocPartida,
                  CDCancelar: false,
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
      }),
    },
  })),
  on(
    confirmDispatchDetailsActions.DELETE_ITEM_LOCAL_CONFIGURATION_BACK_ORDER,
    (state: IConfirmDispatchDetails, {i, item}): IConfirmDispatchDetails => {
      return {
        ...state,
        purchaseOrderSelected: {
          ...state.purchaseOrderSelected,
          items: _map(state.purchaseOrderSelected.items, (o: Array<IItem>, index: number) => {
            if (index === i) {
              // Ya entré al arreglo de arreglos
              return _map(
                o,
                (k: IItem): IItem => {
                  if (k.Number === item.Number) {
                    // Ya entré al arreglo de una partida
                    return {
                      ...k,
                      tempFechaEstimadaDeArribo: k.FechaEstimadaDeArribo,
                      CDBackOrder: false,
                      configIsOpen: false,
                      backOrderConfig: false,
                      backOrderStatus: STATUS.default,
                      cancelStatus:
                        k.cancelStatus === STATUS['disabled-default']
                          ? STATUS.default
                          : k.cancelStatus,
                      confirmedStatus:
                        k.confirmedStatus === STATUS['disabled-default']
                          ? STATUS.default
                          : k.confirmedStatus,
                      ocPartida: {
                        ...k.ocPartida,
                        CDBackOrder: false,
                      },
                      ocPartidaEdicionBackOrder: {
                        IdOcPartida: k.IdOcPartida,
                        ...initialOcPartidaEdicionBackOrder(),
                      },
                    };
                  }
                  return {...k};
                },
              );
            }
            return [...o];
          }),
        },
      };
    },
  ),
  on(confirmDispatchDetailsActions.SAVE_ITEM_LOCAL_CONFIGURATION_CANCEL, (state, {i, item}) => ({
    ...state,
    purchaseOrderSelected: {
      ...state.purchaseOrderSelected,
      items: _map(state.purchaseOrderSelected.items, (o: Array<IItem>, index: number) => {
        if (index === i) {
          // Ya entré al arreglo de arreglos
          if (
            Number(item.tempNumeroDePiezas) === Number(item.ocPartidaCancelacion.NumeroDePiezas)
          ) {
            // No se generará una nueva partida
            return _map(o, (k: IItem) => {
              if (k.Number === item.Number) {
                // Ya entré al arreglo de una partida
                return {
                  ...k,
                  CDCancelar: true,
                  configIsOpen: false,
                  cancelConfig: true,
                  cancelStatus: STATUS.confirmed,
                  backOrderStatus:
                    k.backOrderStatus === STATUS.default
                      ? STATUS['disabled-default']
                      : k.backOrderStatus,
                  confirmedStatus:
                    k.confirmedStatus === STATUS.default
                      ? STATUS['disabled-default']
                      : k.confirmedStatus,
                  ocPartida: {
                    ...k.ocPartida,
                    CDCancelar: true,
                  },
                };
              }
              return {...k, configIsOpen: false};
            });
          }
          // Se generará una nueva partida
          return [
            ..._map(o, (k: IItem) => {
              if (k.Number === item.Number) {
                // Ya entré al arreglo de una partida
                return {
                  ...k,
                  CDCancelar: true,
                  tempNumeroDePiezas: k.ocPartidaCancelacion.NumeroDePiezas,
                  configIsOpen: false,
                  cancelConfig: true,
                  cancelStatus: STATUS.confirmed,
                  backOrderStatus:
                    k.backOrderStatus === STATUS.default
                      ? STATUS['disabled-default']
                      : k.backOrderStatus,
                  confirmedStatus:
                    k.confirmedStatus === STATUS.default
                      ? STATUS['disabled-default']
                      : k.confirmedStatus,
                  ocPartida: {
                    ...k.ocPartida,
                    NumeroDePiezas: k.ocPartidaCancelacion.NumeroDePiezas,
                    CDCancelar: true,
                  },
                };
              }
              return {...k, configIsOpen: false};
            }),
            {
              ...item,
              Number: Number(`${i + 1}.${state.purchaseOrderSelected.items[i].length}`),
              NumberToSave: Number(`${item.ocPartida.Indice}.${item.ocPartida.SubIndice + 1}`),
              // Confirmada: false,
              IdOcPartida: DEFAULT_UUID,
              tempId: DEFAULT_UUID,
              tempNumeroDePiezas:
                item.tempNumeroDePiezas - item.ocPartidaCancelacion.NumeroDePiezas,
              cancelStatus: STATUS.opacity,
              backOrderStatus:
                item.backOrderStatus === STATUS.opacity || item.backOrderStatus === STATUS.disabled
                  ? STATUS.disabled
                  : STATUS.default,
              confirmedStatus:
                item.confirmedStatus === STATUS.disabled ? STATUS.disabled : STATUS.default,
              ...initialChildItem(),
              ocPartida: {
                ...item.ocPartida,
                IdOcPartida: DEFAULT_UUID,
                // Confirmada: false,
                NumeroDePiezas: item.tempNumeroDePiezas - item.ocPartidaCancelacion.NumeroDePiezas,
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
            },
          ];
        }
        return [...o];
      }),
    },
  })),
  on(
    confirmDispatchDetailsActions.SAVE_ITEM_LOCAL_CONFIGURATION_BACK_ORDER,
    (state, {i, item}) => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        items: _map(state.purchaseOrderSelected.items, (o: Array<IItem>, index: number) => {
          if (index === i) {
            // Ya entré al arreglo de arreglos
            if (
              Number(item.tempNumeroDePiezas) ===
              Number(item.ocPartidaEdicionBackOrder.NumeroDePiezas)
            ) {
              // No se generará una nueva partida
              return _map(o, (k: IItem) => {
                if (k.Number === item.Number) {
                  // Ya entré al arreglo de una partida
                  return {
                    ...k,
                    CDBackOrder: true,
                    configIsOpen: false,
                    backOrderConfig: true,
                    backOrderStatus: STATUS.confirmed,
                    cancelStatus:
                      k.cancelStatus === STATUS.default
                        ? STATUS['disabled-default']
                        : k.cancelStatus,
                    confirmedStatus:
                      k.confirmedStatus === STATUS.default
                        ? STATUS['disabled-default']
                        : k.confirmedStatus,
                    tempFechaEstimadaDeArribo: k.ocPartidaEdicionBackOrder.FechaEstimadaArribo,
                    ocPartida: {
                      ...k.ocPartida,
                      CDBackOrder: true,
                    },
                  };
                }
                return {...k, configIsOpen: false};
              });
            }
            // Se generará una nueva partida
            return [
              ..._map(o, (k: IItem) => {
                if (k.Number === item.Number) {
                  // Ya entré al arreglo de una partida
                  return {
                    ...k,
                    // Confirmada: true,
                    CDBackOrder: true,
                    tempNumeroDePiezas: k.ocPartidaEdicionBackOrder.NumeroDePiezas,
                    configIsOpen: false,
                    backOrderConfig: true,
                    backOrderStatus: STATUS.confirmed,
                    cancelStatus:
                      k.cancelStatus === STATUS.default
                        ? STATUS['disabled-default']
                        : k.cancelStatus,
                    confirmedStatus:
                      k.confirmedStatus === STATUS.default
                        ? STATUS['disabled-default']
                        : k.confirmedStatus,
                    tempFechaEstimadaDeArribo: k.ocPartidaEdicionBackOrder.FechaEstimadaArribo,
                    ocPartida: {
                      ...k.ocPartida,
                      NumeroDePiezas: k.ocPartidaEdicionBackOrder.NumeroDePiezas,
                      CDBackOrder: true,
                      // Confirmada: true,
                    },
                  };
                }
                return {...k, configIsOpen: false};
              }),
              {
                ...item,
                Number: Number(`${i + 1}.${state.purchaseOrderSelected.items[i].length}`),
                NumberToSave: Number(`${item.ocPartida.Indice}.${item.ocPartida.SubIndice + 1}`),
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
              },
            ];
          }
          return [...o];
        }),
      },
    }),
  ),
  on(
    confirmDispatchDetailsActions.CHECK_ALL_ITEMS,
    (state: IConfirmDispatchDetails): IConfirmDispatchDetails => {
      return {
        ...state,
        purchaseOrderSelected: {
          ...state.purchaseOrderSelected,
          items: _map(state.purchaseOrderSelected.items, (o: Array<IItem>) => {
            return _map(o, (k: IItem) => {
              return {
                ...k,
                configIsOpen: false,
                confirmedConfig: true,
                confirmedStatus: STATUS.confirmed,
                CDResumen: true,
                cancelStatus:
                  k.cancelStatus === STATUS.default ? STATUS['disabled-default'] : k.cancelStatus,
                backOrderStatus:
                  k.backOrderStatus === STATUS.default
                    ? STATUS['disabled-default']
                    : k.backOrderStatus,
                ocPartida: {
                  ...k.ocPartida,
                  CDResumen: true,
                },
              };
            });
          }),
        },
      };
    },
  ),
  on(
    confirmDispatchDetailsActions.CONFIRM_ITEMS_SUCCESS,
    (state: IConfirmDispatchDetails): IConfirmDispatchDetails => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        itemsNeedsToReload: true,
      },
    }),
  ),
  on(
    confirmDispatchDetailsActions.SET_ITEM_FIELD_VALUE_RADIO_BUTTON_CANCEL,
    (state, {i, itemNumber, field, value}) => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        items: _map(state.purchaseOrderSelected.items, (o: Array<IItem>, index: number) => {
          if (index === i) {
            // Ya entré al arreglo de arreglos
            return _map(o, (k: IItem) => {
              if (k.NumberToSave === itemNumber) {
                // Ya entré al arreglo de una partida
                return {
                  ...k,
                  ocPartidaCancelacion: {
                    ...k.ocPartidaCancelacion,
                    Descontinuado: field === 'Descontinuado' ? value : false,
                    RestriccionesVenta: field === 'RestriccionesVenta' ? value : false,
                    RestriccionesImportacion: field === 'RestriccionesImportacion' ? value : false,
                  },
                };
              }
              return {...k};
            });
          }
          return [...o];
        }),
      },
    }),
  ),
  on(
    confirmDispatchDetailsActions.SET_ITEM_FIELD_VALUE_STRING_CANCEL,
    (state, {i, itemNumber, field, value}) => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        items: _map(
          state.purchaseOrderSelected.items,
          (o: Array<IItem>, index: number): Array<IItem> => {
            if (index === i) {
              // Ya entré al arreglo de arreglos
              return _map(
                o,
                (k: IItem): IItem => {
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
                },
              );
            }
            return [...o];
          },
        ),
      },
    }),
  ),
  on(
    confirmDispatchDetailsActions.SET_ITEM_FIELD_VALUE_BACK_ORDER,
    (state, {i, itemNumber, field, value}) => ({
      ...state,
      purchaseOrderSelected: {
        ...state.purchaseOrderSelected,
        items: _map(state.purchaseOrderSelected.items, (o: Array<IItem>, index: number) => {
          if (index === i) {
            // Ya entré al arreglo de arreglos
            return _map(o, (k: IItem) => {
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
        }),
      },
    }),
  ),
  on(
    confirmDispatchDetailsActions.SET_ITEM_FIELD_VALUE,
    (state: IConfirmDispatchDetails, {field, value}): IConfirmDispatchDetails => ({
      ...state,
      [field]: field !== 'NumeroGuia' && value,
      arrivalList: {
        ...state.arrivalList,
        NumeroGuia: field === 'NumeroGuia' ? (value as string) : state.arrivalList.NumeroGuia,
        IdCatFletera:
          field === 'selectedFreightOption'
            ? (value as DropListOption).value.toString()
            : state.arrivalList.IdCatFletera,
      },
    }),
  ),
  on(
    confirmDispatchDetailsActions.FINISH_ITEMS_SUCCESS,
    (state: IConfirmDispatchDetails): IConfirmDispatchDetails => ({
      ...state,
      arrivalList: initialArrivalList(),
      ocPackingList: initialOcPackingList(),
      packingListFile: null,
      guideFile: null,
      selectedFreightOption: {} as DropListOption,
    }),
  ),
  on(
    confirmDispatchDetailsActions.SET_PROVIDER_CONTACT,
    (state: IConfirmDispatchDetails, {contacts}): IConfirmDispatchDetails => ({
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
    confirmDispatchDetailsActions.SET_SELECTED_CONTACT_PROVIDER,
    (state: IConfirmDispatchDetails, {contactSelected}): IConfirmDispatchDetails => ({
      ...state,
      selectedProviderContact: contactSelected,
    }),
  ),
);
