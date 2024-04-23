import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import * as apiLogistic from 'api-logistica';
/*Actions Imports*/
import {uploadInvoiceListActions} from '@appActions/pendings/purchasing-manager/upload-invoice';
/*Selectors Imports*/
import {uploadInvoiceListSelectors} from '@appSelectors/pendings/purchasing-manager/upload-invoice';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {addRowIndex} from '@appUtil/util';
import {selectIdUser} from '@appSelectors/auth/auth.selectors';
import {EMPTY} from 'rxjs';
import * as servicesLogger from '@appUtil/logger';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';

const FILE_NAME = 'Upload-Invoice-List';

@Injectable()
export class UploadInvoiceListEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private logger: NGXLogger,
    private purchaseOrderServices: apiLogistic.ProcesosL06OrdenDeCompraDashboardService,
  ) {}

  fetchProviderList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        uploadInvoiceListActions.FETCH_PROVIDER_LOAD,
        uploadInvoiceListActions.SET_SEARCH_TERM,
        uploadInvoiceListActions.SET_SORT_SELECTED,
      ),
      withLatestFrom(this.store.select(uploadInvoiceListSelectors.selectParams)),
      mergeMap(([action, params]) => {
        this.store.dispatch(
          uploadInvoiceListActions.SET_STATUS_API({
            status: API_REQUEST_STATUS_LOADING,
          }),
        );
        return this.purchaseOrderServices.vProveedorCCargarFacturaQueryResult(params).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Consulta Proveedores.',
              ),
              response,
            );
            this.store.dispatch(
              uploadInvoiceListActions.SET_STATUS_API({
                status: API_REQUEST_STATUS_SUCCEEDED,
              }),
            );
            return uploadInvoiceListActions.FETCH_PROVIDER_SUCCESS({
              data: {
                TotalResults: response.TotalResults,
                Results: addRowIndex(params.desiredPage, params.pageSize, response.Results),
              },
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Consulta Proveedores.',
              ),
              error,
            );
            this.store.dispatch(
              uploadInvoiceListActions.SET_STATUS_API({
                status: API_REQUEST_STATUS_FAILED,
              }),
            );
            return EMPTY;
          }),
        );
      }),
    ),
  );

  fetchDonutChart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadInvoiceListActions.FETCH_DONUT_CHART_LOAD),
      withLatestFrom(this.store.select(selectIdUser)),
      mergeMap(([action, idUser]) => {
        return this.purchaseOrderServices.CargarFacturaDonaTotalesObtener(idUser).pipe(
          map((response) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'Consulta Datos Gráfica.',
              ),
              response,
            );
            return uploadInvoiceListActions.FETCH_DONUT_CHART_SUCCESS({
              data: response,
            });
          }),
          catchError((error) => {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'Consulta Datos Gráfica.',
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
