import {Component, Inject} from '@angular/core';
import {AppState} from '@appCore/core.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {ICustomerFPP} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise-list/follow-purchase-promise.models';
import {followPPromiseDetailsSelectors} from '@appSelectors/pendings/follow-purchase-promise';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CotPromesaDeCompraPartida} from 'api-logistica';

@Component({
  selector: 'app-history-dialog',
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.scss'],
})
export class HistoryDialogComponent {
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  selectedClient$: Observable<ICustomerFPP> = this.store.select(
    followPPromiseDetailsSelectors.selectedClient,
  );
  justifications$: Observable<CotPromesaDeCompraPartida[]> = this.store.select(
    followPPromiseDetailsSelectors.selectJustifications,
  );

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<HistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  // DOCS: SE CREA PARA OBNTENER LA REFERENCIA DEL DIALOG PARA PRUEBAS UNITARIAS
  get dialogRef(): MatDialogRef<HistoryDialogComponent, any> {
    return this.dialog;
  }

  onClose(event: boolean): void {
    this.dialog.close(event);
  }
}
