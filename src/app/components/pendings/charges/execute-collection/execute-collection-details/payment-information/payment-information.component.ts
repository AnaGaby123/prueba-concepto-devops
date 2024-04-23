/* Core Imports */
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {AppState} from '@appCore/core.state';
import {Store} from '@ngrx/store';

/* Models Imports */
import {IPercentageBarItems} from '@appModels/percentage-bar/percentage-bar';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IPopUpConfig} from '@appModels/popUp/pop-up.model';
import {
  IExecuteCollectionDetails,
  IExecuteCollectionPayment,
  IInvoice,
} from '@appModels/store/pendings/charges/execute-collection/execute-collection-details/execute-collection-details.models';
import {ContactoDetalleObj} from 'api-catalogos';
import {VFacturaClienteCalendarioTotales} from 'api-finanzas';
/* Common Imports */
import {DEFAULT_DATE, DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';
import {selectCatMedioDePagoForDropDown} from '@appSelectors/catalogs/catalogs.selectors';
import {debounce, isEmpty} from 'lodash-es';
/*Selectors Imports*/
import {
  executeCollectionDetailsSelectors,
  executeCollectionSelectors,
} from '@appSelectors/pendings/charges/execute-collection';
/*Actionst Imports*/
import {executeCollectionDetailsActions} from '@appActions/pendings/charges/execute-collection';
import {IFilterDate} from '@appModels/filters/Filters';

@Component({
  selector: 'app-payment-information',
  templateUrl: './payment-information.component.html',
  styleUrls: ['./payment-information.component.scss'],
})
export class PaymentInformationComponent {
  popUpIsOpenConditions = false;
  percentageItemsDebts$: Observable<Array<IPercentageBarItems>> = this.store.select(
    executeCollectionDetailsSelectors.selectPercentageItemsDebts,
  );
  details$: Observable<IExecuteCollectionDetails> = this.store.select(
    executeCollectionSelectors.selectExecuteCollectionDetails,
  );
  selectedClient$: Observable<VFacturaClienteCalendarioTotales> = this.store.select(
    executeCollectionDetailsSelectors.selectedClient,
  );
  selectedPayment$: Observable<IExecuteCollectionPayment> = this.store.select(
    executeCollectionDetailsSelectors.selectedPayment,
  );
  contact$: Observable<ContactoDetalleObj> = this.store.select(
    executeCollectionDetailsSelectors.selectContactClient,
  );
  mecOptions$: Observable<Array<DropListOption>> = this.store.select(
    executeCollectionDetailsSelectors.selectMecOptions,
  );
  chargeOptions$: Observable<Array<DropListOption>> = this.store.select(
    executeCollectionDetailsSelectors.selectChargeOptions,
  );
  searchTypesOptions$: Observable<Array<DropListOption>> = this.store.select(
    executeCollectionDetailsSelectors.selectSearchTypesOptions,
  );
  paymentMethodsOptions$: Observable<Array<DropListOption>> = this.store.select(
    selectCatMedioDePagoForDropDown,
  );
  selectedMecOption$: Observable<DropListOption> = this.store.select(
    executeCollectionDetailsSelectors.selectMecOptionSelected,
  );
  selectedPaymentMethodOption$: Observable<DropListOption> = this.store.select(
    executeCollectionDetailsSelectors.selectPaymentMethodsOptionSelected,
  );
  selectedChargeOption$: Observable<DropListOption> = this.store.select(
    executeCollectionDetailsSelectors.selectChargeOptionSelected,
  );
  selectedSearchType$: Observable<DropListOption> = this.store.select(
    executeCollectionDetailsSelectors.selectedTypeOfSearch,
  );
  tabs$: Observable<Array<ITabOption>> = this.store.select(
    executeCollectionDetailsSelectors.selectOptionsTab,
  );
  tab$: Observable<ITabOption> = this.store.select(executeCollectionDetailsSelectors.selectedTab);
  billList$: Observable<Array<IInvoice>> = this.store.select(
    executeCollectionDetailsSelectors.selectBillList,
  );
  invoicesStatus$: Observable<number> = this.store.select(
    executeCollectionDetailsSelectors.selectInvoicesStatus,
  );
  billingSelected$: Observable<number> = this.store.select(
    executeCollectionDetailsSelectors.selectInvoiceSelected,
  );
  billsAmount$: Observable<number> = this.store.select(
    executeCollectionDetailsSelectors.selectAmountBills,
  );
  totalAmountBills$: Observable<number> = this.store.select(
    executeCollectionDetailsSelectors.selectAmountTotalBills,
  );
  rebillView$: Observable<boolean> = this.store.select(
    executeCollectionSelectors.selectIsInRebillView,
  );
  lodashIsEmpty = isEmpty;
  currentDate = new Date();
  handleSearchTerm = debounce(this.setSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  monitorings = [
    {
      Index: 1,
      date: DEFAULT_DATE,
      hrs: '13:00',
      observaciones: 'Cliente confirmó que pagaba el 16 de septiembre',
    },
    {
      Index: 2,
      date: DEFAULT_DATE,
      hrs: '15:00',
      observaciones: 'Cliente confirmó que pagaba el 16 de septiembre',
    },
    {
      Index: 3,
      date: DEFAULT_DATE,
      hrs: '13:00',
      observaciones: 'Cliente confirmó que pagaba el 16 de septiembre',
    },
    {
      Index: 5,
      date: DEFAULT_DATE,
      hrs: '13:00',
      observaciones: 'Cliente confirmó que pagaba el 16 de septiembre',
    },
  ];
  monitoringsScrollItems = [];
  companiesScrollItems: Array<IInvoice> = [];
  readonly MONITORING_POP = 'monitoring';
  readonly RESCHEDULE_POP = 'reschedule';
  popUps: {
    monitoring: IPopUpConfig;
    reschedule: IPopUpConfig;
  };

  constructor(private store: Store<AppState>) {
    this.popUps = {
      [this.MONITORING_POP]: {isOpen: false, target: null},
      [this.RESCHEDULE_POP]: {isOpen: false, target: null},
    };
  }

  changeValueDropList(node: string, selectedOption: DropListOption): void {
    this.store.dispatch(
      executeCollectionDetailsActions.SET_SELECTED_DROP_OPTION({
        node,
        selectedOption,
      }),
    );
  }

  setSearchTerm(searchTerm: string): void {
    this.store.dispatch(
      executeCollectionDetailsActions.SET_SELECTED_PAYMENT_SEARCH_TERM({
        searchTerm,
      }),
    );
  }

  handleOptionTab(tab: ITabOption): void {
    this.store.dispatch(executeCollectionDetailsActions.SET_OPTION_TAB({tab}));
  }

  handlePopUps(pop: string, isOpen: boolean): void {
    this.popUps = {
      ...this.popUps,
      [pop]: {
        isOpen,
      },
    };
  }

  handledSelectedBill(bill: IInvoice): void {
    this.store.dispatch(executeCollectionDetailsActions.SET_SELECTED_BILL({bill}));
  }

  setRangeDate(rangeDate: IFilterDate, param: string): void {
    this.store.dispatch(executeCollectionDetailsActions.SET_FILTER_RANGE_DATE({rangeDate, param}));
  }
}
