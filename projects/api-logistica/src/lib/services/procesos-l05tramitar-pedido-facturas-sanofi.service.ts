/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TpPartidaPedidoAddendaSanofi } from '../models/tp-partida-pedido-addenda-sanofi';
import { QueryResultTpPartidaPedidoAddendaSanofi } from '../models/query-result-tp-partida-pedido-addenda-sanofi';
import { QueryInfo } from '../models/query-info';
import { TpPedidoAddendaSanofi } from '../models/tp-pedido-addenda-sanofi';
import { QueryResultTpPedidoAddendaSanofi } from '../models/query-result-tp-pedido-addenda-sanofi';
@Injectable({
  providedIn: 'root',
})
class ProcesosL05TramitarPedidoFacturasSanofiService extends __BaseService {
  static readonly tpPartidaPedidoAddendaSanofiObtenerPath = '/tpPartidaPedidoAddendaSanofi';
  static readonly tpPartidaPedidoAddendaSanofiGuardarOActualizarPath = '/tpPartidaPedidoAddendaSanofi';
  static readonly tpPartidaPedidoAddendaSanofiQueryResultPath = '/tpPartidaPedidoAddendaSanofi';
  static readonly tpPartidaPedidoAddendaSanofiDesactivarPath = '/tpPartidaPedidoAddendaSanofi';
  static readonly tpPedidoAddendaSanofiObtenerPath = '/tpPedidoAddendaSanofi';
  static readonly tpPedidoAddendaSanofiGuardarOActualizarPath = '/tpPedidoAddendaSanofi';
  static readonly tpPedidoAddendaSanofiQueryResultPath = '/tpPedidoAddendaSanofi';
  static readonly tpPedidoAddendaSanofiDesactivarPath = '/tpPedidoAddendaSanofi';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener tpPartidaPedidoAddendaSanofi
   * @param idtpPartidaPedidoAddendaSanofi undefined
   * @return OK
   */
  tpPartidaPedidoAddendaSanofiObtenerResponse(idtpPartidaPedidoAddendaSanofi: string): __Observable<__StrictHttpResponse<TpPartidaPedidoAddendaSanofi>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpPartidaPedidoAddendaSanofi != null) __params = __params.set('idtpPartidaPedidoAddendaSanofi', idtpPartidaPedidoAddendaSanofi.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tpPartidaPedidoAddendaSanofi`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TpPartidaPedidoAddendaSanofi>;
      })
    );
  }
  /**
   * Obtener tpPartidaPedidoAddendaSanofi
   * @param idtpPartidaPedidoAddendaSanofi undefined
   * @return OK
   */
  tpPartidaPedidoAddendaSanofiObtener(idtpPartidaPedidoAddendaSanofi: string): __Observable<TpPartidaPedidoAddendaSanofi> {
    return this.tpPartidaPedidoAddendaSanofiObtenerResponse(idtpPartidaPedidoAddendaSanofi).pipe(
      __map(_r => _r.body as TpPartidaPedidoAddendaSanofi)
    );
  }

  /**
   * GuardarOActualizar tpPartidaPedidoAddendaSanofi
   * @param tpPartidaPedidoAddendaSanofi undefined
   * @return OK
   */
  tpPartidaPedidoAddendaSanofiGuardarOActualizarResponse(tpPartidaPedidoAddendaSanofi: TpPartidaPedidoAddendaSanofi): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = tpPartidaPedidoAddendaSanofi;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/tpPartidaPedidoAddendaSanofi`,
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
   * GuardarOActualizar tpPartidaPedidoAddendaSanofi
   * @param tpPartidaPedidoAddendaSanofi undefined
   * @return OK
   */
  tpPartidaPedidoAddendaSanofiGuardarOActualizar(tpPartidaPedidoAddendaSanofi: TpPartidaPedidoAddendaSanofi): __Observable<string> {
    return this.tpPartidaPedidoAddendaSanofiGuardarOActualizarResponse(tpPartidaPedidoAddendaSanofi).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult tpPartidaPedidoAddendaSanofi
   * @param info undefined
   * @return OK
   */
  tpPartidaPedidoAddendaSanofiQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultTpPartidaPedidoAddendaSanofi>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/tpPartidaPedidoAddendaSanofi`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultTpPartidaPedidoAddendaSanofi>;
      })
    );
  }
  /**
   * QueryResult tpPartidaPedidoAddendaSanofi
   * @param info undefined
   * @return OK
   */
  tpPartidaPedidoAddendaSanofiQueryResult(info: QueryInfo): __Observable<QueryResultTpPartidaPedidoAddendaSanofi> {
    return this.tpPartidaPedidoAddendaSanofiQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultTpPartidaPedidoAddendaSanofi)
    );
  }

  /**
   * Desactivar tpPartidaPedidoAddendaSanofi
   * @param idtpPartidaPedidoAddendaSanofi undefined
   * @return OK
   */
  tpPartidaPedidoAddendaSanofiDesactivarResponse(idtpPartidaPedidoAddendaSanofi: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpPartidaPedidoAddendaSanofi != null) __params = __params.set('idtpPartidaPedidoAddendaSanofi', idtpPartidaPedidoAddendaSanofi.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/tpPartidaPedidoAddendaSanofi`,
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
   * Desactivar tpPartidaPedidoAddendaSanofi
   * @param idtpPartidaPedidoAddendaSanofi undefined
   * @return OK
   */
  tpPartidaPedidoAddendaSanofiDesactivar(idtpPartidaPedidoAddendaSanofi: string): __Observable<string> {
    return this.tpPartidaPedidoAddendaSanofiDesactivarResponse(idtpPartidaPedidoAddendaSanofi).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener tpPedidoAddendaSanofi
   * @param idtpPedidoAddendaSanofi undefined
   * @return OK
   */
  tpPedidoAddendaSanofiObtenerResponse(idtpPedidoAddendaSanofi: string): __Observable<__StrictHttpResponse<TpPedidoAddendaSanofi>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpPedidoAddendaSanofi != null) __params = __params.set('idtpPedidoAddendaSanofi', idtpPedidoAddendaSanofi.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tpPedidoAddendaSanofi`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TpPedidoAddendaSanofi>;
      })
    );
  }
  /**
   * Obtener tpPedidoAddendaSanofi
   * @param idtpPedidoAddendaSanofi undefined
   * @return OK
   */
  tpPedidoAddendaSanofiObtener(idtpPedidoAddendaSanofi: string): __Observable<TpPedidoAddendaSanofi> {
    return this.tpPedidoAddendaSanofiObtenerResponse(idtpPedidoAddendaSanofi).pipe(
      __map(_r => _r.body as TpPedidoAddendaSanofi)
    );
  }

  /**
   * GuardarOActualizar tpPedidoAddendaSanofi
   * @param tpPedidoAddendaSanofi undefined
   * @return OK
   */
  tpPedidoAddendaSanofiGuardarOActualizarResponse(tpPedidoAddendaSanofi: TpPedidoAddendaSanofi): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = tpPedidoAddendaSanofi;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/tpPedidoAddendaSanofi`,
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
   * GuardarOActualizar tpPedidoAddendaSanofi
   * @param tpPedidoAddendaSanofi undefined
   * @return OK
   */
  tpPedidoAddendaSanofiGuardarOActualizar(tpPedidoAddendaSanofi: TpPedidoAddendaSanofi): __Observable<string> {
    return this.tpPedidoAddendaSanofiGuardarOActualizarResponse(tpPedidoAddendaSanofi).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult tpPedidoAddendaSanofi
   * @param info undefined
   * @return OK
   */
  tpPedidoAddendaSanofiQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultTpPedidoAddendaSanofi>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/tpPedidoAddendaSanofi`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultTpPedidoAddendaSanofi>;
      })
    );
  }
  /**
   * QueryResult tpPedidoAddendaSanofi
   * @param info undefined
   * @return OK
   */
  tpPedidoAddendaSanofiQueryResult(info: QueryInfo): __Observable<QueryResultTpPedidoAddendaSanofi> {
    return this.tpPedidoAddendaSanofiQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultTpPedidoAddendaSanofi)
    );
  }

  /**
   * Desactivar tpPedidoAddendaSanofi
   * @param idtpPedidoAddendaSanofi undefined
   * @return OK
   */
  tpPedidoAddendaSanofiDesactivarResponse(idtpPedidoAddendaSanofi: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpPedidoAddendaSanofi != null) __params = __params.set('idtpPedidoAddendaSanofi', idtpPedidoAddendaSanofi.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/tpPedidoAddendaSanofi`,
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
   * Desactivar tpPedidoAddendaSanofi
   * @param idtpPedidoAddendaSanofi undefined
   * @return OK
   */
  tpPedidoAddendaSanofiDesactivar(idtpPedidoAddendaSanofi: string): __Observable<string> {
    return this.tpPedidoAddendaSanofiDesactivarResponse(idtpPedidoAddendaSanofi).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ProcesosL05TramitarPedidoFacturasSanofiService {
}

export { ProcesosL05TramitarPedidoFacturasSanofiService }
