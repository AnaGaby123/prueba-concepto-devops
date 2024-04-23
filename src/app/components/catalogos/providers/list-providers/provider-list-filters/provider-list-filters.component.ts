// Core
import {Component} from '@angular/core';

// Librerías externas
import {Observable} from 'rxjs';
import {debounce} from 'lodash-es';

// Store
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {ProvidersListState} from '@appModels/store/forms/providers/providers-list/providers-list.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {providersListActions} from '@appActions/forms/providers';
import {providerListSelectors} from '@appSelectors/forms/providers';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-provider-list-filters',
  templateUrl: './provider-list-filters.component.html',
  styleUrls: ['./provider-list-filters.component.scss'],
})
export class ProviderListFiltersComponent {
  providersListNode$: Observable<ProvidersListState> = this.store.select(
    providerListSelectors.selectListProviders,
  );
  searchTerm$: Observable<string> = this.store.select(providerListSelectors.selectSearchTerm);
  handleSetSearchTerm = debounce(this.search, DEFAULT_TIME_DEBOUNCE_SEARCH);

  constructor(private store: Store<AppState>) {}

  setProvidersFilter(selectedFilter: DropListOption, filterName: string): void {
    this.store.dispatch(providersListActions.CLEAR_PROVIDER_LIST());
    this.store.dispatch(providersListActions.SET_PROVIDERS_FILTER({selectedFilter, filterName}));
  }

  setStrategicIsSelected(): void {
    this.store.dispatch(providersListActions.SET_STRATEGIC_IS_SELECTED());
  }

  search(searchTerm: string): void {
    this.store.dispatch(providersListActions.CLEAR_PROVIDER_LIST());
    this.store.dispatch(
      providersListActions.SET_SEARCH_TERM({
        searchTerm,
      }),
    );
  }
}
