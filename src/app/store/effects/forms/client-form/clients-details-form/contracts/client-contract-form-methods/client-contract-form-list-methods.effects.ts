// CORE
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
// MODELS
import {ProvidersTabOptions} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
// ACTIONS
import * as contractActions from '@appActions/forms/client-form/clients-details-form/client-contracts-form/client-contract.actions';
// SELECTORS
import {clientContractsSelectors} from '@appSelectors/forms/clients-form';

@Injectable()
export class ClientContractFormListMethodsEffects {
  constructor(private action$: Actions, private store: Store) {}

  readonly tabOptions = ProvidersTabOptions;

  fetchMoreProviders$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(contractActions.SELECTED_CONTRACT_COMPONENT_EFFECT),
        withLatestFrom(this.store.select(clientContractsSelectors.selectedTabFilter)),
        mergeMap(([{contract, isEdition, typeAction}, tabSelected]) => {
          contract = {
            ...contract,
            isSelected: false,
          };
          if (!contract.isSelected || isEdition) {
            this.store.dispatch(
              contractActions.GET_DATAS_CONTRACT_LOAD({
                contract,
                isEdition,
                tabSelected: tabSelected.filter?.toLowerCase(),
                typeAction,
              }),
            );
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
