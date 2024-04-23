import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';

// Models
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IOrder} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-details/validate-adjustment-details.models';

// Actions
import {validateAdjustmentDetailActions} from '@appActions/pendings/validate-adjustment';

// Selectors
import {validateAdjustmentDetailsSelectors} from '@appSelectors/pendings/validate-adjustment';

// Utils
import {debounce} from 'lodash-es';

import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-order-purchase',
  templateUrl: './order-purchase.component.html',
  styleUrls: ['./order-purchase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPurchaseComponent implements AfterContentChecked {
  filter$: Observable<Array<DropListOption>> = this.store.select(
    validateAdjustmentDetailsSelectors.selectFilterOptions,
  );
  filterSelected$: Observable<DropListOption> = this.store.select(
    validateAdjustmentDetailsSelectors.selectFilterOptionSelected,
  );
  itemsOrder$: Observable<IOrder[]> = this.store.select(
    validateAdjustmentDetailsSelectors.selectedOrdersResults,
  );
  orderSelected$: Observable<IOrder> = this.store.select(
    validateAdjustmentDetailsSelectors.selectedOrder,
  );
  statusOrderList: Observable<number> = this.store.select(
    validateAdjustmentDetailsSelectors.selectStatusApiOrderList,
  );
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  purchaseOrders: Array<IOrder> = [];

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  selectedOrder(typeOrder: DropListOption): void {
    this.store.dispatch(validateAdjustmentDetailActions.SET_ORDER_LIST({typeOrder}));
  }

  selectedPurchase(order: IOrder): void {
    this.store.dispatch(
      validateAdjustmentDetailActions.SET_PURCHASE_ORDER_BACKUP({
        order,
      }),
    );
    this.store.dispatch(
      validateAdjustmentDetailActions.SET_PURCHASE_ORDER_SELECTED({
        order,
      }),
    );
  }

  changeSearchTerm(value: string): void {
    this.store.dispatch(validateAdjustmentDetailActions.SET_SEARCH_TERM({term: value}));
  }

  handleTrackBy(index: number, order: IOrder): string {
    return order.IdPPPedido;
  }
}
