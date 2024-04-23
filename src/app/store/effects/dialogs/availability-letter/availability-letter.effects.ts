import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {
  ArchivoDetalle,
  GMSolicitarCartaDeDisponibilidad,
  ProcesosL05TramitarPedidoCartaDeDisponibilidadService,
} from 'api-logistica';
import {availabilityActions} from '@appActions/dialogs';
import {mergeMap, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import * as servicesLogger from '@appUtil/logger';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';

const FILE_NAME = 'availability-letter.effects.ts';

@Injectable()
export class AvailabilityLetterEffects {
  constructor(
    private action$: Actions,
    private logger: NGXLogger,
    private store: Store<AppState>,
    private procesosL05TramitarPedidoCartaDeDisponibilidadService: ProcesosL05TramitarPedidoCartaDeDisponibilidadService,
  ) {}

  // DOCS: Obtiene el archivo de carta de disponibilidad
  fetchAuthorizationDetails$ = createEffect(() =>
    this.action$.pipe(
      ofType(availabilityActions.SET_LEGAL_REPRESENTATIVE),
      mergeMap(({legalRepresentative, idPedido, inPreprocess}) => {
        const payload: GMSolicitarCartaDeDisponibilidad = {
          EnPretramitar: inPreprocess,
          IdEmpleadoRepresentanteLegal: legalRepresentative.value,
          IdPedido: idPedido,
        };
        this.store.dispatch(
          availabilityActions.SET_STATUS_FILE({status: API_REQUEST_STATUS_LOADING}),
        );
        return this.procesosL05TramitarPedidoCartaDeDisponibilidadService
          .CartaDeDisponibilidadGenerarCartaDeDisponibilidad(payload)
          .pipe(
            map((response: ArchivoDetalle) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_SUCCEEDED,
                  'Al obtener la carta de disponibilidad',
                ),
                response,
              );
              this.store.dispatch(
                availabilityActions.SET_STATUS_FILE({status: API_REQUEST_STATUS_SUCCEEDED}),
              );
              return availabilityActions.SET_FILE_AVAILABILITY_LETTER({
                file: response,
              });
            }),
            catchError((error) => {
              this.logger.debug(
                servicesLogger.generateMessage(
                  FILE_NAME,
                  servicesLogger.LOG_FAILED,
                  'Al obtener la carta de disponibilidad',
                ),
                error,
              );
              return of(availabilityActions.SET_STATUS_FILE({status: API_REQUEST_STATUS_FAILED}));
            }),
          );
      }),
    ),
  );
}
