/* Core Imports */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

/* Selectors Imports */
import {confirmDispatchListSelectors} from '@appSelectors/pendings/purchasing-manager/confirm-dispatch';

/* Actions Imports */
import {confirmDispatchListActions} from '@appActions/pendings/purchasing-manager/confirm-dispatch';

/* Tools Imports */
import {debounce} from 'lodash-es';

/* Models Imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IBarChart, IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {IProvidersConfirmDispatch} from '@appModels/store/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch-list/confirm-dispatch-list.models';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-confirm-dispatch-list',
  templateUrl: './confirm-dispatch-list.component.html',
  styleUrls: ['./confirm-dispatch-list.component.scss'],
})
export class ConfirmDispatchListComponent implements OnInit, OnDestroy {
  donutChartDataDelivery$: Observable<IDoughnutChart> = this.store.select(
    confirmDispatchListSelectors.selectDonutChartDataDelivery,
  );
  donutChartDataFreight$: Observable<IDoughnutChart> = this.store.select(
    confirmDispatchListSelectors.selectDonutChartDataFreight,
  );
  donutChartDataProviders$: Observable<IDoughnutChart> = this.store.select(
    confirmDispatchListSelectors.selectDonutChartDataProviders,
  );
  donutDataDeliveryDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    confirmDispatchListSelectors.selectDonutChartDeliveryDetails,
  );
  donutDataDeliveryDetailsHover$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(confirmDispatchListSelectors.selectDonutChartDeliveryDetailsHover);
  donutDataFreightDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    confirmDispatchListSelectors.selectDonutChartFreightDetails,
  );
  donutDataFreightDetailsHover$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(confirmDispatchListSelectors.selectDonutChartFreightDetailsHover);
  donutDataProvidersDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    confirmDispatchListSelectors.selectDonutChartProvidersDetails,
  );
  donutDataProvidersDetailsHover$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(confirmDispatchListSelectors.selectDonutChartProvidersDetailsHover);
  isLoadingDataCharts$: Observable<boolean> = this.store.select(
    confirmDispatchListSelectors.selectIsLoadingDataCharts,
  );
  isLoadingProviders$: Observable<boolean> = this.store.select(
    confirmDispatchListSelectors.selectIsLoadingProviders,
  );
  listTypesOfSearch$: Observable<Array<DropListOption>> = this.store.select(
    confirmDispatchListSelectors.selectTypesOfSearch,
  );
  providers$: Observable<Array<IProvidersConfirmDispatch>> = this.store.select(
    confirmDispatchListSelectors.selectProviders,
  );
  searchTerm$: Observable<string> = this.store.select(
    confirmDispatchListSelectors.selectSearchTerm,
  );
  sort$: Observable<DropListOption> = this.store.select(confirmDispatchListSelectors.selectSort);
  sortList$: Observable<Array<DropListOption>> = this.store.select(
    confirmDispatchListSelectors.selectSortList,
  );
  totals$: Observable<any> = this.store.select(confirmDispatchListSelectors.selectTotalFooter);
  typeOfSearch$: Observable<DropListOption> = this.store.select(
    confirmDispatchListSelectors.selectTypeOfSearchSelected,
  );
  valuesBarChartDelivery$: Observable<IBarChart> = this.store.select(
    confirmDispatchListSelectors.selectDataBarChartDelivery,
  );
  valuesBarChartTime$: Observable<IBarChart> = this.store.select(
    confirmDispatchListSelectors.selectDataBarChartTime,
  );
  listProvidersScrollItems: Array<IProvidersConfirmDispatch> = [];
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(confirmDispatchListActions.FETCH_PROVIDERS_LOAD());
    this.store.dispatch(confirmDispatchListActions.FETCH_DATA_CHARTS_LOAD());
  }

  ngOnDestroy(): void {
    this.store.dispatch(confirmDispatchListActions.CLEAN_DISPATCH_LIST());
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(confirmDispatchListActions.SET_SEARCH_TERM({searchTerm}));
  }

  setProvider(providerSelected: IProvidersConfirmDispatch): void {
    this.store.dispatch(
      confirmDispatchListActions.SET_PROVIDER_SELECTED({
        providerSelected,
      }),
    );
  }

  setTypeSort(sort: DropListOption): void {
    this.store.dispatch(confirmDispatchListActions.SET_SORT_SELECTED({sort}));
  }

  setSearchType(typeOfSearch: DropListOption): void {
    this.store.dispatch(confirmDispatchListActions.SET_TYPE_OF_SEARCH({typeOfSearch}));
  }
}
