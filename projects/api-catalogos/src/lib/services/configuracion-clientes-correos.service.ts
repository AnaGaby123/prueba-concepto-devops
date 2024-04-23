/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Cliente } from '../models/cliente';
import { GroupQueryResultCorreoRecibidoClienteObj } from '../models/group-query-result-correo-recibido-cliente-obj';
import { GroupQueryInfo } from '../models/group-query-info';
import { CorreoRecibidoClienteObj } from '../models/correo-recibido-cliente-obj';
import { QueryResultCorreoRecibidoClienteObj } from '../models/query-result-correo-recibido-cliente-obj';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionClientesCorreosService extends __BaseService {
  static readonly ClientesAsociadosCorreoObtenerClientesAsociadosCorreoPath = '/ClientesAsociadosCorreo';
  static readonly CorreoRecibidoClienteDetalleGroupQueryResultPath = '/GrupoListaCorreoRecibidoClienteDetalle';
  static readonly CorreoRecibidoClienteDetalleObtenerPath = '/CorreoRecibidoClienteDetalle';
  static readonly CorreoRecibidoClienteDetalleQueryResultPath = '/CorreoRecibidoClienteDetalle';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * ObtenerClientesAsociadosCorreo ClientesAsociadosCorreo
   * @param correo undefined
   * @return OK
   */
  ClientesAsociadosCorreoObtenerClientesAsociadosCorreoResponse(correo: string): __Observable<__StrictHttpResponse<Array<Cliente>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (correo != null) __params = __params.set('correo', correo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ClientesAsociadosCorreo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Cliente>>;
      })
    );
  }
  /**
   * ObtenerClientesAsociadosCorreo ClientesAsociadosCorreo
   * @param correo undefined
   * @return OK
   */
  ClientesAsociadosCorreoObtenerClientesAsociadosCorreo(correo: string): __Observable<Array<Cliente>> {
    return this.ClientesAsociadosCorreoObtenerClientesAsociadosCorreoResponse(correo).pipe(
      __map(_r => _r.body as Array<Cliente>)
    );
  }

  /**
   * GroupQueryResult CorreoRecibidoClienteDetalle
   * @param info undefined
   * @return OK
   */
  CorreoRecibidoClienteDetalleGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultCorreoRecibidoClienteObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListaCorreoRecibidoClienteDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultCorreoRecibidoClienteObj>;
      })
    );
  }
  /**
   * GroupQueryResult CorreoRecibidoClienteDetalle
   * @param info undefined
   * @return OK
   */
  CorreoRecibidoClienteDetalleGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultCorreoRecibidoClienteObj> {
    return this.CorreoRecibidoClienteDetalleGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultCorreoRecibidoClienteObj)
    );
  }

  /**
   * Obtener CorreoRecibidoClienteDetalle
   * @param idCorreoRecibidoCliente undefined
   * @return OK
   */
  CorreoRecibidoClienteDetalleObtenerResponse(idCorreoRecibidoCliente: string): __Observable<__StrictHttpResponse<CorreoRecibidoClienteObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoRecibidoCliente != null) __params = __params.set('idCorreoRecibidoCliente', idCorreoRecibidoCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CorreoRecibidoClienteDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CorreoRecibidoClienteObj>;
      })
    );
  }
  /**
   * Obtener CorreoRecibidoClienteDetalle
   * @param idCorreoRecibidoCliente undefined
   * @return OK
   */
  CorreoRecibidoClienteDetalleObtener(idCorreoRecibidoCliente: string): __Observable<CorreoRecibidoClienteObj> {
    return this.CorreoRecibidoClienteDetalleObtenerResponse(idCorreoRecibidoCliente).pipe(
      __map(_r => _r.body as CorreoRecibidoClienteObj)
    );
  }

  /**
   * QueryResult CorreoRecibidoClienteDetalle
   * @param info undefined
   * @return OK
   */
  CorreoRecibidoClienteDetalleQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCorreoRecibidoClienteObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CorreoRecibidoClienteDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCorreoRecibidoClienteObj>;
      })
    );
  }
  /**
   * QueryResult CorreoRecibidoClienteDetalle
   * @param info undefined
   * @return OK
   */
  CorreoRecibidoClienteDetalleQueryResult(info: QueryInfo): __Observable<QueryResultCorreoRecibidoClienteObj> {
    return this.CorreoRecibidoClienteDetalleQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCorreoRecibidoClienteObj)
    );
  }
}

module ConfiguracionClientesCorreosService {
}

export { ConfiguracionClientesCorreosService }
