/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { OcEnvio } from '../models/oc-envio';
import { QueryResultOcEnvio } from '../models/query-result-oc-envio';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class ProcesosL06OrdenDeCompraEnviosService extends __BaseService {
  static readonly ocEnvioObtenerPath = '/ocEnvio';
  static readonly ocEnvioGuardarOActualizarPath = '/ocEnvio';
  static readonly ocEnvioQueryResultPath = '/ocEnvio';
  static readonly ocEnvioDesactivarPath = '/ocEnvio';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de ocEnvio
   * @param idocEnvio Identificador de ocEnvio
   * @return OK
   */
  ocEnvioObtenerResponse(idocEnvio: string): __Observable<__StrictHttpResponse<OcEnvio>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocEnvio != null) __params = __params.set('idocEnvio', idocEnvio.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ocEnvio`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OcEnvio>;
      })
    );
  }
  /**
   * Consultar registro de ocEnvio
   * @param idocEnvio Identificador de ocEnvio
   * @return OK
   */
  ocEnvioObtener(idocEnvio: string): __Observable<OcEnvio> {
    return this.ocEnvioObtenerResponse(idocEnvio).pipe(
      __map(_r => _r.body as OcEnvio)
    );
  }

  /**
   * Guardar o actualizar ocEnvio
   * @param ocEnvio ocEnvio
   * @return OK
   */
  ocEnvioGuardarOActualizarResponse(ocEnvio: OcEnvio): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ocEnvio;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ocEnvio`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * Guardar o actualizar ocEnvio
   * @param ocEnvio ocEnvio
   * @return OK
   */
  ocEnvioGuardarOActualizar(ocEnvio: OcEnvio): __Observable<string> {
    return this.ocEnvioGuardarOActualizarResponse(ocEnvio).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ocEnvio
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocEnvioQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultOcEnvio>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ocEnvio`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultOcEnvio>;
      })
    );
  }
  /**
   * Consultar lista paginada de ocEnvio
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocEnvioQueryResult(info: QueryInfo): __Observable<QueryResultOcEnvio> {
    return this.ocEnvioQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultOcEnvio)
    );
  }

  /**
   * Desactivar registro de ocEnvio
   * @param idocEnvio Identificador de registro de ocEnvio
   * @return OK
   */
  ocEnvioDesactivarResponse(idocEnvio: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocEnvio != null) __params = __params.set('idocEnvio', idocEnvio.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ocEnvio`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * Desactivar registro de ocEnvio
   * @param idocEnvio Identificador de registro de ocEnvio
   * @return OK
   */
  ocEnvioDesactivar(idocEnvio: string): __Observable<string> {
    return this.ocEnvioDesactivarResponse(idocEnvio).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ProcesosL06OrdenDeCompraEnviosService {
}

export { ProcesosL06OrdenDeCompraEnviosService }
