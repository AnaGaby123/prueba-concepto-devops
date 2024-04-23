import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {Router} from '@angular/router';
import {attendInvestigationListActions} from '@appActions/pendings/attend-investigation';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  AttributeDashboard,
  DashboardData,
  ProcesosL01CotizacionInvestigacionService,
} from 'api-logistica';
import * as servicesLogger from '@appUtil/logger';
import {attendInvestigationListSelectors} from '@appSelectors/pendings/attend-investigation';
import {
  buildProvidersAttendInvestigationFromDashboard,
  buildProvidersAttendInvestigationFromTabs,
} from '@appHelpers/pending/new-product-existing-supplier/attend-investigation/attend-investigation.helper';

const FILE_NAME = 'attend-investigation-list.effects.ts';

@Injectable()
export class AttendInvestigationListEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private router: Router,
    private processQuotationInvestigationService: ProcesosL01CotizacionInvestigacionService,
  ) {}

  //DOCS: OBTIENE LA INFORMACIÓN DE LAS TABS DEL DASHBOARD
  getTabsInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attendInvestigationListActions.FETCH_ATTEND_INVESTIGATION_DASHBOARD_TABS_TOTALS_INIT),
      withLatestFrom(
        this.store.select(attendInvestigationListSelectors.selectDashboardTabsGroupQueryInfo),
      ),
      mergeMap(([actions, queryInfo]) => {
        return this.processQuotationInvestigationService
          .ProductoInvestigacionObtenerProductoInvestigacionTabs(queryInfo)
          .pipe(
            map((response: Array<AttributeDashboard>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener los totales de las tabs de atender investigación.',
                ),
              );
              const tabs = buildProvidersAttendInvestigationFromTabs(response);
              return attendInvestigationListActions.FETCH_ATTEND_INVESTIGATION_DASHBOARD_TABS_TOTALS_SUCCESS(
                {
                  tabs,
                },
              );
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener los totales de las tabs de atender investigación.',
                ),
                error,
              );
              return of(
                attendInvestigationListActions.FETCH_ATTEND_INVESTIGATION_DASHBOARD_TABS_TOTALS_FAILED(),
              );
            }),
          );
      }),
    ),
  );

  //DOCS: OBTNER LA INFORMACIÓN DE LA LISTA DE PROVEEDORES
  getProvidersDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        attendInvestigationListActions.FETCH_ATTEND_INVESTIGATION_DASHBOARD_TABS_TOTALS_SUCCESS,
        attendInvestigationListActions.SET_TAB_OPTION_SELECTED,
      ),
      withLatestFrom(
        this.store.select(attendInvestigationListSelectors.selectDashboardListGroupQueryInfo),
      ),
      mergeMap(([actions, queryInfo]) => {
        this.store.dispatch(attendInvestigationListActions.CHANGE_LOADING_STATUS());
        return this.processQuotationInvestigationService
          .ProductoInvestigacionObtenerProductoInvestigacionDashboard(queryInfo)
          .pipe(
            map((response: DashboardData) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener la lista de proveedores  de atender investigación.',
                ),
              );
              const listProviders = buildProvidersAttendInvestigationFromDashboard(
                response.Resumen,
              );
              return attendInvestigationListActions.FETCH_LIST_PROVIDERS_ATTEND_INVESTIGATION_DASHBOARD_SUCCESS(
                {
                  listProviders,
                },
              );
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener la lista de proveedores de antender investigación',
                ),
                error,
              );
              return of(
                attendInvestigationListActions.FETCH_LIST_PROVIDERS_ATTEND_INVESTIGATION_DASHBOARD_FAILED(),
              );
            }),
          );
      }),
    ),
  );
}
