import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {logisticConfigurationDetailsActions} from '@appActions/pendings/new-product-existing-supplier/logistic-configuration/index';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {logisticConfigurationDetailsSelectors} from '@appSelectors/pendings/new-product-existing-supplier/logistic-configuration/index';
import {EMPTY} from 'rxjs';
import {isEmpty} from 'lodash-es';

const FILE_NAME = '[logistic-configuration-details-methods.effects.ts]';

@Injectable()
export class LogisticConfigurationDetailsMethodsEffects {
  constructor(private action$: Actions, private store: Store) {}

  //DOCS: ACCIONES  AL SELECCIONAR UNA FAMILIA DE LA LISTA
  setFamilyItemMethods$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(logisticConfigurationDetailsActions.SET_FAMILY_ITEM_METHODS),
        withLatestFrom(
          this.store.select(logisticConfigurationDetailsSelectors.selectHasChangesFamilySelected),
          this.store.select(
            logisticConfigurationDetailsSelectors.selectLogisticConfigurationSelected,
          ),
        ),
        mergeMap(([{family}, hasChanges, logisticConfiguration]) => {
          if (hasChanges) {
            this.store.dispatch(logisticConfigurationDetailsActions.SHOW_POP_UP({value: true}));
            this.store.dispatch(
              logisticConfigurationDetailsActions.SET_PRESELECTED_FAMILY({
                preSelectedFamily: family,
              }),
            );
          } else if (
            logisticConfiguration.IdCotPartidaCotizacionInvestigacion !==
            family.IdCotPartidaCotizacionInvestigacion
          ) {
            this.store.dispatch(
              logisticConfigurationDetailsActions.SET_SELECTED_FAMILY({selectedFamily: family}),
            );
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  //DOCS: EVENTOS DEL POP UP
  eventEmitterPopUpMethods = createEffect(
    () =>
      this.action$.pipe(
        ofType(logisticConfigurationDetailsActions.SET_EVENT_POP_UP),
        withLatestFrom(
          this.store.select(logisticConfigurationDetailsSelectors.selectPreselectedFamily),
        ),
        mergeMap(([{popUp}, preSelectedFamily]) => {
          if (popUp.value) {
            this.store.dispatch(
              logisticConfigurationDetailsActions.RESTORE_BACKUP_SELECTED_FAMILY(),
            );
            if (!isEmpty(preSelectedFamily)) {
              this.store.dispatch(
                logisticConfigurationDetailsActions.SET_SELECTED_FAMILY({
                  selectedFamily: preSelectedFamily,
                }),
              );
            }
          }
          this.store.dispatch(logisticConfigurationDetailsActions.SHOW_POP_UP({value: false}));
          this.store.dispatch(
            logisticConfigurationDetailsActions.SET_PRESELECTED_FAMILY({preSelectedFamily: {}}),
          );
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
