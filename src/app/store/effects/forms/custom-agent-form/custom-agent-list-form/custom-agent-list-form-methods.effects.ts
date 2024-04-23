/*CORE*/
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {mergeMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
/*MODELS*/
/*ACTIONS*/
import {
  customAgentActions,
  customAgentDetailsActions,
  customAgentListActions,
} from '@appActions/forms/custom-agent-form';
import {appRoutes} from '@appHelpers/core/app-routes';

/*SELECTORS*/

@Injectable()
export class CustomAgentListFormMethodsEffects {
  constructor(private action$: Actions, private store: Store, private router: Router) {}

  ngOnInit$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(customAgentListActions.LIST_INIT_ACTIONS_HELPER_EFFECT),
        mergeMap((action) => {
          this.store.dispatch(customAgentActions.SET_EDIT_MODE({editMode: false}));
          this.store.dispatch(customAgentActions.SET_ENABLE_EDIT({enableEdit: false}));
          this.store.dispatch(customAgentListActions.FETCH_CUSTOMS_AGENTS_LOAD());
          this.store.dispatch(customAgentDetailsActions.RESET_CUSTOM_AGENT_SELECTED());
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  setCustomAgent$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(customAgentListActions.SET_CUSTOM_AGENT_HELPER_EFFECT),
        mergeMap((action) => {
          this.store.dispatch(customAgentActions.SET_TITLE({title: 'VER AGENTE ADUANAL'}));
          this.store.dispatch(
            customAgentDetailsActions.SET_CUSTOM_AGENT_SELECTED({
              customAgent: action.customAgent,
            }),
          );
          this.store.dispatch(customAgentActions.SET_EDIT_MODE({editMode: true}));
          this.store.dispatch(customAgentActions.SET_ALLOW_TO_DETAILS({allowToDetails: true}));
          this.store.dispatch(customAgentDetailsActions.FETCH_CONTACTS_LOAD());
          this.router.navigate([
            appRoutes.protected,
            appRoutes.catalogs.catalogs,
            appRoutes.catalogs.customsAgents.customsAgents,
            appRoutes.catalogs.customsAgents.details,
          ]);
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
