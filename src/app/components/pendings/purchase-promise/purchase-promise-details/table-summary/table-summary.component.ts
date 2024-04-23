import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {purchasePromiseDetailsSelectors} from '@appSelectors/pendings/purchase-promise';
import {
  IPurchasePromiseQuotation,
  IQuoteItem,
} from '@appModels/store/pendings/purchase-promise/purchase-promise-details/purchase-promise-details.models';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import {purchasePromiseDetailsActions} from '@appActions/pendings/purchase-promise';
import {AppState} from '@appCore/core.state';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';
import {SET_POP_UP_NOTES_DATA} from '@appActions/utils/utils.action';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';

@Component({
  selector: 'app-table-summary',
  templateUrl: './table-summary.component.html',
  styleUrls: ['./table-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSummaryComponent implements AfterViewChecked {
  itemsConfig$: Observable<InternalSalesItem[]> = this.store.select(
    purchasePromiseDetailsSelectors.selectInternalSalesItem,
  );
  itemForHeaderInternal$: Observable<InternalSalesItem> = this.store.select(
    purchasePromiseDetailsSelectors.selectItemForHeaderInternal,
  );
  listItemScroll: Array<InternalSalesItem>;

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private appService: CoreContainerService,
  ) {}

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  handleTrackBy(index: number, entry: InternalSalesItem): string {
    return entry?.data?.IdCotPartidaCotizacion;
  }

  handleAction(event: ModelEmitInternalSalesItem): void {
    switch (event.action) {
      case NameActionsInternalSalesItem.CheckBoxNormalAction:
        // DOCS: CHECK IF ITEM IS FREIGHT
        this.handleFreightItem(event);
        break;
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

  handleFreightItem(event: ModelEmitInternalSalesItem): void {
    if (event?.data?.freightItem) {
      this.onChangeSelectFreight(Boolean(event?.value));
    } else {
      this.selectItem(event.data, event.index);
    }
  }

  async selectItem(item: IQuoteItem, i): Promise<void> {
    const seeSummary = await lastValueFrom(
      this.store.pipe(select(purchasePromiseDetailsSelectors.selectSeeResumeActive), take(1)),
    );
    if (!seeSummary) {
      this.store.dispatch(purchasePromiseDetailsActions.SELECT_ITEM({item, i}));
    }
  }

  async onChangeSelectFreight(status: boolean): Promise<void> {
    const selectQuote: IPurchasePromiseQuotation = await lastValueFrom(
      this.store.pipe(select(purchasePromiseDetailsSelectors.selectQuoteSelected), take(1)),
    );

    this.store.dispatch(
      purchasePromiseDetailsActions.SELECT_FLETE({
        IdCotCotizacion: selectQuote?.IdCotCotizacion,
        status,
      }),
    );
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
}
