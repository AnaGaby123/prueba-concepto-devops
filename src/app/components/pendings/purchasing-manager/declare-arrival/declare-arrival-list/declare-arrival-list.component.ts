import {debounce} from 'lodash-es';

import {Component, OnInit} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
/*Selectors Imports*/
import {declareArrivalListSelectors} from '@appSelectors/pendings/purchasing-manager/declare-arrival';
/*Actions Imports*/
import {
  declareArrivalActions,
  declareArrivalDetailsActions,
  declareArrivalListActions,
} from '@appActions/pendings/purchasing-manager/declare-arrival';
/*Models Imports*/
import {GraficasDashboardDeclararArribos} from 'api-logistica';
import {IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-list/declare-arrival-list.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
/*Utils imports*/
import {DEFAULT_TIME_DEBOUNCE_SEARCH, PAGING_LIMIT} from '@appUtil/common.protocols';

@Component({
  selector: 'app-declare-arrival-list',
  templateUrl: './declare-arrival-list.component.html',
  styleUrls: ['./declare-arrival-list.component.scss'],
})
export class DeclareArrivalListComponent implements OnInit {
  dataDetailsDonutChart$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    declareArrivalListSelectors.selectDataDetailsDoughnutChart,
  );
  dataDetailsHover$: Observable<Array<Array<IDoughnutChartDetails>>> = this.store.select(
    declareArrivalListSelectors.selectDataDetailsHoverDoughnutChart,
  );
  dataDonutChart$: Observable<IDoughnutChart> = this.store.select(
    declareArrivalListSelectors.selectDataDoughnutChart,
  );
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  isLoadingProviders$: Observable<boolean> = this.store.select(
    declareArrivalListSelectors.selectIsLoadingApi,
  );
  providers$: Observable<Array<IProvider>> = this.store.select(
    declareArrivalListSelectors.selectListProviders,
  );
  searchTerm$: Observable<string> = this.store.select(declareArrivalListSelectors.selectSearchTerm);
  sort$: Observable<DropListOption> = this.store.select(declareArrivalListSelectors.selectSort);
  sortList$: Observable<Array<DropListOption>> = this.store.select(
    declareArrivalListSelectors.selectListSort,
  );
  tab$: Observable<ITabOption> = this.store.select(declareArrivalListSelectors.selectTabSelected);
  tabs$: Observable<Array<ITabOption>> = this.store.select(
    declareArrivalListSelectors.selectListTab,
  );
  totalProviders$: Observable<number> = this.store.select(
    declareArrivalListSelectors.selectTotalsProviders,
  );
  totals$: Observable<GraficasDashboardDeclararArribos> = this.store.select(
    declareArrivalListSelectors.selectTotals,
  );
  providersScroll: Array<IProvider>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getProvider(true);
    this.store.dispatch(declareArrivalListActions.FETCH_DONUT_CHART_LOAD());
    this.store.dispatch(declareArrivalListActions.FETCH_TOTALS_LOAD());
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(declareArrivalListActions.SET_TERM_SEARCH({searchTerm}));
  }

  setTypeSort(sort: DropListOption): void {
    this.store.dispatch(declareArrivalListActions.SET_SORT_OPTION({sort}));
  }

  setTab(tab: ITabOption): void {
    this.store.dispatch(declareArrivalListActions.SET_TAB_SELECTED({tab}));
  }

  async fetchMore(event: IPageInfo): Promise<void> {
    const provider: Array<IProvider> = await lastValueFrom(
      this.store.pipe(select(declareArrivalListSelectors.selectListProviders), take(1)),
    );
    if (event.endIndex !== provider.length - 1) {
      return;
    }
    const listStatus = await lastValueFrom(
      this.store.pipe(select(declareArrivalListSelectors.selectIsLoadingApi), take(1)),
    );
    const currentTotal: number = await lastValueFrom(
      this.store.pipe(select(declareArrivalListSelectors.selectTotalsProviders), take(1)),
    );
    const currentPage: number = await lastValueFrom(
      this.store.pipe(select(declareArrivalListSelectors.selectCurrentPage), take(1)),
    );
    if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
      const totalPages = currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;
      if (currentPage > totalPages || provider.length > currentTotal || listStatus) {
        return;
      }
      this.getProvider(false);
    }
  }

  getProvider(isFirstPage: boolean): void {
    this.store.dispatch(declareArrivalListActions.FETCH_PROVIDERS_LOAD({isFirstPage}));
  }

  selectProvider(selectedProvider: IProvider): void {
    if (selectedProvider) {
      this.store.dispatch(
        declareArrivalActions.SET_ALLOW_TO_DETAILS({
          allowToDetails: true,
        }),
      );
      this.store.dispatch(declareArrivalDetailsActions.SET_SELECTED_PROVIDER({selectedProvider}));
    }
  }
}
