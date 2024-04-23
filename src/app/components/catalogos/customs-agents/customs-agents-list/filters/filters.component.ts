import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {customAgentsListSelectors} from '@appSelectors/forms/custom-agents-form';
import {customAgentListActions} from '@appActions/forms/custom-agent-form';

import {debounce} from 'lodash-es';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  filterOptions$: Observable<Array<DropListOption>> = this.store.select(
    customAgentsListSelectors.selectFilterOptions,
  );
  filterOptionSelected$: Observable<DropListOption> = this.store.select(
    customAgentsListSelectors.selectedFilterOption,
  );
  searchTerm$: Observable<string> = this.store.select(customAgentsListSelectors.selectSearchTerm);
  handleKeySearch = debounce(this.changeSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);

  constructor(private store: Store<AppState>) {}

  setFilterOption(filter: DropListOption): void {
    this.store.dispatch(
      customAgentListActions.SET_FILTER_OPTION_SELECTED({
        filterOption: filter,
      }),
    );
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(customAgentListActions.SET_SEARCH_TERM({searchTerm}));
  }
}
