/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Selectors Imports */
import {selectExecuteCollectionDetails} from '@appSelectors/pendings/charges/execute-collection/execute-collection.selectors';

/* Models Imports */
import {
  ICreditNotesTotals,
  IExecuteCollectionDetails,
  IExecuteCollectionPayment,
  IFccNotaCredito,
  IFccPagoCliente,
  IInvoice,
  IPaymentTransaction,
  IPaymentTransactionConversion,
  IPaymentTransactionTotals,
} from '@appModels/store/pendings/charges/execute-collection/execute-collection-details/execute-collection-details.models';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {VFacturaClienteCalendarioTotales} from 'api-finanzas';
import {IPercentageBarItems} from '@appModels/percentage-bar/percentage-bar';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {ContactoDetalleObj} from 'api-catalogos';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {filter, forOwn, isEmpty, subtract, sum, sumBy, toNumber} from 'lodash-es';

import {getArrayForDropDownList} from '@appUtil/util';
import {IUploadFileCustom} from '@appModels/files/files.models';
import {DEBT_STATUS_OPTIONS} from '@appModels/store/pendings/charges/collection-monitoring/collection-monitoring-details/collection-monitoring-details.models';
import {CURRENCY_MXN, CURRENCY_USD} from '@appUtil/common.protocols';
import {
  ICancelInvoice,
  IRebill,
} from '@appModels/store/pendings/charges/attend-review/attend-review-details/attend-review-details.models';

export const selectSearchTerm = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): string => state.searchTerm,
);
export const selectBurgerOptions = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): Array<DropListOption> => state.burgerOptions,
);
export const selectBurgerOptionSelected = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): DropListOption => state.burgerOptionSelected,
);
export const selectChargeOptions = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): Array<DropListOption> => state.chargesOptions,
);
export const selectCurrencyOptions = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): Array<DropListOption> => state.currencyOptions,
);
export const selectSearchTypesOptions = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): Array<DropListOption> => state.searchTypeOptions,
);
export const selectMecOptions = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): Array<DropListOption> => state.mecOptions,
);
export const selectBankDataOptions = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): Array<DropListOption> =>
    getArrayForDropDownList(state.bankData, 'IdDatosBancarios', 'NumeroDeCuenta'),
);
export const selectNeedsToReload = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): boolean => state.needsToReload,
);
export const selectPaymentListFilters = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails) => {
    const params = new FiltersOnlyActive();
    params.Filters.push({
      NombreFiltro: 'IdCliente',
      ValorFiltro: state.selectedClient?.IdCliente,
    });
    if (state.searchTerm) {
      params.Filters.push({
        NombreFiltro: 'Folio',
        ValorFiltro: state.searchTerm,
      });
    }
    params.SortField = 'FechaRecepcion';
    params.SortDirection = state.burgerOptionSelected.value === '1' ? 'desc' : 'asc';
    return params;
  },
);
export const selectPaymentList = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): Array<IExecuteCollectionPayment> => state.paymentList,
);
export const selectPaymentStatus = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): number => state.paymentStatus,
);
export const selectInvoicesStatus = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): number => state.itemsStatus,
);
export const selectedClient = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): VFacturaClienteCalendarioTotales => state.selectedClient,
);
export const selectedPayment = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): IExecuteCollectionPayment => state.selectedPayment,
);
export const selectContactClient = createSelector(
  selectedPayment,
  (state: IExecuteCollectionPayment): ContactoDetalleObj => state?.clientContact,
);
export const selectChargeOptionSelected = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): DropListOption => state?.selectedChargesOption,
);
export const selectedTypeOfSearch = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): DropListOption => state?.selectedSearchType,
);
export const selectMecOptionSelected = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): DropListOption => state?.selectedMecOption,
);
export const selectPaymentMethodsOptionSelected = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): DropListOption => state?.selectedPaymentMethodsOption,
);
export const selectTotalAmountsConversion = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): IPaymentTransactionConversion => {
    const currencies = {
      [CURRENCY_USD]: () => ({
        totalAmountUSD: Number(state.paymentTransaction.fccPagoCliente.Monto),
        totalAmountMXN:
          Number(state.paymentTransaction.fccPagoCliente.Monto) *
          Number(state.paymentTransaction.fccPagoCliente.TipoDeCambio),
      }),
      [CURRENCY_MXN]: () => ({
        totalAmountUSD:
          Number(state.paymentTransaction.fccPagoCliente.Monto) /
          Number(state.paymentTransaction.fccPagoCliente.TipoDeCambio),
        totalAmountMXN: Number(state.paymentTransaction.fccPagoCliente.Monto),
      }),
      ['default']: () => ({
        totalAmountUSD: 0,
        totalAmountMXN: 0,
      }),
    };
    const property = state?.paymentTransaction?.selectedCurrency?.label?.toUpperCase() || 'default';
    return currencies[property]();
  },
);
export const selectNeedsToReloadItems = createSelector(
  selectedPayment,
  (state: IExecuteCollectionPayment): boolean => state?.needsToReloadItems,
);
export const selectPercentageItemsDebts = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): Array<IPercentageBarItems> => [
    {
      id: '1',
      percentage: `${Math.floor(
        (state?.barsData?.TotalDeudaSana * 100) / state?.barsData?.TotalACobrar,
      )}%`,
      subtitle: `EN TIEMPO · ${new CurrencyFormat().transform(
        state?.barsData?.TotalDeudaSana,
        'USD',
      )} USD`,
      color: '#4ba92b',
      value: state?.barsData?.TotalDeudaSana,
    },
    {
      id: '2',
      percentage: `${Math.ceil(
        (state?.barsData?.TotalVencido * 100) / state?.barsData?.TotalACobrar,
      )}%`,
      subtitle: `VENCIDO · ${new CurrencyFormat().transform(
        state?.barsData?.TotalVencido,
        'USD',
      )} USD`,
      color: '#e29d2a',
      value: state?.barsData?.TotalVencido,
    },
  ],
);
export const selectCustomer = createSelector(
  selectExecuteCollectionDetails,
  (state) => state.selectedClient,
);
export const selectPayment = createSelector(
  selectExecuteCollectionDetails,
  (state) => state.selectedPayment,
);
export const selectDataCompanies = createSelector(
  selectExecuteCollectionDetails,
  (state) => state.totalsTabs,
);
export const selectOptionsTab = createSelector(
  selectDataCompanies,
  (options): Array<ITabOption> => {
    const tabs: Array<ITabOption> = [];
    let index = 1;
    let total = 0;
    forOwn(options, (value, key) => {
      tabs.push({
        id: index.toString(),
        label: key,
        activeSubtitle: true,
        labelSubtitle: 'facturas',
        totalSubtitle: value,
      });
      total = total + value;
      index++;
    });
    tabs.unshift({
      id: '0',
      label: 'Todas las empresas',
      activeSubtitle: true,
      labelSubtitle: 'facturas',
      totalSubtitle: total,
    });
    return tabs;
  },
);
export const selectBillSearch = createSelector(
  selectExecuteCollectionDetails,
  (state) => state?.billsSearchTerm,
);
export const selectedTab = createSelector(selectExecuteCollectionDetails, (state) =>
  state?.selectedTab ? state.selectedTab : null,
);
export const selectQueryInfoInvoice = createSelector(
  [
    selectedTab,
    selectCustomer,
    selectMecOptionSelected,
    selectPaymentMethodsOptionSelected,
    selectChargeOptionSelected,
    selectedTypeOfSearch,
    selectBillSearch,
  ],
  (
    tab: ITabOption,
    customer: VFacturaClienteCalendarioTotales,
    mecOption: DropListOption,
    paymentMethodsOption: DropListOption,
    chargeOption: DropListOption,
    typeOfSearch: DropListOption,
    billSearch: string,
  ) => {
    const queryInfo = new FiltersOnlyActive();
    queryInfo.Filters.push({
      NombreFiltro: 'IdCliente',
      ValorFiltro: customer.IdCliente,
    });
    if (tab && tab.id !== '0') {
      queryInfo.Filters.push({NombreFiltro: 'Alias', ValorFiltro: tab.label});
    }
    if (chargeOption && chargeOption.value !== '1') {
      if (!isEmpty(chargeOption)) {
        const type = DEBT_STATUS_OPTIONS[chargeOption.value];
        queryInfo.Filters.push({NombreFiltro: type, ValorFiltro: true});
      }
    }
    if (mecOption) {
      queryInfo.SortField = 'MontoPendiente';
      queryInfo.SortDirection = mecOption.value === '1' ? 'Desc' : 'Asc';
    }
    if (billSearch) {
      queryInfo.Filters.push({
        NombreFiltro: typeOfSearch.value === '1' ? 'Factura' : 'PedidoInterno',
        ValorFiltro: billSearch,
      });
    }
    if (paymentMethodsOption) {
      queryInfo.Filters.push({
        NombreFiltro: 'IdCatMedioDePago',
        ValorFiltro: paymentMethodsOption.value,
      });
    }
    return queryInfo;
  },
);
export const selectFiltersForCreditNotes = createSelector(
  selectCustomer,
  (client: VFacturaClienteCalendarioTotales) => {
    const params = new FiltersOnlyActive();
    params.Filters.push(
      {
        NombreFiltro: 'IdCliente',
        ValorFiltro: client.IdCliente,
      },
      {
        NombreFiltro: 'Aplicada',
        ValorFiltro: false,
      },
    );
    return params;
  },
);
export const selectBillList = createSelector(selectExecuteCollectionDetails, (state) =>
  state?.itemsList ? state.itemsList : [],
);
export const selectCreditNotes = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): Array<IFccNotaCredito> => state.creditNotes || [],
);
export const selectedCreditNotes = createSelector(
  selectExecuteCollectionDetails,
  (creditNotes: IExecuteCollectionDetails): Array<IFccNotaCredito> =>
    filter(creditNotes, (o: IFccNotaCredito) => o.isSelected),
);
export const selectCreditNotesTotals = createSelector(
  selectCreditNotes,
  (state: Array<IFccNotaCredito>): ICreditNotesTotals =>
    !isEmpty(state)
      ? {
          Length: state.length,
          TotalUSD: sumBy(state, (o: IFccNotaCredito) => o.MontoUSD),
          TotalMXN: sumBy(state, (o: IFccNotaCredito) => o.MontoMXN),
        }
      : {
          Length: 0,
          TotalUSD: 0,
          TotalMXN: 0,
        },
);
export const selectedBillList = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): Array<IInvoice> => state?.paymentTransaction.itemsList,
);
export const selectFiltersForBankData = createSelector(
  selectedBillList,
  (bills: Array<IInvoice>) => {
    const params = new FiltersOnlyActive();
    if (!isEmpty(bills)) {
      params.Filters.push({
        NombreFiltro: 'IdEmpresa',
        ValorFiltro: bills[0].IdEmpresa,
      });
    }
    return params;
  },
);
export const validatorForManagePaymentButton = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): boolean =>
    !isEmpty(filter(state.itemsList, (o: IInvoice) => o.selected)),
);
export const selectPaymentTransaction = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails): IPaymentTransaction => state.paymentTransaction,
);
export const selectFccPagoCliente = createSelector(
  selectPaymentTransaction,
  (state: IPaymentTransaction): IFccPagoCliente => state.fccPagoCliente,
);
export const selectFiles = createSelector(
  selectPaymentTransaction,
  (state: IPaymentTransaction): Array<IUploadFileCustom> => state.files,
);
export const selectPaymentTotals = createSelector(
  [selectedCreditNotes, selectedBillList],
  (
    creditNotes: Array<IFccNotaCredito>,
    selectedBills: Array<IInvoice>,
  ): IPaymentTransactionTotals => ({
    CreditNotes: sumBy(creditNotes, (o: IFccNotaCredito) => toNumber(o.Monto)) || 0,
    Payment: sumBy(selectedBills, (o: IInvoice) => toNumber(o.MontoPagado)),
    Unpaid: subtract(
      sumBy(selectedBills, (o: IInvoice) => toNumber(o.MontoPendiente)),
      sumBy(selectedBills, (o: IInvoice) => toNumber(o.MontoPagado)),
    ),
    Total: sum([
      sumBy(creditNotes, (o: IFccNotaCredito) => toNumber(o.Monto)) || 0,
      sumBy(selectedBills, (o: IInvoice) => toNumber(o.MontoPagado)),
    ]),
  }),
);
export const selectInvoiceSelected = createSelector(
  selectExecuteCollectionDetails,
  (state): number =>
    !isEmpty(filter(state.itemsList, (o: IInvoice) => o.selected))
      ? filter(state.itemsList, (o: IInvoice) => o.selected).length
      : 0,
);
export const selectAmountBills = createSelector(selectExecuteCollectionDetails, (state): number =>
  sumBy(
    filter(state.itemsList, (o: IInvoice) => o.selected),
    (o: IInvoice) => toNumber(o.MontoPendiente),
  ),
);
export const selectAmountTotalBills = createSelector(selectExecuteCollectionDetails, (state) =>
  sumBy(state.itemsList, (o) => toNumber(o.MontoPendiente)),
);

// Selectores Rebill

export const selectRebill = createSelector(
  selectExecuteCollectionDetails,
  (state: IExecuteCollectionDetails) => state.rebill,
);
export const selectReasonOptions = createSelector(
  selectRebill,
  (state: IRebill) => state.reasonOptions,
);
export const selectRadioButtons = createSelector(
  selectRebill,
  (state: IRebill) => state.radioButtons,
);
export const selectCancelInvoiceState = createSelector(
  selectRebill,
  (state: IRebill) => state.cancelInvoice,
);
export const selectRebillState = createSelector(
  selectRebill,
  (state: IRebill) => state.rebillRadio,
);
export const selectCreditNoteState = createSelector(
  selectRebill,
  (state: IRebill) => state.creditNote,
);
export const validatorForConfirmCancellation = createSelector(
  [selectRebill, selectCancelInvoiceState],
  (state: IRebill, cancelInvoiceState: ICancelInvoice): boolean =>
    cancelInvoiceState.reason !== null,
);
export const selectRebillCheckBox = createSelector(
  selectRebill,
  (state: IRebill) => state.rebillRadio.checkBox,
);
export const selectRebillValidateCancelButton = createSelector(
  selectRebill,
  (state: IRebill): boolean =>
    state.rebillRadio.reason !== null && state.rebillRadio.checkBox === false,
);
export const selectIsLoadingFile = createSelector(
  selectExecuteCollectionDetails,
  (state) => state.isLoadingFile,
);
