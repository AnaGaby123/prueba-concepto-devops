import {Component, Input} from '@angular/core';
import {
  IConfProvider,
  OfferFields,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {offerActions} from '@appActions/forms/providers';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {InputValidators} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent {
  @Input() actualConfiguration: IConfProvider;
  @Input() editMode: boolean;
  @Input() enableEdit: boolean;
  @Input() viewType: string;

  readonly fields = OfferFields;
  readonly inputValidators = InputValidators;

  constructor(private store: Store<AppState>) {}

  saveInputValue(field: string, value: string): void {
    this.store.dispatch(
      offerActions.SET_PROVIDER_PRICE_CONFIGURATION_VALUE({
        field,
        value: value === '' ? null : Number(value),
      }),
    );
  }
}
