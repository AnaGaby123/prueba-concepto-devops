/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { DashboardData } from '../models/dashboard-data';
import { ResumeGroupQueryInfo } from '../models/resume-group-query-info';
import { AttributeDashboard } from '../models/attribute-dashboard';
import { ClienteTramitarPedidoDashboardTotales } from '../models/cliente-tramitar-pedido-dashboard-totales';
import { QueryResultVClienteTramitarPedido } from '../models/query-result-vcliente-tramitar-pedido';
import { QueryInfo } from '../models/query-info';
import { QueryResultVTramitarPedido } from '../models/query-result-vtramitar-pedido';
import { VTramitarPedidoDetalle } from '../models/vtramitar-pedido-detalle';
import { QueryResultVTramitarPedidoPartida } from '../models/query-result-vtramitar-pedido-partida';
@Injectable({
  providedIn: 'root',
})
class ProcesosL05TramitarPedidoDashboardService extends __BaseService {
  static readonly ClienteTramitarPedidoObtenerTramitarPedidoDashboardPath = '/TramitarPedido/Dashboard';
  static readonly ClienteTramitarPedidoObtenerTramitarPedidoTabsPath = '/TramitarPedido/Tabs';
  static readonly ClienteTramitarPedidoDashboardTotalesObtenerPath = '/ClienteTramitarPedidoDashboardTotales';
  static readonly vClienteTramitarPedidoQueryResultPath = '/vClienteTramitarPedido';
  static readonly vTramitarPedidoQueryResultPath = '/vTramitarPedido';
  static readonly vTramitarPedidoDetalleObtenerPath = '/vTramitarPedidoDetalle';
  static readonly vTramitarPedidoPartidaQueryResultPath = '/vTramitarPedidoPartida';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar dashboardData  de Tramitar Pedido.
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ClienteTramitarPedidoObtenerTramitarPedidoDashboardResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<DashboardData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/TramitarPedido/Dashboard`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DashboardData>;
      })
    );
  }
  /**
   * Consultar dashboardData  de Tramitar Pedido.
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ClienteTramitarPedidoObtenerTramitarPedidoDashboard(info: ResumeGroupQueryInfo): __Observable<DashboardData> {
    return this.ClienteTramitarPedidoObtenerTramitarPedidoDashboardResponse(info).pipe(
      __map(_r => _r.body as DashboardData)
    );
  }

  /**
   * Consultar Tabs para Tramitar Pedido.
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ClienteTramitarPedidoObtenerTramitarPedidoTabsResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<Array<AttributeDashboard>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/TramitarPedido/Tabs`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AttributeDashboard>>;
      })
    );
  }
  /**
   * Consultar Tabs para Tramitar Pedido.
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ClienteTramitarPedidoObtenerTramitarPedidoTabs(info: ResumeGroupQueryInfo): __Observable<Array<AttributeDashboard>> {
    return this.ClienteTramitarPedidoObtenerTramitarPedidoTabsResponse(info).pipe(
      __map(_r => _r.body as Array<AttributeDashboard>)
    );
  }

  /**
   * Obtener ClienteTramitarPedidoDashboardTotales
   * @param idUsuario undefined
   * @return OK
   */
  ClienteTramitarPedidoDashboardTotalesObtenerResponse(idUsuario: string): __Observable<__StrictHttpResponse<ClienteTramitarPedidoDashboardTotales>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idUsuario != null) __params = __params.set('idUsuario', idUsuario.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ClienteTramitarPedidoDashboardTotales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ClienteTramitarPedidoDashboardTotales>;
      })
    );
  }
  /**
   * Obtener ClienteTramitarPedidoDashboardTotales
   * @param idUsuario undefined
   * @return OK
   */
  ClienteTramitarPedidoDashboardTotalesObtener(idUsuario: string): __Observable<ClienteTramitarPedidoDashboardTotales> {
    return this.ClienteTramitarPedidoDashboardTotalesObtenerResponse(idUsuario).pipe(
      __map(_r => _r.body as ClienteTramitarPedidoDashboardTotales)
    );
  }

  /**
   * QueryResult vClienteTramitarPedido
   * @param info undefined
   * @return OK
   */
  vClienteTramitarPedidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVClienteTramitarPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClienteTramitarPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVClienteTramitarPedido>;
      })
    );
  }
  /**
   * QueryResult vClienteTramitarPedido
   * @param info undefined
   * @return OK
   */
  vClienteTramitarPedidoQueryResult(info: QueryInfo): __Observable<QueryResultVClienteTramitarPedido> {
    return this.vClienteTramitarPedidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVClienteTramitarPedido)
    );
  }

  /**
   * QueryResult vTramitarPedido
   * @param info undefined
   * @return OK
   */
  vTramitarPedidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVTramitarPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vTramitarPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVTramitarPedido>;
      })
    );
  }
  /**
   * QueryResult vTramitarPedido
   * @param info undefined
   * @return OK
   */
  vTramitarPedidoQueryResult(info: QueryInfo): __Observable<QueryResultVTramitarPedido> {
    return this.vTramitarPedidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVTramitarPedido)
    );
  }

  /**
   * Obtener vTramitarPedidoDetalle
   * @param idTPPedido undefined
   * @return OK
   */
  vTramitarPedidoDetalleObtenerResponse(idTPPedido: string): __Observable<__StrictHttpResponse<VTramitarPedidoDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idTPPedido != null) __params = __params.set('idTPPedido', idTPPedido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vTramitarPedidoDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VTramitarPedidoDetalle>;
      })
    );
  }
  /**
   * Obtener vTramitarPedidoDetalle
   * @param idTPPedido undefined
   * @return OK
   */
  vTramitarPedidoDetalleObtener(idTPPedido: string): __Observable<VTramitarPedidoDetalle> {
    return this.vTramitarPedidoDetalleObtenerResponse(idTPPedido).pipe(
      __map(_r => _r.body as VTramitarPedidoDetalle)
    );
  }

  /**
   * QueryResult vTramitarPedidoPartida
   * @param info undefined
   * @return OK
   */
  vTramitarPedidoPartidaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVTramitarPedidoPartida>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vTramitarPedidoPartida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVTramitarPedidoPartida>;
      })
    );
  }
  /**
   * QueryResult vTramitarPedidoPartida
   * @param info undefined
   * @return OK
   */
  vTramitarPedidoPartidaQueryResult(info: QueryInfo): __Observable<QueryResultVTramitarPedidoPartida> {
    return this.vTramitarPedidoPartidaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVTramitarPedidoPartida)
    );
  }
}

module ProcesosL05TramitarPedidoDashboardService {
}

export { ProcesosL05TramitarPedidoDashboardService }
