import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
// Models
import {
  IConfProvider,
  IOfferDeliveryRoutes,
  IOfferListPrices,
  IVProductListPriceConfiguration,
  IVProductProviderListPrice,
  OfferFields,
  SubTabOptions,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
// Actions
import {offerActions} from '@appActions/forms/providers';
import {SET_ENABLE_EDIT} from '@appActions/forms/providers/providers.actions';
// Selectors
import {offerSelectors} from '@appSelectors/forms/providers';
// Utils
import {debounce, isEmpty} from 'lodash-es';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {VMarcaFamiliaIndustriaObj} from 'api-catalogos';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';
import {InputValidators} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-list-price',
  templateUrl: './list-price.component.html',
  styleUrls: ['./list-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPriceComponent implements AfterContentChecked {
  @Input() actualConfiguration: IConfProvider;
  @Input() deliveryRoutes: IOfferDeliveryRoutes[];
  @Input() editMode: boolean;
  @Input() enableEdit: boolean;
  @Input() industryFamily: Array<VMarcaFamiliaIndustriaObj>;
  @Input() levelSubConfigurationTabs: OptionBar[];
  @Input() providerIsMexican: boolean;
  @Input() selectedLevelSubConfiguration: OptionBar;
  @Input() viewType: string;
  hasConfiguration$: Observable<boolean> = this.store.select(
    offerSelectors.selectHasConfigurationFilter,
  );
  pricesList$: Observable<IOfferListPrices> = this.store.select(offerSelectors.selectSFPriceList);
  pricesResults$: Observable<Array<IVProductProviderListPrice>> = this.store.select(
    offerSelectors.selectPriceResults,
  );
  searchTerm$: Observable<string> = this.store.select(offerSelectors.selectPricesSearchTerm);
  selectedPrice$: Observable<IVProductListPriceConfiguration> = this.store.select(
    offerSelectors.selectedPrice,
  );
  readonly fields = OfferFields;
  readonly subTabs = SubTabOptions;
  readonly viewTypes = AppViewTypes;
  readonly validators = InputValidators;

  handleSearch = debounce(this.setSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  lodashIsEmpty = isEmpty;
  pricesResults: Array<IVProductListPriceConfiguration>;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  selectLevelSubConfigurationTab(selectedLevelSubConfigurationTab: OptionBar): void {
    this.store.dispatch(
      offerActions.SET_LEVEL_SUB_CONFIGURATION_TAB_SELECTED({
        selectedLevelSubConfigurationTab,
      }),
    );
  }

  selectPrice(priceItem: IVProductListPriceConfiguration): void {
    if (!priceItem.isSelected) {
      this.store.dispatch(offerActions.SET_IS_OPEN_POP_BREAKDOWN({value: false}));
      this.store.dispatch(offerActions.SET_OPEN_POP_AFTER_SAVE({value: false}));
      this.store.dispatch(
        offerActions.SET_SELECTED_CAT_INDUSTRY_RAND_FAMILY({catIndustryFamilyBrand: null}),
      );
      this.store.dispatch(offerActions.RESET_ASIDE_PRICES());
      this.store.dispatch(SET_ENABLE_EDIT({enableEdit: false}));
      this.store.dispatch(offerActions.GET_PRICE_CONFIGURATION_LOAD({priceItem}));
    }
  }

  fetchMorePrices(event: IPageInfo): void {
    this.store.dispatch(offerActions.FETCH_MORE_PRICES_COMPONENT_EFFECT({event}));
  }

  setNeedsToReload(selectedTab: string): void {
    this.store.dispatch(
      offerActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
        tabConfigurationName: selectedTab,
        needsToReload: true,
      }),
    );
  }

  setSearchTerm(searchTerm: string): void {
    this.setNeedsToReload('prices');
    this.store.dispatch(
      offerActions.SET_PRICE_LIST_SEARCH_TERM({
        searchTerm,
      }),
    );
  }

  filterConfiguredPrices(): void {
    this.setNeedsToReload('prices');
    this.store.dispatch(
      offerActions.SET_LIST_OF_TAB_CONFIGURATION_HAS_FILTER({
        tabConfigurationName: 'prices',
      }),
    );
    this.store.dispatch(offerActions.GET_PRICE_LIST_FILTERED_BY_THIS_LEVEL_CONFIG());
  }
}
