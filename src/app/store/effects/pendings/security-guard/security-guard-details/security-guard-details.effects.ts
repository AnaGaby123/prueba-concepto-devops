import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {forEach, isEmpty, map as _map} from 'lodash-es';
import {
  securityGuardActions,
  securityGuardActionsDetails,
} from '@appActions/pendings/security-guard';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {
  securityGuardDetailsSelectors,
  securityGuardSelectors,
} from '@appSelectors/pendings/security-guard';
import {EMPTY, forkJoin, lastValueFrom, Observable, of} from 'rxjs';
import * as servicesLogger from '@appUtil/logger';
import {ISegVisitaVisitanteDetalle} from '@appModels/store/pendings/security-guard/security-guard-details/security-guard-details.models';
import {
  OcPackingList,
  ProcesosL07ImportacionesService,
  ProcesosL08InspeccionSeguridadService,
  QueryResultSegVisitante,
  QueryResultSegVisitaVisitanteDetalle,
  SegEvidencia,
  SegVehiculoVisitante,
  SegVisitaVisitanteTotales,
} from 'api-logistica';
import {
  GET_LIST_VEHICLE_BRANDS_LOAD,
  GET_LIST_VEHICLE_TYPE_LOAD,
} from '@appActions/catalogs/catalogos.actions';
import {addRowIndex, extractID} from '@appUtil/util';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_DATE,
  DEFAULT_UUID,
  MINIO_BUCKETS,
} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  RETURN_EMPTY,
  SET_LOADING,
  SET_LOADING_ERROR,
  SET_LOADING_SUCCESS,
} from '@appActions/utils/utils.action';
import {ArchivoDetalle, SistemaArchivosService} from 'api-catalogos';
import {MinioService} from '@appServices/minio/minio.service';
import {IFile, IUploadFileCustom} from '@appModels/files/files.models';
import {convertPDFFileFromURLToBase64, getBase64FromUrl} from '@appUtil/files';

const FILE_NAME = 'security-guard-details.effects.ts';

@Injectable()
export class SecurityGuardDetailsEffects {
  constructor(
    private store: Store,
    private action$: Actions,
    private logger: NGXLogger,
    private securityInspectionService: ProcesosL08InspeccionSeguridadService,
    private importationService: ProcesosL07ImportacionesService,
    private minioService: MinioService,
    private sistemaArchivosService: SistemaArchivosService,
  ) {}

  // DOCS: OBTENER INFORMACIÓN DE DROPDOWNLIST
  fetchGeneralList$ = createEffect(() => {
    return this.action$.pipe(
      ofType(securityGuardActionsDetails.FETCH_INITIAL_VIEW),
      mergeMap((action) => {
        this.store.dispatch(SET_LOADING({payload: true}));

        this.store.dispatch(securityGuardActionsDetails.LOAD_TOTALS_FILTERS());
        this.store.dispatch(GET_LIST_VEHICLE_TYPE_LOAD());
        this.store.dispatch(GET_LIST_VEHICLE_BRANDS_LOAD());
        return of(RETURN_EMPTY());
      }),
    );
  });

  // DOCS: SE OBTIENE EL TOTAL DE LOS FILTROS DE LAS TABS

  fetchTotalsTabs$ = createEffect(() => {
    return this.action$.pipe(
      ofType(
        securityGuardActionsDetails.LOAD_TOTALS_FILTERS,
        securityGuardActionsDetails.SET_RELOAD_LIST_VISITS,
      ),
      mergeMap((action) => {
        return this.securityInspectionService.segVisitaVisitanteTotalesObtener().pipe(
          map((response: SegVisitaVisitanteTotales) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener el total de los filtros',
              ),
              response,
            );

            this.store.dispatch(
              securityGuardActionsDetails.FETCH_CUSTOMS_AGENT_LOAD({
                isFirstPage: true,
              }),
            );
            return securityGuardActionsDetails.SUCCESS_TOTALS_FILTERS({
              totals: response,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener el total de los filtros',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));

            return of(securityGuardActionsDetails.FAILED_TOTALS_FILTERS());
          }),
        );
      }),
    );
  });

  // DOCS: OBTENER LISTADO DE VISITAS
  fetchAgentList$ = createEffect(() => {
    return this.action$.pipe(
      ofType(
        securityGuardActionsDetails.FETCH_CUSTOMS_AGENT_LOAD,
        securityGuardActionsDetails.SET_SEARCH_TERM,
        securityGuardActionsDetails.SET_TAB_SELECTED,
      ),
      withLatestFrom(
        this.store.select(securityGuardDetailsSelectors.selectNeedsToReloadCustomAgentList),
        this.store.select(securityGuardDetailsSelectors.selectCustomAgentListFilters),
        this.store.select(securityGuardDetailsSelectors.selectCustomAgentList),
      ),
      mergeMap(([action, needsToReload, params, visits]) => {
        if (!needsToReload) {
          return EMPTY;
        }
        this.store.dispatch(
          securityGuardActionsDetails.SET_STATUS_CHARGER({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.securityInspectionService.segVisitaVisitanteDetalleQueryResult(params).pipe(
          map((response: QueryResultSegVisitaVisitanteDetalle) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'AL obtener la lista de visitantes ',
              ),
              response,
            );

            let customAgentList = addRowIndex(
              params.desiredPage,
              params.pageSize,
              response.Results,
            );
            customAgentList = _map(customAgentList, (o: ISegVisitaVisitanteDetalle) => ({
              ...o,
              isSelected: false,
              visitorList: [],
              ListaocEnvioList: _map(o.ListaocEnvioList, (guide, index) => ({
                ...guide,
                isSelected: index === 0,
              })),
              ListaimpOrdenDespacho: _map(o.ListaimpOrdenDespacho, (guide, index) => ({
                ...guide,
                isSelected: index === 0,
              })),
              guideSelected: !isEmpty(o.ListaimpOrdenDespacho)
                ? o.ListaimpOrdenDespacho[0]
                : o.ListaocEnvioList[0],

              selectedVehicleType: dataToDropListOption(o.catTipoVehiculo, 'typeVehicle'),
              selectedVehicleBrand: dataToDropListOption(o.catMarcaVehiculo, 'typeVehicleBrand'),
              selectedBoardingGuide: o.ListaimpOrdenDespacho[0]
                ? o.ListaimpOrdenDespacho[0]
                : o.ListaocEnvioList[0],
              totalGuides: !isEmpty(o.ListaimpOrdenDespacho)
                ? o.ListaimpOrdenDespacho.length
                : o.ListaocEnvioList.length,
              segVehiculoVisitante: !isEmpty(o.segVehiculoVisitante)
                ? o.segVehiculoVisitante
                : ({
                    Color: '',
                    IdCatMarcaVehiculo: null,
                    IdSegVehiculoVisitante: DEFAULT_UUID,
                    Placas: '',
                    Activo: true,
                    IdCatTipoVehiculo: null,
                    FechaRegistro: DEFAULT_DATE,
                    FechaUltimaActualizacion: DEFAULT_DATE,
                  } as SegVehiculoVisitante),
            }));
            if (!isEmpty(customAgentList) && params.desiredPage === 1) {
              this.store.dispatch(
                securityGuardActionsDetails.SET_OPTION_SELECTED({
                  selectedCustomAgent: customAgentList[0],
                }),
              );
            }
            this.store.dispatch(SET_LOADING({payload: false}));

            return securityGuardActionsDetails.FETCH_CUSTOM_AGENT_SUCCESS({
              customAgentListResult: customAgentList,
              total: response.TotalResults,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'AL obtener la lista de visitantes',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(securityGuardActionsDetails.FETCH_CUSTOM_AGENT_FAILED());
          }),
        );
      }),
    );
  });

  // DOCS: SE OBTIENEN LOS VISITANTES PARA EL DROP DE VISITANTES
  fetchVisitorList$ = createEffect(() => {
    return this.action$.pipe(
      ofType(
        securityGuardActionsDetails.SET_OPTION_SELECTED,
        securityGuardActionsDetails.RELOAD_VISITORS,
        securityGuardActionsDetails.SET_SUCCESS_VISIT_DATA,
      ),
      withLatestFrom(this.store.select(securityGuardDetailsSelectors.selectVisiterListFilsters)),
      mergeMap(([action, params]) => {
        return this.securityInspectionService.segVisitanteQueryResult(params).pipe(
          map((response: QueryResultSegVisitante) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'AL obtener la lista de visitantes nombre completo',
              ),
              response,
            );

            return securityGuardActionsDetails.FETCH_VISIT_LIST_SUCCESS({
              visitorList: response.Results,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'AL obtener la lista de visitantes nombre completo',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));

            return of(securityGuardActionsDetails.FETCH_VISIT_LIST_FAILED());
          }),
        );
      }),
    );
  });

  // DOCS Se guarda o actualiza a un visitante
  fetchSegVisitor$ = createEffect(() =>
    this.action$.pipe(
      ofType(securityGuardActionsDetails.LOAD_SAVE_VISITOR),
      withLatestFrom(
        this.store.select(securityGuardDetailsSelectors.selectedCustomAgent),
        this.store.select(securityGuardDetailsSelectors.selectSegVisitorData),
        this.store.select(securityGuardDetailsSelectors.selectNewVisitorData),
        this.store.select(securityGuardSelectors.newVisitant),
        this.store.select(securityGuardDetailsSelectors.selectImageVisitorData),
      ),
      mergeMap(async ([action, visit, segVisitor, newSegVisitor, actionToDo, file]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const segVisitorData = actionToDo ? {...newSegVisitor} : {...segVisitor};

        if (!isEmpty(file)) {
          const date = new Date();
          const fileName = `${date.getFullYear()}/${visit.IdSegVisitaVisitante}/${date.getTime()}/${
            file.file.name
          }`;
          const fileResult: ArchivoDetalle = await this.minioService.uploadFile(
            file.file,
            fileName,
            MINIO_BUCKETS.Security,
          );
          segVisitorData.IdArchivoFoto = fileResult.IdArchivo;
        } else {
          segVisitorData.IdArchivoFoto = null;
        }
        const saveOrUpdateVisitor = await lastValueFrom(
          this.securityInspectionService.segVisitanteGuardarOActualizar(segVisitorData),
        );
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_SUCCEEDED,
            'Al guardar o actualizar un visitante',
          ),
          saveOrUpdateVisitor,
        );

        this.store.dispatch(securityGuardActions.SET_NEW_CONTACT({newContact: false}));
        this.store.dispatch(securityGuardActions.SET_EDIT_MODE({editMode: false}));
        this.store.dispatch(securityGuardActionsDetails.RELOAD_VISITORS());
        this.store.dispatch(SET_LOADING({payload: false}));

        return securityGuardActionsDetails.SUCCESS_SAVE_VISITOR({
          value: extractID(saveOrUpdateVisitor),
          action: actionToDo,
        });
      }),
      catchError((error) => {
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_FAILED,
            'Al guardar o actualizar un visitante',
          ),
          error,
        );
        this.store.dispatch(SET_LOADING({payload: false}));

        return of(securityGuardActionsDetails.FAILED_SAVE_VISITOR());
      }),
    ),
  );

  // DOCS se recupera el archivo en formato base64
  viewFileRequest$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          securityGuardActionsDetails.SET_OPTION_SELECTED,
          securityGuardActionsDetails.SET_VISIT_LIST_SELECTED,
          securityGuardActionsDetails.SET_RELOAD_IMAGE_VISITOR,
        ),
        withLatestFrom(this.store.select(securityGuardDetailsSelectors.selectSegVisitorData)),
        mergeMap(([action, visitor]) => {
          if (visitor.IdArchivoFoto) {
            this.store.dispatch(
              securityGuardActionsDetails.SET_STATUS_CHARGER_IMAGE({
                statusImageCharger: API_REQUEST_STATUS_LOADING,
              }),
            );
            return this.sistemaArchivosService
              .ArchivoExtensionsObtenerDetalle(visitor.IdArchivoFoto)
              .pipe(
                map(async (response) => {
                  let base64 = null;
                  const splits = response.FileKey.split('.');
                  const ext = splits[splits.length - 1];
                  if (response && response.Url) {
                    if (ext === 'pdf' || ext === 'tml') {
                      base64 = await convertPDFFileFromURLToBase64(response.Url);
                    } else if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'svg') {
                      base64 = await getBase64FromUrl(response.Url, ext);
                    }
                  }
                  this.store.dispatch(
                    securityGuardActionsDetails.SET_STATUS_CHARGER_IMAGE({
                      statusImageCharger: API_REQUEST_STATUS_SUCCEEDED,
                    }),
                  );
                  this.store.dispatch(
                    securityGuardActionsDetails.VIEW_FILE_SUCCESS({
                      value: base64,
                    }),
                  );
                }),
                catchError((error) => {
                  this.store.dispatch(
                    securityGuardActionsDetails.SET_STATUS_CHARGER_IMAGE({
                      statusImageCharger: API_REQUEST_STATUS_FAILED,
                    }),
                  );
                  return of(securityGuardActionsDetails.VIEW_FILE_FAILED());
                }),
              );
          } else {
            return EMPTY;
          }
        }),
      ),
    {dispatch: false},
  );

  // DOCS Se guardan las imagenes de la guía
  saveIncidenceImages$ = createEffect(() =>
    this.action$.pipe(
      ofType(securityGuardActionsDetails.SET_LOAD_INCIDENCE_IMAGE),
      withLatestFrom(
        this.store.select(securityGuardDetailsSelectors.selectImagesFiles),
        this.store.select(securityGuardDetailsSelectors.selectedCustomAgent),
        this.store.select(securityGuardDetailsSelectors.selectIsNational),
      ),
      mergeMap(async ([action, files, customAgent, isNational]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        let uploadFiles: Array<IUploadFileCustom> = [];
        const date = new Date();
        forEach(files, (file: IFile, index: number) => {
          const fileName = `${date.getFullYear()}/${
            customAgent.IdSegVisitaVisitante
          }/${date.getTime()}/${file.file.name}`;
          uploadFiles = [
            ...uploadFiles,
            {
              file: file.file,
              name: fileName,
              destinyBucketName: MINIO_BUCKETS.Security,
            },
          ];
        });
        const filesUploaded: ArchivoDetalle[] = await this.minioService
          .uploadFiles(uploadFiles)
          .catch((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al cargar las imágenes.',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(
              SET_LOADING_ERROR({
                active: true,
                message: 'Ha ocurrido un error',
              }),
            );
            return [];
          });

        return {
          filesUploaded,
          customAgent,
          isNational,
        };
      }),
      switchMap((data) => {
        if (isEmpty(data.filesUploaded)) {
          return EMPTY;
        }
        const {IdSegVisitaVisitante} = data.customAgent;
        const guideSelected = data.customAgent.guideSelected;
        const requestSaveFiles: Array<Observable<any>> = _map(
          data.filesUploaded,
          (fileUploaded: ArchivoDetalle) => {
            const requestDispatchOrderFile: SegEvidencia = {
              IdSegEvidencia: DEFAULT_UUID,
              IdSegVisitaVisitante,
              IdArchivo: fileUploaded.IdArchivo,
              FechaRegistro: DEFAULT_DATE,
              FechaUltimaActualizacion: DEFAULT_DATE,
              Activo: true,
              IdImpOrdenDespacho: data.isNational ? guideSelected.IdImpOrdenDespacho : null,
              IdOcEnvio: data.isNational ? guideSelected.IdOcEnvio : null,
            };
            return this.securityInspectionService.segEvidenciaGuardarOActualizar(
              requestDispatchOrderFile,
            );
          },
        );
        return forkJoin(requestSaveFiles).pipe(
          map((response: Array<Observable<string> | Observable<OcPackingList>>) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar las imágenes ',
              ),
              response,
            );
            return securityGuardActionsDetails.SET_SUCCESS_INCIDENCE_IMAGE();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar las imágenes',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(
              SET_LOADING_ERROR({
                active: true,
                message: 'Ha ocurrido un error',
              }),
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );

  // DOCS Guardar Visita
  saveVisit$ = createEffect(() =>
    this.action$.pipe(
      ofType(securityGuardActionsDetails.SET_SUCCESS_INCIDENCE_IMAGE),
      withLatestFrom(this.store.select(securityGuardDetailsSelectors.selectedCustomAgent)),
      mergeMap(([action, visit]) => {
        if (visit.AplicaVehiculo) {
          return this.securityInspectionService
            .segVehiculoVisitanteGuardarOActualizar(visit.segVehiculoVisitante)
            .pipe(
              map((response: string) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar el vehiculo del visitante',
                  ),
                  response,
                );

                return {
                  ...visit,
                  IdSegVehiculoVisitante: extractID(response),
                };
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar el vehiculo del visitante',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                this.store.dispatch(securityGuardActionsDetails.SET_FAILED_SAVE_VISITOR_VEHICLE());
                return EMPTY;
              }),
            );
        } else {
          return of({
            ...visit,
            IdSegVehiculoVisitante: null,
            segVehiculoVisitante: null,
          });
        }
      }),
      withLatestFrom(this.store.select(securityGuardDetailsSelectors.selectIsNational)),
      switchMap(([value, selectIsNational]) => {
        return this.securityInspectionService.segVisitaVisitanteGuardarOActualizar(value).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar la visita',
              ),
              response,
            );

            return selectIsNational
              ? securityGuardActionsDetails.SET_LOAD_SAVE_GUIDE_NATIONAL()
              : securityGuardActionsDetails.SET_LOAD_SAVE_GUIDE_INTERNATIONAL();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar la visita',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(securityGuardActionsDetails.SET_FAILED_SAVE_VISIT());
            return EMPTY;
          }),
        );
      }),
    ),
  );

  // DOCS Se hace el guardado de la orden de despacho internacional
  saveGuideInternational$ = createEffect(() => {
    return this.action$.pipe(
      ofType(securityGuardActionsDetails.SET_LOAD_SAVE_GUIDE_INTERNATIONAL),
      withLatestFrom(
        this.store.select(securityGuardDetailsSelectors.selectedCustomAgent),
        this.store.select(securityGuardDetailsSelectors.selectGuidesInternational),
      ),
      mergeMap(([action, visit, guideInternational]) => {
        return this.importationService
          .impOrdenDespachoGuardarOActualizar({
            ...visit.guideSelected,
            Ingresada: true,
          })
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar orden de despacho',
                ),
                response,
              );
              // DOCS en caso de que haya más de un orden de despacho se refresca solo la vista seleccionada
              if (guideInternational.length > 1) {
                this.store.dispatch(securityGuardActionsDetails.SET_LOAD_VISIT_DATA());
                // DOCS en caso de que sea la ultima guia de la visita se refresca la lista de las visitas
              } else {
                this.store.dispatch(securityGuardActionsDetails.SET_ACTUAL_STEP({actualStep: 0}));
                this.store.dispatch(securityGuardActionsDetails.SET_RELOAD_LIST_VISITS());
              }
              return securityGuardActionsDetails.SET_SUCCESS_SAVE_GUIDE_INTERNATIONAL();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar orden de despacho',
                ),
                error,
              );
              return of(securityGuardActionsDetails.SET_FAILED_SAVE_GUIDE_INTERNATIONAL());
            }),
          );
      }),
    );
  });

  // TODO falta que se defina el proceso de guardado de las guias nacionales se hara uso del  securityGuardActionsDetails.SET_LOAD_SAVE_GUIDE_NATIONAL() para hacer un efecto y seguir su proceso de guardado

  // DOCS se obtiene el registro de una visita para refrescarla en caso de que cuente con más guias de embarque
  visitData$ = createEffect(() => {
    return this.action$.pipe(
      ofType(securityGuardActionsDetails.SET_LOAD_VISIT_DATA),
      withLatestFrom(
        this.store.select(securityGuardDetailsSelectors.selectedCustomAgent),
        this.store.select(securityGuardDetailsSelectors.selectQueryInfoVisit),
      ),
      mergeMap(([action, visit, queryInfo]) => {
        return this.securityInspectionService.segVisitaVisitanteDetalleQueryResult(queryInfo).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al obtener los datos del visitante',
              ),
              response,
            );
            const selectedCustomAgent = _map(response.Results, (o: ISegVisitaVisitanteDetalle) => {
              return {
                ...o,
                isSelected: false,
                visitorList: [],
                ListaocEnvioList: _map(o.ListaocEnvioList, (guide, index) => ({
                  ...guide,
                  isSelected: index === 0,
                })),
                ListaimpOrdenDespacho: _map(o.ListaimpOrdenDespacho, (guide, index) => ({
                  ...guide,
                  isSelected: index === 0,
                })),
                guideSelected: !isEmpty(o.ListaimpOrdenDespacho)
                  ? o.ListaimpOrdenDespacho[0]
                  : o.ListaocEnvioList[0],
                totalGuides: !isEmpty(o.ListaimpOrdenDespacho)
                  ? o.ListaimpOrdenDespacho.length
                  : o.ListaocEnvioList.length,
                selectedVehicleType: dataToDropListOption(o.catTipoVehiculo, 'typeVehicle'),
                selectedVehicleBrand: dataToDropListOption(o.catMarcaVehiculo, 'typeVehicleBrand'),
                selectedBoardingGuide: o.ListaimpOrdenDespacho[0]
                  ? o.ListaimpOrdenDespacho[0]
                  : o.ListaocEnvioList[0],
                segVehiculoVisitante: !isEmpty(o.segVehiculoVisitante)
                  ? o.segVehiculoVisitante
                  : ({
                      Color: '',
                      IdCatMarcaVehiculo: null,
                      IdSegVehiculoVisitante: DEFAULT_UUID,
                      Placas: '',
                      Activo: true,
                      IdCatTipoVehiculo: null,
                      FechaRegistro: DEFAULT_DATE,
                      FechaUltimaActualizacion: DEFAULT_DATE,
                    } as SegVehiculoVisitante),
              };
            });

            const selectedVisit = {...selectedCustomAgent};
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(
              SET_LOADING_SUCCESS({
                active: true,
                message: 'Has guardado',
              }),
            );
            return securityGuardActionsDetails.SET_SUCCESS_VISIT_DATA({
              selectedCustomAgent: selectedVisit[0],
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al obtener los datos del visitante',
              ),
              error,
            );
            return of(securityGuardActionsDetails.SET_FAILED_VISIT_DATA());
          }),
        );
      }),
    );
  });
}

// DOCS funcion para llenar los datos por default de los droplist option
function dataToDropListOption(data: any, node) {
  if (node === 'visitor' && data?.IdSegVisitante !== null) {
    return {
      label: data?.NombreCompleto,
      value: data?.IdSegVisitante,
    } as DropListOption;
  } else if (node === 'typeVehicle' && data?.IdCatTipoVehiculo !== null) {
    return {
      label: data?.TipoVehiculo,
      value: data?.IdCatTipoVehiculo,
    } as DropListOption;
  } else if (node === 'typeVehicleBrand' && data?.IdCatMarcaVehiculo !== null) {
    return {
      label: data?.MarcaVehiculo,
      value: data?.IdCatMarcaVehiculo,
    } as DropListOption;
  }
}
