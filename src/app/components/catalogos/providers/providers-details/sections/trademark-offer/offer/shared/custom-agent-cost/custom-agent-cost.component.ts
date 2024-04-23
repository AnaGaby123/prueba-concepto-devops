import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

// Models
import {AppState} from '@appCore/core.state';
import {
  IConfProvider,
  OfferFields,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

// Actions
import {offerActions} from '@appActions/forms/providers';

// Selectors
import {
  selectCustomsAgentsConceptListForDrop,
  selectCustomsListForDrop,
} from '@appSelectors/forms/providers/providers-details/provider-form-step-8-offer.selectors';
import {selectCustomsAgentsListForDropDown} from '@appSelectors/catalogs/catalogs.selectors';
import {InputValidators} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-custom-agent-cost',
  templateUrl: './custom-agent-cost.component.html',
  styleUrls: ['./custom-agent-cost.component.scss'],
})
export class CustomAgentCostComponent {
  @Input() actualConfiguration: IConfProvider;
  @Input() editMode: boolean;
  @Input() enableEdit: boolean;
  @Input() viewType: string;
  readonly inputValidators = InputValidators;

  customsAgentsList$: Observable<Array<DropListOption>> = this.store.select(
    selectCustomsAgentsListForDropDown,
  );
  customsList$: Observable<Array<DropListOption>> = this.store.select(selectCustomsListForDrop);
  customsAgentConceptsList$: Observable<Array<DropListOption>> = this.store.select(
    selectCustomsAgentsConceptListForDrop,
  );

  readonly fields = OfferFields;

  constructor(private store: Store<AppState>) {}

  handleCustomsInputChange(value: DropListOption, field: string): void {
    this.store.dispatch(
      offerActions.SET_CUSTOMS_AGENT_CONFIGURATION_VALUE({
        field,
        value,
      }),
    );
  }

  handleInputChange(value: string, field: string): void {
    this.store.dispatch(
      offerActions.SET_FAMILY_PROVIDER_PRICE_CONFIGURATION_VALUE({
        field,
        value: value === '' ? null : Number(value),
      }),
    );
  }
}
