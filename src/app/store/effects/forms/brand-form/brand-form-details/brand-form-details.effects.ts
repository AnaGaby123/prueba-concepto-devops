// Core imports
import {Injectable} from '@angular/core';
// Selectors
import {brandFormSelectorsDetails} from '@appSelectors/forms/brand-form';
// Actions
import {brandFormDetailsAction} from '@appActions/forms/brand-form';
// Models
import {AppState} from '@appModels/store/forms/forms.models';
// Services
import {
  ConfiguracionProductosMarcasFamiliasService,
  ConfiguracionProductosMarcasService,
} from 'api-catalogos';
// Dev tools
import {isEmpty, map as _map, uniqBy, filter, find} from 'lodash-es';
import {NGXLogger} from 'ngx-logger';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {DEFAULT_UUID} from '@appUtil/common.protocols';
import * as servicesLogger from '@appUtil/logger';
import {EMPTY, forkJoin, of} from 'rxjs';
import {buildBrandConfigItem} from '@appHelpers/catalogs/brands/brands.helpers';
import * as utilsActions from '@appActions/utils/utils.action';
import {RETURN_EMPTY, SET_LOADING} from '@appActions/utils/utils.action';
import {extractID} from '@appUtil/util';
import {
  IBrandItemConfig,
  initialIMarcaFamilia,
} from '@appModels/store/forms/brand-form/brand-form-details/brand-form-details.models';
import {Location} from '@angular/common';
import {buildImageNameSave} from '@appUtil/strings';
import {NEEDS_TO_RELOAD_TRADEMARKS} from '@appActions/catalogs/catalogos.actions';
// Utils
// Variables de apoyo
const FILE_NAME = 'brand-form-details-effects';

@Injectable({
  providedIn: 'root',
})
export class BrandFormDetailsEffects {
  constructor(
    private logger: NGXLogger,
    private store: Store<AppState>,
    private action$: Actions,
    private location: Location,
    private configBrandsProductsService: ConfiguracionProductosMarcasService,
    private configBrandsProductsFamiliesService: ConfiguracionProductosMarcasFamiliasService,
  ) {}

  // DOCS: OBTIENE LISTADO DE CONFIGURACIONES
  fetchItems$ = createEffect(() =>
    this.action$.pipe(
      ofType(brandFormDetailsAction.FETCH_ITEMS_DETAILS_LOAD),
      withLatestFrom(this.store.select(brandFormSelectorsDetails.selectBrandInfo)),
      mergeMap(([action, brandInfo]) => {
        return this.configBrandsProductsService
          .MarcaFamiliaCatIndustriaDetalleObtenerMarcaFamiliaIndustriaSector({
            Filters: [
              {
                NombreFiltro: 'IdMarca',
                ValorFiltro: brandInfo.IdMarca === DEFAULT_UUID ? null : brandInfo.IdMarca,
              },
            ],
          })
          .pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener familias',
                ),
                response,
              );
              return brandFormDetailsAction.FETCH_ITEMS_DETAILS_SUCCESS({
                items: buildBrandConfigItem(response),
              });
            }),
          );
      }),
      catchError((error) => {
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_FAILED,
            'Al obtener familias',
          ),
          error,
        );
        return EMPTY;
      }),
    ),
  );
  // DOCS Se guarda o actualiza los datos de una marca
  saveOrUpdateVMarcaConfiguration$ = createEffect(() =>
    this.action$.pipe(
      ofType(brandFormDetailsAction.HANDLE_SAVE_BRAND_LOAD),
      withLatestFrom(
        this.store.select(brandFormSelectorsDetails.selectBrandInfo),
        this.store.select(brandFormSelectorsDetails.brandDataHasChanges),
        this.store.select(brandFormSelectorsDetails.selectItemsToSave),
      ),
      mergeMap(([action, vMarca, dataHasChanges, itemsToSave]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        if (!dataHasChanges) {
          return of(brandFormDetailsAction.HANDLE_SAVE_ITEMS_LOAD());
        } else {
          if (vMarca.IdMarca === DEFAULT_UUID) {
            vMarca = {
              ...vMarca,
              NombreImagen: buildImageNameSave(vMarca.Nombre),
            };
          }
          return this.configBrandsProductsService.MarcaGuardarOActualizar(vMarca).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar una marca',
                ),
                response,
              );
              if (vMarca.IdMarca === DEFAULT_UUID) {
                this.store.dispatch(NEEDS_TO_RELOAD_TRADEMARKS());
              }
              this.store.dispatch(
                brandFormDetailsAction.HANDLE_SAVE_BRAND_SUCCESS({
                  IdMarca: extractID(response),
                }),
              );
              if (itemsToSave.length > 0) {
                return brandFormDetailsAction.HANDLE_SAVE_ITEMS_LOAD();
              } else {
                this.location.back();
                this.store.dispatch(brandFormDetailsAction.HANDLE_SAVE_ITEMS_SUCCESS());
                return utilsActions.SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Has guardado',
                });
              }
            }),
          );
        }
      }),
      catchError((error) => {
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_FAILED,
            'Al guardar una marca.',
          ),
          error,
        );
        this.store.dispatch(SET_LOADING({payload: false}));
        return of(RETURN_EMPTY());
      }),
    ),
  );

  //DOCS: Guarda la relacion y la configuracion de una marca
  saveBrandItems$ = createEffect(() =>
    this.action$.pipe(
      ofType(brandFormDetailsAction.HANDLE_SAVE_ITEMS_LOAD),
      withLatestFrom(
        this.store.select(brandFormSelectorsDetails.selectItemsToSave),
        this.store.select(brandFormSelectorsDetails.selectBrandInfo),
      ),
      mergeMap(([action, itemsToSave, brandInfo]) => {
        const newFamilies = filter(
          itemsToSave,
          (o: IBrandItemConfig) => o.IdMarcaFamilia === DEFAULT_UUID,
        );
        const filterItemsToSave = uniqBy(newFamilies, 'IdFamilia');
        if (isEmpty(filterItemsToSave)) {
          return of(itemsToSave);
        }
        const request: Array<any> = _map(filterItemsToSave, (o: IBrandItemConfig) => {
          return this.configBrandsProductsFamiliesService.MarcaFamiliaGuardarOActualizar({
            ...initialIMarcaFamilia(),
            IdMarca: brandInfo.IdMarca,
            IdFamilia: o.IdFamilia,
            IdMarcaFamilia: o.IdMarcaFamilia,
            IdProveedor: o.IdProveedor,
          });
        });
        return forkJoin(request).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar configuraciones MarcaFamilia',
              ),
            );
            return buildItemsToSave(itemsToSave, filterItemsToSave, response);
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar MarcaFamilia.',
              ),
              error,
            );
            return EMPTY;
          }),
        );
      }),
      switchMap((itemsToSave: Array<IBrandItemConfig>) => {
        const request: Array<any> = _map(itemsToSave, (o: IBrandItemConfig, index) => {
          return this.configBrandsProductsFamiliesService.MarcaFamiliaCatIndustriaGuardarOActualizar(
            o,
          );
        });
        return forkJoin(request).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Al guardar configuraciones de la marca',
              ),
            );
            this.location.back();
            this.store.dispatch(brandFormDetailsAction.HANDLE_SAVE_ITEMS_SUCCESS());
            return utilsActions.SET_LOADING_SUCCESS({
              active: true,
              message: 'Has guardado',
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Al guardar configuraciones de marca',
              ),
              error,
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );
}

const buildItemsToSave = (
  itemsToSave: Array<IBrandItemConfig>,
  filterItemsToSave: Array<IBrandItemConfig>,
  response: any,
): Array<IBrandItemConfig> => {
  filterItemsToSave = _map(
    filterItemsToSave,
    (o: IBrandItemConfig, index): IBrandItemConfig => {
      return {
        ...o,
        IdMarcaFamilia: extractID(response[index]),
      };
    },
  );
  return _map(itemsToSave, (o: IBrandItemConfig) => {
    const itemSameFamily = find(
      filterItemsToSave,
      (f: IBrandItemConfig) => f.IdFamilia === o.IdFamilia,
    );
    return {
      ...o,
      IdMarcaFamilia: itemSameFamily.IdMarcaFamilia,
    };
  });
};
