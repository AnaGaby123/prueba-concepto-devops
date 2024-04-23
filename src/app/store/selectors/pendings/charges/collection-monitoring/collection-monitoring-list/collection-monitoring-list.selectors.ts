import {createSelector} from '@ngrx/store';
import {selectCollectionMonitoringList} from '@appSelectors/pendings/charges/collection-monitoring/collection-monitoring.selectors';
import {IChip} from '@appModels/chip/chip';
import {
  CHIP_FILTERS,
  ICollectionMonitoringList,
  IMonth,
  IWeek,
} from '@appModels/store/pendings/charges/collection-monitoring/collection-monitoring-list/collection-monitoring-list.models';
import {
  CalendarioEjecutarCobranzaDia,
  CalendarioEjecutarCobranzaPeriodoParametro,
} from 'api-finanzas';
import {filter, flow, isEmpty, map as _map} from 'lodash-es';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export const selectCollectionMList = createSelector(
  selectCollectionMonitoringList,
  (state: ICollectionMonitoringList) => state,
);
export const selectCollectionMonitoringWeek = createSelector(
  selectCollectionMList,
  (state: ICollectionMonitoringList) => state.weekTab,
);

export const selectCollectionMonitoringMonth = createSelector(
  selectCollectionMList,
  (state: ICollectionMonitoringList) => state.monthTab,
);

export const selectTabOptions = createSelector(
  selectCollectionMList,
  (state: ICollectionMonitoringList) => state.tabOptions,
);
export const selectedTabOption = createSelector(
  selectCollectionMList,
  (state: ICollectionMonitoringList) => state.selectedTabOption,
);
export const selectSearchTerm = createSelector(
  selectCollectionMonitoringWeek,
  (state: IWeek) => state.queryInfo.searchTerm,
);
export const selectChipOptions = createSelector(
  selectCollectionMonitoringWeek,
  (state: IWeek): Array<IChip> =>
    flow(
      () =>
        _map(state.chipOptions, (o: IChip) => ({
          ...o,
          total:
            o.value === '1'
              ? state.calendarWeek?.Cobros
              : o.value === '2'
              ? state.calendarWeek?.EnTiempo
              : o.value === '3'
              ? state.calendarWeek?.SinMonitoreo
              : state.calendarWeek?.CobroNoRecibido,
        })),
      (array) =>
        _map(array, (o: IChip) => ({
          ...o,
          totalLabel: o.total === 1 ? 'Factura' : 'Facturas',
        })),
    )(),
);
export const selectActiveChip = createSelector(
  selectCollectionMonitoringWeek,
  (state: IWeek): IChip =>
    flow(
      () => filter(state.chipOptions, (o: IChip) => o.active),
      (activeChip) => (!isEmpty(activeChip) ? activeChip[0] : ({} as IChip)),
    )(),
);
export const selectActualWeek = createSelector(
  selectCollectionMonitoringWeek,
  (state: IWeek): Array<string> => state.actualWeek,
);
export const selectDaysArrayOfCalendarWeek = createSelector(
  selectCollectionMonitoringWeek,
  (state: IWeek): Array<CalendarioEjecutarCobranzaDia> =>
    !isEmpty(state.calendarWeek) ? state.calendarWeek.CalendarioEjecutarCobranzaDia : [],
);
export const selectCalendarApiStatus = createSelector(
  selectCollectionMonitoringWeek,
  (state: IWeek): number => state.calendarApiStatus,
);
export const selectCurrentDate = createSelector(
  selectCollectionMonitoringWeek,
  (state: IWeek): Date => state.currentDate,
);
export const selectCalendarDataFilters = createSelector(
  [selectCollectionMonitoringWeek, selectActiveChip],
  (state: IWeek, activeChip: IChip): CalendarioEjecutarCobranzaPeriodoParametro => {
    const today = state.currentDate;
    const lastDay: Date = new Date(today.setDate(today.getDate() - today.getDay() + 5));
    const firstDay: Date = new Date(today.setDate(today.getDate() - today.getDay() + 1));

    lastDay.setMinutes(lastDay.getMinutes() - lastDay.getTimezoneOffset());
    firstDay.setMinutes(firstDay.getMinutes() - firstDay.getTimezoneOffset());

    const params: CalendarioEjecutarCobranzaPeriodoParametro = {
      FechaInicio: new Date(firstDay).toISOString(),
      FechaFin: new Date(lastDay).toISOString(),
      Info: {
        Filters: [],
      },
    };
    if (state?.queryInfo.searchTerm) {
      params.Info.Filters.push({
        NombreFiltro: 'NombreCliente',
        ValorFiltro: state?.queryInfo.searchTerm,
      });
    }
    if (!isEmpty(activeChip) && activeChip.value !== '1') {
      params.Info.Filters.push({
        NombreFiltro: CHIP_FILTERS[activeChip.value],
        ValorFiltro: true,
      });
    }
    return params;
  },
);

export const selectClientOptions = createSelector(
  selectCollectionMonitoringMonth,
  (state: IMonth): Array<DropListOption> => state.clientOptions,
);
export const selectClientOption = createSelector(
  selectCollectionMonitoringMonth,
  (state: IMonth): DropListOption => state.selectedClientOption,
);
export const selectCollectionsStatusOptions = createSelector(
  selectCollectionMonitoringMonth,
  (state: IMonth): Array<DropListOption> => state.collectionStatusOptions,
);
export const selectCollectionsStatusOption = createSelector(
  selectCollectionMonitoringMonth,
  (state: IMonth): DropListOption => state.selectedCollectionStatusOption,
);

export const selectTypeCollectionOptions = createSelector(
  selectCollectionMonitoringMonth,
  (state: IMonth): Array<DropListOption> => state.typeCollectionOptions,
);
export const selectTypeCollectionOption = createSelector(
  selectCollectionMonitoringMonth,
  (state: IMonth): DropListOption => state.selectedTypeCollectionOption,
);

export const selectTypeClientOptions = createSelector(
  selectCollectionMonitoringMonth,
  (state: IMonth): Array<DropListOption> => state.typeClientOptions,
);

export const selectTypeClientOption = createSelector(
  selectCollectionMonitoringMonth,
  (state: IMonth): DropListOption => state.selectedTypeClientOption,
);
