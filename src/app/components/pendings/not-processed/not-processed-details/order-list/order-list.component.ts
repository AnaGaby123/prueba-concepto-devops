import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {debounce} from 'lodash-es';

// Actions
import {notProcessedSelectors} from '@appSelectors/pendings';
// Models
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IOrderNotProcessed} from '@appModels/store/pendings/not-processed/not-processed-details/not-processed-details.models';
import {notProcessedDetailActions} from '@appActions/pendings/not-processed';
import {notProcessedDetailsSelectors} from '@appSelectors/pendings/not-processed';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent {
  options$: Observable<Array<DropListOption>> = this.store.select(
    notProcessedSelectors.notProcessedDetailsSelectors.selectKeyPadOptions,
  );
  optionSelected$: Observable<DropListOption> = this.store.select(
    notProcessedSelectors.notProcessedDetailsSelectors.selectKeyPadSelected,
  );
  filters$: Observable<Array<DropListOption>> = this.store.select(
    notProcessedSelectors.notProcessedDetailsSelectors.selectFilters,
  );
  filterSelected$: Observable<DropListOption> = this.store.select(
    notProcessedSelectors.notProcessedDetailsSelectors.selectFilter,
  );
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  purchaseOrder$: Observable<Array<IOrderNotProcessed>> = this.store.select(
    notProcessedSelectors.notProcessedDetailsSelectors.selectPurchaseOrders,
  );
  apiStatus$: Observable<number> = this.store.select(notProcessedDetailsSelectors.selectApiStatus);
  purchaseOrder: Array<IOrderNotProcessed> = [];
  purchaseItem$: Observable<IOrderNotProcessed> = this.store.select(
    notProcessedSelectors.notProcessedDetailsSelectors.selectOrderSelected,
  );
  termSearch$: Observable<string> = this.store.select(
    notProcessedSelectors.notProcessedDetailsSelectors.selectTermSearch,
  );

  constructor(private store: Store) {}

  optionSelected(option: DropListOption): void {
    this.store.dispatch(notProcessedDetailActions.SET_KEYPAD_OPTION_SELECTED({option}));
  }

  selectedOrder(option: DropListOption): void {
    this.store.dispatch(notProcessedDetailActions.SET_FILTER_FEA_SELECTED({option}));
  }

  changeSearchTerm(value: string): void {
    this.store.dispatch(notProcessedDetailActions.SET_TERM_SEARCH({termSearch: value}));
  }

  selectedPurchase(item: IOrderNotProcessed): void {
    this.store.dispatch(notProcessedDetailActions.SET_PURCHASE_ORDER_SELECTED({item}));
  }
}
