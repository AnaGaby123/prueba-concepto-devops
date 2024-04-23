import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, forkJoin, of} from 'rxjs';

/*MODELS*/
import * as api from 'api-catalogos';
import {ArchivoDetalle, ArchivoExportarCSVParameter, QueryResultVCliente} from 'api-catalogos';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {IQueryResultVCliente} from '@appModels/store/forms/clients-form/clients-list-form/clients-list-form.models';

/*SELECTORS*/
import {clientsListSelectors} from '@appSelectors/forms/clients-form';

/*ACTIONS*/
import * as clienteAction from '@appActions/catalogs/cliente.actions';
import {SET_LOADING} from '@appActions/utils/utils.action';
import * as clientsListActions from '@appActions/forms/client-form/clients-list-form/clients-list-form.actions';

/*UTILS*/
import {API_REQUEST_STATUS_LOADING} from '@appUtil/common.protocols';
import {getArrayForDropDownList} from '@appUtil/util';
import * as servicesLogger from '@appUtil/logger';
import {
  buildClientsListAfterResponse,
  generateCSVBodyRequest,
  processCorporates,
} from '@appHelpers/catalogs/clients/clients-list.helpers';
import {getOnlyFileName} from '@appUtil/files';

const FILE_NAME = 'clients-form.effects.ts';

@Injectable()
export class ClientsListFormEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private logger: NGXLogger,
    private catalogosService: api.CatalogosService,
    private sistemaUsuariosService: api.SistemaUsuariosService,
    private configuracionClientesService: api.ConfiguracionClientesService,
    private sistemaArchivosCSVService: api.SistemaArchivosCSVsService,
  ) {}

  // DOCS: DESCARGA EL ARCHIVO CSV
  downloadCsvClientsFile = createEffect(() =>
    this.actions$.pipe(
      ofType(clientsListActions.DOWNLOAD_CSV_CLIENTS_FILE_LOAD),
      mergeMap(() => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const body: ArchivoExportarCSVParameter = generateCSVBodyRequest();
        return this.sistemaArchivosCSVService.ArchivoExportarCSVsObtenerDetalle(body).pipe(
          map((response: ArchivoDetalle) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener la url para descargar el archivo CSV.',
              ),
              response,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            const a = document.createElement('a');
            const fileName = getOnlyFileName(response.FileKey);
            a.setAttribute('href', response.Url);
            a.setAttribute('download', fileName);
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            return clientsListActions.DOWNLOAD_CSV_CLIENTS_FILE_SUCCESS({
              csvFile: response,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener la url para descargar el archivo CSV.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(clientsListActions.DOWNLOAD_CSV_CLIENTS_FILE_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS: OBTIENE LOS FILTROS
  getFiler = createEffect(() =>
    this.actions$.pipe(
      ofType(clientsListActions.FETCH_CLIENT_FILTER),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const body = new FiltersOnlyActive();
        let bodyOrderByClave = new FiltersOnlyActive();
        bodyOrderByClave = {
          ...bodyOrderByClave,
          SortField: 'Clave',
          SortDirection: 'asc',
        };
        const bodyESAC = {
          ...body,
          Filters: [
            ...body.Filters,
            {
              NombreFiltro: 'ESAC',
              ValorFiltro: true,
            },
          ],
          SortField: 'NombreCompleto',
          SortDirection: 'asc',
        };
        const bodyEVI = {
          ...body,
          Filters: [
            ...body.Filters,
            {
              NombreFiltro: 'EVI',
              ValorFiltro: true,
            },
          ],
          SortField: 'NombreCompleto',
          SortDirection: 'asc',
        };
        return forkJoin([
          this.catalogosService.catNivelIngresoQueryResult(bodyOrderByClave),
          this.catalogosService.catRutaEntregaQueryResult(bodyOrderByClave),
          this.sistemaUsuariosService.UsuarioQueryResult(bodyESAC),
          this.sistemaUsuariosService.UsuarioQueryResult(bodyEVI),
        ]).pipe(
          map(([resultCatNivelIngreso, resultCatRutaEntrega, resultUserESAC, resultUserEVI]) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            return clientsListActions.FETCH_CLIENT_FILTER_SUCCESS({
              incomeLevelOptions: getArrayForDropDownList(
                resultCatNivelIngreso.Results,
                'IdCatNivelIngreso',
                'NivelIngreso',
              ),
              routeOptions: getArrayForDropDownList(
                resultCatRutaEntrega.Results,
                'IdCatRutaEntrega',
                'RutaEntrega',
              ),
              esacOptions: getArrayForDropDownList(
                resultUserESAC.Results,
                'IdUsuario',
                'NombreCompleto',
              ),
              evOptions: getArrayForDropDownList(
                resultUserEVI.Results,
                'IdUsuario',
                'NombreCompleto',
              ),
            });
          }),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(clienteAction.FETCH_CLIENT_FILTER_ERROR({error}));
          }),
        );
      }),
    ),
  );

  // DOCS: OBTIENE EL LISTADO PAGINADO DE CLIENTES
  fetchClients = createEffect(() =>
    this.actions$.pipe(
      ofType(
        clientsListActions.FETCH_CAT_CLIENTS,
        clientsListActions.SET_CLIENTS_FILTER,
        clientsListActions.FETCH_CLIENT_FILTER_SUCCESS,
        clientsListActions.SET_SEARCH_TERM,
        clientsListActions.FETCH_KAY_ACCOUNT,
      ),
      withLatestFrom(
        this.store.select(clientsListSelectors.selectQueryInfo),
        this.store.select(clientsListSelectors.selectActiveTapCorporates),
      ),
      mergeMap(([action, queryInfo, activeTapCorporates]) => {
        this.store.dispatch(
          clientsListActions.SET_CLIENTS_STATUS({
            clientsStatus: API_REQUEST_STATUS_LOADING,
          }),
        );
        if (activeTapCorporates) {
          return EMPTY;
        }
        return this.configuracionClientesService.vClienteQueryResult(queryInfo).pipe(
          map((response: QueryResultVCliente) => {
            const clientImage: IQueryResultVCliente = buildClientsListAfterResponse(response);
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al obtener una página de la lista de clientes',
              ),
              response,
            );
            return clientsListActions.FETCH_CAT_CLIENTS_SUCCESS({
              response: clientImage,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al obtener una página de la lista de clientes',
              ),
              error,
            );
            return of(clientsListActions.FETCH_CAT_CLIENTS_FAILED({error}));
          }),
        );
      }),
    ),
  );

  // DOCS: OBTIENE LOS CORPORATIVOS
  fetchCorporates = createEffect(() =>
    this.actions$.pipe(
      ofType(clientsListActions.FETCH_CORPORATES),
      withLatestFrom(
        this.store.select(clientsListSelectors.selectCorporates),
        this.store.select(clientsListSelectors.selectClientsListState),
      ),
      mergeMap(([action, corporates, listState]) => {
        if (!corporates.needsToReloadCorporates && listState.corporativeIsSelected) {
          return EMPTY;
        }
        if (!listState.corporativeIsSelected) {
          return of(clientsListActions.FETCH_CAT_CLIENTS({isFirstPage: true}));
        }
        return this.configuracionClientesService
          .vClienteGroupQueryResult({
            GroupColumn: 'IdCatCorporativo',
          })
          .pipe(
            map((response) =>
              clientsListActions.FETCH_CORPORATES_SUCCESS(processCorporates(response)),
            ),
            catchError((error) => of(clientsListActions.FETCH_CORPORATES_FAILED)),
          );
      }),
    ),
  );
}
