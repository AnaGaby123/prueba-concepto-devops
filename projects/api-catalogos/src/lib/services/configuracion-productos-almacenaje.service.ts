/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { QueryResultVUbicacionAlmacenaje } from '../models/query-result-vubicacion-almacenaje';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionProductosAlmacenajeService extends __BaseService {
  static readonly vUbicacionAlmacenajeQueryResultPath = '/vUbicacionAlmacenaje';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar lista paginada de vUbicacionAlmacenaje
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vUbicacionAlmacenajeQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVUbicacionAlmacenaje>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vUbicacionAlmacenaje`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVUbicacionAlmacenaje>;
      })
    );
  }
  /**
   * Consultar lista paginada de vUbicacionAlmacenaje
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vUbicacionAlmacenajeQueryResult(info: QueryInfo): __Observable<QueryResultVUbicacionAlmacenaje> {
    return this.vUbicacionAlmacenajeQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVUbicacionAlmacenaje)
    );
  }
}

module ConfiguracionProductosAlmacenajeService {
}

export { ConfiguracionProductosAlmacenajeService }
