/* Core Imports */
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {EMPTY, of} from 'rxjs';
import {
  catchError,
  delay,
  map,
  mergeMap,
  repeatWhen,
  switchMap,
  takeWhile,
  withLatestFrom,
} from 'rxjs/operators';
import {filter, find, map as _map} from 'lodash-es';

/* Services Imports */
import * as apiCatalogs from 'api-catalogos';
import * as apiLogistics from 'api-logistica';
import {CotCotizacion} from 'api-logistica';

/* Models Imports */
import {AppState} from '@appCore/core.state';
import {
  IRelate,
  ISendQuotation,
} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';

/* Actions Imports */
import {listQuotesActions, quotationDetailsActions} from '@appActions/quotation';
import * as utilsActions from '@appActions/utils/utils.action';
import {
  RETURN_EMPTY,
  SET_LOADING,
  SET_LOADING_ERROR,
  SET_LOADING_SUCCESS,
} from '@appActions/utils/utils.action';
/* Selectors Imports */
import {quotationDetailsSelectors} from '@appSelectors/quotation';
import {selectedClientId} from '@appSelectors/quotation/quotation-details/quotation-details.selectors';
import * as clientCatalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {selectCatEstadoCotizacion} from '@appSelectors/catalogs/catalogs.selectors';

/* Tools Imports */
import {extractID, patchBody} from '@appUtil/util';
import {
  DEFAULT_DATE,
  DEFAULT_UUID,
  ITEM_QUOTATION_TYPE_ORIGINAL,
  QUOTATION_SENT,
  TIMER_SCHEDULE,
} from '@appUtil/common.protocols';

/* Dev Tools */
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {convertPDFFileFromURLToBase64, getBase64FromUrl} from '@appUtil/files';
import {appRoutes} from '@appHelpers/core/app-routes';

const FILE_NAME = 'list-quotes.effects.ts';

@Injectable()
export class ListQuotesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private logger: NGXLogger,
    private procesosCotizacionService: apiLogistics.ProcesosL01CotizacionService,
    private sistemaArchivosPDFsService: apiCatalogs.SistemaArchivosPDFsService,
    private sistemaArchivoService: apiCatalogs.SistemaArchivosService,
    private sistemaCorreosService: apiCatalogs.SistemaCorreosService,
    private sistemaCorreosEnvioService: apiCatalogs.SistemaCorreosEnvioService,
    private procesosL01CotizacionCorreosService: apiLogistics.ProcesosL01CotizacionCorreosService,
    private sistemaServiciosSistemaService: apiCatalogs.SistemaServiciosSistemaService,
    private sistemaArchivosService: apiCatalogs.SistemaArchivosService,
  ) {}

  /*DOCS: Obtiene la lista de productos coincidentes para mostrar en el buscador*/
  /*getOptionsOfProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(listQuotesActions.GET_OPTIONS_OF_PRODUCTS),
      withLatestFrom(this.store.select(listQuotesSelectors.selectSuggestionQueryInfo)),
      mergeMap(([action, searchSuggestionParameters]) => {
        if (action.searchTerm) {
          return this.sistemaUXService.SugerenciasBusquedaProcess(searchSuggestionParameters).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener los productos.',
                ),
                response,
              );
              return listQuotesActions.GET_OPTIONS_OF_PRODUCTS_SUCCESS({
                products: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener los productos.',
                ),
                error,
              );
              return of(listQuotesActions.GET_OPTIONS_OF_PRODUCTS_FAILED());
            }),
          );
        } else {
          return of(RETURN_EMPTY());
        }
      }),
    ),
  );*/

  // DOCS: SCROLLED DE LA LISTA DE PRODUCTOS, LOGICA DE CAMBIO DE LIST
  /*scrolledIndexChange$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(listQuotesActions.SCROLL_INDEX_CHANGES_EFFECT),
        withLatestFrom(
          this.store.select(quotationDetailsSelectors.selectProductsSearchResults),
          this.store.select(quotationDetailsSelectors.selectProductsSearchResultsStatus),
          this.store.select(quotationDetailsSelectors.selectTotal),
          this.store.select(quotationDetailsSelectors.currentPage),
        ),
        mergeMap(([action, products, listProductsStatus, currentTotal, currentPage]) => {
          if (action.end !== currentTotal && currentTotal > 0) {
            const totalPages =
              currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;

            if (
              currentPage > totalPages ||
              products.length > currentTotal ||
              listProductsStatus === API_REQUEST_STATUS_LOADING
            ) {
              return;
            }
            this.getProducts(false);
          }
          return of(RETURN_EMPTY());
        }),
      ),
    {dispatch: false},
  );*/

  fetchQuotationRelated = createEffect(() =>
    this.actions$.pipe(
      ofType(listQuotesActions.FETCH_QUOTATION_RELATED_LOAD),
      withLatestFrom(
        this.store.select(selectedClientId),
        this.store.select(selectCatEstadoCotizacion),
      ),
      mergeMap(([action, idClient, typeQuotation]) => {
        const filters: apiLogistics.FilterTuple[] = [];
        filters.push({NombreFiltro: 'IdCliente', ValorFiltro: idClient});
        filters.push({
          NombreFiltro: 'IdProducto',
          ValorFiltro: action.product.IdProducto,
        });
        const idQuotationSend = filter(
          typeQuotation,
          (item) => item.EstadoCotizacion === 'Enviada',
        );
        if (idQuotationSend) {
          filters.push({
            NombreFiltro: 'IdCatEstadoCotizacion',
            ValorFiltro: idQuotationSend[0].IdCatEstadoCotizacion,
          });
        }
        return this.procesosCotizacionService
          .cotCotizacionQueryResult(patchBody(null, null, true, null, 'Folio', filters))
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener cotizaciones vinculadas.',
                ),
                response,
              );
              return listQuotesActions.FETCH_QUOTATION_RELATED_SUCCESS({
                list:
                  response.TotalResults > 0
                    ? _map(
                        response.Results,
                        (cot: CotCotizacion): IRelate => {
                          return {
                            folio: cot.Folio,
                            idArchivo: cot.IdArchivoPDF,
                            idCotCotizacion: cot.IdCotCotizacion,
                          };
                        },
                      )
                    : [],
                IdProduct: action.product.IdProducto,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener cotizaciones vinculadas',
                ),
                error,
              );
              return of(listQuotesActions.FETCH_QUOTATION_RELATED_ERROR(error));
            }),
          );
      }),
    ),
  );

  getFilePDF = createEffect(
    () =>
      this.actions$.pipe(
        ofType(listQuotesActions.FETCH_FILE_PDF_LOAD),
        withLatestFrom(
          this.store.select(clientCatalogsSelectors.selectCatTipoPartidaCotizacion),
          this.store.select(quotationDetailsSelectors.selectedQuotation),
          this.store.select(quotationDetailsSelectors.selectLinkedQuote),
        ),
        mergeMap(([action, catTipoPartidaCotizacion, singleQuotation, linkedQuote]) => {
          if (linkedQuote.needsToReload) {
            const type: apiCatalogs.CatTipoPartidaCotizacion = find(
              catTipoPartidaCotizacion,
              (o) => o.TipoPartidaCotizacion === ITEM_QUOTATION_TYPE_ORIGINAL,
            );
            const parameters: apiCatalogs.ArchivoExportarPDFParameter = {} as apiCatalogs.ArchivoExportarPDFParameter;
            parameters.TipoDocumento = 'Cotizacion';
            parameters.Parametros = {
              IdCotCotizacion: singleQuotation.IdCotCotizacion,
              IdCatTipoPartidaCotizacion: type.IdCatTipoPartidaCotizacion,
            };
            parameters.DestinoMinIO = {
              Bucket: 'cotizaciones',
              Key: `${singleQuotation.IdCliente}/${singleQuotation.IdCotCotizacion}/Cotizacion_${singleQuotation.Folio}.pdf`,
            };
            this.store.dispatch(SET_LOADING({payload: true}));
            return this.sistemaArchivosPDFsService.ArchivoExportarPDFsExportarPDF(parameters).pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al generar el PDF',
                  ),
                  response,
                );
                return response;
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al generar PDF la cotización.',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return EMPTY;
              }),
            );
          }
          return EMPTY;
        }),
        switchMap((data) => {
          return this.sistemaArchivoService.ArchivoObtener(data.IdArchivo).pipe(
            repeatWhen((completed) => completed.pipe(delay(TIMER_SCHEDULE))),
            map((response) => response),
            takeWhile((file) => {
              if (file.Sincronizado) {
                this.store.dispatch(
                  listQuotesActions.FETCH_FILE_BASE64_LOAD({
                    IdArchivo: file.IdArchivo,
                  }),
                );
                return false;
              } else {
                return true;
              }
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al generar PDF la cotización.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(RETURN_EMPTY());
            }),
          );
        }),
      ),
    {dispatch: false},
  );

  getConvertFile = createEffect(
    () =>
      this.actions$.pipe(
        ofType(listQuotesActions.FETCH_FILE_BASE64_LOAD),
        mergeMap((action) => {
          return this.sistemaArchivoService.ArchivoExtensionsObtenerDetalle(action.IdArchivo).pipe(
            map(async (response) => {
              let base64: string;
              if (response && response.Url) {
                base64 = await convertPDFFileFromURLToBase64(response.Url);
              }
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(listQuotesActions.FETCH_FILE_PDF_SUCCESS({base64}));
            }),
            catchError((error) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la URL del PDF',
                ),
                error,
              );
              return of(RETURN_EMPTY());
            }),
          );
        }),
      ),
    {dispatch: false},
  );

  resendQuote = createEffect(() =>
    this.actions$.pipe(
      ofType(listQuotesActions.SEND_EMAIL_QUOTATION_LOAD),
      mergeMap((action) => {
        this.store.dispatch(quotationDetailsActions.SET_INITIAL_CONTACTS_MAIL());
        this.store.dispatch(SET_LOADING_SUCCESS({active: true, message: 'Se ha reenviado'}));

        return of(RETURN_EMPTY());
      }),
    ),
  );

  /* sendQuotationPart1 = createEffect(
    () =>
      this.actions$.pipe(
        ofType(listQuotesActions.SEND_QUOTATION_PART_1),
        withLatestFrom(
          this.store.select(clientCatalogsSelectors.selectCatTipoPartidaCotizacion),
          this.store.select(quotationDetailsSelectors.selectedQuotation),
          this.store.select(quotationDetailsSelectors.selectLinkedQuote),
        ),
        mergeMap(([action, catTipoPartidaCotizacion, singleQuotation, linkedQuote]) => {
          const {activeChangeQuotationState, sendEmailData, comments} = action;
          const type: apiCatalogs.CatTipoPartidaCotizacion = find(
            catTipoPartidaCotizacion,
            (o) => o.TipoPartidaCotizacion === ITEM_QUOTATION_TYPE_ORIGINAL,
          );
          const sendQuotationObj: ISendQuotation = {
            file: {} as apiCatalogs.Archivo,
            fileSendEmail: {} as apiCatalogs.ArchivoCorreoEnviado,
            sendEmailData,
            type,
            activeChangeQuotationState,
            comments,
            quotation: singleQuotation,
            isSearchingFile: false,
            isFileFound: false,
          };
          this.store.dispatch(SET_LOADING({payload: true}));
          const parameters: apiCatalogs.ArchivoExportarPDFParameter = {} as apiCatalogs.ArchivoExportarPDFParameter;
          parameters.TipoDocumento = TYPE_OF_DOCUMENT_TO_GENERATE_PDF;
          parameters.Parametros = {
            IdCotCotizacion: singleQuotation.IdCotCotizacion,
            IdCatTipoPartidaCotizacion: type.IdCatTipoPartidaCotizacion,
          };
          parameters.DestinoMinIO = {
            Bucket: BUCKET_QUOTES,
            Key: `${singleQuotation.IdCliente}/${singleQuotation.IdCotCotizacion}/Cotizacion_${singleQuotation.Folio}.pdf`,
          };
          return this.sistemaArchivosPDFsService.ArchivoExportarPDFsExportarPDF(parameters).pipe(
            map((response: apiCatalogs.Archivo) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al generar el PDF',
                ),
                response,
              );
              return {...sendQuotationObj, file: response};
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al generar PDF la cotización.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(listQuotesActions.SEND_QUOTATION_FAILED());
              return EMPTY;
            }),
          );
        }),
        switchMap((sendQuotationObj: ISendQuotation) => {
          return this.sistemaArchivoService.ArchivoObtener(sendQuotationObj.file.IdArchivo).pipe(
            map((response: apiCatalogs.Archivo) => {
              this.store.dispatch(
                listQuotesActions.SEND_QUOTATION_PART_2({
                  sendQuotationObj: {
                    ...sendQuotationObj,
                    file: response,
                    isFileFound: response.Sincronizado,
                    isSearchingFile: !response.Sincronizado,
                  },
                }),
              );

              return {
                ...sendQuotationObj,
                file: response,
                isFileFound: response.Sincronizado,
                isSearchingFile: !response.Sincronizado,
              };
            }),
            /!*repeatWhen((completed) => {
                return completed.pipe(delay(TIMER_SCHEDULE));
              }),
              map((response: apiCatalogs.Archivo) => ({
                ...sendQuotationObj,
                file: response,
                isFileFound: response.Sincronizado,
                isSearchingFile: !response.Sincronizado,
              })),
              takeWhile((data: ISendQuotation, counter: number = 0) => {
                if (counter < 6) {
                  if (data.file.Sincronizado) {
                    this.store.dispatch(
                      listQuotesActions.SEND_QUOTATION_PART_2({
                        sendQuotationObj,
                      }),
                    );
                    return false;
                  } else {
                    return true;
                  }
                } else {
                  this.store.dispatch(SET_LOADING({payload: false}));
                  this.store.dispatch(
                    listQuotesActions.GET_PROCESS_SYSTEM({
                      id: data.file.IdProcesoSistema,
                    }),
                  );
                  return false;
                }
              }),*!/
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al generar PDF la cotización.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(listQuotesActions.SEND_QUOTATION_FAILED());
              return EMPTY;
            }),
          );
        }),
      ),
    {dispatch: false},
  );*/
  sendQuotationPart1 = createEffect(
    () =>
      this.actions$.pipe(
        ofType(listQuotesActions.SEND_QUOTATION_PART_1),
        withLatestFrom(
          this.store.select(clientCatalogsSelectors.selectCatTipoPartidaCotizacion),
          this.store.select(quotationDetailsSelectors.selectedQuotation),
          this.store.select(quotationDetailsSelectors.selectLinkedQuote),
        ),
        mergeMap(([action, catTipoPartidaCotizacion, singleQuotation, linkedQuote]) => {
          return EMPTY;
          const {activeChangeQuotationState, sendEmailData, comments} = action;
          const type: apiCatalogs.CatTipoPartidaCotizacion = find(
            catTipoPartidaCotizacion,
            (o) => o.TipoPartidaCotizacion === ITEM_QUOTATION_TYPE_ORIGINAL,
          );
          const sendQuotationObj: ISendQuotation = {
            file: {} as apiCatalogs.Archivo,
            fileSendEmail: {} as apiCatalogs.ArchivoCorreoEnviado,
            sendEmailData,
            type,
            activeChangeQuotationState,
            comments,
            quotation: singleQuotation,
            isSearchingFile: false,
            isFileFound: false,
          };
          this.store.dispatch(SET_LOADING({payload: true}));
          /* this.store.dispatch(
            listQuotesActions.SEND_QUOTATION_PART_2({
              sendQuotationObj: {
                ...sendQuotationObj,
                file: response,
                isFileFound: response.Sincronizado,
                isSearchingFile: !response.Sincronizado,
              },
            })*/

          return of(RETURN_EMPTY);
        }),
      ),
    {dispatch: false},
  );

  getProcessSystem = createEffect(() =>
    this.actions$.pipe(
      ofType(listQuotesActions.GET_PROCESS_SYSTEM),
      mergeMap(({id}) => {
        if (id) {
          return this.sistemaServiciosSistemaService.ProcesoSistemaObtener(id).pipe(
            map((response) => {
              const errorMessage = !response.Etiqueta
                ? 'Ocurrió un error en el Servicio web'
                : response.Etiqueta;
              return SET_LOADING_ERROR({
                active: true,
                message: errorMessage,
              });
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  // // DOCS: OBTIENE PARTIDAS VINCULADAS

  // itemsLinked$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(listQuotesActions.SET_ITEM_LINKED),
  //       withLatestFrom(
  //         this.store.select(quotationDetailsSelectors.selectIdClient),
  //         this.store.select(quotationDetailsSelectors.selectGeneralData),
  //       ),
  //       mergeMap(([action, client, generalData]) => {
  //         const params = new FiltersOnlyActive();
  //         params.Filters.push(
  //           {
  //             NombreFiltro: 'IdCliente',
  //             ValorFiltro: client,
  //           },
  //           {
  //             NombreFiltro: 'IdProducto',
  //             ValorFiltro: action.item.IdProducto,
  //           },
  //           {
  //             NombreFiltro: 'Caducada',
  //             ValorFiltro: false,
  //           },
  //           {
  //             NombreFiltro: 'NoIdCotCotizacion',
  //             ValorFiltro: generalData.idQuotation,
  //           },
  //         );
  //         if (action.item.needsToReloadLinkeds) {
  //           return this.procesosCotizacionService
  //             .vCotCotizacionQueryResult(params)
  //             .pipe(
  //               map((response) => {
  //                 this.logger.debug(
  //                   servicesLogger.generateMessage(
  //                     FILE_NAME,
  //                     servicesLogger.LOG_SUCCEEDED,
  //                     'Al obtener las información extra de la cotización.',
  //                   ),
  //                   response,
  //                 );
  //                 if (response.TotalResults === 1) {
  //                   this.store.dispatch(
  //                     listQuotesActions.UPDATE_LIST_PRODUCTS({
  //                       IdProducto: action.item.IdProducto,
  //                       linkedQuotes: response.Results,
  //                     }),
  //                   );
  //                   this.store.dispatch(
  //                     listQuotesActions.SET_ID_ARCHIVO_PDF({
  //                       IdArchivo: response.Results[0].IdArchivoPDF,
  //                     }),
  //                   );
  //                 } else {
  //                   this.store.dispatch(
  //                     listQuotesActions.UPDATE_LIST_PRODUCTS({
  //                       IdProducto: action.item.IdProducto,
  //                       linkedQuotes: response.Results,
  //                     }),
  //                   );
  //                 }
  //               }),
  //               catchError((error) => {
  //                 this.logger.debug(
  //                   servicesLogger.generateMessage(
  //                     FILE_NAME,
  //                     servicesLogger.LOG_FAILED,
  //                     'Al obtener las información extra de la cotización.',
  //                   ),
  //                   error,
  //                 );
  //                 return EMPTY;
  //               }),
  //             );
  //         } else {
  //           this.store.dispatch(
  //             listQuotesActions.UPDATE_LIST_PRODUCTS({
  //               IdProducto: action.item.IdProducto,
  //               linkedQuotes: [],
  //             }),
  //           );
  //           return EMPTY;
  //         }
  //       }),
  //     ),
  //   {dispatch: false},
  // );

  // DOCS: Descarga el archivo vinculado seleccionado
  getIDArchivoDetalle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(listQuotesActions.SET_ID_ARCHIVO_PDF),
        mergeMap((action) => {
          this.store.dispatch(listQuotesActions.VIEW_FILE_IS_LOADING({value: true}));
          if (action) {
            return this.sistemaArchivosService
              .ArchivoExtensionsObtenerDetalle(action.IdArchivo)
              .pipe(
                map((response) => {
                  const splits = response.FileKey.split('.');
                  const ext = splits[splits.length - 1];
                  this.store.dispatch(
                    listQuotesActions.VIEW_FILE_LOAD({
                      IdArchivo: response.IdArchivo,
                      ext,
                    }),
                  );
                }),
              );
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  // DOCS: VER EL ARCHIVO
  viewFileRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(listQuotesActions.VIEW_FILE_LOAD),
        mergeMap((action) => {
          this.store.dispatch(listQuotesActions.VIEW_FILE_IS_LOADING({value: true}));
          return this.sistemaArchivosService.ArchivoExtensionsObtenerDetalle(action.IdArchivo).pipe(
            map(async (response) => {
              let base64 = null;
              if (response && response.Url) {
                if (action.ext === 'pdf' || action.ext === 'tml') {
                  base64 = await convertPDFFileFromURLToBase64(response.Url);
                } else if (
                  action.ext === 'jpg' ||
                  action.ext === 'jpeg' ||
                  action.ext === 'png' ||
                  action.ext === 'svg'
                ) {
                  base64 = await getBase64FromUrl(response.Url, action.ext);
                }
              }
              this.store.dispatch(
                listQuotesActions.VIEW_FILE_SUCCESS({
                  fileBase64: base64,
                }),
              );
              this.store.dispatch(listQuotesActions.VIEW_FILE_IS_LOADING({value: false}));
            }),
            catchError((error) => {
              return EMPTY;
            }),
          );
        }),
      ),
    {dispatch: false},
  );
}
