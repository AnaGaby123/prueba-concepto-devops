import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {
  OfferFields,
  OfferToggleOptions,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {VMarcaFamilia} from 'api-catalogos';
import {clientContractsSelectors} from '@appSelectors/forms/clients-form';
import {buildStringFamily} from '@appUtil/strings';
import {
  IConfContratoCliente,
  IVPrecioListaClienteProductoContrato,
  IVPrecioProductoCliente,
} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';

@Component({
  selector: 'app-provider-list-price',
  templateUrl: './provider-list-price.component.html',
  styleUrls: ['./provider-list-price.component.scss'],
})
export class ProviderListPriceComponent {
  @Input() activeConsolidatedCheck = true;
  @Input() actualConfiguration: IConfContratoCliente;
  @Input() editMode: boolean;
  @Input() enableEdit: boolean;
  @Input() isMexican: boolean;
  @Input() price: IVPrecioListaClienteProductoContrato | IVPrecioProductoCliente;
  @Input() showListPrice: boolean;
  @Input() viewType: string;
  readonly fields = OfferFields;
  readonly toggleOptions = OfferToggleOptions;
  selectToggleSwitchOptions$: Observable<Array<DropListOption>> = this.store.select(
    clientContractsSelectors.selectToggleSwitchOptions,
  );
  selectedTrademarkConsolidation$: Observable<Array<VMarcaFamilia>> = this.store.select(
    clientContractsSelectors.selectedTrademarkConsolidation,
  );

  constructor(private store: Store<AppState>) {}

  buildStringFamilyConsolidation = (family: VMarcaFamilia) =>
    buildStringFamily(family.Tipo, family.Subtipo, family.Control, ' ');
}
