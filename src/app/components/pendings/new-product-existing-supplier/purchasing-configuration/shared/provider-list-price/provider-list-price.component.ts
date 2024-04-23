import {Component, Input} from '@angular/core';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {OfferFields} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {Store} from '@ngrx/store';
import {purchasingConfigurationActions} from '@appActions/pendings/new-product-existing-supplier/purchasing-configuration';
import {
  IConfProveedorCompra,
  IVMarcaFamilia,
} from '@appModels/store/pendings/new-product-existing-supplier/purchasing-configuration/purchasing-configuration-details.model';
import {
  DropListOptionPqf,
  DropListOptionsPqf,
} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';
import {Observable} from 'rxjs';
import {purchasingConfigurationDetailsSelectors} from '@appSelectors/pendings/new-product-existing-supplier/purchasing-configuration';
import {buildStringFamily} from '@appUtil/strings';

@Component({
  selector: 'app-provider-list-price',
  templateUrl: './provider-list-price.component.html',
  styleUrls: ['./provider-list-price.component.scss'],
})
export class ProviderListPriceComponent {
  @Input() isMexican: boolean;
  @Input() actualConfiguration: IConfProveedorCompra;
  trademarkFamiliesOptions$: Observable<DropListOptionsPqf> = this.store.select(
    purchasingConfigurationDetailsSelectors.selectTrademarkFamiliesListForDropDown,
  );
  trademarkFamiliesConsolidation$: Observable<Array<IVMarcaFamilia>> = this.store.select(
    purchasingConfigurationDetailsSelectors.selectTrademarkFamilyProviderConsolidation,
  );
  readonly fields = OfferFields;
  readonly inputTypes = InputValidators;

  constructor(private store: Store) {}

  handleInputChange(value: DropListOptionPqf | string, field: string): void {
    this.store.dispatch(
      purchasingConfigurationActions.SET_FAMILY_PROVIDER_PRICE_CONFIGURATION_VALUE({
        field,
        value:
          field === this.fields.selectedToggleSwitchOption
            ? (value as DropListOptionPqf)
            : value === ''
            ? null
            : Number(value),
      }),
    );
  }

  handleCheckChange(value: boolean, field: string): void {
    this.store.dispatch(
      purchasingConfigurationActions.SET_TRADEMARK_FAMILY_PROVIDER_CONFIGURATION_VALUE({
        field,
        value,
      }),
    );
  }

  handleToggleChange(value): void {
    this.store.dispatch(purchasingConfigurationActions.SET_PRICE_lIST_TOGGLE_CHANGE({value}));
  }

  handleItemCheckChange(item: DropListOptionPqf): void {
    this.store.dispatch(
      purchasingConfigurationActions.SET_TRADEMARK_FAMILY_ITEM_IS_SELECTED({
        item,
      }),
    );
  }

  buildStringFamilyConsolidation = (family: IVMarcaFamilia) =>
    buildStringFamily(family.Tipo, family.Subtipo, family.Control, '·');
}
