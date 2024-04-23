// CORE
import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
// MODELS
import {
  FormulasDescription,
  FormulasTitles,
  IOfferAsidePrices,
  IVProductListPrice,
  ProvidersTabOptions,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
// ACTIONS
import {pricesActions} from '@appActions/forms/client-form';
// SELECTORS
import * as priceSelectors from '@appSelectors/forms/clients-form/clients-details/prices.selectors';
import * as generalClientSelectors from '@appSelectors/forms/clients-form/clients-details/clients-form-general-data.selectors';
// UTILS
import {debounce, isEmpty} from 'lodash-es';
import {IConfClient} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-client-prices-panel',
  templateUrl: './client-prices-panel.component.html',
  styleUrls: ['./client-prices-panel.component.scss'],
})
export class ClientPricesPanelComponent {
  @Input() actualConfiguration: IConfClient;
  @Input() backgroundColor: string;

  popupTarget: HTMLElement;
  popupIsOpen = false;
  popupText = '';
  popupTitle = '';
  allowNextPanelPage$: Observable<boolean> = this.store.select(
    priceSelectors.selectGetNextPanelPageIsAllowed,
  );
  allowPreviousPanelPage$: Observable<boolean> = this.store.select(
    priceSelectors.selectGetPreviousPanelPageIsAllowed,
  );
  asidePrices$: Observable<IOfferAsidePrices> = this.store.select(priceSelectors.selectAsidePrices);
  selectedAsidePrice$: Observable<IVProductListPrice> = this.store.select(
    priceSelectors.selectedAsidePrices,
  );
  generalConfiguration$: Observable<IConfClient> = this.store.select(
    priceSelectors.selectActualGeneralConfiguration,
  );
  selectClientIncomeLevel$: Observable<string> = this.store.select(
    generalClientSelectors.selectClientIncomeLevel,
  );
  readonly tabOptions = ProvidersTabOptions;
  readonly formulasDescription = FormulasDescription;
  readonly formulasTitles = FormulasTitles;
  lodashIsEmpty = isEmpty;
  handlePriceForPanelSearch = debounce(this.searchPriceForPanel, DEFAULT_TIME_DEBOUNCE_SEARCH);

  constructor(private store: Store<AppState>) {}

  getPricePageForPanel(value: number): void {
    this.store.dispatch(pricesActions.GET_PRICE_PAGE_FOR_PANEL_COMPONENT_EFFECT({value}));
  }

  searchPriceForPanel(searchTerm: string): void {
    this.store.dispatch(pricesActions.SEARCH_FOR_PANEL_COMPONENT_EFFECT({searchTerm}));
  }

  handleOpenPopup(target, title: string, text: string): void {
    this.popupTarget = target;
    this.popupTitle = title;
    this.popupText = text;
    this.popupIsOpen = true;
  }

  handleClosePopup(): void {
    this.popupIsOpen = false;
  }
}
