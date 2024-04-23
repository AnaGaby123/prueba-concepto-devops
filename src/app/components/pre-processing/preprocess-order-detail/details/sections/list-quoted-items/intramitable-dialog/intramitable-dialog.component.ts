import {Component, Inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
import {CustomerList} from '@appModels/store/pre-processing/preprocess-order-dashboard/preprocess-order-dashboard.models';
import {preProcessOrderDetailsSelectors} from '@appSelectors/pre-processing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IOrder} from '@appModels/store/pre-processing/preprocess-order-details/preprocess-order-details.models';

@Component({
  selector: 'app-intramitable-dialog',
  templateUrl: './intramitable-dialog.component.html',
  styleUrls: ['./intramitable-dialog.component.scss'],
})
export class IntramitableDialogComponent {
  client$: Observable<CustomerList> = this.store.select(
    preProcessOrderDetailsSelectors.selectClient,
  );
  preProcessOrder$: Observable<IOrder> = this.store.select(
    preProcessOrderDetailsSelectors.selectOrderSelected,
  );

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<IntramitableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onClose(event: boolean): void {
    this.dialog.close(event);
  }
}
