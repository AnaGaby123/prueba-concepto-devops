/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PermisoProducto } from '../models/permiso-producto';
import { QueryResultPermisoProducto } from '../models/query-result-permiso-producto';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionProductosConfiguracionLogisticaService extends __BaseService {
  static readonly PermisoProductoDesactivarPath = '/PermisoProducto/DesactivarPermisoProducto';
  static readonly PermisoProductoGuardarOActualizarPath = '/PermisoProducto/GuardarOActualizarPermisoProducto';
  static readonly PermisoProductoObtenerPath = '/PermisoProducto';
  static readonly PermisoProductoQueryResultPath = '/PermisoProducto/ListaPermisoProducto';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Desactivar registro de PermisoProducto
   * @param idPermisoProducto Identificador de registro de PermisoProducto
   * @return OK
   */
  PermisoProductoDesactivarResponse(idPermisoProducto: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idPermisoProducto != null) __params = __params.set('idPermisoProducto', idPermisoProducto.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/PermisoProducto/DesactivarPermisoProducto`,
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
   * Desactivar registro de PermisoProducto
   * @param idPermisoProducto Identificador de registro de PermisoProducto
   * @return OK
   */
  PermisoProductoDesactivar(idPermisoProducto: string): __Observable<string> {
    return this.PermisoProductoDesactivarResponse(idPermisoProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Guardar o actualizar PermisoProducto
   * @param PermisoProducto PermisoProducto
   * @return OK
   */
  PermisoProductoGuardarOActualizarResponse(PermisoProducto: PermisoProducto): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = PermisoProducto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/PermisoProducto/GuardarOActualizarPermisoProducto`,
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
   * Guardar o actualizar PermisoProducto
   * @param PermisoProducto PermisoProducto
   * @return OK
   */
  PermisoProductoGuardarOActualizar(PermisoProducto: PermisoProducto): __Observable<string> {
    return this.PermisoProductoGuardarOActualizarResponse(PermisoProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de PermisoProducto
   * @param idPermisoProducto Identificador de PermisoProducto
   * @return OK
   */
  PermisoProductoObtenerResponse(idPermisoProducto: string): __Observable<__StrictHttpResponse<PermisoProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idPermisoProducto != null) __params = __params.set('idPermisoProducto', idPermisoProducto.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/PermisoProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PermisoProducto>;
      })
    );
  }
  /**
   * Consultar registro de PermisoProducto
   * @param idPermisoProducto Identificador de PermisoProducto
   * @return OK
   */
  PermisoProductoObtener(idPermisoProducto: string): __Observable<PermisoProducto> {
    return this.PermisoProductoObtenerResponse(idPermisoProducto).pipe(
      __map(_r => _r.body as PermisoProducto)
    );
  }

  /**
   * Consultar lista paginada de PermisoProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  PermisoProductoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultPermisoProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/PermisoProducto/ListaPermisoProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultPermisoProducto>;
      })
    );
  }
  /**
   * Consultar lista paginada de PermisoProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  PermisoProductoQueryResult(info: QueryInfo): __Observable<QueryResultPermisoProducto> {
    return this.PermisoProductoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultPermisoProducto)
    );
  }
}

module ConfiguracionProductosConfiguracionLogisticaService {
}

export { ConfiguracionProductosConfiguracionLogisticaService }
