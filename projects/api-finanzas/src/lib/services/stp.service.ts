/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiFinanzasConfiguration as __Configuration } from '../api-finanzas-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { StpAbono } from '../models/stp-abono';
import { QueryResultStpAbono } from '../models/query-result-stp-abono';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class STPService extends __BaseService {
  static readonly StpAbonoObtenerPath = '/StpAbono';
  static readonly StpAbonoGuardarOActualizarPath = '/StpAbono';
  static readonly StpAbonoQueryResultPath = '/StpAbono';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener StpAbono
   * @param idStpAbono undefined
   * @return OK
   */
  StpAbonoObtenerResponse(idStpAbono: string): __Observable<__StrictHttpResponse<StpAbono>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idStpAbono != null) __params = __params.set('idStpAbono', idStpAbono.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/StpAbono`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StpAbono>;
      })
    );
  }
  /**
   * Obtener StpAbono
   * @param idStpAbono undefined
   * @return OK
   */
  StpAbonoObtener(idStpAbono: string): __Observable<StpAbono> {
    return this.StpAbonoObtenerResponse(idStpAbono).pipe(
      __map(_r => _r.body as StpAbono)
    );
  }

  /**
   * GuardarOActualizar StpAbono
   * @param StpAbono undefined
   * @return OK
   */
  StpAbonoGuardarOActualizarResponse(StpAbono: StpAbono): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = StpAbono;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/StpAbono`,
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
   * GuardarOActualizar StpAbono
   * @param StpAbono undefined
   * @return OK
   */
  StpAbonoGuardarOActualizar(StpAbono: StpAbono): __Observable<string> {
    return this.StpAbonoGuardarOActualizarResponse(StpAbono).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult StpAbono
   * @param info undefined
   * @return OK
   */
  StpAbonoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultStpAbono>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/StpAbono`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultStpAbono>;
      })
    );
  }
  /**
   * QueryResult StpAbono
   * @param info undefined
   * @return OK
   */
  StpAbonoQueryResult(info: QueryInfo): __Observable<QueryResultStpAbono> {
    return this.StpAbonoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultStpAbono)
    );
  }
}

module STPService {
}

export { STPService }
