/* Core Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectCheckOcNotArrivedDetails} from '@appSelectors/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived.selectors';

/* Models Imports */
import {
  ICheckOcNotArrivedDetails,
  IFamily,
  IItems,
  IPurchaseOrder,
} from '@appModels/store/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-details/check-oc-not-arrived-details.model';
import {QueryInfo} from 'api-finanzas';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-list/check-oc-not-arrived-list.models';
import {ICard} from '@appModels/card/card';

/* Utils Imports */
import {concat, countBy, filter, find, flow, isEmpty} from 'lodash-es';

/* Common Imports */
import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_DATE,
  DEFAULT_UUID,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
import {
  IItemsConfigTotals,
  IItemsFamily,
  STATUS,
  TYPES_OF_CONFIG,
} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';
import {ContactoDetalleProvObj} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IProviderContact} from '@appModels/provider-contacts/provider-contacts.model';
import {dateWithHoursFormatDate} from '@appUtil/dates';

export const selectProviderSelected = createSelector(
  selectCheckOcNotArrivedDetails,
  (state: ICheckOcNotArrivedDetails) => state.providerSelected,
);
export const selectIdProviderSelected = createSelector(
  selectProviderSelected,
  (providerSelected: IProvider) => providerSelected.IdProveedor,
);
export const selectFamilies = createSelector(
  selectCheckOcNotArrivedDetails,
  (state: ICheckOcNotArrivedDetails) => {
    const options: Array<ICard> = [];
    // FIXME: Corregir por cambio en modelos
    /*_.forEach(state.families, (o: IFamily) => {
      options.push({
        active: o.isSelected,
        value: o.IdFamilia,
        labels: [
          {label: ''},
          {label: o.Tipo},
          {label: o.Subtipo},
          {label: o.Control},
        ],
      });
    });*/
    return options;
  },
);
export const selectTotalFamilies = createSelector(
  selectCheckOcNotArrivedDetails,
  (state: ICheckOcNotArrivedDetails) => state.families.length,
);
export const selectIsLoadingFamilies = createSelector(
  selectCheckOcNotArrivedDetails,
  (state: ICheckOcNotArrivedDetails) =>
    state.familiesStatus === API_REQUEST_STATUS_LOADING ||
    state.familiesStatus === API_REQUEST_STATUS_DEFAULT,
);
export const selectFamilySelected = createSelector(
  selectCheckOcNotArrivedDetails,
  (state: ICheckOcNotArrivedDetails) =>
    !isEmpty(state.familySelected)
      ? state.familySelected
      : {
          Control: DEFAULT_UUID,
          IdCatControl: DEFAULT_UUID,
          IdCatSubtipoProducto: DEFAULT_UUID,
          IdCatTipoProducto: DEFAULT_UUID,
          IdFamilia: DEFAULT_UUID,
          IdProveedor: DEFAULT_UUID,
          Subtipo: null,
          Tipo: null,
          isSelected: true,
          purchaseOrders: [],
          purchaseOrdersStatus: API_REQUEST_STATUS_SUCCEEDED,
          needsToReloadPurchaseOrders: true,
          desiredPage: 1,
          isLoadingMorePurchases: false,
          selectedPurchaseOrder: {} as IPurchaseOrder,
          totals: {
            pieces: 0,
            products: 0,
            amount: 0,
          },
          totalsNeedsToReload: true,
          searchTerm: '',
          tabOptions: [
            {
              value: 1,
              label: 'Todas las Gestiones',
            },
            {
              value: 2,
              label: 'Primera Gestión',
            },
            {
              value: 3,
              label: 'Gestionadas',
            },
          ],
          tabSelected: {
            value: 1,
            label: 'Todas las Gestiones',
          },
          dropDownValues: {
            yesterday: 0,
            dayBeforeYesterday: 0,
            past: 0,
            today: 0,
            all: 0,
            tomorrow: 0,
            dayAfterTomorrow: 0,
            future: 0,
          },
          dropDownOptionSelected: 'Todos',
        },
);
export const selectNeedsToReloadTotals = createSelector(
  selectFamilySelected,
  (familySelected: IFamily) => familySelected.needsToReloadTotals,
);
export const selectTotalsOfFamilySelected = createSelector(
  selectFamilySelected,
  (familySelected: IFamily) => familySelected.totals,
);
export const selectIdFamilySelected = createSelector(
  selectFamilySelected,
  (familySelected: IFamily) => 'familySelected.IdFamilia', // FIXME: Corregir por cambio en modelos
);
export const selectDesiredPageOfCurrentFamily = createSelector(
  selectFamilySelected,
  (familySelected: IFamily) => familySelected.desiredPage,
);
export const selectQueryInfoPurchaseOrders = createSelector(
  [
    selectCheckOcNotArrivedDetails,
    selectIdFamilySelected,
    selectDesiredPageOfCurrentFamily,
    selectIdProviderSelected,
  ],
  (state: ICheckOcNotArrivedDetails, idFamily: string, desiredPage: number, idProvider: string) => {
    const queryInfo: QueryInfo = {} as QueryInfo;
    queryInfo.Filters = [];

    queryInfo.Filters = [
      ...queryInfo.Filters,
      {
        NombreFiltro: 'IdFamilia',
        ValorFiltro: idFamily,
      },
      {
        NombreFiltro: 'IdProveedor',
        ValorFiltro: idProvider,
      },
      {
        NombreFiltro: 'Confirmada',
        ValorFiltro: true,
      },
    ];
    queryInfo.pageSize = PAGING_LIMIT;
    queryInfo.desiredPage = desiredPage;

    return queryInfo;
  },
);
export const selectPurchaseOrdersOfCurrentFamily = createSelector(
  selectFamilySelected,
  (familySelected: IFamily) => familySelected.purchaseOrders,
);
export const selectTotalPurchaseOrders = createSelector(
  selectFamilySelected,
  (familySelected: IFamily) => familySelected.totalPurchaseOrders || 0,
);
export const selectTabOptions = createSelector(
  selectFamilySelected,
  (familySelected: IFamily) => familySelected.tabOptions,
);
export const selectTabOptionSelected = createSelector(
  selectFamilySelected,
  (familySelected: IFamily) => familySelected.tabSelected,
);
export const selectDropDownValues = createSelector(
  selectFamilySelected,
  (familySelected: IFamily) =>
    !isEmpty(familySelected)
      ? familySelected.dropDownValues
      : {
          yesterday: 0,
          dayBeforeYesterday: 0,
          past: 0,
          today: 0,
          all: 0,
          tomorrow: 0,
          dayAfterTomorrow: 0,
          future: 0,
        },
);
export const selectDropDownOptionSelected = createSelector(
  selectFamilySelected,
  (familySelected: IFamily) =>
    !isEmpty(familySelected) ? familySelected.dropDownOptionSelected : 'Todos',
);
export const selectSearchTerm = createSelector(selectFamilySelected, (familySelected: IFamily) =>
  !isEmpty(familySelected) ? familySelected.searchTerm : '',
);
export const selectIsLoadingPurchaseOrders = createSelector(
  selectFamilySelected,
  (familySelected: IFamily) =>
    familySelected.purchaseOrdersStatus === API_REQUEST_STATUS_LOADING ||
    familySelected.purchaseOrdersStatus === API_REQUEST_STATUS_DEFAULT,
);
export const selectIsLoadingMorePurchaseOrders = createSelector(
  selectFamilySelected,
  (familySelected: IFamily) => familySelected.isLoadingMorePurchases,
);
export const selectNeedsToReloadPurchaseOrders = createSelector(
  selectFamilySelected,
  (familySelected: IFamily) => familySelected.needsToReloadPurchaseOrders,
);
export const selectPurchaseOrderSelected = createSelector(
  selectFamilySelected,
  (familySelected: IFamily) =>
    !isEmpty(familySelected.selectedPurchaseOrder)
      ? familySelected.selectedPurchaseOrder
      : {
          A1Dia: 0,
          A2Dias: 0,
          A3Dias: 0,
          AMasDe3Dias: 0,
          Confirmada: false,
          EnTiempoAmarillo: false,
          EnTiempoVerde: false,
          Entregada: false,
          FEAMasAntigua: DEFAULT_DATE,
          FEAMasReciente: DEFAULT_DATE,
          FechaEstimadaEntrega: DEFAULT_DATE,
          IdOcOrdenDeCompra: DEFAULT_UUID,
          IdProveedor: DEFAULT_UUID,
          NumeroOrdenDeCompra: 'NA',
          TotaUnica: 0,
          Total: 0,
          TotalFleteExpress: 0,
          TotalFleteNormal: 0,
          TotalNoArribado: 0,
          TotalPartidas: 0,
          TotalPiezas: 0,
          TotalProductos: 0,
          TotalProgramadas: 0,
          VencidoRojo: false,
          Index: 0,
          items: [],
          totalItems: 0,
          itemsStatus: API_REQUEST_STATUS_SUCCEEDED,
          needsToReloadItems: true,
          desiredPage: 1,
          isLoadingMoreItems: false,
          isSelected: false,
        },
);
export const selectTotalPiecesOfCurrentOC = createSelector(
  selectFamilySelected,
  (familySelected: IFamily) =>
    !isEmpty(familySelected.selectedPurchaseOrder)
      ? familySelected.selectedPurchaseOrder.TotalPiezas
      : 0,
);
export const selectTotalAmountOfCurrentOC = createSelector(
  selectFamilySelected,
  (familySelected: IFamily) =>
    !isEmpty(familySelected.selectedPurchaseOrder) ? familySelected.selectedPurchaseOrder.Total : 0,
);
export const selectTotalClientsOfCurrentOC = createSelector(
  selectFamilySelected,
  (familySelected: IFamily) =>
    !isEmpty(familySelected.selectedPurchaseOrder)
      ? familySelected.selectedPurchaseOrder.TotalClientes
      : 0,
);
export const selectIdPurchaseOrderSelected = createSelector(
  selectPurchaseOrderSelected,
  (purchaseOrder: IPurchaseOrder) => purchaseOrder?.IdOcOrdenDeCompra,
);
export const selectDesiredPageOfCurrentPurchaseOrder = createSelector(
  selectPurchaseOrderSelected,
  (purchaseOrder: IPurchaseOrder) => purchaseOrder?.desiredPage,
);
export const selectNeedsToReloadItems = createSelector(
  selectPurchaseOrderSelected,
  (purchaseOrder: IPurchaseOrder) => purchaseOrder?.needsToReloadItems,
);
export const selectIsLoadingMoreItems = createSelector(
  selectPurchaseOrderSelected,
  (purchaseOrder: IPurchaseOrder) => purchaseOrder?.isLoadingMoreItems,
);
export const selectQueryInfoItems = createSelector(
  [selectIdPurchaseOrderSelected, selectDesiredPageOfCurrentPurchaseOrder],
  (idPurchaseOrder: string, desiredPage: number) => {
    const queryInfo: QueryInfo = {} as QueryInfo;
    queryInfo.Filters = [];

    queryInfo.Filters = [
      ...queryInfo.Filters,
      {
        NombreFiltro: 'IdOcOrdenDeCompra',
        ValorFiltro: idPurchaseOrder,
      },
      {
        NombreFiltro: 'Confirmada',
        ValorFiltro: true,
      },
      {
        NombreFiltro: 'ConfiguracionPartidaEdicionConImpactoFEE',
        ValorFiltro: true,
      },
    ];

    queryInfo.SortField = 'Indice';
    queryInfo.SortDirection = 'asc';

    return queryInfo;
  },
);
export const selectItemsOfPurchaseOrderCurrent = createSelector(
  selectPurchaseOrderSelected,
  (purchaseOrder: IPurchaseOrder) => purchaseOrder?.items,
);
export const selectTotalItems = createSelector(
  selectPurchaseOrderSelected,
  (purchaseOrder: IPurchaseOrder) => purchaseOrder?.totalItems,
);
export const selectIsLoadingItems = createSelector(
  selectPurchaseOrderSelected,
  (purchaseOrder: IPurchaseOrder) =>
    purchaseOrder?.itemsStatus === API_REQUEST_STATUS_LOADING ||
    purchaseOrder?.itemsStatus === API_REQUEST_STATUS_DEFAULT,
);
export const selectItemsByPosition = (position: number) =>
  createSelector(
    selectPurchaseOrderSelected,
    (purchaseOrder: IPurchaseOrder) => purchaseOrder.items[position],
  );

export const selectPlainItems = createSelector(
  selectPurchaseOrderSelected,
  (purchaseOrder: IPurchaseOrder) => (purchaseOrder ? concat(...purchaseOrder.items) : []),
);
export const selectOpenedItem = createSelector(selectPlainItems, (items: Array<IItems>) => {
  return flow(
    () => filter(items, (i: IItems) => i.configIsOpen),
    (filter) => (!isEmpty(filter) ? filter[0] : ({} as IItems)),
  )();
});
export const selectTypeOfConfigIsOpen = createSelector(selectOpenedItem, (item: IItems): string =>
  item.configIsOpen &&
  (item.cancelStatus === STATUS.active || item.cancelStatus === STATUS.confirmed)
    ? TYPES_OF_CONFIG.cancel
    : item.configIsOpen &&
      (item.backOrderStatus === STATUS.active || item.backOrderStatus === STATUS.confirmed)
    ? TYPES_OF_CONFIG.backOrder
    : item.configIsOpen &&
      (item.impactStatus === STATUS.active || item.impactStatus === STATUS.confirmed)
    ? TYPES_OF_CONFIG.impact
    : null,
);
export const selectItemsConfiguredTotals = createSelector(
  selectPlainItems,
  (items: Array<IItems>): IItemsConfigTotals => {
    const countCancel = countBy(items, (o: IItems) => o.cancelConfig);
    const countBackOrder = countBy(items, (o: IItems) => o.backOrderConfig);
    const countImpact = countBy(items, (o: IItems) => o.impactConfig);
    return {
      cancel: countCancel.true || 0,
      backOrder: countBackOrder.true || 0,
      impact: countImpact.true || 0,
      withoutImpact: 0,
    };
  },
);
export const selectConfiguredItems = createSelector(selectPlainItems, (items: Array<IItems>) =>
  filter(items, (i: IItemsFamily) => i.cancelConfig || i.backOrderConfig || i.impactConfig),
);
export const validatorForRegisterButton = createSelector(
  selectPurchaseOrderSelected,
  selectConfiguredItems,
  (order: IPurchaseOrder, items: Array<IItems>): boolean => !!(order && !isEmpty(items)),
);
export const validatorForWithOutImpactSaveConfigButton = createSelector(
  selectOpenedItem,
  selectTypeOfConfigIsOpen,
  (item: IItems, typeOfConfig: string): boolean =>
    !!(
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
        item.ocPartidaEdicionBackOrder.FechaMonitoreo) ||
      (typeOfConfig === TYPES_OF_CONFIG.impact &&
        item &&
        item.ocPartidaEdicionConImpactoFEE &&
        (item.ocPartidaEdicionConImpactoFEE.IdOcPartida !== DEFAULT_UUID ||
          !Number.isInteger(item.Number)) &&
        item.ocPartidaEdicionConImpactoFEE.NumeroDePiezas &&
        item.ocPartidaEdicionConImpactoFEE.Justificacion &&
        item.ocPartidaEdicionConImpactoFEE.File &&
        item.ocPartidaEdicionConImpactoFEE.FechaEstimadaArribo &&
        item.ocPartidaEdicionConImpactoFEE.FechaEstimadaArriboDate &&
        item.ocPartidaEdicionConImpactoFEE.FechaEstimadaEntrega &&
        item.ocPartidaEdicionConImpactoFEE.FechaEstimadaEntregaDate &&
        item.ocPartidaEdicionConImpactoFEE.FechaEstimadaEntregaDate >
          dateWithHoursFormatDate(item.FechaEstimadaEntregaPedido) &&
        item.ocPartidaEdicionConImpactoFEE.FechaEstimadaEntregaDate >
          item.ocPartidaEdicionConImpactoFEE.FechaEstimadaArriboDate &&
        (item.ocPartidaEdicionConImpactoFEE.MotivosDesconocidos ||
          item.ocPartidaEdicionConImpactoFEE.Produccion ||
          item.ocPartidaEdicionConImpactoFEE.Disponibilidad))
    ),
);

export const selectContactsProviders = createSelector(
  selectCheckOcNotArrivedDetails,
  (state) => state.providerContacts,
);

export const selectContactsProviderDropList = createSelector(
  selectContactsProviders,
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

export const selectedDropListProviderContact = createSelector(
  selectCheckOcNotArrivedDetails,
  (state: ICheckOcNotArrivedDetails) => state.selectedProviderContact,
);

export const selectedProviderContact = createSelector(
  [selectContactsProviders, selectProviderSelected, selectedDropListProviderContact],
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
