import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Actions, createEffect, ofType} from '@ngrx/effects';

// Actions
// Selectors
// Utils
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {brandFormAction, brandFormDetailsAction} from '@appActions/forms/brand-form';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {brandFormSelectorsDetails} from '@appSelectors/forms/brand-form';
import {EMPTY, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandFormMethodsEffects {
  constructor(
    private store: Store<AppState>,
    private action$: Actions,
    private router: Router,
    private location: Location,
  ) {}

  goBack$ = createEffect(() =>
    this.action$.pipe(
      ofType(brandFormAction.GO_BACK),
      withLatestFrom(
        this.store.select(brandFormSelectorsDetails.brandDataHasChanges),
        this.store.select(brandFormSelectorsDetails.selectItemsHasChanges),
      ),
      mergeMap(([action, dataHasChanges, itemsHasChanges]) => {
        if (dataHasChanges || itemsHasChanges) {
          this.store.dispatch(brandFormDetailsAction.FORCE_ERRORS({value: true}));
          return of(
            brandFormAction.SET_POP_BRAND_IS_OPEN({
              popAlert: {
                type: 'exit',
                message: 'common.exitMessage',
                isOpen: true,
              },
            }),
          );
        } else {
          this.location.back();
          return EMPTY;
        }
      }),
    ),
  );
}
