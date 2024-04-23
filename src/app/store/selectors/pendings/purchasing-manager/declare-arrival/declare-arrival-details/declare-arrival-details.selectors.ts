import {createSelector} from '@ngrx/store';
import {selectDeclareArrivalDetails} from '@appSelectors/pendings/purchasing-manager/declare-arrival/declare-arrival.selectors';
import {
  IDeclareArrivalDetails,
  IDeclareArrivalTotals,
  IItemsDeclareArrival,
  IPurchaseOrderArrival,
  TIMES,
} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-details/declare-arrival-details.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {differenceWith, filter, find, flow, isEmpty, isEqual, map as _map, sumBy} from 'lodash-es';
import {IListTotals} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';
import {FiltersOnlyActive, IFilters} from '@appModels/filters/Filters';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-list/declare-arrival-list.models';
import {OcPackingList} from 'api-logistica';
import {ContactoDetalleProvObj} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IProviderContact} from '@appModels/provider-contacts/provider-contacts.model';

export const selectDetails = createSelector(
  selectDeclareArrivalDetails,
  (state: IDeclareArrivalDetails): IDeclareArrivalDetails => state,
);
export const selectNeedsToReloadOrders = createSelector(
  selectDetails,
  (state: IDeclareArrivalDetails): boolean => state?.needsToReloadOrders,
);
export const selectTabOptions = createSelector(
  selectDetails,
  (state: IDeclareArrivalDetails): Array<ITabOption> =>
    !isEmpty(state.selectedProvider)
      ? _map(state?.tabOptions, (o: ITabOption) => ({
          ...o,
          totalSubtitle:
            o.id === '1'
              ? state.selectedProvider.TotalOrdenesDeCompra
              : o.id === '2'
              ? state.selectedProvider.TotalFueraDeTiempo
              : o.id === '3'
              ? state.selectedProvider.TotalUrgente
              : state.selectedProvider.TotalEnTiempo,
        }))
      : state?.tabOptions,
);
export const selectPurchaseOrders = createSelector(
  selectDetails,
  (state: IDeclareArrivalDetails): Array<IPurchaseOrderArrival> => state?.purchaseOrders,
);
export const selectedOrder = createSelector(
  selectDetails,
  (state: IDeclareArrivalDetails): IPurchaseOrderArrival => state?.selectedPurchaseOrder,
);
export const selectedTabOption = createSelector(
  selectDetails,
  (state: IDeclareArrivalDetails): ITabOption => state?.selectedTabOption,
);
export const selectSortList = createSelector(
  selectDetails,
  (state: IDeclareArrivalDetails) => state.dataByType,
);
export const selectSort = createSelector(
  selectDetails,
  (state: IDeclareArrivalDetails) => state.filterByType,
);
export const selectGetOrdersFilters = createSelector(
  selectDetails,
  (state: IDeclareArrivalDetails): IFilters => {
    const params = new FiltersOnlyActive();
    params.Filters.push({
      NombreFiltro: 'IdProveedor',
      ValorFiltro: state?.selectedProvider.IdProveedor,
    });
    if (state?.selectedTabOption?.id !== '1') {
      params.Filters.push({
        NombreFiltro: TIMES[state?.selectedTabOption?.id],
        ValorFiltro: true,
      });
    }
    if (state?.searchTerm) {
      params.Filters.push({
        NombreFiltro: 'NumeroOrdenDeCompra',
        ValorFiltro: state?.searchTerm,
      });
    }
    params.SortField = 'TotalUSD';
    params.SortDirection = state.filterByType.value === '1' ? 'desc' : 'asc';
    return params;
  },
);
export const selectGetItemsFilters = createSelector(
  selectedOrder,
  (order: IPurchaseOrderArrival): IFilters => {
    const params = new FiltersOnlyActive(true);
    params.Filters.push(
      {
        NombreFiltro: 'IdOcOrdenDeCompra',
        ValorFiltro: order.IdOcOrdenDeCompra,
      },
      {
        NombreFiltro: 'PHS',
        ValorFiltro: false,
      },
      {
        NombreFiltro: 'CDConfirmado',
        ValorFiltro: true,
      },
      {
        NombreFiltro: 'PackingListDeclarado',
        ValorFiltro: false,
      },
    );
    params.SortField = 'Indice';
    params.SortDirection = 'asc';
    return params;
  },
);
export const selectProvider = createSelector(
  selectDetails,
  (state: IDeclareArrivalDetails): IProvider => state.selectedProvider,
);
export const selectPackingList = createSelector(
  selectDetails,
  (state: IDeclareArrivalDetails): File => state.packingList,
);
export const selectOcPackingList = createSelector(
  selectDetails,
  (state: IDeclareArrivalDetails): OcPackingList => state.ocPackingList,
);
export const selectedListTotals = createSelector(
  [selectDetails, selectProvider],
  (state: IDeclareArrivalDetails, provider: IProvider): IListTotals => ({
    number: state?.purchaseOrders?.length,
    pieces: provider?.NumeroDePiezas,
    amount: provider?.TotalUSD,
  }),
);
export const selectedItems = createSelector(
  selectDetails,
  (state: IDeclareArrivalDetails): Array<IItemsDeclareArrival> => state?.selectedItems,
);
export const selectedFilteredItems = createSelector(
  selectDetails,
  (state: IDeclareArrivalDetails): Array<IItemsDeclareArrival> =>
    !isEmpty(state.filterByLetter)
      ? filter(
          state?.selectedItems,
          (o: IItemsDeclareArrival) => o.Initial === state.filterByLetter.label,
        )
      : state?.selectedItems,
);

export const selectProviderContacts = createSelector(
  selectDetails,
  (state: IDeclareArrivalDetails) => state.providerContacts,
);

export const selectedDropListProviderContact = createSelector(
  selectDetails,
  (state: IDeclareArrivalDetails) => state.selectedProviderContact,
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
          providerName: provider?.NombreProveedor,
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
export const selectItems = createSelector(
  [selectedOrder, selectedItems],
  (
    state: IPurchaseOrderArrival,
    configuredItems: Array<IItemsDeclareArrival>,
  ): Array<IItemsDeclareArrival> =>
    flow(
      () => differenceWith(state?.items, configuredItems, isEqual),
      (items) =>
        !isEmpty(state.filterByLetter)
          ? filter(items, (o: IItemsDeclareArrival) => o.Initial === state.filterByLetter.label)
          : items,
    )(),
);
export const selectTotalsItems = createSelector(
  selectItems,
  (items: Array<IItemsDeclareArrival>): IDeclareArrivalTotals => ({
    length: items.length,
    price: sumBy(items, (o: IItemsDeclareArrival) => Number(o.PrecioLista)),
    quantity: sumBy(items, (o: IItemsDeclareArrival) => Number(o.NumeroDePiezas)),
    amount: sumBy(items, (o: IItemsDeclareArrival) => Number(o.TotalPartida)),
  }),
);
export const selectTotalsSelectedItems = createSelector(
  selectedItems,
  (items: Array<IItemsDeclareArrival>): IDeclareArrivalTotals => ({
    length: items.length,
    price: sumBy(items, (o: IItemsDeclareArrival) => Number(o.PrecioLista)),
    quantity: sumBy(items, (o: IItemsDeclareArrival) => Number(o.NumeroDePiezas)),
    amount: sumBy(items, (o: IItemsDeclareArrival) => Number(o.TotalPartida)),
  }),
);
export const validatorForGenerateButton = createSelector(
  [selectDetails, selectedItems],
  (state: IDeclareArrivalDetails, configuredItems: Array<IItemsDeclareArrival>): boolean =>
    !!(!isEmpty(configuredItems) && state.packingList),
);
