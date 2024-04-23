/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { OcOrdenDeCompra } from '../models/oc-orden-de-compra';
import { CompradorActualizarPrecioProductoParametro } from '../models/comprador-actualizar-precio-producto-parametro';
import { QueryResultVMontoImportacionCCargarFactura } from '../models/query-result-vmonto-importacion-ccargar-factura';
import { QueryInfo } from '../models/query-info';
import { QueryResultVPartidaComprasCargarFactura } from '../models/query-result-vpartida-compras-cargar-factura';
@Injectable({
  providedIn: 'root',
})
class ProcesosL06OrdenDeCompraCargarFacturaService extends __BaseService {
  static readonly CompradorActualizarPrecioProductoProcessPath = '/CompradorActualizarPrecioProducto';
  static readonly CompradorCargarFacturaProductoProcessPath = '/CompradorCargarFacturaProducto';
  static readonly vMontoImportacionCCargarFacturaQueryResultPath = '/vMontoImportacionCCargarFactura';
  static readonly vPartidaComprasCargarFacturaQueryResultPath = '/vPartidaComprasCargarFactura';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Process CompradorActualizarPrecioProducto
   * @param param undefined
   * @return OK
   */
  CompradorActualizarPrecioProductoProcessResponse(param: CompradorActualizarPrecioProductoParametro): __Observable<__StrictHttpResponse<OcOrdenDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/CompradorActualizarPrecioProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OcOrdenDeCompra>;
      })
    );
  }
  /**
   * Process CompradorActualizarPrecioProducto
   * @param param undefined
   * @return OK
   */
  CompradorActualizarPrecioProductoProcess(param: CompradorActualizarPrecioProductoParametro): __Observable<OcOrdenDeCompra> {
    return this.CompradorActualizarPrecioProductoProcessResponse(param).pipe(
      __map(_r => _r.body as OcOrdenDeCompra)
    );
  }

  /**
   * Process CompradorCargarFacturaProducto
   * @param params The `ProcesosL06OrdenDeCompraCargarFacturaService.CompradorCargarFacturaProductoProcessParams` containing the following parameters:
   *
   * - `idOcPartida`:
   *
   * - `idOcFacturaProveedor`:
   *
   * @return OK
   */
  CompradorCargarFacturaProductoProcessResponse(params: ProcesosL06OrdenDeCompraCargarFacturaService.CompradorCargarFacturaProductoProcessParams): __Observable<__StrictHttpResponse<OcOrdenDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idOcPartida != null) __params = __params.set('idOcPartida', params.idOcPartida.toString());
    if (params.idOcFacturaProveedor != null) __params = __params.set('idOcFacturaProveedor', params.idOcFacturaProveedor.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/CompradorCargarFacturaProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OcOrdenDeCompra>;
      })
    );
  }
  /**
   * Process CompradorCargarFacturaProducto
   * @param params The `ProcesosL06OrdenDeCompraCargarFacturaService.CompradorCargarFacturaProductoProcessParams` containing the following parameters:
   *
   * - `idOcPartida`:
   *
   * - `idOcFacturaProveedor`:
   *
   * @return OK
   */
  CompradorCargarFacturaProductoProcess(params: ProcesosL06OrdenDeCompraCargarFacturaService.CompradorCargarFacturaProductoProcessParams): __Observable<OcOrdenDeCompra> {
    return this.CompradorCargarFacturaProductoProcessResponse(params).pipe(
      __map(_r => _r.body as OcOrdenDeCompra)
    );
  }

  /**
   * Consultar lista paginada de vMontoImportacionCCargarFactura
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vMontoImportacionCCargarFacturaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVMontoImportacionCCargarFactura>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vMontoImportacionCCargarFactura`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVMontoImportacionCCargarFactura>;
      })
    );
  }
  /**
   * Consultar lista paginada de vMontoImportacionCCargarFactura
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vMontoImportacionCCargarFacturaQueryResult(info: QueryInfo): __Observable<QueryResultVMontoImportacionCCargarFactura> {
    return this.vMontoImportacionCCargarFacturaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVMontoImportacionCCargarFactura)
    );
  }

  /**
   * Consultar lista paginada de vPartidaComprasCargarFactura
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vPartidaComprasCargarFacturaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPartidaComprasCargarFactura>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPartidaComprasCargarFactura`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPartidaComprasCargarFactura>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPartidaComprasCargarFactura
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vPartidaComprasCargarFacturaQueryResult(info: QueryInfo): __Observable<QueryResultVPartidaComprasCargarFactura> {
    return this.vPartidaComprasCargarFacturaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPartidaComprasCargarFactura)
    );
  }
}

module ProcesosL06OrdenDeCompraCargarFacturaService {

  /**
   * Parameters for CompradorCargarFacturaProductoProcess
   */
  export interface CompradorCargarFacturaProductoProcessParams {
    idOcPartida?: string;
    idOcFacturaProveedor?: string;
  }
}

export { ProcesosL06OrdenDeCompraCargarFacturaService }
