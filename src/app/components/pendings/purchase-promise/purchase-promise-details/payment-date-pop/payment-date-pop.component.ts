import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {Observable} from 'rxjs';
import {selectViewType} from '@appSelectors/utils/utils.selectors';

@Component({
  selector: 'app-payent-date-pop',
  templateUrl: './payment-date-pop.component.html',
  styleUrls: ['./payment-date-pop.component.scss'],
})
export class PaymentDatePopComponent {
  readonly viewTypes = AppViewTypes;

  viewType$: Observable<string> = this.store.select(selectViewType);

  constructor(private store: Store<AppState>) {}
}
