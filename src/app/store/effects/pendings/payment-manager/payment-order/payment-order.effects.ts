import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';

// Utils

const FILE_NAME = 'payment-order.effects.ts';

@Injectable()
export class PaymentOrderEffects {
  constructor(private action$: Actions, private store: Store, private logger: NGXLogger) {}
}
