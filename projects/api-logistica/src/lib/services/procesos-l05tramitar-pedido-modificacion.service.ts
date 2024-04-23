/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TpArchivoAdicionalPedido } from '../models/tp-archivo-adicional-pedido';
import { QueryResultTpArchivoAdicionalPedido } from '../models/query-result-tp-archivo-adicional-pedido';
import { QueryInfo } from '../models/query-info';
import { QueryResultVClienteModificacionPedido } from '../models/query-result-vcliente-modificacion-pedido';
import { TotalesIncidenciaPedidoModificacionObj } from '../models/totales-incidencia-pedido-modificacion-obj';
import { FilterTuple } from '../models/filter-tuple';
@Injectable({
  providedIn: 'root',
})
class ProcesosL05TramitarPedidoModificacionService extends __BaseService {
  static readonly tpArchivoAdicionalPedidoObtenerPath = '/tpArchivoAdicionalPedido';
  static readonly tpArchivoAdicionalPedidoGuardarOActualizarPath = '/tpArchivoAdicionalPedido';
  static readonly tpArchivoAdicionalPedidoQueryResultPath = '/tpArchivoAdicionalPedido';
  static readonly tpArchivoAdicionalPedidoDesactivarPath = '/tpArchivoAdicionalPedido';
  static readonly vClienteModificacionPedidoQueryResultPath = '/vClienteModificacionPedido';
  static readonly vClientePedidoIncidenciaModificacionTotalesIncidenciaPedidoModificacionPath = '/TotalesIncidenciaPedidoModificacion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener tpArchivoAdicionalPedido por su idtpArchivoAdicionalPedido
   * @param idtpArchivoAdicionalPedido Identificador de tpArchivoAdicionalPedido
   * @return OK
   */
  tpArchivoAdicionalPedidoObtenerResponse(idtpArchivoAdicionalPedido: string): __Observable<__StrictHttpResponse<TpArchivoAdicionalPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpArchivoAdicionalPedido != null) __params = __params.set('idtpArchivoAdicionalPedido', idtpArchivoAdicionalPedido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tpArchivoAdicionalPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TpArchivoAdicionalPedido>;
      })
    );
  }
  /**
   * Obtener tpArchivoAdicionalPedido por su idtpArchivoAdicionalPedido
   * @param idtpArchivoAdicionalPedido Identificador de tpArchivoAdicionalPedido
   * @return OK
   */
  tpArchivoAdicionalPedidoObtener(idtpArchivoAdicionalPedido: string): __Observable<TpArchivoAdicionalPedido> {
    return this.tpArchivoAdicionalPedidoObtenerResponse(idtpArchivoAdicionalPedido).pipe(
      __map(_r => _r.body as TpArchivoAdicionalPedido)
    );
  }

  /**
   * Guardar o actualizar un tpArchivoAdicionalPedido.
   * @param tpArchivoAdicionalPedido tpArchivoAdicionalPedido.
   * @return OK
   */
  tpArchivoAdicionalPedidoGuardarOActualizarResponse(tpArchivoAdicionalPedido: TpArchivoAdicionalPedido): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = tpArchivoAdicionalPedido;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/tpArchivoAdicionalPedido`,
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
   * Guardar o actualizar un tpArchivoAdicionalPedido.
   * @param tpArchivoAdicionalPedido tpArchivoAdicionalPedido.
   * @return OK
   */
  tpArchivoAdicionalPedidoGuardarOActualizar(tpArchivoAdicionalPedido: TpArchivoAdicionalPedido): __Observable<string> {
    return this.tpArchivoAdicionalPedidoGuardarOActualizarResponse(tpArchivoAdicionalPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de tpArchivoAdicionalPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  tpArchivoAdicionalPedidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultTpArchivoAdicionalPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/tpArchivoAdicionalPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultTpArchivoAdicionalPedido>;
      })
    );
  }
  /**
   * Obtener lista de tpArchivoAdicionalPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  tpArchivoAdicionalPedidoQueryResult(info: QueryInfo): __Observable<QueryResultTpArchivoAdicionalPedido> {
    return this.tpArchivoAdicionalPedidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultTpArchivoAdicionalPedido)
    );
  }

  /**
   * Desactivar un tpArchivoAdicionalPedido.
   * @param idtpArchivoAdicionalPedido Identificador de elemento a desactivar.
   * @return OK
   */
  tpArchivoAdicionalPedidoDesactivarResponse(idtpArchivoAdicionalPedido: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpArchivoAdicionalPedido != null) __params = __params.set('idtpArchivoAdicionalPedido', idtpArchivoAdicionalPedido.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/tpArchivoAdicionalPedido`,
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
   * Desactivar un tpArchivoAdicionalPedido.
   * @param idtpArchivoAdicionalPedido Identificador de elemento a desactivar.
   * @return OK
   */
  tpArchivoAdicionalPedidoDesactivar(idtpArchivoAdicionalPedido: string): __Observable<string> {
    return this.tpArchivoAdicionalPedidoDesactivarResponse(idtpArchivoAdicionalPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult vClienteModificacionPedido
   * @param info undefined
   * @return OK
   */
  vClienteModificacionPedidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVClienteModificacionPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClienteModificacionPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVClienteModificacionPedido>;
      })
    );
  }
  /**
   * QueryResult vClienteModificacionPedido
   * @param info undefined
   * @return OK
   */
  vClienteModificacionPedidoQueryResult(info: QueryInfo): __Observable<QueryResultVClienteModificacionPedido> {
    return this.vClienteModificacionPedidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVClienteModificacionPedido)
    );
  }

  /**
   * TotalesIncidenciaPedidoModificacion vClientePedidoIncidenciaModificacion
   * @param filters undefined
   * @return OK
   */
  vClientePedidoIncidenciaModificacionTotalesIncidenciaPedidoModificacionResponse(filters: Array<FilterTuple>): __Observable<__StrictHttpResponse<TotalesIncidenciaPedidoModificacionObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = filters;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/TotalesIncidenciaPedidoModificacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TotalesIncidenciaPedidoModificacionObj>;
      })
    );
  }
  /**
   * TotalesIncidenciaPedidoModificacion vClientePedidoIncidenciaModificacion
   * @param filters undefined
   * @return OK
   */
  vClientePedidoIncidenciaModificacionTotalesIncidenciaPedidoModificacion(filters: Array<FilterTuple>): __Observable<TotalesIncidenciaPedidoModificacionObj> {
    return this.vClientePedidoIncidenciaModificacionTotalesIncidenciaPedidoModificacionResponse(filters).pipe(
      __map(_r => _r.body as TotalesIncidenciaPedidoModificacionObj)
    );
  }
}

module ProcesosL05TramitarPedidoModificacionService {
}

export { ProcesosL05TramitarPedidoModificacionService }
