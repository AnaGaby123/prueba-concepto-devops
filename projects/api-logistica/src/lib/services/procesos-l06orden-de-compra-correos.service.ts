/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { OcCorreoEnviadoConfirmacion } from '../models/oc-correo-enviado-confirmacion';
import { QueryResultOcCorreoEnviadoConfirmacion } from '../models/query-result-oc-correo-enviado-confirmacion';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class ProcesosL06OrdenDeCompraCorreosService extends __BaseService {
  static readonly ocCorreoEnviadoConfirmacionObtenerPath = '/ocCorreoEnviadoConfirmacion';
  static readonly ocCorreoEnviadoConfirmacionGuardarOActualizarPath = '/ocCorreoEnviadoConfirmacion';
  static readonly ocCorreoEnviadoConfirmacionQueryResultPath = '/ocCorreoEnviadoConfirmacion';
  static readonly ocCorreoEnviadoConfirmacionDesactivarPath = '/ocCorreoEnviadoConfirmacion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de ocCorreoEnviadoConfirmacion
   * @param idocCorreoEnviadoConfirmacion Identificador de ocCorreoEnviadoConfirmacion
   * @return OK
   */
  ocCorreoEnviadoConfirmacionObtenerResponse(idocCorreoEnviadoConfirmacion: string): __Observable<__StrictHttpResponse<OcCorreoEnviadoConfirmacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocCorreoEnviadoConfirmacion != null) __params = __params.set('idocCorreoEnviadoConfirmacion', idocCorreoEnviadoConfirmacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ocCorreoEnviadoConfirmacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OcCorreoEnviadoConfirmacion>;
      })
    );
  }
  /**
   * Consultar registro de ocCorreoEnviadoConfirmacion
   * @param idocCorreoEnviadoConfirmacion Identificador de ocCorreoEnviadoConfirmacion
   * @return OK
   */
  ocCorreoEnviadoConfirmacionObtener(idocCorreoEnviadoConfirmacion: string): __Observable<OcCorreoEnviadoConfirmacion> {
    return this.ocCorreoEnviadoConfirmacionObtenerResponse(idocCorreoEnviadoConfirmacion).pipe(
      __map(_r => _r.body as OcCorreoEnviadoConfirmacion)
    );
  }

  /**
   * Guardar o actualizar ocCorreoEnviadoConfirmacion
   * @param ocCorreoEnviadoConfirmacion ocCorreoEnviadoConfirmacion
   * @return OK
   */
  ocCorreoEnviadoConfirmacionGuardarOActualizarResponse(ocCorreoEnviadoConfirmacion: OcCorreoEnviadoConfirmacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ocCorreoEnviadoConfirmacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ocCorreoEnviadoConfirmacion`,
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
   * Guardar o actualizar ocCorreoEnviadoConfirmacion
   * @param ocCorreoEnviadoConfirmacion ocCorreoEnviadoConfirmacion
   * @return OK
   */
  ocCorreoEnviadoConfirmacionGuardarOActualizar(ocCorreoEnviadoConfirmacion: OcCorreoEnviadoConfirmacion): __Observable<string> {
    return this.ocCorreoEnviadoConfirmacionGuardarOActualizarResponse(ocCorreoEnviadoConfirmacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ocCorreoEnviadoConfirmacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocCorreoEnviadoConfirmacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultOcCorreoEnviadoConfirmacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ocCorreoEnviadoConfirmacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultOcCorreoEnviadoConfirmacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de ocCorreoEnviadoConfirmacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocCorreoEnviadoConfirmacionQueryResult(info: QueryInfo): __Observable<QueryResultOcCorreoEnviadoConfirmacion> {
    return this.ocCorreoEnviadoConfirmacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultOcCorreoEnviadoConfirmacion)
    );
  }

  /**
   * Desactivar registro de ocCorreoEnviadoConfirmacion
   * @param idocCorreoEnviadoConfirmacion Identificador de registro de ocCorreoEnviadoConfirmacion
   * @return OK
   */
  ocCorreoEnviadoConfirmacionDesactivarResponse(idocCorreoEnviadoConfirmacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocCorreoEnviadoConfirmacion != null) __params = __params.set('idocCorreoEnviadoConfirmacion', idocCorreoEnviadoConfirmacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ocCorreoEnviadoConfirmacion`,
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
   * Desactivar registro de ocCorreoEnviadoConfirmacion
   * @param idocCorreoEnviadoConfirmacion Identificador de registro de ocCorreoEnviadoConfirmacion
   * @return OK
   */
  ocCorreoEnviadoConfirmacionDesactivar(idocCorreoEnviadoConfirmacion: string): __Observable<string> {
    return this.ocCorreoEnviadoConfirmacionDesactivarResponse(idocCorreoEnviadoConfirmacion).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ProcesosL06OrdenDeCompraCorreosService {
}

export { ProcesosL06OrdenDeCompraCorreosService }
