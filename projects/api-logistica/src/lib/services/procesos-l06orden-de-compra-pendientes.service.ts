/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { OcPendienteCompraProducto } from '../models/oc-pendiente-compra-producto';
import { QueryResultOcPendienteCompraProducto } from '../models/query-result-oc-pendiente-compra-producto';
import { QueryInfo } from '../models/query-info';
import { VProveedor } from '../models/vproveedor';
import { OcPendienteStock } from '../models/oc-pendiente-stock';
import { QueryResultOcPendienteStock } from '../models/query-result-oc-pendiente-stock';
@Injectable({
  providedIn: 'root',
})
class ProcesosL06OrdenDeCompraPendientesService extends __BaseService {
  static readonly ocPendienteCompraProductoObtenerPath = '/ocPendienteCompraProducto';
  static readonly ocPendienteCompraProductoGuardarOActualizarPath = '/ocPendienteCompraProducto';
  static readonly ocPendienteCompraProductoQueryResultPath = '/ocPendienteCompraProducto';
  static readonly ocPendienteCompraProductoDesactivarPath = '/ocPendienteCompraProducto';
  static readonly ocPendienteCompraProductoExtensionsGenerarPartidasOcOrdenDeCompraPath = '/VincularOcPendientesDeCompraProducto';
  static readonly ocPendienteStockObtenerPath = '/ocPendienteStock';
  static readonly ocPendienteStockGuardarOActualizarPath = '/ocPendienteStock';
  static readonly ocPendienteStockQueryResultPath = '/ocPendienteStock';
  static readonly ocPendienteStockDesactivarPath = '/ocPendienteStock';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de ocPendienteCompraProducto
   * @param idocPendienteCompraProducto Identificador de ocPendienteCompraProducto
   * @return OK
   */
  ocPendienteCompraProductoObtenerResponse(idocPendienteCompraProducto: string): __Observable<__StrictHttpResponse<OcPendienteCompraProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocPendienteCompraProducto != null) __params = __params.set('idocPendienteCompraProducto', idocPendienteCompraProducto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ocPendienteCompraProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OcPendienteCompraProducto>;
      })
    );
  }
  /**
   * Consultar registro de ocPendienteCompraProducto
   * @param idocPendienteCompraProducto Identificador de ocPendienteCompraProducto
   * @return OK
   */
  ocPendienteCompraProductoObtener(idocPendienteCompraProducto: string): __Observable<OcPendienteCompraProducto> {
    return this.ocPendienteCompraProductoObtenerResponse(idocPendienteCompraProducto).pipe(
      __map(_r => _r.body as OcPendienteCompraProducto)
    );
  }

  /**
   * Guardar o actualizar ocPendienteCompraProducto
   * @param ocPendienteCompraProducto ocPendienteCompraProducto
   * @return OK
   */
  ocPendienteCompraProductoGuardarOActualizarResponse(ocPendienteCompraProducto: OcPendienteCompraProducto): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ocPendienteCompraProducto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ocPendienteCompraProducto`,
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
   * Guardar o actualizar ocPendienteCompraProducto
   * @param ocPendienteCompraProducto ocPendienteCompraProducto
   * @return OK
   */
  ocPendienteCompraProductoGuardarOActualizar(ocPendienteCompraProducto: OcPendienteCompraProducto): __Observable<string> {
    return this.ocPendienteCompraProductoGuardarOActualizarResponse(ocPendienteCompraProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ocPendienteCompraProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocPendienteCompraProductoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultOcPendienteCompraProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ocPendienteCompraProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultOcPendienteCompraProducto>;
      })
    );
  }
  /**
   * Consultar lista paginada de ocPendienteCompraProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocPendienteCompraProductoQueryResult(info: QueryInfo): __Observable<QueryResultOcPendienteCompraProducto> {
    return this.ocPendienteCompraProductoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultOcPendienteCompraProducto)
    );
  }

  /**
   * Desactivar registro de ocPendienteCompraProducto
   * @param idocPendienteCompraProducto Identificador de registro de ocPendienteCompraProducto
   * @return OK
   */
  ocPendienteCompraProductoDesactivarResponse(idocPendienteCompraProducto: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocPendienteCompraProducto != null) __params = __params.set('idocPendienteCompraProducto', idocPendienteCompraProducto.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ocPendienteCompraProducto`,
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
   * Desactivar registro de ocPendienteCompraProducto
   * @param idocPendienteCompraProducto Identificador de registro de ocPendienteCompraProducto
   * @return OK
   */
  ocPendienteCompraProductoDesactivar(idocPendienteCompraProducto: string): __Observable<string> {
    return this.ocPendienteCompraProductoDesactivarResponse(idocPendienteCompraProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * GenerarPartidasOcOrdenDeCompra ocPendienteCompraProductoExtensions
   * @param params The `ProcesosL06OrdenDeCompraPendientesService.OcPendienteCompraProductoExtensionsGenerarPartidasOcOrdenDeCompraParams` containing the following parameters:
   *
   * - `idProveedor`:
   *
   * - `ListaIdOcPendienteCompraProducto`:
   *
   * @return OK
   */
  ocPendienteCompraProductoExtensionsGenerarPartidasOcOrdenDeCompraResponse(params: ProcesosL06OrdenDeCompraPendientesService.OcPendienteCompraProductoExtensionsGenerarPartidasOcOrdenDeCompraParams): __Observable<__StrictHttpResponse<VProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idProveedor != null) __params = __params.set('idProveedor', params.idProveedor.toString());
    __body = params.ListaIdOcPendienteCompraProducto;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/VincularOcPendientesDeCompraProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VProveedor>;
      })
    );
  }
  /**
   * GenerarPartidasOcOrdenDeCompra ocPendienteCompraProductoExtensions
   * @param params The `ProcesosL06OrdenDeCompraPendientesService.OcPendienteCompraProductoExtensionsGenerarPartidasOcOrdenDeCompraParams` containing the following parameters:
   *
   * - `idProveedor`:
   *
   * - `ListaIdOcPendienteCompraProducto`:
   *
   * @return OK
   */
  ocPendienteCompraProductoExtensionsGenerarPartidasOcOrdenDeCompra(params: ProcesosL06OrdenDeCompraPendientesService.OcPendienteCompraProductoExtensionsGenerarPartidasOcOrdenDeCompraParams): __Observable<VProveedor> {
    return this.ocPendienteCompraProductoExtensionsGenerarPartidasOcOrdenDeCompraResponse(params).pipe(
      __map(_r => _r.body as VProveedor)
    );
  }

  /**
   * Consultar registro de ocPendienteStock
   * @param idocPendienteStock Identificador de ocPendienteStock
   * @return OK
   */
  ocPendienteStockObtenerResponse(idocPendienteStock: string): __Observable<__StrictHttpResponse<OcPendienteStock>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocPendienteStock != null) __params = __params.set('idocPendienteStock', idocPendienteStock.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ocPendienteStock`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OcPendienteStock>;
      })
    );
  }
  /**
   * Consultar registro de ocPendienteStock
   * @param idocPendienteStock Identificador de ocPendienteStock
   * @return OK
   */
  ocPendienteStockObtener(idocPendienteStock: string): __Observable<OcPendienteStock> {
    return this.ocPendienteStockObtenerResponse(idocPendienteStock).pipe(
      __map(_r => _r.body as OcPendienteStock)
    );
  }

  /**
   * Guardar o actualizar ocPendienteStock
   * @param ocPendienteStock ocPendienteStock
   * @return OK
   */
  ocPendienteStockGuardarOActualizarResponse(ocPendienteStock: OcPendienteStock): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ocPendienteStock;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ocPendienteStock`,
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
   * Guardar o actualizar ocPendienteStock
   * @param ocPendienteStock ocPendienteStock
   * @return OK
   */
  ocPendienteStockGuardarOActualizar(ocPendienteStock: OcPendienteStock): __Observable<string> {
    return this.ocPendienteStockGuardarOActualizarResponse(ocPendienteStock).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ocPendienteStock
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocPendienteStockQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultOcPendienteStock>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ocPendienteStock`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultOcPendienteStock>;
      })
    );
  }
  /**
   * Consultar lista paginada de ocPendienteStock
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocPendienteStockQueryResult(info: QueryInfo): __Observable<QueryResultOcPendienteStock> {
    return this.ocPendienteStockQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultOcPendienteStock)
    );
  }

  /**
   * Desactivar registro de ocPendienteStock
   * @param idocPendienteStock Identificador de registro de ocPendienteStock
   * @return OK
   */
  ocPendienteStockDesactivarResponse(idocPendienteStock: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocPendienteStock != null) __params = __params.set('idocPendienteStock', idocPendienteStock.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ocPendienteStock`,
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
   * Desactivar registro de ocPendienteStock
   * @param idocPendienteStock Identificador de registro de ocPendienteStock
   * @return OK
   */
  ocPendienteStockDesactivar(idocPendienteStock: string): __Observable<string> {
    return this.ocPendienteStockDesactivarResponse(idocPendienteStock).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ProcesosL06OrdenDeCompraPendientesService {

  /**
   * Parameters for ocPendienteCompraProductoExtensionsGenerarPartidasOcOrdenDeCompra
   */
  export interface OcPendienteCompraProductoExtensionsGenerarPartidasOcOrdenDeCompraParams {
    idProveedor: string;
    ListaIdOcPendienteCompraProducto: Array<string>;
  }
}

export { ProcesosL06OrdenDeCompraPendientesService }
