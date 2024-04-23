/* Core Imports */
import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

/* Imports Models */
import {AppState} from '@appCore/core.state';
import {IGeneralDataQuotation} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {Archivo} from 'api-catalogos';

/* Selectors Imports */
import {quotationDashboardSelectors, quotationDetailsSelectors} from '@appSelectors/quotation';

/* Actions*/
import {DOWLOAD_FILE_LOAD} from '@appActions/utils/utils.action';
import {quotationActions, quotationDetailsActions} from '@appActions/quotation';
import {CorreoRecibidoClienteRequerimientoObj} from 'api-logistica';

@Component({
  selector: 'app-request-quotation',
  templateUrl: './client-request-panel.component.html',
  styleUrls: ['./client-request-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientRequestPanelComponent implements AfterContentChecked {
  @Input() isOpen: boolean;
  @Output() handleIsOpen: EventEmitter<void> = new EventEmitter<void>();
  clientInfo$: Observable<IGeneralDataQuotation> = this.store.select(
    quotationDetailsSelectors.selectedQuotationClientInfoMapped,
  );
  mailData$: Observable<CorreoRecibidoClienteRequerimientoObj> = this.store.select(
    quotationDetailsSelectors.selectMailData,
  );
  status$: Observable<boolean> = this.store.select(
    quotationDashboardSelectors.selectStatusMailData,
  );

  isPdf = false;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  onClick(): void {
    this.handleIsOpen.emit();
    if (!this.isOpen) {
      this.store.dispatch(quotationActions.SHOW_NAV_BAR_REQUEST({isRequestNew: true}));
    } else {
      this.store.dispatch(quotationActions.SHOW_NAV_BAR_REQUEST({isRequestNew: false}));
    }
  }

  viewFile(file: Archivo): void {
    const splits = file.FileKey.split('.');
    const ext = splits[splits.length - 1];
    const isViewFile =
      ext === 'pdf' || ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'svg';
    this.isPdf = ext === 'pdf' || ext === 'tml';

    if (isViewFile) {
      this.store.dispatch(quotationDetailsActions.VIEW_FILE_LOAD({IdArchivo: file.IdArchivo, ext}));
    } else {
      this.store.dispatch(DOWLOAD_FILE_LOAD({IdArchivo: file.IdArchivo, FileKey: file.FileKey}));
    }
  }
}
