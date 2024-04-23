/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ProveedorObj } from '../models/proveedor-obj';
import { GMProveedorPorProducto } from '../models/gmproveedor-por-producto';
import { Proveedor } from '../models/proveedor';
import { QueryResultProveedor } from '../models/query-result-proveedor';
import { QueryInfo } from '../models/query-info';
import { ProveedorDetalle } from '../models/proveedor-detalle';
import { ContactoDetalleProvObj } from '../models/contacto-detalle-prov-obj';
import { QueryResultVProveedor } from '../models/query-result-vproveedor';
import { QueryResultVProveedorResumen } from '../models/query-result-vproveedor-resumen';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionProveedoresService extends __BaseService {
  static readonly ProveedorActualizarProveedorLegacyPath = '/ActualizarProveedorLegacy';
  static readonly ProveedorObtenerFletesDeProveedorPorProductoPath = '/Proveedor/fleteexpress/productos';
  static readonly ProveedorObtenerPath = '/Proveedor';
  static readonly ProveedorGuardarOActualizarPath = '/Proveedor';
  static readonly ProveedorQueryResultPath = '/Proveedor';
  static readonly ProveedorDesactivarPath = '/Proveedor';
  static readonly ProveedorDetalleQueryResultPath = '/ProveedorDetalle';
  static readonly ProveedorExtensionsEsMexicanoPath = '/ProveedorMexicano';
  static readonly ProveedorExtensionsObtenerListaContactoDetallePath = '/ObtenerListaContactoDetalle';
  static readonly vProveedorQueryResultPath = '/vProveedor';
  static readonly vProveedorResumenQueryResultPath = '/vProveedorResumen';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Actualiza datos de Proveedor en Legacy
   * @param idProveedor
   * @return OK
   */
  ProveedorActualizarProveedorLegacyResponse(idProveedor: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProveedor != null) __params = __params.set('idProveedor', idProveedor.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ActualizarProveedorLegacy`,
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
   * Actualiza datos de Proveedor en Legacy
   * @param idProveedor
   * @return OK
   */
  ProveedorActualizarProveedorLegacy(idProveedor: string): __Observable<string> {
    return this.ProveedorActualizarProveedorLegacyResponse(idProveedor).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Devuelve una lista de proveedor que contienen flete express mediante un listado de productos
   * @param GMProveedorPorProducto undefined
   * @return OK
   */
  ProveedorObtenerFletesDeProveedorPorProductoResponse(GMProveedorPorProducto: GMProveedorPorProducto): __Observable<__StrictHttpResponse<Array<ProveedorObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMProveedorPorProducto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Proveedor/fleteexpress/productos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ProveedorObj>>;
      })
    );
  }
  /**
   * Devuelve una lista de proveedor que contienen flete express mediante un listado de productos
   * @param GMProveedorPorProducto undefined
   * @return OK
   */
  ProveedorObtenerFletesDeProveedorPorProducto(GMProveedorPorProducto: GMProveedorPorProducto): __Observable<Array<ProveedorObj>> {
    return this.ProveedorObtenerFletesDeProveedorPorProductoResponse(GMProveedorPorProducto).pipe(
      __map(_r => _r.body as Array<ProveedorObj>)
    );
  }

  /**
   * Consultar registro de Proveedor
   * @param idProveedor Identificador de Proveedor
   * @return OK
   */
  ProveedorObtenerResponse(idProveedor: string): __Observable<__StrictHttpResponse<Proveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProveedor != null) __params = __params.set('idProveedor', idProveedor.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Proveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Proveedor>;
      })
    );
  }
  /**
   * Consultar registro de Proveedor
   * @param idProveedor Identificador de Proveedor
   * @return OK
   */
  ProveedorObtener(idProveedor: string): __Observable<Proveedor> {
    return this.ProveedorObtenerResponse(idProveedor).pipe(
      __map(_r => _r.body as Proveedor)
    );
  }

  /**
   * Guardar o actualizar Proveedor
   * @param Proveedor Proveedor
   * @return OK
   */
  ProveedorGuardarOActualizarResponse(Proveedor: Proveedor): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = Proveedor;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/Proveedor`,
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
   * Guardar o actualizar Proveedor
   * @param Proveedor Proveedor
   * @return OK
   */
  ProveedorGuardarOActualizar(Proveedor: Proveedor): __Observable<string> {
    return this.ProveedorGuardarOActualizarResponse(Proveedor).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de Proveedor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProveedorQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Proveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultProveedor>;
      })
    );
  }
  /**
   * Consultar lista paginada de Proveedor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProveedorQueryResult(info: QueryInfo): __Observable<QueryResultProveedor> {
    return this.ProveedorQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultProveedor)
    );
  }

  /**
   * Desactivar registro de Proveedor
   * @param idProveedor Identificador de registro de Proveedor
   * @return OK
   */
  ProveedorDesactivarResponse(idProveedor: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProveedor != null) __params = __params.set('idProveedor', idProveedor.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/Proveedor`,
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
   * Desactivar registro de Proveedor
   * @param idProveedor Identificador de registro de Proveedor
   * @return OK
   */
  ProveedorDesactivar(idProveedor: string): __Observable<string> {
    return this.ProveedorDesactivarResponse(idProveedor).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult ProveedorDetalle
   * @param idProveedor undefined
   * @return OK
   */
  ProveedorDetalleQueryResultResponse(idProveedor: string): __Observable<__StrictHttpResponse<ProveedorDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProveedor != null) __params = __params.set('idProveedor', idProveedor.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ProveedorDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProveedorDetalle>;
      })
    );
  }
  /**
   * QueryResult ProveedorDetalle
   * @param idProveedor undefined
   * @return OK
   */
  ProveedorDetalleQueryResult(idProveedor: string): __Observable<ProveedorDetalle> {
    return this.ProveedorDetalleQueryResultResponse(idProveedor).pipe(
      __map(_r => _r.body as ProveedorDetalle)
    );
  }

  /**
   * EsMexicano ProveedorExtensions
   * @param idProveedor undefined
   * @return OK
   */
  ProveedorExtensionsEsMexicanoResponse(idProveedor: string): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProveedor != null) __params = __params.set('idProveedor', idProveedor.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ProveedorMexicano`,
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
   * EsMexicano ProveedorExtensions
   * @param idProveedor undefined
   * @return OK
   */
  ProveedorExtensionsEsMexicano(idProveedor: string): __Observable<boolean> {
    return this.ProveedorExtensionsEsMexicanoResponse(idProveedor).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * ObtenerListaContactoDetalle ProveedorExtensions
   * @param idProveedor undefined
   * @return OK
   */
  ProveedorExtensionsObtenerListaContactoDetalleResponse(idProveedor: string): __Observable<__StrictHttpResponse<Array<ContactoDetalleProvObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProveedor != null) __params = __params.set('idProveedor', idProveedor.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ObtenerListaContactoDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ContactoDetalleProvObj>>;
      })
    );
  }
  /**
   * ObtenerListaContactoDetalle ProveedorExtensions
   * @param idProveedor undefined
   * @return OK
   */
  ProveedorExtensionsObtenerListaContactoDetalle(idProveedor: string): __Observable<Array<ContactoDetalleProvObj>> {
    return this.ProveedorExtensionsObtenerListaContactoDetalleResponse(idProveedor).pipe(
      __map(_r => _r.body as Array<ContactoDetalleProvObj>)
    );
  }

  /**
   * Consultar lista paginada de vProveedor
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vProveedorQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVProveedor>;
      })
    );
  }
  /**
   * Consultar lista paginada de vProveedor
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vProveedorQueryResult(info: QueryInfo): __Observable<QueryResultVProveedor> {
    return this.vProveedorQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVProveedor)
    );
  }

  /**
   * Consultar lista paginada de vProveedorResumen
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vProveedorResumenQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVProveedorResumen>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vProveedorResumen`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVProveedorResumen>;
      })
    );
  }
  /**
   * Consultar lista paginada de vProveedorResumen
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vProveedorResumenQueryResult(info: QueryInfo): __Observable<QueryResultVProveedorResumen> {
    return this.vProveedorResumenQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVProveedorResumen)
    );
  }
}

module ConfiguracionProveedoresService {
}

export { ConfiguracionProveedoresService }
