/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CotArchivoCotizacion } from '../models/cot-archivo-cotizacion';
import { QueryResultCotArchivoCotizacion } from '../models/query-result-cot-archivo-cotizacion';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class ProcesosL01CotizacionConfiguracionService extends __BaseService {
  static readonly cotArchivoCotizacionObtenerPath = '/cotArchivoCotizacion';
  static readonly cotArchivoCotizacionGuardarOActualizarPath = '/cotArchivoCotizacion';
  static readonly cotArchivoCotizacionQueryResultPath = '/cotArchivoCotizacion';
  static readonly cotArchivoCotizacionDesactivarPath = '/cotArchivoCotizacion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener un cotArchivoCotizacion por su idCotArchivoCotizacion
   * @param idCotArchivoCotizacion identificador del cotArchivoCotizacion
   * @return OK
   */
  cotArchivoCotizacionObtenerResponse(idCotArchivoCotizacion: string): __Observable<__StrictHttpResponse<CotArchivoCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCotArchivoCotizacion != null) __params = __params.set('idCotArchivoCotizacion', idCotArchivoCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotArchivoCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CotArchivoCotizacion>;
      })
    );
  }
  /**
   * Obtener un cotArchivoCotizacion por su idCotArchivoCotizacion
   * @param idCotArchivoCotizacion identificador del cotArchivoCotizacion
   * @return OK
   */
  cotArchivoCotizacionObtener(idCotArchivoCotizacion: string): __Observable<CotArchivoCotizacion> {
    return this.cotArchivoCotizacionObtenerResponse(idCotArchivoCotizacion).pipe(
      __map(_r => _r.body as CotArchivoCotizacion)
    );
  }

  /**
   * Guardar o actualizar un cotArchivoCotizacion
   * @param archivoCotizacion cotArchivoCotizacion a actualizar o guardar
   * @return OK
   */
  cotArchivoCotizacionGuardarOActualizarResponse(archivoCotizacion: CotArchivoCotizacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = archivoCotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/cotArchivoCotizacion`,
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
   * Guardar o actualizar un cotArchivoCotizacion
   * @param archivoCotizacion cotArchivoCotizacion a actualizar o guardar
   * @return OK
   */
  cotArchivoCotizacionGuardarOActualizar(archivoCotizacion: CotArchivoCotizacion): __Observable<string> {
    return this.cotArchivoCotizacionGuardarOActualizarResponse(archivoCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de cotArchivoCotizacion.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotArchivoCotizacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCotArchivoCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotArchivoCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCotArchivoCotizacion>;
      })
    );
  }
  /**
   * Obtener lista de cotArchivoCotizacion.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotArchivoCotizacionQueryResult(info: QueryInfo): __Observable<QueryResultCotArchivoCotizacion> {
    return this.cotArchivoCotizacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCotArchivoCotizacion)
    );
  }

  /**
   * Desactivar un cotArchivoCotizacion.
   * @param idCotArchivoCotizacion Identificador de cotArchivoCotizacion a ser desactivado.
   * @return OK
   */
  cotArchivoCotizacionDesactivarResponse(idCotArchivoCotizacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCotArchivoCotizacion != null) __params = __params.set('idCotArchivoCotizacion', idCotArchivoCotizacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/cotArchivoCotizacion`,
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
   * Desactivar un cotArchivoCotizacion.
   * @param idCotArchivoCotizacion Identificador de cotArchivoCotizacion a ser desactivado.
   * @return OK
   */
  cotArchivoCotizacionDesactivar(idCotArchivoCotizacion: string): __Observable<string> {
    return this.cotArchivoCotizacionDesactivarResponse(idCotArchivoCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ProcesosL01CotizacionConfiguracionService {
}

export { ProcesosL01CotizacionConfiguracionService }
