import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

// ACTIONS
import {customAgentListActions} from '@appActions/forms/custom-agent-form';
import {SET_LOADING} from '@appActions/utils/utils.action';

// Models
import * as apiCatalogs from 'api-catalogos';
import * as servicesLogger from '@appUtil/logger';

// SELECTORS
import {customAgentsListSelectors} from '@appSelectors/forms/custom-agents-form';

const FILE_NAME = '[Customs-Agents-list]';

@Injectable()
export class CustomAgentListFormEffects {
  constructor(
    private action$: Actions,
    private store: Store,
    private logger: NGXLogger,
    private customsAgentsServices: apiCatalogs.ConfiguracionAduanasService,
  ) {}

  // DOCS: OBTIENE LA LISTA DE AGENTES ADUANALES
  fetchCustomsAgents$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        customAgentListActions.FETCH_CUSTOMS_AGENTS_LOAD,
        customAgentListActions.SET_FILTER_OPTION_SELECTED,
        customAgentListActions.SET_SEARCH_TERM,
      ),
      withLatestFrom(this.store.select(customAgentsListSelectors.selectQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.customsAgentsServices.vAgenteAduanalQueryResult(queryInfo).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Consulta lista de agentes aduanales',
              ),
              response,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return customAgentListActions.FETCH_CUSTOMS_AGENTS_SUCCESS({
              customsAgents: response,
            });
          }),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Consulta Agentes Aduanales Error',
              ),
              error,
            );
            this.store.dispatch(customAgentListActions.FETCH_CUSTOMS_AGENTS_FAILED());
            return EMPTY;
          }),
        );
      }),
    ),
  );
}
