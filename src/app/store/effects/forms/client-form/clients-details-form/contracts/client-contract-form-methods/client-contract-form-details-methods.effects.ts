// CORE
import {Injectable} from '@angular/core';
import {mergeMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
// MODELS
import {ProvidersTabOptions} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
// ACTIONS
import * as contractActions from '@appActions/forms/client-form/clients-details-form/client-contracts-form/client-contract.actions';

@Injectable()
export class ClientContractFormDetailsMethodsEffects {
  constructor(private action$: Actions, private store: Store) {}

  readonly tabOptions = ProvidersTabOptions;

  fetchMoreProviders$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(contractActions.ADD_STEPS_CONTRACT_COMPONENT_EFFECT),
        mergeMap(({val}) => {
          if (val < 0 || val === 2) {
            return EMPTY;
          }
          if (val === 0) {
            this.store.dispatch(
              contractActions.SET_ADD_CONTRACT_ACTUAL_STEP({
                addContractActualStep: val,
              }),
            );
          }
          if (val === 1) {
            this.store.dispatch(contractActions.VALIDATE_CONTRATO_CLIENTE_LOAD());
            this.store.dispatch(contractActions.SET_ADD_STEP_VALUE({addStep: true}));
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
