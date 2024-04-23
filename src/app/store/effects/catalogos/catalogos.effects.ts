/* Core Imports */
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, forkJoin, of} from 'rxjs';

/* Dev Tools */
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {LOG_FAILED, LOG_SUCCEEDED} from '@appUtil/logger';
/* Services imports */
import {
  CatalogosService,
  ConfiguracionAduanasService,
  ConfiguracionClientesCalculosService,
  ConfiguracionClientesConfiguracionService,
  ConfiguracionClientesDireccionesService,
  ConfiguracionClientesRelacionesService,
  ConfiguracionClientesService,
  ConfiguracionContactosService,
  ConfiguracionCuentasService,
  ConfiguracionDireccionesService,
  ConfiguracionEmpresasService,
  ConfiguracionProductosConfiguracionFamiliasService,
  ConfiguracionProductosMarcasService,
  ConfiguracionProveedoresService,
  GroupQueryResultVNumeroTelefonico,
  QueryResultAduana,
  QueryResultAgenteAduanal,
  QueryResultCatAplicacion,
  QueryResultCatBanco,
  QueryResultCatBrokerCliente,
  QueryResultCatClasificacionInformativaProducto,
  QueryResultCatClasificacionRegulatoria,
  QueryResultCatCondicionesDePago,
  QueryResultCatDepositarioInternacional,
  QueryResultCatDestino,
  QueryResultCatDificultadDatosPersona,
  QueryResultCatDisponibilidad,
  QueryResultCatEstadoCotizacion,
  QueryResultCatEstadoFisico,
  QueryResultCatFletera,
  QueryResultCatFormatoPublicacion,
  QueryResultCatImportanciaCliente,
  QueryResultCatIncoterm,
  QueryResultCatIndustria,
  QueryResultCatLinea,
  QueryResultCatLugarDespacho,
  QueryResultCatManejo,
  QueryResultCatMantenimientoDatosPersona,
  QueryResultCatMarcaTarjeta,
  QueryResultCatMarcaVehiculo,
  QueryResultCatMedioDePago,
  QueryResultCatMedioDifusion,
  QueryResultCatMedioTransporte,
  QueryResultCatMetodoDePagoCFDI,
  QueryResultCatMoneda,
  QueryResultCatNivelDecisionDatosPersona,
  QueryResultCatNivelIngreso,
  QueryResultCatNivelPuestoDatosPersona,
  QueryResultCatPrioridad,
  QueryResultCatProceso,
  QueryResultCatProductoInvestigacionSeguimiento,
  QueryResultCatRegimenFiscal,
  QueryResultCatRestriccionDeCompra,
  QueryResultCatRestriccionFlete,
  QueryResultCatRevision,
  QueryResultCatRolCliente,
  QueryResultCatRolProveedor,
  QueryResultCatRutaEntrega,
  QueryResultCatSector,
  QueryResultCatTemaComentario,
  QueryResultCatTipoCampana,
  QueryResultCatTipoCotizacion,
  QueryResultCatTipoDireccion,
  QueryResultCatTipoNumeroTelefonico,
  QueryResultCatTipoPartidaCotizacion,
  QueryResultCatTipoPresentacion,
  QueryResultCatTipoProducto,
  QueryResultCatTipoSociedadMercantil,
  QueryResultCatTipoValidacion,
  QueryResultCatTipoVehiculo,
  QueryResultCatUnidad,
  QueryResultCatUnidadTiempo,
  QueryResultCatUso,
  QueryResultCatUsoCFDI,
  QueryResultConceptoAgenteAduanal,
  QueryResultEmpresa,
  QueryResultMarca,
  QueryResultUsuario,
  QueryResultVFamilia,
  QueryResultVFamiliaLinea,
  QueryResultVProveedor,
  QueryResultVProveedorResumen,
  QueryResultVUsuario,
  SistemaUsuariosService,
  UsuariosCartera,
  VCatPais,
} from 'api-catalogos';

/* Models Imports */
import {AppState} from '@appCore/core.state';

import {SET_LOADING} from '@appActions/utils/utils.action';
import {
  GET_PROVIDERS_ERROR,
  GET_PROVIDERS_LOAD,
  GET_PROVIDERS_SUCCESS,
  GET_VPROVIDERS_ERROR,
  GET_VPROVIDERS_LOAD,
  GET_VPROVIDERS_SUCCESS,
} from '@appActions/catalogs/proveedor.actions';
import {
  FILTER_LIST_CONCEPTOSAA,
  FILTER_LIST_CONCEPTOSAA_SUCCESS,
  GET_LIST_AGENTES_ERROR,
  GET_LIST_AGENTES_LOAD,
  GET_LIST_AGENTES_SUCCESS,
  GET_LIST_CONCEPTOSAA_ERROR,
  GET_LIST_CONCEPTOSAA_LOAD,
  GET_LIST_CONCEPTOSAA_SUCCESS,
} from '@appActions/catalogs/aduanas.actions';

import {
  GET_PRECIOLISTA_ERROR,
  GET_PRECIOLISTA_LOAD,
  GET_PRECIOLISTA_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_LOAD,
  GET_PRODUCTS_SUCCESS,
} from '@appActions/catalogs/producto.actions';
import {Persona} from '@appModels/catalogos/persona/persona';
import {Cliente} from '@appModels/catalogos/cliente/cliente';
import {Correo} from '@appModels/correo/correo';
import {Telefono} from '@appModels/telefono/telefono';
import {Contacto} from '@appModels/catalogos/contacto/contacto';
import {FiltersOnlyActive, IFilters} from '@appModels/filters/Filters';

import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {
  needsToReloadCommercialLeader,
  needsToReloadCoordinatorESAC,
  selectDirectionType,
} from '@appSelectors/catalogs/catalogs.selectors';

// Selectors
// Actions
import {
  catAddressActions,
  catalogsActions,
  catBrandActions,
  catScheduleActions,
  clientActions,
} from '@appActions/catalogs';
import {
  getArrayForDropDownList,
  getArrayForDropListOptionsPqf,
  patchBody,
  patchDropListOption,
} from '@appUtil/util';
import {
  GET_CAT_LINES_ERROR,
  GET_CAT_LINES_LOAD,
  GET_CAT_LINES_SUCCESS,
} from '@appActions/catalogs/lineas.actions';
import {Router} from '@angular/router';
import {listQuotesActions, newClientFormActions} from '@appActions/quotation';

// Utils
import {concat, sortBy} from 'lodash-es';
import {
  EmpleadoDetalleObj,
  ProcesosL02AjustarOfertaService,
  ProcesosL05TramitarPedidoCartaDeDisponibilidadService,
  QueryResultAjOfRazonRechazo,
} from 'api-logistica';

const FILE_NAME = 'catalogos.effects.ts';

@Injectable()
export class CatalogosEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private marcasService: ConfiguracionProductosMarcasService,
    private configuracionClientesConfiguracionService: ConfiguracionClientesConfiguracionService,
    private catalogosService: CatalogosService,
    private sistemaUsuariosService: SistemaUsuariosService,
    private configuracionAduanasService: ConfiguracionAduanasService,
    private configuracionClientesService: ConfiguracionClientesService,
    private configuracionContactosService: ConfiguracionContactosService,
    private configuracionClientesRelacionesService: ConfiguracionClientesRelacionesService,
    private configuracionCuentasService: ConfiguracionCuentasService,
    private configuracionClientesCalculosService: ConfiguracionClientesCalculosService,
    private configuracionClientesDireccionesService: ConfiguracionClientesDireccionesService,
    private configuracionDireccionesService: ConfiguracionDireccionesService,
    private configuracionEmpresasService: ConfiguracionEmpresasService,
    private configuracionProveedoresService: ConfiguracionProveedoresService,
    private configuracionProductosConfiguracionFamiliasService: ConfiguracionProductosConfiguracionFamiliasService,
    private procesosL05TramitarPedidoCartaDeDisponibilidadService: ProcesosL05TramitarPedidoCartaDeDisponibilidadService,
    private logger: NGXLogger,
    private adjustmentService: ProcesosL02AjustarOfertaService,
  ) {}

  getDropListContacto = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.GET_DATASDROPLIST_CONTACT_LOAD),
      mergeMap(({payload}) => {
        return forkJoin([
          this.catalogosService.catDificultadDatosPersonaQueryResult(payload),
          this.catalogosService.catNivelDecisionDatosPersonaQueryResult(payload),
          this.catalogosService.catMantenimientoDatosPersonaQueryResult(payload),
          this.catalogosService.catNivelPuestoDatosPersonaQueryResult(payload),
        ]).pipe(
          map((response) =>
            clientActions.GET_DATASDROPLIST_CONTACT_SUCCESS(this.proccesDropListContacto(response)),
          ),
          catchError((error) => of(clientActions.GET_DATASDROPLIST_CONTACT_ERROR({error}))),
        );
      }),
    ),
  );

  gatCatDificultad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_DIFICULTAD_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatDificultad)),
      mergeMap(([action, needsToReload]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (needsToReload) {
          return this.catalogosService.catDificultadDatosPersonaQueryResult(body).pipe(
            map((response: QueryResultCatDificultadDatosPersona) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener catDificultadDatosPersona',
                ),
                response,
              );
              return catalogsActions.GET_CAT_DIFICULTAD_SUCCESS({
                listDificultadDatosPersona: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener catDificultadDatosPersona',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_DIFICULTAD_FAILED());
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  gatCatNivelDecision$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_NIVEL_DECISION_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatNivelDecision)),
      mergeMap(([action, needsToReload]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (needsToReload) {
          return this.catalogosService.catNivelDecisionDatosPersonaQueryResult(body).pipe(
            map((response: QueryResultCatNivelDecisionDatosPersona) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener catNivelDecisionDatosPersona',
                ),
                response,
              );
              return catalogsActions.GET_CAT_NIVEL_DECISION_SUCCESS({
                listNivelDecisionDatosPersona: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener catNivelDecisionDatosPersona',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_NIVEL_DECISION_FAILED());
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  gatCatMantenimiento$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_MANTENIMIENTO_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatMantenimiento)),
      mergeMap(([action, needsToReload]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (needsToReload) {
          return this.catalogosService.catMantenimientoDatosPersonaQueryResult(body).pipe(
            map((response: QueryResultCatMantenimientoDatosPersona) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener catMantenimientoDatosPersona',
                ),
                response,
              );
              return catalogsActions.GET_CAT_MANTENIMIENTO_SUCCESS({
                listMantenimientoDatosPersona: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener catMantenimientoDatosPersona',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_MANTENIMIENTO_FAILED());
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  gatCatNivelPuesto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_NIVEL_PUESTO_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatNivelPuesto)),
      mergeMap(([action, needsToReload]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (needsToReload) {
          return this.catalogosService.catNivelPuestoDatosPersonaQueryResult(body).pipe(
            map((response: QueryResultCatNivelPuestoDatosPersona) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener catNivelPuestoDatosPersona',
                ),
                response,
              );
              return catalogsActions.GET_CAT_NIVEL_PUESTO_SUCCESS({
                listNivelPuestoDatosPersona: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener catNivelPuestoDatosPersona',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_NIVEL_PUESTO_FAILED());
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getCatAddressType = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_ADDRESS_TYPE_LOAD),
      withLatestFrom(this.store.select(selectDirectionType)),
      mergeMap(([action, typesDirection]) => {
        if (typesDirection.needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'Clave',
          };
          return this.catalogosService.catTipoDireccionQueryResult(body).pipe(
            map((response: QueryResultCatTipoDireccion) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener los tipo dirección.',
                ),
              );
              this.store.dispatch(
                newClientFormActions.SET_ID_CAT_ADDRESS_TYPE({lisCatAddressType: response.Results}),
              );
              return catalogsActions.GET_CAT_ADDRESS_TYPE_SUCCESS({
                lisCatAddressType: response.Results.map((item) => item),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener los tipo dirección.',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_ADDRESS_TYPE_FAILED());
            }),
          );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  getCatRutaEntrega = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_RUTA_ENTREGA_LOAD),
      withLatestFrom(
        this.store.select(catalogsSelectors.needsToReloadCatRutaEntrega),
        this.store.select(catalogsSelectors.dropListRutasEntrega),
      ),
      mergeMap(([action, needsToReloadCatRutaEntrega, catRutasEntrega]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (needsToReloadCatRutaEntrega) {
          return this.catalogosService.catRutaEntregaQueryResult(body).pipe(
            map((response: QueryResultCatRutaEntrega) =>
              catalogsActions.GET_CAT_RUTA_ENTREGA_SUCCESS({
                lisCatRutaEntrega: response.Results.map((item) => item),
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_RUTA_ENTREGA_FAILED())),
          );
        } else {
          this.store.dispatch(
            catalogsActions.GET_CAT_RUTA_ENTREGA_SUCCESS({
              lisCatRutaEntrega: catRutasEntrega,
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );
  getCatNivelIngreso = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_NIVEL_INGRESO_LOAD),
      withLatestFrom(
        this.store.select(catalogsSelectors.needsToReloadCatNivelIngreso),
        this.store.select(catalogsSelectors.selectCatNivelIngreso),
      ),
      mergeMap(([action, needsToReloadCatNivelIngreso, catNivelIngreso]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (needsToReloadCatNivelIngreso) {
          return this.catalogosService.catNivelIngresoQueryResult(body).pipe(
            map((response: QueryResultCatNivelIngreso) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener CatNivelIngreso',
                ),
                response,
              );
              this.store.dispatch(
                newClientFormActions.SET_ID_ENTRY_LEVEL({
                  listCatNivelIngreso: response.Results,
                }),
              );
              return catalogsActions.GET_CAT_NIVEL_INGRESO_SUCCESS({
                listCatNivelIngreso: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener CatNivelIngreso',
                ),
                error,
              );
              this.store.dispatch(catalogsActions.GET_CAT_NIVEL_INGRESO_FAILED());
              return of(catalogsActions.GET_CAT_RUTA_ENTREGA_FAILED());
            }),
          );
        } else {
          this.store.dispatch(
            catalogsActions.GET_CAT_NIVEL_INGRESO_SUCCESS({
              listCatNivelIngreso: catNivelIngreso,
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getCatDestino = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_DESTINO_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatRolDestino)),
      mergeMap(([action, needsToReload]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (needsToReload) {
          return this.catalogosService.catDestinoQueryResult(body).pipe(
            map((response: QueryResultCatDestino) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener CatDestino',
                ),
                response,
              );
              return catalogsActions.GET_CAT_DESTINO_SUCCESS({
                listCatDestino: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener CatDestino',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_DESTINO_FAILED());
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getCatBrokerCliente$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_BROKER_CLIENTE_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatBrokerCliente)),
      mergeMap(([action, needsToReload]) => {
        let body = new FiltersOnlyActive(true);
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'RazonSocial',
        };
        if (needsToReload) {
          return this.catalogosService.catBrokerClienteQueryResult(body).pipe(
            map((response: QueryResultCatBrokerCliente) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener CatBrokerCliente',
                ),
                response,
              );
              return catalogsActions.GET_CAT_BROKER_CLIENTE_SUCCESS({
                listCatBrokerCliente: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener CatBrokerCliente',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_BROKER_CLIENTE_FAILED());
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getCatBanco$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_BANK_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatBanco)),
      mergeMap(([action, needsToReload]) => {
        const body: IFilters = new FiltersOnlyActive(true);
        body.SortField = 'Banco';
        body.SortDirection = 'asc';
        if (needsToReload) {
          return this.catalogosService.catBancoQueryResult(body).pipe(
            map((response: QueryResultCatBanco) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener CatBanco',
                ),
                response,
              );
              return catalogsActions.GET_CAT_BANK_SUCCESS({
                listCatBanco: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener CatBanco',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_BANK_ERROR({error}));
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getCatPais = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_PAIS_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatPais)),
      mergeMap(([action, needsToReloadCatPais]) => {
        const body = new FiltersOnlyActive();
        if (needsToReloadCatPais) {
          body.SortField = 'NombreEspanol';
          body.SortDirection = 'asc';
          return this.configuracionDireccionesService.vCatPaisQueryResult(body).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener el catálogo de países',
                ),
                response,
              );
              return catalogsActions.GET_CAT_PAIS_SUCCESS({
                // DOCS: Se ordenan países por orden alfabético en español
                lisCatPais: sortBy(response.Results, (o: VCatPais) => o.NombreEspanol),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el catálogo de países',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_PAIS_FAILED());
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getCatZona = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_ZONA_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatZona)),
      mergeMap(([action, needsToReloadCatZona]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (needsToReloadCatZona) {
          return this.catalogosService.catZonaQueryResultResponse(body).pipe(
            map((response) =>
              catalogsActions.GET_CAT_ZONA_SUCCESS({
                lisCatZona: response.body.Results.map((item) => item),
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_ZONA_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getCatCustomer = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_CUSTOMER_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatUser)),
      mergeMap(([action, needsToReloadCatUser]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'NombreCompleto',
        };
        if (needsToReloadCatUser) {
          return this.sistemaUsuariosService.UsuarioQueryResult(body).pipe(
            map((response: QueryResultUsuario) =>
              catalogsActions.GET_CAT_CUSTOMER_SUCCESS({
                lisCatCustomer: response.Results.map((item) => item),
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_CUSTOMER_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getCatCommercialLeader = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_COMMERCIAL_LEADER_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCommercialLeader)),
      mergeMap(([action, needsToReloadCatUser]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          Filters: [
            ...body.Filters,
            {
              NombreFiltro: 'CoordinadorDeVentaInterna',
              ValorFiltro: true,
            },
          ],
        };
        if (needsToReloadCatUser) {
          return this.sistemaUsuariosService.UsuarioObtenerListaUsuariosCartera(body).pipe(
            map((response: Array<UsuariosCartera>) => {
              return catalogsActions.GET_CAT_COMMERCIAL_LEADER_SUCCESS({
                listCommercialLeader: response,
              });
            }),
            catchError((error) => of(catalogsActions.GET_CAT_COMMERCIAL_LEADER_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getCatCoordinatorESAC = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_COORDINATOR_ESAC_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCoordinatorESAC)),
      mergeMap(([action, needsToReloadCatUser]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          Filters: [
            ...body.Filters,
            {
              NombreFiltro: 'CoordinadorDeServicioAlCliente',
              ValorFiltro: true,
            },
          ],
        };
        if (needsToReloadCatUser) {
          return this.sistemaUsuariosService.UsuarioObtenerListaUsuariosCartera(body).pipe(
            map((response: Array<UsuariosCartera>) =>
              catalogsActions.GET_CAT_COORDINATOR_ESAC_SUCCESS({
                listCoordinatorEsac: response.map((item) => item),
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_COORDINATOR_ESAC_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getCatRolProvider = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_ROL_PROVIDERS_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatRolProvider)),
      mergeMap(([action, needsToReloadCatRolProvider]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (needsToReloadCatRolProvider) {
          return this.catalogosService.catRolProveedorQueryResult(body).pipe(
            map((response: QueryResultCatRolProveedor) =>
              catalogsActions.GET_CAT_ROL_PROVIDERS_SUCCESS({
                lisCatRolProvider: response.Results.map((item) => item),
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_ROL_PROVIDERS_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getCatMoneda = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_MONEDA_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatMoneda)),
      mergeMap(([action, needsToReloadCatMoneda]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Moneda',
        };
        if (needsToReloadCatMoneda) {
          return this.catalogosService.catMonedaQueryResult(body).pipe(
            map((response: QueryResultCatMoneda) =>
              catalogsActions.GET_CAT_MONEDA_SUCCESS({
                lisCatMoneda: response.Results.map((item) => item),
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_MONEDA_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getCatReasonRejection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_REASON_REJECTION_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatReasonRejection)),
      mergeMap(([action, needsToReloadCatReasonRejection]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'RazonRechazo',
        };
        if (needsToReloadCatReasonRejection) {
          return this.adjustmentService.ajOfRazonRechazoQueryResult(body).pipe(
            map((response: QueryResultAjOfRazonRechazo) =>
              catalogsActions.GET_CAT_REASON_REJECTION_SUCCESS({
                listCatReasonRejection: response.Results,
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_REASON_REJECTION_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getCatPaymentConditions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_PAYMENT_CONDITIONS_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatPaymentConditions)),
      mergeMap(([action, needsToReloadCatPaymentConditions]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (needsToReloadCatPaymentConditions) {
          return this.catalogosService.catCondicionesDePagoQueryResult(body).pipe(
            map((response: QueryResultCatCondicionesDePago) =>
              catalogsActions.GET_CAT_PAYMENT_CONDITIONS_SUCCESS({
                listCatPaymentConditions: response.Results,
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_PAYMENT_CONDITIONS_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );
  getCatFreight$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_FREIGHT_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatFreight)),
      mergeMap(([action, needsToReloadCatFreight]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (needsToReloadCatFreight) {
          return this.catalogosService.catFleteraQueryResult(body).pipe(
            map((response: QueryResultCatFletera) =>
              catalogsActions.GET_CAT_FREIGHT_SUCCESS({
                listCatFreight: response.Results,
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_FREIGHT_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );
  getCatMedioDePago$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_MEDIO_DE_PAGO_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatMedioDePago)),
      mergeMap(([action, needsToReloadCatMedioDePago]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (needsToReloadCatMedioDePago) {
          return this.catalogosService.catMedioDePagoQueryResult(body).pipe(
            map((response: QueryResultCatMedioDePago) =>
              catalogsActions.GET_CAT_MEDIO_DE_PAGO_SUCCESS({
                listCatMedioDePago: response.Results,
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_MEDIO_DE_PAGO_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getCatSector = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_SECTOR_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatSector)),
      mergeMap(([action, needsToReloadCatSector]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (needsToReloadCatSector) {
          return this.catalogosService.catSectorQueryResult(body).pipe(
            map((response: QueryResultCatSector) =>
              catalogsActions.GET_CAT_SECTOR_SUCCESS({
                lisCatSector: response.Results,
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_SECTOR_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getCatIndustria = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_INDUSTRIA_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatFamilias)),
      mergeMap(([action, needsToReloadCatFamilias]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (needsToReloadCatFamilias) {
          return this.catalogosService.catIndustriaQueryResult(body).pipe(
            map((response: QueryResultCatIndustria) =>
              catalogsActions.GET_CAT_INDUSTRIA_SUCCESS({
                listCatIndustria: response.Results.map((item) => item),
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_INDUSTRIA_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getCatUnidadTiempo = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_UNIDAD_TIEMPO_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatUnidadTiempo)),
      mergeMap(([action, needsToReloadCatUnidadTiempo$]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (needsToReloadCatUnidadTiempo$) {
          return this.catalogosService.catUnidadTiempoQueryResult(body).pipe(
            map((response: QueryResultCatUnidadTiempo) =>
              catalogsActions.GET_CAT_UNIDAD_TIEMPO_SUCCESS({
                listCatUnidadTiempo: response.Results.map((item) => item),
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_UNIDAD_TIEMPO_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );

  // TODO: REVISAR SI ESTE CATALOGO SE ELIMINA
  getCatVFamilias = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_FAMILIAS_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatIndustria)),
      mergeMap(([action, needsToReloadCatIndustria]) => {
        const body = new FiltersOnlyActive();
        if (needsToReloadCatIndustria) {
          return this.configuracionProductosConfiguracionFamiliasService
            .vFamiliaQueryResult(body)
            .pipe(
              map((response: QueryResultVFamilia) =>
                catalogsActions.GET_CAT_FAMILIAS_SUCCESS({
                  listCatVFamilias: response.Results.map((item) => item),
                }),
              ),
              catchError((error) => of(catalogsActions.GET_CAT_FAMILIAS_FAILED())),
            );
        }
        return EMPTY;
      }),
    ),
  );

  getCatTipoValidacion = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_TIPO_VALIDACION_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatTipoValidacion)),
      mergeMap(([action, needsToReloadCatTipoValidacion]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (needsToReloadCatTipoValidacion) {
          return this.catalogosService.catTipoValidacionQueryResult(body).pipe(
            map((response: QueryResultCatTipoValidacion) =>
              catalogsActions.GET_CAT_TIPO_VALIDACION_SUCCESS({
                listCatTipoValidacion: response.Results.map((item) => item),
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_TIPO_VALIDACION_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getEmpresas = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_EMPRESAS_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadEmpresas)),
      mergeMap(([action, needsToReloadEmpresas]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (needsToReloadEmpresas) {
          return this.configuracionEmpresasService.EmpresaQueryResult(body).pipe(
            map((response: QueryResultEmpresa) =>
              catalogsActions.GET_CAT_EMPRESAS_SUCCESS({
                listEmpresas: response.Results.map((item) => item),
              }),
            ),
            catchError((error) => EMPTY),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getCatEstadoCotizacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_ESTADO_COTIZACION),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatEstadoCotizacion)),
      mergeMap(([action, needsToReloadCatEstadoCotizacion]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (needsToReloadCatEstadoCotizacion) {
          return this.catalogosService.catEstadoCotizacionQueryResult(body).pipe(
            map((response: QueryResultCatEstadoCotizacion) =>
              catalogsActions.GET_CAT_ESTADO_COTIZACION_SUCCESS({
                listCatEstadoCotizacion: response.Results,
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_ESTADO_COTIZACION_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getCatImportanciasClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_ROL_CLIENTS_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectCatImportancesClients)),
      mergeMap(([action, importanceClients]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (importanceClients.needsToReload) {
          return this.catalogosService.catImportanciaClienteQueryResult(body).pipe(
            map((response: QueryResultCatImportanciaCliente) =>
              catalogsActions.GET_CAT_IMPORTANCIAS_CLIENTE_SUCCESS({
                listImportanciasCliente: response.Results,
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_IMPORTANCIAS_CLIENTE_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getCatRoleClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_ROL_CLIENTS_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectCatRolClients)),
      mergeMap(([action, rolClients]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (rolClients.needsToReload) {
          return this.catalogosService.catRolClienteQueryResult(body).pipe(
            map((response: QueryResultCatRolCliente) =>
              catalogsActions.GET_CAT_ROL_CLIENTS_SUCCESS({
                listRolClientes: response.Results,
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_ROL_CLIENTS_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getCatTipoCotizacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_TIPO_COTIZACION),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatTipoCotizacion)),
      mergeMap(([action, needsToReloadCatTipoCotizacion]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (needsToReloadCatTipoCotizacion) {
          return this.catalogosService.catTipoCotizacionQueryResult(body).pipe(
            map((response: QueryResultCatTipoCotizacion) =>
              catalogsActions.GET_CAT_TIPO_COTIZACION_SUCCESS({
                listCatTipoCotizacion: response.Results,
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_TIPO_COTIZACION_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getCatTipoPartidaCotizacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_TIPO_PARTIDA_COTIZACION),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatTipoPartidaCotizacion)),
      mergeMap(([action, needsToReloadCatTipoPartidaCotizacion]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (needsToReloadCatTipoPartidaCotizacion) {
          return this.catalogosService.catTipoPartidaCotizacionQueryResult(body).pipe(
            map((response: QueryResultCatTipoPartidaCotizacion) =>
              catalogsActions.GET_CAT_TIPO_PARTIDA_COTIZACION_SUCCESS({
                listCatTipoPartidaCotizacion: response.Results,
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_TIPO_PARTIDA_COTIZACION_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );
  getCatUsoCFDI$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_USO_CFDI),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatUsoCFDI)),
      mergeMap(([action, needsToReloadCatUsoCFDI]) => {
        let body = new FiltersOnlyActive(true);
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (needsToReloadCatUsoCFDI) {
          return this.catalogosService.catUsoCFDIQueryResult(body).pipe(
            map((response: QueryResultCatUsoCFDI) =>
              catalogsActions.GET_CAT_USO_CFDI_SUCCESS({
                listCatUsoCFDI: response.Results,
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_USO_CFDI_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );
  getCatMetodoDePagoCFDI$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_METODO_DE_PAGO),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatMetodoDePagoCFDI)),
      mergeMap(([action, needsToReloadCatMetodoDePagoCFDI]) => {
        let body = new FiltersOnlyActive(true);
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (needsToReloadCatMetodoDePagoCFDI) {
          return this.catalogosService.catMetodoDePagoCFDIQueryResult(body).pipe(
            map((response: QueryResultCatMetodoDePagoCFDI) =>
              catalogsActions.GET_CAT_METODO_DE_PAGO_SUCCESS({
                listCatMetodoDePagoCFDI: response.Results,
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_METODO_DE_PAGO_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );

  //TODO: REVISAR SI SE ELIMINA,NO SE ESTÁ USANDO
  getListaProveedores = createEffect(() =>
    this.actions$.pipe(
      ofType(GET_PROVIDERS_LOAD),
      mergeMap((action) =>
        this.configuracionProveedoresService.vProveedorResumenQueryResult(action.payload).pipe(
          map(
            (response: QueryResultVProveedorResumen) => GET_PROVIDERS_SUCCESS({payload: response}),
            catchError((error) => of(GET_PROVIDERS_ERROR({error}))),
          ),
        ),
      ),
    ),
  );

  //TODO: REVISAR SI SE ELIMINA,NO SE ESTÁ USANDO
  // DOCS recupera listado de VProveedor   filtro en select
  getListaVProveedor = createEffect(() =>
    this.actions$.pipe(
      ofType(GET_VPROVIDERS_LOAD),
      mergeMap((action) =>
        this.configuracionProveedoresService
          .vProveedorQueryResult({
            Filters: [
              {
                NombreFiltro: 'Activo',
                ValorFiltro: true,
              },
              {
                NombreFiltro: 'EsPrincipal',
                ValorFiltro: true,
              },
            ],
          })
          .pipe(
            map(
              (response: QueryResultVProveedor) =>
                GET_VPROVIDERS_SUCCESS({payload: response.Results}),
              catchError((error) => of(GET_VPROVIDERS_ERROR({error}))),
            ),
          ),
      ),
    ),
  );

  // FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
  /*getFamiliasProveedor = createEffect(() =>
    this.actions$.pipe(
      ofType(GET_FAMILY_PROVIDER_LOAD),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.configuracionProveedoresService
          .vProveedorFamiliaQueryResult(action.payload)
          .pipe(
            map((response) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              return GET_FAMILY_PROVIDER_SUCCESS({payload: response});
            }),
            catchError((error) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(GET_FAMILY_PROVIDER_ERROR({error}));
            }),
          );
      }),
    ),
  );*/

  //TODO: REVISAR SI SE ELIMINA,NO SE ESTÁ USANDO
  getListAgentes = createEffect(() =>
    this.actions$.pipe(
      ofType(GET_LIST_AGENTES_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectOfferCatalog)),
      mergeMap(([action, offer]) => {
        if (offer.honorariosAA.needsToReload) {
          // this.store.dispatch(SET_LOADING({payload: true}));
          return this.configuracionAduanasService.AgenteAduanalQueryResult(action.payload).pipe(
            map((response: QueryResultAgenteAduanal) => {
              return GET_LIST_AGENTES_SUCCESS({payload: response.Results});
            }),
            catchError((error) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(GET_LIST_AGENTES_ERROR({error}));
            }),
          );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  //TODO: REVISAR SI SE ELIMINA,NO SE ESTÁ USANDO
  getListConceptosAA = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FILTER_LIST_CONCEPTOSAA),
        withLatestFrom(this.store.select(catalogsSelectors.selectListConceptosAA)),
        tap(([action, conceptosAA]) => {
          let conceptosAAFiltered = [];
          if (conceptosAA.listCAA.length > 0) {
            conceptosAAFiltered = conceptosAA.listCAA.filter(
              (item) => item.IdAgenteAduanal === action.payload,
            );
          }
          this.store.dispatch(FILTER_LIST_CONCEPTOSAA_SUCCESS({payload: conceptosAAFiltered}));
        }),
      ),
    {dispatch: false},
  );

  //TODO: REVISAR SI SE ELIMINA,NO SE ESTÁ USANDO
  filterListConceptosAA = createEffect(() =>
    this.actions$.pipe(
      ofType(GET_LIST_CONCEPTOSAA_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectOfferCatalog)),
      mergeMap(([action, offer]) => {
        if (offer.conceptosAA.needsToReload) {
          // this.store.dispatch(SET_LOADING({payload: true}));
          return this.configuracionAduanasService
            .ConceptoAgenteAduanalQueryResult(action.payload)
            .pipe(
              map((response) => {
                return GET_LIST_CONCEPTOSAA_SUCCESS({
                  payload: response.Results,
                });
              }),
              catchError((error) => {
                this.store.dispatch(SET_LOADING({payload: false}));
                return of(GET_LIST_CONCEPTOSAA_ERROR({error}));
              }),
            );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  getConceptoAgenteAduanal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_LIST_CONCEPTS_CUSTOM_AGENT_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectNeedToReloadConceptoAgenteAduanal)),
      mergeMap(([action, needsToReload]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Concepto',
        };
        if (needsToReload) {
          return this.configuracionAduanasService.ConceptoAgenteAduanalQueryResult(body).pipe(
            map((response: QueryResultConceptoAgenteAduanal) => {
              return catalogsActions.GET_LIST_CONCEPTS_CUSTOM_AGENT_SUCCESS({
                listConceptoAgenteAduanal: response.Results,
              });
            }),
            catchError((error) => {
              return of(catalogsActions.GET_LIST_CONCEPTS_CUSTOM_AGENT_ERROR({error}));
            }),
          );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  getListAduana$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_LIST_ADUANA_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectNeedToReloadAduana)),
      mergeMap(([action, needsToReload]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'NombreLugar',
        };
        if (needsToReload) {
          return this.configuracionAduanasService.AduanaQueryResult(body).pipe(
            map((response: QueryResultAduana) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar Lista Aduana.',
                ),
                response,
              );
              return catalogsActions.GET_LIST_ADUANA_SUCCESS({
                listAduana: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al consultar Lista Aduana.',
                ),
                error,
              );
              return of(catalogsActions.GET_LIST_ADUANA_ERROR());
            }),
          );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  getAgenteAduanal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_LIST_AGENTE_ADUANAL_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectNeedToReloadAgenteAduanal)),
      mergeMap(([action, needsToReload]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'NombreComercial',
        };
        if (needsToReload) {
          return this.configuracionAduanasService.AgenteAduanalQueryResult(body).pipe(
            map((response: QueryResultAgenteAduanal) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al consultar Lista Agente Aduanal.',
                ),
                response,
              );
              return catalogsActions.GET_LIST_AGENTE_ADUANAL_SUCCESS({
                listAgenteAduanal: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al consultar Lista Agente Aduanal.',
                ),
                error,
              );
              return of(catalogsActions.GET_LIST_AGENTE_ADUANAL_ERROR());
            }),
          );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  getCatIncoterm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_INCOTERM_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectNeedToReloadAgenteAduanal)),
      mergeMap(([action, needsToReload]) => {
        if (needsToReload) {
          return this.catalogosService
            .catIncotermQueryResult({SortDirection: 'asc', SortField: 'Orden'})
            .pipe(
              map((response: QueryResultCatIncoterm) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al consultar el catálogo de Incoterm.',
                  ),
                  response,
                );
                return catalogsActions.GET_CAT_INCOTERM_SUCCESS({
                  listIncoterm: response.Results,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al consultar el catálogo de Incoterm.',
                  ),
                  error,
                );
                return of(catalogsActions.GET_CAT_INCOTERM_ERROR());
              }),
            );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  // TODO: REVISAR SI SE ELIMINA, NO SE ESTÁ USANDO
  getListProductos = createEffect(() =>
    this.actions$.pipe(
      ofType(GET_PRODUCTS_LOAD),
      mergeMap(({payload}) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return forkJoin([
          this.configuracionClientesCalculosService.ConfiguracionAplicadaProveedoGroupQueryResult(
            payload[0],
          ),
          this.configuracionClientesCalculosService.ConfiguracionAplicadaProveedoGroupQueryResult(
            payload[1],
          ),
          this.configuracionClientesCalculosService.ConfiguracionAplicadaProveedoGroupQueryResult(
            payload[2],
          ),
          this.configuracionClientesCalculosService.ConfiguracionAplicadaProveedoGroupQueryResult(
            payload[3],
          ),
        ]).pipe(
          map((response) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            return GET_PRODUCTS_SUCCESS(this.filtroProductos(response));
          }),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(GET_PRODUCTS_ERROR({error}));
          }),
        );
      }),
    ),
  );

  // DOCS: obtencion del catalogo de restricciones flete
  getFreightRestrictions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_RESTRICCIONES_FLETE_LOAD),
      withLatestFrom(
        this.store.select(catalogsSelectors.selectNeedsToReloadCatRestriccionesFletes),
      ),
      mergeMap(([action, needsToReload]) => {
        if (needsToReload) {
          return this.catalogosService
            .catRestriccionFleteQueryResult({SortDirection: 'asc', SortField: 'Clave'})
            .pipe(
              map((response: QueryResultCatRestriccionFlete) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al consultar el catálogo restricciones flete',
                  ),
                  response,
                );
                return catalogsActions.GET_CAT_RESTRICCIONES_FLETE_SUCCESS({
                  listRestriccionesFlete: response.Results,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al consultar el catálogo restricciones flete',
                  ),
                  error,
                );
                return of(catalogsActions.GET_CAT_RESTRICCIONES_FLETE_FAILED());
              }),
            );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  getListTypeVehicle = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_LIST_VEHICLE_TYPE_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectNeedToReloadCatVehicleType)),
      mergeMap(([action, needsToReload]) => {
        if (needsToReload) {
          return this.catalogosService
            .catTipoVehiculoQueryResult({
              SortDirection: 'asc',
              SortField: 'FechaRegistro',
            })
            .pipe(
              map((response: QueryResultCatTipoVehiculo) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al consultar el catálogo de Tipo de Vehiculo.',
                  ),
                  response,
                );
                return catalogsActions.GET_LIST_VEHICLE_TYPE_SUCCESS({
                  listVehicleType: response.Results,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al consultar el catálogo de Vehiculo.',
                  ),
                  error,
                );
                return of(catalogsActions.GET_LIST_VEHICLE_TYPE_ERROR());
              }),
            );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  getListBrandVehicle = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_LIST_VEHICLE_BRANDS_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectNeedToReloadCatVehicleBrand)),
      mergeMap(([action, needsToReload]) => {
        if (needsToReload) {
          return this.catalogosService
            .catMarcaVehiculoQueryResult({
              SortDirection: 'asc',
              SortField: 'FechaRegistro',
            })
            .pipe(
              map((response: QueryResultCatMarcaVehiculo) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al consultar el catálogo de Marca de Vehiculos.',
                  ),
                  response,
                );
                return catalogsActions.GET_LIST_VEHICLE_BRANDS_SUCCESS({
                  listVehicleBrand: response.Results,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al consultar el catálogo de Marcas de Vehiculos.',
                  ),
                  error,
                );
                return of(catalogsActions.GET_LIST_VEHICLE_BRANDS_ERROR());
              }),
            );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  // TODO: REVISAR SI SE ELIMINA, NO SE ESTÁ USANDO
  getFiltrarPecioLista = createEffect(() =>
    this.actions$.pipe(
      ofType(GET_PRECIOLISTA_LOAD),
      mergeMap(({payload}) => {
        this.store.dispatch(SET_LOADING({payload: true}));

        return this.configuracionClientesCalculosService
          .ConfiguracionAplicadaProveedoGroupQueryResult(payload[0])
          .pipe(
            map((response) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              return GET_PRECIOLISTA_SUCCESS(this.filtroListaPrecio(response));
            }),
            catchError((error) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(GET_PRECIOLISTA_ERROR({error}));
            }),
          );
      }),
    ),
  );
  // TODO: REVISAR SI SE ELIMINA, NO SE ESTÁ USANDO
  getListaContactos = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.GET_LISTACONTACTOS_CLIENTE_LOAD),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));

        return this.configuracionContactosService.vContactoQueryResult(action.payload).pipe(
          map((response) => response),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(clientActions.GET_LISTACONTACTOS_CLIENTE_ERROR(error));
          }),
        );
      }),
      switchMap((result) => {
        const datos = this.adminDatos(result, 'Results');
        if (datos && datos.length > 0) {
          const body = {};
          const requests = datos.map((contact) =>
            this.configuracionContactosService.CorreoElectronicoQueryResult({
              Filters: [
                {
                  NombreFiltro: 'IdDatosPersona',
                  ValorFiltro: contact.IdDatosPersona,
                },
              ],
            }),
          );
          const requestrAux: Array<GroupQueryResultVNumeroTelefonico> = concat(
            requests,
            datos.map((contact) =>
              this.configuracionContactosService.vNumeroTelefonicoGroupQueryResult({
                Filters: [
                  {
                    NombreFiltro: 'IdDatosPersona',
                    ValorFiltro: contact.IdDatosPersona,
                  },
                ],
                GroupColumn: 'TipoNumeroTelefonico',
              }),
            ),
          );
          return forkJoin(requestrAux).pipe(
            map((response) => {
              const media = Math.trunc(response.length / 2);
              let correos: any[] = [];
              let telefonos: any[] = [];
              const listaC: Persona[] = [];
              let itemC: Persona = new Persona();
              for (let i = 0; i < datos.length; i++) {
                itemC = new Persona();
                itemC = datos[i];
                if (media >= i) {
                  correos = this.adminDatos(response[i], 'Results');
                  itemC.Correos = correos;
                  telefonos = this.adminDatos(response[media + i], 'Groups');
                  itemC.Telefonos = telefonos;
                }
                listaC.push(itemC);
              }
              this.store.dispatch(SET_LOADING({payload: false}));
              return clientActions.GET_LISTACONTACTOS_CLIENTE_SUCCES({
                payload: listaC,
              });
            }),
            catchError((error) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(clientActions.GET_LISTACONTACTOS_CLIENTE_ERROR({error}));
            }),
          );
        } else {
          this.store.dispatch(SET_LOADING({payload: false}));
          // return clientActions.GET_LISTACONTACTOS_CLIENTE_SUCCES({payload: datos});
          return of<any>(clientActions.GET_LISTACONTACTOS_CLIENTE_SUCCES({payload: datos}));
        }
      }),
    ),
  );

  // TODO: REVISAR SI SE ELIMINA, NO SE ESTÁ USANDO
  updateDatosGeneralesCliente = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.GET_DATOSGENERALES_UPDATE),
      mergeMap((action: any) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const cliente: Cliente = new Cliente();
        let clienteAux: Cliente = new Cliente();
        clienteAux = action.payload.datosCliente;
        cliente.IdCliente = clienteAux.IdCliente;
        cliente.IdCatCorporativo = clienteAux.IdCatCorporativo;
        cliente.Nombre = clienteAux.Nombre;
        cliente.Alias = clienteAux.Alias;
        cliente.IdCatRolCliente = clienteAux.IdCatRolCliente;
        cliente.IdCatSector = clienteAux.IdCatSector;
        cliente.IdCatIndustria = clienteAux.IdCatIndustria;
        cliente.ObjetivoCrecimientoDeseado = clienteAux.ObjetivoCrecimientoDeseado;
        cliente.ObjetivoCrecimientoFundamental = clienteAux.ObjetivoCrecimientoFundamental;
        cliente.Contrato = clienteAux.Contrato;
        cliente.Pagina = clienteAux.Pagina;
        cliente.PortalFactura = clienteAux.PortalFactura;
        cliente.IdCatNivelIngreso = clienteAux.IdCatNivelIngreso;
        cliente.FechaRegistro = clienteAux.FechaRegistro;
        cliente.FechaUltimaActualizacion = clienteAux.FechaUltimaActualizacion;
        cliente.Activo = clienteAux.Activo;
        cliente.IdConfiguracionPagos = clienteAux.IdConfiguracionPagos;
        cliente.IdCatImportanciaCliente = clienteAux.IdCatImportanciaCliente;
        cliente.EsTerceroAutorizado = clienteAux.EsTerceroAutorizado;
        cliente.IdUxFaseWizard = clienteAux.IdUxFaseWizard;

        return this.configuracionClientesService.ClienteGuardarOActualizar(cliente).pipe(
          map((responseId) => {
            const datos = {
              contactoDelete: action.payload.listaContactosEliminados,
              listaContactosEdit: action.payload.listaContactosModificados,
              idCliente: clienteAux.IdCliente,
            };
            return datos;
          }),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(clientActions.GET_DATOSGENERALES_UPDATE_ERROR(error));
          }),
        );
      }),
      switchMap((response: any) => {
        if (response.listaContactosEdit.length > 0) {
          const datosP = response.listaContactosEdit;
          const request = datosP.map((contact) =>
            this.configuracionContactosService.DatosPersonaGuardarOActualizarResponse({
              IdDatosPersona: contact.IdDatosPersona,
              Prioridad: contact.Prioridad,
              Titulo: contact.Titulo,
              Nombres: contact.Nombres,
              ApellidoPaterno: contact.ApellidoPaterno,
              ApellidoMaterno: contact.ApellidoMaterno,
              Puesto: contact.Puesto,
              Departamento: contact.Departamento,
              IdCatNivelDecision: contact.IdCatNivelDecision,
              IdCatNivelPuesto: contact.IdCatNivelPuesto,
              AgregadoExpo: contact.AgregadoExpo,
              OrigenRegistro: contact.OrigenRegistro,
              IdCatDificultad: contact.IdCatDificultad,
              IdCatMantenimiento: contact.IdCatMantenimiento,
              FechaRegistro: contact.FechaRegistro,
              FechaUltimaActualizacion: contact.FechaUltimaActualizacion,
            }),
          );
          return forkJoin(request).pipe(
            map((idPersona) => {
              const datos = {
                contactoDelete: response.contactoDelete,
                listaContactosEdit: response.listaContactosEdit,
                personaId: idPersona,
                idCliente: response.idCliente,
              };
              return datos;
            }),
            catchError((error) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(clientActions.GET_DATOSGENERALES_UPDATE_ERROR(error));
            }),
          );
        } else {
          this.store.dispatch(SET_LOADING({payload: false}));
          // return (clientActions.GET_DATOSGENERALES_UPDATE_SUCCES({payload: {status: true}}));
          const datos = {
            listaContactosEdit: response.listaContactosModificados,
            idCliente: response.idCliente,
            contactoDelete: response.contactoDelete,
          };
          return of<any>(datos);
        }
      }),
      switchMap((response: any) => {
        const requestDatos: any[] = [];
        const requestTel: any[] = [];
        const body: Correo = new Correo();
        let tel: Telefono = new Telefono();
        let tel1: Telefono = new Telefono();
        let tel2: Telefono = new Telefono();
        const correosClientes: Persona[] = response.listaContactosEdit;
        for (let i = 0; i < correosClientes.length; i++) {
          tel = new Telefono();
          tel1 = new Telefono();
          tel2 = new Telefono();
          body.Correo = correosClientes[i].Correos[0].Correo;
          body.IdCorreoElectronico = correosClientes[i].Correos[0].IdCorreoElectronico;
          const id = response.personaId[i];
          body.IdDatosPersona = id.toString();
          body.Correo = correosClientes[i].Correos[0].Correo;
          body.FechaRegistro = correosClientes[i].Correos[0].FechaRegistro;
          body.Activo = correosClientes[i].Correos[0].Activo;
          tel.IdDatosPersona = response.personaId[i];
          tel1.IdDatosPersona = response.personaId[i];
          tel2.IdDatosPersona = response.personaId[i];
          requestDatos.push(
            this.configuracionContactosService.CorreoElectronicoGuardarOActualizar(body),
          );
          if (correosClientes[i].Telefonos['Móvil'] !== undefined) {
            tel.IdNumeroTelefonico =
              correosClientes[i].Telefonos['Móvil'].Results[0].IdNumeroTelefonico;
            tel.Numero = correosClientes[i].Telefonos['Móvil'].Results[0].Numero;
            tel.Activo = correosClientes[i].Telefonos['Móvil'].Results[0].Activo;
            tel.Extension = correosClientes[i].Telefonos['Móvil'].Results[0].Extension;
            tel.FechaRegistro = correosClientes[i].Telefonos['Móvil'].Results[0].FechaRegistro;
            tel.IdCatTipoNumeroTelefonico =
              correosClientes[i].Telefonos['Móvil'].Results[0].IdCatTipoNumeroTelefonico;
            requestTel.push(
              this.configuracionContactosService.NumeroTelefonicoGuardarOActualizar(tel),
            );
          }
          if (correosClientes[i].Telefonos['Telefono 1'] !== undefined) {
            tel1.IdNumeroTelefonico =
              correosClientes[i].Telefonos['Telefono 1'].Results[0].IdNumeroTelefonico;
            tel1.Numero = correosClientes[i].Telefonos['Telefono 1'].Results[0].Numero;
            tel1.Activo = correosClientes[i].Telefonos['Telefono 1'].Results[0].Activo;
            tel1.Extension = correosClientes[i].Telefonos['Telefono 1'].Results[0].Extension;
            tel1.FechaRegistro =
              correosClientes[i].Telefonos['Telefono 1'].Results[0].FechaRegistro;
            tel1.IdCatTipoNumeroTelefonico =
              correosClientes[i].Telefonos['Telefono 1'].Results[0].IdCatTipoNumeroTelefonico;
            requestTel.push(
              this.configuracionContactosService.NumeroTelefonicoGuardarOActualizar(tel1),
            );
          }
          if (correosClientes[i].Telefonos['Telefono 2'] !== undefined) {
            tel2.IdNumeroTelefonico =
              correosClientes[i].Telefonos['Telefono 2'].Results[0].IdNumeroTelefonico;
            tel2.Numero = correosClientes[i].Telefonos['Telefono 2'].Results[0].Numero;
            tel2.Activo = correosClientes[i].Telefonos['Telefono 2'].Results[0].Activo;
            tel2.Extension = correosClientes[i].Telefonos['Telefono 2'].Results[0].Extension;
            tel2.FechaRegistro =
              correosClientes[i].Telefonos['Telefono 2'].Results[0].FechaRegistro;
            tel2.IdCatTipoNumeroTelefonico =
              correosClientes[i].Telefonos['Telefono 2'].Results[0].IdCatTipoNumeroTelefonico;
            requestTel.push(
              this.configuracionContactosService.NumeroTelefonicoGuardarOActualizar(tel2),
            );
          }
        }
        const datosRequest = concat(requestDatos, requestTel);
        return forkJoin(datosRequest).pipe(
          map((idResponse) => {
            return {
              correosClientes: response.listaContactosEdit,
              idPersona: response.personaId,
              idCliente: response.idCliente,
              contactoDelete: response.contactoDelete,
            };
          }),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(clientActions.GET_DATOSGENERALES_UPDATE_ERROR(error));
          }),
        );
      }),
      switchMap((responsePersona: any) => {
        const dateNow = new Date().toISOString();
        let contacto: Contacto = new Contacto();
        const correosClientes: Persona[] = responsePersona.correosClientes;
        const requestContacto: any[] = [];
        for (let i = 0; i < correosClientes.length; i++) {
          ///// CONTACTOS
          contacto = new Contacto();
          contacto.Activo = true;
          contacto.FechaCaducidadRegistro = dateNow.toString();
          if (correosClientes[i].FechaRegistro !== undefined) {
            contacto.FechaRegistro = correosClientes[i].FechaRegistro;
          } else {
            contacto.FechaRegistro = dateNow.toString();
          }
          contacto.Rol = '';
          contacto.Prioridad = 0;
          contacto.IdContacto = correosClientes[i].IdContacto;
          contacto.IdDatosPersona = responsePersona.idPersona[i];
          contacto.FechaUltimaActualizacion = dateNow.toString();
          if (contacto.IdContacto === '00000000-0000-0000-0000-000000000000') {
            requestContacto.push(
              this.configuracionContactosService.ContactoGuardarOActualizar(contacto),
            );
          }
        }
        if (requestContacto.length > 0) {
          return forkJoin(requestContacto).pipe(
            switchMap((responseContacto: any) => {
              const requestContactoCliente: any[] = [];
              const dateNow = new Date().toISOString();
              for (let i = 0; i < responseContacto.length; i++) {
                const body = {
                  IdContactoCliente: '00000000-0000-0000-0000-000000000000',
                  IdCliente: responsePersona.idCliente,
                  IdContacto: responseContacto[i],
                  FechaRegistro: dateNow.toString(),
                  FechaCaducidadRegistro: dateNow.toString(),
                  FechaUltimaActualizacion: dateNow.toString(),
                  Activo: true,
                };
                requestContactoCliente.push(
                  this.configuracionClientesRelacionesService.ContactoClienteGuardarOActualizar(
                    body,
                  ),
                );
              }
              return forkJoin(requestContactoCliente).pipe(
                map((idResponse) => {
                  const body = {eliminados: responsePersona.contactoDelete};
                  return body;
                }),
                catchError((error) => {
                  this.store.dispatch(SET_LOADING({payload: false}));
                  return of(clientActions.GET_DATOSGENERALES_UPDATE_ERROR(error));
                }),
              );
            }),
          );
        } else {
          const datos = {
            eliminados: responsePersona.contactoDelete,
          };
          return of<any>(datos);
        }
      }),
      switchMap((responseDelete: any) => {
        if (responseDelete.eliminados.length > 0) {
          const lista = responseDelete.eliminados;
          const requestContactoCliente = lista.map((contacto) =>
            this.configuracionContactosService.ContactoDesactivar(contacto.IdContacto),
          );
          return forkJoin(requestContactoCliente).pipe(
            map((idResponse) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              return clientActions.GET_DATOSGENERALES_UPDATE_SUCCES({
                payload: {status: true},
              });
            }),
            catchError((error) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(clientActions.GET_DATOSGENERALES_UPDATE_ERROR(error));
            }),
          );
        } else {
          this.store.dispatch(SET_LOADING({payload: false}));
          return of<any>(
            clientActions.GET_DATOSGENERALES_UPDATE_SUCCES({
              payload: {status: true},
            }),
          );
        }
      }),
    ),
  );

  // TODO: REVISAR SI SE ELIMINA, NO SE ESTÁ USANDO
  //////////////// Llamadas anidadas para guardar la seccion de horarios ///
  saveDireccionEntrega = createEffect(() =>
    this.actions$.pipe(
      ofType(catAddressActions.SAVE_DIRECCION_ENTREGA_LOAD),
      mergeMap((action) => {
        return this.configuracionDireccionesService
          .DireccionGuardarOActualizar(action.payload)
          .pipe(
            map((response) => {
              return catAddressActions.SAVE_DIRECCION_ENTREGA_SUCCESS({
                payload: response,
              });
            }),
            catchError((error) => {
              return of<any>(catAddressActions.SAVE_DIRECCION_ENTREGA_ERROR(error));
            }),
          );
      }),
    ),
  );

  // TODO: REVISAR SI SE ELIMINA, NO SE ESTÁ USANDO
  saveHorario = createEffect(() =>
    this.actions$.pipe(
      ofType(catScheduleActions.SAVE_HORARIO_LOAD),
      mergeMap((action) => {
        return this.configuracionClientesDireccionesService
          .HorarioAtencionGuardarOActualizar(action.payload)
          .pipe(
            map((response) => {
              return catScheduleActions.SAVE_HORARIO_SUCCESS({
                payload: response,
              });
            }),
            catchError((error) => {
              return of<any>(catScheduleActions.SAVE_HORARIO_ERROR(error));
            }),
          );
      }),
    ),
  );
  // TODO: REVISAR SI SE ELIMINA, NO SE ESTÁ USANDO
  saveHorarioCobro = createEffect(() =>
    this.actions$.pipe(
      ofType(catScheduleActions.SAVE_HORARIO_COBRO_LOAD),
      mergeMap((action) => {
        return this.configuracionClientesDireccionesService
          .HorarioAtencionCobroGuardarOActualizar(action.payload)
          .pipe(
            map((response) => {
              return catScheduleActions.SAVE_HORARIO_COBRO_SUCCESS({
                payload: response,
              });
            }),
            catchError((error) => {
              return of<any>(catScheduleActions.SAVE_HORARIO_COBRO_ERROR(error));
            }),
          );
      }),
    ),
  );
  // TODO: REVISAR SI SE ELIMINA, NO SE ESTÁ USANDO
  saveHorarioEntregas = createEffect(() =>
    this.actions$.pipe(
      ofType(catScheduleActions.SAVE_HORARIO_ENTREGA_LOAD),
      mergeMap((action) => {
        return this.configuracionClientesDireccionesService
          .HorarioAtencionEntregaGuardarOActualizar(action.payload)
          .pipe(
            map((response) => {
              return catScheduleActions.SAVE_HORARIO_ENTREGA_SUCCESS({
                payload: response,
              });
            }),
            catchError((error) => {
              return of<any>(catScheduleActions.SAVE_HORARIO_ENTREGA_ERROR(error));
            }),
          );
      }),
    ),
  );
  // TODO: REVISAR SI SE ELIMINA, NO SE ESTÁ USANDO
  saveHorarioRevision = createEffect(() =>
    this.actions$.pipe(
      ofType(catScheduleActions.SAVE_HORARIO_REVISION_LOAD),
      mergeMap((action) => {
        return this.configuracionClientesDireccionesService
          .HorarioAtencionRevisionGuardarOActualizar(action.payload)
          .pipe(
            map((response) => {
              return catScheduleActions.SAVE_HORARIO_REVISION_SUCCESS({
                payload: response,
              });
            }),
            catchError((error) => {
              return of<any>(catScheduleActions.SAVE_HORARIO_REVISION_ERROR(error));
            }),
          );
      }),
    ),
  );
  // TODO: REVISAR SI SE ELIMINA, NO SE ESTÁ USANDO
  saveHorarioVisitas = createEffect(() =>
    this.actions$.pipe(
      ofType(catScheduleActions.SAVE_HORARIO_VISITA_LOAD),
      mergeMap((action) => {
        return this.configuracionClientesDireccionesService
          .HorarioAtencionVisitaGuardarOActualizar(action.payload)
          .pipe(
            map((response) => {
              return catScheduleActions.SAVE_HORARIO_VISITA_SUCCESS({
                payload: response,
              });
            }),
            catchError((error) => {
              return of<any>(catScheduleActions.SAVE_HORARIO_VISITA_ERROR(error));
            }),
          );
      }),
    ),
  );
  // TODO: REVISAR SI SE ELIMINA, NO SE ESTÁ USANDO
  saveCondicionesEntregaDireccion = createEffect(() =>
    this.actions$.pipe(
      ofType(catScheduleActions.SAVE_RESTRICCION_ENTREGA_LOAD),
      mergeMap((action) => {
        return this.configuracionClientesDireccionesService
          .DatosDireccionClienteGuardarOActualizar(action.payload)
          .pipe(
            map((response) => {
              return catScheduleActions.SAVE_RESTRICCION_ENTREGA_SUCCESS({
                payload: response,
              });
            }),
            catchError((error) => {
              return of<any>(catScheduleActions.SAVE_RESTRICCION_ENTREGA_ERROR(error));
            }),
          );
      }),
    ),
  );
  // Obtención de marcas
  getCatBrand = createEffect(() =>
    this.actions$.pipe(
      ofType(catBrandActions.GET_CAT_BRANDS_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.getCatBrands)),
      mergeMap(([action, brands]) => {
        if (brands.needsToReload) {
          return this.marcasService
            .MarcaQueryResult(patchBody(null, null, true, null, 'Nombre'))
            .pipe(
              map((response: QueryResultMarca) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    LOG_SUCCEEDED,
                    FILE_NAME,
                    '@getBrands: ' + response,
                  ),
                );
                return catBrandActions.GET_CAT_BRANDS_SUCCESS({
                  list: patchDropListOption(response.Results, 'IdMarca', 'Nombre'),
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(LOG_FAILED, FILE_NAME, '@getBrands: ' + error),
                );
                return of(catBrandActions.GET_CAT_BRANDS_ERROR(error));
              }),
            );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  // Obtención de cat Unidad
  getCatUnidad = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_UNIDAD_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.getCatUnit)),
      mergeMap(([action, catUnit]) => {
        if (catUnit.needsToReload) {
          return this.catalogosService
            .catUnidadQueryResult(patchBody(null, null, true, null, 'Unidad'))
            .pipe(
              map((response: QueryResultCatUnidad) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    LOG_SUCCEEDED,
                    FILE_NAME,
                    '@getUnits: ' + response,
                  ),
                );
                return catalogsActions.GET_UNIDAD_SUCCESS({
                  listDropList: getArrayForDropDownList(response.Results, 'IdCatUnidad', 'Unidad'),
                  listDropListPqf: getArrayForDropListOptionsPqf(
                    response.Results,
                    'IdCatUnidad',
                    'Unidad',
                  ),
                });
              }),
              catchError((error) => {
                return of(catalogsActions.GET_UNIDAD_ERROR(error));
              }),
            );
        } else {
          return EMPTY;
        }
      }),
    ),
  );
  // Cat Tipo Producto
  getCatTipoProducto = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_TIPO_PRODUCTO_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.getCatTypeProduct)),
      mergeMap(([action, catTypeProduct]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clave',
        };
        if (catTypeProduct.needsToReload) {
          return this.catalogosService.catTipoProductoQueryResult(body).pipe(
            map((response: QueryResultCatTipoProducto) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  LOG_SUCCEEDED,
                  FILE_NAME,
                  '@getTypeProduct: ' + response,
                ),
              );
              return catalogsActions.GET_TIPO_PRODUCTO_SUCCESS({
                list: getArrayForDropDownList(response.Results, 'IdCatTipoProducto', 'Tipo'),
              });
            }),
            catchError((error) => {
              return of(catalogsActions.GET_TIPO_PRODUCTO_ERROR(error));
            }),
          );
        } else {
          return EMPTY;
        }
      }),
    ),
  );
  // Cat Lineas de Productos
  getCatLinesProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GET_CAT_LINES_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.getCatLinesProducts)),
      mergeMap(([action, catLinesProducts]) => {
        if (catLinesProducts.needsToReload) {
          return this.catalogosService
            .catLineaQueryResult(patchBody(null, null, true, null, 'Linea'))
            .pipe(
              map((response: QueryResultCatLinea) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    LOG_SUCCEEDED,
                    FILE_NAME,
                    '@getCatLinesProducts$: ' + response,
                  ),
                );
                return GET_CAT_LINES_SUCCESS({
                  list: patchDropListOption(response.Results, 'IdCatLinea', 'Linea'),
                });
              }),
              catchError((error) => {
                return of(GET_CAT_LINES_ERROR(error));
              }),
            );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  /*Cat Proceso*/
  getCatProcess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_PROCESS_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectNeedToReloadProcess)),
      mergeMap(([action, needToReload]) => {
        if (needToReload) {
          return this.catalogosService
            .catProcesoQueryResult(patchBody(null, null, true, null, 'Proceso'))
            .pipe(
              map((response: QueryResultCatProceso) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    LOG_SUCCEEDED,
                    FILE_NAME,
                    'Al obtener el catálogo de procesos ',
                  ),
                  response,
                );
                return catalogsActions.GET_CAT_PROCESS_SUCCESS({
                  listCatProcess: response.Results,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    LOG_FAILED,
                    FILE_NAME,
                    'Al obtener el catálogo de procesos ',
                  ),
                  error,
                );
                return of(catalogsActions.GET_CAT_PROCESS_FAILED());
              }),
            );
        } else {
          return EMPTY;
        }
      }),
    ),
  );
  /*Cat Prioridades*/
  getCatPriority$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_PRIORITY_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectNeedToReloadPriority)),
      mergeMap(([action, needToReload]) => {
        if (needToReload) {
          return this.catalogosService
            .catPrioridadQueryResult(patchBody(null, null, true, null, 'Prioridad'))
            .pipe(
              map((response: QueryResultCatPrioridad) => {
                return catalogsActions.GET_CAT_PRIORITY_SUCCESS({
                  listPriority: response.Results,
                });
              }),
              catchError((error) => {
                return of(catalogsActions.GET_CAT_PRIORITY_ERROR(error));
              }),
            );
        } else {
          return EMPTY;
        }
      }),
    ),
  );
  // TODO: Obtención del catálogo de revisiones
  fetchCatReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_REVIEWS_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectNeedToReloadReviews)),
      mergeMap(([action, needToReload]) => {
        if (needToReload) {
          return this.catalogosService
            .catRevisionQueryResult(patchBody(null, null, true, null, 'Revision'))
            .pipe(
              map((response: QueryResultCatRevision) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Catálogo de revisiones.',
                  ),
                  response,
                );
                return catalogsActions.GET_CAT_REVIEWS_SUCCESS({
                  listReviews: response.Results,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Catálogo de revisiones.',
                  ),
                  error,
                );
                return of(catalogsActions.GET_CAT_REVIEWS_ERROR(error));
              }),
            );
        }
        return EMPTY;
      }),
    ),
  );

  getCatTipoTelefono$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_TIPO_TELEFONO_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.needsToReloadCatTipoTelefono)),
      mergeMap(([action, needsToReloadCatTipoTelefono]) => {
        if (needsToReloadCatTipoTelefono) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'TipoNumeroTelefonico',
          };
          return this.catalogosService.catTipoNumeroTelefonicoQueryResult(body).pipe(
            map((response: QueryResultCatTipoNumeroTelefonico) =>
              catalogsActions.GET_CAT_TIPO_TELEFONO_SUCCESS({
                lisCatTIipoTelefono: response.Results,
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_TIPO_TELEFONO_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );

  getSellers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_SELLER_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectListCatSellers)),
      mergeMap(([action, catSellers]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'NombreCompleto',
        };
        body.Filters.push({
          NombreFiltro: 'EVI',
          ValorFiltro: true,
        });
        if (catSellers.needsToReload) {
          return this.sistemaUsuariosService.vUsuarioQueryResult(body).pipe(
            map((response: QueryResultVUsuario) =>
              catalogsActions.GET_CAT_SELLER_SUCCESS({
                listVendedores: response.Results,
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_SELLER_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );

  // DOCS Obtención del catálogo de disponibilidad
  getAvailability$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_AVALABILITY_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectListAvailability)),
      mergeMap(([action, catAvailability]) => {
        if (catAvailability.needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'Disponibilidad',
          };
          return this.catalogosService.catDisponibilidadQueryResult(body).pipe(
            map((response: QueryResultCatDisponibilidad) =>
              catalogsActions.GET_CAT_AVALABILITY_SUCCESS({
                listAvailability: response.Results,
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_AVALABILITY_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );

  // DOCS Obtención del cátalogo de marcas
  getCatTrademark = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_TRADEMARK_LOAD),
      withLatestFrom(
        this.store.select(catalogsSelectors.selectListTradeMark),
        this.store.select(catalogsSelectors.selectListTradeMarkFilters),
      ),
      mergeMap(([action, trademark, body]) => {
        if (trademark.needsToReload) {
          return this.marcasService.MarcaQueryResult(body).pipe(
            map((response: QueryResultMarca) =>
              catalogsActions.GET_CAT_TRADEMARK_SUCCESS({
                listTrademark: response.Results,
              }),
            ),
            catchError((error) => of(catalogsActions.GET_CAT_TRADEMARKY_FAILED())),
          );
        }
        return EMPTY;
      }),
    ),
  );
  // DOCS Obtención del cátalogo de linea de familia

  $getCatFamilyLine = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_FAMILY_LINE_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectListFamilyLine)),
      mergeMap(([action, familyLine]) => {
        if (familyLine.needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'Tipo',
          };
          return this.configuracionProductosConfiguracionFamiliasService
            .vFamiliaLineaQueryResult(body)
            .pipe(
              map((response: QueryResultVFamiliaLinea) =>
                catalogsActions.GET_CAT_FAMILY_LINE_SUCCESS({
                  listFamilyLine: response.Results,
                }),
              ),
              catchError((error) => of(catalogsActions.GET_CAT_TRADEMARKY_FAILED())),
            );
        }
        return EMPTY;
      }),
    ),
  );
  // DOCS: obtencion del catálogo de tipo de sociedad mercantil
  $getCatBillingRestriction = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_BILLING_RESTRICTION_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectCatBillingRestriction)),
      mergeMap(([action, billingRestriction]) => {
        if (billingRestriction.needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'RestriccionDeCompra',
          };
          return this.catalogosService.catRestriccionDeCompraQueryResult(body).pipe(
            map((response: QueryResultCatRestriccionDeCompra) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  LOG_SUCCEEDED,
                  FILE_NAME,
                  'Al obtener el catálogo de restricciones de compra ',
                ),
                response,
              );
              return catalogsActions.GET_CAT_BILLING_RESTRICTION_SUCCESS({
                listBillingRestriction: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el catálogo de restricciones de compra ',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_BILLING_RESTRICTION_FAILED());
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );
  // DOCS: obtencion del catálogo de tipo de clasificaciones
  $getCatClassifications = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_CLASSIFICATIONS_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectCatClassifications)),
      mergeMap(([action, classifications]) => {
        let body = new FiltersOnlyActive();
        body = {
          ...body,
          SortDirection: 'asc',
          SortField: 'Clasificacion',
        };
        body.Filters.push({
          NombreFiltro: 'IdCatSubtipoProducto',
          ValorFiltro: action.IdCatSubtipoProducto,
        });
        return this.catalogosService.catClasificacionInformativaProductoQueryResult(body).pipe(
          map((response: QueryResultCatClasificacionInformativaProducto) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                LOG_SUCCEEDED,
                FILE_NAME,
                'Al obtener el catálogo de clasificaciones',
              ),
              response,
            );
            return catalogsActions.GET_CAT_CLASSIFICATIONS_SUCCESS({
              listClassifications: response.Results,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener el catálogo de clasificaciones',
              ),
              error,
            );
            return of(catalogsActions.GET_CAT_CLASSIFICATIONS_FAILED());
          }),
        );
      }),
    ),
  );
  // DOCS: obtencion del catálogo de estado fisico
  $getCatPhysicalState = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_PHYSICAL_STATE_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectCatPhysicalState)),
      mergeMap(([action, classifications]) => {
        if (classifications.needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'EstadoFisico',
          };
          return this.catalogosService.catEstadoFisicoQueryResult(body).pipe(
            map((response: QueryResultCatEstadoFisico) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  LOG_SUCCEEDED,
                  FILE_NAME,
                  'Al obtener el catálogo de estado fisico',
                ),
                response,
              );
              return catalogsActions.GET_CAT_PHYSICAL_STATE_SUCCESS({
                listPhysicalStates: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el catálogo de estado fisico',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_PHYSICAL_STATE_FAILED());
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );
  // DOCS: obtencion del catálogo de uso
  $getCatUse = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_USE_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectCatUse)),
      mergeMap(([action, uses]) => {
        if (uses.needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'Uso',
          };
          return this.catalogosService.catUsoQueryResult(body).pipe(
            map((response: QueryResultCatUso) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  LOG_SUCCEEDED,
                  FILE_NAME,
                  'Al obtener el catálogo de uso',
                ),
                response,
              );
              return catalogsActions.GET_CAT_USE_SUCCESS({
                listUses: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el catálogo de uso',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_USE_FAILED());
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );
  // DOCS: obtencion del catálogo depositario internacional
  $getCatInternationalDepositary = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_INTERNATIONAL_DEPOSITARY_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectCatInternationalDepositary)),
      mergeMap(([action, internationalDepository]) => {
        if (internationalDepository.needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'DepositarioInternacional',
          };
          return this.catalogosService.catDepositarioInternacionalQueryResult(body).pipe(
            map((response: QueryResultCatDepositarioInternacional) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  LOG_SUCCEEDED,
                  FILE_NAME,
                  'Al obtener el catálogo de depositario internacional',
                ),
                response,
              );
              return catalogsActions.GET_CAT_INTERNATIONAL_DEPOSITARY_SUCCESS({
                listInternationalDepositary: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el catálogo de depositario internacional',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_INTERNATIONAL_DEPOSITARY_FAILED());
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );
  // DOCS: obtencion del catálogo de tipo de presentación
  $getCatPresentationType = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_PRESENTATION_TYPE_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectCatPresentationType)),
      mergeMap(([action, presentationType]) => {
        if (presentationType.needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'TipoPresentacion',
          };
          return this.catalogosService.catTipoPresentacionQueryResult(body).pipe(
            map((response: QueryResultCatTipoPresentacion) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  LOG_SUCCEEDED,
                  FILE_NAME,
                  'Al obtener el catálogo de tipo de presentacion',
                ),
                response,
              );
              return catalogsActions.GET_CAT_PRESENTATION_TYPE_SUCCESS({
                listPresentationTypes: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el catálogo de tipo de presentacion',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_PRESENTATION_TYPE_FAILED());
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  // DOCS: obtencion del catálogo de tipo de medio de transporte
  $getCatTransportationWay = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_TRANSPORTATION_WAY_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectCatTransportationWay)),
      mergeMap(([action, transportationWay]) => {
        if (transportationWay.needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'MedioTransporte',
          };
          return this.catalogosService.catMedioTransporteQueryResult(body).pipe(
            map((response: QueryResultCatMedioTransporte) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  LOG_SUCCEEDED,
                  FILE_NAME,
                  'Al obtener el catálogo de medio de transporte',
                ),
                response,
              );
              return catalogsActions.GET_CAT_TRANSPORTATION_WAY_SUCCESS({
                listTransportationsWay: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el catálogo de medio de transporte',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_TRANSPORTATION_WAY_FAILED());
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  // DOCS: OBTIENE CATALOGO DE TIPOS DE CAMPAÑAS
  $getCatCampaignsTyps = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_TIPO_CAMPANA_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectCatTipoCampana)),
      mergeMap(([action, catCampana]) => {
        if (catCampana.needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'TipoCampana',
          };
          return this.catalogosService.catTipoCampanaQueryResult(body).pipe(
            map((response: QueryResultCatTipoCampana) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  LOG_SUCCEEDED,
                  FILE_NAME,
                  'Al obtener el catálogo de tipo campana',
                ),
                response,
              );
              return catalogsActions.GET_CAT_TIPO_CAMPANA_SUCCESS({
                lisCampaigns: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  LOG_FAILED,
                  FILE_NAME,
                  'Al obtener el catálogo de tipo campana',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_TIPO_CAMPANA_FAILED());
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  // DOCS: obtencion del catálogo de manejo de transporte
  $getCatTransportationManagement = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_TRANSPORTATION_MANAGEMENT_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectCatTransportationManagment)),
      mergeMap(([action, transportationManagement]) => {
        if (transportationManagement.needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'Manejo',
          };
          return this.catalogosService.catManejoQueryResult(body).pipe(
            map((response: QueryResultCatManejo) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  LOG_SUCCEEDED,
                  FILE_NAME,
                  'Al obtener el catálogo de manejo de transporte',
                ),
                response,
              );
              return catalogsActions.GET_CAT_TRANSPORTATION_MANAGEMENT_SUCCESS({
                listTransportationManagement: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el catálogo de manejo de transporte',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_TRANSPORTATION_MANAGEMENT_FAILED());
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );
  // DOCS: obtencion del catálogo de formato de publicaciones
  $getCatPublicationsFormat = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_PUBLICATIONS_FORMAT_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectCatPublicationsFormat)),
      mergeMap(([action, publicationsFormat]) => {
        if (publicationsFormat.needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'FormatoPublicacion',
          };
          return this.catalogosService.catFormatoPublicacionQueryResult(body).pipe(
            map((response: QueryResultCatFormatoPublicacion) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  LOG_SUCCEEDED,
                  FILE_NAME,
                  'Al obtener el catálogo de formato de publicaciones',
                ),
                response,
              );
              return catalogsActions.GET_CAT_PUBLICATIONS_FORMAT_SUCCESS({
                listPublicationsFormat: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el catálogo de formato de publicaciones',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_PUBLICATIONS_FORMAT_FAILED());
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );
  // DOCS: obtencion del catálogo de unidades
  $getCatUnits = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_UNIT_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectCatUnit)),
      mergeMap(([action, unit]) => {
        if (unit.needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'Clave',
          };
          return this.catalogosService.catUnidadQueryResult(body).pipe(
            map((response: QueryResultCatUnidad) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  LOG_SUCCEEDED,
                  FILE_NAME,
                  'Al obtener el catálogo de unidades',
                ),
                response,
              );
              return catalogsActions.GET_CAT_UNIT_SUCCESS({
                listUnits: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el catálogo de unidades',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_UNIT_FAILED());
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );
  // DOCS: obtencion del catálogo de aplicaciones
  $getCatApplications = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_APPLICATION_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectCatApplication)),
      mergeMap(([action, application]) => {
        if (application.needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'Aplicacion',
          };
          return this.catalogosService.catAplicacionQueryResult(body).pipe(
            map((response: QueryResultCatAplicacion) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  LOG_SUCCEEDED,
                  FILE_NAME,
                  'Al obtener el catálogo de aplicaciones',
                ),
                response,
              );
              return catalogsActions.GET_CAT_APPLICATION_SUCCESS({
                listApplications: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener el catálogo de aplicaciones',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_APPLICATION_FAILED());
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  // DOCS: Obtención del catálogo de tipo de sociedad mercantil /
  fetchCatMercantileSocietyType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_TIPO_SOCIEDAD_MERCANTIL_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectListTipoSociedadMercantil)),
      mergeMap(([action, mercantileScciety]) => {
        this.store.dispatch(catalogsActions.GET_CAT_MONEDA_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_ADDRESS_TYPE_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_EMPRESAS_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_PAIS_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_ZONA_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_RUTA_ENTREGA_LOAD());
        if (mercantileScciety.needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'TipoSociedadMerdantil',
          };
          return this.catalogosService.catTipoSociedadMercantilQueryResult(body).pipe(
            map((response: QueryResultCatTipoSociedadMercantil) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Catálogo de tipo de sociedad mercantil.',
                ),
                response,
              );
              return catalogsActions.GET_CAT_TIPO_SOCIEDAD_MERCANTIL_SUCCESS({
                listMercantileSocietyType: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Catálogo de tipo de sociedad mercantil.',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_TIPO_SOCIEDAD_MERCANTIL_FAILED());
            }),
          );
        } else {
          return of(catalogsActions.GET_CAT_REGIMEN_FISCAL_LOAD());
        }
      }),
    ),
  );
  // DOCS: Obtención del catálogo de regimen fiscal
  fetchCatTaxRegime$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        catalogsActions.GET_CAT_REGIMEN_FISCAL_LOAD,
        catalogsActions.GET_CAT_TIPO_SOCIEDAD_MERCANTIL_SUCCESS,
      ),
      withLatestFrom(this.store.select(catalogsSelectors.selectListRegimenFiscal)),
      mergeMap(([action, mercantileScciety]) => {
        if (mercantileScciety.needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'RegimenFiscal',
          };
          return this.catalogosService.catRegimenFiscalQueryResult(body).pipe(
            map((response: QueryResultCatRegimenFiscal) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Catálogo de regimen fiscal.',
                ),
                response,
              );
              return catalogsActions.GET_CAT_REGIMEN_FISCAL_SUCCESS({
                listTaxRegime: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Catálogo de regimen fiscal.',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_REGIMEN_FISCAL_FAILED());
            }),
          );
        } else {
          return of(catalogsActions.GET_CAT_THEMES_COMMENTS_LOAD());
        }
      }),
    ),
  );
  // DOCS: Obtención del catálogo de regimen fiscal
  fetchCatThemesComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        catalogsActions.GET_CAT_THEMES_COMMENTS_LOAD,
        catalogsActions.GET_CAT_REGIMEN_FISCAL_SUCCESS,
      ),
      withLatestFrom(this.store.select(catalogsSelectors.selectListThemesComments)),
      mergeMap(([action, themesComments]) => {
        if (themesComments.needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'Tema',
          };
          return this.catalogosService.catTemaComentarioQueryResult(body).pipe(
            map((response: QueryResultCatTemaComentario) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Catálogo de Temas de comentarios .',
                ),
                response,
              );
              return catalogsActions.GET_CAT_THEMES_COMMENTS_SUCCESS({
                listThemeComments: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Catálogo de Temas de comentarios .',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_THEMES_COMMENTS_FAILED());
            }),
          );
        } else {
          return of(catalogsActions.GET_CATALOGS_FACTURATION());
        }
      }),
    ),
  );

  //  OBTIENE CATALOGO DE CLASIFICACION REGULATORIA
  fetchCatClasificacionRegulatoria$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_CLASIFICACION_REGULATORIA_LOAD),
      withLatestFrom(
        this.store.select(catalogsSelectors.selectNeedsToReloadCatClasificacionRegulatoria),
      ),
      mergeMap(([action, needsToReload]) => {
        if (needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'Descripcion',
          };
          return this.catalogosService.catClasificacionRegulatoriaQueryResult(body).pipe(
            map((response: QueryResultCatClasificacionRegulatoria) => {
              return catalogsActions.GET_CAT_CLASIFICACION_REGULATORIA_SUCCESS({
                clasifications: response.Results,
              });
            }),
            catchError((error) => {
              return of(catalogsActions.GET_CAT_CLASIFICACION_REGULATORIA_FAILED());
            }),
          );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  //  OBTIENE CATALOGO DE CLASIFICACION REGULATORIA
  fetchDispatchPlace$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_LUGAR_DESPACHO_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectDispatchPlace)),
      mergeMap(([action, dispatchPlace]) => {
        if (dispatchPlace.needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'LugarDespacho',
          };
          return this.catalogosService.catLugarDespachoQueryResult(body).pipe(
            map((response: QueryResultCatLugarDespacho) => {
              return catalogsActions.GET_CAT_LUGAR_DESPACHO_SUCCESS({
                listCatDispatchPlace: response.Results,
              });
            }),
            catchError((error) => {
              return of(catalogsActions.GET_CAT_LUGAR_DESPACHO_FAILED());
            }),
          );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  //  OBTIENE CATALOGO DE MARCA TARJETA
  fetchCatCardMark = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_MARCA_TARJETA_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectCatalogCardMark)),
      mergeMap(([action, cardMark]) => {
        if (cardMark.needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'Marca',
          };
          return this.catalogosService.catMarcaTarjetaQueryResult(body).pipe(
            map((response: QueryResultCatMarcaTarjeta) => {
              return catalogsActions.GET_CAT_MARCA_TARJETA_SUCCESS({
                listCatCardMark: response.Results,
              });
            }),
            catchError((error) => {
              return of(catalogsActions.GET_CAT_MARCA_TARJETA_FAILED());
            }),
          );
        } else {
          return of(
            catalogsActions.GET_CAT_MARCA_TARJETA_SUCCESS({
              listCatCardMark: cardMark.listCatCardMark,
            }),
          );
        }
      }),
    ),
  );

  // DOCS: OBTIENE CATALOGO DE MEDIOS DE DIFUSION
  fetchBroadCastMedia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        catalogsActions.GET_CAT_MODELO_DIFUSION_LOAD,
        listQuotesActions.SET_PRODUCT_SELECTED_SUCCESS,
      ),
      withLatestFrom(this.store.select(catalogsSelectors.selectCatBroadCastMedia)),
      mergeMap(([action, broadCastMedia]) => {
        if (broadCastMedia.needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'MedioDifusion',
          };
          return this.catalogosService.catMedioDifusionQueryResult(body).pipe(
            map((response: QueryResultCatMedioDifusion) => {
              // DOCS: SET MEDIA OUTLET FOR PRODUCT DETAILS IN QUOTATION
              if (action.type === '[List-Quotes-Api] Set Product Selected Success') {
                this.store.dispatch(
                  listQuotesActions.SET_MEDIA_OUTLET_TO_PRODUCT({
                    CatMedioDeDifusion: response.Results,
                  }),
                );
              }
              return catalogsActions.GET_CAT_MODELO_DIFUSION_SUCCESS({
                listCatMedioDeDifusion: response.Results,
              });
            }),
            catchError((error) => {
              return of(catalogsActions.GET_CAT_MODELO_DIFUSION_FAILED());
            }),
          );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  //  OBTIENE CATALOGO DE CLASIFICACION REGULATORIA
  fetchProductInvestigationFollow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_PRODUCT_INVESTIGATION_FOLLOW_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectCatProductInvestigationFollow)),
      mergeMap(([action, producInvestigationFollow]) => {
        if (producInvestigationFollow.needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'Descripcion',
          };
          return this.catalogosService.catProductoInvestigacionSeguimientoQueryResult(body).pipe(
            map((response: QueryResultCatProductoInvestigacionSeguimiento) => {
              return catalogsActions.GET_CAT_PRODUCT_INVESTIGATION_FOLLOW_SUCCESS({
                listProductInvestigationFollow: response.Results,
              });
            }),
            catchError((error) => {
              return of(catalogsActions.GET_CAT_PRODUCT_INVESTIGATION_FOLLOW_FAILED());
            }),
          );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  //DOCS: Obtiene el catalogo de tipos de autorización
  fetchCatAutorizationTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_TIPOS_AUTORIZACION_LOAD),
      withLatestFrom(this.store.select(catalogsSelectors.selectNeedsToReloadCatAuthorizationTypes)),
      mergeMap(([action, needsToReload]) => {
        if (needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'Descripcion',
          };
          return this.catalogosService.catTipoAutorizacionQueryResult(body).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Catalogo de tipos de autorización',
                ),
                response,
              );
              return catalogsActions.GET_CAT_TIPOS_AUTORIZACION_SUCCESS({
                listAuthorizationTypes: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Catalogo de tipos de autorización',
                ),
                error,
              );
              return of(catalogsActions.GET_CAT_TIPOS_AUTORIZACION_FAILED());
            }),
          );
        } else {
          return EMPTY;
        }
      }),
    ),
  );
  //DOCS: Obtiene el catalogo de representantesLegales
  fetchCatLegalRepresentatives$ = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogsActions.GET_CAT_LEGAL_REPRESENTATIVE_LOAD),
      withLatestFrom(
        this.store.select(catalogsSelectors.selectNeedsToReloadCatLegalRepresentatives),
      ),
      mergeMap(([action, needsToReload]) => {
        if (needsToReload) {
          let body = new FiltersOnlyActive();
          body = {
            ...body,
            SortDirection: 'asc',
            SortField: 'Nombre',
          };
          return this.procesosL05TramitarPedidoCartaDeDisponibilidadService
            .CartaDeDisponibilidadObtenerEmpleadoRepresentanteLegal(body)
            .pipe(
              map((response: EmpleadoDetalleObj[]) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Catalogo de tipos de representantes legales',
                  ),
                  response,
                );
                return catalogsActions.GET_CAT_LEGAL_REPRESENTATIVE_SUCCESS({
                  listLegalRepresentatives: response,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Catalogo de tipos de representantes legales',
                  ),
                  error,
                );
                return of(catalogsActions.GET_CAT_LEGAL_REPRESENTATIVE_FAILED());
              }),
            );
        } else {
          return EMPTY;
        }
      }),
    ),
  );
  adminDatos(datos: any, tipo: string) {
    if (tipo === 'Results') {
      return datos.Results;
    } else if (tipo === 'Groups') {
      return datos.Groups;
    }
  }

  filtroListaPrecio(datos) {
    const lista: any[] = [];
    const listaPrecio = datos.Groups;
    const arrayPrecio = Object.getOwnPropertyNames(datos.Groups);
    let pos: any;
    for (let i = 0; i < arrayPrecio.length; i++) {
      pos = arrayPrecio[i];
      const listaAux = listaPrecio[pos].Results[0];
      lista.push({
        precioLista: pos,
        cantProd: listaPrecio.TotalResults,
        pocentajeDesc: listaAux.ConfProveedor.ConfiguracionPrecioProveedor.PorcentajeDescuento,
        listPro: listaPrecio[pos].Results,
        idClasificacion: pos,
        IGI: listaAux.ConfProveedor.ConfiguracionPrecioProveedor.IGI,
        DTA: listaAux.ConfProveedor.ConfiguracionPrecioProveedor.DTA,
        PrecioConsularizacion:
          listaAux.ConfProveedor.ConfiguracionPrecioProveedor.PrecioConsularizacion,
        preciosDocto: listaAux.ConfProveedor.ConfiguracionPrecioProveedor.PrecioEnvioDeDocumentos,
        factorCostoFijo: listaAux.ConfProveedor.ConfiguracionPrecioProveedor.FactorDeCostoFijo,
        montoMinimoOC: listaAux.ConfProveedor.ConfiguracionPrecioProveedorFamilia.MontoMinimoOC,
        valorEnAduana: listaAux.ValorEnAduana,
        cvtProveedor: listaAux.CVTProveedor,
        costoFijoUnitarioProveedor: listaAux.CostoFijoUnitarioProveedor,
        cftProveedor: listaAux.CFTProveedor,
        utilidadT: listaAux.UtilidadTotalProveedor,
        piezas: listaAux.NumPiezas,
        cvuP: listaAux.CVUProveedor,
        utilidadU: listaAux.UtilidadUnitariaProveedor,
        precioUP: listaAux.PrecioUnitarioProveedor,
      });
    }
    return {payload: lista};
  }

  filtroProductos(datos) {
    const listas: any[] = [];
    let pos: any;
    /***** CLASIFICACION ***/
    const listaClasif: any[] = [];
    const listaClasificacion = datos[0].Groups;
    const arrayClasificacion = Object.getOwnPropertyNames(datos[0].Groups);
    for (let i = 0; i < arrayClasificacion.length; i++) {
      pos = arrayClasificacion[i];
      listaClasif.push({
        clasificacion: listaClasificacion[pos].Results[0].ClasificacionProducto,
        cantProd: listaClasificacion[pos].TotalResults,
        listPro: listaClasificacion[pos].Results,
        idClasificacion: pos,
        idProveedorFamilia: listaClasificacion[pos].Results[0].IdProveedorFamilia,
      });
    }
    /*****  PRECIOS  DE LISTAS ***/
    const listaPrecios: any[] = [];
    const listaPreciosProd = datos[1].Groups;
    const arrayPrecios = Object.getOwnPropertyNames(datos[1].Groups);
    let porcentaje = 0;
    let statusP = true;
    for (let i = 0; i < arrayPrecios.length; i++) {
      pos = arrayPrecios[i];
      if (listaPreciosProd[pos].Results[0].PrecioProquifaNetProveedor === null) {
        listaPreciosProd[pos].Results[0].PrecioProquifaNetProveedor = arrayPrecios[i];
      }
      if (listaPreciosProd[pos].Results[0].PrecioProquifaNetProveedor >= arrayPrecios[i]) {
        porcentaje =
          ((listaPreciosProd[pos].Results[0].PrecioProquifaNetProveedor - pos) /
            listaPreciosProd[pos].Results[0].PrecioProquifaNetProveedor) *
          100;
        statusP = false;
      } else {
        statusP = true;
        porcentaje =
          ((pos - listaPreciosProd[pos].Results[0].PrecioProquifaNetProveedor) /
            listaPreciosProd[pos].Results[0].PrecioProquifaNetProveedor) *
          100;
      }
      listaPrecios.push({
        precioLista: arrayPrecios[i],
        cantProd: listaPreciosProd[pos].TotalResults,
        listPro: listaPreciosProd[pos].Results,
        porcent: porcentaje,
        negativo: statusP,
        idProveedorFamilia: listaPreciosProd[pos].Results[0].IdProveedorFamilia,
      });
    }
    /**** PRODUCTOS ***/
    const listaProd = datos[2].Groups;
    const listaProductos: any[] = [];
    const arrayProductos = Object.getOwnPropertyNames(datos[2].Groups);
    for (let i = 0; i < arrayProductos.length; i++) {
      pos = arrayProductos[i];
      const precioList = listaProd[pos].Results[0].PrecioLista;
      if (listaProd[pos].Results[0].PrecioProquifaNetProveedor >= precioList) {
        porcentaje =
          ((listaProd[pos].Results[0].PrecioProquifaNetProveedor - precioList) /
            listaProd[pos].Results[0].PrecioProquifaNetProveedor) *
          100;
        statusP = false;
      } else {
        statusP = true;
        porcentaje =
          ((precioList - listaProd[pos].Results[0].PrecioProquifaNetProveedor) /
            listaProd[pos].Results[0].PrecioProquifaNetProveedor) *
          100;
      }
      const item = listaProd[pos].Results[i];
      listaProductos.push({
        IdProducto: item.IdProducto,
        Descripcion: item.DescripcionProducto,
        ClasificacionProducto: item.ClasificacionProducto,
        Edit: false,
        Catalogo: item.Catalogo,
        PrecioLista: item.PrecioLista,
        porcent: porcentaje,
        negativo: statusP,
        listPro: listaProd[pos].Results,
        idProveedorFamilia: item.IdProveedorFamilia,
      });
    }
    /////////// GENERALES
    const listaGeneral: any[] = [];
    if (datos[3].length > 0) {
      const listaAux = datos[3].Groups;
      const array = Object.getOwnPropertyNames(datos[3].Groups);
      const item = listaAux[array[0]].Results[0];
      listaGeneral.push({
        IdProducto: item.IdProducto,
        Descripcion: item.DescripcionProducto,
        ClasificacionProducto: item.ClasificacionProducto,
        Edit: false,
        Catalogo: item.Catalogo,
        PrecioLista: item.PrecioLista,
        porcent: porcentaje,
        negativo: statusP,
        listPro: listaProd[array[0]].Results,
        idProveedorFamilia: item.IdProveedorFamilia,
      });
    }

    listas.push(listaPrecios); // LISTA PRECIO LISTA
    listas.push(listaProductos); // LISTA PRODUCTOS
    listas.push(listaClasif); // LISTA CLASIFICACION
    listas.push(listaGeneral); // LISTA CLASIFICACION
    return {payload: listas};
  }

  proccesDropListContacto(datos) {
    const filtros: any[] = [];
    let results: any;
    for (let i = 0; i < datos.length; i++) {
      const options: any[] = [];
      if (datos[i].Results.length > 0) {
        results = datos[i].Results;
        for (let j = 0; j < results.length; j++) {
          if (i === 0) {
            options.push({
              nombre: results[j].Dificultad,
              key: j,
              id: results[j].IdCatDificultadDatosPersona,
            });
          } else if (i === 1) {
            options.push({
              nombre: results[j].NivelDecision,
              key: j,
              id: results[j].IdCatNivelDecisionDatosPersona,
            });
          } else if (i === 2) {
            options.push({
              nombre: results[j].Mantenimiento,
              key: j,
              id: results[j].IdCatMantenimientoDatosPersona,
            });
          } else if (i === 3) {
            options.push({
              nombre: results[j].NivelPuesto,
              key: j,
              id: results[j].IdCatNivelPuestoDatosPersona,
            });
          }
        }
      }
      filtros[i] = options;
    }
    return {payload: filtros};
  }
}
