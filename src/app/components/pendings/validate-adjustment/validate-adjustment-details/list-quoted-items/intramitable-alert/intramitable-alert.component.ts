import {Component, Inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {
  ICustomer,
  IOrder,
} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-details/validate-adjustment-details.models';
import {validateAdjustmentDetailsSelectors} from '@appSelectors/pendings/validate-adjustment';

@Component({
  selector: 'app-intramitable-alert',
  templateUrl: './intramitable-alert.component.html',
  styleUrls: ['./intramitable-alert.component.scss'],
})
export class IntramitableAlertComponent implements OnInit {
  client$: Observable<ICustomer> = this.store.select(
    validateAdjustmentDetailsSelectors.selectCustomer,
  );
  orderSelected$: Observable<IOrder> = this.store.select(
    validateAdjustmentDetailsSelectors.selectedOrder,
  );

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<IntramitableAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {}

  onClose(event: boolean): void {
    this.dialog.close(event);
  }
}
