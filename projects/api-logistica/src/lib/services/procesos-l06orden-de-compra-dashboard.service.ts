/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CargarFacturaDonaTotales } from '../models/cargar-factura-dona-totales';
import { TramitarCompraDonas } from '../models/tramitar-compra-donas';
import { TramitarCompraElaborar } from '../models/tramitar-compra-elaborar';
import { QueryResultVOcOrdenDeCompra } from '../models/query-result-voc-orden-de-compra';
import { QueryInfo } from '../models/query-info';
import { VProductoOcPendienteCompra } from '../models/vproducto-oc-pendiente-compra';
import { QueryResultVProductoOcPendienteCompra } from '../models/query-result-vproducto-oc-pendiente-compra';
import { QueryResultVProductoOcPendienteCompraTransito } from '../models/query-result-vproducto-oc-pendiente-compra-transito';
import { VProveedorCCargarFactura } from '../models/vproveedor-ccargar-factura';
import { QueryResultVProveedorCCargarFactura } from '../models/query-result-vproveedor-ccargar-factura';
import { VProveedorOcPendienteCompra } from '../models/vproveedor-oc-pendiente-compra';
import { QueryResultVProveedorOcPendienteCompra } from '../models/query-result-vproveedor-oc-pendiente-compra';
@Injectable({
  providedIn: 'root',
})
class ProcesosL06OrdenDeCompraDashboardService extends __BaseService {
  static readonly CargarFacturaDonaTotalesObtenerPath = '/CargarFacturaDonaTotales';
  static readonly TramitarCompraDonasObtenerPath = '/TramitarCompraDonas';
  static readonly TramitarCompraElaborarObtenerPath = '/TramitarCompraElaborar';
  static readonly vOcOrdenDeCompraQueryResultPath = '/vOcOrdenDeCompra';
  static readonly vProductoOcPendienteCompraObtenerPath = '/vProductoOcPendienteCompra';
  static readonly vProductoOcPendienteCompraQueryResultPath = '/vProductoOcPendienteCompra';
  static readonly vProductoOcPendienteCompraTransitoQueryResultPath = '/vProductoOcPendienteCompraTransito';
  static readonly vProveedorCCargarFacturaObtenerProveedorEsNacionalPath = '/proveedorEsNacional';
  static readonly vProveedorCCargarFacturaObtenerPath = '/vProveedorCCargarFactura';
  static readonly vProveedorCCargarFacturaQueryResultPath = '/vProveedorCCargarFactura';
  static readonly vProveedorOcPendienteCompraObtenerPath = '/vProveedorOcPendienteCompra';
  static readonly vProveedorOcPendienteCompraQueryResultPath = '/vProveedorOcPendienteCompra';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener CargarFacturaDonaTotales
   * @param idUsuario undefined
   * @return OK
   */
  CargarFacturaDonaTotalesObtenerResponse(idUsuario: string): __Observable<__StrictHttpResponse<CargarFacturaDonaTotales>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idUsuario != null) __params = __params.set('idUsuario', idUsuario.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CargarFacturaDonaTotales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CargarFacturaDonaTotales>;
      })
    );
  }
  /**
   * Obtener CargarFacturaDonaTotales
   * @param idUsuario undefined
   * @return OK
   */
  CargarFacturaDonaTotalesObtener(idUsuario: string): __Observable<CargarFacturaDonaTotales> {
    return this.CargarFacturaDonaTotalesObtenerResponse(idUsuario).pipe(
      __map(_r => _r.body as CargarFacturaDonaTotales)
    );
  }

  /**
   * Obtener TramitarCompraDonas
   * @return OK
   */
  TramitarCompraDonasObtenerResponse(): __Observable<__StrictHttpResponse<TramitarCompraDonas>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/TramitarCompraDonas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TramitarCompraDonas>;
      })
    );
  }
  /**
   * Obtener TramitarCompraDonas
   * @return OK
   */
  TramitarCompraDonasObtener(): __Observable<TramitarCompraDonas> {
    return this.TramitarCompraDonasObtenerResponse().pipe(
      __map(_r => _r.body as TramitarCompraDonas)
    );
  }

  /**
   * Obtener TramitarCompraElaborar
   * @param params The `ProcesosL06OrdenDeCompraDashboardService.TramitarCompraElaborarObtenerParams` containing the following parameters:
   *
   * - `idProveedor`:
   *
   * - `separado`:
   *
   * @return OK
   */
  TramitarCompraElaborarObtenerResponse(params: ProcesosL06OrdenDeCompraDashboardService.TramitarCompraElaborarObtenerParams): __Observable<__StrictHttpResponse<TramitarCompraElaborar>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idProveedor != null) __params = __params.set('idProveedor', params.idProveedor.toString());
    if (params.separado != null) __params = __params.set('separado', params.separado.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/TramitarCompraElaborar`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TramitarCompraElaborar>;
      })
    );
  }
  /**
   * Obtener TramitarCompraElaborar
   * @param params The `ProcesosL06OrdenDeCompraDashboardService.TramitarCompraElaborarObtenerParams` containing the following parameters:
   *
   * - `idProveedor`:
   *
   * - `separado`:
   *
   * @return OK
   */
  TramitarCompraElaborarObtener(params: ProcesosL06OrdenDeCompraDashboardService.TramitarCompraElaborarObtenerParams): __Observable<TramitarCompraElaborar> {
    return this.TramitarCompraElaborarObtenerResponse(params).pipe(
      __map(_r => _r.body as TramitarCompraElaborar)
    );
  }

  /**
   * Consultar lista paginada de vOcOrdenDeCompra
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vOcOrdenDeCompraQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVOcOrdenDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vOcOrdenDeCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVOcOrdenDeCompra>;
      })
    );
  }
  /**
   * Consultar lista paginada de vOcOrdenDeCompra
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vOcOrdenDeCompraQueryResult(info: QueryInfo): __Observable<QueryResultVOcOrdenDeCompra> {
    return this.vOcOrdenDeCompraQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVOcOrdenDeCompra)
    );
  }

  /**
   * Obtener vProductoOcPendienteCompra
   * @param idProducto undefined
   * @return OK
   */
  vProductoOcPendienteCompraObtenerResponse(idProducto: string): __Observable<__StrictHttpResponse<VProductoOcPendienteCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProducto != null) __params = __params.set('idProducto', idProducto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vProductoOcPendienteCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VProductoOcPendienteCompra>;
      })
    );
  }
  /**
   * Obtener vProductoOcPendienteCompra
   * @param idProducto undefined
   * @return OK
   */
  vProductoOcPendienteCompraObtener(idProducto: string): __Observable<VProductoOcPendienteCompra> {
    return this.vProductoOcPendienteCompraObtenerResponse(idProducto).pipe(
      __map(_r => _r.body as VProductoOcPendienteCompra)
    );
  }

  /**
   * Consultar lista paginada de vProductoOcPendienteCompra
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vProductoOcPendienteCompraQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVProductoOcPendienteCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vProductoOcPendienteCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVProductoOcPendienteCompra>;
      })
    );
  }
  /**
   * Consultar lista paginada de vProductoOcPendienteCompra
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vProductoOcPendienteCompraQueryResult(info: QueryInfo): __Observable<QueryResultVProductoOcPendienteCompra> {
    return this.vProductoOcPendienteCompraQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVProductoOcPendienteCompra)
    );
  }

  /**
   * Consultar lista paginada de vProductoOcPendienteCompraTransito
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vProductoOcPendienteCompraTransitoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVProductoOcPendienteCompraTransito>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vProductoOcPendienteCompraTransito`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVProductoOcPendienteCompraTransito>;
      })
    );
  }
  /**
   * Consultar lista paginada de vProductoOcPendienteCompraTransito
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vProductoOcPendienteCompraTransitoQueryResult(info: QueryInfo): __Observable<QueryResultVProductoOcPendienteCompraTransito> {
    return this.vProductoOcPendienteCompraTransitoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVProductoOcPendienteCompraTransito)
    );
  }

  /**
   * Consultar Proveedor si es Nacional
   * @param idProveedor idProveedor
   * @return OK
   */
  vProveedorCCargarFacturaObtenerProveedorEsNacionalResponse(idProveedor: string): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProveedor != null) __params = __params.set('idProveedor', idProveedor.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/proveedorEsNacional`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: (_r as HttpResponse<any>).body === 'true' }) as __StrictHttpResponse<boolean>
      })
    );
  }
  /**
   * Consultar Proveedor si es Nacional
   * @param idProveedor idProveedor
   * @return OK
   */
  vProveedorCCargarFacturaObtenerProveedorEsNacional(idProveedor: string): __Observable<boolean> {
    return this.vProveedorCCargarFacturaObtenerProveedorEsNacionalResponse(idProveedor).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * Obtener vProveedorCCargarFactura
   * @param idUsuario undefined
   * @return OK
   */
  vProveedorCCargarFacturaObtenerResponse(idUsuario: string): __Observable<__StrictHttpResponse<VProveedorCCargarFactura>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idUsuario != null) __params = __params.set('idUsuario', idUsuario.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vProveedorCCargarFactura`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VProveedorCCargarFactura>;
      })
    );
  }
  /**
   * Obtener vProveedorCCargarFactura
   * @param idUsuario undefined
   * @return OK
   */
  vProveedorCCargarFacturaObtener(idUsuario: string): __Observable<VProveedorCCargarFactura> {
    return this.vProveedorCCargarFacturaObtenerResponse(idUsuario).pipe(
      __map(_r => _r.body as VProveedorCCargarFactura)
    );
  }

  /**
   * Consultar lista paginada de vProveedorCCargarFactura
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vProveedorCCargarFacturaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVProveedorCCargarFactura>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vProveedorCCargarFactura`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVProveedorCCargarFactura>;
      })
    );
  }
  /**
   * Consultar lista paginada de vProveedorCCargarFactura
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vProveedorCCargarFacturaQueryResult(info: QueryInfo): __Observable<QueryResultVProveedorCCargarFactura> {
    return this.vProveedorCCargarFacturaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVProveedorCCargarFactura)
    );
  }

  /**
   * Obtener vProveedorOcPendienteCompra
   * @param idProveedor undefined
   * @return OK
   */
  vProveedorOcPendienteCompraObtenerResponse(idProveedor: string): __Observable<__StrictHttpResponse<VProveedorOcPendienteCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProveedor != null) __params = __params.set('idProveedor', idProveedor.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vProveedorOcPendienteCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VProveedorOcPendienteCompra>;
      })
    );
  }
  /**
   * Obtener vProveedorOcPendienteCompra
   * @param idProveedor undefined
   * @return OK
   */
  vProveedorOcPendienteCompraObtener(idProveedor: string): __Observable<VProveedorOcPendienteCompra> {
    return this.vProveedorOcPendienteCompraObtenerResponse(idProveedor).pipe(
      __map(_r => _r.body as VProveedorOcPendienteCompra)
    );
  }

  /**
   * Consultar lista paginada de vProveedorOcPendienteCompra
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vProveedorOcPendienteCompraQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVProveedorOcPendienteCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vProveedorOcPendienteCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVProveedorOcPendienteCompra>;
      })
    );
  }
  /**
   * Consultar lista paginada de vProveedorOcPendienteCompra
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vProveedorOcPendienteCompraQueryResult(info: QueryInfo): __Observable<QueryResultVProveedorOcPendienteCompra> {
    return this.vProveedorOcPendienteCompraQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVProveedorOcPendienteCompra)
    );
  }
}

module ProcesosL06OrdenDeCompraDashboardService {

  /**
   * Parameters for TramitarCompraElaborarObtener
   */
  export interface TramitarCompraElaborarObtenerParams {
    idProveedor: string;
    separado?: boolean;
  }
}

export { ProcesosL06OrdenDeCompraDashboardService }
