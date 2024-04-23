import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {NGXLogger} from 'ngx-logger';
import {DashboardData, ProcesosL01CotizacionInvestigacionService} from 'api-logistica';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import * as servicesLogger from '@appUtil/logger';
import {EMPTY, of} from 'rxjs';
import {purchasingConfigurationDetailsSelectors} from '@appSelectors/pendings/new-product-existing-supplier/purchasing-configuration';
import {purchasingConfigurationActions} from '@appActions/pendings/new-product-existing-supplier/purchasing-configuration';
import {
  buildAddImageItemsConfigurationPurchasingConfiguration,
  buildConfigurationFamily,
  buildFamiliesLisPurchasingConfigurationFromDashboard,
} from '@appHelpers/pending/new-product-existing-supplier/purchasing-configuration/purchasing-configuration.helpers';
import {
  ConfiguracionProductosMarcasFamiliasService,
  ConfiguracionProveedoresCalculosService,
  ConfProveedorCompra,
  QueryInfo,
  QueryResultVMarcaFamilia,
  VMarcaFamilia,
} from 'api-catalogos';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';
import {map as _map} from 'lodash-es';
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';

const FILE_NAME = '[purchasing-configuration]';

@Injectable()
export class PurchasingConfigurationDetailsEffects {
  constructor(
    private action$: Actions,
    private store: Store,
    private logger: NGXLogger,
    private procesosCotizacionInvestigacion: ProcesosL01CotizacionInvestigacionService,
    private configuracionProveedoresCalculosService: ConfiguracionProveedoresCalculosService,
    private productsTrademarkFamiliesConfigService: ConfiguracionProductosMarcasFamiliasService,
  ) {}

  // DOCS: Obtener lista de familias
  $getFamilyList = createEffect(() =>
    this.action$.pipe(
      ofType(
        purchasingConfigurationActions.FETCH_FAMILIES_LIST_LOAD,
        purchasingConfigurationActions.SET_SEARCH_TERM,
        purchasingConfigurationActions.SET_FILTER_OPTIONS,
      ),
      withLatestFrom(
        this.store.select(purchasingConfigurationDetailsSelectors.familyListGroupQueryInfo),
      ),
      mergeMap(([action, queryInfo]) => {
        this.store.dispatch(catalogsActions.GET_LIST_AGENTE_ADUANAL_LOAD());
        this.store.dispatch(catalogsActions.GET_LIST_ADUANA_LOAD());
        this.store.dispatch(catalogsActions.GET_LIST_CONCEPTS_CUSTOM_AGENT_LOAD());
        this.store.dispatch(catalogsActions.GET_CAT_PRODUCT_INVESTIGATION_FOLLOW_LOAD());
        this.store.dispatch(
          purchasingConfigurationActions.SET_FAMILIES_LIST_STATUS({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.procesosCotizacionInvestigacion
          .ConfiguracionProductoInvestigacionObtenerDashboard(queryInfo)
          .pipe(
            map((response: DashboardData) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener lista de familias en configuracion compras',
                ),
              );
              this.store.dispatch(
                purchasingConfigurationActions.SET_FAMILIES_LIST_STATUS({
                  status: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );
              const listFamilies = buildFamiliesLisPurchasingConfigurationFromDashboard(
                response.Resumen,
              );
              const itemsImage = buildAddImageItemsConfigurationPurchasingConfiguration(
                listFamilies,
              );

              if (response.Resumen?.length) {
                this.store.dispatch(
                  purchasingConfigurationActions.SET_FAMILY_ITEM({family: itemsImage[0]}),
                );
              }
              return purchasingConfigurationActions.FETCH_FAMILIES_LIST_SUCCESS({
                listFamilies: itemsImage,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener lista de familias en configuracion compras',
                ),
                error,
              );
              return of(
                purchasingConfigurationActions.SET_FAMILIES_LIST_STATUS({
                  status: API_REQUEST_STATUS_FAILED,
                }),
              );
            }),
          );
      }),
    ),
  );

  // DOCS: Obtener lista de familias de la marca de la familia seleccionada seleccionada para el drop
  getTrademarkFamiliesList$ = createEffect(() =>
    this.action$.pipe(
      ofType(purchasingConfigurationActions.SET_FAMILY_ITEM),
      mergeMap(({family}) => {
        this.store.dispatch(
          purchasingConfigurationActions.SET_FAMILY_DETAILS_STATUS({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        if (family.needsToReload) {
          const info: QueryInfo = {
            Filters: [
              {
                NombreFiltro: 'Activo',
                ValorFiltro: true,
              },
              {
                NombreFiltro: 'IdMarca',
                ValorFiltro: family.IdMarca,
              },
              {
                NombreFiltro: 'IdMarcaMarcaFamiliaProveedor',
                ValorFiltro: family.IdMarcaFamiliaProveedor,
              },
            ],
          };
          return this.productsTrademarkFamiliesConfigService.vMarcaFamiliaQueryResult(info).pipe(
            map((response: QueryResultVMarcaFamilia) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'al obtener la lista de familias de la marca a la que pertenece la familia seleccionada.',
                ),
                response,
              );
              this.store.dispatch(
                purchasingConfigurationActions.SET_FAMILY_DETAILS_STATUS({
                  status: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );
              return purchasingConfigurationActions.GET_TRADEMARK_FAMILIES_LIST_SUCCESS({
                trademarkFamiliesList: _map(response.Results, (o: VMarcaFamilia) => ({
                  ...o,
                  isSelected: false,
                })),
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'al obtener la lista de familias de la marca a la que pertenece la familia seleccionada.',
                ),
                error,
              );
              this.store.dispatch(
                purchasingConfigurationActions.SET_FAMILY_DETAILS_STATUS({
                  status: API_REQUEST_STATUS_FAILED,
                }),
              );
              return of(purchasingConfigurationActions.GET_TRADEMARK_FAMILIES_LIST_FAILED());
            }),
          );
        }
        this.store.dispatch(
          purchasingConfigurationActions.SET_FAMILY_DETAILS_STATUS({
            status: API_REQUEST_STATUS_SUCCEEDED,
          }),
        );
        return of(purchasingConfigurationActions.FETCH_FAMILY_SELECTED_DETAILS_LOAD());
      }),
    ),
  );

  // DOCS: Obtener Tarifas del agente aduanal
  getCustomsAgentConceptList$ = createEffect(() =>
    this.action$.pipe(
      ofType(catalogsActions.GET_LIST_CONCEPTS_CUSTOM_AGENT_SUCCESS),
      mergeMap(({listConceptoAgenteAduanal}) => {
        return of(
          purchasingConfigurationActions.GET_PROVIDER_CUSTOMS_AGENT_CONCEPT_SUCCESS({
            customsAgentsConceptList: listConceptoAgenteAduanal,
          }),
        );
      }),
    ),
  );

  // DOCS Obtiene los detalle de la configuracion de la familia
  $getFamilyConfiguration = createEffect(() =>
    this.action$.pipe(
      ofType(
        purchasingConfigurationActions.FETCH_FAMILY_SELECTED_DETAILS_LOAD,
        purchasingConfigurationActions.GET_TRADEMARK_FAMILIES_LIST_SUCCESS,
      ),
      withLatestFrom(
        this.store.select(catalogsSelectors.selectCustomsAgentsListForDropDownPqf),
        this.store.select(catalogsSelectors.selectCustomsListForDropDownPqf),
        this.store.select(catalogsSelectors.selectCustomsAgentsConceptListForDropPqf),
        this.store.select(purchasingConfigurationDetailsSelectors.selectFamilySelected),
      ),
      mergeMap(
        ([
          action,
          customAgentsDropDown,
          CustomListDropDown,
          CustonAgentsConceptDropDown,
          selectedFamily,
        ]) => {
          if (selectedFamily.needsToReload) {
            return this.configuracionProveedoresCalculosService
              .ConfiguracionProveedorExtensionConfiguracionProveedorCompra(
                selectedFamily.IdMarcaFamiliaProveedor,
              )
              .pipe(
                map((response: ConfProveedorCompra) => {
                  this.logger.debug(
                    servicesLogger.generateMessage(
                      FILE_NAME,
                      servicesLogger.LOG_SUCCEEDED,
                      'al obtener los detalles de la familia',
                    ),
                  );
                  return purchasingConfigurationActions.FETCH_FAMILY_SELECTED_DETAILS_SUCCESS({
                    configuration: buildConfigurationFamily({
                      trademarkFamiliesList: selectedFamily.configuration.trademarkFamiliesList,
                      trademarkFamilyId: selectedFamily.IdMarcaFamiliaProveedor,
                      customsAgentsConceptsList: CustonAgentsConceptDropDown,
                      customsList: CustomListDropDown,
                      customsAgentsList: customAgentsDropDown,
                      providerIsMexican: selectedFamily.Mexicano,
                      familyConfiguration: response,
                      trademarkFamilyProvider: selectedFamily.IdMarcaFamiliaProveedor,
                    }),
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
                  return of(purchasingConfigurationActions.FETCH_FAMILY_SELECTED_DETAILS_FAILED());
                }),
              );
          } else {
            return EMPTY;
          }
        },
      ),
    ),
  );
}
