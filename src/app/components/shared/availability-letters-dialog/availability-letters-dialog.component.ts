import {Component, Inject, OnInit} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {availabilityLetterSelectors} from '@appSelectors/dialogs';
import {ArchivoDetalle} from 'api-logistica';
import {availabilityActions} from '@appActions/dialogs';
import {isEmpty} from 'lodash-es';
import {AvailabilityLetterData} from '@appModels/store/dialogs/availability-letter/availability-letter.model';
import {DOWLOAD_FILE_LOAD} from '@appActions/utils/utils.action';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-availability-letters-dialog',
  templateUrl: './availability-letters-dialog.component.html',
  styleUrls: ['./availability-letters-dialog.component.scss'],
})
export class AvailabilityLettersDialogComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<AvailabilityLettersDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: AvailabilityLetterData,
  ) {}
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  legalRepresentativeSelected$: Observable<DropListOption> = this.store.select(
    availabilityLetterSelectors.selectLegalRepresentativeSelected,
  );
  legalRepresentatives$: Observable<DropListOption[]> = this.store.select(
    availabilityLetterSelectors.selectLegalRepresentatives,
  );
  availabilityLetterFile$: Observable<ArchivoDetalle> = this.store.select(
    availabilityLetterSelectors.selectAvailabilityLetterFile,
  );
  statusFile$: Observable<number> = this.store.select(availabilityLetterSelectors.selectStatusFile);
  validationAvailabilityConfirmation$: Observable<boolean> = this.store.select(
    availabilityLetterSelectors.selectValidationAvailabilityConfirmation,
  );
  empty = isEmpty;
  ngOnInit(): void {}
  onClose(event: boolean): void {
    this.dialog.close(event);
  }
  getDownloadImage(file) {
    if (file?.FileKey) {
      return 'assets/Images/components-src/generic-input-file/download.svg';
    } else {
      return 'assets/Images/components-src/generic-input-file/download-disable.svg';
    }
  }
  setLegalRepresentative(event) {
    this.store.dispatch(
      availabilityActions.SET_LEGAL_REPRESENTATIVE({
        idPedido: this.data.idPedido,
        inPreprocess: this.data.inPreprocess,
        legalRepresentative: event,
      }),
    );
  }
  async downloadFile(): Promise<void> {
    const file: ArchivoDetalle = await lastValueFrom(
      this.store.pipe(select(availabilityLetterSelectors.selectAvailabilityLetterFile), take(1)),
    );
    this.store.dispatch(
      DOWLOAD_FILE_LOAD({IdArchivo: file?.IdArchivo, FileKey: file?.FileKey, newTab: false}),
    );
  }
  async openFile(): Promise<void> {
    const file: ArchivoDetalle = await lastValueFrom(
      this.store.pipe(select(availabilityLetterSelectors.selectAvailabilityLetterFile), take(1)),
    );
    this.store.dispatch(
      DOWLOAD_FILE_LOAD({IdArchivo: file?.IdArchivo, FileKey: file?.FileKey, newTab: true}),
    );
  }
}
