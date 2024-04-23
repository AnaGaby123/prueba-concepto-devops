import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import * as logisticAction from '@appActions/forms/providers/providers-details/provider-form-step-5-logistics-and-payments.actions';
import {mergeMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import * as catalogosActions from '@appActions/catalogs/catalogos.actions';

@Injectable()
export class ProviderFormStep5LogisticsAndPaymentsMethodsEffects {
  constructor(private action$: Actions, private store: Store) {}

  ngOnInit$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(logisticAction.NG_ON_INIT_COMPONENT_EFFECT),
        mergeMap((action) => {
          this.store.dispatch(catalogosActions.GET_CAT_MARCA_TARJETA_LOAD());
          this.store.dispatch(catalogosActions.GET_CAT_MEDIO_DE_PAGO_LOAD());
          this.store.dispatch(catalogosActions.GET_CAT_PAYMENT_CONDITIONS_LOAD());
          this.store.dispatch(catalogosActions.GET_CAT_BANK_LOAD());
          this.store.dispatch(catalogosActions.GET_CAT_UNIDAD_TIEMPO_LOAD());
          this.store.dispatch(logisticAction.GET_CAT_ROUTES_LOAD());
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
