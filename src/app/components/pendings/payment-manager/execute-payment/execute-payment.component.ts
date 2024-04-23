import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

// Selectors
import {executePaymentSelectors} from '@appSelectors/pendings/payment-manager';

@Component({
  selector: 'app-execute-payment',
  templateUrl: './execute-payment.component.html',
  styleUrls: ['./execute-payment.component.scss'],
})
export class ExecutePaymentComponent {
  title$: Observable<string> = this.store.select(executePaymentSelectors.selectTitle);

  constructor(private store: Store<AppState>) {}
}
