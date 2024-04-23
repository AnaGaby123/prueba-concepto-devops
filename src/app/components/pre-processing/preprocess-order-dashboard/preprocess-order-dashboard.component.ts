import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {debounce} from 'lodash-es';
// Actions
import {
  preProcessDetailsActions,
  preProcessOrderDashboardActions,
} from '@appActions/pre-processing';
// Selectors
import {preProcessOrderDashboardSelectors} from '@appSelectors/pre-processing';
// Models
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IBarChart, IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {IListItemForPreProcessing} from '@appModels/store/pre-processing/preprocess-order-dashboard/preprocess-order-dashboard.models';
import {IFilterDate} from '@appModels/filters/Filters';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-preprocess-order-dashboard',
  templateUrl: './preprocess-order-dashboard.component.html',
  styleUrls: ['./preprocess-order-dashboard.component.scss'],
})
export class PreprocessOrderDashboardComponent implements OnInit, OnDestroy {
  options$: Observable<Array<ITabOption>> = this.store.select(
    preProcessOrderDashboardSelectors.selectOptionsTabs,
  );
  tabSelected$: Observable<ITabOption> = this.store.select(
    preProcessOrderDashboardSelectors.selectTab,
  );
  filters$: Observable<Array<DropListOption>> = this.store.select(
    preProcessOrderDashboardSelectors.selectFilter,
  );
  filterSelected$: Observable<DropListOption> = this.store.select(
    preProcessOrderDashboardSelectors.selectFilterSelected,
  );
  isLoadingClientsPreProcessing$: Observable<number> = this.store.select(
    preProcessOrderDashboardSelectors.selectIsLoadingClientsPreProcessing,
  );
  doughnutChartData$: Observable<IDoughnutChart> = this.store.select(
    preProcessOrderDashboardSelectors.selectDataDonutChart,
  );
  doughnutChartOptionDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    preProcessOrderDashboardSelectors.selectDataDonutOptionDetails,
  );
  doughnutChartOptionDetailsHover$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(preProcessOrderDashboardSelectors.selectDataDonutOptionDetailsHover);
  barChartData$: Observable<IBarChart> = this.store.select(
    preProcessOrderDashboardSelectors.selectDataBarChart,
  );
  customers$: Observable<Array<IListItemForPreProcessing>> = this.store.select(
    preProcessOrderDashboardSelectors.selectCustomers,
  );
  totals$: Observable<Array<ITabOption>> = this.store.select(
    preProcessOrderDashboardSelectors.selectTotals,
  );
  searchTypes$: Observable<Array<DropListOption>> = this.store.select(
    preProcessOrderDashboardSelectors.selectSearchTypes,
  );
  typeSelected$: Observable<DropListOption> = this.store.select(
    preProcessOrderDashboardSelectors.selectTypeSelected,
  );
  totalsItems$: Observable<number> = this.store.select(
    preProcessOrderDashboardSelectors.selectTotalItems,
  );
  OCTotals$: Observable<number> = this.store.select(
    preProcessOrderDashboardSelectors.selectOCTotals,
  );
  totalUSDValue$: Observable<number> = this.store.select(
    preProcessOrderDashboardSelectors.totalValueUSD,
  );
  customerScrollItems: Array<IListItemForPreProcessing> = [];
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  textSearch = '';

  constructor(private store: Store, private route: Router) {}

  ngOnInit(): void {
    this.store.dispatch(
      preProcessOrderDashboardActions.INIT_PRE_PROCESSING_DASHBOARD_COMPONENT_EFFECT(),
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(preProcessOrderDashboardActions.CLEAN_DATA_DASHBOARD());
  }

  setTab(tab: ITabOption): void {
    this.store.dispatch(preProcessOrderDashboardActions.SET_TAB_FILTER({tab}));
  }

  redirect(customer: IListItemForPreProcessing): void {
    this.store.dispatch(
      preProcessDetailsActions.SET_CLIENT_SELECTED({
        customer,
      }),
    );
  }

  setRange(values: IFilterDate): void {
    this.store.dispatch(
      preProcessOrderDashboardActions.SET_FILTER_DATES({
        dates: values,
      }),
    );
  }

  setSearchType(type: DropListOption): void {
    this.store.dispatch(
      preProcessOrderDashboardActions.SET_SEARCH_TYPE({
        searchType: type,
      }),
    );
    if (this.textSearch !== '') {
      this.changeSearchTerm(this.textSearch);
    }
  }

  changeSearchTerm(term: string): void {
    this.store.dispatch(
      preProcessOrderDashboardActions.SET_TERM_SEARCH({
        term,
      }),
    );
    this.textSearch = term;
  }

  setOrder(orderType: DropListOption): void {
    this.store.dispatch(
      preProcessOrderDashboardActions.SET_ORDER_TYPE({
        order: orderType,
      }),
    );
  }
}
