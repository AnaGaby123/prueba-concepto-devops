import {Component, Input, OnDestroy} from '@angular/core';
import {
  FormulasDescription,
  IConfProvider,
  IOfferAsidePrices,
  IVMarcaFamiliaIndustriaObj,
  IVProductListPrice,
  IVProductProviderListPrice,
  IVTrademarkFamily,
  LevelConfigurationOption,
  Levels,
  OfferFields,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {Observable} from 'rxjs';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {offerSelectors, providerSelectors} from '@appSelectors/forms/providers';
import {offerActions} from '@appActions/forms/providers';
import {debounce, isEmpty} from 'lodash-es';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {VMarcaFamiliaIndustriaObj} from 'api-catalogos';
import {DEFAULT_TIME_DEBOUNCE_SEARCH, DEFAULT_UUID} from '@appUtil/common.protocols';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss'],
})
export class PerformanceComponent implements OnDestroy {
  @Input() actualConfiguration: IConfProvider;
  @Input() editMode: boolean;
  @Input() enableEdit: boolean;
  @Input() isHoveColorOriginal = true;
  @Input() isMexican: boolean;
  @Input() viewType: string;
  @Input() industryFamily: VMarcaFamiliaIndustriaObj[];
  readonly appViewTypes = AppViewTypes;
  readonly fields = OfferFields;
  readonly formulasDescription = FormulasDescription;
  readonly inputValidators = InputValidators;
  readonly viewTypes = AppViewTypes;
  defaultUUID = DEFAULT_UUID;
  allowNextPanelPage$: Observable<boolean> = this.store.select(
    offerSelectors.selectGetNextPanelPageIsAllowed,
  );
  allowPreviousPanelPage$: Observable<boolean> = this.store.select(
    offerSelectors.selectGetPreviousPanelPageIsAllowed,
  );
  asidePrices$: Observable<IOfferAsidePrices> = this.store.select(offerSelectors.selectAsidePrices);
  selectedAsidePrice$: Observable<IVProductListPrice> = this.store.select(
    offerSelectors.selectedAsidePrice,
  );
  selectedIncomeLevel$: Observable<IVProductProviderListPrice> = this.store.select(
    offerSelectors.selectedAsidePriceIncomeLevel,
  );
  hasChanges$: Observable<boolean> = this.store.select(offerSelectors.selectACHasChanges);
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  handlePriceForPanelSearch = debounce(this.searchPriceForPanel, DEFAULT_TIME_DEBOUNCE_SEARCH);
  selectedLevelConfigurationTab$: Observable<LevelConfigurationOption> = this.store.select(
    offerSelectors.selectedLevelConfigurationTab,
  );
  saveValidatorsBySteps$: Observable<boolean> = this.store.select(
    providerSelectors.selectSaveValidatorsBySteps,
  );
  alertPopUpdateBreakdown$: Observable<boolean> = this.store.select(
    offerSelectors.selectOfferAlertPopUpdateBreakdown,
  );
  popBreakdownIsOpen$: Observable<boolean> = this.store.select(
    offerSelectors.selectOfferPopBreakdownIsOpen,
  );
  selectedFamily: Observable<IVTrademarkFamily> = this.store.select(offerSelectors.selectedFamily);
  selectedCatIndustryBrand: Observable<IVMarcaFamiliaIndustriaObj> = this.store.select(
    offerSelectors.selectedCatIndustryBrandFamily,
  );
  selectedCatIndustryBrandFamily$: Observable<IVMarcaFamiliaIndustriaObj> = this.store.select(
    offerSelectors.selectedCatIndustryBrandFamily,
  );

  levels = Levels;
  popupIsOpen = false;
  popupTarget: HTMLElement;
  popupText = '';
  lodashIsEmpty = isEmpty;
  industryFamilyUpdated: VMarcaFamiliaIndustriaObj[]; // DOCS: SAVE UPDATED DATA FROM VIRTUAL-SCROLLER (vsUpdate)
  target: HTMLElement = null;

  constructor(private store: Store<AppState>) {
    this.target = null;
  }

  ngOnDestroy(): void {
    this.restoreDataPopBreakdown();
  }

  setTarget(value, catIndustryFamilyBrand: VMarcaFamiliaIndustriaObj) {
    this.target = document.getElementById(value.toString()) as HTMLElement;
    this.store.dispatch(offerActions.SET_TARGET_COMPONENT_EFFECT({catIndustryFamilyBrand}));
  }

  searchPriceForPanel(searchTerm: string) {
    this.store.dispatch(offerActions.SEARCH_PRICE_FOR_PANEL_COMPONENT_EFFECT({searchTerm}));
  }

  handleInputChange(value: string, field: string, itemId): void {
    this.store.dispatch(
      offerActions.SET_PROVIDER_PERFORMANCE_VALUE({
        field,
        value: value === '' ? null : Number(value),
        itemId,
      }),
    );
  }

  handleTrackBy(index: number, item: VMarcaFamiliaIndustriaObj): string {
    return item.IdMarcaFamiliaCatIndustria;
  }

  selectIncomeLevel(incomeLevel: string) {
    this.store.dispatch(offerActions.SET_INCOME_LEVEL_COMPONENT_EFFECT({incomeLevel}));
  }

  getIncomeLevels(incomeLevel: string) {
    return this.store.select(offerSelectors.selectAsidePriceIncomeLevelByName(incomeLevel));
  }

  handleOpenPopup(target, text: string) {
    this.popupTarget = target;
    this.popupText = text;
    this.popupIsOpen = true;
  }

  handleClosePopup() {
    this.popupIsOpen = false;
  }

  handleCloseBreakdownPopup() {
    this.target = null;
    this.restoreDataPopBreakdown();
  }

  restoreDataPopBreakdown() {
    this.store.dispatch(offerActions.SET_IS_OPEN_POP_BREAKDOWN({value: false}));
    this.store.dispatch(offerActions.SET_OPEN_POP_AFTER_SAVE({value: false}));
    this.store.dispatch(
      offerActions.SET_SELECTED_CAT_INDUSTRY_RAND_FAMILY({catIndustryFamilyBrand: null}),
    );
    this.store.dispatch(offerActions.RESET_ASIDE_PRICES());
  }

  getPricePageForPanel(value: number) {
    this.store.dispatch(offerActions.GET_PRICE_PAGE_FOR_PANEL_COMPONENT_EFFECT({value}));
  }

  handleClosePop(value: boolean) {
    this.store.dispatch(offerActions.SET_OPEN_ALERT_POP_UPDATE_BREAKDOWN({value: false}));
    if (value) {
      this.store.dispatch(offerActions.SAVE_CONFIGURATION_LOAD());
      this.store.dispatch(offerActions.SET_OPEN_POP_AFTER_SAVE({value: true}));
    }
  }
}
