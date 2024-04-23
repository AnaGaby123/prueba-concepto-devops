/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CodigoPostal } from '../models/codigo-postal';
import { QueryResultCodigoPostal } from '../models/query-result-codigo-postal';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionDireccionesUtilsService extends __BaseService {
  static readonly CodigoPostalObtenerPath = '/CodigoPostal';
  static readonly CodigoPostalGuardarOActualizarPath = '/CodigoPostal';
  static readonly CodigoPostalQueryResultPath = '/CodigoPostal';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener CodigoPostal
   * @param idCodigoPostal undefined
   * @return OK
   */
  CodigoPostalObtenerResponse(idCodigoPostal: string): __Observable<__StrictHttpResponse<CodigoPostal>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCodigoPostal != null) __params = __params.set('idCodigoPostal', idCodigoPostal.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CodigoPostal`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CodigoPostal>;
      })
    );
  }
  /**
   * Obtener CodigoPostal
   * @param idCodigoPostal undefined
   * @return OK
   */
  CodigoPostalObtener(idCodigoPostal: string): __Observable<CodigoPostal> {
    return this.CodigoPostalObtenerResponse(idCodigoPostal).pipe(
      __map(_r => _r.body as CodigoPostal)
    );
  }

  /**
   * GuardarOActualizar CodigoPostal
   * @param CodigoPostal undefined
   * @return OK
   */
  CodigoPostalGuardarOActualizarResponse(CodigoPostal: CodigoPostal): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CodigoPostal;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/CodigoPostal`,
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
   * GuardarOActualizar CodigoPostal
   * @param CodigoPostal undefined
   * @return OK
   */
  CodigoPostalGuardarOActualizar(CodigoPostal: CodigoPostal): __Observable<string> {
    return this.CodigoPostalGuardarOActualizarResponse(CodigoPostal).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult CodigoPostal
   * @param info undefined
   * @return OK
   */
  CodigoPostalQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCodigoPostal>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CodigoPostal`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCodigoPostal>;
      })
    );
  }
  /**
   * QueryResult CodigoPostal
   * @param info undefined
   * @return OK
   */
  CodigoPostalQueryResult(info: QueryInfo): __Observable<QueryResultCodigoPostal> {
    return this.CodigoPostalQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCodigoPostal)
    );
  }
}

module ConfiguracionDireccionesUtilsService {
}

export { ConfiguracionDireccionesUtilsService }
