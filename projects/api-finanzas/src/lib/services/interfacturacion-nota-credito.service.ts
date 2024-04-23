/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiFinanzasConfiguration as __Configuration } from '../api-finanzas-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FiNotaCredito } from '../models/fi-nota-credito';
import { QueryResultFiNotaCredito } from '../models/query-result-fi-nota-credito';
import { QueryInfo } from '../models/query-info';
import { FiNotaCreditoPartida } from '../models/fi-nota-credito-partida';
import { QueryResultFiNotaCreditoPartida } from '../models/query-result-fi-nota-credito-partida';
@Injectable({
  providedIn: 'root',
})
class InterfacturacionNotaCreditoService extends __BaseService {
  static readonly fiNotaCreditoObtenerPath = '/fiNotaCredito';
  static readonly fiNotaCreditoGuardarOActualizarPath = '/fiNotaCredito';
  static readonly fiNotaCreditoQueryResultPath = '/fiNotaCredito';
  static readonly fiNotaCreditoDesactivarPath = '/fiNotaCredito';
  static readonly fiNotaCreditoPartidaObtenerPath = '/fiNotaCreditoPartida';
  static readonly fiNotaCreditoPartidaGuardarOActualizarPath = '/fiNotaCreditoPartida';
  static readonly fiNotaCreditoPartidaQueryResultPath = '/fiNotaCreditoPartida';
  static readonly fiNotaCreditoPartidaDesactivarPath = '/fiNotaCreditoPartida';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener un agente aduanal por su idfiNotaCredito.
   * @param idfiNotaCredito Identificador del agente aduanal
   * @return OK
   */
  fiNotaCreditoObtenerResponse(idfiNotaCredito: string): __Observable<__StrictHttpResponse<FiNotaCredito>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfiNotaCredito != null) __params = __params.set('idfiNotaCredito', idfiNotaCredito.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fiNotaCredito`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FiNotaCredito>;
      })
    );
  }
  /**
   * Obtener un agente aduanal por su idfiNotaCredito.
   * @param idfiNotaCredito Identificador del agente aduanal
   * @return OK
   */
  fiNotaCreditoObtener(idfiNotaCredito: string): __Observable<FiNotaCredito> {
    return this.fiNotaCreditoObtenerResponse(idfiNotaCredito).pipe(
      __map(_r => _r.body as FiNotaCredito)
    );
  }

  /**
   * Guardar o actualizar un agente aduanal
   * @param fiNotaCredito Objeto de agente aduanal
   * @return OK
   */
  fiNotaCreditoGuardarOActualizarResponse(fiNotaCredito: FiNotaCredito): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fiNotaCredito;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fiNotaCredito`,
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
   * Guardar o actualizar un agente aduanal
   * @param fiNotaCredito Objeto de agente aduanal
   * @return OK
   */
  fiNotaCreditoGuardarOActualizar(fiNotaCredito: FiNotaCredito): __Observable<string> {
    return this.fiNotaCreditoGuardarOActualizarResponse(fiNotaCredito).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de agente aduanal.
   * @param info Objeto de tipo QueryInfo para filtrar agentes aduanales.
   * @return OK
   */
  fiNotaCreditoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFiNotaCredito>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fiNotaCredito`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFiNotaCredito>;
      })
    );
  }
  /**
   * Obtener lista de agente aduanal.
   * @param info Objeto de tipo QueryInfo para filtrar agentes aduanales.
   * @return OK
   */
  fiNotaCreditoQueryResult(info: QueryInfo): __Observable<QueryResultFiNotaCredito> {
    return this.fiNotaCreditoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFiNotaCredito)
    );
  }

  /**
   * Desactivar un agente aduanal
   * @param idfiNotaCredito Identificador de agente aduanal a desactivar
   * @return OK
   */
  fiNotaCreditoDesactivarResponse(idfiNotaCredito: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfiNotaCredito != null) __params = __params.set('idfiNotaCredito', idfiNotaCredito.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fiNotaCredito`,
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
   * Desactivar un agente aduanal
   * @param idfiNotaCredito Identificador de agente aduanal a desactivar
   * @return OK
   */
  fiNotaCreditoDesactivar(idfiNotaCredito: string): __Observable<string> {
    return this.fiNotaCreditoDesactivarResponse(idfiNotaCredito).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener un agente aduanal por su idfiNotaCreditoPartida.
   * @param idfiNotaCreditoPartida Identificador del agente aduanal
   * @return OK
   */
  fiNotaCreditoPartidaObtenerResponse(idfiNotaCreditoPartida: string): __Observable<__StrictHttpResponse<FiNotaCreditoPartida>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfiNotaCreditoPartida != null) __params = __params.set('idfiNotaCreditoPartida', idfiNotaCreditoPartida.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fiNotaCreditoPartida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FiNotaCreditoPartida>;
      })
    );
  }
  /**
   * Obtener un agente aduanal por su idfiNotaCreditoPartida.
   * @param idfiNotaCreditoPartida Identificador del agente aduanal
   * @return OK
   */
  fiNotaCreditoPartidaObtener(idfiNotaCreditoPartida: string): __Observable<FiNotaCreditoPartida> {
    return this.fiNotaCreditoPartidaObtenerResponse(idfiNotaCreditoPartida).pipe(
      __map(_r => _r.body as FiNotaCreditoPartida)
    );
  }

  /**
   * Guardar o actualizar un agente aduanal
   * @param fiNotaCreditoPartida Objeto de agente aduanal
   * @return OK
   */
  fiNotaCreditoPartidaGuardarOActualizarResponse(fiNotaCreditoPartida: FiNotaCreditoPartida): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fiNotaCreditoPartida;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fiNotaCreditoPartida`,
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
   * Guardar o actualizar un agente aduanal
   * @param fiNotaCreditoPartida Objeto de agente aduanal
   * @return OK
   */
  fiNotaCreditoPartidaGuardarOActualizar(fiNotaCreditoPartida: FiNotaCreditoPartida): __Observable<string> {
    return this.fiNotaCreditoPartidaGuardarOActualizarResponse(fiNotaCreditoPartida).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de agente aduanal.
   * @param info Objeto de tipo QueryInfo para filtrar agentes aduanales.
   * @return OK
   */
  fiNotaCreditoPartidaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFiNotaCreditoPartida>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fiNotaCreditoPartida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFiNotaCreditoPartida>;
      })
    );
  }
  /**
   * Obtener lista de agente aduanal.
   * @param info Objeto de tipo QueryInfo para filtrar agentes aduanales.
   * @return OK
   */
  fiNotaCreditoPartidaQueryResult(info: QueryInfo): __Observable<QueryResultFiNotaCreditoPartida> {
    return this.fiNotaCreditoPartidaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFiNotaCreditoPartida)
    );
  }

  /**
   * Desactivar un agente aduanal
   * @param idfiNotaCreditoPartida Identificador de agente aduanal a desactivar
   * @return OK
   */
  fiNotaCreditoPartidaDesactivarResponse(idfiNotaCreditoPartida: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfiNotaCreditoPartida != null) __params = __params.set('idfiNotaCreditoPartida', idfiNotaCreditoPartida.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fiNotaCreditoPartida`,
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
   * Desactivar un agente aduanal
   * @param idfiNotaCreditoPartida Identificador de agente aduanal a desactivar
   * @return OK
   */
  fiNotaCreditoPartidaDesactivar(idfiNotaCreditoPartida: string): __Observable<string> {
    return this.fiNotaCreditoPartidaDesactivarResponse(idfiNotaCreditoPartida).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module InterfacturacionNotaCreditoService {
}

export { InterfacturacionNotaCreditoService }
