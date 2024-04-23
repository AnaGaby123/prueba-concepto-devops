import {debounce} from 'lodash-es';

import {Component, OnInit} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

/* Selectors Imports */
import {processPurchaseListSelectors} from '@appSelectors/pendings/purchasing-manager/process-purchase';

/* Actions Imports */
import {
  processPurchaseActions,
  processPurchaseDetailsActions,
  processPurchaseListActions,
} from '@appActions/pendings/purchasing-manager/process-purchase';

/* Models Import */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {IEvisResults} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-list/offer-adjustment-list.model';
import {IFilterDate} from '@appModels/filters/Filters';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/process-purchase/process-purchase-list/process-purchase-list.models';
import {ITabOption} from '@appModels/botonera/botonera-option';

/* Tools Imports */
import {
  API_REQUEST_STATUS_LOADING,
  DEFAULT_TIME_DEBOUNCE_SEARCH,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';

@Component({
  selector: 'app-process-purchase-list',
  templateUrl: './process-purchase-list.component.html',
  styleUrls: ['./process-purchase-list.component.scss'],
})
export class ProcessPurchaseListComponent implements OnInit {
  doughnutDataPL$: Observable<IDoughnutChart> = this.store.select(
    processPurchaseListSelectors.selectDoughnutDataProductLine,
  );
  doughnutDataProvider$: Observable<IDoughnutChart> = this.store.select(
    processPurchaseListSelectors.selectDoughnutDataProvider,
  );
  doughnutDataTransit$: Observable<IDoughnutChart> = this.store.select(
    processPurchaseListSelectors.selectDoughnutDataTransit,
  );
  doughnutOptionsDetailsPL$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    processPurchaseListSelectors.selectDoughnutChartProductLineOptionDetails,
  );
  doughnutOptionsDetailsPLHover$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(processPurchaseListSelectors.selectDoughnutChartProductLineDetailsHover);
  doughnutOptionsDetailsProvider$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    processPurchaseListSelectors.selectDoughnutChartProviderOptionDetails,
  );
  doughnutOptionsDetailsProviderHover$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(processPurchaseListSelectors.selectDoughnutChartProviderDetailsHover);
  doughnutOptionsDetailsTransit$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    processPurchaseListSelectors.selectDoughnutChartTransitOptionDetails,
  );
  doughnutOptionsDetailsTransitHover$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(processPurchaseListSelectors.selectDoughnutChartTransitDetailsHover);
  isLoadingList$: Observable<boolean> = this.store.select(
    processPurchaseListSelectors.selectIsLoadingList,
  );
  isSuccessCharts$: Observable<boolean> = this.store.select(
    processPurchaseListSelectors.selectStatusApiDonut,
  );
  providers$: Observable<Array<IProvider>> = this.store.select(
    processPurchaseListSelectors.selectProviders,
  );
  searchTerm$: Observable<string> = this.store.select(
    processPurchaseListSelectors.selectSearchTerm,
  );
  sort$: Observable<DropListOption> = this.store.select(processPurchaseListSelectors.selectSort);
  sortList$: Observable<Array<DropListOption>> = this.store.select(
    processPurchaseListSelectors.selectSortList,
  );
  tab$: Observable<ITabOption> = this.store.select(processPurchaseListSelectors.selectTab);
  tabs$: Observable<Array<ITabOption>> = this.store.select(processPurchaseListSelectors.selectTabs);
  totalProvider$: Observable<number> = this.store.select(
    processPurchaseListSelectors.selectTotalProviders,
  );
  totals$: Observable<any> = this.store.select(processPurchaseListSelectors.selectTotals);
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  listProviderScrollItems: Array<IProvider> = [];
  timer;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getProviders(true);
    this.store.dispatch(processPurchaseListActions.FETCH_CHARTS_DONUT_LOAD());
    this.store.dispatch(processPurchaseActions.SET_IS_DETAILS({isDetails: false}));
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(processPurchaseListActions.SET_SEARCH_TERM({searchTerm}));
  }

  async fetchMore(event: IPageInfo): Promise<void> {
    const provider: Array<IEvisResults> = await lastValueFrom(
      this.store.pipe(select(processPurchaseListSelectors.selectProviders), take(1)),
    );

    if (event.endIndex !== provider.length - 1) {
      return;
    }
    const listStatus = await lastValueFrom(
      this.store.pipe(select(processPurchaseListSelectors.selectStatusApi), take(1)),
    );
    const currentTotal: number = await lastValueFrom(
      this.store.pipe(select(processPurchaseListSelectors.selectTotalProviders), take(1)),
    );
    const currentPage: number = await lastValueFrom(
      this.store.pipe(select(processPurchaseListSelectors.selectCurrentPage), take(1)),
    );
    if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
      const totalPages = currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;
      if (
        currentPage > totalPages ||
        provider.length > currentTotal ||
        listStatus === API_REQUEST_STATUS_LOADING
      ) {
        return;
      }
      this.getProviders(false);
    }
  }

  getProviders(isFirstPage: boolean): void {
    this.store.dispatch(processPurchaseListActions.FETCH_PROVIDERS_LOAD({isFirstPage}));
  }

  setTab(tab: ITabOption): void {
    this.store.dispatch(processPurchaseListActions.SET_TAB_SELECTED({tab}));
  }

  setTypeSort(type: DropListOption): void {
    this.store.dispatch(processPurchaseListActions.SET_SORT_SELECTED({typeSort: type}));
  }

  setRangeDate(dateRange: IFilterDate): void {
    this.store.dispatch(processPurchaseListActions.SET_RANGE_DATE({dateRange}));
  }

  setProvider(provider: IProvider): void {
    this.store.dispatch(processPurchaseDetailsActions.SET_PROVIDER({provider}));
  }
}
