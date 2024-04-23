import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';
import {ProcesosL01CotizacionInvestigacionService} from 'api-logistica';
import {regulatoryResearchDashboardActions} from '@appActions/pendings/new-product-existing-supplier/regulatory-research';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {regulatoryResearchDashboardSelectors} from '@appSelectors/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-index';
import * as servicesLogger from '@appUtil/logger';
import {of} from 'rxjs';
import {buildProvidersFromRegulatoryResearch} from '@appHelpers/pending/new-product-existing-supplier/regulatory-research.helpers';

const FILE_NAME = '[regulatory-research]';

@Injectable()
export class RegulatoryResearchDashboardEffects {
  constructor(
    private action$: Actions,
    private store: Store,
    private logger: NGXLogger,
    private procesosCotizacionInvestigacion: ProcesosL01CotizacionInvestigacionService,
  ) {}

  $getProviderList = createEffect(() =>
    this.action$.pipe(
      ofType(
        regulatoryResearchDashboardActions.FETCH_PROVIDER_LIST_LOAD,
        regulatoryResearchDashboardActions.SET_SEARCH_TERM,
        regulatoryResearchDashboardActions.SET_FILTER_SELECTED,
      ),
      withLatestFrom(
        this.store.select(regulatoryResearchDashboardSelectors.dashboardListGroupQueryInfo),
      ),
      mergeMap(([action, queryInfo]) => {
        this.store.dispatch(regulatoryResearchDashboardActions.CHANGE_LOADING_STATUS());
        return this.procesosCotizacionInvestigacion
          .DashboardRatificacionInvestigacionObtenerDashboard(queryInfo)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener lista de proveedores',
                ),
              );

              return regulatoryResearchDashboardActions.FETCH_PROVIDER_LIST_SUCCESS({
                data: buildProvidersFromRegulatoryResearch(response.Resumen),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener lista de proveedores',
                ),
                error,
              );
              return of(regulatoryResearchDashboardActions.FETCH_PROVIDER_LIST_FAILED());
            }),
          );
      }),
    ),
  );
}
