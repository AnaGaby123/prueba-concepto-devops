import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

// Models
import {
  IConfProvider,
  IOfferDeliveryRoutes,
  OfferFields,
  SubTabOptions,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
// Actions
import {offerActions} from '@appActions/forms/providers';
// Utils
import {OptionBar} from '@appModels/options-bar/options-bar';
import {VMarcaFamiliaIndustriaObj} from 'api-catalogos';

@Component({
  selector: 'app-generals',
  templateUrl: './generals.component.html',
  styleUrls: ['./generals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralsComponent implements AfterContentChecked {
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
  rightPanelVisible: boolean;

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
}
