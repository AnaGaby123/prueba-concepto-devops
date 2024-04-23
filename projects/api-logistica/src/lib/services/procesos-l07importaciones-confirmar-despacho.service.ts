/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ImpCDDashBoardGraficasTotales } from '../models/imp-cddash-board-graficas-totales';
import { QueryResultVImpCDOrdenesDeCompra } from '../models/query-result-vimp-cdordenes-de-compra';
import { QueryInfo } from '../models/query-info';
import { QueryResultVImpCDPartidaProducto } from '../models/query-result-vimp-cdpartida-producto';
import { QueryResultVImpCDProveedores } from '../models/query-result-vimp-cdproveedores';
@Injectable({
  providedIn: 'root',
})
class ProcesosL07ImportacionesConfirmarDespachoService extends __BaseService {
  static readonly impCDDashBoardGraficasTotalesObtenerValoresGraficasPath = '/impCDDashBoardGraficasTotales';
  static readonly vImpCDOrdenesDeCompraQueryResultPath = '/vImpCDOrdenesDeCompra';
  static readonly vImpCDPartidaProductoQueryResultPath = '/vImpCDPartidaProducto';
  static readonly vImpCDProveedoresQueryResultPath = '/vImpCDProveedores';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * ObtenerValoresGraficas impCDDashBoardGraficasTotales
   * @return OK
   */
  impCDDashBoardGraficasTotalesObtenerValoresGraficasResponse(): __Observable<__StrictHttpResponse<ImpCDDashBoardGraficasTotales>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/impCDDashBoardGraficasTotales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ImpCDDashBoardGraficasTotales>;
      })
    );
  }
  /**
   * ObtenerValoresGraficas impCDDashBoardGraficasTotales
   * @return OK
   */
  impCDDashBoardGraficasTotalesObtenerValoresGraficas(): __Observable<ImpCDDashBoardGraficasTotales> {
    return this.impCDDashBoardGraficasTotalesObtenerValoresGraficasResponse().pipe(
      __map(_r => _r.body as ImpCDDashBoardGraficasTotales)
    );
  }

  /**
   * Consultar lista paginada de vImpCDOrdenesDeCompra
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vImpCDOrdenesDeCompraQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVImpCDOrdenesDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vImpCDOrdenesDeCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVImpCDOrdenesDeCompra>;
      })
    );
  }
  /**
   * Consultar lista paginada de vImpCDOrdenesDeCompra
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vImpCDOrdenesDeCompraQueryResult(info: QueryInfo): __Observable<QueryResultVImpCDOrdenesDeCompra> {
    return this.vImpCDOrdenesDeCompraQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVImpCDOrdenesDeCompra)
    );
  }

  /**
   * Consultar lista paginada de vImpCDPartidaProducto
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vImpCDPartidaProductoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVImpCDPartidaProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vImpCDPartidaProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVImpCDPartidaProducto>;
      })
    );
  }
  /**
   * Consultar lista paginada de vImpCDPartidaProducto
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vImpCDPartidaProductoQueryResult(info: QueryInfo): __Observable<QueryResultVImpCDPartidaProducto> {
    return this.vImpCDPartidaProductoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVImpCDPartidaProducto)
    );
  }

  /**
   * Consultar lista paginada de vImpCDProveedores
   * @param info Filtros (NombreProveedor, OrdenDeCompraProveedor) y ordenamientos
   * @return OK
   */
  vImpCDProveedoresQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVImpCDProveedores>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vImpCDProveedores`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVImpCDProveedores>;
      })
    );
  }
  /**
   * Consultar lista paginada de vImpCDProveedores
   * @param info Filtros (NombreProveedor, OrdenDeCompraProveedor) y ordenamientos
   * @return OK
   */
  vImpCDProveedoresQueryResult(info: QueryInfo): __Observable<QueryResultVImpCDProveedores> {
    return this.vImpCDProveedoresQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVImpCDProveedores)
    );
  }
}

module ProcesosL07ImportacionesConfirmarDespachoService {
}

export { ProcesosL07ImportacionesConfirmarDespachoService }
