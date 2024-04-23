import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';

// Models
import {ITabOption} from '@appModels/botonera/botonera-option';

// Selectors
import {
  campaignsProviderSelectors,
  providersDetailsSelectors,
  providerSelectors,
} from '@appSelectors/forms/providers';

// Actions
import {providersDetailsActions} from '@appActions/forms/providers';
import {ProvidersTabsOptions} from '@appModels/store/forms/providers/providers-details/providers-details.models';
import {AppViewTypes} from '@appModels/store/utils/utils.model';

@Component({
  selector: 'app-providers-details',
  templateUrl: './providers-details.component.html',
  styleUrls: ['./providers-details.component.scss'],
})
export class ProvidersDetailsComponent implements OnInit, OnDestroy {
  stepsOptions$: Observable<Array<ITabOption>> = this.store.select(
    providersDetailsSelectors.selectStepsOptionsITabOptions,
  );
  selectedStepsOption$: Observable<ITabOption> = this.store.select(
    providersDetailsSelectors.selectedStepsOptionsITabOptions,
  );
  isInTrademarkView$: Observable<boolean> = this.store.select(
    providersDetailsSelectors.selectIsInTrademarkPage,
  );
  modeEdit$: Observable<boolean> = this.store.select(providerSelectors.selectModeEdit);
  enableEdit$: Observable<boolean> = this.store.select(providerSelectors.selectEnableEdit);
  getAddCampaing$: Observable<boolean> = this.store.select(
    campaignsProviderSelectors.getAddCampaing,
  );
  saveValidatorsBySteps$: Observable<boolean> = this.store.select(
    providerSelectors.selectSaveValidatorsBySteps,
  );
  tabs = ProvidersTabsOptions;
  readonly viewTypes = AppViewTypes;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(providersDetailsActions.ON_INIT_COMPONENT_EFFECT());
  }

  cancelHandler(): void {
    this.store.dispatch(providersDetailsActions.CANCEL_HANDLER_COMPONENT_EFFECT());
  }

  saveHandler(): void {
    this.store.dispatch(providersDetailsActions.SAVE_HANDLER_COMPONENT_EFFECT());
  }

  selectStep(tab: ITabOption): void {
    this.store.dispatch(providersDetailsActions.TAB_EFFECT({tab}));
  }

  // DOCS: Manejador de evento click del botón Editar
  editButtonHandler(): void {
    this.store.dispatch(providersDetailsActions.EDIT_BUTTON_HANDLER_COMPONENT_EFFECT());
  }

  ngOnDestroy(): void {
    this.store.dispatch(providersDetailsActions.SET_INITIAL_DATA_ADD_EDIT_PROVIDER());
  }
}
