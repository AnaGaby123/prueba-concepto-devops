import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppState} from '@appCore/core.state';
import {
  IConfProvider,
  IVProductListPriceConfiguration,
  IVProviderProductConfiguration,
  OfferFields,
  OfferToggleOptions,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {offerActions} from '@appActions/forms/providers';
import {offerSelectors} from '@appSelectors/forms/providers';

@Component({
  selector: 'app-provider-list-price',
  templateUrl: './provider-list-price.component.html',
  styleUrls: ['./provider-list-price.component.scss'],
})
export class ProviderListPriceComponent {
  @Input() actualConfiguration: IConfProvider;
  @Input() activeConsolidatedCheck = true;
  @Input() editMode: boolean;
  @Input() enableEdit: boolean;
  @Input() price: IVProductListPriceConfiguration | IVProviderProductConfiguration;
  @Input() showListPrice: boolean;
  @Input() isMexican: boolean;
  @Input() viewType: string;
  selectToggleSwitchOptions$: Observable<Array<DropListOption>> = this.store.select(
    offerSelectors.selectToggleSwitchOptions,
  );
  trademarkFamiliesOptions$: Observable<Array<DropListOption>> = this.store.select(
    offerSelectors.selectTrademarkFamiliesListForDropDown,
  );
  trademarkFamilies$: Observable<string> = this.store.select(
    offerSelectors.selectTrademarkFamiliesListForLabel,
  );

  readonly fields = OfferFields;
  readonly toggleOptions = OfferToggleOptions;

  constructor(private store: Store<AppState>) {}

  handleInputChange(value: DropListOption | string, field: string): void {
    this.store.dispatch(
      offerActions.SET_FAMILY_PROVIDER_PRICE_CONFIGURATION_VALUE({
        field,
        value:
          field === this.fields.selectedToggleSwitchOption
            ? (value as DropListOption)
            : value === ''
            ? null
            : Number(value),
      }),
    );
  }

  handleCheckChange(value: boolean, field: string): void {
    this.store.dispatch(
      offerActions.SET_TRADEMARK_FAMILY_PROVIDER_CONFIGURATION_VALUE({
        field,
        value,
      }),
    );
  }

  handleItemCheckChange(item: DropListOption): void {
    this.store.dispatch(
      offerActions.SET_TRADEMARK_FAMILY_ITEM_IS_SELECTED({
        item,
      }),
    );
  }
}
