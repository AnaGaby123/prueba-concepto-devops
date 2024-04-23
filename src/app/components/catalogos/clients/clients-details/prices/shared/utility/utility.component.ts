// Core
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
import {OfferFields} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
// Actions
import {pricesActions} from '@appActions/forms/client-form';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {IConfClient} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilityComponent implements AfterContentChecked {
  readonly inputValidators = InputValidators;
  @Input() actualConfiguration: IConfClient;
  @Input() enableEdit: boolean;
  @Input() viewType: string;
  @Input() isMexican: boolean;

  readonly fields = OfferFields;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  handleInputChange(value: string, field: string): void {
    this.store.dispatch(
      pricesActions.SET_CLIENT_PRICE_CONFIGURATION_FIELD_DATA({
        field,
        value: value === '' ? null : Number(value),
      }),
    );
  }
}
