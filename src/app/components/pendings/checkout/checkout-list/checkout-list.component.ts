import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {checkoutActions, checkoutListActions} from '@appActions/pendings/checkout';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {debounce} from 'lodash-es';

import {IBarChart, IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {checkoutListSelectors} from '@appSelectors/pendings/checkout';
import {
  ICheckOutDashboardItems,
  IChekoutListTotals,
} from '@appModels/store/pendings/checkout/checkout-list/checkout-list.model';
import {DEFAULT_BUFFER_AMOUNT, DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-checkout-list',
  templateUrl: './checkout-list.component.html',
  styleUrls: ['./checkout-list.component.scss'],
})
export class CheckoutListComponent implements OnInit {
  options$: Observable<Array<ITabOption>> = this.store.select(
    checkoutListSelectors.selectOptionTabs,
  );
  tapSelected$: Observable<ITabOption> = this.store.select(checkoutListSelectors.selectTabSelected);
  valueFilter$: Observable<DropListOption[]> = this.store.select(
    checkoutListSelectors.selectDataFilterByType,
  );
  filterType$: Observable<DropListOption> = this.store.select(
    checkoutListSelectors.selectFilterByType,
  );
  searchTerm$: Observable<string> = this.store.select(checkoutListSelectors.selectSearchTerm);
  listOrders$: Observable<ICheckOutDashboardItems[]> = this.store.select(
    checkoutListSelectors.selectOrders,
  );
  listTotals$: Observable<IChekoutListTotals> = this.store.select(
    checkoutListSelectors.selectListTotals,
  );
  isLoadingListOrders$: Observable<boolean> = this.store.select(
    checkoutListSelectors.selectIsLoadingListOrders,
  );
  doughnutChartData$: Observable<IDoughnutChart> = this.store.select(
    checkoutListSelectors.selectDoughnutChartData,
  );
  doughnutChartOptionDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    checkoutListSelectors.selectDoughnutChartOptionDetails,
  );
  doughnutChartOptionDetailsHover$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(checkoutListSelectors.selectDoughnutChartOptionDetailsHover);
  valuesBarChart$: Observable<IBarChart> = this.store.select(
    checkoutListSelectors.selectDataBarChart,
  );
  searchTypes$: Observable<Array<DropListOption>> = this.store.select(
    checkoutListSelectors.selectSearchTypes,
  );
  selectedSearchType$: Observable<DropListOption> = this.store.select(
    checkoutListSelectors.selectedSearchType,
  );
  titleBarChart = 'Partidas';
  listOrdersScrollItems: ICheckOutDashboardItems[] = [];
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  textSearch = '';
  timer;

  readonly defaultBufferAmount = DEFAULT_BUFFER_AMOUNT;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(checkoutListActions.FETCH_TOTALS_TABS_LOAD());
  }

  redirectToDetails(customer: ICheckOutDashboardItems): void {
    this.store.dispatch(checkoutActions.SET_DETAILS_MODE({detailsMode: true}));
    this.store.dispatch(checkoutActions.SET_DETAILS_COMPONENT({detailsComponent: true}));
    this.store.dispatch(checkoutActions.SET_CLIENT_CHECKOUT_SELECTED({customer}));
  }

  onSelectOption(tab: ITabOption): void {
    this.store.dispatch(checkoutListActions.SET_TAB({tab}));
  }

  selectFilterByType(filter: DropListOption): void {
    this.store.dispatch(checkoutListActions.SET_FILTER_BY_TYPE({filter}));
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(checkoutListActions.SET_SEARCH_TERM({searchTerm}));
    this.textSearch = searchTerm;
  }

  setSearchType(searchType: DropListOption) {
    this.store.dispatch(
      checkoutListActions.SET_SEARCH_TYPE({
        searchType,
      }),
    );
    if (this.textSearch !== '') {
      this.changeSearchTerm(this.textSearch);
    }
  }

  handleTrackByIdClient(index: number, item: ICheckOutDashboardItems): string {
    return item.IdCliente;
  }
}
