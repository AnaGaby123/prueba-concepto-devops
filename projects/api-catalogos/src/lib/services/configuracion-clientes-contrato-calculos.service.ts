/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { QueryResultVClasificacionProductoMarcaContratoCliente } from '../models/query-result-vclasificacion-producto-marca-contrato-cliente';
import { QueryInfo } from '../models/query-info';
import { QueryResultVPrecioListaClienteProductoClasificacionContrato } from '../models/query-result-vprecio-lista-cliente-producto-clasificacion-contrato';
import { QueryResultVPrecioListaClienteProductoContrato } from '../models/query-result-vprecio-lista-cliente-producto-contrato';
import { QueryResultVPrecioListaClienteProductoFamiliaContrato } from '../models/query-result-vprecio-lista-cliente-producto-familia-contrato';
import { QueryResultVPrecioListaProductoContratoCliente } from '../models/query-result-vprecio-lista-producto-contrato-cliente';
import { QueryResultVPrecioProductoClienteContrato } from '../models/query-result-vprecio-producto-cliente-contrato';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionClientesContratoCalculosService extends __BaseService {
  static readonly vClasificacionProductoMarcaContratoClienteQueryResultPath = '/vClasificacionProductoMarcaContratoCliente';
  static readonly vPrecioListaClienteProductoClasificacionContratoQueryResultPath = '/vPrecioListaClienteProductoClasificacionContrato';
  static readonly vPrecioListaClienteProductoContratoQueryResultPath = '/vPrecioListaClienteProductoContrato';
  static readonly vPrecioListaClienteProductoFamiliaContratoQueryResultPath = '/vPrecioListaClienteProductoFamiliaContrato';
  static readonly vPrecioListaProductoContratoClienteQueryResultPath = '/vPrecioListaProductoContratoCliente';
  static readonly vPrecioProductoClienteContratoQueryResultPath = '/vPrecioProductoClienteContrato';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar lista paginada de vClasificacionProductoMarcaContratoCliente
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vClasificacionProductoMarcaContratoClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVClasificacionProductoMarcaContratoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClasificacionProductoMarcaContratoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVClasificacionProductoMarcaContratoCliente>;
      })
    );
  }
  /**
   * Consultar lista paginada de vClasificacionProductoMarcaContratoCliente
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vClasificacionProductoMarcaContratoClienteQueryResult(info: QueryInfo): __Observable<QueryResultVClasificacionProductoMarcaContratoCliente> {
    return this.vClasificacionProductoMarcaContratoClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVClasificacionProductoMarcaContratoCliente)
    );
  }

  /**
   * Consultar lista paginada de vPrecioListaClienteProductoClasificacionContrato
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vPrecioListaClienteProductoClasificacionContratoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPrecioListaClienteProductoClasificacionContrato>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPrecioListaClienteProductoClasificacionContrato`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPrecioListaClienteProductoClasificacionContrato>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPrecioListaClienteProductoClasificacionContrato
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vPrecioListaClienteProductoClasificacionContratoQueryResult(info: QueryInfo): __Observable<QueryResultVPrecioListaClienteProductoClasificacionContrato> {
    return this.vPrecioListaClienteProductoClasificacionContratoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPrecioListaClienteProductoClasificacionContrato)
    );
  }

  /**
   * Consultar lista paginada de vPrecioListaClienteProductoContrato
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vPrecioListaClienteProductoContratoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPrecioListaClienteProductoContrato>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPrecioListaClienteProductoContrato`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPrecioListaClienteProductoContrato>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPrecioListaClienteProductoContrato
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vPrecioListaClienteProductoContratoQueryResult(info: QueryInfo): __Observable<QueryResultVPrecioListaClienteProductoContrato> {
    return this.vPrecioListaClienteProductoContratoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPrecioListaClienteProductoContrato)
    );
  }

  /**
   * Consultar lista paginada de vPrecioListaClienteProductoFamiliaContrato
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vPrecioListaClienteProductoFamiliaContratoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPrecioListaClienteProductoFamiliaContrato>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPrecioListaClienteProductoFamiliaContrato`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPrecioListaClienteProductoFamiliaContrato>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPrecioListaClienteProductoFamiliaContrato
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vPrecioListaClienteProductoFamiliaContratoQueryResult(info: QueryInfo): __Observable<QueryResultVPrecioListaClienteProductoFamiliaContrato> {
    return this.vPrecioListaClienteProductoFamiliaContratoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPrecioListaClienteProductoFamiliaContrato)
    );
  }

  /**
   * Consultar lista paginada de vPrecioListaProductoContratoCliente
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vPrecioListaProductoContratoClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPrecioListaProductoContratoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPrecioListaProductoContratoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPrecioListaProductoContratoCliente>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPrecioListaProductoContratoCliente
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vPrecioListaProductoContratoClienteQueryResult(info: QueryInfo): __Observable<QueryResultVPrecioListaProductoContratoCliente> {
    return this.vPrecioListaProductoContratoClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPrecioListaProductoContratoCliente)
    );
  }

  /**
   * Consultar lista paginada de vPrecioProductoClienteContrato
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vPrecioProductoClienteContratoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPrecioProductoClienteContrato>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPrecioProductoClienteContrato`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPrecioProductoClienteContrato>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPrecioProductoClienteContrato
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vPrecioProductoClienteContratoQueryResult(info: QueryInfo): __Observable<QueryResultVPrecioProductoClienteContrato> {
    return this.vPrecioProductoClienteContratoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPrecioProductoClienteContrato)
    );
  }
}

module ConfiguracionClientesContratoCalculosService {
}

export { ConfiguracionClientesContratoCalculosService }
