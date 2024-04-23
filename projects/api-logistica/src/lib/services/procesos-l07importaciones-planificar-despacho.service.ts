/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GroupQueryResultVImpOrdenDespachoDetalle } from '../models/group-query-result-vimp-orden-despacho-detalle';
import { GroupQueryInfo } from '../models/group-query-info';
import { QueryResultVImpOrdenDespachoDetalle } from '../models/query-result-vimp-orden-despacho-detalle';
import { QueryInfo } from '../models/query-info';
import { DatosGraficaSemaforoEntregaObj } from '../models/datos-grafica-semaforo-entrega-obj';
import { GroupQueryResultVPDImpListaArriboDetalle } from '../models/group-query-result-vpdimp-lista-arribo-detalle';
import { ProveedorListaArriboObj } from '../models/proveedor-lista-arribo-obj';
import { QueryResultVPDImpListaArriboDetalle } from '../models/query-result-vpdimp-lista-arribo-detalle';
import { GroupQueryResultVPDImpListaArriboPartidaDetalle } from '../models/group-query-result-vpdimp-lista-arribo-partida-detalle';
import { ProveedorListaArriboPartidaObj } from '../models/proveedor-lista-arribo-partida-obj';
import { QueryResultVPDImpListaArriboPartidaDetalle } from '../models/query-result-vpdimp-lista-arribo-partida-detalle';
@Injectable({
  providedIn: 'root',
})
class ProcesosL07ImportacionesPlanificarDespachoService extends __BaseService {
  static readonly vImpOrdenDespachoDetalleGroupQueryResultPath = '/GrupoListavImpOrdenDespachoDetalle';
  static readonly vImpOrdenDespachoDetalleQueryResultPath = '/vImpOrdenDespachoDetalle';
  static readonly vPDImpListaArriboDetalleDatosGraficaSemaforoEntregaObjPath = '/DatosGraficaSemaforoEntregaObj';
  static readonly vPDImpListaArriboDetalleGroupQueryResultPath = '/GrupoListavPDImpListaArriboDetalle';
  static readonly vPDImpListaArriboDetalleProveedorListaArriboObjPath = '/ProveedorListaArriboObj';
  static readonly vPDImpListaArriboDetalleQueryResultPath = '/vPDImpListaArriboDetalle';
  static readonly vPDImpListaArriboPartidaDetalleGroupQueryResultPath = '/GrupoListavPDImpListaArriboPartidaDetalle';
  static readonly vPDImpListaArriboPartidaDetalleProveedorListaArriboObjPath = '/ProveedorListaArriboPartidaObj';
  static readonly vPDImpListaArriboPartidaDetalleQueryResultPath = '/vPDImpListaArriboPartidaDetalle';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * GroupQueryResult vImpOrdenDespachoDetalle
   * @param info undefined
   * @return OK
   */
  vImpOrdenDespachoDetalleGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultVImpOrdenDespachoDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListavImpOrdenDespachoDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultVImpOrdenDespachoDetalle>;
      })
    );
  }
  /**
   * GroupQueryResult vImpOrdenDespachoDetalle
   * @param info undefined
   * @return OK
   */
  vImpOrdenDespachoDetalleGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultVImpOrdenDespachoDetalle> {
    return this.vImpOrdenDespachoDetalleGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultVImpOrdenDespachoDetalle)
    );
  }

  /**
   * Consultar lista paginada de vImpOrdenDespachoDetalle
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vImpOrdenDespachoDetalleQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVImpOrdenDespachoDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vImpOrdenDespachoDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVImpOrdenDespachoDetalle>;
      })
    );
  }
  /**
   * Consultar lista paginada de vImpOrdenDespachoDetalle
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vImpOrdenDespachoDetalleQueryResult(info: QueryInfo): __Observable<QueryResultVImpOrdenDespachoDetalle> {
    return this.vImpOrdenDespachoDetalleQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVImpOrdenDespachoDetalle)
    );
  }

  /**
   * DatosGraficaSemaforoEntregaObj vPDImpListaArriboDetalle
   * @param info undefined
   * @return OK
   */
  vPDImpListaArriboDetalleDatosGraficaSemaforoEntregaObjResponse(info: QueryInfo): __Observable<__StrictHttpResponse<DatosGraficaSemaforoEntregaObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/DatosGraficaSemaforoEntregaObj`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DatosGraficaSemaforoEntregaObj>;
      })
    );
  }
  /**
   * DatosGraficaSemaforoEntregaObj vPDImpListaArriboDetalle
   * @param info undefined
   * @return OK
   */
  vPDImpListaArriboDetalleDatosGraficaSemaforoEntregaObj(info: QueryInfo): __Observable<DatosGraficaSemaforoEntregaObj> {
    return this.vPDImpListaArriboDetalleDatosGraficaSemaforoEntregaObjResponse(info).pipe(
      __map(_r => _r.body as DatosGraficaSemaforoEntregaObj)
    );
  }

  /**
   * GroupQueryResult vPDImpListaArriboDetalle
   * @param info undefined
   * @return OK
   */
  vPDImpListaArriboDetalleGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultVPDImpListaArriboDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListavPDImpListaArriboDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultVPDImpListaArriboDetalle>;
      })
    );
  }
  /**
   * GroupQueryResult vPDImpListaArriboDetalle
   * @param info undefined
   * @return OK
   */
  vPDImpListaArriboDetalleGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultVPDImpListaArriboDetalle> {
    return this.vPDImpListaArriboDetalleGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultVPDImpListaArriboDetalle)
    );
  }

  /**
   * ProveedorListaArriboObj vPDImpListaArriboDetalle
   * @param info undefined
   * @return OK
   */
  vPDImpListaArriboDetalleProveedorListaArriboObjResponse(info: QueryInfo): __Observable<__StrictHttpResponse<Array<ProveedorListaArriboObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ProveedorListaArriboObj`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ProveedorListaArriboObj>>;
      })
    );
  }
  /**
   * ProveedorListaArriboObj vPDImpListaArriboDetalle
   * @param info undefined
   * @return OK
   */
  vPDImpListaArriboDetalleProveedorListaArriboObj(info: QueryInfo): __Observable<Array<ProveedorListaArriboObj>> {
    return this.vPDImpListaArriboDetalleProveedorListaArriboObjResponse(info).pipe(
      __map(_r => _r.body as Array<ProveedorListaArriboObj>)
    );
  }

  /**
   * Consultar lista paginada de vPDImpListaArriboDetalle
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vPDImpListaArriboDetalleQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPDImpListaArriboDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPDImpListaArriboDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPDImpListaArriboDetalle>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPDImpListaArriboDetalle
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vPDImpListaArriboDetalleQueryResult(info: QueryInfo): __Observable<QueryResultVPDImpListaArriboDetalle> {
    return this.vPDImpListaArriboDetalleQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPDImpListaArriboDetalle)
    );
  }

  /**
   * GroupQueryResult vPDImpListaArriboPartidaDetalle
   * @param info undefined
   * @return OK
   */
  vPDImpListaArriboPartidaDetalleGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultVPDImpListaArriboPartidaDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListavPDImpListaArriboPartidaDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultVPDImpListaArriboPartidaDetalle>;
      })
    );
  }
  /**
   * GroupQueryResult vPDImpListaArriboPartidaDetalle
   * @param info undefined
   * @return OK
   */
  vPDImpListaArriboPartidaDetalleGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultVPDImpListaArriboPartidaDetalle> {
    return this.vPDImpListaArriboPartidaDetalleGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultVPDImpListaArriboPartidaDetalle)
    );
  }

  /**
   * ProveedorListaArriboObj vPDImpListaArriboPartidaDetalle
   * @param info undefined
   * @return OK
   */
  vPDImpListaArriboPartidaDetalleProveedorListaArriboObjResponse(info: QueryInfo): __Observable<__StrictHttpResponse<Array<ProveedorListaArriboPartidaObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ProveedorListaArriboPartidaObj`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ProveedorListaArriboPartidaObj>>;
      })
    );
  }
  /**
   * ProveedorListaArriboObj vPDImpListaArriboPartidaDetalle
   * @param info undefined
   * @return OK
   */
  vPDImpListaArriboPartidaDetalleProveedorListaArriboObj(info: QueryInfo): __Observable<Array<ProveedorListaArriboPartidaObj>> {
    return this.vPDImpListaArriboPartidaDetalleProveedorListaArriboObjResponse(info).pipe(
      __map(_r => _r.body as Array<ProveedorListaArriboPartidaObj>)
    );
  }

  /**
   * Consultar lista paginada de vPDImpListaArriboPartidaDetalle
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vPDImpListaArriboPartidaDetalleQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPDImpListaArriboPartidaDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPDImpListaArriboPartidaDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPDImpListaArriboPartidaDetalle>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPDImpListaArriboPartidaDetalle
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vPDImpListaArriboPartidaDetalleQueryResult(info: QueryInfo): __Observable<QueryResultVPDImpListaArriboPartidaDetalle> {
    return this.vPDImpListaArriboPartidaDetalleQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPDImpListaArriboPartidaDetalle)
    );
  }
}

module ProcesosL07ImportacionesPlanificarDespachoService {
}

export { ProcesosL07ImportacionesPlanificarDespachoService }
