import {Component, Inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {
  ICustomer,
  IOrderNotProcessed,
} from '@appModels/store/pendings/not-processed/not-processed-details/not-processed-details.models';
import {notProcessedDetailsSelectors} from '@appSelectors/pendings/not-processed';
import {AuthCodeDialog} from '@appInterfaces/dialogs/AuthCode.dialog';

@Component({
  selector: 'app-request-auth-code-dialog',
  templateUrl: './request-auth-code-dialog.component.html',
  styleUrls: ['./request-auth-code-dialog.component.scss'],
})
export class RequestAuthCodeDialogComponent {
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  customer$: Observable<ICustomer> = this.store.select(notProcessedDetailsSelectors.selectClient);
  order$: Observable<IOrderNotProcessed> = this.store.select(
    notProcessedDetailsSelectors.selectOrderSelected,
  );

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<RequestAuthCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: AuthCodeDialog,
  ) {}

  onClose(event: boolean): void {
    this.dialog.close(event);
  }
}
