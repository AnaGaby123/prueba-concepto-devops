import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';
import {NGXLogger} from 'ngx-logger';
import {RESET_FORM_CLIENT} from '@appActions/forms/client-form/clients-form.actions';
import * as clienteAction from '@appActions/catalogs/cliente.actions';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import * as clientCatalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {EMPTY, of} from 'rxjs';
import * as api from 'api-catalogos';
import {API_REQUEST_STATUS_LOADING} from '@appUtil/common.protocols';

@Injectable()
export class ClientFormEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private logger: NGXLogger,
    private configuracionClientesService: api.ConfiguracionClientesService,
  ) {}

  // DOCS OBTIENE EL LISTADO DE CLIENTES
  fetchClients = createEffect(() =>
    this.actions$.pipe(
      ofType(
        RESET_FORM_CLIENT,
        clienteAction.FETCH_CAT_CLIENTS,
        clienteAction.SET_CLIENTS_FILTER,
        clienteAction.SET_SEARCH_TERM,
        clienteAction.SET_QUERY_INFO,
      ),
      withLatestFrom(
        this.store.select(clientCatalogsSelectors.selectClientQueryInfo),
        this.store.select(clientCatalogsSelectors.selectActiveTapCorporates),
      ),
      mergeMap(([action, queryInfo, activeTapCorporates]) => {
        this.store.dispatch(
          clienteAction.SET_CLIENTS_STATUS({
            clientsStatus: API_REQUEST_STATUS_LOADING,
          }),
        );
        if (activeTapCorporates) {
          return EMPTY;
        }
        return this.configuracionClientesService.vClienteQueryResult(queryInfo).pipe(
          map((response) =>
            clienteAction.FETCH_CAT_CLIENTS_SUCCESS({
              response,
              currentPage: queryInfo.desiredPage,
            }),
          ),
          catchError((error) => of(clienteAction.FETCH_CAT_CLIENTS_FAILED({error}))),
        );
      }),
    ),
  );
}
