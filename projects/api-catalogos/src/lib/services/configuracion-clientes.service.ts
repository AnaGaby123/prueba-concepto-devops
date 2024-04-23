/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Cliente } from '../models/cliente';
import { QueryResultCliente } from '../models/query-result-cliente';
import { QueryInfo } from '../models/query-info';
import { GroupQueryResultVCliente } from '../models/group-query-result-vcliente';
import { GroupQueryInfo } from '../models/group-query-info';
import { AttributeDashboard } from '../models/attribute-dashboard';
import { ResumeGroupQueryInfo } from '../models/resume-group-query-info';
import { VCliente } from '../models/vcliente';
import { QueryResultVCliente } from '../models/query-result-vcliente';
import { QueryResultVClienteOrdenesDeCompra } from '../models/query-result-vcliente-ordenes-de-compra';
import { QueryResultVDireccionPrincipalCliente } from '../models/query-result-vdireccion-principal-cliente';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionClientesService extends __BaseService {
  static readonly ClienteClienteLegacyActualizarPath = '/ClienteLegacyActualizar';
  static readonly ClienteObtenerPath = '/Cliente';
  static readonly ClienteGuardarOActualizarPath = '/Cliente';
  static readonly ClienteQueryResultPath = '/Cliente';
  static readonly ClienteDesactivarPath = '/Cliente';
  static readonly ClienteExtensionsListaAddendasPath = '/ListaClientesAddendas';
  static readonly ClienteExtensionsValidaRFCPath = '/ValidaRFC';
  static readonly vClienteGroupQueryResultPath = '/GrupoListavCliente';
  static readonly vClienteObtenerTabsEstadoContartoDashboardPath = '/vCliente/EstadoContarto/tabs';
  static readonly vClienteObtenerPath = '/vCliente';
  static readonly vClienteQueryResultPath = '/vCliente';
  static readonly vClienteOrdenesDeCompraQueryResultPath = '/vClienteOrdenesDeCompra';
  static readonly vDireccionPrincipalClienteQueryResultPath = '/vDireccionPrincipalCliente';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * ClienteLegacyActualizar Cliente
   * @param idCliente undefined
   * @return OK
   */
  ClienteClienteLegacyActualizarResponse(idCliente: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCliente != null) __params = __params.set('idCliente', idCliente.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ClienteLegacyActualizar`,
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
   * ClienteLegacyActualizar Cliente
   * @param idCliente undefined
   * @return OK
   */
  ClienteClienteLegacyActualizar(idCliente: string): __Observable<string> {
    return this.ClienteClienteLegacyActualizarResponse(idCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener Cliente
   * @param idCliente undefined
   * @return OK
   */
  ClienteObtenerResponse(idCliente: string): __Observable<__StrictHttpResponse<Cliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCliente != null) __params = __params.set('idCliente', idCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Cliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Cliente>;
      })
    );
  }
  /**
   * Obtener Cliente
   * @param idCliente undefined
   * @return OK
   */
  ClienteObtener(idCliente: string): __Observable<Cliente> {
    return this.ClienteObtenerResponse(idCliente).pipe(
      __map(_r => _r.body as Cliente)
    );
  }

  /**
   * GuardarOActualizar Cliente
   * @param Cliente undefined
   * @return OK
   */
  ClienteGuardarOActualizarResponse(Cliente: Cliente): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = Cliente;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/Cliente`,
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
   * GuardarOActualizar Cliente
   * @param Cliente undefined
   * @return OK
   */
  ClienteGuardarOActualizar(Cliente: Cliente): __Observable<string> {
    return this.ClienteGuardarOActualizarResponse(Cliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult Cliente
   * @param info undefined
   * @return OK
   */
  ClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Cliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCliente>;
      })
    );
  }
  /**
   * QueryResult Cliente
   * @param info undefined
   * @return OK
   */
  ClienteQueryResult(info: QueryInfo): __Observable<QueryResultCliente> {
    return this.ClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCliente)
    );
  }

  /**
   * Desactivar Cliente
   * @param idCliente undefined
   * @return OK
   */
  ClienteDesactivarResponse(idCliente: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCliente != null) __params = __params.set('idCliente', idCliente.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/Cliente`,
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
   * Desactivar Cliente
   * @param idCliente undefined
   * @return OK
   */
  ClienteDesactivar(idCliente: string): __Observable<string> {
    return this.ClienteDesactivarResponse(idCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Lista de los clientes que tienen Addenda
   * @return OK
   */
  ClienteExtensionsListaAddendasResponse(): __Observable<__StrictHttpResponse<Array<string>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ListaClientesAddendas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<string>>;
      })
    );
  }
  /**
   * Lista de los clientes que tienen Addenda
   * @return OK
   */
  ClienteExtensionsListaAddendas(): __Observable<Array<string>> {
    return this.ClienteExtensionsListaAddendasResponse().pipe(
      __map(_r => _r.body as Array<string>)
    );
  }

  /**
   * Valida RFC
   * @param RFC undefined
   * @return OK
   */
  ClienteExtensionsValidaRFCResponse(RFC: string): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (RFC != null) __params = __params.set('RFC', RFC.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ValidaRFC`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: (_r as HttpResponse<any>).body === 'true' }) as __StrictHttpResponse<boolean>
      })
    );
  }
  /**
   * Valida RFC
   * @param RFC undefined
   * @return OK
   */
  ClienteExtensionsValidaRFC(RFC: string): __Observable<boolean> {
    return this.ClienteExtensionsValidaRFCResponse(RFC).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * GroupQueryResult vCliente
   * @param info undefined
   * @return OK
   */
  vClienteGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultVCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListavCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultVCliente>;
      })
    );
  }
  /**
   * GroupQueryResult vCliente
   * @param info undefined
   * @return OK
   */
  vClienteGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultVCliente> {
    return this.vClienteGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultVCliente)
    );
  }

  /**
   * ObtenerTabsEstadoContartoDashboard vCliente
   * @param info undefined
   * @return OK
   */
  vClienteObtenerTabsEstadoContartoDashboardResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<Array<AttributeDashboard>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vCliente/EstadoContarto/tabs`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AttributeDashboard>>;
      })
    );
  }
  /**
   * ObtenerTabsEstadoContartoDashboard vCliente
   * @param info undefined
   * @return OK
   */
  vClienteObtenerTabsEstadoContartoDashboard(info: ResumeGroupQueryInfo): __Observable<Array<AttributeDashboard>> {
    return this.vClienteObtenerTabsEstadoContartoDashboardResponse(info).pipe(
      __map(_r => _r.body as Array<AttributeDashboard>)
    );
  }

  /**
   * Obtener vCliente
   * @param idCliente undefined
   * @return OK
   */
  vClienteObtenerResponse(idCliente: string): __Observable<__StrictHttpResponse<VCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCliente != null) __params = __params.set('idCliente', idCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VCliente>;
      })
    );
  }
  /**
   * Obtener vCliente
   * @param idCliente undefined
   * @return OK
   */
  vClienteObtener(idCliente: string): __Observable<VCliente> {
    return this.vClienteObtenerResponse(idCliente).pipe(
      __map(_r => _r.body as VCliente)
    );
  }

  /**
   * Consultar lista paginada de vCliente
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVCliente>;
      })
    );
  }
  /**
   * Consultar lista paginada de vCliente
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vClienteQueryResult(info: QueryInfo): __Observable<QueryResultVCliente> {
    return this.vClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVCliente)
    );
  }

  /**
   * Consultar lista paginada de vClienteOrdenesDeCompra
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vClienteOrdenesDeCompraQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVClienteOrdenesDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClienteOrdenesDeCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVClienteOrdenesDeCompra>;
      })
    );
  }
  /**
   * Consultar lista paginada de vClienteOrdenesDeCompra
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vClienteOrdenesDeCompraQueryResult(info: QueryInfo): __Observable<QueryResultVClienteOrdenesDeCompra> {
    return this.vClienteOrdenesDeCompraQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVClienteOrdenesDeCompra)
    );
  }

  /**
   * Consultar lista paginada de vDireccionPrincipalCliente
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vDireccionPrincipalClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVDireccionPrincipalCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vDireccionPrincipalCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVDireccionPrincipalCliente>;
      })
    );
  }
  /**
   * Consultar lista paginada de vDireccionPrincipalCliente
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vDireccionPrincipalClienteQueryResult(info: QueryInfo): __Observable<QueryResultVDireccionPrincipalCliente> {
    return this.vDireccionPrincipalClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVDireccionPrincipalCliente)
    );
  }
}

module ConfiguracionClientesService {
}

export { ConfiguracionClientesService }
