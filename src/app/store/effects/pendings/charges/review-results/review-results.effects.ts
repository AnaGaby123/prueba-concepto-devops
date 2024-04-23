import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';
import {Router} from '@angular/router';
import {reviewResultsActions} from '@appActions/pendings/charges/review-results';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import * as apiCatalogs from 'api-catalogos';
import * as apiFinance from 'api-finanzas';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {of} from 'rxjs';
import * as servicesLogger from '@appUtil/logger';
/*Selectors Import*/
import {selectIdUser} from '@appSelectors/auth/auth.selectors';

const FILE_NAME = 'Review-results.effects';

@Injectable()
export class ReviewResultsEffects {
  constructor(
    private action$: Actions,
    private store: Store,
    private logger: NGXLogger,
    private route: Router,
    private settingCustomerServices: apiCatalogs.ConfiguracionClientesService,
    private collectionClientsResults: apiFinance.CobranzaClientesResultadosRevisionService,
  ) {}

  fetchCustomers$ = createEffect(() =>
    this.action$.pipe(
      ofType(reviewResultsActions.FETCH_FILTERS_LOAD),
      mergeMap((action) => {
        const params = new FiltersOnlyActive();
        return this.settingCustomerServices.ClienteQueryResult(params).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Consulta Clientes.',
              ),
              response,
            );

            return reviewResultsActions.FETCH_CUSTOMER_SUCCESS({
              customers: response.Results,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Consulta Clientes.',
              ),
              error,
            );
            return of(reviewResultsActions.FETCH_CUSTOMER_ERROR(error));
          }),
        );
      }),
    ),
  );

  fetchMessages$ = createEffect(() =>
    this.action$.pipe(
      ofType(reviewResultsActions.FETCH_FILTERS_LOAD),
      withLatestFrom(this.store.select(selectIdUser)),
      mergeMap(([action, idUser]) => {
        return this.collectionClientsResults
          .ConsultarUsuariosMensajerosResultadosRevisionProcess(idUser)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Consulta Mensajeros.',
                ),
                response,
              );
              return reviewResultsActions.FETCH_MESSAGES_SUCCESS({
                messengers: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Consulta Mensajeros.',
                ),
                error,
              );
              return of(reviewResultsActions.FETCH_MESSAGES_ERROR(error));
            }),
          );
      }),
    ),
  );
}
