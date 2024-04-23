/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CalcularMontosImportacion } from '../models/calcular-montos-importacion';
import { ParametroCalcularMontosImportacion } from '../models/parametro-calcular-montos-importacion';
@Injectable({
  providedIn: 'root',
})
class ProcesosL06OrdenDeCompraCargarFacturaCalculosService extends __BaseService {
  static readonly CalcularMontosImportacionProcessPath = '/CalcularMontosImportacion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Process CalcularMontosImportacion
   * @param param undefined
   * @return OK
   */
  CalcularMontosImportacionProcessResponse(param: ParametroCalcularMontosImportacion): __Observable<__StrictHttpResponse<CalcularMontosImportacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/CalcularMontosImportacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CalcularMontosImportacion>;
      })
    );
  }
  /**
   * Process CalcularMontosImportacion
   * @param param undefined
   * @return OK
   */
  CalcularMontosImportacionProcess(param: ParametroCalcularMontosImportacion): __Observable<CalcularMontosImportacion> {
    return this.CalcularMontosImportacionProcessResponse(param).pipe(
      __map(_r => _r.body as CalcularMontosImportacion)
    );
  }
}

module ProcesosL06OrdenDeCompraCargarFacturaCalculosService {
}

export { ProcesosL06OrdenDeCompraCargarFacturaCalculosService }
