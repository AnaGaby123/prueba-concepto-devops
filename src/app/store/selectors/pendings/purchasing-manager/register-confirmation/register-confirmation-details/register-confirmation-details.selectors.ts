import {createSelector} from '@ngrx/store';
import {selectRegisterConfirmationDetails} from '@appSelectors/pendings/purchasing-manager/register-confirmation/register-confirmation.selectors';
import {
  DAYS,
  IFamily,
  IItemsConfigTotals,
  IItemsFamily,
  IListTotals,
  IOrdersFamily,
  IRegisterConfirmationDetails,
  STATUS,
  TYPES_OF_CONFIG,
} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';
import {ICard} from '@appModels/card/card';
import {concat, countBy, filter, find, flow, isEmpty, map as _map, sumBy} from 'lodash-es';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-list/register-confirmation-list.models';
import {DEFAULT_UUID} from '@appUtil/common.protocols';
import {FiltersOnlyActive, IFilters} from '@appModels/filters/Filters';
import {ContactoDetalleProvObj} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IProviderContact} from '@appModels/provider-contacts/provider-contacts.model';
import {dateWithHoursFormatDate} from '@appUtil/dates';

export const selectDetails = createSelector(
  selectRegisterConfirmationDetails,
  (state: IRegisterConfirmationDetails): IRegisterConfirmationDetails => state,
);
export const selectedFamily = createSelector(
  selectDetails,
  (state: IRegisterConfirmationDetails): IFamily =>
    state.selectedFamily ? state.selectedFamily : ({} as IFamily),
);
export const selectProvider = createSelector(
  selectDetails,
  (state): IProvider => state.providerSelected,
);
export const selectContactsProviders = createSelector(
  selectDetails,
  (state: IRegisterConfirmationDetails) => state.providerContacts,
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
  selectDetails,
  (state: IRegisterConfirmationDetails) => state.selectedProviderContact,
);

export const selectedProviderContact = createSelector(
  [selectContactsProviders, selectProvider, selectedDropListProviderContact],
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

export const selectFamiliesForCards = createSelector(
  [selectDetails, selectedFamily],
  (state: IRegisterConfirmationDetails, family: IFamily): Array<ICard> => {
    return state?.families
      ? _map(state.families, (o: IFamily) => {
          return {
            // FIXME: Corregir por cambio en modelos
            /*value: o.IdProveedorFamilia,
        active: o.IdProveedorFamilia === family.IdProveedorFamilia,
        labels: [
          {
            label: o.Tipo.toUpperCase(),
            color: '#ffffff',
          },
          {
            label: o.Subtipo.toUpperCase(),
            color: '#ffffff',
          },
          {
            label: o.Control.toUpperCase(),
            color: '#ffffff',
          },
        ],*/
          } as ICard;
        })
      : [];
  },
);
export const selectTabOptions = createSelector(
  selectDetails,
  (state: IRegisterConfirmationDetails): Array<ITabOption> =>
    _map(state?.tabOptions, (o: ITabOption, index: number) => ({
      ...o,
      totalSubtitle:
        o.id === '1'
          ? state.providerSelected.TotalPiezas
          : o.id === '2'
          ? state.providerSelected.AMasDe3Dias
          : o.id === '3'
          ? state.providerSelected.A3Dias
          : o.id === '4'
          ? state.providerSelected.A2Dias
          : state.providerSelected.A1Dia,
    })),
);
export const selectedTabOption = createSelector(
  selectedFamily,
  (state: IFamily): ITabOption => state?.selectedTabOption,
);
export const selectGetOrdersFilters = createSelector(
  selectedFamily,
  (family: IFamily): IFilters => {
    const params = new FiltersOnlyActive();
    params.Filters.push(
      // FIXME: Corregir por cambio en modelos
      /*{
        NombreFiltro: 'IdFamilia',
        ValorFiltro: family?.IdFamilia,
      },
      {
        NombreFiltro: 'IdProveedor',
        ValorFiltro: family?.IdProveedor,
      },*/
      {
        NombreFiltro: 'Confirmada',
        ValorFiltro: false,
      },
    );
    if (family?.selectedTabOption?.id !== '1') {
      params.Filters.push({
        NombreFiltro: DAYS[family?.selectedTabOption?.id],
        ValorFiltro: true,
      });
    }
    if (family?.searchTerm) {
      params.Filters.push({
        NombreFiltro: 'NumeroOrdenDeCompra',
        ValorFiltro: family?.searchTerm,
      });
    }
    return params;
  },
);

export const selectedListTotals = createSelector(
  selectedFamily,
  (state: IFamily): IListTotals => ({
    number: state?.purchaseOrders?.length,
    pieces: sumBy(state?.purchaseOrders, (o: IOrdersFamily) => o.NumeroDePiezas),
    products: sumBy(state?.purchaseOrders, (o: IOrdersFamily) => o.Productos),
    amount: sumBy(state?.purchaseOrders, (o: IOrdersFamily) => o.TotalUSD),
  }),
);
export const selectedOrder = createSelector(
  selectedFamily,
  (state: IFamily): IOrdersFamily => state?.selectedOrder,
);
export const selectedOrderId = createSelector(
  selectedOrder,
  (state: IOrdersFamily): string => state?.IdOcOrdenDeCompra,
);

export const selectItems = createSelector(
  selectedOrder,
  (state: IOrdersFamily): Array<Array<IItemsFamily>> => state?.items,
);
export const selectPlainItems = createSelector(
  selectedOrder,
  (state: IOrdersFamily): Array<IItemsFamily> =>
    state && state.items ? concat(...state.items) : [],
);
export const selectFirstItem = createSelector(
  selectPlainItems,
  (items: Array<IItemsFamily>): IItemsFamily => (!isEmpty(items) ? items[0] : ({} as IItemsFamily)),
);
export const selectItemsConfiguredTotals = createSelector(
  selectPlainItems,
  (items: Array<IItemsFamily>): IItemsConfigTotals => {
    const countCancel = countBy(items, (o: IItemsFamily) => o.cancelConfig);
    const countBackOrder = countBy(items, (o: IItemsFamily) => o.backOrderConfig);
    const countImpact = countBy(items, (o: IItemsFamily) => o.impactConfig);
    const countWithoutImpact = countBy(items, (o: IItemsFamily) => o.withoutImpactConfig);
    return {
      cancel: countCancel.true || 0,
      backOrder: countBackOrder.true || 0,
      impact: countImpact.true || 0,
      withoutImpact: countWithoutImpact.true || 0,
    };
  },
);
export const selectAllItemsArentConfigured = createSelector(
  selectItemsConfiguredTotals,
  (totals: IItemsConfigTotals): boolean =>
    !!(
      totals.cancel === 0 &&
      totals.backOrder === 0 &&
      totals.impact === 0 &&
      totals.withoutImpact === 0
    ),
);
export const selectOpenedItem = createSelector(
  selectPlainItems,
  (items: Array<IItemsFamily>): IItemsFamily => {
    return flow(
      () => filter(items, (i: IItemsFamily) => i.configIsOpen),
      (filter) => (!isEmpty(filter) ? filter[0] : ({} as IItemsFamily)),
    )();
  },
);
export const selectConfiguredItems = createSelector(
  selectPlainItems,
  (items: Array<IItemsFamily>): Array<IItemsFamily> =>
    filter(
      items,
      (i: IItemsFamily) =>
        i.cancelConfig || i.backOrderConfig || i.impactConfig || i.withoutImpactConfig,
    ),
);
export const selectTypeOfConfigIsOpen = createSelector(
  selectOpenedItem,
  (item: IItemsFamily): string =>
    item.configIsOpen &&
    (item.cancelStatus === STATUS.active || item.cancelStatus === STATUS.confirmed)
      ? TYPES_OF_CONFIG.cancel
      : item.configIsOpen &&
        (item.backOrderStatus === STATUS.active || item.backOrderStatus === STATUS.confirmed)
      ? TYPES_OF_CONFIG.backOrder
      : item.configIsOpen &&
        (item.impactStatus === STATUS.active || item.impactStatus === STATUS.confirmed)
      ? TYPES_OF_CONFIG.impact
      : item.configIsOpen &&
        (item.withoutImpactStatus === STATUS.active ||
          item.withoutImpactStatus === STATUS.confirmed)
      ? TYPES_OF_CONFIG.withoutImpact
      : null,
);
export const validatorForRegisterButton = createSelector(
  [selectedOrder, selectConfiguredItems],
  (order: IOrdersFamily, items: Array<IItemsFamily>): boolean =>
    !!(
      order &&
      order.IdCatMedioDePago &&
      order.IdCatCondicionesDePago &&
      order.NombreConfirmacion &&
      order.NumeroReferencia &&
      !isEmpty(items)
    ),
);
export const validatorForWithOutImpactSaveConfigButton = createSelector(
  [selectOpenedItem, selectTypeOfConfigIsOpen],
  (item: IItemsFamily, typeOfConfig: string): boolean =>
    !!(
      (typeOfConfig === TYPES_OF_CONFIG.withoutImpact &&
        item &&
        item.ocPartidaEdicionSinImpactoFEE &&
        (item.ocPartidaEdicionSinImpactoFEE.IdOcPartida !== DEFAULT_UUID ||
          !Number.isInteger(item.Number)) &&
        item.ocPartidaEdicionSinImpactoFEE.NumeroDePiezas &&
        item.ocPartidaEdicionSinImpactoFEE.FechaEstimadaArriboDate &&
        item.ocPartidaEdicionSinImpactoFEE.FechaEstimadaArribo) ||
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
