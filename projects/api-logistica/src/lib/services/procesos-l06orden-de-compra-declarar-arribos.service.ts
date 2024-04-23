/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { OcPackingList } from '../models/oc-packing-list';
import { QueryResultOcPackingList } from '../models/query-result-oc-packing-list';
import { QueryInfo } from '../models/query-info';
import { QueryResultVOcOrdenDeCompraDeclararArribo } from '../models/query-result-voc-orden-de-compra-declarar-arribo';
import { QueryResultVOcProveedorDeclararArribo } from '../models/query-result-voc-proveedor-declarar-arribo';
@Injectable({
  providedIn: 'root',
})
class ProcesosL06OrdenDeCompraDeclararArribosService extends __BaseService {
  static readonly ocPackingListObtenerPath = '/ocPackingList';
  static readonly ocPackingListGuardarOActualizarPath = '/ocPackingList';
  static readonly ocPackingListQueryResultPath = '/ocPackingList';
  static readonly ocPackingListDesactivarPath = '/ocPackingList';
  static readonly vOcOrdenDeCompraDeclararArriboQueryResultPath = '/vOcOrdenDeCompraDeclararArribo';
  static readonly vOcProveedorDeclararArriboQueryResultPath = '/vOcProveedorDeclararArribo';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de ocPackingList
   * @param idocPackingList Identificador de ocPackingList
   * @return OK
   */
  ocPackingListObtenerResponse(idocPackingList: string): __Observable<__StrictHttpResponse<OcPackingList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocPackingList != null) __params = __params.set('idocPackingList', idocPackingList.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ocPackingList`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OcPackingList>;
      })
    );
  }
  /**
   * Consultar registro de ocPackingList
   * @param idocPackingList Identificador de ocPackingList
   * @return OK
   */
  ocPackingListObtener(idocPackingList: string): __Observable<OcPackingList> {
    return this.ocPackingListObtenerResponse(idocPackingList).pipe(
      __map(_r => _r.body as OcPackingList)
    );
  }

  /**
   * Guardar o actualizar ocPackingList
   * @param ocPackingList ocPackingList
   * @return OK
   */
  ocPackingListGuardarOActualizarResponse(ocPackingList: OcPackingList): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ocPackingList;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ocPackingList`,
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
   * Guardar o actualizar ocPackingList
   * @param ocPackingList ocPackingList
   * @return OK
   */
  ocPackingListGuardarOActualizar(ocPackingList: OcPackingList): __Observable<string> {
    return this.ocPackingListGuardarOActualizarResponse(ocPackingList).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ocPackingList
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocPackingListQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultOcPackingList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ocPackingList`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultOcPackingList>;
      })
    );
  }
  /**
   * Consultar lista paginada de ocPackingList
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocPackingListQueryResult(info: QueryInfo): __Observable<QueryResultOcPackingList> {
    return this.ocPackingListQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultOcPackingList)
    );
  }

  /**
   * Desactivar registro de ocPackingList
   * @param idocPackingList Identificador de registro de ocPackingList
   * @return OK
   */
  ocPackingListDesactivarResponse(idocPackingList: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocPackingList != null) __params = __params.set('idocPackingList', idocPackingList.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ocPackingList`,
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
   * Desactivar registro de ocPackingList
   * @param idocPackingList Identificador de registro de ocPackingList
   * @return OK
   */
  ocPackingListDesactivar(idocPackingList: string): __Observable<string> {
    return this.ocPackingListDesactivarResponse(idocPackingList).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de vOcOrdenDeCompraDeclararArribo
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcOrdenDeCompraDeclararArriboQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVOcOrdenDeCompraDeclararArribo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vOcOrdenDeCompraDeclararArribo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVOcOrdenDeCompraDeclararArribo>;
      })
    );
  }
  /**
   * Consultar lista paginada de vOcOrdenDeCompraDeclararArribo
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcOrdenDeCompraDeclararArriboQueryResult(info: QueryInfo): __Observable<QueryResultVOcOrdenDeCompraDeclararArribo> {
    return this.vOcOrdenDeCompraDeclararArriboQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVOcOrdenDeCompraDeclararArribo)
    );
  }

  /**
   * Consultar lista paginada de vOcProveedorDeclararArribo
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcProveedorDeclararArriboQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVOcProveedorDeclararArribo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vOcProveedorDeclararArribo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVOcProveedorDeclararArribo>;
      })
    );
  }
  /**
   * Consultar lista paginada de vOcProveedorDeclararArribo
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcProveedorDeclararArriboQueryResult(info: QueryInfo): __Observable<QueryResultVOcProveedorDeclararArribo> {
    return this.vOcProveedorDeclararArriboQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVOcProveedorDeclararArribo)
    );
  }
}

module ProcesosL06OrdenDeCompraDeclararArribosService {
}

export { ProcesosL06OrdenDeCompraDeclararArribosService }
