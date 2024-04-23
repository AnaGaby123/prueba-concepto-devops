/* Core Container */
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {debounce, isEmpty} from 'lodash-es';

/* Models Imports */
import {AppState} from '@appCore/core.state';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IBarChart, IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {IStrategyByClient} from '@appModels/store/pendings/strategy/strategy-dashboard/strategy-dashboard.model';
import {ITabOption} from '@appModels/botonera/botonera-option';

/* Actions Imports */
import {strategyDashboardActions} from '@appActions/pendings/strategy';

/* Selectors Imports */
import {strategyDashboardSelectors} from '@appSelectors/pendings/strategy';

/* Dev Tools */
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-strategy-dashboard',
  templateUrl: './strategy-dashboard.component.html',
  styleUrls: ['./strategy-dashboard.component.scss'],
})
export class StrategyDashboardComponent implements OnInit {
  activeChart$: Observable<boolean> = this.store.select(
    strategyDashboardSelectors.selectActiveChart,
  );
  doughnutChartData$: Observable<IDoughnutChart> = this.store.select(
    strategyDashboardSelectors.selectDoughnutChartData,
  );
  doughnutChartOptionDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    strategyDashboardSelectors.selectDoughnutChartOptionDetails,
  );
  doughnutChartOptionDetailsHover$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(strategyDashboardSelectors.selectDoughnutChartOptionDetailsHover);
  filterType$: Observable<DropListOption> = this.store.select(
    strategyDashboardSelectors.selectedTypeFilterOption,
  );
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  listApiStatus$: Observable<number> = this.store.select(
    strategyDashboardSelectors.selectClientsForStrategyListRequestStatus,
  );
  listStrategies$: Observable<Array<IStrategyByClient>> = this.store.select(
    strategyDashboardSelectors.selectMappedClientForStrategyList,
  );
  listStrategiesScrollItems: Array<IStrategyByClient> = [];
  options$: Observable<Array<ITabOption>> = this.store.select(
    strategyDashboardSelectors.selectOptionTabs,
  );
  searchTerm$: Observable<string> = this.store.select(strategyDashboardSelectors.selectSearchTerm);
  searchTypes$: Observable<Array<DropListOption>> = this.store.select(
    strategyDashboardSelectors.selectSearchTypes,
  );
  selectedSearchType$: Observable<DropListOption> = this.store.select(
    strategyDashboardSelectors.selectedSearchType,
  );
  tapSelected$: Observable<ITabOption> = this.store.select(
    strategyDashboardSelectors.selectedTabOption,
  );
  titleBarChart = 'COTIZACIONES';
  totalQuoteAmount$: Observable<number> = this.store.select(
    strategyDashboardSelectors.selectTotalQuoteAmount,
  );
  totalQuotes$: Observable<number> = this.store.select(
    strategyDashboardSelectors.selectTotalQuotes,
  );
  valueFilter$: Observable<DropListOption[]> = this.store.select(
    strategyDashboardSelectors.selectDataFilterByType,
  );
  valuesBarChart$: Observable<IBarChart> = this.store.select(
    strategyDashboardSelectors.selectDataBarChart,
  );
  viewType$: Observable<string> = this.store.select(selectViewType);

  textSearch = '';
  readonly viewTypes = AppViewTypes;
  lodashIsEmpty = isEmpty;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(strategyDashboardActions.INIT_STRATEGY_DASHBOARD_COMPONENT_EFFECT());
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(strategyDashboardActions.SET_SEARCH_TERM({searchTerm}));
    this.textSearch = searchTerm;
  }

  handleTabSelectedOptionChange(tab: ITabOption): void {
    this.store.dispatch(strategyDashboardActions.SET_TAP({tab}));
  }

  handleItemListClick(selectedClient: IStrategyByClient): void {
    this.store.dispatch(strategyDashboardActions.HANDLE_SET_CLIENT_EFFECT({selectedClient}));
  }

  handleDateFilterSelectedOptionChange(filters) {
    this.store.dispatch(strategyDashboardActions.SET_FILTER_BY_DATES({filters}));
  }

  handleTypeFilterSelectedOptionChange(filter: DropListOption) {
    this.store.dispatch(strategyDashboardActions.SET_FILTER_BY_TYPE({filter}));
  }

  setSearchType(searchType: DropListOption) {
    this.store.dispatch(strategyDashboardActions.SET_SEARCH_TYPE({searchType}));
    if (this.textSearch !== '') {
      this.changeSearchTerm(this.textSearch);
    }
  }
}
