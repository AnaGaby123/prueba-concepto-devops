/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GroupQueryResultVConfiguracionAplicadaClienteEstante } from '../models/group-query-result-vconfiguracion-aplicada-cliente-estante';
import { GroupQueryInfo } from '../models/group-query-info';
import { QueryResultVConfiguracionAplicadaClienteEstante } from '../models/query-result-vconfiguracion-aplicada-cliente-estante';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class ProcesosL03PromesaDeCompraEstanteService extends __BaseService {
  static readonly vConfiguracionAplicadaClienteEstanteGroupQueryResultPath = '/GrupoListavConfiguracionAplicadaClienteEstante';
  static readonly vConfiguracionAplicadaClienteEstanteQueryResultPath = '/vConfiguracionAplicadaClienteEstante';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar lista agrupada paginada de vConfiguracionAplicadaClienteEstante
   * @param info Filtros, agrupado y ordenamientos
   * @return OK
   */
  vConfiguracionAplicadaClienteEstanteGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultVConfiguracionAplicadaClienteEstante>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListavConfiguracionAplicadaClienteEstante`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultVConfiguracionAplicadaClienteEstante>;
      })
    );
  }
  /**
   * Consultar lista agrupada paginada de vConfiguracionAplicadaClienteEstante
   * @param info Filtros, agrupado y ordenamientos
   * @return OK
   */
  vConfiguracionAplicadaClienteEstanteGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultVConfiguracionAplicadaClienteEstante> {
    return this.vConfiguracionAplicadaClienteEstanteGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultVConfiguracionAplicadaClienteEstante)
    );
  }

  /**
   * Consultar lista paginada de vConfiguracionAplicadaClienteEstante
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vConfiguracionAplicadaClienteEstanteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVConfiguracionAplicadaClienteEstante>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vConfiguracionAplicadaClienteEstante`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVConfiguracionAplicadaClienteEstante>;
      })
    );
  }
  /**
   * Consultar lista paginada de vConfiguracionAplicadaClienteEstante
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vConfiguracionAplicadaClienteEstanteQueryResult(info: QueryInfo): __Observable<QueryResultVConfiguracionAplicadaClienteEstante> {
    return this.vConfiguracionAplicadaClienteEstanteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVConfiguracionAplicadaClienteEstante)
    );
  }
}

module ProcesosL03PromesaDeCompraEstanteService {
}

export { ProcesosL03PromesaDeCompraEstanteService }
