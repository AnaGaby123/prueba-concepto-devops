import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

// Models
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {FacturasPendientesClienteObj, VFacturaClienteCalendarioTotales} from 'api-finanzas';
import {IPercentageBarItems} from '@appModels/percentage-bar/percentage-bar';
import {ContactoDetalleObj} from 'api-catalogos';
import {IFilterDate} from '@appModels/filters/Filters';
import {CalendarDay} from '@appModels/calendario/calendar';
import {IInvoice} from '@appModels/store/pendings/charges/execute-collection/execute-collection-details/execute-collection-details.models';
import {IPopUpConfig} from '@appModels/popUp/pop-up.model';

// Actions
import {
  collectionMonitoringActions,
  collectionMonitoringDetailsActions,
} from '@appActions/pendings/charges/collection-monitoring';

// Selectors
import {collectionMonitoringDetailsSelectors} from '@appSelectors/pendings/charges/collection-monitoring';
import * as selectUtils from '@appSelectors/utils/utils.selectors';

// Utils
import {debounce, isEmpty} from 'lodash-es';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-collection-monitoring-details',
  templateUrl: './collection-monitoring-details.component.html',
  styleUrls: ['./collection-monitoring-details.component.scss'],
})
export class CollectionMonitoringDetailsComponent implements OnDestroy {
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(
    collectionMonitoringDetailsSelectors.selectTabOptions,
  );
  selectedTabOption$: Observable<ITabOption> = this.store.select(
    collectionMonitoringDetailsSelectors.selectTabOption,
  );
  mecOptions$: Observable<Array<DropListOption>> = this.store.select(
    collectionMonitoringDetailsSelectors.selectMecOptions,
  );
  selectedMecOption$: Observable<DropListOption> = this.store.select(
    collectionMonitoringDetailsSelectors.selectedMecOption,
  );
  paymentMethodsOptions$: Observable<Array<DropListOption>> = this.store.select(
    collectionMonitoringDetailsSelectors.selectPaymentMethodsOptions,
  );
  selectedPaymentMethodsOption$: Observable<DropListOption> = this.store.select(
    collectionMonitoringDetailsSelectors.selectedPaymentMethodsOption,
  );
  debtOptions$: Observable<Array<DropListOption>> = this.store.select(
    collectionMonitoringDetailsSelectors.selectDebtOptions,
  );
  selectedDebtOption$: Observable<DropListOption> = this.store.select(
    collectionMonitoringDetailsSelectors.selectedDebtOption,
  );
  searchTypeOptions$: Observable<Array<DropListOption>> = this.store.select(
    collectionMonitoringDetailsSelectors.selectSearchTypeOptions,
  );
  selectedSearchType$: Observable<DropListOption> = this.store.select(
    collectionMonitoringDetailsSelectors.selectedSearchType,
  );
  percentageItemsDebts$: Observable<Array<IPercentageBarItems>> = this.store.select(
    collectionMonitoringDetailsSelectors.selectPercentageItemsDebts,
  );
  contact$: Observable<ContactoDetalleObj> = this.store.select(
    collectionMonitoringDetailsSelectors.selectClientContact,
  );
  barsData$: Observable<FacturasPendientesClienteObj> = this.store.select(
    collectionMonitoringDetailsSelectors.selectBarsData,
  );
  invoices$: Observable<Array<IInvoice>> = this.store.select(
    collectionMonitoringDetailsSelectors.selectInvoices,
  );
  selectedInvoices$: Observable<Array<IInvoice>> = this.store.select(
    collectionMonitoringDetailsSelectors.selectedInvoices,
  );
  itemsStatus$: Observable<number> = this.store.select(
    collectionMonitoringDetailsSelectors.selectItemsStatus,
  );
  validatorForAddCommentsButton$: Observable<boolean> = this.store.select(
    collectionMonitoringDetailsSelectors.validatorForAddCommentsButton,
  );
  validatorForAcceptButton$: Observable<boolean> = this.store.select(
    collectionMonitoringDetailsSelectors.validatorForAcceptButton,
  );
  allItemsAreSelected$: Observable<boolean> = this.store.select(
    collectionMonitoringDetailsSelectors.selectAllItemsAreSelected,
  );
  selectedClient$: Observable<VFacturaClienteCalendarioTotales> = this.store.select(
    collectionMonitoringDetailsSelectors.selectedClient,
  );
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  lodashIsEmpty = isEmpty;
  currentDate = new Date();
  invoicesScrollItems: Array<IInvoice> = [];
  itemForPopUp: IInvoice;
  activeComment = false;
  activeComments = false;
  handleSearchTerm = debounce(this.setSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  readonly MONITORING_POP = 'monitoring';
  readonly RESCHEDULE_POP = 'reschedule';
  popUps: {
    monitoring: IPopUpConfig;
    reschedule: IPopUpConfig;
  };

  constructor(private store: Store) {
    this.popUps = {
      [this.MONITORING_POP]: {isOpen: false, target: null},
      [this.RESCHEDULE_POP]: {isOpen: false, target: null},
    };
  }

  ngOnDestroy(): void {
    this.store.dispatch(
      collectionMonitoringActions.SET_IS_IN_DETAILS_VIEW({
        isInDetailsView: false,
      }),
    );
    this.store.dispatch(
      collectionMonitoringActions.SET_ALLOWED_TO_DETAILS({
        allowedToDetails: false,
      }),
    );
    this.store.dispatch(collectionMonitoringDetailsActions.CLEAN_ALL_DETAILS_STATE());
  }

  addComment(isShow: boolean, item: IInvoice, emitValues?: {value; invoice}): void {
    if (emitValues) {
      if (emitValues.value) {
        // Dispatch action to save the comment
        this.store.dispatch(
          collectionMonitoringDetailsActions.SET_INVOICE_COMMENT({
            invoiceId: emitValues.invoice.IdTPProformaPedido,
            comments: emitValues.invoice.comments,
          }),
        );
      }
    }
    this.itemForPopUp = item;
    this.activeComment = isShow;
  }

  addComments(isShow: boolean, emitValues?: {value; comments}): void {
    if (emitValues) {
      if (emitValues.value) {
        // Dispatch action to save the comment
        this.store.dispatch(
          collectionMonitoringDetailsActions.SET_INVOICE_COMMENT({
            allItems: true,
            invoiceId: null,
            comments: emitValues.comments,
          }),
        );
      }
    }
    this.activeComments = isShow;
  }

  selectTabOption(selectedTabOption: ITabOption): void {
    this.store.dispatch(
      collectionMonitoringDetailsActions.SET_SELECTED_TAB_OPTION({
        selectedTabOption,
      }),
    );
  }

  changeDropListValue(node: string, selectedOption: DropListOption): void {
    this.store.dispatch(
      collectionMonitoringDetailsActions.SET_SELECTED_DROP_LIST_OPTION({
        node,
        selectedOption,
      }),
    );
  }

  setSearchTerm(searchTerm: string): void {
    this.store.dispatch(
      collectionMonitoringDetailsActions.SET_SEARCH_TERM({
        searchTerm,
      }),
    );
  }

  setRangeDate(node: string, rangeDate: IFilterDate): void {
    this.store.dispatch(
      collectionMonitoringDetailsActions.SET_FILTER_RANGE_DATE({
        node,
        rangeDate,
      }),
    );
  }

  checkInvoice(invoiceId: string): void {
    this.store.dispatch(collectionMonitoringDetailsActions.SET_INVOICE_IS_SELECTED({invoiceId}));
  }

  checkAllInvoices(value: boolean): void {
    this.store.dispatch(
      collectionMonitoringDetailsActions.SET_INVOICE_IS_SELECTED({
        invoiceId: '',
        allItems: true,
        value,
      }),
    );
  }

  handleDate(invoiceId: string, value: any): void {
    const year = value.substr(0, 4);
    const month = value.substr(4, 2);
    const day = value.substr(6, 2);
    const date = new Date(year, month - 1, day);
    const stringDate = date.toISOString();
    this.store.dispatch(
      collectionMonitoringDetailsActions.SET_FPP_INVOICE_DATE({
        invoiceId,
        date,
        stringDate,
      }),
    );
  }

  finalize(): void {
    this.store.dispatch(collectionMonitoringDetailsActions.FINALIZE_INVOICES_LOAD());
  }

  handlePopUps(pop: string, isOpen: boolean): void {
    this.popUps = {
      ...this.popUps,
      [pop]: {
        isOpen,
      },
    };
  }

  handleTrackByItem(index: number, item: IInvoice): string {
    return item.IdTPProformaPedido;
  }
}
