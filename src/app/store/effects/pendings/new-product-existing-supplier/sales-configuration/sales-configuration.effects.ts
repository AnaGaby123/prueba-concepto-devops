import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';
import {
  DashboardData,
  ParametroAutorizacion,
  ProcesosL01CotizacionInvestigacionService,
  VPrecioProductoProveedorFamiliaInvestigacion,
} from 'api-logistica';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import * as servicesLogger from '@appUtil/logger';
import {EMPTY, forkJoin, of} from 'rxjs';
import {
  buildAddImageItemsConfigurationSalesConfiguration,
  buildBrandFamilyCatIndustry,
  buildFamilyFromCommissionProviderResp,
  buildFamilyFromUtilityPriceResp,
  buildSalesConfigFamilies,
  setIndexListConfigurationDetails,
} from '@appHelpers/pending/new-product-existing-supplier/sales-configuration/sales-configuration.helpers';
import {salesConfigurationDetailsActions} from '@appActions/pendings/new-product-existing-supplier/sales-configuration';
import {salesConfigurationDetailsSelectors} from '@appSelectors/pendings/new-product-existing-supplier/sales-configuration';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  AuthorizationTypesClave,
} from '@appUtil/common.protocols';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';
import {GET_CAT_TIPOS_AUTORIZACION_LOAD} from '@appActions/catalogs/catalogos.actions';
import {
  ConfiguracionPrecioUtilidadCategoriaProveedorObj,
  ConfiguracionProductosConfiguracionPrecioTiempoEntregaProveedoresService,
  ConfiguracionProductosMarcasFamiliasService,
  ConfiguracionProveedoresCalculosService,
  ConfiguracionProveedoresRelacionesService,
  ConfProveedorUtilidadComision,
  MarcaFamiliaProveedorIndustria,
} from 'api-catalogos';
import * as utilsActions from '@appActions/utils/utils.action';
import * as actionsUtils from '@appActions/utils/utils.action';
import {RETURN_EMPTY, SEND_AUTHORIZATION_CODE_SUCCESS} from '@appActions/utils/utils.action';
import {extractID} from '@appUtil/util';
import {map as _map} from 'lodash-es';

import {
  IFamiliesSalesConfig,
  IVMarcaFamiliaIndustriaObj,
} from '@appModels/store/pendings/new-product-existing-supplier/sales-configuration/sales-configuration-details.models';

const FILE_NAME = '[Sales-configuration]';

@Injectable()
export class SalesConfigurationEffects {
  constructor(
    private action$: Actions,
    private store: Store,
    private logger: NGXLogger,
    private procesosL01CotizacionInvestigacionService: ProcesosL01CotizacionInvestigacionService,
    private configuracionProveedoresCalculosService: ConfiguracionProveedoresCalculosService,
    private configuracionProductosMarcasFamiliasService: ConfiguracionProductosMarcasFamiliasService,
    private configuracionPrecioTiempoEntregaProveedorService: ConfiguracionProductosConfiguracionPrecioTiempoEntregaProveedoresService,
    private configuracionProveedoresRelacionesService: ConfiguracionProveedoresRelacionesService,
  ) {}

  // DOCS: Obtener lista de familias
  $getFamilyList = createEffect(() =>
    this.action$.pipe(
      ofType(
        salesConfigurationDetailsActions.FETCH_FAMILIES_LOAD,
        salesConfigurationDetailsActions.SET_FILTERS,
        salesConfigurationDetailsActions.SET_SEARCH_TERM,
      ),
      withLatestFrom(
        this.store.select(salesConfigurationDetailsSelectors.selectFamiliesListQueryInfo),
      ),
      mergeMap(([action, queryInfo]) => {
        this.store.dispatch(catalogsActions.GET_CAT_PRODUCT_INVESTIGATION_FOLLOW_LOAD());
        this.store.dispatch(GET_CAT_TIPOS_AUTORIZACION_LOAD());
        this.store.dispatch(
          salesConfigurationDetailsActions.UPDATE_LIST_ITEMS_API_STATUS({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.procesosL01CotizacionInvestigacionService
          .ConfiguracionProductoInvestigacionObtenerDashboardVenta(queryInfo)
          .pipe(
            map((response: DashboardData) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener lista de familias',
                ),
              );
              this.store.dispatch(
                salesConfigurationDetailsActions.UPDATE_LIST_ITEMS_API_STATUS({
                  status: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );
              if (response.Resumen.length) {
                const listFamilies: Array<IFamiliesSalesConfig> = buildSalesConfigFamilies(
                  response.Resumen,
                );
                const itemsImage: Array<IFamiliesSalesConfig> = buildAddImageItemsConfigurationSalesConfiguration(
                  listFamilies,
                );
                return salesConfigurationDetailsActions.FETCH_FAMILIES_SUCCESS({
                  families: itemsImage,
                });
              }
              return RETURN_EMPTY();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener lista de familias',
                ),
                error,
              );
              this.store.dispatch(
                salesConfigurationDetailsActions.UPDATE_LIST_ITEMS_API_STATUS({
                  status: API_REQUEST_STATUS_FAILED,
                }),
              );
              return EMPTY;
            }),
          );
      }),
    ),
  );

  // DOCS Obtiene los detalle de la configuracion de la familia
  $getFamilyConfiguration = createEffect(() =>
    this.action$.pipe(
      ofType(
        salesConfigurationDetailsActions.SET_SELECTED_FAMILY,
        salesConfigurationDetailsActions.FETCH_FAMILIES_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(salesConfigurationDetailsSelectors.selectedFamily),
        this.store.select(salesConfigurationDetailsSelectors.queryFamilyDetailsConfiguration),
      ),
      mergeMap(([action, selectedFamily, queryInfo]) => {
        if (selectedFamily.needsToReload) {
          this.store.dispatch(
            salesConfigurationDetailsActions.UPDATE_DETAILS_CONFIGURATION_STATUS({
              status: API_REQUEST_STATUS_LOADING,
            }),
          );
          return this.configuracionProveedoresCalculosService
            .ConfiguracionProveedorExtensionConfiguracionProveedorVenta(queryInfo)
            .pipe(
              map((response: ConfProveedorUtilidadComision) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener los detalles de la familia',
                  ),
                );
                this.store.dispatch(
                  salesConfigurationDetailsActions.UPDATE_DETAILS_CONFIGURATION_STATUS({
                    status: API_REQUEST_STATUS_SUCCEEDED,
                  }),
                );
                return salesConfigurationDetailsActions.FETCH_FAMILY_SELECTED_DETAILS_SUCCESS({
                  configuration: setIndexListConfigurationDetails(response.vMarcaFamiliaIndustria),
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al obtener los detalles de la familia',
                  ),
                  error,
                );
                this.store.dispatch(
                  salesConfigurationDetailsActions.UPDATE_DETAILS_CONFIGURATION_STATUS({
                    status: API_REQUEST_STATUS_FAILED,
                  }),
                );
                return of(salesConfigurationDetailsActions.FETCH_FAMILY_SELECTED_DETAILS_FAILED());
              }),
            );
        } else {
          return EMPTY;
        }
      }),
    ),
  );

  // DOCS Guardado inicial de los rendimientos
  saveProviderConfigurationPerformance = createEffect(() =>
    this.action$.pipe(
      ofType(salesConfigurationDetailsActions.SAVE_CONFIGURATION_LOAD),
      withLatestFrom(
        this.store.select(
          salesConfigurationDetailsSelectors.selectProviderConfigurationPerformanceToSave,
        ),
        this.store.select(salesConfigurationDetailsSelectors.selectBrandFamilyCatIndustryQuery),
      ),
      mergeMap(([{finishConfiguration}, familyBrandIndustryItem, queryFamilyBrandIndustryItem]) => {
        if (familyBrandIndustryItem) {
          this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
          return this.configuracionProductosMarcasFamiliasService
            .MarcaFamiliaCatIndustriaGuardarOActualizar(queryFamilyBrandIndustryItem)
            .pipe(
              map((response: string) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al guardar la MarcaFamiliaCatIndustria',
                  ),
                  response,
                );
                return {
                  familyBrandIndustryItem: buildBrandFamilyCatIndustry(
                    familyBrandIndustryItem,
                    extractID(response),
                  ),
                  finishConfiguration,
                };
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al guardar la comision del proveedor',
                  ),
                  error,
                );
                this.store.dispatch(salesConfigurationDetailsActions.SAVE_CONFIGURATION_FAILED());
                this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
                return EMPTY;
              }),
            );
        } else {
          this.store.dispatch(salesConfigurationDetailsActions.SET_BACKUP_CONFIGURATION());
          if (finishConfiguration) {
            this.store.dispatch(salesConfigurationDetailsActions.VERIFY_UTILITIES_LOAD());
            return EMPTY;
          }
          this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
          this.store.dispatch(
            utilsActions.SET_LOADING_SUCCESS({
              active: true,
              message: 'Has guardado',
            }),
          );
          return EMPTY;
        }
      }),
      switchMap(({finishConfiguration, familyBrandIndustryItem}) => {
        const requests: any[] = _map(
          familyBrandIndustryItem.ConfiguracionPrecioUtilidadCategoriaProveedor,
          (o: ConfiguracionPrecioUtilidadCategoriaProveedorObj) =>
            this.configuracionPrecioTiempoEntregaProveedorService.ConfiguracionPrecioUtilidadCategoriaProveedorGuardarOActualizar(
              o,
            ),
        );
        // DOCS Guardad los 10 niveles de utilidad
        return forkJoin(requests).pipe(
          map((response: string[]) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al guardar una configuración (arreglo de ConfiguracionPrecioUtilidadCategoriaProveedor)',
              ),
              response,
            );
            return {
              familyBrandIndustryItem: buildFamilyFromUtilityPriceResp(
                response,
                familyBrandIndustryItem,
              ),
              finishConfiguration,
            };
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al guardar una configuración (arreglo de ConfiguracionPrecioUtilidadCategoriaProveedor)',
              ),
              error,
            );
            this.store.dispatch(salesConfigurationDetailsActions.SAVE_CONFIGURATION_FAILED());
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
      // DOCS Guardad la comision del proveedor
      switchMap(({finishConfiguration, familyBrandIndustryItem}) => {
        return this.configuracionPrecioTiempoEntregaProveedorService
          .ConfiguracionComisionProveedorGuardarOActualizar(
            familyBrandIndustryItem.ConfiguracionComisionProveedor,
          )
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar la comision del proveedor',
                ),
                response,
              );
              return {
                familyBrandIndustryItem: buildFamilyFromCommissionProviderResp(
                  response,
                  familyBrandIndustryItem,
                ),
                finishConfiguration,
              };
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar la comision del proveedor',
                ),
                error,
              );
              this.store.dispatch(salesConfigurationDetailsActions.SAVE_CONFIGURATION_FAILED());
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
      // DOCS MarcaFamiliaProveedorIndustria para finalmente invocar el ciclo otra vez y verificar si aun tiene rendimientos por guardar
      withLatestFrom(this.store.select(salesConfigurationDetailsSelectors.selectedFamily)),
      switchMap(([{finishConfiguration, familyBrandIndustryItem}, selectedFamily]) => {
        const brandFamily: MarcaFamiliaProveedorIndustria = {
          IdMarcaFamiliaCatIndustria: familyBrandIndustryItem.IdMarcaFamiliaCatIndustria,
          EnRevision: true,
          IdMarcaFamiliaProveedor: selectedFamily.IdMarcaFamiliaProveedor,
          IdCotPartidaCotizacionInvestigacion: selectedFamily.IdCotPartidaCotizacionInvestigacion,
        };
        return this.configuracionProveedoresRelacionesService
          .MarcaFamiliaProveedorIndustriaGuardarOActualizar(brandFamily)
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar MarcaFamiliaProveedorIndustria',
                ),
                response,
              );
              this.store.dispatch(
                salesConfigurationDetailsActions.SAVE_CONFIGURATION_SUCCESS({
                  familyBrandIndustry: familyBrandIndustryItem,
                }),
              );
              return salesConfigurationDetailsActions.SAVE_CONFIGURATION_LOAD({
                finishConfiguration,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar MarcaFamiliaProveedorIndustria',
                ),
                error,
              );
              this.store.dispatch(salesConfigurationDetailsActions.SAVE_CONFIGURATION_FAILED());
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
    ),
  );

  // DOCS Verifica que alguna de las familias esten con un porcentaje de utilidad mayor al 30%
  $verifyUtilities = createEffect(() =>
    this.action$.pipe(
      ofType(salesConfigurationDetailsActions.VERIFY_UTILITIES_LOAD),
      withLatestFrom(this.store.select(salesConfigurationDetailsSelectors.selectedFamily)),
      mergeMap(([action, selectedFamily]) => {
        return this.procesosL01CotizacionInvestigacionService
          .ConfiguracionProductoInvestigacionConfiguracionVentaProductoInvestigacionRevisionUtilidad(
            selectedFamily.IdCotPartidaCotizacionInvestigacion,
          )
          .pipe(
            map((response: Array<VPrecioProductoProveedorFamiliaInvestigacion>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener la revision de las utilidades',
                ),
              );
              if (response.length) {
                this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
                return salesConfigurationDetailsActions.ACTIVE_SECURE_MESSAGE_CODE_POP_UP({
                  value: true,
                });
              }
              this.store.dispatch(
                salesConfigurationDetailsActions.FINISH_PURCHASING_CONFIGURATION_LOAD(),
              );
              return RETURN_EMPTY();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener la revision de las utilidades',
                ),
                error,
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));

              return of(RETURN_EMPTY());
            }),
          );
      }),
    ),
  );

  //DOCS: Efecto para enviar data necesaria para la solicitud de un código de autorización
  setAuthorization$ = createEffect(() =>
    this.action$.pipe(
      ofType(salesConfigurationDetailsActions.SET_AUTHORIZATION_DATA),
      withLatestFrom(this.store.select(salesConfigurationDetailsSelectors.selectedFamily)),
      mergeMap(([action, selectedFamily]) => {
        return of(
          actionsUtils.REQUEST_VALIDATION_CODE_LOAD({
            authorizationType: AuthorizationTypesClave.configuracionVentasUtilidad,
            IdOperacion: selectedFamily.IdCotPartidaCotizacionInvestigacion,
          }),
        );
      }),
    ),
  );

  //DOCS: Efecto para abrir el pop de codigo de seguridad
  setAuthorizationOpenPop$ = createEffect(() =>
    this.action$.pipe(
      ofType(actionsUtils.REQUEST_VALIDATION_CODE_SUCCESS),
      mergeMap(({authorization}) => {
        this.store.dispatch(
          salesConfigurationDetailsActions.ACTIVE_SECURE_MESSAGE_CODE_POP_UP({value: false}),
        );
        return of(salesConfigurationDetailsActions.ACTIVE_SECURE_CODE_POP_UP({value: true}));
      }),
    ),
  );

  //DOCS: Efecto para validar el codigo de seguiridad ingresado
  sendAuthorizationCode$ = createEffect(() =>
    this.action$.pipe(
      ofType(salesConfigurationDetailsActions.SET_CODE_DIGIT),
      withLatestFrom(this.store.select(salesConfigurationDetailsSelectors.selectAuthorizationData)),
      mergeMap(([action, authorizationObj]) => {
        if (action.value) {
          const body: ParametroAutorizacion = {
            IdCatTipoAutorizacion: null,
            IdOperacion: null,
            IdAutorizacion: authorizationObj.authorization.Autorizacion.IdAutorizacion,
            IdUsuarioAutoriza: null,
            CodigoAutorizacion: authorizationObj.CodigoAutorizacion,
            Descripcion: null,
          };
          return of(actionsUtils.SEND_AUTHORIZATION_CODE_LOAD({authorizationObj: body}));
        }
        return of(RETURN_EMPTY);
      }),
    ),
  );

  //DOCS: Efecto para obtener la repsuesta de la validacion del codigo de seguridad
  authorizationCodeValidator$ = createEffect(() =>
    this.action$.pipe(
      ofType(SEND_AUTHORIZATION_CODE_SUCCESS),
      mergeMap(({valid}) => {
        if (valid) {
          this.store.dispatch(
            salesConfigurationDetailsActions.FINISH_PURCHASING_CONFIGURATION_LOAD(),
          );
          setTimeout(() => {
            this.store.dispatch(salesConfigurationDetailsActions.RESET_SECURE_CODE_POP_UP());
          }, 1000);
          this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );

  // DOCS Terminar la configuracion en compras para pasarlo a la siguiente configuracion
  finishPurchasingConfiguration = createEffect(() =>
    this.action$.pipe(
      ofType(salesConfigurationDetailsActions.FINISH_PURCHASING_CONFIGURATION_LOAD),
      withLatestFrom(this.store.select(salesConfigurationDetailsSelectors.selectedFamily)),
      mergeMap(([action, selectedFamily]) => {
        return this.configuracionProveedoresRelacionesService
          .MarcaFamiliaProveedorPorValidar(selectedFamily.IdMarcaFamiliaProveedor)
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar PorValidarMarcaFamiliaProveedor',
                ),
                response,
              );

              return selectedFamily;
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar PorValidarMarcaFamiliaProveedor',
                ),
                error,
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return of(salesConfigurationDetailsActions.FINISH_PURCHASING_CONFIGURATION_FAILED());
            }),
          );
      }),
      withLatestFrom(
        this.store.select(
          salesConfigurationDetailsSelectors.selectProviderConfigurationPerformanceInRevision,
        ),
      ),
      switchMap(
        ([selectedFamily, brandFamilyProviderIndustryLst]: [
          IFamiliesSalesConfig,
          Array<IVMarcaFamiliaIndustriaObj>,
        ]) => {
          const requests: any[] = _map(
            brandFamilyProviderIndustryLst,
            (o: IVMarcaFamiliaIndustriaObj) =>
              this.configuracionProveedoresRelacionesService.MarcaFamiliaProveedorIndustriaGuardarOActualizar(
                {
                  IdMarcaFamiliaCatIndustria: o.IdMarcaFamiliaCatIndustria,
                  EnRevision: false,
                  IdMarcaFamiliaProveedor: selectedFamily.IdMarcaFamiliaProveedor,
                  IdCotPartidaCotizacionInvestigacion:
                    selectedFamily.IdCotPartidaCotizacionInvestigacion,
                },
              ),
          );
          if (requests.length) {
            return forkJoin(requests).pipe(
              map((response: string[]) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al guardar (arreglo de MarcaFamiliaProveedorIndustria)',
                  ),
                  response,
                );
                return selectedFamily;
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al guardar (arreglo de MarcaFamiliaProveedorIndustria)',
                  ),
                  error,
                );
                this.store.dispatch(
                  salesConfigurationDetailsActions.FINISH_PURCHASING_CONFIGURATION_FAILED(),
                );
                this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
                return EMPTY;
              }),
            );
          }
          return of(selectedFamily);
        },
      ),
      withLatestFrom(
        this.store.select(
          salesConfigurationDetailsSelectors.selectQueryFinishPurchasingConfiguration,
        ),
      ),
      switchMap(([selectedFamily, queryInfo]) => {
        return this.procesosL01CotizacionInvestigacionService
          .cotPartidaCotizacionInvestigacionSeguimientoGuardarOActualizar(queryInfo)
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al terminar la configuracion de ventas en investigacion de producto',
                ),
                response,
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              this.store.dispatch(
                utilsActions.SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Has terminado de configurar la familia',
                }),
              );
              this.store.dispatch(
                salesConfigurationDetailsActions.FINISH_PURCHASING_CONFIGURATION_SUCCESS(),
              );
              return salesConfigurationDetailsActions.FETCH_FAMILIES_LOAD();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al terminar la configuracion de ventas en investigacion de producto',
                ),
                error,
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return of(salesConfigurationDetailsActions.FINISH_PURCHASING_CONFIGURATION_FAILED());
            }),
          );
      }),
    ),
  );
}
