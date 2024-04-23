/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiFinanzasConfiguration as __Configuration } from '../api-finanzas-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CFDI } from '../models/cfdi';
import { QueryResultCFDI } from '../models/query-result-cfdi';
import { QueryInfo } from '../models/query-info';
import { CFDICancelacion } from '../models/cfdicancelacion';
import { QueryResultCFDICancelacion } from '../models/query-result-cfdicancelacion';
@Injectable({
  providedIn: 'root',
})
class CFDIsService extends __BaseService {
  static readonly CFDIObtenerPath = '/CFDI';
  static readonly CFDIGuardarOActualizarPath = '/CFDI';
  static readonly CFDIQueryResultPath = '/CFDI';
  static readonly CFDIDesactivarPath = '/CFDI';
  static readonly CFDICancelacionObtenerPath = '/CFDICancelacion';
  static readonly CFDICancelacionGuardarOActualizarPath = '/CFDICancelacion';
  static readonly CFDICancelacionQueryResultPath = '/CFDICancelacion';
  static readonly CFDICancelacionDesactivarPath = '/CFDICancelacion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener CFDI
   * @param idCFDI undefined
   * @return OK
   */
  CFDIObtenerResponse(idCFDI: string): __Observable<__StrictHttpResponse<CFDI>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCFDI != null) __params = __params.set('idCFDI', idCFDI.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CFDI`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CFDI>;
      })
    );
  }
  /**
   * Obtener CFDI
   * @param idCFDI undefined
   * @return OK
   */
  CFDIObtener(idCFDI: string): __Observable<CFDI> {
    return this.CFDIObtenerResponse(idCFDI).pipe(
      __map(_r => _r.body as CFDI)
    );
  }

  /**
   * GuardarOActualizar CFDI
   * @param CFDI undefined
   * @return OK
   */
  CFDIGuardarOActualizarResponse(CFDI: CFDI): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CFDI;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/CFDI`,
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
   * GuardarOActualizar CFDI
   * @param CFDI undefined
   * @return OK
   */
  CFDIGuardarOActualizar(CFDI: CFDI): __Observable<string> {
    return this.CFDIGuardarOActualizarResponse(CFDI).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult CFDI
   * @param info undefined
   * @return OK
   */
  CFDIQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCFDI>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CFDI`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCFDI>;
      })
    );
  }
  /**
   * QueryResult CFDI
   * @param info undefined
   * @return OK
   */
  CFDIQueryResult(info: QueryInfo): __Observable<QueryResultCFDI> {
    return this.CFDIQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCFDI)
    );
  }

  /**
   * Desactivar CFDI
   * @param idCFDI undefined
   * @return OK
   */
  CFDIDesactivarResponse(idCFDI: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCFDI != null) __params = __params.set('idCFDI', idCFDI.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/CFDI`,
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
   * Desactivar CFDI
   * @param idCFDI undefined
   * @return OK
   */
  CFDIDesactivar(idCFDI: string): __Observable<string> {
    return this.CFDIDesactivarResponse(idCFDI).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener CFDICancelacion
   * @param idCFDICancelacion undefined
   * @return OK
   */
  CFDICancelacionObtenerResponse(idCFDICancelacion: string): __Observable<__StrictHttpResponse<CFDICancelacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCFDICancelacion != null) __params = __params.set('idCFDICancelacion', idCFDICancelacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CFDICancelacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CFDICancelacion>;
      })
    );
  }
  /**
   * Obtener CFDICancelacion
   * @param idCFDICancelacion undefined
   * @return OK
   */
  CFDICancelacionObtener(idCFDICancelacion: string): __Observable<CFDICancelacion> {
    return this.CFDICancelacionObtenerResponse(idCFDICancelacion).pipe(
      __map(_r => _r.body as CFDICancelacion)
    );
  }

  /**
   * GuardarOActualizar CFDICancelacion
   * @param CFDICancelacion undefined
   * @return OK
   */
  CFDICancelacionGuardarOActualizarResponse(CFDICancelacion: CFDICancelacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CFDICancelacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/CFDICancelacion`,
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
   * GuardarOActualizar CFDICancelacion
   * @param CFDICancelacion undefined
   * @return OK
   */
  CFDICancelacionGuardarOActualizar(CFDICancelacion: CFDICancelacion): __Observable<string> {
    return this.CFDICancelacionGuardarOActualizarResponse(CFDICancelacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult CFDICancelacion
   * @param info undefined
   * @return OK
   */
  CFDICancelacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCFDICancelacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CFDICancelacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCFDICancelacion>;
      })
    );
  }
  /**
   * QueryResult CFDICancelacion
   * @param info undefined
   * @return OK
   */
  CFDICancelacionQueryResult(info: QueryInfo): __Observable<QueryResultCFDICancelacion> {
    return this.CFDICancelacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCFDICancelacion)
    );
  }

  /**
   * Desactivar CFDICancelacion
   * @param idCFDICancelacion undefined
   * @return OK
   */
  CFDICancelacionDesactivarResponse(idCFDICancelacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCFDICancelacion != null) __params = __params.set('idCFDICancelacion', idCFDICancelacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/CFDICancelacion`,
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
   * Desactivar CFDICancelacion
   * @param idCFDICancelacion undefined
   * @return OK
   */
  CFDICancelacionDesactivar(idCFDICancelacion: string): __Observable<string> {
    return this.CFDICancelacionDesactivarResponse(idCFDICancelacion).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module CFDIsService {
}

export { CFDIsService }
