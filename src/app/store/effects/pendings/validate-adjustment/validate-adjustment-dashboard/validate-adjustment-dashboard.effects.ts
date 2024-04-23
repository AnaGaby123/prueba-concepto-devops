import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {of} from 'rxjs';
// Actions
import {validateAdjustmentListActions} from '@appActions/pendings/validate-adjustment';

// Selectors
import {validateAdjustmentListSelectors} from '@appSelectors/pendings/validate-adjustment';

import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import * as api from 'api-logistica';
import {DashboardData} from 'api-logistica';
import * as servicesLogger from '@appUtil/logger';
import {buildClientsStrategyFromDashboard} from '@appHelpers/pending/validate-adjustment/validate-adjusment.helpers';
import {IValidateAdjustment} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-dashboard/validate-adjustment-dashboard.models';

const FILE_NAME = 'validate-adjustment-dashboard.effects.ts';

@Injectable()
export class ValidateAdjustmentDashboardEffects {
  constructor(
    private action$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private preProcessServices: api.ProcesosL04PretramitarPedidoService,
  ) {}

  fetchClientAdjustment$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        validateAdjustmentListActions.FETCH_CLIENTS_ADJUSTMENT_DASHBOARD,
        validateAdjustmentListActions.SET_DATE_RANGE_SELECTED,
        validateAdjustmentListActions.SET_SEARCH_TERM,
        validateAdjustmentListActions.SET_FILTER_OPTION_SELECTED,
      ),
      withLatestFrom(
        this.store.select(validateAdjustmentListSelectors.selectDashboardListQueryInfo),
      ),
      mergeMap(([action, queryInfo]) => {
        return this.preProcessServices.vClienteppPedidoValidarAjusteDashBoard(queryInfo).pipe(
          map((response: DashboardData) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al Obtener Los Clientes Validar Ajuste exitosamente.',
              ),
              response,
            );
            const listClients: IValidateAdjustment[] = buildClientsStrategyFromDashboard(
              response.Resumen,
            );
            return validateAdjustmentListActions.FETCH_CLIENTS_ADJUSTMENT_SUCCESS({listClients});
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al Obtener Los Clientes Validar Ajuste Error.',
              ),
              error,
            );
            return of(validateAdjustmentListActions.FETCH_CLIENTS_ADJUSTMENT_FAILED);
          }),
        );
      }),
    ),
  );
}
