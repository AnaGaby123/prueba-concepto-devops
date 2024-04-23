import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';

const FILE_NAME = 'work-arrival-documents-list.effects.ts';

@Injectable()
export class WorkArrivalDocumentsListEffects {
  constructor(private store: Store, private actions$: Actions, private logger: NGXLogger) {}
}
