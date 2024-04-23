import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {
  ICreditNotesTotals,
  IInvoice,
  IPaymentTransaction,
  IPaymentTransactionConversion,
  IPaymentTransactionTotals,
} from '@appModels/store/pendings/charges/execute-collection/execute-collection-details/execute-collection-details.models';
import {executeCollectionDetailsSelectors} from '@appSelectors/pendings/charges/execute-collection';
import {
  executeCollectionActions,
  executeCollectionDetailsActions,
} from '@appActions/pendings/charges/execute-collection';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit {
  totalAmountsConversion$: Observable<IPaymentTransactionConversion> = this.store.select(
    executeCollectionDetailsSelectors.selectTotalAmountsConversion,
  );
  creditNotesTotals$: Observable<ICreditNotesTotals> = this.store.select(
    executeCollectionDetailsSelectors.selectCreditNotesTotals,
  );
  selectedBillList$: Observable<Array<IInvoice>> = this.store.select(
    executeCollectionDetailsSelectors.selectedBillList,
  );
  paymentTransaction$: Observable<IPaymentTransaction> = this.store.select(
    executeCollectionDetailsSelectors.selectPaymentTransaction,
  );

  paymentTransactionTotals$: Observable<IPaymentTransactionTotals> = this.store.select(
    executeCollectionDetailsSelectors.selectPaymentTotals,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  billsSelectedScrollItems: Array<IInvoice> = [];

  constructor(private store: Store<AppState>, private router: Router) {}

  tempAmountToPay = 0;
  selectedEntry: IInvoice;

  ngOnInit(): void {
    this.store.dispatch(executeCollectionActions.SET_IS_IN_REBILL_VIEW({isInRebillView: false}));
  }

  goToRebill(): void {
    this.store.dispatch(executeCollectionActions.SET_IS_IN_REBILL_VIEW({isInRebillView: true}));
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.executeCollection.executeCollection,
      appRoutes.executeCollection.details,
      appRoutes.executePayment.executePayment,
      appRoutes.rebill.rebill,
    ]);
  }

  handleValidateDecimalNumber(
    bill: IInvoice,
    event: {which: number; preventDefault: () => void},
  ): void {
    if (event.which === 13) {
      if (bill.openInput) {
        this.setAmountToPay(bill, this.tempAmountToPay);
      }
    } else {
      const key = String.fromCharCode(event.which);
      const regex = /^\d*\.?\d*$/;
      if (!regex.test(key)) {
        event.preventDefault();
      }
    }
  }

  setAmountToPay(bill: IInvoice, tempAmountToPay = this.tempAmountToPay): void {
    this.store.dispatch(
      executeCollectionDetailsActions.UPDATE_AMOUNT_TO_PAY_ITEM({
        bill: {...bill, MontoPagado: tempAmountToPay},
      }),
    );
  }

  changeUnitPrice(bill: IInvoice, amountToPay: number): void {
    this.setAmountToPay(bill, amountToPay);
  }

  handleStopEvents(event: {preventDefault: () => void; stopPropagation: () => void}): void {
    event.preventDefault();
    event.stopPropagation();
  }

  selectInvoiceCurrency(node: string, billId: string): void {
    this.store.dispatch(
      executeCollectionDetailsActions.SET_INVOICE_CURRENCY({
        node,
        billId,
      }),
    );
  }

  deleteSelectedBill(billId: string): void {
    this.store.dispatch(
      executeCollectionDetailsActions.DELETE_SELECTED_BILL({
        billId,
      }),
    );
  }

  openInput(bill: IInvoice): void {
    this.store.dispatch(
      executeCollectionDetailsActions.SET_INPUT_IS_OPEN({
        billId: bill.IdTPProformaPedido,
      }),
    );
    this.selectedEntry = {...bill, openInput: true};
    this.tempAmountToPay = bill.MontoPagado;
  }
}
