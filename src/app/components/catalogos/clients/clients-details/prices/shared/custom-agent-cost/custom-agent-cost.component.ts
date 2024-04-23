// Core
import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
// Models
import {AppState} from '@appCore/core.state';
// Actions
import {pricesActions} from '@appActions/forms/client-form';
import {IConfClient} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';

@Component({
  selector: 'app-custom-agent-cost',
  templateUrl: './custom-agent-cost.component.html',
  styleUrls: ['./custom-agent-cost.component.scss'],
})
export class CustomAgentCostComponent {
  @Input() actualConfiguration: IConfClient;
  @Input() editMode: boolean;
  @Input() enableEdit: boolean;
  @Input() viewType: string;
  @Input() isMexican: boolean;

  constructor(private store: Store<AppState>) {}

  handleInputChange(value: string, field: string): void {
    this.store.dispatch(
      pricesActions.SET_CLIENT_PRICE_CONFIGURATION_FIELD_DATA({
        field,
        value: value === '' ? null : Number(value),
      }),
    );
  }
}
