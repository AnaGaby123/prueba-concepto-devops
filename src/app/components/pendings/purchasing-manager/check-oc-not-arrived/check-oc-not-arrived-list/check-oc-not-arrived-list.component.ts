/* Core Imports */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {Store} from '@ngrx/store';

/* Selectors Imports */
import {checkNotArrivedListSelectors} from '@appSelectors/pendings/purchasing-manager/check-oc-not-arrived';

/* Actions Imports */
import {
  checkOcNotArrivedDetailsActions,
  checkOcNotArrivedListActions,
} from '@appActions/pendings/purchasing-manager/check-oc-not-arrived';

/* Models Imports */
import {IProvider} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-list/register-confirmation-list.models';
import {IBarChart, IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';

/* Tools Imports */
import {debounce} from 'lodash-es';

import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-check-oc-not-arrived-list',
  templateUrl: './check-oc-not-arrived-list.component.html',
  styleUrls: ['./check-oc-not-arrived-list.component.scss'],
})
export class CheckOcNotArrivedListComponent implements OnInit, OnDestroy {
  sortList$: Observable<Array<DropListOption>> = this.store.select(
    checkNotArrivedListSelectors.selectSortList,
  );
  sort$: Observable<DropListOption> = this.store.select(
    checkNotArrivedListSelectors.selectSortSelected,
  );
  searchTerm$: Observable<string> = this.store.select(
    checkNotArrivedListSelectors.selectSearchTerm,
  );
  isLoadingProviders$: Observable<boolean> = this.store.select(
    checkNotArrivedListSelectors.selectIsLoadingProvider,
  );
  totalProviders$: Observable<number> = this.store.select(
    checkNotArrivedListSelectors.selectTotalProviders,
  );
  totalOc$: Observable<number> = this.store.select(checkNotArrivedListSelectors.selectTotalOc);
  totalProducts$: Observable<number> = this.store.select(
    checkNotArrivedListSelectors.selectTotalProducts,
  );
  totalPieces$: Observable<number> = this.store.select(
    checkNotArrivedListSelectors.selectTotalPieces,
  );
  totalAmount$: Observable<number> = this.store.select(
    checkNotArrivedListSelectors.selectAmountTotal,
  );
  isLoadingDonutCharts$: Observable<boolean> = this.store.select(
    checkNotArrivedListSelectors.selectIsLoadingDonutCharts,
  );
  isLoadingBarCharts$: Observable<boolean> = this.store.select(
    checkNotArrivedListSelectors.selectIsLoadingBarCharts,
  );
  donutChartDataProviders$: Observable<IDoughnutChart> = this.store.select(
    checkNotArrivedListSelectors.selectDonutChartDataProviders,
  );
  donutDataProvidersDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    checkNotArrivedListSelectors.selectDonutChartProvidersDetails,
  );
  donutDataProvidersDetailsHover$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(checkNotArrivedListSelectors.selectDonutChartProvidersDetailsHover);
  donutChartDataFreight$: Observable<IDoughnutChart> = this.store.select(
    checkNotArrivedListSelectors.selectDonutChartDataFreight,
  );
  donutDataFreightDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    checkNotArrivedListSelectors.selectDonutChartFreightDetails,
  );
  donutDataFreightDetailsHover$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(checkNotArrivedListSelectors.selectDonutChartFreightDetailsHover);
  donutChartDataDelivery$: Observable<IDoughnutChart> = this.store.select(
    checkNotArrivedListSelectors.selectDonutChartDataDelivery,
  );
  donutDataDeliveryDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    checkNotArrivedListSelectors.selectDonutChartDeliveryDetails,
  );
  donutDataDeliveryDetailsHover$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(checkNotArrivedListSelectors.selectDonutChartDeliveryDetailsHover);
  valuesBarChartTime$: Observable<IBarChart> = this.store.select(
    checkNotArrivedListSelectors.selectDataBarChartTime,
  );
  valuesBarChartDelivery$: Observable<IBarChart> = this.store.select(
    checkNotArrivedListSelectors.selectDataBarChartDelivery,
  );
  listTypesOfSearch$: Observable<Array<DropListOption>> = this.store.select(
    checkNotArrivedListSelectors.selectListTypesOfSearch,
  );
  typeOfSearch$: Observable<DropListOption> = this.store.select(
    checkNotArrivedListSelectors.selectTypeOfSearch,
  );
  listProviders$: Observable<Array<IProvider>> = this.store.select(
    checkNotArrivedListSelectors.selectListProviders,
  );
  listProviderScrollItems: Array<IProvider> = [];
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(checkOcNotArrivedListActions.FETCH_PROVIDERS_LOAD());
    this.store.dispatch(checkOcNotArrivedListActions.FETCH_CHARTS_DONUT_LOAD());
    this.store.dispatch(checkOcNotArrivedListActions.FETCH_CHARTS_BAR_LOAD());
  }

  setTypeSort(sort: DropListOption): void {
    this.store.dispatch(checkOcNotArrivedListActions.SET_SORT_OPTION({sort}));
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(checkOcNotArrivedListActions.SET_TERM_SEARCH({searchTerm}));
  }

  setProvider(providerSelected: IProvider): void {
    this.store.dispatch(
      checkOcNotArrivedDetailsActions.SET_PROVIDER({
        providerSelected,
      }),
    );
  }

  setSearchType(typeOfSearch: DropListOption): void {
    this.store.dispatch(
      checkOcNotArrivedListActions.SET_SEARCH_TYPE({
        typeOfSearch,
      }),
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(checkOcNotArrivedListActions.CLEAN_CHECK_OC_STATE());
  }
}
