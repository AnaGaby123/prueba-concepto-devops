// CORE
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {NGXLogger} from 'ngx-logger';
import {EMPTY, forkJoin, of} from 'rxjs';
import {
  catchError,
  delay,
  map,
  mergeMap,
  repeatWhen,
  takeWhile,
  withLatestFrom,
} from 'rxjs/operators';
// MODELS
import {
  Archivo,
  ArchivoExportarPDFParameter,
  ConfiguracionClientesContratoMarcasService,
  ConfiguracionClientesContratoService,
  RequestObtenerContratosContemporaneosMismasMarcas,
  SistemaArchivosPDFsService,
  SistemaArchivosService,
} from 'api-catalogos';
import {ITrademark} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';
// ACTIONS
import * as clientsFormActions from '@appActions/forms/client-form/clients-form.actions';
import {SET_ENABLE_EDIT} from '@appActions/forms/client-form/clients-form.actions';
import * as utilsActions from '@appActions/utils/utils.action';
import {clientContractActions} from '@appActions/forms/client-form/clients-details-form';
// SELECTORS
import {clientContractsSelectors, clientsDetailsSelectors} from '@appSelectors/forms/clients-form';
// UTILS
import * as servicesLogger from '@appUtil/logger';
import {extractID} from '@appUtil/util';
import {forEach, map as _map} from 'lodash-es';
import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_UUID,
  MINIO_BUCKETS,
  TIMER_SCHEDULE,
  TYPE_OF_DOCUMENT_CONTRACT_CLIENT_TO_GENERATE_PDF,
} from '@appUtil/common.protocols';
import {convertPDFFileFromURLToBase64} from '@appUtil/files';

const FILE_NAME = 'client-contacts-saves-form.effects.ts';

@Injectable({
  providedIn: 'root',
})
export class ClientContractsSavesFormEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private ConfiguracionClienteContrato: ConfiguracionClientesContratoService,
    private ConfiguracionClienteContratoMarcas: ConfiguracionClientesContratoMarcasService,
    private sistemaArchivosService: SistemaArchivosService,
    private sistemaArchivosPDFsService: SistemaArchivosPDFsService,
  ) {}

  // DOCS:Validar contrato antes de guardar (en el guardado general del contrato)
  validateContract = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.VALIDATE_CONTRATO_CLIENTE_LOAD),
      withLatestFrom(
        this.store.select(clientContractsSelectors.selectNewContract),
        this.store.select(clientContractsSelectors.selectClientId),
        this.store.select(clientContractsSelectors.selectAddContractActualStep),
        this.store.select(clientContractsSelectors.selectAddStepValue),
      ),
      mergeMap(([action, contract$, idClient$, actualStep$, goNextStep$]) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        const body: RequestObtenerContratosContemporaneosMismasMarcas = {} as RequestObtenerContratosContemporaneosMismasMarcas;
        body.FechaFin = contract$.FechaFin;
        body.FechaInicio = contract$.FechaInicio;
        body.IdCliente = idClient$;
        body.ListaIdMarca = [];
        forEach(contract$.preSelectedBrands, (o: ITrademark) => {
          body.ListaIdMarca.push(o.IdMarca);
        });
        return this.ConfiguracionClienteContratoMarcas.ContratoClienteMarcaExtensionsValidar(
          body,
        ).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al validar que la marca no existe en otro contrato',
              ),
              response,
            );
            let duplicated = false;
            const existingContracts = [];
            forEach(response.Results, (o) => {
              forEach(contract$.preSelectedBrands, (i) => {
                if (
                  o.IdContratoCliente !== contract$.IdContratoCliente &&
                  o.IdMarca === i.IdMarca
                ) {
                  duplicated = true;
                  existingContracts.push(o);
                }
              });
            });
            if (duplicated) {
              this.store.dispatch(
                clientContractActions.SET_SAVE_CONTRACT_STATUS({
                  value: API_REQUEST_STATUS_DEFAULT,
                }),
              );
              this.store.dispatch(
                clientContractActions.SET_BRAND_INVALIDATE({
                  brands: existingContracts,
                }),
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              this.store.dispatch(
                utilsActions.SET_LOADING_ERROR({
                  active: true,
                  message:
                    'Una o mas marcas incluidas ya se encuentran en otro contrato. Verifica las fechas',
                }),
              );
              return clientContractActions.SET_VALIDATE_CLIENTE_SUCCESS({
                value: true,
              });
            } else {
              this.store.dispatch(
                utilsActions.SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Has guardado',
                }),
              );
              if (actualStep$ === 1 && goNextStep$) {
                // DOCS: Le dio click al botón Generar contrato en el paso 2
                return clientContractActions.CREATE_PDF_CONTRACT_LOAD();
              }
              // DOCS: Le dio click en el botón Guardar. Guarda el contrato y se sale
              return clientContractActions.SAVE_CONTRATO_CLIENTE({
                activeSequential: true,
              });
            }
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al validar que la marca no existe en otro contrato',
              ),
              error,
            );
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            return of(clientContractActions.VALIDATE_CONTRATO_CLIENTE_ERROR(error));
          }),
        );
      }),
    ),
  );
  // DOCS:Crea el archivo pdf del contrato al momento de guardarlo desde el paso 2 y después guardará el contrato
  createPDFContract = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.CREATE_PDF_CONTRACT_LOAD),
      withLatestFrom(
        this.store.select(clientContractsSelectors.selectNewContract),
        this.store.select(clientsDetailsSelectors.selectedClient),
      ),
      mergeMap(([action, contract$, client$]) => {
        if (!contract$.IdArchivoContrato) {
          const parameters: ArchivoExportarPDFParameter = {} as ArchivoExportarPDFParameter;
          parameters.TipoDocumento = TYPE_OF_DOCUMENT_CONTRACT_CLIENT_TO_GENERATE_PDF;
          parameters.Parametros = {
            IdContratoCliente: contract$.IdContratoCliente,
          };
          const date = new Date();
          parameters.DestinoMinIO = {
            Bucket: MINIO_BUCKETS.Contracts,
            Key: `${date.getFullYear()}/${client$.IdCliente}/${
              contract$.IdContratoCliente
            }/${TYPE_OF_DOCUMENT_CONTRACT_CLIENT_TO_GENERATE_PDF}_${contract$.Folio}.pdf`,
          };
          return this.sistemaArchivosPDFsService.ArchivoExportarPDFsExportarPDF(parameters).pipe(
            map((response: Archivo) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al generar el PDF del contrato',
                ),
                response,
              );
              this.store.dispatch(
                clientContractActions.SET_ID_CONTRACT_FILE({
                  IdArchivoContrato: response.IdArchivo,
                }),
              );
              this.store.dispatch(clientContractActions.CREATE_PDF_CONTRACT_SUCCESS());
              return clientContractActions.SAVE_CONTRATO_CLIENTE({
                activeSequential: true,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al generar el PDF del contrato',
                ),
                error,
              );
              return of(utilsActions.SET_LOADING({payload: false}));
            }),
          );
        } else {
          return of(
            clientContractActions.SAVE_CONTRATO_CLIENTE({
              activeSequential: true,
            }),
          );
        }
      }),
    ),
  );

  // DOCS:Guardar contrato
  saveContractClient = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.SAVE_CONTRATO_CLIENTE), // enviar bandera si se esta guardando o generando el contrato
      withLatestFrom(
        this.store.select(clientContractsSelectors.selectNewContract),
        this.store.select(clientsDetailsSelectors.selectedClient),
        this.store.select(clientContractsSelectors.selectIdContractFile),
        this.store.select(clientContractsSelectors.selectIdSignedContractFile),
        this.store.select(clientContractsSelectors.selectAddContractActualStep),
        this.store.select(clientContractsSelectors.selectAddStepValue),
      ),
      mergeMap(
        ([
          action,
          contrato,
          client$,
          idContractFile,
          idSignedContractFile,
          actualStep$,
          goNextStep$,
        ]) => {
          return this.ConfiguracionClienteContrato.ContratoClienteGuardarOActualizar({
            ...contrato,
            IdCliente: client$.IdCliente,
            IdArchivoContrato: idContractFile,
            IdArchivoContratoFirmado: idSignedContractFile,
          }).pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar el contrato',
                ),
              );
              this.store.dispatch(
                clientContractActions.SET_ID_CONTRACT_CLIENT({
                  payload: extractID(response),
                }),
              );
              if (actualStep$ === 0) {
                return clientContractActions.SAVE_CONTRATO_CLIENTE_MARCA();
              }
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              if (actualStep$ === 1) {
                if (goNextStep$) {
                  this.store.dispatch(
                    clientContractActions.SET_ADD_CONTRACT_ACTUAL_STEP({
                      addContractActualStep: 2,
                    }),
                  );
                  return clientContractActions.CHECK_GENERATED_CONTRACT_STATUS({
                    idFile: contrato.IdArchivoContrato,
                  });
                } else {
                  this.store.dispatch(clientContractActions.GET_LIST_CONTRACTS_CLIENT_LOAD());
                  this.store.dispatch(
                    clientContractActions.SET_CONTRACT_IS_EDIT_MODE({
                      contractEditMode: false,
                    }),
                  );
                  this.store.dispatch(
                    clientContractActions.SET_ADD_CONTRACT_ACTUAL_STEP({
                      addContractActualStep: 0,
                    }),
                  );
                  this.store.dispatch(
                    clientContractActions.SET_IS_ADDING_CONTRACT({
                      addingContract: false,
                    }),
                  );
                  this.store.dispatch(
                    clientContractActions.SET_DETAILS({
                      value: false,
                    }),
                  );
                  this.store.dispatch(SET_ENABLE_EDIT({value: false}));
                  return clientContractActions.SET_SAVE_CONTRACT_STATUS({
                    value: API_REQUEST_STATUS_SUCCEEDED,
                  });
                }
              }
              if (actualStep$ === 2) {
                this.store.dispatch(clientContractActions.GET_LIST_CONTRACTS_CLIENT_LOAD());
                if (!goNextStep$) {
                  this.store.dispatch(
                    utilsActions.SET_LOADING_SUCCESS({
                      message: 'Has generado el contrato',
                      active: true,
                    }),
                  );
                }
                this.store.dispatch(
                  clientContractActions.SET_CONTRACT_IS_EDIT_MODE({
                    contractEditMode: false,
                  }),
                );
                this.store.dispatch(
                  clientContractActions.SET_ADD_CONTRACT_ACTUAL_STEP({
                    addContractActualStep: 0,
                  }),
                );
                this.store.dispatch(
                  clientContractActions.SET_IS_ADDING_CONTRACT({
                    addingContract: false,
                  }),
                );
                this.store.dispatch(
                  clientContractActions.SET_DETAILS({
                    value: false,
                  }),
                );
                this.store.dispatch(SET_ENABLE_EDIT({value: false}));
                return clientContractActions.SET_SELECTED_TAB_FILTER({
                  item: {id: '0', label: 'ACTIVOS', filter: 'ACTIVO'},
                });
              }
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar el contrato',
                ),
                error,
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return of(clientContractActions.SAVE_CONTRATO_CLIENTE_FAILED());
            }),
          );
        },
      ),
    ),
  );
  // DOCS: Guardar marcas asociadas al contrato al cambiar con la flecha en vigencia y marcas
  saveContractClientTrademark = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.SAVE_CONTRATO_CLIENTE_MARCA),
      withLatestFrom(
        this.store.select(clientContractsSelectors.selectNewContract),
        this.store.select(clientContractsSelectors.selectDisableBrands),
        this.store.select(clientContractsSelectors.selectAddContractActualStep),
        this.store.select(clientContractsSelectors.selectAddStepValue),
      ),
      mergeMap(([action, contract$, disableBrands$, actualStep$, addStep$]) => {
        const request: any[] = _map(contract$.preSelectedBrands, (o: ITrademark) =>
          this.ConfiguracionClienteContratoMarcas.ContratoClienteMarcaGuardarOActualizar({
            IdContratoClienteMarca: o.IdContratoClienteMarca
              ? o.IdContratoClienteMarca
              : DEFAULT_UUID,
            IdContratoCliente: contract$.IdContratoCliente,
            IdMarca: o.IdMarca,
            Activo: true,
          }),
        );
        return forkJoin(request).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar el contrato cliente marca',
              ),
            );
            if (disableBrands$.length > 0) {
              return clientContractActions.REQUEST_DISABLE_BRANDS();
            }
            if (!addStep$) {
              this.store.dispatch(clientContractActions.GET_LIST_CONTRACTS_CLIENT_LOAD());
              this.store.dispatch(
                clientContractActions.SET_CONTRACT_IS_EDIT_MODE({
                  contractEditMode: false,
                }),
              );
              this.store.dispatch(
                clientContractActions.SET_ADD_CONTRACT_ACTUAL_STEP({
                  addContractActualStep: 0,
                }),
              );
              this.store.dispatch(
                clientContractActions.SET_IS_ADDING_CONTRACT({
                  addingContract: false,
                }),
              );
              this.store.dispatch(clientContractActions.RESET_FORM_CONTRACT());
              this.store.dispatch(
                clientContractActions.SET_DETAILS({
                  value: false,
                }),
              );
              this.store.dispatch(SET_ENABLE_EDIT({value: false}));
              return utilsActions.SET_LOADING({payload: false});
            } else {
              this.store.dispatch(
                clientContractActions.GET_DATA_NEW_CONTRACT_LOAD({
                  contract: contract$,
                }),
              );
              return clientContractActions.SET_ADD_CONTRACT_ACTUAL_STEP({
                addContractActualStep: 1,
              });
            }
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar el contrato cliente marca',
              ),
            );
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            return of(clientContractActions.SAVE_CONTRATO_CLIENTE_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS: Eliminar marcas asociadas al contrato en caso de existir marcas por desvincular
  disableBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.REQUEST_DISABLE_BRANDS),
      withLatestFrom(
        this.store.select(clientContractsSelectors.selectNewContract),
        this.store.select(clientContractsSelectors.selectDisableBrands),
        this.store.select(clientContractsSelectors.selectAddContractActualStep),
        this.store.select(clientContractsSelectors.selectAddStepValue),
      ),
      mergeMap(([action, contract$, disableBrands$, actualStep$, addStep$]) => {
        const request: any[] = disableBrands$.map((brand) =>
          this.ConfiguracionClienteContratoMarcas.ContratoClienteMarcaDesactivar(
            brand.IdContratoClienteMarca,
          ),
        );
        return forkJoin(request).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al desactivar contrato cliente marca',
              ),
            );
            if (!addStep$) {
              this.store.dispatch(clientContractActions.GET_LIST_CONTRACTS_CLIENT_LOAD());
              this.store.dispatch(
                clientContractActions.SET_CONTRACT_IS_EDIT_MODE({
                  contractEditMode: false,
                }),
              );
              this.store.dispatch(
                clientContractActions.SET_ADD_CONTRACT_ACTUAL_STEP({
                  addContractActualStep: 0,
                }),
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return clientContractActions.SET_IS_ADDING_CONTRACT({
                addingContract: false,
              });
            } else {
              this.store.dispatch(
                clientContractActions.GET_DATA_NEW_CONTRACT_LOAD({
                  contract: contract$,
                }),
              );
              return clientContractActions.SET_ADD_CONTRACT_ACTUAL_STEP({
                addContractActualStep: 1,
              });
            }
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al desactivar contrato cliente marca',
              ),
            );
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
    ),
  );

  // DOCS: Verifica el estado del pdf del contrato
  checkGeneratedContractStatus$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(clientContractActions.CHECK_GENERATED_CONTRACT_STATUS),
        mergeMap(({idFile}) =>
          this.sistemaArchivosService.ArchivoObtener(idFile).pipe(
            repeatWhen((completed) => completed.pipe(delay(TIMER_SCHEDULE))),
            map((response) => response),
            takeWhile((file, counter = 0) => {
              if (counter < 6) {
                this.store.dispatch(clientContractActions.SET_PDF_CONTRACT_LOADING());
                if (file.Sincronizado) {
                  this.store.dispatch(clientContractActions.GET_URL_CONTRACT_SUCCESS());
                  this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
                  this.store.dispatch(
                    clientContractActions.GET_CONTRACT_FILE_DETAIL({
                      idFile: file.IdArchivo,
                    }),
                  );
                  return false;
                } else {
                  return true;
                }
              } else {
                // TODO: Se terminó el tiempo para recuperar el archivo
                this.store.dispatch(clientContractActions.SET_PDF_CONTRACT_FAILED());
                this.store.dispatch(
                  clientContractActions.GET_PROCESO_SISTEMA_LOAD({
                    IdProcesoSistema: file.IdProcesoSistema,
                  }),
                );
                catchError((error) => {
                  return of(utilsActions.SET_LOADING({payload: false}));
                });
                return false;
              }
            }),
            catchError((error) => of(utilsActions.SET_LOADING({payload: false}))),
          ),
        ),
      ),
    {dispatch: false},
  );

  // DOCS Obtiene url del pdf del contrato
  getUrlContract = createEffect(
    () =>
      this.actions$.pipe(
        ofType(clientContractActions.GET_CONTRACT_FILE_DETAIL),
        mergeMap(({idFile}) => {
          return this.sistemaArchivosService.ArchivoExtensionsObtenerDetalle(idFile).pipe(
            map(async (response) => {
              const url: any = await convertPDFFileFromURLToBase64(response.Url);
              this.store.dispatch(clientContractActions.SET_URL_CONTRACT({url}));
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              this.store.dispatch(clientContractActions.SET_PDF_CONTRACT_SUCCESS());
              return clientContractActions.GET_URL_CONTRACT_SUCCESS();
            }),
          );
        }),
      ),
    {dispatch: false},
  );

  // DOCS SE GUARDA EL CONTRATO
  saveContractsSection = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.SAVE_CONTRACTS_SECTION_LOAD),
      mergeMap((action) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));

        this.store.dispatch(
          utilsActions.SET_LOADING_SUCCESS({
            active: true,
            message: 'Has guardado',
          }),
        );
        this.store.dispatch(clientsFormActions.SET_CLIENT_LIST_VIEW({clientListView: true}));
        this.store.dispatch(clientsFormActions.SET_CLIENT_ACTUAL_STEP({actualStep: 0}));
        this.store.dispatch(clientsFormActions.RESET_FORM_CLIENT());

        this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
        return of(clientContractActions.RETURN_PROCESS_SUCCESS());
      }),
    ),
  );
}
