import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';

import {
  validateAdjustmentActions,
  validateAdjustmentDetailActions,
} from '@appActions/pendings/validate-adjustment';

import {mergeMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {appRoutes} from '@appHelpers/core/app-routes';

const FILE_NAME = 'validate-adjustment-methods.effects.ts';

@Injectable()
export class ValidateAdjustmentMethodsEffects {
  constructor(private router: Router, private actions$: Actions, private store: Store<AppState>) {}

  //DOCS: REGRESAR (HEADER)
  goBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(validateAdjustmentActions.GO_BACK),
        mergeMap((action) => {
          this.store.dispatch(
            validateAdjustmentActions.SET_IS_IN_DETAILS_VIEW({
              isInDetailsView: false,
            }),
          );
          this.store.dispatch(
            validateAdjustmentActions.SET_ALLOWED_TO_DETAILS_VALUE({
              allowedToDetails: false,
            }),
          );
          this.store.dispatch(validateAdjustmentDetailActions.CLEAN_DETAILS());
          this.router.navigate([
            appRoutes.protected,
            appRoutes.pendings.pendings,
            appRoutes.validateAdjustment.validateAdjustment,
            appRoutes.validateAdjustment.dashboard,
          ]);
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
