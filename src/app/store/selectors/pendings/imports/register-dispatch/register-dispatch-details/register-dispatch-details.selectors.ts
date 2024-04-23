import {createSelector} from '@ngrx/store';
import {selectRegisterDispatchDetails} from '@appSelectors/pendings/imports/register-dispatch/register-dispatch.selectors';
import {
  IDispatchOrder,
  IItemsDispatchOrder,
  IItemsTotals,
  IRegisterDispatchDetails,
} from '@appModels/store/pendings/imports/register-dispatch/register-dispatch-details/register-dispatch-details.models';
import {ICustomBroken} from '@appModels/store/pendings/imports/register-dispatch/register-dispatch-list/register-dispatch-list.models';
import {FiltersOnlyActive, IFilters} from '@appModels/filters/Filters';
import {IListTotals} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {isEmpty, sumBy} from 'lodash-es';

export const selectDetails = createSelector(
  selectRegisterDispatchDetails,
  (state: IRegisterDispatchDetails): IRegisterDispatchDetails => state,
);
export const selectSearchTerm = createSelector(
  selectDetails,
  (state: IRegisterDispatchDetails): string => state.searchTerm,
);
export const selectedCustomBroker = createSelector(
  selectDetails,
  (state: IRegisterDispatchDetails): ICustomBroken => state.selectedCustomBroker,
);
export const selectActualStep = createSelector(
  selectDetails,
  (state: IRegisterDispatchDetails): number => state.actualStep,
);
export const selectItemsStatus = createSelector(
  selectDetails,
  (state: IRegisterDispatchDetails): number => state.itemsStatus,
);
export const selectUsersList = createSelector(
  selectDetails,
  (state: IRegisterDispatchDetails): Array<DropListOption> => state.usersList,
);
export const selectHoursList = createSelector(
  selectDetails,
  (state: IRegisterDispatchDetails): Array<DropListOption> => state.hoursList,
);
export const selectMinutesList = createSelector(
  selectDetails,
  (state: IRegisterDispatchDetails): Array<DropListOption> => state.minutesList,
);
export const selectDispatchOrdersStatus = createSelector(
  selectDetails,
  (state: IRegisterDispatchDetails): number => state.dispatchOrdersStatus,
);
export const selectNeedsToReloadOrders = createSelector(
  selectDetails,
  (state: IRegisterDispatchDetails): boolean => state?.needsToReloadOrders,
);
export const selectDispatchOrders = createSelector(
  selectDetails,
  (state: IRegisterDispatchDetails): Array<IDispatchOrder> => state.dispatchOrders,
);
export const selectedDispatchOrder = createSelector(
  selectDetails,
  (state: IRegisterDispatchDetails): IDispatchOrder => state.selectedDispatchOrder,
);
export const selectItems = createSelector(
  selectedDispatchOrder,
  (state: IDispatchOrder): Array<IItemsDispatchOrder> => (state ? state.items : []),
);
export const selectGetDispatchOrdersFilters = createSelector(
  selectDetails,
  (state: IRegisterDispatchDetails): IFilters => {
    const params = new FiltersOnlyActive();
    params.Filters.push(
      {
        NombreFiltro: 'RazonSocialEmpresaImportador',
        ValorFiltro: state.selectedCustomBroker.RazonSocialEmpresaImportador,
      },
      {
        NombreFiltro: 'NombreLegalAgenteAduanal',
        ValorFiltro: state.selectedCustomBroker.NombreLegalAgenteAduanal,
      },
      {
        NombreFiltro: 'Fletera',
        ValorFiltro: state.selectedCustomBroker.Fletera,
      },
    );
    if (state?.searchTerm) {
      params.Filters.push({
        NombreFiltro: 'Folio',
        ValorFiltro: state.searchTerm,
      });
    }
    /*params.SortField = 'TotalUSD';
    params.SortDirection = state.filterByType.value === 1 ? 'desc' : 'asc';*/
    return params;
  },
);
export const selectedListTotals = createSelector(
  [selectDetails, selectedCustomBroker],
  (state: IRegisterDispatchDetails, customBroker: ICustomBroken): IListTotals => ({
    number: state?.dispatchOrders?.length,
    pieces: customBroker?.Piezas,
    amount: customBroker?.MontoTotalUSD,
  }),
);
export const selectedProvidersListTotals = createSelector(
  selectItems,
  (items: Array<IItemsDispatchOrder>): IItemsTotals => ({
    Items: items?.length,
    Piezas: sumBy(items, (o: IItemsDispatchOrder) => Number(o.Piezas)),
    IGI: sumBy(items, (o: IItemsDispatchOrder) => Number(o.CalcularMontosImportacion?.IGI)) || 0,
    DTA: sumBy(items, (o: IItemsDispatchOrder) => Number(o.CalcularMontosImportacion?.DTA)) || 0,
    IVA: sumBy(items, (o: IItemsDispatchOrder) => Number(o.CalcularMontosImportacion?.IVA)) || 0,
    IMP:
      sumBy(
        items,
        (o: IItemsDispatchOrder) =>
          Number(o.CalcularMontosImportacion?.IGI) +
          Number(o.CalcularMontosImportacion?.DTA) +
          Number(o.CalcularMontosImportacion?.IVA),
      ) || 0,
    ValorComercial:
      sumBy(items, (o: IItemsDispatchOrder) =>
        Number(o.CalcularMontosImportacion?.ValorComercial),
      ) || 0,
    MontoFlete:
      sumBy(items, (o: IItemsDispatchOrder) => Number(o.CalcularMontosImportacion?.MontoFlete)) ||
      0,
    VAD: sumBy(items, (o: IItemsDispatchOrder) => 0) || 0,
    Total:
      sumBy(items, (o: IItemsDispatchOrder) => Number(o.CalcularMontosImportacion?.Total)) || 0,
  }),
);
export const validatorForFinalizeButton = createSelector(
  selectedDispatchOrder,
  (order: IDispatchOrder): boolean =>
    !!(
      order &&
      order.petitionFile &&
      order.NumeroReferencia &&
      order.IdUsuarioComprador &&
      order.FechaHoraEstimadaArribo &&
      order.FechaHoraEstimadaSalidaAduana &&
      order.FechaHoraEstimadaArriboDate &&
      order.FechaHoraEstimadaSalidaAduanaDate &&
      order.GuiaDeEmbarque &&
      order.PesoKg &&
      order.Bultos &&
      !isEmpty(order.evidenceFiles) &&
      !isEmpty(order.selectedEnterHrs) &&
      !isEmpty(order.selectedEnterMinutes) &&
      !isEmpty(order.selectedOutHrs) &&
      !isEmpty(order.selectedOutMinutes) &&
      !isEmpty(order.selectedBuyerUser)
    ),
);
