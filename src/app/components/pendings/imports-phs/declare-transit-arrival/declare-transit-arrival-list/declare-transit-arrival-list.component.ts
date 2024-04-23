/*Core Imports */
import {Component, OnInit} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';

/*Models Import*/
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IBarChart, IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/declare-arrival/declare-arrival-list/declare-arrival-list.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
/* Actions Imports */
import {
  declareTransitArrivalActions,
  declareTransitArrivalDetailsActions,
  declareTransitArrivalListActions,
} from '@appActions/pendings/imports-phs/declare-transit-arrival';

/*Selectors Imports */
import {declareTransitArrivalListSelectors} from '@appSelectors/pendings/imports-phs/declare-transit-arrival';
import {declareArrivalListSelectors} from '@appSelectors/pendings/purchasing-manager/declare-arrival';

/* Tools Imports */
import {debounce, isEmpty} from 'lodash-es';

import {take} from 'rxjs/operators';
import {DEFAULT_TIME_DEBOUNCE_SEARCH, PAGING_LIMIT} from '@appUtil/common.protocols';
import {GraficasDashboardDeclararArribos} from 'api-logistica';

@Component({
  selector: 'app-declare-transit-arrival-list',
  templateUrl: './declare-transit-arrival-list.component.html',
  styleUrls: ['./declare-transit-arrival-list.component.scss'],
})
export class DeclareTransitArrivalListComponent implements OnInit {
  dataBarChartDelivery$: Observable<IBarChart> = this.store.select(
    declareTransitArrivalListSelectors.selectDataBarChartDelivery,
  );
  dataByOrder$: Observable<Array<DropListOption>> = this.store.select(
    declareTransitArrivalListSelectors.selectDataByOrder,
  );
  dataDetailsHover$: Observable<Array<Array<IDoughnutChartDetails>>> = this.store.select(
    declareTransitArrivalListSelectors.selectDataDetailsHoverDoughnutChart,
  );
  dataDonutChart$: Observable<IDoughnutChart> = this.store.select(
    declareTransitArrivalListSelectors.selectDataDoughnutChart,
  );
  detailsDonutChart$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    declareTransitArrivalListSelectors.selectDataDetailsDoughnutChart,
  );
  optionsTab$: Observable<Array<ITabOption>> = this.store.select(
    declareTransitArrivalListSelectors.selectListTab,
  );
  orderSelected$: Observable<DropListOption> = this.store.select(
    declareTransitArrivalListSelectors.selectOrderList,
  );
  providers$: Observable<Array<IProvider>> = this.store.select(
    declareTransitArrivalListSelectors.selectListProviders,
  );
  searchTerm$: Observable<string> = this.store.select(
    declareTransitArrivalListSelectors.selectSearchTerm,
  );
  selectedTab$: Observable<ITabOption> = this.store.select(
    declareTransitArrivalListSelectors.selectTab,
  );
  statusCharts$: Observable<number> = this.store.select(
    declareTransitArrivalListSelectors.selectStatusCharts,
  );
  statusProviders$: Observable<number> = this.store.select(
    declareTransitArrivalListSelectors.selectProvidersStatus,
  );
  totalProviders$: Observable<number> = this.store.select(
    declareTransitArrivalListSelectors.selectTotalsProviders,
  );
  totals$: Observable<GraficasDashboardDeclararArribos> = this.store.select(
    declareTransitArrivalListSelectors.selectTotals,
  );
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  lodashIsEmpty = isEmpty;
  providersScroll: Array<IProvider>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.getProvider(true);
    this.store.dispatch(declareTransitArrivalListActions.FETCH_TOTALS_LOAD());
    this.store.dispatch(declareTransitArrivalListActions.FETCH_DONUT_CHART_LOAD());
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(declareTransitArrivalListActions.SET_TERM_SEARCH({searchTerm}));
  }

  setFilter(filter: DropListOption): void {
    this.store.dispatch(declareTransitArrivalListActions.SET_FILTER_ORDER({filter}));
  }

  setTab(tab: ITabOption): void {
    this.store.dispatch(declareTransitArrivalListActions.SET_TAB_SELECTED({tab}));
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
    this.store.dispatch(declareTransitArrivalListActions.FETCH_PROVIDERS_LOAD({isFirstPage}));
  }

  selectProvider(selectedProvider: IProvider): void {
    if (selectedProvider) {
      this.store.dispatch(
        declareTransitArrivalActions.SET_ALLOWED_TO_DETAILS_VALUE({
          allowedToDetails: true,
        }),
      );
      this.store.dispatch(
        declareTransitArrivalDetailsActions.SET_SELECTED_PROVIDER({
          selectedProvider,
        }),
      );
    }
  }
}
