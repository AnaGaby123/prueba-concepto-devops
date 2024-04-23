import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
/* Utils */
/* Actions Imports */

const FILE_NAME = 'Guide-Client-List.effects.ts';

@Injectable()
export class GuideClientListEffects {
  constructor(private store: Store, private actions$: Actions, private logger: NGXLogger) {}
}
