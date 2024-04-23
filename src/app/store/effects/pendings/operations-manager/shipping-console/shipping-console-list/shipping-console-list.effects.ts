import {Store} from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';

/*Models Imports*/

const FILE_NAME = 'Shipping-Console-List';

export class ShippingConsoleListEffects {
  constructor(private store: Store, private actions$: Actions, private logger: NGXLogger) {}
}
