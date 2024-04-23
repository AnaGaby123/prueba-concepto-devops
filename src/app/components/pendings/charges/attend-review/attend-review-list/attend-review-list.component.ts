import {debounce} from 'lodash-es';

import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
/*Selectors Imports*/
import {attendViewListSelectors} from '@appSelectors/pendings/charges/attend-review';
/*Models Imports*/
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IBarChart, IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {ICustomerAttend} from '@appModels/store/pendings/charges/attend-review/attend-review-list/attend-review-list.models';
import {ITabOption} from '@appModels/botonera/botonera-option';

/*Actions Imports*/
import {
  attendReviewActions,
  attendReviewDetailsActions,
  attendReviewListActions,
} from '@appActions/pendings/charges/attend-review';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-attend-review-list',
  templateUrl: './attend-review-list.component.html',
  styleUrls: ['./attend-review-list.component.scss'],
})
export class AttendReviewListComponent implements OnInit {
  apiStatus$: Observable<number> = this.store.select(attendViewListSelectors.selectApiStatus);
  customers$: Observable<Array<ICustomerAttend>> = this.store.select(
    attendViewListSelectors.selectListCustomer,
  );
  dataBarChart$: Observable<IBarChart> = this.store.select(
    attendViewListSelectors.selectDataBarChart,
  );
  dataDetailsHover$: Observable<Array<Array<IDoughnutChartDetails>>> = this.store.select(
    attendViewListSelectors.selectDataHoverDoughnut,
  );
  dateDetailsChart$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    attendViewListSelectors.selectDetailsDoughnutChart,
  );
  doughnutData$: Observable<IDoughnutChart> = this.store.select(
    attendViewListSelectors.selectDataDoughnutChart,
  );
  filter$: Observable<DropListOption> = this.store.select(attendViewListSelectors.selectFilter);
  filters$: Observable<Array<DropListOption>> = this.store.select(
    attendViewListSelectors.selectFilters,
  );
  tab$: Observable<ITabOption> = this.store.select(attendViewListSelectors.selectOption);
  tabs$: Observable<Array<ITabOption>> = this.store.select(attendViewListSelectors.selectOptions);
  totalAmount$: Observable<number> = this.store.select(attendViewListSelectors.selectTotalAmount);
  customersScroller: Array<ICustomerAttend> = [];
  handleKeySearch = debounce((value) => this.changeSearchTerm(value), DEFAULT_TIME_DEBOUNCE_SEARCH);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(attendReviewListActions.FETCH_CUSTOMER_LOAD());
    this.store.dispatch(attendReviewDetailsActions.CLEAN_ALL_DETAILS_STATE());
    this.store.dispatch(attendReviewActions.SET_IS_IN_DETAILS_VIEW({isInDetailsView: false}));
  }

  setOption(option: DropListOption): void {
    this.store.dispatch(attendReviewListActions.SET_OPTION_ORDER({option}));
  }

  setTab(tab: ITabOption): void {
    this.store.dispatch(attendReviewListActions.SET_TAB_SELECTED({tab}));
  }

  changeSearchTerm(termSearch: string): void {
    this.store.dispatch(attendReviewListActions.SET_TERM_SEARCH({termSearch}));
  }

  selectedCustomer(customer: ICustomerAttend): void {
    this.store.dispatch(attendReviewActions.SET_IS_IN_DETAILS_VIEW({isInDetailsView: true}));
    this.store.dispatch(
      attendReviewDetailsActions.SET_SELECTED_CLIENT({
        selectedClient: customer,
      }),
    );
  }
}
