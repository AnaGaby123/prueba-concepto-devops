/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { QueryResultVPrecioProveedor } from '../models/query-result-vprecio-proveedor';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionProductosCalculosService extends __BaseService {
  static readonly vPrecioProveedorQueryResultPath = '/vPrecioProveedor';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar lista paginada de vPrecioProveedor
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vPrecioProveedorQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPrecioProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPrecioProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPrecioProveedor>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPrecioProveedor
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vPrecioProveedorQueryResult(info: QueryInfo): __Observable<QueryResultVPrecioProveedor> {
    return this.vPrecioProveedorQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPrecioProveedor)
    );
  }
}

module ConfiguracionProductosCalculosService {
}

export { ConfiguracionProductosCalculosService }
