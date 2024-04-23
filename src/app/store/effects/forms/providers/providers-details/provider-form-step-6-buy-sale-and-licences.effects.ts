import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import * as api from 'api-catalogos';
import {Empresa, ProveedorEmpresa, ProveedorRegalias} from 'api-catalogos';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {filter, find, isEmpty, map as _map} from 'lodash-es';

//  Actions
import * as providerActions from '@appActions/forms/providers';
import {SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';

// Selectors
import * as providerSelectors from '@appSelectors/forms/providers';
// Models
import {EMPTY, forkJoin, lastValueFrom, of} from 'rxjs';
import {FiltersOnlyActive, IFilters} from '@appModels/filters/Filters';
import {AppState} from '@appCore/core.state';
import {selectvEmpresas} from '@appSelectors/catalogs/catalogs.selectors';
import {ProviderCompanyList} from '@appModels/store/forms/providers/providers-details/provider-form-step-6-buy-sale-and-licences.model';
import {DEFAULT_UUID} from '@appUtil/common.protocols';
import * as servicesLogger from '@appUtil/logger';
import {NGXLogger} from 'ngx-logger';
import {extractID} from '@appUtil/util';

const FILE_NAME = 'Provider-sell-buy-licenses';

@Injectable({
  providedIn: 'root',
})
export class ProviderFormStep6BuySaleAndLicencesEffects {
  constructor(
    private actions$: Actions,
    private logger: NGXLogger,
    private store: Store<AppState>,
    private configuracionProveedoresService: api.ConfiguracionProveedoresService,
    private configuracionProveedoresRelacionesService: api.ConfiguracionProveedoresRelacionesService,
  ) {}

  // DOCS: OBTIENE LOS DATOS ACTUALIZADOS DEL PROVEEDOR
  getInitialState = createEffect(() =>
    this.actions$.pipe(
      ofType(providerActions.buySaleProviderActions.GET_INITIAL_STATE),
      withLatestFrom(
        this.store.select(providerSelectors.generalDataProviderSelectors.selectProvider),
        this.store.select(providerSelectors.buySaleProviderSelectors.selectMonthsOptions),
      ),
      mergeMap(([action, provider, months]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.configuracionProveedoresService.ProveedorObtener(provider.IdProveedor).pipe(
          map((response) => {
            this.store.dispatch(
              providerActions.buySaleProviderActions.FETCH_PROVIDER_SUCCESS({
                providerNode: response,
                months,
              }),
            );
            return providerActions.buySaleProviderActions.GET_PROVIDER_COMPANIES_DATA_LOAD();
          }),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
    ),
  );

  // DOCS: OBTIENE LAS EMPRESAS ASOCIADAS AL PROVEEDOR
  getProviderCompaniesData = createEffect(() =>
    this.actions$.pipe(
      ofType(providerActions.buySaleProviderActions.GET_PROVIDER_COMPANIES_DATA_LOAD),
      withLatestFrom(
        this.store.select(providerSelectors.generalDataProviderSelectors.getProviderId),
        this.store.select(selectvEmpresas),
      ),
      mergeMap(([action, providerId$, empresas]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const body = new FiltersOnlyActive();
        body.Filters.push({
          NombreFiltro: 'IdProveedor',
          ValorFiltro: providerId$,
        });
        return this.configuracionProveedoresRelacionesService
          .ProveedorEmpresaQueryResult(body)
          .pipe(
            map((response) => {
              const list: Array<ProviderCompanyList> = _map(
                empresas,
                (o: Empresa): ProviderCompanyList => {
                  return {
                    ...o,
                    selected: !isEmpty(
                      find(response.Results, (p: ProveedorEmpresa) => p.IdEmpresa === o.IdEmpresa),
                    ),
                    providerCompany: !isEmpty(
                      find(response.Results, (p: ProveedorEmpresa) => p.IdEmpresa === o.IdEmpresa),
                    )
                      ? find(response.Results, (p: ProveedorEmpresa) => p.IdEmpresa === o.IdEmpresa)
                      : {
                          Activo: true,
                          IdEmpresa: o.IdEmpresa,
                          IdProveedor: providerId$,
                          IdProveedorEmpresa: DEFAULT_UUID,
                          NumeroCliente: null,
                        },
                  };
                },
              );
              this.store.dispatch(
                providerActions.buySaleProviderActions.GET_PROVIDER_COMPANIES_DATA_SUCCESS({
                  providerCompanies: list,
                }),
              );
              return providerActions.buySaleProviderActions.GET_PROVIDER_LICENSES_DATA_LOAD();
            }),
            catchError((error) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(
                providerActions.buySaleProviderActions.GET_PROVIDER_COMPANIES_DATA_FAILED(),
              );
            }),
          );
      }),
    ),
  );

  // DOCS: OBTIENE LAS LICENCIAS DEL PROVEEDOR
  getProviderLicensesData = createEffect(() =>
    this.actions$.pipe(
      ofType(providerActions.buySaleProviderActions.GET_PROVIDER_LICENSES_DATA_LOAD),
      withLatestFrom(
        this.store.select(providerSelectors.generalDataProviderSelectors.getProviderId),
      ),
      mergeMap(([action, providerId$]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        const body: IFilters = {} as IFilters;
        body.Filters = [];
        body.Filters.push({
          NombreFiltro: 'IdProveedor',
          ValorFiltro: providerId$,
        });
        return this.configuracionProveedoresRelacionesService
          .ProveedorRegaliasQueryResult(body)
          .pipe(
            map((response) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              return providerActions.buySaleProviderActions.GET_PROVIDER_LICENSES_DATA_SUCCESS({
                providerLicenses: response.Results,
              });
            }),
            catchError((error) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              return of(providerActions.buySaleProviderActions.GET_PROVIDER_LICENSES_DATA_FAILED());
            }),
          );
      }),
    ),
  );

  // EFECTOS PARA GUARDADO

  // GUARDA PROVEEDOR
  saveOrUpdateProviderData = createEffect(() =>
    this.actions$.pipe(
      ofType(providerActions.buySaleProviderActions.SAVE_PROVIDER_DATA_LOAD),
      withLatestFrom(
        this.store.select(providerSelectors.buySaleProviderSelectors.selectProviderNode),
      ),
      mergeMap(([action, providerData]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        return this.configuracionProveedoresService.ProveedorGuardarOActualizar(providerData).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(FILE_NAME, 'Al Guardar Proveedor'),
              response,
            );
            this.store.dispatch(
              providerActions.buySaleProviderActions.SAVE_PROVIDER_DATA_SUCCESS(),
            );
            return providerActions.buySaleProviderActions.DISABLE_PROVIDER_COMPANY();
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(FILE_NAME, 'Al Guardar Proveedor'),
              error,
            );
            this.store.dispatch(SET_LOADING({payload: false}));
            return EMPTY;
          }),
        );
      }),
    ),
  );
  // DOCS: GUARDA LAS EMPRESAS ASOCIADAS AL PROVEEDOR
  disableProviderCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(providerActions.buySaleProviderActions.DISABLE_PROVIDER_COMPANY),
      withLatestFrom(
        this.store.select(providerSelectors.buySaleProviderSelectors.selectCompaniesToDelete),
      ),
      mergeMap(([action, companies]) => {
        if (companies.length > 0) {
          const request: Array<any> = _map(companies, (o: ProviderCompanyList) =>
            this.configuracionProveedoresRelacionesService.ProveedorEmpresaDesactivar(
              o.providerCompany.IdProveedorEmpresa,
            ),
          );
          return forkJoin(request).pipe(
            map((response: Array<any>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al eliminar Empresas',
                ),
                response,
              );
              companies = _map(
                companies,
                (o: ProviderCompanyList): ProviderCompanyList => {
                  return {
                    ...o,
                    providerCompany: {
                      ...o.providerCompany,
                      IdProveedorEmpresa: DEFAULT_UUID,
                    },
                  };
                },
              );
              this.store.dispatch(
                providerActions.buySaleProviderActions.DISABLE_PROVIDER_COMPANY_SUCCESS({
                  companies,
                }),
              );
              return providerActions.buySaleProviderActions.SAVE_COMPANIES_LOAD();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al eliminar Empresas',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
        }
        return of(providerActions.buySaleProviderActions.SAVE_COMPANIES_LOAD());
      }),
    ),
  );
  saveCompanies$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(providerActions.buySaleProviderActions.SAVE_COMPANIES_LOAD),
        withLatestFrom(
          this.store.select(providerSelectors.buySaleProviderSelectors.selectCompaniesToSave),
        ),
        mergeMap(async ([action, companies]) => {
          if (companies.length > 0) {
            for (const item of companies) {
              try {
                const cont = companies.indexOf(item);
                let IdProveedorEmpresa = await lastValueFrom(
                  this.configuracionProveedoresRelacionesService.ProveedorEmpresaGuardarOActualizar(
                    item.providerCompany,
                  ),
                );
                IdProveedorEmpresa = extractID(IdProveedorEmpresa);
                this.store.dispatch(
                  providerActions.buySaleProviderActions.SET_ID_PROVEEDOR_EMPRESA({
                    IdProveedorEmpresa,
                    index: cont,
                  }),
                );
              } catch (error) {
                return EMPTY;
              }
            }
          }
          this.store.dispatch(providerActions.buySaleProviderActions.DISABLE_LICENSES_LOAD());
        }),
      ),
    {dispatch: false},
  );
  disableLicenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(providerActions.buySaleProviderActions.DISABLE_LICENSES_LOAD),
      withLatestFrom(
        this.store.select(providerSelectors.buySaleProviderSelectors.selectLicensesToDelete),
      ),
      mergeMap(([action, licenses]) => {
        if (licenses.length > 0) {
          const request: Array<any> = _map(licenses, (o: ProveedorRegalias) =>
            this.configuracionProveedoresRelacionesService.ProveedorRegaliasDesactivar(
              o.IdProveedorRegalias,
            ),
          );
          return forkJoin(request).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al eliminar licensias',
                ),
                response,
              );
              this.store.dispatch(
                providerActions.buySaleProviderActions.DISABLE_LICENSES_SUCCESS(),
              );
              return providerActions.buySaleProviderActions.SAVE_PROVIDER_LICENSES_LOAD();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al eliminar licensias',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
        }
        return of(providerActions.buySaleProviderActions.SAVE_PROVIDER_LICENSES_LOAD());
      }),
    ),
  );

  saveLicenses$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(providerActions.buySaleProviderActions.SAVE_PROVIDER_LICENSES_LOAD),
        withLatestFrom(
          this.store.select(providerSelectors.buySaleProviderSelectors.selectProviderLicenses),
        ),
        mergeMap(async ([action, licenses]) => {
          const list = filter(licenses, (o: ProveedorRegalias) => o.Activo);
          if (list.length > 0) {
            try {
              for (const item of licenses) {
                const cont = licenses.indexOf(item);
                let IdProveedorRegalias = item.Activo
                  ? await lastValueFrom(
                      this.configuracionProveedoresRelacionesService.ProveedorRegaliasGuardarOActualizar(
                        item,
                      ),
                    )
                  : item.IdProveedorRegalias;
                IdProveedorRegalias = extractID(IdProveedorRegalias);
                this.store.dispatch(
                  providerActions.buySaleProviderActions.SET_ID_PROVEEDOR_REGALIAS({
                    IdProveedorRegalias,
                    index: cont,
                  }),
                );
              }
            } catch (error) {
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }
          }
          this.store.dispatch(SET_LOADING({payload: false}));
          this.store.dispatch(
            providerActions.providerActions.SET_ENABLE_EDIT({
              enableEdit: false,
            }),
          );
          this.store.dispatch(
            SET_LOADING_SUCCESS({
              active: true,
              message: 'Has guardado',
            }),
          );
        }),
      ),
    {dispatch: false},
  );
}
