// CORE
import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
// MODELS
import {OfferFields} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
// ACTIONS
import {pricesActions} from '@appActions/forms/client-form';
import {IConfClient} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent {
  @Input() actualConfiguration: IConfClient;
  @Input() editMode: boolean;
  @Input() enableEdit: boolean;
  @Input() viewType: string;
  @Input() isMexican: boolean;
  readonly fields = OfferFields;

  constructor(private store: Store<AppState>) {}

  // TODO revisar el id por defecto

  saveInputValue(field: string, value: string): void {
    this.store.dispatch(
      pricesActions.SET_CLIENT_PRICE_CONFIGURATION_FIELD_DATA({
        field,
        value: value === '' ? null : Number(value),
      }),
    );
  }
}
