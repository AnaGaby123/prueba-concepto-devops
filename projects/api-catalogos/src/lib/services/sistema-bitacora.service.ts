/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GMBitacoraCRUD } from '../models/gmbitacora-crud';
import { QueryResultGMBitacoraCRUD } from '../models/query-result-gmbitacora-crud';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class SistemaBitacoraService extends __BaseService {
  static readonly BitacoraCRUDObtenerPath = '/BitacoraCRUD';
  static readonly BitacoraCRUDQueryResultPath = '/BitacoraCRUD';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener BitacoraCRUD
   * @param IdBitacoraCRUD undefined
   * @return OK
   */
  BitacoraCRUDObtenerResponse(IdBitacoraCRUD: string): __Observable<__StrictHttpResponse<GMBitacoraCRUD>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdBitacoraCRUD != null) __params = __params.set('IdBitacoraCRUD', IdBitacoraCRUD.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/BitacoraCRUD`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMBitacoraCRUD>;
      })
    );
  }
  /**
   * Obtener BitacoraCRUD
   * @param IdBitacoraCRUD undefined
   * @return OK
   */
  BitacoraCRUDObtener(IdBitacoraCRUD: string): __Observable<GMBitacoraCRUD> {
    return this.BitacoraCRUDObtenerResponse(IdBitacoraCRUD).pipe(
      __map(_r => _r.body as GMBitacoraCRUD)
    );
  }

  /**
   * QueryResult BitacoraCRUD
   * @param info undefined
   * @return OK
   */
  BitacoraCRUDQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultGMBitacoraCRUD>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/BitacoraCRUD`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultGMBitacoraCRUD>;
      })
    );
  }
  /**
   * QueryResult BitacoraCRUD
   * @param info undefined
   * @return OK
   */
  BitacoraCRUDQueryResult(info: QueryInfo): __Observable<QueryResultGMBitacoraCRUD> {
    return this.BitacoraCRUDQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultGMBitacoraCRUD)
    );
  }
}

module SistemaBitacoraService {
}

export { SistemaBitacoraService }
