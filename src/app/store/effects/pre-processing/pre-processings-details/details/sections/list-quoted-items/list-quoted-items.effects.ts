import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {NGXLogger} from 'ngx-logger';

// Models
import {SistemaUsuariosAccessosService} from 'api-catalogos';
import {ProcesosL04PretramitarPedidoService} from 'api-logistica';

// Actions
import {quotedItemActions} from '@appActions/pre-processing';
import {SET_LOADING} from '@appActions/utils/utils.action';

// Selectors
// Utils
import * as servicesLogger from '@appUtil/logger';

const FILE_NAME = 'list-list-quoted-items.effects.ts';

@Injectable()
export class ListQuotedItemsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private usuariosAccesosService: SistemaUsuariosAccessosService,
    private pretramitarPedidoServices: ProcesosL04PretramitarPedidoService,
  ) {}

  //DOCS: OBTENER CODIGO DE VERIFICACIÓN
  //TODO: EFECTOS DEL CODIGO DE VERIFICACIÓN, ACTUALMENTE NO ES REQUERIDO

  // generateVerificationCode = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(quotedItemActions.GENERATE_VERIFICATION_CODE_LOAD),
  //     withLatestFrom(
  //       this.store.select(authSelectors.selectUser),
  //       this.store.select(preProcessOrderDetailsSelectors.selectPurchaseOrderItem),
  //     ),
  //     mergeMap(([action, user$, selectedOrder$]) => {
  //       this.store.dispatch(SET_LOADING({payload: true}));
  //       const params: SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionPretramitarPedidoParams = {
  //         idUsuarioSolicitaAutorizacion: user$.id,
  //         idUsuarioAprueba: user$.id,
  //         idPPPedido: selectedOrder$.IdPPPedido,
  //       };
  //       return this.usuariosAccesosService
  //         .SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionPretramitarPedido(
  //           params,
  //         )
  //         .pipe(
  //           map((response: SolicitudAutorizacionCambio) => {
  //             this.logger.debug(
  //               servicesLogger.generateMessage(
  //                 FILE_NAME,
  //                 servicesLogger.LOG_SUCCEEDED,
  //                 'Exito al obtener el código de verificación.',
  //               ),
  //               response,
  //             );
  //             this.store.dispatch(
  //               quotedItemActions.GENERATE_VERIFICATION_CODE_SUCCESS({
  //                 codeRequest: response,
  //               }),
  //             );
  //             return response;
  //           }),
  //           catchError((error) => {
  //             this.logger.debug(
  //               servicesLogger.generateMessage(
  //                 FILE_NAME,
  //                 servicesLogger.LOG_FAILED,
  //                 'Error al obtener el código de verificación.',
  //               ),
  //               error,
  //             );
  //             this.store.dispatch(quotedItemActions.GENERATE_VERIFICATION_CODE_FAILED());
  //             this.store.dispatch(SET_LOADING({payload: false}));
  //             return EMPTY;
  //           }),
  //         );
  //     }),
  //     withLatestFrom(this.store.select(preProcessOrderDetailsSelectors.selectPurchaseOrderItem)),
  //     switchMap(([request$, selectedOrder$]) => {
  //       const order = {
  //         ...selectedOrder$,
  //         IdSolicitudAutorizacionCambio: request$.IdSolicitudAutorizacionCambio,
  //       };
  //       return this.pretramitarPedidoServices.ppPedidoGuardarOActualizar(order).pipe(
  //         map((response: string) => {
  //           this.logger.debug(
  //             servicesLogger.generateMessage(
  //               FILE_NAME,
  //               servicesLogger.LOG_SUCCEEDED,
  //               'al asociar el codigo de verificación a la orden de compra.',
  //             ),
  //             response,
  //           );
  //           this.store.dispatch(
  //             preProcessDetailsActions.UPDATE_PURCHASE_ORDER_CODE_REQUEST({
  //               item: {...order},
  //             }),
  //           );
  //           return SET_LOADING({payload: false});
  //         }),
  //         catchError((error) => {
  //           this.logger.debug(
  //             servicesLogger.generateMessage(
  //               FILE_NAME,
  //               servicesLogger.LOG_FAILED,
  //               'al asociar el codigo de verificación a la orden de compra.',
  //             ),
  //             error,
  //           );
  //           this.store.dispatch(preProcessDetailsActions.PROCESS_ENTRIES_FAILED());
  //           this.store.dispatch(SET_LOADING({payload: false}));
  //           return EMPTY;
  //         }),
  //       );
  //     }),
  //   ),
  // );

  //DOCS: VALIDAR CODIGO DE AUTORIZACIÓN
  //TODO: EFECTOS DEL CODIGO DE VERIFICACIÓN, ACTUALMENTE NO ES REQUERIDO
  // compareVerificationCode = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(quotedItemActions.COMPARE_VERIFICATION_CODE_LOAD),
  //     withLatestFrom(
  //       this.store.select(preProcessOrderDetailsSelectors.selectCode),
  //       this.store.select(preProcessOrderDetailsSelectors.selectCodeRequest),
  //     ),
  //     mergeMap(([action, code$, codeReques$]) => {
  //       const params: SolicitudAutorizacionCambioExtensionsValidarCodigoAccesoParams = {
  //         idSolicitudAutorizacionCambio: codeReques$.IdSolicitudAutorizacionCambio,
  //         codigoAcceso: `${code$[0]}${code$[1]}${code$[2]}${code$[3]}`,
  //       };
  //       return this.usuariosAccesosService
  //         .SolicitudAutorizacionCambioExtensionsValidarCodigoAcceso(params)
  //         .pipe(
  //           map((response: boolean) => {
  //             this.logger.debug(
  //               servicesLogger.generateMessage(
  //                 FILE_NAME,
  //                 servicesLogger.LOG_SUCCEEDED,
  //                 'Exito al validar codigo de autorización.',
  //               ),
  //               response,
  //             );
  //             if (response) {
  //               const codeRequest: SolicitudAutorizacionCambio = {
  //                 ...codeReques$,
  //                 Autorizado: response,
  //               };
  //               return quotedItemActions.SET_AUTHORIZED_VERIFICATION_CODE_LOAD({
  //                 codeRequest,
  //               });
  //             } else {
  //               // Accion para disparar el shake
  //               this.store.dispatch(preProcessDetailsActions.SET_SHAKED({value: true}));
  //               setTimeout(() => {
  //                 this.store.dispatch(preProcessDetailsActions.SET_SHAKED({value: false}));
  //                 this.store.dispatch(preProcessDetailsActions.RESTORE_CODE_VALUE());
  //               }, 1500);
  //
  //               return quotedItemActions.COMPARE_VERIFICATION_CODE_FAILED();
  //             }
  //           }),
  //           catchError((error) => {
  //             this.logger.debug(
  //               servicesLogger.generateMessage(
  //                 FILE_NAME,
  //                 servicesLogger.LOG_FAILED,
  //                 'Error al validar codigo de autorización.',
  //               ),
  //               error,
  //             );
  //             this.store.dispatch(SET_LOADING({payload: false}));
  //             return of(quotedItemActions.COMPARE_VERIFICATION_CODE_FAILED());
  //           }),
  //         );
  //     }),
  //   ),
  // );

  //DOCS: ACTUALIZAR LA SOLICITUD A VALIDA
  setCodeIsValid = createEffect(() =>
    this.actions$.pipe(
      ofType(quotedItemActions.SET_AUTHORIZED_VERIFICATION_CODE_LOAD),
      mergeMap(({codeRequest}) => {
        return this.usuariosAccesosService
          .SolicitudAutorizacionCambioGuardarOActualizar(codeRequest)
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Exito al actualizar la solicitud a validada.',
                ),
                response,
              );
              return quotedItemActions.GENERATE_VERIFICATION_CODE_SUCCESS({
                codeRequest,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Error al actualizar la solicitud a validada.',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(quotedItemActions.COMPARE_VERIFICATION_CODE_FAILED());
            }),
          );
      }),
    ),
  );
}
