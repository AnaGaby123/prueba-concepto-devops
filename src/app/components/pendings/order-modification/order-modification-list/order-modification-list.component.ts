import {debounce, isEmpty} from 'lodash-es';

import {Component, OnDestroy, OnInit} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

/*Selectors Imports*/
import {orderModificationListSelectors} from '@appSelectors/pendings/order-modification';

/*Actions Imports*/
import {
  orderModificationActions,
  orderModificationDetailsActions,
  orderModificationListActions,
} from '@appActions/pendings/order-modification';

/*Models Imports*/
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ICustomerResults} from '@appModels/store/pendings/order-modification/order-modification-list/order-modification-list.model';
import {IFilterDate} from '@appModels/filters/Filters';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {ITabOption} from '@appModels/botonera/botonera-option';

import {IBarChart, IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {DEFAULT_TIME_DEBOUNCE_SEARCH, PAGING_LIMIT} from '@appUtil/common.protocols';

@Component({
  selector: 'app-order-modification-list',
  templateUrl: './order-modification-list.component.html',
  styleUrls: ['./order-modification-list.component.scss'],
})
export class OrderModificationListComponent implements OnInit, OnDestroy {
  barChartData$: Observable<IBarChart> = this.store.select(
    orderModificationListSelectors.selectDataBarChart,
  );
  chartsStatus$: Observable<number> = this.store.select(
    orderModificationListSelectors.selectChartStatus,
  );
  dataFilters$: Observable<Array<DropListOption>> = this.store.select(
    orderModificationListSelectors.selectDataFilters,
  );
  doughnutChartData$: Observable<IDoughnutChart> = this.store.select(
    orderModificationListSelectors.selectDataDonutChart,
  );
  doughnutChartOptionDetails$: Observable<IDoughnutChartDetails> = this.store.select(
    orderModificationListSelectors.selectDataDonutDetails,
  );
  doughnutChartOptionDetailsHover$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(orderModificationListSelectors.selectDataDonutOptionDetailHover);
  filter$: Observable<DropListOption> = this.store.select(
    orderModificationListSelectors.selectFilterSelected,
  );
  listCustomer$: Observable<Array<ICustomerResults>> = this.store.select(
    orderModificationListSelectors.selectCustomerList,
  );
  listCustomerScrollItems: Array<ICustomerResults> = [];
  tab$: Observable<ITabOption> = this.store.select(orderModificationListSelectors.selectTab);
  tabs$: Observable<Array<ITabOption>> = this.store.select(
    orderModificationListSelectors.selectDataTabs,
  );
  totalAmount$: Observable<number> = this.store.select(
    orderModificationListSelectors.selectTotalAmount,
  );
  totalOrders$: Observable<number> = this.store.select(
    orderModificationListSelectors.selectTotalOrdersShow,
  );
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  lodashIsEmpty = isEmpty;
  timer;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getCustomer(true);
    this.getTotals();
  }

  ngOnDestroy(): void {
    this.store.dispatch(orderModificationListActions.SET_NEEDS_TO_RELOAD_TOTALS());
  }

  changeSearchTerm(termSearch: string): void {
    this.store.dispatch(orderModificationListActions.SET_TERM_SEARCH({termSearch}));
  }

  async fetchMore(event: IPageInfo): Promise<void> {
    const customer: Array<ICustomerResults> = await lastValueFrom(
      this.store.pipe(select(orderModificationListSelectors.selectCustomerList), take(1)),
    );

    if (event.endIndex !== customer.length - 1) {
      return;
    }
    const listStatus: number = await lastValueFrom(
      this.store.pipe(select(orderModificationListSelectors.selectStatusListCustomer), take(1)),
    );
    const currentTotal: number = await lastValueFrom(
      this.store.pipe(select(orderModificationListSelectors.selectTotalCustomers), take(1)),
    );
    const currentPage: number = await lastValueFrom(
      this.store.pipe(select(orderModificationListSelectors.selectCurrentPage), take(1)),
    );

    if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
      const totalPages = currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;
      if (currentPage > totalPages || customer.length > currentTotal) {
        return;
      }
      this.fetchNextChunk().then(() => {});
    }
  }

  fetchNextChunk(): Promise<any[]> {
    return new Promise((resolve) => {
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        this.getCustomer(false);
        resolve([]);
      }, 200);
    });
  }

  getCustomer(isFirstPage: boolean): void {
    this.store.dispatch(
      orderModificationListActions.FETCH_CUSTOMER_ORDER_MODIFICATION_LOAD({
        isFirstPage,
      }),
    );
  }

  getTotals(): void {
    this.store.dispatch(orderModificationListActions.FETCH_TOTALS_LOAD());
  }

  setTab(tab: ITabOption): void {
    this.store.dispatch(orderModificationListActions.SET_TAB_SELECTED({tab}));
  }

  setFilter(filter: DropListOption): void {
    this.store.dispatch(orderModificationListActions.SET_FILTER_ORDER({filter}));
  }

  setDateRange(dateRange: IFilterDate): void {
    this.store.dispatch(orderModificationListActions.SET_FILTER_DATE_RANGE({dateRange}));
  }

  viewDetails(customer: ICustomerResults): void {
    this.store.dispatch(orderModificationActions.SET_IS_DETAILS({detailsMode: true}));
    this.store.dispatch(orderModificationActions.SET_ALLOWED_TO_DETAILS({allowedToDetails: true}));
    this.store.dispatch(orderModificationDetailsActions.CUSTOMER_SELECTED({customer}));
  }
}
