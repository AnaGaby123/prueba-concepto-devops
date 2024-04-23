// Actions
import {brandFormAction, brandFormDetailsAction} from '@appActions/forms/brand-form';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';
// Selectors
import {brandFormSelectors} from '@appSelectors/forms/brand-form';
// Utils
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {of} from 'rxjs';
import {TITLE_BRAND_FORM} from '@appModels/store/forms/brand-form/brand-form.models';

@Injectable({
  providedIn: 'root',
})
export class BrandFormDetailsMethodsEffects {
  constructor(
    private store: Store<AppState>,
    private action$: Actions,
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit$ = createEffect(() =>
    this.action$.pipe(
      ofType(brandFormDetailsAction.INIT_BRAND_DETAILS_EFFECT),
      map((action) => {
        this.store.dispatch(brandFormAction.SET_IS_IN_DETAILS({isInDetails: true}));
        this.store.dispatch(catalogsActions.GET_CAT_PAIS_LOAD());
        this.store.dispatch(brandFormDetailsAction.FETCH_ITEMS_DETAILS_LOAD());
        return brandFormDetailsAction.GENERATE_BRAND_BACKUP();
      }),
    ),
  );

  ngOnDestroy$ = createEffect(() =>
    this.action$.pipe(
      ofType(brandFormDetailsAction.DESTROY_BRAND_DETAILS_EFFECT),
      map((action) => {
        this.store.dispatch(brandFormAction.SET_TITLE({title: TITLE_BRAND_FORM}));
        this.store.dispatch(brandFormAction.SET_IS_IN_DETAILS({isInDetails: false}));
        this.store.dispatch(brandFormAction.SET_ALLOW_TO_DETAILS({allowToDetails: false}));
        return brandFormDetailsAction.SET_INITIAL_STATE();
      }),
    ),
  );

  // DOCS: ACCIONES PARA LOS POPS
  // TODO: VALIDAR SI SE CONSERVA AL CONVERTIR EL MODAL A DIALOG
  popActions$ = createEffect(() =>
    this.action$.pipe(
      ofType(brandFormDetailsAction.HANDLE_POP_ACTIONS),
      withLatestFrom(this.store.select(brandFormSelectors.selectPopAlertBrand)),
      mergeMap(([action, popAlert]) => {
        switch (popAlert.type) {
          case 'exit':
            if (!action.value) {
              this.location.back();
            }
            break;
          case 'cancel':
            if (!action.value) {
              this.store.dispatch(brandFormDetailsAction.RESTORE_BACKUP());
            }
            break;
          case 'save':
            if (action.value) {
              this.store.dispatch(brandFormDetailsAction.HANDLE_SAVE_BRAND_LOAD());
            }
            break;
        }
        return of(
          brandFormAction.SET_POP_BRAND_IS_OPEN({
            popAlert: {
              type: '',
              message: '',
              isOpen: false,
            },
          }),
        );
      }),
    ),
  );
}
