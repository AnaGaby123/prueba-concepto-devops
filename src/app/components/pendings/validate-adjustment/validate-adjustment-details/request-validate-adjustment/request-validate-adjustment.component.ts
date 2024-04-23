import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';

// Models
import {Archivo} from 'api-catalogos';
import {IOrder} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-details/validate-adjustment-details.models';

// Actions
import {DOWLOAD_FILE_LOAD} from '@appActions/utils/utils.action';
import {validateAdjustmentDetailActions} from '@appActions/pendings/validate-adjustment';

// Selectors
import {validateAdjustmentDetailsSelectors} from '@appSelectors/pendings/validate-adjustment';
import {CorreoRecibidoClienteRequerimientoObj} from 'api-logistica';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';

// Utils

@Component({
  selector: 'app-request-validate-adjustment',
  templateUrl: './request-validate-adjustment.component.html',
  styleUrls: ['./request-validate-adjustment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestValidateAdjustmentComponent implements AfterContentChecked, OnDestroy {
  @Input() isOpen = true;
  @Output() handleIsOpen: EventEmitter<void> = new EventEmitter<void>();

  orderSelected$: Observable<IOrder> = this.store.select(
    validateAdjustmentDetailsSelectors.selectedOrder,
  );
  mailData$: Observable<CorreoRecibidoClienteRequerimientoObj> = this.store.select(
    validateAdjustmentDetailsSelectors.selectDataMail,
  );
  statusIssueAndItem$: Observable<number> = this.store.select(
    validateAdjustmentDetailsSelectors.selectStatusApiIssueAndItemsOrder,
  );
  openPdf$: Observable<boolean> = this.store.select(
    validateAdjustmentDetailsSelectors.selectOpenViewFile,
  );
  base64$: Observable<string> = this.store.select(validateAdjustmentDetailsSelectors.selectData64);
  fileSelected: Archivo = {} as Archivo;
  isPdf = false;

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private coreContainerService: CoreContainerService,
  ) {}

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  onClick(): void {
    this.handleIsOpen.emit();
  }

  viewFile(file): void {
    this.fileSelected = file;
    const ext = file.FileKey.substr(-3);
    const isViewFile = ext === 'pdf' || ext === 'jpg' || ext === 'png' || ext === 'svg';
    this.isPdf = ext === 'pdf' || ext === 'tml';
    if (isViewFile) {
      this.store.dispatch(
        validateAdjustmentDetailActions.VIEW_FILE_LOAD({
          IdFile: file.IdArchivo,
          ext,
        }),
      );
    } else {
      this.download(this.fileSelected);
    }
  }

  openPop(active: boolean): void {
    this.store.dispatch(validateAdjustmentDetailActions.SET_OPEN_VIEW_FILE({active}));
  }

  download(file: Archivo): void {
    this.store.dispatch(DOWLOAD_FILE_LOAD({IdArchivo: file.IdArchivo, FileKey: file.FileKey}));
  }

  ngOnDestroy(): void {
    this.coreContainerService.setFile();
  }
}
