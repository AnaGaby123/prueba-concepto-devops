/*Core imports */
import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

// Models
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  ICustomerResults,
  ISearchOptions,
} from '@appModels/store/pendings/purchase-promise/purchase-promise-list/purchase-promise-list.model';
import {IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {IFilterDate} from '@appModels/filters/Filters';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {ITabOption} from '@appModels/botonera/botonera-option';

// Selectors
import {purchasePromiseListSelectors} from '@appSelectors/pendings/purchase-promise';

// Actions
import {
  purchasePromiseDetailsActions,
  purchasePromiseListActions,
} from '@appActions/pendings/purchase-promise';

import {debounce, isEmpty} from 'lodash-es';
import {Observable} from 'rxjs';
import {ApiRequestStatus} from '@appHelpers/shared/shared.helpers';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-purchase-promise-list',
  templateUrl: './purchase-promise-list.component.html',
  styleUrls: ['./purchase-promise-list.component.scss'],
})
export class PurchasePromiseListComponent implements OnInit {
  clients$: Observable<Array<ICustomerResults>> = this.store.select(
    purchasePromiseListSelectors.selectListCustomer,
  );
  dataTypeSelected$: Observable<DropListOption> = this.store.select(
    purchasePromiseListSelectors.selectDataFilterTypeSelected,
  );
  dataTypes$: Observable<Array<DropListOption>> = this.store.select(
    purchasePromiseListSelectors.selectDataFiltersType,
  );
  doughnutChartData$: Observable<IDoughnutChart> = this.store.select(
    purchasePromiseListSelectors.selectDataDonutChart,
  );
  doughnutChartOptionDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    purchasePromiseListSelectors.selectDataDonutOptionsDetails,
  );
  doughnutChartOptionDetailsHover$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(purchasePromiseListSelectors.selectDataDonutOptionDetailHover);
  listRequestStatus$: Observable<number> = this.store.select(
    purchasePromiseListSelectors.selectIsLoadingList,
  );
  tabSelected$: Observable<ITabOption> = this.store.select(purchasePromiseListSelectors.selectTab);
  tabs$: Observable<Array<ITabOption>> = this.store.select(purchasePromiseListSelectors.selectTabs);
  totalOc$: Observable<number | string> = this.store.select(
    purchasePromiseListSelectors.selectTotalOC,
  );
  totalsCustomers$: Observable<number> = this.store.select(
    purchasePromiseListSelectors.selectTotalCustomer,
  );
  dataFilters$: Observable<ISearchOptions> = this.store.select(
    purchasePromiseListSelectors.selectDataFilters,
  );
  readonly statusRequest = ApiRequestStatus;
  clientList: Array<ICustomerResults> = [];
  handleOCSearch = debounce(this.setSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  lodashIsEmpty = isEmpty;
  timer;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(purchasePromiseListActions.INIT_PURCHASE_PROMISE_LIST_COMPONENT_EFFECT());
  }

  fetchMore(event: IPageInfo): void {
    this.store.dispatch(purchasePromiseListActions.FETCH_MORE_COMPONENT_EFFECT({event}));
  }

  selectCustomer(customer: ICustomerResults): void {
    // TODO: Cambiar al effect cuando se obtenga el cliente
    this.store.dispatch(purchasePromiseDetailsActions.SET_CUSTOMER_SELECTED({customer}));
  }

  selectTab(tab: ITabOption): void {
    this.store.dispatch(purchasePromiseListActions.SET_TAB_PROMISE({tab}));
  }

  setFilter(filter: DropListOption): void {
    this.store.dispatch(purchasePromiseListActions.SET_FILTER_PROMISE({filter}));
  }

  setFilterDate(dateRange: IFilterDate): void {
    this.store.dispatch(purchasePromiseListActions.SET_DATE_RANGE_PROMISE({dateRange}));
  }

  setSearchTerm(searchTerm: string): void {
    this.store.dispatch(purchasePromiseListActions.SET_SEARCH_TERM_PROMISE({searchTerm}));
  }
}
