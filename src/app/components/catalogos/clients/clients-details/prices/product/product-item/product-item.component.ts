// CORE
import {AppState} from '@appCore/core.state';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
// MODELS
import {
  Levels,
  OfferFields,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {IVClientProductConfiguration} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';
// SELECTORS
import * as generalClientSelectors from '@appSelectors/forms/clients-form/clients-details/clients-form-general-data.selectors';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product: IVClientProductConfiguration;
  @Output() selectedProductChange: EventEmitter<IVClientProductConfiguration> = new EventEmitter<
    IVClientProductConfiguration
  >();
  selectClientIncomeLevel$: Observable<string> = this.store.select(
    generalClientSelectors.selectClientIncomeLevel,
  );
  readonly fields = OfferFields;
  readonly levels = Levels;

  constructor(private store: Store<AppState>) {}

  handleSelectedProductChange(): void {
    this.selectedProductChange.emit(this.product);
  }
}
