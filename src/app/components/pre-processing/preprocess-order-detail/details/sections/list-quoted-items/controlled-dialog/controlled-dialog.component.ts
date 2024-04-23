import {Component, Inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {IOrder} from '@appModels/store/pre-processing/preprocess-order-details/preprocess-order-details.models';
import {preProcessOrderDetailsSelectors} from '@appSelectors/pre-processing';

@Component({
  selector: 'app-controlled-dialog',
  templateUrl: './controlled-dialog.component.html',
  styleUrls: ['./controlled-dialog.component.scss'],
})
export class ControlledDialogComponent {
  preProcessOrder$: Observable<IOrder> = this.store.select(
    preProcessOrderDetailsSelectors.selectOrderSelected,
  );

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<ControlledDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onClose(event: boolean): void {
    this.dialog.close(event);
  }
}
