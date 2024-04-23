// CORE
import {AppState} from '@appCore/core.state';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
// MODELS
import {IVProductListPriceConfigurationClient} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';
// SELECTORS
import * as generalClientSelectors from '@appSelectors/forms/clients-form/clients-details/clients-form-general-data.selectors';

@Component({
  selector: 'app-list-price-item',
  templateUrl: './list-price-item.component.html',
  styleUrls: ['./list-price-item.component.scss'],
})
export class ListPriceItemComponent {
  @Input() price: IVProductListPriceConfigurationClient;
  @Output() selectedPriceChange: EventEmitter<
    IVProductListPriceConfigurationClient
  > = new EventEmitter<IVProductListPriceConfigurationClient>();
  selectClientIncomeLevel$: Observable<string> = this.store.select(
    generalClientSelectors.selectClientIncomeLevel,
  );

  constructor(private store: Store<AppState>) {}

  handleSelectedPriceChange(): void {
    this.selectedPriceChange.emit(this.price);
  }
}
