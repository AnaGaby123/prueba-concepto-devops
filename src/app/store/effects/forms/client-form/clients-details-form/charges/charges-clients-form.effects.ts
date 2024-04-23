import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {NGXLogger} from 'ngx-logger';
import * as api from 'api-catalogos';
import {DatosFacturacionClienteDetalle} from 'api-catalogos';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import * as actionChargersClientFrom from '@appActions/forms/client-form/clients-details-form/charges-clients-form/charges-clients-form.actions';
import {RETURN_EMPTY, SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';
import {selectedClient} from '@appSelectors/forms/clients-form/clients-details/clients-details-form.selectors';
import * as servicesLogger from '@appUtil/logger';
import {FacturationDataClient} from '@appHelpers/catalogs/clients/charges.helpers';
import {clientChargesSelectors, clientsSelectors} from '@appSelectors/forms/clients-form';
import {chargesActions} from '@appActions/forms/client-form';
import * as clientsActions from '@appActions/forms/client-form/clients-form.actions';
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';
import {find, isEmpty} from 'lodash-es';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {DEFAULT_UUID, ENUM_PAYMENT_CONDITIONS} from '@appUtil/common.protocols';
import {extractID} from '@appUtil/util';

const FILE_NAME = 'charges-clients-form.effects.ts';

@Injectable()
export class ChargesClientsFormEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private logger: NGXLogger,
    private configuracionClientesConfiguracionService: api.ConfiguracionClientesConfiguracionService,
    private configuracionCuentasService: api.ConfiguracionCuentasService,
    private configuracionClientesService: api.ConfiguracionClientesService,
  ) {}

  /*DOCS: Obtiene los catálogos reutilizables que se usan en el módulo*/
  getDropListPagos = createEffect(
    () =>
      this.actions$.pipe(
        ofType(chargesActions.GET_DATADROPLIST_PAGO_LOAD),
        mergeMap((action) => {
          this.store.dispatch(catalogsActions.GET_CAT_PAYMENT_CONDITIONS_LOAD());
          this.store.dispatch(catalogsActions.GET_CAT_MEDIO_DE_PAGO_LOAD());
          this.store.dispatch(catalogsActions.GET_CAT_EMPRESAS_LOAD());
          this.store.dispatch(catalogsActions.GET_CAT_USO_CFDI());
          this.store.dispatch(catalogsActions.GET_CAT_METODO_DE_PAGO());
          this.store.dispatch(catalogsActions.GET_CAT_REVIEWS_LOAD());
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  loadCharges$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        catalogsActions.GET_CAT_PAYMENT_CONDITIONS_SUCCESS,
        catalogsActions.GET_CAT_MEDIO_DE_PAGO_SUCCESS,
        catalogsActions.GET_CAT_EMPRESAS_SUCCESS,
        catalogsActions.GET_CAT_USO_CFDI,
        catalogsActions.GET_CAT_METODO_DE_PAGO_SUCCESS,
        catalogsActions.GET_CAT_REVIEWS_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(clientsSelectors.selectIsInDetails),
        this.store.select(catalogsSelectors.selectPaymentConditionsForDropDown),
        this.store.select(catalogsSelectors.selectCatMedioDePagoForDropDown),
        this.store.select(catalogsSelectors.selectCatUsoCFDISelectedForDropDown),
        this.store.select(catalogsSelectors.selectCatMetodoDePagoCFDISelectedForDropDown),
        this.store.select(catalogsSelectors.selectCatRevisionSelectedForDropDown),
      ),
      mergeMap(([action, clientDetails, conditions, payment, cfdi, paymentMethod, reviews]) => {
        if (
          clientDetails &&
          !isEmpty(conditions) &&
          !isEmpty(payment) &&
          !isEmpty(cfdi) &&
          !isEmpty(paymentMethod) &&
          !isEmpty(reviews)
        ) {
          return of(chargesActions.SET_LOAD_CHARGES_CLIENT());
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );
  // DOCS se obtienen los datos de la seccion de cobros del cliente
  getDataCharges = createEffect(() =>
    this.actions$.pipe(
      ofType(actionChargersClientFrom.SET_LOAD_CHARGES_CLIENT),
      withLatestFrom(
        this.store.select(selectedClient),
        this.store.select(catalogsSelectors.selectCatPaymentConditionsForDropDown),
        this.store.select(catalogsSelectors.selectCatMedioDePagoForDropDown),
        this.store.select(catalogsSelectors.selectvEmpresasForDropDown),
        this.store.select(catalogsSelectors.selectCatRevisionSelectedForDropDown),
        this.store.select(catalogsSelectors.selectCatUsoCFDISelectedForDropDown),
        this.store.select(catalogsSelectors.selectCatMetodoDePagoCFDISelectedForDropDown),
      ),
      mergeMap(
        ([
          action,
          client,
          paymentConditions,
          paymentForm,
          company,
          typeRevision,
          useCFDI,
          paymentMethod,
        ]) => {
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
                if (response.DatosFacturacionCliente) {
                  this.store.dispatch(SET_LOADING({payload: false}));
                  return actionChargersClientFrom.SET_SUCCESS_CHARGES_CLIENT({
                    payload: FacturationDataClient(
                      response,
                      paymentConditions,
                      paymentForm,
                      company,
                      typeRevision,
                      useCFDI,
                      paymentMethod,
                    ),
                  });
                } else {
                  return chargesActions.CHECK_CHARGES_DATA();
                }
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al obtener los datos de cobro del cliente',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return of<any>(actionChargersClientFrom.SET_FAILED_CHARGES_CLIENT());
              }),
            );
        },
      ),
    ),
  );

  checkChargesData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(chargesActions.SET_SUCCESS_CHARGES_CLIENT, chargesActions.CHECK_CHARGES_DATA),
      withLatestFrom(
        this.store.select(clientChargesSelectors.selectCredit),
        this.store.select(catalogsSelectors.selectCatPaymentConditionsForDropDown),
      ),
      mergeMap(([action, credit, paymentConditions]) => {
        if (credit.IdConfiguracionPagos === DEFAULT_UUID) {
          const condition: DropListOption = find(
            paymentConditions,
            (o: DropListOption) => o.labelKey === ENUM_PAYMENT_CONDITIONS.prepaid,
          );
          credit = {
            ...credit,
            IdCatCondicionesDePago: condition.value.toString(),
            paymentConditionsSelected: condition,
            LineaCredito: credit?.paymentConditionsSelected?.sinCredito
              ? null
              : credit?.LineaCredito,
            PorcentajeSobregiroLineaCredito: credit?.paymentConditionsSelected?.sinCredito
              ? null
              : credit?.PorcentajeSobregiroLineaCredito,
          };
          return of(chargesActions.UPDATE_CREDIT_DATA({credit}));
        }
        return of(SET_LOADING({payload: false}));
      }),
    ),
  );

  // DOCS: Guardar Datos de facturación del cliente

  saveFacturationDataClient = createEffect(() =>
    this.actions$.pipe(
      ofType(chargesActions.SAVE_CHARGES_LOAD),
      withLatestFrom(this.store.select(clientChargesSelectors.selectBilling)),
      mergeMap(([action, billing]) => {
        this.store.dispatch(SET_LOADING({payload: true}));

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
              return chargesActions.SAVE_CHARGES_SUCCESS();
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
              return of(chargesActions.SAVE_CHARGES_ERROR());
            }),
          );
      }),
    ),
  );

  // DOCS: Guardar Datos de pago del cliente

  saveConfigutarionPayment = createEffect(() =>
    this.actions$.pipe(
      ofType(chargesActions.SAVE_CHARGES_SUCCESS),
      withLatestFrom(
        this.store.select(clientChargesSelectors.selectCredit),
        this.store.select(selectedClient),
      ),
      mergeMap(([action, credit, detailsClientNode]) => {
        return this.configuracionCuentasService.ConfiguracionPagosGuardarOActualizar(credit).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar los datos de pagos del cliente',
              ),
              response,
            );
            this.store.dispatch(
              clientsActions.SET_SELECTED_CLIENT({
                client: {
                  ...detailsClientNode,
                  IdConfiguracionPagos: extractID(response),
                },
              }),
            );
            this.store.dispatch(
              chargesActions.SET_PAYMENT_CONFIG_ID({
                IdConfiguracionPagos: extractID(response),
              }),
            );
            return chargesActions.SAVE_PAYMENTS_SUCCESS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar los datos de pagos del cliente',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(chargesActions.SAVE_PAYMENTS_ERROR());
          }),
        );
      }),
    ),
  );

  // DOCS: Guardar Datos STP del cliente

  saveConfigutarionSTPClient = createEffect(() =>
    this.actions$.pipe(
      ofType(chargesActions.SAVE_PAYMENTS_SUCCESS),
      withLatestFrom(this.store.select(clientChargesSelectors.selectClientSTP)),
      mergeMap(([action, clientStp]) => {
        return this.configuracionClientesConfiguracionService
          .ClienteDatosSTPGuardarOActualizar(clientStp)
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar los datos stp del cliente',
                ),
                response,
              );

              return chargesActions.SAVE_CLIENT_STP_SUCCESS();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al guardar los datos stp del cliente',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(chargesActions.SAVE_CLIENT_STP_ERROR());
            }),
          );
      }),
    ),
  );

  // DOCS: Guardar Datos del cliente

  saveConfigutarionClient = createEffect(() =>
    this.actions$.pipe(
      ofType(chargesActions.SAVE_PAYMENTS_SUCCESS),
      withLatestFrom(this.store.select(clientChargesSelectors.selectClientSelected)),
      mergeMap(([action, client]) => {
        return this.configuracionClientesService.ClienteGuardarOActualizar(client).pipe(
          map((response) => {
            this.store.dispatch(clientsActions.SET_ENABLE_EDIT({value: false}));
            this.store.dispatch(SET_LOADING({payload: false}));
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar los datos del cliente',
              ),
              response,
            );
            this.store.dispatch(
              SET_LOADING_SUCCESS({
                active: true,
                message: 'Has guardado',
              }),
            );
            return chargesActions.SAVE_CLIENT_SUCCESS();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar los datos del cliente',
              ),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(chargesActions.SAVE_CLIENT_ERROR());
          }),
        );
      }),
    ),
  );
}
