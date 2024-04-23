import {Component, Input} from '@angular/core';
import {OfferFields} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {Store} from '@ngrx/store';
import {purchasingConfigurationActions} from '@appActions/pendings/new-product-existing-supplier/purchasing-configuration';
import {IConfProveedorCompra} from '@appModels/store/pendings/new-product-existing-supplier/purchasing-configuration/purchasing-configuration-details.model';
import {
  DropListOptionPqf,
  DropListOptionsPqf,
} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';
import {Observable} from 'rxjs';
import {selectCustomsAgentsListForDropDownPqf} from '@appSelectors/catalogs/catalogs.selectors';
import {
  selectCustomsAgentsConceptListForDrop,
  selectCustomsListForDrop,
} from '@appSelectors/pendings/new-product-existing-supplier/purchasing-configuration/purchasing-configuration-details.selectors';

@Component({
  selector: 'app-custom-agents',
  templateUrl: './custom-agents.component.html',
  styleUrls: ['./custom-agents.component.scss'],
})
export class CustomAgentsComponent {
  @Input() actualConfiguration: IConfProveedorCompra;
  readonly fields = OfferFields;
  readonly inputTypes = InputValidators;

  customsAgentsList$: Observable<DropListOptionsPqf> = this.store.select(
    selectCustomsAgentsListForDropDownPqf,
  );
  customsList$: Observable<DropListOptionsPqf> = this.store.select(selectCustomsListForDrop);
  customsAgentConceptsList$: Observable<DropListOptionsPqf> = this.store.select(
    selectCustomsAgentsConceptListForDrop,
  );

  constructor(private store: Store) {}

  handleInputChange(value: string, field: string): void {
    this.store.dispatch(
      purchasingConfigurationActions.SET_FAMILY_PROVIDER_PRICE_CONFIGURATION_VALUE({
        field,
        value: value === '' ? null : Number(value),
      }),
    );
  }

  handleCustomsInputChange(value: DropListOptionPqf, field: string): void {
    this.store.dispatch(
      purchasingConfigurationActions.SET_CUSTOMS_AGENT_CONFIGURATION_VALUE({
        field,
        value,
      }),
    );
  }
}
