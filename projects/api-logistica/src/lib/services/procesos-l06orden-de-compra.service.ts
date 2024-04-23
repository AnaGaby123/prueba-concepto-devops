/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { OcFacturaProveedor } from '../models/oc-factura-proveedor';
import { QueryResultOcFacturaProveedor } from '../models/query-result-oc-factura-proveedor';
import { QueryInfo } from '../models/query-info';
import { OcOrdenDeCompra } from '../models/oc-orden-de-compra';
import { QueryResultOcOrdenDeCompra } from '../models/query-result-oc-orden-de-compra';
import { QueryResultVOcOrdenDeCompraMonitorear } from '../models/query-result-voc-orden-de-compra-monitorear';
import { GroupQueryResultVOcOrdenDeCompraMonitorearDetalle } from '../models/group-query-result-voc-orden-de-compra-monitorear-detalle';
import { GroupQueryInfo } from '../models/group-query-info';
import { QueryResultVOcOrdenDeCompraMonitorearDetalle } from '../models/query-result-voc-orden-de-compra-monitorear-detalle';
import { QueryResultVOcProveedor } from '../models/query-result-voc-proveedor';
import { QueryResultVOcProveedorMarcaFamiliaMonitorear } from '../models/query-result-voc-proveedor-marca-familia-monitorear';
@Injectable({
  providedIn: 'root',
})
class ProcesosL06OrdenDeCompraService extends __BaseService {
  static readonly ocFacturaProveedorObtenerPath = '/ocFacturaProveedor';
  static readonly ocFacturaProveedorGuardarOActualizarPath = '/ocFacturaProveedor';
  static readonly ocFacturaProveedorQueryResultPath = '/ocFacturaProveedor';
  static readonly ocFacturaProveedorDesactivarPath = '/ocFacturaProveedor';
  static readonly ocOrdenDeCompraObtenerPath = '/ocOrdenDeCompra';
  static readonly ocOrdenDeCompraGuardarOActualizarPath = '/ocOrdenDeCompra';
  static readonly ocOrdenDeCompraQueryResultPath = '/ocOrdenDeCompra';
  static readonly ocOrdenDeCompraDesactivarPath = '/ocOrdenDeCompra';
  static readonly vOcOrdenDeCompraMonitorearQueryResultPath = '/vOcOrdenDeCompraMonitorear';
  static readonly vOcOrdenDeCompraMonitorearDetalleGroupQueryResultPath = '/GrupoListavOcOrdenDeCompraMonitorearDetalle';
  static readonly vOcOrdenDeCompraMonitorearDetalleQueryResultPath = '/vOcOrdenDeCompraMonitorearDetalle';
  static readonly vOcProveedorQueryResultPath = '/vOcProveedor';
  static readonly vOcProveedorMarcaFamiliaMonitorearQueryResultPath = '/vOcProveedorMarcaFamiliaMonitorear';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de ocFacturaProveedor
   * @param idocFacturaProveedor Identificador de ocFacturaProveedor
   * @return OK
   */
  ocFacturaProveedorObtenerResponse(idocFacturaProveedor: string): __Observable<__StrictHttpResponse<OcFacturaProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocFacturaProveedor != null) __params = __params.set('idocFacturaProveedor', idocFacturaProveedor.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ocFacturaProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OcFacturaProveedor>;
      })
    );
  }
  /**
   * Consultar registro de ocFacturaProveedor
   * @param idocFacturaProveedor Identificador de ocFacturaProveedor
   * @return OK
   */
  ocFacturaProveedorObtener(idocFacturaProveedor: string): __Observable<OcFacturaProveedor> {
    return this.ocFacturaProveedorObtenerResponse(idocFacturaProveedor).pipe(
      __map(_r => _r.body as OcFacturaProveedor)
    );
  }

  /**
   * Guardar o actualizar ocFacturaProveedor
   * @param ocFacturaProveedor ocFacturaProveedor
   * @return OK
   */
  ocFacturaProveedorGuardarOActualizarResponse(ocFacturaProveedor: OcFacturaProveedor): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ocFacturaProveedor;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ocFacturaProveedor`,
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
   * Guardar o actualizar ocFacturaProveedor
   * @param ocFacturaProveedor ocFacturaProveedor
   * @return OK
   */
  ocFacturaProveedorGuardarOActualizar(ocFacturaProveedor: OcFacturaProveedor): __Observable<string> {
    return this.ocFacturaProveedorGuardarOActualizarResponse(ocFacturaProveedor).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ocFacturaProveedor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocFacturaProveedorQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultOcFacturaProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ocFacturaProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultOcFacturaProveedor>;
      })
    );
  }
  /**
   * Consultar lista paginada de ocFacturaProveedor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocFacturaProveedorQueryResult(info: QueryInfo): __Observable<QueryResultOcFacturaProveedor> {
    return this.ocFacturaProveedorQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultOcFacturaProveedor)
    );
  }

  /**
   * Desactivar registro de ocFacturaProveedor
   * @param idocFacturaProveedor Identificador de registro de ocFacturaProveedor
   * @return OK
   */
  ocFacturaProveedorDesactivarResponse(idocFacturaProveedor: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocFacturaProveedor != null) __params = __params.set('idocFacturaProveedor', idocFacturaProveedor.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ocFacturaProveedor`,
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
   * Desactivar registro de ocFacturaProveedor
   * @param idocFacturaProveedor Identificador de registro de ocFacturaProveedor
   * @return OK
   */
  ocFacturaProveedorDesactivar(idocFacturaProveedor: string): __Observable<string> {
    return this.ocFacturaProveedorDesactivarResponse(idocFacturaProveedor).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ocOrdenDeCompra
   * @param idocOrdenDeCompra Identificador de ocOrdenDeCompra
   * @return OK
   */
  ocOrdenDeCompraObtenerResponse(idocOrdenDeCompra: string): __Observable<__StrictHttpResponse<OcOrdenDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocOrdenDeCompra != null) __params = __params.set('idocOrdenDeCompra', idocOrdenDeCompra.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ocOrdenDeCompra`,
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
   * Consultar registro de ocOrdenDeCompra
   * @param idocOrdenDeCompra Identificador de ocOrdenDeCompra
   * @return OK
   */
  ocOrdenDeCompraObtener(idocOrdenDeCompra: string): __Observable<OcOrdenDeCompra> {
    return this.ocOrdenDeCompraObtenerResponse(idocOrdenDeCompra).pipe(
      __map(_r => _r.body as OcOrdenDeCompra)
    );
  }

  /**
   * Guardar o actualizar ocOrdenDeCompra
   * @param ocOrdenDeCompra ocOrdenDeCompra
   * @return OK
   */
  ocOrdenDeCompraGuardarOActualizarResponse(ocOrdenDeCompra: OcOrdenDeCompra): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ocOrdenDeCompra;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ocOrdenDeCompra`,
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
   * Guardar o actualizar ocOrdenDeCompra
   * @param ocOrdenDeCompra ocOrdenDeCompra
   * @return OK
   */
  ocOrdenDeCompraGuardarOActualizar(ocOrdenDeCompra: OcOrdenDeCompra): __Observable<string> {
    return this.ocOrdenDeCompraGuardarOActualizarResponse(ocOrdenDeCompra).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ocOrdenDeCompra
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocOrdenDeCompraQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultOcOrdenDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ocOrdenDeCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultOcOrdenDeCompra>;
      })
    );
  }
  /**
   * Consultar lista paginada de ocOrdenDeCompra
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocOrdenDeCompraQueryResult(info: QueryInfo): __Observable<QueryResultOcOrdenDeCompra> {
    return this.ocOrdenDeCompraQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultOcOrdenDeCompra)
    );
  }

  /**
   * Desactivar registro de ocOrdenDeCompra
   * @param idocOrdenDeCompra Identificador de registro de ocOrdenDeCompra
   * @return OK
   */
  ocOrdenDeCompraDesactivarResponse(idocOrdenDeCompra: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocOrdenDeCompra != null) __params = __params.set('idocOrdenDeCompra', idocOrdenDeCompra.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ocOrdenDeCompra`,
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
   * Desactivar registro de ocOrdenDeCompra
   * @param idocOrdenDeCompra Identificador de registro de ocOrdenDeCompra
   * @return OK
   */
  ocOrdenDeCompraDesactivar(idocOrdenDeCompra: string): __Observable<string> {
    return this.ocOrdenDeCompraDesactivarResponse(idocOrdenDeCompra).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de vOcOrdenDeCompraMonitorear
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcOrdenDeCompraMonitorearQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVOcOrdenDeCompraMonitorear>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vOcOrdenDeCompraMonitorear`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVOcOrdenDeCompraMonitorear>;
      })
    );
  }
  /**
   * Consultar lista paginada de vOcOrdenDeCompraMonitorear
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcOrdenDeCompraMonitorearQueryResult(info: QueryInfo): __Observable<QueryResultVOcOrdenDeCompraMonitorear> {
    return this.vOcOrdenDeCompraMonitorearQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVOcOrdenDeCompraMonitorear)
    );
  }

  /**
   * GroupQueryResult vOcOrdenDeCompraMonitorearDetalle
   * @param info undefined
   * @return OK
   */
  vOcOrdenDeCompraMonitorearDetalleGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultVOcOrdenDeCompraMonitorearDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListavOcOrdenDeCompraMonitorearDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultVOcOrdenDeCompraMonitorearDetalle>;
      })
    );
  }
  /**
   * GroupQueryResult vOcOrdenDeCompraMonitorearDetalle
   * @param info undefined
   * @return OK
   */
  vOcOrdenDeCompraMonitorearDetalleGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultVOcOrdenDeCompraMonitorearDetalle> {
    return this.vOcOrdenDeCompraMonitorearDetalleGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultVOcOrdenDeCompraMonitorearDetalle)
    );
  }

  /**
   * Consultar lista paginada de vOcOrdenDeCompraMonitorerDetalle
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcOrdenDeCompraMonitorearDetalleQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVOcOrdenDeCompraMonitorearDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vOcOrdenDeCompraMonitorearDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVOcOrdenDeCompraMonitorearDetalle>;
      })
    );
  }
  /**
   * Consultar lista paginada de vOcOrdenDeCompraMonitorerDetalle
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcOrdenDeCompraMonitorearDetalleQueryResult(info: QueryInfo): __Observable<QueryResultVOcOrdenDeCompraMonitorearDetalle> {
    return this.vOcOrdenDeCompraMonitorearDetalleQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVOcOrdenDeCompraMonitorearDetalle)
    );
  }

  /**
   * Consultar lista paginada de  vOcProveedor
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcProveedorQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVOcProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vOcProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVOcProveedor>;
      })
    );
  }
  /**
   * Consultar lista paginada de  vOcProveedor
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcProveedorQueryResult(info: QueryInfo): __Observable<QueryResultVOcProveedor> {
    return this.vOcProveedorQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVOcProveedor)
    );
  }

  /**
   * Consultar lista paginada de vOcProveedorFamiliaMonitorear
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcProveedorMarcaFamiliaMonitorearQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVOcProveedorMarcaFamiliaMonitorear>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vOcProveedorMarcaFamiliaMonitorear`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVOcProveedorMarcaFamiliaMonitorear>;
      })
    );
  }
  /**
   * Consultar lista paginada de vOcProveedorFamiliaMonitorear
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcProveedorMarcaFamiliaMonitorearQueryResult(info: QueryInfo): __Observable<QueryResultVOcProveedorMarcaFamiliaMonitorear> {
    return this.vOcProveedorMarcaFamiliaMonitorearQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVOcProveedorMarcaFamiliaMonitorear)
    );
  }
}

module ProcesosL06OrdenDeCompraService {
}

export { ProcesosL06OrdenDeCompraService }
