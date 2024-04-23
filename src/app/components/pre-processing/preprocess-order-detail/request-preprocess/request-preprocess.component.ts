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
import {Archivo} from 'api-catalogos';
import {CorreoRecibidoClienteRequerimientoObj} from 'api-logistica';
// Selectors
import {preProcessOrderDetailsSelectors} from '@appSelectors/pre-processing';

// Actions
import {preProcessDetailsActions} from '@appActions/pre-processing';

//Models
import {IOrder} from '@appModels/store/pre-processing/preprocess-order-details/preprocess-order-details.models';
//Utils
import {DOWLOAD_FILE_LOAD} from '@appActions/utils/utils.action';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';

@Component({
  selector: 'app-request-preprocess',
  templateUrl: './request-preprocess.component.html',
  styleUrls: ['./request-preprocess.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestPreprocessComponent implements AfterContentChecked, OnDestroy {
  @Input() isOpen = true;
  @Output() handleIsOpen: EventEmitter<void> = new EventEmitter<void>();

  status$ = this.store.select(preProcessOrderDetailsSelectors.selectStatusApi);
  orderSelected$: Observable<IOrder> = this.store.select(
    preProcessOrderDetailsSelectors.selectOrderSelected,
  );
  mailData$: Observable<CorreoRecibidoClienteRequerimientoObj> = this.store.select(
    preProcessOrderDetailsSelectors.selectDataMail,
  );
  fileSelected: Archivo = {} as Archivo;
  base64$: Observable<string> = this.store.select(preProcessOrderDetailsSelectors.selectData64);
  isPdf = false;

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private coreContainerService: CoreContainerService,
  ) {}

  ngOnDestroy(): void {
    this.coreContainerService.setFile();
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  onClick(): void {
    this.handleIsOpen.emit();
  }

  viewFile(file): void {
    this.store.dispatch(preProcessDetailsActions.VIEW_FILE_IS_LOADING({value: true}));
    this.fileSelected = file;
    const ext = file?.FileKey?.substr(-3) || '';
    const isViewFile = ext === 'pdf' || ext === 'jpg' || ext === 'png' || ext === 'svg';
    this.store.dispatch(preProcessDetailsActions.SET_IS_PDF({value: true}));
    this.store.dispatch(preProcessDetailsActions.SET_OPEN_VIEW_FILE({active: true}));
    // this.isPdf = ext === 'pdf' || ext === 'tml';
    if (isViewFile) {
      this.store.dispatch(
        preProcessDetailsActions.VIEW_FILE_LOAD({
          IdArchivo: file?.IdArchivo,
          ext,
        }),
      );
    } else {
      this.download(this.fileSelected);
    }
  }

  download(file: Archivo): void {
    this.store.dispatch(DOWLOAD_FILE_LOAD({IdArchivo: file?.IdArchivo, FileKey: file?.FileKey}));
  }
}
