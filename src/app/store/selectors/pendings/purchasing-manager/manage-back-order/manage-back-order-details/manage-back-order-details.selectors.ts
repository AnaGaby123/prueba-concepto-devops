import {createSelector} from '@ngrx/store';
/*Selectors Imports*/
import {selectDataDetails} from '@appSelectors/pendings/purchasing-manager/manage-back-order/manage-back-order.selectors';
/*Models Imports*/
import {ITabOption} from '@appModels/botonera/botonera-option';
import {filter, find, isEmpty, map as _map, sumBy} from 'lodash-es';

import {ICard} from '@appModels/card/card';
import {
  IFamiliesBackOrder,
  IItems,
  IManageBackOrderDetails,
  initialITotalsList,
  IOrdersBackOrder,
  IProduct,
  ITotalsList,
} from '@appModels/store/pendings/purchasing-manager/manage-back-order/manage-back-order-details/manage-back-order-details.models';
import {ContactoDetalleProvObj} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/process-purchase/process-purchase-list/process-purchase-list.models';
import {IProviderContact} from '@appModels/provider-contacts/provider-contacts.model';

export const selectManageBackOrderDetails = createSelector(selectDataDetails, (state) => state);
export const selectOptionsFilter = createSelector(
  selectDataDetails,
  (state): Array<ITabOption> => {
    return [
      {id: '1', label: 'POR CANCELAR'},
      {id: '2', label: 'POR GESTIONAR'},
    ];
  },
);
export const selectSelectedTab = createSelector(
  selectDataDetails,
  (state: IManageBackOrderDetails): ITabOption => state.filterSelected,
);
export const selectProvider = createSelector(
  selectDataDetails,
  (state: IManageBackOrderDetails) => state.provider,
);
export const selectFamilies = createSelector(
  selectDataDetails,
  (state: IManageBackOrderDetails) => state.families,
);
export const selectFamily = createSelector(
  selectDataDetails,
  (state: IManageBackOrderDetails): IFamiliesBackOrder => state.selectedFamily,
);
export const selectProviderContacts = createSelector(
  selectDataDetails,
  (state: IManageBackOrderDetails) => state.providerContacts,
);

export const selectedDropListProviderContact = createSelector(
  selectDataDetails,
  (state: IManageBackOrderDetails) => state.selectedProviderContact,
);
export const selectContactsProviderDropList = createSelector(
  selectProviderContacts,
  (contacts: Array<ContactoDetalleProvObj>): Array<DropListOption> =>
    !isEmpty(contacts)
      ? contacts.map((item: ContactoDetalleProvObj) => {
          return {
            value: item.IdContactoProveedor,
            label: item.Nombres + ' ' + item.ApellidoPaterno + ' ' + item.ApellidoMaterno,
          };
        })
      : [],
);
export const selectedProviderContact = createSelector(
  [selectProviderContacts, selectProvider, selectedDropListProviderContact],
  (
    contactList: Array<ContactoDetalleProvObj>,
    provider: IProvider,
    selectedContact: DropListOption,
  ): IProviderContact => {
    const selectedFilteredContact: ContactoDetalleProvObj = find(
      contactList,
      (o: ContactoDetalleProvObj) => o.IdContactoProveedor === selectedContact.value,
    );
    return selectedFilteredContact
      ? {
          fullName:
            selectedFilteredContact?.Nombres +
            ' ' +
            selectedFilteredContact?.ApellidoPaterno +
            ' ' +
            selectedFilteredContact?.ApellidoMaterno,
          providerName: provider?.Nombre,
          Mail: selectedFilteredContact?.Mail,
          NumeroTelefonico: selectedFilteredContact?.NumeroTelefonico,
          Departamento: selectedFilteredContact?.Departamento,
          Puesto: selectedFilteredContact?.Puesto,
          NivelDecision: selectedFilteredContact?.NivelDecision,
          IdContactoProveedor: selectedFilteredContact?.IdContactoProveedor,
        }
      : null;
  },
);
export const selectCardFamilies = createSelector(
  [selectFamilies, selectFamily],
  (list, selectedDFamily): Array<ICard> =>
    _map(list, (family: IFamiliesBackOrder) => {
      return {} as ICard;
    }),
);

export const selectOrder = createSelector(
  selectFamily,
  (family): IOrdersBackOrder =>
    !isEmpty(family) ? family.selectedOrder : ({} as IOrdersBackOrder),
);
export const selectListPrincipal = createSelector(
  selectFamily,
  selectSelectedTab,
  (family, tab) => {
    return tab.id === '1' ? family.orders : family.products;
  },
);
export const selectProduct = createSelector(
  selectFamily,
  (family): IProduct =>
    !isEmpty(family) && !isEmpty(family.selectedProduct)
      ? family.selectedProduct
      : ({} as IProduct),
);
export const selectListItems = createSelector(
  selectFamily,
  selectSelectedTab,
  (family, tab): Array<IItems> => {
    if (
      (!isEmpty(family) && tab.id === '1' && !isEmpty(family.selectedOrder.items)) ||
      (tab.id === '2' && !isEmpty(family.selectedProduct.items))
    ) {
      return tab.id === '1' ? family.selectedOrder.items : family.selectedProduct.items;
    }
    return [];
  },
);
export const selectStatus = createSelector(
  selectDataDetails,
  (state: IManageBackOrderDetails): DropListOption => state.selectedStatus,
);
export const selectActiveRegister = createSelector(
  selectSelectedTab,
  selectFamily,
  selectStatus,
  (tab, family, status): boolean => {
    if (!isEmpty(family)) {
      if (tab.id === '1' && !isEmpty(family.selectedOrder)) {
        return (
          find(family.selectedOrder.items, (item) => item.sendStock || item.cancel) !== undefined
        );
      } else if (tab.id === '2' && !isEmpty(family.selectedProduct)) {
        return status.value !== '0';
      }
    }
    return false;
  },
);
export const selectStatusList = createSelector(selectDataDetails, (state) => state.statusList);

export const selectActivePop = createSelector(selectDataDetails, (state) => state.activePopProduct);
export const selectItemsCancel = createSelector(selectOrder, (state) =>
  filter(state.items, (item) => item.cancel),
);
export const selectItemsSotck = createSelector(selectOrder, (state) =>
  filter(state.items, (item) => item.sendStock),
);
export const selectStatusApiItems = createSelector(
  selectSelectedTab,
  selectProduct,
  selectOrder,
  (tab, product, order): boolean => {
    if (tab.id === '1') {
      return order.statusApiItems === 1;
    } else {
      return product.statusApiItems === 1;
    }
  },
);
export const selectTotalsList = createSelector(
  selectListPrincipal,
  selectSelectedTab,
  (list: IOrdersBackOrder[] & IProduct[], tab) => {
    const totals: ITotalsList = initialITotalsList();
    if (list) {
      totals.pieces = sumBy(list, (item) =>
        tab.id === '1' ? item.NumeroDePiezas : item.PiezasTotales,
      );
      if (tab.id === '1') {
        totals.products = sumBy(list, (item) => item.Productos);
      }
      totals.amount = sumBy(list, (item) => (tab.id === '1' ? item.TotalUSD : item.CostoTotal));
    }
    return totals;
  },
);
export const selectTotalsItem = createSelector(
  selectListItems,
  (list: Array<IItems>): ITotalsList => {
    const totals: ITotalsList = initialITotalsList();
    if (list) {
      totals.pieces = sumBy(list, (item) => item.NumeroDePiezas);
      totals.amount = sumBy(list, (item) => item.CostoTotal);
    }
    return totals;
  },
);
