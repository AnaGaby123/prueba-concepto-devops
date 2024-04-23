// Core
import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppState} from '@appCore/core.state';
// MODELS
import {
  OfferFields,
  OfferToggleOptions,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
// ACTIONS
// SELECTORS
import {clientPricesSelectors} from '@appSelectors/forms/clients-form';
import {
  IConfClient,
  IVClientProductConfiguration,
  IVProductListPriceConfigurationClient,
} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';
import {VMarcaFamilia} from 'api-catalogos';
import {buildStringFamily} from '@appUtil/strings';

@Component({
  selector: 'app-provider-list-price',
  templateUrl: './provider-list-price.component.html',
  styleUrls: ['./provider-list-price.component.scss'],
})
export class ProviderListPriceComponent {
  @Input() actualConfiguration: IConfClient;
  @Input() activeConsolidatedCheck = true;
  @Input() editMode: boolean;
  @Input() enableEdit: boolean;
  @Input() price: IVProductListPriceConfigurationClient | IVClientProductConfiguration;
  @Input() showListPrice: boolean;
  @Input() viewType: string;
  @Input() isMexican: boolean;

  selectToggleSwitchOptions$: Observable<Array<DropListOption>> = this.store.select(
    clientPricesSelectors.selectToggleSwitchOptions,
  );
  selectedTrademarkConsolidation$: Observable<Array<VMarcaFamilia>> = this.store.select(
    clientPricesSelectors.selectedTrademarkConsolidation,
  );
  readonly fields = OfferFields;
  readonly toggleOptions = OfferToggleOptions;

  constructor(private store: Store<AppState>) {}

  buildStringFamilyConsolidation = (family: VMarcaFamilia) =>
    buildStringFamily(family.Tipo, family.Subtipo, family.Control, ' ');
}
