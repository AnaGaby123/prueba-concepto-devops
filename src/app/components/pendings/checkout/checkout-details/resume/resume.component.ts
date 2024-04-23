import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';

// Models
import {
  IOrdersC,
  IPurchaseOrderDetails,
  IPurchaseOrderItem,
} from '@appModels/store/pendings/checkout/checkout-details/checkout-details.model';

// Selectors
import {checkoutDetailsSelectors} from '@appSelectors/pendings/checkout';
import * as selectUtils from '@appSelectors/utils/utils.selectors';

// Utils
import {Observable} from 'rxjs';
import {checkoutDetailsActions} from '@appActions/pendings/checkout';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';
import {SET_POP_UP_NOTES_DATA} from '@appActions/utils/utils.action';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeComponent implements AfterContentChecked {
  purchaseOrder$: Observable<IOrdersC> = this.store.select(
    checkoutDetailsSelectors.selectedPurchaseOrder,
  );
  purchaseOrderDetails$: Observable<IPurchaseOrderDetails> = this.store.select(
    checkoutDetailsSelectors.selectPurchaseOrderDetails,
  );
  items$: Observable<IPurchaseOrderItem[]> = this.store.select(
    checkoutDetailsSelectors.selectPurchaseOrderEntries,
  );
  itemsResume$: Observable<InternalSalesItem[]> = this.store.select(
    checkoutDetailsSelectors.selectItemsForSalesItemResume,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  selectedPurchaseOrder$: Observable<any> = this.store.select(
    checkoutDetailsSelectors.selectedPurchaseOrder,
  );
  loadingFile$: Observable<boolean> = this.store.select(
    checkoutDetailsSelectors.selectViewFileLoading,
  );
  itemHeaderResume$: Observable<InternalSalesItem> = this.store.select(
    checkoutDetailsSelectors.selectSalesItemHeaderResume,
  );
  base64$: Observable<string> = this.store.select(checkoutDetailsSelectors.selectFileBase64);
  isPDF$: Observable<boolean> = this.store.select(checkoutDetailsSelectors.selectIsPDF);
  items: IPurchaseOrderItem[];
  itemsResume: InternalSalesItem[];
  viewFile = false;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private appService: CoreContainerService,
  ) {}

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  handleTrackByItemBy(index: number, item: InternalSalesItem): string {
    return item.data?.IdCotPartidaCotizacion;
  }
  openViewFile(value: boolean, purchaseOrder: any): void {
    this.viewFile = value;
    if (purchaseOrder !== null) {
      if (value) {
        this.store.dispatch(checkoutDetailsActions.VIEW_FILE_IS_LOADING({value}));
        this.store.dispatch(
          checkoutDetailsActions.SET_ID_ARCHIVO_PDF({
            IdArchivo: purchaseOrder.IdArchivo,
          }),
        );
      }
    }
  }

  download(IdArchivo: string): void {
    this.store.dispatch(checkoutDetailsActions.DOWN_LOAD_FILE({IdArchivo}));
  }

  globalItemEventsHandler(event: ModelEmitInternalSalesItem): void {
    const {action} = event;
    switch (action) {
      case NameActionsInternalSalesItem.SeeNotesItemAction:
        this.store.dispatch(
          SET_POP_UP_NOTES_DATA({
            notes: event.dataInternal.columnNotes,
            modalIsOpen: event.value,
          }),
        );
        this.appService.setTarget(event.target);
        break;
    }
  }
}
