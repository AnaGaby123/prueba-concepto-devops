import {Component, Input} from '@angular/core';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
import {
  FormulasDescription,
  LevelConfigurationOption,
  Levels,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {
  clientPricesSelectors,
  clientsDetailsSelectors,
  clientsSelectors,
} from '@appSelectors/forms/clients-form';
import {
  IClientAsidePrices,
  IConfClient,
  IVProductListPrice,
  IVTrademarkFamily,
} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';
import * as priceSelectors from '@appSelectors/forms/clients-form/clients-details/prices.selectors';
import {VCliente} from 'api-catalogos';
import {debounce, isEmpty} from 'lodash-es';
import {clientDetailsFormActions, pricesActions} from '@appActions/forms/client-form';
import {DEFAULT_TIME_DEBOUNCE_SEARCH, DEFAULT_UUID} from '@appUtil/common.protocols';

@Component({
  selector: 'app-see-breakdown',
  templateUrl: './see-breakdown.component.html',
  styleUrls: ['./see-breakdown.component.scss'],
})
export class SeeBreakdownComponent {
  @Input() actualConfiguration: IConfClient;

  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  selectedFamily: Observable<IVTrademarkFamily> = this.store.select(
    clientPricesSelectors.selectedProviderFamily,
  );
  selectedLevelConfigurationTab$: Observable<LevelConfigurationOption> = this.store.select(
    clientPricesSelectors.selectedLevelConfigurationTab,
  );
  allowNextPanelPage$: Observable<boolean> = this.store.select(
    priceSelectors.selectGetNextPanelPageIsAllowed,
  );
  allowPreviousPanelPage$: Observable<boolean> = this.store.select(
    priceSelectors.selectGetPreviousPanelPageIsAllowed,
  );
  asidePrices$: Observable<IClientAsidePrices> = this.store.select(
    priceSelectors.selectAsidePrices,
  );
  selectedAsidePrice$: Observable<IVProductListPrice> = this.store.select(
    priceSelectors.selectedAsidePrices,
  );
  selectedClient$: Observable<VCliente> = this.store.select(clientsDetailsSelectors.selectedClient);
  popBreakdownIsOpen$: Observable<boolean> = this.store.select(
    priceSelectors.selectPopBreakdownIsOpen,
  );
  alertPopUpdateBreakdown$: Observable<boolean> = this.store.select(
    priceSelectors.selectOpenAlerPopUpdaeBreakdown,
  );
  saveValidatorsBySteps$: Observable<boolean> = this.store.select(
    clientsSelectors.selectClientsSaveValidatorsBySteps,
  );
  hasConfigurationProvider: Observable<boolean> = this.store.select(
    clientPricesSelectors.hasProviderConfiguration,
  );
  hasChanges: Observable<boolean> = this.store.select(clientPricesSelectors.pricesSaveValidator);
  handlePriceForPanelSearch = debounce(this.searchPriceForPanel, DEFAULT_TIME_DEBOUNCE_SEARCH);
  readonly viewTypes = AppViewTypes;
  readonly formulasDescription = FormulasDescription;
  readonly default = DEFAULT_UUID;
  levels = Levels;
  lodashIsEmpty = isEmpty;
  popupIsOpen = false;
  popupTarget: HTMLElement;
  popupText = '';
  target: HTMLElement = null;

  constructor(private store: Store<AppState>) {
    this.target = null;
  }

  handleCloseBreakdownPopup() {
    this.target = null;
    this.restoreDataPopBreakdown();
  }

  restoreDataPopBreakdown() {
    this.store.dispatch(pricesActions.SET_IS_OPEN_POP_BREAKDOWN({value: false}));
    this.store.dispatch(pricesActions.SET_OPEN_POP_AFTER_SAVE({value: false}));
    this.store.dispatch(pricesActions.RESET_ASIDE_PRICES());
  }

  handleOpenPopup(target, text: string) {
    this.popupTarget = target;
    this.popupText = text;
    this.popupIsOpen = true;
  }

  handleClosePopup() {
    this.popupIsOpen = false;
  }

  getPricePageForPanel(value: number) {
    this.store.dispatch(pricesActions.GET_PRICE_PAGE_FOR_PANEL_COMPONENT_EFFECT({value}));
  }

  searchPriceForPanel(searchTerm: string) {
    this.store.dispatch(pricesActions.SEARCH_FOR_PANEL_COMPONENT_EFFECT({searchTerm}));
  }

  handleClosePop(value: boolean) {
    this.store.dispatch(pricesActions.SET_OPEN_ALERT_POP_UPDATE_BREAKDOWN({value: false}));
    if (value) {
      this.store.dispatch(clientDetailsFormActions.SAVE_DATA_COMPONENT_EFFECT());
      this.store.dispatch(pricesActions.SET_OPEN_POP_AFTER_SAVE({value: true}));
    }
  }

  setTarget() {
    this.target = document.getElementById('breakdown') as HTMLElement;
    this.store.dispatch(pricesActions.SET_PREPARE_BREAKDOWN());
  }
}
