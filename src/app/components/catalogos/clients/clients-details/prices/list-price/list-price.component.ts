import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';

// Models
import {
  IOfferDeliveryRoutes,
  OfferFields,
  SubTabOptions,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
// Selectors
import * as pricesSelector from '@appSelectors/forms/clients-form/clients-details/prices.selectors';
// Actions
import * as pricesActions from '@appActions/forms/client-form/clients-details-form/prices/prices.actions';
import {SET_ENABLE_EDIT} from '@appActions/forms/client-form/clients-form.actions';
// Utils
import {debounce, isEmpty} from 'lodash-es';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {
  IClientPriceListPrices,
  IConfClient,
  IVProductListPriceConfigurationClient,
} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-list-price',
  templateUrl: './list-price.component.html',
  styleUrls: ['./list-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPriceComponent implements AfterContentChecked {
  @Input() actualConfiguration: IConfClient;
  @Input() deliveryRoutes: IOfferDeliveryRoutes[];
  @Input() editMode: boolean;
  @Input() enableEdit: boolean;
  @Input() hasConfigurationProvider: boolean;
  @Input() isMexican: boolean;
  @Input() levelSubConfigurationTabs: OptionBar[];
  @Input() providerIsMexican: boolean;
  @Input() selectedLevelSubConfiguration: OptionBar;
  @Input() viewType: string;
  @Output() event: EventEmitter<boolean> = new EventEmitter<boolean>();

  pricesList$: Observable<IClientPriceListPrices> = this.store.select(
    pricesSelector.selectTabPrices,
  );
  pricesResults$: Observable<Array<IVProductListPriceConfigurationClient>> = this.store.select(
    pricesSelector.selectPriceResults,
  );
  hasConfiguration$: Observable<boolean> = this.store.select(
    pricesSelector.selectHasConfigurationFilter,
  );
  selectedPrice$: Observable<IVProductListPriceConfigurationClient> = this.store.select(
    pricesSelector.selectedFamilySelectedPrice,
  );
  searchTerm$: Observable<string> = this.store.select(pricesSelector.selectPricesSearchTerm);
  readonly fields = OfferFields;
  readonly subTabs = SubTabOptions;
  readonly viewTypes = AppViewTypes;
  pricesResults: Array<IVProductListPriceConfigurationClient>;
  lodashIsEmpty = isEmpty;
  handleSearch = debounce(this.setSearchTermPrices, DEFAULT_TIME_DEBOUNCE_SEARCH);

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  selectLevelSubConfigurationTab(selectedLevelSubConfigurationTab: OptionBar): void {
    this.store.dispatch(
      pricesActions.SET_LEVEL_SUB_CONFIGURATION_TAB_SELECTED({
        selectedLevelSubConfigurationTab,
      }),
    );
  }

  selectPrice(priceItem: IVProductListPriceConfigurationClient): void {
    if (!priceItem.isSelected) {
      this.resetPopBreakdown();
      this.store.dispatch(SET_ENABLE_EDIT({value: false}));
      this.store.dispatch(pricesActions.GET_FAMILY_PRICE_CONFIGURATION_LOAD({priceItem}));
    }
  }

  fetchMorePrices(event: IPageInfo): void {
    this.store.dispatch(pricesActions.FETCH_MORE_PRICES_COMPONENT_EFFECT({event}));
  }

  setSearchTermPrices(searchTerm: string): void {
    this.store.dispatch(pricesActions.SET_SEARCH_TERM_PRICES_COMPONENT_EFFECT({searchTerm}));
  }

  filterConfiguredPrices(): void {
    this.store.dispatch(pricesActions.FILTER_CONFIGURED_PRICES_COMPONENT_EFFECT());
  }

  handleTrackByPriceList(index: number, item: IVProductListPriceConfigurationClient): number {
    return item.PrecioLista;
  }

  resetPopBreakdown(): void {
    this.store.dispatch(pricesActions.SET_IS_OPEN_POP_BREAKDOWN({value: false}));
    this.store.dispatch(pricesActions.SET_OPEN_POP_AFTER_SAVE({value: false}));
    this.store.dispatch(pricesActions.RESET_ASIDE_PRICES());
  }
}
