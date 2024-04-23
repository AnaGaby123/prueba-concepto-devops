import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  IDeclareTransitArrivalDetails,
  IItemsDeclareTransitArrival,
  initialIDeclareTransitArrivalDetails,
  initialOcPackingList,
  IPurchaseOrderTransitArrival,
} from '@appModels/store/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival-details/declare-transit-arrival-details.models';
import {declareTransitArrivalDetailsActions} from '@appActions/pendings/imports-phs/declare-transit-arrival';
import {VLote} from 'api-logistica';
import {filter, findIndex, isEmpty, map} from 'lodash-es';

export const declareTransitArrivalDetailsReducer: ActionReducer<IDeclareTransitArrivalDetails> = createReducer(
  initialIDeclareTransitArrivalDetails(),
  on(
    declareTransitArrivalDetailsActions.CLEAN_ALL_DETAILS_STATE,
    (): IDeclareTransitArrivalDetails => ({
      ...initialIDeclareTransitArrivalDetails(),
    }),
  ),
  on(
    declareTransitArrivalDetailsActions.SET_SELECTED_PROVIDER,
    (state: IDeclareTransitArrivalDetails, {selectedProvider}): IDeclareTransitArrivalDetails => ({
      ...state,
      selectedProvider,
    }),
  ),
  on(
    declareTransitArrivalDetailsActions.REFRESH_SELECTED_PROVIDER,
    (state: IDeclareTransitArrivalDetails, {selectedProvider}): IDeclareTransitArrivalDetails => ({
      ...state,
      selectedProvider: {
        Index: state.selectedProvider.Index,
        ...selectedProvider,
      },
      // needsToReloadOrders: true,
    }),
  ),
  on(
    declareTransitArrivalDetailsActions.SET_ITEMS_STATUS,
    (state: IDeclareTransitArrivalDetails, {itemsStatus}): IDeclareTransitArrivalDetails => ({
      ...state,
      itemsStatus,
    }),
  ),
  on(
    declareTransitArrivalDetailsActions.SET_ORDERS_STATUS,
    (
      state: IDeclareTransitArrivalDetails,
      {purchaseOrdersStatus},
    ): IDeclareTransitArrivalDetails => ({
      ...state,
      purchaseOrdersStatus,
    }),
  ),
  // FIXME: REVISAR TIPADOS
  /* on(
    declareTransitArrivalDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS,
    (state: IDeclareTransitArrivalDetails, {orders}): IDeclareTransitArrivalDetails => ({
      ...state,
      purchaseOrders: orders,
    }),
  ),*/
  on(
    declareTransitArrivalDetailsActions.FETCH_ITEMS_SUCCESS,
    (state: IDeclareTransitArrivalDetails, {list}): IDeclareTransitArrivalDetails => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        items: list,
        itemsBackup: list,
        needsToReloadItems: false,
      },
    }),
  ),
  on(
    declareTransitArrivalDetailsActions.SET_SELECTED_TAB_OPTION,
    (state: IDeclareTransitArrivalDetails, {selectedTabOption}): IDeclareTransitArrivalDetails => ({
      ...state,
      selectedTabOption,
      needsToReloadOrders: true,
    }),
  ),
  on(
    declareTransitArrivalDetailsActions.SET_SORT_SELECTED,
    (state: IDeclareTransitArrivalDetails, {sort}): IDeclareTransitArrivalDetails => ({
      ...state,
      filterByType: sort,
      needsToReloadOrders: true,
    }),
  ),
  on(
    declareTransitArrivalDetailsActions.SET_SEARCH_TERM,
    (state: IDeclareTransitArrivalDetails, {searchTerm}): IDeclareTransitArrivalDetails => ({
      ...state,
      searchTerm,
      needsToReloadOrders: true,
    }),
  ),
  on(
    declareTransitArrivalDetailsActions.GENERATE_SUCCESS,
    (state: IDeclareTransitArrivalDetails): IDeclareTransitArrivalDetails => ({
      ...state,
      needsToReloadOrders: true,
      selectedItems: [],
      packingList: null,
      ocPackingList: initialOcPackingList(),
    }),
  ),
  on(
    declareTransitArrivalDetailsActions.SET_SELECTED_ORDER,
    (state: IDeclareTransitArrivalDetails, {purchaseOrderId}): IDeclareTransitArrivalDetails => ({
      ...state,
      purchaseOrders: map(state.purchaseOrders, (o: IPurchaseOrderTransitArrival) => {
        if (o.IdOcOrdenDeCompra === state.selectedPurchaseOrder.IdOcOrdenDeCompra) {
          return {
            ...state.selectedPurchaseOrder,
            isSelected: o.IdOcOrdenDeCompra === purchaseOrderId,
          };
        } else if (o.IdOcOrdenDeCompra === purchaseOrderId) {
          return {...o, isSelected: true};
        }
        return {...o, isSelected: false};
      }),
      selectedPurchaseOrder: filter(
        state.purchaseOrders,
        (o: IPurchaseOrderTransitArrival) => o.IdOcOrdenDeCompra === purchaseOrderId,
      )[0],
    }),
  ),
  on(
    declareTransitArrivalDetailsActions.SET_SELECTED_FILTER_BY_LETTER_DETAILS,
    (state: IDeclareTransitArrivalDetails, {filterByLetter}): IDeclareTransitArrivalDetails => ({
      ...state,
      filterByLetter,
    }),
  ),
  on(
    declareTransitArrivalDetailsActions.SET_SELECTED_FILTER_BY_LETTER,
    (state: IDeclareTransitArrivalDetails, {filterByLetter}): IDeclareTransitArrivalDetails => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        filterByLetter,
      },
    }),
  ),
  // FIXME: REVISAR TIPADOS
  /* on(
    declareTransitArrivalDetailsActions.INITIAL_PURCHASE_ORDER,
    (state: IDeclareTransitArrivalDetails, {order}): IDeclareTransitArrivalDetails => ({
      ...state,
      selectedPurchaseOrder: order,
      needsToReloadOrders: false,
    }),
  ),*/
  on(
    declareTransitArrivalDetailsActions.SET_PACKING_LIST_FILE,
    (state: IDeclareTransitArrivalDetails, {file}): IDeclareTransitArrivalDetails => ({
      ...state,
      packingList: file,
    }),
  ),
  on(
    declareTransitArrivalDetailsActions.SET_SELECTED_COUNTRY,
    (
      state: IDeclareTransitArrivalDetails,
      {node, itemId, country},
    ): IDeclareTransitArrivalDetails => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        [node]: map(state.selectedPurchaseOrder[node], (o: IItemsDeclareTransitArrival) => {
          if (o.IdOcPartida === itemId) {
            return {
              ...o,
              selectedCountry: country,
              /*lotsForDropDown: _.map(
                  _.filter(
                    o.ListaLotes,
                    (i: VLote) => i.IdcatPaisOrigen === country.value,
                  ),
                  (k: VLote) => ({value: k.IdLote, label: k.NombreLote}),
                ),*/
            };
          }
          return {...o};
        }),
      },
    }),
  ),
  on(
    declareTransitArrivalDetailsActions.SET_SELECTED_LOT,
    (state: IDeclareTransitArrivalDetails, {node, itemId, lot}): IDeclareTransitArrivalDetails => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        [node]: map(state.selectedPurchaseOrder[node], (o: IItemsDeclareTransitArrival) => {
          if (o.IdOcPartida === itemId) {
            return {
              ...o,
              selectedLot: lot,
              ocPartida: {
                ...o.ocPartida,
                IdLote: lot.value,
              },
              selectedCompleteLot: filter(o.ListaLotes, (i: VLote) => i.IdLote === lot.value)[0],
            };
          }
          return {...o};
        }),
      },
    }),
  ),
  on(
    declareTransitArrivalDetailsActions.SET_SELECTED_LOT_NAME,
    (state: IDeclareTransitArrivalDetails, {node, itemId, lot}): IDeclareTransitArrivalDetails => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        [node]: map(state.selectedPurchaseOrder[node], (o: IItemsDeclareTransitArrival) => {
          if (o.IdOcPartida === itemId) {
            return {
              ...o,
              newLot: {
                ...o.newLot,
                Nombre: lot,
              },
            };
          }
          return {...o};
        }),
      },
    }),
  ),
  on(
    declareTransitArrivalDetailsActions.SET_CHECK_WITHOUT_CERTIFICATE,
    (
      state: IDeclareTransitArrivalDetails,
      {node, itemId, value},
    ): IDeclareTransitArrivalDetails => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        [node]: map(state.selectedPurchaseOrder[node], (o: IItemsDeclareTransitArrival) => {
          if (o.IdOcPartida === itemId) {
            return {
              ...o,
              withoutCertificate: value,
              certificate: !value ? null : o.certificate,
            };
          }
          return {...o};
        }),
      },
    }),
  ),
  on(
    declareTransitArrivalDetailsActions.SET_ITEM_CERTIFICATE_FILE,
    (
      state: IDeclareTransitArrivalDetails,
      {node, itemId, file},
    ): IDeclareTransitArrivalDetails => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        [node]: map(state.selectedPurchaseOrder[node], (o: IItemsDeclareTransitArrival) => {
          if (o.IdOcPartida === itemId) {
            return {
              ...o,
              certificate: file,
            };
          }
          return {...o};
        }),
      },
    }),
  ),
  on(declareTransitArrivalDetailsActions.SET_ITEM_DOWN, (state, {itemId}) => ({
    ...state,
    selectedItems: itemId
      ? findIndex(
          state.selectedItems,
          (o: IItemsDeclareTransitArrival) => o.IdOcPartida === itemId,
        ) < 0
        ? [
            ...state.selectedItems,
            ...filter(state.selectedPurchaseOrder.items, (o) => o.IdOcPartida === itemId),
          ]
        : [...state.selectedItems]
      : [
          ...state.selectedItems,
          ...filter(
            state.selectedPurchaseOrder.items,
            (item: IItemsDeclareTransitArrival) =>
              !!(
                (!isEmpty(item.selectedCountry) &&
                  ((item.isPublish && item.newLot.Nombre) ||
                    (!item.isPublish &&
                      (!isEmpty(item.selectedLot) || item.newLot.Nombre) &&
                      (item.certificate || item.withoutCertificate)))) ||
                (!item.isPublish &&
                  !isEmpty(item.selectedCountry) &&
                  isEmpty(item.selectedLot) &&
                  !item.newLot.Nombre &&
                  item.withoutCertificate)
              ),
          ),
        ],
  })),
  on(declareTransitArrivalDetailsActions.DELETE_ITEM_DOWN, (state, {itemId}) => ({
    ...state,
    selectedItems: itemId ? filter(state.selectedItems, (o) => o.IdOcPartida !== itemId) : [],
  })),
);
