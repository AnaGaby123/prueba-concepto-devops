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
  Levels,
  OfferFields,
  SubTabOptions,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {IToggleSwitch} from '@appModels/toggle-switch/toggle-switch';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
// Actions
import * as pricesActions from '@appActions/forms/client-form/clients-details-form/prices/prices.actions';
import {SET_ENABLE_EDIT} from '@appActions/forms/client-form/clients-form.actions';
// Selectors
import * as pricesSelector from '@appSelectors/forms/clients-form/clients-details/prices.selectors';
// Utils
import {debounce, isEmpty} from 'lodash-es';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {
  IClientPriceClassifications,
  IConfClient,
  IVClientProductClassification,
} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-offer-classification',
  templateUrl: './offer-classification.component.html',
  styleUrls: ['./offer-classification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferClassificationComponent implements AfterContentChecked {
  @Input() actualConfiguration: IConfClient;
  @Input() deliveryRoutes: IOfferDeliveryRoutes[];
  @Input() editMode: boolean;
  @Input() enableEdit: boolean;
  @Input() hasConfigurationProvider: boolean;
  @Input() isIntervalForSwitch: IToggleSwitch;
  @Input() isMexican: boolean;
  @Input() levelSubConfigurationTabs: OptionBar[];
  @Input() providerIsMexican: boolean;
  @Input() selectedDeliveryRoute: IOfferDeliveryRoutes;
  @Input() selectedLevelSubConfiguration: OptionBar;
  @Input() timeUnitList: DropListOption[];
  @Input() viewType: string;
  @Output() event: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() openConfig: EventEmitter<any> = new EventEmitter<any>();

  classificationList$: Observable<IClientPriceClassifications> = this.store.select(
    pricesSelector.selectTabCharacteristicGrouper,
  );
  classificationResults$: Observable<Array<IVClientProductClassification>> = this.store.select(
    pricesSelector.selectCharacteristicGrouperResults,
  );
  hasConfiguration$: Observable<boolean> = this.store.select(
    pricesSelector.selectHasConfigurationFilterCharacteristicGrouper,
  );
  searchTerm$: Observable<string> = this.store.select(
    pricesSelector.selectClassificationsSearchTermCharacteristicGrouper,
  );
  hasCharacteristicGrouper$: Observable<boolean> = this.store.select(
    pricesSelector.selectedFamilyHasCharacteristicGrouper,
  );
  readonly subTabs = SubTabOptions;
  readonly levels = Levels;
  readonly viewTypes = AppViewTypes;
  readonly fields = OfferFields;

  classificationResults: Array<IVClientProductClassification>;
  lodashIsEmpty = isEmpty;
  handleSearch = debounce(this.setSearchTermCharacteristicGrouper, DEFAULT_TIME_DEBOUNCE_SEARCH);

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

  selectClassification(classificationItem: IVClientProductClassification): void {
    if (!classificationItem.isSelected) {
      this.resetPopBreakdown();
      this.store.dispatch(SET_ENABLE_EDIT({value: false}));
      this.store.dispatch(
        pricesActions.GET_FAMILY_CLASSIFICATION_CONFIGURATION_LOAD({
          classificationItem,
        }),
      );
    }
  }

  setSearchTermCharacteristicGrouper(searchTerm: string): void {
    this.store.dispatch(
      pricesActions.SET_SEARCH_TERM_CHARACTERISTIC_GROUPER_COMPONENT_EFFECT({
        searchTerm,
      }),
    );
  }

  filterConfiguredClassifications(): void {
    this.store.dispatch(pricesActions.FILTER_CONFIGURED_CLASSIFICATIONS_COMPONENT_EFFECT());
  }

  fetchMoreClassifications(event: IPageInfo): void {
    this.store.dispatch(pricesActions.FETCH_MORE_CLASSIFICATION_COMPONENT_EFFECT({event}));
  }

  handleTrackByCharacteristicGrouper(index: number, item: IVClientProductClassification): string {
    return item.IdAgrupadorCaracteristica;
  }

  resetPopBreakdown(): void {
    this.store.dispatch(pricesActions.SET_IS_OPEN_POP_BREAKDOWN({value: false}));
    this.store.dispatch(pricesActions.SET_OPEN_POP_AFTER_SAVE({value: false}));
    this.store.dispatch(pricesActions.RESET_ASIDE_PRICES());
  }
}
