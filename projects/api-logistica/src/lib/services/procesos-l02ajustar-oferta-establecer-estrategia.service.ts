/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TupleDecimalDecimalInt32 } from '../models/tuple-decimal-decimal-int-32';
@Injectable({
  providedIn: 'root',
})
class ProcesosL02AjustarOfertaEstablecerEstrategiaService extends __BaseService {
  static readonly TiposPartidaPorCotizacionProcessPath = '/TiposPartidaPorCotizacion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar lista totales de partidas por cotizaxion
   * @param IdCotCotizacion IdCotCotizacion
   * @return OK
   */
  TiposPartidaPorCotizacionProcessResponse(IdCotCotizacion: string): __Observable<__StrictHttpResponse<{[key: string]: TupleDecimalDecimalInt32}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdCotCotizacion != null) __params = __params.set('IdCotCotizacion', IdCotCotizacion.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/TiposPartidaPorCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{[key: string]: TupleDecimalDecimalInt32}>;
      })
    );
  }
  /**
   * Consultar lista totales de partidas por cotizaxion
   * @param IdCotCotizacion IdCotCotizacion
   * @return OK
   */
  TiposPartidaPorCotizacionProcess(IdCotCotizacion: string): __Observable<{[key: string]: TupleDecimalDecimalInt32}> {
    return this.TiposPartidaPorCotizacionProcessResponse(IdCotCotizacion).pipe(
      __map(_r => _r.body as {[key: string]: TupleDecimalDecimalInt32})
    );
  }
}

module ProcesosL02AjustarOfertaEstablecerEstrategiaService {
}

export { ProcesosL02AjustarOfertaEstablecerEstrategiaService }
