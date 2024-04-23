import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {EMPTY, forkJoin, Observable, of} from 'rxjs';

// Models
// Services
import {
  ConfiguracionProductosMarcasFamiliasService,
  ConfiguracionProductosMarcasService,
  ConfiguracionProveedoresRelacionesService,
  ConfiguracionProveedoresService,
  QueryResultVMarcaDetalle,
  QueryResultVMarcaFamilia,
  VMarcaDetalle,
  VMarcaFamiliaDetalle,
} from 'api-catalogos';

//  Actions
import {
  providerActions,
  providersDetailsActions,
  trademarkProviderActions,
} from '@appActions/forms/providers';

// Selectors
import * as selectTMProvider from '@appSelectors/forms/providers/providers-details/provider-form-step-4-trademark.selectors';

import {trademarkProviderSelectors} from '@appSelectors/forms/providers';

import * as servicesLogger from '@appUtil/logger';
import {NGXLogger} from 'ngx-logger';
import {filter, find, flatMap, isEmpty, map as _map} from 'lodash-es';
import {
  IVTrademarkDetail,
  IVTrademarkFamilyDetail,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-4-trademark.model';
import {QueryInfo} from 'api-logistica';

import {GET_CAT_PAIS_LOAD} from '@appActions/catalogs/catalogos.actions';
import {RETURN_EMPTY, SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';
import {buildTrademarkListAfterResponse} from '@appHelpers/catalogs/providers/trademark.helpers';

const FILE_NAME = 'provider-form-step-4-offer.effects.ts';

@Injectable({
  providedIn: 'root',
})
export class ProviderFormStep4TrademarkEffects {
  constructor(
    private store: Store,
    private actions: Actions,
    private logger: NGXLogger,
    private productsTrademarksService: ConfiguracionProductosMarcasService,
    private productsTrademarksFamiliesService: ConfiguracionProductosMarcasFamiliasService,
    private providersRelationsService: ConfiguracionProveedoresRelacionesService,
    private providersService: ConfiguracionProveedoresService,
  ) {}

  // DOCS: Realiza las peticiones necesarias al iniciar la pantalla
  initializeModule$ = createEffect(() =>
    this.actions.pipe(
      ofType(trademarkProviderActions.INITIALIZE_TRADEMARK_MODULE),
      mergeMap((action) => {
        this.store.dispatch(trademarkProviderActions.GET_ASSOCIATES_TRADEMARK_LOAD());
        this.store.dispatch(GET_CAT_PAIS_LOAD());
        this.store.dispatch(trademarkProviderActions.GET_TRADEMARK_LIST_LOAD({isFirstPage: true}));
        this.store.dispatch(trademarkProviderActions.GET_PROVIDER_LOAD());
        return of(RETURN_EMPTY());
      }),
    ),
  );

  // DOCS: Obtener proveedor
  getProvider$ = createEffect(() =>
    this.actions.pipe(
      ofType(trademarkProviderActions.GET_PROVIDER_LOAD),
      withLatestFrom(this.store.select(selectTMProvider.selectProviderQueryInfo)),
      mergeMap(([action, queryInfo]) => {
        return this.providersService.vProveedorQueryResult(queryInfo).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al obtener el proveedor que se esta trabajando.',
              ),
              response,
            );
            return trademarkProviderActions.GET_PROVIDER_SUCCESS({
              provider: response.Results[0],
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al obtener el proveedor que se esta trabajando.',
              ),
              error,
            );
            return of(trademarkProviderActions.GET_PROVIDER_FAILED({error}));
          }),
        );
      }),
    ),
  );

  // DOCS: Obtener lista de marcas
  getTradeMarkList$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        trademarkProviderActions.GET_TRADEMARK_LIST_LOAD,
        trademarkProviderActions.FILTER_TRADEMAK,
        trademarkProviderActions.SEARCH_FILTER_TRADEMAK,
      ),
      withLatestFrom(this.store.select(selectTMProvider.selectQueryInfoTradeMark)),
      mergeMap(([action, queryInfo]) => {
        return this.productsTrademarksService.vMarcaQueryResult(queryInfo).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al obtener la lista de marcas.',
              ),
              response,
            );
            return trademarkProviderActions.GET_TRADEMARK_LIST_SUCCESS({
              response: buildTrademarkListAfterResponse(response),
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al obtener la lista de marcas.',
              ),
              error,
            );
            return of(trademarkProviderActions.GET_TRADEMARK_LIST_ERROR({error}));
          }),
        );
      }),
    ),
  );

  // DOCS: Obtiene las marcas asociadas al proveedor
  getAssociatedTrademarks$ = createEffect(() =>
    this.actions.pipe(
      ofType(trademarkProviderActions.GET_ASSOCIATES_TRADEMARK_LOAD),
      withLatestFrom(
        this.store.select(trademarkProviderSelectors.selectQueryInfoAssociatedTradeMark),
      ),
      mergeMap(([action, queryInfo]) => {
        return this.providersRelationsService.vMarcaDetalleQueryResult(queryInfo).pipe(
          map((response: QueryResultVMarcaDetalle) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al obtener las marcas asociadas al proveedor.',
              ),
              response,
            );
            const results: Array<IVTrademarkDetail> = _map(
              response.Results,
              (trademark: IVTrademarkDetail) => ({
                ...trademark,
                vMarcaFamiliaDetalle: _map(
                  trademark.vMarcaFamiliaDetalle,
                  (family: IVTrademarkFamilyDetail) => ({
                    ...family,
                    IdProveedorBackup: family.IdProveedor,
                    MarcaFamiliaProveedor: family.MarcaFamiliaProveedor
                      ? {...family.MarcaFamiliaProveedor, original: true}
                      : family.MarcaFamiliaProveedor,
                  }),
                ),
              }),
            );

            return trademarkProviderActions.GET_ASSOCIATES_TRADEMARK_SUCCESS({
              list: results,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al obtener las marcas asociadas al proveedor.',
              ),
              error,
            );
            return of(
              trademarkProviderActions.GET_ASSOCIATES_TRADEMARK_ERROR({
                error,
              }),
            );
          }),
        );
      }),
    ),
  );

  // DOCS: Obtener lista de familias de una marca
  getTrademarkFamiliesList$ = createEffect(() =>
    this.actions.pipe(
      ofType(trademarkProviderActions.SET_ASSOCIATED_TRADEMARK),
      withLatestFrom(this.store.select(trademarkProviderSelectors.selectAssociatedList)),
      mergeMap(([{trademark}, associatedList]) => {
        // DOCS: Validar que para la marca arrastada no se hayan consultado sus MarcaFamilia aún
        const selectedTrademark = find(
          associatedList,
          (o: IVTrademarkDetail) => o.IdMarca === trademark.IdMarca,
        );
        if (selectedTrademark.vMarcaFamiliaDetalle) {
          return EMPTY;
        }
        const info: QueryInfo = {
          Filters: [
            {
              NombreFiltro: 'Activo',
              ValorFiltro: true,
            },
            {
              NombreFiltro: 'IdMarca',
              ValorFiltro: trademark.IdMarca,
            },
          ],
        };
        return this.productsTrademarksFamiliesService.vMarcaFamiliaQueryResult(info).pipe(
          map((response: QueryResultVMarcaFamilia) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al obtener la lista de familias de una marca.',
              ),
              response,
            );
            const trademarkFamilies: Array<IVTrademarkFamilyDetail> = _map(
              response.Results,
              (o: VMarcaFamiliaDetalle) => ({
                ...o,
                MarcaFamiliaProveedor: null,
                IdProveedorBackup: o.IdProveedor,
              }),
            );
            return trademarkProviderActions.GET_TRADEMARK_FAMILIES_LIST_SUCCESS({
              trademarkId: trademark.IdMarca,
              trademarkFamilies,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al obtener la lista de familias de una marca.',
              ),
              error,
            );
            return of(
              trademarkProviderActions.GET_TRADEMARK_FAMILIES_LIST_FAILED({
                error,
              }),
            );
          }),
        );
      }),
    ),
  );

  // DOCS: Asociar Marcas al Proveedor
  // DOCS: Guardar las MarcaFamilia
  saveTradeMarkFamily$ = createEffect(() =>
    this.actions.pipe(
      ofType(trademarkProviderActions.SAVE_ASSOCIATES_TRADEMARK_FAMILY_LOAD),
      withLatestFrom(this.store.select(trademarkProviderSelectors.selectAssociatedAndDeletedList)),
      mergeMap(([action, associatedAndDeletedList]) => {
        if (isEmpty(associatedAndDeletedList)) {
          return EMPTY;
        }
        this.store.dispatch(SET_LOADING({payload: true}));
        const request: Array<Observable<string>> = flatMap(
          _map(associatedAndDeletedList, (o: VMarcaDetalle) =>
            _map(o.vMarcaFamiliaDetalle, (i: IVTrademarkFamilyDetail) =>
              this.productsTrademarksFamiliesService.MarcaFamiliaGuardarOActualizar(i),
            ),
          ),
        );
        return forkJoin(request).pipe(
          map((response: Array<string>) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al guardar lista de MarcaFamilia.',
              ),
              response,
            );
            return trademarkProviderActions.SAVE_ASSOCIATES_TRADEMARK_FAMILY_SUCCESS({
              payload: associatedAndDeletedList,
            });
          }),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al guardar lista de MarcaFamilia.',
              ),
              error,
            );
            return of(
              trademarkProviderActions.SAVE_ASSOCIATES_TRADEMARK_FAMILY_FAILED({
                error,
              }),
            );
          }),
        );
      }),
    ),
  );

  // DOCS: Guardar y/o desactivar las MarcaFamiliaProveedor
  saveTradeMarkFamilyProvider$ = createEffect(() =>
    this.actions.pipe(
      ofType(trademarkProviderActions.SAVE_ASSOCIATES_TRADEMARK_FAMILY_SUCCESS),
      withLatestFrom(this.store.select(trademarkProviderSelectors.selectActualProvider)),
      mergeMap(([{payload}, {Nombre}]) => {
        if (isEmpty(payload)) {
          this.store.dispatch(SET_LOADING({payload: false}));
          return of(RETURN_EMPTY());
        }
        const request: Array<Observable<string>> = flatMap(
          _map(payload, (o: VMarcaDetalle) =>
            _map(
              filter(
                o.vMarcaFamiliaDetalle,
                (k: IVTrademarkFamilyDetail) => k.MarcaFamiliaProveedor,
              ),
              (i: IVTrademarkFamilyDetail) =>
                this.providersRelationsService.MarcaFamiliaProveedorGuardarOActualizar(
                  i.MarcaFamiliaProveedor,
                ),
            ),
          ),
        );
        return forkJoin(request).pipe(
          map((response: Array<string>) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al guardar lista de MarcaFamilia.',
              ),
              response,
            );
            this.store.dispatch(
              SET_LOADING_SUCCESS({
                active: true,
                message: `Has asociado Marcas al Proveedor ${Nombre}`,
              }),
            );
            this.store.dispatch(trademarkProviderActions.GET_ASSOCIATES_TRADEMARK_LOAD());
            this.store.dispatch(
              providersDetailsActions.SET_IS_IN_TRADEMARK({
                isInTrademark: false,
              }),
            );
            this.store.dispatch(
              providerActions.SET_ENABLE_EDIT({
                enableEdit: false,
              }),
            );
            return trademarkProviderActions.SAVE_ASSOCIATES_TRADEMARK_FAMILY_PROVIDER_SUCCESS({
              payload,
            });
          }),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al guardar lista de MarcaFamilia.',
              ),
              error,
            );
            return of(
              trademarkProviderActions.SAVE_ASSOCIATES_TRADEMARK_FAMILY_PROVIDER_FAILED({error}),
            );
          }),
        );
      }),
    ),
  );
}
