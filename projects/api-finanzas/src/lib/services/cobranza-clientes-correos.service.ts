/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiFinanzasConfiguration as __Configuration } from '../api-finanzas-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FccPagoClienteCorreoEnviado } from '../models/fcc-pago-cliente-correo-enviado';
import { QueryResultFccPagoClienteCorreoEnviado } from '../models/query-result-fcc-pago-cliente-correo-enviado';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class CobranzaClientesCorreosService extends __BaseService {
  static readonly fccPagoClienteCorreoEnviadoCorreoEnviadoObtenerPath = '/fccPagoClienteCorreoEnviado';
  static readonly fccPagoClienteCorreoEnviadoCorreoEnviadoGuardarOActualizarPath = '/fccPagoClienteCorreoEnviado';
  static readonly fccPagoClienteCorreoEnviadoCorreoEnviadoQueryResultPath = '/fccPagoClienteCorreoEnviado';
  static readonly fccPagoClienteCorreoEnviadoCorreoEnviadoDesactivarPath = '/fccPagoClienteCorreoEnviado';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener fccPagoClienteCorreoEnviado por su idfccPagoClienteCorreoEnviado
   * @param idfccPagoClienteCorreoEnviado Identificador de fccPagoClienteCorreoEnviado
   * @return OK
   */
  fccPagoClienteCorreoEnviadoCorreoEnviadoObtenerResponse(idfccPagoClienteCorreoEnviado: string): __Observable<__StrictHttpResponse<FccPagoClienteCorreoEnviado>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccPagoClienteCorreoEnviado != null) __params = __params.set('idfccPagoClienteCorreoEnviado', idfccPagoClienteCorreoEnviado.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fccPagoClienteCorreoEnviado`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FccPagoClienteCorreoEnviado>;
      })
    );
  }
  /**
   * Obtener fccPagoClienteCorreoEnviado por su idfccPagoClienteCorreoEnviado
   * @param idfccPagoClienteCorreoEnviado Identificador de fccPagoClienteCorreoEnviado
   * @return OK
   */
  fccPagoClienteCorreoEnviadoCorreoEnviadoObtener(idfccPagoClienteCorreoEnviado: string): __Observable<FccPagoClienteCorreoEnviado> {
    return this.fccPagoClienteCorreoEnviadoCorreoEnviadoObtenerResponse(idfccPagoClienteCorreoEnviado).pipe(
      __map(_r => _r.body as FccPagoClienteCorreoEnviado)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param fccPagoClienteCorreoEnviado Dirección de empresa.
   * @return OK
   */
  fccPagoClienteCorreoEnviadoCorreoEnviadoGuardarOActualizarResponse(fccPagoClienteCorreoEnviado: FccPagoClienteCorreoEnviado): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fccPagoClienteCorreoEnviado;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fccPagoClienteCorreoEnviado`,
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
   * Guardar o actualizar una dirección de empresa.
   * @param fccPagoClienteCorreoEnviado Dirección de empresa.
   * @return OK
   */
  fccPagoClienteCorreoEnviadoCorreoEnviadoGuardarOActualizar(fccPagoClienteCorreoEnviado: FccPagoClienteCorreoEnviado): __Observable<string> {
    return this.fccPagoClienteCorreoEnviadoCorreoEnviadoGuardarOActualizarResponse(fccPagoClienteCorreoEnviado).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de fccPagoClienteCorreoEnviado
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccPagoClienteCorreoEnviadoCorreoEnviadoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFccPagoClienteCorreoEnviado>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fccPagoClienteCorreoEnviado`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFccPagoClienteCorreoEnviado>;
      })
    );
  }
  /**
   * Obtener lista de fccPagoClienteCorreoEnviado
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccPagoClienteCorreoEnviadoCorreoEnviadoQueryResult(info: QueryInfo): __Observable<QueryResultFccPagoClienteCorreoEnviado> {
    return this.fccPagoClienteCorreoEnviadoCorreoEnviadoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFccPagoClienteCorreoEnviado)
    );
  }

  /**
   * Desactivar un fccPagoClienteCorreoEnviado.
   * @param idfccPagoClienteCorreoEnviado Identificador de elemento a desactivar.
   * @return OK
   */
  fccPagoClienteCorreoEnviadoCorreoEnviadoDesactivarResponse(idfccPagoClienteCorreoEnviado: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccPagoClienteCorreoEnviado != null) __params = __params.set('idfccPagoClienteCorreoEnviado', idfccPagoClienteCorreoEnviado.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fccPagoClienteCorreoEnviado`,
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
   * Desactivar un fccPagoClienteCorreoEnviado.
   * @param idfccPagoClienteCorreoEnviado Identificador de elemento a desactivar.
   * @return OK
   */
  fccPagoClienteCorreoEnviadoCorreoEnviadoDesactivar(idfccPagoClienteCorreoEnviado: string): __Observable<string> {
    return this.fccPagoClienteCorreoEnviadoCorreoEnviadoDesactivarResponse(idfccPagoClienteCorreoEnviado).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module CobranzaClientesCorreosService {
}

export { CobranzaClientesCorreosService }
