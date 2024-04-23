import {ActionReducer, createReducer, on} from '@ngrx/store';
import {isEmpty, map as _map} from 'lodash-es';

/*Models Imports*/
import {
  IFamiliesBackOrder,
  IManageBackOrderDetails,
  initialIManageBackOrderDetails,
  IOrdersBackOrder,
} from '@appModels/store/pendings/purchasing-manager/manage-back-order/manage-back-order-details/manage-back-order-details.models';
/*Selectors Imports*/
import {manageBackOrderDetailsActions} from '@appActions/pendings/purchasing-manager/manage-back-order';

export const manageBackOrderDetailsReducer: ActionReducer<IManageBackOrderDetails> = createReducer(
  {...initialIManageBackOrderDetails()},
  on(manageBackOrderDetailsActions.CLEAN_ALL_STATE, (state) => initialIManageBackOrderDetails()),
  on(manageBackOrderDetailsActions.SET_PROVIDER_SELECTED, (state, {provider}) => ({
    ...state,
    provider,
  })),
  on(manageBackOrderDetailsActions.FETCH_FAMILIES_SUCCESS, (state, {families}) => ({
    ...state,
    families,
    selectedFamily: families.length > 0 ? families[0] : ({} as IFamiliesBackOrder),
  })),
  on(manageBackOrderDetailsActions.FETCH_ORDERS_SUCCESS, (state, {orders}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      orders,
      needsToReloadOrders: false,
      selectedOrder: orders.length > 0 ? orders[0] : ({} as IOrdersBackOrder),
    },
  })),
  // FIXME: CORREGIR TIPADOS
  /*  on(manageBackOrderDetailsActions.FETCH_ITEMS_SUCCESS, (state: IManageBackOrderDetails, {items}): IManageBackOrderDetails => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      selectedOrder: {
        ...state.selectedFamily.selectedOrder,
        items
      },
    },
  })),*/
  // FIXME: Corregir por cambio en modelos
  /*on(manageBackOrderDetailsActions.SELECTED_FAMILY, (state, {idFamily}) => ({
    ...state,
    families: _.map(state.families, (family: IFamiliesBackOrder) => {
      if (family.IdFamilia === state.selectedFamily.IdFamilia) {
        return {
          ...family,
          ...state.selectedFamily,
          orders: _.map(
            state.selectedFamily.orders,
            (order: IOrdersBackOrder) => {
              if (
                order.IdOcOrdenDeCompra ===
                state.selectedFamily.selectedOrder.IdOcOrdenDeCompra
              ) {
                return {...order, ...state.selectedFamily.selectedOrder};
              }
              return order;
            },
          ),
          products: _.map(
            state.selectedFamily.products,
            (product: IProduct) => {
              if (
                product.IdProducto ===
                state.selectedFamily.selectedProduct.IdProducto
              ) {
                return {...product, ...state.selectedFamily.selectedProduct};
              }
              return product;
            },
          ),
        };
      }
      return family;
    }),
    selectedFamily: _.filter(
      state.families,
      (family) => family.IdFamilia === idFamily,
    )[0],
  })),*/
  on(manageBackOrderDetailsActions.SET_FILTER_TYPE, (state, {filter}) => ({
    ...state,
    filterSelected: filter,
  })),
  // FIXME: Corregir por cambio en modelos
  /*on(manageBackOrderDetailsActions.FETCH_PRODUCTS_SUCCESS, (state, {list}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      products: list,
      needsToReloadProducts: false,
      selectedProduct: list.length > 0 ? list[0] : ({} as IProduct),
    },
  })),*/
  on(manageBackOrderDetailsActions.FETCH_ITEMS_PRODUCTS_SUCCESS, (state, {items}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      selectedProduct: {
        ...state.selectedFamily.selectedProduct,
        items,
        needsToReloadItems: false,
      },
    },
  })),
  on(
    manageBackOrderDetailsActions.SET_STATUS_ITEM,
    (state, {param, IdOcPartidaEdicionBackOrder}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        selectedOrder: {
          ...state.selectedFamily.selectedOrder,
          items: _map(state.selectedFamily.selectedOrder.items, (item) => {
            if (item.IdOcPartidaEdicionBackOrder === IdOcPartidaEdicionBackOrder) {
              return {
                ...item,
                sendStock: param === 'sendStock' ? !item.sendStock : false,
                cancel: param === 'cancel' ? !item.cancel : false,
              };
            }
            return {...item};
          }),
        },
      },
    }),
  ),
  on(manageBackOrderDetailsActions.SET_STATUS_PRODUCT, (state, {option}) => ({
    ...state,
    selectedStatus: option,
  })),
  on(manageBackOrderDetailsActions.SHOW_POP_UP, (state, {status}) => ({
    ...state,
    activePopProduct: status,
  })),
  on(manageBackOrderDetailsActions.SELECTED_PURCHASE_ORDER, (state, {oc}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      orders: _map(state.selectedFamily.orders, (order) => {
        if (state.selectedFamily.selectedOrder.IdOcOrdenDeCompra === order.IdOcOrdenDeCompra) {
          return {...order, ...state.selectedFamily.selectedOrder};
        }
        return order;
      }),
      selectedOrder: oc,
    },
  })),
  on(manageBackOrderDetailsActions.SELECTED_PRODUCT, (state, {product}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      products: _map(state.selectedFamily.products, (prod) => {
        if (state.selectedFamily.selectedProduct.IdProducto === prod.IdProducto) {
          return {...prod, ...state.selectedFamily.selectedProduct};
        }
        return {...prod};
      }),
      selectedProduct: product,
    },
  })),
  on(manageBackOrderDetailsActions.SET_STATUS_ITEMS, (state, {status, param, itemParam}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      [param]: {
        ...state.selectedFamily.selectedProduct,
        [itemParam]: status,
      },
    },
  })),
  on(manageBackOrderDetailsActions.GET_HISTORY_BACK_ORDER_SUCCESS, (state, {history}) => ({
    ...state,
    selectedFamily: {
      ...state.selectedFamily,
      selectedProduct: {
        ...state.selectedFamily.selectedProduct,
        history,
      },
    },
  })),
  on(
    manageBackOrderDetailsActions.SET_PROVIDER_CONTACT,
    (state: IManageBackOrderDetails, {contacts}): IManageBackOrderDetails => ({
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
    manageBackOrderDetailsActions.SET_SELECTED_CONTACT_PROVIDER,
    (state: IManageBackOrderDetails, {contactSelected}): IManageBackOrderDetails => ({
      ...state,
      selectedProviderContact: contactSelected,
    }),
  ),
);
