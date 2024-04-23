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
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
// Selectors
import {notProcessedDetailsSelectors} from '@appSelectors/pendings/not-processed';
// Actions
import {DOWLOAD_FILE_LOAD} from '@appActions/utils/utils.action';
import {notProcessedDetailActions} from '@appActions/pendings/not-processed';
// Models
import {IOrderNotProcessed} from '@appModels/store/pendings/not-processed/not-processed-details/not-processed-details.models';
import {Archivo} from 'api-catalogos';

// Utils
import {CoreContainerService} from '@appComponents/core-container/core-container.service';

@Component({
  selector: 'app-request-not-processed',
  templateUrl: './request-not-processed.component.html',
  styleUrls: ['./request-not-processed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestNotProcessedComponent implements AfterContentChecked, OnDestroy {
  @Input() isOpen = true;
  @Output() handleIsOpen: EventEmitter<void> = new EventEmitter<void>();
  order$: Observable<IOrderNotProcessed> = this.store.select(
    notProcessedDetailsSelectors.selectOrderSelected,
  );
  apiStatusMail$: Observable<number> = this.store.select(
    notProcessedDetailsSelectors.selectApiStatusMail,
  );
  base64$: Observable<string> = this.store.select(notProcessedDetailsSelectors.selectData64);
  fileSelected: Archivo = {} as Archivo;
  isPdf = true;

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private coreContainerService: CoreContainerService,
  ) {}

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  viewFile(file): void {
    this.fileSelected = file;
    const ext = file.FileKey.substr(-3);
    const isViewFile = ext === 'pdf' || ext === 'jpg' || ext === 'png' || ext === 'svg';
    this.isPdf = ext === 'pdf' || ext === 'tml';
    if (isViewFile) {
      this.openPop(true);
      this.store.dispatch(notProcessedDetailActions.VIEW_FILE_IS_LOADING({value: true}));
      this.store.dispatch(
        notProcessedDetailActions.VIEW_FILE_LOAD({
          IdArchivo: file.IdArchivo,
          ext,
        }),
      );
    } else {
      this.download(this.fileSelected);
    }
  }

  openPop(active: boolean): void {
    this.store.dispatch(notProcessedDetailActions.SET_OPEN_VIEW_FILE({active}));
    if (!active) {
      this.fileSelected = {};
      this.store.dispatch(notProcessedDetailActions.SET_INVOICE_ITEM_SELECTED({item: null}));
    }
  }

  download(file: Archivo): void {
    this.store.dispatch(DOWLOAD_FILE_LOAD({IdArchivo: file.IdArchivo, FileKey: file.FileKey}));
  }

  onClick(): void {
    this.handleIsOpen.emit();
  }

  ngOnDestroy(): void {
    this.coreContainerService.setFile();
  }
}
