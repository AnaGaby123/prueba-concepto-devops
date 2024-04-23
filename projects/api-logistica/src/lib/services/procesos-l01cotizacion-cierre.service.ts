/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { QueryResultVClienteCotizacionesConfirmadasUsuario } from '../models/query-result-vcliente-cotizaciones-confirmadas-usuario';
import { QueryInfo } from '../models/query-info';
import { TotalPedidoEntregaObj } from '../models/total-pedido-entrega-obj';
import { FilterTuple } from '../models/filter-tuple';
import { QueryResultGraficaEntregaPartidaPedidoObj } from '../models/query-result-grafica-entrega-partida-pedido-obj';
import { QueryResultListaEntregaPartidaPedidoObj } from '../models/query-result-lista-entrega-partida-pedido-obj';
import { QueryResultVEviCotizaciones } from '../models/query-result-vevi-cotizaciones';
import { QueryResultVEviResumenGeneral } from '../models/query-result-vevi-resumen-general';
@Injectable({
  providedIn: 'root',
})
class ProcesosL01CotizacionCierreService extends __BaseService {
  static readonly vClienteCotizacionesConfirmadasUsuarioQueryResultPath = '/vClienteCotizacionesConfirmadasUsuario';
  static readonly vEntregaPartidaPedidoGroupQueryResultPath = '/TotalPedidoEntrega';
  static readonly vEntregaPartidaPedidoObtenerGraficaEntregaPartidaPedidoPath = '/GraficaEntregaPartidaPedido';
  static readonly vEntregaPartidaPedidoObtenerListaEntregaPartidaPedidoPath = '/ListaEntregaPartidaPedido';
  static readonly vEviCotizacionesQueryResultPath = '/vEviCotizaciones';
  static readonly vEviResumenGeneralQueryResultPath = '/vEviResumenGeneral';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar lista paginada de vClienteCotizacionesConfirmadasUsuario
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vClienteCotizacionesConfirmadasUsuarioQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVClienteCotizacionesConfirmadasUsuario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClienteCotizacionesConfirmadasUsuario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVClienteCotizacionesConfirmadasUsuario>;
      })
    );
  }
  /**
   * Consultar lista paginada de vClienteCotizacionesConfirmadasUsuario
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vClienteCotizacionesConfirmadasUsuarioQueryResult(info: QueryInfo): __Observable<QueryResultVClienteCotizacionesConfirmadasUsuario> {
    return this.vClienteCotizacionesConfirmadasUsuarioQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVClienteCotizacionesConfirmadasUsuario)
    );
  }

  /**
   * GroupQueryResult vEntregaPartidaPedido
   * @param filtros undefined
   * @return OK
   */
  vEntregaPartidaPedidoGroupQueryResultResponse(filtros: Array<FilterTuple>): __Observable<__StrictHttpResponse<TotalPedidoEntregaObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = filtros;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/TotalPedidoEntrega`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TotalPedidoEntregaObj>;
      })
    );
  }
  /**
   * GroupQueryResult vEntregaPartidaPedido
   * @param filtros undefined
   * @return OK
   */
  vEntregaPartidaPedidoGroupQueryResult(filtros: Array<FilterTuple>): __Observable<TotalPedidoEntregaObj> {
    return this.vEntregaPartidaPedidoGroupQueryResultResponse(filtros).pipe(
      __map(_r => _r.body as TotalPedidoEntregaObj)
    );
  }

  /**
   * ObtenerGraficaEntregaPartidaPedido vEntregaPartidaPedido
   * @param info undefined
   * @return OK
   */
  vEntregaPartidaPedidoObtenerGraficaEntregaPartidaPedidoResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultGraficaEntregaPartidaPedidoObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/GraficaEntregaPartidaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultGraficaEntregaPartidaPedidoObj>;
      })
    );
  }
  /**
   * ObtenerGraficaEntregaPartidaPedido vEntregaPartidaPedido
   * @param info undefined
   * @return OK
   */
  vEntregaPartidaPedidoObtenerGraficaEntregaPartidaPedido(info: QueryInfo): __Observable<QueryResultGraficaEntregaPartidaPedidoObj> {
    return this.vEntregaPartidaPedidoObtenerGraficaEntregaPartidaPedidoResponse(info).pipe(
      __map(_r => _r.body as QueryResultGraficaEntregaPartidaPedidoObj)
    );
  }

  /**
   * ObtenerListaEntregaPartidaPedido vEntregaPartidaPedido
   * @param info undefined
   * @return OK
   */
  vEntregaPartidaPedidoObtenerListaEntregaPartidaPedidoResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultListaEntregaPartidaPedidoObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ListaEntregaPartidaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultListaEntregaPartidaPedidoObj>;
      })
    );
  }
  /**
   * ObtenerListaEntregaPartidaPedido vEntregaPartidaPedido
   * @param info undefined
   * @return OK
   */
  vEntregaPartidaPedidoObtenerListaEntregaPartidaPedido(info: QueryInfo): __Observable<QueryResultListaEntregaPartidaPedidoObj> {
    return this.vEntregaPartidaPedidoObtenerListaEntregaPartidaPedidoResponse(info).pipe(
      __map(_r => _r.body as QueryResultListaEntregaPartidaPedidoObj)
    );
  }

  /**
   * Consultar lista paginada de vEviCotizaciones
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vEviCotizacionesQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVEviCotizaciones>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vEviCotizaciones`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVEviCotizaciones>;
      })
    );
  }
  /**
   * Consultar lista paginada de vEviCotizaciones
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vEviCotizacionesQueryResult(info: QueryInfo): __Observable<QueryResultVEviCotizaciones> {
    return this.vEviCotizacionesQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVEviCotizaciones)
    );
  }

  /**
   * Consultar lista paginada de vEviResumenGeneral
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vEviResumenGeneralQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVEviResumenGeneral>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vEviResumenGeneral`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVEviResumenGeneral>;
      })
    );
  }
  /**
   * Consultar lista paginada de vEviResumenGeneral
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vEviResumenGeneralQueryResult(info: QueryInfo): __Observable<QueryResultVEviResumenGeneral> {
    return this.vEviResumenGeneralQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVEviResumenGeneral)
    );
  }
}

module ProcesosL01CotizacionCierreService {
}

export { ProcesosL01CotizacionCierreService }
