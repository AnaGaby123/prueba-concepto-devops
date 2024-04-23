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

/* Services Imports */
import * as apiCatalogs from 'api-catalogos';
import {CorreoEnviado, ProcesoSistema} from 'api-catalogos';
import {
  ArchivoDetalle,
  ProcesosL01CotizacionArchivoService,
  ProcesosL01CotizacionCorreosService,
} from 'api-logistica';

/* Models Imports */
import {AppState} from '@appCore/core.state';
import {
  ENUM_TYPE_QUOTATION,
  IGMCotCotizacionDetalle,
} from '@appModels/store/quotation/quotation-details/quotation-details.models';
/* Actions Imports */
import {totalQuotePdfActions} from '@appActions/quotation';
import * as utilsActions from '@appActions/utils/utils.action';
import {RETURN_EMPTY, SET_LOADING, SET_LOADING_ERROR} from '@appActions/utils/utils.action';
/* Selectors Imports */
import * as clientCatalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {selectCatTipoPartidaCotizacion} from '@appSelectors/catalogs/catalogs.selectors';

/* Tools Imports */
/* Dev Tools */
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {convertPDFFileFromURLToBase64} from '@appUtil/files';
import {appRoutes} from '@appHelpers/core/app-routes';
import {quotationDetailsSelectors, totalQuotePdfSelectors} from '@appSelectors/quotation';
import {
  BUCKET_QUOTES,
  DEFAULT_DATE,
  DEFAULT_UUID,
  ITEM_QUOTATION_TYPE_ORIGINAL,
  TIMER_SCHEDULE,
  TYPE_OF_DOCUMENT_TO_GENERATE_PDF,
} from '@appUtil/common.protocols';
import {find, join} from 'lodash-es';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material/dialog';
import {IDataMail, IMailDialogData} from '@appModels/correo/correo';
import {selectOptionsContactEmail} from '@appSelectors/quotation/quotation-details/quotation-details.selectors';
import {SET_STATUS_CONTACTS_CANCEL} from '@appActions/quotation/quotation-details/quotation-details.actions';

import {
  builSendQuotationBody,
  CatQuotationState,
} from '@appHelpers/pending/quotation/quotation.helpers';
import {SendEmailDialogComponent} from '@appComponents/shared/send-email-dialog/send-email-dialog.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';

const FILE_NAME = 'total-quote-pdf.effects.ts';

@Injectable()
export class TotalQuotePdfEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private logger: NGXLogger,
    private sistemaArchivosPDFsService: apiCatalogs.SistemaArchivosPDFsService,
    private sistemaArchivoService: apiCatalogs.SistemaArchivosService,
    private sistemaServiciosSistemaService: apiCatalogs.SistemaServiciosSistemaService,
    private proccesses01AddressQuotationService: ProcesosL01CotizacionCorreosService,
    private procesosL01CotizacionArchivoService: ProcesosL01CotizacionArchivoService,
    private translateService: TranslateService,
    private dialog: MatDialog,
  ) {}

  //DOCS: NAVEGAR A LA VISTA PARA VISUALIZAR EL ARCHIVO PDF
  navigate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(totalQuotePdfActions.NAVIGATE_TO_PDF_OF_SELECTED_QUOTATION_INIT_EFFECT),
      withLatestFrom(this.store.select(totalQuotePdfSelectors.selectQuotationPdf)),
      map(([{navigate}, quotation]) => {
        if (navigate) {
          this.router.navigate([
            appRoutes.protected,
            appRoutes.pendings.pendings,
            appRoutes.quoter.quoter,
            appRoutes.quoter.details,
            appRoutes.quoter.totalQuotePdf,
          ]);
        }
        this.store.dispatch(totalQuotePdfActions.GENERATE_PDF_LOAD());
        if (quotation.IdArchivoPDF === null) {
          return totalQuotePdfActions.GENERATE_QUOTATION_PDF();
        }
        return totalQuotePdfActions.DOWNLOAD_QUOTATION_PDF({IdFilePdf: quotation.IdArchivoPDF});
      }),
    ),
  );

  //DOCS: GENERAR EL ARCHIVO PDF A PARTIR DE UNA COTIZACIÓN CON ESTATUS GUARDADA
  generatePdf$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(totalQuotePdfActions.GENERATE_QUOTATION_PDF),
        withLatestFrom(
          this.store.select(selectCatTipoPartidaCotizacion),
          this.store.select(quotationDetailsSelectors.selectedQuotation),
        ),
        mergeMap(([action, catTipoPartidaCotizacion, quotation]) => {
          const type: apiCatalogs.CatTipoPartidaCotizacion = find(
            catTipoPartidaCotizacion,
            (o) => o.TipoPartidaCotizacion === ITEM_QUOTATION_TYPE_ORIGINAL,
          );
          const parameters: apiCatalogs.ArchivoExportarPDFParameter = {} as apiCatalogs.ArchivoExportarPDFParameter;
          parameters.TipoDocumento = TYPE_OF_DOCUMENT_TO_GENERATE_PDF;
          parameters.Parametros = {
            IdCotCotizacion: quotation.IdCotCotizacion,
            IdCatTipoPartidaCotizacion: type.IdCatTipoPartidaCotizacion,
            original: 'true',
          };
          parameters.DestinoMinIO = {
            Bucket: BUCKET_QUOTES,
            Key: `${quotation.IdCliente}/${quotation.IdCotCotizacion}/Cotizacion_${quotation.Folio}.pdf`,
          };
          return this.sistemaArchivosPDFsService.ArchivoExportarPDFsExportarPDF(parameters).pipe(
            map((response: apiCatalogs.Archivo) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al generar PDF de la cotización',
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
                  'Al generar PDF de la cotización.',
                ),
                error,
              );
              this.store.dispatch(totalQuotePdfActions.GENERATE_PDF_FAILED());
              return EMPTY;
            }),
          );
        }),
        switchMap((response: apiCatalogs.Archivo) => {
          return this.sistemaArchivoService.ArchivoObtener(response.IdArchivo).pipe(
            repeatWhen((completed) => completed.pipe(delay(TIMER_SCHEDULE))),
            map((response) => response),
            takeWhile((file, counter: number = 0) => {
              if (counter < 6) {
                if (file.Sincronizado) {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'Obtener Sincronización del archivo',
                    ),
                    file,
                  );
                  this.store.dispatch(
                    totalQuotePdfActions.DOWNLOAD_QUOTATION_PDF({IdFilePdf: file.IdArchivo}),
                  );
                  return false;
                } else {
                  return true;
                }
              } else {
                // TODO: Se terminó el tiempo para recuperar el archivo
                this.store.dispatch(
                  totalQuotePdfActions.GET_PROCESS_SYSTEM({id: file.IdProcesoSistema}),
                );
                this.store.dispatch(totalQuotePdfActions.GENERATE_PDF_FAILED());
                return false;
              }
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Obtener Sincronización del archivo.',
                ),
                error,
              );
              this.store.dispatch(totalQuotePdfActions.DOWNLOAD_QUOTATION_FAILED_PDF());
              return EMPTY;
            }),
          );
        }),
      ),
    {dispatch: false},
  );
  //DOCS: DESCARGAR EL ARCHIVO PDF DE LA COTIZACIÓN
  getDownloadFilePdf$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(totalQuotePdfActions.DOWNLOAD_QUOTATION_PDF),
        mergeMap(({IdFilePdf}) => {
          return this.sistemaArchivoService.ArchivoExtensionsObtenerDetalle(IdFilePdf).pipe(
            map(async (response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener la URL del PDF',
                ),
              );
              let base64: string;
              if (response && response.Url) {
                base64 = await convertPDFFileFromURLToBase64(response.Url, true);
              }
              this.store.dispatch(totalQuotePdfActions.FETCH_FILE_PDF_SUCCESS({base64}));
              return EMPTY;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la URL del PDF',
                ),
                error,
              );
              this.store.dispatch(totalQuotePdfActions.GENERATE_PDF_FAILED());
              return EMPTY;
            }),
          );
        }),
      ),
    {dispatch: false},
  );
  //DOCS: GENERAR EL ARCHIVO PDF A PARTIR DE UNA COTIZACIÓN CON ESTATUS GUARDADA
  downloadInvestigationFile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(totalQuotePdfActions.DOWNLOAD_QUOTATION_PDF),
        withLatestFrom(
          this.store.select(quotationDetailsSelectors.selectedQuotationDetails),
          this.store.select(quotationDetailsSelectors.selectValidationInvestigation),
          this.store.select(quotationDetailsSelectors.selectedOptionSwitchList),
        ),
        mergeMap(
          ([
            action,
            {CotPartidasInvetigacionCotizacion, CotCotizacion, InvestigacionesFinalizadas},
            validationInvestigationFinish,
            typeQuotationSelected,
          ]) => {
            if (
              !CotPartidasInvetigacionCotizacion.length ||
              typeQuotationSelected?.labelKey === ENUM_TYPE_QUOTATION.TOTAL
            ) {
              return EMPTY;
            }
            this.store.dispatch(totalQuotePdfActions.FETCH_FILE_PDF_INVESTIGATION_LOAD());
            return this.procesosL01CotizacionArchivoService
              .cotCotizacionInvestigacionPDFCotCotizacionInvestigacionPDF(
                CotCotizacion?.IdCotCotizacion,
              )
              .pipe(
                map(async (response: ArchivoDetalle) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'Al obtener la URL del PDF de investigacion',
                    ),
                  );
                  let base64: string;
                  if (response && response.Url) {
                    base64 = await convertPDFFileFromURLToBase64(response.Url, true);
                  }
                  this.store.dispatch(
                    totalQuotePdfActions.FETCH_FILE_PDF_INVESTIGATION_SUCCESS({base64}),
                  );
                  return EMPTY;
                }),
                catchError((error) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_FAILED,
                      'Al obtener la URL del PDF de investigacion',
                    ),
                    error,
                  );
                  this.store.dispatch(totalQuotePdfActions.FETCH_FILE_PDF_INVESTIGATION_FAILED());
                  return EMPTY;
                }),
              );
          },
        ),
      ),
    {dispatch: false},
  );
  /* DOCS: Envia o reenvia la cotización con transaccion*/
  sendQuotation = createEffect(() =>
    this.actions$.pipe(
      ofType(totalQuotePdfActions.RESEND_QUOTATION_LOAD),
      withLatestFrom(
        this.store.select(clientCatalogsSelectors.selectCatTipoPartidaCotizacion),
        this.store.select(totalQuotePdfSelectors.selectQuotationPdf),
      ),
      mergeMap(([{sendEmailData, comments}, typesQuotation, quotation]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.proccesses01AddressQuotationService
          .cotCotizacionCorreoEnviadoEnvioCorreoCotizacionTransaccion(
            builSendQuotationBody(
              typesQuotation,
              quotation.IdCotCotizacion,
              comments,
              sendEmailData,
            ),
          )
          .pipe(
            map((response: IGMCotCotizacionDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  `Al reenviar  una cotización por correo`,
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                utilsActions.SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Haz reenviado una cotización',
                }),
              );
              this.store.dispatch(totalQuotePdfActions.RETURN_VIEW());
              return RETURN_EMPTY();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  `Al reenviar una cotización por correo`,
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(totalQuotePdfActions.RESEND_QUOTATION_FAILED());
            }),
          );
      }),
    ),
  );
  getProcessSystem = createEffect(() =>
    this.actions$.pipe(
      ofType(totalQuotePdfActions.GET_PROCESS_SYSTEM),
      mergeMap(({id}) => {
        if (id) {
          return this.sistemaServiciosSistemaService.ProcesoSistemaObtener(id).pipe(
            map((response: ProcesoSistema) => {
              const errorMessage = response?.Etiqueta
                ? response.Etiqueta
                : 'Ocurrió un error en el Servicio web';
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

  returnView$ = createEffect(() =>
    this.actions$.pipe(
      ofType(totalQuotePdfActions.RETURN_VIEW),
      withLatestFrom(
        this.store.select(quotationDetailsSelectors.selectedQuotation),
        this.store.select(quotationDetailsSelectors.selectedQuotationStatus),
      ),
      map(([action, quotation, {EstadoCotizacion}]) => {
        this.router.navigate([
          appRoutes.protected,
          appRoutes.pendings.pendings,
          appRoutes.quoter.quoter,
          appRoutes.quoter.details,
          appRoutes.quoter.main,
          EstadoCotizacion === CatQuotationState.Enviada ||
          quotation.CotizacionDeInvestigacion ||
          quotation.EnviadaConInvestigacion
            ? appRoutes.quoter.sent
            : appRoutes.quoter.notSent,
        ]);

        return RETURN_EMPTY();
      }),
    ),
  );

  // DOCS: MUESTRA EL DIALOG PARA ENVIAR CORREO PARA CONFIRMACIÓN DE PEDIDO
  showSendEmailDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(totalQuotePdfActions.SHOW_EMAIL_DIALOG),
        withLatestFrom(
          this.store.select(selectOptionsContactEmail),
          this.store.select(totalQuotePdfSelectors.selectQuotationPdf),
          this.store.select(quotationDetailsSelectors.selectEmailForDialog),
        ),
        mergeMap(([action, contacts, quotation, mailList]) => {
          const data: IMailDialogData = {
            contacts,
            isEditAddressEmail: true,
            mailList,
            titleHeader: this.translateService.instant('common.resendQuotation'),
            subject: `${this.translateService.instant('common.quotation')} ${quotation?.Folio}`,
            hasMultipleComments: true,
            notesOptional: true,
          };

          const dialogRef = this.dialog.open(SendEmailDialogComponent, buildDialogConfig(data));

          dialogRef.afterClosed().subscribe((data: IDataMail) => {
            if (data?.activeSend) {
              const sendEmailData: CorreoEnviado = {
                IdCorreoEnviado: DEFAULT_UUID,
                ReceptoresCSV: data.to[0] as string,
                ConCopiaCSV: join(data.carbonCopy, ','),
                Asunto: data.subject,
                FechaRegistro: DEFAULT_DATE,
                FechaUltimaActualizacion: DEFAULT_UUID,
                Activo: true,
              };
              this.store.dispatch(
                totalQuotePdfActions.RESEND_QUOTATION_LOAD({
                  sendEmailData,
                  comments: data.additionalComments,
                }),
              );
            } else {
              this.store.dispatch(SET_STATUS_CONTACTS_CANCEL());
            }
          });

          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
