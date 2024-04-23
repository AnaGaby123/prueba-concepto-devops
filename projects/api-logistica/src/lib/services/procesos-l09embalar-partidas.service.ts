/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { EmbPartida } from '../models/emb-partida';
import { QueryResultEmbPartida } from '../models/query-result-emb-partida';
import { QueryInfo } from '../models/query-info';
import { QueryResultVTpPartidaAEmbalar } from '../models/query-result-vtp-partida-aembalar';
@Injectable({
  providedIn: 'root',
})
class ProcesosL09EmbalarPartidasService extends __BaseService {
  static readonly embPartidaObtenerPath = '/embPartida';
  static readonly embPartidaGuardarOActualizarPath = '/embPartida';
  static readonly embPartidaQueryResultPath = '/embPartida';
  static readonly embPartidaDesactivarPath = '/embPartida';
  static readonly vTpPartidaAEmbalarQueryResultPath = '/vTpPartidaAEmbalar';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de embPartida
   * @param idembPartida Identificador de embPartida
   * @return OK
   */
  embPartidaObtenerResponse(idembPartida: string): __Observable<__StrictHttpResponse<EmbPartida>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idembPartida != null) __params = __params.set('idembPartida', idembPartida.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/embPartida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<EmbPartida>;
      })
    );
  }
  /**
   * Consultar registro de embPartida
   * @param idembPartida Identificador de embPartida
   * @return OK
   */
  embPartidaObtener(idembPartida: string): __Observable<EmbPartida> {
    return this.embPartidaObtenerResponse(idembPartida).pipe(
      __map(_r => _r.body as EmbPartida)
    );
  }

  /**
   * Guardar o actualizar embPartida
   * @param embPartida embPartida
   * @return OK
   */
  embPartidaGuardarOActualizarResponse(embPartida: EmbPartida): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = embPartida;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/embPartida`,
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
   * Guardar o actualizar embPartida
   * @param embPartida embPartida
   * @return OK
   */
  embPartidaGuardarOActualizar(embPartida: EmbPartida): __Observable<string> {
    return this.embPartidaGuardarOActualizarResponse(embPartida).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de embPartida
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  embPartidaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultEmbPartida>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/embPartida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultEmbPartida>;
      })
    );
  }
  /**
   * Consultar lista paginada de embPartida
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  embPartidaQueryResult(info: QueryInfo): __Observable<QueryResultEmbPartida> {
    return this.embPartidaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultEmbPartida)
    );
  }

  /**
   * Desactivar registro de embPartida
   * @param idembPartida Identificador de registro de embPartida
   * @return OK
   */
  embPartidaDesactivarResponse(idembPartida: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idembPartida != null) __params = __params.set('idembPartida', idembPartida.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/embPartida`,
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
   * Desactivar registro de embPartida
   * @param idembPartida Identificador de registro de embPartida
   * @return OK
   */
  embPartidaDesactivar(idembPartida: string): __Observable<string> {
    return this.embPartidaDesactivarResponse(idembPartida).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de vTpPartidaAEmbalar
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vTpPartidaAEmbalarQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVTpPartidaAEmbalar>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vTpPartidaAEmbalar`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVTpPartidaAEmbalar>;
      })
    );
  }
  /**
   * Consultar lista paginada de vTpPartidaAEmbalar
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vTpPartidaAEmbalarQueryResult(info: QueryInfo): __Observable<QueryResultVTpPartidaAEmbalar> {
    return this.vTpPartidaAEmbalarQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVTpPartidaAEmbalar)
    );
  }
}

module ProcesosL09EmbalarPartidasService {
}

export { ProcesosL09EmbalarPartidasService }
