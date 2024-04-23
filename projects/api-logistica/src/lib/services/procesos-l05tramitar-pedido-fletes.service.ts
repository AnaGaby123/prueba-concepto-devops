/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TpPedidoFleteExpress } from '../models/tp-pedido-flete-express';
import { QueryResultTpPedidoFleteExpress } from '../models/query-result-tp-pedido-flete-express';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class ProcesosL05TramitarPedidoFletesService extends __BaseService {
  static readonly tpPedidoFleteExpressObtenerPath = '/tpPedidoFleteExpress';
  static readonly tpPedidoFleteExpressGuardarOActualizarPath = '/tpPedidoFleteExpress';
  static readonly tpPedidoFleteExpressQueryResultPath = '/tpPedidoFleteExpress';
  static readonly tpPedidoFleteExpressDesactivarPath = '/tpPedidoFleteExpress';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener un pPedidoFleteExpress por su idpPedidoFleteExpress
   * @param idtpPedidoFleteExpress identificador del pPedidoFleteExpress
   * @return OK
   */
  tpPedidoFleteExpressObtenerResponse(idtpPedidoFleteExpress: string): __Observable<__StrictHttpResponse<TpPedidoFleteExpress>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpPedidoFleteExpress != null) __params = __params.set('idtpPedidoFleteExpress', idtpPedidoFleteExpress.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tpPedidoFleteExpress`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TpPedidoFleteExpress>;
      })
    );
  }
  /**
   * Obtener un pPedidoFleteExpress por su idpPedidoFleteExpress
   * @param idtpPedidoFleteExpress identificador del pPedidoFleteExpress
   * @return OK
   */
  tpPedidoFleteExpressObtener(idtpPedidoFleteExpress: string): __Observable<TpPedidoFleteExpress> {
    return this.tpPedidoFleteExpressObtenerResponse(idtpPedidoFleteExpress).pipe(
      __map(_r => _r.body as TpPedidoFleteExpress)
    );
  }

  /**
   * Guardar o actualizar un pPedidoFleteExpress
   * @param tpPedidoFleteExpress pPedidoFleteExpress a actualizar o guardar
   * @return OK
   */
  tpPedidoFleteExpressGuardarOActualizarResponse(tpPedidoFleteExpress: TpPedidoFleteExpress): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = tpPedidoFleteExpress;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/tpPedidoFleteExpress`,
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
   * Guardar o actualizar un pPedidoFleteExpress
   * @param tpPedidoFleteExpress pPedidoFleteExpress a actualizar o guardar
   * @return OK
   */
  tpPedidoFleteExpressGuardarOActualizar(tpPedidoFleteExpress: TpPedidoFleteExpress): __Observable<string> {
    return this.tpPedidoFleteExpressGuardarOActualizarResponse(tpPedidoFleteExpress).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de pPedidoFleteExpress.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  tpPedidoFleteExpressQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultTpPedidoFleteExpress>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/tpPedidoFleteExpress`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultTpPedidoFleteExpress>;
      })
    );
  }
  /**
   * Obtener lista de pPedidoFleteExpress.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  tpPedidoFleteExpressQueryResult(info: QueryInfo): __Observable<QueryResultTpPedidoFleteExpress> {
    return this.tpPedidoFleteExpressQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultTpPedidoFleteExpress)
    );
  }

  /**
   * Desactivar un pPedidoFleteExpress.
   * @param idtpPedidoFleteExpress Identificador de pPedidoFleteExpress a ser desactivado.
   * @return OK
   */
  tpPedidoFleteExpressDesactivarResponse(idtpPedidoFleteExpress: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpPedidoFleteExpress != null) __params = __params.set('idtpPedidoFleteExpress', idtpPedidoFleteExpress.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/tpPedidoFleteExpress`,
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
   * Desactivar un pPedidoFleteExpress.
   * @param idtpPedidoFleteExpress Identificador de pPedidoFleteExpress a ser desactivado.
   * @return OK
   */
  tpPedidoFleteExpressDesactivar(idtpPedidoFleteExpress: string): __Observable<string> {
    return this.tpPedidoFleteExpressDesactivarResponse(idtpPedidoFleteExpress).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ProcesosL05TramitarPedidoFletesService {
}

export { ProcesosL05TramitarPedidoFletesService }
