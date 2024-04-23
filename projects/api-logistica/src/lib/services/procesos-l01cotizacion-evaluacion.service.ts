/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CotAspectoEvaluado } from '../models/cot-aspecto-evaluado';
import { QueryResultCotAspectoEvaluado } from '../models/query-result-cot-aspecto-evaluado';
import { QueryInfo } from '../models/query-info';
import { CotEvaluacionContactoCliente } from '../models/cot-evaluacion-contacto-cliente';
import { QueryResultCotEvaluacionContactoCliente } from '../models/query-result-cot-evaluacion-contacto-cliente';
@Injectable({
  providedIn: 'root',
})
class ProcesosL01CotizacionEvaluacionService extends __BaseService {
  static readonly cotAspectoEvaluadoObtenerPath = '/cotAspectoEvaluado';
  static readonly cotAspectoEvaluadoGuardarOActualizarPath = '/cotAspectoEvaluado';
  static readonly cotAspectoEvaluadoQueryResultPath = '/cotAspectoEvaluado';
  static readonly cotAspectoEvaluadoDesactivarPath = '/cotAspectoEvaluado';
  static readonly cotEvaluacionContactoClienteObtenerPath = '/cotEvaluacionContactoCliente';
  static readonly cotEvaluacionContactoClienteGuardarOActualizarPath = '/cotEvaluacionContactoCliente';
  static readonly cotEvaluacionContactoClienteQueryResultPath = '/cotEvaluacionContactoCliente';
  static readonly cotEvaluacionContactoClienteDesactivarPath = '/cotEvaluacionContactoCliente';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener cotAspectoEvaluado
   * @param idcotAspectoEvaluado undefined
   * @return OK
   */
  cotAspectoEvaluadoObtenerResponse(idcotAspectoEvaluado: string): __Observable<__StrictHttpResponse<CotAspectoEvaluado>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotAspectoEvaluado != null) __params = __params.set('idcotAspectoEvaluado', idcotAspectoEvaluado.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotAspectoEvaluado`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CotAspectoEvaluado>;
      })
    );
  }
  /**
   * Obtener cotAspectoEvaluado
   * @param idcotAspectoEvaluado undefined
   * @return OK
   */
  cotAspectoEvaluadoObtener(idcotAspectoEvaluado: string): __Observable<CotAspectoEvaluado> {
    return this.cotAspectoEvaluadoObtenerResponse(idcotAspectoEvaluado).pipe(
      __map(_r => _r.body as CotAspectoEvaluado)
    );
  }

  /**
   * GuardarOActualizar cotAspectoEvaluado
   * @param cotAspectoEvaluado undefined
   * @return OK
   */
  cotAspectoEvaluadoGuardarOActualizarResponse(cotAspectoEvaluado: CotAspectoEvaluado): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = cotAspectoEvaluado;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/cotAspectoEvaluado`,
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
   * GuardarOActualizar cotAspectoEvaluado
   * @param cotAspectoEvaluado undefined
   * @return OK
   */
  cotAspectoEvaluadoGuardarOActualizar(cotAspectoEvaluado: CotAspectoEvaluado): __Observable<string> {
    return this.cotAspectoEvaluadoGuardarOActualizarResponse(cotAspectoEvaluado).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult cotAspectoEvaluado
   * @param info undefined
   * @return OK
   */
  cotAspectoEvaluadoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCotAspectoEvaluado>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotAspectoEvaluado`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCotAspectoEvaluado>;
      })
    );
  }
  /**
   * QueryResult cotAspectoEvaluado
   * @param info undefined
   * @return OK
   */
  cotAspectoEvaluadoQueryResult(info: QueryInfo): __Observable<QueryResultCotAspectoEvaluado> {
    return this.cotAspectoEvaluadoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCotAspectoEvaluado)
    );
  }

  /**
   * Desactivar cotAspectoEvaluado
   * @param idcotAspectoEvaluado undefined
   * @return OK
   */
  cotAspectoEvaluadoDesactivarResponse(idcotAspectoEvaluado: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotAspectoEvaluado != null) __params = __params.set('idcotAspectoEvaluado', idcotAspectoEvaluado.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/cotAspectoEvaluado`,
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
   * Desactivar cotAspectoEvaluado
   * @param idcotAspectoEvaluado undefined
   * @return OK
   */
  cotAspectoEvaluadoDesactivar(idcotAspectoEvaluado: string): __Observable<string> {
    return this.cotAspectoEvaluadoDesactivarResponse(idcotAspectoEvaluado).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener cotEvaluacionContactoCliente
   * @param idcotEvaluacionContactoCliente undefined
   * @return OK
   */
  cotEvaluacionContactoClienteObtenerResponse(idcotEvaluacionContactoCliente: string): __Observable<__StrictHttpResponse<CotEvaluacionContactoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotEvaluacionContactoCliente != null) __params = __params.set('idcotEvaluacionContactoCliente', idcotEvaluacionContactoCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotEvaluacionContactoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CotEvaluacionContactoCliente>;
      })
    );
  }
  /**
   * Obtener cotEvaluacionContactoCliente
   * @param idcotEvaluacionContactoCliente undefined
   * @return OK
   */
  cotEvaluacionContactoClienteObtener(idcotEvaluacionContactoCliente: string): __Observable<CotEvaluacionContactoCliente> {
    return this.cotEvaluacionContactoClienteObtenerResponse(idcotEvaluacionContactoCliente).pipe(
      __map(_r => _r.body as CotEvaluacionContactoCliente)
    );
  }

  /**
   * GuardarOActualizar cotEvaluacionContactoCliente
   * @param cotEvaluacionContactoCliente undefined
   * @return OK
   */
  cotEvaluacionContactoClienteGuardarOActualizarResponse(cotEvaluacionContactoCliente: CotEvaluacionContactoCliente): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = cotEvaluacionContactoCliente;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/cotEvaluacionContactoCliente`,
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
   * GuardarOActualizar cotEvaluacionContactoCliente
   * @param cotEvaluacionContactoCliente undefined
   * @return OK
   */
  cotEvaluacionContactoClienteGuardarOActualizar(cotEvaluacionContactoCliente: CotEvaluacionContactoCliente): __Observable<string> {
    return this.cotEvaluacionContactoClienteGuardarOActualizarResponse(cotEvaluacionContactoCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult cotEvaluacionContactoCliente
   * @param info undefined
   * @return OK
   */
  cotEvaluacionContactoClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCotEvaluacionContactoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotEvaluacionContactoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCotEvaluacionContactoCliente>;
      })
    );
  }
  /**
   * QueryResult cotEvaluacionContactoCliente
   * @param info undefined
   * @return OK
   */
  cotEvaluacionContactoClienteQueryResult(info: QueryInfo): __Observable<QueryResultCotEvaluacionContactoCliente> {
    return this.cotEvaluacionContactoClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCotEvaluacionContactoCliente)
    );
  }

  /**
   * Desactivar cotEvaluacionContactoCliente
   * @param idcotEvaluacionContactoCliente undefined
   * @return OK
   */
  cotEvaluacionContactoClienteDesactivarResponse(idcotEvaluacionContactoCliente: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotEvaluacionContactoCliente != null) __params = __params.set('idcotEvaluacionContactoCliente', idcotEvaluacionContactoCliente.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/cotEvaluacionContactoCliente`,
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
   * Desactivar cotEvaluacionContactoCliente
   * @param idcotEvaluacionContactoCliente undefined
   * @return OK
   */
  cotEvaluacionContactoClienteDesactivar(idcotEvaluacionContactoCliente: string): __Observable<string> {
    return this.cotEvaluacionContactoClienteDesactivarResponse(idcotEvaluacionContactoCliente).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ProcesosL01CotizacionEvaluacionService {
}

export { ProcesosL01CotizacionEvaluacionService }
