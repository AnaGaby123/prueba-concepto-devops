/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { InfoSistema } from '../models/info-sistema';
import { QueryResultInfoSistema } from '../models/query-result-info-sistema';
import { QueryInfo } from '../models/query-info';
import { ProcesoSistema } from '../models/proceso-sistema';
import { QueryResultProcesoSistema } from '../models/query-result-proceso-sistema';
import { ServicioSistema } from '../models/servicio-sistema';
import { QueryResultServicioSistema } from '../models/query-result-servicio-sistema';
@Injectable({
  providedIn: 'root',
})
class SistemaServiciosSistemaService extends __BaseService {
  static readonly InfoSistemaObtenerPorNombrePath = '/InfoSistemaObtenerPorNombre';
  static readonly InfoSistemaObtenerPath = '/InfoSistema';
  static readonly InfoSistemaGuardarOActualizarPath = '/InfoSistema';
  static readonly InfoSistemaQueryResultPath = '/InfoSistema';
  static readonly InfoSistemaDesactivarPath = '/InfoSistema';
  static readonly ProcesoSistemaObtenerPath = '/ProcesoSistema';
  static readonly ProcesoSistemaGuardarOActualizarPath = '/ProcesoSistema';
  static readonly ProcesoSistemaQueryResultPath = '/ProcesoSistema';
  static readonly ProcesoSistemaDesactivarPath = '/ProcesoSistema';
  static readonly ServicioSistemaObtenerPath = '/ServicioSistema';
  static readonly ServicioSistemaGuardarOActualizarPath = '/ServicioSistema';
  static readonly ServicioSistemaQueryResultPath = '/ServicioSistema';
  static readonly ServicioSistemaDesactivarPath = '/ServicioSistema';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de InfoSistema
   * @param nombre Nombre de InfoSistema
   * @return OK
   */
  InfoSistemaObtenerPorNombreResponse(nombre: string): __Observable<__StrictHttpResponse<InfoSistema>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (nombre != null) __params = __params.set('nombre', nombre.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/InfoSistemaObtenerPorNombre`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<InfoSistema>;
      })
    );
  }
  /**
   * Consultar registro de InfoSistema
   * @param nombre Nombre de InfoSistema
   * @return OK
   */
  InfoSistemaObtenerPorNombre(nombre: string): __Observable<InfoSistema> {
    return this.InfoSistemaObtenerPorNombreResponse(nombre).pipe(
      __map(_r => _r.body as InfoSistema)
    );
  }

  /**
   * Consultar registro de InfoSistema
   * @param idInfoSistema Identificador de InfoSistema
   * @return OK
   */
  InfoSistemaObtenerResponse(idInfoSistema: string): __Observable<__StrictHttpResponse<InfoSistema>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idInfoSistema != null) __params = __params.set('idInfoSistema', idInfoSistema.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/InfoSistema`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<InfoSistema>;
      })
    );
  }
  /**
   * Consultar registro de InfoSistema
   * @param idInfoSistema Identificador de InfoSistema
   * @return OK
   */
  InfoSistemaObtener(idInfoSistema: string): __Observable<InfoSistema> {
    return this.InfoSistemaObtenerResponse(idInfoSistema).pipe(
      __map(_r => _r.body as InfoSistema)
    );
  }

  /**
   * Guardar o actualizar InfoSistema
   * @param InfoSistema InfoSistema
   * @return OK
   */
  InfoSistemaGuardarOActualizarResponse(InfoSistema: InfoSistema): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = InfoSistema;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/InfoSistema`,
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
   * Guardar o actualizar InfoSistema
   * @param InfoSistema InfoSistema
   * @return OK
   */
  InfoSistemaGuardarOActualizar(InfoSistema: InfoSistema): __Observable<string> {
    return this.InfoSistemaGuardarOActualizarResponse(InfoSistema).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de InfoSistema
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  InfoSistemaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultInfoSistema>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/InfoSistema`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultInfoSistema>;
      })
    );
  }
  /**
   * Consultar lista paginada de InfoSistema
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  InfoSistemaQueryResult(info: QueryInfo): __Observable<QueryResultInfoSistema> {
    return this.InfoSistemaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultInfoSistema)
    );
  }

  /**
   * Desactivar registro de InfoSistema
   * @param idInfoSistema Identificador de registro de InfoSistema
   * @return OK
   */
  InfoSistemaDesactivarResponse(idInfoSistema: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idInfoSistema != null) __params = __params.set('idInfoSistema', idInfoSistema.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/InfoSistema`,
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
   * Desactivar registro de InfoSistema
   * @param idInfoSistema Identificador de registro de InfoSistema
   * @return OK
   */
  InfoSistemaDesactivar(idInfoSistema: string): __Observable<string> {
    return this.InfoSistemaDesactivarResponse(idInfoSistema).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ProcesoSistema
   * @param idProcesoSistema Identificador de ProcesoSistema
   * @return OK
   */
  ProcesoSistemaObtenerResponse(idProcesoSistema: string): __Observable<__StrictHttpResponse<ProcesoSistema>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProcesoSistema != null) __params = __params.set('idProcesoSistema', idProcesoSistema.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ProcesoSistema`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProcesoSistema>;
      })
    );
  }
  /**
   * Consultar registro de ProcesoSistema
   * @param idProcesoSistema Identificador de ProcesoSistema
   * @return OK
   */
  ProcesoSistemaObtener(idProcesoSistema: string): __Observable<ProcesoSistema> {
    return this.ProcesoSistemaObtenerResponse(idProcesoSistema).pipe(
      __map(_r => _r.body as ProcesoSistema)
    );
  }

  /**
   * Guardar o actualizar ProcesoSistema
   * @param ProcesoSistema ProcesoSistema
   * @return OK
   */
  ProcesoSistemaGuardarOActualizarResponse(ProcesoSistema: ProcesoSistema): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ProcesoSistema;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ProcesoSistema`,
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
   * Guardar o actualizar ProcesoSistema
   * @param ProcesoSistema ProcesoSistema
   * @return OK
   */
  ProcesoSistemaGuardarOActualizar(ProcesoSistema: ProcesoSistema): __Observable<string> {
    return this.ProcesoSistemaGuardarOActualizarResponse(ProcesoSistema).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ProcesoSistema
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProcesoSistemaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultProcesoSistema>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ProcesoSistema`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultProcesoSistema>;
      })
    );
  }
  /**
   * Consultar lista paginada de ProcesoSistema
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ProcesoSistemaQueryResult(info: QueryInfo): __Observable<QueryResultProcesoSistema> {
    return this.ProcesoSistemaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultProcesoSistema)
    );
  }

  /**
   * Desactivar registro de ProcesoSistema
   * @param idProcesoSistema Identificador de registro de ProcesoSistema
   * @return OK
   */
  ProcesoSistemaDesactivarResponse(idProcesoSistema: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProcesoSistema != null) __params = __params.set('idProcesoSistema', idProcesoSistema.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ProcesoSistema`,
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
   * Desactivar registro de ProcesoSistema
   * @param idProcesoSistema Identificador de registro de ProcesoSistema
   * @return OK
   */
  ProcesoSistemaDesactivar(idProcesoSistema: string): __Observable<string> {
    return this.ProcesoSistemaDesactivarResponse(idProcesoSistema).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ServicioSistema
   * @param idServicioSistema Identificador de ServicioSistema
   * @return OK
   */
  ServicioSistemaObtenerResponse(idServicioSistema: string): __Observable<__StrictHttpResponse<ServicioSistema>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idServicioSistema != null) __params = __params.set('idServicioSistema', idServicioSistema.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ServicioSistema`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ServicioSistema>;
      })
    );
  }
  /**
   * Consultar registro de ServicioSistema
   * @param idServicioSistema Identificador de ServicioSistema
   * @return OK
   */
  ServicioSistemaObtener(idServicioSistema: string): __Observable<ServicioSistema> {
    return this.ServicioSistemaObtenerResponse(idServicioSistema).pipe(
      __map(_r => _r.body as ServicioSistema)
    );
  }

  /**
   * Guardar o actualizar ServicioSistema
   * @param ServicioSistema ServicioSistema
   * @return OK
   */
  ServicioSistemaGuardarOActualizarResponse(ServicioSistema: ServicioSistema): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ServicioSistema;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ServicioSistema`,
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
   * Guardar o actualizar ServicioSistema
   * @param ServicioSistema ServicioSistema
   * @return OK
   */
  ServicioSistemaGuardarOActualizar(ServicioSistema: ServicioSistema): __Observable<string> {
    return this.ServicioSistemaGuardarOActualizarResponse(ServicioSistema).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ServicioSistema
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ServicioSistemaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultServicioSistema>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ServicioSistema`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultServicioSistema>;
      })
    );
  }
  /**
   * Consultar lista paginada de ServicioSistema
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ServicioSistemaQueryResult(info: QueryInfo): __Observable<QueryResultServicioSistema> {
    return this.ServicioSistemaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultServicioSistema)
    );
  }

  /**
   * Desactivar registro de ServicioSistema
   * @param idServicioSistema Identificador de registro de ServicioSistema
   * @return OK
   */
  ServicioSistemaDesactivarResponse(idServicioSistema: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idServicioSistema != null) __params = __params.set('idServicioSistema', idServicioSistema.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ServicioSistema`,
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
   * Desactivar registro de ServicioSistema
   * @param idServicioSistema Identificador de registro de ServicioSistema
   * @return OK
   */
  ServicioSistemaDesactivar(idServicioSistema: string): __Observable<string> {
    return this.ServicioSistemaDesactivarResponse(idServicioSistema).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module SistemaServiciosSistemaService {
}

export { SistemaServiciosSistemaService }
