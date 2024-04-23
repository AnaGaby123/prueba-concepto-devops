import {Component, Inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
import {
  ICustomer,
  IOrder,
  ITotalDividedEntries,
} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-details/validate-adjustment-details.models';
import {validateAdjustmentDetailsSelectors} from '@appSelectors/pendings/validate-adjustment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-order-confirmation-dialog',
  templateUrl: './order-confirmation-dialog.component.html',
  styleUrls: ['./order-confirmation-dialog.component.scss'],
})
export class OrderConfirmationDialogComponent {
  orderSelected$: Observable<IOrder> = this.store.select(
    validateAdjustmentDetailsSelectors.selectedOrder,
  );
  entriesTotals$: Observable<ITotalDividedEntries> = this.store.select(
    validateAdjustmentDetailsSelectors.selectValidateAndInvalidateEntries,
  );
  client$: Observable<ICustomer> = this.store.select(
    validateAdjustmentDetailsSelectors.selectCustomer,
  );
  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<OrderConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onClose(event: boolean): void {
    this.dialog.close(event);
  }
}
