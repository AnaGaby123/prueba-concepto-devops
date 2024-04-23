/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Producto } from '../models/producto';
import { QueryResultProducto } from '../models/query-result-producto';
import { QueryInfo } from '../models/query-info';
import { QueryResultVPrecioListaProducto } from '../models/query-result-vprecio-lista-producto';
import { VProducto } from '../models/vproducto';
import { QueryResultVProducto } from '../models/query-result-vproducto';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionProductosService extends __BaseService {
  static readonly ProductoObtenerPath = '/Producto';
  static readonly ProductoGuardarOActualizarPath = '/Producto';
  static readonly ProductoQueryResultPath = '/Producto';
  static readonly ProductoDesactivarPath = '/Producto';
  static readonly vPrecioListaProductoQueryResultPath = '/vPrecioListaProducto';
  static readonly vProductoObtenerPath = '/vProducto';
  static readonly vProductoQueryResultPath = '/vProducto';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de Producto
   * @param idProducto Identificador de Producto
   * @return OK
   */
  ProductoObtenerResponse(idProducto: string): __Observable<__StrictHttpResponse<Producto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProducto != null) __params = __params.set('idProducto', idProducto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Producto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Producto>;
      })
    );
  }
  /**
   * Consultar registro de Producto
   * @param idProducto Identificador de Producto
   * @return OK
   */
  ProductoObtener(idProducto: string): __Observable<Producto> {
    return this.ProductoObtenerResponse(idProducto).pipe(
      __map(_r => _r.body as Producto)
    );
  }

  /**
   * Guardar o actualizar Producto
   * @param Producto Producto
   * @return OK
   */
  ProductoGuardarOActualizarResponse(Producto: Producto): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = Producto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/Producto`,
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
   * Guardar o actualizar Producto
   * @param Producto Producto
   * @return OK
   */
  ProductoGuardarOActualizar(Producto: Producto): __Observable<string> {
    return this.ProductoGuardarOActualizarResponse(Producto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de Producto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProductoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Producto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultProducto>;
      })
    );
  }
  /**
   * Consultar lista paginada de Producto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProductoQueryResult(info: QueryInfo): __Observable<QueryResultProducto> {
    return this.ProductoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultProducto)
    );
  }

  /**
   * Desactivar registro de Producto
   * @param idProducto Identificador de registro de Producto
   * @return OK
   */
  ProductoDesactivarResponse(idProducto: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProducto != null) __params = __params.set('idProducto', idProducto.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/Producto`,
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
   * Desactivar registro de Producto
   * @param idProducto Identificador de registro de Producto
   * @return OK
   */
  ProductoDesactivar(idProducto: string): __Observable<string> {
    return this.ProductoDesactivarResponse(idProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult vPrecioListaProducto
   * @param info undefined
   * @return OK
   */
  vPrecioListaProductoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPrecioListaProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPrecioListaProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPrecioListaProducto>;
      })
    );
  }
  /**
   * QueryResult vPrecioListaProducto
   * @param info undefined
   * @return OK
   */
  vPrecioListaProductoQueryResult(info: QueryInfo): __Observable<QueryResultVPrecioListaProducto> {
    return this.vPrecioListaProductoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPrecioListaProducto)
    );
  }

  /**
   * Obtener vProducto
   * @param idProducto undefined
   * @return OK
   */
  vProductoObtenerResponse(idProducto: string): __Observable<__StrictHttpResponse<VProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProducto != null) __params = __params.set('idProducto', idProducto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VProducto>;
      })
    );
  }
  /**
   * Obtener vProducto
   * @param idProducto undefined
   * @return OK
   */
  vProductoObtener(idProducto: string): __Observable<VProducto> {
    return this.vProductoObtenerResponse(idProducto).pipe(
      __map(_r => _r.body as VProducto)
    );
  }

  /**
   * Consultar lista paginada de vProducto
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vProductoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVProducto>;
      })
    );
  }
  /**
   * Consultar lista paginada de vProducto
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vProductoQueryResult(info: QueryInfo): __Observable<QueryResultVProducto> {
    return this.vProductoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVProducto)
    );
  }
}

module ConfiguracionProductosService {
}

export { ConfiguracionProductosService }
