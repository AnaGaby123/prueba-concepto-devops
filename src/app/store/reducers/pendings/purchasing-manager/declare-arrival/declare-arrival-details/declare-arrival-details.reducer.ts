import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  IDeclareArrivalDetails,
  IItemsDeclareArrival,
  initialIDeclareArrivalDetails,
  initialOcPackingList,
  IPurchaseOrderArrival,
} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-details/declare-arrival-details.models';
import {declareArrivalDetailsActions} from '@appActions/pendings/purchasing-manager/declare-arrival';
import {filter, findIndex, isEmpty, map} from 'lodash-es';
import {VLote} from 'api-logistica';

export const declareArrivalDetailsReducer: ActionReducer<IDeclareArrivalDetails> = createReducer(
  initialIDeclareArrivalDetails(),
  on(
    declareArrivalDetailsActions.CLEAN_ALL_DETAILS_STATE,
    (): IDeclareArrivalDetails => ({
      ...initialIDeclareArrivalDetails(),
    }),
  ),
  on(
    declareArrivalDetailsActions.SET_SELECTED_PROVIDER,
    (state: IDeclareArrivalDetails, {selectedProvider}): IDeclareArrivalDetails => ({
      ...state,
      selectedProvider,
    }),
  ),
  on(
    declareArrivalDetailsActions.REFRESH_SELECTED_PROVIDER,
    (state: IDeclareArrivalDetails, {selectedProvider}): IDeclareArrivalDetails => ({
      ...state,
      selectedProvider: {
        Index: state.selectedProvider.Index,
        ...selectedProvider,
      },
    }),
  ),
  on(
    declareArrivalDetailsActions.SET_ITEMS_STATUS,
    (state: IDeclareArrivalDetails, {itemsStatus}): IDeclareArrivalDetails => ({
      ...state,
      itemsStatus,
    }),
  ),
  on(
    declareArrivalDetailsActions.SET_ORDERS_STATUS,
    (state: IDeclareArrivalDetails, {purchaseOrdersStatus}): IDeclareArrivalDetails => ({
      ...state,
      purchaseOrdersStatus,
    }),
  ),
  on(
    declareArrivalDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS,
    (state: IDeclareArrivalDetails, {orders}): IDeclareArrivalDetails => ({
      ...state,
      purchaseOrders: orders,
    }),
  ),
  on(
    declareArrivalDetailsActions.FETCH_ITEMS_SUCCESS,
    (state: IDeclareArrivalDetails, {list}): IDeclareArrivalDetails => ({
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
    declareArrivalDetailsActions.SET_SELECTED_TAB_OPTION,
    (state: IDeclareArrivalDetails, {selectedTabOption}): IDeclareArrivalDetails => ({
      ...state,
      selectedTabOption,
      needsToReloadOrders: true,
    }),
  ),
  on(
    declareArrivalDetailsActions.SET_SORT_SELECTED,
    (state: IDeclareArrivalDetails, {sort}): IDeclareArrivalDetails => ({
      ...state,
      filterByType: sort,
      needsToReloadOrders: true,
    }),
  ),
  on(
    declareArrivalDetailsActions.SET_SEARCH_TERM,
    (state: IDeclareArrivalDetails, {searchTerm}): IDeclareArrivalDetails => ({
      ...state,
      searchTerm,
      needsToReloadOrders: true,
    }),
  ),
  on(
    declareArrivalDetailsActions.GENERATE_SUCCESS,
    (state: IDeclareArrivalDetails): IDeclareArrivalDetails => ({
      ...state,
      needsToReloadOrders: true,
      selectedItems: [],
      packingList: null,
      ocPackingList: initialOcPackingList(),
    }),
  ),
  on(
    declareArrivalDetailsActions.SET_SELECTED_ORDER,
    (state: IDeclareArrivalDetails, {purchaseOrderId}): IDeclareArrivalDetails => ({
      ...state,
      purchaseOrders: map(state.purchaseOrders, (o: IPurchaseOrderArrival) => {
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
        (o: IPurchaseOrderArrival) => o.IdOcOrdenDeCompra === purchaseOrderId,
      )[0],
    }),
  ),
  on(
    declareArrivalDetailsActions.SET_SELECTED_FILTER_BY_LETTER_DETAILS,
    (state: IDeclareArrivalDetails, {filterByLetter}): IDeclareArrivalDetails => ({
      ...state,
      filterByLetter,
    }),
  ),
  on(
    declareArrivalDetailsActions.SET_SELECTED_FILTER_BY_LETTER,
    (state: IDeclareArrivalDetails, {filterByLetter}): IDeclareArrivalDetails => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        filterByLetter,
      },
    }),
  ),
  on(
    declareArrivalDetailsActions.INITIAL_PURCHASE_ORDER,
    (state: IDeclareArrivalDetails, {order}): IDeclareArrivalDetails => ({
      ...state,
      selectedPurchaseOrder: order,
      needsToReloadOrders: false,
    }),
  ),
  on(
    declareArrivalDetailsActions.SET_PACKING_LIST_FILE,
    (state: IDeclareArrivalDetails, {file}): IDeclareArrivalDetails => ({
      ...state,
      packingList: file,
    }),
  ),
  on(
    declareArrivalDetailsActions.SET_SELECTED_COUNTRY,
    (state: IDeclareArrivalDetails, {node, itemId, country}): IDeclareArrivalDetails => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        [node]: map(state.selectedPurchaseOrder[node], (o: IItemsDeclareArrival) => {
          if (o.IdOcPartida === itemId) {
            return {
              ...o,
              selectedCountry: country,
              /*lotsForDropDown: map(
                  filter(
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
    declareArrivalDetailsActions.SET_SELECTED_LOT,
    (state: IDeclareArrivalDetails, {node, itemId, lot}): IDeclareArrivalDetails => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        [node]: map(state.selectedPurchaseOrder[node], (o: IItemsDeclareArrival) => {
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
    declareArrivalDetailsActions.SET_SELECTED_LOT_NAME,
    (state: IDeclareArrivalDetails, {node, itemId, lot}): IDeclareArrivalDetails => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        [node]: map(state.selectedPurchaseOrder[node], (o: IItemsDeclareArrival) => {
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
    declareArrivalDetailsActions.SET_CHECK_WITHOUT_CERTIFICATE,
    (state: IDeclareArrivalDetails, {node, itemId, value}): IDeclareArrivalDetails => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        [node]: map(state.selectedPurchaseOrder[node], (o: IItemsDeclareArrival) => {
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
    declareArrivalDetailsActions.SET_ITEM_CERTIFICATE_FILE,
    (state: IDeclareArrivalDetails, {node, itemId, file}): IDeclareArrivalDetails => ({
      ...state,
      selectedPurchaseOrder: {
        ...state.selectedPurchaseOrder,
        [node]: map(state.selectedPurchaseOrder[node], (o: IItemsDeclareArrival) => {
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
  on(declareArrivalDetailsActions.SET_ITEM_DOWN, (state, {itemId}) => ({
    ...state,
    selectedItems: itemId
      ? findIndex(state.selectedItems, (o: IItemsDeclareArrival) => o.IdOcPartida === itemId) < 0
        ? [
            ...state.selectedItems,
            ...filter(state.selectedPurchaseOrder.items, (o) => o.IdOcPartida === itemId),
          ]
        : [...state.selectedItems]
      : [
          ...state.selectedItems,
          ...filter(
            state.selectedPurchaseOrder.items,
            (item: IItemsDeclareArrival) =>
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
  on(declareArrivalDetailsActions.DELETE_ITEM_DOWN, (state, {itemId}) => ({
    ...state,
    selectedItems: itemId ? filter(state.selectedItems, (o) => o.IdOcPartida !== itemId) : [],
  })),
  on(
    declareArrivalDetailsActions.SET_PROVIDER_CONTACT,
    (state: IDeclareArrivalDetails, {contacts}): IDeclareArrivalDetails => ({
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
    declareArrivalDetailsActions.SET_SELECTED_CONTACT_PROVIDER,
    (state: IDeclareArrivalDetails, {contactSelected}): IDeclareArrivalDetails => ({
      ...state,
      selectedProviderContact: contactSelected,
    }),
  ),
);
