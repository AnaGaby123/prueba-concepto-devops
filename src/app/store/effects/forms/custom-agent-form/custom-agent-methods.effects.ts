/*CORE*/
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {Location} from '@angular/common';
/*MODELS*/
/*ACTIONS*/
import {customAgentActions, customAgentDetailsActions} from '@appActions/forms/custom-agent-form';
/*SELECTORS*/
import {
  customAgentsDetailsSelectors,
  customAgentsSelectors,
} from '@appSelectors/forms/custom-agents-form';
import {appRoutes} from '@appHelpers/core/app-routes';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';

@Injectable()
export class CustomAgentMethodsEffects {
  constructor(
    private action$: Actions,
    private store: Store,
    private router: Router,
    private location: Location,
  ) {}

  // FOOTER
  // ACCIONES PARA AGREGAR O DITAR SEGUN SEA EL BOTON
  handleAddOrEdit$ = createEffect(() =>
    this.action$.pipe(
      ofType(customAgentDetailsActions.ADD_OR_EDIT_COMPONENT_EFFECT),
      withLatestFrom(this.store.select(customAgentsDetailsSelectors.selectedTabOption)),
      mergeMap(([action, selectedTab]) => {
        this.store.dispatch(customAgentActions.SET_ALLOW_TO_DETAILS({allowToDetails: true}));
        this.store.dispatch(customAgentActions.SET_ENABLE_EDIT({enableEdit: true}));
        this.store.dispatch(customAgentDetailsActions.GENERATE_BACKUP({tabOption: selectedTab}));
        if (action.mode === 'edit') {
          this.store.dispatch(customAgentActions.SET_TITLE({title: 'VER AGENTE ADUANAL'}));
        } else {
          this.store.dispatch(customAgentActions.SET_TITLE({title: 'AGREGAR AGENTE ADUANAL'}));
        }
        this.router.navigate([
          appRoutes.protected,
          appRoutes.catalogs.catalogs,
          appRoutes.catalogs.customsAgents.customsAgents,
          appRoutes.catalogs.customsAgents.details,
        ]);
        return of(RETURN_EMPTY());
      }),
    ),
  );
  // ACCIONES PARA EL BOTON DE CANCELAR
  cancel$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(customAgentDetailsActions.CANCEL_COMPONENT_EFFECT),
        withLatestFrom(
          this.store.select(customAgentsDetailsSelectors.haveChangesToSave),
          this.store.select(customAgentsSelectors.selectEditMode),
        ),
        mergeMap(([action, hasChanges, editMode]) => {
          if (hasChanges) {
            this.store.dispatch(
              customAgentDetailsActions.SHOW_CONFIRM_DIALOG({
                origin: editMode ? 'editCancel' : 'addCancel',
              }),
            );
          } else {
            if (editMode) {
              this.store.dispatch(customAgentActions.SET_ENABLE_EDIT({enableEdit: false}));
              this.store.dispatch(customAgentDetailsActions.CLEAN_BACKUP());
            } else {
              this.location.back();
            }
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // ACCIONES PARA BOTON DE GUARDAR
  saveData$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(customAgentDetailsActions.SAVE_DATA_COMPONENT_EFFECT),
        withLatestFrom(
          this.store.select(customAgentsDetailsSelectors.selectedTabOption),
          this.store.select(customAgentsDetailsSelectors.haveChangesToSave),
          this.store.select(customAgentsDetailsSelectors.saveButtonValidation),
        ),
        mergeMap(([action, selectedTab, hasChanges, saveButtonValidation]) => {
          if (hasChanges) {
            if (selectedTab.id === '1' && saveButtonValidation) {
              this.store.dispatch(customAgentDetailsActions.SEND_GENERAL_DATA());
            } else {
              this.store.dispatch(customAgentDetailsActions.SAVE_DISPATCH_POINT());
            }
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
