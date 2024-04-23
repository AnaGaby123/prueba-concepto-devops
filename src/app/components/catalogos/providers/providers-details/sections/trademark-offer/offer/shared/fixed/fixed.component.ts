import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

// Models
import {
  IConfProvider,
  OfferFields,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';

// Actions
import {offerActions} from '@appActions/forms/providers';
import {InputValidators} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-fixed',
  templateUrl: './fixed.component.html',
  styleUrls: ['./fixed.component.scss'],
})
export class FixedComponent {
  @Input() actualConfiguration: IConfProvider;
  @Input() enableEdit: boolean;
  @Input() isMexican: boolean;

  readonly fields = OfferFields;
  readonly inputValidators = InputValidators;

  constructor(private store: Store<AppState>) {}

  handleInputChange(value: string, field: string): void {
    if (field === this.fields.FactorDeCostoFijo) {
      this.store.dispatch(
        offerActions.SET_PROVIDER_PRICE_CONFIGURATION_VALUE({
          field,
          value: value === '' ? null : Number(value),
        }),
      );
    } else {
      this.store.dispatch(
        offerActions.SET_FAMILY_PROVIDER_PRICE_CONFIGURATION_VALUE({
          field,
          value: value === '' ? null : Number(value),
        }),
      );
    }
  }
}
