// Core imports
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {debounce} from 'lodash-es'; // Actions
import {brandFormListAction} from '@appActions/forms/brand-form';
// Selectors
import {brandFormSelectorsList} from '@appSelectors/forms/brand-form';
// Models
// Dev tools
import {Observable} from 'rxjs';
import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  filterOptions$: Observable<Array<FilterOptionPqf>> = this.store.select(
    brandFormSelectorsList.selectFilterOptions,
  );
  searchTerm$: Observable<string> = this.store.select(brandFormSelectorsList.selectSearchTerm);
  handleKeySearch = debounce(this.changeSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);

  constructor(private store: Store<AppState>) {}

  setFilterOption(filterOptions): void {
    this.store.dispatch(
      brandFormListAction.SET_FILTER_OPTION_SELECTED({
        filterOptions,
      }),
    );
  }

  changeSearchTerm(searchTerm): void {
    this.store.dispatch(brandFormListAction.SET_SEARCH_TERM({searchTerm}));
  }
}
