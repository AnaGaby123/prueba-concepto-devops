import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';

/*Models Imports*/

const FILE_NAME = 'Assign-Messenger-Charts';

@Injectable()
export class AssignMessengerChartsEffects {
  constructor(private store: Store, private actions$: Actions, private logger: NGXLogger) {}
}
