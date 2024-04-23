import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  IVProviderProductConfiguration,
  IVProviderProductPrice,
  Levels,
  OfferFields,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {find, isEmpty} from 'lodash-es';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product: IVProviderProductConfiguration;
  @Output() selectedProductChange: EventEmitter<IVProviderProductConfiguration> = new EventEmitter<
    IVProviderProductConfiguration
  >();

  readonly fields = OfferFields;
  readonly levels = Levels;

  isEmpty = isEmpty;

  getIncomeLevel(incomeLevelName: string): IVProviderProductPrice {
    const incomeLevel: IVProviderProductPrice = find(
      this.product.incomeLevelsValues,
      (o: IVProviderProductPrice) => o.NivelIngreso === incomeLevelName,
    );

    return incomeLevel || ({} as IVProviderProductPrice);
  }

  handleSelectedProductChange(): void {
    this.selectedProductChange.emit(this.product);
  }
}
