/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Flete } from '../models/flete';
import { QueryResultFlete } from '../models/query-result-flete';
import { QueryInfo } from '../models/query-info';
import { VFlete } from '../models/vflete';
import { QueryResultVFlete } from '../models/query-result-vflete';
import { VFleteObj } from '../models/vflete-obj';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionProductosFletesService extends __BaseService {
  static readonly FleteObtenerPath = '/Flete';
  static readonly FleteGuardarOActualizarPath = '/Flete';
  static readonly FleteQueryResultPath = '/Flete';
  static readonly FleteDesactivarPath = '/Flete';
  static readonly vFleteObtenerPath = '/vFlete';
  static readonly vFleteQueryResultPath = '/vFlete';
  static readonly vFleteVFletePorCotizacionPath = '/vFlete/{idCotCotizacion}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de Flete
   * @param idFlete Identificador de Flete
   * @return OK
   */
  FleteObtenerResponse(idFlete: string): __Observable<__StrictHttpResponse<Flete>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idFlete != null) __params = __params.set('idFlete', idFlete.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Flete`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Flete>;
      })
    );
  }
  /**
   * Consultar registro de Flete
   * @param idFlete Identificador de Flete
   * @return OK
   */
  FleteObtener(idFlete: string): __Observable<Flete> {
    return this.FleteObtenerResponse(idFlete).pipe(
      __map(_r => _r.body as Flete)
    );
  }

  /**
   * Guardar o actualizar Flete
   * @param Flete Flete
   * @return OK
   */
  FleteGuardarOActualizarResponse(Flete: Flete): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = Flete;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/Flete`,
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
   * Guardar o actualizar Flete
   * @param Flete Flete
   * @return OK
   */
  FleteGuardarOActualizar(Flete: Flete): __Observable<string> {
    return this.FleteGuardarOActualizarResponse(Flete).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de Flete
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  FleteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFlete>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Flete`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFlete>;
      })
    );
  }
  /**
   * Consultar lista paginada de Flete
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  FleteQueryResult(info: QueryInfo): __Observable<QueryResultFlete> {
    return this.FleteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFlete)
    );
  }

  /**
   * Desactivar registro de Flete
   * @param idFlete Identificador de registro de Flete
   * @return OK
   */
  FleteDesactivarResponse(idFlete: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idFlete != null) __params = __params.set('idFlete', idFlete.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/Flete`,
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
   * Desactivar registro de Flete
   * @param idFlete Identificador de registro de Flete
   * @return OK
   */
  FleteDesactivar(idFlete: string): __Observable<string> {
    return this.FleteDesactivarResponse(idFlete).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener vFlete
   * @param idFlete undefined
   * @return OK
   */
  vFleteObtenerResponse(idFlete: string): __Observable<__StrictHttpResponse<VFlete>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idFlete != null) __params = __params.set('idFlete', idFlete.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vFlete`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VFlete>;
      })
    );
  }
  /**
   * Obtener vFlete
   * @param idFlete undefined
   * @return OK
   */
  vFleteObtener(idFlete: string): __Observable<VFlete> {
    return this.vFleteObtenerResponse(idFlete).pipe(
      __map(_r => _r.body as VFlete)
    );
  }

  /**
   * QueryResult vFlete
   * @param info undefined
   * @return OK
   */
  vFleteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVFlete>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vFlete`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVFlete>;
      })
    );
  }
  /**
   * QueryResult vFlete
   * @param info undefined
   * @return OK
   */
  vFleteQueryResult(info: QueryInfo): __Observable<QueryResultVFlete> {
    return this.vFleteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVFlete)
    );
  }

  /**
   * vFletePorCotizacion vFlete
   * @param params The `ConfiguracionProductosFletesService.VFleteVFletePorCotizacionParams` containing the following parameters:
   *
   * - `info`:
   *
   * - `idCotCotizacion`:
   *
   * @return OK
   */
  vFleteVFletePorCotizacionResponse(params: ConfiguracionProductosFletesService.VFleteVFletePorCotizacionParams): __Observable<__StrictHttpResponse<Array<VFleteObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.info;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vFlete/${encodeURIComponent(String(params.idCotCotizacion))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<VFleteObj>>;
      })
    );
  }
  /**
   * vFletePorCotizacion vFlete
   * @param params The `ConfiguracionProductosFletesService.VFleteVFletePorCotizacionParams` containing the following parameters:
   *
   * - `info`:
   *
   * - `idCotCotizacion`:
   *
   * @return OK
   */
  vFleteVFletePorCotizacion(params: ConfiguracionProductosFletesService.VFleteVFletePorCotizacionParams): __Observable<Array<VFleteObj>> {
    return this.vFleteVFletePorCotizacionResponse(params).pipe(
      __map(_r => _r.body as Array<VFleteObj>)
    );
  }
}

module ConfiguracionProductosFletesService {

  /**
   * Parameters for vFleteVFletePorCotizacion
   */
  export interface VFleteVFletePorCotizacionParams {
    info: QueryInfo;
    idCotCotizacion: string;
  }
}

export { ConfiguracionProductosFletesService }
