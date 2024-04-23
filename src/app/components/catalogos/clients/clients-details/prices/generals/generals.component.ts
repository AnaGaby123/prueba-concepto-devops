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
// Models
import {
  IOfferDeliveryRoutes,
  OfferFields,
  SubTabOptions,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
// Actions
import {pricesActions} from '@appActions/forms/client-form';
// Utils
import {OptionBar} from '@appModels/options-bar/options-bar';
import {IConfClient} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';

@Component({
  selector: 'app-generals',
  templateUrl: './generals.component.html',
  styleUrls: ['./generals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralsComponent implements AfterContentChecked {
  @Input() actualConfiguration: IConfClient;
  @Input() deliveryRoutes: IOfferDeliveryRoutes[];
  @Input() editMode: boolean;
  @Input() enableEdit: boolean;
  @Input() hasConfigurationProvider: boolean;
  @Input() isMexican: boolean;
  @Input() levelSubConfigurationTabs: OptionBar[];
  @Input() selectedLevelSubConfiguration: OptionBar;
  @Input() viewType: string;
  @Output() event: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() openConfig: EventEmitter<any> = new EventEmitter<any>();

  readonly fields = OfferFields;
  readonly subTabs = SubTabOptions;
  readonly viewTypes = AppViewTypes;

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
}
