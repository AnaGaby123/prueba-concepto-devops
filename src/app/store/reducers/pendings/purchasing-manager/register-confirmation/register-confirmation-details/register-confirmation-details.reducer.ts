/* Core Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  IFamily,
  IItemsFamily,
  initialChildItem,
  initialIRegisterConfirmationDetails,
  initialOcPartidaCancelacion,
  initialOcPartidaEdicionBackOrder,
  initialOcPartidaEdicionConImpactoFEE,
  initialOcPartidaEdicionSinImpactoFEE,
  IOrdersFamily,
  IRegisterConfirmationDetails,
  STATUS,
  TYPES_OF_CONFIG,
} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';

/* Actions Imports */
import {registerConfirmationDetailsActions} from '@appActions/pendings/purchasing-manager/register-confirmation';

/* Common Imports */
import {filter, isEmpty, map, sumBy} from 'lodash-es';
import {DEFAULT_UUID} from '@appUtil/common.protocols';

const initialRegisterConfirmationList: IRegisterConfirmationDetails = {
  ...initialIRegisterConfirmationDetails(),
};

export const registerConfirmationDetailsReducer: ActionReducer<IRegisterConfirmationDetails> = createReducer(
  initialRegisterConfirmationList,
  on(
    registerConfirmationDetailsActions.CLEAN_ALL_DETAILS_STATE,
    (): IRegisterConfirmationDetails => ({
      ...initialIRegisterConfirmationDetails(),
    }),
  ),
  on(
    registerConfirmationDetailsActions.SET_PROVIDER_SELECTED,
    (state: IRegisterConfirmationDetails, {providerSelected}): IRegisterConfirmationDetails => ({
      ...state,
      providerSelected,
    }),
  ),
  on(
    registerConfirmationDetailsActions.FETCH_FAMILIES_SUCCESS,
    (state: IRegisterConfirmationDetails, {list}): IRegisterConfirmationDetails => ({
      ...state,
      families: list,
      selectedFamily: list.length > 0 ? list[0] : ({} as IFamily),
    }),
  ),
  on(
    registerConfirmationDetailsActions.REFRESH_PURCHASE_ORDERS,
    (state: IRegisterConfirmationDetails): IRegisterConfirmationDetails => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        needsToReloadOrders: true,
      },
    }),
  ),
  on(
    registerConfirmationDetailsActions.REFRESH_SELECTED_PURCHASE_ORDER_SUCCESS,
    (state: IRegisterConfirmationDetails, {order}): IRegisterConfirmationDetails => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        selectedOrder: {
          ...state.selectedFamily.selectedOrder,
          ...order,
        },
      },
    }),
  ),
  on(
    registerConfirmationDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS,
    (state: IRegisterConfirmationDetails, {orders}): IRegisterConfirmationDetails => ({
      ...state,
      selectedFamily: {...state.selectedFamily, purchaseOrders: orders},
    }),
  ),
  on(
    registerConfirmationDetailsActions.INITIAL_PURCHASE_ORDER,
    (state: IRegisterConfirmationDetails, {order}): IRegisterConfirmationDetails => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        selectedOrder: order,
        needsToReloadOrders: false,
      },
    }),
  ),
  on(
    registerConfirmationDetailsActions.SET_ITEMS_STATUS,
    (state: IRegisterConfirmationDetails, {itemsStatus}): IRegisterConfirmationDetails => ({
      ...state,
      itemsStatus,
    }),
  ),
  on(
    registerConfirmationDetailsActions.SET_ORDERS_STATUS,
    (state: IRegisterConfirmationDetails, {ordersStatus}): IRegisterConfirmationDetails => ({
      ...state,
      ordersStatus,
    }),
  ),
  on(
    registerConfirmationDetailsActions.FETCH_ITEMS_SUCCESS,
    (state: IRegisterConfirmationDetails, {list}): IRegisterConfirmationDetails => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        selectedOrder: {
          ...state.selectedFamily.selectedOrder,
          items: list,
          needsToReloadItems: false,
        },
      },
    }),
  ),
  on(
    registerConfirmationDetailsActions.SET_SELECTED_ORDER_FIELD_VALUE,
    (state: IRegisterConfirmationDetails, {field, value}): IRegisterConfirmationDetails => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        selectedOrder: {
          ...state.selectedFamily.selectedOrder,
          [field]: value,
          IdCatMedioDePago:
            field === 'selectedPaymentMedia'
              ? value.value.toString()
              : state.selectedFamily.selectedOrder.IdCatMedioDePago,
          IdCatCondicionesDePago:
            field === 'selectedPaymentConditions'
              ? value.value.toString()
              : state.selectedFamily.selectedOrder.IdCatCondicionesDePago,
        },
      },
    }),
  ),
  on(
    registerConfirmationDetailsActions.SET_ITEM_CHECK_ACTIVE,
    (
      state: IRegisterConfirmationDetails,
      {i, item, typeOfCheck, newStatus},
    ): IRegisterConfirmationDetails => {
      // Cambiar status a activo, abrir config
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          selectedOrder: {
            ...state.selectedFamily.selectedOrder,
            items: map(
              state.selectedFamily.selectedOrder.items,
              (o: Array<IItemsFamily>, index: number) => {
                if (index === i) {
                  // Ya entré al arreglo de arreglos
                  return map(o, (k: IItemsFamily) => {
                    if (k.Number === item.Number) {
                      // Ya entré al arreglo de una partida
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
                        withoutImpactStatus:
                          typeOfCheck === TYPES_OF_CONFIG.withoutImpact
                            ? newStatus
                            : newStatus === STATUS.active && k.withoutImpactStatus === STATUS.active
                            ? STATUS.default
                            : k.withoutImpactStatus,
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
                        ocPartidaEdicionSinImpactoFEE:
                          typeOfCheck === TYPES_OF_CONFIG.withoutImpact
                            ? {
                                ...k.ocPartidaEdicionSinImpactoFEE,
                                NumeroDePiezas: k.tempNumeroDePiezas,
                              }
                            : {...k.ocPartidaEdicionSinImpactoFEE},
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
                      withoutImpactStatus:
                        k.withoutImpactStatus === STATUS.active
                          ? STATUS.default
                          : k.withoutImpactStatus,
                    };
                  });
                }
                return map(o, (k: IItemsFamily) => ({
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
                  withoutImpactStatus: k.withoutImpactConfig
                    ? STATUS.confirmed
                    : k.withoutImpactStatus !== STATUS.default &&
                      k.withoutImpactStatus !== STATUS.active
                    ? k.withoutImpactStatus
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
                  ocPartidaEdicionSinImpactoFEE: k.withoutImpactConfig
                    ? {...k.ocPartidaEdicionSinImpactoFEE}
                    : {...initialOcPartidaEdicionSinImpactoFEE()},
                }));
              },
            ),
          },
        },
      };
    },
  ),
  on(
    registerConfirmationDetailsActions.SAVE_ITEM_LOCAL_CONFIGURATION_CANCEL,
    (state: IRegisterConfirmationDetails, {i, item}): IRegisterConfirmationDetails => {
      // Cambiar status a activo, abrir config
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          selectedOrder: {
            ...state.selectedFamily.selectedOrder,
            items: map(
              state.selectedFamily.selectedOrder.items,
              (o: Array<IItemsFamily>, index: number) => {
                if (index === i) {
                  // Ya entré al arreglo de arreglos
                  if (
                    Number(item.tempNumeroDePiezas) ===
                    Number(item.ocPartidaCancelacion.NumeroDePiezas)
                  ) {
                    // No se generará una nueva partida
                    return map(o, (k: IItemsFamily) => {
                      if (k.Number === item.Number) {
                        // Ya entré al arreglo de una partida
                        return {
                          ...k,
                          Confirmada: true,
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
                            Confirmada: true,
                          },
                        };
                      }
                      return {...k, configIsOpen: false};
                    });
                  }
                  // Se generará una nueva partida
                  return [
                    ...map(o, (k: IItemsFamily) => {
                      if (k.Number === item.Number) {
                        // Ya entré al arreglo de una partida
                        return {
                          ...k,
                          Confirmada: true,
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
                            Confirmada: true,
                          },
                        };
                      }
                      return {...k, configIsOpen: false};
                    }),
                    {
                      ...item,
                      Number: Number(
                        `${i + 1}.${state.selectedFamily.selectedOrder.items[i].length}`,
                      ),
                      NumberToSave: Number(
                        `${item.ocPartida.Indice}.${item.ocPartida.SubIndice + 1}`,
                      ),
                      Confirmada: false,
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
                        item.impactStatus === STATUS.opacity ||
                        item.impactStatus === STATUS.disabled
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
                        Confirmada: false,
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
      };
    },
  ),
  on(
    registerConfirmationDetailsActions.SAVE_ITEM_LOCAL_CONFIGURATION_BACK_ORDER,
    (state: IRegisterConfirmationDetails, {i, item}): IRegisterConfirmationDetails => {
      // Cambiar status a activo, abrir config
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          selectedOrder: {
            ...state.selectedFamily.selectedOrder,
            items: map(
              state.selectedFamily.selectedOrder.items,
              (o: Array<IItemsFamily>, index: number) => {
                if (index === i) {
                  // Ya entré al arreglo de arreglos
                  if (
                    Number(item.tempNumeroDePiezas) ===
                    Number(item.ocPartidaEdicionBackOrder.NumeroDePiezas)
                  ) {
                    // No se generará una nueva partida
                    return map(o, (k: IItemsFamily) => {
                      if (k.Number === item.Number) {
                        // Ya entré al arreglo de una partida
                        return {
                          ...k,
                          Confirmada: true,
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
                          tempFechaEstimadaDeArribo:
                            k.ocPartidaEdicionBackOrder.FechaEstimadaArribo,
                          ocPartida: {
                            ...k.ocPartida,
                            Confirmada: true,
                            FechaEstimadaDeArribo: k.ocPartidaEdicionBackOrder.FechaEstimadaArribo,
                          },
                        };
                      }
                      return {...k, configIsOpen: false};
                    });
                  }
                  // Se generará una nueva partida
                  return [
                    ...map(o, (k: IItemsFamily) => {
                      if (k.Number === item.Number) {
                        // Ya entré al arreglo de una partida
                        return {
                          ...k,
                          Confirmada: true,
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
                          tempFechaEstimadaDeArribo:
                            k.ocPartidaEdicionBackOrder.FechaEstimadaArribo,
                          ocPartida: {
                            ...k.ocPartida,
                            NumeroDePiezas: k.ocPartidaEdicionBackOrder.NumeroDePiezas,
                            Confirmada: true,
                            FechaEstimadaDeArribo: k.ocPartidaEdicionBackOrder.FechaEstimadaArribo,
                          },
                        };
                      }
                      return {...k, configIsOpen: false};
                    }),
                    {
                      ...item,
                      Number: Number(
                        `${i + 1}.${state.selectedFamily.selectedOrder.items[i].length}`,
                      ),
                      NumberToSave: Number(
                        `${item.ocPartida.Indice}.${item.ocPartida.SubIndice + 1}`,
                      ),
                      Confirmada: false,
                      IdOcPartida: DEFAULT_UUID,
                      tempId: DEFAULT_UUID,
                      tempNumeroDePiezas:
                        item.tempNumeroDePiezas - item.ocPartidaEdicionBackOrder.NumeroDePiezas,
                      backOrderStatus: STATUS.opacity,
                      cancelStatus:
                        item.cancelStatus === STATUS.opacity ||
                        item.cancelStatus === STATUS.disabled
                          ? STATUS.disabled
                          : STATUS.default,
                      impactStatus:
                        item.impactStatus === STATUS.opacity ||
                        item.impactStatus === STATUS.disabled
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
                        Confirmada: false,
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
      };
    },
  ),
  on(
    registerConfirmationDetailsActions.SAVE_ITEM_LOCAL_CONFIGURATION_IMPACT,
    (state: IRegisterConfirmationDetails, {i, item}): IRegisterConfirmationDetails => {
      // Cambiar status a activo, abrir config
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          selectedOrder: {
            ...state.selectedFamily.selectedOrder,
            items: map(
              state.selectedFamily.selectedOrder.items,
              (o: Array<IItemsFamily>, index: number) => {
                if (index === i) {
                  // Ya entré al arreglo de arreglos
                  if (
                    Number(item.tempNumeroDePiezas) ===
                    Number(item.ocPartidaEdicionConImpactoFEE.NumeroDePiezas)
                  ) {
                    // No se generará una nueva partida
                    return map(o, (k: IItemsFamily) => {
                      if (k.Number === item.Number) {
                        // Ya entré al arreglo de una partida
                        return {
                          ...k,
                          Confirmada: true,
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
                            Confirmada: true,
                            FechaEstimadaDeArribo:
                              k.ocPartidaEdicionConImpactoFEE.FechaEstimadaArribo,
                          },
                        };
                      }
                      return {...k, configIsOpen: false};
                    });
                  }
                  // Se generará una nueva partida
                  return [
                    ...map(o, (k: IItemsFamily) => {
                      if (k.Number === item.Number) {
                        // Ya entré al arreglo de una partida
                        return {
                          ...k,
                          Confirmada: true,
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
                            FechaEstimadaDeArribo:
                              k.ocPartidaEdicionConImpactoFEE.FechaEstimadaArribo,
                            Confirmada: true,
                          },
                        };
                      }
                      return {...k, configIsOpen: false};
                    }),
                    {
                      ...item,
                      Number: Number(
                        `${i + 1}.${state.selectedFamily.selectedOrder.items[i].length}`,
                      ),
                      NumberToSave: Number(
                        `${item.ocPartida.Indice}.${item.ocPartida.SubIndice + 1}`,
                      ),
                      Confirmada: false,
                      IdOcPartida: DEFAULT_UUID,
                      tempId: DEFAULT_UUID,
                      tempNumeroDePiezas:
                        item.tempNumeroDePiezas - item.ocPartidaEdicionConImpactoFEE.NumeroDePiezas,
                      impactStatus: STATUS.opacity,
                      cancelStatus:
                        item.cancelStatus === STATUS.opacity ||
                        item.cancelStatus === STATUS.disabled
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
                        Confirmada: false,
                        NumeroDePiezas:
                          item.tempNumeroDePiezas -
                          item.ocPartidaEdicionConImpactoFEE.NumeroDePiezas,
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
      };
    },
  ),
  on(
    registerConfirmationDetailsActions.SAVE_ITEM_LOCAL_CONFIGURATION_WITHOUT_IMPACT,
    (state: IRegisterConfirmationDetails, {i, item}): IRegisterConfirmationDetails => {
      // Cambiar status a activo, abrir config
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          selectedOrder: {
            ...state.selectedFamily.selectedOrder,
            items: map(
              state.selectedFamily.selectedOrder.items,
              (o: Array<IItemsFamily>, index: number) => {
                if (index === i) {
                  // Ya entré al arreglo de arreglos
                  if (
                    Number(item.tempNumeroDePiezas) ===
                    Number(item.ocPartidaEdicionSinImpactoFEE.NumeroDePiezas)
                  ) {
                    // No se generará una nueva partida
                    return map(o, (k: IItemsFamily) => {
                      if (k.Number === item.Number) {
                        // Ya entré al arreglo de una partida
                        return {
                          ...k,
                          Confirmada: true,
                          configIsOpen: false,
                          withoutImpactConfig: true,
                          withoutImpactStatus: STATUS.confirmed,
                          cancelStatus:
                            k.cancelStatus === STATUS.default
                              ? STATUS['disabled-default']
                              : k.cancelStatus,
                          backOrderStatus:
                            k.backOrderStatus === STATUS.default
                              ? STATUS['disabled-default']
                              : k.backOrderStatus,
                          impactStatus:
                            k.impactStatus === STATUS.default
                              ? STATUS['disabled-default']
                              : k.impactStatus,
                          tempFechaEstimadaDeArribo:
                            k.ocPartidaEdicionSinImpactoFEE.FechaEstimadaArribo,
                          ocPartida: {
                            ...k.ocPartida,
                            Confirmada: true,
                            FechaEstimadaDeArribo:
                              k.ocPartidaEdicionSinImpactoFEE.FechaEstimadaArribo,
                          },
                        };
                      }
                      return {...k, configIsOpen: false};
                    });
                  }
                  // Se generará una nueva partida
                  return [
                    ...map(o, (k: IItemsFamily) => {
                      if (k.Number === item.Number) {
                        // Ya entré al arreglo de una partida
                        return {
                          ...k,
                          Confirmada: true,
                          tempNumeroDePiezas: k.ocPartidaEdicionSinImpactoFEE.NumeroDePiezas,
                          configIsOpen: false,
                          withoutImpactConfig: true,
                          withoutImpactStatus: STATUS.confirmed,
                          cancelStatus:
                            k.cancelStatus === STATUS.default
                              ? STATUS['disabled-default']
                              : k.cancelStatus,
                          backOrderStatus:
                            k.backOrderStatus === STATUS.default
                              ? STATUS['disabled-default']
                              : k.backOrderStatus,
                          impactStatus:
                            k.impactStatus === STATUS.default
                              ? STATUS['disabled-default']
                              : k.impactStatus,
                          tempFechaEstimadaDeArribo:
                            k.ocPartidaEdicionSinImpactoFEE.FechaEstimadaArribo,
                          ocPartida: {
                            ...k.ocPartida,
                            NumeroDePiezas: k.ocPartidaEdicionSinImpactoFEE.NumeroDePiezas,
                            FechaEstimadaDeArribo:
                              k.ocPartidaEdicionSinImpactoFEE.FechaEstimadaArribo,
                            Confirmada: true,
                          },
                        };
                      }
                      return {...k, configIsOpen: false};
                    }),
                    {
                      ...item,
                      Number: Number(
                        `${i + 1}.${state.selectedFamily.selectedOrder.items[i].length}`,
                      ),
                      NumberToSave: Number(
                        `${item.ocPartida.Indice}.${item.ocPartida.SubIndice + 1}`,
                      ),
                      Confirmada: false,
                      IdOcPartida: DEFAULT_UUID,
                      tempId: DEFAULT_UUID,
                      tempNumeroDePiezas:
                        item.tempNumeroDePiezas - item.ocPartidaEdicionSinImpactoFEE.NumeroDePiezas,
                      withoutImpactStatus: STATUS.opacity,
                      cancelStatus:
                        item.cancelStatus === STATUS.opacity ||
                        item.cancelStatus === STATUS.disabled
                          ? STATUS.disabled
                          : STATUS.default,
                      backOrderStatus:
                        item.backOrderStatus === STATUS.opacity ||
                        item.backOrderStatus === STATUS.disabled
                          ? STATUS.disabled
                          : STATUS.default,
                      impactStatus:
                        item.impactStatus === STATUS.opacity ||
                        item.impactStatus === STATUS.disabled
                          ? STATUS.disabled
                          : STATUS.default,
                      ...initialChildItem(),
                      ocPartida: {
                        ...item.ocPartida,
                        IdOcPartida: DEFAULT_UUID,
                        Confirmada: false,
                        NumeroDePiezas:
                          item.tempNumeroDePiezas -
                          item.ocPartidaEdicionSinImpactoFEE.NumeroDePiezas,
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
      };
    },
  ),
  on(
    registerConfirmationDetailsActions.DELETE_ITEM_LOCAL_CONFIGURATION_CANCEL,
    (state: IRegisterConfirmationDetails, {i, item}): IRegisterConfirmationDetails => {
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          selectedOrder: {
            ...state.selectedFamily.selectedOrder,
            items: map(
              state.selectedFamily.selectedOrder.items,
              (o: Array<IItemsFamily>, index: number) => {
                if (index === i) {
                  // Ya entré al arreglo de arreglos
                  return map(o, (k: IItemsFamily) => {
                    if (k.NumberToSave === item.NumberToSave) {
                      // Ya entré al arreglo de una partida
                      return {
                        ...k,
                        Confirmada: false,
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
                        withoutImpactStatus:
                          k.withoutImpactStatus === STATUS['disabled-default']
                            ? STATUS.default
                            : k.withoutImpactStatus,
                        ocPartida: {
                          ...k.ocPartida,
                          Confirmada: false,
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
      };
    },
  ),
  on(
    registerConfirmationDetailsActions.DELETE_ITEM_LOCAL_CONFIGURATION_BACK_ORDER,
    (state: IRegisterConfirmationDetails, {i, item}): IRegisterConfirmationDetails => {
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          selectedOrder: {
            ...state.selectedFamily.selectedOrder,
            items: map(
              state.selectedFamily.selectedOrder.items,
              (o: Array<IItemsFamily>, index: number) => {
                if (index === i) {
                  // Ya entré al arreglo de arreglos
                  return map(o, (k: IItemsFamily) => {
                    if (k.NumberToSave === item.NumberToSave) {
                      // Ya entré al arreglo de una partida
                      return {
                        ...k,
                        tempFechaEstimadaDeArribo: k.FechaEstimadaDeArribo,
                        Confirmada: false,
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
                        withoutImpactStatus:
                          k.withoutImpactStatus === STATUS['disabled-default']
                            ? STATUS.default
                            : k.withoutImpactStatus,
                        ocPartida: {
                          ...k.ocPartida,
                          Confirmada: false,
                          FechaEstimadaDeArribo: k.FechaEstimadaDeArribo,
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
    registerConfirmationDetailsActions.DELETE_ITEM_LOCAL_CONFIGURATION_IMPACT,
    (state: IRegisterConfirmationDetails, {i, item}): IRegisterConfirmationDetails => {
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          selectedOrder: {
            ...state.selectedFamily.selectedOrder,
            items: map(
              state.selectedFamily.selectedOrder.items,
              (o: Array<IItemsFamily>, index: number) => {
                if (index === i) {
                  // Ya entré al arreglo de arreglos
                  return map(o, (k: IItemsFamily) => {
                    if (k.NumberToSave === item.NumberToSave) {
                      // Ya entré al arreglo de una partida
                      return {
                        ...k,
                        tempFechaEstimadaDeArribo: k.FechaEstimadaDeArribo,
                        Confirmada: false,
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
                        withoutImpactStatus:
                          k.withoutImpactStatus === STATUS['disabled-default']
                            ? STATUS.default
                            : k.withoutImpactStatus,
                        ocPartida: {
                          ...k.ocPartida,
                          Confirmada: false,
                          FechaEstimadaDeArribo: k.FechaEstimadaDeArribo,
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
      };
    },
  ),
  on(
    registerConfirmationDetailsActions.DELETE_ITEM_LOCAL_CONFIGURATION_WITHOUT_IMPACT,
    (state: IRegisterConfirmationDetails, {i, item}): IRegisterConfirmationDetails => {
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          selectedOrder: {
            ...state.selectedFamily.selectedOrder,
            items: map(
              state.selectedFamily.selectedOrder.items,
              (o: Array<IItemsFamily>, index: number) => {
                if (index === i) {
                  // Ya entré al arreglo de arreglos
                  return map(o, (k: IItemsFamily) => {
                    if (k.NumberToSave === item.NumberToSave) {
                      // Ya entré al arreglo de una partida
                      return {
                        ...k,
                        tempFechaEstimadaDeArribo: k.FechaEstimadaDeArribo,
                        Confirmada: false,
                        configIsOpen: false,
                        withoutImpactConfig: false,
                        withoutImpactStatus: STATUS.default,
                        cancelStatus:
                          k.cancelStatus === STATUS['disabled-default']
                            ? STATUS.default
                            : k.cancelStatus,
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
                          Confirmada: false,
                          FechaEstimadaDeArribo: k.FechaEstimadaDeArribo,
                        },
                        ocPartidaEdicionSinImpactoFEE: {
                          IdOcPartida: k.IdOcPartida,
                          ...initialOcPartidaEdicionSinImpactoFEE(),
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
    registerConfirmationDetailsActions.SET_ITEM_CHECK_CANCEL,
    (state: IRegisterConfirmationDetails, {i, item, typeOfCheck}): IRegisterConfirmationDetails => {
      // Cambiar status a default o confirmado al cancelar
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          selectedOrder: {
            ...state.selectedFamily.selectedOrder,
            items: map(
              state.selectedFamily.selectedOrder.items,
              (o: Array<IItemsFamily>, index: number) => {
                if (index === i) {
                  // Ya entré al arreglo de arreglos
                  return map(o, (k: IItemsFamily) => {
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
                        withoutImpactStatus:
                          typeOfCheck === TYPES_OF_CONFIG.withoutImpact
                            ? k.withoutImpactConfig
                              ? STATUS.confirmed
                              : STATUS.default
                            : k.withoutImpactStatus,
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
                        ocPartidaEdicionSinImpactoFEE:
                          typeOfCheck === TYPES_OF_CONFIG.withoutImpact && k.withoutImpactConfig
                            ? {...k.ocPartidaEdicionSinImpactoFEE}
                            : {...initialOcPartidaEdicionSinImpactoFEE()},
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
    registerConfirmationDetailsActions.RESTORE_SOME_ITEMS,
    (state: IRegisterConfirmationDetails, {i, k}): IRegisterConfirmationDetails => {
      // Establecer valor de inputs en config Sin impacto
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          selectedOrder: {
            ...state.selectedFamily.selectedOrder,
            items: map(
              state.selectedFamily.selectedOrder.items,
              (o: Array<IItemsFamily>, index: number) => {
                if (index === i) {
                  // Ya entré al arreglo de arreglos
                  const tempNumeroDePiezas = sumBy(
                    filter(o, (j: IItemsFamily, ind: number) => ind >= k),
                    (l: IItemsFamily) => Number(l.tempNumeroDePiezas),
                  );
                  const newArray = filter(o, (j: IItemsFamily, ind: number) => ind <= k);
                  return map(newArray, (m: IItemsFamily, ind: number) => {
                    if (ind === newArray.length - 1) {
                      return {
                        ...m,
                        Confirmada: false,
                        tempNumeroDePiezas,
                        tempPrecioLista: m.PrecioLista,
                        tempTotalPartida: m.TotalPartida,
                        tempFechaEstimadaDeArribo: m.FechaEstimadaDeArribo,
                        cancelConfig: false,
                        backOrderConfig: false,
                        impactConfig: false,
                        withoutImpactConfig: false,
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
                        withoutImpactStatus:
                          m.withoutImpactStatus === STATUS.confirmed ||
                          m.withoutImpactStatus === STATUS['disabled-default']
                            ? STATUS.default
                            : m.withoutImpactStatus,
                        ocPartida: {
                          ...m.ocPartida,
                          PrecioLista: m.PrecioLista,
                          Confirmada: false,
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
                        ocPartidaEdicionConImpactoFEE: {
                          ...initialOcPartidaEdicionConImpactoFEE(),
                          IdOcPartida: m.IdOcPartida,
                          NumeroDePiezas: tempNumeroDePiezas,
                        },
                        ocPartidaEdicionSinImpactoFEE: {
                          ...initialOcPartidaEdicionSinImpactoFEE(),
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
      };
    },
  ),
  on(
    registerConfirmationDetailsActions.CHECK_ALL_ITEMS,
    (
      state: IRegisterConfirmationDetails,
      {FechaEstimadaArribo, FechaEstimadaArriboDate},
    ): IRegisterConfirmationDetails => {
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          selectedOrder: {
            ...state.selectedFamily.selectedOrder,
            items: map(state.selectedFamily.selectedOrder.items, (o: Array<IItemsFamily>) => {
              return map(o, (k: IItemsFamily) => {
                return {
                  ...k,
                  Confirmada: true,
                  configIsOpen: false,
                  withoutImpactConfig: true,
                  withoutImpactStatus: STATUS.confirmed,
                  cancelStatus:
                    k.cancelStatus === STATUS.default ? STATUS['disabled-default'] : k.cancelStatus,
                  backOrderStatus:
                    k.backOrderStatus === STATUS.default
                      ? STATUS['disabled-default']
                      : k.backOrderStatus,
                  impactStatus:
                    k.impactStatus === STATUS.default ? STATUS['disabled-default'] : k.impactStatus,
                  tempFechaEstimadaDeArribo: FechaEstimadaArribo,
                  ocPartidaEdicionSinImpactoFEE: {
                    ...k.ocPartidaEdicionSinImpactoFEE,
                    FechaEstimadaArribo,
                    FechaEstimadaArriboDate,
                  },
                  ocPartida: {
                    ...k.ocPartida,
                    Confirmada: true,
                    FechaEstimadaDeArribo: FechaEstimadaArribo,
                  },
                };
              });
            }),
          },
        },
      };
    },
  ),
  on(
    registerConfirmationDetailsActions.CONFIRM_ITEMS_SUCCESS,
    (state: IRegisterConfirmationDetails): IRegisterConfirmationDetails => {
      // Establecer valor de inputs en config Sin impacto
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          selectedOrder: {
            ...state.selectedFamily.selectedOrder,
            needsToReloadItems: true,
          },
        },
      };
    },
  ),
  on(
    registerConfirmationDetailsActions.SET_ITEM_FIELD_VALUE_WITHOUT_IMPACT,
    (
      state: IRegisterConfirmationDetails,
      {i, itemNumber, field, value},
    ): IRegisterConfirmationDetails => {
      // Establecer valor de inputs en config Sin impacto
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          selectedOrder: {
            ...state.selectedFamily.selectedOrder,
            items: map(
              state.selectedFamily.selectedOrder.items,
              (o: Array<IItemsFamily>, index: number) => {
                if (index === i) {
                  // Ya entré al arreglo de arreglos
                  return map(o, (k: IItemsFamily) => {
                    if (k.NumberToSave === itemNumber) {
                      // Ya entré al arreglo de una partida
                      return {
                        ...k,
                        ocPartidaEdicionSinImpactoFEE: {
                          ...k.ocPartidaEdicionSinImpactoFEE,
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
      };
    },
  ),
  on(
    registerConfirmationDetailsActions.SET_ITEM_FIELD_VALUE_BACK_ORDER,
    (
      state: IRegisterConfirmationDetails,
      {i, itemNumber, field, value},
    ): IRegisterConfirmationDetails => {
      // Establecer valor de inputs en config Sin impacto
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          selectedOrder: {
            ...state.selectedFamily.selectedOrder,
            items: map(
              state.selectedFamily.selectedOrder.items,
              (o: Array<IItemsFamily>, index: number) => {
                if (index === i) {
                  // Ya entré al arreglo de arreglos
                  return map(o, (k: IItemsFamily) => {
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
      };
    },
  ),
  on(
    registerConfirmationDetailsActions.SET_ITEM_FIELD_VALUE_RADIO_BUTTON_CANCEL,
    (
      state: IRegisterConfirmationDetails,
      {i, itemNumber, field, value},
    ): IRegisterConfirmationDetails => {
      // Establecer valor de inputs en config Sin impacto
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          selectedOrder: {
            ...state.selectedFamily.selectedOrder,
            items: map(
              state.selectedFamily.selectedOrder.items,
              (o: Array<IItemsFamily>, index: number) => {
                if (index === i) {
                  // Ya entré al arreglo de arreglos
                  return map(o, (k: IItemsFamily) => {
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
      };
    },
  ),
  on(
    registerConfirmationDetailsActions.SET_ITEM_FIELD_VALUE_STRING_CANCEL,
    (
      state: IRegisterConfirmationDetails,
      {i, itemNumber, field, value},
    ): IRegisterConfirmationDetails => {
      // Establecer valor de inputs en config cancel
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          selectedOrder: {
            ...state.selectedFamily.selectedOrder,
            items: map(
              state.selectedFamily.selectedOrder.items,
              (o: Array<IItemsFamily>, index: number) => {
                if (index === i) {
                  // Ya entré al arreglo de arreglos
                  return map(o, (k: IItemsFamily) => {
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
      };
    },
  ),
  on(
    registerConfirmationDetailsActions.SET_ITEM_FIELD_VALUE_RADIO_BUTTON_IMPACT,
    (
      state: IRegisterConfirmationDetails,
      {i, itemNumber, field, value},
    ): IRegisterConfirmationDetails => {
      // Establecer valor de radios en config con impacto
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          selectedOrder: {
            ...state.selectedFamily.selectedOrder,
            items: map(
              state.selectedFamily.selectedOrder.items,
              (o: Array<IItemsFamily>, index: number) => {
                if (index === i) {
                  // Ya entré al arreglo de arreglos
                  return map(o, (k: IItemsFamily) => {
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
      };
    },
  ),
  on(
    registerConfirmationDetailsActions.SET_ITEM_FIELD_VALUE_IMPACT,
    (
      state: IRegisterConfirmationDetails,
      {i, itemNumber, field, value},
    ): IRegisterConfirmationDetails => {
      // Establecer valor de inputs en config con impacto
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          selectedOrder: {
            ...state.selectedFamily.selectedOrder,
            items: map(
              state.selectedFamily.selectedOrder.items,
              (o: Array<IItemsFamily>, index: number) => {
                if (index === i) {
                  // Ya entré al arreglo de arreglos
                  return map(o, (k: IItemsFamily) => {
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
      };
    },
  ),
  on(
    registerConfirmationDetailsActions.MODIFIED_PRICE_ITEM,
    (state: IRegisterConfirmationDetails, {i, item}): IRegisterConfirmationDetails => {
      // Establecer valor de inputs en config con impacto
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          selectedOrder: {
            ...state.selectedFamily.selectedOrder,
            items: map(
              state.selectedFamily.selectedOrder.items,
              (o: Array<IItemsFamily>, index: number) => {
                if (index === i) {
                  // Ya entré al arreglo de arreglos
                  return map(o, (k: IItemsFamily) => {
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
      };
    },
  ),
  on(
    registerConfirmationDetailsActions.SET_SELECTED_TAB_OPTION,
    (state: IRegisterConfirmationDetails, {selectedTabOption}): IRegisterConfirmationDetails => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        selectedTabOption,
        needsToReloadOrders: true,
      },
    }),
  ),
  on(
    registerConfirmationDetailsActions.SET_SEARCH_TERM,
    (state: IRegisterConfirmationDetails, {searchTerm}): IRegisterConfirmationDetails => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        searchTerm,
        needsToReloadOrders: true,
      },
    }),
  ),
  on(
    registerConfirmationDetailsActions.SET_SELECTED_FAMILY,
    (state: IRegisterConfirmationDetails, {familyId}): IRegisterConfirmationDetails => ({
      ...state,
      families: map(state.families, (o: IFamily) => {
        // FIXME: Corregir por cambio en modelos
        /*if (o.IdProveedorFamilia === state.selectedFamily.IdProveedorFamilia) {
          return {...state.selectedFamily};
        }*/
        return {...o};
      }),
      // FIXME: Corregir por cambio en modelos
      /*selectedFamily: filter(
        state.families,
        (o: IFamily) => o.IdProveedorFamilia === familyId,
      )[0],*/
    }),
  ),
  on(
    registerConfirmationDetailsActions.SET_SELECTED_ORDER,
    (state: IRegisterConfirmationDetails, {orderId}): IRegisterConfirmationDetails => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        purchaseOrders: map(state.selectedFamily.purchaseOrders, (o: IOrdersFamily) => {
          if (o.IdOcOrdenDeCompra === state.selectedFamily.selectedOrder.IdOcOrdenDeCompra) {
            return {...state.selectedFamily.selectedOrder, isSelected: false};
          } else if (o.IdOcOrdenDeCompra === orderId) {
            return {...o, isSelected: true};
          }
          return {...o, isSelected: false};
        }),
        selectedOrder: filter(
          state.selectedFamily.purchaseOrders,
          (o: IOrdersFamily) => o.IdOcOrdenDeCompra === orderId,
        )[0],
      },
    }),
  ),

  on(
    registerConfirmationDetailsActions.SET_PROVIDER_CONTACT,
    (state: IRegisterConfirmationDetails, {contacts}): IRegisterConfirmationDetails => ({
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
    registerConfirmationDetailsActions.SET_SELECTED_CONTACT_PROVIDER,
    (state: IRegisterConfirmationDetails, {contactSelected}): IRegisterConfirmationDetails => ({
      ...state,
      selectedProviderContact: contactSelected,
    }),
  ),
);
