import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {isEmpty} from 'lodash-es';

import {salesConfigurationDetailsActions} from '@appActions/pendings/new-product-existing-supplier/sales-configuration';
import {salesConfigurationDetailsSelectors} from '@appSelectors/pendings/new-product-existing-supplier/sales-configuration';

const FILE_NAME = 'sales-configuration-methods.effects.ts';

@Injectable({
  providedIn: 'root',
})
export class SalesConfigurationMethodsEffects {
  constructor(private store: Store, private actions$: Actions, private logger: NGXLogger) {}

  setFamilyItemMethods = createEffect(
    () =>
      this.actions$.pipe(
        ofType(salesConfigurationDetailsActions.SET_FAMILY_ITEM_METHODS),
        withLatestFrom(
          this.store.select(salesConfigurationDetailsSelectors.selectHasChangesConfiguration),
          this.store.select(salesConfigurationDetailsSelectors.selectedFamily),
        ),
        mergeMap(([{family}, hasChanges, selectedFamily]) => {
          if (
            family.IdCotPartidaCotizacionInvestigacion ===
            selectedFamily.IdCotPartidaCotizacionInvestigacion
          ) {
            return EMPTY;
          }
          if (hasChanges) {
            this.store.dispatch(salesConfigurationDetailsActions.ACTIVE_POP_UP({value: true}));
            this.store.dispatch(
              salesConfigurationDetailsActions.SET_PRESELECTED_FAMILY({preSelectedFamily: family}),
            );
          } else {
            this.store.dispatch(salesConfigurationDetailsActions.SET_SELECTED_FAMILY({family}));
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
  eventEmitterPopUpMethods = createEffect(
    () =>
      this.actions$.pipe(
        ofType(salesConfigurationDetailsActions.SET_EVENT_EMITTER_POP_UP_METHODS),
        withLatestFrom(
          this.store.select(salesConfigurationDetailsSelectors.selectPreSelectedFamily),
        ),
        mergeMap(([{popUp}, preSelectedFamily]) => {
          if (popUp.value) {
            this.store.dispatch(salesConfigurationDetailsActions.RESTORE_BACKUP_SELECTED_FAMILY());
            if (!isEmpty(preSelectedFamily)) {
              this.store.dispatch(
                salesConfigurationDetailsActions.SET_SELECTED_FAMILY({family: preSelectedFamily}),
              );
            }
          }
          this.store.dispatch(salesConfigurationDetailsActions.ACTIVE_POP_UP({value: false}));
          this.store.dispatch(
            salesConfigurationDetailsActions.SET_PRESELECTED_FAMILY({preSelectedFamily: {}}),
          );
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
