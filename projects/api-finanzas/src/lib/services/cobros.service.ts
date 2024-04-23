/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiFinanzasConfiguration as __Configuration } from '../api-finanzas-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { QueryResultVARProveedorProformaPedido } from '../models/query-result-varproveedor-proforma-pedido';
import { QueryInfo } from '../models/query-info';
import { ClienteAtenderRevisionObj } from '../models/cliente-atender-revision-obj';
import { QueryResultVTpProformaPedido } from '../models/query-result-vtp-proforma-pedido';
import { GroupQueryResultVTpProformaPedidoDetalle } from '../models/group-query-result-vtp-proforma-pedido-detalle';
import { GroupQueryInfo } from '../models/group-query-info';
import { QueryResultVTpProformaPedidoDetalle } from '../models/query-result-vtp-proforma-pedido-detalle';
@Injectable({
  providedIn: 'root',
})
class CobrosService extends __BaseService {
  static readonly vARProveedorProformaPedidoQueryResultPath = '/vARProveedorProformaPedido';
  static readonly vTpProformaPedidoClienteAtenderRevisionObjPath = '/ClienteAtenderRevisionObj';
  static readonly vTpProformaPedidoQueryResultPath = '/vTpProformaPedido';
  static readonly vTpProformaPedidoDetalleGroupQueryResultPath = '/GrupoListavTpProformaPedidoDetalle';
  static readonly vTpProformaPedidoDetalleQueryResultPath = '/vTpProformaPedidoDetalle';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar lista paginada de vARProveedorProformaPedido
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vARProveedorProformaPedidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVARProveedorProformaPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vARProveedorProformaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVARProveedorProformaPedido>;
      })
    );
  }
  /**
   * Consultar lista paginada de vARProveedorProformaPedido
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vARProveedorProformaPedidoQueryResult(info: QueryInfo): __Observable<QueryResultVARProveedorProformaPedido> {
    return this.vARProveedorProformaPedidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVARProveedorProformaPedido)
    );
  }

  /**
   * ClienteAtenderRevisionObj vTpProformaPedido
   * @param info undefined
   * @return OK
   */
  vTpProformaPedidoClienteAtenderRevisionObjResponse(info: QueryInfo): __Observable<__StrictHttpResponse<Array<ClienteAtenderRevisionObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ClienteAtenderRevisionObj`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ClienteAtenderRevisionObj>>;
      })
    );
  }
  /**
   * ClienteAtenderRevisionObj vTpProformaPedido
   * @param info undefined
   * @return OK
   */
  vTpProformaPedidoClienteAtenderRevisionObj(info: QueryInfo): __Observable<Array<ClienteAtenderRevisionObj>> {
    return this.vTpProformaPedidoClienteAtenderRevisionObjResponse(info).pipe(
      __map(_r => _r.body as Array<ClienteAtenderRevisionObj>)
    );
  }

  /**
   * Consultar lista paginada de vTpProformaPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vTpProformaPedidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVTpProformaPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vTpProformaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVTpProformaPedido>;
      })
    );
  }
  /**
   * Consultar lista paginada de vTpProformaPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  vTpProformaPedidoQueryResult(info: QueryInfo): __Observable<QueryResultVTpProformaPedido> {
    return this.vTpProformaPedidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVTpProformaPedido)
    );
  }

  /**
   * GroupQueryResult vTpProformaPedidoDetalle
   * @param info undefined
   * @return OK
   */
  vTpProformaPedidoDetalleGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultVTpProformaPedidoDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListavTpProformaPedidoDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultVTpProformaPedidoDetalle>;
      })
    );
  }
  /**
   * GroupQueryResult vTpProformaPedidoDetalle
   * @param info undefined
   * @return OK
   */
  vTpProformaPedidoDetalleGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultVTpProformaPedidoDetalle> {
    return this.vTpProformaPedidoDetalleGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultVTpProformaPedidoDetalle)
    );
  }

  /**
   * Consultar lista paginada de vTpProformaPedidoDetalle
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vTpProformaPedidoDetalleQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVTpProformaPedidoDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vTpProformaPedidoDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVTpProformaPedidoDetalle>;
      })
    );
  }
  /**
   * Consultar lista paginada de vTpProformaPedidoDetalle
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vTpProformaPedidoDetalleQueryResult(info: QueryInfo): __Observable<QueryResultVTpProformaPedidoDetalle> {
    return this.vTpProformaPedidoDetalleQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVTpProformaPedidoDetalle)
    );
  }
}

module CobrosService {
}

export { CobrosService }
