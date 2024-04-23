/* Core Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectConfirmDispatchDetails} from '@appSelectors/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch.selectors';

/* Models Imports */
import {
  IConfirmDispatchDetails,
  IItem,
  IPurchaseOrder,
  ITotalsItems,
} from '@appModels/store/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch-details/confirm-dispatch-details.models';
import {IProvidersConfirmDispatch} from '@appModels/store/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch-list/confirm-dispatch-list.models';
import {QueryInfo} from 'api-logistica';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {
  IItemsConfigTotals,
  STATUS,
  TYPES_OF_CONFIG,
} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';

/* Common Protocols */
import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_DATE,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';

/* Utils Models */
import {concat, countBy, filter, find, flow, isEmpty, map as _map, sumBy} from 'lodash-es';

import {ContactoDetalleProvObj} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IProviderContact} from '@appModels/provider-contacts/provider-contacts.model';

export const selectSearchTerm = createSelector(
  selectConfirmDispatchDetails,
  (state: IConfirmDispatchDetails) => state.searchTerm,
);
export const selectTabs = createSelector(
  selectConfirmDispatchDetails,
  (state: IConfirmDispatchDetails) => state.tabsTotals,
);
export const selectTabSelected = createSelector(
  selectConfirmDispatchDetails,
  (state: IConfirmDispatchDetails) => state.tabSelected,
);
export const selectTViewMode = createSelector(
  selectConfirmDispatchDetails,
  (state: IConfirmDispatchDetails) => state.viewMode,
);
export const selectedProviderId = createSelector(
  selectConfirmDispatchDetails,
  (state: IConfirmDispatchDetails): string => state.providerSelected?.IdProveedor,
);
export const selectTabsWithTotals = createSelector(
  selectConfirmDispatchDetails,
  (state: IConfirmDispatchDetails): Array<ITabOption> =>
    !isEmpty(state.providerSelected)
      ? _map(state?.tabsTotals, (o: ITabOption) => ({
          ...o,
          totalSubtitle:
            o.id === '1'
              ? state.providerSelected.TotalPiezas
              : o.id === '2'
              ? state.providerSelected.TRTresMasDias
              : o.id === '3'
              ? state.providerSelected.TRTresDias
              : o.id === '4'
              ? state.providerSelected.TRDosDias
              : state.providerSelected.TRUnDia,
        }))
      : state?.tabsTotals,
);
export const selectQueryInfoItemsInSummary = createSelector(
  selectConfirmDispatchDetails,
  (state: IConfirmDispatchDetails) => {
    const queryInfo: QueryInfo = {};
    queryInfo.Filters = [
      {
        NombreFiltro: 'IdProveedor',
        ValorFiltro: state.providerSelected.IdProveedor,
      },
      {
        NombreFiltro: 'CDConfirmado',
        ValorFiltro: false,
      },
      {
        NombreFiltro: 'CDResumen',
        ValorFiltro: true,
      },
    ];
    queryInfo.SortField = 'Indice';
    queryInfo.SortDirection = 'asc';
    return queryInfo;
  },
);
export const selectNeedsToReloadItemsInSummary = createSelector(
  selectConfirmDispatchDetails,
  (state: IConfirmDispatchDetails) => state.itemsInSummaryNeedsToReload,
);
export const selectItemsInSummary = createSelector(
  selectConfirmDispatchDetails,
  (state: IConfirmDispatchDetails) => state.itemsInSummary,
);
export const selectItemsInSummaryIsLoading = createSelector(
  selectConfirmDispatchDetails,
  (state: IConfirmDispatchDetails) =>
    state.itemsInSummaryStatus === API_REQUEST_STATUS_DEFAULT ||
    state.itemsInSummaryStatus === API_REQUEST_STATUS_LOADING,
);
export const selectProviderSelected = createSelector(
  selectConfirmDispatchDetails,
  (state: IConfirmDispatchDetails) => state.providerSelected,
);
export const selectPackingListFile = createSelector(
  selectConfirmDispatchDetails,
  (state: IConfirmDispatchDetails) => state.packingListFile,
);
export const selectGuideFile = createSelector(
  selectConfirmDispatchDetails,
  (state: IConfirmDispatchDetails) => state.guideFile,
);
export const selectArrivalList = createSelector(
  selectConfirmDispatchDetails,
  (state: IConfirmDispatchDetails) => state.arrivalList,
);
export const selectedFreightOption = createSelector(
  selectConfirmDispatchDetails,
  (state: IConfirmDispatchDetails) => state.selectedFreightOption,
);
export const selectOcPackingList = createSelector(
  selectConfirmDispatchDetails,
  (state: IConfirmDispatchDetails) => state.ocPackingList,
);
export const selectNeedsToReloadPurchaseOrders = createSelector(
  selectConfirmDispatchDetails,
  (state: IConfirmDispatchDetails) => state.purchaseOrdersNeedsToReload,
);
export const selectProviderContacts = createSelector(
  selectConfirmDispatchDetails,
  (state: IConfirmDispatchDetails) => state.providerContacts,
);

export const selectedDropListProviderContact = createSelector(
  selectConfirmDispatchDetails,
  (state: IConfirmDispatchDetails) => state.selectedProviderContact,
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
  [selectProviderContacts, selectProviderSelected, selectedDropListProviderContact],
  (
    contactList: Array<ContactoDetalleProvObj>,
    provider: IProvidersConfirmDispatch,
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

export const selectQueryInfoPurchaseOrders = createSelector(
  [selectProviderSelected, selectSearchTerm, selectTabSelected],
  (providerSelected: IProvidersConfirmDispatch, searchTerm: string, tabSelected: ITabOption) => {
    const queryInfo: QueryInfo = {};
    queryInfo.Filters = [];
    queryInfo.Filters.push({
      NombreFiltro: 'IdProveedor',
      ValorFiltro: providerSelected.IdProveedor,
    });
    queryInfo.Filters.push({
      NombreFiltro: 'IdImpListaArribo',
      ValorFiltro: null,
    });
    if (searchTerm !== '') {
      queryInfo.Filters.push({
        NombreFiltro: 'OrdenDeCompra',
        ValorFiltro: searchTerm,
      });
    }

    if (tabSelected.label === '3 + Días') {
      queryInfo.Filters.push({
        NombreFiltro: 'TiempoDeReferencia',
        ValorFiltro: '3 + Días',
      });
    } else if (tabSelected.label === '3 Días') {
      queryInfo.Filters.push({
        NombreFiltro: 'TiempoDeReferencia',
        ValorFiltro: '3 Días',
      });
    } else if (tabSelected.label === '2 Días') {
      queryInfo.Filters.push({
        NombreFiltro: 'TiempoDeReferencia',
        ValorFiltro: '2 Días',
      });
    } else if (tabSelected.label === '1 Días') {
      queryInfo.Filters.push({
        NombreFiltro: 'TiempoDeReferencia',
        ValorFiltro: '1 Días',
      });
    }

    return queryInfo;
  },
);
export const selectPurchaseOrders = createSelector(
  selectConfirmDispatchDetails,
  (state: IConfirmDispatchDetails) => state.purchaseOrders,
);
export const selectIsLoadingPurchaseOrders = createSelector(
  selectConfirmDispatchDetails,
  (state: IConfirmDispatchDetails) =>
    state.purchaseOrdersStatus === API_REQUEST_STATUS_DEFAULT ||
    state.purchaseOrdersStatus === API_REQUEST_STATUS_LOADING,
);
export const selectPurchaseOrderSelected = createSelector(
  selectConfirmDispatchDetails,
  (state: IConfirmDispatchDetails) =>
    !isEmpty(state.purchaseOrderSelected)
      ? state.purchaseOrderSelected
      : {
          Index: 0,
          isSelected: false,
          items: [],
          itemsStatus: API_REQUEST_STATUS_SUCCEEDED,
          itemsNeedsToReload: true,
          FEEProximaSemaforo: DEFAULT_DATE,
          FechaEstimadaEntrega: DEFAULT_DATE,
          IdImpListaArribo: DEFAULT_UUID,
          IdOcOrdenDeCompra: DEFAULT_UUID,
          IdOcPackingList: DEFAULT_UUID,
          IdProveedor: DEFAULT_UUID,
          NumeroOrdenDeCompra: 'NA',
          PartidasFExpress: 0,
          PartidasFNormal: 0,
          PartidasProgramadas: 0,
          PartidasUnicas: 0,
          TiempoDeReferencia: 'NA',
          TotalPiezas: 0,
          TotalProductos: 0,
          TotalUSD: 0,
        },
);
export const selectedOrderId = createSelector(
  selectPurchaseOrderSelected,
  (purchaseOrderSelected: IPurchaseOrder): string => purchaseOrderSelected?.IdOcOrdenDeCompra,
);
export const selectNeedsToReloadItemsCurrentOC = createSelector(
  selectPurchaseOrderSelected,
  (purchaseOrderSelected: IPurchaseOrder) => purchaseOrderSelected?.itemsNeedsToReload,
);
export const selectIsLoadingItemsCurrentOC = createSelector(
  selectPurchaseOrderSelected,
  (purchaseOrderSelected: IPurchaseOrder) =>
    purchaseOrderSelected?.itemsStatus === API_REQUEST_STATUS_DEFAULT ||
    purchaseOrderSelected?.itemsStatus === API_REQUEST_STATUS_LOADING,
);
export const selectQueryInfoItems = createSelector(
  selectPurchaseOrderSelected,
  (purchaseOrderSelected: IPurchaseOrder) => {
    const queryInfo: QueryInfo = {};
    queryInfo.Filters = [
      {
        NombreFiltro: 'IdOcPackingList',
        ValorFiltro: purchaseOrderSelected?.IdOcPackingList,
      },
      {
        NombreFiltro: 'IdOcOrdenDeCompra',
        ValorFiltro: purchaseOrderSelected?.IdOcOrdenDeCompra,
      },
      {
        NombreFiltro: 'CDConfirmado',
        ValorFiltro: false,
      },
      {
        NombreFiltro: 'CDResumen',
        ValorFiltro: false,
      },
      {
        NombreFiltro: 'CDBackOrder',
        ValorFiltro: false,
      },
      {
        NombreFiltro: 'CDCancelar',
        ValorFiltro: false,
      },
    ];
    queryInfo.SortField = 'Indice';
    queryInfo.SortDirection = 'asc';
    return queryInfo;
  },
);
export const selectItems = createSelector(
  selectPurchaseOrderSelected,
  (purchaseOrderSelected: IPurchaseOrder): Array<Array<IItem>> =>
    !isEmpty(purchaseOrderSelected) ? purchaseOrderSelected?.items : [],
);
export const selectPlainItems = createSelector(
  selectPurchaseOrderSelected,
  (purchaseOrder: IPurchaseOrder): Array<IItem> =>
    purchaseOrder && purchaseOrder.items ? concat(...purchaseOrder?.items) : [],
);
export const selectOpenedItem = createSelector(
  selectPlainItems,
  (items: Array<IItem>): IItem => {
    return flow(
      () => filter(items, (i: IItem) => i.configIsOpen),
      (filter) => (!isEmpty(filter) ? filter[0] : ({} as IItem)),
    )();
  },
);
export const selectItemsConfiguredTotals = createSelector(
  selectPlainItems,
  (items: Array<IItem>): IItemsConfigTotals => {
    const countCancel = countBy(items, (o: IItem) => o.cancelConfig);
    const countBackOrder = countBy(items, (o: IItem) => o.backOrderConfig);
    const countConfirmed = countBy(items, (o: IItem) => o.confirmedConfig);
    return {
      cancel: countCancel.true || 0,
      backOrder: countBackOrder.true || 0,
      confirmed: countConfirmed.true || 0,
    };
  },
);
export const selectAllItemsArentConfigured = createSelector(
  selectItemsConfiguredTotals,
  (totals: IItemsConfigTotals): boolean =>
    !!(totals.cancel === 0 && totals.backOrder === 0 && totals.confirmed === 0),
);
export const selectTotalsOfItem = createSelector(
  selectPlainItems,
  selectItemsConfiguredTotals,
  (items: Array<IItem>, totals: IItemsConfigTotals) => {
    const objTotals: ITotalsItems = {
      totalResults: items?.length,
      totalPieces: sumBy(items, (item: IItem) => item.NumeroDePiezas),
      totalAmount: sumBy(items, (item: IItem) => item.TotalPartida),
      totalClients: Object.keys(countBy(items, (item: IItem) => item.NombreCliente)).length,
      cancel: totals.cancel,
      backOrder: totals.backOrder,
      confirmed: totals.confirmed,
    };
    return objTotals;
  },
);
export const selectTypeOfConfigIsOpen = createSelector(selectOpenedItem, (item: IItem): string => {
  return item.configIsOpen &&
    (item.cancelStatus === STATUS.active || item.cancelStatus === STATUS.confirmed)
    ? TYPES_OF_CONFIG.cancel
    : item.configIsOpen &&
      (item.backOrderStatus === STATUS.active || item.backOrderStatus === STATUS.confirmed)
    ? TYPES_OF_CONFIG.backOrder
    : null;
});
export const selectConfiguredItems = createSelector(
  selectPlainItems,
  (items: Array<IItem>): Array<IItem> =>
    filter(items, (i: IItem) => i.cancelConfig || i.backOrderConfig || i.confirmedConfig),
);
export const validatorForResumeButton = createSelector(
  selectConfiguredItems,
  (items: Array<IItem>): boolean => !isEmpty(items),
);
export const validatorSaveConfigButton = createSelector(
  [selectOpenedItem, selectTypeOfConfigIsOpen],
  (item: IItem, typeOfConfig: string): boolean => {
    return !!(
      (typeOfConfig === TYPES_OF_CONFIG.cancel &&
        item &&
        item.ocPartidaCancelacion &&
        (item.ocPartidaCancelacion.IdOcPartida !== DEFAULT_UUID ||
          !Number.isInteger(item.Number)) &&
        item.ocPartidaCancelacion.NumeroDePiezas &&
        item.ocPartidaCancelacion.Justificacion &&
        (item.ocPartidaCancelacion.Descontinuado ||
          item.ocPartidaCancelacion.RestriccionesVenta ||
          item.ocPartidaCancelacion.RestriccionesImportacion)) ||
      (typeOfConfig === TYPES_OF_CONFIG.backOrder &&
        item &&
        item.ocPartidaEdicionBackOrder &&
        (item.ocPartidaEdicionBackOrder.IdOcPartida !== DEFAULT_UUID ||
          !Number.isInteger(item.Number)) &&
        item.ocPartidaEdicionBackOrder.NumeroDePiezas &&
        item.ocPartidaEdicionBackOrder.Justificacion &&
        item.ocPartidaEdicionBackOrder.File &&
        item.ocPartidaEdicionBackOrder.FechaEstimadaArriboDate &&
        item.ocPartidaEdicionBackOrder.FechaEstimadaDisponibilidadProveedorDate &&
        item.ocPartidaEdicionBackOrder.FechaEstimadaEntregaDate &&
        item.ocPartidaEdicionBackOrder.FechaMonitoreoDate &&
        item.ocPartidaEdicionBackOrder.FechaEstimadaArribo &&
        item.ocPartidaEdicionBackOrder.FechaEstimadaDisponibilidadProveedor &&
        item.ocPartidaEdicionBackOrder.FechaEstimadaEntrega &&
        item.ocPartidaEdicionBackOrder.FechaEstimadaEntregaDate >
          item.ocPartidaEdicionBackOrder.FechaEstimadaArriboDate &&
        item.ocPartidaEdicionBackOrder.FechaEstimadaArriboDate >
          item.ocPartidaEdicionBackOrder.FechaEstimadaDisponibilidadProveedorDate &&
        item.ocPartidaEdicionBackOrder.FechaMonitoreoDate <
          item.ocPartidaEdicionBackOrder.FechaEstimadaEntregaDate &&
        item.ocPartidaEdicionBackOrder.FechaMonitoreoDate >
          item.ocPartidaEdicionBackOrder.FechaEstimadaDisponibilidadProveedorDate &&
        item.ocPartidaEdicionBackOrder.FechaMonitoreo)
    );
  },
);
export const validatorForFinishButton = createSelector(
  [selectConfirmDispatchDetails, selectItemsInSummary],
  (data: IConfirmDispatchDetails, itemsInSummary: Array<IItem>): boolean =>
    !!(
      data.packingListFile &&
      data.guideFile &&
      data.selectedFreightOption &&
      data.arrivalList &&
      data.arrivalList.IdCatFletera &&
      data.arrivalList.NumeroGuia &&
      !isEmpty(itemsInSummary)
    ),
);
