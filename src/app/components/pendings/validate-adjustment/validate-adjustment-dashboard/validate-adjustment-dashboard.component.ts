/*Core imports*/
import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';

// Models imports
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IValidateAdjustment} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-dashboard/validate-adjustment-dashboard.models';
import {IBarChart, IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';

// Actions imports
import {
  validateAdjustmentDetailActions,
  validateAdjustmentListActions,
} from '@appActions/pendings/validate-adjustment';

// Selectors
import {validateAdjustmentListSelectors} from '@appSelectors/pendings/validate-adjustment';

// Utils
import {debounce, isEmpty} from 'lodash-es';
import {DEFAULT_BUFFER_AMOUNT, DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-validate-adjustment-dashboard',
  templateUrl: './validate-adjustment-dashboard.component.html',
  styleUrls: ['./validate-adjustment-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidateAdjustmentDashboardComponent
  implements OnInit, AfterContentChecked, OnDestroy {
  filtersOptions$: Observable<DropListOption[]> = this.store.select(
    validateAdjustmentListSelectors.selectFiltersOptions,
  );

  selectedFilterOption$: Observable<DropListOption> = this.store.select(
    validateAdjustmentListSelectors.selectedFiltersOption,
  );
  searchTerm$: Observable<string> = this.store.select(
    validateAdjustmentListSelectors.selectSearchTerm,
  );
  searchType$: Observable<DropListOption> = this.store.select(
    validateAdjustmentListSelectors.selectSearchTypeOptionSelected,
  );
  searchTypes$: Observable<DropListOption[]> = this.store.select(
    validateAdjustmentListSelectors.selectSearchTypesOptions,
  );
  customers$: Observable<IValidateAdjustment[]> = this.store.select(
    validateAdjustmentListSelectors.selectListClients,
  );
  totalOrders$: Observable<number> = this.store.select(
    validateAdjustmentListSelectors.selectTotalsOrders,
  );
  totalItemsInOrder$: Observable<number> = this.store.select(
    validateAdjustmentListSelectors.selectTotalItemsInOrders,
  );
  orderAmount$: Observable<number> = this.store.select(
    validateAdjustmentListSelectors.selectTotalOrdersAmount,
  );

  statusApi$: Observable<number> = this.store.select(
    validateAdjustmentListSelectors.selectStatusApi,
  );

  doughnutChartData$: Observable<IDoughnutChart> = this.store.select(
    validateAdjustmentListSelectors.selectDataDonutChartData,
  );
  doughnutChartOptionDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    validateAdjustmentListSelectors.selectDoughnutChartOptionDetails,
  );
  doughnutChartOptionDetailsHover$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(validateAdjustmentListSelectors.selectDoughnutChartOptionDetailsHover);

  barChart$: Observable<IBarChart> = this.store.select(
    validateAdjustmentListSelectors.selectDataBarChart,
  );
  lodashIsEmpty = isEmpty;

  customerScrollItems: IValidateAdjustment[];
  handleKeySearch = debounce(
    (value: string) => this.setSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  textSearch = '';

  readonly defaultBufferAmount = DEFAULT_BUFFER_AMOUNT;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.store.dispatch(validateAdjustmentListActions.FETCH_CLIENTS_ADJUSTMENT_DASHBOARD());
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.store.dispatch(validateAdjustmentListActions.CLEAN_DASHBOARD_STATE());
  }

  setFilterOption(selectedFilterOption: DropListOption): void {
    if (selectedFilterOption) {
      this.store.dispatch(
        validateAdjustmentListActions.SET_FILTER_OPTION_SELECTED({
          selectedFilterOption,
        }),
      );
    }
  }

  setSearchTerm(searchTerm: string): void {
    this.store.dispatch(validateAdjustmentListActions.SET_SEARCH_TERM({searchTerm}));
    this.textSearch = searchTerm;
  }

  setSearchType(searchType: DropListOption): void {
    this.store.dispatch(validateAdjustmentListActions.SET_SEARCH_TYPE({searchType}));
    if (this.textSearch !== '') {
      this.setSearchTerm(this.textSearch);
    }
  }

  selectedCustomer(customer: IValidateAdjustment): void {
    this.store.dispatch(
      validateAdjustmentDetailActions.SET_CUSTOMER_VALIDATE_ADJUSTMENT({
        customer,
      }),
    );
  }

  handleTrackByIdClient(index: number, item: IValidateAdjustment): string {
    return item.IdCliente;
  }
}
