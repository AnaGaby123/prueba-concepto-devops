import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';

/*Models Imports*/

const FILE_NAME = 'Priority-Console-List';

@Injectable()
export class PriorityConsoleListEffects {
  constructor(private store: Store, private actions$: Actions, private logger: NGXLogger) {}
}
