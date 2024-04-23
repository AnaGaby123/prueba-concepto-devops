import {Component, OnDestroy, OnInit} from '@angular/core';
/*Utils import*/
import {debounce, isEmpty} from 'lodash-es';

import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
/*Selectors imports*/
import {followPPromiseListSelectors} from '@appSelectors/pendings/follow-purchase-promise';
/*Actions Imports*/
import {
  followPPromiseActions,
  followPPromiseDetailsActions,
  followPPromiseListActions,
} from '@appActions/pendings/follow-purchase-promise';

/*Models Imports*/
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IBarChart, IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {ICustomerFPP} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise-list/follow-purchase-promise.models';
import {IFilterDate} from '@appModels/filters/Filters';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {ITabOption} from '@appModels/botonera/botonera-option';

/*Utils imports*/
import {ApiRequestStatus} from '@appHelpers/shared/shared.helpers';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';
import {selectTotalItems} from '@appSelectors/pendings/follow-purchase-promise/follow-purchase-promise-list/follow-purchase-promise-list.selectors';

@Component({
  selector: 'app-follow-purchase-promise-list',
  templateUrl: './follow-purchase-promise-list.component.html',
  styleUrls: ['./follow-purchase-promise-list.component.scss'],
})
export class FollowPurchasePromiseListComponent implements OnInit {
  customers$: Observable<Array<ICustomerFPP>> = this.store.select(
    followPPromiseListSelectors.selectCustomerList,
  );
  requestStatus$: Observable<number> = this.store.select(
    followPPromiseListSelectors.selectRequestStatus,
  );
  dataDonutRequestStatus$: Observable<number> = this.store.select(
    followPPromiseListSelectors.selectDonutChartRequestStatus,
  );
  dataItems$: Observable<IBarChart> = this.store.select(
    followPPromiseListSelectors.selectDataBarChartItem,
  );
  donutChartData$: Observable<IDoughnutChart> = this.store.select(
    followPPromiseListSelectors.selectDoughnutChartData,
  );
  donutChartDataDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    followPPromiseListSelectors.selectDoughnutChartDataDetails,
  );
  donutChartDataDetailsHover$: Observable<Array<Array<IDoughnutChartDetails>>> = this.store.select(
    followPPromiseListSelectors.selectDoughnutChartDataDetailsHover,
  );
  filter$: Observable<DropListOption> = this.store.select(
    followPPromiseListSelectors.selectFilterType,
  );
  filters$: Observable<Array<DropListOption>> = this.store.select(
    followPPromiseListSelectors.selectFiltersType,
  );
  searchTerm$: Observable<string> = this.store.select(followPPromiseListSelectors.selectSearchTerm);
  tab$: Observable<ITabOption> = this.store.select(followPPromiseListSelectors.selectTabSelected);
  tabs$: Observable<Array<ITabOption>> = this.store.select(followPPromiseListSelectors.selectTabs);
  totalResults$: Observable<number> = this.store.select(
    followPPromiseListSelectors.selectCustomerTotal,
  );
  totalItems$: Observable<number> = this.store.select(followPPromiseListSelectors.selectTotalItems);
  totalPromisePurchaseUSD: Observable<number> = this.store.select(
    followPPromiseListSelectors.selectTotalPromisePurchaseUSD,
  );
  readonly statusRequest = ApiRequestStatus;
  customerScrollItems: Array<ICustomerFPP> = [];
  dataDatesBarChart$ = this.store.select(followPPromiseListSelectors.selectDataBarChartDates);
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  lodashIsEmpty = isEmpty;
  timer;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      followPPromiseListActions.INIT_FOLLOW_PURCHASE_PROMISE_LIST_COMPONENT_EFFECT(),
    );
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(followPPromiseListActions.SET_SEARCH_TERM({searchTerm}));
  }

  fetchMore(event: IPageInfo): void {
    this.store.dispatch(followPPromiseListActions.FETCH_MORE_COMPONENT_EFFECT({event}));
  }

  getCustomer(isFirstPage): void {
    this.store.dispatch(followPPromiseListActions.FETCH_CUSTOMER_LIST_LOAD({isFirstPage}));
  }

  setTab(tab: ITabOption): void {
    this.store.dispatch(followPPromiseListActions.SET_TAB({tab}));
  }

  setFilterByOrder(filter: DropListOption): void {
    this.store.dispatch(followPPromiseListActions.SET_FILTER_ORDER({filter}));
  }

  setFilterByDate(dateRange: IFilterDate): void {
    this.store.dispatch(followPPromiseListActions.SET_FILTERS_DATE_RANGE({dateRange}));
  }

  selectCustomer(customer: ICustomerFPP): void {
    this.store.dispatch(followPPromiseActions.SET_ALLOWED_TO_DETAILS());
    this.store.dispatch(followPPromiseDetailsActions.SET_CLIENT_FOLLOW_SELECTED({customer}));
  }
}
