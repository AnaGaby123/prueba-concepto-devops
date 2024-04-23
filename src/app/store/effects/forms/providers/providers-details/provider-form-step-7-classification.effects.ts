import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
// Actions
import * as classificationActions from '@appActions/forms/providers/providers-details/provider-form-step-7-classification.actions';
import {UPDATE_FAMILY_SELECTED} from '@appActions/forms/providers/providers-details/provider-form-step-7-classification.actions';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {getProviderId} from '@appSelectors/forms/providers/providers-details/provider-form-step-1-general-data.selectors';
import {
  AgrupadorCaracteristica,
  ConfiguracionProductosMarcasFamiliasService,
  ConfiguracionProveedoresRelacionesService,
  VMarcaFamilia,
} from 'api-catalogos';
import {Store} from '@ngrx/store';
import {EMPTY, forkJoin, Observable, of} from 'rxjs';
import {SET_LOADING, SET_LOADING_SUCCESS} from '@appActions/utils/utils.action';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import * as classifitacionSelector from '@appSelectors/forms/providers/providers-details/provider-form-step-7-classification.selectors';
import {filter, isEmpty, map as _map} from 'lodash-es';
import * as servicesLogger from '@appUtil/logger';
import {NGXLogger} from 'ngx-logger';
import {extractID} from '@appUtil/util';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';
import {providerActions} from '@appActions/forms/providers';

const FILE_NAME = 'ProviderFormStep7ClassificationEffects';

@Injectable({
  providedIn: 'root',
})
export class ProviderFormStep7ClassificationEffects {
  constructor(
    private store: Store,
    private logger: NGXLogger,
    private action$: Actions,
    private familyMarkService: ConfiguracionProductosMarcasFamiliasService,
    private configService: ConfiguracionProveedoresRelacionesService,
  ) {}

  // DOCS: obtiene las familias del proveedor
  getFamilies = createEffect(() =>
    this.action$.pipe(
      ofType(classificationActions.GET_FAMILIES_PROVIDER_LOAD),
      withLatestFrom(this.store.select(getProviderId)),
      mergeMap(([action, idProvider]) => {
        this.store.dispatch(
          classificationActions.SET_FAMILIES_PROVIDER_API_STATUS({
            familiesApiStatus: API_REQUEST_STATUS_LOADING,
          }),
        );
        this.store.dispatch(SET_LOADING({payload: true}));
        const body = new FiltersOnlyActive();
        body.Filters.push({
          NombreFiltro: 'IdProveedor',
          ValorFiltro: idProvider,
        });
        return this.familyMarkService.vMarcaFamiliaQueryResult(body).pipe(
          map((response) => {
            if (response.TotalResults > 0) {
              const list = _map(response.Results, (o: VMarcaFamilia, i) => ({
                ...o,
                isSelected: i === 0,
                conceptsList: [],
                deletedConceptsList: [],
                needsToReload: true,
              }));
              this.store.dispatch(
                classificationActions.GET_FAMILIES_PROVIDER_SUCCESS({
                  list,
                }),
              );
              this.store.dispatch(
                classificationActions.SET_FAMILIES_PROVIDER_API_STATUS({
                  familiesApiStatus: API_REQUEST_STATUS_SUCCEEDED,
                }),
              );
              return UPDATE_FAMILY_SELECTED({item: list[0]});
            } else {
              this.store.dispatch(
                classificationActions.SET_FAMILIES_PROVIDER_API_STATUS({
                  familiesApiStatus: API_REQUEST_STATUS_FAILED,
                }),
              );
              return SET_LOADING({payload: false});
            }
          }),
          catchError((error) => {
            this.store.dispatch(SET_LOADING({payload: false}));
            return of(classificationActions.GET_FAMILIES_PROVIDER_ERROR({error}));
          }),
        );
      }),
    ),
  );

  /*DOCS: Obtiene los agrupadores de la familia seleccionada*/
  getConceptsFamily = createEffect(() =>
    this.action$.pipe(
      ofType(
        classificationActions.SELECT_FAMILY_CARD,
        classificationActions.UPDATE_FAMILY_SELECTED,
      ),
      withLatestFrom(this.store.select(classifitacionSelector.selectFamily)),
      mergeMap(([state, selectedFamily]) => {
        if (isEmpty(selectedFamily.conceptsList) && selectedFamily.needsToReload) {
          const body = new FiltersOnlyActive();
          body.Filters.push({
            NombreFiltro: 'IdMarcaFamilia',
            ValorFiltro: selectedFamily.IdMarcaFamilia,
          });
          return this.configService.AgrupadorCaracteristicaQueryResult(body).pipe(
            map((response) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              return classificationActions.GET_CONCEPTS_FAMILY_SUCCESS({
                list: response.Results,
              });
            }),
            catchError((error) => {
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
        } else {
          this.store.dispatch(SET_LOADING({payload: false}));
        }
        return EMPTY;
      }),
    ),
  );

  // DOCS: GUARDADO
  deleteData$ = createEffect(() =>
    this.action$.pipe(
      ofType(classificationActions.SAVE_CONCEPTS_LOAD),
      withLatestFrom(this.store.select(classifitacionSelector.selectDeleteConcepts)),
      mergeMap(([action, concepts]) => {
        this.store.dispatch(SET_LOADING({payload: true}));
        if (concepts.length > 0) {
          const request: Array<any> = _map(concepts, (o: AgrupadorCaracteristica) =>
            this.configService.AgrupadorCaracteristicaDesactivar(o.IdAgrupadorCaracteristica),
          );
          return forkJoin(request).pipe(
            map((response) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al eliminar conceptos',
                ),
                response,
              );
              this.store.dispatch(classificationActions.DELETE_CONCEPTS_SUCCESS());
              return classificationActions.SAVE_FAMILIES_DATA();
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al eliminar conceptos',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
        }
        return of(classificationActions.SAVE_FAMILIES_DATA());
      }),
    ),
  );

  saveData$ = createEffect(() =>
    this.action$.pipe(
      ofType(classificationActions.SAVE_FAMILIES_DATA),
      withLatestFrom(this.store.select(classifitacionSelector.selectConceptsList)),
      mergeMap(([action, conceptsList]) => {
        const conceptsToSave = filter(
          conceptsList,
          (o: AgrupadorCaracteristica) => o.IdAgrupadorCaracteristica === DEFAULT_UUID,
        );

        if (!isEmpty(conceptsToSave)) {
          const requestArray: Array<Observable<any>> = _map(
            conceptsToSave,
            (o: AgrupadorCaracteristica) =>
              this.configService.AgrupadorCaracteristicaGuardarOActualizar(o),
          );

          return forkJoin(requestArray).pipe(
            map((response: Array<string>) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al guardar conceptos nuevos',
                ),
                response,
              );
              let counter = -1;
              conceptsList = _map(conceptsList, (o: AgrupadorCaracteristica, index: number) => {
                if (o.IdAgrupadorCaracteristica === DEFAULT_UUID) {
                  counter++;
                  return {
                    ...o,
                    IdAgrupadorCaracteristica: extractID(response[counter]),
                  };
                }
                return {...o};
              });
              this.store.dispatch(SET_LOADING({payload: false}));
              this.store.dispatch(
                SET_LOADING_SUCCESS({
                  active: true,
                  message: 'Has guardado',
                }),
              );
              this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
              return classificationActions.SAVE_FAMILIES_DATA_SUCCESS({
                conceptsList,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al eliminar conceptos',
                ),
                error,
              );
              this.store.dispatch(SET_LOADING({payload: false}));
              return EMPTY;
            }),
          );
        }
        this.store.dispatch(SET_LOADING({payload: false}));
        this.store.dispatch(providerActions.SET_ENABLE_EDIT({enableEdit: false}));
        return of(
          SET_LOADING_SUCCESS({
            active: true,
            message: 'Has guardado',
          }),
        );
      }),
    ),
  );
}
