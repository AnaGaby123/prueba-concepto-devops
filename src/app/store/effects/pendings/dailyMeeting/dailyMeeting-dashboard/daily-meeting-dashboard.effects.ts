/* Core Imports */
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';

/* Services Imports */
import * as apiLogistic from 'api-logistica';

/* Models Imports */
import {AppState} from '@appCore/core.state';

/* Dev Tools */
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {dailyMeetingDashboardActions} from '@appActions/pendings/daily-meeting';
import {dailyMeetingListSelectors} from '@appSelectors/pendings/daily-meeting';
import {buildEvisDailyMeetingDashboard} from '@appHelpers/pending/daily-meeting/daily-meeting.helpers';
import {Evi} from '@appModels/store/pendings/daily-meeting/daily-meeting-dashboard/daily-meeting-dashboard.model';

const FILE_NAME = 'daily-meeting-dashboard.effects.ts';

@Injectable()
export class DailyMeetingDashboardEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private processQuotationCloseService: apiLogistic.ProcesosL01CotizacionCierreService,
    private processQuotationService: apiLogistic.ProcesosL01CotizacionService,
  ) {}

  //DOCS: OBTIENE LA LISTA DE EVIS CON SUS CLIENTES PARA EL DASHBOARD DE JUNTA DIARIA
  fetchClientsQuotationsForDailyMeeting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        dailyMeetingDashboardActions.FETCH_EVIS_QUOTATIONS_FOR_DAILY_MEETING,
        dailyMeetingDashboardActions.SET_FILTER_BY_DATES,
        dailyMeetingDashboardActions.SET_SEARCH_TERM,
        dailyMeetingDashboardActions.SET_FILTER_BY_TYPE,
      ),
      withLatestFrom(
        this.store.select(dailyMeetingListSelectors.selectDashboardListGroupQueryInfo),
      ),
      mergeMap(([action, queryInfo]) => {
        this.store.dispatch(dailyMeetingDashboardActions.CHANGE_LOADING_STATUS());
        return this.processQuotationService
          .vCotCotizacionObtenerJuntaDiariaDashboard(queryInfo)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Se obtuvieron los EVIS de forma exitosa.',
                ),
                response,
              );
              const listEvisDailyMeetings: Array<Evi> = buildEvisDailyMeetingDashboard(
                response.Resumen,
              );
              return dailyMeetingDashboardActions.FETCH_EVIS_QUOTATIONS_FOR_DAILY_MEETING_SUCCESS({
                listEvisDailyMeetings,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener los EVIS.',
                ),
                error,
              );
              return of(
                dailyMeetingDashboardActions.FETCH_EVIS_QUOTATIONS_FOR_DAILY_MEETING_FAILED(),
              );
            }),
          );
      }),
    ),
  );
}
