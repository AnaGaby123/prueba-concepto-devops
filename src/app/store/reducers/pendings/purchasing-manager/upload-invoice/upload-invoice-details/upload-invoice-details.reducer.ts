import {ActionReducer, createReducer, on} from '@ngrx/store';
/*Utils Imports*/
import {filter, findIndex, isEmpty, map as _map} from 'lodash-es';

/*Models Imports*/
import {
  initialDataInvoice,
  initialImportAmount,
  initialIUploadInvoiceDetails,
  IPurchaseItemUploadInvoice,
  IPurchaseOrderOc,
  IUploadInvoiceDetails,
} from '@appModels/store/pendings/purchasing-manager/upload-invoice/upload-invoice-details/upload-invoice-details.models';
/*Actions Imports*/
import {
  uploadInvoiceActions,
  uploadInvoiceDetailsActions,
} from '@appActions/pendings/purchasing-manager/upload-invoice';

export const uploadInvoiceDetailsReducer: ActionReducer<IUploadInvoiceDetails> = createReducer(
  {...initialIUploadInvoiceDetails()},
  on(uploadInvoiceActions.CLEAN_ALL_DETAILS, (state) => initialIUploadInvoiceDetails()),
  on(uploadInvoiceDetailsActions.SET_OPTION_SORT, (state, {sort}) => ({
    ...state,
    sortSelected: sort,
  })),
  on(uploadInvoiceDetailsActions.SET_TERM_SEARCH, (state, {searchTerm}) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
      searchTerm,
    },
  })),
  on(uploadInvoiceDetailsActions.SET_CURRENT_PROVIDER, (state, {provider}) => ({
    ...state,
    providerSelected: provider,
  })),
  on(uploadInvoiceDetailsActions.FETCH_PURCHASE_ORDERS_SUCCESS, (state, {purchaseOrder}) => ({
    ...state,
    purchaseOrder: {
      ...state.purchaseOrder,
      TotalResults: purchaseOrder.TotalResults,
      Results:
        state.queryInfo.desiredPage === 1
          ? [...purchaseOrder.Results]
          : [...state.purchaseOrder.Results, ...purchaseOrder.Results],
    },
  })),
  on(
    uploadInvoiceDetailsActions.FETCH_SELECTED_PURCHASE_ORDER_SUCCESS,
    (state, {purchaseOrder}) => ({
      ...state,
      orderSelected: {...state.orderSelected, ...purchaseOrder},
      purchaseOrder: {
        ...state.purchaseOrder,
        Results: _map(state.purchaseOrder.Results, (o: IPurchaseOrderOc) => {
          if (o.IdOcOrdenDeCompra === purchaseOrder.IdOcOrdenDeCompra) {
            return {...o, ...purchaseOrder};
          }
          return {...o};
        }),
      },
    }),
  ),
  on(uploadInvoiceDetailsActions.CLEAN_INVOICE_LOCAL_DATA, (state: IUploadInvoiceDetails) => ({
    ...state,
    itemsInvoice: [],
    dataInvoice: {...initialDataInvoice()},
    importAmount: {...initialImportAmount()},
  })),
  on(uploadInvoiceDetailsActions.CLEAN_INPUTS_FILES, (state: IUploadInvoiceDetails) => ({
    ...state,
    itemsInvoice: [],
    dataInvoice: {...state.dataInvoice, showInputsFiles: false},
  })),
  on(uploadInvoiceDetailsActions.FETCH_PURCHASE_ORDERS_LOAD, (state, {isFirstPage}) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: isFirstPage ? 1 : state.queryInfo.desiredPage + 1,
    },
  })),
  on(uploadInvoiceDetailsActions.FETCH_MORE_PURCHASE_ORDER, (state, {isFirstPage}) => ({
    ...state,
    queryInfo: {
      ...state.queryInfo,
      desiredPage: isFirstPage ? 1 : state.queryInfo.desiredPage + 1,
    },
  })),
  on(uploadInvoiceDetailsActions.FETCH_ITEMS_PURCHASE_ORDER_LOAD, (state, {oc}) => ({
    ...state,
    orderSelected: oc,
  })),
  on(uploadInvoiceDetailsActions.FETCH_ITEMS_PURCHASE_ORDER_SUCCESS, (state, {items}) => ({
    ...state,
    orderSelected: {...state.orderSelected, items, needsToReloadItems: false},
  })),
  on(uploadInvoiceDetailsActions.SET_ITEM_INVOICE, (state, {item}) => ({
    ...state,
    itemsInvoice:
      findIndex(
        state.itemsInvoice,
        (o: IPurchaseItemUploadInvoice) => o.IdOcPartida === item.IdOcPartida,
      ) < 0
        ? [...state.itemsInvoice, item]
        : [...state.itemsInvoice],
    orderSelected: {
      ...state.orderSelected,
      items: filter(state.orderSelected.items, (o) => o.IdOcPartida !== item.IdOcPartida),
    },
  })),
  on(uploadInvoiceDetailsActions.DELETE_ITEM_INVOICE, (state, {item}) => ({
    ...state,
    itemsInvoice: filter(state.itemsInvoice, (o) => o.IdOcPartida !== item.IdOcPartida),
    orderSelected:
      state.orderSelected.IdOcOrdenDeCompra === item.IdOcOrdenDeCompra
        ? {
            ...state.orderSelected,
            items: [...state.orderSelected.items, item],
          }
        : {...state.orderSelected},
    purchaseOrder:
      state.orderSelected.IdOcOrdenDeCompra !== item.IdOcOrdenDeCompra
        ? {
            ...state.purchaseOrder,
            Results: _map(state.purchaseOrder.Results, (o: IPurchaseOrderOc) => {
              if (o.IdOcOrdenDeCompra === item.IdOcOrdenDeCompra) {
                return {...o, items: [...o.items, item]};
              }
              return {...o};
            }),
          }
        : {...state.purchaseOrder},
  })),
  on(uploadInvoiceDetailsActions.SELECTED_PURCHASE_ORDER, (state, {order}) => ({
    ...state,
    purchaseOrder:
      state.itemsInvoice.length > 0
        ? {...state.purchaseOrder}
        : {
            ...state.purchaseOrder,
            Results: _map(state.purchaseOrder.Results, (o: IPurchaseOrderOc) => {
              if (o.IdOcOrdenDeCompra === state.orderSelected.IdOcOrdenDeCompra) {
                return {...o, ...state.orderSelected};
              }
              return {...o};
            }),
          },
    orderSelected: state.itemsInvoice.length > 0 ? {...state.orderSelected} : order,
    invalidateSelected: state.itemsInvoice.length > 0,
  })),
  on(uploadInvoiceDetailsActions.SET_STATUS_POP_UP, (state) => ({
    ...state,
    invalidateSelected: false,
  })),
  on(uploadInvoiceDetailsActions.SET_PARAM_INVOICE, (state, {value, param}) => {
    return {...state, dataInvoice: {...state.dataInvoice, [param]: value}};
  }),
  on(uploadInvoiceDetailsActions.SET_CALCULATED_DATA, (state, {amounts}) => ({
    ...state,
    importAmount: amounts,
  })),
  on(uploadInvoiceDetailsActions.SET_STATUS_API_ORDERS, (state, {status}) => ({
    ...state,
    queryInfo: {...state.queryInfo, requestStatus: status},
  })),
  on(uploadInvoiceDetailsActions.MODIFIED_PRICE_ITEM_SUCCESS, (state, {item}) => ({
    ...state,
    orderSelected: {
      ...state.orderSelected,
      items: _map(state.orderSelected.items, (o) => {
        if (item.IdProducto === o.IdProducto) {
          return {...item};
        }
        return o;
      }),
    },
    itemsInvoice: _map(state.itemsInvoice, (o) => {
      if (item.IdProducto === o.IdProducto) {
        return {...item};
      }
      return o;
    }),
  })),
  on(uploadInvoiceDetailsActions.PROVIDER_IS_NATIONAL, (state, {isNational}) => ({
    ...state,
    isNational,
  })),

  on(
    uploadInvoiceDetailsActions.SET_PROVIDER_CONTACT,
    (state: IUploadInvoiceDetails, {contacts}): IUploadInvoiceDetails => ({
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
    uploadInvoiceDetailsActions.SET_SELECTED_CONTACT_PROVIDER,
    (state: IUploadInvoiceDetails, {contactSelected}): IUploadInvoiceDetails => ({
      ...state,
      selectedProviderContact: contactSelected,
    }),
  ),
);
