/* Core Imports */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

/* Models Imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IBarChart, IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {IProvider} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-list/register-confirmation-list.models';

/* Selector Imports */
import {registerConfirmationListSelectors} from '@appSelectors/pendings/purchasing-manager/register-confirmation';

/* Actions Imports */
import {
  registerConfirmationActions,
  registerConfirmationDetailsActions,
  registerConfirmationListActions,
} from '@appActions/pendings/purchasing-manager/register-confirmation';

/* Tools Imports */
import {debounce} from 'lodash-es';

import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-register-confirmation-list',
  templateUrl: './register-confirmation-list.component.html',
  styleUrls: ['./register-confirmation-list.component.scss'],
})
export class RegisterConfirmationListComponent implements OnInit, OnDestroy {
  donutChartDataDelivery$: Observable<IDoughnutChart> = this.store.select(
    registerConfirmationListSelectors.selectDonutChartDataDelivery,
  );
  donutChartDataFreight$: Observable<IDoughnutChart> = this.store.select(
    registerConfirmationListSelectors.selectDonutChartDataFreight,
  );
  donutChartDataProviders$: Observable<IDoughnutChart> = this.store.select(
    registerConfirmationListSelectors.selectDonutChartDataProviders,
  );
  donutDataDeliveryDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    registerConfirmationListSelectors.selectDonutChartDeliveryDetails,
  );
  donutDataDeliveryDetailsHover$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(registerConfirmationListSelectors.selectDonutChartDeliveryDetailsHover);
  donutDataFreightDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    registerConfirmationListSelectors.selectDonutChartFreightDetails,
  );
  donutDataFreightDetailsHover$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(registerConfirmationListSelectors.selectDonutChartFreightDetailsHover);
  donutDataProvidersDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    registerConfirmationListSelectors.selectDonutChartProvidersDetails,
  );
  donutDataProvidersDetailsHover$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(registerConfirmationListSelectors.selectDonutChartProvidersDetailsHover);
  isLoadingBarCharts$: Observable<boolean> = this.store.select(
    registerConfirmationListSelectors.selectIsLoadingBarCharts,
  );
  isLoadingDonutCharts$: Observable<boolean> = this.store.select(
    registerConfirmationListSelectors.selectIsLoadingDonutCharts,
  );
  isLoadingProviders$: Observable<boolean> = this.store.select(
    registerConfirmationListSelectors.selectIsLoadingProvider,
  );
  listProviders$: Observable<Array<IProvider>> = this.store.select(
    registerConfirmationListSelectors.selectListProviders,
  );
  listTypesOfSearch$: Observable<Array<DropListOption>> = this.store.select(
    registerConfirmationListSelectors.selectTypesOfSearch,
  );
  searchTerm$: Observable<string> = this.store.select(
    registerConfirmationListSelectors.selectSearchTerm,
  );
  sort$: Observable<DropListOption> = this.store.select(
    registerConfirmationListSelectors.selectSort,
  );
  sortList$: Observable<Array<DropListOption>> = this.store.select(
    registerConfirmationListSelectors.selectSortList,
  );
  totalAmount$: Observable<number> = this.store.select(
    registerConfirmationListSelectors.selectAmountTotal,
  );
  totalOc$: Observable<number> = this.store.select(registerConfirmationListSelectors.selectTotalOc);
  totalPieces$: Observable<number> = this.store.select(
    registerConfirmationListSelectors.selectTotalPieces,
  );
  totalProducts$: Observable<number> = this.store.select(
    registerConfirmationListSelectors.selectTotalProducts,
  );
  totalProviders$: Observable<number> = this.store.select(
    registerConfirmationListSelectors.selectTotalProviders,
  );
  typeOfSearch$: Observable<DropListOption> = this.store.select(
    registerConfirmationListSelectors.selectTypeOfSearchSelected,
  );
  valuesBarChartDelivery$: Observable<IBarChart> = this.store.select(
    registerConfirmationListSelectors.selectDataBarChartDelivery,
  );
  valuesBarChartTime$: Observable<IBarChart> = this.store.select(
    registerConfirmationListSelectors.selectDataBarChartTime,
  );
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  listProvidersScrollItems: Array<IProvider> = [];
  timer;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(registerConfirmationListActions.FETCH_PROVIDERS_LOAD());
    this.store.dispatch(registerConfirmationListActions.FETCH_CHARTS_DONUT_LOAD());
    this.store.dispatch(registerConfirmationListActions.FETCH_CHARTS_BAR_LOAD());
  }

  ngOnDestroy(): void {
    this.store.dispatch(registerConfirmationListActions.CLEAN_REGISTER_CONFIRMATION_STATE());
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(registerConfirmationListActions.SET_SEARCH_TERM({searchTerm}));
  }

  setProvider(providerSelected: IProvider): void {
    if (providerSelected) {
      this.store.dispatch(
        registerConfirmationActions.SET_ALLOW_TO_DETAILS({
          allowToDetails: true,
        }),
      );
      this.store.dispatch(
        registerConfirmationDetailsActions.SET_PROVIDER_SELECTED({
          providerSelected,
        }),
      );
    }
  }

  setTypeSort(sort: DropListOption): void {
    this.store.dispatch(registerConfirmationListActions.SET_SORT_SELECTED({sort}));
  }

  setSearchType(typeOfSearch: DropListOption): void {
    this.store.dispatch(registerConfirmationListActions.SET_TYPE_OF_SEARCH({typeOfSearch}));
  }
}
