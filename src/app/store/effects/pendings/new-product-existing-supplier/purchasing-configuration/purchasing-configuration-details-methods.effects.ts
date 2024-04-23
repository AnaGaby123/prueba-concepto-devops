import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {purchasingConfigurationActions} from '@appActions/pendings/new-product-existing-supplier/purchasing-configuration';
import {purchasingConfigurationDetailsSelectors} from '@appSelectors/pendings/new-product-existing-supplier/purchasing-configuration';
import {isEmpty} from 'lodash-es';

const FILE_NAME = 'purchasinq-configuration-details-methods.effects.ts';

@Injectable({
  providedIn: 'root',
})
export class PurchasingConfigurationDetailsMethodsEffects {
  constructor(private store: Store, private actions$: Actions) {}

  setFamilyItemMethods = createEffect(
    () =>
      this.actions$.pipe(
        ofType(purchasingConfigurationActions.SET_FAMILY_ITEM_METHODS),
        withLatestFrom(
          this.store.select(purchasingConfigurationDetailsSelectors.selectHasChangesFamilySelected),
          this.store.select(purchasingConfigurationDetailsSelectors.selectFamilySelected),
        ),
        mergeMap(([{family}, hasChanges, selectedFamily]) => {
          if (
            selectedFamily.IdCotPartidaCotizacionInvestigacion ===
            family.IdCotPartidaCotizacionInvestigacion
          ) {
            return EMPTY;
          }
          if (hasChanges) {
            this.store.dispatch(purchasingConfigurationActions.ACTIVE_POP({value: true}));
            this.store.dispatch(
              purchasingConfigurationActions.SET_PRESELECTED_FAMILY({preSelectedFamily: family}),
            );
          } else {
            this.store.dispatch(purchasingConfigurationActions.SET_FAMILY_ITEM({family}));
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  eventEmitterPopUpMethods = createEffect(
    () =>
      this.actions$.pipe(
        ofType(purchasingConfigurationActions.SET_EVENT_EMITTER_POP_UP_METHODS),
        withLatestFrom(
          this.store.select(purchasingConfigurationDetailsSelectors.selectPreSelectedFamily),
        ),
        mergeMap(([{popUp}, preSelectedFamily]) => {
          if (popUp.value) {
            this.store.dispatch(purchasingConfigurationActions.RESTORE_BACKUP_SELECTED_FAMILY());
            if (!isEmpty(preSelectedFamily)) {
              this.store.dispatch(
                purchasingConfigurationActions.SET_FAMILY_ITEM({family: preSelectedFamily}),
              );
            }
          }
          this.store.dispatch(purchasingConfigurationActions.ACTIVE_POP({value: false}));
          this.store.dispatch(
            purchasingConfigurationActions.SET_PRESELECTED_FAMILY({preSelectedFamily: {}}),
          );
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
