import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, forkJoin, lastValueFrom, Observable, of} from 'rxjs';
import {filter, isEmpty, map as _map} from 'lodash-es';

// Actions
import {campaingsProviderActions, providerActions} from '@appActions/forms/providers';
import {RETURN_EMPTY, SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';

// Selectors
import {
  campaignsProviderSelectors,
  generalDataProviderSelectors,
  providersDetailsSelectors,
} from '@appSelectors/forms/providers';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import * as api from 'api-catalogos';
import {
  Campana,
  CampanaCatClasificacionProducto,
  CampanaMarca,
  CampanaProducto,
  CampanaProveedorFamilia,
  ConfiguracionProductosMarcasFamiliasService,
  QueryResultVCampana,
  QueryResultVMarcaFamilia,
  VAgrupadorCaracteristica,
  VCampana,
  VMarca,
  VMarcaFamilia,
  VProducto,
} from 'api-catalogos';
import {
  API_REQUEST_STATUS_DEFAULT,
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_UUID,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
import {extractID} from '@appUtil/util';
import {AppState} from '@appCore/core.state';
import {NGXLogger} from 'ngx-logger';
import {
  buildInitialCampaigns,
  typeActionFetchProvider,
} from '@appHelpers/catalogs/providers/campaign.helpers';
import * as servicesLogger from '@appUtil/logger';
import {
  initialProductCampaignItem,
  IVCampana,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-3-campaign.model';
import {buildingStringActionType} from '@appUtil/strings';

const FILE_NAME = 'provider-form-step-3';

@Injectable({
  providedIn: 'root',
})
export class ProviderFormStep3CampaignEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private configuracionProductosService: api.ConfiguracionProductosService,
    private configuracionProveedoresService: api.ConfiguracionProveedoresService,
    private configuracionProductosMarcasService: api.ConfiguracionProductosMarcasService,
    private configuracionProductosClasificacionService: api.ConfiguracionProductosClasificacionService,
    private configuracionProveedoresRelacionesService: api.ConfiguracionProveedoresRelacionesService,
    private configuracionProveedoresCampanasService: api.ConfiguracionProveedoresCampanasService,
    private productsTrademarkFamiliesConfigService: ConfiguracionProductosMarcasFamiliasService,
    private logger: NGXLogger,
  ) {}

  // DOCS: OBTIENE LOS PRODUCTOS
  getProducts = createEffect(() =>
    this.actions$.pipe(
      ofType(
        campaingsProviderActions.GET_PRODUCTS_LOAD,
        campaingsProviderActions.SET_SEARCH_TERM_PRODUCTS,
        campaingsProviderActions.CAMPAIGN_EDIT,
      ),
      withLatestFrom(
        this.store.select(generalDataProviderSelectors.getProviderId),
        this.store.select(campaignsProviderSelectors.needsToReloadProducts),
        this.store.select(campaignsProviderSelectors.currentPageProducts),
        this.store.select(campaignsProviderSelectors.searchTermProducts),
        this.store.select(campaignsProviderSelectors.getProducts),
        this.store.select(campaignsProviderSelectors.selectCampaignFilterSelected),
      ),
      mergeMap(
        ([
          action,
          providerId$,
          needsToReloadProducts$,
          currentPageProducts$,
          searchTermProducts$,
          productsList,
          filterSelected,
        ]) => {
          if (needsToReloadProducts$ || productsList.Results.length < productsList.TotalResults) {
            this.store.dispatch(
              campaingsProviderActions.SET_API_STATUS_PRODUCTS({
                status: 1,
              }),
            );
            const body = new FiltersOnlyActive();
            body.Filters.push({
              NombreFiltro: 'IdProveedor',
              ValorFiltro: providerId$,
            });
            if (searchTermProducts$) {
              body.Filters.push({
                NombreFiltro: 'Industria',
                ValorFiltro: searchTermProducts$,
              });
            }
            body.pageSize = PAGING_LIMIT;
            body.desiredPage = currentPageProducts$;
            return this.configuracionProductosService.vProductoQueryResult(body).pipe(
              map(
                (response) => {
                  this.store.dispatch(
                    campaingsProviderActions.SET_API_STATUS_PRODUCTS({
                      status: API_REQUEST_STATUS_SUCCEEDED,
                    }),
                  );
                  return campaingsProviderActions.GET_PRODUCTS_SUCCESS({
                    products: response,
                  });
                },
                catchError((error) => {
                  this.store.dispatch(
                    campaingsProviderActions.SET_API_STATUS_PRODUCTS({
                      status: API_REQUEST_STATUS_FAILED,
                    }),
                  );
                  return EMPTY;
                }),
              ),
            );
          }
          return EMPTY;
        },
      ),
    ),
  );

  // DOCS: Obtener Familias de las marcas asociadas al proveedor
  getTrademarkFamilies = createEffect(() =>
    this.actions$.pipe(
      ofType(
        campaingsProviderActions.FETCH_PROVIDER_FAMILIES_LOAD,
        campaingsProviderActions.SET_SEARCH_TERM_FAMILIES_PROVIDER,
        campaingsProviderActions.CAMPAIGN_EDIT,
      ),
      withLatestFrom(
        this.store.select(generalDataProviderSelectors.getProviderId),
        this.store.select(campaignsProviderSelectors.needsToReloadFamiliesProvider),
        this.store.select(campaignsProviderSelectors.currentPageProvidersFamilies),
        this.store.select(campaignsProviderSelectors.searchTermFamiliesProvider),
        this.store.select(campaignsProviderSelectors.getFamiliesProvider),
        this.store.select(campaignsProviderSelectors.selectCampaignFilterSelected),
      ),
      mergeMap(
        ([
          action,
          providerId,
          needsToReload,
          currentPAge,
          searchTerm,
          familiesList,
          filterSelected,
        ]) => {
          if (needsToReload || familiesList.Results.length < familiesList.TotalResults) {
            this.store.dispatch(
              campaingsProviderActions.SET_API_STATUS_FAMILIES_PROVIDER({
                status: API_REQUEST_STATUS_LOADING,
              }),
            );
            const body = new FiltersOnlyActive();
            body.Filters.push({
              NombreFiltro: 'IdProveedor',
              ValorFiltro: providerId,
            });
            body.Filters.push({
              NombreFiltro: 'TieneProveedorPrincipal',
              ValorFiltro: true,
            });
            if (searchTerm) {
              body.Filters.push({
                NombreFiltro: 'Descripcion',
                ValorFiltro: searchTerm,
              });
            }

            if (
              action.type ===
                buildingStringActionType('ProviderFormStep3Api', typeActionFetchProvider) &&
              action['idSelected'] === 'Familia'
            ) {
              body.pageSize = PAGING_LIMIT;
              body.desiredPage = currentPAge;
            }

            return this.productsTrademarkFamiliesConfigService.vMarcaFamiliaQueryResult(body).pipe(
              map((response: QueryResultVMarcaFamilia) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al obtener las familias de las marcas asociadas al proveedor',
                  ),
                  response,
                );
                this.store.dispatch(
                  campaingsProviderActions.SET_API_STATUS_FAMILIES_PROVIDER({
                    status: API_REQUEST_STATUS_SUCCEEDED,
                  }),
                );
                if (
                  action.type ===
                    buildingStringActionType('ProviderFormStep3Api', typeActionFetchProvider) &&
                  action['idSelected'] === 'Proveedor'
                ) {
                  return campaingsProviderActions.FETCH_PROVIDER_SUCCESS({
                    items: response,
                  });
                } else {
                  return campaingsProviderActions.FETCH_PROVIDER_FAMILIES_SUCCESS({
                    items: response,
                  });
                }
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al obtener las familias del proveedor',
                  ),
                  error,
                );
                return of(campaingsProviderActions.FETCH_PROVIDER_FAMILIES_FAILED);
              }),
            );
          }
          return EMPTY;
        },
      ),
    ),
  );

  // FIXME: Corregir por cambio en modelos
  getClassifications = createEffect(() =>
    this.actions$.pipe(
      ofType(
        campaingsProviderActions.GET_CLASSIFICATIONS_LOAD,
        campaingsProviderActions.SET_SEARCH_TERM_CLASSIFICATIONS,
        campaingsProviderActions.CAMPAIGN_EDIT,
      ),
      withLatestFrom(
        this.store.select(generalDataProviderSelectors.getProviderId),
        this.store.select(campaignsProviderSelectors.needsToReloadClassifications),
        this.store.select(campaignsProviderSelectors.currentPageClassifications),
        this.store.select(campaignsProviderSelectors.searchTermClassifications),
      ),
      mergeMap(
        ([
          action,
          providerId$,
          needsToReloadClassifications$,
          currentPageClassifications$,
          searchTermClassifications$,
        ]) => {
          if (needsToReloadClassifications$) {
            this.store.dispatch(
              campaingsProviderActions.SET_API_STATUS_CLASSIFICATIONS({
                status: API_REQUEST_STATUS_LOADING,
              }),
            );
            const body = new FiltersOnlyActive();
            body.Filters.push({
              NombreFiltro: 'IdProveedor',
              ValorFiltro: providerId$,
            });
            if (searchTermClassifications$) {
              body.Filters.push({
                NombreFiltro: 'AgrupadorCaracteristica',
                ValorFiltro: searchTermClassifications$,
              });
            }
            body.pageSize = PAGING_LIMIT;
            body.desiredPage = currentPageClassifications$;
            return this.configuracionProveedoresRelacionesService
              .vAgrupadorCaracteristicaQueryResult(body)
              .pipe(
                map(
                  (response) => {
                    this.store.dispatch(
                      campaingsProviderActions.SET_API_STATUS_CLASSIFICATIONS({
                        status: API_REQUEST_STATUS_SUCCEEDED,
                      }),
                    );
                    return campaingsProviderActions.GET_CLASSIFICATIONS_SUCCESS({
                      classifications: response,
                    });
                  },
                  catchError((error) => {
                    this.store.dispatch(
                      campaingsProviderActions.SET_API_STATUS_CLASSIFICATIONS({
                        status: API_REQUEST_STATUS_FAILED,
                      }),
                    );
                    return EMPTY;
                  }),
                ),
              );
          }
          return EMPTY;
        },
      ),
    ),
  );

  getTrademark = createEffect(() =>
    this.actions$.pipe(
      ofType(
        campaingsProviderActions.GET_TRADEMARK_LOAD,
        campaingsProviderActions.SET_SEARCH_TERM_TRADEMARK,
        campaingsProviderActions.CAMPAIGN_EDIT,
      ),
      withLatestFrom(
        this.store.select(generalDataProviderSelectors.getProviderId),
        this.store.select(campaignsProviderSelectors.needsToReloadTrademark),
        this.store.select(campaignsProviderSelectors.currentPageTrademark),
        this.store.select(campaignsProviderSelectors.searchTermTrademark),
        this.store.select(campaignsProviderSelectors.selectCampaignFilterSelected),
      ),
      mergeMap(
        ([
          action,
          providerId$,
          needsToReloadTrademark$,
          currentPageTrademark$,
          searchTermTrademark$,
          filterSelected,
        ]) => {
          if (needsToReloadTrademark$) {
            this.store.dispatch(
              campaingsProviderActions.SET_API_STATUS_TRADEMARK({
                status: API_REQUEST_STATUS_LOADING,
              }),
            );
            const body = new FiltersOnlyActive();
            body.Filters.push({
              NombreFiltro: 'IdProveedor',
              ValorFiltro: providerId$,
            });
            if (searchTermTrademark$) {
              body.Filters.push({
                NombreFiltro: 'Nombre',
                ValorFiltro: searchTermTrademark$,
              });
            }
            body.pageSize = PAGING_LIMIT;
            body.desiredPage = currentPageTrademark$;
            return this.configuracionProductosMarcasService.vMarcaQueryResult(body).pipe(
              map(
                (response) => {
                  this.store.dispatch(
                    campaingsProviderActions.SET_API_STATUS_TRADEMARK({
                      status: API_REQUEST_STATUS_SUCCEEDED,
                    }),
                  );
                  return campaingsProviderActions.GET_TRADEMARK_SUCCESS({
                    trademark: response,
                  });
                },
                catchError((error) => {
                  this.store.dispatch(
                    campaingsProviderActions.SET_API_STATUS_TRADEMARK({
                      status: API_REQUEST_STATUS_FAILED,
                    }),
                  );
                  return EMPTY;
                }),
              ),
            );
          }
          return EMPTY;
        },
      ),
    ),
  );

  saveCampaign$ = createEffect(() =>
    this.actions$.pipe(
      ofType(campaingsProviderActions.SAVE_CAMPAIGN_LOAD),
      withLatestFrom(
        this.store.select(campaignsProviderSelectors.getAddCampaing),
        this.store.select(campaignsProviderSelectors.selectCampaignForm),
        this.store.select(providersDetailsSelectors.selectedProvider),
        this.store.select(campaignsProviderSelectors.selectCampaignItemsRelatedToDelete),
      ),
      mergeMap(([action, addCampaign, campaignForm, provider, itemsToDelete]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        if (addCampaign) {
          const generalData: Campana = {
            ...campaignForm.generaData,
            IdProveedor: provider.IdProveedor,
          };
          return this.configuracionProveedoresCampanasService
            .CampanaGuardarOActualizar(generalData)
            .pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'al guardar datos de campaña',
                  ),
                  response,
                );
                this.store.dispatch(
                  campaingsProviderActions.SET_CAMPAIGN_ID({
                    IdCampana: extractID(response),
                  }),
                );
                if (!isEmpty(itemsToDelete)) {
                  return campaingsProviderActions.DELETE_ITEMS_RELATED_LOAD();
                } else {
                  return campaingsProviderActions.SAVE_ITEMS_RELATED_LOAD({
                    IdCampana: extractID(response),
                  });
                }
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'al guardar datos de campaña',
                  ),
                  error,
                );
                this.store.dispatch(SET_LOADING({payload: false}));
                return of(campaingsProviderActions.SAVE_CAMPAIGN_FAILED);
              }),
            );
        } else {
          this.store.dispatch(campaingsProviderActions.SET_DELETE_CAMPAIGN_LOAD());
          return EMPTY;
        }
      }),
    ),
  );

  deleteCampaign$ = createEffect(() =>
    this.actions$.pipe(
      ofType(campaingsProviderActions.SET_DELETE_CAMPAIGN_LOAD),
      withLatestFrom(this.store.select(campaignsProviderSelectors.selectCampaignsToDelete)),
      mergeMap(([action, campaigns]) => {
        const request: Array<any> = _map(campaigns, (o: VCampana) => {
          return this.configuracionProveedoresCampanasService.CampanaDesactivar(o.IdCampana);
        });
        return forkJoin(request).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al deshabilitar campañas',
              ),
              response,
            );
            this.store.dispatch(campaingsProviderActions.SET_DELETE_CAMPAIGN_SUCCESS());
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
            return SET_LOADING_SUCCESS({
              message: 'Has guardado',
              active: true,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al deshabilitar campañas.',
              ),
              error,
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );

  disableItemsRelated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(campaingsProviderActions.DELETE_ITEMS_RELATED_LOAD),
      withLatestFrom(
        this.store.select(campaignsProviderSelectors.selectCampaignItemsRelatedToDelete),
        this.store.select(campaignsProviderSelectors.selectCampaignFilterSelected),
        this.store.select(campaignsProviderSelectors.selectCampaignGeneralData),
      ),
      mergeMap(([action, itemsRelatedToDelete, filterSelected, campaignGeneralData]) => {
        switch (filterSelected.label) {
          case 'Producto':
            const productRequest: Array<any> = _map(itemsRelatedToDelete, (o) => {
              return this.configuracionProveedoresCampanasService.CampanaProductoDesactivar(
                o.IdCampanaProducto,
              );
            });
            return forkJoin(productRequest).pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al eliminar productos relacionados',
                  ),
                  response,
                );
                return campaingsProviderActions.SAVE_ITEMS_RELATED_LOAD({
                  IdCampana: campaignGeneralData.IdCampana,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al eliminar productos relacionados',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
          case 'Agrupador por característica':
            const AgroupRequest: Array<any> = _map(itemsRelatedToDelete, (o) => {
              return this.configuracionProveedoresCampanasService.CampanaCatClasificacionProductoDesactivar(
                o.IdCampanaCatClasificacionProducto,
              );
            });
            return forkJoin(AgroupRequest).pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al eliminar agrupadores relacionados',
                  ),
                  response,
                );
                return campaingsProviderActions.SAVE_ITEMS_RELATED_LOAD({
                  IdCampana: campaignGeneralData.IdCampana,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al elminar agrupadores relacionados',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
          case 'Marca':
            const tradeMarkRequest: Array<any> = _map(itemsRelatedToDelete, (o) => {
              return this.configuracionProveedoresCampanasService.CampanaMarcaDesactivar(
                o.IdCampanaMarca,
              );
            });
            return forkJoin(tradeMarkRequest).pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al eliminar marcas relacionados',
                  ),
                  response,
                );
                return campaingsProviderActions.SAVE_ITEMS_RELATED_LOAD({
                  IdCampana: campaignGeneralData.IdCampana,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al eliminar marcas relacionados',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
          default:
            const providerFamiliesRequest: Array<any> = _map(itemsRelatedToDelete, (o) => {
              return this.configuracionProveedoresCampanasService.CampanaProveedorFamiliaDesactivar(
                o.IdCampanaProveedorFamilia,
              );
            });
            return forkJoin(providerFamiliesRequest).pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al eliminar familias relacionados',
                  ),
                  response,
                );
                return campaingsProviderActions.SAVE_ITEMS_RELATED_LOAD({
                  IdCampana: campaignGeneralData.IdCampana,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al eliminar familias relacionados',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
        }
      }),
    ),
  );

  saveItemsRelated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(campaingsProviderActions.SAVE_ITEMS_RELATED_LOAD),
      withLatestFrom(
        this.store.select(campaignsProviderSelectors.selectCampaignItemsRelated),
        this.store.select(campaignsProviderSelectors.selectCampaignFilterSelected),
        this.store.select(campaignsProviderSelectors.editCampaign),
        this.store.select(campaignsProviderSelectors.selectCampaignGeneralData),
      ),
      mergeMap(([action, itemsRelated, filterSelected, editCampaign, generalData]) => {
        const general: IVCampana = generalData;
        let itemsToSave: Array<any>;
        const idCampaign = action.IdCampana;
        switch (filterSelected?.label) {
          case 'Producto':
            if (editCampaign) {
              itemsToSave = filter(
                general.itemCampaign.Results,
                (o: CampanaProducto): CampanaProducto => {
                  if (o.IdCampanaProducto === DEFAULT_UUID) {
                    return {
                      ...o,
                      IdCampana: idCampaign,
                    };
                  }
                },
              );
            } else {
              itemsToSave = _map(
                itemsRelated,
                (o: VProducto): CampanaProducto => {
                  return {
                    ...initialProductCampaignItem(),
                    IdProducto: o.IdProducto,
                    IdCampana: idCampaign,
                  };
                },
              );
            }
            if (isEmpty(itemsToSave)) {
              this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
              this.store.dispatch(campaingsProviderActions.SAVE_CAMPAIGN_SUCCESS());
              this.store.dispatch(SET_LOADING({payload: false}));

              this.store.dispatch(
                SET_LOADING_SUCCESS({
                  message: 'Has guardado',
                  active: true,
                }),
              );
              return EMPTY;
            }
            const productRequest: Array<any> = _map(itemsToSave, (o: CampanaProducto) => {
              return this.configuracionProveedoresCampanasService.CampanaProductoGuardarOActualizar(
                o,
              );
            });
            return forkJoin(productRequest).pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar productos relacionados',
                  ),
                  response,
                );
                this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
                this.store.dispatch(campaingsProviderActions.SAVE_CAMPAIGN_SUCCESS());
                this.store.dispatch(SET_LOADING({payload: false}));
                return SET_LOADING_SUCCESS({
                  message: 'Has guardado',
                  active: true,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar productos relacionados',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
          case 'Agrupador por característica':
            if (editCampaign) {
              itemsToSave = filter(
                general.itemCampaign.Results,
                (o: CampanaCatClasificacionProducto): CampanaCatClasificacionProducto => {
                  if (o.IdCampanaCatClasificacionProducto === DEFAULT_UUID) {
                    return {
                      ...o,
                      IdCampana: action.IdCampana,
                    };
                  }
                },
              );
            } else {
              itemsToSave = _map(
                itemsRelated,
                (o: VAgrupadorCaracteristica): CampanaCatClasificacionProducto => {
                  return {
                    ...initialProductCampaignItem(),
                    IdAgrupadorCaracteristica: o.IdAgrupadorCaracteristica,
                    IdCampana: action.IdCampana,
                  };
                },
              );
            }
            if (isEmpty(itemsToSave)) {
              this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
              this.store.dispatch(campaingsProviderActions.SAVE_CAMPAIGN_SUCCESS());
              this.store.dispatch(SET_LOADING({payload: false}));

              this.store.dispatch(
                SET_LOADING_SUCCESS({
                  message: 'Has guardado',
                  active: true,
                }),
              );
              return EMPTY;
            }
            const AgroupRequest: Array<any> = _map(
              itemsToSave,
              (o: CampanaCatClasificacionProducto) => {
                return this.configuracionProveedoresCampanasService.CampanaCatClasificacionProductoGuardarOActualizar(
                  o,
                );
              },
            );
            return forkJoin(AgroupRequest).pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar agrupadores relacionados',
                  ),
                  response,
                );
                this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
                this.store.dispatch(campaingsProviderActions.SAVE_CAMPAIGN_SUCCESS());
                this.store.dispatch(SET_LOADING({payload: false}));
                return SET_LOADING_SUCCESS({
                  message: 'Has guardado',
                  active: true,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar agrupadores relacionados',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
          case 'Marca':
            if (editCampaign) {
              itemsToSave = filter(
                general.itemCampaign.Results,
                (o: CampanaMarca): CampanaMarca => {
                  if (o.IdCampanaMarca === DEFAULT_UUID) {
                    return {
                      ...o,
                      IdCampana: action.IdCampana,
                    };
                  }
                },
              );
            } else {
              itemsToSave = _map(
                itemsRelated,
                (o: VMarca): CampanaMarca => {
                  return {
                    ...initialProductCampaignItem(),
                    IdMarca: o.IdMarca,
                    IdCampana: action.IdCampana,
                  };
                },
              );
            }
            if (isEmpty(itemsToSave)) {
              this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
              this.store.dispatch(campaingsProviderActions.SAVE_CAMPAIGN_SUCCESS());
              this.store.dispatch(SET_LOADING({payload: false}));

              this.store.dispatch(
                SET_LOADING_SUCCESS({
                  message: 'Has guardado',
                  active: true,
                }),
              );
              return EMPTY;
            }
            const tradeMarkRequest: Array<any> = _map(itemsToSave, (o: VMarca) => {
              return this.configuracionProveedoresCampanasService.CampanaMarcaGuardarOActualizar(o);
            });
            return forkJoin(tradeMarkRequest).pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar marcas relacionados',
                  ),
                  response,
                );
                this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
                this.store.dispatch(campaingsProviderActions.SAVE_CAMPAIGN_SUCCESS());
                this.store.dispatch(SET_LOADING({payload: false}));

                return SET_LOADING_SUCCESS({
                  message: 'Has guardado',
                  active: true,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar marcas relacionados',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
          default:
            if (editCampaign) {
              itemsToSave = filter(
                general.itemCampaign.Results,
                (o: CampanaProveedorFamilia): CampanaProveedorFamilia => {
                  if (o.IdCampanaProveedorFamilia === DEFAULT_UUID) {
                    return {
                      ...o,
                      IdCampana: action.IdCampana,
                    };
                  }
                },
              );
            } else {
              itemsToSave = _map(
                itemsRelated,
                (o: VMarcaFamilia): CampanaProveedorFamilia => {
                  return {
                    ...initialProductCampaignItem(),
                    IdMarcaFamiliaProveedor: o.IdMarcaFamiliaProveedor,
                    IdCampana: action.IdCampana,
                  };
                },
              );
            }
            if (isEmpty(itemsToSave)) {
              this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
              this.store.dispatch(campaingsProviderActions.SAVE_CAMPAIGN_SUCCESS());
              this.store.dispatch(SET_LOADING({payload: false}));

              this.store.dispatch(
                SET_LOADING_SUCCESS({
                  message: 'Has guardado',
                  active: true,
                }),
              );
              return EMPTY;
            }
            const providerFamiliesRequest: Array<any> = _map(itemsToSave, (o: VMarcaFamilia) => {
              return this.configuracionProveedoresCampanasService.CampanaProveedorFamiliaGuardarOActualizar(
                o,
              );
            });
            return forkJoin(providerFamiliesRequest).pipe(
              map((response) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_SUCCEEDED,
                    'Al guardar familias relacionados',
                  ),
                  response,
                );
                this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
                this.store.dispatch(campaingsProviderActions.SAVE_CAMPAIGN_SUCCESS());
                this.store.dispatch(SET_LOADING({payload: false}));

                return SET_LOADING_SUCCESS({
                  message: 'Has guardado',
                  active: true,
                });
              }),
              catchError((error) => {
                this.logger.debug(
                  servicesLogger.generateMessage(
                    FILE_NAME,
                    servicesLogger.LOG_FAILED,
                    'Al guardar familias relacionados',
                  ),
                  error,
                );
                return EMPTY;
              }),
            );
        }
      }),
    ),
  );

  // DOCS: OBTIENE UNA PAGINA MAS DE CAMPAÑAS
  fetchMoreCampaigns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(campaingsProviderActions.FETCH_MORE_CAMPAIGNS),
      withLatestFrom(this.store.select(campaignsProviderSelectors.selectFetchMoreCampaignListInfo)),
      mergeMap(([action, fetchMore]) => {
        if (
          action.event.endIndex !== fetchMore.itemList.length - 1 ||
          action.event.endIndex === fetchMore.itemsTotalLength - 1 ||
          fetchMore.itemsTotalLength === 0 ||
          fetchMore.desiredPage > fetchMore.totalPages ||
          fetchMore.itemList.length > fetchMore.itemsTotalLength ||
          fetchMore.listRequestStatus === 1
        ) {
          return of(RETURN_EMPTY());
        }
        return of(campaingsProviderActions.GET_CAPAIGNS_LOAD);
      }),
    ),
  );

  // DOCS: Obtiene la lista de campañas
  getCampaigns = createEffect(() =>
    this.actions$.pipe(
      ofType(
        campaingsProviderActions.GET_CAPAIGNS_LOAD,
        campaingsProviderActions.SET_SEARCH_TERM_CAMPAIGN,
        campaingsProviderActions.SET_SELECTED_TAB_OPTION,
      ),
      withLatestFrom(this.store.select(campaignsProviderSelectors.selectCampaignListQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.configuracionProveedoresCampanasService.vCampanaQueryResult(queryInfo).pipe(
          map((response: QueryResultVCampana) => {
            const mappedCampaigns = buildInitialCampaigns(response);
            this.store.dispatch(
              campaingsProviderActions.GET_CAPAIGNS_SUCCESS({
                campaigns: mappedCampaigns,
              }),
            );
            if (response.Results.length > 0) {
              this.store.dispatch(
                campaingsProviderActions.SET_SELECTED_CAMPAIGN({
                  campaignId:
                    response.TotalResults > 0 ? mappedCampaigns.Results[0].IdCampana : null,
                }),
              );
            }
            return SET_LOADING({payload: false});
          }),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));

            return of(campaingsProviderActions.GET_CAPAIGNS_FAILED());
          }),
        );
      }),
    ),
  );

  // DOCS: Obtener el detalle de la campaña seleccionada
  getItemsCampaign = createEffect(
    () =>
      this.actions$.pipe(
        ofType(campaingsProviderActions.SET_SELECTED_CAMPAIGN),
        withLatestFrom(
          this.store.select(campaignsProviderSelectors.selectedCampaignType),
          this.store.select(campaignsProviderSelectors.selectedCampaign),
          this.store.select(campaignsProviderSelectors.selectedCampaignDetailsQueryInfo),
        ),
        mergeMap(([action, campaignType, selected, queryInfo]) => {
          if (!selected.needsToReload) {
            return EMPTY;
          }
          this.store.dispatch(
            campaingsProviderActions.SET_API_STATUS_ITEMS_RELATED({
              status: API_REQUEST_STATUS_LOADING,
            }),
          );
          const service = this.addServiceForCampaignType(campaignType, queryInfo);
          if (!service) {
            this.store.dispatch(
              campaingsProviderActions.GET_CAMPAIGNS_DETAILS_SUCCESS({
                items: {
                  Results: [],
                  TotalResults: 0,
                },
                IdCampaign: selected.IdCampana,
              }),
            );
            this.store.dispatch(
              campaingsProviderActions.SET_API_STATUS_ITEMS_RELATED({
                status: API_REQUEST_STATUS_DEFAULT,
              }),
            );
            return EMPTY;
          }
          return service.pipe(
            map((response) => {
              this.store.dispatch(
                campaingsProviderActions.GET_CAMPAIGNS_DETAILS_SUCCESS({
                  items: response,
                  IdCampaign: selected.IdCampana,
                }),
              );
              return [response, campaignType, selected, action?.event];
            }),
            catchError((error) => {
              this.store.dispatch(
                campaingsProviderActions.SET_API_STATUS_ITEMS_RELATED({
                  status: API_REQUEST_STATUS_FAILED,
                }),
              );
              return EMPTY;
            }),
          );
        }),
        switchMap(async ([data, tipoCampana, selected, event]) => {
          const request = this.addServiceForVItemsCampaigns(tipoCampana, data);
          const arrayResponse = [];
          for (const item of request) {
            arrayResponse.push(await lastValueFrom(item));
          }
          const responseFiltered = this.filterResponseItemsView(arrayResponse);
          this.store.dispatch(
            campaingsProviderActions.GET_CAMPAIGNS_ITEMS_SUCCESS({
              items: responseFiltered,
              IdCampaign: selected.IdCampana,
            }),
          );
          this.store.dispatch(
            campaingsProviderActions.SET_API_STATUS_ITEMS_RELATED({
              status: API_REQUEST_STATUS_SUCCEEDED,
            }),
          );
          if (event) {
            this.store.dispatch(
              campaingsProviderActions.CAMPAIGN_EDIT({
                campaign: selected,
              }),
            );
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );

  filterResponseItemsView(data: Array<any>) {
    return _map(data, (o, index) => {
      return o.Results[0];
    });
  }

  addServiceForVItemsCampaigns(tipoCampana: string, data): Array<Observable<any>> {
    let service;
    let endPoint;
    let body = new FiltersOnlyActive();
    let NombreFiltro;
    switch (tipoCampana) {
      case 'Producto': {
        service = 'configuracionProductosService';
        endPoint = 'vProductoQueryResult';
        NombreFiltro = 'IdProducto';
        break;
      }
      case 'Agrupador por característica': {
        service = 'configuracionProveedoresRelacionesService';
        endPoint = 'vAgrupadorCaracteristicaQueryResult';
        NombreFiltro = 'IdAgrupadorCaracteristica';
        break;
      }
      case 'Marca': {
        service = 'configuracionProductosMarcasService';
        endPoint = 'vMarcaQueryResult';
        NombreFiltro = 'IdMarca';
        break;
      }
      default: {
        service = 'productsTrademarkFamiliesConfigService';
        endPoint = 'vMarcaFamiliaQueryResult';
        NombreFiltro = 'IdMarcaFamiliaProveedor';
      }
    }
    body.Filters.push({
      NombreFiltro,
      ValorFiltro: '',
    });
    const request: Array<Observable<any>> = [];
    for (const item of data.Results) {
      body = {
        ...body,
        Filters: body.Filters.map((itemBody, index) => {
          if (index === 1) {
            itemBody = {...itemBody, ValorFiltro: item[NombreFiltro]};
          }
          return itemBody;
        }),
      };
      request.push(this[service][endPoint](body));
    }
    return request;
  }

  addServiceForCampaignType(type: string, body): Observable<any> {
    let service;
    switch (type) {
      case 'Producto': {
        service = this.configuracionProveedoresCampanasService.CampanaProductoQueryResult(body);
        break;
      }
      case 'Agrupador por característica': {
        service = this.configuracionProveedoresCampanasService.CampanaCatClasificacionProductoQueryResult(
          body,
        );
        break;
      }
      case 'Marca': {
        service = this.configuracionProveedoresCampanasService.CampanaMarcaQueryResult(body);
        break;
      }
      default: {
        service = this.configuracionProveedoresCampanasService.CampanaProveedorFamiliaQueryResult(
          body,
        );
      }
    }
    return service;
  }
}
