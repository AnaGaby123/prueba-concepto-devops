import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {EMPTY} from 'rxjs';

//  Actions
// Selectors
// Models
// Services
import {mergeMap} from 'rxjs/operators';
import {AppState} from '@appCore/core.state';
import {generalDataProviderActions, providersDetailsActions} from '@appActions/forms/providers';

@Injectable({
  providedIn: 'root',
})
export class ProvidersDetailsEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  saveProviderData = createEffect(
    () =>
      this.actions$.pipe(
        ofType(providersDetailsActions.SAVE_PROVIDER_DATA),
        mergeMap((action) => {
          this.store.dispatch(generalDataProviderActions.SAVE_GENERAL_DATA_LOAD());
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
