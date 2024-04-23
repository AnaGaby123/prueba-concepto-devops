// Core
import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
// Models
import {OfferFields} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
// Actions
import {IConfClient} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent {
  @Input() actualConfiguration: IConfClient;
  @Input() enableEdit: boolean;
  @Input() isMexican: boolean;
  readonly fields = OfferFields;

  constructor(private store: Store<AppState>) {}
}
