// Core
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
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  IOfferDeliveryRoutes,
  IVProviderProductConfiguration,
  OfferFields,
  SubTabOptions,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
// Actions
import * as pricesActions from '@appActions/forms/client-form/clients-details-form/prices/prices.actions';
import {SET_ENABLE_EDIT} from '@appActions/forms/client-form/clients-form.actions';
// Selectors
import * as pricesSelector from '@appSelectors/forms/clients-form/clients-details/prices.selectors';
// Utils
import {debounce, isEmpty} from 'lodash-es';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {
  IClientPriceProducts,
  IConfClient,
  IVClientProductConfiguration,
} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements AfterContentChecked {
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
  readonly fields = OfferFields;
  readonly subTabs = SubTabOptions;
  readonly viewTypes = AppViewTypes;

  products$: Observable<IClientPriceProducts> = this.store.select(
    pricesSelector.selectedFamilyProducts,
  );
  hasConfiguration$: Observable<boolean> = this.store.select(
    pricesSelector.selectHasConfigurationProductFilter,
  );
  productsResults$: Observable<Array<IVClientProductConfiguration>> = this.store.select(
    pricesSelector.selectProductsResults,
  );
  productSelected$: Observable<IVClientProductConfiguration> = this.store.select(
    pricesSelector.selectProductSelected,
  );
  searchTerm$: Observable<string> = this.store.select(pricesSelector.selectProductsSearchTerm);
  searchFilterOptions$: Observable<Array<DropListOption>> = this.store.select(
    pricesSelector.selectProductsFilterOptions,
  );
  searchFilter$: Observable<DropListOption> = this.store.select(
    pricesSelector.selectProductsSearchFilter,
  );
  productsResults: Array<IVProviderProductConfiguration>;
  rightPanelVisible: boolean;
  lodashIsEmpty = isEmpty;
  handleSearch = debounce(this.setSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {
    this.rightPanelVisible = true;
  }

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

  setSearchTerm(searchTerm: string): void {
    this.setNeedsToReload('products');
    this.store.dispatch(
      pricesActions.SET_SEARCH_TERM_BY_PRODUCTS_LIST({
        searchTerm,
      }),
    );
  }

  selectSearchFilter(searchFilter: DropListOption): void {
    this.store.dispatch(pricesActions.SET_PRODUCT_LIST_SEARCH_FILTER({searchFilter}));
  }

  setNeedsToReload(selectedTab: string): void {
    this.store.dispatch(
      pricesActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
        tabConfigurationName: selectedTab,
        needsToReload: true,
      }),
    );
  }

  filterConfiguredProducts(): void {
    this.store.dispatch(pricesActions.FILTER_CONFIGURED_PRODUCTS_COMPONENT_EFFECT());
  }

  fetchMoreProducts(event: IPageInfo): void {
    this.store.dispatch(pricesActions.FETCH_MORE_PRODUCTS_COMPONENT_EFFECT({event}));
  }

  selectProduct(productItem: IVProviderProductConfiguration): void {
    if (!productItem.isSelected) {
      this.resetPopBreakdown();
      this.store.dispatch(SET_ENABLE_EDIT({value: false}));
      this.store.dispatch(pricesActions.GET_FAMILY_PRODUCT_CONFIGURATION_LOAD({productItem}));
    }
  }

  handleTrackByProduct = (index: number, product: IVClientProductConfiguration): string =>
    product.IdProducto;

  resetPopBreakdown(): void {
    this.store.dispatch(pricesActions.SET_IS_OPEN_POP_BREAKDOWN({value: false}));
    this.store.dispatch(pricesActions.SET_OPEN_POP_AFTER_SAVE({value: false}));
    this.store.dispatch(pricesActions.RESET_ASIDE_PRICES());
  }
}
