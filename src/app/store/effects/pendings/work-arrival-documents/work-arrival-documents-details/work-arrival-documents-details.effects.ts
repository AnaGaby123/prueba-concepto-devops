import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';

const FILE_NAME = 'work-arrival-documents-details.effects.ts';

@Injectable()
export class WorkArrivalDocumentsDetailsEffects {
  constructor(private store: Store, private actions$: Actions, private logger: NGXLogger) {}
}
