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
  selector: ' app-discount-freight',
  templateUrl: './discount-freight.component.html',
  styleUrls: ['./discount-freight.component.scss'],
})
export class DiscountFreightComponent {
  @Input() actualConfiguration: IConfProvider;
  @Input() editMode: boolean;
  @Input() enableEdit: boolean;
  @Input() viewType: string;
  @Input() isMexican: boolean;

  fields = OfferFields;
  readonly inputValidators = InputValidators;

  constructor(private store: Store<AppState>) {}

  handleInputChange(field: string, value: string): void {
    this.store.dispatch(
      offerActions.SET_PROVIDER_PRICE_CONFIGURATION_VALUE({
        field,
        value: value === '' ? null : Number(value),
      }),
    );
  }
}
