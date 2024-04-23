import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, forkJoin, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';

/*Models*/
import {
  IOfferDeliveryRoutes,
  ITrademarkFamilyProviderConsolidation,
  IVMarcaFamiliaIndustriaObj,
  IVTrademarkFamily,
  Levels,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';

/*Services*/
import {
  ConfiguracionPrecioUtilidadCategoriaProveedorObj,
  ConfiguracionProductosConfiguracionPrecioTiempoEntregaProveedoresService,
  ConfiguracionProveedoresRelacionesService,
} from 'api-catalogos';

/*Actions*/
import {offerActions, providerActions} from '@appActions/forms/providers';
import * as utilsActions from '@appActions/utils/utils.action';

/*Selectors*/
import {offerSelectors} from '@appSelectors/forms/providers';

/*Utils && helpers*/
import {concat, filter, isEmpty, map as _map} from 'lodash-es';
import {extractID, extractIDs} from '@appUtil/util';
import * as servicesLogger from '@appUtil/logger';
import {
  buildFamilyFromClassificationConfigResp,
  buildFamilyFromCommissionProviderResp,
  buildFamilyFromCostConfigResp,
  buildFamilyFromDeliveryRouteDeliveryTimeResp,
  buildFamilyFromDeliveryTimeResp,
  buildFamilyFromFamilyProviderPriceResp,
  buildFamilyFromGeneralConfigResp,
  buildFamilyFromProductConfigResp,
  buildFamilyFromProviderPriceResp,
  buildFamilyFromTrademarkFamilyProviderConsolidationResp,
  buildFamilyFromTrademarkFamilyProviderResp,
  buildFamilyFromUtilityPriceResp,
} from '@appHelpers/catalogs/providers/offer.helpers';

const FILE_NAME = 'offer-saves.effects.ts';

@Injectable({
  providedIn: 'root',
})
export class OfferSavesEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private configuracionPrecioTiempoEntregaProveedorService: ConfiguracionProductosConfiguracionPrecioTiempoEntregaProveedoresService,
    private providersRelationsService: ConfiguracionProveedoresRelacionesService,
  ) {}

  /*DOCS: Guardados del módulo*/
  /* Guardar la configuracion actual de una familia ***/
  saveConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.SAVE_CONFIGURATION_LOAD),
      withLatestFrom(this.store.select(offerSelectors.selectedFamily)),
      /*DOCS: Guardar MarcaFamiliaProveedor*/
      mergeMap(([action, selectedFamily]) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        return this.providersRelationsService
          .MarcaFamiliaProveedorGuardarOActualizar(
            selectedFamily.actualConfiguration.MarcaFamiliaProveedor,
          )
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración (MarcaFamiliaProveedor)',
                ),
                response,
              );
              return buildFamilyFromTrademarkFamilyProviderResp({
                selectedFamily,
                id: extractID(response),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración (ConfiguracionPrecioProveedor)',
                ),
                error,
              );
              this.store.dispatch(offerActions.SAVE_CONFIGURATION_FAILED());
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
      /*DOCS: Guardar ConfiguracionPrecioProveedor*/
      switchMap((selectedFamily: IVTrademarkFamily) => {
        this.store.dispatch(utilsActions.SET_LOADING({payload: true}));
        return this.configuracionPrecioTiempoEntregaProveedorService
          .ConfiguracionPrecioProveedorGuardarOActualizar(
            selectedFamily.actualConfiguration.ConfiguracionPrecioProveedor,
          )
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración (ConfiguracionPrecioProveedor)',
                ),
                response,
              );
              return buildFamilyFromProviderPriceResp({
                selectedFamily,
                id: extractID(response),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración (ConfiguracionPrecioProveedor)',
                ),
                error,
              );
              this.store.dispatch(offerActions.SAVE_CONFIGURATION_FAILED());
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
      /*DOCS: Guardar ConfiguracionPrecioProveedorFamilia*/
      switchMap((selectedFamily: IVTrademarkFamily) => {
        return this.configuracionPrecioTiempoEntregaProveedorService
          .ConfiguracionPrecioProveedorFamiliaGuardarOActualizar(
            selectedFamily.actualConfiguration.ConfiguracionPrecioProveedorFamilia,
          )
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración (ConfiguracionPrecioProveedorFamilia)',
                ),
                response,
              );
              return buildFamilyFromFamilyProviderPriceResp({
                selectedFamily,
                id: extractID(response),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración (ConfiguracionPrecioProveedorFamilia)',
                ),
                error,
              );
              this.store.dispatch(offerActions.SAVE_CONFIGURATION_FAILED());
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
      /*DOCS: Guardar ConfiguracionTiempoEntregaProveedorFamilia*/
      switchMap((selectedFamily: IVTrademarkFamily) => {
        return this.configuracionPrecioTiempoEntregaProveedorService
          .ConfiguracionTiempoEntregaProveedorFamiliaGuardarOActualizar(
            selectedFamily.actualConfiguration.ConfiguracionTiempoEntregaProveedorFamilia,
          )
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración (ConfiguracionTiempoEntregaProveedorFamilia)',
                ),
                response,
              );
              return buildFamilyFromDeliveryTimeResp({
                selectedFamily,
                id: extractID(response),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración (ConfiguracionTiempoEntregaProveedorFamilia)',
                ),
                error,
              );
              this.store.dispatch(offerActions.SAVE_CONFIGURATION_FAILED());
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
      /*DOCS: Guardar arreglo de ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega*/
      switchMap((selectedFamily: IVTrademarkFamily) => {
        const requests: any[] = _map(
          selectedFamily.actualConfiguration.deliveryRoutes,
          (o: IOfferDeliveryRoutes) =>
            this.configuracionPrecioTiempoEntregaProveedorService.ConfiguracionTiempoEntregaProveedorFamiliaRutaEntregaGuardarOActualizar(
              o.configuracionTiempoEntregaProveedorFamiliaRutaEntrega,
            ),
        );
        return forkJoin(requests).pipe(
          map((response: string[]) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al guardar una configuración (arreglo de ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega)',
              ),
              response,
            );
            selectedFamily = buildFamilyFromDeliveryRouteDeliveryTimeResp({
              selectedFamily,
              ids: response,
            });
            switch (selectedFamily.selectedLevelConfigurationTab.level) {
              case Levels.Family:
                return offerActions.SAVE_FAMILY_CONFIGURATION_LOAD({
                  selectedFamily,
                });
              case Levels.listPrice:
                return offerActions.SAVE_PRICE_CONFIGURATION_LOAD({
                  selectedFamily,
                });
              case Levels.CharacteristicGrouper:
                return offerActions.SAVE_CLASSIFICATION_CONFIGURATION_LOAD({
                  selectedFamily,
                });
              case Levels.Product:
                return offerActions.SAVE_PRODUCT_CONFIGURATION_LOAD({
                  selectedFamily,
                });
              default:
                this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
                return offerActions.SAVE_CONFIGURATION_FAILED();
            }
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al guardar una configuración (arreglo de ConfiguracionTiempoEntregaProveedorFamiliaRutaEntrega)',
              ),
              error,
            );
            this.store.dispatch(offerActions.SAVE_CONFIGURATION_FAILED());
            this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
    ),
  );
  /*DOCS: Guardar ConfiguracionProveedorFamiliaGeneral*/
  saveFamilyConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.SAVE_FAMILY_CONFIGURATION_LOAD),
      mergeMap(({selectedFamily}) => {
        return this.configuracionPrecioTiempoEntregaProveedorService
          .ConfiguracionProveedorFamiliaGeneralGuardarOActualizar(
            selectedFamily.actualConfiguration.ConfiguracionProveedorFamiliaGeneral,
          )
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración (ConfiguracionProveedorFamiliaGeneral)',
                ),
                response,
              );
              return buildFamilyFromGeneralConfigResp({
                selectedFamily,
                id: extractID(response),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración (ConfiguracionProveedorFamiliaGeneral)',
                ),
                error,
              );
              this.store.dispatch(offerActions.SAVE_CONFIGURATION_FAILED());
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
      /*DOCS: Guardar los elementos nuevos del arreglo de familias consolidación y los que se van a desactivar*/
      switchMap((selectedFamily: IVTrademarkFamily) => {
        this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
        /*DOCS: Al guardar la configuración se indica que los precios de lista, clasificaciones, y productos deben*/
        /* recargarse para mostrar la configuración correcta en caso de que aun hereden la configuración general*/
        this.store.dispatch(
          offerActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
            tabConfigurationName: 'prices',
            needsToReload: true,
          }),
        );
        this.store.dispatch(
          offerActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
            tabConfigurationName: 'classifications',
            needsToReload: true,
          }),
        );
        this.store.dispatch(
          offerActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
            tabConfigurationName: 'products',
            needsToReload: true,
          }),
        );
        this.store.dispatch(offerActions.RESET_PRICE_LIST_DESIRED_PAGE());
        this.store.dispatch(offerActions.RESET_CHARACTERISTIC_GROUPER_DESIRED_PAGE());
        this.store.dispatch(offerActions.RESET_PRODUCT_DESIRED_PAGE());

        const selectedFamilies = concat(
          filter(
            selectedFamily.actualConfiguration.trademarkFamilyProviderConsolidation,

            (o: ITrademarkFamilyProviderConsolidation) => o.isChecked && !o.isOriginal,
          ),
          selectedFamily.actualConfiguration.trademarkFamilyProviderConsolidationToDelete,
        );
        if (!isEmpty(selectedFamilies)) {
          const requestMap: Array<any> = _map(
            selectedFamilies,
            (o: ITrademarkFamilyProviderConsolidation) =>
              this.providersRelationsService.MarcaFamiliaProveedorConsolidacionGuardarOActualizar(
                o,
              ),
          );
          return forkJoin(requestMap).pipe(
            map((response: Array<string>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar el arreglo de MarcaFamiliaProveedorConsolidacion',
                ),
                response,
              );
              selectedFamily = buildFamilyFromTrademarkFamilyProviderConsolidationResp({
                selectedFamily,
                ids: extractIDs(response),
              });
              /*DOCS: Gurdamos la configuración actualizada*/
              return offerActions.SAVE_CONFIGURATION_SUCCESS({
                selectedFamily,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar el arreglo de MarcaFamiliaProveedorConsolidacion',
                ),
                error,
              );
              this.store.dispatch(offerActions.SAVE_CONFIGURATION_FAILED());
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
        }
        return of(
          offerActions.SAVE_CONFIGURATION_SUCCESS({
            selectedFamily,
          }),
        );
      }),
    ),
  );
  /*DOCS: Guardar ConfiguracionProveedorFamiliaCosto*/
  savePriceConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.SAVE_PRICE_CONFIGURATION_LOAD),
      mergeMap(({selectedFamily}) => {
        return this.configuracionPrecioTiempoEntregaProveedorService
          .ConfiguracionProveedorFamiliaCostoGuardarOActualizar(
            selectedFamily.actualConfiguration.ConfiguracionProveedorFamiliaCosto,
          )
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración (ConfiguracionProveedorFamiliaCosto)',
                ),
                response,
              );
              selectedFamily = buildFamilyFromCostConfigResp({
                selectedFamily,
                id: extractID(response),
              });
              this.store.dispatch(
                offerActions.SAVE_CONFIGURATION_SUCCESS({
                  selectedFamily,
                }),
              );
              this.store.dispatch(
                offerActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
                  tabConfigurationName: 'products',
                  needsToReload: true,
                }),
              );
              return offerActions.RESET_PRODUCT_DESIRED_PAGE();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración (ConfiguracionProveedorFamiliaCosto)',
                ),
                error,
              );
              this.store.dispatch(offerActions.SAVE_CONFIGURATION_FAILED());
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
    ),
  );
  /*DOCS: Guardar ConfiguracionPrecioProveedorClasificacion*/
  saveClassificationConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.SAVE_CLASSIFICATION_CONFIGURATION_LOAD),
      mergeMap(({selectedFamily}) => {
        return this.configuracionPrecioTiempoEntregaProveedorService
          .ConfiguracionProveedorFamiliaClasificacionGuardarOActualizar(
            selectedFamily.actualConfiguration.ConfiguracionProveedorFamiliaClasificacion,
          )
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración (ConfiguracionProveedorFamiliaClasificacion)',
                ),
                response,
              );
              selectedFamily = buildFamilyFromClassificationConfigResp({
                selectedFamily,
                id: extractID(response),
              });
              this.store.dispatch(
                offerActions.SET_LIST_OF_TAB_CONFIGURATION_NEEDS_TO_RELOAD({
                  tabConfigurationName: 'products',
                  needsToReload: true,
                }),
              );
              this.store.dispatch(offerActions.RESET_PRODUCT_DESIRED_PAGE());
              return offerActions.SAVE_CONFIGURATION_SUCCESS({
                selectedFamily,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración (ConfiguracionProveedorFamiliaProducto)',
                ),
                error,
              );
              this.store.dispatch(offerActions.SAVE_CONFIGURATION_FAILED());
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
    ),
  );
  /*DOCS: Guardar ConfiguracionPrecioProveedorproducto*/
  saveProductConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(offerActions.SAVE_PRODUCT_CONFIGURATION_LOAD),
      mergeMap(({selectedFamily}) => {
        return this.configuracionPrecioTiempoEntregaProveedorService
          .ConfiguracionProveedorFamiliaProductoGuardarOActualizar(
            selectedFamily.actualConfiguration.ConfiguracionProveedorFamiliaProducto,
          )
          .pipe(
            map((response: string) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al guardar una configuración (ConfiguracionProveedorFamiliaProducto)',
                ),
                response,
              );
              selectedFamily = buildFamilyFromProductConfigResp({
                selectedFamily,
                id: extractID(response),
              });
              return offerActions.SAVE_CONFIGURATION_SUCCESS({
                selectedFamily,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al guardar una configuración (ConfiguracionProveedorFamiliaProducto)',
                ),
                error,
              );
              this.store.dispatch(offerActions.SAVE_CONFIGURATION_FAILED());
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
    ),
  );
  // DOCS Guardado inicial de los rendimientos
  saveProviderConfigurationPerformance = createEffect(() =>
    this.actions$.pipe(
      ofType(
        offerActions.SET_LOADING_SAVE_PROVIDER_CONFIGURATION_PERFORMANCE,
        offerActions.SAVE_CONFIGURATION_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(offerSelectors.selectProviderConfigurationPerformanceToSave),
        this.store.select(offerSelectors.selectedFamily),
        this.store.select(offerSelectors.selectNeedsOpenPopAfterSave),
      ),
      mergeMap(([action, familyBrandIndustryItem, selectedFamily, openPopAfterSave]) => {
        if (familyBrandIndustryItem) {
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
              return buildFamilyFromUtilityPriceResp(response, familyBrandIndustryItem);
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
              this.store.dispatch(
                offerActions.SET_FAILED_SAVE_PROVIDER_CONFIGURATION_PERFORMANCE(),
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
        } else {
          this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
          this.store.dispatch(offerActions.SET_BACKUP_CONFIGURATION());
          this.store.dispatch(
            utilsActions.SET_LOADING_SUCCESS({
              active: true,
              message: 'Has guardado',
            }),
          );
          this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
          /*DOCS: Refresca la info del item seleccionado dependiendo de a que nivel se encuentre*/
          switch (selectedFamily.selectedLevelConfigurationTab.level) {
            case Levels.Family:
              this.store.dispatch(offerActions.REFRESH_FAMILY_DATA());
              break;
            case Levels.listPrice:
              this.store.dispatch(offerActions.REFRESH_SELECTED_LIST_PRICE_DATA());
              break;
            case Levels.CharacteristicGrouper:
              this.store.dispatch(offerActions.REFRESH_SELECTED_CHARACTERISTIC_GROUPER_DATA());
              break;
            case Levels.Product:
              this.store.dispatch(offerActions.REFRESH_SELECTED_PRODUCT_DATA());
              break;
          }
          if (openPopAfterSave) {
            this.store.dispatch(offerActions.SET_IS_OPEN_POP_BREAKDOWN({value: true}));
            this.store.dispatch(offerActions.SET_PRICE_LIST_FOR_PANEL_DESIRED_PAGE({value: 1}));
            this.store.dispatch(
              offerActions.SET_PRICE_LIST_FOR_PANEL_IS_LOADING({
                isLoading: true,
              }),
            );
            this.store.dispatch(offerActions.GET_PRICE_LIST_FOR_PANEL_LOAD());
          }
          return EMPTY;
        }
      }),
      // DOCS Guardad la comision del proveedor para finalmente invocar el ciclo otra vez y verificar si aun tiene rendimientos por guardar
      switchMap((familyBrandIndustry: IVMarcaFamiliaIndustriaObj) => {
        return this.configuracionPrecioTiempoEntregaProveedorService
          .ConfiguracionComisionProveedorGuardarOActualizar(
            familyBrandIndustry.ConfiguracionComisionProveedor,
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
              this.store.dispatch(
                offerActions.SET_SUCCESS_SAVE_PROVIDER_CONFIGURATION_PERFORMANCE({
                  familyBrandIndustry: buildFamilyFromCommissionProviderResp(
                    response,
                    familyBrandIndustry,
                  ),
                }),
              );
              return offerActions.SET_LOADING_SAVE_PROVIDER_CONFIGURATION_PERFORMANCE();
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
              this.store.dispatch(
                offerActions.SET_FAILED_SAVE_PROVIDER_CONFIGURATION_PERFORMANCE(),
              );
              this.store.dispatch(utilsActions.SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
      }),
    ),
  );
}
