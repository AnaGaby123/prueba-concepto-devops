/* Core Imports */
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

/* Selectors Imports */
import {confirmLoadBalanceInFavorListSelectors} from '@appSelectors/pendings/load-balance-in-favor';

/* Models Imports */
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

/* Utils Imports */
import {debounce} from 'lodash-es';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-load-balance-in-favor-list',
  templateUrl: './load-balance-in-favor-list.component.html',
  styleUrls: ['./load-balance-in-favor-list.component.scss'],
})
export class LoadBalanceInFavorListComponent {
  searchTerm$: Observable<string> = this.store.select(
    confirmLoadBalanceInFavorListSelectors.selectSearchTerm,
  );
  tabs$: Observable<Array<ITabOption>> = this.store.select(
    confirmLoadBalanceInFavorListSelectors.selectTabs,
  );
  tabSelected$: Observable<ITabOption> = this.store.select(
    confirmLoadBalanceInFavorListSelectors.selectTabSelected,
  );
  options$: Observable<Array<DropListOption>> = this.store.select(
    confirmLoadBalanceInFavorListSelectors.selectOptions,
  );
  optionsSelected$: Observable<DropListOption> = this.store.select(
    confirmLoadBalanceInFavorListSelectors.selectOptionSelected,
  );
  providers$: Observable<Array<DropListOption>> = this.store.select(
    confirmLoadBalanceInFavorListSelectors.selectProviders,
  );
  providerSelected$: Observable<DropListOption> = this.store.select(
    confirmLoadBalanceInFavorListSelectors.selectProviderSelected,
  );
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );

  constructor(private store: Store<AppState>) {}

  changeTabSelected(tabSelected: ITabOption): void {}

  selectFilter(optionSelected: DropListOption): void {}

  changeProviderSelected(providerSelected: DropListOption): void {}

  changeSearchTerm(searchTerm: string): void {}

  add(): void {}
}
