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
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  IConfProvider,
  IOfferDeliveryRoutes,
  IOfferProducts,
  IVProviderProductConfiguration,
  OfferFields,
  SubTabOptions,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';

// Actions
import {offerActions} from '@appActions/forms/providers';

// Selectors
import {offerSelectors} from '@appSelectors/forms/providers';

// Utils
import {debounce, isEmpty} from 'lodash-es';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {SET_ENABLE_EDIT} from '@appActions/forms/providers/providers.actions';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {VMarcaFamiliaIndustriaObj} from 'api-catalogos';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements AfterContentChecked {
  @Input() actualConfiguration: IConfProvider;
  @Input() deliveryRoutes: IOfferDeliveryRoutes[];
  @Input() editMode: boolean;
  @Input() enableEdit: boolean;
  @Input() industryFamily: Array<VMarcaFamiliaIndustriaObj>;
  @Input() levelSubConfigurationTabs: OptionBar[];
  @Input() providerIsMexican: boolean;
  @Input() selectedLevelSubConfiguration: OptionBar;
  @Input() viewType: string;

  readonly fields = OfferFields;
  readonly subTabs = SubTabOptions;
  readonly viewTypes = AppViewTypes;

  products$: Observable<IOfferProducts> = this.store.select(offerSelectors.selectSFProducts);
  hasConfiguration$: Observable<boolean> = this.store.select(
    offerSelectors.selectHasConfigurationFilter,
  );
  productsResults$: Observable<Array<IVProviderProductConfiguration>> = this.store.select(
    offerSelectors.selectProductsResults,
  );
  searchTerm$: Observable<string> = this.store.select(offerSelectors.selectProductsSearchTerm);
  searchFilterOptions$: Observable<Array<DropListOption>> = this.store.select(
    offerSelectors.selectProductsFilterOptions,
  );
  searchFilter$: Observable<DropListOption> = this.store.select(
    offerSelectors.selectProductsSearchFilter,
  );
  productsResults: Array<IVProviderProductConfiguration>;
  rightPanelVisible: boolean;
  lodashIsEmpty = isEmpty;
  handleSearch = debounce(this.setSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  selectedProduct$: Observable<IVProviderProductConfiguration> = this.store.select(
    offerSelectors.selectedFamilyProduct,
  );
  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {
    this.rightPanelVisible = true;
  }

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

  setSearchTerm(searchTerm: string): void {
    this.setNeedsToReload('products');
    this.store.dispatch(
      offerActions.SET_PRODUCT_LIST_SEARCH_TERM({
        searchTerm,
      }),
    );
  }

  selectSearchFilter(searchFilter: DropListOption): void {
    this.store.dispatch(offerActions.SET_PRODUCT_LIST_SEARCH_FILTER({searchFilter}));
  }

  setNeedsToReload(selectedTab: string): void {
    this.store.dispatch(
      offerActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
        tabConfigurationName: selectedTab,
        needsToReload: true,
      }),
    );
  }

  filterConfiguredProducts(): void {
    this.setNeedsToReload('products');
    this.store.dispatch(
      offerActions.SET_LIST_OF_TAB_CONFIGURATION_HAS_FILTER({
        tabConfigurationName: 'products',
      }),
    );
    this.store.dispatch(offerActions.GET_PRODUCT_LIST_FILTERED_BY_THIS_LEVEL_CONFIG());
  }

  fetchMoreProducts(event: IPageInfo): void {
    this.store.dispatch(offerActions.FETCH_MORE_PRODUCTS_COMPONENT_EFFECT({event}));
  }

  selectProduct(productItem: IVProviderProductConfiguration): void {
    if (!productItem.isSelected) {
      this.store.dispatch(offerActions.SET_IS_OPEN_POP_BREAKDOWN({value: false}));
      this.store.dispatch(offerActions.SET_OPEN_POP_AFTER_SAVE({value: false}));
      this.store.dispatch(
        offerActions.SET_SELECTED_CAT_INDUSTRY_RAND_FAMILY({catIndustryFamilyBrand: null}),
      );
      this.store.dispatch(offerActions.RESET_ASIDE_PRICES());
      this.store.dispatch(SET_ENABLE_EDIT({enableEdit: false}));
      this.store.dispatch(offerActions.GET_PRODUCT_CONFIGURATION_LOAD({productItem}));
    }
  }
}
