import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {Observable} from 'rxjs';
import {purchasePromiseDetailsSelectors} from '@appSelectors/pendings/purchase-promise';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';
import {purchasePromiseDetailsActions} from '@appActions/pendings/purchase-promise';

@Component({
  selector: 'app-table-resume',
  templateUrl: './table-resume.component.html',
  styleUrls: ['./table-resume.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableResumeComponent implements AfterViewChecked {
  resumeItems$: Observable<InternalSalesItem[]> = this.store.select(
    purchasePromiseDetailsSelectors.selectInternalItemsResume,
  );

  itemForHeaderInternal$: Observable<InternalSalesItem> = this.store.select(
    purchasePromiseDetailsSelectors.selectItemForHeaderInternal,
  );

  listItemScroll: InternalSalesItem[] = [];
  isOpenNotes = false;
  targetNotes: any;
  itemInternalSalesItem: InternalSalesItem;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }
  handleTrackBy(index: number, entry: InternalSalesItem): string {
    return entry?.data?.PcPartidaPromesaDeCompra?.IdCotPartidaCotizacion;
  }
  globalItemEventsHandler(event: ModelEmitInternalSalesItem): void {
    switch (event.action) {
      case NameActionsInternalSalesItem.CheckBoxHeaderBoxNormalItem:
        this.store.dispatch(
          purchasePromiseDetailsActions.CHECK_ALL_ORDERS({checked: Boolean(event.value)}),
        );
        break;
    }
  }

  handleEventEmitter(event: any): void {
    this.targetNotes = event.target;
    this.itemInternalSalesItem = event.internalSalesItem;
    this.isOpenNotes = event.isOpenNotes;
  }
}
