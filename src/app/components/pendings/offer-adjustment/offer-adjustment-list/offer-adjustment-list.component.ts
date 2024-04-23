/* Core Container */
import {debounce} from 'lodash-es';

import {Component, OnDestroy, OnInit} from '@angular/core';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {Router} from '@angular/router';
import {lastValueFrom, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

/* Models Imports */
import {AppState} from '@appCore/core.state';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IBarChart, IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {
  IEvisResults,
  IOfferAdjustment,
} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-list/offer-adjustment-list.model';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {TotalClientesCotizacionesObj} from 'api-logistica';

/* Actions Imports */
import {
  offerAdjustmentActions,
  offerAdjustmentListActions,
} from '@appActions/pendings/offer-adjustment';
/* Tools Imports */
import {DEFAULT_TIME_DEBOUNCE_SEARCH, PAGING_LIMIT} from '@appUtil/common.protocols';

/* Selectors Imports */
import {offerAdjustmentListSelectors} from '@appSelectors/pendings/offer-adjustment';

/* Dev Tools */
import {
  GET_CAT_PAYMENT_CONDITIONS_LOAD,
  GET_CAT_REASON_REJECTION_LOAD,
} from '@appActions/catalogs/catalogos.actions';
import {NGXLogger} from 'ngx-logger';
import {take} from 'rxjs/operators';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-offer-adjustment-list',
  templateUrl: './offer-adjustment-list.component.html',
  styleUrls: ['./offer-adjustment-list.component.scss'],
})
export class OfferAdjustmentListComponent implements OnInit, OnDestroy {
  doughnutChartDataClients$: Observable<IDoughnutChart> = this.store.select(
    offerAdjustmentListSelectors.selectDoughnutChartDataClients,
  );
  doughnutChartDataMarks$: Observable<IDoughnutChart> = this.store.select(
    offerAdjustmentListSelectors.selectDoughnutChartDataMarks,
  );
  doughnutChartOptionDetailsClients$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    offerAdjustmentListSelectors.selectDoughnutChartClientsOptionDetails,
  );
  doughnutChartOptionDetailsHoverClients$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(offerAdjustmentListSelectors.selectDonutCustomerHover);
  doughnutChartOptionDetailsHoverMarks$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(offerAdjustmentListSelectors.selectDoughnutChartMarksOptionDetailsHover);
  doughnutChartOptionDetailsMarks$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    offerAdjustmentListSelectors.selectDoughnutChartMarksOptionDetails,
  );
  filterType$: Observable<DropListOption> = this.store.select(
    offerAdjustmentListSelectors.selectFilterByType,
  );
  options$: Observable<Array<ITabOption>> = this.store.select(
    offerAdjustmentListSelectors.selectOptionTabs,
  );
  searchTerm$: Observable<string> = this.store.select(
    offerAdjustmentListSelectors.selectSearchTerm,
  );
  tapSelected$: Observable<ITabOption> = this.store.select(
    offerAdjustmentListSelectors.selectTabSelected,
  );
  totalAmount$: Observable<TotalClientesCotizacionesObj> = this.store.select(
    offerAdjustmentListSelectors.totalAmount,
  );
  valueFilter$: Observable<DropListOption[]> = this.store.select(
    offerAdjustmentListSelectors.selectDataFilterByType,
  );
  valuesBarChartItems$: Observable<IBarChart> = this.store.select(
    offerAdjustmentListSelectors.selectDataBarChartItems,
  );
  valuesBarChartSettings$: Observable<IBarChart> = this.store.select(
    offerAdjustmentListSelectors.selectDataBarChartSettings,
  );
  evis$: Observable<IOfferAdjustment[]> = this.store.select(
    offerAdjustmentListSelectors.selectEvis,
  );
  dashboardApiStatus$: Observable<number> = this.store.select(
    offerAdjustmentListSelectors.selectDashboardApiStatus,
  );
  offerTotals$: Observable<{quotations: number; adjustments: number}> = this.store.select(
    offerAdjustmentListSelectors.selectOfferTotals,
  );
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  evisScrollItems = [];
  timer;
  titleBarChartItems = 'Partidas';
  titleBarChartSetting = 'Ajustes';

  constructor(private store: Store<AppState>, private route: Router, private logger: NGXLogger) {}

  ngOnInit(): void {
    this.store.dispatch(offerAdjustmentActions.SET_DETAILS_MODE({detailsMode: false}));
    this.store.dispatch(offerAdjustmentActions.SET_DETAILS_COMPONENT({detailsComponent: false}));
    this.store.dispatch(offerAdjustmentListActions.FETCH_TOTALS_TABS_LOAD());
    this.store.dispatch(GET_CAT_REASON_REJECTION_LOAD());
    this.store.dispatch(GET_CAT_PAYMENT_CONDITIONS_LOAD());
  }

  ngOnDestroy(): void {
    this.store.dispatch(offerAdjustmentListActions.CLEAN_ALL_OFFER_ADJUSTMENT_LIST());
  }

  onSelectOption(tabSelected: ITabOption): void {
    this.store.dispatch(offerAdjustmentListActions.SET_TAP({tabSelected}));
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(offerAdjustmentListActions.SET_SEARCH_TERM({searchTerm}));
  }

  async fetchMore(event: IPageInfo): Promise<void> {
    const customer: Array<IEvisResults> = await lastValueFrom(
      this.store.pipe(select(offerAdjustmentListSelectors.selectUsers), take(1)),
    );

    if (event.endIndex !== customer.length - 1) {
      return;
    }
    const currentTotal: number = await lastValueFrom(
      this.store.pipe(select(offerAdjustmentListSelectors.selectTotalClients), take(1)),
    );
    const currentPage: number = await lastValueFrom(
      this.store.pipe(select(offerAdjustmentListSelectors.selectCurrentPage), take(1)),
    );
    if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
      const totalPages = currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;
      if (currentPage > totalPages || customer.length > currentTotal) {
        return;
      }
      this.fetchNextChunk().then(() => {});
    }
  }

  fetchNextChunk(): Promise<any[]> {
    return new Promise((resolve) => {
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        this.getUsers(false);
        resolve([]);
      }, 200);
    });
  }

  getUsers(isFirstPage: boolean): void {
    this.store.dispatch(offerAdjustmentListActions.FETCH_CUSTOMER_LOAD({isFirstPage}));
  }

  redirectToDetails(userSelected: IEvisResults): void {
    this.store.dispatch(offerAdjustmentListActions.SET_USER_SELECTED({userSelected}));
    this.store.dispatch(offerAdjustmentActions.SET_DETAILS_MODE({detailsMode: true}));
    this.store.dispatch(offerAdjustmentActions.SET_DETAILS_COMPONENT({detailsComponent: true}));
    this.route.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.offerAdjustment.offerAdjustment,
      appRoutes.offerAdjustment.adjustmentDetails,
      appRoutes.offerAdjustment.details,
      appRoutes.offerAdjustment.sectionList,
    ]);
  }

  selectFilterByType(filterByType: DropListOption): void {
    this.store.dispatch(offerAdjustmentListActions.SET_FILTER_BY_TYPE({filterByType}));
  }
}
