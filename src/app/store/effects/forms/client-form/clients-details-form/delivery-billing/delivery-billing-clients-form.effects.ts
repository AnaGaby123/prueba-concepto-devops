// Core imports
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {NGXLogger} from 'ngx-logger';
import {EMPTY, forkJoin, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';

// Models
import * as api from 'api-catalogos';
import {DatosFacturacionClienteDetalle} from 'api-catalogos';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
// Selectors
import {
  selectCatMonedaFacturationDropDropDown,
  selectCatPaisForDropDownList,
  selectListMercantileSocietyForDropDown,
  selectListRegimenFiscalForDropDown,
  selectListThemesCommentsForDropDown,
  selectvCatAddressTypeForDropDown,
  selectvCatRutasEntregaForDropDownList,
  selectvCatZonaForDropDownList,
  selectvEmpresasForDropDown,
} from '@appSelectors/catalogs/catalogs.selectors';
import {
  clientDeliveryBillingSelectors,
  clientsDetailsSelectors,
} from '@appSelectors/forms/clients-form';
// Actions
import * as clientsActions from '@appActions/forms/client-form/clients-form.actions';
import {
  GET_CAT_THEMES_COMMENTS_SUCCESS,
  GET_CATALOGS_FACTURATION,
} from '@appActions/catalogs/catalogos.actions';
import {deliveryBillingActions} from '@appActions/forms/client-form';
// Utils
import * as servicesLogger from '@appUtil/logger';
import {LOG_FAILED, LOG_SUCCEEDED} from '@appUtil/logger';
import {
  dataToDropTypeAddress,
  FacturationDataClientRestructuration,
} from '@appHelpers/catalogs/clients/deliveryBilling';
import {isEmpty, map as _map} from 'lodash-es';
import {DEFAULT_UUID} from '@appUtil/common.protocols';
import {extractID} from '@appUtil/util';

const FILE_NAME = 'delivery-billing-clients-form.effects.ts';

@Injectable()
export class DeliveryBillingClientsFormEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private configuracionClientesRelacionesService: api.ConfiguracionClientesRelacionesService,
    private configuracionClientesConfiguracionService: api.ConfiguracionClientesConfiguracionService,
    private configuracionClientesDireccionesService: api.ConfiguracionClientesDireccionesService,
    private configuracionClientesService: api.ConfiguracionClientesService,
    private configuracionDireccionesService: api.ConfiguracionDireccionesService,
  ) {}

  // DOCS se obtienen los datos de la seccion de cobros del cliente
  getDataDeliveryBilling = createEffect(() =>
    this.actions$.pipe(
      ofType(
        GET_CATALOGS_FACTURATION,
        GET_CAT_THEMES_COMMENTS_SUCCESS,
        deliveryBillingActions.SET_SAVE_BILLING_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(clientsDetailsSelectors.selectedClient),
        this.store.select(selectListMercantileSocietyForDropDown),
        this.store.select(selectListRegimenFiscalForDropDown),
        this.store.select(selectvCatAddressTypeForDropDown),
        this.store.select(selectCatMonedaFacturationDropDropDown),
        this.store.select(selectvEmpresasForDropDown),
        this.store.select(selectListThemesCommentsForDropDown),
        this.store.select(selectCatPaisForDropDownList),
        this.store.select(selectvCatRutasEntregaForDropDownList),
        this.store.select(selectvCatZonaForDropDownList),
      ),
      mergeMap(
        ([
          action,
          client,
          mercantileSociety,
          taxRegime,
          typeAddress,
          currency,
          enterprise,
          themes,
          country,
          regionType,
          region,
        ]) => {
          this.store.dispatch(SET_LOADING({payload: true}));
          return this.configuracionClientesConfiguracionService
            .DatosFacturacionClienteDetalleObtener(client?.IdCliente)
            .pipe(
              map((response: DatosFacturacionClienteDetalle) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al obtener los datos de cobro del cliente',
                  ),
                  response,
                );
                return deliveryBillingActions.SET_SUCCESS_DELIVERY_BILLING_CLIENT({
                  payload: FacturationDataClientRestructuration(
                    response,
                    mercantileSociety,
                    taxRegime,
                    typeAddress,
                    currency,
                    enterprise,
                    themes,
                    country,
                    regionType,
                    region,
                  ),
                  typeAddress: dataToDropTypeAddress(typeAddress),
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener los datos de facturacion del cliente',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return of<any>(deliveryBillingActions.SET_FAILED_DELIVERY_BILLING_CLIENT());
              }),
            );
        },
      ),
    ),
  );

  // Correos CFDI
  getEmailsCreditBilling = createEffect(() =>
    this.actions$.pipe(
      ofType(deliveryBillingActions.SET_SUCCESS_DELIVERY_BILLING_CLIENT),
      withLatestFrom(this.store.select(clientDeliveryBillingSelectors.selectBilling)),
      mergeMap(([action, billing]) => {
        const body = new FiltersOnlyActive();
        body.Filters.push({
          NombreFiltro: 'IdDatosFacturacionCliente',
          ValorFiltro: billing.IdDatosFacturacionCliente,
        });
        return this.configuracionClientesConfiguracionService
          .CorreoValidacionFacturacionClienteQueryResult(body)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener los correo cfdi del cliente',
                ),
                response,
              );
              this.store.dispatch(SET_LOADING({payload: false}));

              return deliveryBillingActions.GET_EMAIL_FACTURATION_SUCCESS({
                payload: response.Results,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener los correo cfdi del cliente',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of<any>(deliveryBillingActions.GET_EMAIL_FACTURATION_ERROR());
            }),
          );
      }),
    ),
  );

  // DOCS: Validación de RFC
  checkRFC$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deliveryBillingActions.SET_CHECK_RFC_LOAD),
      withLatestFrom(this.store.select(clientDeliveryBillingSelectors.selectBilling)),
      mergeMap(([action, billing]) => {
        const rfc = billing.RFC;
        if (isEmpty(rfc)) {
          this.store.dispatch(deliveryBillingActions.SET_RFC_VALIDATION({value: false}));
        } else {
          return this.configuracionClientesService.ClienteExtensionsValidaRFC(rfc).pipe(
            map((response: boolean) => {
              this.logger.debug(servicesLogger.generateMessage(FILE_NAME, 'Al Validar RFC'), rfc);
              return deliveryBillingActions.SET_RFC_VALIDATION({
                value: response,
              });
            }),
            catchError((error) => {
              return of(deliveryBillingActions.SET_RFC_VALIDATION({value: false}));
            }),
          );
        }
        return EMPTY;
      }),
    ),
  );

  // DOCS se guarda o edita la direccion
  saveOrEditAddress = createEffect(() =>
    this.actions$.pipe(
      ofType(deliveryBillingActions.SET_SAVE_BILLING_LOAD),
      withLatestFrom(
        this.store.select(clientDeliveryBillingSelectors.selectClientAddressData),
        this.store.select(clientDeliveryBillingSelectors.hasValidAddress),
      ),
      mergeMap(([action, address, validAddress]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        if (validAddress) {
          return this.configuracionDireccionesService.DireccionGuardarOActualizar(address).pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar o editar la direccion ',
                ),
                response,
              );
              return deliveryBillingActions.SAVE_OR_UPDATE_DIRECTION_SUCCESS({
                payload: extractID(response),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar o editar la direccion',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of<any>(deliveryBillingActions.SAVE_OR_UPDATE_DIRECTION_FAILED());
            }),
          );
        }
        return of(deliveryBillingActions.SAVE_OR_UPDATE_DIRECTION_SUCCESS({payload: DEFAULT_UUID}));
      }),
    ),
  );

  // DOCS se guarda o edita la direccion del cliente
  saveOrEditClientAddress = createEffect(() =>
    this.actions$.pipe(
      ofType(deliveryBillingActions.SAVE_OR_UPDATE_DIRECTION_SUCCESS),
      withLatestFrom(
        this.store.select(clientDeliveryBillingSelectors.selectClientAddressData),
        this.store.select(clientDeliveryBillingSelectors.selectClientDirectionData),
        this.store.select(clientDeliveryBillingSelectors.selectClientSelected),
        this.store.select(clientDeliveryBillingSelectors.hasValidAddress),
      ),
      mergeMap(([action, address, clientAddress, client, validAddress]) => {
        if (clientAddress.IdDireccionCliente === DEFAULT_UUID && validAddress) {
          const clientAddressData = {
            ...clientAddress,
            IdCliente: client.IdCliente,
            IdDireccion: address.IdDireccion,
          };
          return this.configuracionClientesDireccionesService
            .DireccionClienteGuardarOActualizar(clientAddressData)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar la direccion del cliente',
                  ),
                  response,
                );
                return deliveryBillingActions.SAVE_CLIENT_DIRECTION_SUCCESS();
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar la direccion del cliente',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return of<any>(deliveryBillingActions.SAVE_CLIENT_DIRECTION_FAILED());
              }),
            );
        } else {
          return of(deliveryBillingActions.SAVE_CLIENT_DIRECTION_SUCCESS());
        }
      }),
    ),
  );

  // DOCS: Guardar Datos de facturación del cliente
  saveFacturationDataClient = createEffect(() =>
    this.actions$.pipe(
      ofType(deliveryBillingActions.SAVE_CLIENT_DIRECTION_SUCCESS),
      withLatestFrom(this.store.select(clientDeliveryBillingSelectors.selectBilling)),
      mergeMap(([action, billing]) => {
        return this.configuracionClientesConfiguracionService
          .DatosFacturacionClienteGuardarOActualizar(billing)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar los datos de facturacion del cliente',
                ),
                response,
              );
              return deliveryBillingActions.SAVE_EXCHANGE_RATE_EXPIRATION_LOAD();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar los datos de facturacion del cliente',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(deliveryBillingActions.SET_SAVE_BILLING_FAILED());
            }),
          );
      }),
    ),
  );

  // DOCS: Guarda vigencia del tipo de cambio
  saveExchangeRate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deliveryBillingActions.SAVE_EXCHANGE_RATE_EXPIRATION_LOAD),
      withLatestFrom(this.store.select(clientDeliveryBillingSelectors.selectClienteTCDOFVigencia)),
      mergeMap(([action, clientTCDOF]) => {
        if (clientTCDOF !== null) {
          return this.configuracionClientesConfiguracionService
            .ClienteTCDOFVigenciaGuardarOActualizar(clientTCDOF)
            .pipe(
              map((response) => {
                this.store.dispatch(deliveryBillingActions.SAVE_RESTRICCION_ENTREGA_LOAD());
                return deliveryBillingActions.SAVE_EXCHANGE_RATE_EXPIRATION_SUCCESS({
                  IdClienteTCDOFVigencia: extractID(response),
                });
              }),
            );
        } else {
          return of(deliveryBillingActions.SAVE_RESTRICCION_ENTREGA_LOAD());
        }
      }),
    ),
  );
  // Docs Guardar restricciones temporales
  RestriccionesTemporales = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deliveryBillingActions.SAVE_RESTRICCION_ENTREGA_LOAD),
        withLatestFrom(this.store.select(clientDeliveryBillingSelectors.selectBilligRestrictionT)),
        switchMap(([action, restriccionesTemp]) => {
          if (restriccionesTemp && restriccionesTemp.length > 0) {
            const request: Array<any> = _map(restriccionesTemp, (o) =>
              this.configuracionClientesDireccionesService.RestriccionTemporalDatosFacturacionGuardarOActualizar(
                o,
              ),
            );
            return forkJoin(request).pipe(
              withLatestFrom(
                this.store.select(clientDeliveryBillingSelectors.selectBilligRestrictionT),
              ),
              map(([response, restricciones]) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    LOG_SUCCEEDED,
                    FILE_NAME,
                    'Al guardar la restriccion Temporal: ' + response,
                  ),
                  response,
                );
                return this.store.dispatch(
                  deliveryBillingActions.SAVE_DISABLE_RESTRICTION_FACTURATION(),
                );
              }),
              catchError((error) => {
                this.store.dispatch(SET_LOADING({payload: false}));
                this.logger.debug(
                  servicesLogger.generateMessage(
                    LOG_FAILED,
                    FILE_NAME,
                    'Al Eliminar la restriccion Temporal: ' + error,
                  ),
                  error,
                );
                return of(deliveryBillingActions.SAVE_RESTRICCION_ENTREGA_ERROR());
              }),
            );
          } else {
            this.store.dispatch(deliveryBillingActions.SAVE_DISABLE_RESTRICTION_FACTURATION());
            return EMPTY;
          }
        }),
      ),
    {dispatch: false},
  );
  // DOCS: Deshabilita restricciones temporales a eliminar
  saveDesactivarFacturacionCliente = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deliveryBillingActions.SAVE_DISABLE_RESTRICTION_FACTURATION),
        withLatestFrom(
          this.store.select(clientDeliveryBillingSelectors.selectBillingDeleteRestriction),
        ),
        switchMap(([action, restriccionesTempDelete]) => {
          if (restriccionesTempDelete && restriccionesTempDelete.length > 0) {
            const request: Array<any> = _map(restriccionesTempDelete, (o) =>
              this.configuracionClientesDireccionesService.RestriccionTemporalDatosFacturacionDesactivar(
                o.IdRestriccionTemporalDatosFacturacion,
              ),
            );
            return forkJoin(request).pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    LOG_SUCCEEDED,
                    FILE_NAME,
                    'Al Eliminar restriccion Temporal: ' + response,
                  ),
                  response,
                );
                return this.store.dispatch(deliveryBillingActions.SAVE_RESTRICCION_MENSUAL_LOAD());
              }),
              catchError((error) => {
                this.store.dispatch(SET_LOADING({payload: false}));

                this.logger.debug(
                  servicesLogger.generateMessage(
                    LOG_FAILED,
                    FILE_NAME,
                    'Al Eliminar restriccion Temporal: ' + error,
                  ),
                  error,
                );
                return of(deliveryBillingActions.SAVE_DISABLE_COMENTARIO_FACTURACION_ERROR());
              }),
            );
          } else {
            this.store.dispatch(deliveryBillingActions.SAVE_RESTRICCION_MENSUAL_LOAD());
            return EMPTY;
          }
        }),
      ),
    {dispatch: false},
  );

  // DOCS: Guarda restricción mensual
  saveRestriccionEntrega = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deliveryBillingActions.SAVE_RESTRICCION_MENSUAL_LOAD),
        withLatestFrom(
          this.store.select(clientDeliveryBillingSelectors.selectBilligMonthlyRestriction),
          this.store.select(clientDeliveryBillingSelectors.selectBilling),
        ),
        switchMap(([action, monthlyRestriction, billing]) => {
          if (monthlyRestriction !== undefined) {
            if (monthlyRestriction.IdRestriccionMensualDatosFacturacion === DEFAULT_UUID) {
              monthlyRestriction = {
                ...monthlyRestriction,
                IdDatosFacturacionCliente: billing.IdDatosFacturacionCliente,
              };
            }
            return this.configuracionClientesDireccionesService
              .RestriccionMensualDatosFacturacionGuardarOActualizar(monthlyRestriction)
              .pipe(
                map((response) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      LOG_SUCCEEDED,
                      FILE_NAME,
                      'Al guardar la restriccion mensual ' + response,
                    ),
                    response,
                  );
                  return this.store.dispatch(
                    deliveryBillingActions.SAVE_COMENTARIO_FACTURACION_LOAD(),
                  );
                }),
                catchError((error) => {
                  this.store.dispatch(SET_LOADING({payload: false}));
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      LOG_FAILED,
                      FILE_NAME,
                      'Al guardar la restriccion mensual ' + error,
                    ),
                    error,
                  );
                  return of<any>(deliveryBillingActions.SAVE_RESTRICCION_MENSUAL_ERROR());
                }),
              );
          } else {
            this.store.dispatch(deliveryBillingActions.SAVE_COMENTARIO_FACTURACION_LOAD());
            return EMPTY;
          }
        }),
      ),
    {dispatch: false},
  );
  // DOCS: Guarda comentarios del cliente
  saveComentarioFacturacion = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deliveryBillingActions.SAVE_COMENTARIO_FACTURACION_LOAD),
        withLatestFrom(this.store.select(clientDeliveryBillingSelectors.selectBilligComent)),
        switchMap(([action, comments]) => {
          if (comments && comments.length > 0) {
            const request: Array<any> = _map(comments, (o) =>
              this.configuracionClientesRelacionesService.ClienteComentarioGuardarOActualizar(o),
            );
            return forkJoin(request).pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    LOG_SUCCEEDED,
                    FILE_NAME,
                    'Al guardar comentario de facturación: ' + response,
                  ),
                  response,
                );
                return this.store.dispatch(
                  deliveryBillingActions.SAVE_COMENTARIO_DISABLE_FACTURACION_LOAD(),
                );
              }),
              catchError((error) => {
                this.store.dispatch(SET_LOADING({payload: false}));

                this.logger.debug(
                  servicesLogger.generateMessage(
                    LOG_FAILED,
                    FILE_NAME,
                    'Al guardar comentario de facturación: ' + error,
                  ),
                  error,
                );
                return of(deliveryBillingActions.SAVE_COMENTARIO_FACTURACION_FAILED());
              }),
            );
          } else {
            this.store.dispatch(deliveryBillingActions.SAVE_COMENTARIO_DISABLE_FACTURACION_LOAD());
            return EMPTY;
          }
        }),
      ),
    {dispatch: false},
  );
  /* DOCS: Deshabilitar Comentarios de Facturación*/
  saveDisableComentarios = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deliveryBillingActions.SAVE_COMENTARIO_DISABLE_FACTURACION_LOAD),
        withLatestFrom(this.store.select(clientDeliveryBillingSelectors.selectBilligDisableComent)),
        switchMap(([action, disableComent]) => {
          if (disableComent && disableComent.length > 0) {
            const request: Array<any> = _map(disableComent, (o) =>
              this.configuracionClientesRelacionesService.ClienteComentarioDesactivar(
                o.IdClienteComentario,
              ),
            );
            return forkJoin(request).pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    LOG_SUCCEEDED,
                    FILE_NAME,
                    'Al eliminar comentario de facturación: ' + response,
                  ),
                  response,
                );
                return this.store.dispatch(deliveryBillingActions.SAVE_CORREO_CFDI_LOAD());
              }),
              catchError((error) => {
                this.store.dispatch(SET_LOADING({payload: false}));
                this.logger.debug(
                  servicesLogger.generateMessage(
                    LOG_FAILED,
                    FILE_NAME,
                    'Al eliminar comentario de facturación: ' + error,
                  ),
                  error,
                );
                return of(deliveryBillingActions.SAVE_COMENTARIO_DISABLE_FACTURACION_FAILED());
              }),
            );
          } else {
            this.store.dispatch(deliveryBillingActions.SAVE_CORREO_CFDI_LOAD());
            return EMPTY;
          }
        }),
      ),
    {dispatch: false},
  );

  // DOCS: Guarda los correos
  saveCorreosCFDI = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deliveryBillingActions.SAVE_CORREO_CFDI_LOAD),
        withLatestFrom(this.store.select(clientDeliveryBillingSelectors.selectCorreosCFDI)),
        switchMap(([action, correos]) => {
          if (correos && correos.length > 0) {
            const request: Array<any> = _map(correos, (o) =>
              this.configuracionClientesConfiguracionService.CorreoValidacionFacturacionClienteGuardarOActualizar(
                o,
              ),
            );
            return forkJoin(request).pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    LOG_SUCCEEDED,
                    FILE_NAME,
                    'Al guardar correo cfdi: ' + response,
                  ),
                  response,
                );
                return this.store.dispatch(deliveryBillingActions.SAVE_DISABLE_CORREO_CFDI_LOAD());
              }),
              catchError((error) => {
                this.store.dispatch(SET_LOADING({payload: false}));
                this.logger.debug(
                  servicesLogger.generateMessage(
                    LOG_FAILED,
                    FILE_NAME,
                    'Al eliminar correo cfdi: ' + error,
                  ),
                  error,
                );
                return of<any>(deliveryBillingActions.SAVE_CORREO_CFDI_ERROR());
              }),
            );
          } else {
            this.store.dispatch(deliveryBillingActions.SAVE_DISABLE_CORREO_CFDI_LOAD());
            return EMPTY;
          }
        }),
      ),
    {dispatch: false},
  );
  // DOCS: Deshabilita los correos
  disableCorreosCFDI = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deliveryBillingActions.SAVE_DISABLE_CORREO_CFDI_LOAD),
        withLatestFrom(this.store.select(clientDeliveryBillingSelectors.selectEmailDisable)),
        switchMap(([action, emailDisable]) => {
          if (emailDisable && emailDisable.length > 0) {
            const request: Array<any> = _map(emailDisable, (o) =>
              this.configuracionClientesConfiguracionService.CorreoValidacionFacturacionClienteDesactivar(
                o.IdCorreoValidacionFacturacionCliente,
              ),
            );
            return forkJoin(request).pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    LOG_SUCCEEDED,
                    FILE_NAME,
                    'Al elmininar correo cfdi: ' + response,
                  ),
                  response,
                );
                this.store.dispatch(deliveryBillingActions.SET_SAVE_BILLING_SUCCESS());
                this.store.dispatch(clientsActions.SET_ENABLE_EDIT({value: false}));
                this.store.dispatch(SET_LOADING({payload: false}));
                this.store.dispatch(
                  SET_LOADING_SUCCESS({
                    active: true,
                    message: 'Has guardado',
                  }),
                );
                return EMPTY;
              }),
              catchError((error) => {
                this.store.dispatch(SET_LOADING({payload: false}));
                return of<any>(deliveryBillingActions.SAVE_DISABLE_CORREO_CFDI_ERROR());
              }),
            );
          } else {
            this.store.dispatch(deliveryBillingActions.SET_SAVE_BILLING_SUCCESS());
            this.store.dispatch(clientsActions.SET_ENABLE_EDIT({value: false}));

            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(
              SET_LOADING_SUCCESS({
                active: true,
                message: 'Has guardado',
              }),
            );
            return EMPTY;
          }
        }),
      ),
    {dispatch: false},
  );
}
