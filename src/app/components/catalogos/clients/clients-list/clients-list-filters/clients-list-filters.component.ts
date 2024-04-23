// CORE
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
// MODELS
import {IClientsListForm} from '@appModels/store/forms/clients-form/clients-list-form/clients-list-form.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
// ACTIONS
import * as clientListActions from '@appActions/forms/client-form/clients-list-form/clients-list-form.actions';
import * as clientsListActions from '@appActions/forms/client-form/clients-list-form/clients-list-form.actions';
// SELECTORS
import {clientsListSelectors} from '@appSelectors/forms/clients-form';
// UTILS
import {debounce} from 'lodash-es';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-clients-list-filters',
  templateUrl: './clients-list-filters.component.html',
  styleUrls: ['./clients-list-filters.component.scss'],
})
export class ClientsListFiltersComponent {
  searchTerm$: Observable<string> = this.store.select(
    clientsListSelectors.selectClientListSearchTerm,
  );
  clientsListNode$: Observable<IClientsListForm> = this.store.select(
    clientsListSelectors.selectClientsListState,
  );
  handleKeySearch = debounce((value) => this.changeSearchTerm(value), DEFAULT_TIME_DEBOUNCE_SEARCH);

  constructor(private store: Store<AppState>) {}

  setFilter(selectedFilter: DropListOption, filterName: string): void {
    this.store.dispatch(clientListActions.CLEAR_CLIENTS_LIST());
    this.store.dispatch(clientListActions.SET_CLIENTS_FILTER({filterName, selectedFilter}));
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(clientListActions.CLEAR_CLIENTS_LIST());
    this.store.dispatch(clientListActions.SET_SEARCH_TERM({searchTerm}));
  }

  getCorporates(): void {
    this.store.dispatch(clientListActions.FETCH_CORPORATES());
  }

  getKayCount(): void {
    this.store.dispatch(clientListActions.CLEAR_CLIENTS_LIST());
    this.store.dispatch(clientsListActions.FETCH_KAY_ACCOUNT());
  }
}
