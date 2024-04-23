/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ClienteCartera } from '../models/cliente-cartera';
import { QueryResultClienteCartera } from '../models/query-result-cliente-cartera';
import { QueryInfo } from '../models/query-info';
import { ClienteCarteraCliente } from '../models/cliente-cartera-cliente';
import { QueryResultClienteCarteraCliente } from '../models/query-result-cliente-cartera-cliente';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionClientesCarteraService extends __BaseService {
  static readonly ClienteCarteraObtenerPath = '/ClienteCartera';
  static readonly ClienteCarteraGuardarOActualizarPath = '/ClienteCartera';
  static readonly ClienteCarteraQueryResultPath = '/ClienteCartera';
  static readonly ClienteCarteraDesactivarPath = '/ClienteCartera';
  static readonly ClienteCarteraClienteObtenerPath = '/ClienteCarteraCliente';
  static readonly ClienteCarteraClienteGuardarOActualizarPath = '/ClienteCarteraCliente';
  static readonly ClienteCarteraClienteQueryResultPath = '/ClienteCarteraCliente';
  static readonly ClienteCarteraClienteDesactivarPath = '/ClienteCarteraCliente';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener ClienteCartera
   * @param idClienteCartera undefined
   * @return OK
   */
  ClienteCarteraObtenerResponse(idClienteCartera: string): __Observable<__StrictHttpResponse<ClienteCartera>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idClienteCartera != null) __params = __params.set('idClienteCartera', idClienteCartera.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ClienteCartera`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ClienteCartera>;
      })
    );
  }
  /**
   * Obtener ClienteCartera
   * @param idClienteCartera undefined
   * @return OK
   */
  ClienteCarteraObtener(idClienteCartera: string): __Observable<ClienteCartera> {
    return this.ClienteCarteraObtenerResponse(idClienteCartera).pipe(
      __map(_r => _r.body as ClienteCartera)
    );
  }

  /**
   * GuardarOActualizar ClienteCartera
   * @param clienteCartera undefined
   * @return OK
   */
  ClienteCarteraGuardarOActualizarResponse(clienteCartera: ClienteCartera): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = clienteCartera;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ClienteCartera`,
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
   * GuardarOActualizar ClienteCartera
   * @param clienteCartera undefined
   * @return OK
   */
  ClienteCarteraGuardarOActualizar(clienteCartera: ClienteCartera): __Observable<string> {
    return this.ClienteCarteraGuardarOActualizarResponse(clienteCartera).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult ClienteCartera
   * @param info undefined
   * @return OK
   */
  ClienteCarteraQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultClienteCartera>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ClienteCartera`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultClienteCartera>;
      })
    );
  }
  /**
   * QueryResult ClienteCartera
   * @param info undefined
   * @return OK
   */
  ClienteCarteraQueryResult(info: QueryInfo): __Observable<QueryResultClienteCartera> {
    return this.ClienteCarteraQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultClienteCartera)
    );
  }

  /**
   * Desactivar ClienteCartera
   * @param idClienteCartera undefined
   * @return OK
   */
  ClienteCarteraDesactivarResponse(idClienteCartera: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idClienteCartera != null) __params = __params.set('idClienteCartera', idClienteCartera.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ClienteCartera`,
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
   * Desactivar ClienteCartera
   * @param idClienteCartera undefined
   * @return OK
   */
  ClienteCarteraDesactivar(idClienteCartera: string): __Observable<string> {
    return this.ClienteCarteraDesactivarResponse(idClienteCartera).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener ClienteCarteraCliente
   * @param idClienteCarteraCliente undefined
   * @return OK
   */
  ClienteCarteraClienteObtenerResponse(idClienteCarteraCliente: string): __Observable<__StrictHttpResponse<ClienteCarteraCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idClienteCarteraCliente != null) __params = __params.set('idClienteCarteraCliente', idClienteCarteraCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ClienteCarteraCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ClienteCarteraCliente>;
      })
    );
  }
  /**
   * Obtener ClienteCarteraCliente
   * @param idClienteCarteraCliente undefined
   * @return OK
   */
  ClienteCarteraClienteObtener(idClienteCarteraCliente: string): __Observable<ClienteCarteraCliente> {
    return this.ClienteCarteraClienteObtenerResponse(idClienteCarteraCliente).pipe(
      __map(_r => _r.body as ClienteCarteraCliente)
    );
  }

  /**
   * GuardarOActualizar ClienteCarteraCliente
   * @param clienteCarteraCliente undefined
   * @return OK
   */
  ClienteCarteraClienteGuardarOActualizarResponse(clienteCarteraCliente: ClienteCarteraCliente): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = clienteCarteraCliente;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ClienteCarteraCliente`,
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
   * GuardarOActualizar ClienteCarteraCliente
   * @param clienteCarteraCliente undefined
   * @return OK
   */
  ClienteCarteraClienteGuardarOActualizar(clienteCarteraCliente: ClienteCarteraCliente): __Observable<string> {
    return this.ClienteCarteraClienteGuardarOActualizarResponse(clienteCarteraCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult ClienteCarteraCliente
   * @param info undefined
   * @return OK
   */
  ClienteCarteraClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultClienteCarteraCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ClienteCarteraCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultClienteCarteraCliente>;
      })
    );
  }
  /**
   * QueryResult ClienteCarteraCliente
   * @param info undefined
   * @return OK
   */
  ClienteCarteraClienteQueryResult(info: QueryInfo): __Observable<QueryResultClienteCarteraCliente> {
    return this.ClienteCarteraClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultClienteCarteraCliente)
    );
  }

  /**
   * Desactivar ClienteCarteraCliente
   * @param idClienteCarteraCliente undefined
   * @return OK
   */
  ClienteCarteraClienteDesactivarResponse(idClienteCarteraCliente: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idClienteCarteraCliente != null) __params = __params.set('idClienteCarteraCliente', idClienteCarteraCliente.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ClienteCarteraCliente`,
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
   * Desactivar ClienteCarteraCliente
   * @param idClienteCarteraCliente undefined
   * @return OK
   */
  ClienteCarteraClienteDesactivar(idClienteCarteraCliente: string): __Observable<string> {
    return this.ClienteCarteraClienteDesactivarResponse(idClienteCarteraCliente).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ConfiguracionClientesCarteraService {
}

export { ConfiguracionClientesCarteraService }
