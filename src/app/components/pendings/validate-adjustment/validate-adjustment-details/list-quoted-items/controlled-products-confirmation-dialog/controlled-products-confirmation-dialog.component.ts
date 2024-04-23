import {Component, Inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
import {IOrder} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-details/validate-adjustment-details.models';
import {validateAdjustmentDetailsSelectors} from '@appSelectors/pendings/validate-adjustment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-controlled-products-confirmation-dialog',
  templateUrl: './controlled-products-confirmation-dialog.component.html',
  styleUrls: ['./controlled-products-confirmation-dialog.component.scss'],
})
export class ControlledProductsConfirmationDialogComponent {
  orderSelected$: Observable<IOrder> = this.store.select(
    validateAdjustmentDetailsSelectors.selectedOrder,
  );

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<ControlledProductsConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onClose(event: boolean): void {
    this.dialog.close(event);
  }
}
