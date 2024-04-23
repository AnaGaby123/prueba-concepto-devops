// CORE
import {Component, EventEmitter, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
// MODELS
import {
  IVProviderResume,
  IVProviderResumeQueryResult,
} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
// ACTIONS
import {pricesActions} from '@appActions/forms/client-form';
// SELECTORS
import {clientPricesSelectors} from '@appSelectors/forms/clients-form';
// UTILS
import {debounce, isEmpty} from 'lodash-es';
import {API_REQUEST_STATUS_LOADING, DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-providers-panel',
  templateUrl: './providers-panel.component.html',
  styleUrls: ['./providers-panel.component.scss'],
})
export class ProvidersPanelComponent {
  @Output() event: EventEmitter<IVProviderResume> = new EventEmitter<IVProviderResume>();
  searchTerm$: Observable<string> = this.store.select(
    clientPricesSelectors.selectProvidersSearchTerm,
  );
  providersList$: Observable<IVProviderResumeQueryResult> = this.store.select(
    clientPricesSelectors.selectProvidersList,
  );
  providersApiStatus$: Observable<number> = this.store.select(
    clientPricesSelectors.selectProvidersApiStatus,
  );
  lodashIsEmpty = isEmpty;
  handleKeySearch = debounce(this.changeSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  scrolledXProviders: Array<IVProviderResume>;

  constructor(private store: Store<AppState>) {}

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(
      pricesActions.SET_PROVIDERS_IS_LOADING({
        apiStatus: API_REQUEST_STATUS_LOADING,
      }),
    );
    this.store.dispatch(pricesActions.SET_SEARCH_TERM_BY_PROVIDER({searchTerm}));
  }

  fetchMoreProviders(event: IPageInfo): void {
    this.store.dispatch(pricesActions.FETCH_MORE_PROVIDERS_COMPONENT_EFFECT({event}));
  }

  selectedProv(item: IVProviderResume): void {
    this.event.emit(item);
  }
}
