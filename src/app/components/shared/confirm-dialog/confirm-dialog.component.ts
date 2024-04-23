import {Component, Inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {AppViewTypes} from '@appModels/store/utils/utils.model';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  viewType$: Observable<string> = this.store.select(selectViewType);

  readonly viewTypes = AppViewTypes;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      message: string;
      greenText: string;
      onlyOneButton: boolean;
    },
  ) {}

  // DOCS: SE CREA PARA OBTENER LA REFERENCIA DEL DIALOG PARA LAS PRUEBAS UNITARIAS.
  get dialogRef(): MatDialogRef<ConfirmDialogComponent, any> {
    return this.dialog;
  }

  onClose(event: boolean) {
    this.dialog.close(event);
  }
}
