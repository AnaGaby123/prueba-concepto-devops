import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {regulatoryResearchDashboardSelectors} from '@appSelectors/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-index';
import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {debounce, isEmpty} from 'lodash-es';
import {regulatoryResearchDashboardActions} from '@appActions/pendings/new-product-existing-supplier/regulatory-research';
import {Router} from '@angular/router';
import {ProviderListItemForRegulatoryResearch} from '@appModels/store/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-dashboard/regulatory-research-dashboard.models';
import {IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {SET_LOADING} from '@appActions/utils/utils.action';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-regulatory-research-dashboard',
  templateUrl: './regulatory-research-dashboard.component.html',
  styleUrls: ['./regulatory-research-dashboard.component.scss'],
})
export class RegulatoryResearchDashboardComponent implements OnInit {
  searchTerm$: Observable<string> = this.store.select(
    regulatoryResearchDashboardSelectors.selectSearchTerm,
  );
  filterOptions$: Observable<Array<FilterOptionPqf>> = this.store.select(
    regulatoryResearchDashboardSelectors.selectFilterOptions,
  );
  items$: Observable<Array<ProviderListItemForRegulatoryResearch>> = this.store.select(
    regulatoryResearchDashboardSelectors.selectProviderList,
  );
  apiStatus$: Observable<number> = this.store.select(
    regulatoryResearchDashboardSelectors.selectApistatus,
  );
  donutChartData$: Observable<IDoughnutChart> = this.store.select(
    regulatoryResearchDashboardSelectors.selectDataDonutChart,
  );
  donutChartDetails$: Observable<Array<IDoughnutChartDetails>> = this.store.select(
    regulatoryResearchDashboardSelectors.selectDoughnutChartOptionsDetails,
  );
  doughnutDataDetailsHover$: Observable<Array<Array<IDoughnutChartDetails>>> = this.store.select(
    regulatoryResearchDashboardSelectors.selectDoughnutOptionDetailHover,
  );
  handleKeySearch = debounce(this.changeSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  listItems: Array<ProviderListItemForRegulatoryResearch> = [];
  lodashIsEmpty = isEmpty;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(regulatoryResearchDashboardActions.FETCH_PROVIDER_LIST_LOAD());
  }

  changeSearchTerm(searchTerm: string) {
    this.store.dispatch(regulatoryResearchDashboardActions.SET_SEARCH_TERM({searchTerm}));
  }

  setFilterSelected(filters: Array<FilterOptionPqf>) {
    this.store.dispatch(regulatoryResearchDashboardActions.SET_FILTER_SELECTED({filters}));
  }

  setItem(item: ProviderListItemForRegulatoryResearch) {
    this.store.dispatch(SET_LOADING({payload: true}));
    this.store.dispatch(regulatoryResearchDashboardActions.HANDLE_SET_SELECTED_PROVIDER({item}));
  }
}
