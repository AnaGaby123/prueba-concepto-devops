// Core
import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
// Models
import {OfferFields} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
// Actions
import {pricesActions} from '@appActions/forms/client-form';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {IConfClient} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';

@Component({
  selector: 'app-fixed',
  templateUrl: './fixed.component.html',
  styleUrls: ['./fixed.component.scss'],
})
export class FixedComponent {
  readonly inputValidators = InputValidators;
  @Input() actualConfiguration: IConfClient;
  @Input() enableEdit: boolean;
  @Input() isMexican: boolean;
  readonly fields = OfferFields;

  constructor(private store: Store<AppState>) {}

  handleInputChange(value: string, field: string): void {
    this.store.dispatch(
      pricesActions.SET_CLIENT_PRICE_CONFIGURATION_FIELD_DATA({
        field,
        value: value === '' ? null : Number(value),
      }),
    );
  }
}
