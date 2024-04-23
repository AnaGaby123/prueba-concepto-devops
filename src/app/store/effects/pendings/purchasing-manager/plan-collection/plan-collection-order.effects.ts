import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {planCollectionActions} from '@appActions/pendings/purchasing-manager/manage-back-order';
import {mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';
import {Router} from '@angular/router';
import {appRoutes} from '@appHelpers/core/app-routes';

const FILE_NAME = 'plan-collection';

@Injectable()
export class PlanCollectionEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private router: Router,
  ) {}

  setProvider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(planCollectionActions.SET_PROVIDER_SELECTED),
      mergeMap((action) => {
        this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.planCollection.planCollection,
          appRoutes.planCollection.details,
        ]);
        /*
        this.store.dispatch(manageBackOrderDetailsActions.LOAD_CONTACTS_PROVIDER());
        this.store.dispatch(manageBackOrderDetailsActions.FETCH_FAMILIES_LOAD());
*/
        return of(RETURN_EMPTY());
      }),
    ),
  );
}
