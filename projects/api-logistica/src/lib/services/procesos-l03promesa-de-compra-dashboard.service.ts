/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PaginaPrincipalPromesaDeCompra } from '../models/pagina-principal-promesa-de-compra';
import { ControlarSeguimientoPCDashboardTotales } from '../models/controlar-seguimiento-pcdashboard-totales';
import { QueryResultVPCClienteTotalesCotizacionesPartidas } from '../models/query-result-vpccliente-totales-cotizaciones-partidas';
import { QueryInfo } from '../models/query-info';
import { AttributeDashboard } from '../models/attribute-dashboard';
import { ResumeGroupQueryInfo } from '../models/resume-group-query-info';
import { QueryResultVClientePromesasDeCompra } from '../models/query-result-vcliente-promesas-de-compra';
import { DashboardData } from '../models/dashboard-data';
@Injectable({
  providedIn: 'root',
})
class ProcesosL03PromesaDeCompraDashboardService extends __BaseService {
  static readonly PaginaPrincipalPromesaDeCompraObtenerPath = '/PaginaPrincipalPromesaDeCompra';
  static readonly PaginaPrincipalPromesaDeCompraObtenerDatosDashboardCSPCPath = '/ControlarSeguimientoPCDashboardTotales';
  static readonly vClientePromesasDeCompraListaClientesQueryResultPath = '/vPCClienteTotalesCotizacionesPartidas';
  static readonly vClientePromesasDeCompraObtenerTabsDashboardPath = '/vClientePromesasDeCompra/tabs';
  static readonly vClientePromesasDeCompraQueryResultPath = '/vClientePromesasDeCompra';
  static readonly vClientePromesasDeCompraQueryResult_1Path = '/vClientePromesasDeCompra/dashboard';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener PaginaPrincipalPromesaDeCompra
   * @param idUsuario undefined
   * @return OK
   */
  PaginaPrincipalPromesaDeCompraObtenerResponse(idUsuario: string): __Observable<__StrictHttpResponse<PaginaPrincipalPromesaDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idUsuario != null) __params = __params.set('idUsuario', idUsuario.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/PaginaPrincipalPromesaDeCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PaginaPrincipalPromesaDeCompra>;
      })
    );
  }
  /**
   * Obtener PaginaPrincipalPromesaDeCompra
   * @param idUsuario undefined
   * @return OK
   */
  PaginaPrincipalPromesaDeCompraObtener(idUsuario: string): __Observable<PaginaPrincipalPromesaDeCompra> {
    return this.PaginaPrincipalPromesaDeCompraObtenerResponse(idUsuario).pipe(
      __map(_r => _r.body as PaginaPrincipalPromesaDeCompra)
    );
  }

  /**
   * ObtenerDatosDashboardCSPC PaginaPrincipalPromesaDeCompra
   * @param idUsuario undefined
   * @return OK
   */
  PaginaPrincipalPromesaDeCompraObtenerDatosDashboardCSPCResponse(idUsuario: string): __Observable<__StrictHttpResponse<ControlarSeguimientoPCDashboardTotales>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idUsuario != null) __params = __params.set('idUsuario', idUsuario.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ControlarSeguimientoPCDashboardTotales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ControlarSeguimientoPCDashboardTotales>;
      })
    );
  }
  /**
   * ObtenerDatosDashboardCSPC PaginaPrincipalPromesaDeCompra
   * @param idUsuario undefined
   * @return OK
   */
  PaginaPrincipalPromesaDeCompraObtenerDatosDashboardCSPC(idUsuario: string): __Observable<ControlarSeguimientoPCDashboardTotales> {
    return this.PaginaPrincipalPromesaDeCompraObtenerDatosDashboardCSPCResponse(idUsuario).pipe(
      __map(_r => _r.body as ControlarSeguimientoPCDashboardTotales)
    );
  }

  /**
   * Consultar lista paginada de vPCClienteTotalesCotizacionesPartidas para el módulo CONTROLAR SEGUIMIENTO A PROMESA DE
   * COMPRA
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vClientePromesasDeCompraListaClientesQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPCClienteTotalesCotizacionesPartidas>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPCClienteTotalesCotizacionesPartidas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPCClienteTotalesCotizacionesPartidas>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPCClienteTotalesCotizacionesPartidas para el módulo CONTROLAR SEGUIMIENTO A PROMESA DE
   * COMPRA
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vClientePromesasDeCompraListaClientesQueryResult(info: QueryInfo): __Observable<QueryResultVPCClienteTotalesCotizacionesPartidas> {
    return this.vClientePromesasDeCompraListaClientesQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPCClienteTotalesCotizacionesPartidas)
    );
  }

  /**
   * Consultar tabs para dashboard
   * @param info Filtros de tabs
   * @return OK
   */
  vClientePromesasDeCompraObtenerTabsDashboardResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<Array<AttributeDashboard>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClientePromesasDeCompra/tabs`,
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
   * Consultar tabs para dashboard
   * @param info Filtros de tabs
   * @return OK
   */
  vClientePromesasDeCompraObtenerTabsDashboard(info: ResumeGroupQueryInfo): __Observable<Array<AttributeDashboard>> {
    return this.vClientePromesasDeCompraObtenerTabsDashboardResponse(info).pipe(
      __map(_r => _r.body as Array<AttributeDashboard>)
    );
  }

  /**
   * Consultar lista paginada de vClientePromesasDeCompra
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vClientePromesasDeCompraQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVClientePromesasDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClientePromesasDeCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVClientePromesasDeCompra>;
      })
    );
  }
  /**
   * Consultar lista paginada de vClientePromesasDeCompra
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vClientePromesasDeCompraQueryResult(info: QueryInfo): __Observable<QueryResultVClientePromesasDeCompra> {
    return this.vClientePromesasDeCompraQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVClientePromesasDeCompra)
    );
  }

  /**
   * Consultar datos para dashboard
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vClientePromesasDeCompraQueryResult_1Response(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<DashboardData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClientePromesasDeCompra/dashboard`,
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
   * Consultar datos para dashboard
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vClientePromesasDeCompraQueryResult_1(info: ResumeGroupQueryInfo): __Observable<DashboardData> {
    return this.vClientePromesasDeCompraQueryResult_1Response(info).pipe(
      __map(_r => _r.body as DashboardData)
    );
  }
}

module ProcesosL03PromesaDeCompraDashboardService {
}

export { ProcesosL03PromesaDeCompraDashboardService }
