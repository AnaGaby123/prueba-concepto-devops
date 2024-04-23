// Core
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

// Librerías
import {EMPTY, of} from 'rxjs';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {NGXLogger} from 'ngx-logger';

// Store
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AppState} from '@appCore/core.state';
import {AttributeDashboard, DashboardData, ProcesosL01CotizacionService} from 'api-logistica';
import {
  newClientFormActions,
  quotationActions,
  quotationDashboardActions,
  quotationDetailsActions,
} from '@appActions/quotation';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';
import {
  GET_CAT_ESTADO_COTIZACION,
  GET_CAT_TIPO_COTIZACION,
  GET_CAT_TIPO_PARTIDA_COTIZACION,
  GET_CAT_TIPO_TELEFONO_LOAD,
} from '@appActions/catalogs/catalogos.actions';
import {quotationDashboardSelectors, quotationSelectors} from '@appSelectors/quotation';

// Helpers
import * as servicesLogger from '@appUtil/logger';
import {RETURN_EMPTY, SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';
import {buildClientsFromDashboard} from '@appHelpers/pending/quotation/quotation.helpers';
import {appRoutes} from '@appHelpers/core/app-routes';
import {
  LINK_NEW_CONTACT_TO_CLIENT_SUCCESS_NAME,
  SAVE_NEW_CLIENT_SUCCESS_NAME,
} from '@appActions/quotation/quotation-details/details/new-customer-quotes/new-customer-quotes.actions';

const FILE_NAME = 'quotation-dashboard.effects.ts';

@Injectable()
export class QuotationDashboardEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private procesosCotizacionService: ProcesosL01CotizacionService,
    private logger: NGXLogger,
    private router: Router,
  ) {}

  /*DOCS: Inicializador del componente*/
  ngOnInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDashboardActions.INIT_QUOTATION_DASHBOARD_COMPONENT_EFFECT),
      map(() => {
        this.store.dispatch(quotationActions.SET_DETAILS_COMPONENT({detailsComponent: false}));
        this.store.dispatch(GET_CAT_TIPO_TELEFONO_LOAD());
        this.store.dispatch(GET_CAT_ESTADO_COTIZACION());
        this.store.dispatch(GET_CAT_TIPO_COTIZACION());
        this.store.dispatch(GET_CAT_TIPO_PARTIDA_COTIZACION());
        this.store.dispatch(catalogsActions.GET_CAT_UNIT_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_MONEDA_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_EMPRESAS_LOAD());
        return quotationDashboardActions.GET_QUOTATION_DASHBOARD_TABS_TOTALS_INIT();
      }),
    ),
  );

  // DOCS: Obtiene la información de las tabs
  getTabsInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(quotationDashboardActions.GET_QUOTATION_DASHBOARD_TABS_TOTALS_INIT),
      withLatestFrom(
        this.store.select(quotationDashboardSelectors.selectDashboardTabsGroupQueryInfo),
      ),
      mergeMap(([action, queryInfo]) => {
        return this.procesosCotizacionService.vCotCotizacionObtenerTabsDashboard(queryInfo).pipe(
          map((response: Array<AttributeDashboard>) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al obtener los totales de las tabs del cotizador.',
              ),
            );
            return quotationDashboardActions.GET_QUOTATION_DASHBOARD_TABS_TOTALS_SUCCESS({
              tabs: response,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al obtener los totales de las tabs del cotizador.',
              ),
              error,
            );
            return of(quotationDashboardActions.GET_QUOTATION_DASHBOARD_TABS_TOTALS_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS: Obtiene la lista de clientes para el dashboard
  getClientsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        quotationDashboardActions.GET_QUOTATION_DASHBOARD_TABS_TOTALS_SUCCESS,
        quotationDashboardActions.SET_TAP,
        quotationDashboardActions.SET_FILTER_BY_TYPE,
        quotationDashboardActions.SET_FILTER_BY_DATES,
        quotationDashboardActions.SET_SEARCH_TERM,
      ),
      withLatestFrom(
        this.store.select(quotationDashboardSelectors.selectDashboardListGroupQueryInfo),
      ),
      mergeMap(([action, queryInfo]) => {
        this.store.dispatch(quotationDashboardActions.CHANGE_LOADING_STATUS());
        return this.procesosCotizacionService.vCotCotizacionObtenerDashboard(queryInfo).pipe(
          map((response: DashboardData) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al obtener la lista de clientes del cotizador.',
              ),
            );
            const clientsList = buildClientsFromDashboard(response.Resumen);
            return quotationDashboardActions.GET_QUOTATION_DASHBOARD_LIST_SUCCESS({
              clientsList,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al obtener la lista de clientes del cotizador.',
              ),
              error,
            );
            return of(quotationDashboardActions.GET_QUOTATION_DASHBOARD_LIST_FAILED());
          }),
        );
      }),
    ),
  );

  /* DOCS: Guarda el cliente seleccionado y navega a la vista detalle */
  handleItemListClick$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        quotationDashboardActions.HANDLE_SET_SELECTED_CLIENT_EFFECT,
        newClientFormActions.SAVE_NEW_CLIENT_SUCCESS,
        newClientFormActions.LINK_NEW_CONTACT_TO_CLIENT_SUCCESS,
      ),
      map((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        this.store.dispatch(
          quotationDetailsActions.SET_SELECTED_CLIENT({selectedClient: action.selectedClient}),
        );
        this.store.dispatch(quotationActions.SET_DETAILS_MODE({detailsMode: true}));
        this.store.dispatch(quotationActions.SET_DETAILS_COMPONENT({detailsComponent: true}));
        this.store.dispatch(quotationDetailsActions.CLEAN_LINK_NEW_CONTACT_CLIENT_LIST());
        this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.quoter.quoter,
          appRoutes.quoter.details,
        ]);
        if (action.type === LINK_NEW_CONTACT_TO_CLIENT_SUCCESS_NAME) {
          this.store.dispatch(newClientFormActions.CLEAN_GM_CLIENT_QUOTATION_DATA());
          this.store.dispatch(
            SET_LOADING_SUCCESS({
              active: true,
              message: 'Se vinculo exitosamente el contacto',
            }),
          );
        }
        if (action.type === SAVE_NEW_CLIENT_SUCCESS_NAME) {
          this.store.dispatch(
            SET_LOADING_SUCCESS({
              active: true,
              message: 'Has guardado',
            }),
          );
        }
        return RETURN_EMPTY();
      }),
    ),
  );

  // DOCS: RETURN A LA INFORMACION ACTUAL, BORRA TODO LO DE DETAILS
  returnMainPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(quotationDashboardActions.RETURN_MAIN_PAGE_QUOTATION_EFFECT),
        withLatestFrom(this.store.select(quotationSelectors.selectDetailsMode)),
        mergeMap(([action, detailsMode]) => {
          this.store.dispatch(quotationDashboardActions.SET_ACTIVE_CHART({active: true}));
          if (detailsMode) {
            this.store.dispatch(quotationActions.SET_DETAILS_MODE({detailsMode: false}));
          }
          this.store.dispatch(quotationDetailsActions.CLEAN_ALL_QUOTATION_DETAIL());
          this.router.navigate([
            appRoutes.protected,
            appRoutes.pendings.pendings,
            appRoutes.quoter.quoter,
          ]);
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
