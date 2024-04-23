import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {NGXLogger} from 'ngx-logger';
import {
  dailyMeetingActions,
  dailyMeetingDashboardActions,
  dailyMeetingDetailsActions,
  dailyMeetingDetailsDashboardActions,
} from '@appActions/pendings/daily-meeting';
import {map, withLatestFrom} from 'rxjs/operators';
import {GET_CAT_MONEDA_LOAD} from '@appActions/catalogs/catalogos.actions';
import {dailyMeetingDetailsSelectors} from '@appSelectors/pendings/daily-meeting';

import {RETURN_EMPTY} from '@appActions/utils/utils.action';
import {Router} from '@angular/router';
import {appRoutes} from '@appHelpers/core/app-routes';

@Injectable()
export class DailyMeetingMethodsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private router: Router,
  ) {}

  fetchMore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dailyMeetingDetailsActions.FETCH_MORE_ITEMS_COMPONENT_EFFECT),
      withLatestFrom(this.store.select(dailyMeetingDetailsSelectors.selectFetchMoreItemsInfo)),
      map(([{event}, {itemList, itemsTotalLength, listRequestStatus, desiredPage, totalPages}]) => {
        if (
          event.endIndex !== itemList.length - 1 || // DOCS El index del último item no coincida con el final de la página
          event.endIndex === itemsTotalLength - 1 || // DOCS Ya se cargaron todos los resultados
          itemsTotalLength === 0 || // DOCS No hay resultados
          desiredPage > totalPages || // DOCS Se intenta cargar una página que no existe
          itemList.length > itemsTotalLength || // DOCS La lista actual supera el total de resultados
          listRequestStatus === 1 // DOCS Se está obteniendo una página
        ) {
          return dailyMeetingDetailsActions.FETCH_MORE_ITEMS_COMPONENT_EFFECT_FAILED();
        }
        return dailyMeetingDetailsActions.FETCH_MORE_ITEMS_QUOTATION({isFirstPage: false});
      }),
    ),
  );

  //DOCS: INICIALIZADOR DEL COMPONENTE AL ENTRAR EL DASHBOARD
  ngOnInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dailyMeetingDashboardActions.INIT_DAILY_MEETING_DASHBOARD_COMPONENT_EFFECT),
      map(() => {
        this.store.dispatch(dailyMeetingActions.SET_DETAILS_MODE({detailsMode: false}));
        this.store.dispatch(dailyMeetingActions.SET_DETAILS_COMPONENT({detailsComponent: false}));
        this.store.dispatch(GET_CAT_MONEDA_LOAD());
        return dailyMeetingDashboardActions.FETCH_EVIS_QUOTATIONS_FOR_DAILY_MEETING();
      }),
    ),
  );

  //DOCS: GUARDA AL EVI SELECIONADO Y NAVEGA A LA VISTA DETALLE

  handleItemListClick$$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dailyMeetingDashboardActions.HANDLE_SET_SELECTED_EVI_EFFECT),
      map(({eviSelected}) => {
        this.store.dispatch(
          dailyMeetingDetailsActions.SET_SELECTED_EVI_DAILY_MEETING({eviSelected}),
        );
        this.store.dispatch(
          dailyMeetingDetailsDashboardActions.FETCH_CLIENTS_DASHBOARD_DETAILS_LOAD(),
        );
        this.store.dispatch(dailyMeetingActions.SET_DETAILS_MODE({detailsMode: true}));
        this.store.dispatch(dailyMeetingActions.SET_DETAILS_COMPONENT({detailsComponent: true}));
        this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.dailyMeeting.dailyMeeting,
          appRoutes.dailyMeeting.dailyMeetingDetails,
        ]);
        return RETURN_EMPTY();
      }),
    ),
  );
}
