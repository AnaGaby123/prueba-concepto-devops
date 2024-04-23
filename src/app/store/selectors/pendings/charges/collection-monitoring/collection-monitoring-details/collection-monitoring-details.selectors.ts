import {createSelector} from '@ngrx/store';

// Models
import {ITabOption} from '@appModels/botonera/botonera-option';
import {
  DEBT_STATUS_OPTIONS,
  ICollectionMonitoringDetails,
} from '@appModels/store/pendings/charges/collection-monitoring/collection-monitoring-details/collection-monitoring-details.models';
import {
  FacturasPendientesClienteObj,
  ParametroAgregarComentarioFacturaCliente,
  VFacturaClienteCalendarioTotales,
} from 'api-finanzas';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IInvoice} from '@appModels/store/pendings/charges/execute-collection/execute-collection-details/execute-collection-details.models';
import {IPercentageBarItems} from '@appModels/percentage-bar/percentage-bar';
import {ContactoDetalleObj, QueryInfo} from 'api-catalogos';
import {FiltersOnlyActive, IFilterDate} from '@appModels/filters/Filters';

// Selectors
import {selectCollectionMonitoringDetails} from '@appSelectors/pendings/charges/collection-monitoring/collection-monitoring.selectors';
import {selectCatMedioDePagoForDropDown} from '@appSelectors/catalogs/catalogs.selectors';

// Utils
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {concat, filter, isEmpty, map as _map, sumBy, toNumber} from 'lodash-es';

export const selectCollectionDetails = createSelector(
  selectCollectionMonitoringDetails,
  (state: ICollectionMonitoringDetails) => state,
);
export const selectTabOptions = createSelector(
  selectCollectionDetails,
  (state: ICollectionMonitoringDetails): Array<ITabOption> => state.tabOptions,
);
export const selectTabOption = createSelector(
  selectCollectionDetails,
  (state: ICollectionMonitoringDetails): ITabOption => state.selectedTabOption,
);
export const selectMecOptions = createSelector(
  selectCollectionDetails,
  (state: ICollectionMonitoringDetails): Array<DropListOption> => state.mecOptions,
);
export const selectedMecOption = createSelector(
  selectCollectionDetails,
  (state: ICollectionMonitoringDetails): DropListOption => state.selectedMecOption,
);
export const selectPaymentMethodsOptions = createSelector(
  [selectCollectionDetails, selectCatMedioDePagoForDropDown],
  (
    state: ICollectionMonitoringDetails,
    paymentMethods: Array<DropListOption>,
  ): Array<DropListOption> => concat(state.paymentMethodsOptions, paymentMethods),
);
export const selectedPaymentMethodsOption = createSelector(
  selectCollectionDetails,
  (state: ICollectionMonitoringDetails): DropListOption => state.selectedPaymentMethodsOption,
);
export const selectDebtOptions = createSelector(
  selectCollectionDetails,
  (state: ICollectionMonitoringDetails): Array<DropListOption> => state.debtOptions,
);
export const selectedDebtOption = createSelector(
  selectCollectionDetails,
  (state: ICollectionMonitoringDetails): DropListOption => state.selectedDebtOption,
);
export const selectSearchTypeOptions = createSelector(
  selectCollectionDetails,
  (state: ICollectionMonitoringDetails): Array<DropListOption> => state.searchTypeOptions,
);
export const selectedSearchType = createSelector(
  selectCollectionDetails,
  (state: ICollectionMonitoringDetails): DropListOption => state.selectedSearchType,
);
export const selectSearchTerm = createSelector(
  selectCollectionDetails,
  (state: ICollectionMonitoringDetails) => state?.searchTerm,
);
export const selectedBillFilterDate = createSelector(
  selectCollectionDetails,
  (state: ICollectionMonitoringDetails): IFilterDate => state.billFilterDate,
);
export const selectedChargeFilterDate = createSelector(
  selectCollectionDetails,
  (state: ICollectionMonitoringDetails): IFilterDate => state.chargeFilterDate,
);
export const selectedClient = createSelector(
  selectCollectionDetails,
  (state: ICollectionMonitoringDetails): VFacturaClienteCalendarioTotales => state.selectedClient,
);
export const selectBarsData = createSelector(
  selectCollectionDetails,
  (state: ICollectionMonitoringDetails): FacturasPendientesClienteObj => state.barsData,
);
export const selectInvoices = createSelector(
  selectCollectionDetails,
  (state: ICollectionMonitoringDetails): Array<IInvoice> => state.invoices,
);
export const selectedInvoices = createSelector(
  selectCollectionDetails,
  (state: ICollectionMonitoringDetails): Array<IInvoice> =>
    filter(state.invoices, (o: IInvoice) => o.selected),
);
export const selectInvoicesWithComments = createSelector(
  selectedInvoices,
  (state: Array<IInvoice>): Array<IInvoice> =>
    !isEmpty(state) ? filter(state, (o: IInvoice) => !!o.comments) : [],
);
export const selectedInvoicesAmount = createSelector(
  selectedInvoices,
  (state: Array<IInvoice>): number => sumBy(state, (o: IInvoice) => toNumber(o.MontoPendiente)),
);
export const selectItemsStatus = createSelector(
  selectCollectionDetails,
  (state: ICollectionMonitoringDetails): number => state.itemsStatus,
);
export const selectPercentageItemsDebts = createSelector(
  selectCollectionDetails,
  (state: ICollectionMonitoringDetails): Array<IPercentageBarItems> => [
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
export const selectClientContact = createSelector(
  selectCollectionDetails,
  (state: ICollectionMonitoringDetails): ContactoDetalleObj => state?.clientContact,
);
export const selectQueryInfoInvoice = createSelector(
  selectCollectionMonitoringDetails,
  (state: ICollectionMonitoringDetails): QueryInfo => {
    const queryInfo = new FiltersOnlyActive();
    queryInfo.Filters.push({
      NombreFiltro: 'IdCliente',
      ValorFiltro: state.selectedClient?.IdCliente,
    });
    if (state.selectedTabOption.id !== '1') {
      queryInfo.Filters.push({
        NombreFiltro: 'Alias',
        ValorFiltro: state.selectedTabOption.label,
      });
    }
    if (!isEmpty(state.selectedDebtOption) && state.selectedDebtOption.value !== '1') {
      queryInfo.Filters.push({
        NombreFiltro: DEBT_STATUS_OPTIONS[state.selectedDebtOption.value],
        ValorFiltro: true,
      });
    }
    if (!isEmpty(state.selectedMecOption)) {
      queryInfo.SortField = 'MontoPendiente';
      queryInfo.SortDirection = state.selectedMecOption.value === '1' ? 'Desc' : 'Asc';
    }
    if (!isEmpty(state.billFilterDate)) {
      queryInfo.Filters.push(
        {
          NombreFiltro: 'FechaInicioFacturacion',
          ValorFiltro: state.billFilterDate.startDate,
        },
        {
          NombreFiltro: 'FechaFinFacturacion',
          ValorFiltro: state.billFilterDate.endDate,
        },
      );
    }
    if (!isEmpty(state.chargeFilterDate)) {
      queryInfo.Filters.push(
        {
          NombreFiltro: 'FechaInicio',
          ValorFiltro: state.chargeFilterDate.startDate,
        },
        {
          NombreFiltro: 'FechaFin',
          ValorFiltro: state.chargeFilterDate.endDate,
        },
      );
    }
    if (state.searchTerm && !isEmpty(state.selectedSearchType)) {
      queryInfo.Filters.push({
        NombreFiltro: state.selectedSearchType.value === '1' ? 'Factura' : 'PedidoInterno',
        ValorFiltro: state.searchTerm,
      });
    }
    if (
      !isEmpty(state.selectedPaymentMethodsOption) &&
      state.selectedPaymentMethodsOption.value !== '1'
    ) {
      queryInfo.Filters.push({
        NombreFiltro: 'IdCatMedioDePago',
        ValorFiltro: state.selectedPaymentMethodsOption.value,
      });
    }
    return queryInfo;
  },
);
export const validatorForAddCommentsButton = createSelector(
  selectedInvoices,
  (state: Array<IInvoice>): boolean => state?.length > 1,
);
export const selectAllItemsAreSelected = createSelector(
  [selectInvoices, selectedInvoices],
  (invoices: Array<IInvoice>, checkedInvoices: Array<IInvoice>): boolean =>
    invoices.length > 0 && invoices.length === checkedInvoices.length,
);
export const validatorForAcceptButton = createSelector(
  selectedInvoices,
  (state: Array<IInvoice>): boolean =>
    !isEmpty(state) && isEmpty(filter(state, (o: IInvoice) => !o.comments)),
);
export const paramsForComments = createSelector(
  selectInvoicesWithComments,
  (invoices: Array<IInvoice>): Array<ParametroAgregarComentarioFacturaCliente> =>
    _map(invoices, (o: IInvoice) => ({
      Comentarios: o.comments,
      ListaIdTPProformaPedido: [o.IdTPProformaPedido],
    })),
);
export const paramsForNewDates = createSelector(
  selectInvoicesWithComments,
  (invoices: Array<IInvoice>): Array<ParametroAgregarComentarioFacturaCliente> =>
    _map(invoices, (o: IInvoice) => o.fccProgramacionCobro),
);
