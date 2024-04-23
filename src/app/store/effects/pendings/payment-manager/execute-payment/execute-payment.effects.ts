import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';

// Utils

const FILE_NAME = 'execute-payment.effects.ts';

@Injectable()
export class ExecutePaymentEffects {
  constructor(private action$: Actions, private store: Store, private logger: NGXLogger) {}
}
