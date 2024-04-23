/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiFinanzasConfiguration as __Configuration } from '../api-finanzas-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FccNotaCredito } from '../models/fcc-nota-credito';
import { QueryResultFccNotaCredito } from '../models/query-result-fcc-nota-credito';
import { QueryInfo } from '../models/query-info';
import { ParametroGeneradorNotaCredito } from '../models/parametro-generador-nota-credito';
import { FccNotaCreditoPartida } from '../models/fcc-nota-credito-partida';
import { QueryResultFccNotaCreditoPartida } from '../models/query-result-fcc-nota-credito-partida';
@Injectable({
  providedIn: 'root',
})
class CobranzaClientesNotasCreditoService extends __BaseService {
  static readonly fccNotaCreditoObtenerPath = '/fccNotaCredito';
  static readonly fccNotaCreditoGuardarOActualizarPath = '/fccNotaCredito';
  static readonly fccNotaCreditoQueryResultPath = '/fccNotaCredito';
  static readonly fccNotaCreditoDesactivarPath = '/fccNotaCredito';
  static readonly fccNotaCreditoExtensionsGenerarNotaCreditoPath = '/fccNotaCreditoFromTpProformaPedido';
  static readonly fccNotaCreditoPartidaObtenerPath = '/fccNotaCreditoPartida';
  static readonly fccNotaCreditoPartidaGuardarOActualizarPath = '/fccNotaCreditoPartida';
  static readonly fccNotaCreditoPartidaQueryResultPath = '/fccNotaCreditoPartida';
  static readonly fccNotaCreditoPartidaDesactivarPath = '/fccNotaCreditoPartida';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener fccNotaCredito por su idfccNotaCredito
   * @param idfccNotaCredito Identificador de fccNotaCredito
   * @return OK
   */
  fccNotaCreditoObtenerResponse(idfccNotaCredito: string): __Observable<__StrictHttpResponse<FccNotaCredito>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccNotaCredito != null) __params = __params.set('idfccNotaCredito', idfccNotaCredito.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fccNotaCredito`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FccNotaCredito>;
      })
    );
  }
  /**
   * Obtener fccNotaCredito por su idfccNotaCredito
   * @param idfccNotaCredito Identificador de fccNotaCredito
   * @return OK
   */
  fccNotaCreditoObtener(idfccNotaCredito: string): __Observable<FccNotaCredito> {
    return this.fccNotaCreditoObtenerResponse(idfccNotaCredito).pipe(
      __map(_r => _r.body as FccNotaCredito)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param fccNotaCredito Dirección de empresa.
   * @return OK
   */
  fccNotaCreditoGuardarOActualizarResponse(fccNotaCredito: FccNotaCredito): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fccNotaCredito;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fccNotaCredito`,
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
   * Guardar o actualizar una dirección de empresa.
   * @param fccNotaCredito Dirección de empresa.
   * @return OK
   */
  fccNotaCreditoGuardarOActualizar(fccNotaCredito: FccNotaCredito): __Observable<string> {
    return this.fccNotaCreditoGuardarOActualizarResponse(fccNotaCredito).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de fccNotaCredito
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccNotaCreditoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFccNotaCredito>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fccNotaCredito`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFccNotaCredito>;
      })
    );
  }
  /**
   * Obtener lista de fccNotaCredito
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccNotaCreditoQueryResult(info: QueryInfo): __Observable<QueryResultFccNotaCredito> {
    return this.fccNotaCreditoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFccNotaCredito)
    );
  }

  /**
   * Desactivar un fccNotaCredito.
   * @param idfccNotaCredito Identificador de elemento a desactivar.
   * @return OK
   */
  fccNotaCreditoDesactivarResponse(idfccNotaCredito: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccNotaCredito != null) __params = __params.set('idfccNotaCredito', idfccNotaCredito.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fccNotaCredito`,
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
   * Desactivar un fccNotaCredito.
   * @param idfccNotaCredito Identificador de elemento a desactivar.
   * @return OK
   */
  fccNotaCreditoDesactivar(idfccNotaCredito: string): __Observable<string> {
    return this.fccNotaCreditoDesactivarResponse(idfccNotaCredito).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * GenerarNotaCredito fccNotaCreditoExtensions
   * @param parametro undefined
   * @return OK
   */
  fccNotaCreditoExtensionsGenerarNotaCreditoResponse(parametro: ParametroGeneradorNotaCredito): __Observable<__StrictHttpResponse<FccNotaCredito>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = parametro;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/fccNotaCreditoFromTpProformaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FccNotaCredito>;
      })
    );
  }
  /**
   * GenerarNotaCredito fccNotaCreditoExtensions
   * @param parametro undefined
   * @return OK
   */
  fccNotaCreditoExtensionsGenerarNotaCredito(parametro: ParametroGeneradorNotaCredito): __Observable<FccNotaCredito> {
    return this.fccNotaCreditoExtensionsGenerarNotaCreditoResponse(parametro).pipe(
      __map(_r => _r.body as FccNotaCredito)
    );
  }

  /**
   * Obtener fccNotaCreditoPartida por su idfccNotaCreditoPartida
   * @param idfccNotaCreditoPartida Identificador de fccNotaCreditoPartida
   * @return OK
   */
  fccNotaCreditoPartidaObtenerResponse(idfccNotaCreditoPartida: string): __Observable<__StrictHttpResponse<FccNotaCreditoPartida>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccNotaCreditoPartida != null) __params = __params.set('idfccNotaCreditoPartida', idfccNotaCreditoPartida.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fccNotaCreditoPartida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FccNotaCreditoPartida>;
      })
    );
  }
  /**
   * Obtener fccNotaCreditoPartida por su idfccNotaCreditoPartida
   * @param idfccNotaCreditoPartida Identificador de fccNotaCreditoPartida
   * @return OK
   */
  fccNotaCreditoPartidaObtener(idfccNotaCreditoPartida: string): __Observable<FccNotaCreditoPartida> {
    return this.fccNotaCreditoPartidaObtenerResponse(idfccNotaCreditoPartida).pipe(
      __map(_r => _r.body as FccNotaCreditoPartida)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param fccNotaCreditoPartida Dirección de empresa.
   * @return OK
   */
  fccNotaCreditoPartidaGuardarOActualizarResponse(fccNotaCreditoPartida: FccNotaCreditoPartida): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fccNotaCreditoPartida;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fccNotaCreditoPartida`,
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
   * Guardar o actualizar una dirección de empresa.
   * @param fccNotaCreditoPartida Dirección de empresa.
   * @return OK
   */
  fccNotaCreditoPartidaGuardarOActualizar(fccNotaCreditoPartida: FccNotaCreditoPartida): __Observable<string> {
    return this.fccNotaCreditoPartidaGuardarOActualizarResponse(fccNotaCreditoPartida).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de fccNotaCreditoPartida
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccNotaCreditoPartidaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFccNotaCreditoPartida>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fccNotaCreditoPartida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFccNotaCreditoPartida>;
      })
    );
  }
  /**
   * Obtener lista de fccNotaCreditoPartida
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccNotaCreditoPartidaQueryResult(info: QueryInfo): __Observable<QueryResultFccNotaCreditoPartida> {
    return this.fccNotaCreditoPartidaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFccNotaCreditoPartida)
    );
  }

  /**
   * Desactivar un fccNotaCreditoPartida.
   * @param idfccNotaCreditoPartida Identificador de elemento a desactivar.
   * @return OK
   */
  fccNotaCreditoPartidaDesactivarResponse(idfccNotaCreditoPartida: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccNotaCreditoPartida != null) __params = __params.set('idfccNotaCreditoPartida', idfccNotaCreditoPartida.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fccNotaCreditoPartida`,
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
   * Desactivar un fccNotaCreditoPartida.
   * @param idfccNotaCreditoPartida Identificador de elemento a desactivar.
   * @return OK
   */
  fccNotaCreditoPartidaDesactivar(idfccNotaCreditoPartida: string): __Observable<string> {
    return this.fccNotaCreditoPartidaDesactivarResponse(idfccNotaCreditoPartida).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module CobranzaClientesNotasCreditoService {
}

export { CobranzaClientesNotasCreditoService }
