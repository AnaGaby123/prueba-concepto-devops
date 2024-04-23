import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  IVProductListPriceConfiguration,
  Levels,
  OfferFields,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';

@Component({
  selector: 'app-list-price-item',
  templateUrl: './list-price-item.component.html',
  styleUrls: ['./list-price-item.component.scss'],
})
export class ListPriceItemComponent {
  @Input() price: IVProductListPriceConfiguration;
  @Output() selectedPriceChange: EventEmitter<IVProductListPriceConfiguration> = new EventEmitter<
    IVProductListPriceConfiguration
  >();

  readonly fields = OfferFields;
  readonly levels = Levels;

  handleSelectedPriceChange(): void {
    this.selectedPriceChange.emit(this.price);
  }
}
