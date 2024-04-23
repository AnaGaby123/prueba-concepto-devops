import {Component, Input} from '@angular/core';
import {OfferFields} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {Store} from '@ngrx/store';
import {purchasingConfigurationActions} from '@appActions/pendings/new-product-existing-supplier/purchasing-configuration';
import {IConfProveedorCompra} from '@appModels/store/pendings/new-product-existing-supplier/purchasing-configuration/purchasing-configuration-details.model';

@Component({
  selector: 'app-discount-freight',
  templateUrl: './discount-freight.component.html',
  styleUrls: ['./discount-freight.component.scss'],
})
export class DiscountFreightComponent {
  @Input() isMexican: boolean;
  @Input() actualConfiguration: IConfProveedorCompra;
  readonly fields = OfferFields;
  readonly inputTypes = InputValidators;

  constructor(private store: Store) {}

  handleInputChange(field: string, value: string): void {
    this.store.dispatch(
      purchasingConfigurationActions.SET_PROVIDER_PRICE_CONFIGURATION_VALUE({
        field,
        value: value === '' ? null : Number(value),
      }),
    );
  }
}
