/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CotCancelacionPartidaCotizacion } from '../models/cot-cancelacion-partida-cotizacion';
import { QueryResultCotCancelacionPartidaCotizacion } from '../models/query-result-cot-cancelacion-partida-cotizacion';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class ProcesosL01CotizacionCancelacionService extends __BaseService {
  static readonly cotCancelacionPartidaCotizacionObtenerPath = '/cotCancelacionPartidaCotizacion';
  static readonly cotCancelacionPartidaCotizacionGuardarOActualizarPath = '/cotCancelacionPartidaCotizacion';
  static readonly cotCancelacionPartidaCotizacionQueryResultPath = '/cotCancelacionPartidaCotizacion';
  static readonly cotCancelacionPartidaCotizacionDesactivarPath = '/cotCancelacionPartidaCotizacion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener cotCancelacionPartidaCotizacion
   * @param idcotCancelacionPartidaCotizacion undefined
   * @return OK
   */
  cotCancelacionPartidaCotizacionObtenerResponse(idcotCancelacionPartidaCotizacion: string): __Observable<__StrictHttpResponse<CotCancelacionPartidaCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotCancelacionPartidaCotizacion != null) __params = __params.set('idcotCancelacionPartidaCotizacion', idcotCancelacionPartidaCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotCancelacionPartidaCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CotCancelacionPartidaCotizacion>;
      })
    );
  }
  /**
   * Obtener cotCancelacionPartidaCotizacion
   * @param idcotCancelacionPartidaCotizacion undefined
   * @return OK
   */
  cotCancelacionPartidaCotizacionObtener(idcotCancelacionPartidaCotizacion: string): __Observable<CotCancelacionPartidaCotizacion> {
    return this.cotCancelacionPartidaCotizacionObtenerResponse(idcotCancelacionPartidaCotizacion).pipe(
      __map(_r => _r.body as CotCancelacionPartidaCotizacion)
    );
  }

  /**
   * GuardarOActualizar cotCancelacionPartidaCotizacion
   * @param cotCancelacionPartidaCotizacion undefined
   * @return OK
   */
  cotCancelacionPartidaCotizacionGuardarOActualizarResponse(cotCancelacionPartidaCotizacion: CotCancelacionPartidaCotizacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = cotCancelacionPartidaCotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/cotCancelacionPartidaCotizacion`,
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
   * GuardarOActualizar cotCancelacionPartidaCotizacion
   * @param cotCancelacionPartidaCotizacion undefined
   * @return OK
   */
  cotCancelacionPartidaCotizacionGuardarOActualizar(cotCancelacionPartidaCotizacion: CotCancelacionPartidaCotizacion): __Observable<string> {
    return this.cotCancelacionPartidaCotizacionGuardarOActualizarResponse(cotCancelacionPartidaCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult cotCancelacionPartidaCotizacion
   * @param info undefined
   * @return OK
   */
  cotCancelacionPartidaCotizacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCotCancelacionPartidaCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotCancelacionPartidaCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCotCancelacionPartidaCotizacion>;
      })
    );
  }
  /**
   * QueryResult cotCancelacionPartidaCotizacion
   * @param info undefined
   * @return OK
   */
  cotCancelacionPartidaCotizacionQueryResult(info: QueryInfo): __Observable<QueryResultCotCancelacionPartidaCotizacion> {
    return this.cotCancelacionPartidaCotizacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCotCancelacionPartidaCotizacion)
    );
  }

  /**
   * Desactivar cotCancelacionPartidaCotizacion
   * @param idcotCancelacionPartidaCotizacion undefined
   * @return OK
   */
  cotCancelacionPartidaCotizacionDesactivarResponse(idcotCancelacionPartidaCotizacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotCancelacionPartidaCotizacion != null) __params = __params.set('idcotCancelacionPartidaCotizacion', idcotCancelacionPartidaCotizacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/cotCancelacionPartidaCotizacion`,
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
   * Desactivar cotCancelacionPartidaCotizacion
   * @param idcotCancelacionPartidaCotizacion undefined
   * @return OK
   */
  cotCancelacionPartidaCotizacionDesactivar(idcotCancelacionPartidaCotizacion: string): __Observable<string> {
    return this.cotCancelacionPartidaCotizacionDesactivarResponse(idcotCancelacionPartidaCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ProcesosL01CotizacionCancelacionService {
}

export { ProcesosL01CotizacionCancelacionService }
