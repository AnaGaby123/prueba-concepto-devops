/*Core imports*/
import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

// Models imports
import * as apiLogistic from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {IFilterDate} from '@appModels/filters/Filters';
import {IClientItemForNotProcessed} from '@appModels/store/pendings/not-processed/not-processed-list/not-processed-list.models';
import {ITabOption} from '@appModels/botonera/botonera-option';

// Actions imports
import {
  notProcessedActions,
  notProcessedDashboardActions,
  notProcessedDetailActions,
} from '@appActions/pendings/not-processed';

// Selectors imports
import {notProcessedDashboardSelectors} from '@appSelectors/pendings/not-processed';

// Utils
import {debounce, isEmpty} from 'lodash-es';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-not-processed-dashboard',
  templateUrl: './not-processed-dashboard.component.html',
  styleUrls: ['./not-processed-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotProcessedDashboardComponent implements OnInit, AfterContentChecked, OnDestroy {
  barChart$ = this.store.select(notProcessedDashboardSelectors.selectDataBarChart);
  burgerOptions$: Observable<Array<DropListOption>> = this.store.select(
    notProcessedDashboardSelectors.selectBurgerOptions,
  );
  clients$: Observable<Array<IClientItemForNotProcessed>> = this.store.select(
    notProcessedDashboardSelectors.selectListClient,
  );
  searchTerm$: Observable<string> = this.store.select(
    notProcessedDashboardSelectors.selectSearchTerm,
  );
  doughnutChartData$: Observable<IDoughnutChart> = this.store.select(
    notProcessedDashboardSelectors.selectDataDonutChart,
  );
  selectedSearchType$: Observable<DropListOption> = this.store.select(
    notProcessedDashboardSelectors.selectSearchTypeSelected,
  );

  searchTypes$: Observable<DropListOption[]> = this.store.select(
    notProcessedDashboardSelectors.selectSearchTypes,
  );
  doughnutChartOptionDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    notProcessedDashboardSelectors.selectDataDonutOptionDetails,
  );
  doughnutChartOptionDetailsHover$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(notProcessedDashboardSelectors.selectDataDonutOptionDetailsHover);
  apiStatus$: Observable<number> = this.store.select(
    notProcessedDashboardSelectors.selectApiStatus,
  );
  selectedBurgerOption$: Observable<DropListOption> = this.store.select(
    notProcessedDashboardSelectors.selectedBurgerOption,
  );
  selectedTabOption$: Observable<ITabOption> = this.store.select(
    notProcessedDashboardSelectors.selectedTabOption,
  );
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(
    notProcessedDashboardSelectors.selectTabOptions,
  );
  purchaseOrdersTotal$: Observable<number> = this.store.select(
    notProcessedDashboardSelectors.selectPurchaseOrdersTotals,
  );
  totalValue$: Observable<number> = this.store.select(
    notProcessedDashboardSelectors.selectTotalValue,
  );
  handleOCSearch = debounce(this.setSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  textSearch = '';
  listClient: Array<IClientItemForNotProcessed>;
  lodashIsEmptty = isEmpty;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.store.dispatch(notProcessedDashboardActions.FETCH_TABS_LOAD());
    this.store.dispatch(notProcessedDashboardActions.FETCH_CLIENT_LIST());
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }
  ngOnDestroy() {
    this.store.dispatch(notProcessedDashboardActions.CLEAN_DASHBOARD_STATE());
  }

  setTabOptionSelected(selectedTabOption: ITabOption): void {
    if (selectedTabOption) {
      this.store.dispatch(
        notProcessedDashboardActions.SET_TAB_OPTION_SELECTED({selectedTabOption}),
      );
    }
  }

  setSearchType(searchType: DropListOption) {
    this.store.dispatch(notProcessedDashboardActions.SET_SEARCH_TYPE({searchType}));
    if (this.textSearch !== '') {
      this.setSearchTerm(this.textSearch);
    }
  }

  setBurgerOption(selectedBurgerOption: DropListOption): void {
    if (selectedBurgerOption) {
      this.store.dispatch(
        notProcessedDashboardActions.SET_BURGER_OPTION_SELECTED({
          selectedBurgerOption,
        }),
      );
    }
  }

  setDateRange(dateRange: IFilterDate): void {
    this.store.dispatch(notProcessedDashboardActions.SET_DATE_RANGE_SELECTED({dateRange}));
  }

  setSearchTerm(searchTerm: string): void {
    this.store.dispatch(notProcessedDashboardActions.SET_SEARCH_TERM({searchTerm}));
    this.textSearch = searchTerm;
  }

  selectedClient(client: apiLogistic.VClienteppPedidoObj): void {
    this.store.dispatch(
      notProcessedActions.SET_ALLOWED_TO_DETAILS_VALUE({
        allowedToDetails: true,
      }),
    );
    this.store.dispatch(notProcessedActions.SET_IS_IN_DETAILS_VIEW({isInDetailsView: true}));
    this.store.dispatch(notProcessedDetailActions.SET_CLIENT_SELECTED({client}));
  }
}
