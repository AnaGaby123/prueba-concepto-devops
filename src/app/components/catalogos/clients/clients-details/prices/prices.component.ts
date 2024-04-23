// CORE
import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
// MODELS
import {ICard} from '@appModels/card/card';
import {
  IOfferDeliveryRoutes,
  LevelConfigurationOption,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {
  IConfClient,
  IVProviderResume,
  IVTrademarkFamily,
} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';
// ACTIONS
import {pricesActions} from '@appActions/forms/client-form';
// SELECTORS
import {clientPricesSelectors, clientsSelectors} from '@appSelectors/forms/clients-form';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
// UTILS
import {debounce, isEmpty} from 'lodash-es';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss'],
})
export class PricesComponent implements OnDestroy {
  viewType$: Observable<string> = this.store.select(selectViewType);
  searchTerm$: Observable<string> = this.store.select(
    clientPricesSelectors.selectProvidersSearchTerm,
  );
  levelConfigurationTabs$: Observable<LevelConfigurationOption[]> = this.store.select(
    clientPricesSelectors.selectLevelConfigurationTabs,
  );
  selectedLevelConfigurationTab$: Observable<LevelConfigurationOption> = this.store.select(
    clientPricesSelectors.selectedLevelConfigurationTab,
  );
  levelSubConfigurationTabs$: Observable<OptionBar[]> = this.store.select(
    clientPricesSelectors.selectLevelsSubConfigurationsTab,
  );
  selectedLevelSubConfiguration$: Observable<OptionBar> = this.store.select(
    clientPricesSelectors.selectedLevelSubConfigurationTab,
  );
  enableEdit$: Observable<boolean> = this.store.select(clientsSelectors.selectEnableEdit);
  editMode$: Observable<boolean> = this.store.select(clientsSelectors.selectEditMode);
  actualConfiguration$: Observable<IConfClient> = this.store.select(
    clientPricesSelectors.selectActualConfiguration,
  );
  deliveryRoutes$: Observable<IOfferDeliveryRoutes[]> = this.store.select(
    clientPricesSelectors.selectACDeliveryRoutes,
  );
  isMexican$: Observable<boolean> = this.store.select(
    clientPricesSelectors.selectIsMexicanProvider,
  );
  selectedProvider$: Observable<IVProviderResume> = this.store.select(
    clientPricesSelectors.selectedProvider,
  );
  selectedFamily$: Observable<IVTrademarkFamily> = this.store.select(
    clientPricesSelectors.selectedProviderFamily,
  );
  families$: Observable<Array<ICard>> = this.store.select(
    clientPricesSelectors.selectFamiliesToCards,
  );
  showProviderList$: Observable<boolean> = this.store.select(
    clientPricesSelectors.selectShowProviderList,
  );
  hasConfigurationProvider: Observable<boolean> = this.store.select(
    clientPricesSelectors.hasProviderConfiguration,
  );
  handleSearch = debounce(this.setConfigurationSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  lodashIsEmpty = isEmpty;
  readonly viewTypes = AppViewTypes;
  titleNotConfiguration =
    'No cuenta con una configuración en la oferta del proveedor, por favor agrega una.';

  constructor(private store: Store<AppState>) {}

  ngOnDestroy(): void {
    this.store.dispatch(pricesActions.SET_ENABLE_EDIT({enableEdit: false}));
    this.store.dispatch(pricesActions.CLEAN_PRICES_CLIENT_STATE());
  }

  showProvidersList(): void {
    this.store.dispatch(pricesActions.SHOW_PROVIDERS_LIST());
  }

  selectConfigurationTab(selectedLevelConfigurationTab: LevelConfigurationOption): void {
    this.store.dispatch(
      pricesActions.SELECT_CONFIGURATION_TAB_COMPONENT_EFFECT({
        selectedLevelConfigurationTab,
      }),
    );
    this.resetPopBreakdown();
  }

  selectedFamilyChange(selectedFamily: ICard): void {
    this.store.dispatch(pricesActions.SELECTED_FAMILY_CHANGES_COMPONENT_EFFECT({selectedFamily}));
    this.resetPopBreakdown();
  }

  selectedProvider(providerSelected: IVProviderResume): void {
    this.store.dispatch(pricesActions.SELECTED_PROVIDER_COMPONENT_EFFECT({providerSelected}));
    this.resetPopBreakdown();
  }

  setConfigurationSearchTerm(searchTerm: string): void {
    this.store.dispatch(
      pricesActions.SET_CONFIGURATION_SEARCH_TERM_COMPONENT_EFFECT({
        searchTerm,
      }),
    );
  }

  resetPopBreakdown(): void {
    this.store.dispatch(pricesActions.SET_IS_OPEN_POP_BREAKDOWN({value: false}));
    this.store.dispatch(pricesActions.SET_OPEN_POP_AFTER_SAVE({value: false}));
    this.store.dispatch(pricesActions.RESET_ASIDE_PRICES());
  }

  downloadPrices(): void {
    this.store.dispatch(pricesActions.SET_LOAD_CSV_DOWNLOAD_LOAD());
  }
}
