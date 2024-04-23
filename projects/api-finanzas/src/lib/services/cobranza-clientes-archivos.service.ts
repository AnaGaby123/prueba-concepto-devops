/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiFinanzasConfiguration as __Configuration } from '../api-finanzas-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FccArchivoPagoCliente } from '../models/fcc-archivo-pago-cliente';
import { QueryResultFccArchivoPagoCliente } from '../models/query-result-fcc-archivo-pago-cliente';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class CobranzaClientesArchivosService extends __BaseService {
  static readonly fccArchivoPagoClienteObtenerPath = '/fccArchivoPagoCliente';
  static readonly fccArchivoPagoClienteGuardarOActualizarPath = '/fccArchivoPagoCliente';
  static readonly fccArchivoPagoClienteQueryResultPath = '/fccArchivoPagoCliente';
  static readonly fccArchivoPagoClienteDesactivarPath = '/fccArchivoPagoCliente';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener fccArchivoPagoCliente por su idfccArchivoPagoCliente
   * @param idfccArchivoPagoCliente Identificador de fccArchivoPagoCliente
   * @return OK
   */
  fccArchivoPagoClienteObtenerResponse(idfccArchivoPagoCliente: string): __Observable<__StrictHttpResponse<FccArchivoPagoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccArchivoPagoCliente != null) __params = __params.set('idfccArchivoPagoCliente', idfccArchivoPagoCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fccArchivoPagoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FccArchivoPagoCliente>;
      })
    );
  }
  /**
   * Obtener fccArchivoPagoCliente por su idfccArchivoPagoCliente
   * @param idfccArchivoPagoCliente Identificador de fccArchivoPagoCliente
   * @return OK
   */
  fccArchivoPagoClienteObtener(idfccArchivoPagoCliente: string): __Observable<FccArchivoPagoCliente> {
    return this.fccArchivoPagoClienteObtenerResponse(idfccArchivoPagoCliente).pipe(
      __map(_r => _r.body as FccArchivoPagoCliente)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param fccArchivoPagoCliente Dirección de empresa.
   * @return OK
   */
  fccArchivoPagoClienteGuardarOActualizarResponse(fccArchivoPagoCliente: FccArchivoPagoCliente): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fccArchivoPagoCliente;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fccArchivoPagoCliente`,
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
   * @param fccArchivoPagoCliente Dirección de empresa.
   * @return OK
   */
  fccArchivoPagoClienteGuardarOActualizar(fccArchivoPagoCliente: FccArchivoPagoCliente): __Observable<string> {
    return this.fccArchivoPagoClienteGuardarOActualizarResponse(fccArchivoPagoCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de fccArchivoPagoCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccArchivoPagoClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFccArchivoPagoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fccArchivoPagoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFccArchivoPagoCliente>;
      })
    );
  }
  /**
   * Obtener lista de fccArchivoPagoCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccArchivoPagoClienteQueryResult(info: QueryInfo): __Observable<QueryResultFccArchivoPagoCliente> {
    return this.fccArchivoPagoClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFccArchivoPagoCliente)
    );
  }

  /**
   * Desactivar un fccArchivoPagoCliente.
   * @param idfccArchivoPagoCliente Identificador de elemento a desactivar.
   * @return OK
   */
  fccArchivoPagoClienteDesactivarResponse(idfccArchivoPagoCliente: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccArchivoPagoCliente != null) __params = __params.set('idfccArchivoPagoCliente', idfccArchivoPagoCliente.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fccArchivoPagoCliente`,
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
   * Desactivar un fccArchivoPagoCliente.
   * @param idfccArchivoPagoCliente Identificador de elemento a desactivar.
   * @return OK
   */
  fccArchivoPagoClienteDesactivar(idfccArchivoPagoCliente: string): __Observable<string> {
    return this.fccArchivoPagoClienteDesactivarResponse(idfccArchivoPagoCliente).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module CobranzaClientesArchivosService {
}

export { CobranzaClientesArchivosService }
