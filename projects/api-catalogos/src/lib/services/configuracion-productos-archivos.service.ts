/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ArchivoTratadosOtros } from '../models/archivo-tratados-otros';
import { QueryResultArchivoTratadosOtros } from '../models/query-result-archivo-tratados-otros';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionProductosArchivosService extends __BaseService {
  static readonly ArchivoTratadosOtrosObtenerPath = '/ArchivoTratadosOtros';
  static readonly ArchivoTratadosOtrosGuardarOActualizarPath = '/ArchivoTratadosOtros';
  static readonly ArchivoTratadosOtrosQueryResultPath = '/ArchivoTratadosOtros';
  static readonly ArchivoTratadosOtrosDesactivarPath = '/ArchivoTratadosOtros';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de ArchivoTratadosOtros
   * @param IdArchivoTratadosOtros Identificador de ArchivoTratadosOtros
   * @return OK
   */
  ArchivoTratadosOtrosObtenerResponse(IdArchivoTratadosOtros: string): __Observable<__StrictHttpResponse<ArchivoTratadosOtros>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdArchivoTratadosOtros != null) __params = __params.set('IdArchivoTratadosOtros', IdArchivoTratadosOtros.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ArchivoTratadosOtros`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ArchivoTratadosOtros>;
      })
    );
  }
  /**
   * Consultar registro de ArchivoTratadosOtros
   * @param IdArchivoTratadosOtros Identificador de ArchivoTratadosOtros
   * @return OK
   */
  ArchivoTratadosOtrosObtener(IdArchivoTratadosOtros: string): __Observable<ArchivoTratadosOtros> {
    return this.ArchivoTratadosOtrosObtenerResponse(IdArchivoTratadosOtros).pipe(
      __map(_r => _r.body as ArchivoTratadosOtros)
    );
  }

  /**
   * Guardar o actualizar ArchivoTratadosOtros
   * @param ArchivoTratadosOtros ArchivoTratadosOtros
   * @return OK
   */
  ArchivoTratadosOtrosGuardarOActualizarResponse(ArchivoTratadosOtros: ArchivoTratadosOtros): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ArchivoTratadosOtros;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ArchivoTratadosOtros`,
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
   * Guardar o actualizar ArchivoTratadosOtros
   * @param ArchivoTratadosOtros ArchivoTratadosOtros
   * @return OK
   */
  ArchivoTratadosOtrosGuardarOActualizar(ArchivoTratadosOtros: ArchivoTratadosOtros): __Observable<string> {
    return this.ArchivoTratadosOtrosGuardarOActualizarResponse(ArchivoTratadosOtros).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ArchivoTratadosOtros
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ArchivoTratadosOtrosQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultArchivoTratadosOtros>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ArchivoTratadosOtros`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultArchivoTratadosOtros>;
      })
    );
  }
  /**
   * Consultar lista paginada de ArchivoTratadosOtros
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ArchivoTratadosOtrosQueryResult(info: QueryInfo): __Observable<QueryResultArchivoTratadosOtros> {
    return this.ArchivoTratadosOtrosQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultArchivoTratadosOtros)
    );
  }

  /**
   * Desactivar registro de ArchivoTratadosOtros
   * @param IdArchivoTratadosOtros Identificador de registro de ArchivoTratadosOtros
   * @return OK
   */
  ArchivoTratadosOtrosDesactivarResponse(IdArchivoTratadosOtros: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdArchivoTratadosOtros != null) __params = __params.set('IdArchivoTratadosOtros', IdArchivoTratadosOtros.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ArchivoTratadosOtros`,
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
   * Desactivar registro de ArchivoTratadosOtros
   * @param IdArchivoTratadosOtros Identificador de registro de ArchivoTratadosOtros
   * @return OK
   */
  ArchivoTratadosOtrosDesactivar(IdArchivoTratadosOtros: string): __Observable<string> {
    return this.ArchivoTratadosOtrosDesactivarResponse(IdArchivoTratadosOtros).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ConfiguracionProductosArchivosService {
}

export { ConfiguracionProductosArchivosService }
