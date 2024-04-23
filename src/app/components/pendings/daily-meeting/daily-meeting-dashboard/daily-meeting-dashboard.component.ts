/* Core Container */
import {debounce} from 'lodash-es';

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

/* Models Imports */
import {AppState} from '@appCore/core.state';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

/* Selectors Imports */
import {dailyMeetingListSelectors} from '@appSelectors/pendings/daily-meeting';
import {IBarChart, IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {dailyMeetingDashboardActions} from '@appActions/pendings/daily-meeting';

/* Dev Tools */
import {IFilterDate} from '@appModels/filters/Filters';
import {Evi} from '@appModels/store/pendings/daily-meeting/daily-meeting-dashboard/daily-meeting-dashboard.model';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-daily-meeting-list',
  templateUrl: './daily-meeting-dashboard.component.html',
  styleUrls: ['./daily-meeting-dashboard.component.scss'],
})
export class DailyMeetingDashboardComponent implements OnInit, OnDestroy {
  doughnutChartData$: Observable<IDoughnutChart> = this.store.select(
    dailyMeetingListSelectors.selectDoughnutChartData,
  );
  doughnutChartOptionDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    dailyMeetingListSelectors.selectDoughnutChartOptionDetails,
  );
  doughnutChartOptionDetailsHover$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(dailyMeetingListSelectors.selectDoughnutChartOptionDetailsHover);
  filterType$: Observable<DropListOption> = this.store.select(
    dailyMeetingListSelectors.selectedTypeFilterOption,
  );
  isLoadingDailyMeetingList$: Observable<number> = this.store.select(
    dailyMeetingListSelectors.selectEviListRequestStatus,
  );
  listDailyMeetings$: Observable<Array<Evi>> = this.store.select(
    dailyMeetingListSelectors.selectListDailyMeetings,
  );
  searchTerm$: Observable<string> = this.store.select(dailyMeetingListSelectors.selectSearchTerm);
  searchTypes$: Observable<Array<DropListOption>> = this.store.select(
    dailyMeetingListSelectors.selectSearchTypes,
  );
  totalClients$: Observable<number> = this.store.select(
    dailyMeetingListSelectors.selectTotalClients,
  );
  totalQuoteAmount$: Observable<number> = this.store.select(
    dailyMeetingListSelectors.selectTotalClosingValue,
  );
  totalQuotes$: Observable<number> = this.store.select(dailyMeetingListSelectors.selectTotalQuotes);
  typeSelected$: Observable<DropListOption> = this.store.select(
    dailyMeetingListSelectors.selectedSearchTypeOption,
  );
  valueFilter$: Observable<DropListOption[]> = this.store.select(
    dailyMeetingListSelectors.selectDataFilterByType,
  );
  valuesBarChart$: Observable<IBarChart> = this.store.select(
    dailyMeetingListSelectors.selectDataBarChart,
  );
  handleSearchTermChange = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  textSearch = '';
  listDailyMeetingsScrollItems: Array<Evi> = [];
  titleBarChart = 'VALOR TOTAL EN CIERRE POR EVI';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(
      dailyMeetingDashboardActions.INIT_DAILY_MEETING_DASHBOARD_COMPONENT_EFFECT(),
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(dailyMeetingDashboardActions.CLEAN_ALL_DAILY_MEETING_LIST());
  }

  redirectToDetails(eviSelected: Evi): void {
    this.store.dispatch(dailyMeetingDashboardActions.HANDLE_SET_SELECTED_EVI_EFFECT({eviSelected}));
  }

  selectFilterByType(filter: DropListOption): void {
    this.store.dispatch(dailyMeetingDashboardActions.SET_FILTER_BY_TYPE({filter}));
  }

  handleDateFilterSelectedOptionChange(filters: IFilterDate): void {
    this.store.dispatch(dailyMeetingDashboardActions.SET_FILTER_BY_DATES({filters}));
  }

  handleSearchTypeSelectedOptionChange(searchType: DropListOption): void {
    this.store.dispatch(dailyMeetingDashboardActions.SET_SEARCH_TYPE({searchType}));
    if (this.textSearch !== '') {
      this.changeSearchTerm(this.textSearch);
    }
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(dailyMeetingDashboardActions.SET_SEARCH_TERM({searchTerm}));
    this.textSearch = searchTerm;
  }
}
