import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

// Selectors
import * as providerSelectors from '@appSelectors/forms/providers';
import {providerActions} from '@appActions/forms/providers';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
})
export class ProvidersComponent implements OnDestroy {
  constructor(private store: Store<AppState>, private router: Router) {}

  modeEdit$: Observable<boolean> = this.store.select(
    providerSelectors.providerSelectors.selectModeEdit,
  );
  enableEdit$: Observable<boolean> = this.store.select(
    providerSelectors.providerSelectors.selectEnableEdit,
  );
  addEditComponent$: Observable<boolean> = this.store.select(
    providerSelectors.providerSelectors.selectAddEditComponent,
  );
  title$: Observable<string> = this.store.select(providerSelectors.providerSelectors.selectTitle);
  providerName$: Observable<string> = this.store.select(
    providerSelectors.providersDetailsSelectors.selectedProviderName,
  );

  ngOnDestroy() {
    this.store.dispatch(providerActions.CLEAN_ALL_PROVIDERS_STATE());
  }

  returnMainPage(): void {
    this.store.dispatch(providerActions.RETURN_MAIN_PAGE_COMPONENT_EFFECT());
  }
}
