import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';

const FILE_NAME = 'shipping-paid-by-customer-details.effects.ts';

@Injectable()
export class ShippingPaidByCustomerDetailsEffects {
  constructor(private store: Store, private actions$: Actions, private logger: NGXLogger) {}
}
