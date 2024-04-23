import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

// Models
import {ICard} from '@appModels/card/card';
import {
  IConfProvider,
  IOfferDeliveryRoutes,
  LevelConfigurationOption,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';

// Actions
import {offerActions} from '@appActions/forms/providers';

// Selectors
import {offerSelectors, providerSelectors} from '@appSelectors/forms/providers';
import * as selectUtils from '@appSelectors/utils/utils.selectors';

// Utils
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {VMarcaFamiliaIndustriaObj} from 'api-catalogos';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferComponent implements OnInit, AfterContentChecked, OnDestroy {
  families$: Observable<Array<ICard>> = this.store.select(offerSelectors.selectFamiliesToCards);
  actualConfiguration$: Observable<IConfProvider> = this.store.select(
    offerSelectors.selectActualConfiguration,
  );
  levelConfigurationTabs$: Observable<LevelConfigurationOption[]> = this.store.select(
    offerSelectors.selectLevelConfigurationTabs,
  );
  selectedLevelConfigurationTab$: Observable<LevelConfigurationOption> = this.store.select(
    offerSelectors.selectedLevelConfigurationTab,
  );
  levelSubConfigurationTabs$: Observable<OptionBar[]> = this.store.select(
    offerSelectors.selectLevelsSubConfigurationsTab,
  );
  selectedLevelSubConfiguration$: Observable<OptionBar> = this.store.select(
    offerSelectors.selectedLevelSubConfigurationTab,
  );
  deliveryRoutes$: Observable<IOfferDeliveryRoutes[]> = this.store.select(
    offerSelectors.selectACDeliveryRoutes,
  );
  editMode$: Observable<boolean> = this.store.select(providerSelectors.selectModeEdit);
  enableEdit$: Observable<boolean> = this.store.select(providerSelectors.selectEnableEdit);
  providerIsMexican$: Observable<boolean> = this.store.select(
    offerSelectors.selectProviderIsMexican,
  );
  industryFamily$: Observable<Array<VMarcaFamiliaIndustriaObj>> = this.store.select(
    offerSelectors.selectIndustryFamilyList,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  readonly viewTypes = AppViewTypes;
  typesOfPop = {
    family: 'family',
    levelConfigurationTab: 'levelConfigurationTab',
  };
  typeOfPop: string;

  // TODO: cambiar por selector para validar si se va a mostrar
  disponible = true;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.store.dispatch(offerActions.GET_INITIAL_CONFIGURATION());
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.store.dispatch(offerActions.SET_INITIAL_STATE_OFFER());
  }

  handleSelectedFamilyChange(selectedFamily: ICard): void {
    this.typeOfPop = this.typesOfPop.family;
    this.store.dispatch(
      offerActions.HANDLE_SELECTED_FAMILY_CHANGED_COMPONENT_EFFECT({
        selectedFamily,
      }),
    );
    this.store.dispatch(offerActions.SET_IS_OPEN_POP_BREAKDOWN({value: false}));
    this.store.dispatch(offerActions.SET_OPEN_POP_AFTER_SAVE({value: false}));
    this.store.dispatch(
      offerActions.SET_SELECTED_CAT_INDUSTRY_RAND_FAMILY({catIndustryFamilyBrand: null}),
    );
    this.store.dispatch(offerActions.RESET_ASIDE_PRICES());
  }

  async handleLevelConfigurationTabChange(
    selectedLevelConfigurationTab: LevelConfigurationOption,
  ): Promise<void> {
    this.typeOfPop = this.typesOfPop.levelConfigurationTab;
    this.store.dispatch(
      offerActions.HANDLE_LEVEL_CONFIG_TAB_CHANGE_COMPONENT_EFFECT({
        selectedLevelConfigurationTab,
        typeOfPop: this.typesOfPop.levelConfigurationTab,
      }),
    );
  }
}
