import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {Store} from '@ngrx/store';
import {debounce} from 'lodash-es';

import {PpPedido} from 'api-logistica';
// Selectors
import {preProcessOrderDetailsSelectors} from '@appSelectors/pre-processing';

// Actions
import {preProcessDetailsActions} from '@appActions/pre-processing';
import {IOrder} from '@appModels/store/pre-processing/preprocess-order-details/preprocess-order-details.models';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';
import {AppState} from '@appCore/core.state';

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.scss'],
})
export class PurchaseOrderListComponent {
  filter$: Observable<Array<DropListOption>> = this.store.select(
    preProcessOrderDetailsSelectors.selectOptionsFilters,
  );
  filterSelected$: Observable<DropListOption> = this.store.select(
    preProcessOrderDetailsSelectors.selectFilterSelected,
  );
  purchaseOrder$: Observable<Array<IOrder>> = this.store.select(
    preProcessOrderDetailsSelectors.selectPurchaseOrderList,
  );

  apisStatusDashboard$: Observable<number> = this.store.select(
    preProcessOrderDetailsSelectors.selectStatusApi,
  );

  totalResults$: Observable<number> = this.store.select(
    preProcessOrderDetailsSelectors.selectPurchaseOrderTotal,
  );
  purchaseItem$: Observable<PpPedido> = this.store.select(
    preProcessOrderDetailsSelectors.selectOrderSelected,
  );
  options$: Observable<Array<DropListOption>> = this.store.select(
    preProcessOrderDetailsSelectors.selectKeyPadOptions,
  );
  optionSelected$: Observable<DropListOption> = this.store.select(
    preProcessOrderDetailsSelectors.selectKeyPadOption,
  );
  listOrderScrollItems: Array<IOrder> = [];
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );

  constructor(private store: Store<AppState>) {}

  selectedPurchase(item: IOrder, index: number): void {
    this.store.dispatch(preProcessDetailsActions.RETURN_ORDER_SELECTED_TO_LIST({item, index}));
  }

  optionSelected(option: DropListOption): void {
    this.store.dispatch(preProcessDetailsActions.SET_OPTION_KEYPAD({option}));
  }

  selectedOrder(typeOrder: DropListOption): void {
    this.store.dispatch(preProcessDetailsActions.SET_ORDER_LIST({typeOrder}));
  }

  changeSearchTerm(value: string): void {
    this.store.dispatch(preProcessDetailsActions.SET_SEARCH_TERM({term: value}));
  }

  handleTrackByProduct(index: number, order: IOrder): string {
    return order.IdPPPedido;
  }
}
