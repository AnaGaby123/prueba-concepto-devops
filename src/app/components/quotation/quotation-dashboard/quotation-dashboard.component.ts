// Core
import {Component, OnInit} from '@angular/core';

// Librerías
import {Observable} from 'rxjs';
import {debounce, isEmpty} from 'lodash-es';

// Store
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {ClientsListItemForQuotation} from '@appModels/store/quotation/quotation-dashboard/quotation-dashboard.models';
import {IBarChart, IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {IFilterDate} from '@appModels/filters/Filters';
import {quotationDashboardActions} from '@appActions/quotation';
import {quotationDashboardSelectors} from '@appSelectors/quotation';
import {selectViewType} from '@appSelectors/utils/utils.selectors';

// Helpers
import {ApiRequestStatus} from '@appHelpers/shared/shared.helpers';
import {currentDateWithoutHoursUTCFormatDate} from '@appUtil/dates';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-client-quotations',
  templateUrl: './quotation-dashboard.component.html',
  styleUrls: ['./quotation-dashboard.component.scss'],
})
export class QuotationDashboardComponent implements OnInit {
  clientsList$: Observable<ClientsListItemForQuotation[]> = this.store.select(
    quotationDashboardSelectors.selectMappedClientList,
  );
  clientsListRequestStatus$: Observable<number> = this.store.select(
    quotationDashboardSelectors.selectClientsListRequestStatus,
  );
  doughnutChartData$: Observable<IDoughnutChart> = this.store.select(
    quotationDashboardSelectors.selectDoughnutChartData,
  );
  doughnutChartOptionDetails$: Observable<IDoughnutChartDetails[]> = this.store.select(
    quotationDashboardSelectors.selectDoughnutChartOptionDetails,
  );
  doughnutChartOptionDetailsHover$: Observable<IDoughnutChartDetails[][]> = this.store.select(
    quotationDashboardSelectors.selectDoughnutChartOptionDetailsHover,
  );
  filterByTypes$: Observable<DropListOption> = this.store.select(
    quotationDashboardSelectors.selectedTypeFilterOption,
  );
  options$: Observable<Array<ITabOption>> = this.store.select(
    quotationDashboardSelectors.selectOptionsTabs,
  );
  searchTerm$: Observable<string> = this.store.select(quotationDashboardSelectors.selectSearchTerm);
  searchTypes$: Observable<DropListOption[]> = this.store.select(
    quotationDashboardSelectors.selectSearchTypes,
  );
  tapSelected$: Observable<ITabOption> = this.store.select(
    quotationDashboardSelectors.selectedTabOption,
  );
  totalQuotesOfClients$: Observable<number> = this.store.select(
    quotationDashboardSelectors.selectTotalQuotesOfClients,
  );
  typeSelected$: Observable<DropListOption> = this.store.select(
    quotationDashboardSelectors.selectedSearchTypeOption,
  );
  valuesBarChart$: Observable<IBarChart> = this.store.select(
    quotationDashboardSelectors.selectDataBarChart,
  );
  valueFilter$: Observable<DropListOption[]> = this.store.select(
    quotationDashboardSelectors.selectDataFilterByType,
  );
  viewType$: Observable<string> = this.store.select(selectViewType);

  readonly statusRequest = ApiRequestStatus;
  readonly viewTypes = AppViewTypes;
  clientsListScrollItems: ClientsListItemForQuotation[] = [];
  handleSearchTermChange = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  lodashIsEmpty = isEmpty;
  titleBarChart = 'TIPOS DE COTIZACIÓN';
  textSearch = '';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(quotationDashboardActions.INIT_QUOTATION_DASHBOARD_COMPONENT_EFFECT());
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(quotationDashboardActions.SET_SEARCH_TERM({searchTerm}));
    this.textSearch = searchTerm;
  }

  handleDateFilterSelectedOptionChange(filterDate: IFilterDate): void {
    this.store.dispatch(
      quotationDashboardActions.SET_FILTER_BY_DATES({
        filters: filterDate
          ? {
              startDate: currentDateWithoutHoursUTCFormatDate(filterDate.startDate),
              endDate: currentDateWithoutHoursUTCFormatDate(filterDate.endDate),
            }
          : null,
      }),
    );
  }

  handleSearchTypeSelectedOptionChange(type: DropListOption): void {
    this.store.dispatch(
      quotationDashboardActions.SET_SEARCH_TYPE({
        searchType: type,
      }),
    );
    if (this.textSearch !== '') {
      this.changeSearchTerm(this.textSearch);
    }
  }

  handleTabSelectedOptionChange(tab: ITabOption): void {
    this.store.dispatch(quotationDashboardActions.SET_TAP({tab}));
  }

  handleTypeFilterSelectedOptionChange(filter: DropListOption): void {
    this.store.dispatch(quotationDashboardActions.SET_FILTER_BY_TYPE({filter}));
  }

  handleItemListClick(selectedClient: ClientsListItemForQuotation): void {
    this.store.dispatch(
      quotationDashboardActions.HANDLE_SET_SELECTED_CLIENT_EFFECT({selectedClient}),
    );
  }
}
