import {ActionReducer, createReducer, on} from '@ngrx/store';

// Models
import {
  ICollectionMonitoringDetails,
  initialICollectionMonitoringDetails,
} from '@appModels/store/pendings/charges/collection-monitoring/collection-monitoring-details/collection-monitoring-details.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IInvoice} from '@appModels/store/pendings/charges/execute-collection/execute-collection-details/execute-collection-details.models';

// Actions
import {collectionMonitoringDetailsActions} from '@appActions/pendings/charges/collection-monitoring';

// Utils
import {forOwn, map} from 'lodash-es';

export const collectionMonitoringDetailsReducer: ActionReducer<ICollectionMonitoringDetails> = createReducer(
  {...initialICollectionMonitoringDetails()},
  on(
    collectionMonitoringDetailsActions.CLEAN_ALL_DETAILS_STATE,
    (): ICollectionMonitoringDetails => ({
      ...initialICollectionMonitoringDetails(),
    }),
  ),
  on(
    collectionMonitoringDetailsActions.SET_SELECTED_CLIENT,
    (state: ICollectionMonitoringDetails, {selectedClient}): ICollectionMonitoringDetails => ({
      ...state,
      selectedClient,
    }),
  ),
  on(
    collectionMonitoringDetailsActions.FETCH_COMPANIES_SUCCESS,
    (state: ICollectionMonitoringDetails, {companiesList}): ICollectionMonitoringDetails => {
      const tabs: Array<ITabOption> = [];
      let index = 2;
      let total = 0;
      forOwn(companiesList, (value, key) => {
        tabs.push({
          id: index.toString(),
          label: key,
          activeSubtitle: true,
          labelSubtitle: value === 1 ? 'Factura' : 'Facturas',
          totalSubtitle: value,
        });
        total = total + value;
        index++;
      });
      return {
        ...state,
        tabOptions: [
          ...map(state.tabOptions, (o: ITabOption) => ({
            ...o,
            totalSubtitle: total,
          })),
          ...tabs,
        ],
      };
    },
  ),
  on(
    collectionMonitoringDetailsActions.FETCH_CLIENT_CONTACT_SUCCESS,
    (state: ICollectionMonitoringDetails, {clientContact}): ICollectionMonitoringDetails => ({
      ...state,
      clientContact,
    }),
  ),
  on(
    collectionMonitoringDetailsActions.FETCH_CHARGES_BARS_SUCCESS,
    (state: ICollectionMonitoringDetails, {barsData}): ICollectionMonitoringDetails => ({
      ...state,
      barsData,
    }),
  ),
  on(
    collectionMonitoringDetailsActions.SET_SELECTED_TAB_OPTION,
    (state: ICollectionMonitoringDetails, {selectedTabOption}): ICollectionMonitoringDetails => ({
      ...state,
      selectedTabOption,
    }),
  ),
  on(
    collectionMonitoringDetailsActions.SET_SELECTED_DROP_LIST_OPTION,
    (
      state: ICollectionMonitoringDetails,
      {node, selectedOption},
    ): ICollectionMonitoringDetails => ({
      ...state,
      [node]: selectedOption,
    }),
  ),
  on(
    collectionMonitoringDetailsActions.SET_SEARCH_TERM,
    (state: ICollectionMonitoringDetails, {searchTerm}): ICollectionMonitoringDetails => ({
      ...state,
      searchTerm,
    }),
  ),
  on(
    collectionMonitoringDetailsActions.SET_FILTER_RANGE_DATE,
    (state: ICollectionMonitoringDetails, {node, rangeDate}): ICollectionMonitoringDetails => ({
      ...state,
      [node]: rangeDate,
    }),
  ),
  on(
    collectionMonitoringDetailsActions.SET_ITEMS_STATUS,
    (state: ICollectionMonitoringDetails, {itemsStatus}): ICollectionMonitoringDetails => ({
      ...state,
      itemsStatus,
    }),
  ),
  on(
    collectionMonitoringDetailsActions.FETCH_INVOICES_SUCCESS,
    (state: ICollectionMonitoringDetails, {invoices}): ICollectionMonitoringDetails => ({
      ...state,
      invoices,
    }),
  ),
  on(
    collectionMonitoringDetailsActions.SET_INVOICE_IS_SELECTED,
    (
      state: ICollectionMonitoringDetails,
      {invoiceId, allItems, value},
    ): ICollectionMonitoringDetails => ({
      ...state,
      invoices: map(state.invoices, (item: IInvoice) => {
        if (allItems) {
          return {
            ...item,
            selected: value,
            comments: '',
          };
        } else if (invoiceId === item.IdTPProformaPedido) {
          return {...item, selected: !item.selected, comments: ''};
        }
        return {...item};
      }),
    }),
  ),
  on(
    collectionMonitoringDetailsActions.SET_INVOICE_COMMENT,
    (
      state: ICollectionMonitoringDetails,
      {invoiceId, allItems, comments},
    ): ICollectionMonitoringDetails => ({
      ...state,
      invoices: map(state.invoices, (item: IInvoice) => {
        if (allItems) {
          return {...item, comments: item.selected ? comments : item.comments};
        } else if (invoiceId === item.IdTPProformaPedido) {
          return {...item, comments};
        }
        return {...item};
      }),
    }),
  ),
  on(
    collectionMonitoringDetailsActions.SET_FPP_INVOICE_DATE,
    (
      state: ICollectionMonitoringDetails,
      {invoiceId, date, stringDate},
    ): ICollectionMonitoringDetails => ({
      ...state,
      invoices: map(state.invoices, (o: IInvoice) => {
        if (o.IdTPProformaPedido === invoiceId) {
          return {
            ...o,
            hasTemporaryDate: true,
            FechaCompromisoPagoDate: date,
            fccProgramacionCobro: {
              ...o.fccProgramacionCobro,
              FechaProgramacion: stringDate,
            },
          };
        }
        return {...o};
      }),
    }),
  ),
);
