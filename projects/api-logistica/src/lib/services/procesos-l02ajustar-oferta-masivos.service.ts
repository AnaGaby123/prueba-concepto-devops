/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AjusteOfertaMasivoCotizacionParametro } from '../models/ajuste-oferta-masivo-cotizacion-parametro';
@Injectable({
  providedIn: 'root',
})
class ProcesosL02AjustarOfertaMasivosService extends __BaseService {
  static readonly AjusteOfertaMasivoCotizacionProcessPath = '/AjusteOfertaMasivoCotizacion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Process AjusteOfertaMasivoCotizacion
   * @param param undefined
   * @return OK
   */
  AjusteOfertaMasivoCotizacionProcessResponse(param: AjusteOfertaMasivoCotizacionParametro): __Observable<__StrictHttpResponse<AjusteOfertaMasivoCotizacionParametro>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/AjusteOfertaMasivoCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AjusteOfertaMasivoCotizacionParametro>;
      })
    );
  }
  /**
   * Process AjusteOfertaMasivoCotizacion
   * @param param undefined
   * @return OK
   */
  AjusteOfertaMasivoCotizacionProcess(param: AjusteOfertaMasivoCotizacionParametro): __Observable<AjusteOfertaMasivoCotizacionParametro> {
    return this.AjusteOfertaMasivoCotizacionProcessResponse(param).pipe(
      __map(_r => _r.body as AjusteOfertaMasivoCotizacionParametro)
    );
  }
}

module ProcesosL02AjustarOfertaMasivosService {
}

export { ProcesosL02AjustarOfertaMasivosService }
