/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TpPedido } from '../models/tp-pedido';
import { QueryResultTpPedido } from '../models/query-result-tp-pedido';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class ProcesosL05TramitarPedidoService extends __BaseService {
  static readonly tpPedidoObtenerPath = '/tpPedido';
  static readonly tpPedidoGuardarOActualizarPath = '/tpPedido';
  static readonly tpPedidoQueryResultPath = '/tpPedido';
  static readonly tpPedidoDesactivarPath = '/tpPedido';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener pPedido por su idpPedido
   * @param idtpPedido Identificador de pPedido
   * @return OK
   */
  tpPedidoObtenerResponse(idtpPedido: string): __Observable<__StrictHttpResponse<TpPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpPedido != null) __params = __params.set('idtpPedido', idtpPedido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tpPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TpPedido>;
      })
    );
  }
  /**
   * Obtener pPedido por su idpPedido
   * @param idtpPedido Identificador de pPedido
   * @return OK
   */
  tpPedidoObtener(idtpPedido: string): __Observable<TpPedido> {
    return this.tpPedidoObtenerResponse(idtpPedido).pipe(
      __map(_r => _r.body as TpPedido)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param tpPedido Dirección de empresa.
   * @return OK
   */
  tpPedidoGuardarOActualizarResponse(tpPedido: TpPedido): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = tpPedido;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/tpPedido`,
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
   * @param tpPedido Dirección de empresa.
   * @return OK
   */
  tpPedidoGuardarOActualizar(tpPedido: TpPedido): __Observable<string> {
    return this.tpPedidoGuardarOActualizarResponse(tpPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de pPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  tpPedidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultTpPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/tpPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultTpPedido>;
      })
    );
  }
  /**
   * Obtener lista de pPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  tpPedidoQueryResult(info: QueryInfo): __Observable<QueryResultTpPedido> {
    return this.tpPedidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultTpPedido)
    );
  }

  /**
   * Desactivar un pPedido.
   * @param idtpPedido Identificador de elemento a desactivar.
   * @return OK
   */
  tpPedidoDesactivarResponse(idtpPedido: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpPedido != null) __params = __params.set('idtpPedido', idtpPedido.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/tpPedido`,
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
   * Desactivar un pPedido.
   * @param idtpPedido Identificador de elemento a desactivar.
   * @return OK
   */
  tpPedidoDesactivar(idtpPedido: string): __Observable<string> {
    return this.tpPedidoDesactivarResponse(idtpPedido).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ProcesosL05TramitarPedidoService {
}

export { ProcesosL05TramitarPedidoService }
