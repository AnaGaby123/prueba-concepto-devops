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
  IOfferClassifications,
  IOfferDeliveryRoutes,
  IVProviderProductClassification,
  Levels,
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
  selector: 'app-offer-classification',
  templateUrl: './offer-characteristic-grouper.component.html',
  styleUrls: ['./offer-characteristic-grouper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferCharacteristicGrouperComponent implements AfterContentChecked {
  @Input() actualConfiguration: IConfProvider;
  @Input() deliveryRoutes: IOfferDeliveryRoutes[];
  @Input() editMode: boolean;
  @Input() enableEdit: boolean;
  @Input() industryFamily: Array<VMarcaFamiliaIndustriaObj>;
  @Input() levelSubConfigurationTabs: OptionBar[];
  @Input() providerIsMexican: boolean;
  @Input() selectedLevelSubConfiguration: OptionBar;
  @Input() viewType: string;

  classificationList$: Observable<IOfferClassifications> = this.store.select(
    offerSelectors.selectCharacteristicsGroupers,
  );
  classificationResults$: Observable<Array<IVProviderProductClassification>> = this.store.select(
    offerSelectors.selectClassificationsResults,
  );
  hasConfiguration$: Observable<boolean> = this.store.select(
    offerSelectors.selectHasConfigurationFilter,
  );
  searchTerm$: Observable<string> = this.store.select(
    offerSelectors.selectClassificationsSearchTerm,
  );
  hasCharacteristicGrouper$: Observable<boolean> = this.store.select(
    offerSelectors.selectedFamilyHasCharacteristicGrouper,
  );
  readonly subTabs = SubTabOptions;
  readonly levels = Levels;
  readonly viewTypes = AppViewTypes;
  readonly fields = OfferFields;

  classificationResults: Array<IVProviderProductClassification>;
  lodashIsEmpty = isEmpty;
  rightPanelVisible: boolean;
  handleSearch = debounce(this.setSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);

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

  selectClassification(classificationItem: IVProviderProductClassification): void {
    if (!classificationItem.isSelected) {
      this.store.dispatch(offerActions.SET_IS_OPEN_POP_BREAKDOWN({value: false}));
      this.store.dispatch(offerActions.SET_OPEN_POP_AFTER_SAVE({value: false}));
      this.store.dispatch(
        offerActions.SET_SELECTED_CAT_INDUSTRY_RAND_FAMILY({catIndustryFamilyBrand: null}),
      );
      this.store.dispatch(offerActions.RESET_ASIDE_PRICES());
      this.store.dispatch(SET_ENABLE_EDIT({enableEdit: false}));
      this.store.dispatch(
        offerActions.GET_CHARACTERISTIC_GROUPER_CONFIGURATION_LOAD({
          classificationItem,
        }),
      );
    }
  }

  setSearchTerm(searchTerm: string): void {
    this.setNeedsToReload('classifications');
    this.store.dispatch(
      offerActions.SET_CHARACTERISTIC_GROUPER_LIST_SEARCH_TERM({
        searchTerm,
      }),
    );
  }

  filterConfiguredClassifications(): void {
    this.setNeedsToReload('classifications');
    this.store.dispatch(
      offerActions.SET_LIST_OF_TAB_CONFIGURATION_HAS_FILTER({
        tabConfigurationName: 'classifications',
      }),
    );
    this.store.dispatch(
      offerActions.GET_CHARACTERISTIC_GROUPER_LIST_FILTERED_BY_THIS_LEVEL_CONFIG(),
    );
  }

  fetchMoreClassifications(event: IPageInfo): void {
    this.store.dispatch(offerActions.FETCH_MORE_CLASSIFICATIONS_COMPONENT_EFFECT({event}));
  }

  setNeedsToReload(selectedTab: string): void {
    this.store.dispatch(
      offerActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
        tabConfigurationName: selectedTab,
        needsToReload: true,
      }),
    );
  }
}
