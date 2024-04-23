/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { VCotCotizacion } from '../models/vcot-cotizacion';
import { ParametroRecotizarCotizacion } from '../models/parametro-recotizar-cotizacion';
@Injectable({
  providedIn: 'root',
})
class ProcesosL01CotizacionRecotizarService extends __BaseService {
  static readonly RecotizarCotCotizacionProcessPath = '/RecotizarCotCotizacion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Recotiza la cotización con las partidas señaladas
   * @param param Parámetro
   * @return OK
   */
  RecotizarCotCotizacionProcessResponse(param: ParametroRecotizarCotizacion): __Observable<__StrictHttpResponse<VCotCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/RecotizarCotCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VCotCotizacion>;
      })
    );
  }
  /**
   * Recotiza la cotización con las partidas señaladas
   * @param param Parámetro
   * @return OK
   */
  RecotizarCotCotizacionProcess(param: ParametroRecotizarCotizacion): __Observable<VCotCotizacion> {
    return this.RecotizarCotCotizacionProcessResponse(param).pipe(
      __map(_r => _r.body as VCotCotizacion)
    );
  }
}

module ProcesosL01CotizacionRecotizarService {
}

export { ProcesosL01CotizacionRecotizarService }
