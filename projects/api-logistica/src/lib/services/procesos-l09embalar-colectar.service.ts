/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { AplicacionColectarDetalle } from '../models/aplicacion-colectar-detalle';
@Injectable({
  providedIn: 'root',
})
class ProcesosL09EmbalarColectarService extends __BaseService {
  static readonly ColectarMovilObtenerPath = '/AplicacionColectarDetalle';
  static readonly ColectarMovilProcesarPath = '/AplicacionColectarDetalle';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener ColectarMovil
   * @return OK
   */
  ColectarMovilObtenerResponse(): __Observable<__StrictHttpResponse<AplicacionColectarDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/AplicacionColectarDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<AplicacionColectarDetalle>;
      })
    );
  }
  /**
   * Obtener ColectarMovil
   * @return OK
   */
  ColectarMovilObtener(): __Observable<AplicacionColectarDetalle> {
    return this.ColectarMovilObtenerResponse().pipe(
      __map(_r => _r.body as AplicacionColectarDetalle)
    );
  }

  /**
   * Procesar ColectarMovil
   * @return OK
   */
  ColectarMovilProcesarResponse(): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/AplicacionColectarDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: (_r as HttpResponse<any>).body === 'true' }) as __StrictHttpResponse<boolean>
      })
    );
  }
  /**
   * Procesar ColectarMovil
   * @return OK
   */
  ColectarMovilProcesar(): __Observable<boolean> {
    return this.ColectarMovilProcesarResponse().pipe(
      __map(_r => _r.body as boolean)
    );
  }
}

module ProcesosL09EmbalarColectarService {
}

export { ProcesosL09EmbalarColectarService }
