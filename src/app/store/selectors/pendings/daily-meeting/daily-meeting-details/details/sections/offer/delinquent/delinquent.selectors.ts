/* Core Imports */
import {createSelector} from '@ngrx/store';
import {flow, forEach, isEmpty, map as _map, orderBy} from 'lodash-es';

/* Tools Imports */
import {FacturasPendientesClienteObj} from 'api-finanzas';
import {IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';

/* Selectors Imports */
import {selectDelinquent} from '@appSelectors/pendings/daily-meeting/daily-meeting-details/details/sections/offer/offer.selectors';

/* Models Imports */
import {IDelinquentState} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/details/sections/offer/offer.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
//
export const selectDataPendingInvoices = createSelector(
  selectDelinquent,
  (state: IDelinquentState) => state.dataPendingInvoices,
);
export const selectPaymentConditions = createSelector(
  selectDelinquent,
  (state: IDelinquentState) => {
    return isEmpty(state.dataPendingInvoices.catCondicionesDePago)
      ? 'O Días'
      : state.dataPendingInvoices.catCondicionesDePago.CondicionesDePago;
  },
);
export const selectDataByType = createSelector(
  selectDelinquent,
  (state: IDelinquentState) => state.dataByType,
);
export const selectFilterByType = createSelector(
  selectDelinquent,
  (state: IDelinquentState) => state.filterByType,
);
export const selectHealthyDebtBills = createSelector(
  [selectDataPendingInvoices, selectFilterByType],
  (pendingsInvoices: FacturasPendientesClienteObj, filterByType: DropListOption) =>
    flow([
      () => {
        if (filterByType.value === '1') {
          return orderBy(
            pendingsInvoices.FacturasDeudaSana,
            [(o) => new Date(o.m_Item1.FechaRegistro).getTime(), (o) => o.m_Item4],
            'desc',
          );
        } else if (filterByType.value === '2') {
          return orderBy(
            pendingsInvoices.FacturasDeudaSana,
            [(o) => new Date(o.m_Item1.FechaRegistro).getTime(), (o) => o.m_Item4],
            'asc',
          );
        }
      },
      (facturasDeudaSana) =>
        _map(facturasDeudaSana, (invoice, index) => ({
          ...invoice,
          Index: index + 1,
        })),
    ])(),
);
export const selectDelinquentBills = createSelector(
  [selectDataPendingInvoices, selectFilterByType],
  (pendingsInvoices: FacturasPendientesClienteObj, filterByType: DropListOption) =>
    flow([
      () => {
        if (filterByType.value === '1') {
          return orderBy(
            pendingsInvoices.FacturasMorosas,
            [(o) => new Date(o.m_Item1.FechaRegistro).getTime(), (o) => o.m_Item4],
            'desc',
          );
        } else if (filterByType.value === '2') {
          return orderBy(
            pendingsInvoices.FacturasMorosas,
            [(o) => new Date(o.m_Item1.FechaRegistro).getTime(), (o) => o.m_Item4],
            'asc',
          );
        }
      },
      (facturasMorosas) =>
        _map(facturasMorosas, (invoice, index) => ({
          ...invoice,
          Index: index + 1,
        })),
    ])(),
);
export const selectCreditNotes = createSelector(
  [selectDataPendingInvoices, selectFilterByType],
  (pendingsInvoices: FacturasPendientesClienteObj, filterByType: DropListOption) =>
    flow([
      () => {
        if (filterByType.value === '1') {
          return orderBy(
            pendingsInvoices.NotasDeCredito,
            [(o) => new Date(o.m_Item1.FechaRegistro).getTime(), (o) => o.m_Item3],
            'desc',
          );
        } else if (filterByType.value === '2') {
          return orderBy(
            pendingsInvoices.NotasDeCredito,
            [(o) => new Date(o.m_Item1.FechaRegistro).getTime(), (o) => o.m_Item3],
            'asc',
          );
        }
      },
      (notasDeCredito) =>
        _map(notasDeCredito, (invoice, index) => ({
          ...invoice,
          Index: index + 1,
        })),
    ])(),
);
export const selectDoughnutChartDataDefaulting = createSelector(
  [selectHealthyDebtBills, selectDelinquentBills, selectCreditNotes],
  (healthyDebtBills, delinquentBills, creditNotes) =>
    flow([
      (): IDoughnutChart => {
        const labels = ['Morosidad', 'Deuda Sana', 'Notas de Crédito'];
        let values: Array<number>;
        let totalCreditNotes = 0;
        let totalHealthyDebtBills = 0;
        let totalDelinquentBills = 0;
        forEach(creditNotes, (o) => {
          totalCreditNotes += o.m_Item3;
        });
        forEach(healthyDebtBills, (o) => {
          totalHealthyDebtBills += o.m_Item4;
        });
        forEach(delinquentBills, (o) => {
          totalDelinquentBills += o.m_Item4;
        });
        values = [totalDelinquentBills, totalHealthyDebtBills, totalCreditNotes];
        return {labels, values};
      },
    ])(),
);
export const selectTotalCreditNotes = createSelector(
  selectDoughnutChartDataDefaulting,
  (dataChart: IDoughnutChart) => dataChart.values[2],
);
export const selectTotalDelinquent = createSelector(
  selectDoughnutChartDataDefaulting,
  (dataChart: IDoughnutChart) => dataChart.values[0],
);
export const selectTotalHealthy = createSelector(
  selectDoughnutChartDataDefaulting,
  (dataChart: IDoughnutChart) => dataChart.values[1],
);
export const selectRemains = createSelector(
  selectDoughnutChartDataDefaulting,
  (state: IDoughnutChart) => state.values[1] + state.values[0] - state.values[2],
);
export const selectCurrencyClient = createSelector(selectDataPendingInvoices, (state) =>
  state.catMoneda ? state.catMoneda.ClaveMoneda : '',
);
export const selectDoughnutChartDefaultingDetails = createSelector(
  selectDoughnutChartDataDefaulting,
  selectDataPendingInvoices,
  selectCurrencyClient,
  (chartData, pendingsInvoices: FacturasPendientesClienteObj, currency) =>
    flow([
      (): Array<IDoughnutChartDetails> => {
        const totalDelinquentBills = chartData.values[0];
        const totalHealthyDebtBills = chartData.values[1];
        const totalCreditNotes = chartData.values[2];
        if (!isEmpty(pendingsInvoices)) {
          return [
            {
              label: 'Morosidad',
              value: `${new CurrencyFormat().transform(
                totalDelinquentBills,
                currency,
              )} ${currency}`,
            },
            {
              label: 'Deuda Sana',
              value: `${new CurrencyFormat().transform(
                totalHealthyDebtBills,
                currency,
              )} ${currency}`,
            },
            {
              label: 'Notas de Crédito',
              value: `${new CurrencyFormat().transform(totalCreditNotes, currency)} ${currency}`,
            },
          ];
        } else {
          return [];
        }
      },
    ])(),
);
export const selectDoughnutChartDefaultingDetailsHover = createSelector(
  selectDoughnutChartDefaultingDetails,
  (chartData) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        let data: Array<Array<IDoughnutChartDetails>> = [];
        forEach(chartData, (o) => {
          let details: Array<IDoughnutChartDetails> = [];
          details = [...details, {label: o.label, value: o.value}];
          data = [...data, details];
        });
        return data;
      },
    ])(),
);
