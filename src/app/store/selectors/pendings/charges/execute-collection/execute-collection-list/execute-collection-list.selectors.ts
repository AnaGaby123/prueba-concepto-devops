import {createSelector} from '@ngrx/store';
import {selectExecuteCollectionCalendar} from '@appSelectors/pendings/charges/execute-collection/execute-collection.selectors';
import {
  IExecuteCollectionCalendar,
  IMonth,
  IWeek,
} from '@appModels/store/pendings/charges/execute-collection/execute-collection-list/execute-collection-list.models';
import {
  CalendarioEjecutarCobranzaDia,
  CalendarioEjecutarCobranzaPeriodo,
  CalendarioEjecutarCobranzaPeriodoParametro,
  VFacturaClienteCalendarioTotales,
} from 'api-finanzas';
import {filter, isEmpty, map as _map} from 'lodash-es';

import {IChip} from '@appModels/chip/chip';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export const selectExecuteColllectionCalendarWeek = createSelector(
  selectExecuteCollectionCalendar,
  (state: IExecuteCollectionCalendar): IWeek => state.weekTab,
);
export const selectExecuteColllectionCalendarMonth = createSelector(
  selectExecuteCollectionCalendar,
  (state: IExecuteCollectionCalendar): IMonth => state.monthTab,
);

export const selectSearchTerm = createSelector(
  selectExecuteColllectionCalendarWeek,
  (state: IWeek) => state.searchTerm,
);
export const selectTabsOptions = createSelector(
  selectExecuteCollectionCalendar,
  (state: IExecuteCollectionCalendar) => state.tabOptions,
);
export const selectTabSelected = createSelector(
  selectExecuteCollectionCalendar,
  (state: IExecuteCollectionCalendar) => state.tabSelected,
);

export const selectWhichComponentShow = createSelector(
  selectExecuteCollectionCalendar,
  (state: IExecuteCollectionCalendar) => (state.tabSelected.id === '1' ? 'week' : 'month'),
);
export const selectChips = createSelector(
  selectExecuteColllectionCalendarWeek,
  (state: IWeek) => state.chips,
);
export const selectChargesOptions = createSelector(
  selectExecuteColllectionCalendarWeek,
  (state: IWeek) => state.chargesOptions,
);
export const selectChargeOptionSelected = createSelector(
  selectExecuteColllectionCalendarWeek,
  (state: IWeek) => state.chargeOptionSelected,
);
export const selectDayStatus = createSelector(
  selectExecuteColllectionCalendarWeek,
  (state: IWeek) => state.dayStatus,
);

export const selectCalendarWeekFilters = createSelector(
  selectExecuteColllectionCalendarWeek,

  (state: IWeek): CalendarioEjecutarCobranzaPeriodoParametro => {
    const today = state.selectedWeek;
    const lastday: Date = new Date(today.setDate(today.getDate() - today.getDay() + 5));
    const firstday: Date = new Date(today.setDate(today.getDate() - today.getDay() + 1));

    lastday.setMinutes(lastday.getMinutes() - lastday.getTimezoneOffset());
    firstday.setMinutes(firstday.getMinutes() - firstday.getTimezoneOffset());

    const params: CalendarioEjecutarCobranzaPeriodoParametro = {
      FechaInicio: new Date(firstday).toISOString(),
      FechaFin: new Date(lastday).toISOString(),

      Info: {
        Filters: [],
      },
    };
    if (state?.searchTerm) {
      params.Info.Filters.push({
        NombreFiltro: 'NombreCliente',
        ValorFiltro: state?.searchTerm,
      });
    }

    if (state?.chips) {
      const chipActive: string[] = _map(
        filter(state.chips, (c: IChip) => c.active),
        (c: IChip) => c.value,
      );
      switch (chipActive[0]) {
        case '1':
          params.Info.Filters.push({
            NombreFiltro: 'TieneACobrar',
            ValorFiltro: true,
          });
          break;

        case '2':
          params.Info.Filters.push({
            NombreFiltro: 'TieneACobrado',
            ValorFiltro: true,
          });
          break;

        case '3':
          params.Info.Filters.push({
            NombreFiltro: 'TieneEnRevision',
            ValorFiltro: true,
          });
      }
    }

    if (isEmpty(state.chargesOptions && state.chargeOptionSelected.value !== '1')) {
      switch (state?.chargeOptionSelected.value) {
        case '2':
          params.Info.Filters.push({
            NombreFiltro: 'TieneEnTiempoVerde',
            ValorFiltro: true,
          });
          break;
        case '3':
          params.Info.Filters.push({
            NombreFiltro: 'TieneVencidaAmarillo',
            ValorFiltro: true,
          });
          break;
        case '4':
          params.Info.Filters.push({
            NombreFiltro: 'TieneVencidaNaranja',
            ValorFiltro: true,
          });
          break;
        case '5':
          params.Info.Filters.push({
            NombreFiltro: 'TieneVencidaRojo',
            ValorFiltro: true,
          });
          break;
        case '6':
          params.Info.Filters.push({
            NombreFiltro: 'TieneMorosa',
            ValorFiltro: true,
          });
          break;
      }
    }
    return params;
  },
);

export const selectActualWeek = createSelector(
  selectExecuteColllectionCalendarWeek,
  (state: IWeek): Array<string> => state.actualWeek,
);

export const selectExecuteCalendarDay = createSelector(
  selectExecuteColllectionCalendarWeek,
  (state: IWeek): Array<CalendarioEjecutarCobranzaDia> =>
    state.calendarWeek?.CalendarioEjecutarCobranzaDia,
);

export const selectCalendarWeek = createSelector(
  selectExecuteColllectionCalendarWeek,
  (state: IWeek): CalendarioEjecutarCobranzaPeriodo => state.calendarWeek,
);

export const selectNewChips = createSelector(
  selectExecuteColllectionCalendarWeek,
  (state: IWeek): Array<IChip> =>
    _map(state.chips, (o: IChip) => {
      switch (o.value) {
        case '1':
          o.total = state.calendarWeek.ACobrar;
          break;
        case '2':
          o.total = state.calendarWeek.Cobrado;
          break;
        case '3':
          o.total = state.calendarWeek.EnRevision;
          break;
      }
      return o;
    }),
);

export const selectNewChip = createSelector(
  [selectChips, selectCalendarWeek],
  (chipSelected: Array<IChip>, calendarWeek: CalendarioEjecutarCobranzaPeriodo): Array<IChip> =>
    !isEmpty(calendarWeek)
      ? _map(chipSelected, (o: IChip) => ({
          ...o,
          total:
            o.value === '1'
              ? calendarWeek.ACobrar
              : o.value === '2'
              ? calendarWeek.Cobrado
              : calendarWeek.EnRevision,
        }))
      : chipSelected,
);

export const selectMondayCalendarDay = createSelector(
  [selectActualWeek, selectExecuteCalendarDay],
  (
    actualWeek: Array<string>,
    calendarioCobranzaDia: Array<CalendarioEjecutarCobranzaDia>,
  ): CalendarioEjecutarCobranzaDia => {
    const arrayDay = filter(
      calendarioCobranzaDia,
      (o: CalendarioEjecutarCobranzaDia) => o.Fecha === actualWeek[0],
    );
    return !isEmpty(arrayDay)
      ? {
          ...arrayDay[0],
          ListaClientes: _map(
            arrayDay[0].ListaClientes,
            (o: VFacturaClienteCalendarioTotales, index: number) => ({
              ...o,
              Index: index + 1,
            }),
          ),
        }
      : {};
  },
);
export const selectTuesdayCalendarDay = createSelector(
  [selectActualWeek, selectExecuteCalendarDay],
  (
    actualWeek: Array<string>,
    calendarioCobranzaDia: Array<CalendarioEjecutarCobranzaDia>,
  ): CalendarioEjecutarCobranzaDia => {
    const arrayDay = filter(
      calendarioCobranzaDia,
      (o: CalendarioEjecutarCobranzaDia) => o.Fecha === actualWeek[1],
    );

    return !isEmpty(arrayDay)
      ? {
          ...arrayDay[0],
          ListaClientes: _map(
            arrayDay[0].ListaClientes,
            (o: VFacturaClienteCalendarioTotales, index: number) => ({
              ...o,
              Index: index + 1,
            }),
          ),
        }
      : {};
  },
);

export const selectWednesdayCalendarDay = createSelector(
  [selectActualWeek, selectExecuteCalendarDay],
  (
    actualWeek: Array<string>,
    calendarioCobranzaDia: Array<CalendarioEjecutarCobranzaDia>,
  ): CalendarioEjecutarCobranzaDia => {
    const arrayDay = filter(
      calendarioCobranzaDia,
      (o: CalendarioEjecutarCobranzaDia) => o.Fecha === actualWeek[2],
    );
    return !isEmpty(arrayDay)
      ? {
          ...arrayDay[0],
          ListaClientes: _map(
            arrayDay[0].ListaClientes,
            (o: VFacturaClienteCalendarioTotales, index: number) => ({
              ...o,
              Index: index + 1,
            }),
          ),
        }
      : {};
  },
);

export const selectThursDayCalendarDay = createSelector(
  [selectActualWeek, selectExecuteCalendarDay],
  (
    actualWeek: Array<string>,
    calendarioCobranzaDia: Array<CalendarioEjecutarCobranzaDia>,
  ): CalendarioEjecutarCobranzaDia => {
    const arrayDay = filter(
      calendarioCobranzaDia,
      (o: CalendarioEjecutarCobranzaDia) => o.Fecha === actualWeek[3],
    );
    return !isEmpty(arrayDay)
      ? {
          ...arrayDay[0],
          ListaClientes: _map(
            arrayDay[0].ListaClientes,
            (o: VFacturaClienteCalendarioTotales, index: number) => ({
              ...o,
              Index: index + 1,
            }),
          ),
        }
      : {};
  },
);

export const selectFridayCalendarDay = createSelector(
  [selectActualWeek, selectExecuteCalendarDay],
  (
    actualWeek: Array<string>,
    calendarioCobranzaDia: Array<CalendarioEjecutarCobranzaDia>,
  ): CalendarioEjecutarCobranzaDia => {
    const arrayDay = filter(
      calendarioCobranzaDia,
      (o: CalendarioEjecutarCobranzaDia) => o.Fecha === actualWeek[4],
    );
    return !isEmpty(arrayDay)
      ? {
          ...arrayDay[0],
          ListaClientes: _map(
            arrayDay[0].ListaClientes,
            (o: VFacturaClienteCalendarioTotales, index: number) => ({
              ...o,
              Index: index + 1,
            }),
          ),
        }
      : {};
  },
);

export const selectClientOptions = createSelector(
  selectExecuteColllectionCalendarMonth,
  (state: IMonth): Array<DropListOption> => state.clientOptions,
);

export const selectedClientOptions = createSelector(
  selectExecuteColllectionCalendarMonth,
  (state: IMonth): DropListOption => state.selectedClientOption,
);

export const selectPaymentStatusOptions = createSelector(
  selectExecuteColllectionCalendarMonth,
  (state: IMonth): Array<DropListOption> => state.paymentStatusOptions,
);

export const selectedPaymentStatusOption = createSelector(
  selectExecuteColllectionCalendarMonth,
  (state: IMonth): DropListOption => state.selectedPaymentStatusOption,
);

export const selectTypePaymentOptions = createSelector(
  selectExecuteColllectionCalendarMonth,
  (state: IMonth): Array<DropListOption> => state.typePaymentOptions,
);

export const selectedTypePaymentOptions = createSelector(
  selectExecuteColllectionCalendarMonth,
  (state: IMonth): DropListOption => state.selectedTypePaymentOption,
);

export const selectFromCalendar = createSelector(
  selectExecuteColllectionCalendarMonth,
  (state: IMonth): Date => state.fromCalendar,
);

export const selectToCalendar = createSelector(
  selectExecuteColllectionCalendarMonth,
  (state: IMonth): Date => state.toCalendar,
);

export const selectFromCalendarString = createSelector(
  selectExecuteColllectionCalendarMonth,
  (state: IMonth): string => state.fromCalendarString,
);

export const selectToCalendarString = createSelector(
  selectExecuteColllectionCalendarMonth,
  (state: IMonth): string => state.toCalendarString,
);

export const selectTypeClientOptions = createSelector(
  selectExecuteColllectionCalendarMonth,
  (state: IMonth): Array<DropListOption> => state.typeClientOptions,
);

export const selectedTypeClientOptions = createSelector(
  selectExecuteColllectionCalendarMonth,
  (state: IMonth): DropListOption => state.selectedTypeClientOption,
);
