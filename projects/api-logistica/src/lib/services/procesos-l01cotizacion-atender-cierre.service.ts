/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GMCotFletes } from '../models/gmcot-fletes';
@Injectable({
  providedIn: 'root',
})
class ProcesosL01CotizacionAtenderCierreService extends __BaseService {
  static readonly GMCotFletesProcessPath = '/ObtenerGMCotFletes';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Servicio para obtner los flestes de una cotizacion
   * @param IdCotCotizacion
   * @return OK
   */
  GMCotFletesProcessResponse(IdCotCotizacion: string): __Observable<__StrictHttpResponse<GMCotFletes>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdCotCotizacion != null) __params = __params.set('IdCotCotizacion', IdCotCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ObtenerGMCotFletes`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMCotFletes>;
      })
    );
  }
  /**
   * Servicio para obtner los flestes de una cotizacion
   * @param IdCotCotizacion
   * @return OK
   */
  GMCotFletesProcess(IdCotCotizacion: string): __Observable<GMCotFletes> {
    return this.GMCotFletesProcessResponse(IdCotCotizacion).pipe(
      __map(_r => _r.body as GMCotFletes)
    );
  }
}

module ProcesosL01CotizacionAtenderCierreService {
}

export { ProcesosL01CotizacionAtenderCierreService }
