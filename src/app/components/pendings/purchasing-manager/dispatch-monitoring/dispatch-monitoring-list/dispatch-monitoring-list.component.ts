import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

/* Tools Imports */
import {debounce, isEmpty} from 'lodash-es';

import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {dispatchMonitoringListSelectors} from '@appSelectors/pendings/purchasing-manager/dispatch-monitoring';
import {
  dispatchMonitoringDetailsActions,
  dispatchMonitoringListActions,
} from '@appActions/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring.dictionaty.actions';
import {IBarChart, IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {IProvidersDispatchMonitoring} from '@appModels/store/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring-list/dispatch-monitoring-list.models';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-dispatch-monitoring-list',
  templateUrl: './dispatch-monitoring-list.component.html',
  styleUrls: ['./dispatch-monitoring-list.component.scss'],
})
export class DispatchMonitoringListComponent implements OnInit, OnDestroy {
  dataChartStatus$: Observable<number> = this.store.select(
    dispatchMonitoringListSelectors.selectDataChartsStatus,
  );
  donutChartData$: Observable<IDoughnutChart> = this.store.select(
    dispatchMonitoringListSelectors.selectDonutChartData,
  );
  donutChartDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    dispatchMonitoringListSelectors.selectDonutChartDetails,
  );
  donutChartDetailsHover$: Observable<Array<Array<IDoughnutChartDetails>>> = this.store.select(
    dispatchMonitoringListSelectors.selectDonutChartDetailsHover,
  );
  providers$: Observable<Array<IProvidersDispatchMonitoring>> = this.store.select(
    dispatchMonitoringListSelectors.selectProviders,
  );
  providersStatus$: Observable<number> = this.store.select(
    dispatchMonitoringListSelectors.selectProvidersStatus,
  );
  searchTerm$: Observable<string> = this.store.select(
    dispatchMonitoringListSelectors.selectSearchTerm,
  );
  sortList$: Observable<Array<DropListOption>> = this.store.select(
    dispatchMonitoringListSelectors.selectSortList,
  );
  sortOption$: Observable<DropListOption> = this.store.select(
    dispatchMonitoringListSelectors.selectSorOption,
  );
  totals$: Observable<any> = this.store.select(dispatchMonitoringListSelectors.selectTotalsFooter);
  valuesBarChartDelivery$: Observable<IBarChart> = this.store.select(
    dispatchMonitoringListSelectors.selectDataBarChartDelivery,
  );
  valuesBarChartTime$: Observable<IBarChart> = this.store.select(
    dispatchMonitoringListSelectors.selectDataBarChartTime,
  );
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  lodashIsEmpty = isEmpty;
  providersScroll: Array<IProvidersDispatchMonitoring> = [];
  today: string = new Date().toISOString();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(dispatchMonitoringListActions.FETCH_PROVIDERS_LOAD());
    this.store.dispatch(dispatchMonitoringListActions.FETCH_DATA_CHARTS_LOAD());
  }

  ngOnDestroy(): void {
    this.store.dispatch(dispatchMonitoringListActions.CLEAN_ALL_DISPATCH_MONITORING_LIST());
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(dispatchMonitoringListActions.SET_SEARCH_TERM({searchTerm}));
  }

  setOptionSort(sort: DropListOption): void {
    this.store.dispatch(dispatchMonitoringListActions.SET_SORT_OPTION({sort}));
  }

  setProvider(providerSelected: IProvidersDispatchMonitoring): void {
    if (providerSelected) {
      this.store.dispatch(
        dispatchMonitoringDetailsActions.SET_PROVIDER_SELECTED({
          providerSelected,
        }),
      );
    }
  }
}
