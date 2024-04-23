/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { OcPartidaEdicionBackOrderHistorial } from '../models/oc-partida-edicion-back-order-historial';
import { VOcProductoTotalesGBackOrder } from '../models/voc-producto-totales-gback-order';
import { ParametroModificacionMasivaBackOrder } from '../models/parametro-modificacion-masiva-back-order';
import { QueryResultVOcOrdenDeCompraGBackOrder } from '../models/query-result-voc-orden-de-compra-gback-order';
import { QueryInfo } from '../models/query-info';
import { QueryResultVOcPartidaGBackOrder } from '../models/query-result-voc-partida-gback-order';
import { QueryResultVOcProductoTotalesGBackOrder } from '../models/query-result-voc-producto-totales-gback-order';
import { QueryResultVOcProveedorMarcaFamiliaBackOrder } from '../models/query-result-voc-proveedor-marca-familia-back-order';
@Injectable({
  providedIn: 'root',
})
class ProcesosL06OrdenDeCompraGestionarBackOrderService extends __BaseService {
  static readonly HistorialBackOrderProcessPath = '/HistorialBackOrder';
  static readonly ModificacionMasivaBackOrderProcessPath = '/ModificacionMasivaBackOrder';
  static readonly vOcOrdenDeCompraGBackOrderQueryResultPath = '/vOcOrdenDeCompraGBackOrder';
  static readonly vOcPartidaGBackOrderQueryResultPath = '/vOcPartidaGBackOrder';
  static readonly vOcProductoTotalesGBackOrderQueryResultPath = '/vOcProductoTotalesGBackOrder';
  static readonly vOcProveedorMarcaFamiliaBackOrderQueryResultPath = '/vOcProveedorMarcaFamiliaBackOrder';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Process HistorialBackOrder
   * @param idProducto undefined
   * @return OK
   */
  HistorialBackOrderProcessResponse(idProducto: string): __Observable<__StrictHttpResponse<Array<OcPartidaEdicionBackOrderHistorial>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProducto != null) __params = __params.set('idProducto', idProducto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/HistorialBackOrder`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<OcPartidaEdicionBackOrderHistorial>>;
      })
    );
  }
  /**
   * Process HistorialBackOrder
   * @param idProducto undefined
   * @return OK
   */
  HistorialBackOrderProcess(idProducto: string): __Observable<Array<OcPartidaEdicionBackOrderHistorial>> {
    return this.HistorialBackOrderProcessResponse(idProducto).pipe(
      __map(_r => _r.body as Array<OcPartidaEdicionBackOrderHistorial>)
    );
  }

  /**
   * Process ModificacionMasivaBackOrder
   * @param param undefined
   * @return OK
   */
  ModificacionMasivaBackOrderProcessResponse(param: ParametroModificacionMasivaBackOrder): __Observable<__StrictHttpResponse<VOcProductoTotalesGBackOrder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ModificacionMasivaBackOrder`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VOcProductoTotalesGBackOrder>;
      })
    );
  }
  /**
   * Process ModificacionMasivaBackOrder
   * @param param undefined
   * @return OK
   */
  ModificacionMasivaBackOrderProcess(param: ParametroModificacionMasivaBackOrder): __Observable<VOcProductoTotalesGBackOrder> {
    return this.ModificacionMasivaBackOrderProcessResponse(param).pipe(
      __map(_r => _r.body as VOcProductoTotalesGBackOrder)
    );
  }

  /**
   * Consultar lista paginada de vOcOrdenDeCompraGBackOrder
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcOrdenDeCompraGBackOrderQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVOcOrdenDeCompraGBackOrder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vOcOrdenDeCompraGBackOrder`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVOcOrdenDeCompraGBackOrder>;
      })
    );
  }
  /**
   * Consultar lista paginada de vOcOrdenDeCompraGBackOrder
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcOrdenDeCompraGBackOrderQueryResult(info: QueryInfo): __Observable<QueryResultVOcOrdenDeCompraGBackOrder> {
    return this.vOcOrdenDeCompraGBackOrderQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVOcOrdenDeCompraGBackOrder)
    );
  }

  /**
   * Consultar lista paginada de vOcPartidaGBackOrder
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcPartidaGBackOrderQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVOcPartidaGBackOrder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vOcPartidaGBackOrder`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVOcPartidaGBackOrder>;
      })
    );
  }
  /**
   * Consultar lista paginada de vOcPartidaGBackOrder
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcPartidaGBackOrderQueryResult(info: QueryInfo): __Observable<QueryResultVOcPartidaGBackOrder> {
    return this.vOcPartidaGBackOrderQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVOcPartidaGBackOrder)
    );
  }

  /**
   * Consultar lista paginada de vOcProductoTotalesGBackOrder
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcProductoTotalesGBackOrderQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVOcProductoTotalesGBackOrder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vOcProductoTotalesGBackOrder`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVOcProductoTotalesGBackOrder>;
      })
    );
  }
  /**
   * Consultar lista paginada de vOcProductoTotalesGBackOrder
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcProductoTotalesGBackOrderQueryResult(info: QueryInfo): __Observable<QueryResultVOcProductoTotalesGBackOrder> {
    return this.vOcProductoTotalesGBackOrderQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVOcProductoTotalesGBackOrder)
    );
  }

  /**
   * Consultar lista paginada de vOcProveedorFamiliaBackOrder
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcProveedorMarcaFamiliaBackOrderQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVOcProveedorMarcaFamiliaBackOrder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vOcProveedorMarcaFamiliaBackOrder`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVOcProveedorMarcaFamiliaBackOrder>;
      })
    );
  }
  /**
   * Consultar lista paginada de vOcProveedorFamiliaBackOrder
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcProveedorMarcaFamiliaBackOrderQueryResult(info: QueryInfo): __Observable<QueryResultVOcProveedorMarcaFamiliaBackOrder> {
    return this.vOcProveedorMarcaFamiliaBackOrderQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVOcProveedorMarcaFamiliaBackOrder)
    );
  }
}

module ProcesosL06OrdenDeCompraGestionarBackOrderService {
}

export { ProcesosL06OrdenDeCompraGestionarBackOrderService }
