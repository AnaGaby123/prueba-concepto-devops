import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {AppState} from '@appCore/core.state';
import {providerActions} from '@appActions/forms/providers';
import {providerSelectors} from '@appSelectors/forms/providers';
import {Router} from '@angular/router';
import {appRoutes} from '@appHelpers/core/app-routes';

@Injectable()
export class ProviderMethodsEffects {
  constructor(private actions$: Actions, private store: Store<AppState>, private router: Router) {}

  returnMainPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(providerActions.RETURN_MAIN_PAGE_COMPONENT_EFFECT),
        withLatestFrom(this.store.select(providerSelectors.selectModeEdit)),
        mergeMap(([action, modeEdit]) => {
          if (modeEdit) {
            this.router.navigate([
              appRoutes.protected,
              appRoutes.catalogs.catalogs,
              appRoutes.catalogs.providers.providers,
              appRoutes.catalogs.providers.listProviders,
            ]);
          } else {
            this.router.navigate([appRoutes.protected, appRoutes.catalogs.catalogs]);
            this.store.dispatch(providerActions.CLEAN_ALL_PROVIDERS_STATE());
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
