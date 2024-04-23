// CORE
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {NGXLogger} from 'ngx-logger';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
// MODELS
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {
  BrandItem,
  IContract,
  OfferContractBrands,
} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';
// SELECTORS
import * as api from 'api-catalogos';
import {
  Archivo,
  ArchivoDetalle,
  CatalogosService,
  ConfiguracionClientesContratoMarcasService,
  ConfiguracionClientesContratoService,
  ConfiguracionClientesDireccionesService,
  ConfiguracionEmpresasService,
  EnlaceExterno,
  QueryResultCatCondicionesDePago,
  QueryResultContratoCliente,
  QueryResultDireccionClienteDetalle,
  QueryResultVContratoClienteMarca,
  SistemaArchivosService,
} from 'api-catalogos';
// ACTIONS
import * as utilsActions from '@appActions/utils/utils.action';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';
import {GET_CAT_UNIDAD_TIEMPO_LOAD} from '@appActions/catalogs/catalogos.actions';
import {clientContractActions} from '@appActions/forms/client-form/clients-details-form';
import {contractsActions} from '@appActions/forms/client-form';
import {clientContractsSelectors} from '@appSelectors/forms/clients-form';
// UTILS
import * as servicesLogger from '@appUtil/logger';
import {
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_UUID,
  MINIO_BUCKETS,
} from '@appUtil/common.protocols';
import {
  buildBrandsContract,
  filterContract,
  pacthCompanys,
} from '@appHelpers/catalogs/clients/contracts.helpers';
import {MinioService} from '@appServices/minio/minio.service';
import {dateWithHoursFormatDate} from '@appUtil/dates';
import {
  ClienteEstrategiaCotizacionMarcasObj,
  ProcesosL02AjustarOfertaEstablecerEstrategiaCotizacionService,
} from 'api-logistica';
import {find, isEmpty, map as _map} from 'lodash-es';
import ArchivoExtensionsBuscarArchivoClienteParams = SistemaArchivosService.ArchivoExtensionsBuscarArchivoClienteParams;

const FILE_NAME = 'client-contacts-form.effects.ts';

@Injectable({
  providedIn: 'root',
})
export class ClientContractsFormEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private configuracionClientesContratoService: ConfiguracionClientesContratoService,
    private EmpresaService: ConfiguracionEmpresasService,
    private ConfiguracionClienteContrato: ConfiguracionClientesContratoService,
    private ConfiguracionClienteContratoMarcas: ConfiguracionClientesContratoMarcasService,
    private procesosAjustarOfertaEstablecerEstrategiaCotizacionService: ProcesosL02AjustarOfertaEstablecerEstrategiaCotizacionService,
    private clientAddressesConfigService: ConfiguracionClientesDireccionesService,
    private catalogosService: CatalogosService,
    private sistemaArchivosService: api.SistemaArchivosService,
    private sistemaServiciosSistemaService: api.SistemaServiciosSistemaService,
    private minioService: MinioService,
  ) {}

  // DOCS: Obtener lista de contratos
  getContractsList = createEffect(() =>
    this.actions$.pipe(
      ofType(
        clientContractActions.GET_LIST_CONTRACTS_CLIENT_LOAD,
        contractsActions.SET_SEARCH_TERM,
        clientContractActions.SET_SELECTED_TAB_FILTER,
      ),
      withLatestFrom(
        this.store.select(clientContractsSelectors.selectFiltersByTabOption),
        this.store.select(clientContractsSelectors.selectNeedsToReloadListData),
        this.store.select(clientContractsSelectors.selectedTabFilter),
      ),
      switchMap(([action, filter, needsToReload, tab]) => {
        if (needsToReload) {
          switch (tab.filter?.toLowerCase()) {
            case 'activo':
              this.store.dispatch(
                clientContractActions.SET_API_STATUS_ACTIVE({
                  status: API_REQUEST_STATUS_LOADING,
                }),
              );
              break;
            case 'guardado':
              this.store.dispatch(
                clientContractActions.SET_API_STATUS_SAVED({
                  status: API_REQUEST_STATUS_LOADING,
                }),
              );
              break;
            case 'expirado':
              this.store.dispatch(
                clientContractActions.SET_API_STATUS_EXPIRED({
                  status: API_REQUEST_STATUS_LOADING,
                }),
              );
              break;
            case 'cancelado':
              this.store.dispatch(
                clientContractActions.SET_API_STATUS_CANCELED({
                  status: API_REQUEST_STATUS_LOADING,
                }),
              );
              break;
          }
          return this.configuracionClientesContratoService.vContratoClienteQueryResult(filter).pipe(
            map((response: QueryResultContratoCliente) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener la lista de contratos',
                ),
                response,
              );
              switch (tab.filter.toLowerCase()) {
                case 'activo':
                  this.store.dispatch(
                    clientContractActions.SET_API_STATUS_ACTIVE({
                      status: API_REQUEST_STATUS_SUCCEEDED,
                    }),
                  );
                  break;
                case 'guardado':
                  this.store.dispatch(
                    clientContractActions.SET_API_STATUS_SAVED({
                      status: API_REQUEST_STATUS_SUCCEEDED,
                    }),
                  );
                  break;
                case 'expirado':
                  this.store.dispatch(
                    clientContractActions.SET_API_STATUS_EXPIRED({
                      status: API_REQUEST_STATUS_SUCCEEDED,
                    }),
                  );
                  break;
                case 'cancelado':
                  this.store.dispatch(
                    clientContractActions.SET_API_STATUS_CANCELED({
                      status: API_REQUEST_STATUS_SUCCEEDED,
                    }),
                  );
                  break;
              }

              const lista = filterContract(response);

              if (action.type == '[Reduce ClientForm - Contracts] Set search Term') {
                this.store.dispatch(
                  clientContractActions.GET_LIST_CONTRACTS_CLIENT_SUCCESS({
                    lista,
                    tab: tab.filter?.toLowerCase(),
                  }),
                );

                return clientContractActions.GET_DATAS_CONTRACT_LOAD({
                  contract: lista[0],
                  isEdition: false,
                  tabSelected: tab.filter.toLowerCase(),
                  typeAction: 'add',
                });
              }

              return clientContractActions.GET_LIST_CONTRACTS_CLIENT_SUCCESS({
                lista,
                tab: tab.filter?.toLowerCase(),
              });
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );
  // DOCS: Iniciar el proceso de un nuevo contrato
  startNewContract = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.NEW_CONTRACT),
      withLatestFrom(this.store.select(clientContractsSelectors.selectedContract)),
      mergeMap(([{orderType}, selectedContract$]) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        this.store.dispatch(GET_CAT_UNIDAD_TIEMPO_LOAD());
        // this.store.dispatch(clientContractActions.GET_BRANDS_LOAD());
        this.store.dispatch(
          clientContractActions.SET_CONTRACT_IS_EDIT_MODE({
            contractEditMode: orderType === 'edit',
          }),
        );

        if (orderType === 'edit') {
          this.store.dispatch(clientContractActions.SET_DETAILS({value: true}));
          this.store.dispatch(
            clientContractActions.SET_CONTRACT_TO_EDIT({
              contract: {
                ...selectedContract$,
                FechaInicioTipoDate: dateWithHoursFormatDate(selectedContract$.FechaInicio),
                FechaFinTipoDate: dateWithHoursFormatDate(selectedContract$.FechaFin),
              },
            }),
          );
          if (
            selectedContract$.IdArchivoContrato &&
            selectedContract$.IdArchivoContrato !== DEFAULT_UUID
          ) {
            this.store.dispatch(
              clientContractActions.SET_IS_ADDING_CONTRACT({
                addingContract: true,
              }),
            );
            this.store.dispatch(contractsActions.SET_ADD_STEP_VALUE({addStep: true}));
            this.store.dispatch(
              clientContractActions.SET_ADD_CONTRACT_ACTUAL_STEP({
                addContractActualStep: 2,
              }),
            );
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            return of(
              clientContractActions.CHECK_GENERATED_CONTRACT_STATUS({
                idFile: selectedContract$.IdArchivoContrato,
              }),
            );
          }
          return of(
            clientContractActions.GET_CONTRACT_PRE_SELECTED_BRANDS_LOAD({
              contract: selectedContract$,
            }),
          );
        } else {
          this.store.dispatch(
            clientContractActions.SET_IS_ADDING_CONTRACT({
              addingContract: true,
            }),
          );
          return of(utilsActions.SET_LOADING({payload: false}));
        }
      }),
    ),
  );
  // DOCS: Obtener marcas del contrato
  getContractPreselectedBrands = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.GET_CONTRACT_PRE_SELECTED_BRANDS_LOAD),
      switchMap(({contract}) => {
        const body = new FiltersOnlyActive();
        body.Filters.push({
          NombreFiltro: 'IdContratoCliente',
          ValorFiltro: contract.IdContratoCliente,
        });
        return this.ConfiguracionClienteContratoMarcas.vContratoClienteMarcaQueryResult(body).pipe(
          map((response: QueryResultVContratoClienteMarca) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al obtener las marcas del contrato editado',
              ),
              response,
            );
            this.store.dispatch(
              clientContractActions.SET_IS_ADDING_CONTRACT({
                addingContract: true,
              }),
            );
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            return clientContractActions.GET_CONTRACT_PRE_SELECTED_BRANDS_SUCCESS({
              brands: response.Results,
            });
          }),
          catchError((error) => {
            this.store.dispatch(clientContractActions.GET_CONTRACT_PRE_SELECTED_BRANDS_ERROR());
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al obtener las marcas del contrato editado',
              ),
              error,
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );

  //DOCS: Inicializador de la vista para agregar / editar un contrato
  getGeneralData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.GET_INITIAL_DATA_CONTRACT_COMPONENT_EFFECT),
      mergeMap((action) => {
        this.store.dispatch(clientContractActions.GET_ADDRESSES_CLIENT_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_ADDRESS_TYPE_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_RUTA_ENTREGA_LOAD());
        return of(RETURN_EMPTY());
      }),
    ),
  );

  //DOCS: Validar ambas fechas
  validateDates$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          clientContractActions.SET_DATES_CONTRACT,
          clientContractActions.GET_BRANDS_DATES_UPDATE,
        ),
        withLatestFrom(this.store.select(clientContractsSelectors.selectValidateDatesContract)),
        mergeMap(([action, validateDates]) => {
          const typeDate: string = action['typeDate'];
          const payload: any = action['payload'];
          if (typeDate && payload) {
            if (typeDate === 'startDate') {
              this.store.dispatch(
                clientContractActions.SET_DATE_INITIAL({
                  payload,
                }),
              );
            } else if (typeDate === 'endDate') {
              this.store.dispatch(
                clientContractActions.SET_DATE_FINAL({
                  payload,
                }),
              );
            }
          }
          if (validateDates) {
            this.store.dispatch(clientContractActions.GET_BRANDS_LOAD());
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS: se obtiene la lista de marcas en vigencia y marca
  getListBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.GET_BRANDS_LOAD, clientContractActions.SET_SEARCH_TERM_BY_BRAND),
      withLatestFrom(
        this.store.select(clientContractsSelectors.selectBrandQueryInfo),
        this.store.select(clientContractsSelectors.selectContractBrands),
      ),
      mergeMap(([action, queryInfo, listContractBrands]) => {
        return this.procesosAjustarOfertaEstablecerEstrategiaCotizacionService
          .ClienteEstrategiaCotizacionMarcasQueryResult(queryInfo)
          .pipe(
            map((response: Array<ClienteEstrategiaCotizacionMarcasObj>) => {
              const res: BrandItem[] = _map(
                response,
                (o: ClienteEstrategiaCotizacionMarcasObj) => ({
                  ...o,
                  isInThisContract: !isEmpty(
                    find(listContractBrands, (c: BrandItem) => c.IdMarca === o.IdMarca),
                  ),
                }),
              );
              return clientContractActions.GET_BRANDS_SUCCESS({
                brands: res,
              });
            }),
            catchError((error) => {
              return of(clientContractActions.GET_BRANDS_ERROR({error}));
            }),
          );
      }),
    ),
  );

  // DOCS: Obtiene las direcciones del cliente
  getClientAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.GET_ADDRESSES_CLIENT_LOAD),
      withLatestFrom(this.store.select(clientContractsSelectors.selectFiltersClientAddress)),
      mergeMap(([action, queryInfo]) => {
        return this.clientAddressesConfigService.DireccionClienteDetalleQueryResult(queryInfo).pipe(
          map((response: QueryResultDireccionClienteDetalle) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al obtener las direcciones del cliente',
              ),
              response,
            );
            return clientContractActions.GET_ADDRESSES_CLIENT_SUCCESS({
              clientAddresses: response.Results,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al obtener las direcciones del cliente',
              ),
              error,
            );
            return of(clientContractActions.GET_ADDRESSES_CLIENT_FAILED());
          }),
        );
      }),
    ),
  );
  // DOCS subida del archivo firmado y guardado del contrato
  uploadFileAndSaveContract = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.UPLOAD_SIGNED_CONTRACT_FILE),
      withLatestFrom(
        this.store.select(clientContractsSelectors.selectNewContract),
        this.store.select(clientContractsSelectors.selectClientId),
        this.store.select(clientContractsSelectors.getIdContractClient),
      ),
      // DOCS: Comprobar si el archivo ya existe
      switchMap(([action, contract$, clientId$, idContratCliente]) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        if (contract$.signedContract.file) {
          const params: ArchivoExtensionsBuscarArchivoClienteParams = {
            idCliente: clientId$,
            hash: contract$.signedContract.hash,
          };
          return this.sistemaArchivosService.ArchivoExtensionsBuscarArchivoCliente(params).pipe(
            map((response: Archivo) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al comprobar si el archivo ya existe.',
                ),
                response,
              );
              const contract: IContract = {
                ...contract$,
                IdArchivoContratoFirmado: response ? response.IdArchivo : null,
                signedContract: {
                  ...contract$.signedContract,
                  Archivo: response,
                },
              };
              return contract;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al comprobar si el archivo ya existe (comentarios).',
                ),
                error,
              );
              return of(utilsActions.SET_LOADING({payload: false}));
            }),
          );
        } else {
          this.store.dispatch(
            clientContractActions.SET_IS_ADDING_CONTRACT({
              addingContract: false,
            }),
          );
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
            clientContractActions.SET_SELECTED_TAB_FILTER({
              item: {id: '0', label: 'ACTIVOS', filter: 'ACTIVO'},
            }),
          );
          return of(utilsActions.SET_LOADING({payload: false}));
        }
      }),
      // DOCS: Obtener url para subir archivos comentarios
      switchMap(async (contract$: IContract) => {
        const fileName = `${new Date().getFullYear()}/${
          contract$.IdCliente
        }/${new Date().getTime()}/${contract$.signedContract?.file?.name}`;
        try {
          const fileUploaded: ArchivoDetalle = await this.minioService.uploadFile(
            contract$.signedContract.file,
            fileName,
            MINIO_BUCKETS.Contracts,
          );
          this.logger.debug(
            servicesLogger.generateMessage(
              FILE_NAME,
              servicesLogger.LOG_SUCCEEDED,
              'Al mover archivo subido a bucket contracts.',
            ),
            fileUploaded,
          );
          this.store.dispatch(
            clientContractActions.SET_ID_SIGNED_CONTRACT_FILE({
              IdArchivoContratoFirmado: fileUploaded.IdArchivo,
            }),
          );
          this.store.dispatch(
            clientContractActions.SAVE_CONTRATO_CLIENTE({
              activeSequential: false,
            }),
          );
          return utilsActions.SET_LOADING({payload: false});
        } catch (error) {
          this.logger.debug(
            servicesLogger.generateMessage(
              FILE_NAME,
              servicesLogger.LOG_FAILED,
              'Al mover archivo subido a bucket contracts.',
            ),
            error,
          );
          this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
        }
        /*      if (!contract$.IdArchivoContratoFirmado) {
                return this.sistemaArchivosService
                  .ArchivoExtensionsObtenerUrlSubirArchivo()
                  .pipe(
                    map((response: UrlSubirArchivo) => {
                      this.logger.debug(
                        servicesLogger.generateMessage(
                          FILE_NAME,
                          servicesLogger.LOG_SUCCEEDED,
                          'Al obtener url para subir archivo.',
                        ),
                        response,
                      );
                      const contract = {
                        ...contract$,
                        signedContract: {
                          ...contract$.signedContract,
                          urlToUpload: response,
                        },
                      };
                      return contract;
                    }),
                    catchError((error) => {
                      this.logger.debug(
                        servicesLogger.generateMessage(
                          FILE_NAME,
                          servicesLogger.LOG_FAILED,
                          'Al obtener url para subir archivos que no existen (comentarios).',
                        ),
                        error,
                      );
                      return of(utilsActions.SET_LOADING({payload: false}));
                    }),
                  );
              } else {
                return of(contract$);
              }*/
      }),
      /*      // TODO: Subir archivos a temporal comentarios
      switchMap((contract$: IContract) => {
        if (
          !contract$.IdArchivoContratoFirmado &&
          contract$.signedContract.urlToUpload
        ) {
          return from(
            fetch(contract$.signedContract.urlToUpload.UploadUrl, {
              method: 'PUT',
              body: contract$.signedContract.file,
            }),
          ).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al subir archivo que no existe a temporal.',
                ),
                response,
              );
              const contract = {
                ...contract$,
                signedContract: {
                  ...contract$.signedContract,
                  tempUploads: response,
                },
              };
              return contract;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al subir archivo que no existe a temporal.',
                ),
                error,
              );
              return of(utilsActions.SET_LOADING({payload: false}));
            }),
          );
        } else {
          return of(contract$);
        }
      }),
      // TODO: Mover archivos a MinIO Comentarios
      switchMap((contract$: IContract) => {
        if (
          contract$.signedContract.file &&
          contract$.signedContract.urlToUpload &&
          contract$.signedContract.tempUploads
        ) {
          const date = new Date();
          const body: RequestMoverArchivo = {
            OriginBucketName: contract$.signedContract.urlToUpload.BucketName,
            OriginFileName: contract$.signedContract.urlToUpload.FileKey,
            DestinyBucketName: MINIO_BUCKETS.Contracts,
            DestinyFileName: `${date.getFullYear()}/${contract$.IdCliente}/${
              contract$.IdContratoCliente
            }/${Date.now()}/${contract$.signedContract.file.name}`,
          };
          return this.sistemaArchivosService
            .ArchivoExtensionsMoverArchivoMinIO(body)
            .pipe(
              map((response: ArchivoDetalle) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al mover archivo subido a bucket contracts.',
                  ),
                  response,
                );
                this.store.dispatch(
                  contractActions.SET_ID_SIGNED_CONTRACT_FILE({
                    IdArchivoContratoFirmado: response.IdArchivo,
                  }),
                );
                this.store.dispatch(
                  contractActions.SAVE_CONTRATO_CLIENTE({
                    activeSequential: false,
                  }),
                );
                return utilsActions.SET_LOADING({payload: false});
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al mover archivo subido a bucket contracts.',
                  ),
                  error,
                );
                return of(utilsActions.SET_LOADING({payload: false}));
              }),
            );
        } else {
          return of(utilsActions.SET_LOADING({payload: false}));
        }
      }),*/
    ),
  );

  // DOCS: Obtener marcas asociadas al contrato del paso 2
  getBrandsNewContract = createEffect(() =>
    this.actions$.pipe(
      ofType(
        clientContractActions.GET_DATA_NEW_CONTRACT_LOAD,
        clientContractActions.SET_SEARCH_TERM_BY_BRAND_SELECTED,
      ),
      withLatestFrom(this.store.select(clientContractsSelectors.buildQueryBrandsAssociated)),
      mergeMap(([action, query]) => {
        return this.ConfiguracionClienteContratoMarcas.vContratoClienteMarcaQueryResult(query).pipe(
          map((response: QueryResultVContratoClienteMarca) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al obtener las marcas del contrato',
              ),
              response,
            );
            const brands: Array<OfferContractBrands> = buildBrandsContract(response.Results);
            this.store.dispatch(
              clientContractActions.GET_DATA_NEW_CONTRACT_SUCCESS({
                brands,
              }),
            );
            // DOCS Esta accion creo que reinicia la bandera para ir a otro paso
            this.store.dispatch(clientContractActions.SET_ADD_STEP_VALUE({addStep: false}));
            if (brands.length > 0) {
              this.store.dispatch(
                clientContractActions.SET_BRAND_SELECTED({
                  brand: brands[0],
                }),
              );
            }
            return RETURN_EMPTY();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al obtener las marcas del contrato',
              ),
              error,
            );
            this.store.dispatch(clientContractActions.GET_DATA_NEW_CONTRACT_ERROR());
            return EMPTY;
          }),
        );
      }),
    ),
  );
  // DOCS OBTIENE LAS MARCAS ASOCIADAS AL CONTRATO
  getBrandsContract = createEffect(
    () =>
      this.actions$.pipe(
        ofType(clientContractActions.GET_DATAS_CONTRACT_LOAD),
        withLatestFrom(this.store.select(clientContractsSelectors.selectgetContractSeleted)),
        switchMap(([{isEdition, typeAction}, contract]) => {
          if (contract?.needsToReload) {
            const body = new FiltersOnlyActive();
            body.Filters.push({
              NombreFiltro: 'IdContratoCliente',
              ValorFiltro: contract.IdContratoCliente,
            });
            return this.ConfiguracionClienteContratoMarcas.vContratoClienteMarcaQueryResult(
              body,
            ).pipe(
              map((response: QueryResultVContratoClienteMarca) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener las marcas del contrato',
                  ),
                  response,
                );
                return {
                  contract: {
                    ...contract,
                    contractBrands: response.Results,
                    needsToReload: false,
                  },
                  typeAction,
                  isEdition,
                };
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al obtener las marcas del contrato',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
          } else {
            this.store.dispatch(clientContractActions.SET_ITEM_SELECTED_CONTRAT({item: contract}));
            if (isEdition) {
              this.store.dispatch(clientContractActions.NEW_CONTRACT({orderType: 'edit'}));
            }
            return EMPTY;
          }
        }),
        switchMap((response: any) => {
          const body = {
            Filters: [
              {
                NombreFiltro: 'IdCatCondicionesDePago',
                ValorFiltro: response.contract.IdCatCondicionesDePago,
              },
            ],
          };
          return this.catalogosService.catCondicionesDePagoQueryResult(body).pipe(
            map((responseCondition: QueryResultCatCondicionesDePago) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener el catalogo de condiciones de pago',
                ),
                responseCondition,
              );
              const contract = {
                ...response.contract,
                NombreCatCondicionesDePago: responseCondition.Results[0].CondicionesDePago,
              };
              return {
                contract,
                typeAction: response.typeAction,
                isEdition: response.isEdition,
              };
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener el catalogo de condiciones de pago',
                ),
                error,
              );
              return EMPTY;
            }),
          );
        }),
        withLatestFrom(this.store.select(clientContractsSelectors.selectedTabFilter)),
        switchMap(([response, tab]) => {
          return this.configuracionClientesContratoService
            .ContratoClienteExtensionsUrlPDF(response.contract.IdContratoCliente)
            .pipe(
              map((responseFile: EnlaceExterno) => {
                this.store.dispatch(
                  clientContractActions.GET_DATAS_CONTRACT_SUCCESS({
                    item: {
                      ...response.contract,
                      UrlContrato: responseFile?.Url,
                    },
                    tab: tab.filter?.toLowerCase(),
                  }),
                );
                if (response.typeAction === 'edit') {
                  this.store.dispatch(
                    clientContractActions.SET_ITEM_SELECTED_CONTRAT({
                      item: response.contract,
                    }),
                  );
                  if (response.isEdition) {
                    this.store.dispatch(clientContractActions.NEW_CONTRACT({orderType: 'edit'}));
                  }
                }
                return EMPTY;
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al obtener el catalogo de condiciones de pago',
                  ),
                  error,
                );
                this.store.dispatch(clientContractActions.GET_DATAS_CONTRACT_ERROR());
                this.store.dispatch(
                  clientContractActions.GET_DATAS_CONTRACT_SUCCESS({
                    item: {
                      ...response.contract,
                      UrlContrato: null,
                    },
                    tab: tab.filter?.toLowerCase(),
                  }),
                );
                return EMPTY;
              }),
            );
        }),
      ),
    {dispatch: false},
  );
  // DOCS: Cancelar contrato
  cancelContract = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.DISABLE_CONTRACT_LOAD),
      mergeMap((action) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        return this.ConfiguracionClienteContrato.ContratoClienteDesactivar(
          action.idContratoCliente,
        ).pipe(
          map((response) => {
            this.store.dispatch(clientContractActions.GET_LIST_CONTRACTS_CLIENT_LOAD());
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            return clientContractActions.DISABLE_CONTRACT_SUCCESS();
          }),
          catchError((error) => {
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            return of(clientContractActions.DISABLE_CONTRACT_ERROR(error));
          }),
        );
      }),
    ),
  );

  // DOCS obtenr compañias para el dropListOption
  getCompaniesForDropList = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.GET_COMPANYS_LOAD),
      mergeMap((action) => {
        const body = {
          Filters: [
            {
              NombreFiltro: 'Activo',
              ValorFiltro: true,
            },
          ],
          SortDirection: 'asc',
          SortField: 'RazonSocial',
        };
        return this.EmpresaService.EmpresaQueryResult(body).pipe(
          map((response) => {
            return clientContractActions.GET_COMPANYS_SUCCESS({
              payload: pacthCompanys(response),
            });
          }),
        );
      }),
    ),
  );
  // DOCS Obtener proceso del sistema
  getProcesoSistema = createEffect(() =>
    this.actions$.pipe(
      ofType(clientContractActions.GET_PROCESO_SISTEMA_LOAD),
      mergeMap(({IdProcesoSistema}) => {
        return this.sistemaServiciosSistemaService.ProcesoSistemaObtener(IdProcesoSistema).pipe(
          map((response) => {
            const errorMessage =
              response.Etiqueta === null
                ? 'Ocurrió un error en el Servicio web'
                : response.Etiqueta;
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            return utilsActions.SET_LOADING_ERROR({
              active: true,
              message: errorMessage,
            });
          }),
        );
      }),
    ),
  );
}
