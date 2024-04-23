import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
// Selectors
import * as selectUtils from '@appSelectors/utils/utils.selectors';
// Actions
import {addItemsQuoteActions, preProcessDetailsActions} from '@appActions/pre-processing';

// Models
// Utils
import {IQuoteItem} from '@appModels/store/pre-processing/preprocess-order-details/sections/add-purchase-order-items/add-purchase-order-items.models';
import {AppState} from '@appCore/core.state';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-add-order-item',
  templateUrl: './add-order-item.component.html',
  styleUrls: ['./add-order-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOrderItemComponent implements OnInit {
  @Input() item: InternalSalesItem;
  @Input() index: number;
  /*FIXME: Se quita porque no se esta usando*/
  // quotesLinked$: Observable<IProduct> = this.store.select(addItemSelectors.selectItemSelected);
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);

  toolTipPop2 = false;
  targetPop: HTMLElement = null;
  viewPDF = false;
  isPdf = false;
  fileName: string;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  selectItem(value: boolean, item: IQuoteItem): void {
    if (value) {
      this.store.dispatch(addItemsQuoteActions.ADD_ITEM({item}));
    } else {
      this.store.dispatch(addItemsQuoteActions.DELETE_ITEM({item}));
    }
    this.store.dispatch(addItemsQuoteActions.UPDATE_SELECT_ITEM({item, value}));
  }

  openLinkedQuoted(pop: string, isOpen: boolean, item?, target?: any): void {
    if (item) {
      if (pop === 'PDF') {
        this.store.dispatch(preProcessDetailsActions.SET_ITEM_LINKED({item}));
        this.viewPDF = true;
        this.toolTipPop2 = false;
      } else {
        this.toolTipPop2 = true;
        this.targetPop = target;
        this.store.dispatch(preProcessDetailsActions.SET_ITEM_LINKED({item}));
      }
    } else {
      if (pop === 'PDF') {
        this.store.dispatch(preProcessDetailsActions.SET_OPEN_VIEW_FILE({active: isOpen}));
      } else {
        this.toolTipPop2 = false;
      }
    }
  }

  openLinkedFile(IdArchivo: string, folio: string): void {
    this.fileName = 'FO-' + folio;
    this.isPdf = true;
    this.toolTipPop2 = false;
    this.viewPDF = true;
    this.store.dispatch(preProcessDetailsActions.SET_ID_ARCHIVO_PDF({IdArchivo}));
  }

  globalItemEventsHandler(event: ModelEmitInternalSalesItem): void {
    switch (event.action) {
      case NameActionsInternalSalesItem.CheckBoxNormalAction:
        this.selectItem(event.value as boolean, event.data as IQuoteItem);
        break;
    }
  }
}
